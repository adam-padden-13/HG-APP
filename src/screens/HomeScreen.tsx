import { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Image, Pressable } from "react-native";
import { Icon } from "@rneui/themed";
import LoginModal from "../components/LoginModal";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../../firebaseConfig";
import { signOut } from "firebase/auth";
import { SmallText } from "../theme/theme";
import { AppContext } from "../contexts/appContext";
import Toast from "react-native-root-toast";
import { version } from "../../package.json";

const HomeScreen = ({ navigation }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    if (state.user.userDisplayName === "Guest") setShowLoginModal(true);
  }, [showLoginModal]);

  const handleSignout = () => {
    signOut(auth)
      .then((res) => {
        Toast.show("Successfully Signed Out!", {
          position: 60,
        });
        dispatch({
          type: "User",
          payload: { userDisplayName: "Guest", userEmail: "" },
        });
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <SafeAreaView>
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 20,
          }}
        >
          <SmallText>Hello {state.user.userDisplayName ?? ""}!</SmallText>
          {state.user.userDisplayName === "Guest" ? (
            <Pressable onPress={() => setShowLoginModal(true)}>
              <Icon name="login" type="material" size={30} color="black" />
            </Pressable>
          ) : (
            <Pressable onPress={() => handleSignout()}>
              <Icon name="logout" type="material" size={30} color="black" />
            </Pressable>
          )}
        </View>

        <Image
          source={require("../../assets/hg_triangle.png")}
          style={styles.logo}
        />
        <Pressable
          style={{
            alignSelf: "flex-end",
            height: 100,
            justifyContent: "flex-end",
            padding: 4,
          }}
        >
          <SmallText>v{version}</SmallText>
        </Pressable>

        <LoginModal
          showModal={showLoginModal}
          hideModal={() => setShowLoginModal(false)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logo: {
    marginTop: 20,
    alignSelf: "center",
    height: 300,
    resizeMode: "contain",
  },
});

export default HomeScreen;

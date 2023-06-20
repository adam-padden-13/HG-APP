import { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Image, Pressable } from "react-native";
import { Icon } from "@rneui/themed";
import LoginModal from "../components/LoginModal";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../../firebaseConfig";
import { signOut } from "firebase/auth";
import { NormalText } from "../theme/theme";
import { AppContext } from "../contexts/appContext";

const HomeScreen = ({ navigation }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    if (state.user.userDisplayName === "Guest") setShowLoginModal(true);
  }, [showLoginModal]);

  const handleSignout = () => {
    signOut(auth)
      .then((res) => {
        alert("Signed Out");
        dispatch({
          type: "User",
          payload: { userDisplayName: "Guest" },
        });
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <SafeAreaView>
      <View style={{}}>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <NormalText>Hello {state.user.userDisplayName ?? ""}</NormalText>
          <Pressable onPress={() => setShowLoginModal(true)}>
            <Icon
              name="user-circle"
              type="font-awesome"
              size={40}
              color="black"
              style={styles.userIcon}
            />
          </Pressable>
          <Pressable onPress={() => handleSignout()}>
            <Icon
              name="logout"
              type="ant-design"
              size={40}
              color="black"
              style={styles.userIcon}
            />
          </Pressable>
        </View>
        <Image
          source={require("../../assets/hg_triangle.png")}
          style={styles.logo}
        />
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
    marginTop: 100,
    alignSelf: "center",
  },
  userIcon: {
    marginRight: 20,
    alignSelf: "flex-end",
  },
});

export default HomeScreen;

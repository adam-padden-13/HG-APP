import { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Image, Pressable, FlatList } from "react-native";
import { Icon } from "@rneui/themed";
import LoginModal from "../components/LoginModal";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../../firebaseConfig";
import { signOut } from "firebase/auth";
import { HeaderText, NormalText, SmallText } from "../theme/theme";
import { AppContext } from "../contexts/appContext";
import Toast from "react-native-root-toast";
import { version } from "../../package.json";
import Spacer from "../components/Spacer";
import { getUserInfo } from "../services/UserService";

const HomeScreen = ({ navigation }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    if (state.user.userDisplayName === "Guest") {
      setShowLoginModal(true);
    } else {
      getUserInfo(state.user.userEmail).then((res) => {
        if (res.savedSongs.length > 0) {
          dispatch({
            type: "SavedSongs",
            payload: res.savedSongs,
          });
        }
      });
    }
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
      <View style={{ height: "100%" }}>
        <View style={styles.loginIconContainer}>
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
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../../assets/hg_triangle.png")}
            style={styles.logo}
          />
          <Spacer />
          <NormalText>Hello {state.user.userDisplayName ?? ""}!</NormalText>
        </View>
        <View style={{ alignItems: "center" }}>
          <HeaderText>Saved Songs</HeaderText>
          {state.savedSongs.length > 0 &&
            state.savedSongs.map((song) => {
              return <NormalText>{song.title}</NormalText>
            })
          }
        </View>

        <SmallText style={styles.versionText}>v{version}</SmallText>
      </View>

      <LoginModal
        showModal={showLoginModal}
        hideModal={() => setShowLoginModal(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logo: {
    marginTop: 20,
    alignSelf: "center",
    height: 280,
    resizeMode: "contain",
  },
  versionText: {
    top: 200,
    left: 10,
  },
  loginIconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginHorizontal: 20,
  },
});

export default HomeScreen;

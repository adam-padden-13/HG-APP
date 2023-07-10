import { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Image, Pressable, FlatList } from "react-native";
import { Icon } from "@rneui/themed";
import LoginModal from "../components/LoginModal";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, devEnv } from "../../firebaseConfig";
import { signOut } from "firebase/auth";
import { BoldText, SmallText } from "../theme/theme";
import { AppContext } from "../contexts/appContext";
import Toast from "react-native-root-toast";
import { expo } from "../../app.json";
import Spacer from "../components/Spacer";
import { getUserInfo } from "../services/UserService";
import SongListItem from "../components/SongListItem";
import { useIsFocused } from "@react-navigation/native";

const HomeScreen = ({ navigation }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { state, dispatch } = useContext(AppContext);

  const isFocused = useIsFocused();

  const handleGetUserInfo = async () => {
    await getUserInfo(state.user.userEmail).then((res) => {
      if (res.savedSongs) {
        dispatch({
          ...state,
          type: "SavedSongs",
          payload: res.savedSongs,
        });
      }
    });
  };

  useEffect(() => {
    if (state.user.userDisplayName === "Guest") {
      setShowLoginModal(true);
    } else {
      handleGetUserInfo();
    }
  }, [showLoginModal, isFocused]);

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

  console.log(state.user.userDisplayName)

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
          <Spacer height={30} />
        </View>
        <View style={{ alignItems: "center", flex: 1 }}>
          <BoldText size={20}>
            {state.user.userDisplayName}'s Saved Songs
          </BoldText>
          {state.savedSongs && state.savedSongs.length > 0 ? (
            <View style={{ alignItems: "center" }}>
              <Spacer height={10} />
              <FlatList
                data={state.savedSongs}
                renderItem={(song) => (
                  <SongListItem
                    song={song.item}
                    id={song.item.id}
                    currentScreen="home"
                    reloadSavedSongs={() => handleGetUserInfo()}
                  />
                )}
              />
            </View>
          ) : (
            <SmallText>No songs added to your favorites list.</SmallText>
          )}
        </View>
        <View style={styles.versionText}>
          <SmallText>v{expo.version}</SmallText>
          <SmallText>{devEnv ? "Dev" : "Prod"}</SmallText>
        </View>
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
    marginTop: 0,
    alignSelf: "center",
    height: 280,
    resizeMode: "contain",
  },
  versionText: {
    bottom: -30,
    left: 10,
    position: "absolute",
  },
  loginIconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginHorizontal: 20,
  },
});

export default HomeScreen;

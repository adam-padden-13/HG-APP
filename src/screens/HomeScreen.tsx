import { useEffect, useState } from "react";
import { StyleSheet, View, Image, Pressable } from "react-native";
import { Icon } from "@rneui/themed";
import LoginModal from "../components/LoginModal";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../../firebaseConfig";
import { User, signOut } from "firebase/auth";
import { NormalText } from "../theme/theme";

const HomeScreen = ({ navigation }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (auth.currentUser) {
      setUser(auth.currentUser);
    } else {
      setShowLoginModal(true);
    }
  }, [showLoginModal]);

  const handleSignout = () => {
    // alert(`the user name is ${userName} and the password is ${password}`);
    signOut(auth)
      .then((res) => {
        alert(res);
        setUser(null);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <SafeAreaView>
      <View style={{}}>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <NormalText>Hello {user ? user.displayName : ""}</NormalText>
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

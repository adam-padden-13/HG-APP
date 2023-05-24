import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { Icon } from "@rneui/themed";
import LoginModal from "../components/LoginModal";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../../firebaseConfig";
import {
  signOut,
} from "firebase/auth";

const HomeScreen = ({ navigation }) => {
  const [showModal, setShowModal] = useState(true);

  // const uploadCollection = async () => {
  //   try {
  //     const docRef = await addDoc(collection(db, "users"), {
  //       first: "Ada",
  //       last: "Lovelace",
  //       born: 1815,
  //     });
  //     console.log("Document written with ID: ", docRef.id);
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
  // };

  // const uploadDocument = async () => {
  //   try {
  //     const docRef = await addDoc(collection(db, "users"), {
  //       first: "Alan",
  //       middle: "Mathison",
  //       last: "Turing",
  //       born: 1912,
  //     });

  //     console.log("Document written with ID: ", docRef.id);
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
  // };

  // const getData = async () => {
  //   const querySnapshot = await getDocs(collection(db, "users"));
  //   querySnapshot.forEach((doc) => {
  //     console.log(doc.data().born);
  //   });
  // };

  const handleSignout = () => {
    // alert(`the user name is ${userName} and the password is ${password}`);
    signOut(auth)
      .then((res) => {
        alert(res);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <SafeAreaView>
      <View style={{}}>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <Pressable onPress={() => setShowModal(true)}>
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
          showModal={showModal}
          hideModal={() => setShowModal(false)}
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

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

const HomeScreen = ({ navigation }) => {
  const [showModal, setShowModal] = useState(false);

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

  return (
    <SafeAreaView>
      <View style={{}}>
        <Pressable onPress={() => setShowModal(true)}>
          <Icon
            name="user-circle"
            type="font-awesome"
            size={40}
            color="black"
            style={styles.userIcon}
          />
        </Pressable>

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

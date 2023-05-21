import { useState } from "react";
import {
  Button,
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

const HomeScreen = ({ navigation }) => {
  const uploadCollection = async () => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        first: "Ada",
        last: "Lovelace",
        born: 1815,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const uploadDocument = async () => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        first: "Alan",
        middle: "Mathison",
        last: "Turing",
        born: 1912,
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      console.log(doc.data().born);
    });
  };

  return (
    <View style={{}}>
      <Pressable>
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
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    marginTop: 120,
    alignSelf: "center",
  },
  userIcon: {
    marginRight: 20,
    alignSelf: "flex-end",
    marginTop: 50,
  },
});

export default HomeScreen;

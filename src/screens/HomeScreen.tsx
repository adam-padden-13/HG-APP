import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";

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
      console.log(doc.data().born)
      // console.log(`${doc.id} => ${doc.data()}`);
    });
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Handgrenades</Text>
      <Button title={"Upload Collection"} onPress={() => uploadCollection()} />
      <Button title={"Upload Document"} onPress={() => uploadDocument()} />
      <Button title={"Get Document"} onPress={() => getData()} />
    </View>
  );
};

export default HomeScreen;

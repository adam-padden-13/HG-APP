import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Chord } from "../models/UberChordModels";
import { lookupChord } from "../service/UberChordAPI";

const HomeScreen = ({ navigation }) => {
  const [chord, setChord] = useState<Chord>();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Handgrenades</Text>

    </View>
  );
};

export default HomeScreen;


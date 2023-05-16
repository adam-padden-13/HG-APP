import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";

const SavedChordsScreen = ({ navigation, route }) => {
  const { chordName, fingering } = route.params;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Saved Chords Screen</Text>
      <Text>Chord Name: {chordName ?? ""} </Text>
      <Text>Fingering: {fingering}</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
};

export default SavedChordsScreen;

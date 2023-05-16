import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { Audio } from "expo-av";
import { Sound } from "expo-av/build/Audio";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

const SongScreen = ({ navigation, route }) => {
  const { song } = route.params;
  const [sound, setSound] = useState<Sound>();

  console.log(song.title);

  async function playSound() {
    if (song.number === 1) {
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/audio/calling.wav")
      );
      console.log(sound);
      setSound(sound);

      console.log("Playing Sound");
      await sound.playAsync();
    }
    if (song.number === 2) {
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/audio/eke.wav")
      );
      console.log(sound);
      setSound(sound);

      console.log("Playing Sound");
      await sound.playAsync();
    }
    if (song.number === 3) {
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/audio/sake_run.mp3")
      );
      console.log(sound);
      setSound(sound);

      console.log("Playing Sound");
      await sound.playAsync();
    }
  }

  async function stopSound() {
    await sound.stopAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text> {song.title}</Text>
      <Button title={"Play Song"} onPress={playSound} />
      <Button title={"Stop Song"} onPress={stopSound} />
    </View>
  );
};

export default SongScreen;

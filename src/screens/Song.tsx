import { useEffect, useState } from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import { Audio } from "expo-av";
import { Sound } from "expo-av/build/Audio";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

const SongScreen = ({ navigation, route }) => {
  const { song } = route.params;
  const [sound, setSound] = useState<Sound>();

  console.log(song.title);

  const player = new Audio.Sound();

  useEffect(() => {
    console.log("HIT")
    async function loadSound() {
      // Load the sound
      await player.loadAsync({
        uri: "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
      });
    }

    async function unloadSound() {
      // cleanup
      await player.unloadAsync();
    }

    loadSound();

    return () => {
      unloadSound();
    };
  }, []);

  async function onPlay() {
    try {
      await player.playAsync();
      console.log(" Your sound is playing!");
    } catch (error) {
      // An error occurred!
      console.log(error);
    }
  }

  async function onStop() {
    console.log("stop");
    await player.stopAsync();
  }

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
      <>
    <View style={styles.container}>
      <Button title="Play Sound" onPress={onPlay} />
    </View>
        <View style={styles.container}>
      <Button title="Stop Sound" onPress={onStop} />
    </View>
    </>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
});

export default SongScreen;

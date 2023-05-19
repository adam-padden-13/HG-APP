import { useEffect, useState } from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import { Audio } from "expo-av";
import { storage } from "../../firebaseConfig";
import { getDownloadURL, ref } from "firebase/storage";
import { removeSpaces } from "../utilities/stringUtilities";

const player = new Audio.Sound();

const SongScreen = ({ navigation, route }) => {
  const { song } = route.params;
  const [songIsLoaded, setSongIsLoaded] = useState(false);
  const audioFileTitle: string = removeSpaces(song);

  const audioRef = ref(storage, "audio");
  const callingNightRef = ref(audioRef, `/${audioFileTitle}.m4a`);

  const getSong = async () => {
    await getDownloadURL(callingNightRef).then((convertedURL) => {
      loadSound(convertedURL);
    });
  };

  async function loadSound(url: string) {
    // Load the sound
    await player
      .loadAsync({
        uri: url,
      })
      .then((res) => {
        if (res.isLoaded) setSongIsLoaded(true);
      })
      .catch(() => {
        alert("error loading song");
      });
  }

  useEffect(() => {
    getSong();
    async function unloadSound() {
      // cleanup
      await player.unloadAsync();
    }

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

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text> {song.title}</Text>
      <>
        <View style={styles.container}>
          <Button
            title={songIsLoaded ? "Play Song" : "Song is Loading..."}
            onPress={onPlay}
            disabled={!songIsLoaded}
          />
        </View>
        <View style={styles.container}>
          <Button title="Stop Song" onPress={onStop} />
        </View>
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 10,
  },
});

export default SongScreen;

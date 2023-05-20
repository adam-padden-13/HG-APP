import { useEffect, useState } from "react";
import {
  Button,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { Audio } from "expo-av";
import { storage } from "../../firebaseConfig";
import { getDownloadURL, ref } from "firebase/storage";
import { removeSpaces } from "../utilities/stringUtilities";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/SongsStackNavigator";
import { HeaderText } from "../theme/theme";
import Spacer from "../components/Spacer";
import { Icon } from "@rneui/themed";
import GoBack from "../components/GoBack";
import Player from "../components/Player";

const player = new Audio.Sound();
type Props = NativeStackScreenProps<RootStackParamList, "SongScreen">;

const SongScreen = ({ navigation, route }: Props) => {
  const { song } = route.params;
  const [songIsLoaded, setSongIsLoaded] = useState(false);
  const [songIsPlaying, setSongisPlaying] = useState(false);
  const audioFileTitle: string = removeSpaces(song.title);

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
    setSongisPlaying(false);
  }

  async function onPause() {
    console.log("pause");
    await player.pauseAsync();
  }

  player._onPlaybackStatusUpdate = (playbackStatus) => {
    if (playbackStatus.isLoaded) {
      if (playbackStatus.isPlaying) {
        setSongisPlaying(true);
      }
      console.log("!!!", playbackStatus)
      console.log(playbackStatus.positionMillis)
    }
  };

  return (
    <View style={styles.container}>
      <GoBack navigation={navigation} />
      <Spacer />
      <HeaderText> {song.title}</HeaderText>
      <Spacer />
      <Player
        onPlay={onPlay}
        onPause={onPause}
        onStop={onStop}
        songIsLoaded={!songIsLoaded}
        isPlaying={songIsPlaying}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default SongScreen;

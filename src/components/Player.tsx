import { Text, View, Pressable, StyleSheet } from "react-native";
import { Audio } from "expo-av";
import { storage } from "../../firebaseConfig";
import { Icon } from "@rneui/themed";
import Spacer from "./Spacer";
import { NormalText } from "../theme/theme";
import PlayerSlider from "./PlayerSlider";
import { getDownloadURL, ref } from "firebase/storage";
import { removeSpaces } from "../utilities/stringUtilities";
import { useEffect, useState } from "react";
import { Song } from "../models/Song";

const player = new Audio.Sound();

interface PlayerProps {
  song: Song;
}
const Player = ({ song }: PlayerProps) => {
  const [songIsLoaded, setSongIsLoaded] = useState(false);
  const [songIsPlaying, setSongisPlaying] = useState(false);
  const [songIsPaused, setSongisPaused] = useState(false);
  const [songDuration, setSongDuration] = useState(0);
  const [currentPlayback, setCurrentPlayback] = useState(0);

  const audioFileTitle: string = removeSpaces(song.title);
  const audioRef = ref(storage, "audio");
  const songRef = ref(audioRef, `/${audioFileTitle}.m4a`);

  const getSong = async () => {
    await getDownloadURL(songRef).then((convertedURL) => {
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
        if (res.isLoaded) {
          setSongIsLoaded(true);
          setSongDuration(res.durationMillis);
        }
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
    } catch (error) {
      // An error occurred!
      console.log(error);
    }
  }

  async function onStop() {
    await player.stopAsync();
    setSongisPlaying(false);
    setSongisPaused(false);
  }

  async function onPause() {
    await player.pauseAsync();
    setSongisPlaying(false);
    setSongisPaused(true);
  }

  player._onPlaybackStatusUpdate = (playbackStatus) => {
    if (playbackStatus.isLoaded) {
      if (playbackStatus.isPlaying) {
        setSongisPlaying(true);
        setSongisPaused(false);
        setCurrentPlayback(playbackStatus.positionMillis);
      }
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Pressable onPress={onPlay} disabled={!songIsLoaded}>
          <Icon
            name="play-circle"
            type="feather"
            size={60}
            color={!songIsLoaded ? "grey" : songIsPlaying ? "green" : "black"}
          />
        </Pressable>
        <Spacer width={20} />
        <Pressable onPress={onPause} disabled={!songIsPlaying}>
          <Icon
            name="pause-circle"
            type="feather"
            size={60}
            color={!songIsLoaded ? "grey" : songIsPaused ? "red" : "black"}
          />
        </Pressable>
        <Spacer width={20} />
        {/* <Pressable onPress={onStop}>
          <Icon
            name="stop-circle"
            type="feather"
            size={60}
            color={!songIsLoaded ? "grey" : "black"}
          />
        </Pressable> */}
      </View>
      <PlayerSlider
        songDuration={songDuration}
        currentPlayback={currentPlayback}
        updateCurrentPlayback={(updatedTime) =>
          player.setPositionAsync(updatedTime)
        }
      />
      {!songIsLoaded && <NormalText>Player is loading...</NormalText>}
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
  },
  container: { alignItems: "center", width: "80%" },
});

export default Player;

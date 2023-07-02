import { View, Pressable, StyleSheet, ActivityIndicator } from "react-native";
import { Audio } from "expo-av";
import { storage } from "../../firebaseConfig";
import { Icon } from "@rneui/themed";
import Spacer from "./Spacer";
import { NormalText } from "../theme/theme";
import PlayerSlider from "./PlayerSlider";
import { getDownloadURL, ref } from "firebase/storage";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/appContext";

const player = new Audio.Sound();

const Player = () => {
  const { state } = useContext(AppContext);
  const [songIsLoaded, setSongIsLoaded] = useState(false);
  const [songIsPlaying, setSongisPlaying] = useState(false);
  const [songIsPaused, setSongisPaused] = useState(false);
  const [songDuration, setSongDuration] = useState(0);
  const [currentPlayback, setCurrentPlayback] = useState(0);

  const audioFileTitle: string = state.loadedSong.audioFileName
    ? state.loadedSong.audioFileName
    : "";
  const audioRef = ref(storage, "audio");
  const songRef = ref(audioRef, `/${audioFileTitle ? audioFileTitle : ""}`);

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
          onPlay();
        }
      })
      .catch(() => {
        alert("error loading song");
      });
  }

  useEffect(() => {
    setSongisPlaying(false);
    setSongisPaused(false);
    getSong();
    async function unloadSound() {
      // cleanup
      await player.unloadAsync();
    }

    return () => {
      unloadSound();
    };
  }, [state.loadedSong]);

  async function onPlay() {
    try {
      await player.playAsync();
    } catch (error) {
      // An error occurred!
      console.log(error);
    }
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
    <>
      {!songIsLoaded ? (
        <>
          <ActivityIndicator size={"large"} color="black" />
          <Spacer />
          <NormalText color={"white"}>Song is loading...</NormalText>
        </>
      ) : (
        <View style={[styles.container, styles.shadowProp]}>
          <View style={styles.buttons}>
            <Pressable onPress={onPlay} disabled={!songIsLoaded}>
              <Icon
                name="play-circle"
                type="feather"
                size={60}
                color={
                  !songIsLoaded ? "grey" : songIsPlaying ? "green" : "black"
                }
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
          </View>
          <PlayerSlider
            songDuration={songDuration}
            currentPlayback={currentPlayback}
            updateCurrentPlayback={(updatedTime) =>
              player.setPositionAsync(updatedTime)
            }
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "80%",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 10,
    paddingTop: 24,
    borderWidth: 3
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    left: 10,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default Player;

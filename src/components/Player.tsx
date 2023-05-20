import { Text, View, Pressable, StyleSheet } from "react-native";
import { Icon } from "@rneui/themed";
import Spacer from "./Spacer";
import { NormalText } from "../theme/theme";
import PlayerSlider from "./PlayerSlider";

interface PlayerProps {
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  songIsLoaded: boolean;
  isPlaying: boolean;
}

const Player = ({
  onPlay,
  onPause,
  onStop,
  songIsLoaded,
  isPlaying,
}: PlayerProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Pressable onPress={onPlay} disabled={songIsLoaded}>
          <Icon
            name="play-circle"
            type="feather"
            size={60}
            color={songIsLoaded ? "grey" : isPlaying ? "green" : "black"}
          />
        </Pressable>
        <Spacer width={20} />
        <Pressable onPress={onPause}>
          <Icon
            name="pause-circle"
            type="feather"
            size={60}
            color={songIsLoaded ? "grey" : "black"}
          />
        </Pressable>
        <Spacer width={20} />
        <Pressable onPress={onStop}>
          <Icon
            name="stop-circle"
            type="feather"
            size={60}
            color={songIsLoaded ? "grey" : "black"}
          />
        </Pressable>
      </View>
      <PlayerSlider />
      {songIsLoaded && <NormalText>Player is loading...</NormalText>}
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

import { useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { AppContext } from "../contexts/appContext";
import Player from "../components/Player";
import { SafeAreaView } from "react-native-safe-area-context";
import { Song } from "../models/Song";

const PlayerScreen = () => {
  const { state, dispatch } = useContext(AppContext);
  const [song, setSong] = useState<Song>();

  useEffect(() => {
    console.log("screen", state.selectedSong.title);
    if (state.selectedSong) setSong(state.selectedSong);
  }, [state.selectedSong]);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        {state.selectedSong && <Player song={song} />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    // justifyContent: "center",
  },
  songInfoContainer: {
    borderWidth: 1,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "white",
  },
  editIcon: { alignSelf: "flex-end", marginTop: 20 },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  songInfoRow: {
    flexDirection: "row",
    width: 280,
    marginVertical: 10,
  },
});

export default PlayerScreen;

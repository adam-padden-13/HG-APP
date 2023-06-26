import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Song } from "../models/Song";
import { BoldText, HeaderText, NormalText, SmallText } from "../theme/theme";
import Spacer from "../components/Spacer";
import { AppContext } from "../contexts/appContext";
import { getSongs } from "../services/SongService";

const SongsScreen = ({ navigation }) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    getSongs().then((response) => {
      setIsLoading(true);
      if (response.length > 0) {
        dispatch({
          type: "Songs",
          payload: response,
        });
        setIsLoading(false);
      } else {
        alert("error loading songs");
        setIsLoading(false);
      }
    });
  }, []);

  const renderSongInfo = (song: Song, id: number) => {
    return (
      <View key={id}>
        <Pressable
          style={styles.songContainer}
          onPress={() => {
            navigation.navigate("SongScreen", {
              song: song,
            });

            dispatch({
              type: "SelectedSong",
              payload: song,
            });
          }}
        >
          <View style={styles.songInfo}>
            <SmallText>{song.title}</SmallText>
            <NormalText>{song.category}</NormalText>
          </View>
        </Pressable>
        <View style={{ marginBottom: 12 }} />
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <HeaderText>Songs</HeaderText>
      <Spacer />
      <View style={styles.songInfo}>
        <BoldText>Title</BoldText>
        <BoldText>Category</BoldText>
      </View>
      <Spacer height={10} />
      <View>
        {isLoading && <ActivityIndicator size={"large"} color="black" />}
        {state.songs &&
          state.songs.map((song, id) => {
            return renderSongInfo(song, id);
          })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    marginHorizontal: 20,
    flex: 1,
  },
  goBack: {
    position: "absolute",
    top: 0,
    left: 10,
  },
  songContainer: {
    height: 42,
    borderWidth: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  songInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 4,
  },
});

export default SongsScreen;

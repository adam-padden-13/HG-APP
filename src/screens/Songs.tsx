import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Song } from "../models/Song";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { BoldText, HeaderText, NormalText, SmallText } from "../theme/theme";
import Spacer from "../components/Spacer";
import { AppContext } from "../contexts/appContext";

const SongsScreen = ({ navigation }) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch } = useContext(AppContext);

  const getData = async () => {
    setIsLoading(true);
    const querySnapshot = await getDocs(collection(db, "songs"));
    const songsToPush: Song[] = [];
    querySnapshot.forEach((song) => {
      let currentSong: Song = song.data() as Song;
      currentSong.documentId = song.id;
      songsToPush.push(currentSong);
    });

    setSongs(songsToPush);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
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
        {songs.map((song, id) => {
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

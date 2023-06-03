import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Song } from "../models/Song";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { BoldText, HeaderText, NormalText } from "../theme/theme";
import Spacer from "../components/Spacer";

const SongsScreen = ({ navigation }) => {
  const [songs, setSongs] = useState<Song[]>([]);

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "songs"));
    const songsToPush: Song[] = [];
    querySnapshot.forEach((song) => {
      songsToPush.push(song.data() as Song);
    });

    setSongs(songsToPush);
  };

  useEffect(() => {
    getData();
  }, []);

  const renderSongInfo = (song: Song) => {
    return (
      <View>
        <Pressable
          style={styles.songContainer}
          onPress={() =>
            navigation.navigate("SongScreen", {
              song: song,
            })
          }
        >
          <View style={styles.songInfo}>
            <NormalText>{song.title}</NormalText>
            <NormalText>{song.category}</NormalText>
          </View>
        </Pressable>
        <View style={{ marginBottom: 12 }} />
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HeaderText>Songs</HeaderText>
      <Spacer />
      <View style={styles.songInfo}>
        <BoldText>Title</BoldText>
        <BoldText>Category</BoldText>
      </View>
      <Spacer height={10} />
      <View>
        {songs.map((song, id) => {
          return renderSongInfo(song);
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

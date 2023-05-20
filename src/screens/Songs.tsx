import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Song } from "../models/Song";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { HeaderText, NormalText } from "../theme/theme";
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
          style={{
            height: 40,
            borderWidth: 1,
            justifyContent: "center",
            paddingHorizontal: 10,
          }}
          onPress={() =>
            navigation.navigate("SongScreen", {
              song: song,
            })
          }
        >
          <NormalText>{song.title}</NormalText>
        </Pressable>
        <View style={{ marginBottom: 12 }} />
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HeaderText>Songs</HeaderText>
      <Spacer />
      <View>
        {songs.map((song) => {
          return renderSongInfo(song);
        })}
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    marginHorizontal: 36,
    flex: 1,
  },
  goBack: {
    position: "absolute",
    top: 0,
    left: 10,
  },
});

export default SongsScreen;

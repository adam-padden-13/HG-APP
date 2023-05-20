import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Song } from "../models/Song";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { NormalText } from "../theme/theme";

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
      <>
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
      </>
    );
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {songs.map((song) => {
        return renderSongInfo(song);
      })}
    </View>
  );
};

export default SongsScreen;

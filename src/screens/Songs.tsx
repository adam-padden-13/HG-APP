import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Song } from "../models/Song";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const SongsScreen = ({ navigation }) => {
  const [songs, setSongs] = useState<Song[]>([]);

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "songs"));
    const songsToPush: Song[] = [];
    console.log("!!!query", querySnapshot);
    querySnapshot.forEach((song) => {
      console.log("song", song.data());
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
          <Text>{song.title} </Text>
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

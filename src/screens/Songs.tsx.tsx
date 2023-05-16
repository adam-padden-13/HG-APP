import { useEffect, useState } from "react";
import { Button, Pressable, Text, View } from "react-native";
import { Song } from "../models/Song";
const SongsScreen = ({ navigation }) => {
  const hgSongs: Song[] = [
    {
      title: "Calling On the Night",
      number: 1,
    },
    { title: "Everyone Knows Everything", number: 2 },
    { title: "Trouble", number: 3 },
  ];

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
      {hgSongs.map((song) => {
        return renderSongInfo(song);
      })}
    </View>
  );
};

export default SongsScreen;

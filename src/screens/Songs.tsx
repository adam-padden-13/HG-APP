import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { Song } from "../models/Song";
import { BoldText, HeaderText, NormalText, SmallText } from "../theme/theme";
import Spacer from "../components/Spacer";
import { AppContext } from "../contexts/appContext";
import { getSongs } from "../services/SongService";

const SongsScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(true);
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    loadSongs();
  }, []);

  const loadSongs = () => {
    getSongs().then((response) => {
      if (response.length > 0) {
        setRefreshing(false);
        dispatch({
          type: "Songs",
          payload: response,
        });
      } else {
        alert("error loading songs");
      }
    });
  };

  const renderSong = (song: Song, id: number) => {
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
    <View style={styles.container}>
      {refreshing ? <ActivityIndicator /> : null}
      <FlatList
        ListHeaderComponent={
          <>
            <HeaderText>Songs</HeaderText>
            <Spacer />
            <View style={styles.songInfo}>
              <BoldText>Title</BoldText>
              <BoldText>Category</BoldText>
            </View>
            <Spacer height={10} />
          </>
        }
        data={state.songs}
        renderItem={(song) => renderSong(song.item, song.item.id)}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadSongs} />
        }
      />
    </View>
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

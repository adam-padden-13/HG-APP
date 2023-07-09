import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { BoldText, HeaderText, SmallText, colors } from "../theme/theme";
import Spacer from "../components/Spacer";
import { AppContext } from "../contexts/appContext";
import { getSongs } from "../services/SongService";
import { Icon } from "@rneui/base";
import AddSongModal from "../components/AddSongModal";
import SongListItem from "../components/SongListItem";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/SongsStackNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "SongsScreen">;

const SongsScreen = ({ route, navigation }: Props) => {
  const [changeButtonColor, setChangeButtonColor] = useState(false);
  const [refreshing, setRefreshing] = useState(true);
  const [showAddSong, setShowAddSong] = useState(false);
  const { state, dispatch } = useContext(AppContext);

  const { songToNavigateTo } = route.params;

  useEffect(() => {
    loadSongs();
  }, []);

  useEffect(() => {
    if (songToNavigateTo) {
      navigation.navigate("SongScreen", {
        song: songToNavigateTo,
      });
    }
  }, [songToNavigateTo]);

  const loadSongs = () => {
    getSongs().then((response) => {
      if (response.length > 0) {
        response.sort((a, b) => {
          if (a.title < b.title) return -1;
          if (a.title > b.title) return 1;
          return 0;
        });

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
      borderRadius: 8,
      backgroundColor: colors.white,
    },
    songInfo: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: 4,
    },
    addSongButton: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      alignSelf: "flex-end",
      borderColor: "black",
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
      backgroundColor: changeButtonColor ? colors.blue : colors.white,
      marginHorizontal: 8,
      marginBottom: 8,
      height: 50,
      width: 50,
    },
    shadowProp: {
      shadowColor: "#171717",
      shadowOffset: { width: 4, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
  });

  return (
    <View style={styles.container}>
      {refreshing ? <ActivityIndicator /> : null}
      <Pressable
        onPress={() => setShowAddSong(true)}
        onPressIn={() => setChangeButtonColor(true)}
        onPressOut={() => setChangeButtonColor(false)}
        style={[styles.addSongButton, styles.shadowProp]}
      >
        <Icon
          name="add"
          type="ionicon"
          color={colors.red}
          size={16}
          style={{ marginRight: 10 }}
        />
        <SmallText size={8} color={colors.black}>
          Add Song
        </SmallText>
      </Pressable>
      <FlatList
        showsVerticalScrollIndicator={false}
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
        renderItem={(song) => (
          <SongListItem
            song={song.item}
            id={song.item.id}
            currentScreen="songs"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadSongs} />
        }
      />
      {showAddSong && (
        <AddSongModal
          showModal={showAddSong}
          hideModal={() => setShowAddSong(false)}
          reloadSongs={() => loadSongs()}
        />
      )}
    </View>
  );
};

export default SongsScreen;

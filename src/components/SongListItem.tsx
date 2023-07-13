import { Pressable, View, StyleSheet } from "react-native";
import { SmallText, colors } from "../theme/theme";
import { Song } from "../models/Song";
import { useContext, useState } from "react";
import { AppContext } from "../contexts/appContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Icon } from "@rneui/base";
import { removeSongFromFavorites } from "../services/UserService";
import ConfirmModal from "./ConfirmModal";
import Toast from "react-native-root-toast";
import { SavedSong } from "../models/HGUser";

interface SongListItemProps {
  song?: Song;
  savedSong?: SavedSong;
  id: number;
  currentScreen: string;
  reloadSavedSongs?: () => void;
}

const SongListItem = ({
  song,
  savedSong,
  id,
  currentScreen,
  reloadSavedSongs,
}: SongListItemProps) => {
  const { state, dispatch } = useContext(AppContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleNavigation = () => {
    if (currentScreen === "songs") {
      navigation.navigate("SongScreen", {
        song: song,
      });
    }

    if (currentScreen === "home") {
      navigation.navigate("SongsTab", {
        screen: "SongsScreen",
        params: {
          songToNavigateTo: song,
        },
      });
    }

    dispatch({
      type: "SelectedSong",
      payload: song,
    });
  };

  const handleRemoveSong = async () => {
    await removeSongFromFavorites(state.user.userEmail, savedSong);
    Toast.show("Song was removed!", {
      position: 0,
    });
    setShowDeleteModal(false);
    reloadSavedSongs();
  };

  const styles = StyleSheet.create({
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
      alignItems: "center",
    },
    shadowProp: {
      shadowColor: "#171717",
      shadowOffset: { width: 4, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
    iconContainer: {
      left: 24,
      marginRight: 16,
      borderWidth: 1,
      borderRadius: 4,
    },
  });
  return (
    <View key={id}>
      <Pressable
        style={[
          styles.songContainer,
          {
            borderColor: state.loadedSong
              ? song.title === state.loadedSong.title
                ? colors.green
                : colors.black
              : colors.black,
            borderWidth: state.loadedSong
              ? song.title === state.loadedSong.title
                ? 3
                : 1
              : 1,
          },
        ]}
        onPress={() => handleNavigation()}
      >
        <View style={styles.songInfo}>
          <View style={{ width: 180 }}>
            <SmallText>
              {currentScreen === "songs" ? song.title : savedSong.title}
            </SmallText>
          </View>
          {currentScreen === "songs" && <SmallText>{song.category}</SmallText>}

          {currentScreen === "home" && (
            <Pressable
              onPress={() => setShowDeleteModal(true)}
              style={styles.iconContainer}
            >
              <Icon
                size={16}
                name="close"
                type="material-community"
                color={colors.red}
              />
            </Pressable>
          )}
        </View>
      </Pressable>
      <View style={{ marginBottom: 12 }} />
      {showDeleteModal && (
        <ConfirmModal
          message={"Are you sure you want to remove this song from favorites?"}
          showModal={showDeleteModal}
          hideModal={() => setShowDeleteModal(false)}
          button1Action={() => handleRemoveSong()}
        />
      )}
    </View>
  );
};

export default SongListItem;

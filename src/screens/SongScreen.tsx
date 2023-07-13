import { View, StyleSheet, Pressable, Linking, FlatList } from "react-native";
import { BoldText, HeaderText, colors } from "../theme/theme";
import Spacer from "../components/Spacer";
import GoBack from "../components/GoBack";
import { useContext, useEffect, useState } from "react";
import { Icon } from "@rneui/base";
import SongInfoModal from "../components/SongInfoModal";
import { AppContext } from "../contexts/appContext";
import { deleteSongData, getSong, getSongs } from "../services/SongService";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { deleteObject, getDownloadURL, ref } from "firebase/storage";
import { audioStorageFolder, storage } from "../../firebaseConfig";
import ConfirmModal from "../components/ConfirmModal";
import Toast from "react-native-root-toast";
import SongInfoContainer from "../components/SongInfoContainer";
import { addSongToFavorites } from "../services/UserService";
import CommentListItem from "../components/CommentListItem";
import AddCommentModal from "../components/AddCommentModal";
import { SongComment } from "../models/Song";
import moment from "moment";
import { sortDates } from "../utilities/dateUtilities";

const SongScreen = () => {
  const navigation = useNavigation();

  const { state, dispatch } = useContext(AppContext);
  const [changeButtonColor, setChangeButtonColor] = useState(false);
  const [showSongInfo, setShowSongInfo] = useState(false);
  const [songURL, setSongURL] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddCommentModal, setShowAddCommentModal] = useState(false);
  const [comments, setComments] = useState<SongComment[]>([]);
  const audioFileTitle: string = state.selectedSong.audioFileName ?? "";

  const audioRef = ref(storage, `${audioStorageFolder}`);
  const songRef = ref(audioRef, `/${audioFileTitle ? audioFileTitle : ""}`);

  const getSongUrl = async () => {
    await getDownloadURL(songRef).then((convertedURL) => {
      setSongURL(convertedURL);
    });
  };

  useEffect(() => {
    getSongUrl();
    if (state.selectedSong.comments && state.selectedSong.comments.length > 0) {
      const sortedComments = sortDates(state.selectedSong.comments);

      setComments(sortedComments);
    }
  }, []);

  const reloadSongs = async () => {
    getSongs().then((response) => {
      if (response.length > 0) {
        response.sort((a, b) => {
          if (a.title < b.title) return -1;
          if (a.title > b.title) return 1;
          return 0;
        });
        dispatch({
          type: "Songs",
          payload: response,
        });
      } else {
        alert("error loading songs");
      }
    });
  };

  const updateComments = async () => {
    await getSong(state.selectedSong.documentId).then((res) => {
      const sortedComments = sortDates(res.comments);
      setComments(sortedComments);
      dispatch({
        type: "SelectedSong",
        payload: res,
      });
    });
  };

  const openSongURL = () => {
    if (songURL) Linking.openURL(songURL);
  };

  const handleDelete = async () => {
    setShowDeleteModal(false);
    await deleteObject(songRef);
    await deleteSongData(state.selectedSong.documentId);
    await reloadSongs();
    navigation.goBack();
    Toast.show("Song deleted!", {
      position: 60,
    });
  };

  const handleAddSong = async () => {
    await addSongToFavorites(state.user.userEmail, state.selectedSong);
    Toast.show("Song was added!", {
      position: 0,
    });
  };

  const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    },
    songInfoContainer: {
      borderWidth: 1,
      padding: 16,
      borderRadius: 10,
      alignItems: "center",
      backgroundColor: "white",
    },
    shadowProp: {
      shadowColor: "#171717",
      shadowOffset: { width: 4, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
    songInfoRow: {
      flexDirection: "row",
      width: 280,
      marginVertical: 10,
    },
    notesContainer: {
      alignSelf: "flex-start",
      borderColor: "696969",
      width: 280,
      height: state.selectedSong.notes.length > 10 ? 120 : 40,
      padding: 4,
      borderRadius: 5,
    },
    playButton: {
      borderColor: "black",
      borderWidth: 2,
      borderRadius: 10,
      padding: 10,
      backgroundColor: changeButtonColor ? colors.red : colors.blue,
      marginHorizontal: 8,
    },
    flatlistContainer: {
      width: "90%",
      marginTop: 20,
      flex: 1,
    },
    flatlistHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
      alignItems: "center",
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <GoBack />
      <Spacer />
      <BoldText color={colors.red} size={20}>
        Song Info:
      </BoldText>
      <HeaderText size={28}>
        {state.selectedSong.title && state.selectedSong.title}
      </HeaderText>
      <Spacer />
      <SongInfoContainer songURL={songURL} openSongURL={() => openSongURL()} />
      <Spacer height={20} />
      <View style={{ flexDirection: "row" }}>
        <Pressable
          style={[styles.songInfoContainer, styles.shadowProp]}
          onPress={() => {
            setShowDeleteModal(true);
          }}
        >
          <Icon name="delete" type="ant-design" color={colors.red} />
        </Pressable>
        <Spacer width={10} />
        <Pressable
          style={[styles.songInfoContainer, styles.shadowProp]}
          onPress={() => setShowSongInfo(true)}
        >
          <Icon name="edit-2" type="feather" color={colors.red} />
        </Pressable>
        <Spacer width={10} />
        <Pressable
          style={[styles.songInfoContainer, styles.shadowProp]}
          onPress={() => handleAddSong()}
        >
          <Icon name="heart" type="feather" color={colors.red} />
        </Pressable>
        <Spacer width={10} />
        <Pressable
          style={[styles.songInfoContainer, styles.shadowProp]}
          onPress={() => {
            dispatch({
              type: "LoadedSong",
              payload: state.selectedSong,
            });
            navigation.navigate("PlayerTab" as never);
          }}
          onPressIn={() => setChangeButtonColor(true)}
          onPressOut={() => setChangeButtonColor(false)}
        >
          <Icon
            name="play-circle"
            type="feather"
            color={!changeButtonColor ? colors.green : colors.black}
          />
        </Pressable>
      </View>
      <Spacer height={10} />

      <View style={styles.flatlistContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={comments}
          ListHeaderComponent={() => {
            return (
              <View style={styles.flatlistHeader}>
                <HeaderText size={24}>Comments</HeaderText>
                <Pressable onPress={() => setShowAddCommentModal(true)}>
                  <Icon
                    name="add-comment"
                    type="material"
                    color={colors.red}
                    size={30}
                  />
                </Pressable>
              </View>
            );
          }}
          renderItem={(item) => (
            <CommentListItem comment={item.item} id={item.index} />
          )}
        />
      </View>
      {showAddCommentModal && (
        <AddCommentModal
          showModal={showAddCommentModal}
          hideModal={() => setShowAddCommentModal(false)}
          reloadData={() => {
            reloadSongs();
            updateComments();
          }}
        />
      )}
      {showSongInfo && (
        <SongInfoModal
          showModal={showSongInfo}
          hideModal={() => setShowSongInfo(false)}
          reloadSongs={() => reloadSongs()}
        />
      )}
      {showDeleteModal && (
        <ConfirmModal
          showModal={showDeleteModal}
          message={"Are you sure you want to delete this song?"}
          hideModal={() => setShowDeleteModal(false)}
          button1Action={() => handleDelete()}
        />
      )}
    </SafeAreaView>
  );
};

export default SongScreen;

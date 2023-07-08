import { View, StyleSheet, Pressable, Linking } from "react-native";
import {
  BoldText,
  HeaderText,
  LinkText,
  NormalText,
  SmallText,
  colors,
} from "../theme/theme";
import Spacer from "../components/Spacer";
import GoBack from "../components/GoBack";
import { useContext, useEffect, useState } from "react";
import { Icon } from "@rneui/base";
import SongInfoModal from "../components/SongInfoModal";
import { AppContext } from "../contexts/appContext";
import { deleteSongData, getSongs } from "../services/SongService";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { deleteObject, getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebaseConfig";
import ConfirmModal from "../components/ConfirmModal";
import Toast from "react-native-root-toast";

const SongScreen = () => {
  const navigation = useNavigation();

  const { state, dispatch } = useContext(AppContext);
  const [changeButtonColor, setChangeButtonColor] = useState(false);
  const [showSongInfo, setShowSongInfo] = useState(false);
  const [songURL, setSongURL] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const audioFileTitle: string = state.selectedSong.audioFileName ?? "";

  const audioRef = ref(storage, "audio");
  const songRef = ref(audioRef, `/${audioFileTitle ? audioFileTitle : ""}`);

  const getSongUrl = async () => {
    await getDownloadURL(songRef).then((convertedURL) => {
      setSongURL(convertedURL);
    });
  };

  useEffect(() => {
    getSongUrl();
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
  });

  return (
    <SafeAreaView style={styles.container}>
      <GoBack />
      <Spacer />
      <BoldText color={colors.red} size={20}>
        Song Info:
      </BoldText>
      <HeaderText>
        {state.selectedSong.title && state.selectedSong.title}
      </HeaderText>
      <Spacer />
      <View style={[styles.songInfoContainer, styles.shadowProp]}>
        <View style={styles.songInfoRow}>
          <BoldText>Recorded Date: </BoldText>
          <NormalText>
            {state.selectedSong.recordedDate
              ? state.selectedSong.recordedDate
              : "N/A"}
          </NormalText>
        </View>
        <View style={styles.songInfoRow}>
          <BoldText>Category: </BoldText>
          <NormalText>{state.selectedSong.category}</NormalText>
        </View>
        {songURL && (
          <Pressable
            style={[styles.songInfoRow, { flexDirection: "column" }]}
            onPress={() => openSongURL()}
          >
            <BoldText>Link to audio source: </BoldText>
            <LinkText size={12}>{state.selectedSong.audioFileName}</LinkText>
          </Pressable>
        )}

        <View style={styles.songInfoRow}>
          <BoldText>Notes: </BoldText>
        </View>
        <View style={styles.notesContainer}>
          <SmallText>
            {state.selectedSong.notes
              ? state.selectedSong.notes
              : "Add notes here you bitch."}
          </SmallText>
        </View>
        <View
          style={{
            width: 290,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <View>
            {state.selectedSong.uploadedBy && (
              <SmallText size={10}>
                Uploaded by {state.selectedSong.uploadedBy}
              </SmallText>
            )}
            {state.selectedSong.lastModifiedBy &&
            state.selectedSong.lastModifiedDate ? (
              <SmallText size={10}>
                Last modified by {state.selectedSong.lastModifiedBy} on{" "}
                {state.selectedSong.lastModifiedDate}
              </SmallText>
            ) : (
              <SmallText size={10}> </SmallText>
            )}
          </View>
        </View>
      </View>
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
          onPress={() => console.log("adf")}
        >
          <Icon name="add" type="ionicons" color={colors.red} />
        </Pressable>
      </View>
      <Spacer height={30} />
      <View>
        <Pressable
          onPress={() => {
            dispatch({
              type: "LoadedSong",
              payload: state.selectedSong,
            });
            navigation.navigate("PlayerTab" as never);
          }}
          onPressIn={() => setChangeButtonColor(true)}
          onPressOut={() => setChangeButtonColor(false)}
          style={[]}
        >
          <Icon
            name="play-circle"
            type="feather"
            size={100}
            color={!changeButtonColor ? colors.green : colors.black}
          />
        </Pressable>
      </View>
      {showSongInfo && (
        <SongInfoModal
          showModal={showSongInfo}
          hideModal={() => setShowSongInfo(false)}
          reloadSongs={() => reloadSongs()}
        />
      )}
      {showDeleteModal && (
        <ConfirmModal
          type={"delete"}
          showModal={showDeleteModal}
          hideModal={() => setShowDeleteModal(false)}
          button1Action={() => handleDelete()}
        />
      )}
    </SafeAreaView>
  );
};

export default SongScreen;

import { View, Pressable, StyleSheet, ScrollView } from "react-native";
import { Icon, Input } from "@rneui/themed";
import { HeaderText, NormalText } from "../theme/theme";
import Spacer from "./Spacer";
import { useContext, useReducer, useState } from "react";
import { Song } from "../models/Song";
import { AppContext } from "../contexts/appContext";
import Modal from "react-native-modal";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

interface SongInfoModalProps {
  showModal: boolean;
  hideModal: () => void;
  reloadSongs: () => void;
}

const editSongReducer = (state: Song, action) => {
  switch (action.type) {
    case "title":
      return { ...state, title: action.payload };
    case "recordedDate":
      return { ...state, recordedDate: action.payload };
    case "category":
      return { ...state, category: action.payload };
    case "notes":
      return { ...state, notes: action.payload };
    default:
      return state;
  }
};

const SongInfoModal = ({
  showModal,
  hideModal,
  reloadSongs,
}: SongInfoModalProps) => {
  const { state, dispatch } = useContext(AppContext);
  const selectedSong = state.selectedSong;

  const [songState, songDispatch] = useReducer(editSongReducer, {
    id: selectedSong.id,
    title: selectedSong.title,
    recordedDate: selectedSong.recordedDate,
    category: selectedSong.category,
    image: selectedSong.image,
    notes: selectedSong.notes,
    audioFileName: selectedSong.audioFileName,
    documentId: selectedSong.documentId,
    lastModifiedBy: state.user.userDisplayName,
    lastModifiedDate: new Date(),
  });
  const [changeButtonColor, setChangeButtonColor] = useState(false);

  // NOT SURE IF I NEED THIS
  const resetForm = () => {};

  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      marginTop: 40,
    },
    modalView: {
      alignSelf: "center",
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      paddingHorizontal: 40,
      paddingVertical: 30,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      borderWidth: 2,
      width: "96%",
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
    },
    input: {
      height: 50,
      width: 200,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    saveButton: {
      borderColor: "grey",
      borderWidth: 2,
      borderRadius: 10,
      padding: 10,
      backgroundColor: changeButtonColor ? "grey" : "white",
      marginHorizontal: 8,
    },
    buttonContainer: {
      flexDirection: "row",
    },
    headerView: {
      alignItems: "center",
      textAlign: "center",
    },
    inputContainerStyle: {
      borderWidth: 1,
      paddingHorizontal: 8,
      marginTop: 4,
    },
  });

  const handleSave = async () => {
    await setDoc(doc(db, "songs", `${selectedSong.documentId}`), {
      id: songState.id,
      title: songState.title,
      recordedDate: songState.recordedDate,
      category: songState.category,
      image: songState.image,
      notes: songState.notes,
      audioFileName: songState.audioFileName,
      lastModifiedBy: state.user.userDisplayName,
      lastModifiedDate: new Date(),
    })
      .then(() => {
        dispatch({
          type: "SelectedSong",
          payload: songState,
        });
        alert("Save Sucessful");
        hideModal();
        reloadSongs();
      })
      .catch((error) => {
        alert("An error occurred, save was unsuccessful");
      });
  };

  const saveButton = () => {
    return (
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.saveButton}
          onPressIn={() => setChangeButtonColor(true)}
          onPressOut={() => setChangeButtonColor(false)}
          onPress={() => handleSave()}
        >
          <NormalText>Save</NormalText>
        </Pressable>
      </View>
    );
  };

  return (
    <Modal
      avoidKeyboard={true}
      isVisible={showModal}
      style={styles.centeredView}
      hasBackdrop={false}
    >
      <ScrollView>
        <Pressable
          onPress={() => {
            hideModal();
            resetForm();
          }}
          style={{
            alignSelf: "flex-end",
            right: 20,
            top: 60,
            zIndex: 1,
          }}
        >
          <Icon name="closecircle" type="ant-design" size={30} color="black" />
        </Pressable>
        <View style={styles.modalView}>
          <View style={styles.headerView}>
            <HeaderText>{state.selectedSong.title}</HeaderText>
          </View>

          <Spacer />
          <Input
            label={"Title"}
            placeholder="Title"
            inputContainerStyle={styles.inputContainerStyle}
            value={songState.title}
            onChangeText={(value) => {
              songDispatch({
                type: "title",
                payload: value,
              });
            }}
          />
          <Input
            label={"Recorded Date"}
            placeholder="MM/DD/YYYY"
            inputContainerStyle={styles.inputContainerStyle}
            value={songState.recordedDate}
            onChangeText={(value) => {
              songDispatch({
                type: "recordedDate",
                payload: value,
              });
            }}
          />
          <Input
            label={"Category"}
            placeholder="Category"
            inputContainerStyle={styles.inputContainerStyle}
            value={songState.category}
            onChangeText={(value) => {
              songDispatch({
                type: "category",
                payload: value,
              });
            }}
          />
          <Input
            multiline
            label={"Notes"}
            inputContainerStyle={[styles.inputContainerStyle]}
            value={songState.notes}
            onChangeText={(value) => {
              songDispatch({
                type: "notes",
                payload: value,
              });
            }}
          />
          <Spacer />
          {saveButton()}
        </View>
      </ScrollView>
    </Modal>
  );
};

export default SongInfoModal;

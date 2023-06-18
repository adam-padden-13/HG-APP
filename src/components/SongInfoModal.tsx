import { View, Pressable, StyleSheet, Modal, TextInput } from "react-native";
import { Icon } from "@rneui/themed";
import { HeaderText, NormalText } from "../theme/theme";
import Spacer from "./Spacer";
import { useState } from "react";
import { Song } from "../models/Song";

interface SongInfoModalProps {
  showModal: boolean;
  hideModal: () => void;
  song: Song;
}

const SongInfoModal = ({ showModal, hideModal, song }: SongInfoModalProps) => {
  const [changeButtonColor, setChangeButtonColor] = useState(false);

  // FORM FIELDS
  const [updateTitle, setUpdateTitle] = useState(song.title);
  const [updateRecordedDate, setUpdateRecordedDate] = useState(
    song.recordedDate
  );
  const [updateCategory, setUpdateCategory] = useState(song.category);
  const [updateNotes, setUpdateNotes] = useState(song.notes);
  const [updatedSong, setUpdatedSong] = useState<Song>({
    id: song.id,
    title: updateTitle,
    recordedDate: updateRecordedDate,
    category: updateCategory,
    image: "",
    notes: updateNotes,
    audioFileName: song.audioFileName,
  });

  // NOT SURE IF I NEED THIS
  const resetForm = () => {};

  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      alignItems: "center",
      marginTop: 100,
    },
    modalView: {
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
      width: "80%",
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
  });

  const saveButton = () => {
    return (
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.saveButton}
          onPressIn={() => setChangeButtonColor(true)}
          onPressOut={() => setChangeButtonColor(false)}
          onPress={() => console.log("hello")}
        >
          <NormalText>Save</NormalText>
        </Pressable>
      </View>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      onRequestClose={hideModal}
    >
      <View style={styles.centeredView}>
        <Pressable
          onPress={() => {
            hideModal();
            resetForm();
          }}
          style={{
            alignSelf: "flex-end",
            right: 50,
            top: 50,
            zIndex: 1,
          }}
        >
          <Icon name="closecircle" type="ant-design" size={20} color="black" />
        </Pressable>
        <View style={styles.modalView}>
          <View style={styles.headerView}>
            <HeaderText>Song Name</HeaderText>
          </View>

          <Spacer />
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={updateTitle}
            onChangeText={setUpdateTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Recorded Date"
            value={updateRecordedDate}
            onChangeText={setUpdateRecordedDate}
          />
          <TextInput
            style={styles.input}
            placeholder="Category"
            value={updateCategory}
            onChangeText={setUpdateCategory}
          />
          <TextInput
            style={styles.input}
            placeholder="Notes"
            value={updateNotes}
            onChangeText={setUpdateNotes}
          />
          <Spacer />
          {saveButton()}
        </View>
      </View>
    </Modal>
  );
};

export default SongInfoModal;

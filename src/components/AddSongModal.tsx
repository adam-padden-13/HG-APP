import {
  View,
  Pressable,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Icon, Input } from "@rneui/themed";
import { HeaderText, LinkText, NormalText, colors } from "../theme/theme";
import Spacer from "./Spacer";
import { useContext, useReducer, useState } from "react";
import { Song } from "../models/Song";
import { AppContext } from "../contexts/appContext";
import Modal from "react-native-modal";
import { addDoc, collection } from "firebase/firestore";
import { db, songCollection, storage } from "../../firebaseConfig";
import moment from "moment";
import Toast from "react-native-root-toast";
import { FirebaseError } from "firebase/app";
import { ref, uploadBytesResumable } from "firebase/storage";
import * as DocumentPicker from "expo-document-picker";

interface AddSongModalProps {
  showModal: boolean;
  hideModal: () => void;
  reloadSongs?: () => void;
}

const addSongReducer = (state: Song, action) => {
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

const AddSongModal = ({
  showModal,
  hideModal,
  reloadSongs,
}: AddSongModalProps) => {
  const { state } = useContext(AppContext);
  const today = moment().format("MM-DD-YYYY");
  const [changeButtonColor, setChangeButtonColor] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showUploadFileScreen, setShowUploadFileScreen] = useState(true);
  const [fileToUpload, setFileToUpload] =
    useState<DocumentPicker.DocumentResult>();

  const initialState: Song = {
    id: state.songs.length + 1,
    title: "",
    recordedDate: "",
    category: "",
    image: "",
    notes: "",
    audioFileName: "",
    documentId: null,
    lastModifiedBy: "",
    lastModifiedDate: today,
  };

  const [songState, songDispatch] = useReducer(addSongReducer, initialState);

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
      backgroundColor: changeButtonColor ? colors.red : colors.white,
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
    if (songState.title && songState.category && songState.recordedDate) {
      setShowLoader(true);
      await addDoc(collection(db, `${songCollection}`), {
        id: songState.id,
        title: songState.title,
        recordedDate: songState.recordedDate,
        category: songState.category,
        image: songState.image,
        notes: songState.notes,
        audioFileName: fileToUpload.type === "success" && fileToUpload.name,
        lastModifiedBy: state.user.userDisplayName,
        lastModifiedDate: today,
      })
        .then(() => {
          Toast.show("Save Successful!", {
            position: 0,
          });
          reloadSongs();
          setShowLoader(false);
          hideModal();
        })
        .catch((error: FirebaseError) => {
          setShowLoader(false);
          hideModal();
          alert("An error occurred, save was unsuccessful");
        });
    } else {
      Toast.show("Please enter required info", {
        position: 60,
        backgroundColor: colors.red,
      });
    }
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

  const handleOpenDocPicker = () => {
    DocumentPicker.getDocumentAsync({
      type: ["audio/x-m4a", "audio/mpeg"],
    }).then((result: DocumentPicker.DocumentResult) => {
      if (result.type === "success") setFileToUpload(result);
    });
  };

  const handleUploadAudio = async (
    audioFile: DocumentPicker.DocumentResult
  ) => {
    Toast.show("Upload in progress...", {
      position: 60,
    });
    if (audioFile.type === "success") {
      try {
        setShowLoader(true);
        const audioFileRef = ref(storage, `audio/${audioFile.name}`);

        const fetchResponse = await fetch(audioFile.uri);
        const blob = await fetchResponse.blob();

        if (blob) {
          await uploadBytesResumable(audioFileRef, blob).then((snapshot) => {
            Toast.show("Upload success!", {
              position: 0,
            });
            setShowLoader(false);
            setShowUploadFileScreen(false);
          });
        }
      } catch (error) {
        console.log(error);
        alert(error);
        setShowLoader(false);
      }
    }
  };
  const SelectFile = () => {
    return (
      <View style={styles.modalView}>
        {fileToUpload && fileToUpload.type === "success" ? (
          <>
            <View style={styles.headerView}>
              <HeaderText>Upload Audio</HeaderText>
            </View>
            <Spacer />
            <LinkText>{fileToUpload.name} </LinkText>
            <Spacer />
            <View style={styles.buttonContainer}>
              <Pressable
                style={[
                  styles.saveButton,
                  {
                    backgroundColor: colors.green,
                    borderColor: colors.black,
                  },
                ]}
                onPress={() => handleUploadAudio(fileToUpload)}
              >
                <NormalText color={colors.white}>Upload</NormalText>
              </Pressable>
            </View>
          </>
        ) : (
          <>
            <View style={styles.headerView}>
              <HeaderText>Upload Audio</HeaderText>
              <Spacer height={10} />
            </View>
            <Spacer />
            <View style={styles.buttonContainer}>
              <Pressable
                style={styles.saveButton}
                onPress={() => handleOpenDocPicker()}
              >
                <NormalText>Select File</NormalText>
              </Pressable>
            </View>
          </>
        )}
      </View>
    );
  };

  const SongForm = () => {
    return (
      <View style={styles.modalView}>
        <View style={styles.headerView}>
          <NormalText>Add Song</NormalText>
          <Spacer height={10} />
          <LinkText>
            {fileToUpload &&
              fileToUpload.type === "success" &&
              fileToUpload.name}
          </LinkText>
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
        {showUploadFileScreen && (
          <Pressable
            onPress={() => {
              hideModal();
            }}
            style={{
              alignSelf: "flex-end",
              right: 20,
              top: 60,
              zIndex: 1,
            }}
          >
            <Icon
              name="closecircle"
              type="ant-design"
              size={30}
              color="black"
            />
          </Pressable>
        )}

        {showLoader ? (
          <View style={{ height: 400, justifyContent: "center" }}>
            <ActivityIndicator size="large" color={colors.black} />
          </View>
        ) : showUploadFileScreen ? (
          <SelectFile />
        ) : (
          <SongForm />
        )}
      </ScrollView>
    </Modal>
  );
};

export default AddSongModal;

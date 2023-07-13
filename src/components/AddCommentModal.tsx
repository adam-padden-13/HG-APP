import { View, Pressable, StyleSheet, Modal } from "react-native";
import { NormalText, colors } from "../theme/theme";
import Spacer from "./Spacer";
import { useContext, useState } from "react";
import { Input } from "@rneui/themed";
import { AppContext } from "../contexts/appContext";
import { addComment } from "../services/SongService";
import Toast from "react-native-root-toast";
import moment from "moment";

interface AddCommentModalProps {
  showModal: boolean;
  hideModal: () => void;
  reloadData: () => void;
}

const AddCommentModal = ({
  showModal,
  hideModal,
  reloadData,
}: AddCommentModalProps) => {
  const { state } = useContext(AppContext);
  const [changeButtonColor1, setChangeButton1Color] = useState(false);
  const [changeButtonColor2, setChangeButton2Color] = useState(false);
  const [comment, setComment] = useState("");
  const currentTime = moment().format("MM-DD-YYYY, hh:mm a");

  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      alignItems: "center",
      marginTop: "60%",
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
    button: {
      borderColor: "grey",
      borderWidth: 2,
      borderRadius: 10,
      padding: 10,
      marginHorizontal: 8,
    },
    buttonOnPress: {},
    buttonContainer: {
      flexDirection: "row",
    },
  });

  const handleAddComment = async () => {
    await addComment(state.user.userEmail, state.selectedSong, {
      author: state.user.userDisplayName,
      comment: comment,
      date: currentTime,
    });
    hideModal();
    reloadData();
    Toast.show("Comment was added!", {
      position: 0,
    });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      onRequestClose={hideModal}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Input
            multiline
            label={"Add New Comment"}
            // inputContainerStyle={[styles.inputContainerStyle]}
            value={comment}
            onChangeText={(value) => {
              setComment(value);
            }}
          />
          <Spacer />
          <View style={styles.buttonContainer}>
            <Pressable
              style={[
                styles.button,
                {
                  backgroundColor: changeButtonColor1
                    ? colors.green
                    : colors.white,
                },
              ]}
              onPressIn={() => setChangeButton1Color(true)}
              onPressOut={() => setChangeButton1Color(false)}
              onPress={() => handleAddComment()}
            >
              <NormalText>Save</NormalText>
            </Pressable>
            <Pressable
              style={[
                styles.button,
                {
                  backgroundColor: changeButtonColor2
                    ? colors.grey
                    : colors.white,
                },
              ]}
              onPressIn={() => setChangeButton2Color(true)}
              onPressOut={() => setChangeButton2Color(false)}
              onPress={hideModal}
            >
              <NormalText>Cancel</NormalText>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddCommentModal;

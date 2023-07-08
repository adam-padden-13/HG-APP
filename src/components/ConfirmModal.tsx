import { View, Pressable, StyleSheet, Modal } from "react-native";
import { NormalText, colors } from "../theme/theme";
import Spacer from "./Spacer";
import { useState } from "react";

interface ConfirmModalProps {
  showModal: boolean;
  hideModal: () => void;
  type: string;
  button1Action?: () => void;
  button2Action?: () => void;
}

const ConfirmModal = ({
  showModal,
  hideModal,
  button1Action,
  button2Action,
}: ConfirmModalProps) => {
  const [changeButtonColor1, setChangeButton1Color] = useState(false);
  const [changeButtonColor2, setChangeButton2Color] = useState(false);

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

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      onRequestClose={hideModal}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <NormalText>Are you sure you want to delete this song?</NormalText>
          <Spacer />
          <View style={styles.buttonContainer}>
            <Pressable
              style={[
                styles.button,
                { backgroundColor: changeButtonColor1 ? colors.green : colors.white },
              ]}
              onPressIn={() => setChangeButton1Color(true)}
              onPressOut={() => setChangeButton1Color(false)}
              onPress={button1Action}
            >
              <NormalText>Confirm</NormalText>
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

export default ConfirmModal;

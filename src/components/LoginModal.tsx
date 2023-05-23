import { View, Text, Pressable, StyleSheet, Modal } from "react-native";
import { Icon } from "@rneui/themed";

interface LoginModalProps {
  showModal: boolean;
  hideModal: () => void;
}

const LoginModal = ({ showModal, hideModal }: LoginModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      onRequestClose={hideModal}
    >
      <View style={styles.centeredView}>
        <Pressable onPress={hideModal} style={{alignSelf: 'flex-end', right: 60, top: 68, zIndex: 1}}>
          <Icon
            name="closecircle"
            type="ant-design"
            size={30}
            color="black"
            style={{}}
          />
        </Pressable>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Hello World!</Text>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 100,
    paddingVertical: 160,
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
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default LoginModal;

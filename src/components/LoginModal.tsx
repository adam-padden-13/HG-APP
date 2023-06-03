import { View, Pressable, StyleSheet, Modal, TextInput } from "react-native";
import { Icon } from "@rneui/themed";
import { HeaderText, LinkText, NormalText } from "../theme/theme";
import Spacer from "./Spacer";
import { useState } from "react";
import { auth } from "../../firebaseConfig";
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

interface LoginModalProps {
  showModal: boolean;
  hideModal: () => void;
}
enum AuthType {
  login = "Login",
  createAccount = "Create Account",
}

const LoginModal = ({ showModal, hideModal }: LoginModalProps) => {
  const [user, setUser] = useState<User>();
  const [changeButtonColor, setChangeButtonColor] = useState(false);
  const [authType, setAuthType] = useState<AuthType>(AuthType.login);
  const [showUpdateInfo, setShowUpdateInfo] = useState(false);

  // FORM FIELDS
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const resetForm = () => {
    setAuthType(AuthType.login);
    setShowUpdateInfo(false);
    setEmail("");
    setPassword("");
    setDisplayName("");
  };

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
    input: {
      height: 50,
      width: 200,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    submitButton: {
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

  const handleCreateNewUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("Account created!");
        setUser(userCredential.user);
        setShowUpdateInfo(true);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleUpdateUser = () => {
    updateProfile(user, { displayName })
      .then(() => {
        alert(`Thanks ${displayName}!`);
        setShowUpdateInfo(false);
        resetForm();
        hideModal();
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("SIGNED IN");
        setUser(userCredential.user);
        resetForm();
        hideModal();
      })
      .catch((error) => {
        alert(error);
      });
  };

  const submitButton = () => {
    return (
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.submitButton}
          onPressIn={() => setChangeButtonColor(true)}
          onPressOut={() => setChangeButtonColor(false)}
          onPress={() =>
            !showUpdateInfo
              ? authType === AuthType.login
                ? handleLogin()
                : handleCreateNewUser()
              : displayName
              ? handleUpdateUser()
              : alert("Please enter a display name")
          }
        >
          <NormalText>Submit</NormalText>
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
        {!showUpdateInfo && (
          <Pressable
            onPress={() => {
              hideModal();
              resetForm();
            }}
            style={{
              alignSelf: "flex-end",
              right: 60,
              top: 68,
              zIndex: 1,
              margin: 0,
            }}
          >
            <Icon
              name="closecircle"
              type="ant-design"
              size={30}
              color="black"
              style={{}}
            />
          </Pressable>
        )}
        {!showUpdateInfo ? (
          <View style={styles.modalView}>
            {authType === AuthType.login ? (
              <View style={styles.headerView}>
                <HeaderText>Login</HeaderText>
                <NormalText>or</NormalText>
                <Pressable onPress={() => setAuthType(AuthType.createAccount)}>
                  <LinkText>Create Account</LinkText>
                </Pressable>
              </View>
            ) : (
              <View style={styles.headerView}>
                <HeaderText>Create Account</HeaderText>
                <NormalText>or</NormalText>
                <Pressable onPress={() => setAuthType(AuthType.login)}>
                  <LinkText>Login</LinkText>
                </Pressable>
              </View>
            )}
            <Spacer />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
            />
            <Spacer />
            {submitButton()}
          </View>
        ) : (
          <View style={styles.modalView}>
            <HeaderText>Update Info</HeaderText>
            <TextInput
              style={styles.input}
              placeholder="Display Name"
              value={displayName}
              onChangeText={setDisplayName}
            />
            {submitButton()}
          </View>
        )}
      </View>
    </Modal>
  );
};

export default LoginModal;
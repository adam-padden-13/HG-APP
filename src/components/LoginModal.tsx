import { View, Pressable, StyleSheet, Modal, TextInput } from "react-native";
import { Icon } from "@rneui/themed";
import {
  HeaderText,
  LinkText,
  NormalText,
  SmallText,
  colors,
} from "../theme/theme";
import Spacer from "./Spacer";
import { useContext, useEffect, useState } from "react";
import { auth } from "../../firebaseConfig";
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { AppContext } from "../contexts/appContext";
import Toast from "react-native-root-toast";
import { FirebaseError } from "firebase/app";
import * as SecureStore from "expo-secure-store";
import { SavedCredKeys } from "../utilities/stringUtilities";

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
  const [showError, setShowError] = useState(false);

  const { state, dispatch } = useContext(AppContext);

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

  useEffect(() => {
    getCreds(SavedCredKeys.email, SavedCredKeys.password);
  }, []);

  const getCreds = async (key1: string, key2: string) => {
    const savedEmail = await SecureStore.getItemAsync(key1);
    const savedPassword = await SecureStore.getItemAsync(key2);

    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
    }
  };

  const saveCreds = async (key: string, value: string) => {
    await SecureStore.setItemAsync(key, value);
  };

  const handleCreateNewUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        Toast.show("Account Created!", {
          position: 60,
        });
        saveCreds(SavedCredKeys.email, email);
        saveCreds(SavedCredKeys.password, password);
        setUser(userCredential.user);
        dispatch({
          type: "User",
          payload: {
            userDisplayName: userCredential.user.displayName,
            userEmail: userCredential.user.email,
          },
        });
        setShowUpdateInfo(true);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleUpdateUser = () => {
    updateProfile(user, { displayName })
      .then(() => {
        dispatch({
          type: "User",
          payload: {
            userDisplayName: user.displayName,
            userEmail: user.email,
          },
        });
        Toast.show(`Thanks, ${displayName}!`, {
          position: 60,
        });
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
        saveCreds(SavedCredKeys.email, email);
        saveCreds(SavedCredKeys.password, password);
        Toast.show("Signed in!", {
          position: 60,
        });
        dispatch({
          type: "User",
          payload: {
            userDisplayName: userCredential.user.displayName,
            userEmail: userCredential.user.email,
          },
        });
        resetForm();
        hideModal();
      })
      .catch((error: FirebaseError) => {
        alert(error.message);
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
              : setShowError(true)
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
              right: 50,
              top: 50,
              zIndex: 1,
              margin: 0,
            }}
          >
            <Icon
              name="closecircle"
              type="ant-design"
              size={20}
              color="black"
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
              secureTextEntry
            />
            <Spacer />
            {submitButton()}
          </View>
        ) : (
          <View style={styles.modalView}>
            <HeaderText>Enter Display Name</HeaderText>
            <TextInput
              style={styles.input}
              placeholder="Display Name"
              value={displayName}
              onChangeText={setDisplayName}
            />
            {showError && (
              <SmallText color={colors.red} size={12}>
                Please enter a Display Name.
              </SmallText>
            )}
            <Spacer />
            {submitButton()}
          </View>
        )}
      </View>
    </Modal>
  );
};

export default LoginModal;

import { useContext, useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { AppContext } from "../contexts/appContext";
import Player from "../components/Player";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderText, NormalText } from "../theme/theme";
import Spacer from "../components/Spacer";

const PlayerScreen = ({ navigation }) => {
  const { state } = useContext(AppContext);
  const [changeButtonColor, setChangeButtonColor] = useState(false);

  const styles = StyleSheet.create({
    container: {
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    songInfoContainer: {
      borderWidth: 1,
      padding: 20,
      borderRadius: 10,
      alignItems: "center",
      backgroundColor: "white",
    },
    editIcon: { alignSelf: "flex-end", marginTop: 20 },
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
    goToSongButton: {
      borderColor: "grey",
      borderWidth: 2,
      borderRadius: 10,
      padding: 10,
      backgroundColor: changeButtonColor ? "grey" : "white",
      marginHorizontal: 8,
    },
  });

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {state.loadedSong && (
          <>
            <HeaderText>
              {state.loadedSong.title && state.loadedSong.title}
            </HeaderText>
            <Spacer />
            <Player />
            <Spacer height={40} />
            <Pressable
              onPress={() => {
                navigation.navigate("SongScreen", {
                  song: state.loadedSong,
                });
              }}
              onPressIn={() => setChangeButtonColor(true)}
              onPressOut={() => setChangeButtonColor(false)}
              style={[styles.goToSongButton, styles.shadowProp]}
            >
              <NormalText>Go back to Song Info</NormalText>
            </Pressable>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default PlayerScreen;

import { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { AppContext } from "../contexts/appContext";
import Player from "../components/Player";
import { SafeAreaView } from "react-native-safe-area-context";
import { BoldText, HeaderText, colors } from "../theme/theme";
import Spacer from "../components/Spacer";

const PlayerScreen = () => {
  const { state } = useContext(AppContext);
  const [changeButtonColor, setChangeButtonColor] = useState(false);

  const styles = StyleSheet.create({
    container: {
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.blue,
    },
    songInfoContainer: {
      borderWidth: 1,
      padding: 20,
      borderRadius: 10,
      alignItems: "center",
      backgroundColor: colors.white,
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
      backgroundColor: changeButtonColor ? "grey" : colors.white,
      marginHorizontal: 8,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      {state.loadedSong && (
        <>
          <BoldText color={colors.red} size={20}>
            Now Playing:
          </BoldText>
          <HeaderText color={colors.white}>
            {state.loadedSong.title && state.loadedSong.title}
          </HeaderText>
          <Spacer />
          <Player />
          <Spacer height={40} />
        </>
      )}
    </SafeAreaView>
  );
};

export default PlayerScreen;

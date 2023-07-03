import { View, StyleSheet, Pressable } from "react-native";
import {
  BoldText,
  HeaderText,
  NormalText,
  SmallText,
  colors,
} from "../theme/theme";
import Spacer from "../components/Spacer";
import GoBack from "../components/GoBack";
import { useContext, useState } from "react";
import { Icon } from "@rneui/base";
import SongInfoModal from "../components/SongInfoModal";
import { AppContext } from "../contexts/appContext";
import { getSongs } from "../services/SongService";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const SongScreen = () => {
  const navigation = useNavigation();

  const { state, dispatch } = useContext(AppContext);
  const [changeButtonColor, setChangeButtonColor] = useState(false);
  const [showSongInfo, setShowSongInfo] = useState(false);

  const reloadSongs = () => {
    getSongs().then((response) => {
      if (response.length > 0) {
        // setRefreshing(false);
        dispatch({
          type: "Songs",
          payload: response,
        });
      } else {
        alert("error loading songs");
      }
    });
  };

  const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    },
    songInfoContainer: {
      borderWidth: 1,
      padding: 16,
      borderRadius: 10,
      alignItems: "center",
      backgroundColor: "white",
    },
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
    notesContainer: {
      alignSelf: "flex-start",
      borderColor: "696969",
      width: 280,
      height: state.selectedSong.notes.length > 10 ? 120 : 40,
      padding: 4,
      borderRadius: 5,
    },
    playButton: {
      borderColor: "black",
      borderWidth: 2,
      borderRadius: 10,
      padding: 10,
      backgroundColor: changeButtonColor ? colors.red : colors.blue,
      marginHorizontal: 8,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <GoBack />
      <Spacer />
      <BoldText color={colors.red} size={20}>
        Song Info:
      </BoldText>
      <HeaderText>
        {state.selectedSong.title && state.selectedSong.title}
      </HeaderText>
      <Spacer />
      <Pressable
        style={[styles.songInfoContainer, styles.shadowProp]}
        onPress={() => setShowSongInfo(true)}
      >
        <View style={styles.songInfoRow}>
          <BoldText>Recorded Date: </BoldText>
          <NormalText>
            {state.selectedSong.recordedDate
              ? state.selectedSong.recordedDate
              : "N/A"}
          </NormalText>
        </View>
        <Spacer height={10} />
        <View style={styles.songInfoRow}>
          <BoldText>Category: </BoldText>

          <NormalText>{state.selectedSong.category}</NormalText>
        </View>
        <View style={styles.songInfoRow}>
          <BoldText>Notes: </BoldText>
        </View>
        <View style={styles.notesContainer}>
          <SmallText>
            {state.selectedSong.notes
              ? state.selectedSong.notes
              : "Add notes here you bitch."}
          </SmallText>
        </View>
        <View
          style={{
            width: 290,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          {state.selectedSong.lastModifiedBy &&
          state.selectedSong.lastModifiedDate ? (
            <SmallText size={10}>
              Last modified by {state.selectedSong.lastModifiedBy} on{" "}
              {state.selectedSong.lastModifiedDate}
            </SmallText>
          ) : (
            <SmallText size={10}> </SmallText>
          )}

          <Icon name="edit" type="feather" color={colors.red} />
        </View>
      </Pressable>
      <Spacer height={40} />
      <View>
        <Pressable
          onPress={() => {
            dispatch({
              type: "LoadedSong",
              payload: state.selectedSong,
            });
            navigation.navigate("PlayerTab" as never);
          }}
          onPressIn={() => setChangeButtonColor(true)}
          onPressOut={() => setChangeButtonColor(false)}
          style={[styles.playButton, styles.shadowProp]}
        >
          <NormalText color="white">Play Song</NormalText>
        </Pressable>
      </View>
      {showSongInfo && (
        <SongInfoModal
          showModal={showSongInfo}
          hideModal={() => setShowSongInfo(false)}
          reloadSongs={() => reloadSongs()}
        />
      )}
    </SafeAreaView>
  );
};

export default SongScreen;

import { useContext, useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { BoldText, LinkText, NormalText, SmallText } from "../theme/theme";
import { AppContext } from "../contexts/appContext";

interface SongInfoContainerProps {
  songURL: string;
  openSongURL: () => void;
}

const SongInfoContainer = ({
  songURL,
  openSongURL,
}: SongInfoContainerProps) => {
  const { state } = useContext(AppContext);

  const styles = StyleSheet.create({
    songInfoContainer: {
      borderWidth: 1,
      paddingHorizontal: 16,
      paddingBottom: 8,
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
  });
  return (
    <View style={[styles.songInfoContainer, styles.shadowProp]}>
      <View style={styles.songInfoRow}>
        <BoldText>Recorded Date: </BoldText>
        <NormalText>
          {state.selectedSong.recordedDate
            ? state.selectedSong.recordedDate
            : "N/A"}
        </NormalText>
      </View>
      <View style={styles.songInfoRow}>
        <BoldText>Category: </BoldText>
        <NormalText>{state.selectedSong.category}</NormalText>
      </View>
      {songURL && (
        <Pressable
          style={[styles.songInfoRow, { flexDirection: "column" }]}
          onPress={openSongURL}
        >
          <BoldText>Link to audio source: </BoldText>
          <LinkText size={12}>{state.selectedSong.audioFileName}</LinkText>
        </Pressable>
      )}

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
        <View>
          {state.selectedSong.uploadedBy && (
            <SmallText size={10}>
              Uploaded by {state.selectedSong.uploadedBy}
            </SmallText>
          )}
          {state.selectedSong.lastModifiedBy &&
          state.selectedSong.lastModifiedDate ? (
            <SmallText size={10}>
              Last modified by {state.selectedSong.lastModifiedBy} on{" "}
              {state.selectedSong.lastModifiedDate}
            </SmallText>
          ) : (
            <SmallText size={10}> </SmallText>
          )}
        </View>
      </View>
    </View>
  );
};

export default SongInfoContainer;

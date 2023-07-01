import { View, StyleSheet, Pressable } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/SongsStackNavigator";
import { BoldText, HeaderText, NormalText } from "../theme/theme";
import Spacer from "../components/Spacer";
import GoBack from "../components/GoBack";
import Player from "../components/Player";
import { useContext, useState } from "react";
import { Icon } from "@rneui/base";
import SongInfoModal from "../components/SongInfoModal";
import { AppContext } from "../contexts/appContext";
import { getSongs } from "../services/SongService";

type Props = NativeStackScreenProps<RootStackParamList, "SongScreen">;

const SongScreen = ({ navigation }: Props) => {
  const { state, dispatch } = useContext(AppContext);
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

  return (
    <View style={styles.container}>
      <GoBack navigation={navigation} />
      <Spacer />
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
        <View
          style={{
            alignSelf: "flex-start",
            borderWidth: 1,
            borderColor: "696969",
            width: 260,
            height: state.selectedSong.notes.length > 10 ? 100 : 40,
          }}
        >
          <NormalText>
            {state.selectedSong.notes ? state.selectedSong.notes : "N/A"}
          </NormalText>
        </View>

        <Icon
          name="edit"
          type="feather"
          color={"black"}
          style={styles.editIcon}
        />
      </Pressable>
      <Spacer height={40} />
      <Player song={state.selectedSong} />
      {showSongInfo && (
        <SongInfoModal
          showModal={showSongInfo}
          hideModal={() => setShowSongInfo(false)}
          reloadSongs={() => reloadSongs()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
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
});

export default SongScreen;

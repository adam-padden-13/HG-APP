import { View, StyleSheet, Pressable } from "react-native";
import { Audio } from "expo-av";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/SongsStackNavigator";
import { HeaderText, NormalText } from "../theme/theme";
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
        style={styles.songInfoContainer}
        onPress={() => setShowSongInfo(true)}
      >
        <NormalText>
          Recorded Date:
          {state.selectedSong.recordedDate
            ? state.selectedSong.recordedDate
            : "N/A"}
        </NormalText>
        <Spacer height={10} />
        <NormalText>Category: {state.selectedSong.category}</NormalText>
        <Spacer height={10} />
        <NormalText>
          Notes: {state.selectedSong.notes ? state.selectedSong.notes : "N/A"}
        </NormalText>
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
  },
  editIcon: { alignSelf: "flex-end", marginTop: 20 },
});

export default SongScreen;

import { View, StyleSheet, Pressable } from "react-native";
import { Audio } from "expo-av";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/SongsStackNavigator";
import { HeaderText, NormalText } from "../theme/theme";
import Spacer from "../components/Spacer";
import GoBack from "../components/GoBack";
import Player from "../components/Player";
import { useState } from "react";
import { Icon } from "@rneui/base";
import SongInfoModal from "../components/SongInfoModal";

const player = new Audio.Sound();
type Props = NativeStackScreenProps<RootStackParamList, "SongScreen">;

const SongScreen = ({ navigation, route }: Props) => {
  const { song } = route.params;
  const [showSongInfo, setShowSongInfo] = useState(false);

  return (
    <View style={styles.container}>
      <GoBack navigation={navigation} />
      <Spacer />
      <HeaderText> {song.title}</HeaderText>
      <Spacer />
      <Pressable
        style={styles.songInfoContainer}
        onPress={() => setShowSongInfo(true)}
      >
        <NormalText>
          Recorded Date: {song.recordedDate ? song.recordedDate : "N/A"}
        </NormalText>
        <Spacer height={10} />
        <NormalText>Category: {song.category}</NormalText>
        <Spacer height={10} />
        <NormalText>Notes: {song.notes ? song.notes : "N/A"}</NormalText>
        <Icon
          name="edit"
          type="feather"
          color={"black"}
          style={styles.editIcon}
        />
      </Pressable>

      <Spacer height={40} />
      <Player song={song} />
      {showSongInfo && (
        <SongInfoModal
          showModal={showSongInfo}
          hideModal={() => setShowSongInfo(false)}
          song={song}
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

import { View, StyleSheet } from "react-native";
import { Audio } from "expo-av";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/SongsStackNavigator";
import { HeaderText, NormalText } from "../theme/theme";
import Spacer from "../components/Spacer";
import GoBack from "../components/GoBack";
import Player from "../components/Player";
import { useEffect } from "react";
import { Icon } from "@rneui/base";

const player = new Audio.Sound();
type Props = NativeStackScreenProps<RootStackParamList, "SongScreen">;

const SongScreen = ({ navigation, route }: Props) => {
  const { song } = route.params;

  return (
    <View style={styles.container}>
      <GoBack navigation={navigation} />
      <Spacer />
      <HeaderText> {song.title}</HeaderText>
      <Spacer />
      <View style={styles.songInfoContainer}>
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
          size={30}
          color={"black"}
          style={styles.editIcon}
        />
      </View>

      <Spacer height={60} />
      <Player song={song} />
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
  },
  editIcon: { alignSelf: "flex-end" },
});

export default SongScreen;

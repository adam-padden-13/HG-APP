import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Audio } from "expo-av";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/SongsStackNavigator";
import { HeaderText } from "../theme/theme";
import Spacer from "../components/Spacer";
import { Icon } from "@rneui/themed";
import GoBack from "../components/GoBack";
import Player from "../components/Player";

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
});

export default SongScreen;

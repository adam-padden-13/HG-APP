import { Pressable, View, StyleSheet } from "react-native";
import { SmallText, colors } from "../theme/theme";
import { Song } from "../models/Song";
import { useContext } from "react";
import { AppContext } from "../contexts/appContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface SongListItemProps {
  song: Song;
  id: number;
}

const SongListItem = ({ song, id }: SongListItemProps) => {
  const { state, dispatch } = useContext(AppContext);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  
  const styles = StyleSheet.create({
    songContainer: {
      height: 42,
      borderWidth: 1,
      justifyContent: "center",
      paddingHorizontal: 10,
      borderRadius: 8,
      backgroundColor: colors.white,
    },
    songInfo: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: 4,
    },
    shadowProp: {
      shadowColor: "#171717",
      shadowOffset: { width: 4, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
  });
  return (
    <View key={id}>
      <Pressable
        style={[
          styles.songContainer,
          {
            borderColor: state.loadedSong
              ? song.title === state.loadedSong.title
                ? colors.green
                : colors.black
              : colors.black,
            borderWidth: state.loadedSong
              ? song.title === state.loadedSong.title
                ? 3
                : 1
              : 1,
          },
        ]}
        onPress={() => {
          navigation.navigate("SongScreen", {
            song: song,
          });
          dispatch({
            type: "SelectedSong",
            payload: song,
          });
        }}
      >
        <View style={styles.songInfo}>
          <View style={{ width: 180 }}>
            <SmallText>{song.title}</SmallText>
          </View>

          <SmallText>{song.category}</SmallText>
        </View>
      </Pressable>
      <View style={{ marginBottom: 12 }} />
    </View>
  );
};

export default SongListItem;

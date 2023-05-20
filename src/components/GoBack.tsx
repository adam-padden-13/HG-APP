import { Pressable, View, StyleSheet } from "react-native";
import { Icon } from "@rneui/themed";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/SongsStackNavigator";

interface GoBackProps {
  navigation: NativeStackNavigationProp<RootStackParamList, "SongScreen">;
}

const GoBack = ({ navigation }: GoBackProps) => {
  return (
    <Pressable style={styles.goBack} onPress={() => navigation.goBack()}>
      <Icon name="arrow-left" type="feather" size={40} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  goBack: {
    position: "absolute",
    top: 0,
    left: 10,
  },
});

export default GoBack;

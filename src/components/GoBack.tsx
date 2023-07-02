import { Pressable, StyleSheet } from "react-native";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

const GoBack = () => {
  const navigation = useNavigation();
  return (
    <Pressable style={styles.goBack} onPress={() => navigation.goBack()}>
      <Icon name="arrow-left" type="feather" size={40} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  goBack: {
    position: "absolute",
    top: 48,
    left: 18,
  },
});

export default GoBack;

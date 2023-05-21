import { View, Text, StyleSheet } from "react-native";
import { Icon } from "@rneui/themed";
import Spacer from "./Spacer";

const Header = () => {
  return (
    <View style={styles.container}>
      <Icon
        name="user-circle"
        type="font-awesome"
        size={40}
        color="black"
        style={styles.userIcon}
      />
      <Spacer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: "lightgrey",
    position: 'absolute',
    top: 0,
    zIndex: 1
  },
  userIcon: {
    alignSelf: "flex-end",
    marginRight: 20,
  },
});

export default Header;

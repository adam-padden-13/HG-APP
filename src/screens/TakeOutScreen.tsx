import { View } from "react-native";
import { HeaderText, NormalText } from "../theme/theme";
import { WebView } from "react-native-webview";
import Constants from "expo-constants";

const TakeOutScreen = () => {
  return (
    <WebView
      source={{ uri: "https://egggame.org/" }}
      style={{ marginTop: Constants.statusBarHeight }}
    />
    // <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
    //   <HeaderText>Our Favorite Takeout</HeaderText>
    //   <WebView source={{ uri: "https://egggame.org/" }} />
    // </View>
  );
};

export default TakeOutScreen;

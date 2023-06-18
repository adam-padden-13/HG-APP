import { WebView } from "react-native-webview";
import Constants from "expo-constants";

const TakeOutScreen = () => {
  return (
    <WebView
      source={{ uri: "https://egggame.org/" }}
      style={{ marginTop: Constants.statusBarHeight }}
    />
  );
};

export default TakeOutScreen;

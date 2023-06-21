import { WebView } from "react-native-webview";
import Constants from "expo-constants";

const EggScreen = () => {
  return (
    <WebView
      source={{ uri: "https://egggame.org/" }}
      style={{ marginTop: Constants.statusBarHeight }}
    />
  );
};

export default EggScreen;

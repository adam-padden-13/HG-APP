import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import SavedChordsScreen from "./src/screens/SavedChords";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SongsScreen from "./src/screens/Songs.tsx";
import SongsStackNavigator from "./src/navigation/SongsStackNavigator";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <BottomTab.Navigator>
        <BottomTab.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Home" }}
        />
        <BottomTab.Screen
          name="SongsTab"
          component={SongsStackNavigator}
          options={{ headerShown: false }}
        />
      </BottomTab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});

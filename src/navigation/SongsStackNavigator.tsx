import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SongScreen from "../screens/Song";
import SongsScreen from "../screens/Songs.tsx";

const Stack = createNativeStackNavigator();

const SongsStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SongsScreen">
      <Stack.Screen
        name="SongsScreen"
        component={SongsScreen}
        options={{ title: "Songs" }}
      />
      <Stack.Screen
        name="SongScreen"
        component={SongScreen}
        options={({ route }) => ({ title: route.params.song.title })}
      />
    </Stack.Navigator>
  );
};

export default SongsStackNavigator;

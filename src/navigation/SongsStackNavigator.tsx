import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SongScreen from "../screens/SongScreen";
import SongsScreen from "../screens/SongsScreen";
import { Song } from "../models/Song";

export type RootStackParamList = {
  SongsScreen: { songToNavigateTo: Song | undefined };
  SongScreen: { song: Song };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const SongsStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SongsScreen">
      <Stack.Screen
        name="SongsScreen"
        component={SongsScreen}
        options={{ title: "Songs", headerShown: false }}
      />
      <Stack.Screen
        name="SongScreen"
        component={SongScreen}
        options={({ route }) => ({
          title: route.params.song.title,
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
};

export default SongsStackNavigator;

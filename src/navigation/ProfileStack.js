import { createStackNavigator } from "@react-navigation/stack";
import { ProfileScreen } from "../screens/ProfileScreen";
import "react-native-gesture-handler";
import { ProfileInfoScreen } from "../screens/ProfileInfoScreen";

const Stack = createStackNavigator();

export const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName={"ProfileScreen"}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen
        name="ProfileInfo"
        component={ProfileInfoScreen}
      />
    </Stack.Navigator>
  );
};

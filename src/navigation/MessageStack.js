import { createStackNavigator } from "@react-navigation/stack";
import { ChatScreen } from "../screens/ChatScreen";
import "react-native-gesture-handler";

const Stack = createStackNavigator();

export const MessageStack = () => {
  return (
    <Stack.Navigator initialRouteName={"Chat"}>
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};

import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, TouchableOpacity } from "react-native";
import { HomeScreen } from "../screens/HomeScreen";
import { AddPostScreen } from "../screens/AddPostScreen";
import "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";

const Stack = createStackNavigator();

export const FeedStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="RN Social"
      screenOptions={{ headerTintColor: "#2e64e5" }}>
      <Stack.Screen
        name="RN Social"
        component={HomeScreen}
        options={{
          headerRight: () => (
            <View style={{ marginRight: 10 }}>
              <AntDesign.Button
                name="pluscircleo"
                size={24}
                backgroundColor="#fff"
                color="#2e64e5"
                onPress={() => navigation.navigate("AddPost")}
              />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="AddPost"
        component={AddPostScreen}
        options={{
          headerTitle: "",
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 10 }}>
              <Text
                style={{
                  fontSize: 20,
                  color: "#2e64e5",
                  fontFamily: "Lato-Bold",
                }}>
                Post
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

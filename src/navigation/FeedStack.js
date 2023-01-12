import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, TouchableOpacity } from "react-native";
import { HomeScreen } from "../screens/HomeScreen";
import { AddPostScreen } from "../screens/AddPostScreen";
import "react-native-gesture-handler";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { ProfileScreen } from "../screens/ProfileScreen";

const Stack = createStackNavigator();

export const FeedStack = ({ navigation, route }) => {
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
          // headerBackTitleVisible: false,
          headerBackImage: () => (
            <View style={{ marginLeft: 10 }}>
              <Ionicons name="arrow-back" size={25} color="#2e64e5" />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="HomeProfile"
        component={ProfileScreen}
        options={{
          headerTitle: "",
          headerBackTitleVisible: false,
          headerBackImage: () => (
            <View>
              <Ionicons name="arrow-back" size={25} color="#2e64e5" />
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

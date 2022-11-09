import { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { auth } from "../../firebaseConfig";
import { FormButton } from "../components/FormButton";
import { AuthContext } from "../navigation/AuthProvider";

export const ProfileScreen = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ProfileScreen {user.uid}</Text>
      <FormButton buttonTitle="Logout" onPress={() => logout(auth)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9fafd",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  text: {
    fontSize: 20,
    color: "#333333",
  },
});

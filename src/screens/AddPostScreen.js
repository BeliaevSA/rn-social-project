import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { InputWrapper, InputField } from "../styles/AddPost";
import ActionButton from "react-native-action-button";

export const AddPostScreen = () => {
  const [text, setText] = useState("");
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <InputWrapper>
          <InputField
            placeholder="What's on your mind?"
            multiline
            numberOflines={4}
          />
        </InputWrapper>
        {/* <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item
            buttonColor="#9b59b6"
            title="New Task"
            onPress={() => console.log("notes tapped!")}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#3498db"
            title="Notifications"
            onPress={() => {}}>
            <Icon
              name="md-notifications-off"
              style={styles.actionButtonIcon}
            />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#1abc9c"
            title="All Tasks"
            onPress={() => {}}>
            <Icon
              name="md-done-all"
              style={styles.actionButtonIcon}
            />
          </ActionButton.Item>
        </ActionButton> */}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9fafd",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // padding: 20,
  },
  // actionButtonIcon: {
  //   fontSize: 20,
  //   height: 22,
  //   color: "white",
  // },
});

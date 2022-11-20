import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Modal,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export const ModalAddPost = ({
  modalVisible,
  setModalVisible,
  setImage,
}) => {
  const tabBarHeight = useBottomTabBarHeight();

  async function askForCameraPermissions() {
    await ImagePicker.requestCameraPermissionsAsync();
    const { status } = await ImagePicker.getCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Ошибка",
        "Вы не дали прав на создание фото! Дайте разрешение в настройках"
      );
      return false;
    }
    return true;
  }

  const takePhoto = async () => {
    const hasPermissions = await askForCameraPermissions();

    if (!hasPermissions) {
      return;
    }

    const img = await ImagePicker.launchCameraAsync({
      quality: 0.7,
      allowsEditing: true,
      aspect: [16, 9],
      allowsMultipleSelection: false,
    });
    setModalVisible(false);
    setImage(img.uri);
  };

  async function askForMediaLibraryPermissions() {
    await ImagePicker.requestMediaLibraryPermissionsAsync();
    const { status } =
      await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Ошибка",
        "Вы не дали прав на выбор фотографии из медиатеки! Дайте разрешение в настройках"
      );
      return false;
    }
    return true;
  }

  const choosePhoto = async () => {
    const hasPermissions = await askForMediaLibraryPermissions();

    if (!hasPermissions) {
      return;
    }

    const img = await ImagePicker.launchImageLibraryAsync({
      quality: 0.7,
      allowsEditing: true,
      aspect: [16, 9],
      allowsMultipleSelection: false,
    });
    setModalVisible(false);
    setImage(img.uri);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      // onRequestClose={() => {
      //   Alert.alert("Modal has been closed.");
      //   setModalVisible(!modalVisible);
      // }}
    >
      <TouchableWithoutFeedback
        onPress={() => setModalVisible(false)}>
        <View style={styles.modalWrapper}>
          <View
            style={[
              styles.buttonWrapper,
              { marginBottom: tabBarHeight },
            ]}>
            <TouchableOpacity onPress={takePhoto}>
              <View style={styles.buttonItem}>
                <>
                  <Ionicons name="camera" size={30} color="black" />
                  <Text style={{ marginLeft: 10 }}>Сделать фото</Text>
                </>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={choosePhoto}>
              <View style={styles.buttonItem}>
                <>
                  <Ionicons name="albums" size={30} color="black" />
                  <Text style={{ marginLeft: 10 }}>
                    Выбрать из галлереи
                  </Text>
                </>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flex: 1,
    justifyContent: "flex-end",
  },
  buttonWrapper: {
    height: 115,
    justifyContent: "space-between",
    backgroundColor: "#f3eef0",
  },
  buttonItem: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});

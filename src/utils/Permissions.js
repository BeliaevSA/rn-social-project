import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

export async function askForCameraPermissions() {
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

export async function askForMediaLibraryPermissions() {
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

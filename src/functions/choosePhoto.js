import { askForMediaLibraryPermissions } from "../utils/Permissions";
import * as ImagePicker from "expo-image-picker";

export const choosePhoto = async () => {
  const hasPermissions = await askForMediaLibraryPermissions();

  if (!hasPermissions) {
    return;
  }

  const img = await ImagePicker.launchImageLibraryAsync({
    quality: 0.7,
    allowsEditing: true,
    aspect: [4, 3],
    allowsMultipleSelection: false,
  });
  return img.uri;
};

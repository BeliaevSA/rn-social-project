import { askForCameraPermissions } from "../utils/Permissions";
import * as ImagePicker from "expo-image-picker";

export const takePhoto = async () => {
  const hasPermissions = await askForCameraPermissions();

  if (!hasPermissions) {
    return;
  }

  const img = await ImagePicker.launchCameraAsync({
    quality: 0.7,
    allowsEditing: true,
    aspect: [4, 3],
    allowsMultipleSelection: false,
  });
  // setImage(img.uri);
  // bs.current.snapTo(1);
  return img.uri;
};

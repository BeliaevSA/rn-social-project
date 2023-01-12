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
import * as ImagePicker from "expo-image-picker";
import {
  askForCameraPermissions,
  askForMediaLibraryPermissions,
} from "../utils/Permissions";

export const ModalAddPost = ({
  modalVisible,
  setModalVisible,
  setImage,
}) => {
  const tabBarHeight = useBottomTabBarHeight();

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
      visible={modalVisible}>
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

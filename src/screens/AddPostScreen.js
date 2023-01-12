import { Ionicons } from "@expo/vector-icons";
import { useState, useContext } from "react";
import {
  View,
  Image,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { ModalAddPost } from "../components/ModalAddPost";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { AuthContext } from "../provaiders/AuthProvider";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export const AddPostScreen = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { user } = useContext(AuthContext);
  // console.log(image);

  const uploadImage = async () => {
    setUploading(true);
    if (image === null) return null;
    let filename = image.substring(image.lastIndexOf("/") + 1);
    const filenameType = filename.split(".")[1];
    filename = filename.split(".")[0] + Date.now() + filenameType;
    const response = await fetch(image);
    const blob = await response.blob();

    const storage = getStorage();
    const storageRef = ref(storage, "images/" + filename);

    try {
      await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(storageRef);

      return url;
    } catch (e) {
      Alert.alert(
        "ваша фотография не загрузилась :( Попробуйте снова!"
      );
      console.log(e);
      // setUploading(false);
      // setImage(null);
      return null;
    }
  };

  const submitPost = async () => {
    const imageUrl = await uploadImage();

    try {
      const docRef = await addDoc(collection(db, "posts"), {
        userId: user.uid,
        postTime: Date.now(),
        post: text,
        postImg: imageUrl,
        liked: false,
        likes: null,
        comments: null,
      });
      Alert.alert("Ваш пост опубликован!");
      // console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      setUploading(false);
      setImage(null);
      setText("");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <ScrollView style={{ width: "100%" }}>
          <View style={styles.inputWrapper}>
            {image != null ? (
              <Image
                source={{ uri: image }}
                style={{ width: "100%", height: 250 }}
              />
            ) : null}
            <TextInput
              onChangeText={setText}
              value={text}
              style={styles.inputField}
              placeholder="What's on your mind?"
              multiline
              numberOfLines={4}
            />
            {uploading ? (
              <View>
                <ActivityIndicator size="large" color="#2e64e5" />
              </View>
            ) : (
              <TouchableOpacity
                style={{ width: "100%" }}
                onPress={submitPost}>
                <Text
                  style={
                    Platform.OS === "ios"
                      ? styles.buttonSend
                      : styles.buttonSendAndroid
                  }>
                  Post
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>

        <View style={styles.buttonPhotoWrapper}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Ionicons name="camera" size={40} color="#2e64e5" />
          </TouchableOpacity>
        </View>

        <ModalAddPost
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          setImage={setImage}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f3eef0",
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
  },
  inputWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    position: "relative",
    backgroundColor: "#f3eef0",
  },
  inputField: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 24,
    textAlign: "center",
    width: "90%",
    marginVertical: 15,
  },
  buttonPhotoWrapper: {
    position: "absolute",
    right: 25,
    bottom: 25,
    borderRadius: 50,
  },
  buttonSend: {
    fontSize: 22,
    color: "#2e64e5",
    fontFamily: "Lato-Bold",
    textAlign: "center",
  },
  buttonSendAndroid: {
    fontSize: 22,
    color: "white",
    backgroundColor: "#2e64e5",
    fontFamily: "Lato-Bold",
    paddingHorizontal: 10,
    paddingVertical: 5,
    textAlign: "center",
  },
});

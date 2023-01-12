import { useState, useContext, useRef } from "react";
import {
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { AuthContext } from "../provaiders/AuthProvider";
import { UsersContext } from "../provaiders/UsersProvaider";
import * as ImagePicker from "expo-image-picker";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { takePhoto } from "../functions/takePhoto";
import { choosePhoto } from "../functions/choosePhoto";
import {
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { FormButton } from "../components/FormButton";
import { db } from "../../firebaseConfig";
import { useEffect } from "react";

export const ProfileInfoScreen = () => {
  const { user } = useContext(AuthContext);
  const { getUser, userData, setUserData } = useContext(UsersContext);

  // const [userData, setUserData] = useState(null);
  const [isVisibleBootomSheet, setIsVisibleBootomSheet] =
    useState(false);
  const [updateLoader, setUpdateLoader] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [aboutMe, setAboutMe] = useState(userData.aboutMe);
  const [email, setEmail] = useState(userData.email);
  const [country, setCountry] = useState(userData.country);
  const [city, setCity] = useState(userData.city);
  const [userImg, setUserImg] = useState(userData.userImg);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoader(true);
      await getUser(user.uid);
      setIsLoader(false);
    };
    fetchUser();
    console.log(`ProfileInfoScreen ${userData}`);
  }, []);

  const [image, setImage] = useState("");

  const bs = useRef(null);
  const fall = new Animated.Value(1);

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>
          Choose Your Profile Picture
        </Text>
      </View>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={async () => {
          const url = await takePhoto();
          setImage(url);
          bs.current.snapTo(1);
        }}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={async () => {
          const url = await choosePhoto();
          setImage(url);
          bs.current.snapTo(1);
        }}>
        <Text style={styles.panelButtonTitle}>
          Choose From Library
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => {
          bs.current.snapTo(1);
          setIsVisibleBootomSheet(false);
        }}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
  const renderHeader = () => (
    <View
      style={
        Platform.OS === "ios"
          ? styles.headerIos
          : styles.headerAndroid
      }>
      {Platform.OS === "ios" && (
        <View style={styles.panelHeader}>
          <View style={styles.panelHandler}></View>
        </View>
      )}
    </View>
  );

  const updateUser = async (image, userImg) => {
    setUpdateLoader(true);
    const editUser = {
      firstName,
      lastName,
      aboutMe,
      email,
      userImg: image ? image : userImg,
      country,
      city,
      followers: userData.followers,
      following: userData.following,
    };
    try {
      await uploadImage(image);
      await setDoc(doc(db, "users", user.uid), editUser);
      setUserData(editUser);
      Alert.alert("Ваши данные обновлены!");
    } catch (error) {
      console.log(`updateUser: ${error}`);
    } finally {
      setUpdateLoader(false);
    }
  };

  // const takePhoto = async () => {
  //   const hasPermissions = await askForCameraPermissions();

  //   if (!hasPermissions) {
  //     return;
  //   }

  //   const img = await ImagePicker.launchCameraAsync({
  //     quality: 0.7,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     allowsMultipleSelection: false,
  //   });
  //   setImage(img.uri);
  //   bs.current.snapTo(1);
  //   return img.uri;
  // };

  // const choosePhoto = async () => {
  //   const hasPermissions = await askForMediaLibraryPermissions();

  //   if (!hasPermissions) {
  //     return;
  //   }

  //   const img = await ImagePicker.launchImageLibraryAsync({
  //     quality: 0.7,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     allowsMultipleSelection: false,
  //   });
  //   setImage(img.uri);
  //   bs.current.snapTo(1);
  //   return img.uri;
  // };

  const uploadImage = async image => {
    if (!image) return null;
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
      setUserImg(url);
    } catch (e) {
      Alert.alert(
        "Ваша фотография не загрузилась :( Попробуйте снова!"
      );
      console.log(e);
      return null;
    }
  };

  return isLoader ? (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
      <ActivityIndicator size="large" color="#2e64e5" />
    </View>
  ) : (
    <ScrollView
      contentContainerStyle={styles.container}
      style={styles.container}>
      <Animated.View
        style={{
          margin: 20,
          flex: 1,
          opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
        }}>
        <View
          style={{
            alignItems: "center",
            marginBottom: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              bs.current.snapTo(0);
              setIsVisibleBootomSheet(true);
            }}>
            <View
              style={{
                borderRadius: 15,
                justifyContent: "center",
                // borderWidth: 1,
                alignItems: "center",
              }}>
              <ImageBackground
                source={
                  image
                    ? { uri: image }
                    : userImg
                    ? { uri: userImg }
                    : require("../../assets/rn-social-logo.png")
                }
                style={{ height: 100, width: 100 }}
                imageStyle={{ borderRadius: 15 }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <Ionicons
                    name="camera"
                    size={35}
                    color="#fff"
                    style={{
                      opacity: 0.7,
                      borderWidth: 1,
                      borderColor: "#fff",
                      borderRadius: 10,
                      paddingLeft: 3,
                    }}
                  />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <Text
            style={{
              marginTop: 10,
              fontFamily: "Lato-Bold",
              fontSize: 18,
            }}>
            {`${userData.firstName} ${userData.lastName}`}
          </Text>
          <Text>{userData.aboutMe}</Text>
        </View>
        <View style={styles.action}>
          <FontAwesome name="user-o" size={20} />
          <TextInput
            placeholder="First Name"
            placeholderTextColor="#ccc"
            autoCorrect={false}
            style={styles.textInput}
            value={firstName}
            onChangeText={setFirstName}
            editable={isVisibleBootomSheet ? false : true}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="user-o" size={20} />
          <TextInput
            placeholder="Last Name"
            placeholderTextColor="#ccc"
            autoCorrect={false}
            style={styles.textInput}
            value={lastName}
            onChangeText={setLastName}
            editable={isVisibleBootomSheet ? false : true}
          />
        </View>
        <View style={styles.action}>
          <Feather name="file-text" size={20} />
          <TextInput
            placeholder="About me"
            placeholderTextColor="#ccc"
            autoCorrect={false}
            style={styles.textInput}
            value={aboutMe}
            onChangeText={setAboutMe}
            multiline={true}
            editable={isVisibleBootomSheet ? false : true}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="envelope-o" size={20} />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#ccc"
            keyboardType="email-address"
            autoCorrect={false}
            style={styles.textInput}
            value={email}
            onChangeText={setEmail}
            editable={isVisibleBootomSheet ? false : true}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="globe" size={20} />
          <TextInput
            placeholder="Country"
            placeholderTextColor="#ccc"
            autoCorrect={false}
            style={styles.textInput}
            value={country}
            onChangeText={setCountry}
            editable={isVisibleBootomSheet ? false : true}
          />
        </View>
        <View style={styles.action}>
          <MaterialCommunityIcons
            name="map-marker-outline"
            size={20}
          />
          <TextInput
            placeholder="City"
            placeholderTextColor="#ccc"
            autoCorrect={false}
            style={styles.textInput}
            value={city}
            onChangeText={setCity}
            editable={isVisibleBootomSheet ? false : true}
          />
        </View>
        <FormButton
          buttonTitle="Update"
          isLoader={updateLoader}
          onPress={() => updateUser(image, userImg)}
        />
      </Animated.View>

      <BottomSheet
        ref={bs}
        snapPoints={[300, -200]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
        onCloseEnd={() => setIsVisibleBootomSheet(false)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  action: {
    flexDirection: "row",
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: "#05315a",
  },
  comandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#ff6347",
    alignItems: "center",
    marginTop: 10,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontFamily: "Lato-Bold",
    color: "white",
  },
  headerAndroid: {
    backgroundColor: "#fff",
    shadowColor: "#333",
    elevation: 5,
    paddingTop: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerIos: {
    backgroundColor: "#fff",
    shadowColor: "#333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: { alignItems: "center" },
  panelHandler: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#000040",
    marginBottom: 10,
  },
  panel: {
    backgroundColor: "#fff",
    alignItems: "center",
  },
  panelTitle: {
    fontSize: 20,
    fontFamily: "Lato-Bold",
    marginTop: 20,
  },
  panelSubtitle: {
    color: "#666",
    marginTop: 5,
    marginBottom: 20,
  },
  panelButton: {
    backgroundColor: "#2e64e5",
    alignItems: "center",
    width: "90%",
    marginVertical: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
});

import {
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import { AuthContext } from "../provaiders/AuthProvider";
import { UsersContext } from "../provaiders/UsersProvaider";
import { useEffect, useState, useContext } from "react";
import {
  collection,
  query,
  onSnapshot,
  doc,
  deleteDoc,
  where,
  setDoc,
} from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { auth } from "../../firebaseConfig";
import { db, storage } from "../../firebaseConfig";
import { PostCard } from "../components/PostCard";
import { ProfileBtn } from "../components/ProfileBtn";
import { ProfileInfo } from "../components/ProfileInfo";

export const ProfileScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState(0);
  const { user, logout } = useContext(AuthContext);
  const { getUser } = useContext(UsersContext);
  const [userData, setUserData] = useState(null);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [statusSubscribe, setStatusSubscribe] = useState(null);

  const [isLoader, setIsLoader] = useState(true);
  const userId = route.params ? route.params.user : user.uid;

  useEffect(() => {
    navigation.addListener("focus", () => fetchData(userId));
    const fetchData = async id => {
      setIsLoader(true);
      const response = await getUser(id);
      fetchPost(response);
      setStatusSubscribe(response.followers.includes(user.uid));
      setUserData(response);
      setFollowers(response.followers);
      setFollowing(response.following);
      setIsLoader(false);
    };
  }, [navigation]);

  const fetchPost = async data => {
    let showPosts = [];
    try {
      const q = query(
        collection(db, "posts"),
        where("userId", "==", userId)
      );
      onSnapshot(q, querySnapshot => {
        querySnapshot.forEach(doc => {
          const {
            userId,
            postTime,
            post,
            postImg,
            liked,
            likes,
            comments,
          } = doc.data();
          showPosts.push({
            id: doc.id,
            userId,
            userName: data.firstName + " " + data.lastName,
            userImg: data.userImg,
            postTime,
            post,
            postImg,
            liked,
            likes,
            comments,
          });
        });
        const sortPosts = showPosts.sort(
          (a, b) => b.postTime - a.postTime
        );
        setPosts(sortPosts);
        // setPostsLength(sortPosts.length);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = postId => {
    Alert.alert(
      "Удаление поста",
      "Вы точно хотите удалить данный пост?",
      [
        {
          text: "Отменить",
          style: "cancel",
        },
        {
          text: "Удалить",
          onPress: async () => {
            try {
              await deletePhotoStorage(postId);
              await deleteDoc(doc(db, "posts", postId));
              Alert.alert("Пост удален успешно!");
            } catch (error) {
              Alert.alert(
                `Пост не удалось удалить. Попробуйте позже.`
              );
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  const deletePhotoStorage = async postId => {
    const postImg = await posts.find(post => post.id === postId)
      .postImg;
    if (!postImg) return null;
    try {
      const desertRef = ref(storage, postImg);
      deleteObject(desertRef);
    } catch (error) {
      console.log(error);
    }
  };

  const changeFollow = async (follow, id, addId) => {
    const removeFollow = (arr, addId) => {
      const response = arr.indexOf(addId);
      arr.splice(response, 1);
      console.log(arr);
    };

    const response = await getUser(id);
    const editFollow = response[follow];
    editFollow.includes(addId)
      ? removeFollow(editFollow, addId)
      : editFollow.push(addId);
    response[follow] = editFollow;
    try {
      await setDoc(doc(db, "users", id), response);

      console.log(
        `вы подписаны/отписаны ${followers.length} ${following.length}`
      );
      return response;
    } catch (error) {
      console.log(`updateUser: ${error}`);
    }
  };

  const subscribeStatus = async () => {
    const response = await changeFollow(
      "followers",
      userId,
      user.uid
    );
    await changeFollow("following", user.uid, userId);
    setFollowers(response.followers);
    setStatusSubscribe(pre => !pre);
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
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={
            <View style={{ alignItems: "center" }}>
              <Image
                style={styles.userImg}
                source={
                  userData.userImg
                    ? { uri: userData.userImg }
                    : require("../../assets/rn-social-logo.png")
                }
              />
              <Text style={styles.userName}>
                {userData.firstName + " " + userData.lastName}
              </Text>
              {userData.aboutMe && <Text>{userData.aboutMe}</Text>}
              <View style={styles.userBtnsWrapper}>
                {!route.params ? (
                  <>
                    <ProfileBtn
                      onPress={() =>
                        navigation.navigate("ProfileInfo")
                      }
                      value="Edit"
                    />
                    <ProfileBtn
                      onPress={() => logout(auth)}
                      value="Logout"
                    />
                  </>
                ) : route.params.user === user.uid ? null : (
                  <ProfileBtn
                    onPress={subscribeStatus}
                    value={
                      statusSubscribe ? "Unsubscribe" : "Subscribe"
                    }
                  />
                )}
              </View>

              <View style={styles.userInfoWrapper}>
                <ProfileInfo value={posts.length} text="Posts" />
                <ProfileInfo
                  value={followers.length}
                  text="Followers"
                />
                <ProfileInfo
                  value={following.length}
                  text="Following"
                />
              </View>
            </View>
          }
          data={posts}
          renderItem={({ item }) => (
            <PostCard
              post={item}
              deletePost={deletePost}
              onPress={null}
            />
          )}
          keyExtractor={item => item.postTime}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  userName: {
    fontSize: 20,
    fontFamily: "Lato-Bold",
    marginTop: 10,
  },
  userBtnsWrapper: {
    flexDirection: "row",
  },
  userInfoWrapper: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-around",
    marginBottom: 20,
  },
});

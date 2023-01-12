import { useEffect, useState, useContext, useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View,
  Alert,
} from "react-native";
import {
  collection,
  query,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

import { db, storage } from "../../firebaseConfig";
import { PostCard } from "../components/PostCard";
import { UsersContext } from "../provaiders/UsersProvaider";

export const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState(null);
  const { getUser } = useContext(UsersContext);
  const [isLoading, setIsLoading] = useState(false);

  // console.log(navigation);
  useEffect(() => {
    setIsLoading(true);
    setPosts(null);
    fetchPost();
    console.log("рендер homescreen");
  }, []);

  const fetchPost = useCallback(async () => {
    try {
      const q = query(collection(db, "posts"));
      onSnapshot(q, querySnapshot => {
        let showPosts = [];
        querySnapshot.forEach(async doc => {
          const {
            userId,
            postTime,
            post,
            postImg,
            liked,
            likes,
            comments,
          } = doc.data();
          const response = await getUser(userId);
          showPosts.push({
            id: doc.id,
            userId,
            userName: response.firstName + " " + response.lastName,
            userImg: response.userImg,
            postTime,
            post,
            postImg,
            liked,
            likes,
            comments,
          });
        });
        // console.log(`showPosts - ${showPosts}`);

        setPosts(showPosts.sort((a, b) => b.postTime - a.postTime));
        setIsLoading(false);
        console.log("рендер homescreen fetchpost");
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

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

  const navigationProfile = userId => {
    navigation.navigate("HomeProfile", { user: userId });
  };

  return isLoading ? (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
      <ActivityIndicator size="large" color="#2e64e5" />
    </View>
  ) : (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            deletePost={deletePost}
            navigationProfile={navigationProfile}
            onPress={navigationProfile}
          />
        )}
        keyExtractor={item => item.postTime}
        ListFooterComponent={false}
        ListHeaderComponent={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorisontal: 20,
  },
});

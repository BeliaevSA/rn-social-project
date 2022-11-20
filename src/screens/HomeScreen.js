import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
// import { posts } from "../../posts";
import { PostCard } from "../components/PostCard";

export const HomeScreen = () => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [changePosts, setChangePosts] = useState(null);

  // console.log(posts);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        let posts = [];
        const querySnapshot = await getDocs(collection(db, "posts"));
        querySnapshot.forEach(doc => {
          // console.log(doc.id, " => ", doc.data());
          const {
            userId,
            postTime,
            post,
            postImg,
            liked,
            likes,
            comments,
          } = doc.data();
          posts.push({
            id: doc.id,
            userId,
            userName: "Test name",
            userImg: require("./../../assets/users/user-8.jpg"),
            postTime,
            post,
            postImg,
            liked,
            likes,
            comments,
          });
        });
        setPosts(posts);
        if (loading) {
          setLoading(false);
        }
        setChangePosts(false);
        // console.log(posts);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, [changePosts]);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostCard post={item} />}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        setChangePosts={setChangePosts}
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

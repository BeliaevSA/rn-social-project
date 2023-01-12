import { Ionicons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { Dimensions } from "react-native";
import { AuthContext } from "../provaiders/AuthProvider";
import moment from "moment";
import { ProgressiveImage } from "./ProgressiveImage";
import { useEffect } from "react";

export const PostCard = ({ onPress, post, deletePost }) => {
  const { user } = useContext(AuthContext);
  const [likes, setLikes] = useState(post.likes.length);
  const windowWidth = Dimensions.get("window").width;
  const likeIcon = post.liked ? "heart" : "heart-outline";
  const liceIconColor = post.liked ? "#2e64e5" : "#333";
  const likeText =
    post.likes.length === 0
      ? "Like"
      : post.likes.length > 1
      ? `${post.likes.length} Likes`
      : "1 Like";

  const commentText =
    post.comments === null
      ? "Comment"
      : post.comments > 1
      ? `${post.comments} Comments`
      : "1 Comment";
  const postTime = new Date(post.postTime);

  useEffect(() => {
    console.log(post.id);

    // updateLikes();
  }, []);
  // const updateLikes = async () => {
  //   const docRef = doc(db, "posts", post.id);
  //   const arr = [...post.likes];
  //   arr.push(user.uid);

  //   await updateDoc(docRef, {
  //     liked: true,
  //     likes: arr,
  //   });
  //   setLikes(likes + 1);
  // };

  return (
    <View style={[styles.card, { width: windowWidth * 0.9 }]}>
      <View style={styles.userInfo}>
        <Image
          source={
            post.userImg === null
              ? require("../../assets/rn-social-logo.png")
              : { uri: post.userImg }
          }
          style={styles.userImg}
        />
        <TouchableOpacity
          style={styles.userInfoText}
          onPress={onPress ? () => onPress(post.userId) : null}>
          <View>
            <Text style={styles.userName}>{post.userName}</Text>
            <Text style={styles.postTime}>
              {moment(postTime).fromNow()}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.postText}>{post.post}</Text>
      {post.postImg === null ? (
        <View style={styles.divider} />
      ) : (
        <ProgressiveImage
          defaultImageSource={require("../../assets/default-img.jpg")}
          source={{ uri: post.postImg }}
          style={styles.postImg}
          resizeMode="cover"
        />
      )}
      <View style={styles.interactionWrapper}>
        <TouchableOpacity
          style={[
            styles.interaction,
            {
              backgroundColor: post.liked
                ? "#2e64e515"
                : "transparent",
            },
          ]}
          // onPress={() => updateLikes()}
        >
          <Ionicons name={likeIcon} size={25} color={liceIconColor} />
          <Text
            style={[
              styles.interactionText,
              { color: post.liked ? "#2e64e5" : "#333" },
            ]}>
            {likeText}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.interaction}>
          <Ionicons name="md-chatbubble-outline" size={25} />
          <Text style={styles.interactionText}>{commentText}</Text>
        </TouchableOpacity>
        {post.userId === user.uid ? (
          <TouchableOpacity
            style={styles.interaction}
            onPress={() => deletePost(post.id)}>
            <Ionicons name="md-trash-bin" size={25} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f8f8f8",
    width: "100%",
    marginBottom: 20,
    borderRadius: 10,
  },
  userInfo: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfoText: {
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 10,
  },
  userName: {
    fontSize: 14,
    fontFamily: "Lato-Bold",
  },
  postTime: {
    fontSize: 12,
    fontFamily: "Lato-Regular",
    color: "#666",
  },
  postText: {
    fontSize: 14,
    fontFamily: "Lato-Regular",
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 15,
  },
  postImg: {
    width: "100%",
    height: 250,
    // marginTop: 15,
  },
  divider: {
    borderBotomColor: "#dddddd",
    borderBottomWidth: 1,
    width: "92%",
    alignSelf: "center",
    marginTop: 15,
  },
  interactionWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  interaction: {
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 5,
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
  interactionText: {
    fontSize: 12,
    fontFamily: "Lato-Bold",
    marginTop: 5,
    marginLeft: 5,
  },
});

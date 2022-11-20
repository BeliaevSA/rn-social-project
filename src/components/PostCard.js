import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Dimensions } from "react-native";

export const PostCard = ({ post }) => {
  const windowWidth = Dimensions.get("window").width;
  const likeIcon = post.liked ? "heart" : "heart-outline";
  const liceIconColor = post.liked ? "#2e64e5" : "#333";
  const likeText =
    post.likes === null
      ? "Like"
      : post.likes > 1
      ? `${post.likes} Likes`
      : "1 Like";

  const commentText =
    post.comments === null
      ? "Comment"
      : post.comments > 1
      ? `${post.comments} Comments`
      : "1 Comment";
  const postTime = new Date(post.postTime).toDateString();

  return (
    <View style={[styles.card, { width: windowWidth * 0.9 }]}>
      <View style={styles.userInfo}>
        <Image source={post.userImg} style={styles.userImg} />
        <View style={styles.userInfoText}>
          <Text style={styles.userName}>{post.userName}</Text>
          <Text style={styles.postTime}>{postTime}</Text>
        </View>
      </View>
      <Text style={styles.postText}>{post.post}</Text>
      {post.postImg === null ? (
        <View style={styles.divider} />
      ) : (
        <Image
          style={styles.postImg}
          source={{ uri: post.postImg }}
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
          ]}>
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
    marginTop: 15,
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

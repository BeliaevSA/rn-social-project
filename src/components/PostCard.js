import { Ionicons } from "@expo/vector-icons";
import {
  Card,
  UserInfo,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  PostText,
  PostImg,
  InteractionWrapper,
  Interaction,
  InteractionText,
  Divider,
} from "../styles/FeedStyles";

export const PostCard = ({ post }) => {
  const likeIcon = post.liked ? "heart" : "heart-outline";
  const liceIconColor = post.liked ? "#2e64e5" : "#333";
  const likeText =
    post.like === "0"
      ? "Like"
      : post.likes > 1
      ? `${post.likes} Likes`
      : "1 Like";

  const commentText =
    post.comments === "0"
      ? "Comment"
      : post.comments > 1
      ? `${post.comments} Comments`
      : "1 Comment";

  return (
    <Card>
      <UserInfo>
        <UserImg source={post.userImg} />
        <UserInfoText>
          <UserName>{post.userName}</UserName>
          <PostTime>{post.postTime}</PostTime>
        </UserInfoText>
      </UserInfo>
      <PostText>{post.post}</PostText>
      {post.postImg === "none" ? (
        <Divider />
      ) : (
        <PostImg source={post.postImg} />
      )}
      <InteractionWrapper>
        <Interaction active={post.liked}>
          <Ionicons name={likeIcon} size={25} color={liceIconColor} />
          <InteractionText active={post.liked}>
            {likeText}
          </InteractionText>
        </Interaction>
        <Interaction>
          <Ionicons name="md-chatbubble-outline" size={25} />
          <InteractionText>{commentText}</InteractionText>
        </Interaction>
      </InteractionWrapper>
    </Card>
  );
};

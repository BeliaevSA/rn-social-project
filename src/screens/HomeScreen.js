import { FlatList } from "react-native";
import { Container } from "../styles/FeedStyles";
import { posts } from "../../posts";
import { PostCard } from "../components/PostCard";

export const HomeScreen = () => {
  // console.log(posts);
  return (
    <Container>
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostCard post={item} />}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

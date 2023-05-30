import { Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { getPosts } from "../services/posts";
import { useAsync } from "../hooks/useAsync";

export function PostList() {
  const { loading, error, value: posts } = useAsync(getPosts);

  if (loading) return <h1>Loading</h1>;
  if (error) return <Heading color="red">Got Error, {error}</Heading>;

  return posts.map((post) => {
    return (
      <Heading as="h1" fontSize="24px" key={post.id} marginBottom={2}>
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </Heading>
    );
  });
}

export default PostList;

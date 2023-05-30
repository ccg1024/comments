import { Route, Routes } from "react-router-dom";
import { Container } from "@chakra-ui/react";
import PostList from "./components/post-list";
import { PostProvider } from "./context/post-context";
import { Post } from "./components/post";

function App() {
  return (
    <Container maxWidth="container.md">
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route
          path="/posts/:id"
          element={
            <PostProvider>
              <Post />
            </PostProvider>
          }
        />
      </Routes>
    </Container>
  );
}

export default App;

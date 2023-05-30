import { Navigate, Route, Routes } from 'react-router-dom'
import { Container } from '@chakra-ui/react'
import PostList from './components/post-list'
import { PostProvider } from './context/post-context'
import { Post } from './components/post'
import NavBar from './components/navbar'
import { useAuth } from './context/auth'
import Login from './components/login'

function App() {
  const { token } = useAuth()
  return (
    <>
      <NavBar />
      <Container maxWidth="container.md" paddingTop={16}>
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
          <Route
            path="/login"
            element={token ? <Navigate to="/" /> : <Login />}
          />
        </Routes>
      </Container>
    </>
  )
}

export default App

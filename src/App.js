import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Container } from '@chakra-ui/react'
import PostList from './components/post-list'
import { PostProvider } from './context/post-context'
import { Post } from './components/post'
import NavBar from './components/navbar'
import { useAuth, ProtectedRoute } from './context/auth'
import Login from './components/login'
import { AnimatePresence } from 'framer-motion'
import { CreatePost } from './components/create-post'

function App() {
  const { token } = useAuth()
  const location = useLocation()
  return (
    <>
      <NavBar />
      <Container maxWidth="container.md" paddingTop={16}>
        <AnimatePresence mode="wait" initial={true}>
          <Routes location={location} key={location.key}>
            <Route path="/" element={<PostList />} />
            <Route
              path="posts/:id"
              element={
                <PostProvider>
                  <Post />
                </PostProvider>
              }
            />
            <Route
              path="post/:id"
              element={
                <ProtectedRoute>
                  <CreatePost />
                </ProtectedRoute>
              }
            />
            <Route
              path="login"
              element={token ? <Navigate to="/" /> : <Login />}
            />
          </Routes>
        </AnimatePresence>
      </Container>
    </>
  )
}

export default App

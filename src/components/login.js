import {
  Box,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  Center,
  Heading
} from '@chakra-ui/react'
import { useState } from 'react'
import { useAuth } from '../context/auth'
import { useAsyncFn } from '../hooks/useAsync'
import { getLogin } from '../services/auth'
const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [userError, setUserError] = useState(false)
  const [pswdError, setPswdError] = useState(false)
  const { onLogin } = useAuth()
  const loginFn = useAsyncFn(getLogin)

  function handleSubmit(e) {
    setUserError(false)
    setPswdError(false)
    e.preventDefault()
    if (
      username.trim().length < 2 ||
      !/^[a-zA-Z0-9_-]+$/.test(username.trim())
    ) {
      setUserError(true)
      return
    }
    if (
      password.trim().length < 2 ||
      !/^[a-zA-Z0-9_-]+$/.test(password.trim())
    ) {
      setPswdError(true)
      return
    }

    loginFn.execute(username, password).then(user => {
      if (user) {
        onLogin(user.id + '; ' + user.name)
      }
    })
  }

  return (
    <Box marginTop={10} padding={2}>
      <Center marginBottom={10}>
        <Heading>Login Your Account</Heading>
      </Center>

      <FormControl
        as="form"
        border="1px solid black"
        padding={4}
        borderRadius="md"
        onSubmit={handleSubmit}
      >
        <FormLabel htmlFor="username">username</FormLabel>
        <Input
          id="username"
          type="text"
          name="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          autoComplete="off"
        />
        {userError && <Text color="red">username is invalid</Text>}

        <FormLabel htmlFor="password">password</FormLabel>
        <Input
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoComplete="off"
        />
        {pswdError && <Text color="red">password is invalid</Text>}

        <Button
          isLoading={loginFn.loading}
          type="submit"
          marginTop={4}
          width="100%"
          colorScheme="blue"
          variant="ghost"
        >
          Login
        </Button>

        {loginFn.error && <Text color="red">{loginFn.error}</Text>}
      </FormControl>

      <Box
        border="1px solid black"
        marginTop={10}
        padding={4}
        borderRadius="md"
      >
        <Text textAlign="center">some info</Text>
      </Box>
    </Box>
  )
}

export default Login

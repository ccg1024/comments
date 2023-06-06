import {
  Box,
  Text,
  Button,
  FormControl,
  Textarea,
  FormErrorMessage
} from '@chakra-ui/react'
import { useState } from 'react'
import { useAuth } from '../context/auth'

export function CommentForm({
  loading,
  error,
  onSubmit,
  autoFocus = false,
  initialValue = ''
}) {
  const [message, setMessage] = useState(initialValue)
  const [notLogin, setNotLogin] = useState(false)
  const { token } = useAuth()

  function handleSubmit(e) {
    e.preventDefault()
    if (token) {
      const filterMessage = message.trim()
      onSubmit(filterMessage).then(() => setMessage(''))
    } else {
      setNotLogin(true)
    }
  }
  return (
    <Box>
      <FormControl
        as="form"
        isInvalid={error}
        isDisabled={loading}
        onSubmit={handleSubmit}
      >
        <Box display="flex" gap={2}>
          <Textarea
            autoFocus={autoFocus}
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          <Button height="unset" isDisabled={loading} type="submit">
            post
          </Button>
        </Box>
        <FormErrorMessage>{error}</FormErrorMessage>
        {notLogin && <Text color="red.400">Please log in first</Text>}
      </FormControl>
    </Box>
  )
}

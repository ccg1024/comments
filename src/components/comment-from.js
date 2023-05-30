import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Textarea,
  FormErrorMessage,
} from "@chakra-ui/react"
import { useState } from "react"

export function CommentForm({
  loading,
  error,
  onSubmit,
  autoFocus = false,
  initialValue = "",
}) {
  const [message, setMessage] = useState(initialValue)

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit(message).then(() => setMessage(""))
  }
  return (
    <Box>
      <FormControl
        as="form"
        isInvalid={loading || error}
        onSubmit={handleSubmit}
      >
        <FormLabel>input comment</FormLabel>
        <Box display="flex" gap={2}>
          <Textarea
            autoFocus={autoFocus}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            height="unset"
            isLoading={loading}
            loadingText="loading"
            type="submit"
          >
            post
          </Button>
        </Box>
        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
    </Box>
  )
}

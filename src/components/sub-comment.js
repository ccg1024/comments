import { Box, Flex, Text } from '@chakra-ui/react'
import { dateFormatter } from './comment'
import { CommentInteractive } from './interactive'

export function SubComment({
  id,
  message,
  user,
  createAt,
  likeCount,
  likedByMe,
  repliedUser
}) {
  return (
    <>
      <Box
        padding={4}
        backgroundColor="gray.200"
        borderTop="1px"
        borderStyle="solid"
        borderColor="gray.400"
      >
        <Flex gap={2} marginBottom={2}>
          <Text>{user.name}</Text>
          <Text fontWeight="light">@{repliedUser.name}</Text>
          <Box marginLeft="auto" as="span">
            {dateFormatter.format(Date.parse(createAt))}
          </Box>
        </Flex>
        <Box>{message}</Box>

        <CommentInteractive
          userId={user.id}
          likeCount={likeCount}
          likedByMe={likedByMe}
          message={message}
          commentId={id}
        />
      </Box>
    </>
  )
}

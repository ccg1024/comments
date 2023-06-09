import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import { dateFormatter } from './comment'
import { CommentInteractive } from './interactive'
import ShowContext from './show-context'

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
        backgroundColor={useColorModeValue('gray.200', 'blackAlpha.500')}
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
        <Box>
          <ShowContext context={message} />
        </Box>

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

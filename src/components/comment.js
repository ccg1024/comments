import { useState } from 'react'
import { Box, Text, Button } from '@chakra-ui/react'
import { usePost } from '../context/post-context'
import { SubCommentList } from './sub-comment-list'
import { CommentInteractive } from './interactive'

export const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short'
})

export function Comment({ id, message, user, createAt, likeCount, likedByMe }) {
  const [areChildrenHidden, setAreChildrenHidden] = useState(false)
  const { getReplies } = usePost()
  const childComments = getReplies(id)

  return (
    <>
      <Box padding={4} marginY={4}>
        <Box
          as="header"
          display="flex"
          justifyContent="space-between"
          marginY={4}
        >
          <Box as="span" fontWeight="bold" fontSize="1.2rem">
            {user.name}
          </Box>
          <Box as="span">{dateFormatter.format(Date.parse(createAt))}</Box>
        </Box>

        <Box paddingY={4} marginY={4}>
          <Text fontSize="1.2rem">{message}</Text>
        </Box>

        <CommentInteractive
          userId={user.id}
          likeCount={likeCount}
          likedByMe={likedByMe}
          message={message}
          commentId={id}
        />
      </Box>

      {childComments?.length > 0 && (
        <>
          <Button
            top={0}
            left="50%"
            transform="translate(-50%, 0)"
            position="absolute"
            display={areChildrenHidden ? 'block' : 'none'}
            onClick={() => setAreChildrenHidden(false)}
          >
            show replay
          </Button>
          <Box
            display={areChildrenHidden ? 'none' : 'block'}
            position="relative"
          >
            <SubCommentList comments={childComments} repliedUser={user} />
          </Box>
        </>
      )}
    </>
  )
}

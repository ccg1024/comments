import { Box } from '@chakra-ui/react'
import { Comment } from './comment'

export function CommentList({ comments }) {
  return comments.map(comment => (
    <Box
      key={comment.id}
      position="relative"
      borderBottom="1px"
      borderColor="gray.400"
      borderStyle="solid"
      marginY={4}
    >
      <Comment {...comment} />
    </Box>
  ))
}

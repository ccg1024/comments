import { Box } from "@chakra-ui/react"
import { Comment } from "./comment"

export function CommentList({ comments }) {
  return comments.map((comment) => (
    <Box key={comment.id} position="relative">
      <Comment {...comment} />
    </Box>
  ))
}

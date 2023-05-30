import { Box, Heading } from "@chakra-ui/react"
import { usePost } from "../context/post-context"
import { CommentList } from "./comment-list"
import { CommentForm } from "./comment-from"
import { useAsyncFn } from "../hooks/useAsync"
import { createComment } from "../services/comments"

export function Post() {
  const { post, rootComments, createLocalComment } = usePost()
  const { loading, error, execute: createCommentFn } = useAsyncFn(createComment)

  function onCommentCreate(message) {
    return createCommentFn({ postId: post.id, message }).then(
      createLocalComment
    )
  }

  return (
    <>
      <Heading as="h1" fontSize="1.5rem">
        {post.title}
      </Heading>
      <Box as="article" fontSize="1.1rem" marginY={4}>
        {post.body}
      </Box>
      <Heading as="h3" fontSize="1.3rem" marginY={4}>
        Comments
      </Heading>
      <Box as="section">
        <CommentForm
          loading={loading}
          error={error}
          onSubmit={onCommentCreate}
        />
        {rootComments != null && rootComments.length > 0 && (
          <Box>
            <CommentList comments={rootComments} />
          </Box>
        )}
      </Box>
    </>
  )
}

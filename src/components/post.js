import { Box, Heading, Text } from '@chakra-ui/react'
import { usePost } from '../context/post-context'
import { CommentList } from './comment-list'
import { CommentForm } from './comment-from'
import { useAsyncFn } from '../hooks/useAsync'
import { createComment } from '../services/comments'
import { Section } from './sections'
import { dateFormater } from './post-list'
import { FaUser } from 'react-icons/fa'
import ShowContext from './show-context'

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
      <Box marginTop={4}>
        <Section delay={0.1}>
          <Box display="flex" alignItems="center" gap={4}>
            <Box
              borderWidth="1px"
              borderStyle="solid"
              borderColor="gray.200"
              borderRadius="full"
              padding={4}
            >
              <FaUser fontSize="3rem" />
            </Box>
            <Text fontSize="3rem" fontWeight="bold">
              {post.user.name}
            </Text>
          </Box>
        </Section>

        <Section delay={0.2}>
          <Heading as="h1" fontSize="2.5rem" marginY={8}>
            {post.title}
          </Heading>
          <Box as="article" fontSize="1.2rem" marginY={4}>
            <ShowContext context={post.body} />
          </Box>
          <Text textAlign="right" fontSize="1rem">
            {dateFormater.format(Date.parse(post.createAt))}
          </Text>
        </Section>

        <Section delay={0.3}>
          <Heading as="h3" fontSize="1.3rem" marginY={4}>
            Comments
          </Heading>

          <CommentForm
            loading={loading}
            error={error}
            onSubmit={onCommentCreate}
          />
        </Section>

        <Section delay={0.4}>
          <Box as="section" marginBottom={16}>
            {rootComments != null && rootComments.length > 0 && (
              <CommentList comments={rootComments} />
            )}
          </Box>
        </Section>
      </Box>
    </>
  )
}

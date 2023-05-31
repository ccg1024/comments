import { Heading, Text, Box, Center, Spinner } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { getPosts } from '../services/posts'
import { useAsync } from '../hooks/useAsync'
import { FaUser } from 'react-icons/fa'
import { Section } from './sections'

export const dateFormater = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'full',
  timeStyle: 'short'
})

export function PostList() {
  const { loading, error, value: posts } = useAsync(getPosts)

  if (loading)
    return (
      <Center marginTop={10}>
        <Spinner transform="translate(-50%, 0)" size="lg" />
      </Center>
    )
  if (error) return <Heading color="red">Got Error, {error}</Heading>

  return (
    <Section>
      {posts.map(post => {
        return (
          <Box
            key={post.id}
            padding={4}
            borderBottom="1px"
            borderStyle="solid"
            borderColor="gray.400"
            marginY={2}
          >
            <Box
              as="header"
              display="flex"
              gap={2}
              alignItems="center"
              marginBottom={4}
            >
              <Box border="1px solid black" padding={2} borderRadius="full">
                <FaUser />
              </Box>
              <Text id={post.user.id}>{post.user.name}</Text>
              <Text>·</Text>
              <Text>{dateFormater.format(Date.parse(post.createAt))}</Text>
            </Box>
            <Box display="flex">
              <Box flexBasis={{ md: '80%' }}>
                <Link to={`/posts/${post.id}`}>
                  <Heading as="h1" fontSize="24px" marginBottom={2}>
                    {post.title}
                  </Heading>
                  <Text>{post.body}</Text>
                </Link>
              </Box>
              <Box flexBasis={{ md: '20%' }}></Box>
            </Box>
          </Box>
        )
      })}
    </Section>
  )
}

export default PostList

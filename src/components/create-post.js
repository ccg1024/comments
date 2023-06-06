import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Text,
  Heading,
  Input,
  useColorModeValue,
  Button
} from '@chakra-ui/react'
import { Section } from './sections'
import {
  EditorView,
  highlightSpecialChars,
  drawSelection,
  highlightActiveLine
} from '@codemirror/view'
import { EditorState } from '@codemirror/state'
import { syntaxHighlighting, defaultHighlightStyle } from '@codemirror/language'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'
import { createPost } from '../services/posts'
import { useAsyncFn } from '../hooks/useAsync'

const defaultTheme = EditorView.theme({
  '&': {
    height: '100%',
    fontSize: '1.2rem'
  }
})

export function CreatePost() {
  const containerRef = useRef(null)
  const editorRef = useRef(null)
  const [title, setTitle] = useState('')
  const { loading, error, execute: createPostFn } = useAsyncFn(createPost)
  const navigate = useNavigate()

  useEffect(() => {
    const state = EditorState.create({
      doc: '# new post\n',
      extensions: [
        highlightSpecialChars(),
        drawSelection(),
        syntaxHighlighting(defaultHighlightStyle),
        defaultTheme,
        highlightActiveLine(),
        markdown({ codeLanguages: languages, base: markdownLanguage })
      ]
    })

    const view = new EditorView({
      state: state,
      parent: containerRef.current
    })

    editorRef.current = view

    return () => {
      editorRef.current = null
      view.destroy()
    }
  }, [])

  function handleClick() {
    createPostFn({ title, body: editorRef.current.state.doc.toString() }).then(
      post => {
        if (post.id) {
          navigate(`/posts/${post.id}`, { replace: true })
        }
      }
    )
  }

  return (
    <Section>
      <Box paddingTop={10} height="90vh" display="flex" flexDirection="column">
        {error && (
          <Text color="red" fontWeight="bold">
            {error}
          </Text>
        )}
        <Heading as="h1" fontSize="1.8rem">
          Post Title
        </Heading>
        <Box marginY={8} display="flex" gap={2}>
          <Input
            borderColor={useColorModeValue('black', 'white')}
            borderWidth="2px"
            fontSize="1.2rem"
            value={title}
            name="title"
            onChange={e => setTitle(e.target.value)}
          />
          <Button
            colorScheme="facebook"
            onClick={handleClick}
            isDisabled={loading}
          >
            submmit
          </Button>
        </Box>

        <Heading as="h1" fontSize="1.8rem">
          Post Body
        </Heading>
        <Box
          ref={containerRef}
          borderWidth="2px"
          borderStyle="solid"
          borderRadius="md"
          borderColor={useColorModeValue('black', 'white')}
          marginY={8}
          flexGrow={1}
        ></Box>
      </Box>
    </Section>
  )
}

import { Box, Text, Code, useColorModeValue } from '@chakra-ui/react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import docco from 'react-syntax-highlighter/dist/esm/styles/hljs/docco'

export function RemarkCodePre(props) {
  return (
    <Box
      as="pre"
      boxSizing="border-box"
      padding={2}
      backgroundColor={useColorModeValue('#CCCCCC22', '#CCCCCC22')}
      overflow="auto"
    >
      {props.children}
    </Box>
  )
}

export function RemarkText(props) {
  return <Text marginY="1rem">{props.children}</Text>
}

export function RemarkCode(props) {
  const { inline, className } = props
  const match = /language-(\w+)/.exec(className || '')
  const inlineColor = useColorModeValue('#3D7AED', '#FF63C3')
  return !inline && match ? (
    <SyntaxHighlighter
      style={docco}
      language={match[1]}
      showLineNumbers="true"
      PreTag="div"
      customStyle={{
        marginTop: '10px',
        marginBottom: '10px',
        borderRadius: '5px'
      }}
    >
      {String(props.children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <Code
      color={inlineColor}
      fontWeight="bold"
      className={className}
      fontSize="1rem"
      backgroundColor="unset"
    >
      {props.children}
    </Code>
  )
}

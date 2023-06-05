import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const styles = {
  global: props => ({
    body: {
      bg: mode('white', 'gray.900')(props)
    }
  })
}

const commentTheme = extendTheme({
  styles: styles
})

export default commentTheme

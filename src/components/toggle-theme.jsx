import { useColorMode, IconButton, useColorModeValue } from '@chakra-ui/react'
import { FaSun, FaMoon } from 'react-icons/fa'
import { AnimatePresence, motion } from 'framer-motion'

export function ToggleTheme() {
  const { colorMode, toggleColorMode } = useColorMode()
  const isLight = colorMode === 'light'
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={colorMode}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <IconButton
          backgroundColor={useColorModeValue(
            'blackAlpha.200',
            'whiteAlpha.200'
          )}
          aria-label="Toogle Theme"
          size="md"
          icon={isLight ? <FaMoon /> : <FaSun />}
          marginX="1rem"
          onClick={toggleColorMode}
        />
      </motion.div>
    </AnimatePresence>
  )
}

import {
  Box,
  Flex,
  Text,
  Container,
  useColorModeValue,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem
} from '@chakra-ui/react'
import { Link, NavLink } from 'react-router-dom'
import { Global } from '@emotion/react'
import { useAuth } from '../context/auth'
import { FaUser } from 'react-icons/fa'
import { useAsyncFn } from '../hooks/useAsync'
import { outLogin } from '../services/auth'

const LogLinkStyle = () => (
  <Global
    styles={{
      '.log-link': {
        color: useColorModeValue('black', 'white'),
        padding: 'var(--chakra-space-2)'
      },
      '.log-link:hover': {
        backgroundColor: 'var(--chakra-colors-blue-50)'
      },
      '.active': {
        backgroundColor: 'var(--chakra-colors-blue-100)',
        padding: 'var(--chakra-space-2)'
      }
    }}
  />
)

const LoginMenu = ({ username, onLogout }) => {
  const logoutFn = useAsyncFn(outLogin)

  function handleLogout() {
    logoutFn.execute().then(message => {
      if (message) {
        onLogout()
      }
    })
  }

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="user"
        icon={<FaUser />}
        variant="outline"
        borderRadius="lg"
      />
      <MenuList>
        <MenuItem>{username}</MenuItem>
        <MenuItem onClick={handleLogout}>logout</MenuItem>
      </MenuList>
    </Menu>
  )
}

const NavBar = () => {
  const { token, onLogout } = useAuth()
  return (
    <Box
      paddingY={2}
      position="fixed"
      width="100%"
      backgroundColor={useColorModeValue('whiteAlpha.50', 'blackAlpha.50')}
      zIndex={1}
      boxShadow="lg"
    >
      <LogLinkStyle />
      <Container maxWidth="container.md">
        <Flex justifyContent="space-between" alignItems="center">
          <Link to="/">
            <Text fontWeight="bold" fontSize="1.5rem">
              Comment
            </Text>
          </Link>
          <Box display="flex" gap={2}>
            {token ? (
              <LoginMenu username={token.split('; ')[1]} onLogout={onLogout} />
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? 'active' : 'log-link'
                  }
                >
                  <Text>log in</Text>
                </NavLink>
                <NavLink
                  to="/registe"
                  className={({ isActive }) =>
                    isActive ? 'active' : 'log-link'
                  }
                >
                  <Text>Sign up</Text>
                </NavLink>
              </>
            )}
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}

export default NavBar

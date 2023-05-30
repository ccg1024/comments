import { Button, Box } from "@chakra-ui/react"
export function IconBtn({ Icon, isActive, color, children, ...props }) {
  return (
    <Button variant="link" color={color} {...props}>
      <Box as="span" marginRight={children != null ? 2 : 0}>
        <Icon color={isActive ? "var(--chakra-colors-red-400)" : "unset"} />
      </Box>
      {children}
    </Button>
  )
}

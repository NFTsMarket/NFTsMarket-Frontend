import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Link as ChakraLink,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { forwardRef } from "react";
import { useAuth } from "../../context/AuthContext";
import ThemeButton from "../common/ThemeButton";

const ActiveThemedLink = forwardRef(({ children, href, ...props }, ref) => {
  const router = useRouter();
  const isCurrentPath = router.pathname === href;

  const bgColor = useColorModeValue("purple.700", "purple.500");

  return (
    <ChakraLink
      px="2"
      py="2"
      rounded="md"
      _hover={{
        textDecoration: "none",
        bg: bgColor,
      }}
      bg={isCurrentPath && bgColor}
      ref={ref}
      {...props}
    >
      {children}
    </ChakraLink>
  );
});
ActiveThemedLink.displayName = "ActiveThemedLink";

const NavLinks = ({ isLoggedIn }) => (
  <>
    <Link href="/" passHref>
      <ActiveThemedLink>Catalog</ActiveThemedLink>
    </Link>
    {isLoggedIn && (
      <>
        <Link href="/assets" passHref>
          <ActiveThemedLink>My Assets</ActiveThemedLink>
        </Link>
        <Link href="/sales" passHref>
          <ActiveThemedLink>Pending Sales</ActiveThemedLink>
        </Link>
      </>
    )}
  </>
);

export default function Navbar(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuthenticated, user, dispatch } = useAuth();
  const router = useRouter();

  const menuTextColor = useColorModeValue("gray.700", "white");
  const brandColors = useColorModeValue("purple.500", "purple.700");

  return (
    <Box as="nav" bg={brandColors} color="white" px="4" {...props}>
      <Flex h="14" alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          bg={brandColors}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={isOpen ? "opened menu" : "closed menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />

        <HStack spacing="12" alignItems="center">
          <Link href="/" passHref>
            <Heading
              as="h1"
              fontSize={{ base: "18px", md: "26px" }}
              letterSpacing={"tighter"}
              cursor="pointer"
            >
              NFTs Market
            </Heading>
          </Link>

          <HStack spacing="10" display={{ base: "none", md: "flex" }}>
            <NavLinks isLoggedIn={isAuthenticated} />
          </HStack>
        </HStack>

        <HStack spacing="5">
          <ThemeButton />
          {isAuthenticated ? (
            <Box>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded="full"
                  variant="link"
                  cursor="pointer"
                  minW={0}
                >
                  <Avatar size="sm" src={user?.profilePicture} />
                </MenuButton>

                <MenuList alignItems="center" color={menuTextColor}>
                  <VStack spacing="4" my="5">
                    <Avatar size="xl" src={user?.profilePicture} />
                    <Text>{user.name}</Text>
                  </VStack>
                  <MenuDivider />
                  <MenuItem>
                    <Link href="/profile" passHref>
                      My profile
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link href="/wallet" passHref>
                      My wallet
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link href="/purchases" passHref>
                      Purchases
                    </Link>
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem
                    onClick={() =>
                      router
                        .replace("/")
                        .then(() => dispatch({ type: "LOGOUT" }))
                    }
                  >
                    Log Out
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          ) : (
            <>
              <Link href="/signup" passHref>
                <Button
                  variant="outline"
                  _hover={{ color: "purple.500", bg: "white" }}
                >
                  Sign Up
                </Button>
              </Link>
              <Link href="/login" passHref>
                <Button colorScheme="purple">Log In</Button>
              </Link>
            </>
          )}
        </HStack>
      </Flex>

      {isOpen && (
        <Box pb={4} display={{ md: "none" }}>
          <Stack spacing={4}>
            <NavLinks isLoggedIn={isAuthenticated} />
          </Stack>
        </Box>
      )}
    </Box>
  );
}

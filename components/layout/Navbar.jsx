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
import { useAuth } from "../../context/AuthContext";
import ThemeButton from "../common/ThemeButton";

const ThemedLink = ({ children, ...props }) => (
  <ChakraLink
    px="2"
    py="2"
    rounded="md"
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("purple.700", "purple.500"),
    }}
    {...props}
  >
    {children}
  </ChakraLink>
);

export default function Navbar(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoggedIn, signOut, userData } = useAuth();

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
            <Link href="/" passHref>
              <ThemedLink>Catalog</ThemedLink>
            </Link>
            {isLoggedIn && (
              <>
                <Link href="/assets" passHref>
                  <ThemedLink>My Assets</ThemedLink>
                </Link>
                <Link href="/sales" passHref>
                  <ThemedLink>Pending Sales</ThemedLink>
                </Link>
              </>
            )}
          </HStack>
        </HStack>

        <HStack spacing="5">
          <ThemeButton />
          {isLoggedIn ? (
            <Box>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded="full"
                  variant="link"
                  cursor="pointer"
                  minW={0}
                >
                  <Avatar size="sm" src={userData.profilePicture} />
                </MenuButton>

                <MenuList alignItems="center" color={menuTextColor}>
                  <VStack spacing="4" my="5">
                    <Avatar size="xl" src={userData.profilePicture} />
                    <Text>{userData.name}</Text>
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
                  <MenuItem onClick={() => signOut()}>Log Out</MenuItem>
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
            <Link href="/" passHref>
              <ThemedLink>Catalog</ThemedLink>
            </Link>
            {isLoggedIn && (
              <>
                <Link href="/assets" passHref>
                  <ThemedLink>My Assets</ThemedLink>
                </Link>
                <Link href="/sales" passHref>
                  <ThemedLink>Pending Sales</ThemedLink>
                </Link>
              </>
            )}
          </Stack>
        </Box>
      )}
    </Box>
  );
}

import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
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

export default function Navbar(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoggedIn, signOut, userData } = useAuth();

  const handleToggle = () => (isOpen ? onClose() : onOpen());

  const menuTextColor = useColorModeValue("gray.700", "white");

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={4}
      bg="purple.500"
      color="white"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Link href="/" passHref>
          <Heading as="h1" size="lg" letterSpacing={"tighter"} cursor="pointer">
            NFTs Market
          </Heading>
        </Link>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <HamburgerIcon />
      </Box>

      <Stack
        direction={{ base: "column", md: "row" }}
        display={{ base: isOpen ? "block" : "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
        ml={5}
        mt={{ base: 4, md: 0 }}
        spacing={10}
      >
        <Link href="/" passHref>
          <ChakraLink>Catalog</ChakraLink>
        </Link>

        {isLoggedIn && (
          <>
            <Link href="/assets" passHref>
              <ChakraLink>My Assets</ChakraLink>
            </Link>
            <Link href="/sales" passHref>
              <ChakraLink>Pending Sales</ChakraLink>
            </Link>
          </>
        )}
      </Stack>

      <HStack spacing="5">
        <ThemeButton />
        {!isLoggedIn ? (
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
        ) : (
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
        )}
      </HStack>
    </Flex>
  );
}

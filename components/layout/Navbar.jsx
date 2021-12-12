import Link from "next/link";

import {
  Box,
  Stack,
  Heading,
  Flex,
  Text,
  Button,
  useDisclosure,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";

export default function Navbar(props) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleToggle = () => (isOpen ? onClose() : onOpen());

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
        spacing="32px"
      >
        <Link href="/" passHref>
          <Text cursor="pointer">Catalog</Text>
        </Link>
        <Link href="/assets" passHref>
          <Text cursor="pointer">My Assets</Text>
        </Link>
        <Link href="/sales" passHref>
          <Text cursor="pointer">Pending Sales</Text>
        </Link>
        <Link href="/purchases" passHref>
          <Text cursor="pointer">Purchases</Text>
        </Link>
        <Link href="/wallet" passHref>
          <Text cursor="pointer">Wallet</Text>
        </Link>
      </Stack>

      <Box
        display={{ base: isOpen ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        <Button
          onClick={toggleColorMode}
          mr={4}
          color={useColorModeValue("purple.500", "white")}
        >
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
        <Button
          variant="outline"
          _hover={{ color: "purple.500", bg: "white" }}
          mr={4}
        >
          Sign Up
        </Button>
        <Button colorScheme="purple">Log In</Button>
      </Box>
    </Flex>
  );
}

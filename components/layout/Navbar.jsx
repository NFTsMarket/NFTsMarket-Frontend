import Link from "next/link";
import {
  Box,
  Stack,
  Heading,
  Flex,
  Button,
  ButtonGroup,
  useDisclosure,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

import ThemeButton from "../common/ThemeButton";

export default function Navbar(props) {
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
          <ChakraLink>Catalog</ChakraLink>
        </Link>
        <Link href="/assets" passHref>
          <ChakraLink>My Assets</ChakraLink>
        </Link>
        <Link href="/sales" passHref>
          <ChakraLink>Pending Sales</ChakraLink>
        </Link>
        <Link href="/purchases" passHref>
          <ChakraLink>Purchases</ChakraLink>
        </Link>
        <Link href="/wallet" passHref>
          <ChakraLink>Wallet</ChakraLink>
        </Link>
      </Stack>

      <ButtonGroup
        display={{ base: isOpen ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
        spacing="4"
      >
        <ThemeButton />
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
      </ButtonGroup>
    </Flex>
  );
}

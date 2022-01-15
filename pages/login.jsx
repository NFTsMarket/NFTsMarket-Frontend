import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Link as ChakraLink,
  SimpleGrid,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import LoginForm from "../components/auth/LoginForm";
import ThemeButton from "../components/common/ThemeButton";

function Login() {
  // chakra colors
  const textColors = useColorModeValue("purple.500", "purple.200");
  const bgColor = useColorModeValue("gray.50", "inherit");
  const boxColor = useColorModeValue("white", "gray.700");
  const separatorColor = useColorModeValue("gray.600", "gray.400");

  return (
    <>
      <Head>
        <title>Log In | NFTs Market</title>
      </Head>
      <Box
        bg={bgColor}
        minH="100vh"
        py="12"
        px={{
          base: "4",
          lg: "8",
        }}
      >
        <Flex
          justify="space-between"
          mb={{
            base: "10",
            md: "20",
          }}
        >
          <Link href="/" passHref>
            <ChakraLink>
              <Heading
                textAlign="center"
                size="lg"
                color={textColors}
                fontWeight="extrabold"
              >
                NFTs Market
              </Heading>
            </ChakraLink>
          </Link>
          <ThemeButton />
        </Flex>
        <Box maxW="md" mx="auto">
          <Heading textAlign="center" size="xl" fontWeight="extrabold">
            Log In
          </Heading>
          <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
            <Text as="span">Don&apos;t have an account? </Text>
            <Link href="/signup" passHref>
              <ChakraLink color={textColors}>Sign Up!</ChakraLink>
            </Link>
          </Text>
          <Box
            bg={boxColor}
            py="8"
            px={{
              base: "4",
              md: "10",
            }}
            shadow="base"
            rounded={{
              sm: "lg",
            }}
          >
            <LoginForm />

            <Flex align="center" color="gray.300" mt="5">
              <Box flex="1">
                <Divider borderColor="currentcolor" />
              </Box>
              <Text as="span" px="3" color={separatorColor} fontWeight="medium">
                or continue with
              </Text>
              <Box flex="1">
                <Divider borderColor="currentcolor" />
              </Box>
            </Flex>

            <SimpleGrid mt="6" columns={2} spacing="3">
              <Button color="currentColor" variant="outline">
                <VisuallyHidden>Login with Facebook</VisuallyHidden>
                <FaFacebook />
              </Button>
              <Button color="currentColor" variant="outline">
                <VisuallyHidden>Login with Google</VisuallyHidden>
                <FaGoogle />
              </Button>
            </SimpleGrid>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Login;

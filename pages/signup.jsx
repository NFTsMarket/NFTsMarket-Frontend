import {
  Box,
  Flex,
  Heading,
  Link as ChakraLink,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import AuthCard from "../components/auth/AuthCard";
import AuthContainer from "../components/auth/AuthContainer";
import DividerWithText from "../components/auth/DividerWithText";
import SignupForm from "../components/auth/SignupForm";
import SocialButtons from "../components/auth/SocialButtons";
import ThemeButton from "../components/common/ThemeButton";

function SignUp() {
  const textColors = useColorModeValue("purple.500", "purple.200");

  return (
    <>
      <Head>
        <title>Sign Up | NFTs Market</title>
      </Head>
      <AuthContainer>
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
            Sign Up
          </Heading>
          <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
            <Text as="span">Already have an account? </Text>
            <Link href="/login" passHref>
              <ChakraLink color={textColors}>Log In!</ChakraLink>
            </Link>
          </Text>
          <AuthCard>
            <SignupForm />
            <DividerWithText mt="5">or continue with</DividerWithText>
            <SocialButtons />
          </AuthCard>
        </Box>
      </AuthContainer>
    </>
  );
}

export default SignUp;

import {
  Box,
  Heading,
  Link as ChakraLink,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import AuthCard from "../components/auth/AuthCard";
import AuthContainer from "../components/auth/AuthContainer";
import AuthHeader from "../components/auth/AuthHeader";
import DividerWithText from "../components/auth/DividerWithText";
import LoginForm from "../components/auth/LoginForm";
import SocialButtons from "../components/auth/SocialButtons";

function Login() {
  const textColors = useColorModeValue("purple.500", "purple.200");

  return (
    <>
      <Head>
        <title>Log In | NFTs Market</title>
      </Head>
      <AuthContainer>
        <AuthHeader />
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
          <AuthCard>
            <LoginForm />
            <DividerWithText mt="5">or continue with</DividerWithText>
            <SocialButtons />
          </AuthCard>
        </Box>
      </AuthContainer>
    </>
  );
}

export default Login;

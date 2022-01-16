import { Box } from "@chakra-ui/react";
import Head from "next/head";
import AuthCard from "../components/auth/AuthCard";
import AuthContainer from "../components/auth/AuthContainer";
import AuthHeader from "../components/auth/AuthHeader";
import AuthText from "../components/auth/AuthText";
import DividerWithText from "../components/auth/DividerWithText";
import LoginForm from "../components/auth/forms/LoginForm";
import SocialButtons from "../components/auth/SocialButtons";

function Login() {
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
          <AuthText
            headingText="Log In"
            helperText="Don't have an account? "
            linkHref="/signup"
            linkText="Sign Up!"
          />
          <AuthCard>
            <LoginForm />
            <DividerWithText mt="5">or continue with</DividerWithText>
            <SocialButtons />
          </AuthCard>
        </Box>
      </Box>
    </>
  );
}

export default Login;

import { Box } from "@chakra-ui/react";
import Head from "next/head";
import AuthCard from "../components/auth/AuthCard";
import AuthContainer from "../components/auth/AuthContainer";
import AuthHeader from "../components/auth/AuthHeader";
import AuthText from "../components/auth/AuthText";
import DividerWithText from "../components/auth/DividerWithText";
import SignupForm from "../components/auth/forms/SignupForm";
import SocialButtons from "../components/auth/SocialButtons";

function SignUp() {
  return (
    <>
      <Head>
        <title>Sign Up | NFTs Market</title>
      </Head>
      <AuthContainer>
        <AuthHeader />
        <Box maxW="md" mx="auto">
          <AuthText
            headingText="Sign Up"
            helperText="Already have an account? "
            linkHref="/login"
            linkText="Log In!"
          />
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

import { Box } from "@chakra-ui/react";
import Head from "next/head";
import AuthCard from "../../components/auth/AuthCard";
import AuthContainer from "../../components/auth/AuthContainer";
import AuthHeader from "../../components/auth/AuthHeader";
import AuthText from "../../components/auth/AuthText";
import EmailForm from "../../components/auth/forms/EmailForm";

function SendEmail() {
  return (
    <>
      <Head>
        <title>Reset Password | NFTs Market</title>
      </Head>
      <AuthContainer>
        <AuthHeader />
        <Box maxW="md" mx="auto">
          <AuthText
            headingText="Reset Password"
            helperText="We'll send you an email to reset your password"
          />
          <AuthCard>
            <EmailForm />
          </AuthCard>
        </Box>
      </AuthContainer>
    </>
  );
}

export default SendEmail;

import { Box } from "@chakra-ui/react";
import Head from "next/head";
import AuthCard from "../../components/auth/AuthCard";
import AuthContainer from "../../components/auth/AuthContainer";
import AuthHeader from "../../components/auth/AuthHeader";
import AuthText from "../../components/auth/AuthText";
import ResetPasswordForm from "../../components/auth/forms/ResetPasswordForm";

function ResetPassword() {
  return (
    <>
      <Head>
        <title>Reset Password | NFTs Market</title>
      </Head>
      <AuthContainer>
        <AuthHeader />
        <Box maxW="md" mx="auto">
          <AuthText headingText="Reset Password" />
          <AuthCard mt="8">
            <ResetPasswordForm />
          </AuthCard>
        </Box>
      </AuthContainer>
    </>
  );
}

export default ResetPassword;

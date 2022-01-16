import { Box, Heading } from "@chakra-ui/react";
import Head from "next/head";
import AuthCard from "../../components/auth/AuthCard";
import AuthContainer from "../../components/auth/AuthContainer";
import AuthHeader from "../../components/auth/AuthHeader";
import ResetPasswordForm from "../../components/auth/ResetPasswordForm";

function ResetPassword() {
  return (
    <>
      <Head>
        <title>Reset Password | NFTs Market</title>
      </Head>
      <AuthContainer>
        <AuthHeader />
        <Box maxW="md" mx="auto">
          <Heading textAlign="center" size="xl" fontWeight="extrabold">
            Reset Password
          </Heading>
          <AuthCard mt="8">
            <ResetPasswordForm />
          </AuthCard>
        </Box>
      </AuthContainer>
    </>
  );
}

export default ResetPassword;

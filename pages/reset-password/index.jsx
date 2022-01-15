import { Box, Heading, Text } from "@chakra-ui/react";
import Head from "next/head";
import AuthCard from "../../components/auth/AuthCard";
import AuthContainer from "../../components/auth/AuthContainer";
import AuthHeader from "../../components/auth/AuthHeader";
import PasswordResetForm from "../../components/auth/PasswordResetForm";

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
          <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
            We'll send you an email to reset your password
          </Text>
          <AuthCard>
            <PasswordResetForm />
          </AuthCard>
        </Box>
      </AuthContainer>
    </>
  );
}

export default ResetPassword;

import { Box, Heading, Text } from "@chakra-ui/react";
import Head from "next/head";
import AuthCard from "../../components/auth/AuthCard";
import AuthContainer from "../../components/auth/AuthContainer";
import AuthHeader from "../../components/auth/AuthHeader";
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
          <Heading textAlign="center" size="xl" fontWeight="extrabold">
            Reset Password
          </Heading>
          <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
            We&apos;ll send you an email to reset your password
          </Text>
          <AuthCard>
            <EmailForm />
          </AuthCard>
        </Box>
      </AuthContainer>
    </>
  );
}

export default SendEmail;

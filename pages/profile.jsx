import { Avatar, Box, Flex, Text, VStack } from "@chakra-ui/react";
import Head from "next/head";
import AuthCard from "../components/auth/AuthCard";
import AuthText from "../components/auth/AuthText";
import OldPasswordForm from "../components/auth/forms/OldPasswordForm";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  return (
    <>
      <Head>
        <title>Profile | NFTs Market</title>
      </Head>

      <Box py="12">
        <AuthText headingText="Welcome to your profile" />
        <Flex
          justifyContent="center"
          alignItems="center"
          mt="10"
          gridGap="10"
          direction={{ base: "column", md: "row" }}
        >
          <AuthCard>
            <AuthText
              headingText="User Info"
              size="lg"
              fontWeight="semibold"
              mb="7"
            />
            {user && (
              <VStack spacing={6} align="flex-start">
                <Avatar
                  alignSelf="center"
                  size="2xl"
                  name={user.name}
                  src={user.profilePicture}
                />
                <Text fontSize="md">
                  <b>email:</b> {user.email}
                </Text>
                <Text fontSize="md">
                  <b>name:</b> {user.name}
                </Text>
              </VStack>
            )}
          </AuthCard>

          <AuthCard>
            <AuthText
              headingText="Change password"
              size="lg"
              fontWeight="semibold"
              mb="7"
            />
            <OldPasswordForm />
          </AuthCard>
        </Flex>
      </Box>
    </>
  );
}

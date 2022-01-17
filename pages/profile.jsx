import { useLazyQuery } from "@apollo/client";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";
import AuthCard from "../components/auth/AuthCard";
import AuthText from "../components/auth/AuthText";
import OldPasswordForm from "../components/auth/forms/OldPasswordForm";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useAuth } from "../context/AuthContext";
import { GET_USER } from "../utils/gqlMutations";

export default function Profile() {
  const { user, token, dispatch } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [getPhotoURL] = useLazyQuery(GET_USER, {
    fetchPolicy: "network-only",
  });

  const updatePhoto = async ({
    target: {
      validity,
      files: [file],
    },
  }) => {
    if (validity.valid) {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_GATEWAY_DOMAIN}/profilePicture`,
        {
          method: "POST",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: formData,
        }
      );
      const profileChanged = await response.json();

      if (profileChanged) {
        setLoading(true);

        // Have to wait 2 seconds till the image is uploaded to GCP
        setTimeout(async () => {
          const {
            data: {
              self: { profilePicture },
            },
          } = await getPhotoURL();

          dispatch({
            type: "UPDATE_PICTURE",
            payload: {
              profilePicture: profilePicture,
            },
          });

          setLoading(false);

          onClose();
        }, 4000);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Profile | NFTs Market</title>
      </Head>

      {loading && <LoadingSpinner loading={loading} />}

      <Box py="12">
        <AuthText headingText="Welcome to your profile" />
        <Flex
          justifyContent="center"
          alignItems={{ base: "center", md: "unset" }}
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
                <VStack alignSelf="center" spacing={4}>
                  <Avatar
                    size="2xl"
                    name={user.name}
                    src={user.profilePicture}
                  />
                  <Button
                    size="md"
                    type="file"
                    variant="ghost"
                    colorScheme="purple"
                    onClick={onOpen}
                  >
                    replace photo
                  </Button>
                </VStack>
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update profile picture</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <input type="file" required onChange={updatePhoto} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="purple" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

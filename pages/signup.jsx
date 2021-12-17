import { useForm } from "react-hook-form";
import Link from "next/link";
import Head from "next/head";
import { HiEye, HiEyeOff } from "react-icons/hi";

import {
  Input,
  InputGroup,
  InputRightElement,
  Box,
  Stack,
  Text,
  Button,
  IconButton,
  ButtonGroup,
  useToast,
  Heading,
  Link as ChakraLink,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import AlertMessage from "../components/auth/AlertMessage";
import ThemeButton from "../components/common/ThemeButton";

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const toast = useToast();
  const { isOpen, onToggle } = useDisclosure();

  const onSubmit = (data) => {
    console.log(data);
    toast({
      title: "Welcome to NFTs Market!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <>
      <Head>
        <title>Sign Up | NFTs Market</title>
      </Head>
      <Box
        bg={useColorModeValue("gray.50", "inherit")}
        minH="100vh"
        py="12"
        px={{
          base: "4",
          lg: "8",
        }}
      >
        <Box maxW="md" mx="auto">
          <Link href="/" passHref>
            <ChakraLink>
              <Heading
                textAlign="center"
                size="lg"
                color="purple.200"
                fontWeight="extrabold"
                mb={{
                  base: "10",
                  md: "20",
                }}
              >
                NFTs Market
              </Heading>
            </ChakraLink>
          </Link>
          <Heading textAlign="center" size="xl" fontWeight="extrabold">
            Sign Up
          </Heading>
          <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
            <Text as="span">Already have an account? </Text>
            <Link href="/login">
              <ChakraLink color="purple.200">Log In</ChakraLink>
            </Link>
          </Text>
          <Box
            bg={useColorModeValue("white", "gray.700")}
            py="8"
            px={{
              base: "4",
              md: "10",
            }}
            shadow="base"
            rounded={{
              sm: "lg",
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={6}>
                <InputGroup size="md">
                  <Input
                    type="email"
                    placeholder="Enter email"
                    {...register("email", {
                      required: "Enter a valid email",
                      pattern:
                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    })}
                  />
                  {errors.email && (
                    <AlertMessage message={errors.email.message} />
                  )}
                </InputGroup>

                <InputGroup size="md">
                  <Input
                    placeholder="Enter name"
                    {...register("name", {
                      required: "Enter your name",
                      minLength: 3,
                      maxLength: 80,
                    })}
                  />
                  {errors.name && (
                    <AlertMessage message={errors.name.message} />
                  )}
                </InputGroup>

                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    type={isOpen ? "text" : "password"}
                    placeholder="Enter password"
                    {...register("password", {
                      required: "Enter a password",
                      minLength: {
                        value: 6,
                        message:
                          "Your password should be at least 6 characters long",
                      },
                    })}
                  />
                  <InputRightElement>
                    <IconButton
                      bg="transparent !important"
                      variant="ghost"
                      aria-label={isOpen ? "Mask password" : "Reveal password"}
                      icon={isOpen ? <HiEyeOff /> : <HiEye />}
                      onClick={onToggle}
                    />
                  </InputRightElement>
                </InputGroup>
                {errors.password && (
                  <AlertMessage message={errors.password.message} />
                )}

                <Button type="submit" colorScheme="purple">
                  Sign Up
                </Button>
                <ThemeButton />
              </Stack>
            </form>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default SignUp;

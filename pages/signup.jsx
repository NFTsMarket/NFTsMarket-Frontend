import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link as ChakraLink,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VisuallyHidden,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { HiEye, HiEyeOff } from "react-icons/hi";
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
        <ThemeButton />
        <Box maxW="md" mx="auto">
          <Link href="/" passHref>
            <ChakraLink>
              <Heading
                textAlign="center"
                size="lg"
                color={useColorModeValue("purple.500", "purple.200")}
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
              <ChakraLink color={useColorModeValue("purple.500", "purple.200")}>
                Log In!
              </ChakraLink>
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
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    {...register("email", {
                      required: "Enter a valid email",
                      pattern:
                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    })}
                  />
                  <FormHelperText>
                    We will send you a confirmation email shortly ;)
                  </FormHelperText>
                  {errors.email && (
                    <FormErrorMessage>{errors.email.message}</FormErrorMessage>
                  )}
                </FormControl>

                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    autoComplete="name"
                    {...register("name", {
                      required: "Enter your name",
                      minLength: 3,
                      maxLength: 80,
                    })}
                  />
                  <FormHelperText>So people know who you are!</FormHelperText>
                  {errors.name && (
                    <FormErrorMessage>{errors.name.message}</FormErrorMessage>
                  )}
                </FormControl>

                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <InputGroup size="md">
                    <Input
                      pr="4.5rem"
                      type={isOpen ? "text" : "password"}
                      autoComplete="new-password"
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
                        aria-label={
                          isOpen ? "Mask password" : "Reveal password"
                        }
                        icon={isOpen ? <HiEyeOff /> : <HiEye />}
                        onClick={onToggle}
                      />
                    </InputRightElement>
                  </InputGroup>
                  <FormHelperText>
                    At least 6 characters long pls
                  </FormHelperText>
                  {errors.password && (
                    <FormErrorMessage>
                      {errors.password.message}
                    </FormErrorMessage>
                  )}
                </FormControl>

                <Button type="submit" colorScheme="purple">
                  Sign Up
                </Button>
              </Stack>
            </form>

            <Flex align="center" color="gray.300" mt="5">
              <Box flex="1">
                <Divider borderColor="currentcolor" />
              </Box>
              <Text
                as="span"
                px="3"
                color={useColorModeValue("gray.600", "gray.400")}
                fontWeight="medium"
              >
                or continue with
              </Text>
              <Box flex="1">
                <Divider borderColor="currentcolor" />
              </Box>
            </Flex>

            <SimpleGrid mt="6" columns={2} spacing="3">
              <Button color="currentColor" variant="outline">
                <VisuallyHidden>Sign up with Facebook</VisuallyHidden>
                <FaFacebook />
              </Button>
              <Button color="currentColor" variant="outline">
                <VisuallyHidden>Sign up with Google</VisuallyHidden>
                <FaGoogle />
              </Button>
            </SimpleGrid>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default SignUp;

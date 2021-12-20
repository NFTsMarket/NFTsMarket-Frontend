import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
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
  Spinner,
  Center,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { HiEye, HiEyeOff } from "react-icons/hi";
import ThemeButton from "../components/common/ThemeButton";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { gql, useMutation } from "@apollo/client";
import MessagePage from "../components/common/CenteredText";

const LOG_IN_MUTATION = gql`
  mutation logIn($email: String!, $password: String!) {
    signInUser(input: { email: $email, password: $password }) {
      accessToken
      user {
        id
        email
        name
      }
    }
  }
`;

function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const toast = useToast();
  const { isOpen, onToggle } = useDisclosure();
  const { setIsLoggedIn, setAuthToken, authToken } = useAuth();
  const [signInUser, { loading, error }] = useMutation(LOG_IN_MUTATION);

  if (loading)
    return (
      <Center h="100vh" w="100%">
        <Spinner size="xl" colorScheme="purple" />
      </Center>
    );

  if (error) {
    toast({
      title: "There was an error",
      status: "error",
      duration: 3000,
      isClosable: true,
    });

    return <MessagePage>Submission error! {error.message}</MessagePage>;
  }

  const onSubmit = async ({ email, password }) => {
    try {
      const { data } = await signInUser({
        variables: {
          email,
          password,
        },
      });

      if (data?.signInUser?.accessToken) {
        setAuthToken(data.signInUser.accessToken);
        localStorage.setItem("accessToken", data.signInUser.accessToken);
        setIsLoggedIn(true);
        router.push(`/`);

        toast({
          title: "Welcome to NFTs Market!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(`error: ${error}`);
    }
  };

  return (
    <>
      <Head>
        <title>Log In | NFTs Market</title>
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
            Log In
          </Heading>
          <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
            <Text as="span">Don&apos;t have an account? </Text>
            <Link href="/signup">
              <ChakraLink color={useColorModeValue("purple.500", "purple.200")}>
                Sign Up!
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
                  {errors.email && (
                    <FormErrorMessage>{errors.email.message}</FormErrorMessage>
                  )}
                </FormControl>

                <FormControl id="password">
                  <Flex justify="space-between">
                    <FormLabel>Password</FormLabel>
                    <ChakraLink
                      color={useColorModeValue("purple.500", "purple.200")}
                      fontWeight="semibold"
                      fontSize="sm"
                    >
                      Forgot Password?
                    </ChakraLink>
                  </Flex>
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
                  {errors.password && (
                    <FormErrorMessage>
                      {errors.password.message}
                    </FormErrorMessage>
                  )}
                </FormControl>

                <Button type="submit" colorScheme="purple">
                  Log In
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
                <VisuallyHidden>Login with Facebook</VisuallyHidden>
                <FaFacebook />
              </Button>
              <Button color="currentColor" variant="outline">
                <VisuallyHidden>Login with Google</VisuallyHidden>
                <FaGoogle />
              </Button>
            </SimpleGrid>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Login;

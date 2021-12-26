import { gql, useMutation } from "@apollo/client";
import {
  Box,
  Button,
  Center,
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
  Spinner,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VisuallyHidden,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { HiEye, HiEyeOff } from "react-icons/hi";
import ThemeButton from "../components/common/ThemeButton";
import { useAuth } from "../context/AuthContext";

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
  // next hooks
  const router = useRouter();

  // form hooks
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // auth hooks
  const { setIsLoggedIn, authToken, setAuthToken, getUser } = useAuth();
  const [signInUser, { loading }] = useMutation(LOG_IN_MUTATION);

  // chakra hooks
  const toast = useToast();
  const { isOpen, onToggle } = useDisclosure();

  // chakra colors
  const textColors = useColorModeValue("purple.500", "purple.200");
  const bgColor = useColorModeValue("gray.50", "inherit");
  const boxColor = useColorModeValue("white", "gray.700");
  const separatorColor = useColorModeValue("gray.600", "gray.400");

  useEffect(() => {
    if (authToken) {
      setIsLoggedIn(true);
      router.push(`/`);
      toast({
        title: "Welcome to NFTs Market!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [authToken]);

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
      }

      getUser();
    } catch (error) {
      toast({
        title: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loading)
    return (
      <Center h="100vh" w="100%">
        <Spinner size="xl" colorScheme="purple" />
      </Center>
    );

  return (
    <>
      <Head>
        <title>Log In | NFTs Market</title>
      </Head>
      <Box
        bg={bgColor}
        minH="100vh"
        py="12"
        px={{
          base: "4",
          lg: "8",
        }}
      >
        <Flex
          justify="space-between"
          mb={{
            base: "10",
            md: "20",
          }}
        >
          <Link href="/" passHref>
            <ChakraLink>
              <Heading
                textAlign="center"
                size="lg"
                color={textColors}
                fontWeight="extrabold"
              >
                NFTs Market
              </Heading>
            </ChakraLink>
          </Link>
          <ThemeButton />
        </Flex>
        <Box maxW="md" mx="auto">
          <Heading textAlign="center" size="xl" fontWeight="extrabold">
            Log In
          </Heading>
          <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
            <Text as="span">Don&apos;t have an account? </Text>
            <Link href="/signup" passHref>
              <ChakraLink color={textColors}>Sign Up!</ChakraLink>
            </Link>
          </Text>
          <Box
            bg={boxColor}
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
                <FormControl id="email" isInvalid={!!errors.email}>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    {...register("email", {
                      required: "Please enter a valid email address",
                      pattern: !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    })}
                  />
                  <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
                </FormControl>

                <FormControl id="password" isInvalid={!!errors.password}>
                  <Flex justify="space-between">
                    <FormLabel>Password</FormLabel>
                    <ChakraLink
                      color={textColors}
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
                      autoComplete="current-password"
                      {...register("password", {
                        required: "Please enter a password",
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
                  <FormErrorMessage>
                    {errors?.password?.message}
                  </FormErrorMessage>
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
              <Text as="span" px="3" color={separatorColor} fontWeight="medium">
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

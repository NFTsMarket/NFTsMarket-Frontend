import { gql, useMutation } from "@apollo/client";
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
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { HiEye, HiEyeOff } from "react-icons/hi";
import CenteredText from "../components/common/CenteredText";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ThemeButton from "../components/common/ThemeButton";
import { useAuth } from "../context/AuthContext";

const SIGN_UP_MUTATION = gql`
  mutation signUp($email: String!, $name: String!, $password: String!) {
    signUpUser(input: { email: $email, name: $name, password: $password }) {
      user {
        name
      }
    }
  }
`;

function SignUp() {
  // next hooks
  const router = useRouter();

  // form hooks
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // auth hooks
  const [signUpUser, { loading }] = useMutation(SIGN_UP_MUTATION);

  // chakra hooks
  const toast = useToast();
  const { isOpen, onToggle } = useDisclosure();

  // chakra colors
  const textColors = useColorModeValue("purple.500", "purple.200");
  const bgColor = useColorModeValue("gray.50", "inherit");
  const boxColor = useColorModeValue("white", "gray.700");
  const separatorColor = useColorModeValue("gray.600", "gray.400");

  const onSubmit = async ({ email, name, password }) => {
    try {
      const { data } = await signUpUser({
        variables: {
          email,
          name,
          password,
        },
      });

      router.push("/confirm");

      toast({
        title: `Hey ${data.signUpUser.user.name}! We'll send you a confirmation email shortly ;)`,
        status: "info",
        duration: 6000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <Head>
        <title>Sign Up | NFTs Market</title>
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
            Sign Up
          </Heading>
          <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
            <Text as="span">Already have an account? </Text>
            <Link href="/login" passHref>
              <ChakraLink color={textColors}>Log In!</ChakraLink>
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
                  {!errors.email ? (
                    <FormHelperText>
                      Enter a valid email address 📧
                    </FormHelperText>
                  ) : (
                    <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                  )}
                </FormControl>

                <FormControl id="name" isInvalid={!!errors.name}>
                  <FormLabel>Name</FormLabel>
                  <Input
                    autoComplete="name"
                    {...register("name", {
                      required: "Please enter your name",
                      minLength: 3,
                      maxLength: 80,
                    })}
                  />
                  {!errors.name ? (
                    <FormHelperText>Enter your full name 🙏</FormHelperText>
                  ) : (
                    <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                  )}
                </FormControl>

                <FormControl id="password" isInvalid={!!errors.password}>
                  <FormLabel>Password</FormLabel>
                  <InputGroup size="md">
                    <Input
                      pr="4.5rem"
                      type={isOpen ? "text" : "password"}
                      autoComplete="new-password"
                      {...register("password", {
                        required: "Please enter a password",
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
                  {!errors.password ? (
                    <FormHelperText>
                      At least 6 characters long pls
                    </FormHelperText>
                  ) : (
                    <FormErrorMessage>
                      {errors.password?.message}
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
              <Text as="span" px="3" color={separatorColor} fontWeight="medium">
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

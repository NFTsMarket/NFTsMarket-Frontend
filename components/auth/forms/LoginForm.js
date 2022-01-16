import { useMutation } from "@apollo/client";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link as ChakraLink,
  Stack,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useAuth } from "../../../context/AuthContext";
import { LOG_IN_MUTATION } from "../../../utils/gqlMutations";
import LoadingSpinner from "../../common/LoadingSpinner";

function LoginForm() {
  // next hooks
  const router = useRouter();

  // form hooks
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // auth hooks
  const { dispatch } = useAuth();
  const [signInUser, { loading }] = useMutation(LOG_IN_MUTATION);

  // chakra hooks
  const toast = useToast();
  const { isOpen, onToggle } = useDisclosure();
  const textColors = useColorModeValue("purple.500", "purple.200");

  const onSubmit = async ({ email, password }) => {
    try {
      const { data } = await signInUser({
        variables: {
          email,
          password,
        },
      });

      router.push("/");

      dispatch({
        type: "LOGIN",
        payload: {
          token: data.signInUser.accessToken,
          user: data.signInUser.user,
        },
      });
    } catch (error) {
      toast({
        title: error.graphQLErrors
          ? error.graphQLErrors[0].message
          : error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      {loading && <LoadingSpinner loading={loading} />}
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
              <Link href="/reset-password" passHref>
                <ChakraLink
                  color={textColors}
                  fontWeight="semibold"
                  fontSize="sm"
                >
                  Forgot Password?
                </ChakraLink>
              </Link>
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
                  aria-label={isOpen ? "Mask password" : "Reveal password"}
                  icon={isOpen ? <HiEyeOff /> : <HiEye />}
                  onClick={onToggle}
                />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
          </FormControl>

          <Button type="submit" colorScheme="purple">
            Log In
          </Button>
        </Stack>
      </form>
    </>
  );
}

export default LoginForm;

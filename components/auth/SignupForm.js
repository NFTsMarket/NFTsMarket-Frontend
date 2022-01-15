import { gql, useMutation } from "@apollo/client";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { HiEye, HiEyeOff } from "react-icons/hi";
import LoadingSpinner from "../common/LoadingSpinner";

const SIGN_UP_MUTATION = gql`
  mutation signUp($email: String!, $name: String!, $password: String!) {
    signUpUser(input: { email: $email, name: $name, password: $password }) {
      user {
        name
      }
    }
  }
`;

function SignupForm() {
  // next hooks
  const router = useRouter();

  // auth hooks
  const [signUpUser, { loading }] = useMutation(SIGN_UP_MUTATION);

  // chakra hooks
  const toast = useToast();
  const { isOpen, onToggle } = useDisclosure();

  // form hooks
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
            {!errors.email ? (
              <FormHelperText>Enter a valid email address 📧</FormHelperText>
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
                  aria-label={isOpen ? "Mask password" : "Reveal password"}
                  icon={isOpen ? <HiEyeOff /> : <HiEye />}
                  onClick={onToggle}
                />
              </InputRightElement>
            </InputGroup>
            {!errors.password ? (
              <FormHelperText>At least 6 characters long pls</FormHelperText>
            ) : (
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            )}
          </FormControl>

          <Button type="submit" colorScheme="purple">
            Sign Up
          </Button>
        </Stack>
      </form>
    </>
  );
}

export default SignupForm;

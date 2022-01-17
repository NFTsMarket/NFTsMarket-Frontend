import { useMutation } from "@apollo/client";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../context/AuthContext";
import { SIGN_UP_MUTATION } from "../../../utils/gqlMutations";
import LoadingSpinner from "../../common/LoadingSpinner";
import PasswordInput from "../PasswordInput";

function SignupForm() {
  const [signUpUser, { loading }] = useMutation(SIGN_UP_MUTATION);
  const router = useRouter();
  const toast = useToast();
  const { dispatch } = useAuth();
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

      toast({
        title: `Hey ${data.signUpUser.user.name}! We'll send you a confirmation email shortly ;)`,
        status: "info",
        duration: 6000,
        isClosable: true,
      });

      router.push("/");

      dispatch({
        type: "LOGIN",
        payload: {
          token: data.signUpUser.accessToken,
          user: data.signUpUser.user,
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

          <PasswordInput
            name="password"
            formLabel="Password"
            requiredMessage="Please enter a password"
            autoComplete="new-password"
            register={register}
            error={errors.password}
            formHelperText="At least 6 characters long 🔑"
            lenghtValidation
          />

          <Button type="submit" colorScheme="purple">
            Sign Up
          </Button>
        </Stack>
      </form>
    </>
  );
}

export default SignupForm;

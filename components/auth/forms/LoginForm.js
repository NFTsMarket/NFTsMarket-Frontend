import { useMutation } from "@apollo/client";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../context/AuthContext";
import { LOG_IN_MUTATION } from "../../../utils/gqlMutations";
import LoadingSpinner from "../../common/LoadingSpinner";
import PasswordInput from "../PasswordInput";

function LoginForm() {
  const [signInUser, { loading }] = useMutation(LOG_IN_MUTATION);
  const router = useRouter();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { dispatch } = useAuth();

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

          <PasswordInput
            name="password"
            requiredMessage="Please enter a password"
            formLabel="Password"
            register={register}
            error={errors.password}
            linkText="Forgot Password?"
            linkHref="/reset-password"
          />

          <Button type="submit" colorScheme="purple">
            Log In
          </Button>
        </Stack>
      </form>
    </>
  );
}

export default LoginForm;

import { useMutation } from "@apollo/client";
import {
  Button,
  FormControl,
  FormErrorMessage,
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
import LoadingSpinner from "../../../components/common/LoadingSpinner";
import { VALIDATE_TOKEN_MUTATION } from "../../../utils/gqlMutations";
import PasswordInput from "../PasswordInput";

function ResetPasswordForm() {
  const router = useRouter();
  const { isOpen: isOpenPassword1, onToggle: onTogglePassword1 } =
    useDisclosure();
  const { isOpen: isOpenPassword2, onToggle: onTogglePassword2 } =
    useDisclosure();
  const toast = useToast();
  const [validateAuthToken, { loading }] = useMutation(VALIDATE_TOKEN_MUTATION);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ password1, password2 }) => {
    try {
      if (password1 !== password2) {
        setError("password2", {
          type: "manual",
          message: "Both passwords should be the same!",
        });
        return;
      }

      const {
        data: { validateToken },
      } = await validateAuthToken({
        variables: {
          token: router.query.token,
          password: password1,
        },
      });

      toast({
        title: validateToken ? "Your password was reset!" : "error?",
        description: "Redirecting you to the login page...",
        status: validateToken ? "success" : "error",
        duration: 6000,
        isClosable: true,
      });

      setTimeout(() => router.push("/login"), 5000);
    } catch (error) {
      toast({
        title: error.message,
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
          <PasswordInput
            name="password1"
            requiredMessage="Please enter a password"
            formLabel="New Password"
            register={register}
            error={errors.password1}
            lenghtValidation
          />

          <PasswordInput
            name="password2"
            requiredMessage="Please repeat the password"
            formLabel="Repeat Password"
            register={register}
            error={errors.password2}
          />

          <Button type="submit" colorScheme="purple">
            Reset password
          </Button>
        </Stack>
      </form>
    </>
  );
}

export default ResetPasswordForm;

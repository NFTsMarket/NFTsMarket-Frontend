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
          <FormControl id="password1" isInvalid={!!errors.password1}>
            <FormLabel>New Password</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={isOpenPassword1 ? "text" : "password"}
                autoComplete="current-password"
                {...register("password1", {
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
                    isOpenPassword1 ? "Mask password" : "Reveal password"
                  }
                  icon={isOpenPassword1 ? <HiEyeOff /> : <HiEye />}
                  onClick={onTogglePassword1}
                />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{errors?.password1?.message}</FormErrorMessage>
          </FormControl>

          <FormControl id="password2" isInvalid={!!errors.password2}>
            <FormLabel>Repeat Password</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={isOpenPassword2 ? "text" : "password"}
                autoComplete="current-password"
                {...register("password2", {
                  required: "Please repeat the password",
                })}
              />
              <InputRightElement>
                <IconButton
                  bg="transparent !important"
                  variant="ghost"
                  aria-label={
                    isOpenPassword2 ? "Mask password" : "Reveal password"
                  }
                  icon={isOpenPassword2 ? <HiEyeOff /> : <HiEye />}
                  onClick={onTogglePassword2}
                />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{errors?.password2?.message}</FormErrorMessage>
          </FormControl>

          <Button type="submit" colorScheme="purple">
            Reset password
          </Button>
        </Stack>
      </form>
    </>
  );
}

export default ResetPasswordForm;

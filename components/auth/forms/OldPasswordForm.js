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
import LoadingSpinner from "../../common/LoadingSpinner";
import { RESET_SELF_PASSWORD_MUTATION } from "../../../utils/gqlMutations";

function OldPasswordForm() {
  const { isOpen: isOpenOldPW, onToggle: onToggleOldPW } = useDisclosure();
  const { isOpen: isOpenNewPW, onToggle: onToggleNewPW } = useDisclosure();
  const { isOpen: isOpenNewPW2, onToggle: onToggleNewPW2 } = useDisclosure();
  const toast = useToast();
  const [updatePassword, { loading }] = useMutation(
    RESET_SELF_PASSWORD_MUTATION
  );

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ oldPW, newPW, newPW2 }) => {
    try {
      if (newPW !== newPW2) {
        setError("newPW2", {
          type: "manual",
          message: "Both passwords should be the same!",
        });
        return;
      }

      const { data } = await updatePassword({
        variables: {
          newPassword: newPW,
          oldPassword: oldPW,
        },
      });

      const { passwordUpdated } = data.updateSelfPassword;

      if (passwordUpdated) {
        toast({
          title: "Your password was changed!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        reset();
      }
    } catch (error) {
      toast({
        title: error?.graphQLErrors
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
          <FormControl id="oldPW" isInvalid={!!errors.oldPW}>
            <FormLabel>Current Password</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={isOpenOldPW ? "text" : "password"}
                autoComplete="current-password"
                {...register("oldPW", {
                  required: "Please enter your current password",
                })}
              />
              <InputRightElement>
                <IconButton
                  bg="transparent !important"
                  variant="ghost"
                  aria-label={isOpenOldPW ? "Mask password" : "Reveal password"}
                  icon={isOpenOldPW ? <HiEyeOff /> : <HiEye />}
                  onClick={onToggleOldPW}
                />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{errors?.oldPW?.message}</FormErrorMessage>
          </FormControl>

          <FormControl id="newPW" isInvalid={!!errors.newPW}>
            <FormLabel>New Password</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={isOpenNewPW ? "text" : "password"}
                autoComplete="current-password"
                {...register("newPW", {
                  required: "Please enter your new password",
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
                  aria-label={isOpenNewPW ? "Mask password" : "Reveal password"}
                  icon={isOpenNewPW ? <HiEyeOff /> : <HiEye />}
                  onClick={onToggleNewPW}
                />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{errors?.newPW?.message}</FormErrorMessage>
          </FormControl>

          <FormControl id="newPW2" isInvalid={!!errors.newPW2}>
            <FormLabel>Repeat New Password</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={isOpenNewPW2 ? "text" : "password"}
                autoComplete="current-password"
                {...register("newPW2", {
                  required: "Please repeat the new password",
                })}
              />
              <InputRightElement>
                <IconButton
                  bg="transparent !important"
                  variant="ghost"
                  aria-label={
                    isOpenNewPW2 ? "Mask password" : "Reveal password"
                  }
                  icon={isOpenNewPW2 ? <HiEyeOff /> : <HiEye />}
                  onClick={onToggleNewPW2}
                />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{errors?.newPW2?.message}</FormErrorMessage>
          </FormControl>

          <Button type="submit" colorScheme="purple">
            Change password
          </Button>
        </Stack>
      </form>
    </>
  );
}

export default OldPasswordForm;

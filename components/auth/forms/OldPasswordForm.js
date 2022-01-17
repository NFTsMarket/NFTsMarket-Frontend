import { useMutation } from "@apollo/client";
import { Button, Stack, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { UPDATE_SELF_PASSWORD_MUTATION } from "../../../utils/gqlMutations";
import LoadingSpinner from "../../common/LoadingSpinner";
import PasswordInput from "../PasswordInput";

function OldPasswordForm() {
  const toast = useToast();
  const [updatePassword, { loading }] = useMutation(
    UPDATE_SELF_PASSWORD_MUTATION
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
          <PasswordInput
            name="oldPW"
            formLabel="Current Password"
            requiredMessage="Please enter your password"
            register={register}
            error={errors.oldPW}
          />

          <PasswordInput
            name="newPW"
            formLabel="New Password"
            requiredMessage="Please enter your new password"
            register={register}
            error={errors.newPW}
            lenghtValidation
          />

          <PasswordInput
            name="newPW2"
            formLabel="Repeat New Password"
            requiredMessage="Please repeat the new password"
            register={register}
            error={errors.newPW2}
          />

          <Button type="submit" colorScheme="purple">
            Change password
          </Button>
        </Stack>
      </form>
    </>
  );
}

export default OldPasswordForm;

import { useForm } from "react-hook-form";
import { Input, VStack, Button, ButtonGroup, useToast } from "@chakra-ui/react";
import AlertMessage from "../components/auth/AlertMessage";
import ThemeButton from "../components/common/ThemeButton";

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const toast = useToast();

  const onSubmit = (data) => {
    console.log(data);
    toast({
      title: "Welcome to NFTs Market!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack align="center" spacing={4}>
          <Input
            type="text"
            placeholder="First Name"
            {...register("firstName", {
              required: "Enter your first name",
              minLength: 3,
              maxLength: 80,
            })}
          />
          {errors.firstName && (
            <AlertMessage title={errors.firstName.message} />
          )}
          <Input
            type="text"
            placeholder="Last Name"
            {...register("lastName", {
              required: "Enter your last name",
              minLength: 3,
              maxLength: 80,
            })}
          />
          {errors.lastName && <AlertMessage title={errors.lastName.message} />}
          <Input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Enter a password",
              minLength: {
                value: 6,
                message: "Your password should be at least 6 characters long",
              },
            })}
          />
          {errors.password && <AlertMessage title={errors.password.message} />}

          <ButtonGroup spacing="6">
            <Button type="submit" colorScheme="purple">
              Sign Up
            </Button>
            <ThemeButton />
          </ButtonGroup>
        </VStack>
      </form>
    </>
  );
}

export default SignUp;

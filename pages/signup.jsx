import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  Button,
  ButtonGroup,
  useToast,
} from "@chakra-ui/react";
import AlertMessage from "../components/auth/AlertMessage";
import ThemeButton from "../components/common/ThemeButton";

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const toast = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

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
          <InputGroup size="md">
            <Input
              placeholder="Enter first name"
              {...register("firstName", {
                required: "Enter your first name",
                minLength: 3,
                maxLength: 80,
              })}
            />
            {errors.firstName && (
              <AlertMessage title={errors.firstName.message} />
            )}
          </InputGroup>
          <Input
            placeholder="Enter last name"
            {...register("lastName", {
              required: "Enter your last name",
              minLength: 3,
              maxLength: 80,
            })}
          />
          {errors.lastName && <AlertMessage title={errors.lastName.message} />}
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              {...register("password", {
                required: "Enter a password",
                minLength: {
                  value: 6,
                  message: "Your password should be at least 6 characters long",
                },
              })}
            />
            <InputRightElement>
              <Button h="1.75rem" size="sm" onClick={togglePassword}>
                {showPassword ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
            {errors.password && (
              <AlertMessage title={errors.password.message} />
            )}
          </InputGroup>

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

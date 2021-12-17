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
              type="email"
              placeholder="Enter email"
              {...register("email", {
                required: "Enter a valid email",
                pattern:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              })}
            />
            {errors.email && <AlertMessage message={errors.email.message} />}
          </InputGroup>
          <Input
            placeholder="Enter name"
            {...register("name", {
              required: "Enter your name",
              minLength: 3,
              maxLength: 80,
            })}
          />
          {errors.name && <AlertMessage message={errors.name.message} />}
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
              <AlertMessage message={errors.password.message} />
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

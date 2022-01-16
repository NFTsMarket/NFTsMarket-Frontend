import { useMutation } from "@apollo/client";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link as ChakraLink,
  Stack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { RESET_USER_PASSWORD_MUTATION } from "../../../utils/gqlMutations";

function EmailForm() {
  const toast = useToast();
  const textColors = useColorModeValue("purple.500", "purple.200");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [resetPW] = useMutation(RESET_USER_PASSWORD_MUTATION);

  const onSubmit = ({ email }) => {
    try {
      resetPW({ variables: { email } });

      toast({
        title: "Email sent! Check your inbox",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={6}>
        <FormControl id="email" isInvalid={!!errors.email}>
          <Flex justify="space-between">
            <FormLabel>Email address</FormLabel>
            <Link href="/login" passHref>
              <ChakraLink
                color={textColors}
                fontWeight="semibold"
                fontSize="sm"
              >
                Go to login
              </ChakraLink>
            </Link>
          </Flex>
          <Input
            type="email"
            {...register("email", {
              required: "Please enter a valid email address",
              pattern: !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            })}
          />
          <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
        </FormControl>

        <Button type="submit" colorScheme="purple">
          Reset password
        </Button>
      </Stack>
    </form>
  );
}

export default EmailForm;

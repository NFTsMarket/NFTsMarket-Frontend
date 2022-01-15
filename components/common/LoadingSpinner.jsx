import { Center, Spinner } from "@chakra-ui/react";

function LoadingSpinner() {
  return (
    <Center h="100vh" w="100%">
      <Spinner size="xl" colorScheme="purple" />
    </Center>
  );
}

export default LoadingSpinner;

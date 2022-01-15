import { Spinner, Center } from "@chakra-ui/react";

export default function LoadingCircle() {
  return (
    <Center>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="gray.400"
        size="xl"
      />
    </Center>
  );
}

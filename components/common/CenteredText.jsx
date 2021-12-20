import { Center, Text } from "@chakra-ui/react";

function CenteredText({ children }) {
  return (
    <Center h="80vh" w="100%">
      <Text fontSize="xl">{children}</Text>
    </Center>
  );
}

export default CenteredText;

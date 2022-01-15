import { Box, useColorModeValue } from "@chakra-ui/react";

function AuthContainer(props) {
  return (
    <Box
      bg={useColorModeValue("purple.50", "inherit")}
      minH="100vh"
      py="12"
      px={{
        base: "4",
        lg: "8",
      }}
      {...props}
    />
  );
}

export default AuthContainer;

import { Box, Divider, Flex, Text, useColorModeValue } from "@chakra-ui/react";

function DividerWithText({ children, ...props }) {
  return (
    <Flex align="center" color="gray.300" {...props}>
      <Box flex="1">
        <Divider borderColor="currentcolor" />
      </Box>
      <Text
        as="span"
        px="3"
        color={useColorModeValue("gray.600", "gray.400")}
        fontWeight="medium"
      >
        {children}
      </Text>
      <Box flex="1">
        <Divider borderColor="currentcolor" />
      </Box>
    </Flex>
  );
}

export default DividerWithText;

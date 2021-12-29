import { Box, Text } from "@chakra-ui/react";

const Footer = () => (
  <Box
    as="footer"
    role="contentinfo"
    mx="auto"
    maxW="7xl"
    py="12"
    px={{ base: "4", md: "8" }}
  >
    <Text fontSize="sm" alignSelf={{ base: "center", sm: "start" }}>
      &copy; {new Date().getFullYear()} NFTs Market, Inc. All rights reserved.
    </Text>
  </Box>
);

export default Footer;

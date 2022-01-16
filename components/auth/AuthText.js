import {
  Heading,
  Link as ChakraLink,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";

function AuthText({ headingText, helperText, linkHref, linkText }) {
  const textColors = useColorModeValue("purple.500", "purple.200");

  return (
    <>
      <Heading textAlign="center" size="xl" fontWeight="extrabold">
        {headingText}
      </Heading>

      {helperText && (
        <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
          <Text as="span">{helperText}</Text>
          {linkHref && (
            <Link href={linkHref} passHref>
              <ChakraLink color={textColors}>{linkText}</ChakraLink>
            </Link>
          )}
        </Text>
      )}
    </>
  );
}

export default AuthText;

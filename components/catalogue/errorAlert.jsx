import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton
} from "@chakra-ui/react";

export default function ErrorAlert({ text, description }) {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle mr={2}>{text}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}

import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";

function AlertMessage({ message }) {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle mr={2}>{message}</AlertTitle>
    </Alert>
  );
}

export default AlertMessage;

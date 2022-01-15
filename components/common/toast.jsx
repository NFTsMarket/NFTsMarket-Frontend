import { useToast, Button } from "@chakra-ui/react";

export default function ToastExample({buttonText, title, description}) {
  const toast = useToast();
  return (
    <Button
      onClick={() =>
        toast({
          title: title,
          description: description,
          status: "success",
          duration: 9000,
          isClosable: true,
        })
      }
    >
      {buttonText}
    </Button>
  );
}

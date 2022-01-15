import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useToast,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { deleteProduct } from "./catalogueResource";
import { useRouter } from "next/router";

const DeleteAlert = ({ id }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();
  const toast = useToast();
  const router = useRouter();

  function onDelete() {
    deleteProduct(id).then((response) => {
      if (response.ok) {
        onClose();
        toast({
          title: "Product deleted succesfully.",
          description: "We've deleted your product for you.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        router.push("/");
      } else {
        toast({
          title: "There was some error.",
          description: "Couldn't delete the product.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        onClose();
        return Error("Response not valid:" + response.status);
      }
    });
  }

  return (
    <>
      <Button
        leftIcon={<DeleteIcon />}
        colorScheme="purple"
        variant="outline"
        onClick={() => setIsOpen(true)}
      >
        Delete
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" ml={3} onClick={() => onDelete()}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteAlert;

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
import { useAuth } from "../../context/AuthContext";

const DeleteAlert = ({ id, owner }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [loadingButton, setLoadingButton] = React.useState(false);
  const { isAuthenticated, user, dispatch } = useAuth();
  const userName = user ? user.name : null;
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();
  const toast = useToast();
  const router = useRouter();

  function onDelete() {
    setLoadingButton(true);
    deleteProduct(id).then((response) => {
      if (response.ok) {
        setLoadingButton(false);
        toast({
          title: "Product deleted succesfully.",
          description: "We've deleted your product for you.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        onClose();
        router.push("/");
      } else {
        setLoadingButton(false);
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
        disabled={!isAuthenticated || userName !== owner}
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
              Are you sure? You can&apos;t undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                isLoading={loadingButton}
                colorScheme="red"
                ml={3}
                onClick={() => onDelete()}
              >
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

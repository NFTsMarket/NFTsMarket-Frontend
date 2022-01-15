import { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Stack,
  CheckboxGroup,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Center,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  useToast,
  FormHelperText,
} from "@chakra-ui/react";
import { SmallAddIcon } from "@chakra-ui/icons";
import {
  getCategories,
  postCategory,
  postCateogry,
} from "./catalogueResource.js";
import { useAuth } from "../../context/AuthContext.jsx";

function NewCategory(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuthenticated, user, dispatch } = useAuth();
  const toast = useToast();

  const [name, setName] = useState("");

  const nameError = name === "";

  function onClick() {
    if (name === "") {
      toast({
        name: "There was some error.",
        description: "Please, fill all required parameters.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return false;
    }

    const newCategory = {
      name: name,
    };

    postCategory(newCategory)
      .then((status) => {
        toast({
          name: "Category created succesfully.",
          description: "We've created your category.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        onClose();
      })
      .catch((error) => {
        toast({
          name: "There was some error.",
          description: "Couldn't create category.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  }

  return (
    <>
      <Center h="100px">
        <Button
          mx={"10px"}
          onClick={onOpen}
          leftIcon={<SmallAddIcon />}
          colorScheme="purple"
          disabled={!isAuthenticated}
        >
          Create Cateogry
        </Button>
      </Center>

      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        size={"lg"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Cateogry</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <FormControl isInvalid={nameError}>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="Name"
                name="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              {!nameError ? (
                <></>
              ) : (
                <FormErrorMessage>Name is required.</FormErrorMessage>
              )}
            </FormControl>
            <br></br>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="purple"
              mr={3}
              onClick={onClick}
              leftIcon={<SmallAddIcon />}
            >
              Create Cateogry
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default NewCategory;

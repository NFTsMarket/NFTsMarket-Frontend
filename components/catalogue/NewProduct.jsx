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
import { getCategories, postProduct } from "./catalogueResource.js";
import { useAuth } from "../../context/AuthContext.jsx";

function NewProduct(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuthenticated, user, dispatch } = useAuth();
  const toast = useToast();
  const [allCategories, setAllCategories] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0.0);
  const [categories, setCategories] = useState([]);
  const [picture, setPicture] = useState("");

  const titleError = title === "";
  const descriptionError = description === "";
  const priceError = price <= 0.0;
  const pictureError = picture === "";

  useEffect(() => {
    getCategories()
      .then((data) => {
        setAllCategories(data);
      })
      .catch((error) => {
        toast({
          title: "There was some error.",
          description: "Couldn't load categories.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  }, [isOpen]);

  function onClick() {
    if (title === "" || description === "" || price <= 0 || picture === "") {
      toast({
        title: "There was some error.",
        description: "Please, fill all required parameters.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return false;
    }

    const newProduct = {
      creator: "creator1",
      title: title,
      description: description,
      price: price,
      categories: categories,
      picture: picture,
    };

    postProduct(newProduct)
      .then((status) => {
        const result = props.onAddProduct(newProduct);
        if (result) {
          setTitle("");
          setDescription("");
          setPrice("");
          setCategories("");
          setPicture("");
          onClose();
        }
        toast({
          title: "Product created succesfully.",
          description: "We've created your product.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        onClose();
      })
      .catch((error) => {
        toast({
          title: "There was some error.",
          description: "Couldn't create product.",
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
          Create Product
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
          <ModalHeader>Create Product</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <FormControl isInvalid={titleError}>
              <FormLabel>Title</FormLabel>
              <Input
                placeholder="Title"
                name="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
              {!titleError ? (
                <></>
              ) : (
                <FormErrorMessage>Title is required.</FormErrorMessage>
              )}
            </FormControl>
            <br></br>
            <FormControl isInvalid={descriptionError}>
              <FormLabel>Description</FormLabel>
              <Input
                placeholder="Description"
                name="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
              {!descriptionError ? (
                <></>
              ) : (
                <FormErrorMessage>Description is required.</FormErrorMessage>
              )}
            </FormControl>
            <br></br>
            <FormControl isInvalid={priceError}>
              <FormLabel>Price</FormLabel>
              <NumberInput
                defaultValue={0.0}
                min={0}
                precision={2}
                onChange={(event) => setPrice(event)}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {!pictureError ? (
                <></>
              ) : (
                <FormErrorMessage>A valid price is required.</FormErrorMessage>
              )}
            </FormControl>
            <br></br>
            <FormControl>
              <FormLabel>Categories</FormLabel>
              <CheckboxGroup
                colorScheme="purple"
                name="categories"
                value={categories}
                onChange={(items) => {
                  setCategories(items);
                }}
              >
                <Stack spacing={[1, 5]} direction={["column", "row"]}>
                  {allCategories.map((c) => (
                    <Checkbox key={c.id} value={c.id}>
                      {c.name}
                    </Checkbox>
                  ))}
                </Stack>
              </CheckboxGroup>

              <FormHelperText>Choose between these categories.</FormHelperText>
            </FormControl>
            <br></br>
            <FormControl isInvalid={pictureError}>
              <FormLabel>Picture Url</FormLabel>
              <Input
                placeholder="Picture"
                name="picture"
                value={picture}
                onChange={(event) => setPicture(event.target.value)}
              />
              {!pictureError ? (
                <></>
              ) : (
                <FormErrorMessage>Picture is required.</FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="purple"
              mr={3}
              onClick={onClick}
              leftIcon={<SmallAddIcon />}
            >
              Create Product
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

export default NewProduct;

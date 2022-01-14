import { useState } from "react";
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
  FormHelperText,
} from "@chakra-ui/react";
import { SmallAddIcon } from "@chakra-ui/icons";

function NewProduct(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0.00);
  const [categories, setCategories] = useState([]);
  const [picture, setPicture] = useState("");

  const titleError = title === "";
  const descriptionError = description === "";
  const priceError = price <= 0.00;
  const categoriesError = categories.length === 0;
  const pictureError = picture === "";

  function onClick() {
    const newProduct = {
      title: title,
      description: description,
      price: price,
      categories: categories,
      picture: picture,
    };

    const result = props.onAddProduct(newProduct);

    if (result) {
      setTitle("");
      setDescription("");
      setPrice("");
      setCategories("");
      setPicture("");
      onClose();
    }
  }

  return (
    <>
      <Center h="100px">
        <Button
          onClick={onOpen}
          leftIcon={<SmallAddIcon />}
          colorScheme="purple"
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
            <FormControl isInvalid={categoriesError}>
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
                  <Checkbox value="funny">Funny</Checkbox>
                  <Checkbox value="classic">Classic</Checkbox>
                  <Checkbox value="retro">Retro</Checkbox>
                </Stack>
              </CheckboxGroup>
              {!categoriesError ? (
                <FormHelperText>
                  Choose between these categories.
                </FormHelperText>
              ) : (
                <FormErrorMessage>
                  At least one category is required.
                </FormErrorMessage>
              )}
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

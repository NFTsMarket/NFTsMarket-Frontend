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
  Select,
} from "@chakra-ui/react";
import { SmallAddIcon } from "@chakra-ui/icons";
import { getAssets, postProduct } from "./catalogueResource.js";
import { useAuth } from "../../context/AuthContext.jsx";

//TODO quitar asset y descomenbtar
function NewProduct(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuthenticated, user, dispatch } = useAuth();
  const toast = useToast();
  const [allCategories, setAllCategories] = useState(props.categories);
  const [loadingButton, setLoadingButton] = useState(false);
  const [allAssets, setAllAssets] = useState([]);

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
    setAllCategories(props.categories);
    getAssets()
      .then((data) => {
        setAllAssets(data);
      })
      .catch((error) => {
        console.log(error)
        toast({
          title: "There was some error.",
          description: "Couldn't load assets.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  }, [isOpen, props.categories]);

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
    setLoadingButton(true);

    const newProduct = {
      creator: user.name,
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

          toast({
            title: "Product created succesfully.",
            description: "We've created your product.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          setLoadingButton(false);

          onClose();
        } else {
          throw Error("Couldn't create product on fron-end.");
        }
      })
      .catch((error) => {
        setLoadingButton(false);
        console.log(error);
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
            <Center>
              <FormControl mr={2} isInvalid={titleError}>
                <FormLabel>Title</FormLabel>
                <Input
                  placeholder="Title"
                  name="title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
                {!titleError ? (
                  <FormHelperText color={"white"}>Product title</FormHelperText>
                ) : (
                  <FormErrorMessage>Title is required.</FormErrorMessage>
                )}
              </FormControl>
              <FormControl ml={2} isInvalid={priceError}>
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
                {!priceError ? (
                  <FormHelperText color={"white"}>Product price</FormHelperText>
                ) : (
                  <FormErrorMessage>
                    A valid price is required.
                  </FormErrorMessage>
                )}
              </FormControl>
            </Center>
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

              <FormHelperText>
                {allCategories.length !== 0
                  ? "Choose between these categories."
                  : "There was some problem loading categories."}
              </FormHelperText>
            </FormControl>
            <br></br>
            <FormControl isInvalid={pictureError}>
              <FormLabel>Picture Url</FormLabel>
              <Select
                isRequired
                placeholder="Select option"
                onChange={(event) => {
                  setPicture(event.target.value);
                }}
              >
                {user
                  ? allAssets
                      .filter((s) => s.user === user.id)
                      .map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.name}
                        </option>
                      ))
                  : null}
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              isLoading={loadingButton}
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

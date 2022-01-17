import {
  Text,
  SimpleGrid,
  Button,
  Center,
  Box,
  Image,
  Stack,
  useColorModeValue,
  Input,
  Flex,
  CheckboxGroup,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import { CheckIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import ProductText from "./ProductText";
import { getCategories, putProduct } from "./catalogueResource";

export default function EditProduct({ product, onCancel, onSave }) {
  const toast = useToast();
  const [loadingButton, setLoadingButton] = useState(false);
  const [allCategories, setAllCategories] = useState([]);

  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [categoriesId, setCategoriesId] = useState(
    product.categories.length !== 0
      ? "_id" in product.categories[0]
        ? product.categories.map((data) => data._id)
        : product.categories.map((data) => data.id)
      : []
  );

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
  }, [product]);

  function updateProduct() {
    if (title === "" || description === "" || price <= 0) {
      toast({
        title: "There was some error.",
        description: "Please, fill all required parameters correctly.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return false;
    }
    setLoadingButton(true);
    const newProduct = {
      picture: product.picture._id,
      title: title,
      price: price,
      categories: categoriesId,
      description: description,
    };
    console.log(product.id)
    console.log((product.id, newProduct))
    putProduct(product.id, newProduct)
      .then((response) => {
        if (response.ok) {
          toast({
            title: "Product updated succesfully.",
            description: "We've updated your product.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          newProduct.categories = allCategories.filter((c) =>
            categoriesId.some((v) => v === c.id)
          );
          setLoadingButton(false);

          onSave(newProduct);
        } else {
          throw Error("Couldn't update product.", response.status);
        }
      })
      .catch((error) => {
        setLoadingButton(false);

        console.log(error);
        toast({
          title: "There was some error.",
          description: "Couldn't update product.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  }

  return (
    <div className="upload-show">
      <Center>
        <SimpleGrid
          m={10}
          p={10}
          rounded={"lg"}
          boxShadow={"2xl"}
          color={"#333 "}
        >
          <Flex>
            <Box w="264px" m={10}>
              <Center py={12}>
                <Box
                  role={"group"}
                  marginTop={"10"}
                  p={6}
                  maxW={"264px"}
                  w={"full"}
                  bg={useColorModeValue("white", "gray.800")}
                  boxShadow={"2xl"}
                  rounded={"lg"}
                  pos={"relative"}
                  zIndex={1}
                  _hover={{
                    transform: "scale(1.03)",
                  }}
                >
                  <Box
                    rounded={"lg"}
                    mt={-12}
                    pos={"relative"}
                    height={"184px"}
                    boxShadow={"rgba(0, 0, 0, 0.55) 0px 5px 15px;"}
                    _groupHover={{
                      boxShadow: "rgba(0, 0, 0, 0.65) 0px 5px 25px",
                    }}
                  >
                    <Image
                      rounded={"lg"}
                      height={184}
                      width={225}
                      objectFit={"cover"}
                      src={product.picture.file}
                      alt={""}
                    />
                  </Box>
                  <Stack pt={8} align={"center"}>
                    <Input
                      fontWeight={500}
                      fontSize={"2xl"}
                      fontFamily={"body"}
                      lineHeight={10}
                      placeholder="Title"
                      textAlign="center"
                      name="title"
                      value={title}
                      onChange={(event) => setTitle(event.target.value)}
                    />
                    <Stack direction={"row"} align={"center"}>
                      <Text>
                        <Input
                          fontWeight={800}
                          fontSize={"xl"}
                          placeholder="Price"
                          textAlign="center"
                          name="price"
                          value={price}
                          onChange={(event) => setPrice(event.target.value)}
                        />
                      </Text>
                    </Stack>
                  </Stack>
                </Box>
              </Center>
            </Box>
            <Center w="700px" mx={5} px={5}>
              <Text center py={5} width={700}>
                <ProductText
                  title="Created By"
                  text={product.creator.name}
                ></ProductText>
                <ProductText
                  title="Current owner"
                  text={product.owner.name}
                ></ProductText>
                <Text lineHeight={8} fontSize="lg">
                  <b>Description</b>
                </Text>
                <Input
                  lineHeight={8}
                  placeholder="Description"
                  name="description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
                <br />
                <Text lineHeight={8} fontSize="lg">
                  <b>Categories</b>
                </Text>
                <CheckboxGroup
                  colorScheme="purple"
                  name="categories"
                  value={categoriesId}
                  onChange={(items) => {
                    setCategoriesId(items);
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
                <ProductText
                  title="Creation date"
                  text={product.createdAt}
                ></ProductText>
                <ProductText
                  title="Most recent update date"
                  text={product.updatedAt}
                ></ProductText>
              </Text>
            </Center>
          </Flex>
          <Center>
            <Button
              isLoading={loadingButton}
              style={{ marginRight: "20px" }}
              leftIcon={<CheckIcon />}
              colorScheme="purple"
              onClick={() => updateProduct()}
            >
              Save
            </Button>
            <Button
              style={{ marginRight: "20px" }}
              leftIcon={<ArrowBackIcon />}
              colorScheme="purple"
              variant="outline"
              onClick={() => onCancel()}
            >
              Cancel
            </Button>
          </Center>
        </SimpleGrid>
      </Center>
    </div>
  );
}

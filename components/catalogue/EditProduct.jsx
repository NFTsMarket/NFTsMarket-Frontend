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
} from "@chakra-ui/react";
import { CheckIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { useState } from "react";
import ProductText from "./ProductText";

export default function EditProduct(props) {
  const product = props.product;
  console.log(product.categories);

  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [categories, setCategories] = useState(product.categories);
  const [picture, setPicture] = useState(product.picture);

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
            <Box w="264px" mx={10}>
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
                      src={product.picture}
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
                  text={product.creator}
                ></ProductText>
                <ProductText
                  title="Current owner"
                  text={product.owner}
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
                <Input
                  placeholder="Categories"
                  name="categories"
                  value={categories}
                  onChange={(event) => setCategories(event.target.value)}
                />
                <ProductText
                  title="Creation date"
                  text={product.createdAt}
                ></ProductText>
                <ProductText
                  title="Most recent update date"
                  text={product.updatedAt}
                ></ProductText>
                <Text lineHeight={8} fontSize="lg">
                  <b>Picture</b>
                </Text>
                <Input
                  placeholder="Picture"
                  name="picture"
                  value={picture}
                  onChange={(event) => setPicture(event.target.value)}
                />
                <br />
              </Text>
            </Center>
          </Flex>
          <Center>
            <Button
              style={{ marginRight: "20px" }}
              leftIcon={<CheckIcon />}
              colorScheme="purple"
              onClick={() =>
                props.onSave({
                  picture: picture,
                  title: title,
                  price: price,
                  categories: categories,
                  description: description,
                })
              }
            >
              Save
            </Button>
            <Button
              style={{ marginRight: "20px" }}
              leftIcon={<ArrowBackIcon />}
              colorScheme="purple"
              variant="outline"
              onClick={() => props.onCancel()}
            >
              Cancel
            </Button>
          </Center>
        </SimpleGrid>
      </Center>
    </div>
  );
}

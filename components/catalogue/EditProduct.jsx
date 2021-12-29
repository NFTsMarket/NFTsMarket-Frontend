import {
  Text,
  SimpleGrid,
  Button,
  Center,
  Box,
  Image,
  Stack,
  Heading,
  useColorModeValue,
  Input,
} from "@chakra-ui/react";
import { EditIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { useState } from "react";

export default function EditProduct(props) {
  const product = props.product;

  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [categories, setCategories] = useState(product.categories);
  const [picture, setPicture] = useState(product.picture);

  return (
    <div className="upload-show">
      <SimpleGrid columns={3}>
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
              <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
                <Input
                  placeholder="Title"
                  name="title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </Heading>
              <Stack direction={"row"} align={"center"}>
                <Text fontWeight={800} fontSize={"xl"}>
                  <Input
                    placeholder="Price"
                    name="price"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                  />
                  $
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Center>

        <Text
          center
          py={5}
          width={700}
          style={{
            display: "block",
            verticalAlign: "middle",
            marginTop: "25%",
          }}
        >
          <b>Created by:</b> {product.creator}
          <br />
          <b>Current owner:</b> {product.owner}
          <br />
          <b>Description:</b>
          <Input
            placeholder="Description"
            name="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <br />
          <b>Categories:</b>
          <Input
            placeholder="Categories"
            name="categories"
            value={categories}
            onChange={(event) => setCategories(event.target.value)}
          />
          <br />
          <b>Creation date:</b> {product.createdAt}
          <br />
          <b>Most recent update date:</b> {product.updatedAt}
          <br />
          <b>Picture: </b>{" "}
          <Input
            placeholder="Picture"
            name="picture"
            value={picture}
            onChange={(event) => setPicture(event.target.value)}
          />
          <br />
          <div>
            <Button
              style={{ marginRight: "20px" }}
              leftIcon={<EditIcon />}
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
          </div>
        </Text>
      </SimpleGrid>
    </div>
  );
}

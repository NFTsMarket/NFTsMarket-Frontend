
import { Text, Button, Center, Flex, Box, SimpleGrid, Divider } from "@chakra-ui/react";
import {
  DeleteIcon,
  EditIcon,
  ArrowBackIcon,
  MdCheckCircle,
} from "@chakra-ui/icons";

import Link from "next/link";
import { useEffect, useState } from "react";
import Product from "./Product.jsx";
import ProductText from "./ProductText.jsx";

export default function ProductDetails(props) {
  const product = props.product;
  const [isPending, setIsPending] = useState(true);
  const [isOwner, setIsOwner] = useState(true);

  function saveProduct(newProduct) {
    setProduct((prevProduct) => {
      let res = Object.assign({}, prevProduct);
      res.title = newProduct.title;
      res.price = newProduct.price;
      res.description = newProduct.description;
      res.categories = newProduct.categories;
      res.picture = newProduct.picture;
      res.updatedAt = Date();

      return res;
    });

    // TODO: Check that the user can edit the product used as parameter
    // TODO: If "validation" is true
    setIsEditing(false);
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setIsPending(user == null || user.id == product.owner);
    setIsOwner(user == null || user.id == product.owner);
  }, []);

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
              <Product
                key={product.id}
                product={product}
                displayButton={false}
              />
            </Box>
            <Center w="700px" m={5} p={5}>
              <Text center py={5} width={700}>
                <ProductText
                  title="Created By"
                  text={product.creator}
                ></ProductText>
                <ProductText
                  title="Current owner"
                  text={product.owner}
                ></ProductText>
                <ProductText
                  title="Description"
                  text={product.description}
                ></ProductText>
                <ProductText
                  title="Categories"
                  text={product.categories}
                ></ProductText>
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
              style={{ marginRight: "20px" }}
              leftIcon={<EditIcon />}
              colorScheme="purple"
              onClick={() => props.onEdit(props.product)}
            >
              Edit
            </Button>
            <Button
              style={{ marginRight: "20px" }}
              leftIcon={<DeleteIcon />}
              colorScheme="purple"
              variant="outline"
            >
              Delete
            </Button>

            {!isOwner &&
              <Button
                style={{ marginRight: "20px" }}
                colorScheme="purple"
                variant="outline"
                isDisabled={isPending}
                onClick={() => props.onBuy(props.product)}
              >
                Buy
              </Button>
            }

            <Link href={"/"} passHref>
              <Button
                leftIcon={<ArrowBackIcon />}
                colorScheme="purple"
                variant="outline"
              >
                Back
              </Button>
            </Link>
          </Center>
        </SimpleGrid>
      </Center>
    </div>
  );
}

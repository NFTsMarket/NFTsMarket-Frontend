import {
  Text,
  Button,
  Center,
  Flex,
  Box,
  SimpleGrid,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { EditIcon, ArrowBackIcon } from "@chakra-ui/icons";

import Link from "next/link";
import { useEffect, useState } from "react";
import Product from "./Product.jsx";
import ProductText from "./ProductText.jsx";
import LoadingCircle from "../common/LoadingCircle.jsx";
import DeleteAlert from "./deleteAlert.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

//TODO quitar asset
export default function ProductDetails({ product, onBuy, onEdit }) {
  const { isAuthenticated, user, dispatch } = useAuth();
  const [loading, setloading] = useState(true);
  const userName = user ? user.name : null;
  product.categories =
    product.categories === undefined ? [] : product.categories;
  const [isPending, setIsPending] = useState(true);
  const [isOwner, setIsOwner] = useState(true);

  product.picture = {
    id: "id3",
    name: "holiwi3",
    user: "61df2a2b7b793c8a671dd841",
    file: "https://imgk.timesnownews.com/story/monkey.png?tr=w-1200,h-900",
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setIsPending(user == null || user.id == product.owner);
    setIsOwner(user == null || user.id == product.owner);
    product.title ? setloading(false) : null;
  }, [product]);

  return (
    <div className="upload-show">
      <Center>
        {loading ? (
          <div className="loading" style={{ margin: "100px" }}>
            <LoadingCircle />
          </div>
        ) : (
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
                  <Text lineHeight={8} fontSize="lg">
                    <b>Categories</b>
                  </Text>
                  <UnorderedList ml={10}>
                    {product.categories.length !== 0 ? (
                      product.categories.map((c) => (
                        <ListItem key={c._id}>{c.name}</ListItem>
                      ))
                    ) : (
                      <ListItem>This product has no categories</ListItem>
                    )}
                  </UnorderedList>
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
                onClick={() => onEdit(product)}
                disabled={userName !== product.owner}
              >
                Edit
              </Button>

              <DeleteAlert id={product.id} owner={product.owner} />

              <Button
                style={{ marginLeft: "20px", marginRight: "20px" }}
                colorScheme="purple"
                variant="outline"
                // isDisabled={isPending}
                disabled={!isAuthenticated}
                onClick={() => onBuy(product)}
              >
                Buy
              </Button>

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
        )}
      </Center>
    </div>
  );
}

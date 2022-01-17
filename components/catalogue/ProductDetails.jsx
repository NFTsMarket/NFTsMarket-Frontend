import { ArrowBackIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box, Button,
  Center,
  Flex, ListItem, SimpleGrid, Text, UnorderedList
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import BuyApi from "../buy/BuyApi.js";
import LoadingCircle from "../common/LoadingCircle.jsx";
import DeleteAlert from "./deleteAlert.jsx";
import Product from "./Product.jsx";
import ProductText from "./ProductText.jsx";

export default function ProductDetails({ product, onBuy, onEdit }) {
  const { isAuthenticated, user } = useAuth();
  const [loading, setloading] = useState(true);
  const [isPending, setIsPending] = useState(true);
  const userName = user ? user.name : null;
  product.categories =
    product.categories === undefined ? [] : product.categories;

  async function updateIsPending() {
    try {
      setIsPending(
        await BuyApi.existsPurchases({ state: "Pending", product: product.id })
      );
    } catch { }
  }

  useEffect(() => {
    product.title ? setloading(false) : null;
    updateIsPending();
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
                    text={product.creator.name}
                  ></ProductText>
                  <ProductText
                    title="Current owner"
                    text={product.owner.name}
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
                disabled={!isAuthenticated || userName !== product.owner.name}
              >
                Edit
              </Button>

              <DeleteAlert id={product.id} owner={product.owner.name} />

              <Button
                style={{ marginLeft: "20px", marginRight: "20px" }}
                colorScheme="purple"
                variant="outline"
                disabled={!isAuthenticated || isPending ||  userName === product.owner.name}
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

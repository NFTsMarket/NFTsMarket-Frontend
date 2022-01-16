import Head from "next/head";
import { Center, SimpleGrid, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Product from "../components/catalogue/Product.jsx";
import NewProduct from "../components/catalogue/NewProduct.jsx";
import {
  getAllProducts,
  getCategories,
} from "../components/catalogue/catalogueResource.js";
import ErrorAlert from "../components/catalogue/errorAlert.jsx";
import LoadingCircle from "../components/common/LoadingCircle.jsx";
import NewCategory from "../components/catalogue/categories/NewCategory.jsx";
import ShowCategories from "../components/catalogue/categories/ShowCategories.jsx";

export default function Home() {
  const [message, setMessage] = useState("");
  const [loading, setloading] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const toast = useToast();

  useEffect(() => {
    getAllProducts()
      .then((data) => setProducts(data))
      .catch((error) => {
        setMessage(error);
      })
      .then(() => setloading(false));

    getCategories()
      .then((data) => {
        setCategories(data);
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
  }, []);

  function onAddProduct(product) {
    setProducts((prevProducts) => [...prevProducts, product]);
    return true;
  }
  function onAddCategory(category) {
    setCategories((prevCategories) => [...prevCategories, category]);
    return true;
  }

  return (
    <>
      <Head>
        <title>Dashboard | NFTs Market</title>
      </Head>
      {message !== "" ? (
        <ErrorAlert text="Error!" description={message.toString()} />
      ) : null}
      <Center>
        <NewProduct onAddProduct={onAddProduct} categories={categories} />
        <NewCategory onAddCategory={onAddCategory} />
      </Center>

      <ShowCategories categories={categories} />

      {loading ? (
        <LoadingCircle />
      ) : (
        <div mx="2em">
          <SimpleGrid minChildWidth="300px" spacing={2}>
            {products.map((p) => (
              <Product key={p.id} product={p} displayButton={true} />
            ))}
          </SimpleGrid>
        </div>
      )}
    </>
  );
}

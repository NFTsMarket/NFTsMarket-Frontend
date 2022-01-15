import Head from "next/head";
import { Center, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Product from "../components/catalogue/Product.jsx";
import NewProduct from "../components/catalogue/NewProduct.jsx";
import { getAllProducts } from "../components/catalogue/catalogueResource.js";
import ErrorAlert from "../components/catalogue/errorAlert.jsx";
import LoadingCircle from "../components/common/LoadingCircle.jsx";
import NewCategory from "../components/catalogue/NewCategory.jsx";

export default function Home() {
  const [message, setMessage] = useState("");
  const [loading, setloading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts()
      .then((data) => setProducts(data))
      .catch((error) => {
        setMessage(error);
      })
      .then(() => setloading(false));
  }, []);

  function onAddProduct(product) {
    setProducts((prevProducts) => {
      return [...prevProducts, product];
    });
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
        <NewProduct onAddProduct={onAddProduct} />
        <NewCategory />
      </Center>

      {loading ? <LoadingCircle /> : null}

      <div mx="2em">
        <SimpleGrid minChildWidth="300px" spacing={2}>
          {products.map((p) => (
            <Product key={p.id} product={p} displayButton={true} />
          ))}
        </SimpleGrid>
      </div>
    </>
  );
}

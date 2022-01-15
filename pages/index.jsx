import Head from "next/head";
import { SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Product from "../components/catalogue/Product.jsx";
import NewProduct from "../components/catalogue/NewProduct.jsx";
import { getAllProducts } from "../components/catalogue/catalogueResource.js";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts().then((data) => setProducts(data));
  }, []);

  function onAddProduct(product) {
    if (
      product.title === "" ||
      product.description === "" ||
      product.price === "" ||
      product.categories === "" ||
      product.picture === ""
    ) {
      return false;
    }

    setProducts((prevProducts) => {
      return [...prevProducts, product];
    });
  }

  return (
    <>
      <Head>
        <title>Dashboard | NFTs Market</title>
      </Head>

      <NewProduct onAddProduct={onAddProduct} />

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

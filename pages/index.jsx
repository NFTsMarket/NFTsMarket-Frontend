import Head from "next/head";
import { SimpleGrid } from "@chakra-ui/react";
import Product from "../components/catalogue/Product.jsx";
import { useProducts } from "../context/ProductContext.jsx";

export default function Home() {
  const { products } = useProducts();

  return (
    <>
      <Head>
        <title>Dashboard | NFTs Market</title>
      </Head>

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

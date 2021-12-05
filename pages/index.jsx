import Head from "next/head";
import Product from './Product.js';

export default function Home() {

  const p = {
    title: "first title",
    description: "description"
  }

  return (
    <>
      <Head>
        <title>Dashboard | NFTs Market</title>
      </Head>
      <h1>Catalogue</h1>
      <Product product={p}/>
    </>
  );
}

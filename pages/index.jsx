import Head from "next/head";
import Products from './catalogue/Products.js';

export default function Home() {

  const p = [
    {
      title: "first title",
      description: "second description"
    },
    {
      title: "second title",
      description: "second description"
    },
  ]

  return (
    <>
      <Head>
        <title>Dashboard | NFTs Market</title>
      </Head>
      <h1>Catalogue</h1>
      <Products products={p}/>
    </>
  );
}

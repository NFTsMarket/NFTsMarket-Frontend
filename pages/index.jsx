import Head from "next/head";
import { SimpleGrid } from "@chakra-ui/react";
import ProductSimple from "../components/catalogue/product.jsx";

export default function Home() {
  const products = [
    {
      id: "01",
      title: "first title",
      // description: "second description",
      url: "https://yt3.ggpht.com/ytc/AKedOLRvi-z-jccgYj8gmB_08_7WxwgjtXA1AHz2xmsb=s900-c-k-c0x00ffffff-no-rj",
      price: "45,34$",
    },
    {
      id: "02",
      title: "second title",
      // description: "second description",
      url: "https://m.media-amazon.com/images/I/51YLsREcAaL.jpg",
      price: "45,34$",
    },
    {
      id: "02",
      title: "second title",
      // description: "second description",
      url: "https://m.media-amazon.com/images/I/51YLsREcAaL.jpg",
      price: "45,34$",
    },
    {
      id: "02",
      title: "second title",
      // description: "second description",
      url: "https://m.media-amazon.com/images/I/51YLsREcAaL.jpg",
      price: "45,34$",
    },
    {
      id: "02",
      title: "second title",
      // description: "second description",
      url: "https://m.media-amazon.com/images/I/51YLsREcAaL.jpg",
      price: "45,34$",
    },
  ];

  return (
    <>
      <Head>
        <title>Dashboard | NFTs Market</title>
      </Head>

      <div className="catalogue-main">
        <SimpleGrid minChildWidth="400px" spacing={5}>
          {products.map((p) => (
            <ProductSimple
              key={p.id}
              id={p.id}
              title={p.title}
              url={p.url}
              price={p.price}
            />
          ))}
        </SimpleGrid>
      </div>
    </>
  );
}

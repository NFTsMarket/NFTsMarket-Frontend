import Head from "next/head";
import { SimpleGrid } from "@chakra-ui/react";
import Product from "../components/catalogue/Product.jsx";

export default function Home() {
  const products = [
    {
      id: "01",
      title: "first title",
      picture:
        "https://yt3.ggpht.com/ytc/AKedOLRvi-z-jccgYj8gmB_08_7WxwgjtXA1AHz2xmsb=s900-c-k-c0x00ffffff-no-rj",
      price: 10.34,
    },
    {
      id: "02",
      title: "second title",
      picture: "https://m.media-amazon.com/images/I/51YLsREcAaL.jpg",
      price: 20.34,
    },
    {
      id: "03",
      title: "third title",
      picture:
        "https://w0.peakpx.com/wallpaper/934/116/HD-wallpaper-funny-monkey-primate-baboon-water-funny-monkey.jpg",
      price: 30.34,
    },
    {
      id: "04",
      title: "fourth title",
      picture:
        "https://media.istockphoto.com/photos/gorilla-on-a-motorcycle-picture-id1129452040?k=20&m=1129452040&s=612x612&w=0&h=LCvZWq-TG2wvYTfyHHXFZR2I3K0pEqC2FWjwH-Uy6gk=",
      price: 40.34,
    },
    {
      id: "05",
      title: "fifth title",
      picture:
        "https://hakaimagazine.com/wp-content/uploads/header-proboscis-monkeys.jpg",
      price: 50.34,
    },
  ];

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

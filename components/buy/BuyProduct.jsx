import { SimpleGrid, Text, useToast } from "@chakra-ui/react";
import Router from 'next/router';
import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Product from "../catalogue/Product.jsx";
import BuyApi from './BuyApi.js';

export default function BuyProduct(props) {
  const product = props.product;
  const recaptchaRef = React.createRef();
  const toast = useToast();

  async function onCaptcha(value) {
    if (await BuyApi.createPurchase(product.id, value))
      Router.push('/');
    else {
      recaptchaRef.current.reset();
      toast({
        name: "There was some error.",
        description: "Please, check that you have enough funds in your wallet.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  return (
    <div className="upload-show">
      <SimpleGrid columns={3}>
        <Product product={product} displayButton={false} />

        <Text
          center
          py={5}
          width={700}
          style={{
            display: "block",
            verticalAlign: "middle",
            marginTop: "25%",
          }}
        >
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey="6Leg7agdAAAAAKZqXGYJkFDoaSLEd6VnikUIefgE"
            onChange={onCaptcha}
          />
        </Text>
      </SimpleGrid>
    </div>
  );
}

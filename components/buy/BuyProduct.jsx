import { SimpleGrid, Text } from "@chakra-ui/react";
import ReCAPTCHA from "react-google-recaptcha";
import BuyApi from './BuyApi.js';
import Product from "../catalogue/Product.jsx";

export default function BuyProduct(props) {
  const product = props.product;

  async function onCaptcha(value) {
    if (await BuyApi.createPurchase(product.id, value))
      Router.push('/');
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
            sitekey="6Leg7agdAAAAAKZqXGYJkFDoaSLEd6VnikUIefgE"
            onChange={onCaptcha}
          />
        </Text>
      </SimpleGrid>
    </div>
  );
}

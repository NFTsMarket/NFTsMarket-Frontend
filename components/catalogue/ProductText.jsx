import { Text } from "@chakra-ui/react";

const ProductText = ({ title, text }) => {
  return (
    <>
      <Text lineHeight={8} fontSize="lg">
        <b>{title}</b>
      </Text>
      <Text lineHeight={10} ml={5}>{text}</Text>
    </>
  );
};

export default ProductText;

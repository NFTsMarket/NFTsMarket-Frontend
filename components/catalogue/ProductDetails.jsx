import { Text, SimpleGrid, Button } from "@chakra-ui/react";
import { DeleteIcon, EditIcon, ArrowBackIcon } from "@chakra-ui/icons";
import Link from "next/link";
import Product from "./Product.jsx";

export default function ProductDetails(props) {
  const product = props.product;

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
          <b>Created by:</b> {product.creator}
          <br />
          <b>Current owner:</b> {product.owner}
          <br />
          <b>Description:</b> {product.description}
          <br />
          <b>Categories:</b> {product.categories}
          <br />
          <b>Creation date:</b> {product.createdAt}
          <br />
          <b>Most recent update date:</b> {product.updatedAt}
          <br />
          <br />
          <div>
            <Button
              style={{ marginRight: "20px" }}
              leftIcon={<EditIcon />}
              colorScheme="purple"
              onClick={() => props.onEdit(props.product)}
              //   onClick={(newProduct) => onProductEdit(newProduct, product)}
            >
              Edit
            </Button>
            <Button
              style={{ marginRight: "20px" }}
              leftIcon={<DeleteIcon />}
              colorScheme="purple"
              variant="outline"
              //   onClick={onProductDelete}
            >
              Delete
            </Button>

            <Link href={"/"} passHref>
              <Button
                leftIcon={<ArrowBackIcon />}
                colorScheme="purple"
                variant="outline"
              >
                Back
              </Button>
            </Link>
          </div>
        </Text>
      </SimpleGrid>
    </div>
  );
}

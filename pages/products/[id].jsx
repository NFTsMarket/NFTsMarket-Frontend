import Product from "../../components/catalogue/Product.jsx";
import { Text, SimpleGrid, Button } from "@chakra-ui/react";
import { DeleteIcon, EditIcon, ArrowBackIcon } from "@chakra-ui/icons";
import Link from "next/link";

function ShowProduct(props) {
  const product = {
    id: "01",
    title: "first product",
    creator: "creator01",
    owner: "creator01",
    description: "This is a specific monkey",
    price: 30.5,
    categories: "Monkeys",
    picture:
      "https://i.natgeofe.com/n/82fddbcc-4cbb-4373-bf72-dbc30068be60/drill-monkey-01.jpg",
    updatedAt: Date(),
    createdAt: Date(),
  };

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
              onClick={() => console.log("Edit pressed")}
            >
              Edit
            </Button>
            <Button
              style={{ marginRight: "20px" }}
              leftIcon={<DeleteIcon />}
              colorScheme="purple"
              variant="outline"
              onClick={() => console.log("Delete pressed")}
            >
              Delete
            </Button>

            <Link href={"/"} passHref>
              <Button
                leftIcon={<ArrowBackIcon />}
                colorScheme="purple"
                variant="outline"
                onClick={() => console.log("Back pressed")}
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

export default ShowProduct;

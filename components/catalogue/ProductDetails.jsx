import { ArrowBackIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Button, SimpleGrid, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Product from "./Product.jsx";

export default function ProductDetails(props) {
  const product = props.product;
  const [isPending, setIsPending] = useState(true);
  const [isOwner, setIsOwner] = useState(true);

  function saveProduct(newProduct) {
    setProduct((prevProduct) => {
      let res = Object.assign({}, prevProduct);
      res.title = newProduct.title;
      res.price = newProduct.price;
      res.description = newProduct.description;
      res.categories = newProduct.categories;
      res.picture = newProduct.picture;
      res.updatedAt = Date();

      return res;
    });

    // TODO: Check that the user can edit the product used as parameter
    // TODO: If "validation" is true
    setIsEditing(false);
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setIsPending(user == null || user.id == product.owner);
    setIsOwner(user == null || user.id == product.owner);
  }, []);

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
            >
              Edit
            </Button>
            <Button
              style={{ marginRight: "20px" }}
              leftIcon={<DeleteIcon />}
              colorScheme="purple"
              variant="outline"
            >
              Delete
            </Button>

            {!isOwner &&
              <Button
                style={{ marginRight: "20px" }}
                colorScheme="purple"
                variant="outline"
                isDisabled={isPending}
                onClick={() => props.onBuy(props.product)}
              >
                Buy
              </Button>
            }

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

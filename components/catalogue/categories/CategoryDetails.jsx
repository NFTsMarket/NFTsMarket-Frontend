import { Text, Button, Center, SimpleGrid, Divider } from "@chakra-ui/react";
import { EditIcon, ArrowBackIcon } from "@chakra-ui/icons";

import Link from "next/link";
import { useEffect, useState } from "react";
import LoadingCircle from "../../common/LoadingCircle.jsx";
import { useAuth } from "../../../context/AuthContext.jsx";
import { getProductByCategory } from "../catalogueResource.js";
import ErrorAlert from "../errorAlert.jsx";
import Product from "../Product.jsx";
import DeleteCategoryAlert from "./deleteCategoryAlert.jsx";

export default function CategoryDetails({ category, onEdit }) {
  const { isAuthenticated, user, dispatch } = useAuth();
  const [loading, setloading] = useState(true);
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState([]);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    if (category.name) {
      getProductByCategory(category.id)
        .then((data) => setProducts(data))
        .catch((error) => {
          setMessage(error);
        })
        .then(() => setloading(false));
    }

    const user = JSON.parse(localStorage.getItem("user"));
    setIsPending(user == null || user.id == category.owner);
  }, [category]);

  return (
    <div className="upload-show">
      {loading ? (
        <div className="loading" style={{ margin: "100px" }}>
          <LoadingCircle />
        </div>
      ) : (
        <>
          {message !== "" ? (
            <ErrorAlert text="Error!" description={message.toString()} />
          ) : null}
          <Center>
            <SimpleGrid
              m={10}
              p={10}
              rounded={"lg"}
              boxShadow={"2xl"}
              color={"#333 "}
            >
              <Center w="700px" mx={5} px={5}>
                <Text center width={400}>
                  <Text lineHeight={8} fontSize="lg">
                    <b>{category.name}</b>
                  </Text>
                </Text>
                <Button
                  style={{ marginRight: "20px" }}
                  leftIcon={<EditIcon />}
                  colorScheme="purple"
                  onClick={() => onEdit(category)}
                  disabled={!isAuthenticated}
                >
                  Edit
                </Button>

                <DeleteCategoryAlert id={category.id} />

                <Link href={"/"} passHref>
                  <Button
                    style={{ marginLeft: "20px" }}
                    leftIcon={<ArrowBackIcon />}
                    colorScheme="purple"
                    variant="outline"
                  >
                    Back
                  </Button>
                </Link>
              </Center>
            </SimpleGrid>
          </Center>
          <Center mx="2em">
            <SimpleGrid minChildWidth="300px" spacing={2}>
              {products.map((p) => (
                <Product key={p.id} product={p} displayButton={true} />
              ))}
            </SimpleGrid>
          </Center>
        </>
      )}
    </div>
  );
}

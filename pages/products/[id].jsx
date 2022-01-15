import { useEffect, useState } from "react";
import { getProductByID } from "../../components/catalogue/catalogueResource.js";
import EditableProduct from "../../components/catalogue/EditableProduct.jsx";
import { useRouter } from "next/router";
import ProductDetails from "../../components/catalogue/ProductDetails.jsx";
import BuyProduct from "../../components/catalogue/BuyProduct.jsx";
import EditProduct from "../../components/catalogue/EditProduct.jsx";
import LoadingCircle from "../../components/common/LoadingCircle.jsx";


function ShowProduct(props) {
  console.log(props);
  const [loading, setloading] = useState(true);
  const [status, setStatus] = useState("details");
  const [product, setProduct] = useState({});

  const router = useRouter();
  const { id } = router.query ? router.query : undefined;

  useEffect(() => {
    if (id != undefined) {
      getProductByID(id)
        .then((data) => setProduct(data))
        .catch((error) => {
          console.log(error);
          console.log("error");
        });
    }
  }, [router.query, id]);

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
    setStatus("details");
  }

  function deleteProduct(productDeleted) {
    useEffect(() => {
      const id = productDeleted.id;
      if (id != undefined) {
        try {
          deleteProduct(id).then((response) => {
            if (response.ok) {
              window.location.href = "http://localhost:3000";
            } else {
              throw Error("Response not valid:" + response.status);
            }
          });
        } catch (error) {}
      }
    }, [router.query, id]);
  }

  switch (status) {
    case "editing":
      return (
        <EditProduct
          product={product}
          onSave={(newProduct) => saveProduct(newProduct)}
          onCancel={() => setStatus("details")}
        />
      );

    case "buying":
      return (
        <BuyProduct
          product={product}
          displayButton={false}
          onDelete={props.onDelete}
          onEdit={() => setStatus("editing")}
          onBuy={() => setStatus("buying")}
        />
      );

    case "details":
    default:
      return (
        <>
          {product !== {} || product !== undefined ? (
            <ProductDetails
              product={product}
              displayButton={false}
              onDelete={props.onDelete}
              onEdit={() => setStatus("editing")}
              onBuy={() => setStatus("buying")}
            />
          ) : (
            <LoadingCircle />
          )}
        </>
      );
  }
}

export default ShowProduct;

// {
//   id: "01",
//   title: "first product",
//   creator: "creator01",
//   owner: "creator01",
//   description: "This is a specific monkey",
//   price: 30.5,
//   categories: "Monkeys",
//   picture:
//     "https://i.natgeofe.com/n/82fddbcc-4cbb-4373-bf72-dbc30068be60/drill-monkey-01.jpg",
//   updatedAt: Date(),
//   createdAt: Date(),
// }

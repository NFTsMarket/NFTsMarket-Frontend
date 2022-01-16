import { useEffect, useState } from "react";
import { getProductByID } from "../../components/catalogue/catalogueResource.js";
import { useRouter } from "next/router";
import ProductDetails from "../../components/catalogue/ProductDetails.jsx";
import BuyProduct from "../../components/catalogue/BuyProduct.jsx";
import EditProduct from "../../components/catalogue/EditProduct.jsx";
import ProductError from "../../components/catalogue/ProductError.jsx";

function ShowProduct(props) {
  const [status, setStatus] = useState("details");
  const [message, setMessage] = useState("");
  const [product, setProduct] = useState({});

  const router = useRouter();
  const { id } = router.query ? router.query : undefined;

  useEffect(() => {
    if (id != undefined) {
      getProductByID(id)
        .then((data) => setProduct(data))
        .catch((error) => {
          setStatus("error");
          setMessage(error);
          console.error(error);
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
        <ProductDetails
          product={product}
          displayButton={false}
          onDelete={props.onDelete}
          onEdit={() => setStatus("editing")}
          onBuy={() => setStatus("buying")}
        />
      );

    case "error":
      return <ProductError message={message} />;
  }
}

export default ShowProduct;

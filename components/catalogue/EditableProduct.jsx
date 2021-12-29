import { useState } from "react";
import EditProduct from "./EditProduct.jsx";
import ProductDetails from "./ProductDetails.jsx";

function EditableProduct(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [product, setProduct] = useState(props.product);

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

  var productRender;

  if (isEditing) {
    productRender = (
      <EditProduct
        product={product}
        onSave={(newProduct) => saveProduct(newProduct)}
        onCancel={() => setIsEditing(false)}
      />
    );
  } else {
    productRender = (
      <ProductDetails
        product={product}
        displayButton={false}
        onDelete={props.onDelete}
        onEdit={() => setIsEditing(true)}
      />
    );
  }
  return productRender;
}

export default EditableProduct;

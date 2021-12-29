import { useState } from "react";
import EditProduct from "./EditProduct.jsx";
import ProductDetails from "./ProductDetails.jsx";

function EditableProduct(props) {
  const [isEditing, setIsEditing] = useState(false);

  function saveProduct(product) {
    const result = props.onEdit(product);
    if (result) {
      setIsEditing(false);
    }
  }

  var productRender;

  if (isEditing) {
    productRender = (
      <EditProduct
        product={props.product}
        onDelete={props.onDelete}
        onSave={saveProduct}
        onCancel={() => setIsEditing(false)}
      />
    );
  } else {
    productRender = (
      <ProductDetails
        product={props.product}
        displayButton={false}
        onDelete={props.onDelete}
        onEdit={() => setIsEditing(true)}
      />
    );
  }
  return productRender;
}

export default EditableProduct;

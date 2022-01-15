import { useState } from "react";
import BuyProduct from "./BuyProduct.jsx";
import EditProduct from "./EditProduct.jsx";
import ProductDetails from "./ProductDetails.jsx";

function EditableProduct(props) {
  const [status, setStatus] = useState('details');
  const [product, setProduct] = useState(props.product);

  function saveProduct(newProduct) {
    setProduct((prevProduct) => {
      let res = Object.assign({}, prevProduct);
      res.title = newProduct.title;
      res.price = newProduct.price;
      res.description = newProduct.description;
      res.categories = newProduct.categories.name;
      res.picture = newProduct.picture;
      res.updatedAt = Date();

      return res;
    });

    // TODO: Check that the user can edit the product used as parameter
    // TODO: If "validation" is true
    setStatus('details');
  }

  switch (status) {
    case 'editing':
      return (
        <EditProduct
          product={product}
          onSave={(newProduct) => saveProduct(newProduct)}
          onCancel={() => setStatus('details')}
        />
      );

    case 'buying':
      return (
        <BuyProduct
          product={product}
          displayButton={false}
          onDelete={props.onDelete}
          onEdit={() => setStatus('editing')}
          onBuy={() => setStatus('buying')}
        />
      );

    case 'details':
    default:
      return (
        <ProductDetails
          product={product}
          displayButton={false}
          onDelete={props.onDelete}
          onEdit={() => setStatus('editing')}
          onBuy={() => setStatus('buying')}
        />
      );
  }
}

export default EditableProduct;

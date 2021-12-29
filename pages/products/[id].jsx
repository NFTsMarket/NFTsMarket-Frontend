import EditableProduct from "../../components/catalogue/EditableProduct.jsx";

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

  // TODO: Update and redirect to index
  function onProductDelete(product) {
    setProducts((prevProducts) => {
      return prevProducts.filter((p) => {
        p.id !== product.id;
      });
    });
  }

  // TODO: Validation (in common function)
  function onProductEdit(newProduct, oldProduct) {
    if (newProduct.id !== oldProduct.id) {
      // TODO: TEST THIS PART
      return false;
    }

    // Return the new list
    setProducts((prevProducts) => {
      prevProducts.map([...prevProducts, newProduct]);
    });
  }

  return <EditableProduct product={product} />;
  // return <ProductDetails product={product} displayButton={false} />;
}

export default ShowProduct;

import { useState } from "react";
import { Input, Button } from "@chakra-ui/react";
import { SmallAddIcon } from "@chakra-ui/icons";

function NewProduct(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState("");
  const [picture, setPicture] = useState("");

  function onClick() {
    const newProduct = {
      title: title,
      description: description,
      price: price,
      categories: categories,
      picture: picture,
    };

    const result = props.onAddProduct(newProduct);

    if (result) {
      setTitle("");
      setDescription("");
      setPrice("");
      setCategories("");
      setPicture("");
    }
  }

  return (
    <tr>
      <td>
        <Input
          placeholder="Title"
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </td>
      <td>
        <Input
          placeholder="Description"
          name="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </td>
      <td>
        <Input
          placeholder="Price"
          name="price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
      </td>
      <td>
        <Input
          placeholder="Categories"
          name="categories"
          value={categories}
          onChange={(event) => setCategories(event.target.value)}
        />
      </td>
      <td>
        <Input
          placeholder="Picture"
          name="picture"
          value={picture}
          onChange={(event) => setPicture(event.target.value)}
        />
      </td>
      <td>
        <Button
          onClick={onClick}
          colorScheme="purple"
          leftIcon={<SmallAddIcon />}
        >
          Create product
        </Button>
      </td>
    </tr>
  );
}

export default NewProduct;

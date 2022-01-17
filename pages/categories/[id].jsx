import { useEffect, useState } from "react";
import { getCategoryByID } from "../../components/catalogue/catalogueResource.js";
import { useRouter } from "next/router";
import EditCategory from "../../components/catalogue/categories/EditCategory.jsx";
import CategoryDetails from "../../components/catalogue/categories/CategoryDetails.jsx";
import ProductError from "../../components/catalogue/ProductError.jsx";

function ShowCategory(props) {
  const [status, setStatus] = useState("details");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState({});

  const router = useRouter();
  const { id } = router.query ? router.query : undefined;

  useEffect(() => {
    if (id != undefined) {
      getCategoryByID(id)
        .then((data) => setCategory(data))
        .catch((error) => {
          setStatus("error");
          setMessage(error);
          console.error(error);
        });
    }
  }, [router.query, id]);

  function saveCategory(newCategory) {
    setCategory((prevCategory) => {
      let res = Object.assign({}, prevCategory);
      res.name = newCategory.name;
      res.updatedAt = Date();

      return res;
    });
    // TODO: Check that the user can edit the category used as parameter
    // TODO: If "validation" is true
    setStatus("details");
  }

  switch (status) {
    case "editing":
      return (
        <EditCategory
          category={category}
          onSave={(newCategory) => saveCategory(newCategory)}
          onCancel={() => setStatus("details")}
        />
      );

    case "details":
    default:
      return (
        <CategoryDetails
          category={category}
          displayButton={false}
          onDelete={props.onDelete}
          onEdit={() => setStatus("editing")}
        />
      );

    case "error":
      return <ProductError message={message} />;
  }
}

export default ShowCategory;

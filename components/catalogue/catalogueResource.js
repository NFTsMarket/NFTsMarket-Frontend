import { setContext } from "@apollo/client/link/context";

var BASE_API_PATH = "http://localhost:4000/api/v1";

// PRODUCTS CRUD
const getAllProducts = async () => {
  const token = localStorage.getItem("token");
  console.log(token);
  const data = await fetch(`${BASE_API_PATH}/products`, {
    method: "GET",
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });
  const json = await data.json();

  return json;
};

const getProductByID = async (id) => {
  const data = await fetch(`${BASE_API_PATH}/products/${id}`);
  const json = await data.json();

  return json;
};

const getProductByCategory = async (id) => {
  const data = await fetch(`${BASE_API_PATH}/products-category/${id}`);
  const json = await data.json();

  return json;
};

const postProduct = async (product) => {
  const data = await fetch(`${BASE_API_PATH}/products`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  const json = await data.json();

  return json;
};

const putProduct = async (id, product) => {
  const data = await fetch(`${BASE_API_PATH}/products/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  const json = await data.json();

  return json;
};

const deleteProduct = async (id) => {
  const data = await fetch(`${BASE_API_PATH}/products/${id}`, {
    method: "DELETE",
  });
  const json = await data.json();

  return json;
};

// CATEGORIES CRUD
const getCategories = async () => {
  const data = await fetch(`${BASE_API_PATH}/categories`);
  const json = await data.json();

  return json;
};

const getCategoryByID = async (id) => {
  const data = await fetch(`${BASE_API_PATH}/categories/${id}`);
  const json = await data.json();

  return json;
};

const postCategory = async (category) => {
  const data = await fetch(`${BASE_API_PATH}/categories`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  });
  const json = await data.json();

  return json;
};

const putCategory = async (id, category) => {
  const data = await fetch(`${BASE_API_PATH}/categories/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  });
  const json = await data.json();

  return json;
};

const deleteCategory = async (id) => {
  const data = await fetch(`${BASE_API_PATH}/categories/${id}`, {
    method: "DELETE",
  });
  const json = await data.json();

  return json;
};

const exportedFunctions = {
  getAllProducts,
  getProductByID,
  getProductByCategory,
  postProduct,
  putProduct,
  deleteProduct,
  getCategories,
  getCategoryByID,
  postCategory,
  putCategory,
  deleteCategory,
};

export {
  getAllProducts,
  getProductByID,
  getProductByCategory,
  postProduct,
  putProduct,
  deleteProduct,
  getCategories,
  getCategoryByID,
  postCategory,
  putCategory,
  deleteCategory,
};

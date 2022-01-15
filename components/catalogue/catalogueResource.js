import { setContext } from "@apollo/client/link/context";

var BASE_API_PATH = "http://localhost:4000/api/v1";

// PRODUCTS CRUD
const getAllProducts = async () => {
  return await fetch(`${BASE_API_PATH}/products`)
    .then((response) => {
      if (!response.ok) throw Error(response.status);

      return response;
    })
    .then((response) => response.json())
    .catch((error) => {
      throw Error(error);
    });
};

const getProductByID = async (id) => {
  return await fetch(`${BASE_API_PATH}/products/${id}`)
    .then((response) => {
      if (!response.ok) throw Error(response.status);

      return response;
    })
    .then((response) => response.json())
    .catch((error) => {
      throw Error(error);
    });
};

const getProductByCategory = async (id) => {
  try {
    const data = await fetch(`${BASE_API_PATH}/products-category/${id}`);
    return response.json();
  } catch (error) {
    return [];
  }
};

const postProduct = async (product) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_API_PATH}/products`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(product),
  });

  return response;
};

const putProduct = async (id, product) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_API_PATH}/products/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(product),
  });

  return response;
};

const deleteProduct = async (id) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_API_PATH}/products/${id}`, {
    method: "DELETE",
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });

  return response;
};

// CATEGORIES CRUD
const getCategories = async () => {
  try {
    const response = await fetch(`${BASE_API_PATH}/categories`);
    return response.json();
  } catch (error) {
    return [];
  }
};

const getCategoryByID = async (id) => {
  try {
    const response = await fetch(`${BASE_API_PATH}/categories/${id}`);
    return response.json();
  } catch (error) {
    return [];
  }
};

const postCategory = async (category) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_API_PATH}/categories`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(category),
  });

  return response;
};

const putCategory = async (id, category) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_API_PATH}/categories/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(category),
  });
  return response;
};

const deleteCategory = async (id) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_API_PATH}/categories/${id}`, {
    method: "DELETE",
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });

  return response;
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

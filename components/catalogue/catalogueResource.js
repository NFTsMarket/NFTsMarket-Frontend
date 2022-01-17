//var BASE_API_PATH = "https://api-catalogue-juancarlosalonsovalenzuela.cloud.okteto.net/api/v1";
// var BASE_API_PATH = "http://localhost:4000/api/v1";
var BASE_API_PATH = `${process.env.NEXT_PUBLIC_API_GATEWAY_DOMAIN}/catalogue`;

// PRODUCTS CRUD
const getAllProducts = async () => {
  return await fetch(`${BASE_API_PATH}/products`)
    .then((response) => {
      if (!response.ok)
        throw Error(`${response.status}: ${response.statusText}`);

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
      if (!response.ok) {
        throw Error(`${response.status}: ${response.statusText}`);
      }

      return response;
    })
    .then((response) => response.json())
    .catch((error) => {
      throw Error(error);
    });
};

const getProductByCategory = async (id) => {
  return await fetch(`${BASE_API_PATH}/products-category/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw Error(`${response.status}: ${response.statusText}`);
      }

      return response;
    })
    .then((response) => response.json())
    .catch((error) => {
      throw Error(error);
    });
};

const postProduct = async (product) => {
  const token = localStorage.getItem("token");

  return await fetch(`${BASE_API_PATH}/products`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(product),
  })
    .then((response) => {
      if (!response.ok) {
        throw Error(`${response.status}: ${response.statusText}`);
      }

      return response;
    })
    .then((response) => response.json())
    .catch((error) => {
      throw Error(error);
    });
};

const putProduct = async (id, product) => {
  const token = localStorage.getItem("token");

  return await fetch(`${BASE_API_PATH}/products/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(product),
  })
    .then((response) => {
      if (!response.ok) {
        throw Error(`${response.status}: ${response.statusText}`);
      }

      return response;
    })
    .catch((error) => {
      throw Error(error);
    });
};

const deleteProduct = async (id) => {
  const token = localStorage.getItem("token");
  return await fetch(`${BASE_API_PATH}/products/${id}`, {
    method: "DELETE",
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw Error(`${response.status}: ${response.statusText}`);
      }

      return response;
    })
    .catch((error) => {
      throw error;
    });
};

// CATEGORIES CRUD
const getCategories = async () => {
  return await fetch(`${BASE_API_PATH}/categories`)
    .then((response) => {
      if (!response.ok)
        throw Error(`${response.status}: ${response.statusText}`);

      return response;
    })
    .then((response) => response.json())
    .catch((error) => {
      throw Error(error);
    });
};

const getCategoryByID = async (id) => {
  return await fetch(`${BASE_API_PATH}/categories/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw Error(`${response.status}: ${response.statusText}`);
      }

      return response;
    })
    .then((response) => response.json())
    .catch((error) => {
      throw Error(error);
    });
};

const postCategory = async (category) => {
  const token = localStorage.getItem("token");

  return await fetch(`${BASE_API_PATH}/categories`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(category),
  })
    .then((response) => {
      if (!response.ok) {
        throw Error(`${response.status}: ${response.statusText}`);
      }

      return response;
    })
    .then((response) => response.json())
    .catch((error) => {
      throw Error(error);
    });
};

const putCategory = async (id, category) => {
  const token = localStorage.getItem("token");
  return await fetch(`${BASE_API_PATH}/categories/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(category),
  })
    .then((response) => {
      if (!response.ok) {
        throw Error(`${response.status}: ${response.statusText}`);
      }

      return response;
    })
    .catch((error) => {
      throw Error(error);
    });
};

const deleteCategory = async (id) => {
  const token = localStorage.getItem("token");
  return await fetch(`${BASE_API_PATH}/categories/${id}`, {
    method: "DELETE",
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw Error(`${response.status}: ${response.statusText}`);
      }

      return response;
    })
    .catch((error) => {
      throw error;
    });
};

const getAssets = async () => {
  return await fetch(`${BASE_API_PATH}/assets`)
    .then((response) => {
      if (!response.ok)
        throw Error(`${response.status}: ${response.statusText}`);

      return response;
    })
    .then((response) => response.json())
    .catch((error) => {
      throw Error(error);
    });
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
  getAssets,
};

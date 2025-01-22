const BASE_URL = "http://localhost:3002/products";

const productList = async () => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error("Error al obtener actividades");
    return await response.json();
  } catch (error) {
    console.error("Error al obtener actividades:", error);
  }
};

const getProductById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) throw new Error("Error al obtener actividad");
    return await response.json();
  } catch (error) {
    console.error(`Error al obtener actividad con id ${id}:`, error);
  }
};

const createProduct = async (title, description, imgUrl) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, imgUrl }),
    });
    if (!response.ok) throw new Error("Error al crear actividad");
    return await response.json();
  } catch (error) {
    console.error("Error al crear actividad:", error);
  }
};

const updateProduct = async (id, title, description, imgUrl) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, imgUrl }),
    });
    if (!response.ok) throw new Error("Error al actualizar actividad");
    return await response.json();
  } catch (error) {
    console.error(`Error al actualizar actividad con id ${id}:`, error);
  }
};

const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Error al eliminar actividad");
    return await response.json();
  } catch (error) {
    console.error(`Error al eliminar actividad con id ${id}:`, error);
  }
};

export const servicesProducts = {
  productList,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

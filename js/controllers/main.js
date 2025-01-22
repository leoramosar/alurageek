// API URL
const API_URL = "http://localhost:3002/products";

// Obtener todas las actividades desde la API
async function getAllActivities() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error al obtener actividades");
    const activities = await response.json();
    return activities;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Crear una nueva actividad en la API
async function createActivity(title, price, imgUrl) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, price, imgUrl }),
    });
    if (!response.ok) throw new Error("Error al crear actividad");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Eliminar una actividad de la API
async function deleteActivity(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Error al eliminar actividad");
  } catch (error) {
    console.error(error);
  }
}

// Actualizar una actividad en la API
async function updateActivity(id, updatedActivity) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedActivity),
    });
    if (!response.ok) throw new Error("Error al actualizar actividad");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Renderizar todas las actividades en el DOM
async function allActivities() {
  const containerActivities = document.getElementById("container_products");
  containerActivities.innerHTML = "";

  const activities = await getAllActivities();
  if (activities.length === 0) {
    const noActivityMessage = document.createElement("p");
    noActivityMessage.textContent = "No hay actividades";
    noActivityMessage.classList.add("no_activity");
    containerActivities.classList.add("add_card");
    containerActivities.appendChild(noActivityMessage);
    return;
  }

  const htmlActivities = activities.map((activity) => cardActivity(activity));
  htmlActivities.forEach((htmlCard) => {
    containerActivities.appendChild(htmlCard);
  });
}

// Crear y agregar una nueva actividad desde el formulario
async function handlerButtonCard(event) {
  event.preventDefault();
  const inputTitle = document.getElementById("input_title");
  const inputPrice = document.getElementById("input_price");
  const inputImg = document.getElementById("input_img");
  const contentCardG = document.getElementById("container_products");
  contentCardG.classList.remove("add_card");

  const titleValue = inputTitle.value;
  const priceValue = inputPrice.value;
  const imgValue = inputImg.value;

  if (!titleValue || !priceValue || !imgValue) {
    alert("Por favor, todos los campos son obligatorios");
    contentCardG.classList.add("add_card");
  } else {
    await createActivity(titleValue, priceValue, imgValue);
    await allActivities();
    inputTitle.value = "";
    inputPrice.value = "";
    inputImg.value = "";
  }
}

// Eliminar actividad
async function handlerButtonCardDelete(event) {
  const containerCard = event.target.closest(".card_activity");
  const activityId = containerCard.id;
  await deleteActivity(activityId);
  await allActivities();
}

// Abrir modal para editar actividad
function openEditModal(activity) {
  const modal = document.getElementById("modal_edit");
  const inputTitle = document.getElementById("edit_title");
  const inputPrice = document.getElementById("edit_price");
  const inputImg = document.getElementById("edit_img");
  document.body.classList.add("modal-open");

  modal.dataset.activityId = activity.id;

  inputTitle.value = activity.title;
  inputPrice.value = activity.price;
  inputImg.value = activity.imgUrl;

  modal.style.display = "flex";
}

// Actualizar actividad desde el modal
const updateButton = document.getElementById("update_button");
updateButton.addEventListener("click", async function (event) {
  event.preventDefault();
  const inputTitle = document.getElementById("edit_title");
  const inputPrice = document.getElementById("edit_price");
  const inputImg = document.getElementById("edit_img");
  const activityId = document.getElementById("modal_edit").dataset.activityId;

  const updatedActivity = {
    title: inputTitle.value,
    price: inputPrice.value,
    imgUrl: inputImg.value,
  };

  await updateActivity(activityId, updatedActivity);
  await allActivities();

  document.body.classList.remove("modal-open");
  const modal = document.getElementById("modal_edit");
  modal.style.display = "none";
});

// Renderizar una tarjeta de actividad
function cardActivity(activity) {
  const { id, title, price, imgUrl } = activity;
  const cardTitle = document.createElement("p");
  cardTitle.innerHTML = title;
  cardTitle.className = "card_title";

  const cardPrice = document.createElement("p");
  cardPrice.innerHTML = price;
  cardPrice.className = "card_price";

  const cardImg = document.createElement("img");
  cardImg.src = imgUrl;
  cardImg.className = "card_img_img";

  const editButton = document.createElement("button");
  editButton.innerHTML = "Edit";
  editButton.className = "edit";
  editButton.id = id;
  editButton.addEventListener("click", function () {
    openEditModal(activity);
  });

  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = "Delete";
  deleteButton.className = "delete";
  deleteButton.id = id;
  deleteButton.addEventListener("click", handlerButtonCardDelete);

  const contentCardButton = document.createElement("div");
  contentCardButton.className = "card_button";
  contentCardButton.appendChild(editButton);
  contentCardButton.appendChild(deleteButton);

  const contentCardImg = document.createElement("div");
  contentCardImg.appendChild(cardImg);
  contentCardImg.className = "card_img";

  const contentCardInfo = document.createElement("div");
  contentCardInfo.appendChild(cardTitle);
  contentCardInfo.appendChild(cardPrice);
  contentCardInfo.className = "card_inf";

  const contentCard = document.createElement("div");
  contentCard.appendChild(contentCardInfo);
  contentCard.appendChild(contentCardImg);
  contentCard.appendChild(contentCardButton);
  contentCard.className = "card_content";

  const containerCard = document.createElement("div");
  containerCard.appendChild(contentCard);
  containerCard.className = "card_activity";
  containerCard.id = id;

  return containerCard;
}

// Inicializar
const cardButton = document.getElementById("add_button");
cardButton.addEventListener("click", handlerButtonCard);

document.addEventListener("DOMContentLoaded", allActivities);

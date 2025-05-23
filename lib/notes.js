import mockData from "../mocks/res.json";
import vacio from "../mocks/vacio.json";
const apiUrl = "https://nicopasino.space/api/notes";

export default function getCardsAPI() {
  return fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => data);
}

export function getCardsLocal() {
  return mockData;
}

export function getCardsVacio() {
  return vacio;
}

export function getCardId(id) {
  // const datos = getCardsLocal();
  // const data = datos.find((e) => e.id === Number(id));
  // return data;

  return getCardsAPI().then((datos) => datos.find((e) => e.id === Number(id)));
}

export function createCard({ data }) {
  // TODO: Validar antes de enviar
  return fetch(`${apiUrl}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export function updateCard({ id, data }) {
  // TODO: validar antes de enviar
  return fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export function deleteCard({ id }) {
  return fetch(`${apiUrl}/${id}`, { method: "DELETE" });
}

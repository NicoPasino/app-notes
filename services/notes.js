import mockData from "../mocks/res.json";
import vacio from "../mocks/vacio.json";

// const miDominio = "https://nicopasino.space";
const miDominio = "https://localhost:7267";
const apiUrl = miDominio + "/api/notes";
export const downloadApk = miDominio + "/notes/notes.apk";

export default function getCardsAPI() {
  return fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => data);
}

export const getCardsLocal = () => mockData;

export const getCardsVacio = () => vacio;

export function getCardId(id) {
  return getCardsAPI().then((datos) => datos.find((e) => e.id === Number(id)));
}
export const getCardIdLocal = (id) => {
  const datos = getCardsLocal();
  const data = datos.find((e) => e.id === Number(id));
  return data;
};

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

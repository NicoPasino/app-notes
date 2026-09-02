import { __IsWeb__ } from "../config";
import mockData from "../mocks/res.json";
import vacio from "../mocks/vacio.json";

const localPort = "5000";
const ipLocalWeb = `http://localhost:${localPort}`;
const ipLocalAndroid = `http://${process.env.EXPO_PUBLIC_IPLOCAL}:${localPort}`;
const ipCloud = "https://nicopasino.space";

const ipLocal = __IsWeb__ ? ipLocalWeb : ipLocalAndroid;
const miDominio = __DEV__ ? ipLocal : ipCloud;

const apiUrl = miDominio + `/api/notes`;

export const downloadApk = miDominio + "/notes/notes.apk";

async function request(path, options = {}) {
  return await fetch(apiUrl + path, {
    headers: { "Content-Type": "application/json" },
    ...options,
  })
    .then(async (res) => {
      if (res.error) {
        return { error: "Error al hacer la petición con el servidor." };
      } else if (res.status === 202 || res.status === 201 || res.status === 204) {
        return { ok: true };
      } else if (res.status === 200) {
        let resJson = await res.json();
        return resJson;
      } else if (res.status === 400) {
        let resJson = await res.json();
        // console.log("resJson: ", resJson);
        return { message: resJson.message || "Error 400: Solicitud incorrecta (sin mensaje del servidor)." };
      } else if (res.message || res.status === 400) {
        return { message: res.message ?? "Error 400: Solicitud incorrecta." };
      } else if (res.status === 404) {
        return { error: "Error 404: Solicitud/Nota no encontrada." };
      } else if (res.status === 500) {
        return { error: "Error 500: Error desde el servidor." };
      } else {
        return { error: "Error: (Respuesta no controlada)." };
      }
    })
    .catch((e) => {
      return { error: `Error al intentar conectar con la API del Servidor. \nUrl: ${apiUrl}` };
    });
}

function buildCollection() {
  return {
    obtenerTodos: async () => request("/"),
    buscarPorCampo: async (campo, valor) =>
      request(`/search/${campo}/${valor}`),
    obtenerPorId: async (id) => request(`/${id}`),
    agregar: async (item) =>
      request("/", { method: "POST", body: JSON.stringify(item) }),
    eliminar: async (id) => request(`/${Number(id)}`, { method: "DELETE" }),
    actualizar: async (item) => {
      const id = item.ID ?? item.id ?? item.Id ?? item.IdPublica;
      if (!id) throw new Error("No se encontró ID en el item para actualizar");
      return request("/", { method: "PUT", body: JSON.stringify(item) });
    },
    actualizarParcial: async (id, campos) =>
      request(`/${Number(id)}`, { method: "PATCH", body: JSON.stringify(campos) }),
    getCardsVacio: () => vacio,
    getCardsLocal: () => mockData,
  };
}

export const notasAPI = buildCollection();

export default { notasAPI };

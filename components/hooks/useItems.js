import { useEffect, useState } from "react";
import showToast from "../utils/toast";
import { router } from "expo-router";

export function useItems({ itemsDB }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [mensaje, setMensaje] = useState(false);

  function hayError(res) {
    try {
      if (res?.error) {
        setError(res.error);
        return true;
      } else if (res?.message) {
        setMensaje(res.message);
        return true;
      } else {
        setError();
        setMensaje();
        return false;
      }
    } catch {
      setError("Error de código, al checkear la respuesta de la API.");
      return true;
    }
  }

  async function recargarItems(itemsDBArg) {
    setLoading(true);
    try {
      const res = await itemsDBArg.obtenerTodos();
      // const res = await itemsDBArg.getCardsVacio();
      // const res = await itemsDBArg.getCardsLocal();
      if (hayError(res)) return;

      setItems(Array.isArray(res) ? res : []);
    } catch (err) {
      setError(err?.message || String(err));
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    recargarItems(itemsDB);
  }, [itemsDB]);

  const agregar = async ({ nuevoItem }) => {
    const res = await itemsDB.agregar(nuevoItem);
    if (hayError(res)) return;
    showToast({ texto1: "Creado correctamente ✅" });
    recargarItems(itemsDB);
    router.replace("/");
    // return res;
  };
  const actualizar = async ({ nuevoDato }) => {
    const res = await itemsDB.actualizar(nuevoDato);
    if (hayError(res)) return;
    showToast({ texto1: "Actualizado correctamente ✅" });
    recargarItems(itemsDB);
    router.replace("/");
    // return res;
  };
  const obtenerItemDb = async (id) => {
    const res = await itemsDB.obtenerPorId(id);
    if (hayError(res)) return;
    return res;
  };
  const obtenerItem = async (id, api = false) => {
    if (!items || api) {
      return obtenerItemDb(id);
    } else {
      const itemExistente = items.find(
        (item) => String(item.id) === String(id),
      );

      if (itemExistente) return itemExistente;
      else return await obtenerItemDb(id);
    }
  };
  const eliminar = async (id) => {
    const res = await itemsDB.eliminar(Number(id));
    if (hayError(res)) return;
    showToast({ texto1: "Eliminado correctamente ✅" });
    recargarItems(itemsDB);
    router.replace("/");
    // return res;
  };

  const buscarItems = async (campo, valor) => {
    const res = await itemsDB.buscarPorCampo(campo, valor);
    if (hayError(res)) return;
    setItems(res);
  };

  const getAllLocal = async () => {
    const res = await itemsDB.getCardsLocal();
    if (hayError(res)) return;
    return res;
  };

  return {
    items,
    agregar,
    actualizar,
    obtenerItem,
    eliminar,
    recargarItems,
    buscarItems,
    loading,
    error,
    setError,
    mensaje,
    setMensaje,

    getAllLocal,
  };
}

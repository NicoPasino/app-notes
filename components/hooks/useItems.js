import { useEffect, useState } from "react";
import showToast from "../utils/toast";
import { router } from "expo-router";
import { converToLocal } from "../utils/getDate";

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
      setError("Error de código, error al responder la base local.");
      return true;
    }
  }

  async function recargarItems(itemsDBArg) {
    setLoading(true);
    try {
      const res = await itemsDBArg?.obtenerTodos();

      // Convertir fechas de UTC a local
      if (res?.length > 0) {
        res?.forEach((item) => {
          item.fechaCreacion = converToLocal(item.fechaCreacion);
          item.fechaModificacion = converToLocal(item.fechaModificacion);
        });
      }

      if (hayError(res)) return;

      setItems(Array.isArray(res) ? res : []);
    } catch (err) {
      setError(err?.message || String(err));
      setItems([]);
      // console.error(err);
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
  const actualizarParcial = async ({ id, campos }) => {
    const res = await itemsDB.actualizarParcial(id, campos);
    if (hayError(res)) return false;
    showToast({ texto1: "Actualizado correctamente ✅" });
    recargarItems(itemsDB);
    return true;
  };
  const obtenerItem = async (id) => {
    const res = await itemsDB.obtenerPorId(id);
    if (hayError(res)) return;

    res.fechaCreacion = converToLocal(res.fechaCreacion);
    res.fechaModificacion = converToLocal(res.fechaModificacion);

    return res;
  };
  const eliminar = async (id) => {
    const res = await itemsDB.eliminar(Number(id));
    if (hayError(res)) return;
    showToast({ texto1: "Eliminado correctamente ✅" });
    recargarItems(itemsDB);
    router.replace("/");
    // return res;
  };

  return {
    items,
    agregar,
    actualizar,
    actualizarParcial,
    obtenerItem,
    eliminar,
    loading,
    error,
    setError,
    mensaje,
    setMensaje,
  };
}

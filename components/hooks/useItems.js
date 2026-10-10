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

      // Convertir fechas de UTC a local. Se protege cada item para que una
      // sola nota corrupta no rompa la carga de toda la lista.
      if (Array.isArray(res)) {
        res.forEach((item) => {
          try {
            item.fechaCreacion = converToLocal(item.fechaCreacion);
            item.fechaModificacion = converToLocal(item.fechaModificacion);
          } catch {
            // Item inválido: se descarta la fecha pero se conserva la nota.
            item.fechaCreacion = "";
            item.fechaModificacion = "";
          }
        });
      }

      if (hayError(res)) return;

      setItems(Array.isArray(res) ? res : []);
    } catch (err) {
      setError(err?.message || String(err));
      // No se vacía la lista para no perder datos válidos ya cargados.
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
    if (!res) return null;

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

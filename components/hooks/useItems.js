import { useCallback, useEffect, useState } from "react";
import { showToast } from "../utils/toast";
import { router } from "expo-router";
import { converToLocal } from "../utils/getDate";

export function useItems({ itemsDB }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [mensaje, setMensaje] = useState(false);

  const hayError = useCallback((res) => {
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
  }, []);

  // Lee y convierte los items sin tocar estado: no referencia setters, así
  // puede usarse desde el efecto de carga inicial sin violar
  // react-hooks/set-state-in-effect.
  const leerItems = useCallback(async () => {
    const res = await itemsDB?.obtenerTodos();

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

    return res;
  }, [itemsDB]);

  // Carga inicial: `loading` ya arranca en `true` y la función asíncrona
  // está definida dentro del efecto para no ejecutar setState de forma
  // síncrona (react-hooks/set-state-in-effect).
  useEffect(() => {
    async function cargarInicial() {
      try {
        const res = await leerItems();
        if (hayError(res)) return;
        setItems(Array.isArray(res) ? res : []);
      } catch (err) {
        setError(err?.message || String(err));
        // No se vacía la lista para no perder datos válidos ya cargados.
      } finally {
        setLoading(false);
      }
    }
    cargarInicial();
  }, [leerItems, hayError]);

  // Recarga manual (evento de usuario): muestra el loading mientras llegan
  // los datos.
  const recargarItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await leerItems();
      if (hayError(res)) return;
      setItems(Array.isArray(res) ? res : []);
    } catch (err) {
      setError(err?.message || String(err));
      // No se vacía la lista para no perder datos válidos ya cargados.
      // console.error(err);
    } finally {
      setLoading(false);
    }
  }, [leerItems, hayError]);

  const agregar = async ({ nuevoItem }) => {
    const res = await itemsDB.agregar(nuevoItem);
    if (hayError(res)) return;
    showToast({ texto1: "Creado correctamente ✅" });
    recargarItems();
    router.replace("/");
    // return res;
  };
  const actualizar = async ({ nuevoDato }) => {
    const res = await itemsDB.actualizar(nuevoDato);
    if (hayError(res)) return;
    showToast({ texto1: "Actualizado correctamente ✅" });
    recargarItems();
    router.replace("/");
    // return res;
  };
  const actualizarParcial = async ({ id, campos }) => {
    const res = await itemsDB.actualizarParcial(id, campos);
    if (hayError(res)) return false;
    showToast({ texto1: "Actualizado correctamente ✅" });
    recargarItems();
    return true;
  };
  const obtenerItem = useCallback(
    async (id) => {
      const res = await itemsDB.obtenerPorId(id);
      if (hayError(res)) return;
      if (!res) return null;

      res.fechaCreacion = converToLocal(res.fechaCreacion);
      res.fechaModificacion = converToLocal(res.fechaModificacion);

      return res;
    },
    [itemsDB, hayError],
  );
  const eliminar = async (id) => {
    const res = await itemsDB.eliminar(Number(id));
    if (hayError(res)) return;
    showToast({ texto1: "Eliminado correctamente ✅" });
    recargarItems();
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

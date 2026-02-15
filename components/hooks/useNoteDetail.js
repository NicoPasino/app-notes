// Sin USO
// Sin USO
// Sin USO
// Sin USO
// Sin USO
// Sin USO
// Sin USO
// Sin USO
// Sin USO
// Sin USO

import { useEffect, useState } from "react";
import { router } from "expo-router";
import {
  createCard,
  getCardId,
  getCardIdLocal,
  updateCard,
  deleteCard,
} from "../../services/notesService";
import { showToast } from "../utils/toast";
import { defaultData } from "../utils/defaultData";

export function useNoteDetail(id) {
  const [isNew, setIsNew] = useState(false);
  const [note, setNote] = useState(null);
  const [newData, setNewData] = useState(defaultData);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (!id) return;
    if (id === "new") {
      setIsNew(true);
      setEditMode(true);
      return;
    }
    getCardId(id)
      .then((data) => {
        setNote(data);
        setNewData(data);
      })
      .catch(() => {
        setError({ mensaje: "Error al obtener ID (mostrando Local)." });
        const local = getCardIdLocal(id);
        setNote(local);
        setNewData(local);
      });
  }, [id]);

  const saveNote = async () => {
    const data = { ...note, ...newData };
    try {
      if (isNew) {
        const res = await createCard({ data }).then((r) => r.json());
        if (res.error || res.message)
          setError({ mensaje: res.error || res.message });
        else {
          showToast({ texto1: "Creado correctamente ✅" });
          router.replace("/");
        }
      } else {
        const res = await updateCard({ id, data }).then((r) => r.json());
        if (res.error || res.message)
          setError({ mensaje: res.error || res.message });
        else {
          showToast({ texto1: "Actualizado correctamente ✅" });
          router.replace("/");
        }
      }
    } catch (e) {
      setError({ mensaje: isNew ? "Error al crear." : "Error al actualizar." });
    } finally {
      setEditMode(false);
    }
  };

  const deleteNote = async () => {
    deleteCard({ id });
    showToast({ texto1: "Nota Eliminada ✅" });
    router.replace("/");
  };

  return {
    isNew,
    note,
    newData,
    setNewData,
    error,
    setError,
    editMode,
    setEditMode,
    saveNote,
    deleteNote,
  };
}

export default useNoteDetail;

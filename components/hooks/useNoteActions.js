import { useContext } from "react";
import { Alert, Platform } from "react-native";
import { router } from "expo-router";
import { DataContext } from "../../context/dataContext";

export function useNoteActions({
  id,
  note,
  newData,
  setNewData,
  setNote,
  isNew,
  setEditMode,
} = {}) {
  const { notasManager } = useContext(DataContext);
  const { agregar, actualizar, actualizarParcial, eliminar, obtenerItem } =
    notasManager;

  const currentNote = newData || note;
  const updateNoteState = setNewData || setNote;

  const refrescarNota = async () => {
    if (!id || id === "new") return null;
    const res = await obtenerItem(id, true);
    if (res && updateNoteState) updateNoteState(res);
    return res;
  };

  const favorito = async () => {
    if (!id || id === "new") return false;
    const ok = await actualizarParcial({
      id,
      campos: { favorito: !currentNote?.favorito, eliminado: false },
    });
    if (ok) await refrescarNota();
    return ok;
  };

  const archivar = async () => {
    if (!id || id === "new") return false;
    const ok = await actualizarParcial({
      id,
      campos: { archivado: !currentNote?.archivado, eliminado: false },
    });
    if (ok) router.replace("/");
    return ok;
  };

  const papelera = async () => {
    if (!id || id === "new") return false;
    const ok = await actualizarParcial({
      id,
      campos: {
        eliminado: !currentNote?.eliminado,
        archivado: false,
        favorito: false,
      },
    });
    if (ok) router.replace("/");
    return ok;
  };

  const eliminarPermanente = () => {
    if (!id || id === "new") return;
    const accion = () => eliminar(id);

    if (Platform.OS === "web") {
      if (
        global.confirm(
          "¿Seguro que quieres eliminar PERMANENTEMENTE la Nota? Esta acción no se puede deshacer.",
        )
      ) {
        accion();
      }
    } else {
      Alert.alert(
        "Eliminar permanentemente",
        "Esta acción no se puede deshacer. ¿Seguro que quieres eliminar la Nota?",
        [
          { text: "NO", style: "cancel" },
          { text: "SI, eliminar", style: "destructive", onPress: accion },
        ],
      );
    }
  };

  const enviarDatos = async () => {
    const itemToSave = {
      id: isNew ? undefined : (note?.id || id),
      header: currentNote?.header,
      text: currentNote?.text,
      color: currentNote?.color,
    };

    if (isNew) {
      await agregar({ nuevoItem: itemToSave });
    } else {
      const nuevoDato = { ...itemToSave, id };
      await actualizar({ nuevoDato });
    }
    if (setEditMode) setEditMode(false);
  };

  return {
    refrescarNota,
    favorito,
    archivar,
    papelera,
    eliminarPermanente,
    enviarDatos,
  };
}

export default useNoteActions;

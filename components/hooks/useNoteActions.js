import { useContext } from "react";
import { Alert, Platform, Share } from "react-native";
import { router } from "expo-router";
import * as Clipboard from "expo-clipboard";
import { File, Paths } from "expo-file-system";
import * as Sharing from "expo-sharing";
import { DataContext } from "../../context/dataContext";
import { showToast } from "../utils/toast";

function obtenerContenido(note) {
  const header = note?.header?.trim();
  const text = note?.text?.trim();
  return [header, text].filter(Boolean).join("\n\n");
}

function obtenerNombreArchivo(header) {
  const base = (header || "nota")
    .toString()
    .trim()
    .replace(/[\\/:*?"<>|]+/g, "-")
    .replace(/\s+/g, " ")
    .slice(0, 60)
    .trim();
  return `${base || "nota"}.txt`;
}

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
    const res = await obtenerItem(id);
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

  const compartir = async () => {
    const contenido = obtenerContenido(currentNote);

    if (!contenido) {
      showToast({ tipo: "info", texto1: "La nota está vacía" });
      return false;
    }

    const titulo = currentNote?.header?.trim() || "Nota";

    if (Platform.OS === "web") {
      const nav = typeof navigator !== "undefined" ? navigator : null;

      if (nav?.share) {
        try {
          await nav.share({ title: titulo, text: contenido });
          return true;
        } catch (e) {
          if (e?.name === "AbortError") return false;
        }
      }

      await Clipboard.setStringAsync(contenido);
      showToast({ texto1: "Nota copiada al portapapeles ✅" });
      return true;
    }

    try {
      await Share.share({ title: titulo, message: contenido });
      return true;
    } catch {
      showToast({ tipo: "error", texto1: "No se pudo compartir la nota" });
      return false;
    }
  };

  const guardar = async () => {
    const contenido = obtenerContenido(currentNote);

    if (!contenido) {
      showToast({ tipo: "info", texto1: "La nota está vacía" });
      return false;
    }

    const nombreArchivo = obtenerNombreArchivo(currentNote?.header);

    if (Platform.OS === "web") {
      try {
        const blob = new Blob([contenido], {
          type: "text/plain;charset=utf-8",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = nombreArchivo;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        showToast({ texto1: "Nota descargada ✅" });
        return true;
      } catch {
        showToast({ tipo: "error", texto1: "No se pudo guardar la nota" });
        return false;
      }
    }

    try {
      const disponible = await Sharing.isAvailableAsync();
      if (!disponible) {
        showToast({ tipo: "error", texto1: "El compartir no está disponible" });
        return false;
      }

      const archivo = new File(Paths.cache, nombreArchivo);
      archivo.create({ overwrite: true });
      archivo.write(contenido);

      await Sharing.shareAsync(archivo.uri, {
        mimeType: "text/plain",
        dialogTitle: "Guardar nota",
        UTI: "public.plain-text",
      });
      return true;
    } catch {
      showToast({ tipo: "error", texto1: "No se pudo guardar la nota" });
      return false;
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
    compartir,
    guardar,
    enviarDatos,
  };
}

export default useNoteActions;

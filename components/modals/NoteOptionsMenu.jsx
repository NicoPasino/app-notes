import { Alert, Modal, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { BoxArchiveIcon, DelIcon, FavoriteIcon } from "../Icons";
import { colores, colorType } from "../utils/colors";

export function NoteOptionsMenu({
  visible,
  onClose,
  id,
  note,
  onFavorito,
  onArchivar,
  onPapelera,
  onEliminar,
}) {
  function eliminarPermanente() {
    onClose();
    const accion = () => onEliminar(id);

    if (Platform.OS === "web") {
      if (global.confirm("¿Seguro que quieres eliminar PERMANENTEMENTE la Nota? Esta acción no se puede deshacer."))
        accion();
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
  }

  function opcion(fn) {
    return () => {
      onClose();
      fn();
    };
  }

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={onClose}
          accessibilityLabel="Cerrar menú"
        />
        <View style={styles.menu}>
          <Pressable style={styles.option} onPress={opcion(() => onFavorito(id))}>
            <FavoriteIcon isFav={note?.favorito} color={colorType.success} />
            <Text style={styles.optionText}>
              {note?.favorito ? "Quitar favorito" : "Favorito"}
            </Text>
          </Pressable>

          <Pressable style={styles.option} onPress={opcion(() => onArchivar(id))}>
            <BoxArchiveIcon color={colores.blanco} />
            <Text style={styles.optionText}>Archivar</Text>
          </Pressable>

          <Pressable style={styles.option} onPress={opcion(() => onPapelera(id))}>
            <DelIcon color={colorType.warning} />
            <Text style={styles.optionText}>Enviar a la papelera</Text>
          </Pressable>

          <Pressable style={styles.option} onPress={eliminarPermanente}>
            <DelIcon color={colorType.danger} />
            <Text style={[styles.optionText, { color: colorType.danger }]}>
              Eliminar permanentemente
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  menu: {
    position: "absolute",
    top: 64,
    right: 16,
    backgroundColor: "#141430",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#333",
    paddingVertical: 6,
    minWidth: 220,
    zIndex: 1000,
    elevation: 10,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  optionText: {
    color: "#f8f9fa",
    fontSize: 15,
  },
});
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { colores } from "../utils/colors";
import { opcionesFolder } from "./opciones";

export function VistaMenu({ visible, onClose, seleccionar, folder }) {
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
          {opcionesFolder.map((opcion) => {
            const activa = opcion.key === folder;
            const Icono = opcion.Icono;
            return (
              <Pressable
                key={opcion.key}
                style={styles.option}
                onPress={() => seleccionar(opcion.key)}
              >
                <Icono
                  size={20}
                  color={activa ? colores.turquesa2 : colores.blanco}
                />
                <View style={styles.optionTextCont}>
                  <Text
                    style={[
                      styles.optionText,
                      activa && styles.optionTextActiva,
                    ]}
                  >
                    {opcion.label}
                  </Text>
                  {/* <Text style={styles.optionDesc}>{opcion.descripcion}</Text> */}
                </View>
              </Pressable>
            );
          })}
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
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  optionTextCont: {
    gap: 2,
  },
  optionText: {
    color: "#f8f9fa",
    fontSize: 15,
    fontWeight: "bold",
  },
  optionTextActiva: {
    color: colores.turquesa2,
  },
  optionDesc: {
    color: "gray",
    fontSize: 12,
  },
});

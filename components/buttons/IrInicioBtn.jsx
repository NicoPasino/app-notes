import { Pressable, StyleSheet, Text } from "react-native";
import { colores } from "../utils/colors";

export function IrInicioBtn({ onPress, label = "Ir a inicio" }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.irInicioBtn,
        pressed && styles.irInicioBtnPressed,
      ]}
    >
      <Text style={styles.irInicioText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  irInicioBtn: {
    borderWidth: 1,
    borderColor: colores.turquesa,
    backgroundColor: "#51afb926",
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  irInicioBtnPressed: {
    backgroundColor: "#7dd3fd2e",
  },
  irInicioText: {
    color: colores.turquesa2,
    fontSize: 15,
    fontWeight: "bold",
  },
});

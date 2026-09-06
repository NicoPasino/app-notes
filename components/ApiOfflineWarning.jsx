import { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { DataContext } from "../context/dataContext";
import { colores, colorType } from "./utils/colors";

export function ApiOfflineWarning({ mensaje }) {
  const { toggleBackend, notasManager } = useContext(DataContext);
  const { recargar } = notasManager;

  return (
    <View style={styles.container}>
      <Svg width={100} height={100} viewBox="0 0 24 24" fill="none">
        {/* Nube (cloud-off) */}
        <Path
          d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10Z"
          stroke={colores.gris}
          strokeWidth={1.6}
          strokeLinejoin="round"
        />
        {/* Barra diagonal de "sin conexión" */}
        <Path
          d="M4 20 20 4"
          stroke={colorType.danger}
          strokeWidth={2}
          strokeLinecap="round"
        />
      </Svg>

      <Text style={styles.titulo}>Sin conexión con la API</Text>

      {mensaje ? <Text style={styles.mensaje}>{mensaje}</Text> : null}

      <Pressable
        onPress={() => recargar()}
        style={({ pressed }) => [styles.boton, pressed && styles.botonPressed]}
      >
        <Text style={styles.botonText}>Reintentar</Text>
      </Pressable>

      <Pressable
        onPress={toggleBackend}
        style={({ pressed }) => [styles.link, pressed && styles.linkPressed]}
      >
        <Text style={styles.linkText}>Activar modo offline (local)</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    padding: 24,
    paddingBottom: 90,
  },
  titulo: {
    color: "#f8f9fa",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  mensaje: {
    color: "gray",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 18,
    maxWidth: 420,
  },
  boton: {
    marginTop: 8,
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colores.turquesa,
    backgroundColor: "#51afb926",
  },
  botonPressed: {
    backgroundColor: "#51afb952",
  },
  botonText: {
    color: colores.turquesa2,
    fontSize: 15,
    fontWeight: "bold",
  },
  link: {
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  linkPressed: {
    opacity: 0.6,
  },
  linkText: {
    color: "#8a8aff",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
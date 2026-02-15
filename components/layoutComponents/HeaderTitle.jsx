import { router } from "expo-router";
import { Linking, Platform, Pressable, StyleSheet, Text } from "react-native";
import { DownloadIcon, AndroidIcon } from "../Icons";
import { downloadApk } from "../../services/notesService";
import { colores } from "../utils/colors";

export function HeaderTitle() {
  return (
    <>
      {Platform.OS === "web" ? (
        <Pressable
          onPress={() => Linking.openURL(downloadApk)}
          style={({ pressed, hovered }) => [
            { transform: [{ scale: hovered ? 1.02 : 1 }] },
            { flexDirection: "row" },
          ]}
        >
          <DownloadIcon color={colores.turquesa2} />
          <Text style={styles.Titulo}>Download Apk</Text>
          <AndroidIcon color={colores.turquesa2} />
        </Pressable>
      ) : (
        <Pressable onPress={() => router.replace("/")}>
          <Text style={[styles.Titulo, styles.textShadow100]}>NOTAS</Text>
        </Pressable>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  Titulo: {
    color: colores.turquesa2,
    fontWeight: "bold",
    fontSize: 23,
    textAlign: "center",
    fontFamily: "sans-serif",
    paddingInline: 15,
  },
  textShadow100: {
    color: colores.turquesa,
    textShadowColor: colores.turquesa2,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 15,
  },
});

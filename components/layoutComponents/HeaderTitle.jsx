import { router } from "expo-router";
import { Linking, Pressable, StyleSheet, Text } from "react-native";
import { DownloadIcon, AndroidIcon } from "../Icons";
import { downloadApk } from "../../services/notesService";
import { colores } from "../utils/colors";
import { __IsWeb__ } from "../../config";

export function HeaderTitle() {
  return __IsWeb__ ? <HeaderWeb /> : <HeaderAIOS />;
}

function HeaderWeb() {
  return (
    <Pressable
      onPress={() => Linking.openURL(downloadApk)}
      style={({ pressed, hovered }) => [
        { transform: [{ scale: hovered ? 1.02 : 1 }] },
        styles.downloadBtn,
      ]}
    >
      <DownloadIcon color={colores.turquesa2} />
      <Text style={styles.Titulo}>Download Apk</Text>
      <AndroidIcon color={colores.turquesa2} />
    </Pressable>
  );
}

function HeaderAIOS() {
  return (
    <Pressable onPress={() => router.replace("/")}>
      <Text style={[styles.Titulo, styles.textShadow100]}>NOTAS</Text>
    </Pressable>
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
  downloadBtn: {
    flexDirection: "row",
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "#51afb926",
    borderColor: colores.turquesa,
  },
});

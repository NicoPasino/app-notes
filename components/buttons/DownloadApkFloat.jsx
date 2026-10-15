import { useEffect, useState } from "react";
import { Animated, Easing, Linking, Pressable, StyleSheet, Text, View } from "react-native";

import { AndroidIcon, CancelIcon } from "../Icons";
import { colores } from "../utils/colors";
import { __IsWeb__, downloadApk } from "../../config";

// Botón flotante (solo web) para descargar el APK.
// La × lo oculta durante la sesión (sessionStorage), hasta cerrar/recargar la pestaña.
const HIDDEN_KEY = "apkFloatHidden";
const WINDOW = typeof window !== "undefined" ? window : null;

export function DownloadApkFloat() {
  const [hidden, setHidden] = useState(
    () => WINDOW?.sessionStorage?.getItem(HIDDEN_KEY) === "1"
  );
  const [shake] = useState(() => new Animated.Value(0));

  useEffect(() => {
    if (!__IsWeb__ || hidden) return;

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(shake, {
          toValue: 1,
          duration: 70,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(shake, {
          toValue: -1,
          duration: 70,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(shake, {
          toValue: 1,
          duration: 70,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(shake, {
          toValue: 0,
          duration: 70,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.delay(2500),
      ])
    );

    loop.start();
    return () => loop.stop();
  }, [shake, hidden]);

  if (!__IsWeb__ || hidden) return null;

  const rotate = shake.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ["-3deg", "0deg", "3deg"],
  });

  function ocultar() {
    try {
      WINDOW?.sessionStorage?.setItem(HIDDEN_KEY, "1");
    } catch {
      // sin almacenamiento disponible
    }
    setHidden(true);
  }

  return (
    <View style={styles.wrap} pointerEvents="box-none">
      <Animated.View style={[styles.pill, { transform: [{ rotate }] }]}>
        <Pressable
          onPress={() => Linking.openURL(downloadApk)}
          style={({ pressed, hovered }) => [
            styles.downloadBtn,
            { transform: [{ scale: hovered ? 1.03 : 1 }] },
            pressed && styles.downloadBtnPressed,
          ]}
          accessibilityLabel="Descargar APK para Android"
        >
          <AndroidIcon size={20} color={colores.turquesa2} />
          <Text style={styles.text}>Descargar APK</Text>
        </Pressable>

        <Pressable
          onPress={ocultar}
          style={styles.closeBtn}
          accessibilityLabel="Ocultar botón de descarga"
        >
          <CancelIcon size={12} color={colores.blanco} />
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: "absolute",
    left: 16,
    bottom: 80, // por encima de la barra de tabs
    alignItems: "flex-start",
  },
  pill: {
    position: "relative",
  },
  downloadBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    backgroundColor: "#51afb926",
    borderColor: colores.turquesa,
  },
  downloadBtnPressed: {
    backgroundColor: "#51afb952",
  },
  text: {
    color: colores.turquesa2,
    fontWeight: "bold",
    fontSize: 14,
  },
  closeBtn: {
    position: "absolute",
    top: -8,
    right: -8,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colores.turquesa,
    backgroundColor: "#00001d",
    alignItems: "center",
    justifyContent: "center",
  },
});

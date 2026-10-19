import { Pressable } from "react-native";
import { BackIcon, CancelIcon, ReloadIcon } from "../Icons";
import { colores, colorType } from "../utils/colors";
import { detailStyles as styles } from "../utils/detailStyles";
import { router } from "expo-router";

export function BackBtn() {
  return (
    <Pressable onPress={() => router.replace("/")} style={styles.iconBtn}>
      {({ pressed }) => (
        <BackIcon color={pressed ? colores.pressed : colorType.light} />
      )}
    </Pressable>
  );
}

export function CancelBtn({ accion }) {
  return (
    <Pressable onPress={() => accion()} style={styles.iconBtn}>
      {({ pressed }) => (
        <CancelIcon color={pressed ? colores.pressed : colorType.danger} />
      )}
    </Pressable>
  );
}

export function ReloadBtn({ accion }) {
  return (
    <Pressable onPress={() => accion()} style={styles.iconBtn}>
      {({ pressed }) => (
        <ReloadIcon color={pressed ? colores.pressed : colores.turquesa2} />
      )}
    </Pressable>
  );
}

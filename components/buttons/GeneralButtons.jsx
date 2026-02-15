import { Pressable } from "react-native";
import { BackIcon, CancelIcon } from "../Icons";
import { colores, colorType } from "../utils/colors";
import { router } from "expo-router";

export function BackBtn() {
  return (
    <Pressable onPress={() => router.replace("/")}>
      {({ pressed }) => (
        <BackIcon color={pressed ? colores.pressed : colorType.light} />
      )}
    </Pressable>
  );
}

export function CancelBtn({ accion }) {
  return (
    <Pressable onPress={() => accion()}>
      {({ pressed }) => (
        <CancelIcon color={pressed ? colores.pressed : colorType.danger} />
      )}
    </Pressable>
  );
}

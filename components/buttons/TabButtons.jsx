import { Pressable } from "react-native";
import { router } from "expo-router";
import { colores } from "../utils/colors";
import { CirclePlusIcon } from "../Icons";
import { __IsWeb__ } from "../../config";

function colorBtn(p, h) {
  if (__IsWeb__) return h ? colores.turquesa : colores.blanco;
  else return p ? colores.pressed : colores.turquesa;
}

export function AddBtn() {
  return (
    <Pressable
      style={({ hovered }) => [{ transform: [{ scale: hovered ? 1.1 : 1 }] }]}
      onPress={() => router.push(`/${"new"}`)}
    >
      {({ pressed, hovered }) => (
        <CirclePlusIcon size={55} color={colorBtn(pressed, hovered)} />
      )}
    </Pressable>
  );
}

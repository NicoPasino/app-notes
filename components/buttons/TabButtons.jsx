import { Pressable } from "react-native";
import { useContext } from "react";
import { colores } from "../utils/colors";
import { CirclePlusIcon } from "../Icons";
import { __IsWeb__ } from "../../config";
import { DataContext } from "../../context/dataContext";
import { irANuevaNota } from "../utils/irANuevaNota";

function colorBtn(p, h) {
  if (__IsWeb__) return h ? colores.turquesa : colores.blanco;
  else return p ? colores.pressed : colores.blanco;
}

export function AddBtn() {
  const { selectedColor } = useContext(DataContext);
  return (
    <Pressable
      style={({ hovered }) => [{ transform: [{ scale: hovered ? 1.1 : 1 }] }]}
      onPress={() => irANuevaNota(selectedColor)}
    >
      {({ pressed, hovered }) => (
        <CirclePlusIcon size={65} color={colorBtn(pressed, hovered)} />
      )}
    </Pressable>
  );
}

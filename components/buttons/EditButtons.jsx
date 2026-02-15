import { Pressable } from "react-native";
import { ConfirmIcon, DelIcon, EditIcon } from "../Icons";
import { colores, colorType } from "../utils/colors";
import styles from "../utils/detailStyles";
import confirmAlert from "../utils/ConfirmAlert";

export function ConfirmBtn({ accion }) {
  return (
    <Pressable style={{ marginRight: 30 }} onPress={() => accion()}>
      {({ pressed }) => (
        <ConfirmIcon color={pressed ? colores.pressed : colorType.success} />
      )}
    </Pressable>
  );
}

export function DeleteBtn({ accion }) {
  return (
    <Pressable
      onPress={() =>
        confirmAlert({
          accion: () => accion(),
          texto: "¿Seguro que quieres eliminar la Nota?",
        })
      }
    >
      {({ pressed }) => (
        <DelIcon color={pressed ? colores.pressed : colorType.danger} />
      )}
    </Pressable>
  );
}

export function EditBtn({ accion }) {
  return (
    <Pressable onPress={() => accion()}>
      {({ pressed }) => (
        <EditIcon color={pressed ? colores.pressed : colores.blanco} />
      )}
    </Pressable>
  );
}

export function SelectColorBtn({ accion, color }) {
  return (
    <Pressable
      style={[styles.squad, styles.selectorSquad, { backgroundColor: color }]}
      onPress={() => accion()}
    />
  );
}

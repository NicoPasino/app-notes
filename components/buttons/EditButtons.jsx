import { Pressable } from "react-native";
import {
  BoxArchiveIcon,
  ConfirmIcon,
  DelIcon,
  EditIcon,
  EllipsisIcon,
} from "../Icons";
import { colores, colorType } from "../utils/colors";
import styles from "../utils/detailStyles";
import confirmAlert from "../utils/ConfirmAlert";

export function ConfirmBtn({ accion }) {
  return (
    <Pressable onPress={() => accion()}>
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

export function ArchiveBtn({ accion }) {
  return (
    <Pressable
      onPress={() =>
        confirmAlert({
          accion: () => accion(),
          texto: "¿Seguro que quieres archivar la Nota?",
        })
      }
    >
      {({ pressed }) => (
        <BoxArchiveIcon color={pressed ? colores.pressed : colores.blanco} />
      )}
    </Pressable>
  );
}

export function DeactivateBtn({ accion }) {
  return (
    <Pressable
      onPress={() =>
        confirmAlert({
          accion: () => accion(),
          texto: "¿Seguro que quieres eliminar la Nota? \nSe enviará a la papelera.",
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

export function EllipsisBtn({ accion }) {
  return (
    <Pressable onPress={() => accion()} hitSlop={10} style={styles.ellipsisBtn}>
      {({ pressed }) => (
        <EllipsisIcon color={pressed ? colores.pressed : colores.blanco} />
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

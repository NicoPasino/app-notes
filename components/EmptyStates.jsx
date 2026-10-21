import { StyleSheet, Text, View } from "react-native";
import { IrInicioBtn } from "./buttons/IrInicioBtn";
import { CircleInfoIcon, NoteIcon, SearchIcon } from "./Icons";
import { colorTypeA, colores } from "./utils/colors";

function EmptyState({
  Icono,
  iconColor = colores.gris,
  colorTitulo = colores.pressed,
  titulo,
  children,
}) {
  return (
    <View style={styles.emptyCont}>
      <Icono size={44} color={iconColor} />
      <Text style={[styles.emptyTitle, { color: colorTitulo }]}>{titulo}</Text>
      {children}
    </View>
  );
}

export function SinResultados({ color }) {
  const colorActivo = (color && colorTypeA[color]) || colores.pressed;
  return (
    <EmptyState
      Icono={SearchIcon}
      iconColor={colorActivo}
      colorTitulo={colorActivo}
      titulo="Sin resultados"
    />
  );
}

export function EstadoVacio({ opcion, onIrInicio }) {
  return (
    <EmptyState
      Icono={opcion.Icono}
      titulo={`Sin ${opcion.descripcion.toLowerCase()}`}
    >
      <IrInicioBtn onPress={onIrInicio} />
    </EmptyState>
  );
}

export function NotaNoEncontrada({ onIrInicio }) {
  return (
    <EmptyState Icono={NoteIcon} titulo="Nota no encontrada">
      <IrInicioBtn onPress={onIrInicio} />
    </EmptyState>
  );
}

export function RutaNoEncontrada({ onIrInicio }) {
  return (
    <EmptyState Icono={CircleInfoIcon} titulo="Página no encontrada">
      <IrInicioBtn onPress={onIrInicio} />
    </EmptyState>
  );
}

const styles = StyleSheet.create({
  emptyCont: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 90,
    gap: 16,
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

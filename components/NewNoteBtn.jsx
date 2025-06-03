import { Pressable, StyleSheet, Text } from "react-native";
import { useRouter } from "expo-router";
import { colores } from "./utils/colors";

export function NewNoteBtn() {
  const router = useRouter();
  return (
    <Pressable
      style={({ pressed, hovered }) => [
        { borderColor: pressed ? colores.blanco : colores.turquesa },
        { transform: [{ scale: hovered ? 1.02 : 1 }] },
        styles.nuevaNota,
      ]}
      onPress={() => router.push(`/${"new"}`)}
    >
      {({ pressed }) => (
        <Text
          style={[
            styles.textShadow100,
            { color: pressed ? colores.blanco : colores.turquesa },
          ]}
        >
          + Nueva Nota
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  textShadow100: {
    textShadowColor: "#7dd3fd",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 15,
  },
  nuevaNota: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "#51afb926",
  },
});

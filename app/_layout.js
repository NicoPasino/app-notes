import { router, Stack } from "expo-router";
// import { Logo } from "../components/Logo";
import { Screen } from "../components/Screen";
import { Pressable, StyleSheet, Text } from "react-native";
import { NewNoteBtn } from "../components/NewNoteBtn";
// import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { colores } from "../components/utils/colors";

export default function Layout() {
  // const router = useRouter();

  return (
    <Screen>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#00001b" },
          // headerTintColor: "white",
          headerTitle: "",
          headerLeft: () => (
            <Pressable onPress={() => router.replace("/")}>
              <Text style={[styles.Titulo, styles.textShadow100]}>NOTAS</Text>
            </Pressable>
          ),
          headerRight: () => <NewNoteBtn />,
        }}
      />
      <Toast />
    </Screen>
  );
}

const styles = StyleSheet.create({
  Titulo: {
    color: colores.turquesa2,
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
    fontFamily: "sans-serif",
    letterSpacing: 3,
  },
  textShadow100: {
    color: colores.turquesa,
    textShadowColor: colores.turquesa2,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 15,
  },
});

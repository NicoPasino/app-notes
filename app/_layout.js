import { router, Stack } from "expo-router";
import { Screen } from "../components/Screen";
import { Linking, Platform, Pressable, StyleSheet, Text } from "react-native";
import { NewNoteBtn } from "../components/NewNoteBtn";
// import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { colores } from "../components/utils/colors";
import { NavIcon, DownloadIcon, AndroidIcon } from "../components/Icons";
import { downloadApk } from "../lib/notes";

export default function Layout() {
  return (
    <Screen>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#00001d" },
          // headerLeft: () => <NavIcon />,
          headerTitle: () => (
            <>
              {Platform.OS === "web" ? (
                <Pressable
                  onPress={() => Linking.openURL(downloadApk)}
                  style={{ flexDirection: "row" }}
                >
                  <DownloadIcon color={colores.turquesa2} />
                  <Text style={styles.Titulo}>Download Apk</Text>
                  <AndroidIcon color={colores.turquesa2} />
                </Pressable>
              ) : (
                <Pressable onPress={() => router.replace("/")}>
                  <Text style={[styles.Titulo, styles.textShadow100]}>
                    NOTAS
                  </Text>
                </Pressable>
              )}
            </>
          ),
          headerRight: () => <NewNoteBtn />,
          headerLeftContainerStyle: { paddingLeft: "10%" },
          headerRightContainerStyle: { paddingRight: "10%" },
          headerTitleAlign: "center",
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
    paddingInline: 15,
  },
  textShadow100: {
    color: colores.turquesa,
    textShadowColor: colores.turquesa2,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 15,
  },
});

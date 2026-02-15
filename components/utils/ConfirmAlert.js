import { router } from "expo-router";
import { Alert, Platform } from "react-native";
import { showToast } from "./toast";

export default function confirmAlert({ accion, texto }) {
  function ok() {
    accion();
    showToast({ texto1: "Listo ✅" });
    router.replace("/");
  }

  if (Platform.OS === "web") {
    if (!global.confirm(texto)) return;
    ok();
  } else {
    Alert.alert("Confirmación:", texto, [
      { text: "NO", style: "cancel" },
      {
        text: "SI",
        onPress: () => ok(),
      },
    ]);
  }
}

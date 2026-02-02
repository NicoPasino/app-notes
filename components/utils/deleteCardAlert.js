import { router } from "expo-router";
import { Alert, Platform } from "react-native";
import { deleteCard } from "../../services/notes";
import { showToast } from "./toast";

export const deleteCardAlert = {
  web(id) {
    if (
      !global.confirm(
        "Seguro que quieres borrar esta Nota? No podrás recuperarlo",
      )
    )
      return;
    deleteCard({ id });
    showToast({ texto1: "Nota Eliminada ✅" });
    router.replace("/");
  },

  otros(id) {
    Alert.alert(
      "Borrar Nota?",
      "Seguro que quieres borrar esta Nota? No podrás recuperarlo",
      [
        { text: "NO", style: "cancel" },
        {
          text: "SI",
          onPress: () => {
            deleteCard({ id });
            showToast({ texto1: "Nota Eliminada ✅" });
            router.replace("/");
          },
        },
      ],
    );
  },
};

export default deleteCardAlert;

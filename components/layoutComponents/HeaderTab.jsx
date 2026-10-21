import { router } from "expo-router";
import { useContext, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { FolderIcon } from "../Icons";
import { colores } from "../utils/colors";
import { DataContext } from "../../context/dataContext";
import { opcionesFolder, opcionesTab } from "./opciones";
import { VistaMenu } from "./modalSelectFolder";

export function HeaderTitle() {
  const { folder, tab } = useContext(DataContext);
  const opcionActual =
    opcionesFolder.find((o) => o.key === folder) ?? opcionesFolder[0];
  const tabActual = opcionesTab.find((o) => o.key === tab);

  return (
    <Text style={[styles.Titulo, styles.textShadow100]}>
      {tabActual ? tabActual.titulo : opcionActual.titulo}
    </Text>
  );
}

export function HeaderRight() {
  const { tab, folder, cambiarFolder } = useContext(DataContext);

  if (tab !== "index") return null;

  return <FolderButton folder={folder} onSelect={cambiarFolder} />;
}

function FolderButton({ folder, onSelect }) {
  const [menuVisible, setMenuVisible] = useState(false);

  function seleccionar(key) {
    onSelect(key);
    setMenuVisible(false);
    router.navigate("/");
  }

  return (
    <>
      <View style={styles.actions}>
        {/* Botón menú carpetas */}
        <Pressable
          onPress={() => setMenuVisible(true)}
          style={({ pressed }) => [
            styles.menuBtn,
            pressed && styles.menuBtnPressed,
          ]}
          accessibilityLabel="Abrir menú de carpetas"
        >
          <FolderIcon isOpen={menuVisible} color={colores.turquesa2} />
        </Pressable>
      </View>

      <VistaMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        seleccionar={seleccionar}
        folder={folder}
      />
    </>
  );
}

const styles = StyleSheet.create({
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  menuBtn: {
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colores.turquesa,
    backgroundColor: "#51afb926",
    alignItems: "center",
    justifyContent: "center",
  },
  menuBtnPressed: {
    backgroundColor: "#51afb952",
  },
  Titulo: {
    color: colores.turquesa2,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "sans-serif",
    paddingInline: 15,
  },
  textShadow100: {
    color: colores.turquesa,
    textShadowColor: colores.turquesa2,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 15,
    fontSize: 26,
  },
});

import { router } from "expo-router";
import { useContext, useState } from "react";
import { Linking, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { DownloadIcon, AndroidIcon, ListIcon, CloudIcon } from "../Icons";
import { downloadApk } from "../../services/notesService";
import { colores, colorType } from "../utils/colors";
import { __IsWeb__ } from "../../config";
import { DataContext } from "../../context/dataContext";

const opcionesVista = [
  { key: "notas", label: "Notas", titulo: "NOTAS", descripcion: "Todas las notas" },
  { key: "favoritos", label: "Favoritos", titulo: "FAVORITOS", descripcion: "Solo notas favoritas" },
  { key: "archivados", label: "Archivados", titulo: "ARCHIVADOS", descripcion: "Solo notas archivadas" },
  { key: "eliminados", label: "Papelera", titulo: "PAPELERA", descripcion: "Solo notas eliminadas" },
];

export function HeaderTitle() {
  const { vista } = useContext(DataContext);
  const opcionActual = opcionesVista.find((o) => o.key === vista) ?? opcionesVista[0];

  return __IsWeb__ ? <HeaderWeb /> : <HeaderAIOS titulo={opcionActual.titulo} />;
}

export function HeaderRight() {
  const { vista, setVista, backend, toggleBackend } = useContext(DataContext);
  const [menuVisible, setMenuVisible] = useState(false);

  function seleccionar(key) {
    setVista(key);
    setMenuVisible(false);
  }

  return (
    <>
      <View style={styles.actions}>
        <Pressable
          onPress={toggleBackend}
          style={({ pressed }) => [
            styles.menuBtn,
            backend === "api" && styles.cloudBtnActivo,
            pressed && styles.menuBtnPressed,
          ]}
          accessibilityLabel={
            backend === "api"
              ? "Usando la API remota. Tocar para usar el almacenamiento local"
              : "Usando el almacenamiento local. Tocar para usar la API remota"
          }
        >
          <CloudIcon size={24} color={backend === "api" ? colores.turquesa2 : colores.gris} />
        </Pressable>

        <Pressable
          onPress={() => setMenuVisible(true)}
          style={({ pressed }) => [styles.menuBtn, pressed && styles.menuBtnPressed]}
          accessibilityLabel="Abrir menú de filtros"
        >
          <ListIcon type={3} color={colores.turquesa2} />
        </Pressable>
      </View>

      <VistaMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        seleccionar={seleccionar}
        vista={vista}
      />
    </>
  );
}

function HeaderWeb() {
  return (
    <Pressable
      onPress={() => Linking.openURL(downloadApk)}
      style={({ pressed, hovered }) => [
        { transform: [{ scale: hovered ? 1.02 : 1 }] },
        styles.downloadBtn,
      ]}
    >
      <DownloadIcon color={colores.turquesa2} />
      <Text style={styles.Titulo}>Descargar Apk<br/>para Android</Text>
      <AndroidIcon color={colores.turquesa2} />
    </Pressable>
  );
}

function HeaderAIOS({ titulo }) {
  return (
    <Pressable onPress={() => router.replace("/")}>
      <Text style={[styles.Titulo, styles.textShadow100]}>{titulo}</Text>
    </Pressable>
  );
}

function VistaMenu({ visible, onClose, seleccionar, vista }) {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={onClose}
          accessibilityLabel="Cerrar menú"
        />
        <View style={styles.menu}>
          {opcionesVista.map((opcion) => {
            const activa = opcion.key === vista;
            return (
              <Pressable
                key={opcion.key}
                style={styles.option}
                onPress={() => seleccionar(opcion.key)}
              >
                <View style={[styles.dot, activa && styles.dotActivo]} />
                <View style={styles.optionTextCont}>
                  <Text style={styles.optionText}>{opcion.label}</Text>
                  <Text style={styles.optionDesc}>{opcion.descripcion}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>
    </Modal>
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
  cloudBtnActivo: {
    borderColor: colores.turquesa2,
    backgroundColor: "#7dd3fd2e",
  },
  menuBtnPressed: {
    backgroundColor: "#51afb952",
  },
  modalContainer: {
    flex: 1,
  },
  menu: {
    position: "absolute",
    top: 64,
    right: 16,
    backgroundColor: "#141430",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#333",
    paddingVertical: 6,
    minWidth: 220,
    zIndex: 1000,
    elevation: 10,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colorType.light,
  },
  dotActivo: {
    backgroundColor: colores.turquesa2,
    borderColor: colores.turquesa2,
  },
  optionTextCont: {
    gap: 2,
  },
  optionText: {
    color: "#f8f9fa",
    fontSize: 15,
    fontWeight: "bold",
  },
  optionDesc: {
    color: "gray",
    fontSize: 12,
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
  downloadBtn: {
    flexDirection: "row",
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "#51afb926",
    borderColor: colores.turquesa,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
});

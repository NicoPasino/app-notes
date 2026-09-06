import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { Card, NewCard } from "../../components/Card";
import { AlertDiv } from "../../components/modals/Modals";
import { LoadingBackground } from "../../components/Spinner";
import { ApiOfflineWarning } from "../../components/ApiOfflineWarning";
import { SearchFilter } from "../../components/SearchFilter";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/dataContext";
import { __IsWeb__ } from "../../config";
import { colores } from "../../components/utils/colors";
import { opcionesVista } from "../../components/layoutComponents/HeaderTitle";

function EstadoVacio({ opcion, onIrInicio }) {
  const Icono = opcion.Icono;
  return (
    <View style={styles.emptyCont}>
      <Icono size={44} color={colores.gris} />
      <Text style={styles.emptyTitle}>Sin notas en {opcion.label}</Text>
      <Pressable
        onPress={onIrInicio}
        style={({ pressed }) => [
          styles.irInicioBtn,
          pressed && styles.irInicioBtnPressed,
        ]}
      >
        <Text style={styles.irInicioText}>Ir a inicio</Text>
      </Pressable>
    </View>
  );
}

function Contenido({ itemsIndex, vista, onIrInicio }) {
  const [filteredItems, setFilteredItems] = useState([]);
  const opcionActual = opcionesVista.find((o) => o.key === vista) ?? opcionesVista[0];

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.scrollContent}
    >
      <SearchFilter notes={itemsIndex} onFilter={setFilteredItems} />
      {filteredItems.length > 0 ? (
        filteredItems.map((item) => <Card key={item.id} note={item} />)
      ) : vista === "notas" ? (
        <NewCard />
      ) : (
        <EstadoVacio opcion={opcionActual} onIrInicio={onIrInicio} />
      )}
    </ScrollView>
  );
}

export default function Main() {
  const { notasManager, vista, setVista, backend } = useContext(DataContext);
  const { items, error, loading, esErrorConexion } = notasManager;
  const [itemsIndex, setItemsIndex] = useState([]);

  useEffect(() => {
    let filtrados;
    switch (vista) {
      case "favoritos":
        filtrados = items.filter(
          (item) =>
            item.favorito === true &&
            item.eliminado !== true &&
            item.archivado !== true,
        );
        break;
      case "archivados":
        filtrados = items.filter(
          (item) => item.archivado === true && item.eliminado !== true,
        );
        break;
      case "eliminados":
        filtrados = items.filter((item) => item.eliminado === true);
        break;
      case "notas":
      default:
        filtrados = items.filter(
          (item) => item.eliminado !== true && item.archivado !== true,
        );
        break;
    }
    setItemsIndex(filtrados);
  }, [items, vista]);

  return (
    <View style={{ backgroundColor: "#0a0a23", flex: 1 }}>
      {loading ? (
        <LoadingBackground />
      ) : error ? (
        backend === "api" && esErrorConexion ? (
          <ApiOfflineWarning mensaje={error} />
        ) : (
          <AlertDiv mensaje={error} />
        )
      ) : (
        <Contenido
          itemsIndex={itemsIndex}
          vista={vista}
          onIrInicio={() => setVista("notas")}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
    paddingBottom: 150,
    marginTop: 0,
    margin: __IsWeb__ ? "auto" : 0,
    maxWidth: __IsWeb__ ? 832 : undefined,
    width: "100%",
  },
  emptyCont: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 90,
    gap: 16,
    paddingHorizontal: 24,
  },
  emptyTitle: {
    color: colores.gris,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  irInicioBtn: {
    borderWidth: 1,
    borderColor: colores.turquesa,
    backgroundColor: "#51afb926",
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  irInicioBtnPressed: {
    backgroundColor: "#7dd3fd2e",
  },
  irInicioText: {
    color: colores.turquesa2,
    fontSize: 15,
    fontWeight: "bold",
  },
});

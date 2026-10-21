import { View, ScrollView, StyleSheet } from "react-native";
import { Card, NewCard } from "../../components/Card";
import { AlertDiv } from "../../components/modals/Modals";
import { LoadingBackground } from "../../components/Spinner";
import { SearchFilter } from "../../components/SearchFilter";
import { useContext, useMemo } from "react";
import { DataContext } from "../../context/dataContext";
import { __IsWeb__ } from "../../config";
import { opcionesFolder } from "../../components/layoutComponents/opciones";
import { EstadoVacio, SinResultados } from "../../components/EmptyStates";

function Contenido({ itemsFolder, folder, onIrInicio }) {
  const { query, setQuery, selectedColor, setSelectedColor } =
    useContext(DataContext);
  const opcionActual =
    opcionesFolder.find((o) => o.key === folder) ?? opcionesFolder[0];

  const filteredItems = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q && !selectedColor) return itemsFolder;
    return itemsFolder.filter((note) => {
      const matchText =
        !q ||
        note.header?.toLowerCase().includes(q) ||
        (!note.locked && note.text?.toLowerCase().includes(q));
      const matchColor = !selectedColor || note.color === selectedColor;
      return matchText && matchColor;
    });
  }, [itemsFolder, query, selectedColor]);

  let contenido;
  if (itemsFolder.length === 0) {
    contenido =
      folder === "notas" ? (
        <NewCard />
      ) : (
        <EstadoVacio opcion={opcionActual} onIrInicio={onIrInicio} />
      );
  } else if (filteredItems.length === 0) {
    contenido = (
      <>
        {folder === "notas" && <NewCard color={selectedColor} />}
        <SinResultados />
      </>
    );
  } else {
    contenido = (
      <>
        {filteredItems.map((item) => (
          <Card key={item.id} note={item} />
        ))}
        {folder === "notas" && <NewCard color={selectedColor} />}
      </>
    );
  }

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.scrollContent}
    >
      <SearchFilter
        query={query}
        onQueryChange={setQuery}
        selectedColor={selectedColor}
        onColorChange={setSelectedColor}
      />
      {contenido}
    </ScrollView>
  );
}

export default function Main() {
  const { notasManager, folder, cambiarFolder } = useContext(DataContext);
  const { items, error, loading } = notasManager;

  const itemsFolder = useMemo(() => {
    switch (folder) {
      case "favoritos":
        return items.filter(
          (item) =>
            item.favorito === true &&
            item.eliminado !== true &&
            item.archivado !== true,
        );
      case "bloqueados":
        return items.filter(
          (item) =>
            item.locked === true &&
            item.eliminado !== true &&
            item.archivado !== true,
        );
      case "archivados":
        return items.filter(
          (item) => item.archivado === true && item.eliminado !== true,
        );
      case "eliminados":
        return items.filter((item) => item.eliminado === true);
      case "notas":
      default:
        return items.filter(
          (item) => item.eliminado !== true && item.archivado !== true,
        );
    }
  }, [items, folder]);

  return (
    <View style={{ backgroundColor: "#0a0a23", flex: 1 }}>
      {loading ? (
        <LoadingBackground />
      ) : error ? (
        <AlertDiv mensaje={error} />
      ) : (
        <Contenido
          itemsFolder={itemsFolder}
          folder={folder}
          onIrInicio={() => cambiarFolder("notas")}
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
});

import { View, ScrollView, StyleSheet } from "react-native";
import { Card, NewCard } from "../../components/Card";
import { AlertDiv } from "../../components/modals/Modals";
import { LoadingBackground } from "../../components/Spinner";
import { SearchFilter } from "../../components/SearchFilter";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/dataContext";
import { __IsWeb__ } from "../../config";

function Contenido({ itemsIndex }) {
  const [filteredItems, setFilteredItems] = useState([]);

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.scrollContent}
    >
      <SearchFilter notes={itemsIndex} onFilter={setFilteredItems} />
      {filteredItems.length > 0 ? (
        filteredItems.map((item) => <Card key={item.id} note={item} />)
      ) : (
        <NewCard />
      )}
    </ScrollView>
  );
}

export default function Main() {
  const { notasManager, vista } = useContext(DataContext);
  const { items, error, loading } = notasManager;
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
        <AlertDiv mensaje={error} />
      ) : (
        <Contenido itemsIndex={itemsIndex} />
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

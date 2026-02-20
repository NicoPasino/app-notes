import { View, FlatList, StyleSheet, Platform } from "react-native";
import { Card } from "../../components/Card";
import { AlertDiv } from "../../components/modals/Modals";
import { LoadingBackground } from "../../components/Spinner";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/dataContext";

export default function Main() {
  const { notasManager } = useContext(DataContext);
  const { items, error } = notasManager;
  const [itemsIndex, setItemsIndex] = useState();

  useEffect(() => {
    setItemsIndex(items);
  }, [items, setItemsIndex]);

  function Contenido() {
    return (!itemsIndex || itemsIndex.length === 0) && !error ? (
      <LoadingBackground />
    ) : (
      <FlatList
        style={{ paddingBottom: 150 }}
        data={itemsIndex}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Card note={item} />}
        contentContainerStyle={styles.flatContainer}
      />
    );
  }

  return (
    <View style={{ backgroundColor: "#0a0a23", flex: 1, minHeight: "100vh" }}>
      {error && <AlertDiv mensaje={error} />}
      {<Contenido />}
    </View>
  );
}

const styles = StyleSheet.create({
  flatContainer: {
    padding: 16,
    margin: Platform.OS === "web" ? "auto" : 0,
  },
});

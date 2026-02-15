import { View, FlatList, StyleSheet, Platform } from "react-native";
import { notasAPI } from "../../services/notesService";
import { Card } from "../../components/Card";
import { AlertDiv } from "../../components/modals/Modals";
import { useItems } from "../../components/hooks/useItems";
import { LoadingBackground } from "../../components/Spinner";

export default function Main() {
  const { items, error } = useItems({ itemsDB: notasAPI });

  function Contenido() {
    return items.length === 0 && !error ? (
      <LoadingBackground />
    ) : (
      <FlatList
        style={{ paddingBottom: 150 }}
        data={items}
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

import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { colorType } from "./utils/colors";
import { useContext } from "react";
import { DataContext } from "../context/dataContext";

const colorKeys = Object.keys(colorType);

export function SearchFilter({
  query,
  onQueryChange,
  selectedColor,
  onColorChange,
}) {
  const { vista } = useContext(DataContext);

  return (
    <View style={styles.container}>
      {/* Buscador */}
      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          placeholder={`Buscar en ${vista}...`}
          placeholderTextColor="#555"
          value={query}
          onChangeText={onQueryChange}
        />
        {query.length > 0 && (
          <Pressable onPress={() => onQueryChange("")} style={styles.clearBtn}>
            <Text style={styles.clearText}>×</Text>
          </Pressable>
        )}
      </View>

      {/* Filtrar por color */}
      <View style={styles.colorsRow}>
        <Pressable
          onPress={() => onColorChange(null)}
          style={[
            styles.colorDot,
            styles.colorAll,
            !selectedColor && styles.colorActive,
          ]}
        >
          <Text style={styles.colorAllText}>Todas</Text>
        </Pressable>

        {colorKeys.map((key) => (
          <Pressable
            key={key}
            onPress={() => onColorChange(selectedColor === key ? null : key)}
            style={[
              styles.colorDot,
              { backgroundColor: colorType[key] },
              selectedColor === key && styles.colorActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 800,
    marginHorizontal: "auto",
    paddingVertical: 8,
    marginBottom: 12,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#112",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#333",
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    height: 44,
    color: "#f8f9fa",
    fontSize: 15,
    outlineStyle: "none",
  },
  clearBtn: {
    marginBottom: 4,
  },
  clearText: {
    color: "#888",
    fontSize: 25,
    fontWeight: "bold",
    margin: 0,
    padding: 0,
  },
  colorsRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    gap: 8,
    marginTop: 10,
    flexWrap: "wrap",
  },
  colorDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "transparent",
  },
  colorAll: {
    width: "auto",
    height: "auto",
    marginRight: 8,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: "#1a1a3a",
  },
  colorAllText: {
    color: "#aaa",
    fontSize: 12,
  },
  colorActive: {
    borderColor: "#f8f9fa",
    transform: [{ scale: 1.2 }],
  },
});

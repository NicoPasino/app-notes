import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { Card, NewCard } from "../../components/Card";
import { AlertDiv } from "../../components/modals/Modals";
import { LoadingBackground } from "../../components/Spinner";
import { SearchFilter } from "../../components/SearchFilter";
import { useContext, useMemo, useState } from "react";
import { DataContext } from "../../context/dataContext";
import { __IsWeb__ } from "../../config";
import { colores } from "../../components/utils/colors";
import { opcionesVista } from "../../components/layoutComponents/HeaderTitle";
import { SearchIcon } from "../../components/Icons";
import { irANuevaNota } from "../../components/utils/irANuevaNota";

function EstadoVacio({ opcion, onIrInicio }) {
  const Icono = opcion.Icono;
  return (
    <View style={styles.emptyCont}>
      <Icono size={44} color={colores.gris} />
      <Text style={styles.emptyTitle}>
        Sin {opcion.descripcion.toLowerCase()}
      </Text>
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

function SinResultados() {
  return (
    <View style={styles.emptyCont}>
      <SearchIcon size={44} color={colores.pressed} />
      <Text style={styles.emptyTitle}>Sin resultados</Text>
    </View>
  );
}

function Contenido({ itemsIndex, vista, onIrInicio }) {
  const [query, setQuery] = useState("");
  const { selectedColor, setSelectedColor } = useContext(DataContext);
  const opcionActual =
    opcionesVista.find((o) => o.key === vista) ?? opcionesVista[0];

  const hayFiltro = query.trim().length > 0 || selectedColor !== null;

  const filteredItems = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q && !selectedColor) return itemsIndex;
    return itemsIndex.filter((note) => {
      const matchText =
        !q ||
        note.header?.toLowerCase().includes(q) ||
        note.text?.toLowerCase().includes(q);
      const matchColor = !selectedColor || note.color === selectedColor;
      return matchText && matchColor;
    });
  }, [itemsIndex, query, selectedColor]);

  function limpiarFiltros() {
    setQuery("");
    setSelectedColor(null);
  }

  let contenido;
  if (filteredItems.length > 0) {
    contenido = (
      <>
        {filteredItems.map((item) => (
          <Card key={item.id} note={item} />
        ))}
        {vista === "notas" && <NewCard color={selectedColor} />}
      </>
    );
  } else if (hayFiltro) {
    contenido = (
      <>
        {vista === "notas" && <NewCard color={selectedColor} />}
        <SinResultados
          onLimpiar={limpiarFiltros}
          onNuevaNota={() => irANuevaNota(selectedColor)}
        />
      </>
    );
  } else if (vista === "notas") {
    contenido = <NewCard />;
  } else {
    contenido = <EstadoVacio opcion={opcionActual} onIrInicio={onIrInicio} />;
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
  const { notasManager, vista, setVista } = useContext(DataContext);
  const { items, error, loading } = notasManager;

  const itemsIndex = useMemo(() => {
    switch (vista) {
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
  }, [items, vista]);

  return (
    <View style={{ backgroundColor: "#0a0a23", flex: 1 }}>
      {loading ? (
        <LoadingBackground />
      ) : error ? (
        <AlertDiv mensaje={error} />
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
    color: colores.pressed,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  emptyDesc: {
    color: colores.gris,
    fontSize: 14,
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

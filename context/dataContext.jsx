import { createContext, useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "expo-router";
import { useItems } from "../components/hooks/useItems";
import { notasLocalAPI } from "../services/localNotesService";
import { opcionesTab } from "../components/layoutComponents/opciones";

// 1. Crear contexto
export const DataContext = createContext();

// 2. Crear proveedor
export function DataProvider({ children }) {
  const notasManager = useItems({ itemsDB: notasLocalAPI });
  const [folder, setFolder] = useState("notas");
  const [selectedColor, setSelectedColor] = useState(null);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("index");
  const pathname = usePathname();
  const tabAnterior = useRef("index");

  const limpiarFiltros = useCallback(() => {
    setQuery("");
    setSelectedColor(null);
  }, []);

  const cambiarFolder = useCallback(
    (key) => {
      setFolder(key);
      limpiarFiltros();
    },
    [limpiarFiltros],
  );

  useEffect(() => {
    const nuevoTab = pathname === "/" ? "index" : pathname.slice(1);
    const esTab =
      nuevoTab === "index" || opcionesTab.some((o) => o.key === nuevoTab);
    if (!esTab || nuevoTab === tabAnterior.current) return;
    tabAnterior.current = nuevoTab;
    setTab(nuevoTab);
    limpiarFiltros();
  }, [pathname, limpiarFiltros]);

  return (
    <DataContext.Provider
      value={{
        notasManager,
        folder,
        cambiarFolder,
        tab,
        query,
        setQuery,
        selectedColor,
        setSelectedColor,
        limpiarFiltros,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

// Usar proveedor
/* 
  <Proveedor>
    <App />
  </Proveedor>,
*/

// 3. Usar contexto
// const [productos] = useContext(DataContext);
// const { folder, cambiarFolder } = useContext(DataContext);

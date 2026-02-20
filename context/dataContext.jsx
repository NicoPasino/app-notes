import { createContext } from "react";
import { useItems } from "../components/hooks/useItems";
import { notasAPI } from "../services/notesService";

// 1. Crear contexto
export const DataContext = createContext();

// 2. Crear proveedor
export function DataProvider({ children }) {
  const notasManager = useItems({ itemsDB: notasAPI });

  return (
    <DataContext.Provider value={{ notasManager }}>
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

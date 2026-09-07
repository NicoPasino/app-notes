import { createContext, useState } from "react";
import { useItems } from "../components/hooks/useItems";
import { notasLocalAPI } from "../services/localNotesService";

// 1. Crear contexto
export const DataContext = createContext();

// 2. Crear proveedor
export function DataProvider({ children }) {
  const notasManager = useItems({ itemsDB: notasLocalAPI });
  const [vista, setVista] = useState("notas");

  return (
    <DataContext.Provider
      value={{ notasManager, vista, setVista }}
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
// const { vista, setVista } = useContext(DataContext);

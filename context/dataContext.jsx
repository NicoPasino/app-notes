import { createContext, useState } from "react";
import { useItems } from "../components/hooks/useItems";
import { notasAPI } from "../services/notesService";
import { notasLocalAPI } from "../services/localNotesService";
import { USE_LOCAL_DB } from "../config";

// 1. Crear contexto
export const DataContext = createContext();

// 2. Crear proveedor
export function DataProvider({ children }) {
  // El valor del .env es solo el backend inicial; se puede cambiar en runtime.
  const [backend, setBackend] = useState(USE_LOCAL_DB ? "local" : "api");
  const itemsDB = backend === "local" ? notasLocalAPI : notasAPI;
  const notasManager = useItems({ itemsDB });
  const [vista, setVista] = useState("notas");

  const toggleBackend = () =>
    setBackend((prev) => (prev === "local" ? "api" : "local"));

  return (
    <DataContext.Provider
      value={{ notasManager, vista, setVista, backend, toggleBackend }}
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

import { useLocalSearchParams, router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { AlertDiv } from "../components/modals/Modals";
import { Screen } from "../components/Screen";
import { LoadingBackground } from "../components/Spinner";
import { TextoCont } from "../components/idComponents/contInput";
import { Header } from "../components/idComponents/header";
import { DataContext } from "../context/dataContext";

export default function Detail() {
  const { id: idParam } = useLocalSearchParams(); // obtener parametros
  const id = Array.isArray(idParam) ? idParam[0] : idParam;
  const [isNew, setIsNew] = useState(false);
  const [note, setnote] = useState(null);
  const [newData, setNewData] = useState(defaultData);
  const [editMode, setEditMode] = useState(false);
  const [localError, setLocalError] = useState("");
  const { notasManager } = useContext(DataContext);
  const { obtenerItem, setError } = notasManager;

  useEffect(() => {
    if (!id) return;

    if (id === "new") {
      setIsNew(true);
      setEditMode(true);
      return;
    }

    setError(""); // limpiar error compartido de la lista
    setLocalError("");
    setnote(null);
    setIsNew(false);
    setEditMode(false);

    async function fetchData() {
      let res;
      try {
        res = await obtenerItem(id);
      } catch (_err) {
        setError("");
        setLocalError("Nota no encontrada");
        return;
      }
      setError(""); // quitar el 404 que hayError dejó en el estado compartido
      if (res) {
        setnote(res);
        setNewData(res);
      } else {
        setLocalError("Nota no encontrada");
      }
    }
    fetchData();
  }, [id]);

  return (
    <Screen>
      {!note && !localError && !isNew ? (
        <LoadingBackground />
      ) : (
        <ContenidoDetail
          modoEdit={{ editMode, setEditMode, isNew }}
          data={{ newData, setNewData, note, id }}
          notasManager={notasManager}
          error={localError}
          setError={setLocalError}
        />
      )}
    </Screen>
  );
}

function ContenidoDetail({ modoEdit, data, notasManager, error, setError }) {
  const { mensaje, setMensaje } = notasManager;
  const { editMode, setEditMode, isNew } = modoEdit;
  const { newData, setNewData, note, id } = data;

  const handleVolverOnError = () => { setError(""); router.replace("/") };

  if (error) return <AlertDiv mensaje={error} link={{ onPress: () => handleVolverOnError(), label: "Volver a Inicio" }} />;
  return (
    <>
      {mensaje && (
        <AlertDiv tipo="otro" mensaje={mensaje} setError={setMensaje} />
      )}
      <Header
        edit={{ editMode, setEditMode, isNew }}
        data={{ newData, setNewData, note, id }}
      />
      <View style={{ flex: 1 }}>
        <TextoCont data={{ newData, setNewData }} editMode={editMode} isNew={isNew} />
      </View>
    </>
  );
}

const defaultData = {
  header: "",
  text: "",
  name: "New",
  color: "info",
};
import { useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { defaultData } from "../components/utils/defaultData";
import { AlertDiv } from "../components/modals/Modals";
import { Screen } from "../components/Screen";
import { LoadingBackground } from "../components/Spinner";
import { TextoCont } from "../components/idComponents/contInput";
import { Header } from "../components/idComponents/header";
import { DataContext } from "../context/dataContext";

export default function Detail() {
  const { id } = useLocalSearchParams(); // obtener parametros
  const [isNew, setIsNew] = useState(false);
  const [note, setnote] = useState(null);
  const [newData, setNewData] = useState(defaultData);
  const [editMode, setEditMode] = useState(false);
  const { notasManager } = useContext(DataContext);
  const { obtenerItem, error } = notasManager;

  useEffect(() => {
    if (id) {
      if (id === "new") {
        setIsNew(true);
        setEditMode(true);
        return;
      }

      async function fetchData() {
        let res = await obtenerItem(id);
        setnote(res);
        setNewData(res);
      }
      fetchData();
    }
  }, [id]);

  return (
    <Screen>
      {!note && !error && !isNew ? (
        <LoadingBackground />
      ) : (
        <ContenidoDetail
          modoEdit={{ editMode, setEditMode, isNew }}
          data={{ newData, setNewData, note, id }}
          notasManager={notasManager}
        />
      )}
    </Screen>
  );
}

function ContenidoDetail({ modoEdit, data, notasManager }) {
  const { error, mensaje, setMensaje } = notasManager;
  const { editMode, setEditMode, isNew } = modoEdit;
  const { newData, setNewData, note, id } = data;

  if (error) return <AlertDiv mensaje={error} />;
  return (
    <>
      {mensaje && (
        <AlertDiv tipo="otro" mensaje={mensaje} setError={setMensaje} />
      )}
      <Header
        edit={{ editMode, setEditMode, isNew }}
        data={{ newData, setNewData, note, id }}
        manageDB={notasManager}
      />
      <View>
        <TextoCont data={{ newData, setNewData }} editMode={editMode} />
      </View>
    </>
  );
}

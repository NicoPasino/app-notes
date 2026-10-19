import { useLocalSearchParams, router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AlertDiv } from "../components/modals/Modals";
import { NotaNoEncontrada } from "../components/EmptyStates";
import { Screen } from "../components/Screen";
import { LoadingBackground } from "../components/Spinner";
import { TextoCont } from "../components/idComponents/contInput";
import { Header } from "../components/idComponents/header";
import { LockIcon } from "../components/Icons";
import { PinModal } from "../components/modals/PinModal";
import { useNoteActions } from "../components/hooks/useNoteActions";
import { colores, colorType } from "../components/utils/colors";
import { DataContext } from "../context/dataContext";

export default function Detail() {
  const params = useLocalSearchParams();
  const idParam = params.id;
  const id = Array.isArray(idParam) ? idParam[0] : idParam;
  const colorParam = Array.isArray(params.color)
    ? params.color[0]
    : params.color;
  const { notasManager } = useContext(DataContext);

  // key={id} reinicia el estado local al navegar entre notas, sin
  // resetearlo con setState dentro de un efecto. Para notas nuevas se
  // incluye el color inicial (filtro activo) para que también reinicie.
  const key = id === "new" && colorParam ? `${id}-${colorParam}` : id;
  return (
    <DetalleContenido
      key={key}
      id={id}
      colorInicial={colorParam}
      notasManager={notasManager}
    />
  );
}

function DetalleContenido({ id, colorInicial, notasManager }) {
  const { obtenerItem, setError } = notasManager;
  const isNew = id === "new";
  const [note, setnote] = useState(null);
  const [newData, setNewData] = useState(() => ({
    ...defaultData,
    color:
      colorInicial && colorType[colorInicial]
        ? colorInicial
        : defaultData.color,
  }));
  const [editMode, setEditMode] = useState(isNew);
  const [unlocked, setUnlocked] = useState(false);
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    if (!id) return;

    // setError es el setter del estado global (contexto), no de este
    // componente; se limpia para no heredar errores de otra pantalla.
    setError("");

    if (isNew) return;

    async function fetchData() {
      let res;
      try {
        res = await obtenerItem(id);
      } catch (_err) {
        setError("");
        setLocalError("Nota no encontrada");
        return;
      }
      setError("");
      if (res) {
        setnote(res);
        setNewData(res);
      } else {
        setLocalError("Nota no encontrada");
      }
    }
    fetchData();
  }, [id, isNew, obtenerItem, setError]);

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
          locked={!!newData?.locked && !unlocked}
          viewable={!newData?.locked || unlocked}
          onUnlocked={() => setUnlocked(true)}
        />
      )}
    </Screen>
  );
}

function ContenidoDetail({
  modoEdit,
  data,
  notasManager,
  error,
  setError,
  locked,
  viewable,
  onUnlocked,
}) {
  const { mensaje, setMensaje } = notasManager;
  const { editMode, setEditMode, isNew } = modoEdit;
  const { newData, setNewData, note, id } = data;

  const handleVolverOnError = () => {
    setError("");
    router.replace("/");
  };

  if (error)
    return <NotaNoEncontrada onIrInicio={() => handleVolverOnError()} />;
  return (
    <>
      {mensaje && (
        <AlertDiv tipo="otro" mensaje={mensaje} setError={setMensaje} />
      )}
      <Header
        edit={{ editMode, setEditMode, isNew }}
        data={{ newData, setNewData, note, id }}
        locked={locked}
        viewable={viewable}
      />
      <View style={{ flex: 1 }}>
        {locked ? (
          <LockedNote
            note={note}
            setNewData={setNewData}
            onUnlocked={onUnlocked}
          />
        ) : (
          <TextoCont
            data={{ newData, setNewData }}
            editMode={editMode}
            isNew={isNew}
          />
        )}
      </View>
    </>
  );
}

function LockedNote({ note, setNewData, onUnlocked }) {
  const { verificarPin } = useNoteActions({ note, setNote: setNewData });

  return (
    <View style={styles.lockedCont}>
      <LockIcon size={56} color={colores.turquesa2} />
      <Text style={styles.lockedTitle}>Nota bloqueada</Text>
      <Text style={styles.lockedText}>
        Ingresá el PIN para ver/editar la nota. Si salís y volvés, se pedirá de
        nuevo.
      </Text>
      <PinModal
        visible
        mode="enter"
        title="Nota bloqueada"
        description="Ingresá el PIN para ver la nota."
        onClose={() => router.replace("/")}
        onSuccess={onUnlocked}
        onSubmit={(pin) => verificarPin(pin)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  lockedCont: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    padding: 24,
  },
  lockedTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  lockedText: {
    color: colores.gris,
    fontSize: 15,
    textAlign: "center",
  },
});

const defaultData = {
  header: "",
  text: "",
  name: "New",
  color: "info",
};

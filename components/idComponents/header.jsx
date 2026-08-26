import { useContext, useState } from "react";
import { router, Stack } from "expo-router";
import { View } from "react-native";

import {
  ConfirmBtn,
  DeleteBtn,
  EditBtn,
  SelectColorBtn,
} from "../buttons/EditButtons";
import { BackBtn, CancelBtn } from "../buttons/GeneralButtons";
import { colores, colorType } from "../utils/colors";
import detailStyles from "../utils/detailStyles";
import { TituloCont } from "../idComponents/contInput";
import { ModalColorView } from "../modals/ModalColorView";
import { __IsWeb__ } from "../../config";
import { DataContext } from "../../context/dataContext";

export function Header({ edit, data }) {
  const { editMode, setEditMode, isNew } = edit;
  const { newData, setNewData, note, id } = data;

  const { notasManager } = useContext(DataContext);
  const { agregar, actualizar, eliminar } = notasManager;
  const [modalColorVisible, setModalColorVisible] = useState(false);
  const newColor = newData ? colorType[newData?.color] : colorType.light;

  // TODO: Refactorizar - Exportar
  async function enviarDatos() {
    const nuevoItem = { ...note, ...newData };

    if (isNew) {
      await agregar({ nuevoItem });
    } else {
      const nuevoDato = { ...nuevoItem, id };
      await actualizar({ nuevoDato });
    }
    setEditMode(false);
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#000033" },
          headerTintColor: colores.blanco,
          headerBackVisible: !editMode,
          headerLeft: () => {
            if (editMode) return <ConfirmBtn accion={enviarDatos} />;
            if (__IsWeb__) return <BackBtn />;
            return null;
          },
          headerTitle: () => (
            <TituloCont
              header={newData?.header}
              color={newData?.color}
              editMode={editMode}
              handleHeaderChange={(header) =>
                setNewData((prev) => ({ ...prev, header }))
              }
            />
          ),
          headerRight: () => {
            if (editMode) return (
              <View style={detailStyles.wrap}>
                <SelectColorBtn
                  accion={() => setModalColorVisible(true)}
                  color={newColor}
                />
                <CancelBtn
                  accion={() => {
                    setEditMode(false);
                    if (isNew) return router.replace("/");
                    setNewData(note);
                  }}
                />
              </View>
            );
            return (
              <View style={detailStyles.wrap}>
                <EditBtn accion={() => setEditMode(true)} />
                <DeleteBtn accion={() => eliminar(id)} />
              </View>
            );
          },
        }}
      />

      <ModalColorView
        modal={{ modalColorVisible, setModalColorVisible }}
        data={{ newData, setNewData }}
      />
    </>
  );
}

// Notes: 
// - No crear componentes de inputs para el Header, ya que se vuelve a renderizar en cada cambio del input.
// - 
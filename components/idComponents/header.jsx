import { useState } from "react";
import { router, Stack } from "expo-router";
import { Platform, View } from "react-native";

import {
  ConfirmBtn,
  DeleteBtn,
  EditBtn,
  SelectColorBtn,
} from "../buttons/EditButtons";
import { BackBtn, CancelBtn } from "../buttons/GeneralButtons";
import { colores, colorType } from "../utils/colors";
import { TituloCont } from "../idComponents/contInput";
import detailStyles from "../utils/detailStyles";
import { ModalColorView } from "../modals/ModalColorView";
import showToast from "../utils/toast";

export function Header({ edit, data, manageDB }) {
  const { editMode, setEditMode, isNew } = edit;
  const { newData, setNewData, note, id } = data;
  const { agregar, actualizar, eliminar } = manageDB;

  const [modalColorVisible, setModalColorVisible] = useState(false);
  const newColor = newData ? colorType[newData?.color] : colorType.light;

  async function enviarDatos() {
    const nuevoItem = { ...note, ...newData };

    if (isNew) {
      // Crear
      const res = await agregar({ nuevoItem });
      if (res) {
        showToast({ texto1: "Creado correctamente ✅" });
        router.replace("/");
      }
    } else {
      // Actualizar
      const nuevoDato = { ...nuevoItem, id };
      let res = await actualizar({ nuevoDato });
      if (res) {
        showToast({ texto1: "Actualizado correctamente ✅" });
        router.replace("/");
      }
    }
    setEditMode(false);
  }

  async function enviarDelete(id) {
    const res = await eliminar(id);
    if (res) {
      showToast({ texto1: "Eliminado correctamente ✅" });
      router.replace("/");
    }
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#000033" },
          headerTintColor: colores.blanco,
          headerBackVisible: !editMode,
          headerLeft: () => (
            <View>
              {editMode ? (
                <ConfirmBtn accion={enviarDatos} />
              ) : (
                Platform.OS === "web" && <BackBtn />
              )}
            </View>
          ),
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
          headerRight: () => (
            <View>
              {editMode ? (
                // (Editing)
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
              ) : (
                // (Reading)
                <View style={detailStyles.wrap}>
                  <EditBtn accion={() => setEditMode(true)} />
                  <DeleteBtn accion={() => enviarDelete(id)} />
                </View>
              )}
            </View>
          ),
        }}
      />

      <ModalColorView
        modal={{ modalColorVisible, setModalColorVisible }}
        data={{ newData, setNewData }}
      />
    </>
  );
}

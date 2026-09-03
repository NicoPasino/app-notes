import { useState } from "react";
import { router, Stack } from "expo-router";
import { View } from "react-native";

import {
  ConfirmBtn,
  EditBtn,
  EllipsisBtn,
  SelectColorBtn,
} from "../buttons/EditButtons";
import { BackBtn, CancelBtn } from "../buttons/GeneralButtons";
import { colores, colorType } from "../utils/colors";
import detailStyles from "../utils/detailStyles";
import { TituloCont } from "../idComponents/contInput";
import { ModalColorView } from "../modals/ModalColorView";
import { NoteOptionsMenu, useNoteActions } from "../modals/NoteOptionsMenu";
import { __IsWeb__ } from "../../config";

export function Header({ edit, data }) {
  const { editMode, setEditMode, isNew } = edit;
  const { newData, setNewData, note, id } = data;

  const [modalColorVisible, setModalColorVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const newColor = newData ? colorType[newData?.color] : colorType.light;

  const { enviarDatos } = useNoteActions({
    id,
    note,
    newData,
    setNewData,
    isNew,
    setEditMode,
  });

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
                {!newData?.eliminado && !newData?.archivado && <EditBtn accion={() => setEditMode(true)} />}
                <EllipsisBtn accion={() => setMenuVisible((v) => !v)} />
                <NoteOptionsMenu
                  visible={menuVisible}
                  onClose={() => setMenuVisible(false)}
                  id={id}
                  note={newData}
                  onUpdate={setNewData}
                />
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
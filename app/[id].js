import { defaultData } from "../components/utils/defaultData";
import { deleteCardAlert } from "../components/utils/deleteCardAlert";
import { showToast } from "../components/utils/toast";
import { detailStyles as styles } from "../components/utils/detailStyles";

import { AlertDiv } from "../components/utils/Modals";

import { router, Stack, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Button,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useEffect, useState } from "react";

import {
  createCard,
  getCardId,
  getCardIdLocal,
  updateCard,
} from "../services/notes";
import { Screen } from "../components/Screen";
import { colores, colorType } from "../components/utils/colors";
import {
  BackIcon,
  CancelIcon,
  ConfirmIcon,
  DelIcon,
  EditIcon,
} from "../components/Icons";

export default function Detail() {
  const { id } = useLocalSearchParams(); // obtener parametros
  const [isNew, setIsNew] = useState(false);
  const [note, setnote] = useState(null);
  const [newData, setNewData] = useState(defaultData);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [modalColorVisible, setModalColorVisible] = useState(false);

  useEffect(() => {
    if (id) {
      if (id === "new") {
        setIsNew(true);
        setEditMode(true);
        return;
      }

      // setnote(getCardId(id)); // Local

      getCardId(id)
        .then((data) => {
          setnote(data);
          setNewData(data);
        })
        .catch((e) => {
          setError({ mensaje: "Error al obtener ID (mostrando Local)." });
          setnote(getCardIdLocal(id));
          setNewData(getCardIdLocal(id));
        });
    }
  }, [id]);

  const newColor = newData ? colorType[newData?.color] : colorType.light;

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#000033" },
          headerTintColor: colores.blanco,
          headerBackVisible: !editMode,
          headerLeft: () => (
            <View>
              {editMode ? (
                // Confirm
                <Pressable
                  style={{ marginRight: 30 }}
                  onPress={() => {
                    const data = { ...note, ...newData };

                    if (isNew) {
                      createCard({ data })
                        .then((res) => res.json())
                        .then((res) => {
                          if (res.error) {
                            setError({ mensaje: res.error });
                          } else if (res.message) {
                            setError({ mensaje: res.message });
                          } else {
                            showToast({ texto1: "Creado correctamente ✅" });
                            router.replace("/");
                          }
                        })
                        .catch((e) => {
                          return "Error al crear.";
                        });
                    } else {
                      updateCard({ id, data })
                        .then((res) => res.json())
                        .then((res) => {
                          if (res.error) {
                            setError({ mensaje: res.error });
                          } else if (res.message) {
                            setError({ mensaje: res.message });
                          } else {
                            showToast({
                              texto1: "Actualizado correctamente ✅",
                            });
                            router.replace("/");
                          }
                        })
                        .catch((err) => {
                          setError({ mensaje: "Error al actualizar. " });
                        });
                    }
                    setEditMode(false);
                  }}
                >
                  {({ pressed }) => (
                    <ConfirmIcon
                      color={pressed ? colores.pressed : colorType.success}
                    />
                  )}
                </Pressable>
              ) : (
                Platform.OS === "web" && (
                  // Back
                  <Pressable
                    onPress={() => {
                      router.replace("/");
                    }}
                  >
                    {({ pressed }) => (
                      <BackIcon
                        color={pressed ? colores.pressed : colorType.light}
                      />
                    )}
                  </Pressable>
                )
              )}
            </View>
          ),
          headerTitle: () => (
            <TextInput
              style={[styles.title, { color: newColor }]}
              editable={editMode}
              placeholder="Título..."
              placeholderTextColor={newColor}
              onChangeText={(header) => setNewData({ ...newData, header })}
              maxLength={50}
              value={newData.header}
            />
          ),
          headerRight: () => (
            <View>
              {editMode ? (
                // (Editing)
                <View style={styles.wrap}>
                  {/* Confirm ✅ */}
                  <Pressable
                    style={[
                      styles.squad,
                      styles.selectorSquad,
                      { backgroundColor: newColor },
                    ]}
                    onPress={() => setModalColorVisible(true)}
                  />
                  {/* Cancel ❌ */}
                  <Pressable
                    onPress={() => {
                      setEditMode(false);
                      if (isNew) return router.replace("/");
                      setNewData(note);
                    }}
                  >
                    {({ pressed }) => (
                      <CancelIcon
                        color={pressed ? colores.pressed : colorType.danger}
                      />
                    )}
                  </Pressable>
                </View>
              ) : (
                // (Reading)
                <View style={styles.wrap}>
                  {/* Editar 🖋️ */}
                  <Pressable onPress={() => setEditMode(true)}>
                    {({ pressed }) => (
                      <EditIcon
                        color={pressed ? colores.pressed : colores.blanco}
                      />
                    )}
                  </Pressable>

                  {/* Delete 🗑️ */}
                  <Pressable
                    onPress={() =>
                      Platform.OS === "web"
                        ? deleteCardAlert.web(id)
                        : deleteCardAlert.otros(id)
                    }
                  >
                    {({ pressed }) => (
                      <DelIcon
                        color={pressed ? colores.pressed : colorType.danger}
                      />
                    )}
                  </Pressable>
                </View>
              )}
            </View>
          ),
        }}
      />
      <View>
        {error && (
          <AlertDiv
            tipo={error.tipo}
            mensaje={error.mensaje}
            setError={setError}
          />
        )}
        {newData === null ? (
          <ActivityIndicator color={colores.loader} size={"large"} />
        ) : (
          <ScrollView scrollIndicatorInsets={{ right: 1, bottom: 1 }}>
            <View style={styles.body}>
              <View style={styles.info}>
                <Text style={styles.textInfo}>{newData.fecha}</Text>
                <Text style={styles.textInfo}>
                  {newData.hora.substring(0, 5)}
                </Text>
              </View>
              <TextInput
                style={styles.text}
                placeholder="Ingresar texto aquí..."
                placeholderTextColor="#888"
                enterKeyHint="enter"
                multiline
                numberOfLines={80}
                // autoFocus={true}
                textBreakStrategy="simple"
                editable={editMode}
                onChangeText={(text) => setNewData({ ...newData, text })}
                maxLength={500}
                value={newData.text}
              />
            </View>
          </ScrollView>
        )}
      </View>
      {/* // TODO: exportar */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalColorVisible}
        onRequestClose={() => setModalColorVisible(false)}
      >
        <Pressable
          style={styles.modalContainer}
          onPress={() => setModalColorVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.coloresView}>
              {Object.entries(colorType).map(([key, value]) => (
                <Pressable
                  key={key}
                  style={[
                    styles.squad,
                    styles.colorSquad,
                    { backgroundColor: value },
                  ]}
                  onPress={() => {
                    setNewData({ ...newData, color: key });
                    setModalColorVisible(false);
                  }}
                />
              ))}
            </View>
            <Button
              title="Cancelar"
              onPress={() => setModalColorVisible(false)}
            />
          </View>
        </Pressable>
      </Modal>
    </Screen>
  );
}

import { router, Stack } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  Button,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useLocalSearchParams } from "expo-router"; // obtener parametros
import { Screen } from "../components/Screen";
import { useEffect, useState } from "react";

import {
  createCard,
  deleteCard,
  getCardId,
  getCardIdLocal,
  updateCard,
} from "../lib/notes";
import { colores, colorType } from "../components/utils/colors";
import {
  CancelIcon,
  ConfirmIcon,
  DelIcon,
  EditIcon,
} from "../components/Icons";
import { AlertDiv } from "../components/utils/Modals";
import { getDate } from "../components/utils/getDate";
import Toast from "react-native-toast-message";

const defaultData = {
  header: "",
  text: "",
  fecha: getDate().fecha,
  hora: getDate().hora,
  name: "New",
  color: "info",
};

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
          // headerBackTitleStyle: { color: "red" },
          headerLeft: () => (
            <View>
              {editMode && (
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
              value={!isNew ? newData.header : ""}
            >
              {/* {!isNew && newData.header} */}
            </TextInput>
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
                    onPress={() => {
                      Alert.alert(
                        "Borrar Nota?",
                        "Seguro que quieres borrar esta Nota? No podrás recuperarlo",
                        [
                          {
                            text: "NO",
                            // onPress: () => console.warn("NO Pressed"),
                            style: "cancel",
                          },
                          {
                            text: "SI",
                            onPress: () => {
                              deleteCard({ id });
                              showToast({
                                texto1: "Eliminado correctamente ✅",
                              });
                              // TODO: ir a inicio
                              router.replace("/");
                            },
                          },
                        ],
                      );
                    }}
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
          <ScrollView>
            <View style={styles.body}>
              <View style={styles.info}>
                <Text style={styles.textInfo}>{newData.fecha}</Text>
                <Text style={styles.textInfo}>
                  {newData.hora.substring(0, 5)}
                </Text>
              </View>
              <TextInput
                style={styles.text}
                placeholder="Texto..."
                placeholderTextColor="#888"
                enterKeyHint="enter"
                multiline
                numberOfLines={80}
                // autoFocus={true}
                textBreakStrategy="simple"
                editable={editMode}
                onChangeText={(text) => setNewData({ ...newData, text })}
                maxLength={500}
                value={!isNew ? newData.text : ""}
              >
                {/* {!isNew && newData.text} */}
              </TextInput>
            </View>
          </ScrollView>
        )}
      </View>

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

const showToast = ({ tipo = "success", texto1, texto2 }) => {
  Toast.show({
    type: tipo,
    text1: texto1,
    text2: texto2,
  });
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    verticalAlign: "bottom",
    fontWeight: "bold",
    color: "white",
    // lineHeight: 12,
    // paddingBottom: 20,
    // backgroundColor: "red",
  },
  body: {
    flexDirection: "column",
    justifyContent: "space-between",
    margin: Platform.select({ web: 35 }),
  },
  text: {
    color: "white",
    paddingBottom: 5,
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textInfo: {
    color: "gray",
  },

  squad: {
    borderRadius: 5,
    // marginRight: 5,
    borderWidth: 1,
    borderColor: "#000",
  },
  selectorSquad: {
    width: 30,
    height: 30,
  },
  colorSquad: {
    width: 80,
    height: 80,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0005",
  },
  modalContent: {
    backgroundColor: "#007bff64",
    padding: 20,
    borderRadius: 10,
    elevation: 10,
    width: "60%",
  },
  coloresView: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    marginBottom: 25,
    alignContent: "center",
  },
  wrap: {
    justifyContent: "space-between",
    flexDirection: "row",
    gap: 10,
    // flexWrap: "wrap",
  },
  /*
    editView: {
    width: "100%",
    flexDirection: "row",
    // gap: 5,
    justifyContent: "flex-start",
    // backgroundColor: "#fff",
    marginRight: 35,
    paddingInline: 3,
    alignItems: "center",
  }, */
});

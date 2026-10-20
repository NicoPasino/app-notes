import { Platform, ScrollView, Text, TextInput, View } from "react-native";
import { memo } from "react";
import { Loading } from "../Spinner";
import { colorType } from "../utils/colors";
import { detailStyles } from "../utils/detailStyles";
import { DesglosarFecha } from "../utils/getDate";

const cursorStyle = (editMode) => (!editMode ? "default" : "text");

export function TituloCont({ header, color, editMode, handleHeaderChange }) {
  const newColor = color ? colorType[color] : colorType.light;
  const backgColor = () => (editMode ? "#0005" : "#0000");
  if (header === undefined && color === undefined) return <Loading />;

  const isWeb = Platform.OS === "web";
  const textProps =
    editMode && !isWeb
      ? { defaultValue: header ?? "" }
      : { value: header ?? "" };

  return (
    <TextInput
      key={isWeb ? "web" : editMode ? "edit" : "view"}
      style={[
        detailStyles.title,
        {
          cursor: cursorStyle(editMode),
          backgroundColor: backgColor(),
        },
        editMode && {
          width: "95%",
          alignSelf: "center",
          textAlign: Platform.OS === "android" ? "left" : "center",
          borderRadius: 8,
          paddingHorizontal: 8,
        },
      ]}
      editable={editMode}
      placeholder="Título..."
      placeholderTextColor={newColor}
      onChangeText={(value) => handleHeaderChange(value)}
      maxLength={50}
      {...textProps}
      multiline={false}
      numberOfLines={1}
    />
  );
}

export const TextoCont = memo(function TextoCont({ data, editMode, isNew }) {
  if (!data) return <Loading />;
  const { newData, setNewData } = data;

  return (
    <ScrollView
      scrollIndicatorInsets={{ right: 1, bottom: 1 }}
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={[detailStyles.body]}>
        {!editMode && !isNew && (
          <View style={detailStyles.info}>
            <Text style={detailStyles.textInfo}>
              Creada: {DesglosarFecha(newData.fechaCreacion).fecha}
            </Text>
            <Text style={detailStyles.textInfo}>
              Modificada: hace{" "}
              {DesglosarFecha(newData.fechaModificacion).tiempoTranscurrido}
            </Text>
          </View>
        )}
        <TextInput
          style={[detailStyles.text, { cursor: cursorStyle(editMode) }]}
          placeholder="Ingresar texto aquí..."
          placeholderTextColor="#888"
          enterKeyHint="enter"
          multiline
          // autoFocus={true}
          textBreakStrategy="simple"
          editable={editMode}
          onChangeText={(text) => setNewData((prev) => ({ ...prev, text }))}
          maxLength={5000}
          value={newData.text}
        />
      </View>
    </ScrollView>
  );
});

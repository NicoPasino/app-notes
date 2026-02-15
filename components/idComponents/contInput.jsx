import { ScrollView, Text, TextInput, View } from "react-native";
import { memo } from "react";
import { Loading } from "../Spinner";
import { colorType } from "../utils/colors";
import detailStyles from "../utils/detailStyles";

function cursorStyle(editMode) {
  return !editMode ? "default" : "text";
}

export function TituloCont({ header, color, editMode, handleHeaderChange }) {
  const newColor = color ? colorType[color] : colorType.light;
  if (header === undefined && color === undefined) return <Loading />;

  return (
    <TextInput
      style={[
        detailStyles.title,
        { color: newColor, cursor: cursorStyle(editMode) },
      ]}
      editable={editMode}
      placeholder="Título..."
      placeholderTextColor={newColor}
      onChangeText={(value) => handleHeaderChange(value)}
      maxLength={50}
      value={header}
    />
  );
}

export const TextoCont = memo(function TextoCont({ data, editMode }) {
  if (!data) return <Loading />;
  const { newData, setNewData } = data;
  const { text, fecha, hora } = newData;

  return (
    <ScrollView scrollIndicatorInsets={{ right: 1, bottom: 1 }}>
      <View style={detailStyles.body}>
        <View style={detailStyles.info}>
          <Text style={detailStyles.textInfo}>{fecha}</Text>
          <Text style={detailStyles.textInfo}>{hora.substring(0, 5)}</Text>
        </View>
        <TextInput
          style={[detailStyles.text, { cursor: cursorStyle(editMode) }]}
          placeholder="Ingresar texto aquí..."
          placeholderTextColor="#888"
          enterKeyHint="enter"
          multiline
          numberOfLines={80}
          // autoFocus={true}
          textBreakStrategy="simple"
          editable={editMode}
          onChangeText={(text) => setNewData((prev) => ({ ...prev, text }))}
          maxLength={500}
          value={text}
        />
      </View>
    </ScrollView>
  );
});

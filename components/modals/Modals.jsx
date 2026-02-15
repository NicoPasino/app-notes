import { Pressable, StyleSheet, Text, View } from "react-native";
import { CancelIcon } from "../Icons";
import { colorType } from "../utils/colors";

export function AlertDiv({ tipo = "Error", mensaje, setError }) {
  const tipoErrorStyle = tipo === "Error" ? styles.error : styles.warning;

  return (
    <View style={[styles.errorView, tipoErrorStyle]}>
      <Text style={{ width: "90%" }}>
        <Text style={{ fontWeight: 900 }}>{tipo}: </Text>
        <Text>{mensaje}</Text>
      </Text>
      {setError != null && (
        <Pressable onPress={() => setError(null)}>
          {({ pressed }) => (
            <CancelIcon color={pressed ? "white" : colorType.danger} />
          )}
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  errorView: {
    backgroundColor: "#ff8d8d",
    borderColor: "#f33",
    padding: 12,
    borderRadius: 7,
    borderWidth: 1,
    margin: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    // flexWrap: "wrap",
  },
  error: {
    backgroundColor: "#ff8d8d",
    borderColor: "#f33",
  },
  warning: {
    backgroundColor: "#ffea8d",
    borderColor: "#fff94f",
  },
});

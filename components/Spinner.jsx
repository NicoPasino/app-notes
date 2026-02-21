import { View, ActivityIndicator, StyleSheet } from "react-native";
import { colores } from "./utils/colors";

export function LoadingBackground() {
  return (
    <View style={styles.loader}>
      <ActivityIndicator size="large" color={colores.loader} />
    </View>
  );
}

export function Loading() {
  return <ActivityIndicator size="large" color={colores.loader} />;
}

const styles = StyleSheet.create({
  loader: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    paddingBlock: 350,
  },
});

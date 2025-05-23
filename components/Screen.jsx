import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

export function Screen({ children }) {
  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#0a0a23",
    padding: 4,
  },
});

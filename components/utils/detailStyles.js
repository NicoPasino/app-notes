import { StyleSheet, Platform } from "react-native";

export const detailStyles = StyleSheet.create({
  title: {
    fontSize: 18,
    verticalAlign: "bottom",
    fontWeight: "bold",
    color: "white",
  },
  body: {
    flexDirection: "column",
    justifyContent: "space-between",
    margin: Platform.select({ web: 35 }),
  },
  text: {
    color: "white",
    padding: 15,
    paddingBottom: 5,
    borderRadius: 10,
    backgroundColor: "#0003",
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  textInfo: { color: "gray" },
  squad: { borderRadius: 5, borderWidth: 1, borderColor: "#000" },
  selectorSquad: { width: 30, height: 30 },
  colorSquad: { width: 80, height: 80 },
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
  wrap: { justifyContent: "space-between", flexDirection: "row", gap: 10 },
});

export default detailStyles;

import { Pressable, StyleSheet } from "react-native";
import { View, Button, Modal } from "react-native";
import { useState } from "react";
import { colorType } from "./utils/colors";

export function ColorSelect({ color = colorType.light }) {
  const [modalColorVisible, setModalColorVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState(color);

  return (
    <>
      <Pressable
        style={[
          styles.squad,
          styles.selectorSquad,
          { backgroundColor: selectedColor },
        ]}
        onPress={() => setModalColorVisible(true)}
      />

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
                    setSelectedColor(value);
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
    </>
  );
}

const styles = StyleSheet.create({
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
});

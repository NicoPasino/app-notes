import { Button, Modal, Pressable, View } from "react-native";
import detailStyles, { detailStyles as styles } from "../utils/detailStyles";
import { colorType } from "../utils/colors";

// Modal para cambiar color
export function ModalColorView({ modal, data }) {
  const { modalColorVisible, setModalColorVisible } = modal;
  const { setNewData, newData } = data;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalColorVisible}
      onRequestClose={() => setModalColorVisible(false)}
    >
      <Pressable
        style={detailStyles.modalContainer}
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
  );
}

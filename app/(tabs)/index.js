import { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Platform,
} from "react-native";

import getCards, { getCardsLocal } from "../../lib/notes";
import { AnimatedCard, Card } from "../../components/Card";
import { colores } from "../../components/utils/colors";
import { AlertDiv } from "../../components/utils/Modals";

export default function Main() {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    // const datos = getCards();
    // setCards(datos);

    // setCards(getCardsLocal());
    // setCards(getCardsVacio());

    // API
    getCards()
      .then((notes) => setCards(notes))
      .catch(
        (error) =>
          setError({
            mensaje:
              "No se pudo conectar con el servidor. (Mostrando Notas en Local).",
          }),
        setCards(getCardsLocal()),
      );
  }, []);

  return (
    <View style={{ backgroundColor: "#0a0a23", flex: 1, minHeight: "100vh" }}>
      {error && (
        <AlertDiv
          tipo={error.tipo}
          mensaje={error.mensaje}
          setError={setError}
        />
      )}
      {cards.length === 0 ? (
        <View style={styles.loader}>
          {!error && <ActivityIndicator size="large" color={colores.loader} />}
        </View>
      ) : (
        <FlatList
          style={{ paddingBottom: 150 }}
          data={cards}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <Card note={item} />
            // <AnimatedCard note={item} index={index} />
          )}
          contentContainerStyle={styles.flatContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    paddingBlock: "100%",
  },
  flatContainer: {
    padding: 16,
    margin: Platform.OS === "web" ? "auto" : 0,
  },
});

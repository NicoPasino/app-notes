import { useEffect, useState } from "react";
import { View, ActivityIndicator, FlatList, StyleSheet } from "react-native";

import getCards, { getCardsLocal, getCardsVacio } from "../../lib/notes";
import { AnimatedCard } from "../../components/Card";
import { colores } from "../../components/utils/colors";

export default function Main() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // const datos = getCards();
    // setCards(datos);
    getCards().then((notes) => setCards(notes)); // API
    // setCards(getCardsLocal());
    // setCards(getCardsVacio());
  }, []);

  return (
    <View style={{ backgroundColor: "#0a0a23" }}>
      {cards.length === 0 ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={colores.loader} />
        </View>
      ) : (
        <FlatList
          data={cards}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <AnimatedCard note={item} index={index} />
          )}
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
});

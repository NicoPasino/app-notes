import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Pressable } from "react-native";
import { colorType } from "./utils/colors";

const showMaxHeader = 20;
const showMaxText = 170;

export function Card({ note }) {
  const { id, header, text, fecha, color } = note;
  const [day, month, year] = fecha.replaceAll(/[-/]/g, "-").split("-");
  const fechaActual = new Date();
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push(`/${id}`)}
      style={({ pressed }) => [
        { backgroundColor: pressed ? "#fff1" : "#fff0" },
      ]}
    >
      <View key={id} style={[styles.card, { borderColor: colorType[color] }]}>
        <View style={{ flexShrink: 1 }}>
          <View style={styles.cardTop}>
            {/* Header */}
            <Text
              style={[
                styles.header,
                styles.textShadow100,
                { color: colorType[color] },
              ]}
            >
              {header.slice(0, showMaxHeader)}
              {header.length > showMaxHeader && "..."}
            </Text>

            {/* Fecha */}
            <Text style={styles.fecha}>
              {day}-{month.slice(0, 3)}
              {+year === fechaActual.getFullYear() ? "." : `-${year}`}
            </Text>
          </View>

          {/* Texto */}
          <Text style={styles.text}>
            {text.slice(0, showMaxText)}
            {text.length > showMaxText && "..."}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

export function AnimatedCard({ note, index }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 800,
      delay: index * 150,
      useNativeDriver: true,
    }).start();
  }, [opacity, index]);

  return (
    <Animated.View style={{ opacity }}>
      <Card note={note} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#000e3572",
    width: "96%",
    marginInline: "2%",
    padding: 20,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: "#3b83f6a8",
    marginBlock: 12,
  },
  cardTop: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 12,
  },
  header: {
    fontSize: 20,
    color: "#7dd3fc",
  },
  fecha: {
    color: "gray",
    fontSize: 11,
  },
  text: {
    fontSize: 16,
    color: "#cdb5e1",
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "gray",
    marginBottom: 10,
  },
  textShadow100: {
    color: "#88defd",
    textShadowColor: "#7ddcff7d",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 25,
  },
});

import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Pressable } from "react-native";
import { colorType, colorTypeB } from "./utils/colors";

const showMaxHeader = 20;
const showMaxText = 170;

export function Card({ note }) {
  const { id, header, text, fecha, color } = note;
  const [day, month, year] = fecha.replaceAll(/[-/]/g, "-").split("-");
  const fechaActual = new Date();
  const router = useRouter();

  return (
    <Pressable
      key={id}
      onPress={() => router.push(`/${id}`)}
      style={({ hovered }) => [
        styles.cardMargin,
        { transform: [{ scale: hovered ? 1.02 : 1 }] },
      ]}
    >
      {({ pressed }) => (
        <View
          style={[
            styles.card,
            {
              borderColor: colorType[color],
              backgroundColor: pressed ? "#fff1" : "#fff0",
            },
          ]}
        >
          <View
            style={[
              styles.cardTop,
              {
                borderColor: colorType[color],
                backgroundColor: colorTypeB[color],
              },
            ]}
          >
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
          <Text style={[styles.text, { borderColor: colorType[color] }]}>
            {text.slice(0, showMaxText)}
            {text.length > showMaxText && "..."}
          </Text>
        </View>
      )}
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

const borderRadius = 5;

const styles = StyleSheet.create({
  cardMargin: {
    width: "96%",
    marginInline: "2%",
    marginBlock: 16,
  },
  card: {
    backgroundColor: "#111", // #000e3572
    maxWidth: 800, // web
    borderRadius: borderRadius,
    boxShadow: "5px 5px 15px 2px #0008",
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopStartRadius: borderRadius,
    borderTopEndRadius: borderRadius,
    padding: 10,
    borderWidth: 1,
  },
  header: {
    fontSize: 20,
    color: "#7dd3fc",
  },
  fecha: {
    fontSize: 11,
    color: "gray",
  },
  text: {
    fontSize: 14,
    padding: 10,
    color: colorType.light, // "#cdb5e1"
    borderWidth: 1,
    borderTopWidth: 0,
    borderBottomLeftRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
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

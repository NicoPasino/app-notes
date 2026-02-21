import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Platform, Easing } from "react-native";
import { __IsWeb__ } from "../../config";

export const BotonDestello = ({ children }) => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const runAnimation = () => {
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 1500,
          easing: Easing.out(Easing.ease),
          useNativeDriver: !__IsWeb__,
        }),
        Animated.delay(3000), // LA PAUSA DE 3 SEGUNDOS
      ]).start(({ finished }) => {
        if (finished) {
          animation.setValue(0); // Reiniciamos el valor
          runAnimation(); // Volvemos a empezar
        }
      });
    };

    runAnimation();
  }, [animation]);

  // Interpolación para escala y opacidad
  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2.2],
  });

  const opacity = animation.interpolate({
    inputRange: [0, 0.4, 1], // El pico de luz es al 40% del tiempo
    outputRange: [0, 0.5, 0],
  });

  return (
    <View style={styles.container}>
      {/* EL DESTELLO AZUL (Detrás del botón) */}
      <Animated.View
        style={[
          styles.glow,
          {
            opacity: opacity,
            transform: [{ scale: scale }],
          },
        ]}
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  glow: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#00D4FF",
    ...Platform.select({
      ios: {
        shadowColor: "#00D4FF",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 15,
      },
      android: {
        elevation: 20, // Android no tiene blur nativo
      },
      web: {
        filter: "blur(15px)",
        boxShadow: "0 0 20px #00D4FF",
      },
    }),
  },
});

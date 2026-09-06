import { Tabs } from "expo-router";
import { Platform, StyleSheet, View } from "react-native";

import { InfoIcon, NoteIcon } from "../../components/Icons";
import { colores } from "../../components/utils/colors";
import { AddBtn } from "../../components/buttons/TabButtons";
import { BotonDestello } from "../../components/buttons/Destello";

// Nav (Footer)
export default function TabsLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colores.turquesa,
          tabBarInactiveTintColor: colores.gris,
          tabBarStyle: styles.barStyle,
          tabBarItemStyle: {
            // backgroundColor: "gray",
            // marginInline: 30,
            marginBlock: 0,
          },
          tabBarLabelStyle: styles.barTextStyle,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Notas",
            tabBarIcon: ({ color }) => <NoteIcon color={color} />,
          }}
        />
        <Tabs.Screen
          name="about"
          options={{
            title: "Info",
            tabBarIcon: ({ color }) => <InfoIcon color={color} />,
          }}
        />
      </Tabs>

      <View style={styles.newBtn} pointerEvents="box-none">
        <BotonDestello>
          <AddBtn />
        </BotonDestello>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  newBtn: {
    position: "absolute",
    bottom: Platform.select({ web: 25, android: 50 }), // altura botón
    left: 0,
    right: 0,
    alignItems: "center",
  },
  barStyle: {
    backgroundColor: "#0a0a15",
    height: Platform.select({ web: 64, android: 95 }), // altura bar
  },
  barTextStyle: {
    fontSize: 14,
    // fontFamily: "Georgia",
    fontWeight: 500,
  },
});

import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";

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
          tabBarStyle: styles.barStyle,
          tabBarActiveTintColor: colores.turquesa,
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
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  barStyle: {
    backgroundColor: "#0a0a15",
    height: 64,
    paddingBottom: 8,
  },
});

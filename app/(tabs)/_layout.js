import { Tabs } from "expo-router";

import { HomeIcon, InfoIcon } from "../../components/Icons";
import { colores } from "../../components/utils/colors";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#0a0a23" },
        tabBarActiveTintColor: colores.turquesa,
        // ...
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
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
  );
}

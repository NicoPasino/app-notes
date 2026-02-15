import { Stack } from "expo-router";
import { Screen } from "../components/Screen";
import { NewNoteBtn } from "../components/NewNoteBtn";
import Toast from "react-native-toast-message";
import { HeaderTitle } from "../components/layoutComponents/HeaderTitle";

// Header + Toast (home/info)
export default function Layout() {
  return (
    <Screen>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#00001d" },
          // headerLeft: () => <NavIcon />,
          headerTitle: () => <HeaderTitle />,
          headerRight: () => <NewNoteBtn />,
          headerLeftContainerStyle: { paddingLeft: "10%" },
          headerRightContainerStyle: { paddingRight: "10%" },
          headerTitleAlign: "center",
        }}
      />
      <Toast />
    </Screen>
  );
}

import { Stack } from "expo-router";
import { Screen } from "../components/Screen";
import Toast from "react-native-toast-message";
import { HeaderTitle } from "../components/layoutComponents/HeaderTitle";
import { DataProvider } from "../context/dataContext";

// Header + Toast (Index)
export default function Layout() {
  return (
    <DataProvider>
      <Screen>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: "#00001d" },
            headerLeft: () => <></>, // eviar mostrar BackBtnNativo
            headerTitle: () => <HeaderTitle />,
            // headerRight: () => <NewNoteBtn />,
            headerLeftContainerStyle: { paddingLeft: "10%" },
            headerRightContainerStyle: { paddingRight: "10%" },
            headerTitleAlign: "center",
          }}
        />
        <Toast />
      </Screen>
    </DataProvider>
  );
}

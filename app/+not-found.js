import { router } from "expo-router";
import { Screen } from "../components/Screen";
import { RutaNoEncontrada } from "../components/EmptyStates";

export default function NotFound() {
  return (
    <Screen>
      <RutaNoEncontrada onIrInicio={() => router.replace("/")} />
    </Screen>
  );
}

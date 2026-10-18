import { router } from "expo-router";

export function irANuevaNota(color) {
  if (color) router.push({ pathname: "/new", params: { color } });
  else router.push("/new");
}

export default irANuevaNota;

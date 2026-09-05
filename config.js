import { Platform } from "react-native";

export const __IsWeb__ = Platform.OS === "web";
export const __IsAndroid__ = Platform.OS === "android";
export const __IsIOS__ = Platform.OS === "ios";

// true → backend local en dispositivo (SQLite/localStorage)
// false → API remota (por defecto)
export const USE_LOCAL_DB = process.env.EXPO_PUBLIC_USE_LOCAL_DB === "true";

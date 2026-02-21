import { Platform } from "react-native";

export const __IsWeb__ = Platform.OS === "web";
export const __IsAndroid__ = Platform.OS === "android";
export const __IsIOS__ = Platform.OS === "ios";

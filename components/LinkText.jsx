import { Linking, StyleSheet, Text } from "react-native";

function handlePressLink(url) {
  const fullUrl = /^https?:\/\//i.test(url) ? url : "https://" + url;
  Linking.openURL(fullUrl).catch((err) => {
    console.log("Don't know how to open URI: " + fullUrl, err);
  });
}

export function LinkText({ url }) {
  return (
    <Text style={style.linkAbout} onPress={() => handlePressLink(url)}>
      {url}
    </Text>
  );
}

const style = StyleSheet.create({
  linkAbout: {
    color: "#8a8aff",
    textDecorationLine: "underline",
  },
});

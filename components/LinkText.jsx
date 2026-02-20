import { Linking, StyleSheet, Text } from "react-native";

function handlePressLink(url) {
  Linking.canOpenURL(url).then((supported) => {
    if (supported) {
      Linking.openURL("https://" + url);
    } else {
      console.log("Don't know how to open URI: " + url);
    }
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

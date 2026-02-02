import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { HomeIcon } from "../../components/Icons";
import { Screen } from "../../components/Screen";

export default function About() {
  return (
    <Screen>
      <View style={style.body}>
        <Text style={style.textAbout}> About </Text>
        <Link asChild href="/">
          <Pressable style={{ margin: 10 }}>
            {({ pressed }) => (
              <HomeIcon
                style={{ opacity: pressed ? 0.5 : 1, color: "#55d3ff" }}
              />
            )}
          </Pressable>
        </Link>
        <Text style={{ color: "white" }}>
          En Notas puedes Ver, Crear y Modificar todas las notas que quieras,
          estas notas son públicas y se guardan en una Base de Datos.
        </Text>
        <Text></Text>
        <Text style={{ color: "white" }}>
          Tecnologías ustilizadas: React Native, .NET, Entity Framework, API
          Rest, MySql.
        </Text>
        <Text></Text>
        <Text style={{ color: "gray" }}>
          lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod inclor
          sit amet, adipiscing elit, sed do temporididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco labo.
        </Text>
        <Text></Text>
        <Text style={{ color: "gray" }}>
          lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea
        </Text>
      </View>
    </Screen>
  );
}

const style = StyleSheet.create({
  body: {
    padding: 10,
  },
  textAbout: {
    color: "white",
    fontSize: 30,
    textAlign: "center",
    marginTop: 20,
  },
});

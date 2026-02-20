import { StyleSheet, Text, View } from "react-native";
import { Screen } from "../../components/Screen";
import { LinkText } from "../../components/LinkText";

export default function About() {
  return (
    <Screen>
      <View style={style.body}>
        <Text style={style.tituloAbout}>{"📌 Acerca de:"}</Text>
        <Text style={style.textoAbout}>
          {"Se puede Ver, Crear y Modificar todas las notas que quieras,"}
          {"estas notas son públicas y se guardan en una Base de Datos.\n"}
          {"Esta app aún está en desarrollo, por lo que puede haber fallos."}
        </Text>
        <Text style={style.tituloAbout}>{"🛠️ Tecnologías utilizadas:"}</Text>
        <Text style={style.textoAbout}>
          {" * React Native. \n"}
          {" * .NET. \n"}
          {" * Entity Framework. \n"}
          {" * API Rest. \n"}
          {" * MySql. "}
        </Text>
        <Text style={style.tituloAbout}>{"🧑‍💻 Autor: Nicolás Pasino."}</Text>
        <Text style={style.textoAbout}>
          {"LinkedIn: "}
          <LinkText url="www.linkedin.com/in/nicolas-pasino" />
          <Br />
          {"GitHub: "}
          <LinkText url="github.com/NicoPasino" />
          <Br />
          {"Portfolio web: "}
          <LinkText url="nicopasino.space" />
        </Text>
      </View>
    </Screen>
  );
}

const Br = () => "\n";

const style = StyleSheet.create({
  body: {
    padding: 10,
  },
  tituloAbout: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
  textoAbout: {
    color: "darkgray",
    fontSize: 15,
    marginLeft: 20,
    marginBottom: 20,
  },
});

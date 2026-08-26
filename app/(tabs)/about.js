import { StyleSheet, Text, View } from "react-native";
import { Screen } from "../../components/Screen";
import { LinkText } from "../../components/LinkText";

export default function About() {
  return (
    <Screen>
      <View style={style.body}>
        <Text style={style.tituloAbout}>{"📌 Acerca de:"}</Text>
        <Text style={style.textoAbout}>
          {"Esta app es un proyecto personal con la finalidad de aprender y mejorar en el desarrollo de aplicaciones móviles y web.\n"}
          {"Se puede Ver, Crear, Modificar y Eliminar todas las notas que quieras.\n"}
          {"Estas notas son públicas y se guardan en una Base de Datos."}
        </Text>
        <Text style={style.tituloAbout}>{"🛠️ Tecnologías utilizadas:"}</Text>
        <Text style={style.textoAbout}>
          {" * React Native. \n"}
          {" * .NET. \n"}
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

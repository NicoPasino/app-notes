import { ScrollView, StyleSheet, Text } from "react-native";
import { Screen } from "../../components/Screen";
import { LinkText } from "../../components/LinkText";
import { colores } from "../../components/utils/colors";
import { __IsWeb__ } from "../../config";

export default function About() {
  return (
    <Screen>
      <ScrollView
        contentContainerStyle={style.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={style.tituloAbout}>{"📌 Acerca de:"}</Text>
        <Text style={style.textoAbout}>
          {"Esta app es un proyecto personal con la finalidad de aprender y mejorar en el desarrollo de aplicaciones móviles y web.\n"}
          {"Anteriormente funcionaba con una API remota (.NET y MySQL), pero actualmente las notas se guardan localmente en el dispositivo de forma privada.\n"}
        </Text>

        <Text style={style.tituloAbout}>{"📌 Funcionalidades:"}</Text>
        <Text style={style.textoAbout}>
          {[
            "Ver, Buscar, Filtrar.",
            "Crear, Editar.",
            "Archivar, marcar como Favorito.",
            "Enviar a la papelera.",
            "Eliminar permanentemente.",
          ]
            .map((f) => ` - ${f}\n`)
            .join("")}
        </Text>

        <Text style={style.tituloAbout}>{"🛠️ Tecnologías utilizadas:"}</Text>
        <Text style={style.textoAbout}>
          {" - React Native.\n - SQLite.\n"}
        </Text>

        <Text style={style.tituloAbout}>{"💻 Repositorio: "}</Text>
        <Text style={style.textoAbout}>
          {"GitHub: "}
          <LinkText url="github.com/NicoPasino/app-notes" />
        </Text>

        <Text style={style.tituloAbout}>{"🧑‍💻 Autor: Nicolás Pasino."}</Text>
        <Text style={style.textoAbout}>
          {"LinkedIn: "}
          <LinkText url="linkedin.com/in/nicolas-pasino" />
          <Br />
          {"GitHub: "}
          <LinkText url="github.com/NicoPasino" />
          <Br />
          {"Portfolio web: "}
          <LinkText url="nicopasino.space" />
        </Text>
      </ScrollView>
    </Screen>
  );
}

const Br = () => "\n";

const style = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 60,
    maxWidth: __IsWeb__ ? 832 : undefined,
    width: "100%",
    margin: __IsWeb__ ? "auto" : 0,
  },
  tituloAbout: {
    color: colores.blanco,
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 22,
    marginBottom: 10,
  },
  textoAbout: {
    color: colores.gris,
    fontSize: 15,
    lineHeight: 24,
    marginLeft: 4,
    textAlign: "justify",
  },
});
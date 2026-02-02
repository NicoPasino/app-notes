import { getDate } from "./getDate";

export const defaultData = {
  header: "",
  text: "",
  fecha: getDate().fecha,
  hora: getDate().hora,
  name: "New",
  color: "info",
};

export default defaultData;

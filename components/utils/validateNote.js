const limite = {
  idMin: 1,
  idMax: 9999999,
  headerMax: 50,
  textMax: 5000,
  fechaMax: 19,
  nameMax: 50,
  colorMax: 20,
};

const regexFechaUTC = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

function esEntero(valor) {
  return Number.isInteger(Number(valor));
}

function esBool(valor) {
  return typeof valor === "boolean";
}

// Valida y normaliza los campos de una Nota.
// Devuelve { ok: true, data } si es válido, o { ok: false, message } con el primer error.
export function validateNote(note, { crear = false } = {}) {
  if (!note || typeof note !== "object") {
    return { ok: false, message: "Datos de la nota inválidos." };
  }

  const id = note.id;
  const header = note.header;
  const text = note.text;
  const fechaCreacion = note.fechaCreacion;
  const fechaModificacion = note.fechaModificacion;
  const name = note.name;
  const color = note.color;
  const favorito = note.favorito;
  const archivado = note.archivado;
  const eliminado = note.eliminado;

  if (crear || id !== undefined) {
    if (!esEntero(id) || id < limite.idMin || id > limite.idMax) {
      return { ok: false, message: `El id debe ser un entero entre ${limite.idMin} y ${limite.idMax}.` };
    }
  }

  if (header !== undefined && header !== null) {
    if (typeof header !== "string" || header.length > limite.headerMax) {
      return { ok: false, message: `El header debe ser texto de máximo ${limite.headerMax} caracteres.` };
    }
  }

  if (text !== undefined && text !== null) {
    if (typeof text !== "string" || text.length > limite.textMax) {
      return { ok: false, message: `El texto debe ser de máximo ${limite.textMax} caracteres.` };
    }
  }

  if (fechaCreacion !== undefined && fechaCreacion !== null) {
    if (typeof fechaCreacion !== "string" || fechaCreacion.length > limite.fechaMax || !regexFechaUTC.test(fechaCreacion)) {
      return { ok: false, message: "fechaCreacion debe ser una fecha UTC con formato YYYY-MM-DD HH:mm:ss." };
    }
  }

  if (fechaModificacion !== undefined && fechaModificacion !== null) {
    if (typeof fechaModificacion !== "string" || fechaModificacion.length > limite.fechaMax || !regexFechaUTC.test(fechaModificacion)) {
      return { ok: false, message: "fechaModificacion debe ser una fecha UTC con formato YYYY-MM-DD HH:mm:ss." };
    }
  }

  if (name !== undefined && name !== null) {
    if (typeof name !== "string" || name.length > limite.nameMax) {
      return { ok: false, message: `El nombre debe ser texto de máximo ${limite.nameMax} caracteres.` };
    }
  }

  if (color !== undefined && color !== null) {
    if (typeof color !== "string" || color.length > limite.colorMax) {
      return { ok: false, message: `El color debe ser texto de máximo ${limite.colorMax} caracteres.` };
    }
  }

  for (const [campo, valor] of [
    ["favorito", favorito],
    ["archivado", archivado],
    ["eliminado", eliminado],
  ]) {
    if (valor !== undefined && valor !== null && !esBool(valor)) {
      return { ok: false, message: `El campo ${campo} debe ser booleano.` };
    }
  }

  return { ok: true };
}

export const noteLimits = limite;

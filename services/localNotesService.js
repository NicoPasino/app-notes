import { __IsWeb__ } from "../config";
import { getNowUTC } from "../components/utils/getDate";
import { validateNote } from "../components/utils/validateNote";

// Backend local de notas. En dispositivos (Android/iOS) usa SQLite (expo-sqlite).
// En web usa localStorage como capa de persistencia, manteniendo la misma interfaz
// que notasAPI para poder alternar entre API y local sin tocar el front.

const DB_NAME = "notasLocal.db";
const LS_KEY = "notasLocalStorage";
const WINDOW = typeof window !== "undefined" ? window : null;

// ---------- Capa de persistencia (web) ----------
function lsGetAll() {
  try {
    const raw = WINDOW?.localStorage?.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function lsSetAll(list) {
  try {
    WINDOW?.localStorage?.setItem(LS_KEY, JSON.stringify(list));
  } catch {
    // sin almacenamiento disponible
  }
}

// ---------- Capa de persistencia (SQLite) ----------
function getDb() {
  if (__IsWeb__) return null;
  const { openDatabaseSync } = require("expo-sqlite");
  const db = openDatabaseSync(DB_NAME);
  db.execSync(`
    CREATE TABLE IF NOT EXISTS notas (
      id INTEGER PRIMARY KEY,
      header TEXT,
      text TEXT,
      fechaCreacion TEXT,
      fechaModificacion TEXT,
      name TEXT,
      color TEXT,
      favorito INTEGER DEFAULT 0,
      archivado INTEGER DEFAULT 0,
      eliminado INTEGER DEFAULT 0
    );
  `);
  return db;
}

function toNote(row) {
  if (!row) return row;
  return {
    id: row.id,
    header: row.header,
    text: row.text,
    fechaCreacion: row.fechaCreacion,
    fechaModificacion: row.fechaModificacion,
    name: row.name,
    color: row.color,
    favorito: row.favorito === 1,
    archivado: row.archivado === 1,
    eliminado: row.eliminado === 1,
  };
}

function toRow(note) {
  return {
    id: note.id,
    header: note.header ?? "",
    text: note.text ?? "",
    fechaCreacion: note.fechaCreacion ?? "",
    fechaModificacion: note.fechaModificacion ?? "",
    name: note.name ?? "",
    color: note.color ?? "",
    favorito: note.favorito ? 1 : 0,
    archivado: note.archivado ? 1 : 0,
    eliminado: note.eliminado ? 1 : 0,
  };
}

// ---------- Operaciones (implementación común) ----------
function generarId() {
  return Math.floor(Math.random() * (9999999 - 1 + 1)) + 1;
}

function buildCollection() {
  const db = __IsWeb__ ? null : getDb();

  const obtenerTodos = () => {
    if (__IsWeb__) return lsGetAll();

    try {
      const rows = db.getAllSync("SELECT * FROM notas ORDER BY id ASC");
      return rows.map(toNote);
    } catch {
      return { error: "Error al leer las notas del dispositivo." };
    }
  };

  const obtenerPorId = (id) => {
    const nid = Number(id);
    if (__IsWeb__) {
      return lsGetAll().find((n) => Number(n.id) === nid) || null;
    }

    try {
      const row = db.getFirstSync("SELECT * FROM notas WHERE id = ?", [nid]);
      return row ? toNote(row) : null;
    } catch {
      return { error: "Error al leer la nota del dispositivo." };
    }
  };

  const buscarPorCampo = (campo, valor) => {
    const lista = __IsWeb__ ? lsGetAll() : obtenerTodos();
    if (lista?.error || !Array.isArray(lista)) return lista ?? [];

    const v = valor === "true" ? true : valor === "false" ? false : valor;
    return lista.filter((n) => n[campo] === v);
  };

  const agregar = (item) => {
    const ahora = getNowUTC();
    const nuevaNota = {
      ...item,
      id: item.id ?? generarId(),
      name: item.name ?? "Local",
      color: item.color ?? "info",
      favorito: item.favorito ?? false,
      archivado: item.archivado ?? false,
      eliminado: item.eliminado ?? false,
      fechaCreacion: item.fechaCreacion ?? ahora,
      fechaModificacion: item.fechaModificacion ?? ahora,
    };

    const validacion = validateNote(nuevaNota, { crear: true });
    if (!validacion.ok) return { message: validacion.message };

    if (__IsWeb__) {
      const lista = lsGetAll();
      if (lista.some((n) => Number(n.id) === Number(nuevaNota.id))) {
        return { message: "Ya existe una nota con ese id." };
      }
      lsSetAll([...lista, nuevaNota]);
      return { ok: true };
    }

    try {
      const row = toRow(nuevaNota);
      db.runSync(
        `INSERT INTO notas (id, header, text, fechaCreacion, fechaModificacion, name, color, favorito, archivado, eliminado)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          row.id, row.header, row.text, row.fechaCreacion, row.fechaModificacion,
          row.name, row.color, row.favorito, row.archivado, row.eliminado,
        ],
      );
      return { ok: true };
    } catch {
      return { error: "No se pudo guardar la nota en el dispositivo." };
    }
  };

  const actualizar = (item) => {
    if (!item || item.id === undefined) {
      return { message: "No se encontró ID en el item para actualizar." };
    }
    return actualizarParcial(item.id, item);
  };

  const actualizarParcial = (id, campos) => {
    const nid = Number(id);
    const camposActualizables = [
      "header", "text", "name", "color", "favorito", "archivado", "eliminado",
    ];

    const soloActualizables = {};
    camposActualizables.forEach((c) => {
      if (campos[c] !== undefined) soloActualizables[c] = campos[c];
    });

    const validacion = validateNote({ id: nid, ...soloActualizables });
    if (!validacion.ok) return { message: validacion.message };

    if (__IsWeb__) {
      const lista = lsGetAll();
      const idx = lista.findIndex((n) => Number(n.id) === nid);
      if (idx === -1) return { message: "Nota no encontrada." };
      lista[idx] = {
        ...lista[idx],
        ...soloActualizables,
        fechaModificacion: getNowUTC(),
      };
      lsSetAll(lista);
      return { ok: true };
    }

    try {
      const sets = Object.keys(soloActualizables).map((c) => `${c} = ?`).join(", ");
      const params = [...Object.values(soloActualizables), getNowUTC(), nid];
      if (sets) {
        db.runSync(`UPDATE notas SET ${sets}${sets ? ", " : ""}fechaModificacion = ? WHERE id = ?`, params);
      }
      return { ok: true };
    } catch {
      return { error: "No se pudo actualizar la nota en el dispositivo." };
    }
  };

  const eliminar = (id) => {
    const nid = Number(id);
    if (__IsWeb__) {
      lsSetAll(lsGetAll().filter((n) => Number(n.id) !== nid));
      return { ok: true };
    }

    try {
      db.runSync("DELETE FROM notas WHERE id = ?", [nid]);
      return { ok: true };
    } catch {
      return { error: "No se pudo eliminar la nota del dispositivo." };
    }
  };

  // getCardsVacio / getCardsLocal se delegan a notasAPI (no hacen falta en local,
  // pero se exponen con la misma firma para no romper el contrato).
  const getCardsVacio = () => [];
  const getCardsLocal = () => {
    const res = obtenerTodos();
    return Array.isArray(res) ? res : [];
  };

  return {
    obtenerTodos,
    buscarPorCampo,
    obtenerPorId,
    agregar,
    eliminar,
    actualizar,
    actualizarParcial,
    getCardsVacio,
    getCardsLocal,
  };
}

export const notasLocalAPI = buildCollection();

export default { notasLocalAPI };

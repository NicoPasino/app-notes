export function DesglosarFecha(_fecha) {
  const date = new Date(_fecha);

  const D = date.toLocaleDateString('es-ES', { weekday: 'long' }); // "jueves"
  const d = date.getDate(); // "7"
  const dd = d.toString().padStart(2, "0"); // "07"
  const m = date.getMonth() + 1; // "8"
  const mm = m.toString().padStart(2, "0"); // "08"
  const MMMM = date.toLocaleDateString('es-ES', { month: 'long' }); // "agosto"
  const yyyy = date.getFullYear(); // "2026"
  const yy = yyyy.toString().slice(-2); // "26"

  const hour = date.getHours().toString().padStart(2, "0");
  const min = date.getMinutes().toString().padStart(2, "0");
  const sec = date.getSeconds().toString().padStart(2, "0");
  const hora = `${hour}:${min}`;
  const horaLarga = `${hour}:${min}:${sec}`;

  const fechaCorta = date.toLocaleDateString(); // "7/8/2026" - "d/m/yyyy"
  const fecha = `${dd}/${mm}/${yyyy}`; // "07/08/2026"
  const fechaStr = `${dd}-${MMMM}-${yyyy}`; // "07-agosto-2026"
  const fechaConHora = `${fecha} ${hora}`; // "07/08/2026 00:40"
  const fechaConHoraStr = `${fechaStr} ${hora}`; // "07-agosto-2026 00:40"
  const fechaLarga = `${D} ${d} de ${MMMM} de ${yyyy}`; // "jueves 7 de agosto de 2026"
  const fechaDate = `${yyyy}-${mm}-${dd} ${horaLarga}`; // "2026-01-22 00:00:00"
  // const ISO = `${yyyy}-${mm}-${dd}T${horaLarga}`;

  const tiempoTranscurrido = TiempoTranscurrido(date);

  return {
    date,
    fechaCorta,   // "7/8/2026"
    fecha,        // "07/08/2026"
    fechaStr,     // "07-agosto-2026"
    fechaLarga,   // "jueves 7 de agosto de 2026"
    hora,         // "00:40"
    horaLarga,    // "00:40:05"
    fechaConHora, // "27/08/2026 00:40"
    fechaConHoraStr, // "27-agosto-2026 00:40"
    fechaDate,    // "2026-01-22 00:00:00"
    tiempoTranscurrido
  }
}

export function getDate() {
  return DesglosarFecha(new Date());
}

export function getNowUTC() {
  // Devuelve la fecha/hora actual en UTC con formato "YYYY-MM-DD HH:mm:ss" (19 chars).
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getUTCFullYear()}-${p(d.getUTCMonth() + 1)}-${p(d.getUTCDate())} ${p(d.getUTCHours())}:${p(d.getUTCMinutes())}:${p(d.getUTCSeconds())}`;
}

export function converToLocal(fechaUtc) {
  // Se agrega la Z, para que lo reconozca como UTC y lo convierta a la zona local (Ej. Argentina -3hs).
  const dateStr = fechaUtc.endsWith("Z") ? fechaUtc : `${fechaUtc}Z`;
  return DesglosarFecha(dateStr).fechaDate; // "2026-01-22 00:00:00"
}

export function TiempoTranscurrido(fecha) {
  const fechaDada = new Date(fecha);
  const ahora = new Date();
  const diferenciaMs = ahora - fechaDada;

  if (isNaN(diferenciaMs)) return "";

  const segundos = Math.floor(diferenciaMs / 1000);
  if (segundos < 60) return "unos seg.";

  const minutos = Math.floor(segundos / 60);
  if (minutos < 60) return `${minutos} min`;

  const horas = Math.floor(minutos / 60);
  if (horas < 24) return `${horas} ${horas === 1 ? "hora" : "hs"}`;

  const dias = Math.floor(horas / 24);
  if (dias < 30) return `${dias} ${dias === 1 ? "día" : "días"}`;

  const meses = Math.floor(dias / 30);
  if (meses < 12) return `${meses} ${meses === 1 ? "mes" : "meses"}`;

  const años = Math.floor(dias / 365);
  return `${años} ${años === 1 ? "año" : "años"}`;
}
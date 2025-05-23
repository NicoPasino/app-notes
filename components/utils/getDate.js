export function getDate() {
  const date = new Date();
  const d = date.getDate().toString().padStart(2, "0"); // Formato de 2 dígitos
  const meses = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];
  const m = meses[date.getMonth()];
  const y = date.getFullYear();
  const fecha = `${d}/${m}/${y}`;

  const hour = date.getHours().toString().padStart(2, "0");
  const min = date.getMinutes().toString().padStart(2, "0");
  const sec = date.getSeconds().toString().padStart(2, "0");
  const hora = `${hour}:${min}:${sec}`;

  return { fecha, hora };
}

import * as Crypto from "expo-crypto";

// PIN por nota: se guarda como "salt:hash" (SHA-256 con salt aleatorio),
// nunca en claro. Formato validado por validateNote (regexPin).

const SALT_BYTES = 16; // -> 32 chars hex

function bytesToHex(bytes) {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function generarSalt() {
  const bytes = await Crypto.getRandomBytesAsync(SALT_BYTES);
  return bytesToHex(bytes);
}

function sha256Hex(texto) {
  return Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, texto);
}

export async function hashPin(pin) {
  const salt = await generarSalt();
  const hash = await sha256Hex(`${salt}:${pin}`);
  return `${salt}:${hash}`;
}

export async function verifyPin(pin, almacenado) {
  if (typeof almacenado !== "string") return false;
  const [salt, hash] = almacenado.split(":");
  if (!salt || !hash) return false;
  const hashCalculado = await sha256Hex(`${salt}:${pin}`);
  return hashCalculado === hash;
}

export default { hashPin, verifyPin };

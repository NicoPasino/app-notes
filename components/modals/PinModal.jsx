import { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { colores, colorType } from "../utils/colors";

const PIN_MIN = 4;
const MAX_INTENTOS = 5;
const BLOQUEO_MS = 30000;

const soloDigitos = (valor) => valor.replace(/\D/g, "");

// Modal para establecer ("set") o ingresar ("enter") el PIN de una nota.
// onSubmit: async (pin) => ({ ok: true } | { error: "..." })
export function PinModal({
  visible,
  mode = "enter",
  title,
  description,
  onSubmit,
  onSuccess,
  onClose,
}) {
  const esSet = mode === "set";
  const [pin, setPin] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [intentos, setIntentos] = useState(0);
  const [bloqueadoHasta, setBloqueadoHasta] = useState(0);
  const [ahora, setAhora] = useState(() => Date.now());

  const bloqueado = bloqueadoHasta > ahora;

  useEffect(() => {
    if (!bloqueado) return undefined;
    const t = setInterval(() => setAhora(Date.now()), 500);
    return () => clearInterval(t);
  }, [bloqueado]);

  const segundosRestantes = bloqueado
    ? Math.ceil((bloqueadoHasta - ahora) / 1000)
    : 0;

  const enviar = async () => {
    if (loading || bloqueado) return;
    setError("");

    if (pin.length < PIN_MIN) {
      setError(`El PIN debe tener al menos ${PIN_MIN} dígitos.`);
      return;
    }
    if (esSet && pin !== confirmar) {
      setError("Los PIN no coinciden.");
      return;
    }

    setLoading(true);
    try {
      const res = await onSubmit(pin);
      if (res?.error) {
        setError(res.error);
        if (!esSet) {
          const n = intentos + 1;
          if (n >= MAX_INTENTOS) {
            setBloqueadoHasta(Date.now() + BLOQUEO_MS);
            setIntentos(0);
          } else {
            setIntentos(n);
          }
        }
      } else {
        if (onSuccess) onSuccess();
        else onClose();
      }
    } catch {
      setError("Ocurrió un error. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const titulo = title || (esSet ? "Bloquear nota" : "Nota bloqueada");

  if (!visible) return null;

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>{titulo}</Text>
          {description ? (
            <Text style={styles.description}>{description}</Text>
          ) : null}

          <TextInput
            style={styles.input}
            value={pin}
            onChangeText={(v) => setPin(soloDigitos(v).slice(0, 12))}
            placeholder="PIN"
            placeholderTextColor={colores.gris}
            keyboardType="numeric"
            inputMode="numeric"
            secureTextEntry
            maxLength={12}
            editable={!loading && !bloqueado}
            autoCorrect={false}
            autoComplete="off"
            textContentType="none"
            importantForAutofill="no"
            onSubmitEditing={() => (esSet ? null : enviar())}
          />

          {esSet ? (
            <TextInput
              style={styles.input}
              value={confirmar}
              onChangeText={(v) => setConfirmar(soloDigitos(v).slice(0, 12))}
              placeholder="Confirmar PIN"
              placeholderTextColor={colores.gris}
              keyboardType="numeric"
              inputMode="numeric"
              secureTextEntry
              maxLength={12}
              editable={!loading && !bloqueado}
              autoCorrect={false}
              autoComplete="off"
              textContentType="none"
              importantForAutofill="no"
              onSubmitEditing={enviar}
            />
          ) : null}

          {error ? <Text style={styles.error}>{error}</Text> : null}
          {bloqueado ? (
            <Text style={styles.error}>
              Demasiados intentos. Esperá {segundosRestantes}s.
            </Text>
          ) : null}

          <View style={styles.botones}>
            <Pressable
              style={[styles.boton, styles.cancelar]}
              onPress={onClose}
              disabled={loading}
            >
              <Text style={styles.botonTexto}>Cancelar</Text>
            </Pressable>
            <Pressable
              style={[
                styles.boton,
                styles.aceptar,
                (loading || bloqueado) && styles.deshabilitado,
              ]}
              onPress={enviar}
              disabled={loading || bloqueado}
            >
              <Text style={styles.botonTexto}>
                {loading ? "..." : esSet ? "Bloquear" : "Desbloquear"}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0008",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#141430",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#333",
    padding: 20,
    gap: 12,
  },
  title: {
    color: colores.blanco,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    color: colores.gris,
    fontSize: 13,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#0005",
    color: colores.blanco,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#333",
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 18,
    letterSpacing: 6,
    textAlign: "center",
  },
  error: {
    color: colorType.danger,
    fontSize: 13,
    textAlign: "center",
  },
  botones: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 4,
  },
  boton: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  cancelar: {
    backgroundColor: "#333",
  },
  aceptar: {
    backgroundColor: colorType.primary,
  },
  deshabilitado: {
    opacity: 0.5,
  },
  botonTexto: {
    color: colores.blanco,
    fontWeight: "bold",
  },
});

export default PinModal;

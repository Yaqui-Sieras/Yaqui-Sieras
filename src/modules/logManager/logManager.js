import { LOG_CONFIG } from "./configs/logConfig.js";
import { LOG_LEVELS, LOG_TYPES } from "./utils/constantes.js";
import { guardarLog } from "./services/guardarLog.js";

export { LOG_LEVELS, LOG_TYPES };

export async function log({
  nivel = LOG_LEVELS.DEBUG,
  tipo = LOG_TYPES.LOG,
  mensaje = "",
}) {
  const timeStamp = new Date().toISOString();
  const logMessageBase = `[${timeStamp}] [${tipo}] ${mensaje}`;
  const logMessage = `[${nivel}] ${logMessageBase}`;
  console.log(logMessage);

  if (!LOG_CONFIG.save) return;

  const guardado_exitoso = await guardarLog({
    contenido: {
      nivelLog: nivel,
      timestamp: timeStamp,
      tipoLog: tipo,
      mensajeLog: mensaje,
    },
  });

  if (!guardado_exitoso) console.error("[ERROR] No se pudo guardar el log");
}

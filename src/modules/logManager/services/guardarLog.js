import { appendFile, readFile, writeFile } from "fs/promises";
import { LOG_FORMATOS_VALIDOS } from "../utils/constantes.js";
import { LOG_CONFIG } from "../configs/logConfig.js";

async function registrarLog({
  rutaFile,
  contenido,
  formato = "txt",
  encoding = "utf-8",
}) {
  try {
    const { nivelLog, timeStamp, tipoLog, mensajeLog } = contenido;

    if (
      !Object.values(LOG_FORMATOS_VALIDOS).some((f) => f.formato === formato)
    ) {
      throw new Error(`Formato de log no soportado: ${formato}`);
    }

    if (formato === LOG_FORMATOS_VALIDOS.TEXT.formato) {
      const logMessageBase = `[${timeStamp}] [${tipoLog}] ${mensajeLog}\n`;
      const logMessage = `[${nivelLog}] ${logMessageBase}`;
      await appendFile(rutaFile, logMessage, encoding);
      return true;
    }

    if (formato === LOG_FORMATOS_VALIDOS.JSON.formato) {
      let logs = [];

      try {
        const data = await readFile(rutaFile, encoding);
        logs = JSON.parse(data);
      } catch {}

      logs.push(contenido);
      await writeFile(rutaFile, JSON.stringify(logs, null, 2), encoding);
      return true;
    }

    throw new Error(`Formato de log no soportado: ${formato}`);
  } catch (error) {
    console.error(`[ERROR] Fallo al escribir en ${rutaFile}: ${error.message}`);
    return false;
  }
}

export async function guardarLog({
  contenido: {
    nivelLog: nivel,
    timestamp: timeStamp,
    tipoLog: tipo,
    mensajeLog: mensaje,
  },
}) {
  const EXTENSIONES_FORMATOS_LOG = {
    [LOG_FORMATOS_VALIDOS.TEXT.formato]: LOG_FORMATOS_VALIDOS.TEXT.extension,
    [LOG_FORMATOS_VALIDOS.JSON.formato]: LOG_FORMATOS_VALIDOS.JSON.extension,
  };

  const RUTA_FILE_LOG = `${LOG_CONFIG.rutaDirectory}${LOG_CONFIG.nameFile}${
    LOG_CONFIG.extensionBase
  }${EXTENSIONES_FORMATOS_LOG[LOG_CONFIG.formato] || ""}`;

  const registroExitoso = await registrarLog({
    rutaFile: RUTA_FILE_LOG,
    contenido: {
      nivelLog: nivel,
      timestamp: timeStamp,
      tipoLog: tipo,
      mensajeLog: mensaje,
    },
    formato: LOG_CONFIG.formato,
    encoding: LOG_CONFIG.encoding,
  });

  if (!registroExitoso)
    console.error("[ERROR] No se pudo escribir el log en el archivo.");
}

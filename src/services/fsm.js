import { access, readFile, writeFile, constants } from "node:fs/promises";
import { log, LOG_TYPES } from "../modules/logManager/logManager.js";
import { DEFAUL_ENCODING } from "../utils/constantes.js";

const { F_OK } = constants;

export async function existeArchivo({ ruta }) {
  try {
    await access(ruta, F_OK);
    log({
      tipo: LOG_TYPES.SUCCESS,
      mensaje: `Archivo verificado correctamente: ${ruta}`,
    });
    return true;
  } catch (error) {
    log({
      tipo: LOG_TYPES.ALERT,
      mensaje: `El archivo no existe: ${ruta}, mensaje: ${error.message}`,
    });
    return false;
  }
}

export async function leerArchivo({ ruta, encoding = DEFAUL_ENCODING }) {
  try {
    return await readFile(ruta, encoding);
  } catch (error) {
    log({
      tipo: LOG_TYPES.ERROR,
      mensaje: `No se pudo obtener el archivo: ${ruta}, mensaje: ${error.message}`,
    });
    return null;
  }
}

export async function escribirArchivo({
  ruta,
  contenido,
  encoding = DEFAUL_ENCODING,
}) {
  try {
    await writeFile(ruta, contenido, encoding);
    log({
      tipo: LOG_TYPES.SUCCESS,
      mensaje: `Archivo creado correctamente en: ${ruta}`,
    });
    return true;
  } catch (error) {
    log({
      tipo: LOG_TYPES.ERROR,
      mensaje: `No se pudo crear el archivo: ${ruta}, mensaje: ${error.message}`,
    });
    return false;
  }
}

import { existeArchivo, leerArchivo, escribirArchivo } from "./fsm.js";
import { LOG_TYPES, log } from "../modules/logManager/logManager.js";

export async function obtenerDatoPublicado(dato) {
  try {
    const dato_publicado = await leerArchivo({
      ruta: dato.URL_CONSULTA,
    });

    if (dato_publicado === null) {
      log({
        tipo: LOG_TYPES.ERROR,
        mensaje: `No se pudo obtener el último dato publicado: ${dato.NAME}`,
      });
      return null;
    }

    return dato_publicado.trim();
  } catch (error) {
    log({
      tipo: LOG_TYPES.ERROR,
      mensaje: `No se pudo obtener la última ${dato.NAME}: ${error.message}`,
    });
    return null;
  }
}

export async function obtenerDatoEnUso(dato) {
  try {
    const existe = await existeArchivo({
      ruta: dato.EN_USO_ROUTE,
    });

    let dato_en_uso = null;

    if (!existe) {
      log({
        tipo: LOG_TYPES.INFO,
        mensaje: `El archivo ${dato.EN_USO} no existe, creando`,
      });

      dato_en_uso = await escribirArchivo({
        ruta: dato.EN_USO_ROUTE,
        contenido: "",
      });
      if (!dato_en_uso) {
        log({
          tipo: LOG_TYPES.ERROR,
          mensaje: `No se pudo crear el archivo ${dato.EN_USO}`,
        });
        return null;
      }
    } else {
      dato_en_uso = await leerArchivo({
        ruta: dato.EN_USO_ROUTE,
      });
      if (dato_en_uso === null) {
        log({
          tipo: LOG_TYPES.ERROR,
          mensaje: `No se pudo obtener el archivo ${dato.EN_USO}`,
        });
        return null;
      }
    }

    return dato_en_uso.trim();
  } catch (error) {
    log({
      tipo: LOG_TYPES.ERROR,
      mensaje: `No se pudo obtener el dato en uso de ${dato.NAME}: ${error.message}`,
    });
    return null;
  }
}

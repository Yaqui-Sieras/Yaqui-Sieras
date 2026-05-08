import { fileURLToPath } from "url";
import { log, LOG_TYPES } from "./modules/logManager/logManager.js";
import {
  obtenerDatoPublicado,
  obtenerDatoEnUso,
} from "./services/obtenerDato.js";
import { existeArchivo, leerArchivo, escribirArchivo } from "./services/fsm.js";
import { generarREADME } from "./services/generarREADME.js";
import { TEMPLATE_PLACEHOLDERS } from "./utils/constantes.js";

const { DESPEDIDA } = TEMPLATE_PLACEHOLDERS;

async function main() {
  try {
    const last_data_publication = await obtenerDatoPublicado(DESPEDIDA);

    if (!last_data_publication) {
      log({
        tipo: LOG_TYPES.ALERT,
        mensaje: `No hay ${DESPEDIDA.NAME} publicada, o ha fallado la lectura`,
      });
      return;
    }

    const dato_en_uso = await obtenerDatoEnUso(DESPEDIDA);

    if (dato_en_uso === null) {
      log({
        tipo: LOG_TYPES.ERROR,
        mensaje: `No se pudo obtener/crear el archivo de ${DESPEDIDA.NAME} en uso`,
      });
      return;
    }

    if (dato_en_uso === last_data_publication) {
      log({
        tipo: LOG_TYPES.INFO,
        mensaje: "Ya se ha publicado la despedida",
      });
      return;
    }

    const templateREADME_existe = await existeArchivo({
      ruta: "./src/templates/README.tmplt.md",
    });

    if (!templateREADME_existe) {
      log({
        tipo: LOG_TYPES.ERROR,
        mensaje: "No se pudo verificar si el template de README.md existe",
      });
      return;
    }

    const templateREADME = await leerArchivo({
      ruta: "./src/templates/README.tmplt.md",
    });

    if (templateREADME === null) {
      log({
        tipo: LOG_TYPES.ERROR,
        mensaje: "No se pudo obtener el template de README.md",
      });
      return;
    }

    if (templateREADME === "") {
      log({
        tipo: LOG_TYPES.ERROR,
        mensaje: "El template de README.md está vacío",
      });
      return;
    }

    if (!templateREADME.includes(TEMPLATE_PLACEHOLDERS.DESPEDIDA.PLACEHOLDER)) {
      log({
        tipo: LOG_TYPES.ERROR,
        mensaje: "El template no contiene el placeholder",
      });
      return;
    }

    const newREADME = generarREADME({
      template: templateREADME,
      placeHolder: TEMPLATE_PLACEHOLDERS.DESPEDIDA.PLACEHOLDER,
      reemplazo: last_data_publication,
    });

    if (!newREADME) {
      log({
        tipo: LOG_TYPES.ERROR,
        mensaje: "No se pudo generar el nuevo README.md",
      });
      return;
    }

    if (!newREADME.includes(last_data_publication)) {
      log({
        tipo: LOG_TYPES.ERROR,
        mensaje: "El placeholder no se ha reemplazado correctamente",
      });
      return;
    }

    const creacionREADME = await escribirArchivo({
      ruta: "./src/assets/examples/README.md",
      contenido: newREADME,
    });

    if (!creacionREADME) {
      log({
        tipo: LOG_TYPES.ERROR,
        mensaje: "No se pudo crear el nuevo README.md",
      });
      return;
    }

    log({
      tipo: LOG_TYPES.SUCCESS,
      mensaje: "Nuevo README.md creado con los datos nuevos",
    });

    const actualizacion_despedida_en_uso = await escribirArchivo({
      ruta: `${DESPEDIDA.EN_USO_ROUTE}`,
      contenido: last_data_publication,
    });

    if (!actualizacion_despedida_en_uso) {
      log({
        tipo: LOG_TYPES.ERROR,
        mensaje: `No se pudo actualizar el archivo de ${DESPEDIDA.EN_USO}: ${error.message}`,
      });
      return;
    }

    log({
      tipo: LOG_TYPES.SUCCESS,
      mensaje: `${DESPEDIDA.NAME} en uso actualizada`,
    });
  } catch (error) {
    log({
      tipo: LOG_TYPES.ERROR,
      mensaje: `No se pudo ejecutar el script, mensaje: ${error.message}`,
    });
  }
}

// Verificar si el script es el archivo principal
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}

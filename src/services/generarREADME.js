import { LOG_TYPES, log } from "../modules/logManager/logManager.js";

function generarREADME({ template, placeHolder, reemplazo }) {
  try {
    return template.replace(placeHolder, reemplazo);
  } catch (error) {
    log({
      tipo: LOG_TYPES.ERROR,
      mensaje: `Error al reemplazar el placeholder: ${error.message}`,
    });
    return "";
  }
}

export { generarREADME };

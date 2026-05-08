import { LOG_FORMATOS_VALIDOS } from "../utils/constantes.js";

export const LOG_CONFIG = {
  nameFile: "app",
  extensionBase: ".log",
  rutaDirectory: "./logs/",
  formato: LOG_FORMATOS_VALIDOS.TEXT.formato,
  encoding: "utf-8",
  save: false,
};

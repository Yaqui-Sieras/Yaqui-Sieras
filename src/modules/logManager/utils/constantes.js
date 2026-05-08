export const LOG_FORMATOS_VALIDOS = Object.freeze({
  TEXT: Object.freeze({
    formato: "txt",
    extension: "",
  }),
  JSON: Object.freeze({
    formato: "json",
    extension: ".json",
  }),
});

export const LOG_TYPES = Object.freeze({
  LOG: "LOG",
  INFO: "INFO",
  NOTICE: "NOTICE",
  AUDIT: "AUDIT",
  SECURITY: "SECURITY",
  SUCCESS: "SUCCESS",
  ALERT: "ALERT",
  WARNING: "WARNING",
  ERROR: "ERROR",
  FATAL: "FATAL",
});

// Niveles de log, Sin implementar completamente en esta versión
export const LOG_LEVELS = Object.freeze({
  DEBUG: "DEBUG",
  VERBOSE: "VERBOSE",
  TRACE: "TRACE",
});

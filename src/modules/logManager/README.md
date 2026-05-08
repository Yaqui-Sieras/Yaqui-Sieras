# logManager v1.0.0 🚀

## 📌 Descripción

Sistema modular de logging con soporte para múltiples formatos (`txt`, `json`), niveles de log y gestión eficiente de registros.

## 🛠 Instalación

1. Instala el paquete `logManager` en tu proyecto utilizando npm o el gestor de paquetes de tu preferencia.

   ```bash
   npm install logManager
   ```

2. Listo, puedes empezar a utilizar el paquete en tu código.

## 📂 Estructura del proyecto

```
logManager
├── src
│   ├── configs
│   │   └── logConfig.js
│   ├── services
│   │   └── guardarLog.js
│   ├── utils
│   │   └── constantes.js
│   └── main.js
├── .gitignore
├── package.json
└── README.md
```

## 🚀 Uso

```javascript
import { log } from "logManager";

log({ tipo: "INFO", mensaje: "Servidor iniciado correctamente" });
```

Este módulo permite registrar logs en distintos formatos según la configuración establecida. El módulo se encarga de escribir los registros en el archivo de registros correspondiente, así como manejar el nivel de log y la gestión eficiente de los registros.

## ⚙️ Configuración

La configuración de logManager se encuentra en el archivo `logConfig.js`. Este archivo contiene las siguientes propiedades:

```javascript
export const LOG_CONFIG = {
  nameFile: "app", // Nombre del archivo de log
  extensionBase: ".log", // Extensión base del log
  rutaDirectory: "./logs/", // Carpeta donde se almacenan los logs
  formato: LOG_FORMATOS_VALIDOS.TEXT.formato, // Formato por defecto (txt/json)
  encoding: "utf-8",
  save: false, // Determina si los logs deben ser guardados en archivos
};
```

## 📝 Ejemplo de uso

```javascript
import { log } from "logManager";

log({
  nivel: LOG_LEVELS.DEBUG,
  tipo: LOG_TYPES.INFO,
  mensaje: "Servidor iniciado correctamente",
});
```

En este ejemplo, se registra un registro de nivel de log `DEBUG` con el tipo `INFO` y el mensaje "Servidor iniciado correctamente".

## 🔥 Próximos desarrollos

- Implementar **rotación de logs** para evitar acumulación innecesaria.

- Agregar soporte para nuevos formatos de registro (`.CSV`, `.XML`).

- Permitir configuración dinámica a través de un archivo externo o variables de entorno.

- Integración con herramientas de monitoreo.

## 📜 Licencia

Este proyecto está bajo licencia MIT, lo que permite su uso y modificación libremente.

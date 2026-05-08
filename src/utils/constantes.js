export const DEFAUL_ENCODING = "utf-8";

export const ROUTES_BASE = Object.freeze({
  README: "./src/assets/examples/",
  TEMPLATE: "./src/templates/",
  EN_USO: "./src/temp/",
});

export const TEMPLATE_PLACEHOLDERS = Object.freeze({
  DESPEDIDA: Object.freeze({
    NAME: "Despedida",
    PLACEHOLDER: "%{{despedida}}%",
    URL_CONSULTA: "./db/despedidas.txt",
    EN_USO: `despedida_en_uso.txt`,
    EN_USO_ROUTE: `${ROUTES_BASE.EN_USO}despedida_en_uso.txt`,
  }),
});

export const TEMPLATE_README = Object.freeze({
  PLACEHOLDERS: Object.freeze([
    Object.freeze({
      NAME: "Titulo principal",
      PLACEHOLDER: "%{{Titulo_Principal}}%",
      VALUE: "./src/templates/README/placeholders/Titulo_Principal.md",
    }),
    Object.freeze({
      NAME: "Sobre mí",
      PLACEHOLDER: "%{{Sobre_Mi}}%",
      VALUE: "./src/templates/README/placeholders/Sobre_Mi.md",
    }),
    Object.freeze({
      NAME: "Intereses",
      PLACEHOLDER: "%{{Intereses}}%",
      VALUE: "./src/templates/README/placeholders/Intereses.md",
    }),
    Object.freeze({
      NAME: "Conocimientos",
      PLACEHOLDER: "%{{Conocimientos}}%",
      VALUE: "./src/templates/README/placeholders/Conocimientos.md",
    }),
    Object.freeze({
      NAME: "Proyectos Destacados",
      PLACEHOLDER: "%{{Proyectos_Destacados}}%",
      VALUE: "./src/templates/README/placeholders/Proyectos_Destacados.md",
    }),
    Object.freeze({
      NAME: "Aprendiendo",
      PLACEHOLDER: "%{{Aprendiendo}}%",
      VALUE: "./src/templates/README/placeholders/Aprendiendo.md",
    }),
    Object.freeze({
      NAME: "En mi radar",
      PLACEHOLDER: "%{{En_Mi_Radar}}%",
      VALUE: "./src/templates/README/placeholders/En_Mi_Radar.md",
    }),
    Object.freeze({
      NAME: "Estado laboral",
      PLACEHOLDER: "%{{Estado_Laboral}}%",
      VALUE: "./src/templates/README/placeholders/Estado_Laboral.md",
    }),
    Object.freeze({
      NAME: "Contacto",
      PLACEHOLDER: "%{{Contacto}}%",
      VALUE: "./src/templates/README/placeholders/Contacto.md",
    }),
    Object.freeze({
      NAME: "Estadisticas de Github",
      PLACEHOLDER: "%{{Estadisticas_GitHub}}%",
      VALUE: "./src/templates/README/placeholders/Estadisticas_GitHub.md",
    }),
    Object.freeze({
      NAME: "Footer",
      PLACEHOLDER: "%{{Footer}}%",
      VALUE: "./src/templates/README/placeholders/Footer.md",
    }),
  ]),
});

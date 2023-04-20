/**
 * @file front-end.js
 * @description Funciones comunes para todos los módulos de front-end. Debe cargarse la primera de todas.
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 06-feb-2023
 */

/// Espacio de nombres
let Frontend = {};


/// Dirección del MS que funciona como API_GATEWAY
Frontend.API_GATEWAY = "http://localhost:8001"

/// Algunas constantes relacionadas con CSS y HTML
/// Algunas constantes relacionadas con CSS y HTML
Frontend.CLASS_MOSTRAR = "mostrar"
Frontend.CLASS_OCULTAR = "ocultar"

Frontend.ID_SECCION_PRINCIPAL = "seccion-principal"
Frontend.ID_SECCION_PRINCIPAL_TITULO = "seccion-principal-titulo"
Frontend.ID_SECCION_PRINCIPAL_CONTENIDO = "seccion-principal-contenido"


/// Objeto Article dentro Frontend para tratar con el contenido del elemento Article del DOM
Frontend.Article = {}


/**
 * Cambia toda la información del article
 * @param {String} titulo Información para el título del article 
 * @param {String} contenido INformacion para el contenido del article
 * @returns El propio Article para concatenar llamadas
 */
Frontend.Article.actualizar = function (titulo, contenido) {
    // Si son nulos, los sustituyo por la cadena vacía
    titulo = titulo || ""
    contenido = contenido || ""
    // Sustituyo el título y el contenido del articulo
    document.getElementById( Frontend.ID_SECCION_PRINCIPAL_TITULO ).innerHTML = titulo
    document.getElementById( Frontend.ID_SECCION_PRINCIPAL_CONTENIDO ).innerHTML = contenido
    return this;
}


/**
 * Submenú para la opción mostrar datos
 */
const subMenuDatos = document.getElementById("sub-menu-datos");
const mostrarDatos = document.querySelector('a[href="javascript:Plantilla.listarDatos()"]');

mostrarDatos.addEventListener("click", () => {
    subMenuDatos.style.display = "block";
});

document.addEventListener("click", (e) => {
    if (e.target !== mostrarDatos) {
        subMenuDatos.style.display = "none";
    }
});


Frontend.Article.borrarTitulo = function () {
    document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO).innerHTML = "";
    return this;
}

Frontend.Article.borrarContenido = function () {
    document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML = "";
    return this;
}

Frontend.Article.borrar = function () {
    return this.borrarTitulo().borrarContenido();
}

Frontend.Article.aniadirTitulo = function (texto) {
    texto = texto || ""
    document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO).innerHTML += "\n" + texto;
    return this;
}

Frontend.Article.aniadirContenido = function (texto) {
    
    document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO).innerHTML += "\n" + texto;
    return this;
}



Frontend.quitarClase = function (elemento, nombreClase) {
    elemento = (typeof elemento === "string") ? document.getElementById(elemento) : elemento;
    let clase = elemento.getAttribute("class")
    clase = clase?clase:""
    clase = clase.split(" ") // Separo la cadena por " "
        .filter(e => e) // Quito las cadenas vacías que pudiera haber
        .filter(e => e != nombreClase) // Quito la cadena indicada por nombreClase
        .join(" ") // creo una sola cadena con todas las clases separadas por espacios
    elemento.setAttribute("class", clase)

    return this;
}

Frontend.aniadirClase = function (elemento, nombreClase) {
    elemento = (typeof elemento === "string") ? document.getElementById(elemento) : elemento;
    let clase = elemento.getAttribute("class")
    clase = clase?clase:""
    clase = clase.split(" ") // Separo la cadena por " "
        .filter(e => e) // Quito las cadenas vacías que pudiera haber
        .filter(e => e != nombreClase) // Quito la cadena indicada por nombreClase, por si ya estuviera
        .concat(nombreClase) // Añado la clase indicada en nombreClase
        .join(" ") // creo una sola cadena con todas las clases separadas por espacios
    elemento.setAttribute("class", clase)

    return this;
}

Frontend.Article.mostrar = function () {
    let article = document.getElementById(Frontend.ID_SECCION_PRINCIPAL);
    Frontend.quitarClase(Frontend.ID_SECCION_PRINCIPAL, Frontend.CLASS_OCULTAR)
        .aniadirClase(Frontend.ID_SECCION_PRINCIPAL, Frontend.CLASS_MOSTRAR)

}

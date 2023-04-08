/**
 * @file Plantilla.js
 * @description Funciones para el procesamiento de la info enviada por el MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let Plantilla = {};

// Plantilla de datosDescargados vacíos
Plantilla.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "",
    email: "",
    fecha: ""
}


/**
 * Función que descarga la info MS Plantilla al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Plantilla.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio Plantilla
    try {
        const url = Frontend.API_GATEWAY + ruta
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro la info que se han descargado
    let datosDescargados = null
    if (response) {
        datosDescargados = await response.json()
        callBackFn(datosDescargados)
    }
}


/**
 * Función principal para mostrar los datos enviados por la ruta "home" de MS Plantilla
 */
Plantilla.mostrarHome = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene el campo mensaje
    if (typeof datosDescargados.mensaje === "undefined") datosDescargados = this.datosDescargadosNulos

    Frontend.Article.actualizar("Plantilla Home", datosDescargados.mensaje)
}

/**
 * Función principal para mostrar los datos enviados por la ruta "acerca de" de MS Plantilla
 */
Plantilla.mostrarAcercaDe = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene los campos mensaje, autor, o email
    if (typeof datosDescargados.mensaje === "undefined" ||
        typeof datosDescargados.autor === "undefined" ||
        typeof datosDescargados.email === "undefined" ||
        typeof datosDescargados.fecha === "undefined"
    ) datosDescargados = this.datosDescargadosNulos

    const mensajeAMostrar = `<div>
    <p>${datosDescargados.mensaje}</p>
    <ul>
        <li><b>Autor/a</b>: ${datosDescargados.autor}</li>
        <li><b>E-mail</b>: ${datosDescargados.email}</li>
        <li><b>Fecha</b>: ${datosDescargados.fecha}</li>
    </ul>
    </div>
    `;
    Frontend.Article.actualizar("Plantilla Acerca de", mensajeAMostrar)
}


/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
Plantilla.procesarHome = function () {
    this.descargarRuta("/plantilla/", this.mostrarHome);
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
Plantilla.procesarAcercaDe = function () {
    this.descargarRuta("/plantilla/acercade", this.mostrarAcercaDe);
}

/**
 * Función que recupera todos los jugadores llamando al MSPlantilla
 */

Plantilla.recupera = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio proyectos
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getTodos"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todos los proyectos que se han descargado
    let vectorJugadores = null
    if (response) {
        vectorJugadores = await response.json()
        callBackFn(vectorJugadores.data)
    }
}

/**
 * Crea la cabecera para mostrar la info en una tabla
 * @returns cabecera de la tabla
 */

Plantilla.cabeceraTable = function () {
    return `<table class="listado-jugadores">
        <thead>
        <th>Nombre</th><th>Apellidos</th><th>Nacimiento</th><th>Pais</th><th>Mundiales</th><th>Num. Participaciones</th><th>Club Actual</th><th>Posicion</th>
        </thead>
        <tbody>
    `;
}

Plantilla.pieTable = function () {
    return "</tbody></table>";
}

Plantilla.imprime = function (vector) {
    //console.log( vector ) // Para comprobar lo que hay en vector
    let msj = "";
    msj += Plantilla.cabeceraTable();
    vector.forEach(e => msj += Plantilla.cuerpoTr(e))
    msj += Plantilla.pieTable();

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar( "Listado de datos de los jugadores", msj )

}

Plantilla.imprimeNombre = function (vector) {
    //console.log( vector ) // Para comprobar lo que hay en vector
    let msj = "";
    msj += `<table class="listado-jugadores">
    <thead>
    <th>Nombre</th>
    </thead>
    <tbody>`;
    vector.forEach(e => msj += Plantilla.soloNombre(e))
    msj += Plantilla.pieTable();

    Frontend.Article.actualizar( "Listado de nombres de los jugadores", msj )

}

Plantilla.imprimeAlfabeticamenteNombre = function(vector) {
    let msj = "";
    msj += Plantilla.cabeceraTable();
    vector.sort(function(a, b){
        return a.data.nombre.localeCompare(b.data.nombre);
    });
    vector.forEach(e => msj += Plantilla.cuerpoTr(e))
    msj += Plantilla.pieTable();

    Frontend.Article.actualizar( "Listado de jugadores", msj )
}

Plantilla.imprimeAlfabeticamenteApellidos = function(vector){
    let msj = "";
    msj += Plantilla.cabeceraTable();
    vector.sort(function(a, b){
        return a.data.apellidos.localeCompare(b.data.apellidos);
    });
    vector.forEach(e => msj += Plantilla.cuerpoTr(e))
    msj += Plantilla.pieTable();

    Frontend.Article.actualizar( "Listado de jugadores", msj )
}


Plantilla.imprimeOrdenFecha = function(vector){
    let msj = "";
    msj += Plantilla.cabeceraTable();
    vector.sort(function(jugador1, jugador2) {
        let fechaNacimiento1 = new Date(jugador1.data.nacimiento.Año, jugador1.data.nacimiento.mes - 1, jugador1.data.nacimiento.dia);
        let fechaNacimiento2 = new Date(jugador2.data.nacimiento.Año, jugador2.data.nacimiento.mes - 1, jugador2.data.nacimiento.dia);
        return fechaNacimiento1 - fechaNacimiento2;})
    vector.forEach(e => msj += Plantilla.cuerpoTr(e))
    msj += Plantilla.pieTable();

    Frontend.Article.actualizar( "Listado de jugadores", msj )
}

Plantilla.imprimeAlfabeticamentePais = function(vector){
    let msj = "";
    msj += Plantilla.cabeceraTable();
    vector.sort(function(a, b){
        return a.data.pais_nacimiento.localeCompare(b.data.pais_nacimiento);
    });
    vector.forEach(e => msj += Plantilla.cuerpoTr(e))
    msj += Plantilla.pieTable();
    Frontend.Article.actualizar( "Listado de jugadores", msj )
}

Plantilla.imprimeOrdenParticipaciones = function(vector){
    let msj = "";
    msj += Plantilla.cabeceraTable();
    vector.sort(function(a, b){
        return b.data.numParticipaciones - a.data.numParticipaciones;
    });
    vector.forEach(e => msj += Plantilla.cuerpoTr(e))
    msj += Plantilla.pieTable();
    Frontend.Article.actualizar( "Listado de jugadores", msj )
}


Plantilla.cuerpoTr = function (p) {
    const d = p.data;
    const nac = d.nacimiento;
    return `
    <td><em>${d.nombre}</em></td>
    <td>${d.apellidos}</td>
    <td>${nac.dia}/${nac.mes}/${nac.Año}</td>
    <td>${d.pais_nacimiento}</td>
    <td>${d.participacionesMundial}</td>
    <td>${d.numParticipaciones}</td>
    <td>${d.club_actual}</td>
    <td>${d.posicion}</td>
    </tr>
    `;
}

Plantilla.soloNombre = function (p){
    const d = p.data;
    return `<tr><td><em>${d.nombre}</em></td></tr>`
}

Plantilla.listarDatos = function(){
    this.recupera(this.imprime);
}
Plantilla.listarNombre = function(){
     this.recupera(this.imprimeNombre);
}
Plantilla.listarAlfabeticamenteNombre = function(){
    this.recupera(this.imprimeAlfabeticamenteNombre);
}
Plantilla.listarAlfabeticamenteApellidos = function(){
    this.recupera(this.imprimeAlfabeticamenteApellidos);
}
Plantilla.listarAlfabeticamentePais = function(){
    this.recupera(this.imprimeAlfabeticamentePais);
}
Plantilla.listarOrdenFecha = function(){
    this.recupera(this.imprimeOrdenFecha);
}
Plantilla.listarOrdenParticipaciones = function(){
    this.recupera(this.imprimeOrdenParticipaciones);
}
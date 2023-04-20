/**
 * @file Plantilla.js
 * @description Funciones para el procesamiento de la info enviada por el MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let Plantilla = {};
var hacia_donde;
var pos = 0;


Plantilla.jugadorMostrado = null
// Plantilla de datosDescargados vacíos
Plantilla.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "",
    email: "",
    fecha: ""
}

Plantilla.plantillaTags = {
    "ID": "### ID ###",
    "NOMBRE": "### NOMBRE ###",
    "APELLIDOS": "### APELLIDOS ###",
    "DIA": "### DIA ###",
    "MES": "### MES ###",
    "AÑO": "### AÑO ###",
    "PAIS_NACIMIENTO": "### PAIS ###",
    "PARTICIPACIONESMUNDIAL": "### PARTICIPACIONES MUNDIAL ###",
    "NUMPARTICIPACIONES": "### NUMPARTICIPACIONES ###",
    "CLUB_ACTUAL": "### CLUB ACTUAL ###",
    "POSICION": "### POSICION ###"

}

Plantilla.plantillaTablaJugadores = {}


// Cabecera de la tabla
Plantilla.plantillaTablaJugadores.cabecera = `<table width="100%" class="listado-jugadores">
                    <thead>
                        <th width="10%">Id</th>
                        <th width="20%">Nombre</th>
                        <th width="20%">Apellidos</th>
                        <th width="10%">Fecha de nacimiento</th>
                        <th width="15%">País</th>
                        <th width="15%">Participaciones mundial</th>
                        <th width="15%">Número de participaciones</th>
                        <th width="15%">Club actual</th>
                        <th width="15%">Posición</th>
                    </thead>
                    <tbody>
    `;

// Elemento TR que muestra los datos de una persona
Plantilla.plantillaTablaJugadores.cuerpo = `
    <tr>
        <td>${Plantilla.plantillaTags.ID}</td>
        <td>${Plantilla.plantillaTags.NOMBRE}</td>
        <td>${Plantilla.plantillaTags.APELLIDOS}</td>
        <td>${Plantilla.plantillaTags.DIA}/${Plantilla.plantillaTags.MES}/${Plantilla.plantillaTags.AÑO}</td>
        <td>${Plantilla.plantillaTags.PAIS_NACIMIENTO}</td>
        <td>${Plantilla.plantillaTags.PARTICIPACIONESMUNDIAL}</td>
        <td>${Plantilla.plantillaTags.NUMPARTICIPACIONES}</td>
        <td>${Plantilla.plantillaTags.CLUB_ACTUAL}</td>
        <td>${Plantilla.plantillaTags.POSICION}</td>
        
    </tr>
    `;

// Pie de la tabla
Plantilla.plantillaTablaJugadores.pie = `        </tbody>
             </table>
             `;



Plantilla.plantillaFormularioJugador = {}


Plantilla.plantillaFormularioJugador.formulario = `
<form method='post' action=''>
    <table width="100%" class="listado-jugadores">
        <thead>
        <th width="10%">Id</th>
        <th width="20%">Nombre</th>
        <th width="20%">Apellidos</th>
        <th width="10%">Fecha de nacimiento</th>
        <th width="15%">País</th>
        <th width="15%">Participaciones mundial</th>
        <th width="15%">Número de participaciones</th>
        <th width="15%">Club actual</th>
        <th width="15%">Posición</th>
        <th width="25%">Acciones</th>
        </thead>
        <tbody>
            <tr title="${Plantilla.plantillaTags.ID}">
                <td><input type="text" class="form-jug-elemento" disabled id="form-jug-id"
                        value="${Plantilla.plantillaTags.ID}" 
                        name="id_jug"/></td>

                <td><input type="text" class="form-jug-elemento editable" disabled
                        id="form-jug-nombre" required value="${Plantilla.plantillaTags.NOMBRE}" 
                        name="nombre_jug"/></td>

                <td><input type="text" class="form-jug-elemento editable" disabled
                        id="form-jug-apellidos" value="${Plantilla.plantillaTags.APELLIDOS}" 
                        name="apellidos_jug"/></td>

                <td><input type="text" class="form-jug-elemento editable" disabled
                        id="form-jug-nac" required value="${Plantilla.plantillaTags.DIA}/${Plantilla.plantillaTags.MES}/${Plantilla.plantillaTags.AÑO}" 
                        name="nac_jug"/></td>

                <td><input type="text" class="form-jug-elemento editable" disabled
                        id="form-jug-pais" required value="${Plantilla.plantillaTags.PAIS_NACIMIENTO}" 
                        name="pais_jug"/></td>

                <td><input type="text" class="form-jug-elemento editable" disabled
                        id="form-jug-pais" required value="${Plantilla.plantillaTags.PARTICIPACIONESMUNDIAL}" 
                        name="pais_jug"/></td>
                
                <td><input type="number" class="form-jug-elemento editable" disabled
                        id="form-jug-numParticipaciones" required value="${Plantilla.plantillaTags.NUMPARTICIPACIONES}" 
                        name="numPart_jug"/></td>

                    <td><input type="text" class="form-jug-elemento editable" disabled
                        id="form-jug-club" required value="${Plantilla.plantillaTags.NUMPARTICIPACIONES}" 
                        name="numPart_jug"/></td>
                <td><input type="text" class="form-jug-elemento editable" disabled
                        id="form-jug-posicion" required value="${Plantilla.plantillaTags.POSICION}" 
                        name="posicion_jug"/></td>

                <td>
                    <div><a href="javascript:Plantilla.editar()" class="opcion-secundaria mostrar">Editar</a></div>
                    <div><a href="javascript:Plantilla.guardar()" class="opcion-terciaria editar ocultar">Guardar</a></div>
                    <div><a href="javascript:Plantilla.cancelar()" class="opcion-terciaria editar ocultar">Cancelar</a></div>
                </td>
            </tr>
        </tbody>
    </table>
</form>
`;
             
Plantilla.plantillaFormularioJugador.actualiza = function(jugador){
    return Plantilla.sustituyeTags(this.formulario, jugador)
}


Plantilla.habilitarDeshabilitarCamposEditables = function (deshabilitando) {
    deshabilitando = (typeof deshabilitando === "undefined" || deshabilitando === null) ? true : deshabilitando
    for (let campo in Plantilla.form) {
        document.getElementById(Plantilla.form[campo]).disabled = deshabilitando
    }
    return this
}

Plantilla.deshabilitarCamposEditables = function () {
    Plantilla.habilitarDeshabilitarCamposEditables(true)
    return this
}

Plantilla.habilitarCamposEditables = function () {
    Plantilla.habilitarDeshabilitarCamposEditables(false)
    return this
}


Plantilla.opcionesMostrarOcultar = function (classname, mostrando) {
    let opciones = document.getElementsByClassName(classname)
    let claseQuitar = mostrando ? Frontend.CLASS_OCULTAR : Frontend.CLASS_MOSTRAR
    let claseAniadir = !mostrando ? Frontend.CLASS_OCULTAR : Frontend.CLASS_MOSTRAR

    for (let i = 0; i < opciones.length; ++i) {
        Frontend.quitarClase(opciones[i], claseQuitar)
            .aniadirClase(opciones[i], claseAniadir)
    }
    return this
}

Plantilla.ocultarOpcionesSecundarias = function () {
    this.opcionesMostrarOcultar("opcion-secundaria", false)
    return this
}

Plantilla.mostrarOpcionesSecundarias = function () {
    this.opcionesMostrarOcultar("opcion-secundaria", true)
    return this
}

Plantilla.mostrarOcionesTerciariasEditar = function () {
    this.opcionesMostrarOcultar("opcion-terciaria editar", true)
    return this
}

Plantilla.ocultarOcionesTerciariasEditar = function () {
    this.opcionesMostrarOcultar("opcion-terciaria editar", false)
    return this
}

Plantilla.editar = function () {
    this.ocultarOpcionesSecundarias()
    this.mostrarOcionesTerciariasEditar()
    this.habilitarCamposEditables()
}

Plantilla.cancelar = function () {
    this.imprimeJugador(this.recuperaDatosAlmacenados())
    this.deshabilitarCamposEditables()
    this.ocultarOcionesTerciariasEditar()
    this.mostrarOpcionesSecundarias()
}

Plantilla.recuperaDatosAlmacenados = function () {
    return this.jugadorMostrado;
}

Plantilla.jugadorComoForm = function (jugador) {
    return Plantilla.plantillaFormularioJugador.actualiza( jugador );
}

Plantilla.almacenaDatos = function (jugador) {
    Plantilla.jugadorMostrado = jugador;
}



Plantilla.sustituyeTags = function (plantilla, jugador) {
    return plantilla
        .replace(new RegExp(Plantilla.plantillaTags.ID, 'g'), jugador.ref['@ref'].id)
        .replace(new RegExp(Plantilla.plantillaTags.NOMBRE, 'g'), jugador.data.nombre)
        .replace(new RegExp(Plantilla.plantillaTags.APELLIDOS, 'g'), jugador.data.apellidos)
        .replace(new RegExp(Plantilla.plantillaTags.DIA, 'g'), jugador.data.nacimiento.dia)
        .replace(new RegExp(Plantilla.plantillaTags.MES, 'g'), jugador.data.nacimiento.mes)
        .replace(new RegExp(Plantilla.plantillaTags.AÑO, 'g'), jugador.data.nacimiento.Año)
        .replace(new RegExp(Plantilla.plantillaTags.PAIS_NACIMIENTO, 'g'), jugador.data.pais_nacimiento)
        .replace(new RegExp(Plantilla.plantillaTags.PARTICIPACIONESMUNDIAL, 'g'), jugador.data.participacionesMundial)
        .replace(new RegExp(Plantilla.plantillaTags.NUMPARTICIPACIONES, 'g'), jugador.data.numParticipaciones)
        .replace(new RegExp(Plantilla.plantillaTags.CLUB_ACTUAL, 'g'), jugador.data.club_actual)
        .replace(new RegExp(Plantilla.plantillaTags.POSICION, 'g'), jugador.data.posicion)
}

/**
 * Actualiza el cuerpo de la tabla con los datos de la persona que se le pasa
 * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */
Plantilla.plantillaTablaJugadores.actualiza = function (jugador) {
    return Plantilla.sustituyeTags(this.cuerpo, jugador)
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
 * Función principal para mostrarJugador los datos enviados por la ruta "home" de MS Plantilla
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
 * Función principal para mostrarJugador los datos enviados por la ruta "acerca de" de MS Plantilla
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


Plantilla.recuperaUnJugador = async function (idJug, callBackFn) {
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getPorId/" + idJug

        const response = await fetch(url);
        if (response) {
            const jugador1 = await response.json()
            callBackFn(jugador1)
        }
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
    }
}
/**
 * Crea la cabecera para mostrarJugador la info en una tabla
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
    let msj = Plantilla.plantillaTablaJugadores.cabecera
    vector.forEach(e => msj += Plantilla.plantillaTablaJugadores.actualiza(e))
    msj += Plantilla.plantillaTablaJugadores.pie

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
    
    let msj = Plantilla.plantillaTablaJugadores.cabecera
    vector.sort(function(a, b){
        return a.data.nombre.localeCompare(b.data.nombre);
    });
    
    vector.forEach(e => msj += Plantilla.plantillaTablaJugadores.actualiza(e))
    msj += Plantilla.plantillaTablaJugadores.pie

    Frontend.Article.actualizar( "Listado de jugadores", msj )
}

Plantilla.imprimeAlfabeticamenteApellidos = function(vector){
    let msj = Plantilla.plantillaTablaJugadores.cabecera
    vector.sort(function(a, b){
        return a.data.apellidos.localeCompare(b.data.apellidos);
    });
    vector.forEach(e => msj += Plantilla.plantillaTablaJugadores.actualiza(e))
    msj += Plantilla.plantillaTablaJugadores.pie

    Frontend.Article.actualizar( "Listado de jugadores", msj )
}


Plantilla.imprimeOrdenFecha = function(vector){
    let msj = Plantilla.plantillaTablaJugadores.cabecera
    vector.sort(function(jugador1, jugador2) {
        let fechaNacimiento1 = new Date(jugador1.data.nacimiento.Año, jugador1.data.nacimiento.mes - 1, jugador1.data.nacimiento.dia);
        let fechaNacimiento2 = new Date(jugador2.data.nacimiento.Año, jugador2.data.nacimiento.mes - 1, jugador2.data.nacimiento.dia);
        return fechaNacimiento1 - fechaNacimiento2;})
        vector.forEach(e => msj += Plantilla.plantillaTablaJugadores.actualiza(e))
        msj += Plantilla.plantillaTablaJugadores.pie

    Frontend.Article.actualizar( "Listado de jugadores", msj )
}

Plantilla.imprimeAlfabeticamentePais = function(vector){
    let msj = Plantilla.plantillaTablaJugadores.cabecera
    vector.sort(function(a, b){
        return a.data.pais_nacimiento.localeCompare(b.data.pais_nacimiento);
    });
    vector.forEach(e => msj += Plantilla.plantillaTablaJugadores.actualiza(e))
    msj += Plantilla.plantillaTablaJugadores.pie
    Frontend.Article.actualizar( "Listado de jugadores", msj )
}

Plantilla.imprimeOrdenParticipaciones = function(vector){
    let msj = Plantilla.plantillaTablaJugadores.cabecera
    vector.sort(function(a, b){
        return b.data.numParticipaciones - a.data.numParticipaciones;
    });
    vector.forEach(e => msj += Plantilla.plantillaTablaJugadores.actualiza(e))
    msj += Plantilla.plantillaTablaJugadores.pie
    Frontend.Article.actualizar( "Listado de jugadores", msj )
}

Plantilla.imprimeAlfabeticamenteClub = function(vector){
    let msj = Plantilla.plantillaTablaJugadores.cabecera
    vector.sort(function(a, b){
        return a.data.club_actual.localeCompare(b.data.club_actual);
    });
    vector.forEach(e => msj += Plantilla.plantillaTablaJugadores.actualiza(e))
    msj += Plantilla.plantillaTablaJugadores.pie
    Frontend.Article.actualizar( "Listado de jugadores", msj )
}

Plantilla.imprimeAlfabeticamentePosicion = function(vector){
    let msj = Plantilla.plantillaTablaJugadores.cabecera
    vector.sort(function(a, b){
        return a.data.posicion.localeCompare(b.data.posicion);
    });
    vector.forEach(e => msj += Plantilla.plantillaTablaJugadores.actualiza(e))
    msj += Plantilla.plantillaTablaJugadores.pie
    Frontend.Article.actualizar( "Listado de jugadores", msj )
}

Plantilla.soloNombre = function (p){
    const d = p.data;
    return `<tr><td><em>${d.nombre}</em></td></tr>`
}



Plantilla.imprimeJugador = function (jugador) {
    // console.log(persona) // Para comprobar lo que hay en vector
    let msj = Plantilla.jugadorComoForm(jugador)
    
    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Mostrar un jugador", msj)
    // Actualiza el objeto que guarda los datos mostrados
    Plantilla.almacenaDatos(jugador)
}
Plantilla.imprimeOtroJugador = function (vector) {
    //console.log(hacia_donde);
    if (hacia_donde == 1){
        if (pos >= vector.length - 1){
            pos = 0;
        }
        //console.log(pos)
        pos++
        //console.log(vector[pos].ref['@ref'].id);
        Plantilla.imprimeJugador(vector[pos]);
    }

    if (hacia_donde == -1){
        if (pos <= 0){
            pos = vector.length;
        }
        //console.log(pos)
        pos--
        //console.log(vector[pos].ref['@ref'].id);
        Plantilla.imprimeJugador(vector[pos]);
    }
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
Plantilla.listarAlfabeticamenteClub = function(){
    this.recupera(this.imprimeAlfabeticamenteClub);
}
Plantilla.listarAlfabeticamentePosicion = function(){
    this.recupera(this.imprimeAlfabeticamentePosicion);
}
Plantilla.mostrarJugador = function (idJug) {
    this.recuperaUnJugador(idJug, this.imprimeJugador);
}
Plantilla.mostrarOtroJugador = function (hacia){
    hacia_donde = hacia;
    this.recupera(this.imprimeOtroJugador); 
}


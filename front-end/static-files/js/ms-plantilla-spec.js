/**
 * @file ms-plantilla-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Plantilla en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const elementoTitulo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const elementoContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOME = "Plantilla Home"
const TITULO_ACERCA_DE = "Plantilla Acerca de"
const TITULO_MOSTRAR_NOMBRES = "Listado de nombres de los jugadores"
const TITULO_MOSTRAR_DATOS = "Listado de datos de los jugadores"
const TITULO_MOSTRAR_ALFABETICAMENTE = "Listado de jugadores"

const datosDescargadosPrueba = {
    mensaje: "Mensaje de prueba descargado",
    autor: "Prueba de autor",
    email: "Prueba de email",
    fecha: "00/00/0000"
}

let jug1= {
    data: {
        nombre: "Tijana",
        apellidos: "Boskovic",
        nacimiento: {
          dia: 8,
          mes: 3,
          año: 1997
        },
        pais_nacimiento: "Serbia",
        participacionesMundial: [
          2014,
          2018
        ],
        numParticipaciones: 2,
        club_actual: "Eczacibasi VitrA Istanbul",
        posicion: "Opuesta"
      }
  }

let jugadores = [
{
    data: {
    nombre: "Tijana",
    apellidos: "Boskovic",
    nacimiento: {
        dia: 8,
        mes: 3,
        Año: 1997
    },
    pais_nacimiento: "Serbia",
    participacionesMundial: [
        2014,
        2018
    ],
    numParticipaciones: 2,
    club_actual: "Eczacibasi VitrA Istanbul",
    posicion: "Opuesta"
    }
},
{
    data: {
    nombre: "Nataliya",
    apellidos: "Goncharova",
    nacimiento: {
        dia: 1,
        mes: 6,
        Año: 1989
    },
    pais_nacimiento: "Rusia",
    participacionesMundial: [
        2010,
        2014,
        2018
    ],
    numParticipaciones: 3,
    club_actual: "Dinamo Moscow",
    posicion: "Opuesta"
    }
},
{
    data: {
      nombre: "Facundo",
      apellidos: "Conte",
      nacimiento: {
        dia: 12,
        mes: 8,
        Año: 1989
      },
      pais_nacimiento: "Argentina",
      participacionesMundial: [
        2010,
        2014,
        2018,
        2022
      ],
      numParticipaciones: 4,
      club_actual: "Modena Volley",
      posicion: "Receptor-punta"
    }
  }
  
];
  
// Función para esperar y dar tiempo a que responda el microservicio
function esperar(ms) {
    var inicio = new Date().getTime();
    var fin = 0;
    while ((fin - inicio) < ms) {
        fin = new Date().getTime();
    }
}



// SPECS a probar

describe("Plantilla.mostrarHome: ", function () {

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Plantilla.mostrarHome()
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Plantilla.mostrarHome(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            Plantilla.mostrarHome({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            Plantilla.mostrarHome({ foo: "bar" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            Plantilla.mostrarHome(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(datosDescargadosPrueba.mensaje)
        })
})


describe("Plantilla.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Plantilla.mostrarAcercaDe()
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Plantilla.mostrarAcercaDe(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            Plantilla.mostrarAcercaDe({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            Plantilla.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })
    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            Plantilla.mostrarAcercaDe(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.autor) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.email) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.fecha) >= 0).toBeTrue()
        })

    
})
describe("Plantilla.soloNombre: ", function () {
    it("muestra el nombre del jugador en cuestión correctamente",
        function () {
            Plantilla.soloNombre(jug1)
            expect(Plantilla.soloNombre(jug1)).toBe(`<tr><td><em>${jug1.data.nombre}</em></td></tr>`)
        })

    
})

describe("Plantilla.imprimeNombre: ", function (){
    it("Muestra correctamente el titulo de la tabla. ",
    function (){
        Plantilla.imprimeNombre(jugadores)
        expect(elementoTitulo.innerHTML).toBe(TITULO_MOSTRAR_NOMBRES)
    }
    )

    it("Muestra correctamente el contenido de la tabla con los dos jugadores de prueba. ",
    function (){
        Plantilla.imprimeNombre(jugadores)
        expect(elementoContenido.innerHTML.search(jugadores[0].data.nombre)>= 0).toBeTrue();
        expect(elementoContenido.innerHTML.search(jugadores[1].data.nombre)>= 0).toBeTrue();
    }
    )
})

describe("Plantilla.listar: ", function (){
    it("Muestra correctamente el titulo de la tabla. ",
    function (){
        Plantilla.imprime(jugadores)
        expect(elementoTitulo.innerHTML).toBe(TITULO_MOSTRAR_DATOS)
    }
    )
    it("Muestra correctamente el contenido de la tabla con los dos jugadores de prueba. ",
    function (){
        Plantilla.imprime(jugadores)
        expect(elementoContenido.innerHTML.search(jugadores[0].data.nombre)>= 0).toBeTrue();
        expect(elementoContenido.innerHTML.search(jugadores[0].data.pais_nacimiento)>= 0).toBeTrue();
        expect(elementoContenido.innerHTML.search(jugadores[0].data.apellidos)>= 0).toBeTrue();
        expect(elementoContenido.innerHTML.search(jugadores[0].data.nombre)>= 0).toBeTrue();
        expect(elementoContenido.innerHTML.search(jugadores[1].data.numParticipaciones)>= 0).toBeTrue();
        expect(elementoContenido.innerHTML.search(jugadores[1].data.posicion)>= 0).toBeTrue();
        expect(elementoContenido.innerHTML.search(jugadores[1].data.club_actual)>= 0).toBeTrue();
    }
    )
})

describe("Plantilla.listarAlfabeticamenteNombre: ", function (){
    it("Muestra correctamente el titulo de la tabla. ",
    function (){
        Plantilla.imprimeAlfabeticamenteNombre(jugadores)
        expect(elementoTitulo.innerHTML).toBe(TITULO_MOSTRAR_ALFABETICAMENTE)
    }
    )

    it("Ordena correctamente el vector de jugadores ",
    function (){
        // Tijana, Nataliya, Facundo ---> Facundo, Nataliya, Tijana
        Plantilla.imprimeAlfabeticamenteNombre(jugadores)
        expect(jugadores[0].data.nombre).toBe("Facundo");
        expect(jugadores[1].data.nombre).toBe("Nataliya");
        expect(jugadores[2].data.nombre).toBe("Tijana");
    }
    )
})

describe("Plantilla.listarAlfabeticamenteApellidos: ", function (){
    it("Muestra correctamente el titulo de la tabla. ",
    function (){
        Plantilla.imprimeAlfabeticamenteApellidos(jugadores)
        expect(elementoTitulo.innerHTML).toBe(TITULO_MOSTRAR_ALFABETICAMENTE)
    }
    )

    it("Ordena correctamente el vector de jugadores ",
    function (){
        Plantilla.imprimeAlfabeticamenteApellidos(jugadores)
        expect(jugadores[0].data.apellidos).toBe("Boskovic");
        expect(jugadores[1].data.apellidos).toBe("Conte");
        expect(jugadores[2].data.apellidos).toBe("Goncharova");
    }
    )
})

describe("Plantilla.listarAlfabeticamentePais: ", function (){
    it("Muestra correctamente el titulo de la tabla. ",
    function (){
        Plantilla.imprimeAlfabeticamentePais(jugadores)
        expect(elementoTitulo.innerHTML).toBe(TITULO_MOSTRAR_ALFABETICAMENTE)
    }
    )

    it("Ordena correctamente el vector de jugadores ",
    function (){
        Plantilla.imprimeAlfabeticamentePais(jugadores)
        expect(jugadores[0].data.pais_nacimiento).toBe("Argentina");
        expect(jugadores[1].data.pais_nacimiento).toBe("Rusia");
        expect(jugadores[2].data.pais_nacimiento).toBe("Serbia");
    }
    )
})

describe("Plantilla.listarOrdenFecha: ", function (){
    it("Muestra correctamente el titulo de la tabla. ",
    function (){
        Plantilla.imprimeOrdenFecha(jugadores)
        expect(elementoTitulo.innerHTML).toBe(TITULO_MOSTRAR_ALFABETICAMENTE)
    }
    )

    it("Ordena correctamente el vector de jugadores ",
    function (){
        Plantilla.imprimeOrdenFecha(jugadores)
        expect(jugadores[0].data.nacimiento).toEqual({dia:1, mes:6, Año:1989});
        expect(jugadores[1].data.nacimiento).toEqual({dia: 12, mes: 8, Año: 1989});
        expect(jugadores[2].data.nacimiento).toEqual({dia: 8, mes: 3, Año: 1997});
    }
    )
})

describe("Plantilla.listarOrdenParticipaciones: ", function (){
    it("Muestra correctamente el titulo de la tabla. ",
    function (){
        Plantilla.imprimeOrdenParticipaciones(jugadores)
        expect(elementoTitulo.innerHTML).toBe(TITULO_MOSTRAR_ALFABETICAMENTE)
    }
    )

    it("Ordena correctamente el vector de jugadores ",
    function (){
        Plantilla.imprimeOrdenParticipaciones(jugadores)
        expect(jugadores[0].data.numParticipaciones).toEqual(4);
        expect(jugadores[1].data.numParticipaciones).toEqual(3);
        expect(jugadores[2].data.numParticipaciones).toEqual(2);
    }
    )
})
/*
IMPORTANTE
==========

Las pruebas TDD que se encargan de probar las conexiones con el microservicio desde el cliente son difíciles de probar 
dado que requieren solucionar temas de sincronización. 
Esto afecta a los métodos:
 - Plantilla.descargarRuta
 - Plantilla.procesarAcercaDe
 - Plantilla.procesarHome

 Las soluciones propuestas en distintos sitios web no han producido el resultado esperado, 
 por tanto: para esta práctica, se pueden dejar SIN HACER.

 */

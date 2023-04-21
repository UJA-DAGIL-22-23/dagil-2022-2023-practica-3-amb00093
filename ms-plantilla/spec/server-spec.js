/**
 * @file server-spec.js
 * @description Fichero con la especificación de las pruebas TDD para server.js del MS MS Plantilla
 *              Este fichero DEBE llamarse server-spec.js
 *              Este fichero DEBE ubicarse en el subdirectorio spec/
 * @author Víctor M. Rivas Santos <vrivas@ujaen.es>
 * @date 03-Feb-2023
 */


const supertest = require('supertest');
const assert = require('assert')
const app = require('../server');

/**
 * Test para las rutas "estáticas": / y /acerdade
 */
describe('Servidor PLANTILLA:', () => {
  describe('Rutas / y /acercade', () => {
    it('Devuelve MS Plantilla Home Page', (done) => {
      supertest(app)
        .get('/')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.hasOwnProperty('mensaje'));
          assert(res.body.mensaje === "Microservicio MS Plantilla: home");

        })
        .end((error) => { error ? done.fail(error) : done() })
    });
    it('Devuelve MS Plantilla Acerca De', (done) => {
      supertest(app)
        .get('/acercade')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( "BODY ACERCA DE ", res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.hasOwnProperty('mensaje'));
          assert(res.body.mensaje === "Microservicio MS Plantilla: acerca de");

        })
        .end((error) => { error ? done.fail(error) : done() })
    });
  })
});
  /**
   * Tests para acceso a la BBDD
   */
  describe('Acceso a BBDD:', () => {
    it('Devuelve Samantha al consultar mediante test_db', (done) => {
      supertest(app)
        .get('/test_db')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.data[0].data.hasOwnProperty('nombre'));
          assert(res.body.data[0].data.nombre === "Samantha");

        })
        .end((error) => { error ? done.fail(error) : done(); }
        );
    });
    it('Devuelve un vector de tamaño 11 al consultar mediante getTodos', (done)=>{
      supertest(app)
        .get('/getTodos')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          assert(res.body.data.length == 11);
        })
        
        .end((error) => {error ? done.fail(error) : done(); }
        );
  })

  it('Devuelve JEKT Stings al recuperar los datos de la Persona con id 360465947460370637 mediante getPorId', (done) => {
    supertest(app)
      .get('/getPorId/360465947460370637')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
        assert(res.body.data.hasOwnProperty('club_actual'));
        assert(res.body.data.club_actual === "JTEKT Stings");
      })
      .end((error) => { error ? done.fail(error) : done(); }
      );
  })

  it('Devuelve 1999 al recuperar los datos de la Persona con id 360465837962821837 mediante setTodo', (done) => {
    const jugador = {
      id_jug: '360465837962821837',
      nombre: 'NOMBRE_TEST',
      apellidos: 'Apellidos',
      nacimiento: 1998,
      pais_nacimiento: 'España',
      participacionesMundial: [2014, 2018],
      numParticipaciones: 2,
      club_actual: 'Jaen Volley',
      posicion: 'Opuesto'
      
    };
    supertest(app)
      .post('/setTodo')
      .send(jugador)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(function (res) {
        console.log( "Server-spec , /setTodo res.body", res.body ); // Para comprobar qué contiene exactamente res.body
        assert(res.body.data.hasOwnProperty('nacimiento'));
        assert(res.body.data.nacimiento == 1998);
      })
      .end((error) => { error ? done.fail(error) : done(); }
      );
    })

});




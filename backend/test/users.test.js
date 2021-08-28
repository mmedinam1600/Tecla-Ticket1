const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:3000';

//CORS No autoriza la petición, pero si funciona
describe("Rutas de usuario test usando EXPECT interface desde CHAI module ", function() {
    it("Devuelve todos los usuarios registrados en la base de datos", (done) => {
        chai.request(url)
            .get("/users")
            .end(function(err, res) {
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('data');
                expect(res).to.have.status(200);
                done();
            });
    });
    it("Devuelve un usuario registrado por su id", (done) => {
        chai.request(url)
            .get("/users/308f4a32-09a7-57e0-8cee-6c6d1c335d76")
            .end(function(err, res) {
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('data');
                expect(res).to.have.status(200);
                done();
            });
    });
});
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:3000';


describe("Rutas de autentificacion test usando EXPECT interface desde CHAI module ", function() {
    it("Devuelve un token que indica el inicio de sesion. El token permite realizar solicitudes", (done) => {
        chai.request(url)
            .post("/login")
            .send({
                email: "admin@system.com",
                password: "123456"
            })
            .end(function(err, res) {
                expect(res.body).to.have.property('token');
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('msg');
                expect(res).to.have.status(200);
                done();
            });
    });

    //Marcará error por que no le mando el token en los headers
    it("Devuelve el estado de la sesión de un token", (done) => {
        chai.request(url)
            .get("/checkSession")
            .end(function(err, res) {
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('message');
                expect(res.body).to.have.property('nickname');
                expect(res.body).to.have.property('email');
                expect(res).to.have.status(200);
                done();
            });
    });

});

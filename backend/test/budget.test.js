const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:3000';


//CORS No autoriza la petición, pero si funciona
describe("Rutas de presupuestos test usando EXPECT interface desde CHAI module ", function() {
    it("Devuelve la información del  presupuesto creado", (done) => {
        chai.request(url)
            .post("/budgets")
            .send({
                version: "1.0.0",
                concept_administrative_cost: [500, 1500],
                concept_AC: ["mantenimiento", "Concepto 2"],
                concept_R: ["Socios"],
                concept_revenue: [5000],
                concept_DC: ["Refacciones"],
                concept_direct_costs: [2000],
                title: ["Enero"],
                revenue: [6000],
                resources: ["Recurso 1"],
                monthly_cost: [200],
                monthly_resource: [700],
                user_email: "admin@system.com",
            })
            .end(function(err, res) {
                expect(res.body).to.have.property('msg');
                expect(res.body).to.have.property('user');
                expect(res.body).to.have.property('budget');
                expect(res.body).to.have.property('budgetUsers');
                expect(res.body).to.have.property('administrativeCosts');
                expect(res.body).to.have.property('revenuesDB');
                expect(res.body).to.have.property('resourcesDB');
                expect(res.body).to.have.property('directCosts');
                expect(res.body).to.have.property('cashFlow');
                expect(res).to.have.status(200);
                done();
            });
    });

    it("Devuelve los datos generales de un presupuesto por su ID", (done) => {
        chai.request(url)
            .get("/budgets/6")
            .end(function(err, res) {
                expect(res.body).to.have.property('budget_id');
                expect(res.body).to.have.property('project');
                expect(res.body).to.have.property('version');
                expect(res).to.have.status(200);
                done();
            });
    });

    it("Devuelve un mensaje satisfactorio cuando se elimina un presupuesto", (done) => {
        chai.request(url)
            .delete("budgets/9")
            .end(function(err, res) {
                expect(res.body).to.have.property('msg');
                expect(res).to.have.status(200);
                done();
            });
    });

});

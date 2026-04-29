const validarPassword = require('../src/validarPassword');

test("debe devolver un objeto con las propiedades esValida y errores", ()=> {
    const resultado=validarPassword("cualquierCosa");
    expect(resultado).toHaveProperty("esValida");
    expect(resultado).toHaveProperty("errores");
});
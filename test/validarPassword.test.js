const validarPassword = require('../src/validarPassword');

test("debe devolver un objeto con las propiedades esValida y errores", ()=> {
    const resultado=validarPassword("cualquierCosa");
    expect(resultado).toHaveProperty("esValida");
    expect(resultado).toHaveProperty("errores");
});

test("Una contrasenia con menos de 8 caracteres debe ser invalida", ()=> {
        const resultado=validarPassword("ABC123");
        expect(resultado.esValida).toBe(false);

});
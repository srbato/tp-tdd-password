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

test("debe incluir el mensaje 'Debe tener al menos 8 caracteres' cuando la contraseña es cortar ", ()=> {
    const resultado=validarPassword("ABC123");
    expect(resultado.errores).toContain("Debe tener al menos 8 caracteres");
});

test("Una contrasenia sin letra mayuscula debe ser invalida", ()=> {
    const resultado=validarPassword("abcde123");
    expect(resultado.esValida).toBe(false);
});

test("debe incluir el mensaje 'Debe contener al menos una mayuscula' cuando la contraseña es cortar ", ()=> {
    const resultado=validarPassword("abcde123");
    expect(resultado.errores).toContain("Debe contener al menos una mayuscula");
});

test("Una contrasenia sin minuscula es invalida", ()=> {
    const resultado=validarPassword("ABCDE123");
    expect(resultado.esValida).toBe(false);
    expect(resultado.errores).toContain('Debe contener al menos una minuscula');
});
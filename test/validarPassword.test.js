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

test("Una contrasenia sin numeros debe ser invalida", ()=> {
    const resultado=validarPassword("AbcdefghIj!");
    expect(resultado.esValida).toBe(false);
    expect(resultado.errores).toContain('Debe contener al menos un numero');

});

test("Una contrasenia sin simbolos especiales debe ser invalida", ()=> {
    const resultado=validarPassword("Abcdefgh1");
    expect(resultado.esValida).toBe(false);
    expect(resultado.errores).toContain('Debe contener al menos un simbolo especial');
});

test("Una contrasenia con esapcios blancos debe ser invalida", ()=> {
    const resultado=validarPassword("Abcd efg1!");
    expect(resultado.esValida).toBe(false);
    expect(resultado.errores).toContain('No debe contener espacios en blanco');
});

test('Una contrasenia que contiene el username debe ser invalida', () => {
    const resultado = validarPassword('battini2025!', 'battini');
    expect(resultado.esValida).toBe(false);
    expect(resultado.errores).toContain('La contrasenia no debe contener el nombre de usuario');
});

test('una contrasenia que contiene el username con distinta capitalización debe ser invalida', () => {
    const resultado = validarPassword('Battini2025!', 'battini');
    expect(resultado.esValida).toBe(false);
    expect(resultado.errores).toContain('La contrasenia no debe contener el nombre de usuario');
});
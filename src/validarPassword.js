const LONGITUD_MINIMA = 8;

function validarPassword(password) {
    const errores = [];

    if (password.length < LONGITUD_MINIMA) {
        errores.push('Debe tener al menos 8 caracteres');
    }

    if (!/[A-Z]/.test(password)) {
        errores.push('Debe contener al menos una mayuscula');
    }

    if (!/[a-z]/.test(password)) {
        errores.push('Debe contener al menos una minuscula');
    }

    return {
        esValida: errores.length === 0,
        errores
    };
}

module.exports = validarPassword;
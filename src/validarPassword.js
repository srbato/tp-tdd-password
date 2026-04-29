const LONGITUD_MINIMA = 8;

const reglas = [
    {
        cumple: (password) => password.length >= LONGITUD_MINIMA,
        mensajeError: 'Debe tener al menos 8 caracteres'
    },
    {
        cumple: (password) => /[A-Z]/.test(password),
        mensajeError: 'Debe contener al menos una mayuscula'
    },
    {
        cumple: (password) => /[a-z]/.test(password),
        mensajeError: 'Debe contener al menos una minuscula'
    },
    {
        cumple: (password) => /[0-9]/.test(password),
        mensajeError: 'Debe contener al menos un numero'
    },
    {
        cumple: (password) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
        mensajeError: 'Debe contener al menos un simbolo especial'
    },
    {
        cumple: (password) => !/[\s]/.test(password),
        mensajeError: 'No debe contener espacios en blanco'
    },
    {
        cumple: (password, username) => !username || !password.includes(username),
        mensajeError: 'La contrasenia no debe contener el nombre de usuario'
    },
];

function validarPassword(password, username) {
    const errores = reglas
        .filter(regla => !regla.cumple(password, username))
        .map(regla => regla.mensajeError);

    return {
        esValida: errores.length === 0,
        errores
    };
}

module.exports = validarPassword;
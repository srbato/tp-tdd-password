## Descripción

Implementa la función `validarPassword(password, usernameOpcional)` que valida una contraseña contra 8 reglas de seguridad y retorna un objeto con la siguiente estructura:

    {
      esValida: boolean,
      errores: string[]
    }

## Reglas de validación

Una contraseña es válida si cumple **todas** estas condiciones:

1. Tiene al menos 8 caracteres.
2. Contiene al menos 1 letra mayuscula.
3. Contiene al menos 1 letra minuscula.
4. Contiene al menos 1 número.
5. Contiene al menos 1 simbolo especial.
6. No contiene espacios en blanco.
7. Si se informa `usernameOpcional`, la contraseña no puede incluirlo (case-insensitive).
8. No contiene 3 caracteres iguales consecutivos.

---

## Instalación

Requiere [Node.js]

Clonar el repositorio y ejecutar:

    npm install

Esto instala las dependencias de desarrollo (Jest).

---

## Ejecución de tests

    npm test

---

## Cobertura de código

    npm run test:coverage

El proyecto alcanza **100% de cobertura**. Esto es consecuencia directa de la metodología TDD aplicada: cada línea de código se escribió en respuesta a un test que la requería.

---

## Uso

    const validarPassword = require('./src/validarPassword');

    // Sin username
    const r1 = validarPassword('Battini2025!');
    // { esValida: true, errores: [] }

    // Con username
    const r2 = validarPassword('battini2025!', 'battini');
    // { esValida: false, errores: ['La contraseña no debe contener el nombre de usuario'] }

    // Múltiples errores
    const r3 = validarPassword('abc');
    // {
    //   esValida: false,
    //   errores: [
    //     'Debe tener al menos 8 caracteres',
    //     'Debe contener al menos una mayúscula',
    //     'Debe contener al menos un número',
    //     'Debe contener al menos un símbolo especial'
    //   ]
    // }

---

## Decisiones de diseño

### Estructura declarativa de reglas

Las reglas de validación se modelan como un **array de objetos** `{ cumple, mensajeError }`. La función `validarPassword` aplica `.filter().map()` sobre ese array para construir la lista de errores. Esto separa el "qué validar" (datos) del "como validar" (lógica) y hace que agregar nuevas reglas sea trivial: solo se suma un objeto al array, sin modificar la lógica de validación.

### Definición de "símbolo especial"

El TP no define que caracteres son símbolos especiales. Asi que agarre los siguientes:

`! @ # $ % ^ & * ( ) _ + - = [ ] { } | ; : ' " , . < > / ? \`



### Uso de regex vs. iteración explícita

Se utilizan **expresiones regulares** para las validaciones de patrones simples (mayúsculas, minúsculas, números, espacios, símbolos).


### Username case-insensitive

La comparación con el `usernameOpcional` se hace convirtiendo ambos strings a minúsculas (`.toLowerCase()`) antes de aplicar `.includes()`, según lo solicita el enunciado.

### Manejo del parámetro opcional

Si `usernameOpcional` no se informa (es `undefined`), la regla correspondiente se omite.

---

## Supuestos adoptados

- Una contraseña vacía (`''`) se considera inválida (falla por longitud insuficiente, ausencia de mayúsculas, etc.).
- El parámetro `usernameOpcional` es realmente opcional: la función no lanza error si se omite.
- Una `password` con username del tipo string vacío `''` se trata como "sin username" (`!''` evalúa a `true`).
- Los caracteres acentuados (á, é, ñ, etc.) **no** se consideran ni mayúsculas ni minúsculas válidas para las reglas 2 y 3, dado que las regex usan rangos ASCII.
- Los espacios en blanco incluyen no solo el espacio normal sino también tabs, newlines y otros whitespace (vía `\s`).

---

## Estructura del proyecto

    tp-tdd-password/
    ├── src/
    │   └── validarPassword.js      # Implementación
    ├── test/
    │   └── validarPassword.test.js # Tests Jest
    ├── README.md                   # Este archivo
    ├── TDD_LOG.md                  # Bitácora de los 15 ciclos TDD
    ├── IA_REPORTE.md               # Reporte sobre uso de IA
    └── package.json

---

Santiago Rodriguez Battini — Programación Orientada a Objetos 2 — UCA — 2026
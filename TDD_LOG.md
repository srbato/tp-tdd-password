# TDD_LOG – Trabajo Práctico Validador de Contraseñas

## Datos del estudiante
- Nombre y apellido: Santiago Rodriguez Battini
- Fecha: 29/04/2026
- Curso/Grupo: POO2

---

## Registro de ciclos TDD

| Ciclo | Test agregado | Evidencia Rojo | Cambio mínimo (Verde) | Refactor | Evidencia final |
|------:|---------------|----------------|----------------------|----------|-----------------|
| 1 | `debe devolver un objeto con las propiedades esValida y errores` — verifica que la función exista y retorne un objeto con la estructura correcta | `TypeError: validarPassword is not a function` (archivo `src/validarPassword.js` vacío) | Se crea la función `validarPassword` que retorna `{ esValida: true, errores: [] }` y se exporta con `module.exports` | No aplicó | ✓ debe devolver un objeto con las propiedades esValida y errores |
| 2 | `Una contraseña con menos de 8 caracteres debe ser inválida` — verifica que la función rechace contraseñas cortas | `Expected: false, Received: true` (la función siempre retornaba `esValida: true`) | Se agrega validación: si `password.length < 8` se pushea error al array. `esValida` se calcula según si el array de errores está vacío | Se extrae el número mágico 8 a una constante `LONGITUD_MINIMA` para mejorar legibilidad y mantenibilidad | ✓ Una contraseña con menos de 8 caracteres debe ser inválida |
| 3 | `debe incluir el mensaje "Debe tener al menos 8 caracteres" cuando la contraseña es corta` — verifica el contenido específico del array de errores | El test pasó directamente: en el Ciclo 2 ya se había implementado el mensaje correcto al pushear al array de errores. Se documenta como "test confirmatorio" que blinda el comportamiento ante futuros cambios | No se requirió cambio de código — el comportamiento ya estaba implementado | No aplicó | ✓ debe incluir el mensaje "Debe tener al menos 8 caracteres" cuando la contraseña es corta |
| 4 | `una contraseña sin letra mayúscula debe ser inválida` — verifica que la función rechace contraseñas que no contengan al menos una letra mayúscula | `Expected: false, Received: true` (la función solo validaba longitud, no chequeaba mayúsculas) | Se agrega validación con regex `/[A-Z]/.test(password)` que pushea error si no se encuentra ninguna mayúscula | No aplicó (se difiere refactor de extraer reglas hasta tener más validaciones implementadas) | ✓ una contraseña sin letra mayúscula debe ser inválida |
| 5 | `debe incluir el mensaje "Debe contener al menos una mayúscula" cuando falta la mayúscula` — verifica el contenido específico del array de errores | El test pasó directamente: en el Ciclo 4 ya se había implementado el mensaje correcto al agregar la validación de mayúscula | No se requirió cambio de código — el comportamiento ya estaba implementado | No aplicó | ✓ debe incluir el mensaje "Debe contener al menos una mayúscula" cuando falta la mayúscula |
| 6 | `una contraseña sin letra minúscula debe ser inválida` — verifica que la función rechace contraseñas sin minúsculas y que devuelva el mensaje correcto | `Expected: false, Received: true` (la función no validaba minúsculas) | Se agrega validación con regex `/[a-z]/.test(password)` que pushea error si no se encuentra ninguna minúscula | No aplicó (se difiere refactor de extraer reglas hasta tener más validaciones implementadas) | ✓ una contraseña sin letra minúscula debe ser inválida |
| 7 | `una contraseña sin números debe ser inválida` — verifica que la función rechace contraseñas sin dígitos | `Expected: false, Received: true` (la función no validaba dígitos) | Se agrega validación con regex `/[0-9]/.test(password)` que pushea error si no se encuentra ningún dígito. Se elige `[0-9]` en lugar de `\d` por consistencia visual con `[A-Z]` y `[a-z]` | No aplicó | ✓ una contraseña sin números debe ser inválida |
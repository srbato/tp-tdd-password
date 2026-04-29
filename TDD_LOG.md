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
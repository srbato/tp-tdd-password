# IA_REPORTE – Trabajo Práctico Validador de Contraseñas

## Datos del estudiante
- Nombre y apellido: Santiago Rodriguez Battini
- Fecha: 29/04/2026
- Curso/Grupo: POO2 - UCA

---

## 1) Declaración de uso de IA

- [ ] No utilicé herramientas de IA generativa para producir código en este trabajo.
- [x] Sí utilicé herramientas de IA generativa para producir o sugerir código en este trabajo.

---

## 2) Herramientas utilizadas

Use Claude (de Anthropic), creo que la version es Opus 4.7. Lo use principalmente para entender mejor que era TDD, y despues para que me vaya guiando un poco en algunos ciclos. Tambien me ayudo a configurar Jest al principio que no me andaba por un tema de permisos en PowerShell.

Lo use principlamente al principio para instalar y configurar bien Jest (era algo que no me acordaba bien) y para que me corriga algunos errores que iba teniendo durante el proceso

---

## 3) Prompts principales utilizados

### Prompt 1=
- Objetivo: Poder instalar y configurar correctamente Jest
- Texto del prompt: "Necesito ayuda con la instalacion de Jest porque me esta dando error"
- Resumen de la respuesta: me explico que el error era de PowerShell que por seguridad no deja ejecutar scripts npm. Me dio dos opciones: cambiar la politica de ejecucion con Set-ExecutionPolicy RemoteSigned -Scope CurrentUser desde PowerShell como administrador, o usar cmd en vez de PowerShell. Yo elegi la primera opcion y despues npm install --save-dev jest funciono normal. Tambien me explico que era cada nivel de ExecutionPolicy (Restricted, RemoteSigned, Unrestricted) asi entendia que estaba cambiando.

### Prompt 2
- Objetivo: que me arme un plan de los 15 ciclos antes de arrancar
- Texto del prompt: "Cual seria la mejor manera de armar este TP?"
- Resumen de la respuesta: me armo una tabla con los 15 ciclos propuestos en orden, primero la estructura del objeto que devuelve la funcion, despues una regla por ciclo, despues un ciclo dedicado a refactor en el medio, y al final dos ciclos de integracion. Tambien me sugirio una convencion para los commits (test:, feat:, refactor:, docs:).

### Prompt 3
- Objetivo: entender por que el primer test no fallaba como tenia que fallar
- Texto del prompt: "ya cree el archivo pero el test no me da rojo"
- Resumen de la respuesta: me explico que cuando cree la estructura inicial el archivo src/validarPassword.js ya tenia algo escrito, entonces el test no fallaba por el motivo correcto. Me dijo que para que el TDD funcione bien el primer ciclo tiene que arrancar con el archivo completamente vacio, asi el error que tira Jest es "validarPassword is not a function" que es la evidencia de rojo real. Despues de vaciar el archivo y volver a correr npm test ahi si dio el error esperado y pude pasar al verde con la implementacion minima.

### Prompt 4
- Objetivo: entender un comportamiento raro en el ciclo 13 con la regla de los 3 caracteres iguales seguidos
- Texto del prompt: "le pase la password 'aA' al test y la funcion no tira error de 3 iguales pero deberia"
- Resumen de la respuesta: me hizo notar que en realidad la funcion tresCaracteresIgualesConsecutivos esta bien, lo que pasa es que 'aA' tiene solo 2 caracteres, no 3, asi que no puede haber 3 iguales seguidos. Ademas la 'a' minuscula y la 'A' mayuscula son caracteres distintos para el === de JavaScript, asi que aunque hubiera 'aAa' tampoco contaria como 3 iguales. Despues me explico la diferencia entre comparar con === (que mira el caracter exacto) versus normalizar antes con toLowerCase() (que igualaria 'a' y 'A'). Decidi dejarlo como esta porque la regla del TP dice "3 caracteres iguales consecutivos" sin aclarar nada de mayusculas, asi que la interpretacion mas literal es comparar tal cual sin normalizar. Lo agregue como supuesto adoptado en el README.

---

## 4) Errores detectados en sugerencias de IA

### Error detectado 1
- Sugerencia de IA: en varios ciclos (3, 5, 14 y 15) la IA me propuso tests que cuando los corria pasaban directamente sin tener que tocar nada del codigo, porque la implementacion anterior ya cubria el caso.
- Que problema tenia: en TDD el ciclo arranca siempre con un rojo, un test que falla. Si el test pasa directo, no hay rojo real y el ciclo es un poco "trucho". Hace que la cuenta de 15 ciclos quede inflada con ciclos que no fueron realmente rojo-verde-refactor.
- Test que evidencia el error: en si mismo, cuando jest mostraba PASS en vez de FAIL la primera vez que corria el test recien agregado, ahi se veia que no habia un rojo real.
- Correccion aplicada: decidi mantener esos tests porque igual sirven como documentacion del comportamiento esperado y blindan contra cambios futuros que rompan algo. Pero los registre en el TDD_LOG diciendo expresamente que pasaron directo y que el comportamiento ya estaba implementado, para no falsear el proceso.

### Error detectado 2
- Sugerencia de IA: en el ciclo 8, cuando me paso la regex para validar simbolos especiales, la version inicial era /[!@#$%^&*()_+-=\[\]{}|;:,.<>?]/ sin escapar el guion. 
- Que problema tenia: el guion - dentro de los corchetes en regex no se interpreta literal, sino que define un rango de caracteres. Como estaba entre + y =, en la tabla ASCII eso significa "todos los caracteres entre el + y el =", no el guion solo. Eso hacia que la regex matcheara cosas que no deberian ser simbolos validos.
- Test que evidencia el error: si pasaba una password como "Abcdefg1," el test pasaba como si la coma fuera un simbolo valido, pero si pasaba "Abcdefg1." con punto, dependiendo de la posicion del punto en la regex tambien podia dar resultados raros. La cobertura no lo agarro porque ningun test verificaba el rango exacto de simbolos aceptados.
- Correccion aplicada: la IA me corrigio cuando le pregunte por que tenia ese \- en otras versiones que vi por internet. Me explico que dentro de [] hay caracteres que necesitan escaparse: el guion para que sea literal, los corchetes, la barra invertida. Quedo /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/ que es la version final.


---

## 5) Impacto en su proceso TDD

La IA me ayudo bastante a iterar mejor, sobre todo al principio. Si lo hubiera hecho solo creo que hubiera implementado 2 o 3 reglas juntas en cada vuelta, y eso es justo lo que el TP penaliza por baja granularidad. La IA me obligaba a ir de a un test por vez y eso hizo que el proceso quedara mucho mas fragmentado.

Donde si interfirio fue en los ciclos donde el test pasaba directo (3, 5, 14, 15). Ahi la IA priorizo completar los 15 ciclos en vez de proponer tests que realmente fueran un rojo. Lo registre honestamente igual.

Cosas que decidi distinto a lo que sugirio la IA:
- No hacer el refactor falso de \d a [0-9] en el ciclo 7
- Esperar al ciclo 9 para hacer el refactor grande del array de reglas, en vez de refactorizar temprano cuando solo habia 2 reglas
- Cuando le pregunte si habia una forma mas simple que regex (con un for o .some()), termine quedandome con regex igual, pero la IA me ayudo a entender el por que de la decision en vez de imponermelo. Lo documente como decision de diseño en el README.
- En el ciclo 10 la IA me sugirio usar \s para los espacios en vez de [ ], y al principio yo pense en cambiarlo a [ ] por consistencia con las otras regex. Despues entendi que tenia sentido usar \s porque cubre tabs, newlines y otros whitespace, no solo el espacio normal. Lo deje como \s y lo aclare en el README.
---

## 6) Conclusion personal

Lo principal que me llevo es que la IA sirve mucho como tutor, sobre todo cuando estas aprendiendo algo nuevo como TDD. Te explica las cosas, te muestra ejemplos, te propone alternativas. Pero hay que estar atento porque a veces te propone cosas que no son del todo correctas, como el caso del refactor falso.

Tres cosas que aprendi:
1. Antes de hacer un commit que sugiere la IA, fijarme si realmente hay un cambio para commitear. A veces propone commits que no corresponden.
2. Documentar honestamente los errores de la IA es importante. Un TP donde la IA "no se equivoco nunca" es sospechoso, porque siempre se equivoca en algo.
3. Creo que la IA esta muy buena, pero mas que nada en ambientes donde la persona ya sabe lo que tiene que hacer y solo quiere agilizar las cosas. En estos casos de TPs, siento que puede servir un poco al principio si hay algun error (como me paso a mi) o para ver cual puede ser la mejor manera de hacer algo. Pero al fin y al cabo, el objetivo, en este caso, es entender al maximo estos conceptos y creo que la mejor forma es equivocandose. Eso con la IA no se puede y no terminas entendiendo bien.
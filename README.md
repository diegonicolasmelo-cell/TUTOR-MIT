# Tutor MIT — con Minerva 🦉

App modelo (mockup funcional) de un tutor de **fisiología y fisiopatología** construido
sobre el método de estudio del MIT y pensado para migrar después a **Google Apps Script**.

Cubre **5 áreas del conocimiento** —cardiovascular, respiratorio, renal y medio interno,
neurofisiología y farmacología del paciente crítico— y lleva integrada a **Minerva**, una
asistente que lee el progreso real y propone la siguiente acción concreta.

El perfil de usuario es concreto: profesional que trabaja en UCI, con familia, poco tiempo,
bases sólidas y acceso a pacientes reales. Todo el diseño responde a esas restricciones:
sesiones que caben en 20 minutos, contenido dosificado por prioridad y repaso que se
programa solo.

---

## Qué hace

| Módulo | Función |
|---|---|
| **Minerva 🦉** | Asistente que evalúa racha, tarjetas vencidas, brechas repetidas, precisión y cumplimiento del plan, y propone **una** acción concreta. Acompaña también cada fase de la sesión explicando por qué se hace. |
| **Inicio** | Panel con minutos de hoy, tarjetas pendientes, dominio global, racha, brechas detectadas, avance por área y arranque en un clic según el tiempo disponible. |
| **Áreas** | Activa o pausa áreas completas: el plan, las sugerencias y el mazo de tarjetas se reajustan solos. Útil para concentrarse en un examen concreto. |
| **Sesión guiada** | El método completo en seis fases, con cronómetro y contenido recortado automáticamente según los minutos disponibles. |
| **Tarjetas** | Recuperación activa con repetición espaciada (SM-2 adaptado), usable desde el móvil. |
| **Plan** | Calendario de 14 días generado a partir de los minutos reales disponibles cada día. |
| **Temario** | 32 temas en 5 áreas y 11 módulos, con ficha completa consultable fuera de sesión. |
| **Simulacro de examen** | Examen cronometrado de alternativas: eliges duración, número de preguntas, áreas y nivel. Corrige solo, explica **por qué falla cada distractor**, desglosa por área y por nivel, y convierte los fallos en brechas del plan. |
| **Diapositivas** | Cualquier tema se proyecta a pantalla completa, navegable con teclado. Útil para repasar en el móvil o exponer en la unidad. |
| **Biblioteca** | Registro de tus fuentes —papers, guías, libros, apuntes, clases— con enlace, referencia y tema asociado. Guarda **referencias, no archivos**. |
| **Notas** | Notas atómicas enlazadas con `[[corchetes dobles]]`, retroenlaces automáticos y detección de notas huérfanas. Es la parte de «segundo cerebro»: no sirve para no olvidar, sirve para pensar. |
| **Rendimiento** | Precisión, constancia, prioridad de repaso, historial de exámenes y registro histórico de brechas. |
| **Taller** | Crea temas, áreas y preguntas de alternativa nuevas **desde tus propios apuntes y papers**, sin tocar código: la app genera el prompt con el esquema, NotebookLM lo responde leyendo tus fuentes, y pegas el JSON de vuelta. Valida, sanea, previsualiza e integra. |
| **Prompt IA** | Genera el protocolo del tutor en texto para NotebookLM, Claude o ChatGPT, personalizado con el área, el tema, el tiempo, las brechas registradas y las fuentes de referencia propias de esa materia. |

## Las seis fases de la sesión

1. **Anclaje** — se responde *antes* de leer. El intento fallido prepara la codificación (efecto de pretest).
2. **Comprensión** — mecanismo paso a paso, nunca listas: fisiología normal → variable que cambia → por qué → compensación → consecuencia → clínica.
3. **Feynman** — explicar con palabras propias y autoevaluarse contra una lista de puntos clave. **Lo que queda sin marcar se registra como brecha** y vuelve al plan.
4. **Recuperación activa** — preguntas en tres niveles (conocimiento, integración, razonamiento clínico) con autoevaluación honesta.
5. **Razonamiento clínico** — caso socrático, pregunta a pregunta, sin adelantar respuestas.
6. **Consolidación** — error frecuente, perla de examen y paso de las tarjetas al mazo espaciado.

El reparto del tiempo entre fases lo decide el **modo** elegido (comprender, repaso rápido,
modo examen, tutor intensivo, profundización), definido en `assets/datos-nucleo.js`.

## Contenido

**32 temas · 11 módulos · 5 áreas · 252 tarjetas · 63 preguntas de alternativa.**

| Área | Temas | Contenido |
|---|---|---|
| 🫀 Cardiovascular | 18 | Hemodinamia, electrofisiología y ECG, regulación y presión arterial, fisiopatología clínica |
| 🫁 Respiratorio | 4 | Mecánica ventilatoria, V/Q e intercambio, transporte de gases, insuficiencia respiratoria y SDRA |
| ⚗️ Renal y medio interno | 4 | Filtrado y autorregulación, sodio y agua, ácido-base sistemático, potasio |
| 🧠 Neurofisiología | 3 | Potencial de membrana, sinapsis y unión neuromuscular, presión intracraneal y conciencia |
| 💊 Farmacología crítica | 3 | Farmacocinética alterada, vasoactivos por receptor, sedoanalgesia |

Cada tema incluye idea central, bloques por nivel de prioridad, variables clave,
fisiopatología, correlación clínica, error frecuente, perla de examen, ejercicio Feynman,
8–9 preguntas de tres niveles, un caso clínico socrático de 5–7 pasos y 6–9 tarjetas.
27 de los 32 temas traen además preguntas de alternativa (`assets/datos-mcq.js`).

Los conceptos siguen las referencias habituales de cada materia: Guyton & Hall, Boron &
Boulpaep, Costanzo, Harrison, Braunwald, West, Rose & Post, Kandel y Goodman & Gilman.

## El examen: los distractores son el contenido

Una pregunta de alternativa sirve de poco si las opciones falsas son de relleno. En este
banco **cada distractor es un error conceptual concreto y frecuente**, y lleva escrita la
razón de por qué resulta tentador y por qué falla. Al revisar el examen se aprende tanto de
las opciones descartadas como de la correcta.

El examen se arma pesando cada candidato por `(100 − dominio)` más un extra si el tema es de
alta prioridad, más algo de azar: pregunta más por donde estás peor, sin volverse predecible.
Preguntas y alternativas se barajan en cada intento.

El resultado no se queda en un porcentaje. La app compara tu acierto por nivel y lo interpreta
en voz alta: si aciertas los datos pero fallas al aplicarlos, te lo dice con esas palabras.
Y cada fallo entra como brecha al plan, así que el examen alimenta el estudio de los días
siguientes en vez de terminar en una nota.

## Segundo cerebro: biblioteca y notas

Son dos cosas distintas y la app lo dice explícitamente:

- **El temario y las tarjetas sirven para no olvidar** lo que ya entendiste. Ahí manda la
  repetición espaciada.
- **Las notas sirven para pensar.** Una nota atómica es una idea tuya, escrita con tus
  palabras, enlazada a otras con `[[corchetes dobles]]`. La app calcula los retroenlaces y
  señala las notas huérfanas —las que nadie cita y que no citan a nadie— porque una nota sin
  conexiones es una nota que no vas a volver a encontrar.

Un enlace a una nota que todavía no existe se muestra pendiente y la crea con el título ya
puesto al pulsarlo: escribir primero y ordenar después, que es como funciona un Zettelkasten.

La **biblioteca guarda referencias, no archivos**: título, autores, año, tipo, enlace y tema
asociado. No es una limitación de diseño sino del destino —`localStorage` ronda los 5–10 MB y
`PropertiesService` admite 9 KB por propiedad—, así que un PDF no cabe en ninguno de los dos.
Lo que sí ocurre es que fuentes y notas asociadas a un tema aparecen en su ficha, bajo
«Tu material sobre este tema».

## El Taller: contenido propio sin tocar código

El temario que viene de fábrica no es el límite. Desde **Taller** se añaden temas y áreas
completas en tres pasos, todos dentro de la interfaz:

1. **Defines qué crear** (área nueva o existente, módulo, tema, minutos, fuentes y si quieres
   preguntas de alternativa). La app
   genera un prompt que incluye el **esquema JSON exacto** del temario y una regla explícita:
   *usar exclusivamente las fuentes del cuaderno*, y escribir `NO CUBIERTO POR LAS FUENTES`
   antes que rellenar con conocimiento general.
2. **NotebookLM responde leyendo tus documentos**: apuntes, papers, guías de tu unidad.
3. **Pegas el JSON de vuelta.** La app lo valida campo por campo, informa de errores concretos
   («faltan preguntas de nivel 3», «el caso necesita al menos 3 pasos»), sanea el HTML,
   muestra una vista previa y lo integra al temario, al plan y al mazo de tarjetas.

### Tres vías para traer la respuesta

Las tres acaban en el **mismo validador**, así que ninguna tiene menos comprobaciones que otra.

1. **Pegar el JSON.** Lo de siempre. Funciona en cualquier versión, incluida la del navegador.
2. **Desde un Google Doc.** Pegas la respuesta de NotebookLM en un Documento y la app la lee
   sola. Parece un rodeo y es al revés: en el móvil, copiar 9 KB de JSON entre dos apps es
   justo donde se rompe el flujo; pegar en un Doc que ya tienes abierto, no. Puedes elegir el
   documento de una lista de recientes en lugar de pegar la URL.
3. **Generar con mis fuentes.** La app consulta tus papers y escribe el módulo sin que copies
   ni pegues nada. Ver más abajo.

Las vías 2 y 3 **solo existen en la versión instalada en Apps Script**, porque en el navegador
no hay acceso a Drive ni a la red. La app lo dice con todas las letras en vez de fingir que
funcionan.

Un detalle que decide si la vía 2 sirve o no: **Google Docs sustituye las comillas rectas por
tipográficas al pegar**, y eso basta para que `JSON.parse` falle entero. El validador lo
reintenta enderezándolas, pero solo como segundo intento —hacerlo siempre estropearía un texto
que legítimamente lleve comillas tipográficas dentro de un valor— y avisa de que lo hizo.

Si pides alternativas, el prompt no se limita a pedir «4 opciones»: exige que cada distractor
sea un error conceptual real y que traiga escrita su razón, igual que el banco de fábrica. El
validador **rechaza toda pregunta que no tenga exactamente una opción correcta** y avisa de
cuál descartó, en vez de importar una pregunta rota en silencio.

### Generar con mis fuentes (Gemini + File Search)

**NotebookLM no tiene API pública.** A agosto de 2026 Google reconoce la demanda pero no hay
beta, ni lista de espera, ni fecha; lo único documentado es la API de *Gemini Notebook
Enterprise*, en preview y solo para clientes empresariales. Así que la app **no puede pedirle
nada a NotebookLM**, y cualquier cosa que diga lo contrario está describiendo un scraper no
oficial que se romperá.

Lo que sí puede es hacer lo mismo por su cuenta. **File Search** es RAG gestionado dentro de
la API de Gemini: indexa los documentos que tú subes y responde anclado en ellos, con citas al
documento de origen. Es el mismo mecanismo que NotebookLM usa por dentro, con API.

El reparto de trabajo es deliberado:

- **Una vez, en Google AI Studio:** creas la clave, creas un almacén de File Search y subes
  tus papers. Esa parte ya tiene interfaz propia y no hace falta duplicarla.
- **En cada uso, desde la app:** eliges el almacén y pulsas generar.

Dos salvaguardas que importan más que la comodidad:

- **La clave se guarda en el servidor, en tu cuenta de Google, y no entra en el progreso
  exportable.** Si algún día compartes tu copia de seguridad, la clave no viaja dentro.
- **Si la respuesta llega sin citas, la app lo dice.** Y si generas sin elegir almacén, avisa
  de que eso lo escribió el modelo de memoria y hay que tratarlo como borrador. El objetivo
  de todo esto era no estudiar de material alucinado; callarse cuando falta el anclaje sería
  romper justo eso.

Tres decisiones que importan:

- **Todo entra marcado como «sin verificar».** Es material clínico: la app comprueba la
  estructura, no la exactitud. El distintivo aparece en el temario y en la ficha, Minerva
  insiste hasta que lo revisas, y solo tú puedes marcarlo como verificado.
- **Se declara la procedencia.** Cada tema guarda de qué documento salió, para poder
  contrastarlo después.
- **El HTML importado se sanea en un documento inerte** (`DOMParser`), no asignando
  `innerHTML`: de lo contrario, un `onerror` en una imagen se ejecutaría durante la propia
  validación. Solo sobrevive el marcado que usa el temario.

El contenido propio se guarda con el progreso, de modo que viaja en la exportación y aparece
igual tras migrar a Apps Script.

---

## Cómo ejecutarlo

**Opción rápida** — abrir `dist/tutor-mit.html` con doble clic. Es un archivo único
autocontenido, sin servidor ni dependencias.

**Durante el desarrollo** — abrir `index.html`, que carga los archivos de `assets/` por separado.

Tras editar cualquier archivo de `assets/`, regenerar los empaquetados:

```bash
node herramientas/construir.js
```

## Estructura

```
index.html                  versión de desarrollo
assets/
  estilos.css               hoja de estilos única, sin recursos externos
  datos-nucleo.js           áreas, módulos, modos de sesión, fases y parámetros SM-2
  datos-hemodinamia.js      \
  datos-electro.js           |
  datos-regulacion.js        |
  datos-fisiopato.js         |  contenido del temario
  datos-respiratorio.js      |  (un archivo por bloque temático)
  datos-renal.js             |
  datos-neuro.js             |
  datos-farmaco.js          /
  datos-mcq.js              banco de preguntas de alternativa (63, en 27 temas)
  almacen.js                capa de persistencia intercambiable + reglas de negocio
  ui.js                     utilidades, enrutador y cronómetro
  puente.js                 único punto que llama al servidor: Docs, Drive y Gemini
  basedatos.js              arma las filas del volcado a Google Sheets
  asistente.js              Minerva: motor de reglas y panel
  taller.js                 esquema, generador de prompt, validador, saneado e importador
  vistas.js                 inicio, áreas, temario, ficha, plan, rendimiento, prompt, ajustes
  estudio.js                motor de la sesión guiada
  examen.js                 armado, cronómetro, corrección y lectura del simulacro
  diapositivas.js           proyección a pantalla completa con navegación por teclado
  biblioteca.js             fuentes y notas atómicas enlazadas (retroenlaces y huérfanas)
  tarjetas.js               repaso espaciado
  app.js                    acciones, generador de prompt y arranque
herramientas/construir.js   genera dist/ y appsscript/
appsscript/                 archivos listos para pegar en Google Apps Script
dist/                       empaquetados generados
MIGRACION.md                paso a paso para llevarlo a Apps Script
```

## Decisiones de diseño relevantes

- **Sin dependencias ni recursos externos.** Ni CDN, ni fuentes, ni frameworks. Es requisito
  para que `HtmlService` de Apps Script pueda servir la app tal cual.
- **Persistencia aislada en un solo módulo.** `assets/almacen.js` es el único archivo que toca
  el almacenamiento y su API ya es asíncrona, de modo que cambiar `localStorage` por
  `PropertiesService` no obliga a tocar ninguna vista.
- **Contenido separado de la lógica.** Añadir temas o áreas completas es editar un archivo de
  datos; no hay que tocar el motor de sesiones. La jerarquía es área → módulo → tema.
- **Un solo esquema para el Taller.** El generador de prompt y el validador salen de la misma
  definición (`Taller.ESQUEMA` y `plantillaJson`), de modo que no pueden divergir: lo que se
  pide es exactamente lo que se valida.
- **El cronómetro cuenta con marcas de tiempo, no con tics.** Los navegadores frenan los
  temporizadores de las pestañas en segundo plano, así que restar un segundo por tic atrasaría
  el reloj durante un examen de 30 minutos. Calculando contra `Date.now()` la pantalla se
  corrige sola al volver y la entrega automática se dispara aunque el tiempo se agotara con la
  pestaña oculta.
- **Minerva es un motor de reglas, no un texto fijo.** Cada regla inspecciona el estado y
  devuelve como mucho un consejo con una acción; se ordenan por prioridad y se muestra la más
  relevante. Añadir una regla nueva es añadir una función a una lista.
- **Tema claro y oscuro** resueltos por tokens, respetando la preferencia del sistema, la del
  sitio anfitrión y la elección explícita del usuario.

## Estado

Mockup funcional y probado de extremo a extremo en Chromium, sin errores de consola en
ninguna de las seis baterías de prueba:

- **Sesión y repaso** — las seis fases, el repaso espaciado, el planificador con intercalado
  entre áreas, la activación y pausa de áreas, el registro de brechas, Minerva y el generador
  de prompt, sobre datos reales.
- **Taller** — generar, validar, sanear, importar, estudiar el tema importado, sobrevivir a
  una recarga, verificar y eliminar. Un `onerror` inyectado a propósito no llega a ejecutarse.
- **Examen** — corrección comprobada al 100 % en una pasada de respuestas deliberadamente
  correctas; integridad del banco verificada (exactamente una correcta y cuatro opciones por
  pregunta, todas con razón escrita); los fallos entran como brechas y el examen queda en el
  historial.
- **Taller + alternativas** — una pregunta defectuosa con dos correctas se rechaza con aviso
  y las buenas se importan igual.
- **Diapositivas** — 12 diapositivas generadas desde los datos del tema, navegación con
  flechas, `Inicio`, `Fin` y `Esc`, y salto directo a las tarjetas al cerrar.
- **Notas y biblioteca** — enlaces `[[…]]`, retroenlaces, huérfanas, búsqueda, rechazo de
  enlaces `javascript:`, aparición en la ficha del tema y persistencia tras recargar.

El tema claro/oscuro resuelve correctamente en los cuatro estados posibles.
Lo pendiente para producción está en `MIGRACION.md`.

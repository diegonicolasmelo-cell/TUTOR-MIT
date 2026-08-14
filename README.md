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
| **Rendimiento** | Precisión, constancia, prioridad de repaso y registro histórico de brechas. |
| **Taller** | Crea temas y áreas nuevas **desde tus propios apuntes y papers**, sin tocar código: la app genera el prompt con el esquema, NotebookLM lo responde leyendo tus fuentes, y pegas el JSON de vuelta. Valida, sanea, previsualiza e integra. |
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

**32 temas · 11 módulos · 5 áreas · 252 tarjetas.**

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

Los conceptos siguen las referencias habituales de cada materia: Guyton & Hall, Boron &
Boulpaep, Costanzo, Harrison, Braunwald, West, Rose & Post, Kandel y Goodman & Gilman.

## El Taller: contenido propio sin tocar código

El temario que viene de fábrica no es el límite. Desde **Taller** se añaden temas y áreas
completas en tres pasos, todos dentro de la interfaz:

1. **Defines qué crear** (área nueva o existente, módulo, tema, minutos y fuentes). La app
   genera un prompt que incluye el **esquema JSON exacto** del temario y una regla explícita:
   *usar exclusivamente las fuentes del cuaderno*, y escribir `NO CUBIERTO POR LAS FUENTES`
   antes que rellenar con conocimiento general.
2. **NotebookLM responde leyendo tus documentos**: apuntes, papers, guías de tu unidad.
3. **Pegas el JSON de vuelta.** La app lo valida campo por campo, informa de errores concretos
   («faltan preguntas de nivel 3», «el caso necesita al menos 3 pasos»), sanea el HTML,
   muestra una vista previa y lo integra al temario, al plan y al mazo de tarjetas.

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
  almacen.js                capa de persistencia intercambiable + reglas de negocio
  ui.js                     utilidades, enrutador y cronómetro
  asistente.js              Minerva: motor de reglas y panel
  taller.js                 esquema, generador de prompt, validador, saneado e importador
  vistas.js                 inicio, áreas, temario, ficha, plan, rendimiento, prompt, ajustes
  estudio.js                motor de la sesión guiada
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
- **Minerva es un motor de reglas, no un texto fijo.** Cada regla inspecciona el estado y
  devuelve como mucho un consejo con una acción; se ordenan por prioridad y se muestra la más
  relevante. Añadir una regla nueva es añadir una función a una lista.
- **Tema claro y oscuro** resueltos por tokens, respetando la preferencia del sistema, la del
  sitio anfitrión y la elección explícita del usuario.

## Estado

Mockup funcional y probado de extremo a extremo en Chromium, sin errores de consola: las seis
fases, el repaso espaciado, el planificador con intercalado entre áreas, la activación y pausa
de áreas, el registro de brechas, Minerva, el generador de prompt y el Taller completo
—generar, validar, sanear, importar, estudiar el tema importado, sobrevivir a una recarga,
verificar y eliminar— funcionan sobre datos reales.
El tema claro/oscuro resuelve correctamente en los cuatro estados posibles.
Lo pendiente para producción está en `MIGRACION.md`.

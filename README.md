# Tutor MIT — Cardiovascular

App modelo (mockup funcional) de un tutor de **fisiología y fisiopatología cardiovascular**
construido sobre el método de estudio del MIT y pensado para migrar después a
**Google Apps Script**.

El perfil de usuario es concreto: profesional que trabaja en UCI, con familia, poco tiempo,
bases sólidas y acceso a pacientes reales. Todo el diseño responde a esas restricciones:
sesiones que caben en 20 minutos, contenido dosificado por prioridad y repaso que se
programa solo.

---

## Qué hace

| Módulo | Función |
|---|---|
| **Inicio** | Panel con minutos de hoy, tarjetas pendientes, dominio global, racha, brechas detectadas y arranque en un clic según el tiempo disponible. |
| **Sesión guiada** | El método completo en seis fases, con cronómetro y contenido recortado automáticamente según los minutos disponibles. |
| **Tarjetas** | Recuperación activa con repetición espaciada (SM-2 adaptado), usable desde el móvil. |
| **Plan** | Calendario de 14 días generado a partir de los minutos reales disponibles cada día. |
| **Temario** | 18 temas con ficha completa consultable fuera de sesión. |
| **Rendimiento** | Precisión, constancia, prioridad de repaso y registro histórico de brechas. |
| **Prompt IA** | Genera el protocolo del tutor en texto para NotebookLM, Claude o ChatGPT, ya personalizado con el tema, el tiempo y las brechas registradas. |

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

18 temas repartidos en cuatro módulos: fundamentos hemodinámicos, electrofisiología y ECG,
regulación y presión arterial, y fisiopatología clínica. Cada tema incluye idea central,
bloques por nivel de prioridad, variables clave, fisiopatología, correlación clínica,
error frecuente, perla de examen, ejercicio Feynman, 8–9 preguntas de tres niveles,
un caso clínico socrático de 5–7 pasos y 6–9 tarjetas. En total, 136 tarjetas.

Los conceptos siguen Guyton & Hall, Boron & Boulpaep, Costanzo, Harrison y Braunwald.

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
  datos-nucleo.js           módulos, modos de sesión, fases y parámetros SM-2
  datos-hemodinamia.js      \
  datos-electro.js           |  contenido del temario
  datos-regulacion.js        |  (un archivo por módulo)
  datos-fisiopato.js        /
  almacen.js                capa de persistencia intercambiable + reglas de negocio
  ui.js                     utilidades, enrutador y cronómetro
  vistas.js                 inicio, temario, ficha, plan, rendimiento, prompt, ajustes
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
- **Contenido separado de la lógica.** Añadir temas es editar un archivo de datos; no hay que
  tocar el motor de sesiones.
- **Tema claro y oscuro** resueltos por tokens, respetando la preferencia del sistema, la del
  sitio anfitrión y la elección explícita del usuario.

## Estado

Mockup funcional y probado de extremo a extremo: las seis fases, el repaso espaciado, el
planificador, el registro de brechas y el generador de prompt funcionan sobre datos reales.
Lo pendiente para producción está en `MIGRACION.md`.

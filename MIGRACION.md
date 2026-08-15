# Migración a Google Apps Script

La app se escribió desde el principio para este destino, así que la migración no exige
reescribir vistas ni lógica. Todo lo específico de Apps Script está aislado en dos sitios:
`appsscript/Codigo.gs` (servidor) y `assets/almacen.js` (cliente).

---

## 1. Por qué la migración es directa

Apps Script sirve páginas mediante `HtmlService`, que impone tres restricciones. La app ya
las cumple:

| Restricción de HtmlService | Cómo se resolvió |
|---|---|
| No admite `<link>` ni `<script src>` a archivos locales | El constructor incrusta CSS y JS en archivos `.html` incluidos con `<?!= incluir(...) ?>` |
| Prohíbe recursos externos (CDN, fuentes, imágenes remotas) | La app no usa ninguno: solo tipografías del sistema y emoji |
| Se ejecuta en un iframe aislado, sin acceso a la URL | El enrutador es interno, en memoria; no se usa `history.pushState` ni el hash |

A eso se añade que el cliente ya detecta el entorno y cambia de almacenamiento solo:

```js
var enAppsScript = (typeof google !== 'undefined' &&
  typeof google.script !== 'undefined' &&
  typeof google.script.run !== 'undefined');
```

Cuando esa condición es cierta, `Almacen.cargar()` y `Almacen.guardar()` llaman a
`google.script.run.leerEstado()` y `guardarEstado()` en lugar de `localStorage`. Como la API
del almacén ya devuelve promesas, ninguna vista nota la diferencia.

---

## 2. Pasos

### 2.1 Generar los archivos

```bash
node herramientas/construir.js
```

Produce en `appsscript/`: `Index.html`, `Estilos.html`, `Datos.html`, `App.html`
y `appsscript.json`. Los archivos `Codigo.gs` y `BaseDatos.gs` están escritos a mano y no se
regeneran: se copian tal cual.

### 2.2 Crear el proyecto

1. Entrar en [script.google.com](https://script.google.com) → **Nuevo proyecto**.
2. Renombrarlo, por ejemplo, «Tutor MIT — Cardiovascular».
3. Crear estos archivos con **exactamente** estos nombres (el nombre importa: `incluir()`
   los busca por él):

| Archivo en el proyecto | Tipo | Contenido |
|---|---|---|
| `Codigo.gs` | Script | `appsscript/Codigo.gs` |
| `BaseDatos.gs` | Script | `appsscript/BaseDatos.gs` |
| `Index` | HTML | `appsscript/Index.html` |
| `Estilos` | HTML | `appsscript/Estilos.html` |
| `Datos` | HTML | `appsscript/Datos.html` |
| `App` | HTML | `appsscript/App.html` |

> Al crear un archivo HTML, Apps Script añade la extensión `.html` por su cuenta: escribe
> solo `Index`, no `Index.html`.

### 2.3 Ajustar el manifiesto

En **Configuración del proyecto**, activar «Mostrar el archivo de manifiesto
appsscript.json» y sustituir su contenido por `appsscript/appsscript.json`. Ajustar
`timeZone` si no es `America/Santiago`.

### 2.4 Implementar

**Implementar → Nueva implementación → Aplicación web**

- Ejecutar como: **Yo**
- Quién tiene acceso: **Solo yo**

Autorizar los permisos y guardar la URL resultante. En el móvil, «Añadir a pantalla de
inicio» la deja como si fuera una app nativa.

---

## 3. Qué cambia al migrar

**El progreso pasa a la cuenta de Google.** Deja de vivir en un navegador concreto: se
sincroniza entre el ordenador y el móvil automáticamente. El estado se guarda en
`PropertiesService.getUserProperties()`.

**Límite de 9 KB por propiedad.** `guardarEstado()` ya lo contempla: si el JSON supera los
8.000 caracteres, lo reparte en fragmentos numerados y `leerEstadoCompleto()` lo reensambla.
Los fragmentos se escriben con **una sola llamada** (`setProperties`) y se leen con otra
(`getProperties`): medido sobre un estado de un año de uso son 11 fragmentos, así que
hacerlo de uno en uno eran 22 viajes de red por guardado. Además se **escribe antes de
borrar** lo sobrante; al revés, una interrupción a mitad dejaba el progreso destruido en
lugar de simplemente desactualizado.
Con 32 temas y 252 tarjetas el estado ronda los 40–60 KB en uso intensivo, así que la
fragmentación se activará con seguridad. El historial de exámenes, las fuentes y las notas
suman a esa cifra: son las tres claves que más crecen con el uso.

**La biblioteca guarda referencias, no archivos.** Ni `localStorage` (5–10 MB) ni
`PropertiesService` (9 KB por propiedad) admiten un PDF. Si en algún momento quieres los
documentos dentro, el sitio natural en Apps Script es Google Drive: `DriveApp` puede guardar
el archivo y devolver su identificador, y bastaría con añadir un campo `idDrive` a cada fuente
en `assets/biblioteca.js`. No está implementado.

**Migrar el progreso existente.** Antes de cambiar: `Ajustes → Exportar progreso` (copia un
JSON). Después, en la versión de Apps Script: `Ajustes → Importar`.

---

## 4. Lo que se desbloquea con Apps Script

`Codigo.gs` ya incluye estas funciones, listas para conectarse desde la interfaz:

**`volcarPlanACalendario(plan, horaInicio)`** — convierte cada bloque del plan en un evento
real de Google Calendar. El estudio deja de ser una intención y ocupa un hueco en la agenda
como cualquier otro compromiso, que para un horario de turnos es la diferencia entre cumplir
el plan y no cumplirlo.

**`registrarSesionEnHoja(datos)`** — vuelca cada sesión a una hoja de cálculo (fecha, tema,
modo, minutos, aciertos, porcentaje). Útil para hacer gráficos propios o llevar un registro
al margen de la app.

**`recordatorioDiario()`** — envía por correo los bloques pendientes del día. Requiere crear
un **activador temporal diario** desde el panel de activadores del proyecto.

**`leerDocumento(referencia)` y `listarDocsRecientes()`** — ya conectadas. Permiten traer la
respuesta de NotebookLM desde un Google Doc en lugar del portapapeles, eligiendo el documento
de una lista o pegando su enlace. Acepta también archivos `.txt` y `.json` de Drive.

**`generarConGemini(prompt, almacen)` y compañía** — ya conectadas. Llaman a la API de Gemini
con **File Search** para escribir el módulo anclado en los papers que subiste, sin copiar ni
pegar. Requieren una clave, que se guarda en `PropertiesService` y **nunca** en el estado de
la app: el estado es exportable desde Ajustes y una clave dentro viajaría en cualquier copia.

> La creación del almacén y la **subida de documentos** se hacen en Google AI Studio, que ya
> tiene interfaz para ello. La app solo lista los almacenes y consulta.

Para usarlas desde el cliente basta con llamarlas igual que a las de almacenamiento:

```js
google.script.run
  .withSuccessHandler(function (n) { UI.brindis(n + ' eventos creados'); })
  .volcarPlanACalendario(Estado.plan(), 21);
```

---

## 4 bis. La base de datos en Sheets

`BaseDatos.gs` crea un libro con 13 pestañas y vuelca ahí todo: contenido, progreso e
histórico. Se maneja desde `Ajustes → Base de datos en Sheets`.

**No sustituye a `PropertiesService`, y no debe.** Sheets tarda cerca de un segundo por
escritura y tiene cuotas por minuto: si calificar una tarjeta escribiera en la hoja, el repaso
—que es el uso diario— sería inusable. El volcado ocurre cuando tú lo pides.

Lo que sí aporta, y `PropertiesService` no puede dar:

| | |
|---|---|
| **Respaldo legible** | El progreso vive como JSON troceado en propiedades, ilegible. Una hoja se abre y se entiende. |
| **Contenido editable fuera de la app** | Corriges una tarjeta o un distractor en la hoja, sin tocar código. |
| **Datos para graficar** | Sesiones y exámenes en columnas, con los números como números. |

**Cómo se reparte la información.** Lo genuinamente tabular va en columnas; lo anidado —los
bloques con HTML, el caso clínico, el ejercicio Feynman— viaja entero en una celda
`detalle_json`. Aplanar eso en columnas sería inventarse una estructura relacional que el
contenido no tiene, y perder información al volver. Las alternativas van **una fila por
opción**, que es lo que permite corregir un distractor concreto.

**Dos detalles que evitan corrupción silenciosa:**

- Las columnas de contenido se fuerzan a **formato texto**. Sin eso, Sheets interpreta lo que
  llega: una tarjeta cuyo frente sea «1-2-3» se convierte en fecha, un identificador pierde
  los ceros de delante, y cualquier texto que empiece por `=` pasa a ser una fórmula. En las
  hojas de histórico, en cambio, los números se dejan como números para poder graficarlos.
- Sheets admite **50.000 caracteres por celda**. Si un `detalle_json` se pasa, la app recorta
  y **te dice exactamente qué celda**, en vez de perder contenido en silencio. En la hoja
  queda incompleto; en la app sigue entero.

**El histórico se vuelca pero no se reimporta.** La fuente de verdad del progreso es la app.
Dejar que una hoja lo sobrescriba abriría la puerta a perder repasos por una edición
despistada.

**Vincular una hoja existente** comprueba primero que tenga las pestañas `Meta` y `Temas`. Sin
esa comprobación, vincular la hoja equivocada y volcar encima borraría datos ajenos.

---

## 5. Comprobaciones tras la migración

- [ ] La app carga y el panel de inicio muestra las métricas.
- [ ] Una sesión completa recorre las seis fases y se registra al terminar.
- [ ] El progreso sobrevive a recargar la página (verifica que `PropertiesService` funciona).
- [ ] El mismo progreso aparece al abrir la URL desde el móvil.
- [ ] Las tarjetas se califican y las vencidas cambian de fecha.
- [ ] El plan se regenera al cambiar la disponibilidad.
- [ ] El Taller genera el prompt, valida un JSON pegado e importa el tema.
- [ ] El contenido propio importado sigue ahí tras cerrar y volver a abrir la app.
- [ ] Un simulacro se arma, se corrige, aparece en el historial y sus fallos aparecen como
      brechas en Rendimiento.
- [ ] El cronómetro del examen sigue corriendo con la pestaña en segundo plano y al volver
      marca el tiempo real (usa marcas de tiempo, no un contador de intervalos).
- [ ] Las diapositivas abren a pantalla completa dentro del iframe de Apps Script y responden
      a las flechas del teclado. **Es el punto más frágil de la migración**: el iframe no
      recibe las pulsaciones hasta que se hace clic dentro de él, así que hay que pulsar una
      vez sobre la presentación antes de navegar con el teclado.
- [ ] Una nota con `[[enlaces]]` crea la nota enlazada, genera retroenlaces y sobrevive a
      recargar.
- [ ] Una fuente con enlace externo abre en pestaña nueva (`target="_blank"`; el
      `<base target="_top">` del `Index` no debe romperlo).
- [ ] El botón de copiar el prompt funciona (algunos navegadores restringen el portapapeles
      dentro de iframes; existe un método alternativo con `execCommand` como respaldo).
- [ ] `Taller → Desde un Google Doc` lista tus documentos recientes y trae uno. Es la primera
      llamada que pide los permisos nuevos de Drive y Docs: hay que **volver a autorizar** el
      proyecto tras añadir los ámbitos al manifiesto, o fallará con un error de permisos.
- [ ] Pegar el JSON en un Doc real y traerlo: comprueba que el aviso de comillas tipográficas
      aparece y que el módulo se importa igual.
- [ ] `Ajustes → Generación con mis fuentes` guarda la clave y la prueba. Un error 403 aquí
      casi siempre es la clave, no el código.
- [ ] El desplegable de almacenes se llena. Si sale vacío, el almacén no está creado todavía:
      se crea en Google AI Studio, no desde la app.
- [ ] Un módulo generado llega con citas. **Si llega sin ellas la app lo advierte**, y esa
      advertencia hay que tomársela en serio: significa que no está anclado en tus documentos.
- [ ] Exportar el progreso y comprobar con una búsqueda de texto que la clave de Gemini **no**
      aparece en el JSON.
- [ ] `Ajustes → Base de datos en Sheets → Crear la hoja` genera un libro con 13 pestañas y
      sus cabeceras.
- [ ] `Volcar ahora` termina sin errores. Con el temario de fábrica son unas 590 filas.
- [ ] En la pestaña `Tarjetas`, una tarjeta cuyo texto empiece por `=` o parezca una fecha se
      ve tal cual, sin convertirse en fórmula ni en fecha.
- [ ] En `Sesiones`, la columna `porcentaje` se puede sumar y graficar (es número, no texto).
- [ ] Vincular una hoja de cálculo cualquiera **falla** con un mensaje claro en vez de volcar
      encima.

---

## 6. Mantenimiento

Para añadir o corregir temas, editar el archivo de datos correspondiente en `assets/`,
regenerar con `node herramientas/construir.js` y pegar de nuevo **solo** `Datos.html` en el
proyecto. El resto de archivos no cambia mientras no se toque la lógica.

Esa vía sigue siendo la adecuada para contenido que quieras distribuir con la app. Para el
contenido personal de Diego existe una alternativa mejor y sin código: el **Taller**, que crea
áreas y temas desde la interfaz y los guarda con el progreso (ver `README.md`). Ese contenido
viaja en la exportación y se restaura automáticamente al arrancar, también en Apps Script.

Para **añadir un área nueva al código base** hacen falta tres pasos: añadir la entrada en `TUTOR.AREAS`
(`assets/datos-nucleo.js`), añadir sus módulos en `TUTOR.MODULOS` con el campo `area`, y crear
un archivo `datos-<area>.js` con los temas, registrándolo en `SCRIPTS_DATOS` dentro de
`herramientas/construir.js` y en los `<script>` de `index.html`. La interfaz, el planificador,
el mazo y Minerva recogen el área nueva automáticamente.

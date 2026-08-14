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
y `appsscript.json`. El archivo `Codigo.gs` está escrito a mano y no se regenera.

### 2.2 Crear el proyecto

1. Entrar en [script.google.com](https://script.google.com) → **Nuevo proyecto**.
2. Renombrarlo, por ejemplo, «Tutor MIT — Cardiovascular».
3. Crear estos archivos con **exactamente** estos nombres (el nombre importa: `incluir()`
   los busca por él):

| Archivo en el proyecto | Tipo | Contenido |
|---|---|---|
| `Codigo.gs` | Script | `appsscript/Codigo.gs` |
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
Con 32 temas y 252 tarjetas el estado ronda los 40–60 KB en uso intensivo, así que la
fragmentación se activará con seguridad.

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

Para usarlas desde el cliente basta con llamarlas igual que a las de almacenamiento:

```js
google.script.run
  .withSuccessHandler(function (n) { UI.brindis(n + ' eventos creados'); })
  .volcarPlanACalendario(Estado.plan(), 21);
```

---

## 5. Comprobaciones tras la migración

- [ ] La app carga y el panel de inicio muestra las métricas.
- [ ] Una sesión completa recorre las seis fases y se registra al terminar.
- [ ] El progreso sobrevive a recargar la página (verifica que `PropertiesService` funciona).
- [ ] El mismo progreso aparece al abrir la URL desde el móvil.
- [ ] Las tarjetas se califican y las vencidas cambian de fecha.
- [ ] El plan se regenera al cambiar la disponibilidad.
- [ ] El botón de copiar el prompt funciona (algunos navegadores restringen el portapapeles
      dentro de iframes; existe un método alternativo con `execCommand` como respaldo).

---

## 6. Mantenimiento

Para añadir o corregir temas, editar el archivo de datos correspondiente en `assets/`,
regenerar con `node herramientas/construir.js` y pegar de nuevo **solo** `Datos.html` en el
proyecto. El resto de archivos no cambia mientras no se toque la lógica.

Para **añadir un área nueva** hacen falta tres pasos: añadir la entrada en `TUTOR.AREAS`
(`assets/datos-nucleo.js`), añadir sus módulos en `TUTOR.MODULOS` con el campo `area`, y crear
un archivo `datos-<area>.js` con los temas, registrándolo en `SCRIPTS_DATOS` dentro de
`herramientas/construir.js` y en los `<script>` de `index.html`. La interfaz, el planificador,
el mazo y Minerva recogen el área nueva automáticamente.

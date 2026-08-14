#!/usr/bin/env node
/**
 * ============================================================
 * CONSTRUCTOR
 * Genera, a partir de los mismos archivos fuente de assets/:
 *
 *   1. dist/tutor-mit.html   → archivo único autocontenido
 *                              (abrir con doble clic, sin servidor)
 *   2. dist/artefacto.html   → variante sin <html>/<head>/<body>
 *                              para publicar como página web
 *   3. appsscript/*.html     → archivos listos para pegar en
 *                              un proyecto de Google Apps Script
 *
 * Uso:  node herramientas/construir.js
 * ============================================================
 */

const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..');
const ASSETS = path.join(RAIZ, 'assets');
const DIST = path.join(RAIZ, 'dist');
const APPSSCRIPT = path.join(RAIZ, 'appsscript');

/* Orden de carga: los datos antes que la lógica. */
const SCRIPTS_DATOS = [
  'datos-nucleo.js',
  'datos-hemodinamia.js',
  'datos-electro.js',
  'datos-regulacion.js',
  'datos-fisiopato.js',
  'datos-respiratorio.js',
  'datos-renal.js',
  'datos-neuro.js',
  'datos-farmaco.js'
];

const SCRIPTS_APP = [
  'almacen.js',
  'ui.js',
  'asistente.js',
  'vistas.js',
  'estudio.js',
  'tarjetas.js',
  'app.js'
];

const leer = (f) => fs.readFileSync(path.join(ASSETS, f), 'utf8');

const asegurarDir = (d) => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
};

const css = leer('estilos.css');
const jsDatos = SCRIPTS_DATOS.map(leer).join('\n\n');
const jsApp = SCRIPTS_APP.map(leer).join('\n\n');

/* ------------------------------------------------------------
   Cuerpo compartido por todas las variantes
   ------------------------------------------------------------ */
const CUERPO = `
<div id="app">

  <aside class="lateral">
    <div class="marca">
      <div class="marca-icono">🦉</div>
      <div>
        <div class="marca-txt">Tutor MIT</div>
        <div class="marca-sub">Con Minerva</div>
      </div>
    </div>
    <nav id="nav-lateral"></nav>
    <div class="lateral-pie">
      <div class="sm tenue" style="padding:0 10px">Comprender → relacionar → recordar</div>
    </div>
  </aside>

  <main class="principal">
    <header class="barra-sup">
      <div>
        <h1 id="titulo-vista">Cargando…</h1>
        <div class="sub" id="sub-vista"></div>
      </div>
      <div class="barra-acciones" id="acciones-vista"></div>
    </header>
    <div class="contenido" id="contenido">
      <div class="vacio"><span class="emoji">🦉</span>Preparando tu tutor…</div>
    </div>
  </main>

</div>

<nav class="menu-movil" id="menu-movil"></nav>
<div id="minerva"></div>
<div class="brindis" id="brindis"></div>
`.trim();

/* ------------------------------------------------------------
   1 y 2. Archivo único y variante para publicación web
   ------------------------------------------------------------ */
asegurarDir(DIST);

const bloquesEnLinea =
  `<style>\n${css}\n</style>\n` +
  CUERPO + '\n' +
  `<script>\n${jsDatos}\n</script>\n` +
  `<script>\n${jsApp}\n</script>`;

const standalone = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Tutor MIT · Minerva</title>
<base target="_top">
</head>
<body>
${bloquesEnLinea}
</body>
</html>
`;

fs.writeFileSync(path.join(DIST, 'tutor-mit.html'), standalone);

/* La variante para publicar como página web se inserta dentro de
   un esqueleto ya provisto por el anfitrión: sin html/head/body. */
const artefacto = `<title>Tutor MIT Minerva</title>\n${bloquesEnLinea}\n`;
fs.writeFileSync(path.join(DIST, 'artefacto.html'), artefacto);

/* ------------------------------------------------------------
   3. Archivos de Google Apps Script
   HtmlService no admite <link> ni <script src>: cada recurso
   debe ser un archivo .html incluido desde la plantilla.
   ------------------------------------------------------------ */
asegurarDir(APPSSCRIPT);

fs.writeFileSync(path.join(APPSSCRIPT, 'Estilos.html'),
  `<style>\n${css}\n</style>\n`);

fs.writeFileSync(path.join(APPSSCRIPT, 'Datos.html'),
  `<script>\n${jsDatos}\n</script>\n`);

fs.writeFileSync(path.join(APPSSCRIPT, 'App.html'),
  `<script>\n${jsApp}\n</script>\n`);

fs.writeFileSync(path.join(APPSSCRIPT, 'Index.html'),
  `<!DOCTYPE html>
<html lang="es">
<head>
<base target="_top">
<meta charset="utf-8">
<?!= incluir('Estilos'); ?>
</head>
<body>
${CUERPO}
<?!= incluir('Datos'); ?>
<?!= incluir('App'); ?>
</body>
</html>
`);

fs.writeFileSync(path.join(APPSSCRIPT, 'appsscript.json'),
  JSON.stringify({
    timeZone: 'America/Santiago',
    dependencies: {},
    exceptionLogging: 'STACKDRIVER',
    runtimeVersion: 'V8',
    webapp: { executeAs: 'USER_DEPLOYING', access: 'MYSELF' },
    oauthScopes: [
      'https://www.googleapis.com/auth/script.storage',
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/spreadsheets',
      'https://www.googleapis.com/auth/script.send_mail',
      'https://www.googleapis.com/auth/userinfo.email'
    ]
  }, null, 2) + '\n');

/* ------------------------------------------------------------ */
const kb = (s) => (Buffer.byteLength(s, 'utf8') / 1024).toFixed(0) + ' KB';

console.log('Construcción completada:\n');
console.log('  dist/tutor-mit.html      ' + kb(standalone) + '  (archivo único, doble clic)');
console.log('  dist/artefacto.html      ' + kb(artefacto) + '  (para publicar como página)');
console.log('  appsscript/Index.html    plantilla con incluir()');
console.log('  appsscript/Estilos.html  ' + kb(css));
console.log('  appsscript/Datos.html    ' + kb(jsDatos) + '  (temario)');
console.log('  appsscript/App.html      ' + kb(jsApp) + '  (lógica)');
console.log('  appsscript/Codigo.gs     backend (escrito a mano, no se regenera)');
console.log('  appsscript/appsscript.json');
const bloqueAreas = (jsDatos.split('TUTOR.AREAS = [')[1] || '').split('\n];')[0];
console.log('\nÁreas: ' + (bloqueAreas.match(/^\s*id: '/gm) || []).length +
  '  ·  Temas: ' + (jsDatos.match(/^\s{2}id: '/gm) || []).length +
  '  ·  Tarjetas: ' + (jsDatos.match(/^\s*\{ f: '/gm) || []).length);

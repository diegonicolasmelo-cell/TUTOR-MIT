/**
 * ============================================================
 * TUTOR MIT — CARDIOVASCULAR
 * Backend de Google Apps Script
 * ------------------------------------------------------------
 * Este archivo es lo ÚNICO que hay que escribir del lado
 * servidor. El cliente (assets/almacen.js) detecta que corre
 * dentro de Apps Script y redirige la persistencia aquí, sin
 * que ninguna vista cambie.
 *
 * Instalación:
 *   1. script.google.com → Nuevo proyecto
 *   2. Pega este archivo como "Codigo.gs"
 *   3. Añade los archivos HTML generados por
 *      herramientas/construir.js (carpeta appsscript/)
 *   4. Implementar → Nueva implementación → Aplicación web
 *      · Ejecutar como: yo
 *      · Quién tiene acceso: solo yo
 * ============================================================
 */

var CLAVE_ESTADO = 'TUTOR_MIT_ESTADO';
var NOMBRE_HOJA_REGISTRO = 'Sesiones';

/* ------------------------------------------------------------
   Punto de entrada de la aplicación web
   ------------------------------------------------------------ */
function doGet() {
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('Tutor MIT · Cardiovascular')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1, viewport-fit=cover')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/** Permite componer los archivos HTML desde la plantilla Index. */
function incluir(nombre) {
  return HtmlService.createHtmlOutputFromFile(nombre).getContent();
}

/* ------------------------------------------------------------
   Persistencia del progreso
   El estado completo se guarda como JSON en las propiedades
   del usuario, de modo que viaja con su cuenta de Google.
   ------------------------------------------------------------ */
function leerEstado() {
  var props = PropertiesService.getUserProperties();
  var json = props.getProperty(CLAVE_ESTADO);
  return json || null;
}

function guardarEstado(json) {
  // Límite de PropertiesService: 9 KB por valor. Si el progreso
  // crece por encima, se reparte en fragmentos numerados.
  var props = PropertiesService.getUserProperties();
  var TAMANO = 8000;

  limpiarFragmentos_(props);

  if (json.length <= TAMANO) {
    props.setProperty(CLAVE_ESTADO, json);
    return true;
  }

  var partes = Math.ceil(json.length / TAMANO);
  var mapa = { __fragmentado: true, partes: partes };
  props.setProperty(CLAVE_ESTADO, JSON.stringify(mapa));
  for (var i = 0; i < partes; i++) {
    props.setProperty(CLAVE_ESTADO + '_' + i, json.substr(i * TAMANO, TAMANO));
  }
  return true;
}

function limpiarFragmentos_(props) {
  var todas = props.getProperties();
  Object.keys(todas).forEach(function (k) {
    if (k.indexOf(CLAVE_ESTADO + '_') === 0) props.deleteProperty(k);
  });
}

/** Reensambla el estado si estaba fragmentado. */
function leerEstadoCompleto() {
  var props = PropertiesService.getUserProperties();
  var base = props.getProperty(CLAVE_ESTADO);
  if (!base) return null;
  try {
    var posible = JSON.parse(base);
    if (posible && posible.__fragmentado) {
      var out = '';
      for (var i = 0; i < posible.partes; i++) {
        out += props.getProperty(CLAVE_ESTADO + '_' + i) || '';
      }
      return out;
    }
  } catch (e) { /* no era un mapa de fragmentos: es el estado */ }
  return base;
}

function reiniciarEstado() {
  var props = PropertiesService.getUserProperties();
  limpiarFragmentos_(props);
  props.deleteProperty(CLAVE_ESTADO);
  return true;
}

/* ------------------------------------------------------------
   OPCIONAL — Registro de sesiones en Google Sheets
   Útil para llevar un histórico fuera de la app y hacer
   gráficos propios. Llamar desde el cliente si se desea.
   ------------------------------------------------------------ */
function registrarSesionEnHoja(datos) {
  try {
    var hoja = obtenerHojaRegistro_();
    hoja.appendRow([
      new Date(),
      datos.tema || '',
      datos.modo || '',
      datos.minutos || 0,
      datos.aciertos || 0,
      datos.total || 0,
      datos.total ? Math.round((datos.aciertos / datos.total) * 100) : ''
    ]);
    return true;
  } catch (e) {
    return false;
  }
}

function obtenerHojaRegistro_() {
  var libro = SpreadsheetApp.getActiveSpreadsheet();
  if (!libro) {
    var props = PropertiesService.getUserProperties();
    var id = props.getProperty('TUTOR_MIT_HOJA');
    if (id) {
      libro = SpreadsheetApp.openById(id);
    } else {
      libro = SpreadsheetApp.create('Tutor MIT — registro de estudio');
      props.setProperty('TUTOR_MIT_HOJA', libro.getId());
    }
  }
  var hoja = libro.getSheetByName(NOMBRE_HOJA_REGISTRO);
  if (!hoja) {
    hoja = libro.insertSheet(NOMBRE_HOJA_REGISTRO);
    hoja.appendRow(['Fecha', 'Tema', 'Modo', 'Minutos', 'Aciertos', 'Preguntas', '% acierto']);
    hoja.getRange('A1:G1').setFontWeight('bold');
    hoja.setFrozenRows(1);
  }
  return hoja;
}

/* ------------------------------------------------------------
   OPCIONAL — Volcado del plan a Google Calendar
   Convierte los bloques del plan en eventos reales, de modo
   que el estudio ocupe un hueco en la agenda como cualquier
   otro compromiso.
   ------------------------------------------------------------ */
function volcarPlanACalendario(plan, horaInicio) {
  var calendario = CalendarApp.getDefaultCalendar();
  var hora = horaInicio || 21;   // por defecto, 21:00
  var creados = 0;

  Object.keys(plan).forEach(function (fecha) {
    var minutosAcumulados = 0;
    plan[fecha].forEach(function (bloque) {
      var partes = fecha.split('-');
      var inicio = new Date(partes[0], partes[1] - 1, partes[2], hora, 0, 0);
      inicio.setMinutes(inicio.getMinutes() + minutosAcumulados);
      var fin = new Date(inicio.getTime() + bloque.minutos * 60000);

      var titulo = bloque.tipo === 'repaso'
        ? '🔁 Tarjetas · repaso espaciado'
        : '🫀 Estudio · ' + (bloque.tituloTema || bloque.tema);

      calendario.createEvent(titulo, inicio, fin, {
        description: 'Tutor MIT — Cardiovascular\nBloque generado automáticamente por tu plan de estudio.'
      });
      minutosAcumulados += bloque.minutos;
      creados++;
    });
  });
  return creados;
}

/* ------------------------------------------------------------
   OPCIONAL — Recordatorio diario por correo
   Crear un activador temporal diario que llame a esta función.
   ------------------------------------------------------------ */
function recordatorioDiario() {
  var json = leerEstadoCompleto();
  if (!json) return;
  var estado = JSON.parse(json);
  var hoy = new Date().toISOString().slice(0, 10);
  var bloques = (estado.plan && estado.plan[hoy]) || [];
  if (!bloques.length) return;

  var pendientes = bloques.filter(function (b) { return !b.hecho; });
  if (!pendientes.length) return;

  var minutos = pendientes.reduce(function (a, b) { return a + b.minutos; }, 0);
  var cuerpo = 'Hoy tienes ' + minutos + ' minutos planificados:\n\n' +
    pendientes.map(function (b) {
      return '· ' + (b.tipo === 'repaso' ? 'Repaso de tarjetas' : b.tituloTema || b.tema) +
        ' (' + b.minutos + ' min)';
    }).join('\n') +
    '\n\nAbre el tutor: ' + ScriptApp.getService().getUrl();

  MailApp.sendEmail({
    to: Session.getActiveUser().getEmail(),
    subject: 'Tutor MIT · tu bloque de hoy (' + minutos + ' min)',
    body: cuerpo
  });
}

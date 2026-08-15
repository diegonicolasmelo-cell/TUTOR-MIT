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
  //
  // Dos cosas importan aquí, y ninguna es evidente:
  //
  // 1. Cada setProperty() es una llamada de red. Al año de uso el
  //    estado ronda los 80 KB = 11 fragmentos, así que escribirlos
  //    de uno en uno eran 11 viajes por guardado. setProperties()
  //    los manda en uno solo.
  //
  // 2. El orden importa más que la velocidad. Antes se borraban
  //    todos los fragmentos ANTES de escribir los nuevos: si el
  //    script se agotaba o fallaba a mitad, el progreso quedaba
  //    destruido, no viejo. Ahora se escribe primero y se retira
  //    lo sobrante después, de modo que en cualquier interrupción
  //    lo peor que queda es un estado completo, el anterior o el
  //    nuevo.
  var props = PropertiesService.getUserProperties();
  var TAMANO = 8000;
  var lote = {};
  var partes = 0;

  if (json.length <= TAMANO) {
    lote[CLAVE_ESTADO] = json;
  } else {
    partes = Math.ceil(json.length / TAMANO);
    lote[CLAVE_ESTADO] = JSON.stringify({ __fragmentado: true, partes: partes });
    for (var i = 0; i < partes; i++) {
      lote[CLAVE_ESTADO + '_' + i] = json.substr(i * TAMANO, TAMANO);
    }
  }

  // false = no borrar las demás propiedades del usuario.
  props.setProperties(lote, false);

  // Retirar los fragmentos que sobran de un guardado anterior más
  // largo. Si el estado encogió, o dejó de estar fragmentado,
  // partes vale 0 y se van todos.
  var prefijo = CLAVE_ESTADO + '_';
  props.getKeys().forEach(function (k) {
    if (k.indexOf(prefijo) !== 0) return;
    var n = parseInt(k.slice(prefijo.length), 10);
    if (isNaN(n) || n >= partes) props.deleteProperty(k);
  });
  return true;
}

function limpiarFragmentos_(props) {
  var prefijo = CLAVE_ESTADO + '_';
  props.getKeys().forEach(function (k) {
    if (k.indexOf(prefijo) === 0) props.deleteProperty(k);
  });
}

/** Reensambla el estado si estaba fragmentado. */
function leerEstadoCompleto() {
  var props = PropertiesService.getUserProperties();
  var todas = props.getProperties();   // una sola llamada, no una por fragmento
  var base = todas[CLAVE_ESTADO];
  if (!base) return null;
  try {
    var posible = JSON.parse(base);
    if (posible && posible.__fragmentado) {
      var out = '';
      for (var i = 0; i < posible.partes; i++) {
        out += todas[CLAVE_ESTADO + '_' + i] || '';
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
   GOOGLE DOCS COMO BANDEJA DE ENTRADA
   ------------------------------------------------------------
   NotebookLM no tiene API pública, así que la app no puede
   pedirle nada directamente. Lo que sí puede es recoger la
   respuesta sin pasar por el portapapeles: pegas lo que te
   devuelva NotebookLM en un Google Doc y la app lo lee de ahí.

   Parece un rodeo y es justo al revés: en el móvil, copiar 9 KB
   de JSON de una app a otra es donde se rompe el flujo. Pegar en
   un Doc que ya tienes abierto, no.
   ------------------------------------------------------------ */

/** Acepta una URL completa de Docs, un enlace corto o el propio ID. */
function extraerIdDoc_(referencia) {
  var t = String(referencia || '').trim();
  if (!t) return null;
  var m = t.match(/\/d\/([a-zA-Z0-9_-]{20,})/);      // .../document/d/<ID>/edit
  if (m) return m[1];
  m = t.match(/[?&]id=([a-zA-Z0-9_-]{20,})/);        // ...open?id=<ID>
  if (m) return m[1];
  if (/^[a-zA-Z0-9_-]{20,}$/.test(t)) return t;      // el ID pelado
  return null;
}

function leerDocumento(referencia) {
  var id = extraerIdDoc_(referencia);
  if (!id) {
    return { ok: false, error: 'No reconozco ese enlace. Pega la URL completa del ' +
      'documento (la que empieza por docs.google.com/document/d/…) o su identificador.' };
  }
  try {
    var doc = DocumentApp.openById(id);
    return { ok: true, id: id, nombre: doc.getName(), texto: doc.getBody().getText() };
  } catch (e) {
    /* Puede no ser un Doc nativo sino un .txt o .json subido a
       Drive, que también sirve como bandeja. */
    try {
      var f = DriveApp.getFileById(id);
      var tipo = f.getMimeType();
      if (tipo === 'text/plain' || tipo === 'application/json') {
        return { ok: true, id: id, nombre: f.getName(),
          texto: f.getBlob().getDataAsString('UTF-8') };
      }
      return { ok: false, error: 'Ese archivo es de tipo «' + tipo + '», y solo puedo ' +
        'leer Documentos de Google, .txt o .json.' };
    } catch (e2) {
      return { ok: false, error: 'No pude abrirlo. Comprueba que el documento existe y ' +
        'que es de tu cuenta: ' + (e2.message || e2) };
    }
  }
}

/** Los Docs tocados hace poco: en el móvil elegir de una lista
    es bastante menos trabajo que pegar una URL. */
function listarDocsRecientes() {
  try {
    var it = DriveApp.searchFiles(
      'mimeType = "application/vnd.google-apps.document" and trashed = false');
    var lista = [];
    var tope = 0;
    while (it.hasNext() && tope < 60) {
      var f = it.next();
      tope++;
      lista.push({ id: f.getId(), nombre: f.getName(), modificado: f.getLastUpdated().toISOString() });
    }
    lista.sort(function (a, b) { return a.modificado < b.modificado ? 1 : -1; });
    return { ok: true, docs: lista.slice(0, 15) };
  } catch (e) {
    return { ok: false, error: 'No pude listar tus documentos: ' + (e.message || e) };
  }
}

/* ------------------------------------------------------------
   GEMINI CON FILE SEARCH
   ------------------------------------------------------------
   La sustitución real de NotebookLM. File Search es RAG
   gestionado: subes tus papers a un almacén y el modelo responde
   anclado en ellos. Es el mismo mecanismo que usa NotebookLM por
   dentro, pero con API, así que el Taller puede generar el módulo
   sin que copies ni pegues nada.

   La subida de documentos al almacén se hace UNA VEZ desde
   Google AI Studio, que ya tiene interfaz para ello. Aquí solo
   se listan los almacenes y se consulta: es la parte que la app
   necesita en cada uso.

   La clave vive en las propiedades del usuario y NUNCA en el
   estado de la app. Importa: el estado se puede exportar desde
   Ajustes, y una clave dentro de ese JSON viajaría en cualquier
   copia que compartas o guardes.
   ------------------------------------------------------------ */

var CLAVE_GEMINI = 'TUTOR_MIT_GEMINI_KEY';
var MODELO_GEMINI = 'TUTOR_MIT_GEMINI_MODELO';
var BASE_GEMINI = 'https://generativelanguage.googleapis.com/v1beta';

function guardarClaveGemini(clave, modelo) {
  var props = PropertiesService.getUserProperties();
  var k = String(clave || '').trim();
  if (!k) return { ok: false, error: 'La clave está vacía.' };
  props.setProperty(CLAVE_GEMINI, k);
  if (modelo) props.setProperty(MODELO_GEMINI, String(modelo).trim());
  return { ok: true };
}

function borrarClaveGemini() {
  PropertiesService.getUserProperties().deleteProperty(CLAVE_GEMINI);
  return { ok: true };
}

/** Nunca devuelve la clave, solo si está puesta. */
function estadoGemini() {
  var props = PropertiesService.getUserProperties();
  var k = props.getProperty(CLAVE_GEMINI);
  return {
    ok: true,
    configurada: !!k,
    pista: k ? ('…' + k.slice(-4)) : '',
    modelo: props.getProperty(MODELO_GEMINI) || 'gemini-flash-latest'
  };
}

function claveGemini_() {
  return PropertiesService.getUserProperties().getProperty(CLAVE_GEMINI);
}

/** Llamada HTTP con los errores legibles en vez de una excepción. */
function pedirGemini_(ruta, metodo, cuerpo) {
  var clave = claveGemini_();
  if (!clave) {
    return { ok: false, error: 'No hay clave de Gemini guardada. Ponla en Ajustes.' };
  }
  var opciones = {
    method: metodo,
    muteHttpExceptions: true,
    headers: { 'x-goog-api-key': clave }
  };
  if (cuerpo) {
    opciones.contentType = 'application/json';
    opciones.payload = JSON.stringify(cuerpo);
  }
  try {
    var res = UrlFetchApp.fetch(BASE_GEMINI + ruta, opciones);
    var codigo = res.getResponseCode();
    var texto = res.getContentText();
    var datos = null;
    try { datos = JSON.parse(texto); } catch (e) { /* respuesta no-JSON */ }

    if (codigo >= 200 && codigo < 300) return { ok: true, datos: datos };

    var msg = (datos && datos.error && datos.error.message) ? datos.error.message : texto.slice(0, 300);
    if (codigo === 401 || codigo === 403) {
      msg = 'La clave no es válida o no tiene permiso para este modelo. ' + msg;
    } else if (codigo === 429) {
      msg = 'Has superado la cuota de la API por ahora. ' + msg;
    }
    return { ok: false, error: 'Gemini respondió ' + codigo + ': ' + msg };
  } catch (e) {
    return { ok: false, error: 'No se pudo contactar con Gemini: ' + (e.message || e) };
  }
}

/** Comprueba que la clave sirve de verdad, con la llamada más barata posible. */
function probarGemini() {
  var r = pedirGemini_('/models', 'get', null);
  if (!r.ok) return r;
  var modelos = (r.datos && r.datos.models) ? r.datos.models.length : 0;
  return { ok: true, modelos: modelos };
}

function listarAlmacenesGemini() {
  var r = pedirGemini_('/fileSearchStores', 'get', null);
  if (!r.ok) return r;
  var lista = (r.datos && r.datos.fileSearchStores) || [];
  return {
    ok: true,
    almacenes: lista.map(function (a) {
      return { nombre: a.name, titulo: a.displayName || a.name };
    })
  };
}

/**
 * Genera contenido anclado en los documentos del almacén.
 * Devuelve el texto tal cual: lo valida el mismo Taller que
 * valida lo que pegas a mano, así que no hay una vía con menos
 * comprobaciones que la otra.
 */
function generarConGemini(prompt, almacen) {
  var props = PropertiesService.getUserProperties();
  var modelo = props.getProperty(MODELO_GEMINI) || 'gemini-flash-latest';

  var cuerpo = {
    contents: [{ parts: [{ text: String(prompt || '') }] }]
  };
  /* Sin almacén sigue funcionando, pero entonces el modelo
     responde de memoria y eso es justo lo que hay que evitar:
     se avisa al cliente para que lo diga en pantalla. */
  if (almacen) {
    cuerpo.tools = [{ fileSearch: { fileSearchStoreNames: [almacen] } }];
  }

  var r = pedirGemini_('/models/' + encodeURIComponent(modelo) + ':generateContent', 'post', cuerpo);
  if (!r.ok) return r;

  var cand = (r.datos && r.datos.candidates && r.datos.candidates[0]) || null;
  if (!cand) {
    var bloqueo = r.datos && r.datos.promptFeedback && r.datos.promptFeedback.blockReason;
    return { ok: false, error: bloqueo
      ? 'Gemini bloqueó la petición (' + bloqueo + ').'
      : 'Gemini no devolvió ninguna respuesta.' };
  }

  var partes = (cand.content && cand.content.parts) || [];
  var texto = partes.map(function (p) { return p.text || ''; }).join('');
  if (!texto.trim()) {
    return { ok: false, error: 'La respuesta llegó vacía (motivo: ' +
      (cand.finishReason || 'desconocido') + ').' };
  }

  /* Las citas permiten comprobar de qué documento salió cada cosa,
     que es la diferencia entre material anclado y material inventado. */
  var citas = [];
  var meta = cand.groundingMetadata;
  if (meta && meta.groundingChunks) {
    meta.groundingChunks.forEach(function (c) {
      var t = (c.retrievedContext && c.retrievedContext.title) || (c.web && c.web.title);
      if (t && citas.indexOf(t) < 0) citas.push(t);
    });
  }

  return {
    ok: true, texto: texto, modelo: modelo,
    anclado: !!almacen, citas: citas,
    finalizacion: cand.finishReason || ''
  };
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

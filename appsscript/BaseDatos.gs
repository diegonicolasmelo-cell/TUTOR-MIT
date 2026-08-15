/**
 * ============================================================
 * TUTOR MIT — BASE DE DATOS EN GOOGLE SHEETS
 * ------------------------------------------------------------
 * Segundo archivo del servidor. Pégalo como "BaseDatos.gs" en el
 * mismo proyecto que Codigo.gs.
 *
 * QUÉ ES Y QUÉ NO ES
 * ------------------------------------------------------------
 * NO es el almacén principal. El progreso sigue viviendo en
 * PropertiesService, y tiene que seguir así: calificar una
 * tarjeta escribe el estado, y si cada calificación implicase
 * una escritura en Sheets (~1 s, con cuotas por minuto) el
 * repaso sería inusable. Sheets es lento para el camino
 * caliente y esa es una propiedad del producto, no un detalle.
 *
 * SÍ es tres cosas que PropertiesService no puede dar:
 *   1. Un respaldo legible. El JSON fragmentado en propiedades
 *      es ilegible para un humano; una hoja se abre y se lee.
 *   2. Contenido editable fuera de la app. Corriges una tarjeta
 *      en la hoja y la reimportas, sin tocar código.
 *   3. Datos para graficar. Tus sesiones y exámenes en columnas,
 *      listos para las gráficas que quieras hacerte.
 *
 * POR QUÉ EL VOLCADO VA POR TANDAS
 * ------------------------------------------------------------
 * El servidor no conoce el temario: los 32 temas viven en el
 * paquete del cliente (Datos.html), no aquí. Así que es el
 * cliente quien arma las filas y las manda. Y las manda por
 * secciones en vez de todo junto porque el temario completo
 * ronda los 700 KB: en una sola llamada es frágil y no deja
 * enseñar progreso.
 * ============================================================
 */

var CLAVE_HOJA_BD = 'TUTOR_MIT_BD_ID';

/* ------------------------------------------------------------
   ESQUEMA
   ------------------------------------------------------------
   Cada sección declara sus columnas y el formato de cada una.

   El formato importa más de lo que parece. Sin declararlo,
   Sheets interpreta lo que le llega: una tarjeta cuyo frente sea
   «1-2-3» se convierte en fecha, un identificador con ceros
   delante los pierde, y cualquier texto que empiece por «=» pasa
   a ser una fórmula. En contenido eso es corrupción silenciosa,
   así que va todo como texto. En las hojas de histórico, en
   cambio, interesa que los números sean números para poder
   graficarlos.
   ------------------------------------------------------------ */
var ESQUEMA_BD = {
  Areas: {
    grupo: 'contenido',
    columnas: ['id', 'nombre', 'icono', 'resumen', 'lema', 'origen'],
    formatos: ['texto', 'texto', 'texto', 'texto', 'texto', 'texto']
  },
  Modulos: {
    grupo: 'contenido',
    columnas: ['id', 'area', 'nombre', 'icono', 'resumen', 'origen'],
    formatos: ['texto', 'texto', 'texto', 'texto', 'texto', 'texto']
  },
  Temas: {
    grupo: 'contenido',
    columnas: ['id', 'modulo', 'area', 'nombre', 'alto', 'minutos',
      'ideaCentral', 'perla', 'fuentes', 'origen', 'verificado', 'detalle_json'],
    formatos: ['texto', 'texto', 'texto', 'texto', 'texto', 'numero',
      'texto', 'texto', 'texto', 'texto', 'texto', 'texto']
  },
  Tarjetas: {
    grupo: 'contenido',
    columnas: ['tema', 'indice', 'frente', 'dorso'],
    formatos: ['texto', 'numero', 'texto', 'texto']
  },
  Alternativas: {
    grupo: 'contenido',
    columnas: ['tema', 'nivel', 'pregunta', 'opcion', 'correcta', 'razon'],
    formatos: ['texto', 'numero', 'texto', 'texto', 'texto', 'texto']
  },
  Progreso: {
    grupo: 'historico',
    columnas: ['tema', 'dominio', 'vistas', 'minutos', 'aciertos', 'intentos', 'ultimo'],
    formatos: ['texto', 'numero', 'numero', 'numero', 'numero', 'numero', 'texto']
  },
  Repaso: {
    grupo: 'historico',
    columnas: ['tema', 'indice', 'facilidad', 'intervalo', 'repeticiones', 'lapsos', 'vence'],
    formatos: ['texto', 'numero', 'numero', 'numero', 'numero', 'numero', 'texto']
  },
  Sesiones: {
    grupo: 'historico',
    columnas: ['fecha', 'tema', 'modo', 'minutos', 'aciertos', 'total', 'porcentaje'],
    formatos: ['texto', 'texto', 'texto', 'numero', 'numero', 'numero', 'numero']
  },
  Examenes: {
    grupo: 'historico',
    columnas: ['fecha', 'porcentaje', 'preguntas', 'minutos', 'detalle_json'],
    formatos: ['texto', 'numero', 'numero', 'numero', 'texto']
  },
  Brechas: {
    grupo: 'historico',
    columnas: ['fecha', 'tema', 'concepto'],
    formatos: ['texto', 'texto', 'texto']
  },
  Notas: {
    grupo: 'contenido',
    columnas: ['id', 'titulo', 'temas', 'creado', 'modificado', 'cuerpo'],
    formatos: ['texto', 'texto', 'texto', 'texto', 'texto', 'texto']
  },
  Fuentes: {
    grupo: 'contenido',
    columnas: ['id', 'titulo', 'autores', 'anio', 'tipo', 'enlace', 'temas'],
    formatos: ['texto', 'texto', 'texto', 'numero', 'texto', 'texto', 'texto']
  },
  Meta: {
    grupo: 'meta',
    columnas: ['clave', 'valor'],
    formatos: ['texto', 'texto']
  },
  Consultas: {
    grupo: 'consultas',
    columnas: [],
    formatos: []
  }
};

var ORDEN_BD = ['Consultas', 'Meta', 'Areas', 'Modulos', 'Temas', 'Tarjetas', 'Alternativas',
  'Notas', 'Fuentes', 'Progreso', 'Repaso', 'Sesiones', 'Examenes', 'Brechas'];

/* ------------------------------------------------------------
   CONSULTAS PREPARADAS
   ------------------------------------------------------------
   Tener los datos en columnas no es lo mismo que poder
   preguntarles nada: hay que saber escribir la consulta. Esta
   pestaña deja las preguntas ya escritas y resueltas, y se
   recalculan solas en cada volcado.

   Se usa QUERY(), que es lenguaje SQL de verdad sobre un rango.
   Las fórmulas se escriben con COMA como separador aunque tu
   Sheets esté en español: Apps Script las recibe en formato
   estadounidense y Sheets las muestra ya traducidas.

   Cada bloque ocupa 3 columnas y se separan de 4 en 4 para que
   ninguno pise al de al lado al crecer.
   ------------------------------------------------------------ */
var CONSULTAS = [
  { titulo: 'Temas que peor llevas',
    ayuda: 'dominio de 0 a 100, de menor a mayor',
    formula: '=IFERROR(QUERY(Progreso!A2:G,"select A, B where A is not null order by B asc limit 15",0),"aún sin datos")' },

  { titulo: 'Dónde se va tu tiempo',
    ayuda: 'minutos y nº de sesiones por tema',
    formula: '=IFERROR(QUERY(Sesiones!A2:G,"select B, sum(D), count(A) where B is not null group by B order by sum(D) desc limit 15",0),"aún sin datos")' },

  { titulo: 'Brechas más repetidas',
    ayuda: 'lo que fallas una y otra vez',
    formula: '=IFERROR(QUERY(Brechas!A2:C,"select B, count(C) where B is not null group by B order by count(C) desc limit 15",0),"aún sin datos")' },

  { titulo: 'Tarjetas que más se te olvidan',
    ayuda: 'lapsos = veces que la fallaste tras haberla sabido',
    formula: '=IFERROR(QUERY(Repaso!A2:G,"select A, B, F where F > 0 order by F desc limit 15",0),"aún sin datos")' },

  { titulo: 'Evolución de tus exámenes',
    ayuda: 'fecha y porcentaje, del más reciente al más antiguo',
    formula: '=IFERROR(QUERY(Examenes!A2:E,"select A, B where A is not null order by A desc limit 15",0),"aún sin datos")' },

  { titulo: 'Qué tienes vencido hoy',
    ayuda: 'tarjetas por tema con fecha de repaso ya pasada',
    formula: '=IFERROR(QUERY(Repaso!A2:G,"select A, count(B) where G <= \'"&TEXT(TODAY(),"yyyy-mm-dd")&"\' group by A order by count(B) desc limit 15",0),"nada vencido")' }
];

function prepararConsultas_(hoja) {
  var anchoNecesario = 4 * CONSULTAS.length;
  if (hoja.getMaxColumns() < anchoNecesario) {
    hoja.insertColumnsAfter(hoja.getMaxColumns(), anchoNecesario - hoja.getMaxColumns());
  }
  CONSULTAS.forEach(function (c, i) {
    var col = 1 + i * 4;
    hoja.getRange(1, col).setValue(c.titulo).setFontWeight('bold').setBackground('#eef2f7');
    hoja.getRange(2, col).setValue(c.ayuda).setFontStyle('italic').setFontSize(9);
    /* setFormula, no setValue: con setValue la cadena se guardaría
       como texto y se vería la fórmula en vez del resultado. */
    hoja.getRange(3, col).setFormula(c.formula);
  });
  hoja.setFrozenRows(2);
}

/* Límite duro de Sheets. Un tema con muchos bloques puede
   acercarse, y truncar en silencio sería perder contenido sin
   que nadie se entere. */
var MAX_CELDA = 50000;

/* ------------------------------------------------------------
   CREACIÓN
   ------------------------------------------------------------ */

function crearBaseDeDatos(titulo) {
  try {
    var nombre = String(titulo || '').trim() || 'Tutor MIT · base de datos';
    var libro = SpreadsheetApp.create(nombre);

    ORDEN_BD.forEach(function (seccion, i) {
      var def = ESQUEMA_BD[seccion];
      var hoja = (i === 0) ? libro.getSheets()[0] : libro.insertSheet();
      hoja.setName(seccion);
      if (def.grupo === 'consultas') prepararConsultas_(hoja);
      else prepararHoja_(hoja, def);
    });

    var props = PropertiesService.getUserProperties();
    props.setProperty(CLAVE_HOJA_BD, libro.getId());

    escribirMeta_(libro, {
      creada: new Date().toISOString(),
      version: '1',
      nota: 'El progreso vive en la app; esta hoja es respaldo, contenido editable y datos para graficar.'
    });

    return { ok: true, id: libro.getId(), url: libro.getUrl(), titulo: nombre };
  } catch (e) {
    return { ok: false, error: 'No se pudo crear la hoja: ' + (e.message || e) };
  }
}

function prepararHoja_(hoja, def) {
  var n = def.columnas.length;
  hoja.getRange(1, 1, 1, n).setValues([def.columnas])
    .setFontWeight('bold')
    .setBackground('#eef2f7');
  hoja.setFrozenRows(1);
  /* El formato se fija en TODA la columna, no solo en las filas
     escritas, para que siga valiendo cuando se añadan filas
     nuevas a mano desde la hoja. */
  aplicarFormatos_(hoja, def);
  if (hoja.getMaxColumns() > n) {
    hoja.deleteColumns(n + 1, hoja.getMaxColumns() - n);
  }
}

function aplicarFormatos_(hoja, def) {
  var filas = hoja.getMaxRows();
  def.formatos.forEach(function (f, i) {
    var rango = hoja.getRange(2, i + 1, Math.max(filas - 1, 1), 1);
    rango.setNumberFormat(f === 'numero' ? '0.##' : '@');
  });
}

/** Vincula una hoja ya existente en lugar de crear otra. */
function vincularBaseDeDatos(referencia) {
  var t = String(referencia || '').trim();
  var m = t.match(/\/d\/([a-zA-Z0-9_-]{20,})/);
  var id = m ? m[1] : (/^[a-zA-Z0-9_-]{20,}$/.test(t) ? t : null);
  if (!id) return { ok: false, error: 'No reconozco ese enlace de hoja de cálculo.' };
  try {
    var libro = SpreadsheetApp.openById(id);
    /* Se comprueba que es una hoja de esta app y no una
       cualquiera, porque volcar encima de la hoja equivocada
       borraría datos ajenos. */
    if (!libro.getSheetByName('Meta') || !libro.getSheetByName('Temas')) {
      return { ok: false, error: 'Esa hoja no tiene la estructura de la base de datos ' +
        '(faltan las pestañas «Meta» y «Temas»). Crea una nueva en vez de vincular esta, ' +
        'o el volcado borraría lo que tenga dentro.' };
    }
    PropertiesService.getUserProperties().setProperty(CLAVE_HOJA_BD, id);
    return { ok: true, id: id, url: libro.getUrl(), titulo: libro.getName() };
  } catch (e) {
    return { ok: false, error: 'No pude abrirla: ' + (e.message || e) };
  }
}

function olvidarBaseDeDatos() {
  PropertiesService.getUserProperties().deleteProperty(CLAVE_HOJA_BD);
  return { ok: true };
}

function estadoBaseDeDatos() {
  var id = PropertiesService.getUserProperties().getProperty(CLAVE_HOJA_BD);
  if (!id) return { ok: true, configurada: false };
  try {
    var libro = SpreadsheetApp.openById(id);
    return { ok: true, configurada: true, id: id, url: libro.getUrl(), titulo: libro.getName() };
  } catch (e) {
    return { ok: true, configurada: false,
      aviso: 'Había una hoja vinculada pero ya no se puede abrir (¿borrada?). Crea otra.' };
  }
}

function libroBD_() {
  var id = PropertiesService.getUserProperties().getProperty(CLAVE_HOJA_BD);
  if (!id) return null;
  return SpreadsheetApp.openById(id);
}

/* ------------------------------------------------------------
   VOLCADO
   ------------------------------------------------------------ */

/**
 * Escribe una sección completa. El cliente llama una vez por
 * sección; así ninguna llamada mueve el temario entero y se
 * puede enseñar por dónde va.
 */
function volcarSeccion(nombre, filas) {
  var def = ESQUEMA_BD[nombre];
  if (!def) return { ok: false, error: 'Sección desconocida: ' + nombre };
  if (def.grupo === 'consultas') {
    /* «Consultas» son fórmulas, no datos: escribir filas encima
       las borraría y la pestaña dejaría de responder nada. */
    return { ok: false, error: 'La pestaña «Consultas» son fórmulas y se recalculan solas; ' +
      'no se vuelcan datos en ella.' };
  }

  var libro = libroBD_();
  if (!libro) return { ok: false, error: 'No hay ninguna hoja vinculada. Créala primero.' };

  var hoja = libro.getSheetByName(nombre);
  if (!hoja) return { ok: false, error: 'Falta la pestaña «' + nombre + '» en la hoja.' };

  try {
    var n = def.columnas.length;
    var datos = filas || [];
    var recortados = [];

    /* Se normaliza cada fila al ancho del esquema: si el cliente
       manda de más o de menos, setValues lanzaría un error poco
       informativo en vez de decir qué sección falla. */
    var matriz = datos.map(function (fila, iFila) {
      var salida = [];
      for (var c = 0; c < n; c++) {
        var v = fila[c];
        if (v === undefined || v === null) v = '';
        if (typeof v === 'string' && v.length > MAX_CELDA) {
          recortados.push(nombre + ' fila ' + (iFila + 2) + ', columna «' + def.columnas[c] + '»');
          v = v.slice(0, MAX_CELDA - 40) + '…[RECORTADO POR LÍMITE DE SHEETS]';
        }
        salida.push(v);
      }
      return salida;
    });

    /* Limpiar antes de escribir: si el volcado anterior tenía más
       filas, las sobrantes quedarían como datos fantasma. */
    var ultima = hoja.getMaxRows();
    if (ultima > 1) hoja.getRange(2, 1, ultima - 1, n).clearContent();

    if (matriz.length) {
      /* Una sola llamada a setValues. Fila a fila sería del orden
         de un segundo por fila y agotaría el tiempo de ejecución. */
      if (hoja.getMaxRows() < matriz.length + 1) {
        hoja.insertRowsAfter(hoja.getMaxRows(), matriz.length + 1 - hoja.getMaxRows());
        aplicarFormatos_(hoja, def);
      }
      hoja.getRange(2, 1, matriz.length, n).setValues(matriz);
    }

    return { ok: true, seccion: nombre, filas: matriz.length, recortados: recortados };
  } catch (e) {
    return { ok: false, error: 'Al escribir «' + nombre + '»: ' + (e.message || e) };
  }
}

function finalizarVolcado(resumen) {
  var libro = libroBD_();
  if (!libro) return { ok: false, error: 'No hay ninguna hoja vinculada.' };
  try {
    var meta = resumen || {};
    meta.ultimoVolcado = new Date().toISOString();
    escribirMeta_(libro, meta);
    SpreadsheetApp.flush();
    return { ok: true, url: libro.getUrl() };
  } catch (e) {
    return { ok: false, error: 'Al cerrar el volcado: ' + (e.message || e) };
  }
}

function escribirMeta_(libro, objeto) {
  var hoja = libro.getSheetByName('Meta');
  if (!hoja) return;
  var previo = {};
  var alto = hoja.getLastRow();
  if (alto > 1) {
    hoja.getRange(2, 1, alto - 1, 2).getValues().forEach(function (f) {
      if (f[0]) previo[f[0]] = f[1];
    });
  }
  Object.keys(objeto).forEach(function (k) { previo[k] = String(objeto[k]); });

  var filas = Object.keys(previo).map(function (k) { return [k, previo[k]]; });
  if (alto > 1) hoja.getRange(2, 1, alto - 1, 2).clearContent();
  if (filas.length) hoja.getRange(2, 1, filas.length, 2).setValues(filas);
}

/* ------------------------------------------------------------
   LECTURA
   ------------------------------------------------------------
   Solo se leen las secciones de contenido. El histórico se
   vuelca pero no se reimporta: la fuente de verdad del progreso
   es la app, y dejar que una hoja lo sobrescriba abriría la
   puerta a perder repasos por una edición despistada.
   ------------------------------------------------------------ */

function leerSeccion(nombre) {
  var def = ESQUEMA_BD[nombre];
  if (!def) return { ok: false, error: 'Sección desconocida: ' + nombre };
  if (def.grupo !== 'contenido') {
    return { ok: false, error: 'La sección «' + nombre + '» es histórico y no se reimporta. ' +
      'El progreso lo manda la app, no la hoja.' };
  }

  var libro = libroBD_();
  if (!libro) return { ok: false, error: 'No hay ninguna hoja vinculada.' };
  var hoja = libro.getSheetByName(nombre);
  if (!hoja) return { ok: false, error: 'Falta la pestaña «' + nombre + '».' };

  try {
    var alto = hoja.getLastRow();
    if (alto < 2) return { ok: true, seccion: nombre, columnas: def.columnas, filas: [] };

    var valores = hoja.getRange(2, 1, alto - 1, def.columnas.length).getValues();
    /* Se descartan las filas totalmente vacías: al editar a mano
       es fácil dejar huecos, y no son un error. */
    var filas = valores.filter(function (f) {
      return f.some(function (v) { return String(v).trim() !== ''; });
    }).map(function (f) {
      return f.map(function (v) { return (v === null || v === undefined) ? '' : String(v); });
    });

    return { ok: true, seccion: nombre, columnas: def.columnas, filas: filas };
  } catch (e) {
    return { ok: false, error: 'Al leer «' + nombre + '»: ' + (e.message || e) };
  }
}

/** Devuelve las secciones de contenido de una vez, para reimportar. */
function leerContenidoBD() {
  var salida = { ok: true, secciones: {} };
  var fallos = [];
  ['Areas', 'Modulos', 'Temas', 'Tarjetas', 'Alternativas'].forEach(function (s) {
    var r = leerSeccion(s);
    if (r.ok) salida.secciones[s] = r;
    else fallos.push(r.error);
  });
  if (fallos.length) return { ok: false, error: fallos.join(' · ') };
  return salida;
}

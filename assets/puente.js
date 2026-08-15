/* ============================================================
   PUENTE CON GOOGLE
   ------------------------------------------------------------
   Todo lo que la app necesita del lado servidor pasa por aquí:
   leer un Google Doc, listar los recientes y (más adelante)
   hablar con la API de Gemini.

   Por qué existe este archivo y no está repartido por las
   vistas: estas funciones SOLO existen dentro de Apps Script.
   En el navegador no hay DriveApp ni UrlFetchApp, y fingir lo
   contrario haría que la app pareciese funcionar en el mockup
   y fallara justo donde importa. Así que el puente responde
   siempre con la misma forma —{ ok, ... } o { ok:false, error }—
   y cuando no está disponible lo dice con todas las letras en
   vez de romperse.
   ============================================================ */

var Puente = (function () {

  var enAppsScript = (typeof google !== 'undefined' &&
    typeof google.script !== 'undefined' &&
    typeof google.script.run !== 'undefined');

  var MOTIVO_SIN_PUENTE =
    'Esto necesita la versión instalada en Google Apps Script. ' +
    'En el mockup del navegador no hay acceso a tu Drive: mira MIGRACION.md ' +
    'para instalarla, o pega el JSON a mano en el paso 3.';

  /* google.script.run usa manejadores, no promesas. Envolverlo
     una vez evita repetir el mismo bloque en cada llamada y deja
     que las vistas usen async/await como con el almacén. */
  function llamar(nombre) {
    var args = Array.prototype.slice.call(arguments, 1);
    return new Promise(function (resolver) {
      if (!enAppsScript) {
        resolver({ ok: false, error: MOTIVO_SIN_PUENTE, sinPuente: true });
        return;
      }
      var run = google.script.run
        .withSuccessHandler(function (r) {
          /* El servidor devuelve siempre { ok: ... }; si algo
             llega vacío se trata como fallo, no como éxito mudo. */
          resolver(r || { ok: false, error: 'El servidor no devolvió nada.' });
        })
        .withFailureHandler(function (e) {
          resolver({ ok: false, error: (e && e.message) ? e.message : String(e) });
        });
      run[nombre].apply(run, args);
    });
  }

  return {
    disponible: function () { return enAppsScript; },
    motivo: MOTIVO_SIN_PUENTE,
    llamar: llamar,

    /* --- Google Docs como bandeja de entrada --- */
    leerDoc: function (referencia) { return llamar('leerDocumento', referencia); },
    docsRecientes: function () { return llamar('listarDocsRecientes'); },

    /* --- Gemini con File Search ---
       La clave nunca pasa por aquí de vuelta: guardarClave la
       manda al servidor y estadoClave solo dice si está puesta.
       Así no queda copia en el estado de la app, que es
       exportable. */
    guardarClave: function (clave, modelo) { return llamar('guardarClaveGemini', clave, modelo); },
    borrarClave: function () { return llamar('borrarClaveGemini'); },
    estadoClave: function () { return llamar('estadoGemini'); },
    probarClave: function () { return llamar('probarGemini'); },
    almacenes: function () { return llamar('listarAlmacenesGemini'); },
    generar: function (prompt, almacen) { return llamar('generarConGemini', prompt, almacen); },

    /* --- base de datos en Sheets --- */
    bdEstado: function () { return llamar('estadoBaseDeDatos'); },
    bdCrear: function (titulo) { return llamar('crearBaseDeDatos', titulo); },
    bdVincular: function (ref) { return llamar('vincularBaseDeDatos', ref); },
    bdOlvidar: function () { return llamar('olvidarBaseDeDatos'); },
    bdVolcar: function (seccion, filas) { return llamar('volcarSeccion', seccion, filas); },
    bdFinalizar: function (meta) { return llamar('finalizarVolcado', meta); },
    bdLeerContenido: function () { return llamar('leerContenidoBD'); }
  };
})();

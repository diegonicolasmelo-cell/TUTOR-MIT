/* ============================================================
   BASE DE DATOS EN SHEETS — lado cliente
   ------------------------------------------------------------
   El servidor no conoce el temario: los temas viven en este
   paquete, no en Apps Script. Así que las filas se arman aquí y
   se mandan por secciones.

   Qué va a cada sitio, y por qué:

   · CONTENIDO (áreas, módulos, temas, tarjetas, alternativas,
     notas, fuentes) va desglosado en columnas cuando es
     realmente tabular, y en una celda JSON cuando no lo es. Un
     tema tiene bloques con HTML, un caso clínico con pasos y un
     ejercicio Feynman: aplanar eso en columnas sería inventarse
     una estructura relacional que no existe y perder información
     al volver. Lo tabular se edita cómodo; lo anidado viaja
     entero en «detalle_json».

   · HISTÓRICO (progreso, repaso, sesiones, exámenes, brechas) va
     en columnas y con los números como números, porque el motivo
     de tenerlo en Sheets es poder graficarlo.
   ============================================================ */

var BD = (function () {

  function texto(v) {
    if (v === undefined || v === null) return '';
    return String(v);
  }

  function numero(v) {
    var n = Number(v);
    return isFinite(n) ? n : 0;
  }

  function lista(v) {
    return Array.isArray(v) ? v.join(', ') : texto(v);
  }

  /* Lo que NO cabe en columnas viaja aquí. Se excluyen los
     campos que ya tienen columna propia para no duplicarlos. */
  var YA_EN_COLUMNAS = ['id', 'modulo', 'nombre', 'alto', 'minutos',
    'ideaCentral', 'perla', 'fuentes', 'propio', 'verificado', 'tarjetas', 'mcq'];

  function detalleDeTema(t) {
    var resto = {};
    Object.keys(t).forEach(function (k) {
      if (YA_EN_COLUMNAS.indexOf(k) < 0) resto[k] = t[k];
    });
    return JSON.stringify(resto);
  }

  /* ------------------------------------------------------------
     Constructores de filas, uno por sección
     ------------------------------------------------------------ */
  var CONSTRUCTORES = {

    Areas: function () {
      return TUTOR.AREAS.map(function (a) {
        return [a.id, a.nombre, a.icono, a.resumen, texto(a.lema),
          a.propio ? 'propio' : 'de fábrica'];
      });
    },

    Modulos: function () {
      return TUTOR.MODULOS.map(function (m) {
        return [m.id, m.area, m.nombre, texto(m.icono), texto(m.resumen),
          m.propio ? 'propio' : 'de fábrica'];
      });
    },

    Temas: function () {
      return TUTOR.TEMAS.map(function (t) {
        return [t.id, t.modulo, texto(TUTOR.areaDeTema(t.id)), t.nombre,
          t.alto ? 'sí' : 'no', texto(t.minutos), texto(t.ideaCentral),
          texto(t.perla), texto(t.fuentes),
          t.propio ? 'propio' : 'de fábrica',
          t.propio ? (t.verificado ? 'sí' : 'no') : '—',
          detalleDeTema(t)];
      });
    },

    Tarjetas: function () {
      var filas = [];
      TUTOR.TEMAS.forEach(function (t) {
        (t.tarjetas || []).forEach(function (c, i) {
          filas.push([t.id, String(i), texto(c.f), texto(c.d)]);
        });
      });
      return filas;
    },

    /* Una fila por OPCIÓN, no por pregunta. Es lo que permite
       corregir un distractor concreto desde la hoja, que es
       justo para lo que sirve tenerlo aquí. */
    Alternativas: function () {
      var filas = [];
      TUTOR.TEMAS.forEach(function (t) {
        TUTOR.mcqDe(t.id).forEach(function (q) {
          (q.o || []).forEach(function (op) {
            filas.push([t.id, texto(q.n), texto(q.q), texto(op.t),
              op.ok ? 'sí' : '', texto(op.r)]);
          });
        });
      });
      return filas;
    },

    Notas: function () {
      return Estado.notas().map(function (n) {
        return [n.id, texto(n.titulo), lista(n.temas), texto(n.creado),
          texto(n.modificado), texto(n.cuerpo)];
      });
    },

    Fuentes: function () {
      return Estado.fuentes().map(function (f) {
        return [f.id, texto(f.titulo), texto(f.autor), texto(f.anio),
          texto(f.tipo), texto(f.enlace), lista(f.temas)];
      });
    },

    Progreso: function () {
      var temas = Estado.datos().temas || {};
      return Object.keys(temas).map(function (id) {
        var p = temas[id];
        return [id, numero(p.dominio), numero(p.vistas), numero(p.minutos),
          numero(p.aciertos), numero(p.intentos), texto(p.ultimo)];
      });
    },

    Repaso: function () {
      var tarjetas = Estado.datos().tarjetas || {};
      return Object.keys(tarjetas).map(function (clave) {
        var r = tarjetas[clave];
        var corte = clave.lastIndexOf('::');
        return [
          corte >= 0 ? clave.slice(0, corte) : clave,
          numero(corte >= 0 ? clave.slice(corte + 2) : 0),
          numero(r.facilidad), numero(r.intervalo),
          numero(r.repeticiones), numero(r.lapsos), texto(r.vence)
        ];
      });
    },

    Sesiones: function () {
      return (Estado.datos().sesiones || []).map(function (s) {
        return [texto(s.fecha), texto(s.tema), texto(s.modo), numero(s.minutos),
          numero(s.aciertos), numero(s.total), numero(s.porcentaje)];
      });
    },

    Examenes: function () {
      return (Estado.datos().examenes || []).map(function (e) {
        return [texto(e.fecha), numero(e.porcentaje), numero(e.preguntas),
          numero(e.minutos), JSON.stringify({ porArea: e.porArea, porNivel: e.porNivel })];
      });
    },

    Brechas: function () {
      return (Estado.datos().brechas || []).map(function (b) {
        return [texto(b.fecha), texto(b.tema), texto(b.texto)];
      });
    }
  };

  var SECCIONES = ['Areas', 'Modulos', 'Temas', 'Tarjetas', 'Alternativas',
    'Notas', 'Fuentes', 'Progreso', 'Repaso', 'Sesiones', 'Examenes', 'Brechas'];

  function filasDe(seccion) {
    var f = CONSTRUCTORES[seccion];
    return f ? f() : [];
  }

  /**
   * Vuelca todo, sección a sección, avisando del avance.
   * Secuencial a propósito: en paralelo las llamadas competirían
   * por el mismo libro y Sheets serializa igualmente.
   */
  function volcar(alAvanzar) {
    var resumen = { secciones: 0, filas: 0, recortados: [], errores: [] };

    function paso(i) {
      if (i >= SECCIONES.length) {
        return Puente.bdFinalizar({
          temas: TUTOR.TEMAS.length,
          tarjetas: TUTOR.todasLasTarjetas().length,
          alternativas: TUTOR.totalMcq(),
          filasTotales: resumen.filas
        }).then(function (r) {
          resumen.ok = !resumen.errores.length && r.ok;
          resumen.url = r.url;
          if (!r.ok && r.error) resumen.errores.push(r.error);
          return resumen;
        });
      }

      var seccion = SECCIONES[i];
      if (alAvanzar) alAvanzar(seccion, i, SECCIONES.length);

      var filas;
      try {
        filas = filasDe(seccion);
      } catch (e) {
        resumen.errores.push(seccion + ': no se pudieron armar las filas (' + e.message + ')');
        return paso(i + 1);
      }

      return Puente.bdVolcar(seccion, filas).then(function (r) {
        if (!r.ok) resumen.errores.push(r.error);
        else {
          resumen.secciones += 1;
          resumen.filas += r.filas;
          if (r.recortados && r.recortados.length) {
            resumen.recortados = resumen.recortados.concat(r.recortados);
          }
        }
        return paso(i + 1);
      });
    }

    return paso(0);
  }

  return {
    SECCIONES: SECCIONES,
    filasDe: filasDe,
    volcar: volcar
  };
})();

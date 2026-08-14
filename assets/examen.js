/* ============================================================
   EXAMEN — preguntas de alternativa con corrección automática
   ------------------------------------------------------------
   Simula la prueba real: cronómetro, navegación entre preguntas,
   marcar para revisar y entrega con informe.

   Lo que lo separa de un cuestionario cualquiera es la revisión:
   cada distractor lleva escrito POR QUÉ es incorrecto, de modo
   que un fallo enseña el error conceptual concreto que lo
   provocó. Los temas fallados generan brechas y vuelven al plan.
   ============================================================ */

var Examen = (function () {
  var e = null;   // examen en curso

  function barajar(lista) {
    var a = lista.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /* ------------------------------------------------------------
     Construcción del examen.
     Se muestrea de los temas activos, priorizando los de menor
     dominio y los de alto rendimiento: el examen debe atacar lo
     flojo, no repartirse a ciegas.
     ------------------------------------------------------------ */
  function construir(cfg) {
    var candidatos = [];

    Estado.temasActivos().forEach(function (t) {
      if (cfg.area && TUTOR.areaDeTema(t.id) !== cfg.area) return;
      TUTOR.mcqDe(t.id).forEach(function (p, i) {
        if (cfg.nivel && cfg.nivel !== 'todos' && String(p.n) !== String(cfg.nivel)) return;
        candidatos.push({
          ref: t.id + '#' + i,
          tema: t.id,
          area: TUTOR.areaDeTema(t.id),
          n: p.n,
          q: p.q,
          o: p.o,
          /* Menor dominio y alto rendimiento pesan más. */
          peso: (100 - Estado.dominio(t.id)) + (t.alto ? 30 : 0) + Math.random() * 25
        });
      });
    });

    if (!candidatos.length) return null;

    candidatos.sort(function (a, b) { return b.peso - a.peso; });
    var elegidas = candidatos.slice(0, cfg.preguntas);

    /* Se baraja el orden de las preguntas y el de sus opciones,
       para que no se memorice la posición de la correcta. */
    return barajar(elegidas).map(function (p) {
      return {
        ref: p.ref, tema: p.tema, area: p.area, n: p.n, q: p.q,
        opciones: barajar(p.o),
        respuesta: null,
        marcada: false
      };
    });
  }

  function iniciar(cfg) {
    var preguntas = construir(cfg);
    if (!preguntas || !preguntas.length) {
      UI.brindis('No hay preguntas disponibles con esos filtros');
      return false;
    }
    e = {
      cfg: cfg,
      preguntas: preguntas,
      indice: 0,
      inicio: Date.now(),
      entregado: false,
      resultado: null
    };
    UI.ir('examen');
    Crono.iniciar(cfg.minutos, function (seg, txt) {
      var el = UI.$('#crono-examen');
      if (!el) return;
      el.textContent = txt;
      el.className = 'cronometro' + (seg < 0 ? ' critico' : seg < 120 ? ' aviso' : '');
    }, function () {
      UI.brindis('Se acabó el tiempo · entrega automática');
      entregar();
    });
    return true;
  }

  function responder(indicePregunta, indiceOpcion) {
    e.preguntas[indicePregunta].respuesta = indiceOpcion;
  }

  function marcar(indicePregunta) {
    var p = e.preguntas[indicePregunta];
    p.marcada = !p.marcada;
  }

  function ir(indice) {
    e.indice = Math.max(0, Math.min(e.preguntas.length - 1, indice));
    UI.refrescar();
    window.scrollTo(0, 0);
  }

  /* ------------------------------------------------------------
     Corrección
     ------------------------------------------------------------ */
  function entregar() {
    if (!e || e.entregado) return;
    Crono.parar();
    e.entregado = true;

    var porArea = {}, porNivel = { 1: { ok: 0, n: 0 }, 2: { ok: 0, n: 0 }, 3: { ok: 0, n: 0 } };
    var aciertos = 0, sinResponder = 0;
    var temasFallados = {};

    e.preguntas.forEach(function (p) {
      var elegida = p.respuesta === null ? null : p.opciones[p.respuesta];
      var correcta = elegida && elegida.ok === true;
      p.correcta = correcta;
      if (p.respuesta === null) sinResponder++;
      if (correcta) aciertos++;

      if (!porArea[p.area]) porArea[p.area] = { ok: 0, n: 0 };
      porArea[p.area].n++;
      if (correcta) porArea[p.area].ok++;

      porNivel[p.n].n++;
      if (correcta) porNivel[p.n].ok++;

      /* Cada respuesta alimenta el dominio del tema, igual que
         las preguntas abiertas de una sesión. */
      Estado.registrarRespuesta(p.tema, correcta);

      if (!correcta) {
        temasFallados[p.tema] = (temasFallados[p.tema] || 0) + 1;
      }
    });

    /* Los fallos se convierten en brechas: es información, no castigo. */
    Object.keys(temasFallados).forEach(function (idTema) {
      Estado.anotarBrecha(idTema, 'Examen: ' + temasFallados[idTema] +
        (temasFallados[idTema] === 1 ? ' pregunta fallada' : ' preguntas falladas'));
    });

    var minutos = Math.max(1, Math.round((Date.now() - e.inicio) / 60000));
    e.resultado = {
      aciertos: aciertos,
      total: e.preguntas.length,
      sinResponder: sinResponder,
      porcentaje: Math.round((aciertos / e.preguntas.length) * 100),
      porArea: porArea,
      porNivel: porNivel,
      minutos: minutos
    };

    Estado.registrarExamen({
      fecha: new Date().toISOString(),
      preguntas: e.preguntas.length,
      aciertos: aciertos,
      minutos: minutos,
      area: e.cfg.area || null
    });

    UI.refrescar();
    window.scrollTo(0, 0);
  }

  function abandonar() {
    Crono.parar();
    e = null;
    UI.ir('inicio');
  }

  /* ------------------------------------------------------------
     RENDER
     ------------------------------------------------------------ */
  function cabecera() {
    var respondidas = e.preguntas.filter(function (p) { return p.respuesta !== null; }).length;
    return '<div class="sesion-cab">' +
      '<div><div class="sm tenue">Examen · ' + e.preguntas.length + ' preguntas</div>' +
      '<div style="font-weight:650">' + respondidas + ' respondidas</div></div>' +
      '<div class="pasos-sesion">' +
      e.preguntas.map(function (p, i) {
        return '<div class="paso-sesion ' +
          (p.respuesta !== null ? 'hecho' : '') + (i === e.indice ? ' actual' : '') + '"></div>';
      }).join('') +
      '</div>' +
      '<div class="cronometro" id="crono-examen">--:--</div>' +
      '<button class="btn btn-s btn-fantasma" data-accion="examen-abandonar">Salir</button>' +
      '</div>';
  }

  function renderPregunta() {
    var p = e.preguntas[e.indice];
    var nombresNivel = { 1: 'Conocimiento', 2: 'Integración', 3: 'Razonamiento clínico' };

    var html = cabecera();

    html += '<div class="tarjeta">' +
      '<div class="linea entre" style="margin-bottom:10px">' +
      '<span class="etiq">Pregunta ' + (e.indice + 1) + ' de ' + e.preguntas.length + '</span>' +
      '<span class="etiq etiq-info">' + nombresNivel[p.n] + '</span>' +
      '</div>' +
      '<div class="enunciado" style="font-size:1.06rem;font-weight:600;margin-bottom:16px">' + p.q + '</div>' +
      '<div class="alternativas">';

    p.opciones.forEach(function (o, i) {
      html += '<button class="alternativa' + (p.respuesta === i ? ' sel' : '') + '" ' +
        'data-accion="examen-responder" data-i="' + i + '">' +
        '<span class="letra">' + String.fromCharCode(65 + i) + '</span>' +
        '<span class="texto">' + UI.esc(o.t) + '</span></button>';
    });

    html += '</div>' +
      '<div class="linea entre mt">' +
      '<button class="btn btn-s btn-fantasma" data-accion="examen-marcar">' +
      (p.marcada ? '★ Marcada para revisar' : '☆ Marcar para revisar') + '</button>' +
      '<div class="linea">' +
      (e.indice > 0 ? '<button class="btn btn-s" data-accion="examen-ir" data-i="' + (e.indice - 1) + '">← Anterior</button>' : '') +
      (e.indice < e.preguntas.length - 1
        ? '<button class="btn btn-s btn-primario" data-accion="examen-ir" data-i="' + (e.indice + 1) + '">Siguiente →</button>'
        : '<button class="btn btn-s btn-acento" data-accion="examen-entregar">Entregar</button>') +
      '</div></div></div>';

    /* Mapa de navegación */
    html += '<div class="tarjeta"><div class="tarjeta-cab"><h3>Todas las preguntas</h3>' +
      '<div class="der"><button class="btn btn-s btn-acento" data-accion="examen-entregar">Entregar examen</button></div></div>' +
      '<div class="mapa-preguntas">' +
      e.preguntas.map(function (q, i) {
        var clase = 'casilla' + (q.respuesta !== null ? ' respondida' : '') +
          (q.marcada ? ' marcada' : '') + (i === e.indice ? ' actual' : '');
        return '<button class="' + clase + '" data-accion="examen-ir" data-i="' + i + '">' + (i + 1) + '</button>';
      }).join('') +
      '</div>' +
      '<p class="sm tenue mt mb0">Puedes volver atrás y cambiar respuestas antes de entregar. ' +
      'Las marcadas aparecen con borde para localizarlas rápido.</p>' +
      '</div>';

    return html;
  }

  function renderResultado() {
    var r = e.resultado;
    var aprobado = r.porcentaje >= 60;

    var html = '<div class="tarjeta centro">' +
      '<div style="font-size:2.6rem">' + (r.porcentaje >= 80 ? '🎯' : aprobado ? '✅' : '📌') + '</div>' +
      '<div class="metrica" style="align-items:center">' +
      '<span class="valor" style="font-size:3rem">' + r.porcentaje + '%</span>' +
      '<span class="nota">' + r.aciertos + ' de ' + r.total + ' correctas · ' + r.minutos + ' min' +
      (r.sinResponder ? ' · ' + r.sinResponder + ' sin responder' : '') + '</span></div>' +
      UI.barra(r.porcentaje, r.porcentaje >= 70 ? 'ok' : r.porcentaje >= 50 ? 'alerta' : 'acento') +
      '</div>';

    /* Desglose por nivel: dice QUÉ tipo de fallo tienes */
    html += '<div class="rejilla c3 mt">';
    var nombresNivel = { 1: 'Conocimiento', 2: 'Integración', 3: 'Razonamiento' };
    [1, 2, 3].forEach(function (n) {
      var d = r.porNivel[n];
      var pct = d.n ? Math.round((d.ok / d.n) * 100) : null;
      html += '<div class="tarjeta"><div class="metrica">' +
        '<span class="rotulo">' + nombresNivel[n] + '</span>' +
        '<span class="valor">' + (pct === null ? '—' : pct + '%') + '</span>' +
        '<span class="nota">' + d.ok + ' de ' + d.n + '</span>' +
        (pct === null ? '' : UI.barra(pct, pct >= 70 ? 'ok' : 'alerta')) +
        '</div></div>';
    });
    html += '</div>';

    /* Desglose por área */
    html += '<div class="tarjeta mt"><div class="tarjeta-cab"><h3>Por área</h3></div>';
    Object.keys(r.porArea).forEach(function (idArea) {
      var a = TUTOR.area(idArea);
      var d = r.porArea[idArea];
      var pct = Math.round((d.ok / d.n) * 100);
      html += '<div class="fila"><div style="font-size:1.15rem">' + (a ? a.icono : '📗') + '</div>' +
        '<div class="crece"><div class="titulo">' + UI.esc(a ? a.nombre : idArea) + '</div>' +
        UI.barra(pct, pct >= 70 ? 'ok' : 'alerta') + '</div>' +
        '<div class="sm tenue">' + d.ok + '/' + d.n + '</div></div>';
    });
    html += '</div>';

    /* Interpretación honesta del resultado */
    var lectura;
    var n3 = r.porNivel[3], n1 = r.porNivel[1];
    if (n3.n && n1.n && (n1.ok / n1.n) - (n3.ok / n3.n) > 0.3) {
      lectura = 'Tienes los datos pero fallas al aplicarlos: la diferencia entre nivel 1 y nivel 3 es grande. ' +
        'No necesitas releer, necesitas más casos clínicos.';
    } else if (n1.n && (n1.ok / n1.n) < 0.6) {
      lectura = 'Los fallos empiezan en el nivel básico, así que el problema no es de razonamiento sino de base. ' +
        'Vuelve a los temas con menor dominio en modo comprender.';
    } else if (r.porcentaje >= 80) {
      lectura = 'Resultado sólido y repartido. Este es el momento de subir el nivel de dificultad o de profundizar, ' +
        'no de repetir lo que ya dominas.';
    } else {
      lectura = 'Resultado intermedio: revisa abajo cada fallo con su explicación. ' +
        'Los temas fallados ya se han registrado como brechas y volverán a tu plan.';
    }
    html += '<div class="aviso mt"><b>Lectura del resultado.</b> ' + lectura + '</div>';

    /* Revisión pregunta a pregunta */
    html += '<div class="tarjeta mt"><div class="tarjeta-cab"><h3>Revisión</h3>' +
      '<div class="der sm tenue">Cada opción explica por qué</div></div></div>';

    e.preguntas.forEach(function (p, i) {
      var elegida = p.respuesta === null ? null : p.respuesta;
      html += '<div class="tarjeta revision ' + (p.correcta ? 'ok' : 'mal') + '">' +
        '<div class="linea entre" style="margin-bottom:8px">' +
        '<span class="etiq ' + (p.correcta ? 'etiq-ok' : 'etiq-acento') + '">' +
        (p.correcta ? '✓ Correcta' : elegida === null ? '— Sin responder' : '✗ Fallada') + '</span>' +
        '<span class="sm tenue">' + (i + 1) + ' · ' + UI.esc((TUTOR.tema(p.tema) || {}).nombre || '') + '</span>' +
        '</div>' +
        '<div class="enunciado" style="font-weight:600;margin-bottom:10px">' + p.q + '</div>';

      p.opciones.forEach(function (o, k) {
        var esCorrecta = o.ok === true;
        var esElegida = elegida === k;
        var clase = 'opcion-revision' + (esCorrecta ? ' correcta' : '') + (esElegida && !esCorrecta ? ' elegida' : '');
        html += '<div class="' + clase + '">' +
          '<div class="cab-op"><span class="letra">' + String.fromCharCode(65 + k) + '</span>' +
          '<span class="texto">' + UI.esc(o.t) + '</span>' +
          (esCorrecta ? '<span class="etiq etiq-ok">correcta</span>' : '') +
          (esElegida && !esCorrecta ? '<span class="etiq etiq-acento">tu respuesta</span>' : '') +
          '</div>' +
          '<div class="razon">' + UI.esc(o.r) + '</div></div>';
      });

      html += '<div class="linea fin mt">' +
        '<button class="btn btn-s btn-fantasma" data-accion="ver-tema" data-tema="' + p.tema + '">Ver el tema</button>' +
        '</div></div>';
    });

    html += '<div class="linea fin mt">' +
      '<button class="btn" data-accion="ir-inicio">Volver al inicio</button>' +
      '<button class="btn btn-primario" data-accion="navegar" data-ruta="preparar-examen">Otro examen</button>' +
      '</div>';

    return html;
  }

  function render() {
    if (!e) return '<div class="vacio">No hay examen activo.</div>';
    return e.entregado ? renderResultado() : renderPregunta();
  }

  return {
    iniciar: iniciar, render: render, entregar: entregar, abandonar: abandonar,
    responder: responder, marcar: marcar, ir: ir,
    activo: function () { return !!e; },
    datos: function () { return e; }
  };
})();


/* ------------------------------------------------------------
   VISTAS
   ------------------------------------------------------------ */

UI.registrar('preparar-examen', {
  titulo: 'Simulacro de examen',
  sub: function () {
    return TUTOR.totalMcq() + ' preguntas de alternativa disponibles';
  },
  angosto: true,
  render: function () {
    var disponibles = TUTOR.totalMcq();
    if (!disponibles) {
      return '<div class="tarjeta"><div class="vacio"><span class="emoji">📝</span>' +
        'Todavía no hay preguntas de alternativa.<br>' +
        '<span class="sm">Puedes generarlas desde el Taller a partir de tus propias fuentes.</span>' +
        '<div class="mt"><button class="btn btn-primario" data-accion="navegar" data-ruta="taller">Ir al Taller</button></div>' +
        '</div></div>';
    }

    var areas = '<option value="">Todas las áreas activas</option>' +
      TUTOR.AREAS.filter(function (a) { return Estado.areaActiva(a.id); }).map(function (a) {
        var n = TUTOR.temasDeArea(a.id).reduce(function (s, t) { return s + TUTOR.mcqDe(t.id).length; }, 0);
        if (!n) return '';
        return '<option value="' + a.id + '">' + a.icono + ' ' + UI.esc(a.nombre) + ' (' + n + ')</option>';
      }).join('');

    var html = '<div class="tarjeta">' +
      '<p class="sm tenue">Un simulacro no sirve solo para medir: <b>hacer el examen es en sí una de las formas ' +
      'más eficaces de estudiar</b>. Recuperar bajo presión de tiempo consolida más que releer, y los fallos ' +
      'señalan exactamente dónde volver. Al terminar verás por qué cada alternativa incorrecta lo era.</p>' +

      '<div class="rejilla c2">' +
      '<label class="campo"><span>Duración</span><select id="x-minutos">' +
      [10, 20, 30, 45, 60].map(function (m) {
        return '<option value="' + m + '"' + (m === 30 ? ' selected' : '') + '>' + m + ' minutos</option>';
      }).join('') + '</select></label>' +

      '<label class="campo"><span>Número de preguntas</span><select id="x-preguntas">' +
      [5, 10, 15, 20, 30].map(function (n) {
        return '<option value="' + n + '"' + (n === 15 ? ' selected' : '') + '>' + n + ' preguntas</option>';
      }).join('') + '</select></label>' +
      '</div>' +

      '<div class="rejilla c2">' +
      '<label class="campo"><span>Área</span><select id="x-area">' + areas + '</select></label>' +
      '<label class="campo"><span>Nivel</span><select id="x-nivel">' +
      '<option value="todos">Todos los niveles</option>' +
      '<option value="1">Solo conocimiento</option>' +
      '<option value="2">Solo integración</option>' +
      '<option value="3">Solo razonamiento clínico</option>' +
      '</select></label>' +
      '</div>' +

      '<div class="aviso"><b>Cómo se eligen las preguntas.</b> No al azar: pesan más los temas con ' +
      'menor dominio y los de alto rendimiento. El examen ataca lo flojo. Además se baraja el orden de las ' +
      'opciones, para que no se memorice la posición de la correcta.</div>' +

      '<button class="btn btn-primario btn-g btn-bloque" data-accion="examen-iniciar">Comenzar examen ▶</button>' +
      '</div>';

    /* Historial */
    var historial = Estado.examenes();
    if (historial.length) {
      html += '<div class="tarjeta mt"><div class="tarjeta-cab"><h3>Exámenes anteriores</h3></div>';
      historial.slice(0, 8).forEach(function (x) {
        var pct = Math.round((x.aciertos / x.preguntas) * 100);
        var a = x.area ? TUTOR.area(x.area) : null;
        html += '<div class="fila"><div class="crece">' +
          '<div class="titulo">' + (a ? a.icono + ' ' + UI.esc(a.nombre) : 'Todas las áreas') + '</div>' +
          '<div class="sub">' + UI.fechaCorta(x.fecha.slice(0, 10)) + ' · ' + x.preguntas + ' preguntas · ' + x.minutos + ' min</div></div>' +
          '<span class="etiq ' + (pct >= 70 ? 'etiq-ok' : pct >= 50 ? 'etiq-alerta' : 'etiq-acento') + '">' + pct + '%</span>' +
          '</div>';
      });
      html += '</div>';
    }

    return html;
  }
});

UI.registrar('examen', {
  titulo: function () {
    return Examen.activo() && Examen.datos().entregado ? 'Resultado del examen' : 'Examen en curso';
  },
  sub: function () {
    if (!Examen.activo()) return '';
    var e = Examen.datos();
    return e.entregado ? 'Revisa cada pregunta: los distractores explican el error'
      : e.cfg.preguntas + ' preguntas · ' + e.cfg.minutos + ' minutos';
  },
  angosto: true,
  render: function () { return Examen.render(); }
});

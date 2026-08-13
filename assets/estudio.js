/* ============================================================
   ESTUDIO — motor de la sesión guiada con el método MIT
   Fases: anclaje → comprensión → Feynman → recuperación activa
          → razonamiento clínico → consolidación
   ============================================================ */

var Sesion = (function () {
  var s = null;   // sesión activa

  /* ------------------------------------------------------------
     Reparto del tiempo entre fases según el modo elegido
     ------------------------------------------------------------ */
  function repartirTiempo(modo, minutos) {
    var total = 0;
    modo.fases.forEach(function (f) { total += modo.pesos[f] || 0; });
    return modo.fases.map(function (f) {
      return {
        id: f,
        minutos: Math.max(1, Math.round(minutos * (modo.pesos[f] || 0) / total))
      };
    });
  }

  /* Selección de preguntas según modo y tiempo disponible. */
  function elegirPreguntas(tema, modo, minutosFase) {
    var cupo = Math.max(2, Math.min(8, Math.round(minutosFase / 1.6)));
    var porNivel = { 1: [], 2: [], 3: [] };
    tema.preguntas.forEach(function (q) { porNivel[q.nivel].push(q); });

    var orden;
    if (modo.id === 'repaso') orden = [1, 1, 2, 1, 2];
    else if (modo.id === 'examen') orden = [1, 2, 2, 3, 3, 3];
    else if (modo.id === 'profundizar') orden = [2, 3, 2, 3, 3];
    else orden = [1, 2, 2, 3, 1, 3];

    var salida = [];
    var indices = { 1: 0, 2: 0, 3: 0 };
    for (var i = 0; i < orden.length && salida.length < cupo; i++) {
      var n = orden[i];
      if (porNivel[n][indices[n]]) { salida.push(porNivel[n][indices[n]]); indices[n]++; }
    }
    // completar con lo que quede
    [1, 2, 3].forEach(function (n) {
      while (salida.length < cupo && porNivel[n][indices[n]]) {
        salida.push(porNivel[n][indices[n]]); indices[n]++;
      }
    });
    return salida;
  }

  function iniciar(idTema, idModo, minutos) {
    var tema = TUTOR.tema(idTema);
    var modo = TUTOR.modo(idModo);
    if (!tema) return;

    s = {
      tema: tema,
      modo: modo,
      minutos: minutos,
      fases: repartirTiempo(modo, minutos),
      indice: 0,
      inicio: Date.now(),
      aciertos: 0,
      total: 0,
      preguntas: [],
      pasoPregunta: 0,
      pasoCaso: 0,
      brechasMarcadas: [],
      bloques: tema.bloques.filter(function (b) {
        return modo.niveles.indexOf(b.nivel) >= 0;
      })
    };
    var faseRec = s.fases.filter(function (f) { return f.id === 'recuperacion'; })[0];
    s.preguntas = elegirPreguntas(tema, modo, faseRec ? faseRec.minutos : 6);

    UI.ir('sesion');
    arrancarCrono();
  }

  function arrancarCrono() {
    Crono.iniciar(s.minutos, function (seg, txt) {
      var el = UI.$('#crono');
      if (!el) return;
      el.textContent = txt;
      el.className = 'cronometro' + (seg < 0 ? ' critico' : seg < 120 ? ' aviso' : '');
    }, function () {
      UI.brindis('Se acabó el tiempo previsto. Puedes cerrar la sesión cuando quieras.');
    });
  }

  function faseActual() { return s.fases[s.indice]; }

  function avanzar() {
    var fase = faseActual();
    if (fase) Estado.registrarFase(s.tema.id, fase.id);
    if (s.indice < s.fases.length - 1) {
      s.indice += 1;
      s.pasoPregunta = 0;
      s.pasoCaso = 0;
      UI.refrescar();
      window.scrollTo(0, 0);
    } else {
      cerrar();
    }
  }

  function cerrar() {
    Crono.parar();
    var transcurrido = Math.max(1, Math.round((Date.now() - s.inicio) / 60000));
    Estado.cerrarSesion({
      tema: s.tema.id,
      modo: s.modo.id,
      minutos: transcurrido,
      aciertos: s.aciertos,
      total: s.total
    });
    var resumen = {
      tema: s.tema, minutos: transcurrido,
      aciertos: s.aciertos, total: s.total,
      brechas: s.brechasMarcadas.slice(),
      dominio: Estado.dominio(s.tema.id)
    };
    s = null;
    UI.ir('resumen', { r: resumen });
  }

  function abandonar() {
    Crono.parar();
    s = null;
    UI.ir('inicio');
  }

  /* ============================================================
     RENDERIZADO POR FASE
     ============================================================ */

  function cabecera() {
    var fase = faseActual();
    var def = TUTOR.FASES[fase.id];
    var pasos = s.fases.map(function (f, i) {
      return '<div class="paso-sesion ' + (i < s.indice ? 'hecho' : i === s.indice ? 'actual' : '') + '"></div>';
    }).join('');

    return '<div class="sesion-cab">' +
      '<div><div class="sm tenue">' + UI.esc(s.tema.nombre) + '</div>' +
      '<div style="font-weight:650">' + def.icono + ' ' + def.nombre + '</div></div>' +
      '<div class="pasos-sesion">' + pasos + '</div>' +
      '<div class="cronometro" id="crono">--:--</div>' +
      '<button class="btn btn-s btn-fantasma" data-accion="pausar-sesion" id="btn-pausa">⏸</button>' +
      '<button class="btn btn-s btn-fantasma" data-accion="abandonar-sesion">Salir</button>' +
      '</div>' +
      '<div class="aviso"><b>' + UI.esc(def.lema) + '</b><br>' +
      '<span class="sm">' + UI.esc(def.principio) + '</span></div>';
  }

  function pie(textoBoton) {
    return '<div class="linea fin mt">' +
      '<button class="btn btn-primario btn-g" data-accion="fase-siguiente">' +
      (textoBoton || 'Continuar') + ' →</button></div>';
  }

  function renderAnclaje() {
    var t = s.tema;
    return '<div class="tarjeta">' +
      '<div class="fase-etiqueta"><span class="num">1</span>Antes de leer nada</div>' +
      '<h2>' + UI.esc(t.anclaje.q) + '</h2>' +
      '<p class="sm tenue">No busques la respuesta. Escribe lo que recuerdes, aunque sea incompleto o erróneo: ' +
      'el intento fallido es lo que prepara la codificación del contenido que viene.</p>' +
      '<textarea id="resp-anclaje" placeholder="Escribe tu respuesta de memoria…"></textarea>' +
      '<div class="aviso aviso-alerta mt"><b>Pista si te bloqueas:</b> ' + UI.esc(t.anclaje.pista) + '</div>' +
      '</div>' +
      '<div class="aviso aviso-acento mt"><b>Idea central del tema.</b> ' + t.ideaCentral + '</div>' +
      pie('Ya lo intenté, seguir');
  }

  function renderComprension() {
    var html = '<div class="tarjeta"><div class="fase-etiqueta"><span class="num">2</span>Construir el mecanismo</div>' +
      '<div class="doc">';
    s.bloques.forEach(function (b) {
      html += '<div class="seccion-tema"><h3>' + UI.esc(b.titulo) +
        ' <span class="etiq ' + (b.nivel === 'imprescindible' ? 'etiq-acento' : b.nivel === 'importante' ? 'etiq-info' : '') + '">' +
        TUTOR.NIVELES[b.nivel].nombre + '</span></h3>' +
        (b.html || '') + UI.cadena(b.cadena) + UI.esquema(b.esquema) + '</div>';
    });
    html += '</div></div>';

    html += '<div class="tarjeta"><div class="tarjeta-cab"><h3>Variables que debes manejar</h3></div>' +
      UI.variables(s.tema.variables) + '</div>';

    if (s.modo.niveles.length > 1) {
      html += '<div class="tarjeta"><div class="tarjeta-cab"><h3>Fisiopatología</h3></div>' +
        '<div class="doc">' + s.tema.fisiopatologia + '</div></div>';
      html += '<div class="tarjeta"><div class="tarjeta-cab"><h3>Correlación clínica</h3></div>' +
        '<div class="doc">' + s.tema.clinica + '</div></div>';
    }

    var omitidos = s.tema.bloques.length - s.bloques.length;
    if (omitidos > 0) {
      html += '<div class="aviso mt"><b>Modo «poco tiempo» activo.</b> Se han omitido ' + omitidos +
        ' bloque(s) de nivel complementario para proteger las fases de recuperación y caso clínico, ' +
        'que son las que producen retención. Puedes verlos en la ficha del tema cuando tengas más margen.</div>';
    }

    return html + pie('Ahora explícalo tú');
  }

  function renderFeynman() {
    var f = s.tema.feynman;
    var puntos = f.puntos.map(function (p, i) {
      return '<label class="fila" style="cursor:pointer;gap:9px">' +
        '<input type="checkbox" class="chk-feynman" data-i="' + i + '" style="width:auto;margin:0">' +
        '<span class="crece">' + UI.esc(p) + '</span></label>';
    }).join('');

    return '<div class="tarjeta">' +
      '<div class="fase-etiqueta"><span class="num">3</span>Técnica Feynman</div>' +
      '<h2>' + UI.esc(f.consigna) + '</h2>' +
      '<p class="sm tenue">Escríbelo como se lo explicarías a un residente de primer año, sin volver atrás a mirar. ' +
      'Si necesitas una palabra técnica para no trabarte, esa palabra es tu brecha.</p>' +
      '<textarea id="resp-feynman" style="min-height:170px" placeholder="Explícalo con tus palabras…"></textarea>' +
      '<div class="linea mt"><button class="btn btn-primario" data-accion="revelar-feynman">Comparar con la explicación de referencia</button></div>' +
      '</div>' +
      '<div id="feynman-referencia" class="oculto">' +
      '<div class="tarjeta"><div class="tarjeta-cab"><h3>Autoevaluación</h3>' +
      '<div class="der sm tenue">Marca lo que SÍ mencionaste</div></div>' +
      puntos +
      '<div class="aviso aviso-alerta mt"><b>Lo que dejes sin marcar se registra como brecha</b> y aparecerá en tu panel de inicio y en el plan de repaso.</div>' +
      '</div>' +
      '<div class="tarjeta"><div class="tarjeta-cab"><h3>Explicación de referencia</h3></div>' +
      '<div class="doc">' + f.referencia + '</div></div>' +
      pie('Registrar brechas y seguir') +
      '</div>';
  }

  function renderRecuperacion() {
    if (!s.preguntas.length) return '<div class="vacio">Sin preguntas disponibles.</div>' + pie();

    var i = s.pasoPregunta;
    if (i >= s.preguntas.length) {
      var pct = s.total ? Math.round((s.aciertos / s.total) * 100) : 0;
      return '<div class="tarjeta centro">' +
        '<div class="metrica" style="align-items:center"><span class="rotulo">Precisión en esta fase</span>' +
        '<span class="valor">' + pct + '%</span>' +
        '<span class="nota">' + s.aciertos + ' de ' + s.total + ' preguntas</span></div>' +
        UI.barra(pct, pct >= 70 ? 'ok' : 'alerta') +
        '<p class="sm tenue mt">' + (pct >= 80
          ? 'Sólido. El tema está entrando en memoria a largo plazo.'
          : pct >= 50
            ? 'Va bien, pero conviene un repaso corto en 2 días: es justo cuando la curva de olvido cae más.'
            : 'Precisión baja: no es fracaso, es información. Este tema vuelve al principio de tu plan.') +
        '</p></div>' + pie('Ir al caso clínico');
    }

    var q = s.preguntas[i];
    var nombresNivel = { 1: 'Nivel 1 · Conocimiento', 2: 'Nivel 2 · Integración', 3: 'Nivel 3 · Razonamiento clínico' };

    return '<div class="tarjeta">' +
      '<div class="fase-etiqueta"><span class="num">4</span>Recuperación activa · ' + (i + 1) + ' de ' + s.preguntas.length + '</div>' +
      '<div class="pregunta-bloque" style="border:0;padding:0">' +
      '<div class="nivel">' + nombresNivel[q.nivel] + '</div>' +
      '<div class="enunciado" style="font-size:1.08rem">' + q.q + '</div>' +
      '<textarea id="resp-preg" placeholder="Responde antes de revelar. Escribir obliga a comprometerse."></textarea>' +
      '<div class="linea mt"><button class="btn btn-primario" data-accion="revelar-respuesta">Revelar respuesta</button></div>' +
      '<div id="zona-respuesta" class="oculto">' +
      '<div class="respuesta-oculta">' + q.r + '</div>' +
      '<div class="autoeval">' +
      '<button class="btn grado-1" data-accion="calificar-preg" data-ok="0">✗ Fallé</button>' +
      '<button class="btn grado-2" data-accion="calificar-preg" data-ok="0">~ Dudé mucho</button>' +
      '<button class="btn grado-3" data-accion="calificar-preg" data-ok="1">◐ Casi completo</button>' +
      '<button class="btn grado-4" data-accion="calificar-preg" data-ok="1">✓ Correcto</button>' +
      '</div>' +
      '<p class="sm tenue mt mb0">Sé honesto: el sistema usa esta calificación para decidir cuándo te vuelve a preguntar. ' +
      'Sobrevalorarte solo retrasa el momento en que descubres que no lo sabías.</p>' +
      '</div></div></div>';
  }

  function renderCaso() {
    var caso = s.tema.caso;
    var i = s.pasoCaso;

    var html = '<div class="tarjeta">' +
      '<div class="fase-etiqueta"><span class="num">5</span>Razonamiento clínico</div>' +
      '<div class="caso-vineta">' + caso.vineta + '</div></div>';

    if (i >= caso.pasos.length) {
      html += '<div class="tarjeta"><div class="tarjeta-cab"><h3>Cierre del caso</h3></div>' +
        '<div class="doc">' + caso.cierre + '</div></div>';
      return html + pie('Consolidar');
    }

    var paso = caso.pasos[i];
    html += '<div class="tarjeta">' +
      '<div class="sm tenue">Pregunta ' + (i + 1) + ' de ' + caso.pasos.length + '</div>' +
      '<div class="enunciado" style="font-size:1.05rem;font-weight:600;margin:6px 0 12px">' + paso.q + '</div>' +
      '<textarea id="resp-caso" placeholder="Razona en voz alta: ¿qué variable cambió y por qué?"></textarea>' +
      '<div class="linea mt">' +
      '<button class="btn btn-s btn-fantasma" data-accion="pista-caso">Ver pista</button>' +
      '<button class="btn btn-primario" data-accion="revelar-caso">Revelar razonamiento</button></div>' +
      '<div id="pista-caso" class="oculto"><div class="aviso aviso-alerta mt">' + UI.esc(paso.pista) + '</div></div>' +
      '<div id="zona-caso" class="oculto">' +
      '<div class="respuesta-oculta">' + paso.r + '</div>' +
      '<div class="linea fin mt"><button class="btn btn-primario" data-accion="siguiente-caso">Siguiente paso →</button></div>' +
      '</div></div>';

    // pasos ya respondidos, plegados arriba
    if (i > 0) {
      html += '<div class="tarjeta"><div class="tarjeta-cab"><h3>Cadena reconstruida</h3></div>' +
        UI.cadena(caso.pasos.slice(0, i).map(function (p, k) { return 'Paso ' + (k + 1); })) + '</div>';
    }
    return html;
  }

  function renderConsolidacion() {
    var t = s.tema;
    var nTarjetas = (t.tarjetas || []).length;

    return '<div class="tarjeta">' +
      '<div class="fase-etiqueta"><span class="num">6</span>Consolidación</div>' +
      '<h2>Lo que no debe olvidarse de este tema</h2></div>' +
      bloqueError(t.error) +
      '<div class="aviso aviso-ok mt"><b>Perla de examen.</b> ' + t.perla + '</div>' +
      '<div class="tarjeta mt"><div class="tarjeta-cab"><h3>Al mazo de repaso espaciado</h3>' +
      '<div class="der"><span class="etiq etiq-info">' + nTarjetas + ' tarjetas</span></div></div>' +
      '<p class="sm tenue">Estas tarjetas ya están en tu mazo y el algoritmo las programará según tu rendimiento. ' +
      'La primera revisión será mañana; después, los intervalos crecen si aciertas y se reinician si fallas.</p>' +
      '<ul class="lista-limpia">' +
      (t.tarjetas || []).slice(0, 4).map(function (c) {
        return '<div class="fila"><div class="crece"><div class="titulo">' + UI.esc(c.f) + '</div></div>' +
          '<span class="etiq">nueva</span></div>';
      }).join('') +
      (nTarjetas > 4 ? '<div class="fila"><div class="sm tenue">y ' + (nTarjetas - 4) + ' más…</div></div>' : '') +
      '</ul></div>' +
      '<div class="linea fin mt"><button class="btn btn-primario btn-g" data-accion="fase-siguiente">Cerrar sesión ✓</button></div>';
  }

  /* ------------------------------------------------------------ */
  function render() {
    if (!s) return '<div class="vacio">No hay sesión activa.</div>';
    var fase = faseActual().id;
    var cuerpo =
      fase === 'anclaje' ? renderAnclaje() :
      fase === 'comprension' ? renderComprension() :
      fase === 'feynman' ? renderFeynman() :
      fase === 'recuperacion' ? renderRecuperacion() :
      fase === 'caso' ? renderCaso() :
      renderConsolidacion();
    return cabecera() + cuerpo;
  }

  return {
    iniciar: iniciar,
    render: render,
    avanzar: avanzar,
    abandonar: abandonar,
    activa: function () { return !!s; },
    datos: function () { return s; },
    calificar: function (ok) {
      s.total += 1;
      if (ok) s.aciertos += 1;
      Estado.registrarRespuesta(s.tema.id, ok);
      if (!ok) {
        var q = s.preguntas[s.pasoPregunta];
        Estado.anotarBrecha(s.tema.id, 'Pregunta fallada: ' + q.q.slice(0, 90));
      }
      s.pasoPregunta += 1;
      UI.refrescar();
      window.scrollTo(0, 0);
    },
    siguienteCaso: function () {
      s.pasoCaso += 1;
      UI.refrescar();
      window.scrollTo(0, 0);
    },
    registrarBrechasFeynman: function (indicesNoMarcados) {
      var f = s.tema.feynman;
      indicesNoMarcados.forEach(function (i) {
        Estado.anotarBrecha(s.tema.id, 'No explicado: ' + f.puntos[i]);
        s.brechasMarcadas.push(f.puntos[i]);
      });
    }
  };
})();


/* ------------------------------------------------------------
   VISTA de la sesión y del resumen
   ------------------------------------------------------------ */
UI.registrar('sesion', {
  titulo: function () { return Sesion.activa() ? Sesion.datos().tema.nombre : 'Sesión'; },
  sub: function () {
    if (!Sesion.activa()) return '';
    var s = Sesion.datos();
    return s.modo.icono + ' ' + UI.esc(s.modo.nombre) + ' · ' + s.minutos + ' min planificados';
  },
  angosto: true,
  render: function () { return Sesion.render(); }
});

UI.registrar('resumen', {
  titulo: 'Sesión completada',
  sub: 'Lo que has consolidado y lo que queda pendiente',
  angosto: true,
  render: function (p) {
    var r = p.r;
    if (!r) return '<div class="vacio">Sin datos de sesión.</div>';
    var pct = r.total ? Math.round((r.aciertos / r.total) * 100) : null;

    var html = '<div class="tarjeta centro">' +
      '<div style="font-size:2.6rem">✅</div>' +
      '<h2>' + UI.esc(r.tema.nombre) + '</h2>' +
      '<p class="tenue">' + r.minutos + ' minutos de estudio efectivo</p></div>';

    html += '<div class="rejilla c3 mt">' +
      tarjetaMetrica('Precisión', pct === null ? '—' : pct + '%',
        pct === null ? '' : UI.barra(pct, pct >= 70 ? 'ok' : 'alerta')) +
      tarjetaMetrica('Dominio del tema', r.dominio + '%', UI.barra(r.dominio, 'ok')) +
      tarjetaMetrica('Brechas nuevas', r.brechas.length,
        '<span class="nota">' + (r.brechas.length ? 'irán al plan de repaso' : 'explicación completa') + '</span>') +
      '</div>';

    if (r.brechas.length) {
      html += '<div class="tarjeta mt"><div class="tarjeta-cab"><h3>Puntos que no explicaste</h3></div>' +
        r.brechas.map(function (b) {
          return '<div class="fila"><div class="crece">' + UI.esc(b) + '</div></div>';
        }).join('') +
        '<div class="aviso aviso-alerta mt">Estos puntos definen tu próximo repaso. No es un mal resultado: ' +
        'es exactamente la información que un método de estudio debe darte.</div></div>';
    }

    html += '<div class="tarjeta mt"><div class="tarjeta-cab"><h3>¿Y ahora?</h3></div>' +
      '<div class="linea">' +
      '<button class="btn btn-primario" data-accion="ir-tarjetas">Repasar tarjetas pendientes</button>' +
      '<button class="btn" data-accion="ver-tema" data-tema="' + r.tema.id + '">Ver ficha completa</button>' +
      '<button class="btn btn-fantasma" data-accion="ir-inicio">Volver al inicio</button>' +
      '</div>' +
      '<p class="sm tenue mt mb0">La próxima revisión de este tema se ha programado automáticamente. ' +
      'Repasarlo mañana durante 5 minutos rinde más que releerlo hoy durante 30.</p></div>';

    return html;
  }
});


/* ------------------------------------------------------------
   Selector de sesión (tema + modo + tiempo)
   ------------------------------------------------------------ */
UI.registrar('preparar', {
  titulo: 'Preparar sesión',
  sub: 'Tres preguntas antes de empezar, como haría un tutor',
  angosto: true,
  render: function (p) {
    var temaSel = p.tema || Estado.sugerencia().tema;
    var t = TUTOR.tema(temaSel);

    var html = '<div class="tarjeta"><div class="tarjeta-cab"><h3>1 · ¿Qué tema?</h3></div>' +
      '<select id="s-tema">' +
      TUTOR.MODULOS.map(function (m) {
        var temas = TUTOR.temasDe(m.id);
        if (!temas.length) return '';
        return '<optgroup label="' + UI.esc(m.nombre) + '">' +
          temas.map(function (x) {
            return '<option value="' + x.id + '"' + (x.id === temaSel ? ' selected' : '') + '>' +
              (x.alto ? '🔥 ' : '') + UI.esc(x.nombre) + ' · ' + Estado.dominio(x.id) + '%</option>';
          }).join('') + '</optgroup>';
      }).join('') + '</select>' +
      '<div class="aviso mt">' + t.ideaCentral + '</div></div>';

    html += '<div class="tarjeta"><div class="tarjeta-cab"><h3>2 · ¿Cuánto tiempo tienes?</h3></div>' +
      '<div class="opciones" id="s-minutos">' +
      [10, 20, 30, 45, 60].map(function (m, i) {
        return '<button class="opcion' + (m === 30 ? ' sel' : '') + '" data-accion="sel-minutos" data-min="' + m + '">' +
          m + ' min<small>' + descripcionTiempo(m) + '</small></button>';
      }).join('') + '</div></div>';

    html += '<div class="tarjeta"><div class="tarjeta-cab"><h3>3 · ¿Comprender, repasar o entrenar?</h3></div>' +
      '<div class="opciones" id="s-modo">' +
      TUTOR.MODOS.map(function (m, i) {
        return '<button class="opcion' + (m.id === 'comprender' ? ' sel' : '') + '" data-accion="sel-modo" data-modo="' + m.id + '" style="flex:1;min-width:190px">' +
          m.icono + ' ' + UI.esc(m.nombre) + '<small>' + UI.esc(m.descripcion) + '</small></button>';
      }).join('') + '</div></div>';

    html += '<div class="linea fin mt">' +
      '<button class="btn btn-primario btn-g" data-accion="lanzar-sesion">Empezar sesión ▶</button></div>';

    return html;
  }
});

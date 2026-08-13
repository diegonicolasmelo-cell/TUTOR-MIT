/* ============================================================
   TARJETAS — repaso con recuperación activa y repetición espaciada
   Algoritmo SM-2 adaptado (ver Estado.calificarTarjeta)
   ============================================================ */

var Mazo = (function () {
  var cola = [];
  var actual = null;
  var revelada = false;
  var sesion = { revisadas: 0, aciertos: 0, inicio: null, filtroTema: null };

  function cargar(idTema) {
    cola = idTema ? Estado.tarjetasDeTema(idTema) : Estado.tarjetasVencidas();
    // barajar para evitar el aprendizaje por orden
    for (var i = cola.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = cola[i]; cola[i] = cola[j]; cola[j] = tmp;
    }
    sesion = { revisadas: 0, aciertos: 0, inicio: Date.now(), filtroTema: idTema || null };
    siguiente();
  }

  function siguiente() {
    actual = cola.shift() || null;
    revelada = false;
  }

  function revelar() { revelada = true; UI.refrescar(); }

  function calificar(grado) {
    if (!actual) return;
    var e = Estado.calificarTarjeta(actual.id, grado);
    sesion.revisadas += 1;
    if (grado >= 3) sesion.aciertos += 1;
    if (grado === 1) cola.push(actual);       // vuelve al final de la cola de hoy
    siguiente();
    UI.refrescar();
    window.scrollTo(0, 0);
  }

  function intervaloTexto(grado) {
    if (!actual) return '';
    var e = Estado.tarjeta(actual.id);
    var s = TUTOR.SRS;
    if (grado === 1) return 'hoy';
    var reps = e.repeticiones + 1;
    var intervalo;
    if (reps === 1) intervalo = s.primerIntervalo;
    else if (reps === 2) intervalo = s.segundoIntervalo;
    else {
      var mult = grado === 2 ? s.multiplicadorDificil : grado === 4 ? e.facilidad * s.multiplicadorFacil : e.facilidad;
      intervalo = Math.round(e.intervalo * mult);
    }
    intervalo = Math.min(s.intervaloMaximo, Math.max(1, intervalo));
    if (intervalo === 1) return 'mañana';
    if (intervalo < 30) return intervalo + ' días';
    return Math.round(intervalo / 30) + ' meses';
  }

  return {
    cargar: cargar,
    revelar: revelar,
    calificar: calificar,
    actual: function () { return actual; },
    revelada: function () { return revelada; },
    restantes: function () { return cola.length; },
    sesion: function () { return sesion; },
    intervaloTexto: intervaloTexto
  };
})();


UI.registrar('tarjetas', {
  titulo: 'Tarjetas',
  sub: function () {
    var s = Estado.estadisticasTarjetas();
    return s.vencenHoy + ' pendientes hoy · ' + s.total + ' en el mazo';
  },
  acciones: function () {
    return '<button class="btn btn-s btn-fantasma" data-accion="mazo-por-tema">Elegir tema</button>';
  },
  angosto: true,

  render: function () {
    var c = Mazo.actual();
    var stats = Estado.estadisticasTarjetas();

    /* --- sin tarjetas en cola --- */
    if (!c) {
      var s = Mazo.sesion();
      var html = '';
      if (s.revisadas > 0) {
        var pct = Math.round((s.aciertos / s.revisadas) * 100);
        html += '<div class="tarjeta centro"><div style="font-size:2.6rem">🎉</div>' +
          '<h2>Repaso terminado</h2>' +
          '<p class="tenue">' + s.revisadas + ' tarjetas revisadas · ' + pct + '% de aciertos</p>' +
          UI.barra(pct, pct >= 70 ? 'ok' : 'alerta') +
          '<p class="sm tenue mt">Las que fallaste vuelven mañana; las que dominaste, más adelante. ' +
          'Ese espaciado creciente es lo que convierte el repaso en memoria a largo plazo.</p></div>';
      } else {
        html += '<div class="tarjeta"><div class="vacio"><span class="emoji">☕</span>' +
          'No hay tarjetas pendientes ahora mismo.<br>' +
          '<span class="sm">El algoritmo las devuelve justo antes de que las olvidarías. Adelantarte no mejora la retención.</span></div></div>';
      }

      html += '<div class="rejilla c4 mt">' +
        tarjetaMetrica('En el mazo', stats.total, '') +
        tarjetaMetrica('Nuevas', stats.nuevas, '') +
        tarjetaMetrica('Aprendiendo', stats.aprendiendo, '') +
        tarjetaMetrica('Maduras', stats.maduras, '<span class="nota">intervalo ≥ 21 días</span>') +
        '</div>';

      html += '<div class="tarjeta mt"><div class="tarjeta-cab"><h3>Repasar por tema</h3>' +
        '<div class="der sm tenue">Fuera del calendario</div></div>' +
        '<p class="sm tenue">Útil la víspera de un examen o cuando quieras reforzar un tema concreto. ' +
        'No sustituye al repaso programado.</p>';
      TUTOR.MODULOS.forEach(function (m) {
        TUTOR.temasDe(m.id).forEach(function (t) {
          html += '<div class="fila"><div class="crece">' +
            '<div class="titulo">' + UI.esc(t.nombre) + '</div>' +
            '<div class="sub">' + (t.tarjetas || []).length + ' tarjetas · dominio ' + Estado.dominio(t.id) + '%</div></div>' +
            '<button class="btn btn-s" data-accion="mazo-tema" data-tema="' + t.id + '">Repasar</button></div>';
        });
      });
      html += '</div>';
      return html;
    }

    /* --- tarjeta activa --- */
    var tema = TUTOR.tema(c.tema);
    var e = Estado.tarjeta(c.id);
    var nueva = e.nueva !== false && !e.ultimo;

    var html = '<div class="linea entre" style="margin-bottom:12px">' +
      '<div><span class="etiq ' + (nueva ? 'etiq-info' : 'etiq') + '">' + (nueva ? 'Nueva' : 'Repaso') + '</span> ' +
      '<span class="sm tenue">' + UI.esc(tema ? tema.nombre : '') + '</span></div>' +
      '<div class="sm tenue">' + Mazo.restantes() + ' restantes</div></div>';

    html += '<div class="mazo-tarjeta">' +
      '<div class="frente">' + UI.esc(c.frente) + '</div>' +
      (Mazo.revelada() ? '<div class="dorso">' + UI.esc(c.dorso) + '</div>' : '') +
      '</div>';

    if (!Mazo.revelada()) {
      html += '<div class="linea fin mt">' +
        '<button class="btn btn-primario btn-g btn-bloque" data-accion="revelar-tarjeta">Mostrar respuesta</button></div>' +
        '<p class="sm tenue centro mt">Intenta recuperarla mentalmente antes de mostrarla. ' +
        'El esfuerzo de recordar es lo que fija la memoria, no la lectura de la respuesta.</p>';
    } else {
      html += '<div class="grados">' +
        '<button class="btn grado grado-1" data-accion="calificar-tarjeta" data-g="1">Otra vez<small>' + Mazo.intervaloTexto(1) + '</small></button>' +
        '<button class="btn grado grado-2" data-accion="calificar-tarjeta" data-g="2">Difícil<small>' + Mazo.intervaloTexto(2) + '</small></button>' +
        '<button class="btn grado grado-3" data-accion="calificar-tarjeta" data-g="3">Bien<small>' + Mazo.intervaloTexto(3) + '</small></button>' +
        '<button class="btn grado grado-4" data-accion="calificar-tarjeta" data-g="4">Fácil<small>' + Mazo.intervaloTexto(4) + '</small></button>' +
        '</div>' +
        '<div class="linea centro mt"><button class="btn btn-s btn-fantasma crece" data-accion="ver-tema" data-tema="' + c.tema + '">' +
        'Ver el tema completo</button></div>';
    }

    return html;
  }
});

/* ============================================================
   VISTAS — Inicio, Temario, Plan, Rendimiento, Prompt, Ajustes
   ============================================================ */

/* ------------------------------------------------------------
   INICIO
   ------------------------------------------------------------ */
UI.registrar('inicio', {
  titulo: function () {
    var h = new Date().getHours();
    var saludo = h < 6 ? 'Buenas noches' : h < 13 ? 'Buenos días' : h < 21 ? 'Buenas tardes' : 'Buenas noches';
    return saludo + ', ' + Estado.ajustes().nombre;
  },
  sub: function () {
    var s = Estado.sugerencia();
    var t = TUTOR.tema(s.tema);
    return 'Siguiente paso sugerido: <b>' + UI.esc(t.nombre) + '</b> · ' + s.minutos + ' min';
  },
  acciones: function () {
    return '<button class="btn btn-primario" data-accion="empezar-sugerido">▶ Empezar sesión</button>';
  },

  render: function () {
    var hoy = Estado.hoyISO();
    var stats = Estado.estadisticasTarjetas();
    var minHoy = Estado.minutosDe(hoy);
    var objetivo = Estado.minutosDisponibles(hoy) || Estado.ajustes().objetivoDiario;
    var global = Estado.dominioGlobal();
    var racha = Estado.datos().racha;
    var brechas = Estado.brechasAbiertas();
    var s = Estado.sugerencia();
    var temaSug = TUTOR.tema(s.tema);

    var html = '';

    /* --- consejo principal de Minerva --- */
    var consejo = (Estado.ajustes().asistente && typeof Minerva !== 'undefined') ? Minerva.principal() : null;
    if (consejo) {
      html += '<div class="minerva-linea">' + Minerva.avatar(38) +
        '<div class="crece"><div class="nombre">Minerva</div>' +
        '<p><b>' + UI.esc(consejo.titulo) + '.</b> ' + UI.esc(consejo.texto) + '</p>' +
        (consejo.accion
          ? '<div class="linea mt"><button class="btn btn-s btn-primario" data-accion="minerva-accion" ' +
            'data-real="' + consejo.accion.accion + '" ' +
            'data-carga="' + UI.esc(JSON.stringify(consejo.accion.datos || {})) + '">' +
            UI.esc(consejo.accion.etiqueta) + ' →</button>' +
            '<button class="btn btn-s btn-fantasma" data-accion="abrir-minerva">Ver todo</button></div>'
          : '') +
        '</div></div>';
    }

    /* --- métricas superiores --- */
    html += '<div class="rejilla c4">' +
      tarjetaMetrica('Estudio de hoy', minHoy + '<span class="tenue" style="font-size:1rem"> / ' + objetivo + ' min</span>',
        UI.barra(objetivo ? (minHoy / objetivo) * 100 : 0, minHoy >= objetivo ? 'ok' : '')) +
      tarjetaMetrica('Tarjetas pendientes', stats.vencenHoy,
        '<span class="nota">' + stats.maduras + ' maduras · ' + stats.nuevas + ' nuevas</span>') +
      tarjetaMetrica('Dominio global', global + '%',
        UI.barra(global, global >= 70 ? 'ok' : global >= 40 ? 'alerta' : 'acento')) +
      tarjetaMetrica('Racha', racha.dias + (racha.dias === 1 ? ' día' : ' días'),
        '<span class="nota">Mejor: ' + (racha.mejor || racha.dias) + '</span>') +
      '</div>';

    /* --- bloque de arranque rápido --- */
    html += '<div class="tarjeta mt">' +
      '<div class="tarjeta-cab"><h2>¿Cuánto tiempo tienes ahora?</h2>' +
      '<div class="der"><span class="etiq etiq-info">Método MIT</span></div></div>' +
      '<p class="sm tenue">La sesión se dosifica sola: se recorta el contenido complementario y se preservan las fases de recuperación activa y razonamiento clínico.</p>' +
      '<div class="opciones" style="margin-bottom:14px">' +
      [10, 20, 30, 45, 60].map(function (m) {
        return '<button class="opcion" data-accion="arranque-rapido" data-min="' + m + '">' +
          m + ' min<small>' + descripcionTiempo(m) + '</small></button>';
      }).join('') +
      '</div>' +
      '<div class="aviso"><b>Sugerido ahora:</b> ' + UI.esc(temaSug.nombre) +
      (temaSug.alto ? ' <span class="etiq etiq-fuego">🔥 Alto rendimiento</span>' : '') +
      ' — ' + (s.origen === 'plan' ? 'viene de tu plan de la semana' : 'menor dominio con mayor rentabilidad') + '.</div>' +
      '</div>';

    /* --- dos columnas --- */
    html += '<div class="rejilla c2 mt">';

    /* progreso por área del conocimiento */
    html += '<div class="tarjeta"><div class="tarjeta-cab"><h3>Avance por área</h3>' +
      '<div class="der"><button class="btn btn-s btn-fantasma" data-accion="navegar" data-ruta="areas">Áreas</button>' +
      '<button class="btn btn-s btn-fantasma" data-accion="ver-temario">Temario</button></div></div>';
    TUTOR.AREAS.forEach(function (a) {
      var activa = Estado.areaActiva(a.id);
      var v = Estado.dominioArea(a.id);
      var nTemas = TUTOR.temasDeArea(a.id).length;
      html += '<div class="fila"' + (activa ? '' : ' style="opacity:.45"') + '>' +
        '<div style="font-size:1.2rem">' + a.icono + '</div>' +
        '<div class="crece"><div class="titulo">' + UI.esc(a.nombre) +
        (activa ? '' : ' <span class="etiq">pausada</span>') + '</div>' +
        '<div class="sub">' + nTemas + ' temas</div>' +
        UI.barra(v, v >= 70 ? 'ok' : v >= 40 ? 'alerta' : 'acento') + '</div>' +
        '<div class="sm tenue">' + v + '%</div></div>';
    });
    html += '</div>';

    /* brechas detectadas */
    html += '<div class="tarjeta"><div class="tarjeta-cab"><h3>Brechas detectadas</h3>' +
      '<div class="der"><span class="etiq' + (brechas.length ? ' etiq-acento' : '') + '">' + brechas.length + '</span></div></div>';
    if (!brechas.length) {
      html += '<div class="vacio"><span class="emoji">🎯</span>Sin brechas abiertas.<br>' +
        '<span class="sm">Aparecerán aquí cuando falles una pregunta o marques un punto no explicado en la fase Feynman.</span></div>';
    } else {
      html += '<ul class="lista-limpia">';
      brechas.slice(0, 6).forEach(function (b, i) {
        var t = TUTOR.tema(b.tema);
        html += '<div class="fila"><div class="crece">' +
          '<div class="titulo">' + UI.esc(b.texto) + '</div>' +
          '<div class="sub">' + UI.esc(t ? t.nombre : '') + '</div></div>' +
          '<button class="btn btn-s" data-accion="repasar-brecha" data-tema="' + b.tema + '">Repasar</button>' +
          '<button class="btn btn-s btn-fantasma" data-accion="cerrar-brecha" data-i="' + i + '">✓</button></div>';
      });
      html += '</ul>';
    }
    html += '</div>';
    html += '</div>';

    /* --- actividad reciente --- */
    var sesiones = Estado.datos().sesiones.slice(0, 5);
    html += '<div class="tarjeta mt"><div class="tarjeta-cab"><h3>Últimas sesiones</h3>' +
      '<div class="der"><button class="btn btn-s btn-fantasma" data-accion="ver-rendimiento">Ver rendimiento</button></div></div>';
    if (!sesiones.length) {
      html += '<div class="vacio"><span class="emoji">📚</span>Todavía no hay sesiones registradas.<br>' +
        '<span class="sm">Empieza por un bloque de 20 minutos: es suficiente para una fase completa del método.</span></div>';
    } else {
      sesiones.forEach(function (s) {
        var t = TUTOR.tema(s.tema);
        var pct = s.total ? Math.round((s.aciertos / s.total) * 100) : null;
        html += '<div class="fila"><div class="crece">' +
          '<div class="titulo">' + UI.esc(t ? t.nombre : s.tema) + '</div>' +
          '<div class="sub">' + UI.fechaCorta(s.fecha.slice(0, 10)) + ' · ' + TUTOR.modo(s.modo).nombre +
          ' · ' + s.minutos + ' min</div></div>' +
          (pct !== null ? '<span class="etiq ' + (pct >= 70 ? 'etiq-ok' : 'etiq-alerta') + '">' + pct + '% acierto</span>' : '') +
          '</div>';
      });
    }
    html += '</div>';

    return html;
  }
});

function tarjetaMetrica(rotulo, valor, extra) {
  return '<div class="tarjeta"><div class="metrica">' +
    '<span class="rotulo">' + rotulo + '</span>' +
    '<span class="valor">' + valor + '</span>' + (extra || '') + '</div></div>';
}

function descripcionTiempo(m) {
  if (m <= 10) return 'Repaso rápido';
  if (m <= 20) return 'Imprescindible';
  if (m <= 30) return 'Comprender';
  if (m <= 45) return 'Tutor intensivo';
  return 'Profundización';
}

/* ------------------------------------------------------------
   TEMARIO
   ------------------------------------------------------------ */
UI.registrar('temario', {
  titulo: 'Temario',
  sub: function () {
    return TUTOR.AREAS.length + ' áreas · ' + TUTOR.TEMAS.length + ' temas · ' +
      TUTOR.todasLasTarjetas().length + ' tarjetas';
  },
  acciones: function () {
    return '<button class="btn btn-s btn-fantasma" data-accion="navegar" data-ruta="areas">Elegir áreas</button>' +
      '<button class="btn btn-s" data-accion="generar-plan">Regenerar plan</button>';
  },
  render: function () {
    var html = '';
    TUTOR.AREAS.forEach(function (area) {
      var modulos = TUTOR.modulosDe(area.id);
      if (!modulos.length) return;
      var activa = Estado.areaActiva(area.id);

      html += '<div class="linea entre mt" style="margin-bottom:8px">' +
        '<h2 style="margin:0">' + area.icono + ' ' + UI.esc(area.nombre) +
        (activa ? '' : ' <span class="etiq">pausada</span>') + '</h2>' +
        UI.etiquetaDominio(Estado.dominioArea(area.id)) + '</div>';

      modulos.forEach(function (m) {
        var temas = TUTOR.temasDe(m.id);
        if (!temas.length) return;
        var v = Estado.dominioModulo(m.id);
        html += '<div class="tarjeta"' + (activa ? '' : ' style="opacity:.55"') + '><div class="tarjeta-cab">' +
          '<div style="font-size:1.4rem">' + m.icono + '</div>' +
          '<div><h3>' + UI.esc(m.nombre) + '</h3>' +
          '<div class="sm tenue">' + UI.esc(m.resumen) + '</div></div>' +
          '<div class="der">' + UI.etiquetaDominio(v) + '</div></div>';

        temas.forEach(function (t) {
        var d = Estado.dominio(t.id);
        var est = Estado.tema(t.id);
        html += '<div class="fila">' +
          '<div class="crece">' +
          '<div class="titulo">' + UI.esc(t.nombre) +
          (t.alto ? ' <span class="etiq etiq-fuego">🔥</span>' : '') +
          (t.propio && !t.verificado ? ' <span class="etiq etiq-alerta">sin verificar</span>' : '') +
          (t.propio && t.verificado ? ' <span class="etiq etiq-ok">propio</span>' : '') + '</div>' +
          '<div class="sub">' + t.minutos + ' min · ' +
          (t.preguntas ? t.preguntas.length + ' preguntas · ' : '') +
          (t.tarjetas ? t.tarjetas.length + ' tarjetas' : '') +
          (est.vistas ? ' · estudiado ' + est.vistas + (est.vistas === 1 ? ' vez' : ' veces') : '') +
          '</div>' +
          UI.barra(d, d >= 70 ? 'ok' : d >= 40 ? 'alerta' : 'acento') +
          '</div>' +
            '<button class="btn btn-s btn-fantasma" data-accion="ver-tema" data-tema="' + t.id + '">Ficha</button>' +
            '<button class="btn btn-s btn-primario" data-accion="estudiar-tema" data-tema="' + t.id + '">Estudiar</button>' +
            '</div>';
        });
        html += '</div>';
      });
    });
    return html;
  }
});

/* ------------------------------------------------------------
   ÁREAS DEL CONOCIMIENTO
   ------------------------------------------------------------ */
UI.registrar('areas', {
  titulo: 'Áreas del conocimiento',
  sub: 'Activa solo lo que toca ahora: el plan y las tarjetas se ajustan solos',
  render: function () {
    var html = '<div class="aviso"><b>Cómo usar esto.</b> Con todas las áreas activas, el plan las intercala, ' +
      'porque alternar materias distintas retiene mejor que agotar una antes de empezar la siguiente. ' +
      'Cuando se acerque un examen concreto, desactiva el resto: el plan, las sugerencias y el mazo de tarjetas ' +
      'se concentrarán solo en lo que necesitas.</div>';

    html += '<div class="rejilla c2 mt">';
    TUTOR.AREAS.forEach(function (a) {
      var activa = Estado.areaActiva(a.id);
      var temas = TUTOR.temasDeArea(a.id);
      var tarjetas = temas.reduce(function (n, t) { return n + (t.tarjetas || []).length; }, 0);
      var alto = temas.filter(function (t) { return t.alto; }).length;
      var v = Estado.dominioArea(a.id);

      html += '<div class="area-tarjeta ' + (activa ? 'activa' : 'inactiva') + '">' +
        '<div class="cab"><span class="icono">' + a.icono + '</span>' +
        '<div class="crece"><h3>' + UI.esc(a.nombre) + '</h3>' +
        '<div class="sm tenue">' + temas.length + ' temas · ' + alto + ' de alto rendimiento · ' + tarjetas + ' tarjetas</div></div>' +
        '</div>' +
        '<div class="sm tenue">' + UI.esc(a.resumen) + '</div>' +
        '<div class="lema">' + UI.esc(a.lema) + '</div>' +
        UI.barra(v, v >= 70 ? 'ok' : v >= 40 ? 'alerta' : 'acento') +
        '<div class="linea entre">' +
        '<span class="sm tenue">Dominio ' + v + '%</span>' +
        '<div class="linea">' +
        '<button class="btn btn-s btn-fantasma" data-accion="navegar" data-ruta="temario">Ver temas</button>' +
        '<button class="btn btn-s ' + (activa ? '' : 'btn-primario') + '" data-accion="alternar-area" data-area="' + a.id + '">' +
        (activa ? 'Pausar' : 'Activar') + '</button>' +
        '</div></div></div>';
    });
    html += '</div>';

    var activas = Estado.areasActivas().length;
    html += '<div class="tarjeta mt"><div class="tarjeta-cab"><h3>Efecto en tu plan</h3></div>' +
      '<div class="rejilla c3">' +
      tarjetaMetrica('Áreas activas', activas + ' / ' + TUTOR.AREAS.length, '') +
      tarjetaMetrica('Temas en juego', Estado.temasActivos().length, '') +
      tarjetaMetrica('Tarjetas en el mazo', Estado.estadisticasTarjetas().total, '') +
      '</div>' +
      '<div class="linea mt"><button class="btn btn-primario" data-accion="generar-plan">Regenerar plan con estas áreas</button></div>' +
      '</div>';

    return html;
  }
});

/* ------------------------------------------------------------
   FICHA DE TEMA (consulta libre, sin sesión)
   ------------------------------------------------------------ */
UI.registrar('tema', {
  titulo: function (p) { var t = TUTOR.tema(p.tema); return t ? t.nombre : 'Tema'; },
  sub: function (p) {
    var t = TUTOR.tema(p.tema);
    if (!t) return '';
    var m = TUTOR.modulo(t.modulo);
    var a = TUTOR.area(m.area);
    return (a ? a.icono + ' ' + UI.esc(a.nombre) + ' · ' : '') +
      UI.esc(m.nombre) + ' · ' + UI.etiquetaDominio(Estado.dominio(t.id));
  },
  acciones: function (p) {
    return '<button class="btn btn-s" data-accion="repasar-tarjetas-tema" data-tema="' + p.tema + '">Tarjetas</button>' +
      '<button class="btn btn-primario btn-s" data-accion="estudiar-tema" data-tema="' + p.tema + '">Estudiar con el método</button>';
  },
  angosto: true,
  render: function (p) {
    var t = TUTOR.tema(p.tema);
    if (!t) return '<div class="vacio">Tema no encontrado.</div>';
    var html = '';

    if (t.propio) {
      html += t.verificado
        ? '<div class="aviso aviso-ok"><b>Contenido propio, verificado por ti.</b>' +
          (t.fuentes ? ' Fuentes declaradas: ' + UI.esc(t.fuentes) : '') + '</div>'
        : '<div class="aviso aviso-alerta"><b>Contenido propio sin verificar.</b> ' +
          'Se generó a partir de tus fuentes y la app comprobó su estructura, no su exactitud. ' +
          'Revísalo y márcalo como verificado cuando lo hayas contrastado.' +
          (t.fuentes ? '<br><span class="sm">Fuentes declaradas: ' + UI.esc(t.fuentes) + '</span>' : '') +
          '<div class="linea mt"><button class="btn btn-s" data-accion="taller-verificar" data-tema="' + t.id + '">Marcar verificado</button></div>' +
          '</div>';
    }

    html += '<div class="aviso aviso-acento"><b>Idea central.</b> ' + t.ideaCentral + '</div>';

    html += '<div class="tarjeta mt"><div class="doc">';
    t.bloques.forEach(function (b) {
      html += '<div class="seccion-tema"><h3>' + UI.esc(b.titulo) +
        ' <span class="etiq ' + (b.nivel === 'imprescindible' ? 'etiq-acento' : b.nivel === 'importante' ? 'etiq-info' : '') +
        '">' + TUTOR.NIVELES[b.nivel].nombre + '</span></h3>' +
        (b.html || '') + UI.cadena(b.cadena) + UI.esquema(b.esquema) + '</div>';
    });
    html += '</div></div>';

    html += '<div class="tarjeta"><div class="tarjeta-cab"><h3>Variables clave</h3></div>' +
      UI.variables(t.variables) + '</div>';

    html += '<div class="tarjeta"><div class="tarjeta-cab"><h3>Fisiopatología</h3></div>' +
      '<div class="doc">' + t.fisiopatologia + '</div></div>';

    html += '<div class="tarjeta"><div class="tarjeta-cab"><h3>Correlación clínica</h3></div>' +
      '<div class="doc">' + t.clinica + '</div></div>';

    html += bloqueError(t.error);

    html += '<div class="aviso aviso-ok mt"><b>Perla de examen.</b> ' + t.perla + '</div>';

    return html;
  }
});

function bloqueError(e) {
  if (!e) return '';
  return '<div class="tarjeta"><div class="tarjeta-cab"><h3>⚠️ Error frecuente</h3></div>' +
    '<div class="doc">' +
    '<p><b>Qué se confunde:</b> ' + e.confunde + '</p>' +
    '<p><b>Por qué se parecen:</b> ' + e.parecido + '</p>' +
    '<p><b>La diferencia real:</b> ' + e.diferencia + '</p>' +
    '<p><b>Ejemplo clínico:</b> ' + e.ejemplo + '</p>' +
    '<div class="aviso aviso-alerta"><b>Regla mental:</b> ' + e.regla + '</div>' +
    '</div></div>';
}

/* ------------------------------------------------------------
   PLAN SEMANAL
   ------------------------------------------------------------ */
UI.registrar('plan', {
  titulo: 'Plan de estudio',
  sub: 'Dosificado según tus minutos disponibles cada día',
  acciones: function () {
    return '<button class="btn btn-s" data-accion="editar-disponibilidad">Disponibilidad</button>' +
      '<button class="btn btn-s btn-primario" data-accion="generar-plan">Regenerar</button>';
  },
  render: function () {
    var plan = Estado.plan();
    var claves = Object.keys(plan).sort();
    if (!claves.length) {
      return '<div class="tarjeta"><div class="vacio"><span class="emoji">🗓️</span>' +
        'Todavía no has generado un plan.<br><span class="sm">El plan reparte los temas priorizando alto rendimiento y menor dominio, y reserva tiempo diario para el repaso espaciado.</span>' +
        '<div class="mt"><button class="btn btn-primario" data-accion="generar-plan">Generar plan de 14 días</button></div></div></div>';
    }

    var hoy = Estado.hoyISO();
    var html = '';
    var totalMin = 0, totalBloques = 0, hechos = 0;
    claves.forEach(function (f) {
      plan[f].forEach(function (b) {
        totalMin += b.minutos; totalBloques++; if (b.hecho) hechos++;
      });
    });

    html += '<div class="rejilla c3">' +
      tarjetaMetrica('Tiempo planificado', UI.minutosTexto(totalMin), '<span class="nota">próximos 14 días</span>') +
      tarjetaMetrica('Bloques completados', hechos + ' / ' + totalBloques,
        UI.barra(totalBloques ? (hechos / totalBloques) * 100 : 0, 'ok')) +
      tarjetaMetrica('Media diaria', Math.round(totalMin / claves.length) + ' min',
        '<span class="nota">ajustable en Disponibilidad</span>') +
      '</div>';

    // semanas de 7 días
    for (var semana = 0; semana < Math.ceil(claves.length / 7); semana++) {
      var dias = claves.slice(semana * 7, semana * 7 + 7);
      html += '<div class="tarjeta mt"><div class="tarjeta-cab"><h3>' +
        (semana === 0 ? 'Esta semana' : 'Semana siguiente') + '</h3>' +
        '<div class="der sm tenue">' + UI.fechaCorta(dias[0]) + ' – ' + UI.fechaCorta(dias[dias.length - 1]) + '</div></div>' +
        '<div class="semana">';
      dias.forEach(function (f) {
        var bloques = plan[f];
        var min = bloques.reduce(function (a, b) { return a + b.minutos; }, 0);
        html += '<div class="dia' + (f === hoy ? ' hoy' : '') + '">' +
          '<div class="cab"><span class="nombre">' + UI.nombreDia(f) + '</span>' +
          '<span class="num">' + parseInt(f.slice(8), 10) + '</span>' +
          '<span class="min">' + (min || '—') + (min ? "'" : '') + '</span></div>';
        if (!bloques.length) {
          html += '<div class="sm tenue">Descanso</div>';
        } else {
          bloques.forEach(function (b) {
            if (b.tipo === 'repaso') {
              html += '<div class="bloque-plan repaso' + (b.hecho ? ' hecho' : '') + '" data-accion="ir-tarjetas">' +
                '🔁 Tarjetas · ' + b.minutos + "'" + '</div>';
            } else {
              var t = TUTOR.tema(b.tema);
              html += '<div class="bloque-plan' + (b.hecho ? ' hecho' : '') + '" data-accion="estudiar-tema" data-tema="' + b.tema + '">' +
                (t && t.alto ? '🔥 ' : '📘 ') + UI.esc(t ? t.nombre : b.tema) + ' · ' + b.minutos + "'" + '</div>';
            }
          });
        }
        html += '</div>';
      });
      html += '</div></div>';
    }

    html += '<div class="aviso mt"><b>Cómo se construye el plan.</b> Los temas de 🔥 alto rendimiento y los de menor dominio van primero; ' +
      'cada día reserva un bloque de repaso espaciado, porque la retención depende más de la frecuencia de recuperación que del tiempo total invertido. ' +
      'Al completar una sesión, el bloque correspondiente se marca automáticamente.</div>';

    return html;
  }
});

/* ------------------------------------------------------------
   RENDIMIENTO
   ------------------------------------------------------------ */
UI.registrar('rendimiento', {
  titulo: 'Rendimiento',
  sub: 'Dónde estás sólido y dónde conviene volver',
  render: function () {
    var d = Estado.datos();
    var sesiones = d.sesiones;
    var totalMin = sesiones.reduce(function (a, s) { return a + (s.minutos || 0); }, 0);
    var totalPreg = sesiones.reduce(function (a, s) { return a + (s.total || 0); }, 0);
    var totalAcc = sesiones.reduce(function (a, s) { return a + (s.aciertos || 0); }, 0);
    var precision = totalPreg ? Math.round((totalAcc / totalPreg) * 100) : 0;
    var stats = Estado.estadisticasTarjetas();

    var html = '<div class="rejilla c4">' +
      tarjetaMetrica('Tiempo total', UI.minutosTexto(totalMin), '<span class="nota">' + sesiones.length + ' sesiones</span>') +
      tarjetaMetrica('Precisión', precision + '%', UI.barra(precision, precision >= 70 ? 'ok' : 'alerta')) +
      tarjetaMetrica('Tarjetas maduras', stats.maduras + ' / ' + stats.total,
        UI.barra(stats.total ? (stats.maduras / stats.total) * 100 : 0, 'ok')) +
      tarjetaMetrica('Dominio global', Estado.dominioGlobal() + '%',
        UI.barra(Estado.dominioGlobal(), 'ok')) +
      '</div>';

    /* mapa de calor de los últimos 35 días */
    html += '<div class="tarjeta mt"><div class="tarjeta-cab"><h3>Constancia (últimos 35 días)</h3>' +
      '<div class="der sm tenue">Cada cuadro es un día</div></div><div class="mapa-calor">';
    for (var i = 34; i >= 0; i--) {
      var f = Estado.hoyISO(-i);
      var min = Estado.minutosDe(f);
      var n = min === 0 ? 0 : min < 10 ? 1 : min < 20 ? 2 : min < 40 ? 3 : 4;
      html += '<i class="' + (n ? 'n' + n : '') + '" title="' + f + ': ' + min + ' min"></i>';
    }
    html += '</div></div>';

    /* tabla de temas ordenada por prioridad de repaso */
    var orden = Estado.temasActivos().sort(function (a, b) {
      return Estado.dominio(a.id) - Estado.dominio(b.id);
    });

    html += '<div class="tarjeta mt"><div class="tarjeta-cab"><h3>Prioridad de repaso</h3>' +
      '<div class="der sm tenue">De menor a mayor dominio</div></div>';
    orden.slice(0, 10).forEach(function (t) {
      var e = Estado.tema(t.id);
      var pct = e.intentos ? Math.round((e.aciertos / e.intentos) * 100) : null;
      var dias = e.ultimo ? Estado.diasEntre(e.ultimo, Estado.hoyISO()) : null;
      html += '<div class="fila"><div class="crece">' +
        '<div class="titulo">' + UI.esc(t.nombre) + (t.alto ? ' <span class="etiq etiq-fuego">🔥</span>' : '') + '</div>' +
        '<div class="sub">' +
        (pct !== null ? pct + '% de acierto · ' : 'sin preguntas respondidas · ') +
        (dias === null ? 'nunca estudiado' : dias === 0 ? 'hoy' : 'hace ' + dias + (dias === 1 ? ' día' : ' días')) +
        '</div>' + UI.barra(Estado.dominio(t.id), Estado.dominio(t.id) >= 70 ? 'ok' : 'acento') + '</div>' +
        '<button class="btn btn-s btn-primario" data-accion="estudiar-tema" data-tema="' + t.id + '">Estudiar</button></div>';
    });
    html += '</div>';

    /* brechas históricas */
    var brechas = Estado.datos().brechas;
    html += '<div class="tarjeta mt"><div class="tarjeta-cab"><h3>Registro de brechas</h3>' +
      '<div class="der sm tenue">' + Estado.brechasAbiertas().length + ' abiertas</div></div>';
    if (!brechas.length) {
      html += '<div class="vacio"><span class="emoji">🧩</span>Sin brechas registradas todavía.</div>';
    } else {
      brechas.slice(0, 12).forEach(function (b, i) {
        var t = TUTOR.tema(b.tema);
        html += '<div class="fila"><div class="crece">' +
          '<div class="titulo"' + (b.resuelta ? ' style="text-decoration:line-through;opacity:.5"' : '') + '>' +
          UI.esc(b.texto) + '</div>' +
          '<div class="sub">' + UI.esc(t ? t.nombre : '') + ' · ' + UI.fechaCorta(b.fecha.slice(0, 10)) + '</div></div>' +
          (b.resuelta ? '<span class="etiq etiq-ok">Resuelta</span>' :
            '<button class="btn btn-s" data-accion="cerrar-brecha" data-i="' + i + '">Marcar resuelta</button>') +
          '</div>';
      });
    }
    html += '</div>';

    return html;
  }
});

/* ------------------------------------------------------------
   PROMPT PARA IA / NOTEBOOKLM
   ------------------------------------------------------------ */
UI.registrar('prompt', {
  titulo: 'Prompt del tutor',
  sub: 'Genera la instrucción exacta para NotebookLM, Claude o ChatGPT',
  angosto: true,
  render: function () {
    var temas = TUTOR.AREAS.map(function (a) {
      var lista = TUTOR.temasDeArea(a.id);
      if (!lista.length) return '';
      return '<optgroup label="' + a.icono + ' ' + UI.esc(a.nombre) + '">' +
        lista.map(function (t) {
          return '<option value="' + t.id + '">' + (t.alto ? '🔥 ' : '') + UI.esc(t.nombre) + '</option>';
        }).join('') + '</optgroup>';
    }).join('');
    var modos = TUTOR.MODOS.map(function (m) {
      return '<option value="' + m.id + '">' + m.icono + ' ' + UI.esc(m.nombre) + '</option>';
    }).join('');

    return '<div class="tarjeta">' +
      '<p class="sm tenue">La app aplica el método por dentro; este generador produce el mismo protocolo en texto, ' +
      'para que puedas continuar el estudio en NotebookLM con tus apuntes o en cualquier modelo de lenguaje, ' +
      'manteniendo exactamente las mismas reglas pedagógicas.</p>' +
      '<div class="rejilla c3">' +
      '<label class="campo"><span>Tema</span><select id="p-tema">' + temas + '</select></label>' +
      '<label class="campo"><span>Modo</span><select id="p-modo">' + modos + '</select></label>' +
      '<label class="campo"><span>Tiempo disponible</span><select id="p-min">' +
      [10, 20, 30, 45, 60].map(function (m) { return '<option value="' + m + '">' + m + ' minutos</option>'; }).join('') +
      '</select></label></div>' +
      '<div class="linea"><button class="btn btn-primario" data-accion="generar-prompt">Generar prompt</button>' +
      '<button class="btn" data-accion="copiar-prompt">Copiar</button>' +
      '<span class="sm tenue crece" id="p-estado"></span></div>' +
      '</div>' +
      '<div class="tarjeta mt"><div class="tarjeta-cab"><h3>Prompt generado</h3></div>' +
      '<div class="caja-prompt" id="p-salida">Elige tema, modo y tiempo, y pulsa «Generar prompt».</div></div>' +
      '<div class="tarjeta mt"><div class="tarjeta-cab"><h3>Cómo integrarlo con NotebookLM</h3></div>' +
      '<div class="doc">' +
      '<ol><li>Sube a NotebookLM tus fuentes: capítulos de Guyton, Costanzo o Braunwald, tus apuntes y los protocolos de tu unidad.</li>' +
      '<li>Pega el prompt generado como primera instrucción del cuaderno.</li>' +
      '<li>Estudia el tema aquí con el método y usa NotebookLM para profundizar en lo que la fase Feynman haya marcado como brecha.</li>' +
      '<li>Vuelve a la app y responde las preguntas de recuperación: lo que se consolida es lo que recuperas, no lo que lees.</li></ol>' +
      '<div class="aviso"><b>Regla de oro.</b> La IA explica; la memoria se construye recuperando. Usa el chat para entender y esta app para no olvidar.</div>' +
      '</div></div>';
  }
});

/* ------------------------------------------------------------
   AJUSTES
   ------------------------------------------------------------ */
UI.registrar('ajustes', {
  titulo: 'Ajustes',
  sub: 'Perfil, disponibilidad y datos',
  angosto: true,
  render: function () {
    var a = Estado.ajustes();
    var nombres = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

    var html = '<div class="tarjeta"><div class="tarjeta-cab"><h3>Perfil</h3></div>' +
      '<label class="campo"><span>Nombre</span>' +
      '<input type="text" id="a-nombre" value="' + UI.esc(a.nombre) + '"></label>' +
      '<label class="campo"><span>Tema visual</span>' +
      '<div class="conmutador" style="display:inline-flex">' +
      '<button data-accion="tema-visual" data-valor="auto" class="' + (a.tema === 'auto' ? 'sel' : '') + '">Automático</button>' +
      '<button data-accion="tema-visual" data-valor="claro" class="' + (a.tema === 'claro' ? 'sel' : '') + '">Claro</button>' +
      '<button data-accion="tema-visual" data-valor="oscuro" class="' + (a.tema === 'oscuro' ? 'sel' : '') + '">Oscuro</button>' +
      '</div>' +
      '<span class="sm tenue">En automático sigue la preferencia de tu sistema o del sitio donde esté incrustada la app.</span>' +
      '</label></div>';

    html += '<div class="tarjeta"><div class="tarjeta-cab">' +
      (typeof Minerva !== 'undefined' ? Minerva.avatar(30) : '') +
      '<h3>Minerva</h3></div>' +
      '<p class="sm tenue">Lee tu progreso real —racha, tarjetas vencidas, brechas repetidas, cumplimiento del plan— ' +
      'y propone una sola acción concreta cada vez. Si prefieres estudiar sin sugerencias, puedes desactivarla.</p>' +
      '<div class="conmutador" style="display:inline-flex">' +
      '<button data-accion="alternar-asistente" data-valor="1" class="' + (a.asistente ? 'sel' : '') + '">Activada</button>' +
      '<button data-accion="alternar-asistente" data-valor="0" class="' + (!a.asistente ? 'sel' : '') + '">Desactivada</button>' +
      '</div></div>';

    html += '<div class="tarjeta"><div class="tarjeta-cab"><h3>Áreas del conocimiento</h3>' +
      '<div class="der"><span class="etiq etiq-info">' + Estado.areasActivas().length + ' activas</span></div></div>' +
      '<p class="sm tenue">Activa o pausa áreas completas para concentrar el plan y el mazo de tarjetas en lo que toca ahora.</p>' +
      '<button class="btn" data-accion="navegar" data-ruta="areas">Gestionar áreas</button></div>';

    html += '<div class="tarjeta"><div class="tarjeta-cab"><h3>Minutos disponibles por día</h3>' +
      '<div class="der sm tenue">Base del plan</div></div>' +
      '<p class="sm tenue">Sé realista: un plan que no cabe en tu semana se abandona. Es preferible 20 minutos todos los días que 3 horas un domingo.</p>' +
      '<div class="rejilla c4">';
    for (var i = 0; i < 7; i++) {
      html += '<label class="campo"><span>' + nombres[i] + '</span>' +
        '<input type="number" min="0" max="240" step="5" data-dia="' + i + '" class="min-dia" value="' + (a.minutosPorDia[i] || 0) + '"></label>';
    }
    html += '</div>' +
      '<button class="btn btn-primario" data-accion="guardar-disponibilidad">Guardar y regenerar plan</button></div>';

    html += '<div class="tarjeta"><div class="tarjeta-cab"><h3>Repaso espaciado</h3></div>' +
      '<div class="rejilla c2">' +
      '<label class="campo"><span>Máximo de tarjetas al día</span>' +
      '<input type="number" id="a-max" min="5" max="200" value="' + a.maxTarjetasDia + '"></label>' +
      '<label class="campo"><span>Tarjetas nuevas al día</span>' +
      '<input type="number" id="a-nuevas" min="0" max="50" value="' + a.tarjetasNuevasDia + '"></label>' +
      '</div><button class="btn" data-accion="guardar-srs">Guardar</button></div>';

    html += '<div class="tarjeta"><div class="tarjeta-cab"><h3>Datos</h3></div>' +
      '<p class="sm tenue">Almacenamiento actual: <b>' +
      (Almacen.modo === 'local' ? 'navegador (localStorage)' : 'Google Apps Script (PropertiesService)') +
      '</b>. Al migrar a Apps Script, el progreso pasa a guardarse en tu cuenta de Google sin cambiar nada del resto de la app.</p>' +
      '<div class="linea">' +
      '<button class="btn" data-accion="exportar">Exportar progreso</button>' +
      '<button class="btn" data-accion="importar">Importar</button>' +
      '<button class="btn btn-acento" data-accion="reiniciar">Reiniciar todo</button>' +
      '</div></div>';

    return html;
  }
});

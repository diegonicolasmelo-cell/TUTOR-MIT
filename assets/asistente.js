/* ============================================================
   MINERVA — asistente de estudio
   ------------------------------------------------------------
   El búho de Minerva emprende su vuelo al caer el crepúsculo
   (Hegel). Apropiado para quien estudia después del turno.

   No es un adorno: lee el estado real (racha, tarjetas vencidas,
   brechas, precisión por nivel, decaimiento por área) y produce
   consejos priorizados con UNA acción concreta cada uno.
   ============================================================ */

var Minerva = (function () {

  /* ------------------------------------------------------------
     Avatar en SVG. Hereda color de los tokens del tema, de modo
     que funciona igual en claro y en oscuro.
     ------------------------------------------------------------ */
  function avatar(tamano, clase) {
    var t = tamano || 40;
    return '<svg class="buho ' + (clase || '') + '" viewBox="0 0 64 64" width="' + t + '" height="' + t + '" ' +
      'role="img" aria-label="Minerva, tu asistente de estudio">' +
      /* penachos */
      '<path d="M14 20 L18 8 L26 16 Z" fill="var(--buho-cuerpo)"/>' +
      '<path d="M50 20 L46 8 L38 16 Z" fill="var(--buho-cuerpo)"/>' +
      /* cuerpo */
      '<ellipse cx="32" cy="36" rx="22" ry="24" fill="var(--buho-cuerpo)"/>' +
      /* pecho */
      '<ellipse cx="32" cy="42" rx="14" ry="16" fill="var(--buho-pecho)" opacity=".55"/>' +
      /* discos faciales */
      '<circle cx="23" cy="30" r="10" fill="var(--buho-cara)"/>' +
      '<circle cx="41" cy="30" r="10" fill="var(--buho-cara)"/>' +
      /* ojos */
      '<g class="buho-ojos">' +
      '<circle cx="23" cy="30" r="6" fill="var(--buho-ojo)"/>' +
      '<circle cx="41" cy="30" r="6" fill="var(--buho-ojo)"/>' +
      '<circle cx="25" cy="28" r="2" fill="#fff" opacity=".9"/>' +
      '<circle cx="43" cy="28" r="2" fill="#fff" opacity=".9"/>' +
      '</g>' +
      /* párpados para el parpadeo */
      '<g class="buho-parpados">' +
      '<circle cx="23" cy="30" r="6.4" fill="var(--buho-cara)"/>' +
      '<circle cx="41" cy="30" r="6.4" fill="var(--buho-cara)"/>' +
      '</g>' +
      /* pico */
      '<path d="M32 33 L28 40 L36 40 Z" fill="var(--buho-pico)"/>' +
      /* alas */
      '<path d="M12 32 Q8 44 16 52 Q14 42 16 34 Z" fill="var(--buho-ala)"/>' +
      '<path d="M52 32 Q56 44 48 52 Q50 42 48 34 Z" fill="var(--buho-ala)"/>' +
      /* patas */
      '<path d="M27 58 v3 M31 58 v3 M33 58 v3 M37 58 v3" stroke="var(--buho-pico)" stroke-width="2" stroke-linecap="round"/>' +
      '</svg>';
  }

  /* ------------------------------------------------------------
     Saludo según la hora. Diego estudia de noche, después del
     turno: el mensaje lo reconoce en lugar de ignorarlo.
     ------------------------------------------------------------ */
  function saludo() {
    var h = new Date().getHours();
    var n = Estado.ajustes().nombre;
    if (h < 6) return '¿Guardia o insomnio, ' + n + '? A esta hora conviene repaso corto, no tema nuevo.';
    if (h < 12) return 'Buenos días, ' + n + '. La mañana rinde bien para comprender mecanismos.';
    if (h < 18) return 'Buenas tardes, ' + n + '. ¿Cuánto tiempo real tienes ahora?';
    if (h < 22) return 'Buenas noches, ' + n + '. Es la franja en la que más has estudiado.';
    return 'Tarde, ' + n + '. Si vienes cansado, quince minutos de tarjetas valen más que forzar un tema nuevo.';
  }

  /* ------------------------------------------------------------
     MOTOR DE REGLAS
     Cada regla devuelve null o un consejo con una sola acción.
     Prioridad mayor = más arriba.
     ------------------------------------------------------------ */
  var REGLAS = [

    /* --- 1. Tarjetas vencidas acumuladas --- */
    function () {
      var s = Estado.estadisticasTarjetas();
      if (s.vencenHoy < 1) return null;
      var urgente = s.vencenHoy >= 25;
      return {
        id: 'tarjetas',
        prioridad: urgente ? 95 : 60,
        tono: urgente ? 'alerta' : 'info',
        titulo: s.vencenHoy + ' tarjetas esperan hoy',
        texto: urgente
          ? 'Se te han acumulado. Si las dejas crecer, el mazo se vuelve una deuda y acabas abandonándolo. Haz una tanda ahora aunque no las termines todas: el algoritmo reorganiza el resto.'
          : 'Es lo más rentable por minuto invertido que puedes hacer ahora mismo. Se recuperan en cualquier hueco, también desde el móvil.',
        accion: { etiqueta: 'Repasar ahora', accion: 'ir-tarjetas' }
      };
    },

    /* --- 2. Racha en riesgo --- */
    function () {
      var d = Estado.datos();
      var hoy = Estado.hoyISO();
      var minHoy = Estado.minutosDe(hoy);
      if (minHoy > 0) return null;
      if (d.racha.dias < 2) return null;
      var hora = new Date().getHours();
      if (hora < 17) return null;
      return {
        id: 'racha',
        prioridad: 80,
        tono: 'alerta',
        titulo: 'Tu racha de ' + d.racha.dias + ' días se corta hoy',
        texto: 'No hace falta una sesión completa. Diez minutos de repaso mantienen la continuidad, y la continuidad es lo que realmente construye la memoria: importa más la frecuencia que la duración.',
        accion: { etiqueta: 'Sesión de 10 min', accion: 'arranque-rapido', datos: { min: 10 } }
      };
    },

    /* --- 3. Brechas repetidas en un mismo tema --- */
    function () {
      var abiertas = Estado.brechasAbiertas();
      if (abiertas.length < 3) return null;
      var cuenta = {};
      abiertas.forEach(function (b) { cuenta[b.tema] = (cuenta[b.tema] || 0) + 1; });
      var peor = null, max = 0;
      Object.keys(cuenta).forEach(function (k) {
        if (cuenta[k] > max) { max = cuenta[k]; peor = k; }
      });
      if (max < 2) return null;
      var t = TUTOR.tema(peor);
      if (!t) return null;
      return {
        id: 'brechas',
        prioridad: 85,
        tono: 'alerta',
        titulo: max + ' brechas abiertas en «' + t.nombre + '»',
        texto: 'Cuando las brechas se concentran en un tema, no es despiste: hay un concepto de base que no está sujeto. Vuelve a él en modo comprender y detente en la fase Feynman, que es donde se ve exactamente qué falta.',
        accion: { etiqueta: 'Reforzar el tema', accion: 'estudiar-tema', datos: { tema: peor } }
      };
    },

    /* --- 4. Área sin tocar --- */
    function () {
      /* No tiene sentido antes de la primera sesión: ahí manda la
         regla de arranque, y decir que "todo está sin abrir" sobra. */
      if (Estado.datos().sesiones.length === 0) return null;
      var activas = Estado.areasActivas();
      if (activas.length < 2) return null;
      var candidata = null;
      activas.forEach(function (id) {
        if (candidata) return;
        var temas = TUTOR.temasDeArea(id);
        if (!temas.length) return;
        var tocada = temas.some(function (t) { return Estado.tema(t.id).vistas > 0; });
        if (!tocada) candidata = id;
      });
      if (!candidata) return null;
      var a = TUTOR.area(candidata);
      var primero = TUTOR.temasDeArea(candidata).filter(function (t) { return t.alto; })[0] ||
        TUTOR.temasDeArea(candidata)[0];
      return {
        id: 'area-nueva',
        prioridad: 40,
        tono: 'info',
        titulo: a.icono + ' ' + a.nombre + ' sigue sin abrir',
        texto: a.lema + ' Intercalar áreas distintas rinde más que agotar una antes de pasar a la siguiente: el contraste entre materias mejora la discriminación y la retención.',
        accion: { etiqueta: 'Empezar por lo esencial', accion: 'estudiar-tema', datos: { tema: primero.id } }
      };
    },

    /* --- 5. Precisión baja en razonamiento clínico --- */
    function () {
      var d = Estado.datos();
      if (d.sesiones.length < 3) return null;
      var acc = 0, tot = 0;
      d.sesiones.slice(0, 8).forEach(function (s) { acc += s.aciertos || 0; tot += s.total || 0; });
      if (tot < 10) return null;
      var pct = Math.round((acc / tot) * 100);
      if (pct >= 65) return null;
      return {
        id: 'precision',
        prioridad: 70,
        tono: 'alerta',
        titulo: 'Precisión del ' + pct + '% en tus últimas sesiones',
        texto: 'Fallar no es el problema; fallar sin volver sí lo es. Prueba una sesión en modo examen: sin explicación previa, solo preguntas con corrección razonada. Es incómodo y es exactamente lo que consolida.',
        accion: { etiqueta: 'Modo examen', accion: 'abrir-preparar' }
      };
    },

    /* --- 6. Tema consolidado que empieza a decaer --- */
    function () {
      var candidato = null, peorDias = 0;
      TUTOR.TEMAS.forEach(function (t) {
        var e = Estado.tema(t.id);
        if (!e.ultimo || e.vistas < 1) return;
        var dias = Estado.diasEntre(e.ultimo, Estado.hoyISO());
        if (dias >= 7 && dias > peorDias) { peorDias = dias; candidato = t; }
      });
      if (!candidato) return null;
      return {
        id: 'decaimiento',
        prioridad: 55,
        tono: 'info',
        titulo: 'Hace ' + peorDias + ' días que no tocas «' + candidato.nombre + '»',
        texto: 'La curva de olvido es más pronunciada justo después de aprender algo. Un repaso corto ahora cuesta cinco minutos; reconstruirlo desde cero dentro de un mes costará la sesión entera.',
        accion: { etiqueta: 'Repaso rápido', accion: 'estudiar-tema', datos: { tema: candidato.id } }
      };
    },

    /* --- 7. Plan más ambicioso que la realidad --- */
    function () {
      var plan = Estado.plan();
      var claves = Object.keys(plan).sort();
      if (claves.length < 4) return null;
      var hoy = Estado.hoyISO();
      var pasados = claves.filter(function (f) { return f < hoy; });
      if (pasados.length < 3) return null;
      var total = 0, hechos = 0;
      pasados.forEach(function (f) {
        plan[f].forEach(function (b) { total++; if (b.hecho) hechos++; });
      });
      if (total === 0) return null;
      var cumplimiento = hechos / total;
      if (cumplimiento > 0.45) return null;
      return {
        id: 'sobrecarga',
        prioridad: 75,
        tono: 'alerta',
        titulo: 'Estás cumpliendo el ' + Math.round(cumplimiento * 100) + '% de tu plan',
        texto: 'Eso casi nunca significa falta de voluntad: significa que el plan no cabe en tu semana. Baja los minutos diarios a lo que de verdad puedes sostener con guardias y familia. Un plan que se cumple al 90 % rinde más que uno ambicioso que se abandona.',
        accion: { etiqueta: 'Ajustar disponibilidad', accion: 'navegar', datos: { ruta: 'ajustes' } }
      };
    },

    /* --- 8. Todo al día --- */
    function () {
      var s = Estado.estadisticasTarjetas();
      var minHoy = Estado.minutosDe(Estado.hoyISO());
      if (s.vencenHoy > 0 || minHoy === 0) return null;
      var global = Estado.dominioGlobal();
      return {
        id: 'al-dia',
        prioridad: 20,
        tono: 'ok',
        titulo: 'Vas al día',
        texto: global < 50
          ? 'Tarjetas al día y sesión hecha. Si te queda tiempo y energía, un tema nuevo rinde más ahora que mañana con prisa.'
          : 'Tarjetas al día, sesión hecha y dominio del ' + global + '%. Este es el momento de profundizar en un tema que ya domines: la profundización sobre base sólida es lo que separa aprobar de razonar.',
        accion: { etiqueta: 'Elegir tema', accion: 'abrir-preparar' }
      };
    },

    /* --- 9. Primer arranque --- */
    function () {
      var d = Estado.datos();
      if (d.sesiones.length > 0) return null;
      var s = Estado.sugerencia();
      var t = TUTOR.tema(s.tema);
      return {
        id: 'primera',
        prioridad: 100,
        tono: 'info',
        titulo: 'Empecemos por lo que más rinde',
        texto: 'No hace falta que decidas nada todavía. «' + t.nombre + '» es alto rendimiento y sostiene buena parte de lo que viene después. Veinte minutos bastan para una sesión completa: se dosifica sola.',
        accion: { etiqueta: 'Sesión de 20 min', accion: 'arranque-rapido', datos: { min: 20 } }
      };
    }
  ];

  function consejos() {
    var salida = [];
    REGLAS.forEach(function (r) {
      try {
        var c = r();
        if (c) salida.push(c);
      } catch (e) { /* una regla defectuosa no debe romper el panel */ }
    });
    salida.sort(function (a, b) { return b.prioridad - a.prioridad; });
    return salida;
  }

  function principal() {
    var c = consejos();
    return c.length ? c[0] : null;
  }

  /* ------------------------------------------------------------
     Voz de Minerva dentro de la sesión: una línea por fase que
     explica POR QUÉ se hace lo que se está haciendo.
     ------------------------------------------------------------ */
  var VOZ_FASE = {
    anclaje: 'Vas a fallar esto y está bien. Intentar recuperar algo que aún no sabes prepara al cerebro para codificarlo: el error previo hace que la explicación se fije mejor que si la leyeras directamente.',
    comprension: 'Lee buscando la cadena causal, no los datos sueltos. Si una flecha no tiene un porqué, ahí tienes tu primera brecha.',
    feynman: 'Esta es la fase que más incomoda y la que más te va a servir. La fluidez al leer engaña; solo producir la explicación revela lo que falta.',
    recuperacion: 'Responde antes de revelar, aunque sea a medias. Y sé honesto al calificarte: si te sobrevaloras, el sistema te devolverá esta pregunta demasiado tarde.',
    caso: 'Pregúntate siempre lo mismo: ¿qué variable cambió primero? El resto del cuadro son consecuencias y compensaciones de esa primera.',
    consolidacion: 'Cierra bien: el error frecuente y la perla son lo que sobrevive a los meses. Las tarjetas ya quedan programadas para devolvértelo justo antes de que lo olvides.'
  };

  function vozFase(idFase) { return VOZ_FASE[idFase] || ''; }

  /* ------------------------------------------------------------
     Panel flotante
     ------------------------------------------------------------ */
  function pintarBoton() {
    var contenedor = UI.$('#minerva');
    if (!contenedor) return;
    if (!Estado.ajustes().asistente) { contenedor.innerHTML = ''; return; }

    var c = principal();
    var alerta = c && (c.tono === 'alerta');
    contenedor.innerHTML =
      '<button class="minerva-btn' + (alerta ? ' con-aviso' : '') + '" data-accion="abrir-minerva" ' +
      'aria-label="Abrir a Minerva, tu asistente">' + avatar(34) +
      (alerta ? '<span class="punto"></span>' : '') + '</button>';
  }

  function abrir() {
    var lista = consejos();
    var html =
      '<div class="minerva-cab">' + avatar(52) +
      '<div><h3 style="margin:0">Minerva</h3>' +
      '<div class="sm tenue">Tu asistente de estudio</div></div>' +
      '<button class="btn btn-s btn-fantasma" data-accion="cerrar-modal" style="margin-left:auto">✕</button>' +
      '</div>' +
      '<p class="minerva-saludo">' + UI.esc(saludo()) + '</p>';

    if (!lista.length) {
      html += '<div class="vacio"><span class="emoji">🌙</span>Nada urgente ahora mismo.</div>';
    } else {
      html += lista.slice(0, 4).map(function (c) {
        return '<div class="minerva-consejo tono-' + c.tono + '">' +
          '<div class="titulo">' + UI.esc(c.titulo) + '</div>' +
          '<p>' + UI.esc(c.texto) + '</p>' +
          (c.accion
            ? '<button class="btn btn-s btn-primario" data-accion="minerva-accion" ' +
              'data-real="' + c.accion.accion + '" ' +
              'data-carga="' + UI.esc(JSON.stringify(c.accion.datos || {})) + '">' +
              UI.esc(c.accion.etiqueta) + ' →</button>'
            : '') +
          '</div>';
      }).join('');
    }

    html += '<div class="minerva-pie">' +
      '<span class="sm tenue">«El búho de Minerva levanta el vuelo al anochecer.» ' +
      'Un buen momento para estudiar es el que existe de verdad.</span></div>';

    UI.modal(html);
  }

  return {
    avatar: avatar,
    consejos: consejos,
    principal: principal,
    vozFase: vozFase,
    pintarBoton: pintarBoton,
    abrir: abrir,
    saludo: saludo
  };
})();

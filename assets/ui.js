/* ============================================================
   UI — utilidades, enrutador y armazón de la aplicación
   Sin dependencias externas: compatible con HtmlService.
   ============================================================ */

var UI = (function () {
  var acciones = {};   // registro de manejadores por data-accion

  function esc(s) {
    return String(s === undefined || s === null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function $(sel, raiz) { return (raiz || document).querySelector(sel); }
  function $$(sel, raiz) {
    return Array.prototype.slice.call((raiz || document).querySelectorAll(sel));
  }

  function brindis(mensaje) {
    var el = $('#brindis');
    el.textContent = mensaje;
    el.classList.add('ver');
    clearTimeout(el._t);
    el._t = setTimeout(function () { el.classList.remove('ver'); }, 2200);
  }

  function modal(html) {
    cerrarModal();
    var velo = document.createElement('div');
    velo.className = 'velo';
    velo.id = 'velo';
    velo.innerHTML = '<div class="modal">' + html + '</div>';
    velo.addEventListener('click', function (e) {
      if (e.target === velo) cerrarModal();
    });
    document.body.appendChild(velo);
  }

  function cerrarModal() {
    var v = $('#velo');
    if (v) v.remove();
  }

  function barra(valor, clase) {
    return '<div class="barra-progreso ' + (clase || '') + '">' +
      '<i style="width:' + Math.max(0, Math.min(100, valor)) + '%"></i></div>';
  }

  function flecha(direccion) {
    if (direccion === 'up') return '<span class="dir up">↑</span>';
    if (direccion === 'down') return '<span class="dir down">↓</span>';
    return '<span class="dir eq">=</span>';
  }

  function variables(lista) {
    if (!lista || !lista.length) return '';
    return '<div class="variables">' + lista.map(function (v) {
      return '<span class="var-chip" title="' + esc(v.nota || '') + '">' +
        flecha(v.d) + esc(v.n) + '</span>';
    }).join('') + '</div>';
  }

  function cadena(pasos) {
    if (!pasos || !pasos.length) return '';
    return '<div class="cadena">' + pasos.map(function (p, i) {
      var sep = i < pasos.length - 1 ? '<span class="flecha">→</span>' : '';
      var clase = i === pasos.length - 1 ? 'paso destacado' : 'paso';
      return '<span class="' + clase + '">' + esc(p) + '</span>' + sep;
    }).join('') + '</div>';
  }

  function esquema(nodos) {
    if (!nodos || !nodos.length) return '';
    return '<div class="esquema">' + nodos.map(function (n, i) {
      var f = i < nodos.length - 1 ? '<span class="baja-flecha">↓</span>' : '';
      return '<div class="nodo">' + esc(n) + '</div>' + f;
    }).join('') + '</div>';
  }

  function etiquetaDominio(valor) {
    var n = TUTOR.nivelDominio(valor);
    return '<span class="etiq ' + n.clase + '">' + n.etiqueta + ' · ' + valor + '%</span>';
  }

  function minutosTexto(m) {
    if (m < 60) return m + ' min';
    var h = Math.floor(m / 60), r = m % 60;
    return h + ' h' + (r ? ' ' + r + ' min' : '');
  }

  function fechaCorta(iso) {
    var f = new Date(iso + (iso.length === 10 ? 'T12:00:00' : ''));
    return f.toLocaleDateString('es', { day: 'numeric', month: 'short' });
  }

  function nombreDia(iso) {
    var f = new Date(iso + 'T12:00:00');
    return ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'][f.getDay()];
  }

  /* ---------------- acciones delegadas ---------------- */
  function accion(nombre, fn) { acciones[nombre] = fn; }

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-accion]');
    if (!el) return;
    var fn = acciones[el.getAttribute('data-accion')];
    if (fn) {
      e.preventDefault();
      fn(el.dataset, el, e);
    }
  });

  /* ---------------- enrutador ---------------- */
  var rutas = {};
  var rutaActual = null;
  var parametros = {};

  function registrar(id, def) { rutas[id] = def; }

  function ir(id, params) {
    if (!rutas[id]) id = 'inicio';
    rutaActual = id;
    parametros = params || {};
    pintar();
    window.scrollTo(0, 0);
  }

  function pintar() {
    var r = rutas[rutaActual];
    if (!r) return;
    var titulo = typeof r.titulo === 'function' ? r.titulo(parametros) : r.titulo;
    var sub = typeof r.sub === 'function' ? r.sub(parametros) : (r.sub || '');
    var acc = r.acciones ? r.acciones(parametros) : '';

    $('#titulo-vista').innerHTML = esc(titulo);
    $('#sub-vista').innerHTML = sub;
    $('#acciones-vista').innerHTML = acc;
    $('#contenido').className = 'contenido' + (r.angosto ? ' angosto' : '');
    $('#contenido').innerHTML = r.render(parametros);

    if (r.despues) r.despues(parametros);
    marcarNavegacion();
    /* Minerva reevalúa su consejo en cada cambio de vista. */
    if (typeof Minerva !== 'undefined') Minerva.pintarBoton();
  }

  function refrescar() { pintar(); }

  function marcarNavegacion() {
    $$('.nav-item').forEach(function (b) {
      b.classList.toggle('activo', b.dataset.ruta === rutaActual);
    });
    $$('.menu-movil button').forEach(function (b) {
      b.classList.toggle('activo', b.dataset.ruta === rutaActual);
    });
  }

  function actualizarGlobos() {
    var pendientes = Estado.estadisticasTarjetas().vencenHoy;
    $$('[data-globo="tarjetas"]').forEach(function (el) {
      el.innerHTML = pendientes ? '<span class="globo">' + pendientes + '</span>' : '';
    });
  }

  /* ---------------- tema claro/oscuro ----------------
     'auto' retira el atributo para que decidan el anfitrión
     (data-theme) o la preferencia del sistema. */
  function aplicarTema(tema) {
    if (tema === 'auto' || !tema) document.documentElement.removeAttribute('data-tema');
    else document.documentElement.setAttribute('data-tema', tema);
  }

  return {
    esc: esc, $: $, $$: $$,
    brindis: brindis, modal: modal, cerrarModal: cerrarModal,
    barra: barra, variables: variables, cadena: cadena, esquema: esquema,
    etiquetaDominio: etiquetaDominio, minutosTexto: minutosTexto,
    fechaCorta: fechaCorta, nombreDia: nombreDia,
    accion: accion, registrar: registrar, ir: ir, refrescar: refrescar,
    actualizarGlobos: actualizarGlobos, aplicarTema: aplicarTema,
    rutaActual: function () { return rutaActual; }
  };
})();


/* ============================================================
   Cronómetro reutilizable para las sesiones
   ============================================================ */

var Crono = (function () {
  var intervalo = null;
  var restanteSeg = 0;
  var alCambiar = null;
  var alTerminar = null;
  var pausado = false;

  function formatear(seg) {
    var m = Math.floor(Math.abs(seg) / 60), s = Math.abs(seg) % 60;
    return (seg < 0 ? '−' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }

  function tic() {
    if (pausado) return;
    restanteSeg -= 1;
    if (alCambiar) alCambiar(restanteSeg, formatear(restanteSeg));
    if (restanteSeg === 0 && alTerminar) alTerminar();
  }

  return {
    iniciar: function (minutos, cambio, fin) {
      Crono.parar();
      restanteSeg = Math.round(minutos * 60);
      alCambiar = cambio; alTerminar = fin; pausado = false;
      if (alCambiar) alCambiar(restanteSeg, formatear(restanteSeg));
      intervalo = setInterval(tic, 1000);
    },
    alternarPausa: function () {
      pausado = !pausado;
      return pausado;
    },
    estaPausado: function () { return pausado; },
    parar: function () {
      if (intervalo) clearInterval(intervalo);
      intervalo = null;
    },
    transcurridoMin: function (totalMin) {
      return Math.max(0, Math.round(totalMin - restanteSeg / 60));
    },
    formatear: formatear,
    restante: function () { return restanteSeg; }
  };
})();

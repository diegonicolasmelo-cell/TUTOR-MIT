/* ============================================================
   DIAPOSITIVAS — modo presentación de un tema
   ------------------------------------------------------------
   Construye la presentación a partir del mismo contenido que ya
   tiene el tema: no hay material duplicado que mantener.

   Sirve para tres cosas distintas: repasar en pantalla completa
   sin distracciones, proyectar el tema en una sesión clínica, y
   pasar el contenido en el móvil con el pulgar.
   ============================================================ */

var Diapositivas = (function () {
  var d = null;   // presentación activa

  /* ------------------------------------------------------------
     Construcción: cada pieza del tema es una diapositiva.
     ------------------------------------------------------------ */
  function construir(tema, soloEsenciales) {
    var s = [];

    s.push({
      tipo: 'portada',
      titulo: tema.nombre,
      cuerpo: '<p class="idea">' + tema.ideaCentral + '</p>',
      pie: (TUTOR.area(TUTOR.areaDeTema(tema.id)) || {}).nombre || ''
    });

    var bloques = tema.bloques.filter(function (b) {
      return soloEsenciales ? b.nivel === 'imprescindible' : true;
    });

    bloques.forEach(function (b) {
      s.push({
        tipo: 'bloque',
        etiqueta: TUTOR.NIVELES[b.nivel].nombre,
        titulo: b.titulo,
        cuerpo: (b.html || '') + UI.cadena(b.cadena) + UI.esquema(b.esquema)
      });
    });

    if (tema.variables && tema.variables.length) {
      s.push({
        tipo: 'variables',
        etiqueta: 'Variables clave',
        titulo: '¿Qué se mueve y en qué dirección?',
        cuerpo: UI.variables(tema.variables)
      });
    }

    if (!soloEsenciales) {
      if (tema.fisiopatologia) {
        s.push({ tipo: 'bloque', etiqueta: 'Fisiopatología', titulo: 'Cuando el sistema se altera', cuerpo: tema.fisiopatologia });
      }
      if (tema.clinica) {
        s.push({ tipo: 'bloque', etiqueta: 'Correlación clínica', titulo: 'Cómo se manifiesta', cuerpo: tema.clinica });
      }
    }

    if (tema.error) {
      s.push({
        tipo: 'error',
        etiqueta: 'Error frecuente',
        titulo: tema.error.confunde,
        cuerpo: '<p><b>Por qué se parecen:</b> ' + tema.error.parecido + '</p>' +
          '<p><b>La diferencia real:</b> ' + tema.error.diferencia + '</p>' +
          '<div class="regla">🧭 ' + tema.error.regla + '</div>'
      });
    }

    s.push({ tipo: 'perla', etiqueta: 'Perla de examen', titulo: '', cuerpo: tema.perla });

    /* Cierre útil: en qué se convierte esto al salir. */
    s.push({
      tipo: 'cierre',
      titulo: '¿Y ahora?',
      cuerpo: '<p>Las diapositivas son <b>reconocimiento</b>: pasarlas se siente fluido y por eso engaña. ' +
        'Lo que fija la memoria es <b>recuperar</b>.</p>' +
        '<p>Cierra esto y responde las preguntas del tema, o pasa sus tarjetas.</p>',
      tema: tema.id
    });

    return s;
  }

  function abrir(idTema, soloEsenciales) {
    var tema = TUTOR.tema(idTema);
    if (!tema) return;
    d = { tema: tema, slides: construir(tema, soloEsenciales), i: 0, esenciales: !!soloEsenciales };
    pintar();
    document.addEventListener('keydown', teclado);
  }

  function cerrar() {
    d = null;
    document.removeEventListener('keydown', teclado);
    var el = UI.$('#presentacion');
    if (el) el.remove();
  }

  function mover(delta) {
    if (!d) return;
    var nuevo = d.i + delta;
    if (nuevo < 0 || nuevo >= d.slides.length) return;
    d.i = nuevo;
    pintar();
  }

  function irA(indice) {
    if (!d) return;
    d.i = Math.max(0, Math.min(d.slides.length - 1, indice));
    pintar();
  }

  function teclado(ev) {
    if (!d) return;
    if (ev.key === 'ArrowRight' || ev.key === ' ' || ev.key === 'PageDown') { ev.preventDefault(); mover(1); }
    else if (ev.key === 'ArrowLeft' || ev.key === 'PageUp') { ev.preventDefault(); mover(-1); }
    else if (ev.key === 'Escape') { ev.preventDefault(); cerrar(); }
    else if (ev.key === 'Home') { ev.preventDefault(); irA(0); }
    else if (ev.key === 'End') { ev.preventDefault(); irA(d.slides.length - 1); }
  }

  function pintar() {
    var s = d.slides[d.i];
    var progreso = ((d.i + 1) / d.slides.length) * 100;

    var html =
      '<div class="pres-barra"><i style="width:' + progreso + '%"></i></div>' +

      '<div class="pres-sup">' +
      '<span class="sm tenue">' + UI.esc(d.tema.nombre) + '</span>' +
      '<span class="crece"></span>' +
      '<span class="sm tenue">' + (d.i + 1) + ' / ' + d.slides.length + '</span>' +
      '<button class="btn btn-s btn-fantasma" data-accion="pres-cerrar" aria-label="Cerrar presentación">✕ Salir</button>' +
      '</div>' +

      '<div class="pres-cuerpo slide-' + s.tipo + '">' +
      '<div class="pres-caja">' +
      (s.etiqueta ? '<div class="pres-etiqueta">' + UI.esc(s.etiqueta) + '</div>' : '') +
      (s.titulo ? '<h2>' + UI.esc(s.titulo) + '</h2>' : '') +
      '<div class="doc">' + s.cuerpo + '</div>' +
      (s.tipo === 'cierre'
        ? '<div class="linea mt">' +
          '<button class="btn btn-primario" data-accion="pres-estudiar" data-tema="' + s.tema + '">Ir a las preguntas</button>' +
          '<button class="btn" data-accion="pres-tarjetas" data-tema="' + s.tema + '">Pasar sus tarjetas</button>' +
          '</div>'
        : '') +
      '</div></div>' +

      '<div class="pres-inf">' +
      '<button class="btn btn-s" data-accion="pres-mover" data-d="-1"' + (d.i === 0 ? ' disabled' : '') + '>← Anterior</button>' +
      '<div class="pres-puntos">' +
      d.slides.map(function (_, k) {
        return '<button class="punto' + (k === d.i ? ' actual' : '') + '" data-accion="pres-ir" data-i="' + k + '" ' +
          'aria-label="Diapositiva ' + (k + 1) + '"></button>';
      }).join('') +
      '</div>' +
      '<button class="btn btn-s btn-primario" data-accion="pres-mover" data-d="1"' +
      (d.i === d.slides.length - 1 ? ' disabled' : '') + '>Siguiente →</button>' +
      '</div>' +

      '<div class="pres-ayuda sm tenue">← → para navegar · Esc para salir</div>';

    var el = UI.$('#presentacion');
    if (!el) {
      el = document.createElement('div');
      el.id = 'presentacion';
      el.className = 'presentacion';
      document.body.appendChild(el);
    }
    el.innerHTML = html;
    var cuerpo = UI.$('.pres-cuerpo');
    if (cuerpo) cuerpo.scrollTop = 0;
  }

  return {
    abrir: abrir, cerrar: cerrar, mover: mover, irA: irA,
    activa: function () { return !!d; },
    datos: function () { return d; }
  };
})();

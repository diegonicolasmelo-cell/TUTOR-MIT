/* ============================================================
   BIBLIOTECA Y NOTAS — la parte de «segundo cerebro»
   ------------------------------------------------------------
   Dos piezas complementarias al resto de la app:

   · BIBLIOTECA: las fuentes que usas de verdad (papers, guías,
     apuntes, capítulos), enlazadas a los temas que las citan.
     No almacena archivos —no cabrían— sino referencias con su
     enlace, de modo que sepas siempre de dónde salió algo.

   · NOTAS: notas atómicas enlazadas entre sí con [[dobles
     corchetes]], al estilo Zettelkasten. Una nota = una idea.
     La estructura emerge de los enlaces, no de una jerarquía.

   Por qué conviven con el temario jerárquico: el temario sirve
   para NO OLVIDAR lo que ya entendiste; las notas sirven para
   PENSAR y conectar entre áreas. Son objetivos distintos y por
   eso son herramientas distintas.
   ============================================================ */

var Notas = (function () {

  function idNuevo(prefijo) {
    return prefijo + '-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  }

  function normalizar(t) {
    return String(t || '').trim().toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '');
  }

  /* ------------------------------------------------------------
     Enlaces [[así]]: el mecanismo que hace emerger la estructura.
     ------------------------------------------------------------ */
  function extraerEnlaces(cuerpo) {
    var salida = [];
    var re = /\[\[([^\]]+)\]\]/g;
    var m;
    while ((m = re.exec(String(cuerpo || ''))) !== null) {
      var t = m[1].trim();
      if (t && salida.indexOf(t) < 0) salida.push(t);
    }
    return salida;
  }

  function porTitulo(titulo) {
    var n = normalizar(titulo);
    return Estado.notas().filter(function (x) { return normalizar(x.titulo) === n; })[0] || null;
  }

  /* Renderiza el cuerpo convirtiendo [[enlaces]] en botones.
     Los que no existen todavía aparecen punteados y ofrecen
     crearlos: escribir el enlace antes que la nota es
     precisamente cómo crece un Zettelkasten. */
  function render(cuerpo) {
    var texto = UI.esc(cuerpo || '');
    texto = texto.replace(/\[\[([^\]]+)\]\]/g, function (_, titulo) {
      var t = titulo.trim();
      var destino = porTitulo(t);
      if (destino) {
        return '<button class="enlace-nota" data-accion="nota-abrir" data-id="' + destino.id + '">' +
          UI.esc(t) + '</button>';
      }
      return '<button class="enlace-nota vacio" data-accion="nota-crear-desde" data-titulo="' +
        UI.esc(t) + '">' + UI.esc(t) + ' +</button>';
    });
    return texto.replace(/\n/g, '<br>');
  }

  /* Notas que enlazan a una dada: el valor real del sistema no
     está en los enlaces que pones, sino en los que descubres. */
  function retroenlaces(nota) {
    return Estado.notas().filter(function (x) {
      if (x.id === nota.id) return false;
      return extraerEnlaces(x.cuerpo).some(function (t) {
        return normalizar(t) === normalizar(nota.titulo);
      });
    });
  }

  function huerfanas() {
    return Estado.notas().filter(function (n) {
      return extraerEnlaces(n.cuerpo).length === 0 && retroenlaces(n).length === 0;
    });
  }

  function buscar(termino) {
    var q = normalizar(termino);
    if (!q) return Estado.notas();
    return Estado.notas().filter(function (n) {
      return normalizar(n.titulo).indexOf(q) >= 0 || normalizar(n.cuerpo).indexOf(q) >= 0;
    });
  }

  function deTema(idTema) {
    return Estado.notas().filter(function (n) {
      return (n.temas || []).indexOf(idTema) >= 0;
    });
  }

  return {
    idNuevo: idNuevo, extraerEnlaces: extraerEnlaces, porTitulo: porTitulo,
    render: render, retroenlaces: retroenlaces, huerfanas: huerfanas,
    buscar: buscar, deTema: deTema, normalizar: normalizar
  };
})();


var TIPOS_FUENTE = [
  { id: 'paper', nombre: 'Paper', icono: '📄' },
  { id: 'guia', nombre: 'Guía clínica', icono: '📋' },
  { id: 'libro', nombre: 'Libro o capítulo', icono: '📕' },
  { id: 'apunte', nombre: 'Apunte propio', icono: '✍️' },
  { id: 'clase', nombre: 'Clase o sesión', icono: '🎓' }
];

function tipoFuente(id) {
  return TIPOS_FUENTE.filter(function (t) { return t.id === id; })[0] || TIPOS_FUENTE[0];
}


/* ============================================================
   VISTA — Biblioteca de fuentes
   ============================================================ */

UI.registrar('biblioteca', {
  titulo: 'Biblioteca',
  sub: function () {
    var n = Estado.fuentes().length;
    return n ? n + (n === 1 ? ' fuente registrada' : ' fuentes registradas')
      : 'Registra de dónde sale lo que estudias';
  },
  angosto: true,

  render: function () {
    var fuentes = Estado.fuentes();

    var html = '<div class="tarjeta"><div class="tarjeta-cab"><h3>Añadir fuente</h3></div>' +
      '<p class="sm tenue">La app no guarda archivos —no cabrían en el almacenamiento— sino la ' +
      '<b>referencia y su enlace</b>. Lo importante es poder volver al documento y saber qué temas dependen de él.</p>' +

      '<label class="campo"><span>Título</span>' +
      '<input type="text" id="f-titulo" placeholder="Ventilación protectora en SDRA — guía de la unidad"></label>' +

      '<div class="rejilla c3">' +
      '<label class="campo"><span>Tipo</span><select id="f-tipo">' +
      TIPOS_FUENTE.map(function (t) {
        return '<option value="' + t.id + '">' + t.icono + ' ' + t.nombre + '</option>';
      }).join('') + '</select></label>' +
      '<label class="campo"><span>Autor</span><input type="text" id="f-autor" placeholder="Amato et al."></label>' +
      '<label class="campo"><span>Año</span><input type="text" id="f-anio" placeholder="2015"></label>' +
      '</div>' +

      '<label class="campo"><span>Enlace <span class="tenue">(Drive, DOI, PubMed…)</span></span>' +
      '<input type="text" id="f-enlace" placeholder="https://doi.org/…"></label>' +

      '<label class="campo"><span>Temas que la usan</span>' +
      '<select id="f-temas" multiple size="5">' +
      TUTOR.AREAS.map(function (a) {
        var temas = TUTOR.temasDeArea(a.id);
        if (!temas.length) return '';
        return '<optgroup label="' + a.icono + ' ' + UI.esc(a.nombre) + '">' +
          temas.map(function (t) {
            return '<option value="' + t.id + '">' + UI.esc(t.nombre) + '</option>';
          }).join('') + '</optgroup>';
      }).join('') + '</select>' +
      '<span class="sm tenue">Ctrl o ⌘ para seleccionar varios</span></label>' +

      '<button class="btn btn-primario" data-accion="fuente-guardar">Añadir a la biblioteca</button>' +
      '</div>';

    if (!fuentes.length) {
      html += '<div class="tarjeta mt"><div class="vacio"><span class="emoji">📚</span>' +
        'La biblioteca está vacía.<br><span class="sm">Cada fuente que registres aparecerá también ' +
        'en la ficha de los temas que la citan.</span></div></div>';
      return html;
    }

    /* Agrupadas por tipo */
    html += '<div class="tarjeta mt"><div class="tarjeta-cab"><h3>Tus fuentes</h3>' +
      '<div class="der"><span class="etiq etiq-info">' + fuentes.length + '</span></div></div>';

    TIPOS_FUENTE.forEach(function (tipo) {
      var deEste = fuentes.filter(function (f) { return f.tipo === tipo.id; });
      if (!deEste.length) return;
      html += '<div class="sm tenue mt" style="font-weight:700;text-transform:uppercase;letter-spacing:.08em">' +
        tipo.icono + ' ' + tipo.nombre + '</div>';
      deEste.forEach(function (f) {
        var temas = (f.temas || []).map(function (id) {
          var t = TUTOR.tema(id);
          return t ? '<span class="etiq">' + UI.esc(t.nombre) + '</span>' : '';
        }).join(' ');
        html += '<div class="fila"><div class="crece">' +
          '<div class="titulo">' + UI.esc(f.titulo) + '</div>' +
          '<div class="sub">' + UI.esc([f.autor, f.anio].filter(Boolean).join(' · ')) + '</div>' +
          (temas ? '<div class="linea" style="gap:5px;margin-top:5px">' + temas + '</div>' : '') +
          '</div>' +
          (f.enlace ? '<a class="btn btn-s btn-fantasma" href="' + UI.esc(f.enlace) +
            '" target="_blank" rel="noopener noreferrer">Abrir ↗</a>' : '') +
          '<button class="btn btn-s btn-fantasma" data-accion="fuente-eliminar" data-id="' + f.id + '">Eliminar</button>' +
          '</div>';
      });
    });
    html += '</div>';

    return html;
  }
});


/* ============================================================
   VISTA — Notas atómicas
   ============================================================ */

var NotasEstado = { filtro: '', editando: null };

UI.registrar('notas', {
  titulo: 'Notas',
  sub: function () {
    var n = Estado.notas().length;
    var h = Notas.huerfanas().length;
    if (!n) return 'Una nota, una idea. Enlazadas entre sí.';
    return n + (n === 1 ? ' nota' : ' notas') + (h ? ' · ' + h + ' sin conectar' : ' · todas conectadas');
  },
  angosto: true,
  acciones: function () {
    return '<button class="btn btn-s btn-primario" data-accion="nota-nueva">+ Nueva nota</button>';
  },

  render: function () {
    var html = '';

    /* --- explicación, solo cuando aún no hay notas --- */
    if (!Estado.notas().length && !NotasEstado.editando) {
      html += '<div class="tarjeta"><div class="tarjeta-cab">' +
        (typeof Minerva !== 'undefined' ? Minerva.avatar(34) : '') +
        '<div><h3 style="margin:0">Para qué sirve esto</h3>' +
        '<div class="sm tenue">Y en qué se diferencia del temario</div></div></div>' +
        '<div class="doc">' +
        '<p>El temario y las tarjetas sirven para <b>no olvidar</b> lo que ya entendiste. Las notas sirven ' +
        'para <b>pensar</b>: capturar una idea propia, una duda de una guardia, una conexión que descubriste.</p>' +
        '<p>Tres reglas que hacen que funcione:</p>' +
        '<ul>' +
        '<li><b>Una nota, una idea.</b> Si necesitas dos títulos, son dos notas.</li>' +
        '<li><b>Con tus palabras.</b> Copiar y pegar no crea conocimiento.</li>' +
        '<li><b>Enlaza siempre.</b> Escribe <code>[[Título de otra nota]]</code> dentro del texto. ' +
        'Si esa nota no existe todavía, la app te ofrece crearla: escribir el enlace antes que la nota ' +
        'es precisamente cómo crece un Zettelkasten.</li>' +
        '</ul>' +
        '<div class="aviso">El valor no está en las notas sueltas sino en los <b>retroenlaces</b>: ' +
        'al abrir una nota verás qué otras la mencionan, y ahí aparecen las conexiones que no habías buscado. ' +
        'Por ejemplo, la presión de perfusión cerebral y la coronaria son la misma resta.</div>' +
        '</div></div>';
    }

    /* --- editor --- */
    if (NotasEstado.editando) {
      var n = NotasEstado.editando;
      var esNueva = !n.id;
      html += '<div class="tarjeta"><div class="tarjeta-cab">' +
        '<h3>' + (esNueva ? 'Nueva nota' : 'Editar nota') + '</h3></div>' +

        '<label class="campo"><span>Título <span class="tenue">(así la enlazarás desde otras)</span></span>' +
        '<input type="text" id="n-titulo" value="' + UI.esc(n.titulo || '') + '" ' +
        'placeholder="La perfusión es una resta"></label>' +

        '<label class="campo"><span>Cuerpo</span>' +
        '<textarea id="n-cuerpo" style="min-height:170px" placeholder="Escríbelo con tus palabras.&#10;&#10;Usa [[Otra nota]] para enlazar.">' +
        UI.esc(n.cuerpo || '') + '</textarea></label>' +

        '<label class="campo"><span>Temas relacionados</span>' +
        '<select id="n-temas" multiple size="5">' +
        TUTOR.AREAS.map(function (a) {
          var temas = TUTOR.temasDeArea(a.id);
          if (!temas.length) return '';
          return '<optgroup label="' + a.icono + ' ' + UI.esc(a.nombre) + '">' +
            temas.map(function (t) {
              var sel = (n.temas || []).indexOf(t.id) >= 0 ? ' selected' : '';
              return '<option value="' + t.id + '"' + sel + '>' + UI.esc(t.nombre) + '</option>';
            }).join('') + '</optgroup>';
        }).join('') + '</select></label>' +

        '<div class="linea">' +
        '<button class="btn btn-primario" data-accion="nota-guardar">Guardar</button>' +
        '<button class="btn btn-fantasma" data-accion="nota-cancelar">Cancelar</button>' +
        (esNueva ? '' : '<button class="btn btn-fantasma" data-accion="nota-eliminar" data-id="' + n.id + '">Eliminar</button>') +
        '</div></div>';
    }

    /* --- buscador --- */
    if (Estado.notas().length) {
      html += '<div class="tarjeta mt"><div class="linea">' +
        '<input type="text" id="n-buscar" placeholder="Buscar en tus notas…" value="' + UI.esc(NotasEstado.filtro) + '">' +
        '<button class="btn" data-accion="nota-buscar">Buscar</button>' +
        (NotasEstado.filtro ? '<button class="btn btn-fantasma" data-accion="nota-limpiar-busqueda">✕</button>' : '') +
        '</div></div>';
    }

    /* --- lista --- */
    var lista = Notas.buscar(NotasEstado.filtro);
    lista.forEach(function (n) {
      var atras = Notas.retroenlaces(n);
      var salientes = Notas.extraerEnlaces(n.cuerpo);
      html += '<div class="tarjeta nota" id="nota-' + n.id + '">' +
        '<div class="tarjeta-cab"><h3>' + UI.esc(n.titulo) + '</h3>' +
        '<div class="der">' +
        '<button class="btn btn-s btn-fantasma" data-accion="nota-editar" data-id="' + n.id + '">Editar</button>' +
        '</div></div>' +
        '<div class="nota-cuerpo">' + Notas.render(n.cuerpo) + '</div>';

      var pies = [];
      if ((n.temas || []).length) {
        pies.push('<div class="linea" style="gap:5px">' +
          n.temas.map(function (id) {
            var t = TUTOR.tema(id);
            return t ? '<button class="etiq etiq-info" data-accion="ver-tema" data-tema="' + id + '" ' +
              'style="cursor:pointer;border:0">' + UI.esc(t.nombre) + '</button>' : '';
          }).join('') + '</div>');
      }
      if (atras.length) {
        pies.push('<div class="retroenlaces"><b>Enlazan aquí:</b> ' +
          atras.map(function (x) {
            return '<button class="enlace-nota" data-accion="nota-abrir" data-id="' + x.id + '">' +
              UI.esc(x.titulo) + '</button>';
          }).join(' ') + '</div>');
      }
      if (!atras.length && !salientes.length) {
        pies.push('<div class="sm tenue">Sin conexiones todavía. Una nota aislada rinde poco: ' +
          'busca a qué otra idea se parece o de cuál se diferencia.</div>');
      }
      if (pies.length) html += '<div class="nota-pie">' + pies.join('') + '</div>';
      html += '</div>';
    });

    if (Estado.notas().length && !lista.length) {
      html += '<div class="tarjeta"><div class="vacio">Ninguna nota coincide con «' +
        UI.esc(NotasEstado.filtro) + '».</div></div>';
    }

    return html;
  }
});

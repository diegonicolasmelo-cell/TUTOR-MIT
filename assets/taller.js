/* ============================================================
   TALLER — crear contenido propio desde la interfaz
   ------------------------------------------------------------
   Flujo completo sin tocar código:

     1. Defines destino y tema  → la app genera un PROMPT con el
        esquema exacto que usa el temario.
     2. Lo pegas en NotebookLM (o similar) SOBRE TUS FUENTES:
        apuntes, papers, guías de tu unidad.
     3. Pegas aquí el JSON que devuelve → se valida, se limpia,
        se previsualiza y se integra al temario, al plan y al mazo.

   El contenido importado entra marcado como SIN VERIFICAR hasta
   que lo revisas: es material clínico y la app no puede
   garantizar que sea correcto.
   ============================================================ */

var Taller = (function () {

  /* ------------------------------------------------------------
     Esquema. Fuente única de verdad: de aquí salen el prompt y
     el validador, de modo que no pueden divergir.
     ------------------------------------------------------------ */
  var ESQUEMA = {
    tema: {
      id: { tipo: 'texto', req: true, nota: 'minúsculas y guiones, sin espacios ni acentos' },
      nombre: { tipo: 'texto', req: true },
      alto: { tipo: 'bool', req: true, nota: 'true si es concepto de alto rendimiento' },
      minutos: { tipo: 'numero', req: true, nota: 'duración estimada, 15–30' },
      fuentes: { tipo: 'texto', req: true, nota: 'de qué documento tuyo sale cada parte' },
      ideaCentral: { tipo: 'texto', req: true, nota: '2–4 frases: qué hay que entender de verdad' },
      anclaje: { tipo: 'objeto', req: true, claves: ['q', 'pista'] },
      bloques: { tipo: 'lista', req: true, min: 3, nota: 'cada uno con nivel, titulo y html' },
      variables: { tipo: 'lista', req: true, min: 3, nota: 'cada una con n, d (up/down/eq) y nota' },
      fisiopatologia: { tipo: 'texto', req: true },
      clinica: { tipo: 'texto', req: true },
      error: { tipo: 'objeto', req: true, claves: ['confunde', 'parecido', 'diferencia', 'ejemplo', 'regla'] },
      perla: { tipo: 'texto', req: true },
      feynman: { tipo: 'objeto', req: true, claves: ['consigna', 'puntos', 'referencia'] },
      preguntas: { tipo: 'lista', req: true, min: 6, nota: 'con nivel 1, 2 y 3' },
      caso: { tipo: 'objeto', req: true, claves: ['vineta', 'pasos', 'cierre'] },
      tarjetas: { tipo: 'lista', req: true, min: 5, nota: 'cada una con f (frente) y d (dorso)' }
    }
  };

  var NIVELES_BLOQUE = ['imprescindible', 'importante', 'complementario'];
  var DIRECCIONES = ['up', 'down', 'eq'];

  /* ------------------------------------------------------------
     Saneado del HTML importado.
     El contenido llega de fuera y se inyecta con innerHTML, así
     que se elimina todo lo que pueda ejecutar código. Se permite
     únicamente el marcado que usa el temario.
     ------------------------------------------------------------ */
  var ETIQUETAS_PERMITIDAS = ['P', 'B', 'STRONG', 'I', 'EM', 'U', 'BR', 'UL', 'OL', 'LI',
    'TABLE', 'THEAD', 'TBODY', 'TR', 'TH', 'TD', 'CODE', 'SPAN', 'DIV', 'H3', 'H4', 'SMALL', 'SUB', 'SUP'];

  function limpiarHtml(bruto) {
    var texto = String(bruto === undefined || bruto === null ? '' : bruto);
    if (!texto) return '';

    /* Se analiza en un documento INERTE. Asignar innerHTML a un
       elemento suelto no basta: el navegador intenta cargar las
       imágenes y dispara sus manejadores onerror antes de que dé
       tiempo a limpiarlos. DOMParser no carga recursos ni ejecuta
       nada, así que el contenido nunca llega a estar vivo. */
    if (typeof DOMParser === 'undefined') {
      return texto.replace(/<[^>]*>/g, '');   // respaldo conservador
    }
    var doc = new DOMParser().parseFromString('<!doctype html><body>' + texto, 'text/html');
    var caja = doc.body;

    var nodos = caja.querySelectorAll('*');
    for (var i = nodos.length - 1; i >= 0; i--) {
      var n = nodos[i];
      if (ETIQUETAS_PERMITIDAS.indexOf(n.tagName) < 0) {
        /* Se conserva el texto y se descarta la etiqueta. */
        while (n.firstChild) n.parentNode.insertBefore(n.firstChild, n);
        n.parentNode.removeChild(n);
        continue;
      }
      for (var j = n.attributes.length - 1; j >= 0; j--) {
        var attr = n.attributes[j].name;
        var valor = n.attributes[j].value || '';
        var peligroso = attr.indexOf('on') === 0 ||
          attr === 'style' ||
          /javascript:/i.test(valor);
        if (peligroso || ['href', 'src', 'srcset', 'formaction'].indexOf(attr) >= 0) {
          n.removeAttribute(n.attributes[j].name);
        }
      }
    }
    return caja.innerHTML;
  }

  function limpiarTexto(bruto) {
    return String(bruto === undefined || bruto === null ? '' : bruto)
      .replace(/<[^>]*>/g, '').trim();
  }

  function idValido(bruto) {
    return String(bruto || '')
      .toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 48);
  }

  /* ------------------------------------------------------------
     GENERADOR DEL PROMPT
     ------------------------------------------------------------ */
  function construirPrompt(cfg) {
    var L = [];
    var esNueva = cfg.destino === 'nueva';

    L.push('# TAREA: construir material de estudio estructurado a partir de MIS fuentes');
    L.push('');
    L.push('## REGLA MÁS IMPORTANTE');
    L.push('Usa **exclusivamente** la información contenida en las fuentes que te he proporcionado en este cuaderno.');
    L.push('- No añadas datos, cifras, valores de referencia ni afirmaciones que no estén en ellas.');
    L.push('- Si un apartado del esquema no puede completarse con las fuentes disponibles, escribe en ese campo: "NO CUBIERTO POR LAS FUENTES" en lugar de rellenarlo con conocimiento general.');
    L.push('- En el campo "fuentes" indica de qué documento y sección procede lo esencial del tema.');
    L.push('');
    L.push('## CONTEXTO');
    L.push('Soy estudiante de Medicina y trabajo en una unidad de cuidados intensivos. Tengo bases sólidas: no expliques lo elemental.');
    L.push('Este material alimenta una aplicación de estudio que enseña por mecanismos, no por listas.');
    L.push('');
    L.push('## DESTINO');
    if (esNueva) {
      L.push('- Área NUEVA: ' + cfg.areaNombre);
      L.push('- Módulo NUEVO: ' + cfg.moduloNombre);
    } else {
      var a = TUTOR.area(cfg.areaId);
      L.push('- Área existente: ' + (a ? a.nombre : cfg.areaId) + '  (usa exactamente id "' + cfg.areaId + '")');
      L.push('- Módulo: ' + cfg.moduloNombre);
    }
    L.push('- Tema a construir: ' + cfg.temaNombre);
    L.push('- Duración objetivo de la sesión: ' + cfg.minutos + ' minutos');
    L.push('');
    L.push('## PRINCIPIO PEDAGÓGICO QUE DEBE SEGUIR EL CONTENIDO');
    L.push('Construye cada explicación con esta lógica, sin saltar pasos:');
    L.push('estado normal → ¿qué variable cambia? → ¿por qué cambia? → ¿qué compensación aparece? → ¿qué consecuencia produce? → ¿cómo se manifiesta clínicamente? → ¿cómo se reconoce?');
    L.push('Nada de listas aisladas: cada flecha debe tener una causa explícita.');
    L.push('');
    L.push('## FORMATO DE SALIDA');
    L.push('Devuelve **únicamente un objeto JSON válido**, sin texto antes ni después, sin comentarios y sin bloques de código markdown.');
    L.push('Usa comillas dobles. Dentro de los campos marcados como HTML puedes usar solo estas etiquetas: <p> <b> <i> <ul> <ol> <li> <table> <tr> <th> <td> <code> <sub> <sup> <br>.');
    L.push('');
    L.push('```');
    L.push(JSON.stringify(plantillaJson(cfg, esNueva), null, 2));
    L.push('```');
    L.push('');
    L.push('## REQUISITOS DE CADA CAMPO');
    L.push('- **ideaCentral**: 2–4 frases con lo que hay que entender de verdad, no una definición.');
    L.push('- **anclaje.q**: una pregunta que yo deba intentar responder ANTES de leer nada, aunque falle. **anclaje.pista**: una ayuda si me bloqueo.');
    L.push('- **bloques**: entre 3 y 5. Cada uno con "nivel" (imprescindible / importante / complementario), "titulo" y "html". Opcionalmente "cadena" (lista de 4–6 pasos causales cortos) y "esquema" (lista de nodos verticales).');
    L.push('  Marca lo especialmente rentable escribiendo 🔥 dentro del html.');
    L.push('- **variables**: 3–5 objetos con "n" (nombre), "d" ("up", "down" o "eq") y "nota" breve.');
    L.push('- **error**: el error conceptual más frecuente, con qué se confunde, por qué se parecen, cuál es la diferencia real, un ejemplo clínico y una regla mental para no volver a confundirlo.');
    L.push('- **perla**: una conclusión breve de alto rendimiento para un examen.');
    L.push('- **feynman.consigna**: qué debo explicar con mis palabras. **feynman.puntos**: 4–6 puntos concretos que mi explicación debería contener (se usan como autoevaluación). **feynman.referencia**: la explicación modelo, en HTML, de 3–5 párrafos.');
    L.push('- **preguntas**: 6–9 en total, repartidas en nivel 1 (conocimiento), nivel 2 (integración) y nivel 3 (razonamiento clínico). Cada una con "q" y "r" completa.');
    L.push('- **caso**: una viñeta clínica realista y entre 5 y 7 "pasos", cada uno con "q" (pregunta socrática), "pista" y "r" (razonamiento completo). Más "cierre" con la lección del caso.');
    L.push('- **tarjetas**: 5–9 objetos con "f" (frente: pregunta o concepto) y "d" (dorso: respuesta autocontenida). Deben poder entenderse fuera de contexto.');
    if (cfg.mcq) {
      L.push('- **mcq** (preguntas de alternativa): 4–6 preguntas, cada una con "n" (nivel 1, 2 o 3), "q" (enunciado) y "o" (exactamente 4 opciones).');
      L.push('  Cada opción lleva "t" (texto) y "r" (explicación), y **solo una** lleva además "ok": true.');
      L.push('  REGLA CLAVE de los distractores: cada opción incorrecta debe ser un **error conceptual concreto y frecuente**, no relleno ni un absurdo evidente.');
      L.push('  Su "r" debe explicar por qué resulta tentadora y por qué falla. La "r" de la correcta explica por qué lo es.');
      L.push('  Un distractor bien elegido enseña tanto como la respuesta correcta; uno de relleno no enseña nada.');
    }
    L.push('');
    L.push('## IDENTIFICADORES');
    L.push('Los campos "id" deben ir en minúsculas, sin acentos ni espacios, separados por guiones. Ejemplo: "cascada-coagulacion".');
    if (cfg.fuentes) {
      L.push('');
      L.push('## FUENTES QUE DEBES USAR');
      L.push(cfg.fuentes);
    }
    L.push('');
    L.push('Empieza directamente por el JSON.');

    return L.join('\n');
  }

  function plantillaJson(cfg, esNueva) {
    var salida = {};
    if (esNueva) {
      salida.area = {
        id: idValido(cfg.areaNombre) || 'area-nueva',
        nombre: cfg.areaNombre,
        icono: cfg.icono || '📗',
        resumen: 'una línea describiendo qué cubre el área',
        lema: 'la idea que ordena toda el área, en una frase'
      };
    } else {
      salida.area = { id: cfg.areaId };
    }
    salida.modulo = {
      id: idValido(cfg.moduloNombre) || 'modulo-nuevo',
      area: esNueva ? (idValido(cfg.areaNombre) || 'area-nueva') : cfg.areaId,
      nombre: cfg.moduloNombre,
      icono: cfg.iconoModulo || '📘',
      resumen: 'una línea describiendo qué agrupa el módulo'
    };
    salida.temas = [{
      id: idValido(cfg.temaNombre) || 'tema-nuevo',
      nombre: cfg.temaNombre,
      alto: true,
      minutos: cfg.minutos,
      fuentes: 'documento y sección de donde procede el contenido',
      ideaCentral: '...',
      anclaje: { q: '...', pista: '...' },
      bloques: [
        { nivel: 'imprescindible', titulo: '...', html: '<p>...</p>', cadena: ['paso 1', 'paso 2', 'paso 3'] },
        { nivel: 'imprescindible', titulo: '...', html: '<p>...</p>' },
        { nivel: 'importante', titulo: '...', html: '<p>...</p>' }
      ],
      variables: [
        { n: 'nombre de la variable', d: 'up', nota: 'por qué sube' },
        { n: '...', d: 'down', nota: '...' },
        { n: '...', d: 'eq', nota: '...' }
      ],
      fisiopatologia: '<p>...</p>',
      clinica: '<p>...</p>',
      error: { confunde: '...', parecido: '...', diferencia: '...', ejemplo: '...', regla: '...' },
      perla: '🔥 ...',
      feynman: {
        consigna: '...',
        puntos: ['...', '...', '...', '...'],
        referencia: '<p>...</p><p>...</p>'
      },
      preguntas: [
        { nivel: 1, q: '...', r: '...' },
        { nivel: 1, q: '...', r: '...' },
        { nivel: 2, q: '...', r: '...' },
        { nivel: 2, q: '...', r: '...' },
        { nivel: 3, q: '...', r: '...' },
        { nivel: 3, q: '...', r: '...' }
      ],
      caso: {
        vineta: '...',
        pasos: [
          { q: '...', pista: '...', r: '...' },
          { q: '...', pista: '...', r: '...' },
          { q: '...', pista: '...', r: '...' },
          { q: '...', pista: '...', r: '...' },
          { q: '...', pista: '...', r: '...' }
        ],
        cierre: '...'
      },
      tarjetas: [
        { f: 'frente', d: 'dorso' },
        { f: '...', d: '...' },
        { f: '...', d: '...' },
        { f: '...', d: '...' },
        { f: '...', d: '...' }
      ]
    }];
    if (cfg.mcq) {
      salida.temas[0].mcq = [
        { n: 1, q: 'enunciado', o: [
          { t: 'opción incorrecta', r: 'qué error conceptual representa y por qué falla' },
          { t: 'opción correcta', ok: true, r: 'por qué es la correcta' },
          { t: 'opción incorrecta', r: '...' },
          { t: 'opción incorrecta', r: '...' }
        ] },
        { n: 2, q: '...', o: [
          { t: '...', r: '...' }, { t: '...', ok: true, r: '...' },
          { t: '...', r: '...' }, { t: '...', r: '...' }
        ] },
        { n: 3, q: '...', o: [
          { t: '...', r: '...' }, { t: '...', ok: true, r: '...' },
          { t: '...', r: '...' }, { t: '...', r: '...' }
        ] }
      ];
    }
    return salida;
  }

  /* ------------------------------------------------------------
     VALIDADOR
     Devuelve { ok, errores, avisos, paquete }
     ------------------------------------------------------------ */
  function extraerJson(bruto) {
    var texto = String(bruto || '').trim();
    /* Tolerancia: muchos modelos envuelven la respuesta en ``` */
    var cerca = texto.match(/```(?:json)?\s*([\s\S]*?)```/i);
    if (cerca) texto = cerca[1].trim();
    /* O añaden una frase antes del objeto */
    var primero = texto.indexOf('{');
    var ultimo = texto.lastIndexOf('}');
    if (primero > 0 || (ultimo >= 0 && ultimo < texto.length - 1)) {
      if (primero >= 0 && ultimo > primero) texto = texto.slice(primero, ultimo + 1);
    }
    return texto;
  }

  /* Google Docs sustituye las comillas rectas por tipográficas al
     pegar, y eso basta para que JSON.parse falle entero. Como es
     precisamente lo que ocurre al usar un Doc de bandeja, hay que
     contemplarlo o esa vía no sirve de nada. */
  function enderezarComillas(t) {
    return t
      .replace(/[“”„‟«»]/g, '"')
      .replace(/[‘’‚‛]/g, "'");
  }

  function validar(bruto) {
    var errores = [], avisos = [];
    var datos;
    var texto = extraerJson(bruto);

    try {
      datos = JSON.parse(texto);
    } catch (e) {
      /* Se reintenta enderezando las comillas, pero solo como
         segundo intento: hacerlo siempre estropearía un texto que
         legítimamente lleve comillas tipográficas dentro de un
         valor. Si el reintento también falla, se informa del error
         original, que es el que describe el problema de verdad. */
      var rescatado = null;
      try { rescatado = JSON.parse(enderezarComillas(texto)); } catch (e2) { rescatado = null; }

      if (rescatado === null) {
        return {
          ok: false,
          errores: ['El texto no es un JSON válido. ' + e.message +
            '  ·  Comprueba que has pegado el objeto completo, desde la primera llave { hasta la última }.'],
          avisos: []
        };
      }
      datos = rescatado;
      avisos.push('El documento traía comillas tipográficas («») en lugar de rectas ("). ' +
        'Es lo que hace Google Docs al pegar; se corrigieron solas, pero revisa que ningún ' +
        'texto haya perdido comillas que fueran intencionadas.');
    }

    /* Normalización: se acepta un tema suelto o una lista. */
    if (datos.tema && !datos.temas) datos.temas = [datos.tema];
    if (!datos.temas || !datos.temas.length) {
      errores.push('No se encontró ningún tema. El JSON debe incluir "temas": [ … ] (o "tema": { … }).');
      return { ok: false, errores: errores, avisos: avisos };
    }
    if (!datos.modulo) errores.push('Falta el objeto "modulo".');
    if (!datos.area) errores.push('Falta el objeto "area".');
    if (errores.length) return { ok: false, errores: errores, avisos: avisos };

    /* --- área --- */
    var areaId = idValido(datos.area.id || datos.area.nombre);
    if (!areaId) errores.push('El área no tiene un "id" utilizable.');
    var areaExistente = TUTOR.area(areaId);
    var area = null;
    if (!areaExistente) {
      area = {
        id: areaId,
        nombre: limpiarTexto(datos.area.nombre) || areaId,
        icono: limpiarTexto(datos.area.icono).slice(0, 4) || '📗',
        resumen: limpiarTexto(datos.area.resumen) || 'Área creada desde el Taller.',
        lema: limpiarTexto(datos.area.lema) || '',
        propio: true
      };
      if (!datos.area.nombre) avisos.push('El área no traía nombre: se usó el identificador.');
    }

    /* --- módulo --- */
    var moduloId = idValido(datos.modulo.id || datos.modulo.nombre);
    if (!moduloId) errores.push('El módulo no tiene un "id" utilizable.');
    var moduloExistente = TUTOR.modulo(moduloId);
    var modulo = moduloExistente ? null : {
      id: moduloId,
      area: areaId,
      nombre: limpiarTexto(datos.modulo.nombre) || moduloId,
      icono: limpiarTexto(datos.modulo.icono).slice(0, 4) || '📘',
      resumen: limpiarTexto(datos.modulo.resumen) || '',
      propio: true
    };

    /* --- temas --- */
    var temas = [];
    datos.temas.forEach(function (bruto, indice) {
      var ref = 'temas[' + indice + ']';
      var t = {};
      var falta = function (campo) { errores.push(ref + ': falta "' + campo + '".'); };

      t.id = idValido(bruto.id || bruto.nombre);
      if (!t.id) { falta('id'); return; }
      if (TUTOR.tema(t.id)) {
        avisos.push('Ya existía un tema con id "' + t.id + '": se reemplazará.');
      }
      t.nombre = limpiarTexto(bruto.nombre);
      if (!t.nombre) falta('nombre');

      t.modulo = moduloId;
      t.alto = bruto.alto === true || bruto.alto === 'true';
      t.minutos = parseInt(bruto.minutos, 10) || 20;
      if (t.minutos < 5 || t.minutos > 90) { t.minutos = 20; avisos.push(ref + ': minutos fuera de rango, se ajustó a 20.'); }
      t.requisitos = [];
      t.fuentes = limpiarTexto(bruto.fuentes);
      if (!t.fuentes) avisos.push(ref + ': no declara fuentes. Conviene anotarlas para poder revisar el material.');

      t.ideaCentral = limpiarTexto(bruto.ideaCentral);
      if (!t.ideaCentral) falta('ideaCentral');

      /* anclaje */
      if (!bruto.anclaje || !bruto.anclaje.q) falta('anclaje.q');
      t.anclaje = {
        q: limpiarTexto(bruto.anclaje && bruto.anclaje.q),
        pista: limpiarTexto(bruto.anclaje && bruto.anclaje.pista)
      };

      /* bloques */
      t.bloques = [];
      (bruto.bloques || []).forEach(function (b, k) {
        var nivel = String(b.nivel || '').toLowerCase();
        if (NIVELES_BLOQUE.indexOf(nivel) < 0) {
          avisos.push(ref + '.bloques[' + k + ']: nivel "' + b.nivel + '" no reconocido, se usó «imprescindible».');
          nivel = 'imprescindible';
        }
        var bloque = {
          nivel: nivel,
          titulo: limpiarTexto(b.titulo) || 'Bloque ' + (k + 1),
          html: limpiarHtml(b.html)
        };
        if (Array.isArray(b.cadena) && b.cadena.length) {
          bloque.cadena = b.cadena.map(limpiarTexto).filter(Boolean);
        }
        if (Array.isArray(b.esquema) && b.esquema.length) {
          bloque.esquema = b.esquema.map(limpiarTexto).filter(Boolean);
        }
        if (bloque.html) t.bloques.push(bloque);
      });
      if (t.bloques.length < 2) errores.push(ref + ': se necesitan al menos 2 bloques con contenido (hay ' + t.bloques.length + ').');

      /* variables */
      t.variables = (bruto.variables || []).map(function (v, k) {
        var d = String(v.d || '').toLowerCase();
        if (DIRECCIONES.indexOf(d) < 0) {
          d = 'eq';
          avisos.push(ref + '.variables[' + k + ']: dirección no reconocida, se usó «=».');
        }
        return { n: limpiarTexto(v.n), d: d, nota: limpiarTexto(v.nota) };
      }).filter(function (v) { return v.n; });
      if (t.variables.length < 2) avisos.push(ref + ': hay menos de 2 variables clave.');

      t.fisiopatologia = limpiarHtml(bruto.fisiopatologia);
      if (!t.fisiopatologia) falta('fisiopatologia');
      t.clinica = limpiarHtml(bruto.clinica);
      if (!t.clinica) falta('clinica');

      /* error frecuente */
      var e = bruto.error || {};
      t.error = {
        confunde: limpiarTexto(e.confunde),
        parecido: limpiarTexto(e.parecido),
        diferencia: limpiarHtml(e.diferencia),
        ejemplo: limpiarHtml(e.ejemplo),
        regla: limpiarHtml(e.regla)
      };
      if (!t.error.confunde || !t.error.diferencia) falta('error (confunde y diferencia)');

      t.perla = limpiarHtml(bruto.perla);
      if (!t.perla) falta('perla');

      /* feynman */
      var f = bruto.feynman || {};
      t.feynman = {
        consigna: limpiarTexto(f.consigna),
        puntos: (f.puntos || []).map(limpiarTexto).filter(Boolean),
        referencia: limpiarHtml(f.referencia)
      };
      if (!t.feynman.consigna) falta('feynman.consigna');
      if (t.feynman.puntos.length < 3) errores.push(ref + ': feynman.puntos necesita al menos 3 puntos de autoevaluación (hay ' + t.feynman.puntos.length + ').');
      if (!t.feynman.referencia) falta('feynman.referencia');

      /* preguntas */
      t.preguntas = (bruto.preguntas || []).map(function (q) {
        var nivel = parseInt(q.nivel, 10);
        if ([1, 2, 3].indexOf(nivel) < 0) nivel = 1;
        return { nivel: nivel, q: limpiarHtml(q.q), r: limpiarHtml(q.r) };
      }).filter(function (q) { return q.q && q.r; });
      if (t.preguntas.length < 4) errores.push(ref + ': se necesitan al menos 4 preguntas completas (hay ' + t.preguntas.length + ').');
      else {
        [1, 2, 3].forEach(function (n) {
          if (!t.preguntas.some(function (q) { return q.nivel === n; })) {
            avisos.push(ref + ': no hay ninguna pregunta de nivel ' + n + '.');
          }
        });
      }

      /* caso clínico */
      var c = bruto.caso || {};
      t.caso = {
        vineta: limpiarHtml(c.vineta),
        pasos: (c.pasos || []).map(function (p) {
          return { q: limpiarHtml(p.q), pista: limpiarTexto(p.pista), r: limpiarHtml(p.r) };
        }).filter(function (p) { return p.q && p.r; }),
        cierre: limpiarHtml(c.cierre)
      };
      if (!t.caso.vineta) falta('caso.vineta');
      if (t.caso.pasos.length < 3) errores.push(ref + ': el caso necesita al menos 3 pasos con pregunta y respuesta (hay ' + t.caso.pasos.length + ').');

      /* tarjetas */
      t.tarjetas = (bruto.tarjetas || []).map(function (x) {
        return { f: limpiarTexto(x.f), d: limpiarTexto(x.d) };
      }).filter(function (x) { return x.f && x.d; });
      if (t.tarjetas.length < 3) errores.push(ref + ': se necesitan al menos 3 tarjetas (hay ' + t.tarjetas.length + ').');

      /* preguntas de alternativa (opcionales) */
      t.mcq = [];
      (bruto.mcq || []).forEach(function (m, k) {
        var ref2 = ref + '.mcq[' + k + ']';
        var enunciado = limpiarHtml(m.q);
        var opciones = (m.o || []).map(function (o) {
          var op = { t: limpiarTexto(o.t), r: limpiarTexto(o.r) };
          if (o.ok === true || o.ok === 'true') op.ok = true;
          return op;
        }).filter(function (o) { return o.t; });

        if (!enunciado) { avisos.push(ref2 + ': sin enunciado, se descarta.'); return; }
        if (opciones.length < 3) { avisos.push(ref2 + ': menos de 3 opciones, se descarta.'); return; }

        var correctas = opciones.filter(function (o) { return o.ok; }).length;
        if (correctas !== 1) {
          avisos.push(ref2 + ': tiene ' + correctas + ' opciones marcadas como correctas (debe haber exactamente 1). Se descarta.');
          return;
        }
        var sinRazon = opciones.filter(function (o) { return !o.r; }).length;
        if (sinRazon) {
          avisos.push(ref2 + ': ' + sinRazon + ' opciones sin explicación. Se importa, pero la revisión será menos útil.');
        }
        var nivel = parseInt(m.n, 10);
        if ([1, 2, 3].indexOf(nivel) < 0) nivel = 1;
        t.mcq.push({ n: nivel, q: enunciado, o: opciones });
      });

      /* Marcas de procedencia */
      t.propio = true;
      t.verificado = false;
      t.creado = new Date().toISOString();

      /* Aviso si el modelo declaró huecos */
      var serializado = JSON.stringify(t);
      if (/NO CUBIERTO POR LAS FUENTES/i.test(serializado)) {
        avisos.push(ref + ': hay apartados marcados como no cubiertos por tus fuentes. Revísalos antes de estudiar el tema.');
      }

      temas.push(t);
    });

    return {
      ok: errores.length === 0,
      errores: errores,
      avisos: avisos,
      paquete: { area: area, modulo: modulo, temas: temas, areaId: areaId, moduloId: moduloId }
    };
  }

  /* ------------------------------------------------------------
     Registro del contenido guardado al arrancar la app
     ------------------------------------------------------------ */
  function registrarGuardado() {
    var c = Estado.contenido();
    (c.areas || []).forEach(function (a) {
      if (!TUTOR.area(a.id)) TUTOR.AREAS.push(a);
    });
    (c.modulos || []).forEach(function (m) {
      if (!TUTOR.modulo(m.id)) TUTOR.MODULOS.push(m);
    });
    (c.temas || []).forEach(function (t) {
      if (!TUTOR.tema(t.id)) TUTOR.TEMAS.push(t);
    });
  }

  /* Integra un paquete recién validado, en memoria y en disco. */
  function importar(paquete) {
    if (paquete.area && !TUTOR.area(paquete.area.id)) TUTOR.AREAS.push(paquete.area);
    if (paquete.modulo && !TUTOR.modulo(paquete.modulo.id)) TUTOR.MODULOS.push(paquete.modulo);
    paquete.temas.forEach(function (t) {
      var i = -1;
      for (var k = 0; k < TUTOR.TEMAS.length; k++) if (TUTOR.TEMAS[k].id === t.id) i = k;
      if (i >= 0) TUTOR.TEMAS[i] = t; else TUTOR.TEMAS.push(t);
    });
    Estado.agregarContenido(paquete);

    /* El área nueva entra activa: si acabas de crearla, la quieres. */
    if (paquete.area) {
      var activas = Estado.areasActivas().slice();
      if (activas.indexOf(paquete.area.id) < 0) {
        activas.push(paquete.area.id);
        Estado.guardarAjustes({ areasActivas: activas });
      }
    }
    Estado.generarPlan(14);
  }

  return {
    construirPrompt: construirPrompt,
    validar: validar,
    importar: importar,
    registrarGuardado: registrarGuardado,
    limpiarHtml: limpiarHtml,
    idValido: idValido,
    ESQUEMA: ESQUEMA
  };
})();


/* ============================================================
   VISTA — Taller
   ============================================================ */

var TallerEstado = { paso: 1, prompt: '', validacion: null, cfg: null,
  via: 'pegar', bruto: '', almacenes: null, almacen: '', gemini: null };

UI.registrar('taller', {
  titulo: 'Taller de contenido',
  sub: 'Crea temas a partir de tus propios apuntes y papers, sin salir de la app',
  angosto: true,
  acciones: function () {
    var n = Estado.temasPropios().length;
    return n ? '<span class="etiq etiq-info">' + n + ' temas propios</span>' : '';
  },

  render: function () {
    var html = '';

    /* --- explicación del flujo --- */
    html += '<div class="tarjeta"><div class="tarjeta-cab">' +
      (typeof Minerva !== 'undefined' ? Minerva.avatar(34) : '') +
      '<div><h3 style="margin:0">Cómo funciona</h3>' +
      '<div class="sm tenue">Tres pasos, ninguno técnico</div></div></div>' +
      '<div class="pasos-taller">' +
      '<div class="paso-taller"><span class="num">1</span><div><b>Defines el tema</b>' +
      '<p>Dices qué quieres crear y dónde va. La app genera un prompt con el esquema exacto que usa el temario.</p></div></div>' +
      '<div class="paso-taller"><span class="num">2</span><div><b>NotebookLM lee tus fuentes</b>' +
      '<p>Pegas el prompt en tu cuaderno con tus apuntes, papers o protocolos. El material sale de <i>tus</i> documentos, no de conocimiento general.</p></div></div>' +
      '<div class="paso-taller"><span class="num">3</span><div><b>Pegas la respuesta aquí</b>' +
      '<p>La app valida, limpia el formato, te muestra una vista previa y lo integra al temario, al plan y al mazo de tarjetas.</p></div></div>' +
      '</div>' +
      '<div class="aviso aviso-alerta"><b>Se importa como «sin verificar».</b> Es material clínico generado a partir de tus fuentes: ' +
      'la app comprueba la estructura, no la exactitud. Revísalo antes de darlo por bueno y márcalo como verificado cuando lo hayas hecho.</div>' +
      '</div>';

    /* --- paso 1: definición --- */
    var areas = TUTOR.AREAS.map(function (a) {
      return '<option value="' + a.id + '">' + a.icono + ' ' + UI.esc(a.nombre) + '</option>';
    }).join('');

    html += '<div class="tarjeta"><div class="tarjeta-cab"><h3>1 · Qué quieres crear</h3></div>' +
      '<label class="campo"><span>Destino</span>' +
      '<select id="t-destino">' +
      '<option value="existente">Añadir a un área que ya tengo</option>' +
      '<option value="nueva">Crear un área nueva</option>' +
      '</select></label>' +

      '<div id="t-bloque-existente">' +
      '<label class="campo"><span>Área</span><select id="t-area">' + areas + '</select></label>' +
      '</div>' +

      '<div id="t-bloque-nueva" class="oculto">' +
      '<div class="rejilla c2">' +
      '<label class="campo"><span>Nombre del área nueva</span>' +
      '<input type="text" id="t-area-nombre" placeholder="Hematología"></label>' +
      '<label class="campo"><span>Icono</span>' +
      '<input type="text" id="t-icono" placeholder="🩸" maxlength="4"></label>' +
      '</div></div>' +

      '<div class="rejilla c2">' +
      '<label class="campo"><span>Módulo</span>' +
      '<input type="text" id="t-modulo" placeholder="Hemostasia y coagulación"></label>' +
      '<label class="campo"><span>Minutos por sesión</span>' +
      '<select id="t-minutos">' +
      [15, 20, 25, 30].map(function (m) {
        return '<option value="' + m + '"' + (m === 20 ? ' selected' : '') + '>' + m + ' minutos</option>';
      }).join('') + '</select></label>' +
      '</div>' +

      '<label class="campo"><span>Tema</span>' +
      '<input type="text" id="t-tema" placeholder="Cascada de la coagulación y su lectura en el laboratorio"></label>' +

      '<label class="campo"><span>Fuentes que usarás <span class="tenue">(opcional, se incluye en el prompt)</span></span>' +
      '<textarea id="t-fuentes" style="min-height:70px" placeholder="Apuntes de la cátedra, tema 4; guía de la unidad sobre anticoagulación; paper de Smith 2023 sobre CID"></textarea></label>' +

      '<label class="fila" style="cursor:pointer;gap:9px;border:0;padding:4px 0">' +
      '<input type="checkbox" id="t-mcq" checked style="width:auto;margin:0">' +
      '<span class="crece"><b>Incluir preguntas de alternativa</b>' +
      '<div class="sub">Se añaden al banco de simulacros, con la explicación de por qué falla cada distractor.</div></span></label>' +

      '<button class="btn btn-primario mt" data-accion="taller-generar">Generar prompt</button>' +
      '</div>';

    /* --- paso 2: prompt --- */
    html += '<div class="tarjeta"><div class="tarjeta-cab"><h3>2 · Prompt para NotebookLM</h3>' +
      (TallerEstado.prompt ? '<div class="der"><button class="btn btn-s" data-accion="taller-copiar">Copiar</button></div>' : '') +
      '</div>' +
      '<div class="caja-prompt" id="t-prompt">' +
      (TallerEstado.prompt ? UI.esc(TallerEstado.prompt)
        : 'Completa el paso 1 y pulsa «Generar prompt». Después pégalo en tu cuaderno de NotebookLM, el que tenga cargados tus documentos.') +
      '</div></div>';

    /* --- paso 3: importar --- */
    html += '<div class="tarjeta"><div class="tarjeta-cab"><h3>3 · Trae la respuesta</h3></div>';

    /* Dos vías para lo mismo. La del Doc existe porque copiar 9 KB
       de JSON entre apps en el móvil es justo donde se rompe el
       flujo; pegar en un Doc que ya tienes abierto, no. */
    var via = TallerEstado.via;
    function pestana(id, texto) {
      return '<button class="btn btn-s' + (via === id ? ' btn-primario' : '') +
        '" data-accion="taller-via" data-via="' + id + '">' + texto + '</button>';
    }
    html += '<div class="linea segmentado mt">' +
      pestana('pegar', 'Pegar el JSON') +
      pestana('doc', 'Desde un Google Doc') +
      pestana('gemini', 'Generar con mis fuentes') +
      '</div>';

    if (via === 'gemini') {
      html += '<p class="sm tenue mt">Consulta tus documentos y escribe el módulo sin que ' +
        'copies ni pegues nada. Las fuentes se suben una sola vez a un almacén de ' +
        '<b>File Search</b> desde Google AI Studio; aquí solo se elige cuál usar.</p>';

      if (!Puente.disponible()) {
        html += '<div class="aviso aviso-alerta mt" id="t-sin-puente">' + UI.esc(Puente.motivo) + '</div>';
      } else if (TallerEstado.gemini && !TallerEstado.gemini.configurada) {
        html += '<div class="aviso aviso-alerta mt">Falta la clave de Gemini. ' +
          'Ponla en <b>Ajustes → Generación con mis fuentes</b>.</div>';
      }

      html += '<div class="linea mt"><select id="t-almacen" class="crece">' +
        (TallerEstado.almacenes && TallerEstado.almacenes.length
          ? TallerEstado.almacenes.map(function (a) {
              return '<option value="' + UI.esc(a.nombre) + '"' +
                (TallerEstado.almacen === a.nombre ? ' selected' : '') + '>' +
                UI.esc(a.titulo) + '</option>';
            }).join('')
          : '<option value="">— sin almacenes cargados —</option>') +
        '</select>' +
        '<button class="btn btn-s btn-fantasma" data-accion="taller-almacenes">Buscar</button></div>';

      html += '<div class="linea mt">' +
        '<button class="btn btn-primario" data-accion="taller-generar-gemini">Generar el módulo</button>' +
        '</div>' +
        '<p class="sm tenue mt">Necesita el prompt del paso 2. Sin almacén el modelo respondería ' +
        'de memoria, que es justo lo que queremos evitar, así que la app avisa si ocurre.</p>' +
        '<div id="t-gemini"></div>';
    }

    if (via === 'doc') {
      html += '<p class="sm tenue mt">Pega la respuesta de NotebookLM en un Documento de Google ' +
        'y tráela desde aquí. No hace falta que borres el texto de alrededor: la app recorta el JSON sola.</p>';

      if (!Puente.disponible()) {
        html += '<div class="aviso aviso-alerta mt" id="t-sin-puente">' + UI.esc(Puente.motivo) + '</div>';
      }

      html += '<div class="linea mt">' +
        '<input id="t-doc" class="crece" placeholder="Pega el enlace del documento…">' +
        '<button class="btn btn-primario" data-accion="taller-traer-doc">Traer</button></div>' +
        '<div class="linea mt"><button class="btn btn-s btn-fantasma" data-accion="taller-listar-docs">' +
        'Ver mis documentos recientes</button></div>' +
        '<div id="t-docs"></div>';
    } else if (via === 'pegar') {
      html += '<p class="sm tenue mt">Copia el JSON completo que te devuelva y pégalo tal cual. ' +
        'Si viene envuelto en comillas de código o con una frase delante, la app lo recorta sola.</p>';
    }

    html += '<textarea id="t-json" style="min-height:150px;font-family:var(--mono);font-size:.78rem" placeholder=\'{ "area": { … }, "modulo": { … }, "temas": [ … ] }\'>' +
      UI.esc(TallerEstado.bruto || '') + '</textarea>' +
      '<div class="linea mt"><button class="btn btn-primario" data-accion="taller-validar">Validar</button>' +
      '<button class="btn btn-fantasma" data-accion="taller-limpiar">Limpiar</button></div>' +
      '<div id="t-resultado"></div>' +
      '</div>';

    /* --- contenidos propios --- */
    var propios = Estado.temasPropios();
    html += '<div class="tarjeta"><div class="tarjeta-cab"><h3>Tus contenidos</h3>' +
      '<div class="der"><span class="etiq' + (Estado.temasSinVerificar().length ? ' etiq-alerta' : '') + '">' +
      Estado.temasSinVerificar().length + ' sin verificar</span></div></div>';
    if (!propios.length) {
      html += '<div class="vacio"><span class="emoji">📥</span>Todavía no has creado contenido propio.<br>' +
        '<span class="sm">Lo que importes aparecerá aquí y podrás revisarlo, verificarlo o eliminarlo.</span></div>';
    } else {
      propios.forEach(function (t) {
        var area = TUTOR.area(TUTOR.areaDeTema(t.id));
        html += '<div class="fila"><div class="crece">' +
          '<div class="titulo">' + UI.esc(t.nombre) +
          (t.verificado
            ? ' <span class="etiq etiq-ok">verificado</span>'
            : ' <span class="etiq etiq-alerta">sin verificar</span>') + '</div>' +
          '<div class="sub">' + (area ? area.icono + ' ' + UI.esc(area.nombre) + ' · ' : '') +
          (t.tarjetas || []).length + ' tarjetas' +
          (t.fuentes ? ' · ' + UI.esc(t.fuentes.slice(0, 60)) : '') + '</div></div>' +
          '<button class="btn btn-s btn-fantasma" data-accion="ver-tema" data-tema="' + t.id + '">Revisar</button>' +
          (t.verificado ? '' :
            '<button class="btn btn-s" data-accion="taller-verificar" data-tema="' + t.id + '">Marcar verificado</button>') +
          '<button class="btn btn-s btn-fantasma" data-accion="taller-eliminar" data-tema="' + t.id + '">Eliminar</button>' +
          '</div>';
      });
    }
    html += '</div>';

    return html;
  },

  despues: function () {
    var destino = UI.$('#t-destino');
    if (!destino) return;
    destino.addEventListener('change', function () {
      var nueva = destino.value === 'nueva';
      UI.$('#t-bloque-nueva').classList.toggle('oculto', !nueva);
      UI.$('#t-bloque-existente').classList.toggle('oculto', nueva);
    });
  }
});

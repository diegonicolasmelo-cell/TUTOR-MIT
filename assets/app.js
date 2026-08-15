/* ============================================================
   APP — acciones, generador de prompt y arranque
   ============================================================ */

/* ------------------------------------------------------------
   Navegación
   ------------------------------------------------------------ */
var NAVEGACION = [
  { grupo: 'Estudio' },
  { ruta: 'inicio', icono: '🏠', nombre: 'Inicio', movil: true },
  { ruta: 'preparar', icono: '▶️', nombre: 'Nueva sesión', movil: true },
  { ruta: 'tarjetas', icono: '🔁', nombre: 'Tarjetas', movil: true, globo: 'tarjetas' },
  { ruta: 'preparar-examen', icono: '📝', nombre: 'Examen', movil: true },
  { grupo: 'Organización' },
  { ruta: 'plan', icono: '🗓️', nombre: 'Plan', movil: true },
  { ruta: 'areas', icono: '🧭', nombre: 'Áreas' },
  { ruta: 'temario', icono: '📚', nombre: 'Temario' },
  { ruta: 'rendimiento', icono: '📊', nombre: 'Rendimiento', movil: true },
  { grupo: 'Segundo cerebro' },
  { ruta: 'notas', icono: '🕸️', nombre: 'Notas' },
  { ruta: 'biblioteca', icono: '📚', nombre: 'Biblioteca' },
  { grupo: 'Herramientas' },
  { ruta: 'taller', icono: '🛠️', nombre: 'Taller' },
  { ruta: 'prompt', icono: '🤖', nombre: 'Prompt IA' },
  { ruta: 'ajustes', icono: '⚙️', nombre: 'Ajustes' }
];

function pintarNavegacion() {
  var lateral = UI.$('#nav-lateral');
  lateral.innerHTML = NAVEGACION.map(function (n) {
    if (n.grupo) return '<div class="nav-titulo">' + n.grupo + '</div>';
    return '<button class="nav-item" data-accion="navegar" data-ruta="' + n.ruta + '">' +
      '<span class="ico">' + n.icono + '</span>' + n.nombre +
      (n.globo ? '<span data-globo="' + n.globo + '"></span>' : '') + '</button>';
  }).join('');

  UI.$('#menu-movil').innerHTML = NAVEGACION.filter(function (n) { return n.movil; })
    .map(function (n) {
      return '<button data-accion="navegar" data-ruta="' + n.ruta + '">' +
        '<span class="ico">' + n.icono + '</span>' + n.nombre +
        (n.globo ? '<span data-globo="' + n.globo + '"></span>' : '') + '</button>';
    }).join('');
}

/* ------------------------------------------------------------
   Generador del prompt del tutor
   ------------------------------------------------------------ */
function construirPrompt(idTema, idModo, minutos) {
  var t = TUTOR.tema(idTema);
  var m = TUTOR.modo(idModo);
  var a = Estado.ajustes();
  var dom = Estado.dominio(idTema);
  var brechas = Estado.brechasAbiertas().filter(function (b) { return b.tema === idTema; });

  var area = TUTOR.area(TUTOR.areaDeTema(idTema)) || { nombre: 'Medicina' };
  var modulo = TUTOR.modulo(t.modulo) || { nombre: '' };

  var L = [];
  L.push('# TUTOR DE ' + area.nombre.toUpperCase() + ' — FISIOLOGÍA Y FISIOPATOLOGÍA');
  L.push('');
  L.push('## 1. ROL');
  L.push('Actúa como tutor experto en ' + area.nombre.toLowerCase() + ' (fisiología y fisiopatología) para estudiantes de Medicina, con nivel académico equivalente al de un docente universitario clínico.');
  L.push('Tu objetivo no es entregarme información, sino ayudarme a comprender, integrar, razonar y recordar.');
  L.push('Tengo bases sólidas de anatomía, fisiología general y bioquímica. No expliques lo elemental salvo que detectes una brecha conceptual que impida comprender el tema.');
  L.push('');
  L.push('## 2. CONTEXTO DE ESTA SESIÓN');
  L.push('- Área: ' + area.nombre + (modulo.nombre ? ' → ' + modulo.nombre : ''));
  L.push('- Tema: ' + t.nombre + (t.alto ? '  [ALTO RENDIMIENTO]' : ''));
  L.push('- Tiempo disponible: ' + minutos + ' minutos');
  L.push('- Modo solicitado: ' + m.nombre + ' — ' + m.descripcion);
  L.push('- Mi dominio actual estimado del tema: ' + dom + '%');
  if (brechas.length) {
    L.push('- Brechas ya detectadas que debes atacar de forma prioritaria:');
    brechas.slice(0, 6).forEach(function (b) { L.push('  · ' + b.texto); });
  }
  L.push('');
  L.push('## 3. PRINCIPIO CENTRAL DE ENSEÑANZA');
  L.push('Construye cada tema con esta lógica, sin saltarte pasos:');
  L.push('FISIOLOGÍA NORMAL → ¿qué variable cambia? → ¿por qué cambia? → ¿qué mecanismos compensatorios aparecen? → ¿qué consecuencias produce? → ¿cómo se manifiesta clínicamente? → ¿cómo se reconoce o diagnostica?');
  L.push('No quiero listas aisladas. Quiero poder responder «si ocurre X, ¿por qué sucede Y?» y después «si ocurre Y, ¿qué espero encontrar en el paciente?».');
  L.push('');
  L.push('## 4. ESTRUCTURA DE LA EXPLICACIÓN');
  L.push('1. IDEA CENTRAL (2–4 frases: qué debo entender realmente)');
  L.push('2. FISIOLOGÍA NORMAL');
  L.push('3. MECANISMO paso a paso, usando flechas cuando ayuden (↓volumen → ↓retorno venoso → ↓precarga → ↓VS → ↓GC → ↓PA)');
  L.push('4. VARIABLES CLAVE con su dirección de cambio (↑/↓)');
  L.push('5. FISIOPATOLOGÍA');
  L.push('6. CORRELACIÓN CLÍNICA (signos, síntomas, examen físico, laboratorio, ECG o imagen)');
  L.push('7. ERROR FRECUENTE (qué se confunde, por qué se parecen, cuál es la diferencia real, ejemplo clínico y regla mental)');
  L.push('8. PERLA DE EXAMEN');
  L.push('Marca los conceptos especialmente rentables como: 🔥 ALTO RENDIMIENTO');
  L.push('');
  L.push('## 5. ADAPTACIÓN AL TIEMPO (' + minutos + ' MIN)');
  if (minutos <= 15) {
    L.push('Modo REPASO RÁPIDO. Entrega: 5–10 conceptos esenciales, las relaciones fisiológicas fundamentales, 3 errores frecuentes, 5 preguntas rápidas y 3 perlas de examen. Debe poder revisarse en unos 10 minutos. No te extiendas.');
  } else if (minutos <= 25) {
    L.push('Modo POCO TIEMPO. Divide el contenido en IMPRESCINDIBLE / IMPORTANTE / COMPLEMENTARIO y cubre solo lo imprescindible salvo que sobre tiempo. No gastes tiempo en detalles de bajo rendimiento ni en conversación innecesaria.');
  } else if (minutos <= 45) {
    L.push('Modo TUTOR INTENSIVO. Identifica los conceptos fundamentales, explícalos rápido, detecta mis brechas mediante preguntas, corrígelas, aplícalas a casos clínicos y termina con preguntas de integración.');
  } else {
    L.push('Modo PROFUNDIZACIÓN. Puedes abordar mecanismos celulares, receptores, segundos mensajeros, electrofisiología, curvas presión-volumen, hemodinámica y regulación neurohumoral, manteniendo siempre la conexión con la clínica.');
  }
  L.push('');
  L.push('## 6. MÉTODO DE INTERACCIÓN (lo más importante)');
  L.push('No seas un libro de texto que habla: hazme razonar.');
  L.push('- Si puedo deducir una respuesta a partir de un principio fisiológico, guíame a deducirla en lugar de dármela.');
  L.push('- Construye cadenas de razonamiento progresivas: «¿qué determina el gasto cardíaco?» → «si baja el retorno venoso, ¿qué ocurre con la precarga?» → «¿y con el volumen sistólico?» → «¿qué compensación esperarías?».');
  L.push('- En los casos clínicos, formula las preguntas de una en una y ESPERA mi respuesta antes de continuar. No adelantes las soluciones.');
  L.push('- Si detectas que confundo dos conceptos, detente y explícame: qué confundo, por qué se parecen, cuál es la diferencia real, un ejemplo clínico y una regla mental para no volver a confundirlos.');
  L.push('');
  if (m.id === 'examen') {
    L.push('## 7. MODO EXAMEN (activo)');
    L.push('No me des la respuesta de entrada. Hazme preguntas progresivas. Tras cada respuesta mía: indica si es correcta, explica por qué, corrige mis errores, expón el razonamiento correcto y súbeme la dificultad.');
    L.push('');
  }
  L.push('## 8. PREGUNTAS DE ENTRENAMIENTO');
  L.push('Al terminar el tema, genera preguntas en tres niveles:');
  L.push('- NIVEL 1 (conocimiento): conceptos fundamentales.');
  L.push('- NIVEL 2 (integración): relacionar dos o más conceptos.');
  L.push('- NIVEL 3 (razonamiento clínico): casos donde deba deducir qué ocurre.');
  L.push('Prioriza «¿qué ocurriría si…?», «¿cuál es el mecanismo que explica…?», «¿qué variable cambió primero?», «¿qué compensación esperarías?», «¿qué pasa si ese mecanismo falla?».');
  L.push('');
  L.push('## 9. FUENTES');
  var FUENTES = {
    cardio: 'Guyton & Hall, Boron & Boulpaep, Costanzo, Harrison y Braunwald',
    respiratorio: 'West (Fisiología respiratoria), Guyton & Hall, Boron & Boulpaep y Harrison',
    renal: 'Rose & Post (Trastornos de electrolitos y ácido-base), Brenner, Guyton & Hall y Harrison',
    neuro: 'Kandel (Principios de neurociencia), Guyton & Hall, Ropper (Adams y Victor) y Harrison',
    farmaco: 'Goodman & Gilman, Katzung, Rang & Dale y guías de sociedades de medicina intensiva'
  };
  L.push('Usa conceptos compatibles con ' + (FUENTES[area.id] || FUENTES.cardio) + '. Si hay diferencias relevantes entre fuentes, indícalas. No inventes referencias.');
  L.push('');
  L.push('## 10. ARRANQUE');
  L.push('Empieza directamente por lo más importante del tema indicado. No me preguntes de nuevo el tema ni el tiempo: ya están arriba.');
  L.push('Al terminar cada concepto importante, pregúntame: «¿lo llevamos a un caso clínico o avanzamos?». Si el tiempo es escaso, prioriza avanzar.');

  return L.join('\n');
}

/* ------------------------------------------------------------
   ACCIONES
   ------------------------------------------------------------ */

UI.accion('navegar', function (d) {
  if (Examen.activo() && !Examen.datos().entregado && d.ruta !== 'examen') {
    if (!confirm('Hay un examen en curso. ¿Salir y perderlo?')) return;
    Examen.abandonar();
  }
  if (Sesion.activa() && d.ruta !== 'sesion') {
    if (!confirm('Hay una sesión en curso. ¿Salir y perder el progreso de esta sesión?')) return;
    Sesion.abandonar();
  }
  UI.ir(d.ruta);
});

UI.accion('ir-inicio', function () { UI.ir('inicio'); });
UI.accion('ver-temario', function () { UI.ir('temario'); });
UI.accion('ver-rendimiento', function () { UI.ir('rendimiento'); });
UI.accion('ver-tema', function (d) { UI.ir('tema', { tema: d.tema }); });

UI.accion('ir-tarjetas', function () {
  Mazo.cargar(null);
  UI.ir('tarjetas');
});

/* --- arranque de sesiones --- */
UI.accion('empezar-sugerido', function () {
  var s = Estado.sugerencia();
  if (!s) { UI.brindis('No hay ningún tema todavía. Créalo en el Taller.'); return; }
  UI.ir('preparar', { tema: s.tema });
});

UI.accion('arranque-rapido', function (d) {
  var min = parseInt(d.min, 10);
  var s = Estado.sugerencia();
  if (!s) { UI.brindis('No hay ningún tema todavía. Créalo en el Taller.'); return; }
  var modo = min <= 10 ? 'repaso' : min <= 20 ? 'comprender' : min <= 30 ? 'comprender' : min <= 45 ? 'intensivo' : 'profundizar';
  Sesion.iniciar(s.tema, modo, min);
});

UI.accion('estudiar-tema', function (d) {
  UI.ir('preparar', { tema: d.tema });
});

UI.accion('repasar-brecha', function (d) {
  UI.ir('preparar', { tema: d.tema });
});

var seleccion = { minutos: 30, modo: 'comprender' };

UI.accion('sel-minutos', function (d, el) {
  seleccion.minutos = parseInt(d.min, 10);
  UI.$$('#s-minutos .opcion').forEach(function (b) { b.classList.remove('sel'); });
  el.classList.add('sel');
});

UI.accion('sel-modo', function (d, el) {
  seleccion.modo = d.modo;
  UI.$$('#s-modo .opcion').forEach(function (b) { b.classList.remove('sel'); });
  el.classList.add('sel');
});

UI.accion('lanzar-sesion', function () {
  var tema = UI.$('#s-tema').value;
  Sesion.iniciar(tema, seleccion.modo, seleccion.minutos);
});

/* --- dentro de la sesión --- */
UI.accion('fase-siguiente', function () { Sesion.avanzar(); });

UI.accion('abandonar-sesion', function () {
  if (confirm('¿Salir de la sesión? El progreso de esta sesión no se guardará.')) Sesion.abandonar();
});

UI.accion('pausar-sesion', function (d, el) {
  var pausado = Crono.alternarPausa();
  el.textContent = pausado ? '▶' : '⏸';
  UI.brindis(pausado ? 'Sesión en pausa' : 'Sesión reanudada');
});

UI.accion('revelar-feynman', function (d, el) {
  UI.$('#feynman-referencia').classList.remove('oculto');
  el.disabled = true;
  el.textContent = 'Referencia mostrada';
  UI.$('#feynman-referencia').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

UI.accion('revelar-respuesta', function (d, el) {
  UI.$('#zona-respuesta').classList.remove('oculto');
  el.disabled = true;
});

UI.accion('calificar-preg', function (d) {
  Sesion.calificar(d.ok === '1');
});

UI.accion('pista-caso', function (d, el) {
  UI.$('#pista-caso').classList.remove('oculto');
  el.disabled = true;
});

UI.accion('revelar-caso', function (d, el) {
  UI.$('#zona-caso').classList.remove('oculto');
  el.disabled = true;
});

UI.accion('siguiente-caso', function () { Sesion.siguienteCaso(); });

/* --- tarjetas --- */
UI.accion('revelar-tarjeta', function () { Mazo.revelar(); });
UI.accion('calificar-tarjeta', function (d) {
  Mazo.calificar(parseInt(d.g, 10));
  UI.actualizarGlobos();
});
UI.accion('mazo-tema', function (d) { Mazo.cargar(d.tema); UI.refrescar(); });
UI.accion('repasar-tarjetas-tema', function (d) { Mazo.cargar(d.tema); UI.ir('tarjetas'); });
UI.accion('mazo-por-tema', function () { Mazo.cargar('__ninguno__'); UI.refrescar(); });

/* --- plan --- */
UI.accion('generar-plan', function () {
  Estado.generarPlan(14);
  UI.ir('plan');
  UI.brindis('Plan regenerado para 14 días');
});

UI.accion('editar-disponibilidad', function () { UI.ir('ajustes'); });

UI.accion('guardar-disponibilidad', function () {
  var mapa = {};
  UI.$$('.min-dia').forEach(function (i) {
    mapa[i.dataset.dia] = parseInt(i.value, 10) || 0;
  });
  Estado.guardarAjustes({
    minutosPorDia: mapa,
    nombre: UI.$('#a-nombre') ? UI.$('#a-nombre').value.trim() || 'Diego' : Estado.ajustes().nombre
  });
  Estado.generarPlan(14);
  UI.brindis('Disponibilidad guardada y plan regenerado');
  UI.ir('plan');
});

UI.accion('guardar-srs', function () {
  Estado.guardarAjustes({
    maxTarjetasDia: parseInt(UI.$('#a-max').value, 10) || 40,
    tarjetasNuevasDia: parseInt(UI.$('#a-nuevas').value, 10) || 8
  });
  UI.actualizarGlobos();
  UI.brindis('Preferencias de repaso guardadas');
});

/* ------------------------------------------------------------
   EMPEZAR DE CERO
   ------------------------------------------------------------ */

/* Si se quita el temario de fábrica, las áreas activas guardadas
   apuntarían a áreas que ya no existen y la app se vería vacía
   sin explicar por qué. Y al revés: al devolverlo, las áreas
   recuperadas deben entrar activas o seguirían sin aparecer. */
function sincronizarAreasActivas(activarTodas) {
  var existentes = TUTOR.AREAS.map(function (a) { return a.id; });
  var activas = activarTodas ? existentes.slice() : Estado.areasActivas().filter(function (id) {
    return existentes.indexOf(id) >= 0;
  });
  if (!activas.length) activas = existentes.slice();
  Estado.guardarAjustes({ areasActivas: activas });
}

/* El plan guarda identificadores de tema. Al cambiar el temario
   hay que rehacerlo, o quedarían bloques apuntando a temas que
   ya no existen: huecos silenciosos en la semana. */
function rehacerPlanTrasCambioDeTemario() {
  if (TUTOR.TEMAS.length) Estado.generarPlan(14);
  else Estado.guardarAjustes({});   // solo persistir
}

UI.accion('temario-base', function (d) {
  var quitar = d.valor === '0';
  if (!quitar) {
    TUTOR.restaurarBase();
    Estado.guardarAjustes({ temarioBase: true });
    /* Al devolver el temario, sus áreas entran activas: si no,
       volverían pausadas y parecería que no ha vuelto nada. */
    sincronizarAreasActivas(true);
    rehacerPlanTrasCambioDeTemario();
    UI.refrescar();
    UI.brindis('Temario de fisiología devuelto');
    return;
  }

  UI.modal('<h3>Quitar el temario de fisiología</h3>' +
    '<p>Desaparecerán las 5 áreas de fábrica, sus 32 temas, sus 252 tarjetas y sus 63 ' +
    'preguntas. La app queda vacía y lista para la materia que quieras.</p>' +
    '<p class="sm tenue">No se borra nada del código: es reversible desde este mismo sitio. ' +
    'Tu progreso sobre esos temas se conserva por si los devuelves, y tu contenido propio ' +
    'no se toca.</p>' +
    '<div class="linea fin mt"><button class="btn btn-fantasma" data-accion="cerrar-modal">Cancelar</button>' +
    '<button class="btn btn-acento" data-accion="confirmar-quitar-base">Quitar el temario</button></div>');
});

UI.accion('confirmar-quitar-base', function () {
  TUTOR.quitarBase();
  Estado.guardarAjustes({ temarioBase: false });
  sincronizarAreasActivas();
  rehacerPlanTrasCambioDeTemario();
  UI.cerrarModal();
  UI.ir('temario');
  UI.brindis(TUTOR.TEMAS.length
    ? 'Temario de fábrica quitado · queda tu contenido'
    : 'Temario vacío · crea tu primer tema en el Taller');
});

UI.accion('empezar-de-cero', function () {
  UI.modal('<h3>Empezar de cero</h3>' +
    '<p>Esto deja la app <b>completamente vacía</b>: se borra tu progreso, tus notas, ' +
    'tus fuentes, tu historial de exámenes y el contenido que hayas creado, y se quita ' +
    'el temario de fisiología.</p>' +
    '<div class="aviso aviso-acento">No se puede deshacer. Si hay algo que quieras ' +
    'conservar, cancela y usa antes <b>Exportar progreso</b>.</div>' +
    '<div class="linea fin mt"><button class="btn btn-fantasma" data-accion="cerrar-modal">Cancelar</button>' +
    '<button class="btn" data-accion="exportar">Exportar primero</button>' +
    '<button class="btn btn-acento" data-accion="confirmar-cero">Sí, empezar de cero</button></div>');
});

UI.accion('confirmar-cero', function () {
  /* Orden importante: primero se apartan los temas de fábrica del
     registro, y después se reinicia el estado con el ajuste ya
     puesto, para que al recargar no vuelvan a aparecer. */
  TUTOR.quitarBase();
  Estado.reiniciar();
  Estado.guardarAjustes({ temarioBase: false, areasActivas: [] });
  UI.cerrarModal();
  UI.ir('taller');
  UI.brindis('Todo vacío · empieza creando un tema en el Taller');
});

/* --- base de datos en Sheets --- */
function pintarBD(html) {
  var caja = UI.$('#a-bd-estado');
  if (caja) caja.innerHTML = html;
}

function enlaceHoja(r) {
  return '<a class="btn btn-s btn-fantasma" href="' + UI.esc(r.url) +
    '" target="_blank" rel="noopener noreferrer">Abrir la hoja ↗</a>';
}

UI.accion('bd-estado', function () {
  pintarBD('<div class="sm tenue mt">Consultando…</div>');
  Puente.bdEstado().then(function (r) {
    if (!r.ok) { pintarBD('<div class="aviso aviso-acento mt">' + UI.esc(r.error) + '</div>'); return; }
    if (!r.configurada) {
      pintarBD('<div class="aviso aviso-alerta mt">' +
        UI.esc(r.aviso || 'Todavía no hay ninguna hoja vinculada.') + '</div>');
      return;
    }
    pintarBD('<div class="aviso aviso-ok mt"><b>' + UI.esc(r.titulo) + '</b><div class="linea mt">' +
      enlaceHoja(r) + '<button class="btn btn-s btn-fantasma" data-accion="bd-olvidar">Desvincular</button>' +
      '</div></div>');
  });
});

UI.accion('bd-crear', function () {
  pintarBD('<div class="sm tenue mt">Creando la hoja, sus pestañas y las consultas preparadas…</div>');
  Puente.bdCrear('Tutor MIT · base de datos').then(function (r) {
    if (!r.ok) { pintarBD('<div class="aviso aviso-acento mt">' + UI.esc(r.error) + '</div>'); return; }
    pintarBD('<div class="aviso aviso-ok mt"><b>Hoja creada:</b> ' + UI.esc(r.titulo) +
      '<div class="sm tenue">Está vacía hasta que pulses «Volcar ahora».</div>' +
      '<div class="linea mt">' + enlaceHoja(r) + '</div></div>');
    UI.brindis('Hoja creada · ahora vuelca los datos');
  });
});

UI.accion('bd-vincular', function () {
  var ref = (UI.$('#a-bd-url') || {}).value || '';
  if (!ref.trim()) { UI.brindis('Pega primero el enlace de la hoja'); return; }
  pintarBD('<div class="sm tenue mt">Comprobando…</div>');
  Puente.bdVincular(ref.trim()).then(function (r) {
    if (!r.ok) { pintarBD('<div class="aviso aviso-acento mt">' + UI.esc(r.error) + '</div>'); return; }
    pintarBD('<div class="aviso aviso-ok mt"><b>Vinculada:</b> ' + UI.esc(r.titulo) +
      '<div class="linea mt">' + enlaceHoja(r) + '</div></div>');
    UI.brindis('Hoja vinculada');
  });
});

UI.accion('bd-olvidar', function () {
  Puente.bdOlvidar().then(function () {
    pintarBD('<div class="sm tenue mt">Desvinculada. La hoja sigue en tu Drive, solo deja de usarse.</div>');
    UI.brindis('Hoja desvinculada');
  });
});

UI.accion('bd-volcar', function () {
  pintarBD('<div class="aviso mt">Preparando el volcado…</div>');
  BD.volcar(function (seccion, i, total) {
    pintarBD('<div class="aviso mt">Volcando <b>' + UI.esc(seccion) + '</b> · ' +
      (i + 1) + ' de ' + total + '</div>');
  }).then(function (r) {
    var html = '';
    if (r.errores.length) {
      html += '<div class="aviso aviso-acento mt"><b>El volcado terminó con problemas:</b>' +
        '<ul style="margin:8px 0 0;padding-left:18px">' +
        r.errores.map(function (e) { return '<li>' + UI.esc(e) + '</li>'; }).join('') +
        '</ul></div>';
    } else {
      html += '<div class="aviso aviso-ok mt"><b>Volcado completo.</b> ' +
        r.secciones + ' secciones · ' + r.filas + ' filas.' +
        (r.url ? '<div class="linea mt">' + enlaceHoja(r) + '</div>' : '') + '</div>';
    }
    /* Recortar contenido en silencio sería perder material sin que
       nadie se entere, así que se enumera exactamente qué celda. */
    if (r.recortados.length) {
      html += '<div class="aviso aviso-alerta mt"><b>Se recortó contenido</b> por el límite de ' +
        '50.000 caracteres por celda de Sheets. En la hoja está incompleto; en la app sigue entero:' +
        '<ul style="margin:8px 0 0;padding-left:18px">' +
        r.recortados.map(function (c) { return '<li>' + UI.esc(c) + '</li>'; }).join('') +
        '</ul></div>';
    }
    pintarBD(html);
    UI.brindis(r.errores.length ? 'Volcado con problemas' : 'Volcado completo · ' + r.filas + ' filas');
  });
});

/* --- clave de Gemini --- */
UI.accion('gemini-guardar', function () {
  var clave = (UI.$('#a-gemini-clave') || {}).value || '';
  var modelo = (UI.$('#a-gemini-modelo') || {}).value || '';
  if (!clave.trim()) { UI.brindis('Pega primero la clave'); return; }

  var caja = UI.$('#a-gemini-estado');
  if (caja) caja.innerHTML = '<div class="sm tenue mt">Guardando y probando…</div>';

  Puente.guardarClave(clave.trim(), modelo.trim()).then(function (r) {
    if (!r.ok) {
      if (caja) caja.innerHTML = '<div class="aviso aviso-acento mt">' + UI.esc(r.error) + '</div>';
      return;
    }
    /* Guardar sin probar dejaría el fallo para el peor momento:
       cuando esté esperando un módulo generado. */
    return Puente.probarClave().then(function (p) {
      var el = UI.$('#a-gemini-estado');
      if (!el) return;
      if (!p.ok) {
        el.innerHTML = '<div class="aviso aviso-acento mt"><b>Guardada, pero no funciona.</b> ' +
          UI.esc(p.error) + '</div>';
        UI.brindis('La clave no responde');
        return;
      }
      el.innerHTML = '<div class="aviso aviso-ok mt"><b>Clave verificada.</b> ' +
        p.modelos + ' modelos disponibles.</div>';
      var campo = UI.$('#a-gemini-clave');
      if (campo) campo.value = '';
      UI.brindis('Clave verificada');
    });
  });
});

UI.accion('gemini-borrar', function () {
  Puente.borrarClave().then(function () {
    TallerEstado.gemini = null;
    var caja = UI.$('#a-gemini-estado');
    if (caja) caja.innerHTML = '<div class="sm tenue mt">Clave borrada.</div>';
    UI.brindis('Clave borrada');
  });
});

UI.accion('tema-visual', function (d) {
  Estado.guardarAjustes({ tema: d.valor });
  UI.aplicarTema(d.valor);
  UI.refrescar();
});

/* --- áreas del conocimiento --- */
UI.accion('alternar-area', function (d) {
  var ok = Estado.alternarArea(d.area);
  if (!ok) {
    UI.brindis('Debe quedar al menos un área activa');
    return;
  }
  Estado.generarPlan(14);
  UI.refrescar();
  UI.actualizarGlobos();
  var a = TUTOR.area(d.area);
  UI.brindis(a.nombre + (Estado.areaActiva(d.area) ? ' activada' : ' pausada') + ' · plan regenerado');
});

/* --- Minerva --- */
UI.accion('abrir-minerva', function () { Minerva.abrir(); });

UI.accion('minerva-accion', function (d) {
  UI.cerrarModal();
  var datos = {};
  try { datos = JSON.parse(d.carga || '{}'); } catch (e) { datos = {}; }
  var real = d.real;
  if (real === 'ir-tarjetas') { Mazo.cargar(null); UI.ir('tarjetas'); return; }
  if (real === 'arranque-rapido') {
    var s = Estado.sugerencia();
    if (!s) { UI.brindis('No hay ningún tema todavía. Créalo en el Taller.'); return; }
    var min = parseInt(datos.min, 10) || 20;
    Sesion.iniciar(s.tema, min <= 10 ? 'repaso' : min <= 30 ? 'comprender' : 'intensivo', min);
    return;
  }
  if (real === 'estudiar-tema') { UI.ir('preparar', { tema: datos.tema }); return; }
  if (real === 'ver-tema') { UI.ir('tema', { tema: datos.tema }); return; }
  if (real === 'abrir-preparar') { UI.ir('preparar'); return; }
  if (real === 'navegar') { UI.ir(datos.ruta || 'inicio'); return; }
  UI.ir('inicio');
});

UI.accion('abrir-preparar', function () { UI.ir('preparar'); });

UI.accion('alternar-asistente', function (d) {
  Estado.guardarAjustes({ asistente: d.valor === '1' });
  Minerva.pintarBoton();
  UI.refrescar();
  UI.brindis(d.valor === '1' ? 'Minerva activada' : 'Minerva desactivada');
});

/* --- brechas --- */
UI.accion('cerrar-brecha', function (d) {
  Estado.resolverBrecha(parseInt(d.i, 10));
  UI.refrescar();
  UI.brindis('Brecha marcada como resuelta');
});

/* --- prompt --- */
UI.accion('generar-prompt', function () {
  var texto = construirPrompt(
    UI.$('#p-tema').value,
    UI.$('#p-modo').value,
    parseInt(UI.$('#p-min').value, 10)
  );
  UI.$('#p-salida').textContent = texto;
  UI.$('#p-estado').textContent = texto.length + ' caracteres · listo para pegar';
});

UI.accion('copiar-prompt', function () {
  var texto = UI.$('#p-salida').textContent;
  if (!texto || texto.indexOf('Elige tema') === 0) {
    UI.brindis('Genera primero el prompt');
    return;
  }
  copiarTexto(texto);
  UI.brindis('Prompt copiado al portapapeles');
});

function copiarTexto(texto) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(texto);
      return;
    }
  } catch (e) { /* se usa el método alternativo */ }
  var ta = document.createElement('textarea');
  ta.value = texto;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); } catch (e) { }
  ta.remove();
}

/* --- biblioteca de fuentes --- */
UI.accion('fuente-guardar', function () {
  var titulo = (UI.$('#f-titulo').value || '').trim();
  if (!titulo) { UI.brindis('Escribe al menos el título'); return; }
  var enlace = (UI.$('#f-enlace').value || '').trim();
  /* Solo se aceptan enlaces http(s): evita javascript: en un href. */
  if (enlace && !/^https?:\/\//i.test(enlace)) {
    UI.brindis('El enlace debe empezar por http:// o https://');
    return;
  }
  Estado.guardarFuente({
    id: Notas.idNuevo('f'),
    titulo: titulo,
    tipo: UI.$('#f-tipo').value,
    autor: (UI.$('#f-autor').value || '').trim(),
    anio: (UI.$('#f-anio').value || '').trim(),
    enlace: enlace,
    temas: Array.prototype.slice.call(UI.$('#f-temas').selectedOptions).map(function (o) { return o.value; }),
    creado: new Date().toISOString()
  });
  UI.refrescar();
  UI.brindis('Fuente añadida');
});

UI.accion('fuente-eliminar', function (d) {
  Estado.eliminarFuente(d.id);
  UI.refrescar();
  UI.brindis('Fuente eliminada');
});

/* --- notas atómicas --- */
UI.accion('nota-nueva', function () {
  NotasEstado.editando = { titulo: '', cuerpo: '', temas: [] };
  UI.ir('notas');
});

UI.accion('nota-crear-desde', function (d) {
  NotasEstado.editando = { titulo: d.titulo, cuerpo: '', temas: [] };
  UI.ir('notas');
  UI.brindis('Nota nueva desde el enlace «' + d.titulo + '»');
});

UI.accion('nota-editar', function (d) {
  var n = Estado.notas().filter(function (x) { return x.id === d.id; })[0];
  if (!n) return;
  NotasEstado.editando = JSON.parse(JSON.stringify(n));
  UI.refrescar();
  window.scrollTo(0, 0);
});

UI.accion('nota-guardar', function () {
  var titulo = (UI.$('#n-titulo').value || '').trim();
  if (!titulo) { UI.brindis('La nota necesita un título para poder enlazarla'); return; }
  var n = NotasEstado.editando;
  var repe = Notas.porTitulo(titulo);
  if (repe && repe.id !== n.id) {
    UI.brindis('Ya existe una nota con ese título: los enlaces serían ambiguos');
    return;
  }
  Estado.guardarNota({
    id: n.id || Notas.idNuevo('n'),
    titulo: titulo,
    cuerpo: UI.$('#n-cuerpo').value || '',
    temas: Array.prototype.slice.call(UI.$('#n-temas').selectedOptions).map(function (o) { return o.value; }),
    creado: n.creado
  });
  NotasEstado.editando = null;
  UI.refrescar();
  UI.brindis('Nota guardada');
});

UI.accion('nota-cancelar', function () {
  NotasEstado.editando = null;
  UI.refrescar();
});

UI.accion('nota-eliminar', function (d) {
  Estado.eliminarNota(d.id);
  NotasEstado.editando = null;
  UI.refrescar();
  UI.brindis('Nota eliminada');
});

UI.accion('nota-abrir', function (d) {
  NotasEstado.filtro = '';
  NotasEstado.editando = null;
  UI.ir('notas');
  var el = UI.$('#nota-' + d.id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.classList.add('destacada');
    setTimeout(function () { el.classList.remove('destacada'); }, 1600);
  }
});

UI.accion('nota-buscar', function () {
  NotasEstado.filtro = (UI.$('#n-buscar').value || '').trim();
  UI.refrescar();
});

UI.accion('nota-limpiar-busqueda', function () {
  NotasEstado.filtro = '';
  UI.refrescar();
});

/* Crear una nota a partir de una brecha detectada: convierte un
   fallo en una idea propia, que es lo que cierra el círculo. */
UI.accion('nota-desde-brecha', function (d) {
  var t = TUTOR.tema(d.tema);
  NotasEstado.editando = {
    titulo: '',
    cuerpo: 'Brecha detectada: ' + (d.texto || '') + '\n\n' +
      (t ? 'Tema: [[' + t.nombre + ']]\n\n' : '') +
      'Explícalo con tus palabras:\n',
    temas: d.tema ? [d.tema] : []
  };
  UI.ir('notas');
});

/* --- diapositivas --- */
UI.accion('presentar', function (d) {
  Diapositivas.abrir(d.tema, d.esenciales === '1');
});
UI.accion('pres-cerrar', function () { Diapositivas.cerrar(); });
UI.accion('pres-mover', function (d) { Diapositivas.mover(parseInt(d.d, 10)); });
UI.accion('pres-ir', function (d) { Diapositivas.irA(parseInt(d.i, 10)); });
UI.accion('pres-estudiar', function (d) {
  Diapositivas.cerrar();
  UI.ir('preparar', { tema: d.tema });
});
UI.accion('pres-tarjetas', function (d) {
  Diapositivas.cerrar();
  Mazo.cargar(d.tema);
  UI.ir('tarjetas');
});

/* --- examen de alternativas --- */
UI.accion('examen-iniciar', function () {
  Examen.iniciar({
    minutos: parseInt(UI.$('#x-minutos').value, 10) || 30,
    preguntas: parseInt(UI.$('#x-preguntas').value, 10) || 15,
    area: UI.$('#x-area').value || null,
    nivel: UI.$('#x-nivel').value
  });
});

UI.accion('examen-responder', function (d) {
  Examen.responder(Examen.datos().indice, parseInt(d.i, 10));
  UI.refrescar();
});

UI.accion('examen-marcar', function () {
  Examen.marcar(Examen.datos().indice);
  UI.refrescar();
});

UI.accion('examen-ir', function (d) { Examen.ir(parseInt(d.i, 10)); });

UI.accion('examen-entregar', function () {
  var e = Examen.datos();
  var sin = e.preguntas.filter(function (p) { return p.respuesta === null; }).length;
  if (sin) {
    UI.modal('<h3>Entregar con ' + sin + ' sin responder</h3>' +
      '<p>Quedan ' + sin + ' preguntas sin contestar y contarán como falladas. ' +
      'Todavía puedes volver y completarlas.</p>' +
      '<div class="linea fin mt"><button class="btn btn-fantasma" data-accion="cerrar-modal">Seguir respondiendo</button>' +
      '<button class="btn btn-acento" data-accion="examen-entregar-confirmar">Entregar igualmente</button></div>');
    return;
  }
  Examen.entregar();
});

UI.accion('examen-entregar-confirmar', function () {
  UI.cerrarModal();
  Examen.entregar();
});

UI.accion('examen-abandonar', function () {
  if (confirm('¿Salir del examen? No se guardará el resultado.')) Examen.abandonar();
});

/* --- taller de contenido --- */
UI.accion('taller-generar', function () {
  var destino = UI.$('#t-destino').value;
  var cfg = {
    destino: destino,
    areaId: UI.$('#t-area').value,
    areaNombre: (UI.$('#t-area-nombre').value || '').trim(),
    icono: (UI.$('#t-icono').value || '').trim(),
    moduloNombre: (UI.$('#t-modulo').value || '').trim(),
    temaNombre: (UI.$('#t-tema').value || '').trim(),
    minutos: parseInt(UI.$('#t-minutos').value, 10) || 20,
    fuentes: (UI.$('#t-fuentes').value || '').trim(),
    mcq: UI.$('#t-mcq') ? UI.$('#t-mcq').checked : true
  };

  if (!cfg.temaNombre) { UI.brindis('Escribe el nombre del tema'); return; }
  if (!cfg.moduloNombre) { UI.brindis('Escribe el módulo al que pertenece'); return; }
  if (destino === 'nueva' && !cfg.areaNombre) { UI.brindis('Escribe el nombre del área nueva'); return; }

  TallerEstado.cfg = cfg;
  TallerEstado.prompt = Taller.construirPrompt(cfg);
  UI.refrescar();
  UI.brindis('Prompt generado · cópialo y pégalo en NotebookLM');
  var caja = UI.$('#t-prompt');
  if (caja) caja.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

UI.accion('taller-copiar', function () {
  copiarTexto(TallerEstado.prompt);
  UI.brindis('Prompt copiado');
});

UI.accion('taller-limpiar', function () {
  UI.$('#t-json').value = '';
  UI.$('#t-resultado').innerHTML = '';
  TallerEstado.validacion = null;
  TallerEstado.bruto = '';
});

/* --- vía de entrada: portapapeles o Google Doc --- */
UI.accion('taller-via', function (d) {
  /* Se conserva lo ya escrito al cambiar de pestaña: perder un
     pegado de 9 KB por tocar un botón sería inaceptable. */
  var caja = UI.$('#t-json');
  if (caja) TallerEstado.bruto = caja.value;
  TallerEstado.via = d.via;
  UI.refrescar();

  /* Al entrar en la vía Gemini se consulta si hay clave, para
     poder decirlo antes de que pulse «Generar» y falle. */
  if (d.via === 'gemini' && Puente.disponible() && !TallerEstado.gemini) {
    Puente.estadoClave().then(function (r) {
      TallerEstado.gemini = r.ok ? r : { configurada: false };
      if (UI.rutaActual() === 'taller') UI.refrescar();
    });
  }
});

/* --- vía Gemini + File Search --- */
UI.accion('taller-almacenes', function () {
  var caja = UI.$('#t-gemini');
  if (caja) caja.innerHTML = '<div class="sm tenue mt">Buscando almacenes…</div>';
  Puente.almacenes().then(function (r) {
    caja = UI.$('#t-gemini');
    if (!r.ok) {
      if (caja) caja.innerHTML = '<div class="aviso aviso-alerta mt">' + UI.esc(r.error) + '</div>';
      return;
    }
    TallerEstado.almacenes = r.almacenes;
    if (r.almacenes.length && !TallerEstado.almacen) TallerEstado.almacen = r.almacenes[0].nombre;
    UI.refrescar();
    UI.brindis(r.almacenes.length
      ? r.almacenes.length + (r.almacenes.length === 1 ? ' almacén encontrado' : ' almacenes encontrados')
      : 'No tienes almacenes de File Search todavía. Créalo en Google AI Studio y sube ahí tus papers.');
  });
});

UI.accion('taller-generar-gemini', function () {
  if (!TallerEstado.prompt) {
    UI.brindis('Genera antes el prompt en el paso 2');
    return;
  }
  var sel = UI.$('#t-almacen');
  var almacen = sel ? sel.value : '';
  TallerEstado.almacen = almacen;

  var caja = UI.$('#t-gemini');
  if (caja) {
    caja.innerHTML = '<div class="aviso mt">Consultando tus documentos… ' +
      'esto tarda bastante más que una respuesta corta, porque está escribiendo un módulo entero.</div>';
  }

  Puente.generar(TallerEstado.prompt, almacen).then(function (r) {
    caja = UI.$('#t-gemini');
    if (!r.ok) {
      if (caja) caja.innerHTML = '<div class="aviso aviso-acento mt">' + UI.esc(r.error) + '</div>';
      UI.brindis('No se pudo generar');
      return;
    }

    TallerEstado.bruto = r.texto;
    var v = Taller.validar(r.texto);
    TallerEstado.validacion = v;
    UI.refrescar();

    var cabecera = '';
    if (!r.anclado) {
      cabecera += '<div class="aviso aviso-acento mt"><b>Sin anclar a tus fuentes.</b> ' +
        'No se eligió almacén, así que esto lo escribió el modelo de memoria. ' +
        'Trátalo como un borrador, no como material de estudio.</div>';
    } else if (!r.citas.length) {
      cabecera += '<div class="aviso aviso-alerta mt"><b>Sin citas.</b> Se usó el almacén, ' +
        'pero la respuesta no señala de qué documento salió cada cosa. Revísala con más cuidado.</div>';
    } else {
      cabecera += '<div class="aviso aviso-ok mt"><b>Anclado en tus documentos:</b> ' +
        r.citas.map(function (c) { return UI.esc(c); }).join(' · ') + '</div>';
    }

    var res = UI.$('#t-gemini');
    if (res) res.innerHTML = cabecera;
    var salida = UI.$('#t-resultado');
    if (salida) salida.innerHTML = pintarValidacion(v);
    UI.brindis(v.ok ? 'Módulo generado · estructura correcta' : 'Módulo generado · revisa los errores');
  });
});

UI.accion('taller-traer-doc', function () {
  var ref = (UI.$('#t-doc') || {}).value || '';
  if (!ref.trim()) { UI.brindis('Pega primero el enlace del documento'); return; }
  traerDeDoc(ref.trim());
});

UI.accion('taller-doc-elegir', function (d) { traerDeDoc(d.id); });

function traerDeDoc(referencia) {
  UI.brindis('Leyendo el documento…');
  Puente.leerDoc(referencia).then(function (r) {
    if (!r.ok) { UI.brindis(r.error); return; }
    if (!r.texto || !r.texto.trim()) {
      UI.brindis('«' + r.nombre + '» está vacío.');
      return;
    }
    TallerEstado.bruto = r.texto;
    UI.refrescar();
    /* Validar en el acto: traerlo y no decir si sirve dejaría el
       trabajo a medias justo donde el usuario espera respuesta. */
    var v = Taller.validar(r.texto);
    TallerEstado.validacion = v;
    UI.$('#t-resultado').innerHTML = pintarValidacion(v);
    UI.brindis(v.ok
      ? 'Traído de «' + r.nombre + '» · estructura correcta'
      : 'Traído de «' + r.nombre + '» · revisa los errores');
  });
}

UI.accion('taller-listar-docs', function () {
  var caja = UI.$('#t-docs');
  if (caja) caja.innerHTML = '<div class="sm tenue mt">Buscando…</div>';
  Puente.docsRecientes().then(function (r) {
    caja = UI.$('#t-docs');
    if (!caja) return;
    if (!r.ok) {
      caja.innerHTML = '<div class="aviso aviso-alerta mt">' + UI.esc(r.error) + '</div>';
      return;
    }
    if (!r.docs.length) {
      caja.innerHTML = '<div class="sm tenue mt">No encontré documentos en tu Drive.</div>';
      return;
    }
    caja.innerHTML = '<div class="mt">' + r.docs.map(function (doc) {
      return '<div class="fila"><div class="crece"><div class="titulo">' + UI.esc(doc.nombre) + '</div>' +
        '<div class="sub">' + UI.fechaCorta(doc.modificado.slice(0, 10)) + '</div></div>' +
        '<button class="btn btn-s btn-fantasma" data-accion="taller-doc-elegir" data-id="' +
        UI.esc(doc.id) + '">Traer</button></div>';
    }).join('') + '</div>';
  });
});

UI.accion('taller-validar', function () {
  var bruto = UI.$('#t-json').value;
  if (!bruto.trim()) { UI.brindis('Pega primero la respuesta'); return; }
  TallerEstado.bruto = bruto;

  var r = Taller.validar(bruto);
  TallerEstado.validacion = r;
  UI.$('#t-resultado').innerHTML = pintarValidacion(r);
  UI.$('#t-resultado').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

function pintarValidacion(r) {
  var html = '';

  if (r.errores.length) {
    html += '<div class="aviso aviso-acento mt"><b>No se puede importar todavía.</b> ' +
      'Corrige esto y vuelve a pedirle la respuesta al modelo, o edita el JSON a mano:' +
      '<ul style="margin:8px 0 0;padding-left:18px">' +
      r.errores.map(function (e) { return '<li>' + UI.esc(e) + '</li>'; }).join('') +
      '</ul></div>';
  }

  if (r.avisos.length) {
    html += '<div class="aviso aviso-alerta mt"><b>Avisos</b> (no impiden importar):' +
      '<ul style="margin:8px 0 0;padding-left:18px">' +
      r.avisos.map(function (a) { return '<li>' + UI.esc(a) + '</li>'; }).join('') +
      '</ul></div>';
  }

  if (!r.ok) return html;

  /* Vista previa */
  var p = r.paquete;
  html += '<div class="aviso aviso-ok mt"><b>Estructura correcta.</b> Revisa la vista previa antes de importar.</div>';

  html += '<div class="previa mt">';
  if (p.area) {
    html += '<div class="fila"><div style="font-size:1.3rem">' + p.area.icono + '</div>' +
      '<div class="crece"><div class="titulo">Área nueva: ' + UI.esc(p.area.nombre) + '</div>' +
      '<div class="sub">' + UI.esc(p.area.resumen) + '</div></div></div>';
  } else {
    var ae = TUTOR.area(p.areaId);
    html += '<div class="fila"><div class="crece"><div class="titulo">Se añade al área ' +
      (ae ? ae.icono + ' ' + UI.esc(ae.nombre) : UI.esc(p.areaId)) + '</div></div></div>';
  }
  if (p.modulo) {
    html += '<div class="fila"><div class="crece"><div class="titulo">Módulo nuevo: ' +
      UI.esc(p.modulo.nombre) + '</div></div></div>';
  }

  p.temas.forEach(function (t) {
    html += '<div class="fila"><div class="crece">' +
      '<div class="titulo">' + UI.esc(t.nombre) + (t.alto ? ' <span class="etiq etiq-fuego">🔥</span>' : '') + '</div>' +
      '<div class="sub">' + t.bloques.length + ' bloques · ' + t.preguntas.length + ' preguntas · ' +
      t.caso.pasos.length + ' pasos de caso · ' + t.tarjetas.length + ' tarjetas' +
      (t.mcq && t.mcq.length ? ' · ' + t.mcq.length + ' de alternativa' : '') +
      ' · ' + t.minutos + ' min</div>' +
      (t.fuentes ? '<div class="sub">Fuentes: ' + UI.esc(t.fuentes) + '</div>' : '') +
      '</div></div>';
    html += '<div class="previa-idea">' + UI.esc(t.ideaCentral) + '</div>';
  });
  html += '</div>';

  html += '<div class="linea fin mt">' +
    '<button class="btn btn-primario btn-g" data-accion="taller-importar">Importar al temario</button></div>';

  return html;
}

UI.accion('taller-importar', function () {
  var r = TallerEstado.validacion;
  if (!r || !r.ok) { UI.brindis('Valida primero la respuesta'); return; }

  Taller.importar(r.paquete);
  var n = r.paquete.temas.length;
  TallerEstado.validacion = null;
  TallerEstado.prompt = '';
  UI.ir('temario');
  UI.brindis(n + (n === 1 ? ' tema importado' : ' temas importados') + ' · marcados sin verificar');
});

UI.accion('taller-verificar', function (d) {
  Estado.verificarTema(d.tema);
  UI.refrescar();
  UI.brindis('Tema marcado como verificado');
});

UI.accion('taller-eliminar', function (d) {
  var t = TUTOR.tema(d.tema);
  UI.modal('<h3>Eliminar «' + UI.esc(t ? t.nombre : d.tema) + '»</h3>' +
    '<p>Se borrarán el tema, sus tarjetas y el progreso asociado. No afecta al resto del temario.</p>' +
    '<div class="linea fin mt"><button class="btn btn-fantasma" data-accion="cerrar-modal">Cancelar</button>' +
    '<button class="btn btn-acento" data-accion="taller-eliminar-confirmar" data-tema="' + d.tema + '">Eliminar</button></div>');
});

UI.accion('taller-eliminar-confirmar', function (d) {
  Estado.eliminarTema(d.tema);
  for (var i = TUTOR.TEMAS.length - 1; i >= 0; i--) {
    if (TUTOR.TEMAS[i].id === d.tema) TUTOR.TEMAS.splice(i, 1);
  }
  Estado.generarPlan(14);
  UI.cerrarModal();
  UI.refrescar();
  UI.brindis('Tema eliminado');
});

/* --- datos --- */
UI.accion('exportar', function () {
  copiarTexto(Estado.exportar());
  UI.modal('<h3>Progreso exportado</h3>' +
    '<p class="sm tenue">Se ha copiado al portapapeles en formato JSON. Guárdalo donde quieras; ' +
    'podrás recuperarlo con «Importar», también tras migrar la app a Apps Script.</p>' +
    '<textarea readonly style="min-height:200px;font-family:var(--mono);font-size:.75rem">' +
    UI.esc(Estado.exportar()) + '</textarea>' +
    '<div class="linea fin mt"><button class="btn btn-primario" data-accion="cerrar-modal">Cerrar</button></div>');
});

UI.accion('importar', function () {
  UI.modal('<h3>Importar progreso</h3>' +
    '<p class="sm tenue">Pega aquí el JSON exportado previamente. Se sustituirá todo tu progreso actual.</p>' +
    '<textarea id="json-importar" style="min-height:200px;font-family:var(--mono);font-size:.75rem" placeholder="{ … }"></textarea>' +
    '<div class="linea fin mt"><button class="btn btn-fantasma" data-accion="cerrar-modal">Cancelar</button>' +
    '<button class="btn btn-primario" data-accion="confirmar-importar">Importar</button></div>');
});

UI.accion('confirmar-importar', function () {
  var ok = Estado.importar(UI.$('#json-importar').value);
  UI.cerrarModal();
  UI.brindis(ok ? 'Progreso importado' : 'El JSON no es válido');
  if (ok) { UI.aplicarTema(Estado.ajustes().tema); UI.ir('inicio'); }
});

UI.accion('reiniciar', function () {
  UI.modal('<h3>Reiniciar todo</h3>' +
    '<p>Se borrarán el progreso, las tarjetas, el plan y las brechas registradas. Esta acción no se puede deshacer.</p>' +
    '<div class="linea fin mt"><button class="btn btn-fantasma" data-accion="cerrar-modal">Cancelar</button>' +
    '<button class="btn btn-acento" data-accion="confirmar-reiniciar">Sí, reiniciar</button></div>');
});

UI.accion('confirmar-reiniciar', function () {
  Estado.reiniciar();
  UI.cerrarModal();
  UI.aplicarTema(Estado.ajustes().tema);
  UI.ir('inicio');
  UI.brindis('Progreso reiniciado');
});

UI.accion('cerrar-modal', function () { UI.cerrarModal(); });

/* ------------------------------------------------------------
   Feynman: registrar brechas al avanzar de fase
   ------------------------------------------------------------ */
(function interceptarFeynman() {
  var avanzarOriginal = Sesion.avanzar;
  Sesion.avanzar = function () {
    if (Sesion.activa()) {
      var s = Sesion.datos();
      if (s.fases[s.indice].id === 'feynman') {
        var casillas = UI.$$('.chk-feynman');
        if (casillas.length) {
          var noMarcados = [];
          casillas.forEach(function (c) {
            if (!c.checked) noMarcados.push(parseInt(c.dataset.i, 10));
          });
          Sesion.registrarBrechasFeynman(noMarcados);
          if (noMarcados.length) {
            UI.brindis(noMarcados.length + ' brecha(s) registrada(s) para tu próximo repaso');
          }
        }
      }
    }
    avanzarOriginal();
  };
})();

/* ------------------------------------------------------------
   ARRANQUE
   ------------------------------------------------------------ */
function arrancar() {
  Estado.iniciar().then(function () {
    UI.aplicarTema(Estado.ajustes().tema);
    /* Se guarda copia del temario de fábrica ANTES de incorporar
       lo propio, para poder distinguir uno de otro después. */
    TUTOR.congelarBase();
    /* El contenido creado en el Taller vive en el estado guardado:
       se reincorpora al temario antes de pintar nada. */
    Taller.registrarGuardado();
    if (Estado.ajustes().temarioBase === false) TUTOR.quitarBase();
    sincronizarAreasActivas();
    pintarNavegacion();

    // Genera un plan inicial la primera vez.
    if (!Object.keys(Estado.plan()).length) Estado.generarPlan(14);

    UI.ir('inicio');
    UI.actualizarGlobos();
    Minerva.pintarBoton();
    Estado.suscribir(function () {
      UI.actualizarGlobos();
      Minerva.pintarBoton();
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', arrancar);
} else {
  arrancar();
}

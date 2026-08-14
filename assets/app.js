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
  { grupo: 'Organización' },
  { ruta: 'plan', icono: '🗓️', nombre: 'Plan', movil: true },
  { ruta: 'areas', icono: '🧭', nombre: 'Áreas' },
  { ruta: 'temario', icono: '📚', nombre: 'Temario' },
  { ruta: 'rendimiento', icono: '📊', nombre: 'Rendimiento', movil: true },
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
  UI.ir('preparar', { tema: s.tema });
});

UI.accion('arranque-rapido', function (d) {
  var min = parseInt(d.min, 10);
  var s = Estado.sugerencia();
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
    fuentes: (UI.$('#t-fuentes').value || '').trim()
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
});

UI.accion('taller-validar', function () {
  var bruto = UI.$('#t-json').value;
  if (!bruto.trim()) { UI.brindis('Pega primero la respuesta'); return; }

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
      t.caso.pasos.length + ' pasos de caso · ' + t.tarjetas.length + ' tarjetas · ' + t.minutos + ' min</div>' +
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
    /* El contenido creado en el Taller vive en el estado guardado:
       se reincorpora al temario antes de pintar nada. */
    Taller.registrarGuardado();
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

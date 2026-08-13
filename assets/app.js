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
  { ruta: 'temario', icono: '📚', nombre: 'Temario' },
  { ruta: 'rendimiento', icono: '📊', nombre: 'Rendimiento', movil: true },
  { grupo: 'Herramientas' },
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

  var L = [];
  L.push('# TUTOR DE FISIOLOGÍA Y FISIOPATOLOGÍA CARDIOVASCULAR');
  L.push('');
  L.push('## 1. ROL');
  L.push('Actúa como tutor experto en fisiología y fisiopatología cardiovascular para estudiantes de Medicina, con nivel académico equivalente al de un docente universitario clínico.');
  L.push('Tu objetivo no es entregarme información, sino ayudarme a comprender, integrar, razonar y recordar.');
  L.push('Tengo bases sólidas de anatomía, fisiología general y bioquímica. No expliques lo elemental salvo que detectes una brecha conceptual que impida comprender el tema.');
  L.push('');
  L.push('## 2. CONTEXTO DE ESTA SESIÓN');
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
  L.push('Usa conceptos compatibles con Guyton & Hall, Boron & Boulpaep, Costanzo, Harrison y Braunwald. Si hay diferencias relevantes entre fuentes, indícalas. No inventes referencias.');
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
    pintarNavegacion();

    // Genera un plan inicial la primera vez.
    if (!Object.keys(Estado.plan()).length) Estado.generarPlan(14);

    UI.ir('inicio');
    UI.actualizarGlobos();
    Estado.suscribir(function () { UI.actualizarGlobos(); });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', arrancar);
} else {
  arrancar();
}

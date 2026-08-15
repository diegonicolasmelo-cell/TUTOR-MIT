/* ============================================================
   NÚCLEO DE DATOS
   Módulos del temario, modos de sesión y plantilla del método.
   Todo vive en globales simples para que cada archivo pueda
   convertirse en un <?!= include(...) ?> de Apps Script.
   ============================================================ */

var TUTOR = window.TUTOR || {};
window.TUTOR = TUTOR;

/* Registro donde cada archivo de contenido deposita sus temas. */
TUTOR.TEMAS = TUTOR.TEMAS || [];
TUTOR.registrarTemas = function (lista) {
  lista.forEach(function (t) { TUTOR.TEMAS.push(t); });
};

/* ------------------------------------------------------------
   ÁREAS DEL CONOCIMIENTO
   Nivel superior del temario. Cada área agrupa módulos, y cada
   módulo agrupa temas. Se pueden activar y desactivar para
   concentrar el plan en lo que toca ahora (p. ej. un examen).
   ------------------------------------------------------------ */
TUTOR.AREAS = [
  {
    id: 'cardio',
    nombre: 'Cardiovascular',
    icono: '🫀',
    resumen: 'Hemodinamia, electrofisiología, regulación de la presión y fisiopatología clínica.',
    lema: 'Cuatro determinantes explican casi toda la patología aguda.'
  },
  {
    id: 'respiratorio',
    nombre: 'Respiratorio',
    icono: '🫁',
    resumen: 'Mecánica ventilatoria, intercambio gaseoso, transporte de gases y fallo respiratorio.',
    lema: 'Oxigenar y ventilar son dos problemas distintos con soluciones distintas.'
  },
  {
    id: 'renal',
    nombre: 'Renal y medio interno',
    icono: '⚗️',
    resumen: 'Filtrado glomerular, manejo tubular, equilibrio ácido-base, potasio y fracaso renal.',
    lema: 'El riñón defiende el volumen aunque tenga que sacrificar todo lo demás.'
  },
  {
    id: 'neuro',
    nombre: 'Neurofisiología',
    icono: '🧠',
    resumen: 'Potencial de membrana, sinapsis, perfusión cerebral, presión intracraneal y conciencia.',
    lema: 'El cráneo es una caja rígida: todo lo que entra obliga a que algo salga.'
  },
  {
    id: 'farmaco',
    nombre: 'Farmacología del paciente crítico',
    icono: '💊',
    resumen: 'Farmacocinética alterada, vasoactivos e inotrópicos, sedoanalgesia y antimicrobianos.',
    lema: 'Elige el fármaco por el receptor que quieres tocar, no por costumbre.'
  }
];

/* ------------------------------------------------------------
   MÓDULOS
   El orden define la progresión sugerida dentro de cada área.
   ------------------------------------------------------------ */
TUTOR.MODULOS = [
  /* --- Cardiovascular --- */
  {
    id: 'hemodinamia',
    area: 'cardio',
    nombre: 'Fundamentos hemodinámicos',
    icono: '🫀',
    resumen: 'Gasto cardíaco, precarga, poscarga, contractilidad y retorno venoso. Es la gramática de todo lo demás.'
  },
  {
    id: 'electro',
    area: 'cardio',
    nombre: 'Electrofisiología y ECG',
    icono: '⚡',
    resumen: 'Potencial de acción, acoplamiento excitación-contracción, génesis del ECG y arritmias.'
  },
  {
    id: 'regulacion',
    area: 'cardio',
    nombre: 'Regulación y presión arterial',
    icono: '🎚️',
    resumen: 'Barorreflejo, sistema nervioso autónomo, SRAA, resistencia vascular y perfusión coronaria.'
  },
  {
    id: 'fisiopato',
    area: 'cardio',
    nombre: 'Fisiopatología clínica',
    icono: '🩺',
    resumen: 'Isquemia, insuficiencia cardíaca, shock, hipertensión y valvulopatías desde el mecanismo.'
  },

  /* --- Respiratorio --- */
  {
    id: 'mecanica-vent',
    area: 'respiratorio',
    nombre: 'Mecánica e intercambio',
    icono: '🌬️',
    resumen: 'Presiones, compliance, resistencia, relación ventilación-perfusión y transporte de gases.'
  },
  {
    id: 'fallo-resp',
    area: 'respiratorio',
    nombre: 'Insuficiencia respiratoria',
    icono: '🆘',
    resumen: 'Los cinco mecanismos de hipoxemia, el fallo ventilatorio, el SDRA y la ventilación mecánica.'
  },

  /* --- Renal y medio interno --- */
  {
    id: 'funcion-renal',
    area: 'renal',
    nombre: 'Función renal',
    icono: '💧',
    resumen: 'Filtrado glomerular, autorregulación, manejo tubular del sodio y del agua.'
  },
  {
    id: 'medio-interno',
    area: 'renal',
    nombre: 'Medio interno',
    icono: '⚖️',
    resumen: 'Equilibrio ácido-base con enfoque sistemático, potasio y fracaso renal agudo.'
  },

  /* --- Neurofisiología --- */
  {
    id: 'neurofisio',
    area: 'neuro',
    nombre: 'Excitabilidad y sinapsis',
    icono: '⚡',
    resumen: 'Potencial de membrana, conducción del impulso y transmisión sináptica.'
  },
  {
    id: 'neuro-critico',
    area: 'neuro',
    nombre: 'Perfusión cerebral y conciencia',
    icono: '🧠',
    resumen: 'Doctrina de Monro-Kellie, presión intracraneal, autorregulación cerebral y coma.'
  },

  /* --- Farmacología crítica --- */
  {
    id: 'farmaco-critico',
    area: 'farmaco',
    nombre: 'Fármacos en el paciente crítico',
    icono: '💉',
    resumen: 'Farmacocinética alterada, vasoactivos, inotrópicos y sedoanalgesia razonada.'
  }
];

/* ------------------------------------------------------------
   MODOS DE SESIÓN
   Cada modo reparte el tiempo entre las fases del método.
   `pesos` = proporción del tiempo total por fase.
   `niveles` = qué profundidad de contenido se muestra.
   ------------------------------------------------------------ */
TUTOR.MODOS = [
  {
    id: 'comprender',
    nombre: 'Comprender',
    icono: '🧠',
    descripcion: 'Construir el mecanismo desde cero y anclarlo con un caso.',
    niveles: ['imprescindible', 'importante'],
    fases: ['anclaje', 'comprension', 'feynman', 'recuperacion', 'caso', 'consolidacion'],
    pesos: { anclaje: 8, comprension: 30, feynman: 18, recuperacion: 18, caso: 18, consolidacion: 8 }
  },
  {
    id: 'repaso',
    nombre: 'Repaso rápido',
    icono: '⚡',
    descripcion: 'Conceptos esenciales, errores frecuentes y perlas. Unos 10 minutos.',
    niveles: ['imprescindible'],
    fases: ['anclaje', 'comprension', 'recuperacion', 'consolidacion'],
    pesos: { anclaje: 15, comprension: 35, recuperacion: 35, consolidacion: 15 }
  },
  {
    id: 'examen',
    nombre: 'Modo examen',
    icono: '🎯',
    descripcion: 'Sin explicación previa: preguntas progresivas y corrección razonada.',
    niveles: ['imprescindible'],
    fases: ['recuperacion', 'caso', 'consolidacion'],
    pesos: { recuperacion: 50, caso: 38, consolidacion: 12 }
  },
  {
    id: 'intensivo',
    nombre: 'Tutor intensivo',
    icono: '🔥',
    descripcion: 'Rendimiento máximo en 30–60 min: explicar, detectar brechas, corregir y aplicar.',
    niveles: ['imprescindible', 'importante', 'complementario'],
    fases: ['anclaje', 'comprension', 'feynman', 'recuperacion', 'caso', 'consolidacion'],
    pesos: { anclaje: 6, comprension: 26, feynman: 16, recuperacion: 20, caso: 24, consolidacion: 8 }
  },
  {
    id: 'profundizar',
    nombre: 'Profundización',
    icono: '🔬',
    descripcion: 'Mecanismos celulares, receptores, curvas y electrofisiología fina.',
    niveles: ['imprescindible', 'importante', 'complementario'],
    fases: ['comprension', 'feynman', 'recuperacion', 'caso', 'consolidacion'],
    pesos: { comprension: 42, feynman: 16, recuperacion: 16, caso: 18, consolidacion: 8 }
  }
];

/* ------------------------------------------------------------
   FASES DEL MÉTODO
   El esqueleto pedagógico: pre-test → comprensión → Feynman →
   recuperación activa → razonamiento clínico → consolidación.
   ------------------------------------------------------------ */
TUTOR.FASES = {
  anclaje: {
    nombre: 'Anclaje',
    icono: '🎣',
    lema: 'Intenta responder ANTES de leer. Fallar aquí prepara al cerebro para aprender.',
    principio: 'Efecto de pretest: intentar recuperar algo que aún no sabes mejora la codificación posterior.'
  },
  comprension: {
    nombre: 'Comprensión',
    icono: '📐',
    lema: 'Mecanismo, no lista. Cada flecha debe tener una causa.',
    principio: 'Fisiología normal → variable que cambia → por qué cambia → compensación → consecuencia → clínica.'
  },
  feynman: {
    nombre: 'Técnica Feynman',
    icono: '✍️',
    lema: 'Explícalo con tus palabras, sin mirar. Donde te trabes está tu brecha.',
    principio: 'La fluidez al leer no es comprensión. Solo la producción activa revela los huecos.'
  },
  recuperacion: {
    nombre: 'Recuperación activa',
    icono: '🔁',
    lema: 'Responde primero, revela después. Sé honesto al autoevaluarte.',
    principio: 'El esfuerzo de recuperar —no la relectura— es lo que consolida la memoria.'
  },
  caso: {
    nombre: 'Razonamiento clínico',
    icono: '🩺',
    lema: '¿Qué variable cambió primero? Sigue la cadena hasta el síntoma.',
    principio: 'Transferencia: el conocimiento solo sirve si sobrevive al contexto de un paciente real.'
  },
  consolidacion: {
    nombre: 'Consolidación',
    icono: '📌',
    lema: 'Error frecuente, perla de examen y tarjetas al mazo para el repaso espaciado.',
    principio: 'Cerrar la sesión programando el olvido: la próxima revisión se agenda sola.'
  }
};

/* ------------------------------------------------------------
   NIVELES DE PRIORIDAD (modo "poco tiempo")
   ------------------------------------------------------------ */
TUTOR.NIVELES = {
  imprescindible: { nombre: 'Imprescindible', clase: 'etiq-acento', orden: 1 },
  importante: { nombre: 'Importante', clase: 'etiq-info', orden: 2 },
  complementario: { nombre: 'Complementario', clase: 'etiq', orden: 3 }
};

/* ------------------------------------------------------------
   AJUSTES POR DEFECTO
   Pensados para el perfil de Diego: profesional de UCI, familia,
   poco tiempo, bases sólidas y pacientes reales a mano.
   ------------------------------------------------------------ */
/* ------------------------------------------------------------
   TEMARIO DE FÁBRICA: QUITARLO Y DEVOLVERLO
   ------------------------------------------------------------
   Los 32 temas de fisiología no están en los datos del usuario:
   están en el código, en los archivos datos-*.js. Por eso
   «Reiniciar todo» no los hacía desaparecer, y quien quiera usar
   la app para otra materia se los encontraba de vuelta en cada
   arranque.

   La solución no es borrar archivos —eso sería tocar código, no
   usar la app— sino apartarlos del registro en memoria. Se
   guarda una copia al arrancar, antes de incorporar el contenido
   propio, de modo que la decisión es reversible: si mañana los
   quiere de vuelta, siguen intactos en el paquete.
   ------------------------------------------------------------ */
TUTOR.BASE = null;

TUTOR.congelarBase = function () {
  if (TUTOR.BASE) return;          /* solo la primera vez */
  TUTOR.BASE = {
    areas: TUTOR.AREAS.slice(),
    modulos: TUTOR.MODULOS.slice(),
    temas: TUTOR.TEMAS.slice(),
    mcq: JSON.parse(JSON.stringify(TUTOR.MCQ || {}))
  };
};

/* Qué es «de fábrica» se decide por la copia congelada, no por
   la marca «propio» de cada objeto. Es más fiable: la marca
   depende de que el importador la ponga bien en las tres
   entidades, y el contenido que ya esté guardado de antes no se
   puede corregir a posteriori. La copia, en cambio, es por
   definición exactamente lo que traía la app. */
function enBase_(lista, x) {
  for (var i = 0; i < lista.length; i++) if (lista[i].id === x.id) return true;
  return false;
}

TUTOR.hayBase = function () {
  if (!TUTOR.BASE) return true;
  return TUTOR.TEMAS.some(function (t) { return enBase_(TUTOR.BASE.temas, t); });
};

TUTOR.quitarBase = function () {
  if (!TUTOR.BASE) return;
  var b = TUTOR.BASE;
  TUTOR.AREAS = TUTOR.AREAS.filter(function (a) { return !enBase_(b.areas, a); });
  TUTOR.MODULOS = TUTOR.MODULOS.filter(function (m) { return !enBase_(b.modulos, m); });
  TUTOR.TEMAS = TUTOR.TEMAS.filter(function (t) { return !enBase_(b.temas, t); });
  /* Las alternativas de fábrica se registran aparte, en un mapa
     por tema: hay que retirarlas también o el examen seguiría
     preguntando por temas que ya no existen. */
  var vivos = {};
  TUTOR.TEMAS.forEach(function (t) { vivos[t.id] = true; });
  Object.keys(TUTOR.MCQ).forEach(function (id) {
    if (!vivos[id]) delete TUTOR.MCQ[id];
  });
};

TUTOR.restaurarBase = function () {
  if (!TUTOR.BASE) return;
  var b = TUTOR.BASE;
  b.areas.forEach(function (a) { if (!TUTOR.area(a.id)) TUTOR.AREAS.push(a); });
  b.modulos.forEach(function (m) { if (!TUTOR.modulo(m.id)) TUTOR.MODULOS.push(m); });
  b.temas.forEach(function (t) { if (!TUTOR.tema(t.id)) TUTOR.TEMAS.push(t); });
  Object.keys(b.mcq).forEach(function (id) {
    if (!TUTOR.MCQ[id]) TUTOR.MCQ[id] = b.mcq[id];
  });
};

TUTOR.AJUSTES_DEFECTO = {
  nombre: 'Diego',
  tema: 'auto',
  temarioBase: true,
  areasActivas: TUTOR.AREAS.map(function (a) { return a.id; }),
  asistente: true,
  minutosPorDia: { 0: 30, 1: 25, 2: 25, 3: 25, 4: 25, 5: 20, 6: 45 }, // 0 = domingo
  objetivoDiario: 25,
  maxTarjetasDia: 40,
  tarjetasNuevasDia: 8,
  recordarTurnos: true,
  primerDiaSemana: 1
};

/* ------------------------------------------------------------
   PARÁMETROS DEL ALGORITMO DE REPETICIÓN ESPACIADA (SM-2)
   ------------------------------------------------------------ */
TUTOR.SRS = {
  facilidadInicial: 2.5,
  facilidadMinima: 1.3,
  primerIntervalo: 1,
  segundoIntervalo: 6,
  penalizacionFallo: 0.2,
  multiplicadorDificil: 1.2,
  multiplicadorFacil: 1.3,
  intervaloMaximo: 240
};

/* ------------------------------------------------------------
   UMBRALES DE DOMINIO
   ------------------------------------------------------------ */
TUTOR.DOMINIO = [
  { min: 0, etiqueta: 'Sin tocar', clase: 'etiq' },
  { min: 1, etiqueta: 'Frágil', clase: 'etiq-acento' },
  { min: 40, etiqueta: 'En construcción', clase: 'etiq-alerta' },
  { min: 70, etiqueta: 'Sólido', clase: 'etiq-info' },
  { min: 88, etiqueta: 'Consolidado', clase: 'etiq-ok' }
];

TUTOR.nivelDominio = function (valor) {
  var res = TUTOR.DOMINIO[0];
  TUTOR.DOMINIO.forEach(function (d) { if (valor >= d.min) res = d; });
  return res;
};

/* ------------------------------------------------------------
   BÚSQUEDAS
   ------------------------------------------------------------ */
TUTOR.tema = function (id) {
  for (var i = 0; i < TUTOR.TEMAS.length; i++) {
    if (TUTOR.TEMAS[i].id === id) return TUTOR.TEMAS[i];
  }
  return null;
};

TUTOR.modulo = function (id) {
  for (var i = 0; i < TUTOR.MODULOS.length; i++) {
    if (TUTOR.MODULOS[i].id === id) return TUTOR.MODULOS[i];
  }
  return null;
};

TUTOR.modo = function (id) {
  for (var i = 0; i < TUTOR.MODOS.length; i++) {
    if (TUTOR.MODOS[i].id === id) return TUTOR.MODOS[i];
  }
  return TUTOR.MODOS[0];
};

TUTOR.temasDe = function (idModulo) {
  return TUTOR.TEMAS.filter(function (t) { return t.modulo === idModulo; });
};

TUTOR.area = function (id) {
  for (var i = 0; i < TUTOR.AREAS.length; i++) {
    if (TUTOR.AREAS[i].id === id) return TUTOR.AREAS[i];
  }
  return null;
};

TUTOR.modulosDe = function (idArea) {
  return TUTOR.MODULOS.filter(function (m) { return m.area === idArea; });
};

/* Área a la que pertenece un tema, a través de su módulo. */
TUTOR.areaDeTema = function (idTema) {
  var t = TUTOR.tema(idTema);
  if (!t) return null;
  var m = TUTOR.modulo(t.modulo);
  return m ? m.area : null;
};

TUTOR.temasDeArea = function (idArea) {
  return TUTOR.TEMAS.filter(function (t) {
    var m = TUTOR.modulo(t.modulo);
    return m && m.area === idArea;
  });
};

/* ------------------------------------------------------------
   BANCO DE PREGUNTAS DE ALTERNATIVA
   Se guarda aparte del temario para poder ampliarlo sin tocar
   el contenido, y porque los temas creados en el Taller traen
   las suyas dentro del propio tema.
   ------------------------------------------------------------ */
TUTOR.MCQ = TUTOR.MCQ || {};

TUTOR.registrarMCQ = function (mapa) {
  Object.keys(mapa).forEach(function (idTema) {
    TUTOR.MCQ[idTema] = (TUTOR.MCQ[idTema] || []).concat(mapa[idTema]);
  });
};

/* Preguntas de alternativa de un tema, vengan del banco o del
   propio tema (contenido creado por el usuario). */
TUTOR.mcqDe = function (idTema) {
  var t = TUTOR.tema(idTema);
  var propias = (t && t.mcq) ? t.mcq : [];
  return (TUTOR.MCQ[idTema] || []).concat(propias);
};

TUTOR.temasConMcq = function () {
  return TUTOR.TEMAS.filter(function (t) { return TUTOR.mcqDe(t.id).length > 0; });
};

TUTOR.totalMcq = function () {
  return TUTOR.TEMAS.reduce(function (n, t) { return n + TUTOR.mcqDe(t.id).length; }, 0);
};

/* Todas las tarjetas del temario, con su tema de origen. */
TUTOR.todasLasTarjetas = function () {
  var out = [];
  TUTOR.TEMAS.forEach(function (t) {
    (t.tarjetas || []).forEach(function (c, i) {
      out.push({ id: t.id + '::' + i, tema: t.id, modulo: t.modulo, frente: c.f, dorso: c.d });
    });
  });
  return out;
};

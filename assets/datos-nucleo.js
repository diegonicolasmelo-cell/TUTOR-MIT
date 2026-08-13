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
   MÓDULOS
   El orden define la progresión sugerida del temario.
   ------------------------------------------------------------ */
TUTOR.MODULOS = [
  {
    id: 'hemodinamia',
    nombre: 'Fundamentos hemodinámicos',
    icono: '🫀',
    resumen: 'Gasto cardíaco, precarga, poscarga, contractilidad y retorno venoso. Es la gramática de todo lo demás.'
  },
  {
    id: 'electro',
    nombre: 'Electrofisiología y ECG',
    icono: '⚡',
    resumen: 'Potencial de acción, acoplamiento excitación-contracción, génesis del ECG y arritmias.'
  },
  {
    id: 'regulacion',
    nombre: 'Regulación y presión arterial',
    icono: '🎚️',
    resumen: 'Barorreflejo, sistema nervioso autónomo, SRAA, resistencia vascular y perfusión coronaria.'
  },
  {
    id: 'fisiopato',
    nombre: 'Fisiopatología clínica',
    icono: '🩺',
    resumen: 'Isquemia, insuficiencia cardíaca, shock, hipertensión y valvulopatías desde el mecanismo.'
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
TUTOR.AJUSTES_DEFECTO = {
  nombre: 'Diego',
  tema: 'auto',
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

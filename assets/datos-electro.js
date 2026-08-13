/* ============================================================
   MÓDULO 2 — ELECTROFISIOLOGÍA Y ECG
   ============================================================ */

TUTOR.registrarTemas([

/* ---------------------------------------------------------- */
{
  id: 'potencial-accion',
  modulo: 'electro',
  nombre: 'Potencial de acción cardíaco y automatismo',
  alto: true,
  minutos: 22,
  requisitos: [],
  ideaCentral: 'Existen dos potenciales de acción cardíacos con lógicas distintas: el rápido dependiente de sodio (músculo y sistema His-Purkinje) y el lento dependiente de calcio (nódulos sinusal y AV). La meseta de calcio de la fibra rápida existe para acoplar la excitación a una contracción sostenida y para imponer un período refractario largo que impide la tetanización; la despolarización diastólica espontánea de la fibra lenta es la que fabrica el latido.',

  anclaje: {
    q: 'Antes de leer: ¿por qué el músculo esquelético puede tetanizarse y el cardíaco no? ¿Y por qué eso es imprescindible para seguir vivo?',
    pista: 'Compara la duración del potencial de acción con la duración de la contracción en cada tejido.'
  },

  bloques: [
    {
      nivel: 'imprescindible',
      titulo: 'Potencial de acción rápido (fases 0–4)',
      html: '<table><tr><th>Fase</th><th>Nombre</th><th>Corriente</th></tr>' +
        '<tr><td><b>0</b></td><td>Despolarización rápida</td><td>Entrada de Na⁺ por canales rápidos</td></tr>' +
        '<tr><td><b>1</b></td><td>Repolarización precoz</td><td>Salida transitoria de K⁺ (I<sub>to</sub>) + cierre de Na⁺</td></tr>' +
        '<tr><td><b>2</b></td><td><b>Meseta</b></td><td>Entrada de Ca²⁺ tipo L equilibrada con salida de K⁺</td></tr>' +
        '<tr><td><b>3</b></td><td>Repolarización</td><td>Salida de K⁺ (I<sub>Kr</sub>, I<sub>Ks</sub>); se cierra el Ca²⁺</td></tr>' +
        '<tr><td><b>4</b></td><td>Reposo</td><td>Estable a −90 mV por I<sub>K1</sub></td></tr></table>' +
        '<p>La <b>meseta</b> es la firma del miocardio: prolonga el potencial de acción a 200–300 ms, casi tanto como la contracción. Consecuencia: el período refractario cubre toda la sístole y <b>el corazón no puede tetanizarse</b>. Un corazón tetanizado no se llenaría y el gasto sería cero.</p>'
    },
    {
      nivel: 'imprescindible',
      titulo: 'Potencial de acción lento y automatismo',
      html: '<p>En los nódulos sinusal y AV no hay canales rápidos de Na⁺ funcionantes y el potencial de reposo es inestable (−60 mV):</p>' +
        '<ul><li><b>Fase 4 (despolarización diastólica espontánea)</b>: corriente <i>funny</i> I<sub>f</sub> (entrada de Na⁺, activada por hiperpolarización y modulada por AMPc), más corrientes de Ca²⁺ tipo T y el "reloj de calcio" del retículo sarcoplásmico. <b>Esta pendiente fabrica el ritmo.</b></li>' +
        '<li><b>Fase 0</b>: lenta, mediada por Ca²⁺ tipo L (no por Na⁺). Por eso la conducción nodal es lenta.</li></ul>' +
        '<p>Jerarquía de marcapasos: nodo sinusal 60–100/min > nodo AV 40–60 > His-Purkinje 20–40. Manda el más rápido por <b>supresión por sobreestimulación</b>.</p>' +
        '<p>🔥 Modulación autonómica: el simpático (β₁ → ↑AMPc) <b>empina</b> la fase 4 → taquicardia; el vago (M₂ → ↓AMPc y apertura de canales de K⁺ que hiperpolarizan) la <b>aplana</b> → bradicardia. La ivabradina bloquea selectivamente I<sub>f</sub>: baja la frecuencia sin tocar la contractilidad.</p>',
      cadena: ['Simpático β₁', '↑ AMPc', '↑ Pendiente fase 4', 'Umbral alcanzado antes', '↑ Frecuencia']
    },
    {
      nivel: 'importante',
      titulo: 'Períodos refractarios y su utilidad clínica',
      html: '<ul><li><b>Refractario absoluto</b>: ningún estímulo despolariza (canales de Na⁺ inactivados). Protege de la reentrada precoz.</li>' +
        '<li><b>Refractario relativo</b>: un estímulo intenso genera una respuesta lenta y de baja amplitud, que conduce mal. Aquí vive el <b>fenómeno R sobre T</b>: un extrasístole que cae en la fase vulnerable puede desencadenar fibrilación ventricular.</li></ul>' +
        '<p>La duración del potencial de acción determina el QT. Los fármacos que bloquean I<sub>Kr</sub> (antiarrítmicos clase III, muchos antibióticos y antipsicóticos) alargan el QT y facilitan pospotenciales precoces → <b>torsade de pointes</b>.</p>'
    },
    {
      nivel: 'complementario',
      titulo: 'Efecto del potasio extracelular',
      html: '<p>El potencial de reposo depende sobre todo del gradiente de K⁺ (ecuación de Nernst):</p>' +
        '<ul><li><b>Hiperpotasemia</b>: el potencial de reposo se hace menos negativo → inactiva canales de Na⁺ → conducción lenta y menor amplitud. ECG progresivo: ondas T picudas y estrechas → PR largo y P que desaparece → QRS ancho → onda sinusoidal → paro. Es una <b>emergencia eléctrica</b>: el calcio intravenoso no baja el potasio, sino que restaura el gradiente entre potencial de reposo y umbral, estabilizando la membrana en minutos.</li>' +
        '<li><b>Hipopotasemia</b>: hiperpolariza y prolonga la repolarización: onda U, QT aparentemente largo, extrasístoles y riesgo de torsade. Potencia la toxicidad digitálica.</li></ul>'
    }
  ],

  variables: [
    { n: 'Pendiente de fase 4', d: 'up', nota: 'determina la frecuencia del marcapasos' },
    { n: 'Duración del potencial de acción', d: 'up', nota: 'se traduce en el intervalo QT' },
    { n: 'Velocidad de fase 0', d: 'up', nota: 'determina la velocidad de conducción' },
    { n: 'K⁺ extracelular', d: 'up', nota: 'despolariza el reposo e inactiva canales de Na⁺' }
  ],

  fisiopatologia: '<p>Tres mecanismos generan arritmias: <b>automatismo anormal</b> (focos ectópicos por isquemia, catecolaminas, hipopotasemia), <b>actividad desencadenada</b> (pospotenciales precoces con QT largo → torsade; pospotenciales tardíos por sobrecarga de calcio → intoxicación digitálica, taquicardia catecolaminérgica) y <b>reentrada</b>, el mecanismo más frecuente.</p>' +
    '<p>La reentrada exige tres condiciones: dos vías con propiedades distintas, un <b>bloqueo unidireccional</b> en una de ellas y una conducción suficientemente lenta para que el tejido inicial haya recuperado la excitabilidad. Sobre esto se construye todo: flutter, taquicardia por reentrada nodal, WPW, taquicardia ventricular postinfarto en torno a la cicatriz.</p>',

  clinica: '<p>La lógica terapéutica se deduce del canal: los fármacos que bloquean el nodo AV (betabloqueantes, verapamilo/diltiazem, adenosina) actúan sobre tejido dependiente de <b>calcio</b>; los antiarrítmicos de clase I sobre el <b>sodio</b> del tejido rápido. La adenosina, con vida media de segundos, hiperpolariza el nodo AV y frena la conducción: corta las taquicardias que usan el nodo como parte del circuito y desenmascara las que no lo usan (flutter).</p>',

  error: {
    confunde: 'Atribuir la meseta a la entrada de sodio, o creer que el nodo sinusal usa canales rápidos de sodio.',
    parecido: 'Ambos son eventos despolarizantes y ambos ocurren "al principio" del potencial.',
    diferencia: 'La fase 0 rápida es <b>sodio</b>; la meseta (fase 2) es <b>calcio tipo L</b>. En los nódulos no hay fase 0 de sodio en absoluto: la despolarización es de calcio, por eso es lenta y por eso los calcioantagonistas y los betabloqueantes frenan el nodo AV mientras que los bloqueantes del sodio afectan al músculo y al Purkinje.',
    ejemplo: 'El verapamilo enlentece el nodo AV (tejido de calcio) y controla la respuesta ventricular de una fibrilación auricular; la flecainida (bloqueante de sodio) actúa sobre el tejido auricular y ventricular pero puede ser proarrítmica sobre miocardio cicatricial.',
    regla: 'Nódulos = calcio y lentitud. Músculo y Purkinje = sodio y velocidad. La meseta siempre es calcio.'
  },

  perla: '🔥 La meseta de calcio explica de una vez el acoplamiento excitación-contracción, la imposibilidad de tetanizar el corazón y la duración del QT. Y el potasio extracelular es el determinante del potencial de reposo: la hiperpotasemia se trata con calcio porque restaura el gradiente hacia el umbral, no porque corrija el potasio.',

  feynman: {
    consigna: 'Explica por qué la hiperpotasemia mata y por qué se administra calcio intravenoso aunque no reduzca el potasio.',
    puntos: [
      'Conecto el potasio extracelular con el potencial de reposo (Nernst)',
      'Explico que un reposo menos negativo inactiva los canales rápidos de Na⁺',
      'Deduzco la consecuencia: conducción lenta, QRS ancho, asistolia',
      'Explico que el calcio actúa sobre el potencial umbral, no sobre el potasio',
      'Menciono que hay que añadir tratamientos que sí desplacen o eliminen el K⁺'
    ],
    referencia: '<p>El potencial de reposo de la célula cardíaca lo fija casi por completo el gradiente de potasio a través de la membrana. Si sube el potasio extracelular, el gradiente se estrecha y el potencial de reposo se vuelve <b>menos negativo</b> (por ejemplo, de −90 a −70 mV).</p>' +
      '<p>Un reposo despolarizado mantiene una proporción creciente de canales rápidos de sodio en estado <b>inactivado</b>, porque su recuperación depende del voltaje. Con menos canales disponibles, la fase 0 pierde velocidad y amplitud: la conducción se enlentece por todo el corazón. Eso es exactamente lo que se ve en el ECG en la secuencia clásica: primero ondas T picudas y estrechas (repolarización acelerada), luego alargamiento del PR y desaparición de la onda P (la aurícula deja de despolarizarse), después ensanchamiento progresivo del QRS, fusión del QRS con la T en una onda sinusoidal y finalmente asistolia o fibrilación ventricular.</p>' +
      '<p>El <b>calcio intravenoso</b> no modifica la concentración de potasio ni el potencial de reposo: lo que hace es desplazar el <b>potencial umbral</b> hacia valores menos negativos. Al alejar el umbral del reposo despolarizado, restaura una diferencia de trabajo funcional entre ambos y devuelve excitabilidad y velocidad de conducción a la membrana. Es una estabilización puramente electrofisiológica, actúa en minutos y dura poco (30–60 minutos).</p>' +
      '<p>Por eso el calcio es solo el primer paso y nunca el tratamiento completo: hay que añadir medidas que <b>desplacen</b> el potasio al interior celular (insulina con glucosa, betaagonistas inhalados, bicarbonato si hay acidosis) y medidas que lo <b>eliminen</b> del organismo (diuréticos, resinas o quelantes, y diálisis si el fallo renal lo exige). Confundir estabilizar con corregir es un error letal.</p>'
  },

  preguntas: [
    { nivel: 1, q: '¿Qué corriente iónica genera la fase 0 del potencial de acción del músculo ventricular y cuál la del nodo sinusal?', r: 'En el músculo, entrada rápida de Na⁺. En el nodo sinusal, entrada de Ca²⁺ tipo L (no hay canales rápidos de Na⁺ funcionantes), por eso su fase 0 es lenta.' },
    { nivel: 1, q: '¿Qué corriente es responsable de la despolarización diastólica espontánea?', r: 'La corriente funny I_f (entrada de Na⁺ activada por hiperpolarización y modulada por AMPc), junto a corrientes de Ca²⁺ tipo T y la liberación rítmica de calcio del retículo. Es la diana de la ivabradina.' },
    { nivel: 1, q: 'Enumera la jerarquía de marcapasos con sus frecuencias intrínsecas.', r: 'Nodo sinusal 60–100/min, nodo AV 40–60/min, sistema His-Purkinje 20–40/min. Domina el más rápido por supresión por sobreestimulación.' },
    { nivel: 2, q: '¿Por qué el corazón no puede tetanizarse y por qué es vital?', r: 'Porque la meseta de calcio prolonga el potencial de acción (200–300 ms) de modo que el período refractario cubre casi toda la contracción: un nuevo estímulo no encuentra tejido excitable hasta que la fibra se ha relajado. Es vital porque un corazón tetanizado no se llenaría en diástole y el gasto cardíaco sería cero.' },
    { nivel: 2, q: '¿Cómo modifica el sistema autónomo la frecuencia a nivel de membrana?', r: 'El simpático (β₁ → ↑AMPc) aumenta I_f y las corrientes de calcio, empinando la pendiente de fase 4: se alcanza antes el umbral. El vago (M₂ → ↓AMPc y apertura de canales de K⁺ acetilcolina-dependientes) hiperpolariza y aplana la fase 4.' },
    { nivel: 2, q: '¿Qué tres condiciones exige una reentrada?', r: 'Dos vías con propiedades electrofisiológicas distintas, un bloqueo unidireccional en una de ellas y una conducción suficientemente lenta para que el tejido de origen recupere la excitabilidad antes de que el frente regrese.' },
    { nivel: 3, q: 'Paciente en diálisis que no acudió a su sesión, con ECG que muestra QRS de 180 ms, ausencia de onda P y ondas T picudas. ¿Qué haces primero y por qué?', r: 'Calcio intravenoso inmediato. El cuadro es hiperpotasemia severa con inestabilidad de membrana inminente. El calcio no baja el potasio: desplaza el potencial umbral y restablece la diferencia funcional respecto de un potencial de reposo despolarizado, devolviendo velocidad de conducción. Actúa en minutos y dura poco, así que en paralelo hay que desplazar el potasio al interior (insulina-glucosa, betaagonistas) y eliminarlo (diálisis urgente en este caso).' },
    { nivel: 3, q: 'Una paciente recibe un antiemético y un antibiótico y desarrolla una taquicardia ventricular polimórfica con QT largo previo. Explica el mecanismo electrofisiológico completo.', r: 'Ambos fármacos bloquean la corriente rectificadora tardía rápida de potasio (I_Kr, canal hERG), prolongando la fase 3 y por tanto la duración del potencial de acción y el QT. Ese alargamiento permite la reactivación de canales de calcio tipo L durante la fase 3, generando <b>pospotenciales precoces</b> que, si alcanzan el umbral, disparan extrasístoles. Como la prolongación no es homogénea en todas las capas del miocardio (el M-cell prolonga más), aumenta la dispersión transmural de la repolarización, creando el sustrato para reentrada funcional: torsade de pointes. La hipopotasemia y la hipomagnesemia lo agravan porque también prolongan la repolarización, y el tratamiento es magnesio, corregir electrolitos, retirar los fármacos y aumentar la frecuencia (que acorta el QT).' }
  ],

  caso: {
    vineta: 'Varón de 72 años con fibrilación auricular crónica en tratamiento con digoxina, que consulta por náuseas y visión amarillenta. Creatinina elevada respecto a controles previos. ECG: bradicardia con extrasístoles ventriculares frecuentes y descenso del ST "en cubeta". K⁺ 3,1 mEq/L.',
    pasos: [
      { q: '¿Cuál es el mecanismo de acción de la digoxina y qué explica su toxicidad?', pista: 'Bomba y gradiente.', r: 'Inhibe la Na⁺/K⁺-ATPasa, aumentando el Na⁺ intracelular, lo que reduce el gradiente que impulsa el intercambiador Na⁺/Ca²⁺ y hace que se acumule Ca²⁺ intracelular: efecto inotrópico positivo. Además aumenta el tono vagal, frenando el nodo AV. La toxicidad surge del mismo mecanismo llevado al exceso: la sobrecarga de calcio genera pospotenciales tardíos y actividad desencadenada.' },
      { q: '¿Por qué la hipopotasemia agrava la toxicidad digitálica?', pista: 'Competencia por el sitio de unión.', r: 'Porque el potasio y la digoxina compiten por el mismo sitio de unión en la Na⁺/K⁺-ATPasa. Con potasio bajo, hay menos competencia y la digoxina se une más: aumenta el efecto a igual concentración plasmática. Por eso un paciente puede estar intoxicado con niveles "terapéuticos" si está hipopotasémico, y por eso la corrección del potasio es parte del tratamiento.' },
      { q: '¿Por qué la insuficiencia renal precipitó el cuadro?', pista: 'Eliminación del fármaco.', r: 'La digoxina se elimina fundamentalmente por vía renal y tiene un margen terapéutico estrecho. Al caer el filtrado glomerular se acumula. Es el escenario típico: paciente anciano estable durante años que se deteriora al aparecer un deterioro renal, a menudo por deshidratación o por un fármaco añadido.' },
      { q: 'La bradicardia y las extrasístoles ventriculares parecen contradictorias. ¿Cómo conviven?', pista: 'Dos mecanismos distintos, uno vagal y otro celular.', r: 'Perfectamente, y es la firma de la intoxicación digitálica: por un lado el <b>aumento del tono vagal</b> frena el nodo sinusal y el AV produciendo bradicardia y bloqueos; por otro, la <b>sobrecarga de calcio</b> en el miocardio ventricular genera pospotenciales tardíos y automatismo ectópico. La combinación clásica es "taquiarritmia auricular con bloqueo AV", una coexistencia que en otro contexto sería contradictoria.' },
      { q: 'El descenso del ST "en cubeta". ¿Es isquemia?', pista: 'Efecto vs toxicidad.', r: 'No. Es el <b>efecto digitálico</b>, un cambio de la repolarización que aparece con dosis terapéuticas y no indica intoxicación ni isquemia. Distinguir el efecto (cambios en el ST-T, PR ligeramente largo) de la toxicidad (arritmias, síntomas digestivos y visuales) es un clásico de examen.' }
    ],
    cierre: 'La intoxicación digitálica es electrofisiología aplicada: una sola diana molecular explica el inotropismo, la bradicardia vagal, la ectopia por calcio y la interacción con el potasio.'
  },

  tarjetas: [
    { f: 'Fases del potencial de acción rápido y sus corrientes', d: '0: Na⁺ rápido. 1: I_to (K⁺ transitorio). 2: MESETA, Ca²⁺ tipo L vs K⁺. 3: K⁺ (I_Kr, I_Ks). 4: reposo −90 mV por I_K1.' },
    { f: '¿Por qué el corazón no puede tetanizarse?', d: 'La meseta de calcio prolonga el PA a 200–300 ms, de modo que el período refractario cubre casi toda la contracción. Sin ello no habría diástole y el gasto sería cero.' },
    { f: 'Corriente responsable del automatismo del nodo sinusal', d: 'I_f ("funny", entrada de Na⁺ activada por hiperpolarización, modulada por AMPc) + Ca²⁺ tipo T + reloj de calcio. Diana de la ivabradina (baja la FC sin tocar la contractilidad).' },
    { f: 'Efecto autonómico sobre la fase 4', d: 'Simpático β₁ → ↑AMPc → empina la fase 4 → taquicardia. Vago M₂ → ↓AMPc + apertura de canales de K⁺ → hiperpolariza y aplana la fase 4 → bradicardia.' },
    { f: 'Secuencia ECG de la hiperpotasemia', d: 'T picudas y estrechas → PR largo y pérdida de la onda P → QRS ancho → onda sinusoidal → asistolia/FV. Causa: reposo despolarizado que inactiva los canales de Na⁺.' },
    { f: '¿Por qué se da calcio en la hiperpotasemia si no baja el K⁺?', d: 'Desplaza el potencial UMBRAL, restaurando la diferencia funcional respecto a un reposo despolarizado. Estabiliza la membrana en minutos, dura 30–60 min. Hay que añadir desplazamiento (insulina, betaagonistas) y eliminación (diálisis).' },
    { f: 'Tres condiciones para una reentrada', d: 'Dos vías con propiedades distintas + bloqueo unidireccional + conducción lo bastante lenta para que el tejido inicial recupere excitabilidad.' },
    { f: 'Mecanismo de la torsade de pointes', d: 'Bloqueo de I_Kr → ↑duración del PA y QT → pospotenciales precoces por reactivación de canales de Ca²⁺ en fase 3 → dispersión transmural de la repolarización → reentrada funcional. Tratamiento: magnesio, corregir K⁺, retirar fármacos, acelerar la FC.' }
  ]
},

/* ---------------------------------------------------------- */
{
  id: 'acoplamiento-ec',
  modulo: 'electro',
  nombre: 'Acoplamiento excitación-contracción',
  alto: false,
  minutos: 16,
  requisitos: ['potencial-accion'],
  ideaCentral: 'El calcio que entra por los canales tipo L durante la meseta no es suficiente para contraer: actúa como gatillo que libera un depósito mucho mayor desde el retículo sarcoplásmico. Ese mecanismo de liberación de calcio inducida por calcio es lo que hace que la fuerza del corazón sea graduable, y explica por qué casi todos los inotrópicos y casi todas las formas de disfunción convergen sobre el manejo del calcio.',

  anclaje: {
    q: 'Sin mirar: ¿por qué el músculo cardíaco necesita calcio extracelular para contraerse y el esquelético prácticamente no?',
    pista: 'Piensa en qué acopla el túbulo T con el retículo sarcoplásmico en cada tejido.'
  },

  bloques: [
    {
      nivel: 'imprescindible',
      titulo: 'La secuencia',
      html: '<ol><li>El potencial de acción viaja por el sarcolema y penetra por los <b>túbulos T</b>.</li>' +
        '<li>Se abren los canales de Ca²⁺ <b>tipo L</b> (dihidropiridínicos): entra una pequeña cantidad de calcio (fase 2).</li>' +
        '<li>Ese calcio activa los <b>receptores de rianodina (RyR2)</b> del retículo sarcoplásmico: <b>liberación de calcio inducida por calcio</b>. Se libera una cantidad 10 veces mayor.</li>' +
        '<li>El Ca²⁺ se une a la <b>troponina C</b> → la tropomiosina se desplaza → se exponen los sitios de unión de la actina → ciclo de puentes cruzados con hidrólisis de ATP → contracción.</li>' +
        '<li><b>Relajación</b>: la <b>SERCA2a</b> recaptura ~70 % del calcio al retículo (regulada por el fosfolambano), el <b>intercambiador Na⁺/Ca²⁺</b> expulsa ~28 % y bombas menores el resto.</li></ol>' +
        '<p>🔥 La relajación es un proceso <b>activo y dependiente de ATP</b>. Por eso la isquemia produce disfunción diastólica <b>antes</b> que sistólica: relajar cuesta energía.</p>',
      cadena: ['Potencial de acción', 'Túbulo T', 'Ca²⁺ tipo L (gatillo)', 'RyR2 del retículo', 'Ca²⁺ masivo', 'Troponina C', 'Contracción']
    },
    {
      nivel: 'importante',
      titulo: 'Dónde actúa cada fármaco',
      html: '<table><tr><th>Fármaco</th><th>Diana</th><th>Efecto</th></tr>' +
        '<tr><td>Catecolaminas / dobutamina</td><td>β₁ → AMPc → PKA</td><td>↑ entrada de Ca²⁺, ↑ recaptura (lusitropía)</td></tr>' +
        '<tr><td>Milrinona</td><td>Fosfodiesterasa 3</td><td>↑ AMPc sin pasar por el receptor β (útil si hay desensibilización o betabloqueo)</td></tr>' +
        '<tr><td>Digoxina</td><td>Na⁺/K⁺-ATPasa</td><td>↑ Na⁺ intracelular → ↓ intercambio Na/Ca → ↑ Ca²⁺</td></tr>' +
        '<tr><td>Levosimendán</td><td>Sensibiliza la troponina C</td><td>↑ fuerza sin aumentar el Ca²⁺ ni el consumo de O₂</td></tr>' +
        '<tr><td>Calcioantagonistas</td><td>Canal tipo L</td><td>↓ entrada de Ca²⁺ → ↓ contractilidad y ↓ conducción nodal</td></tr></table>'
    },
    {
      nivel: 'complementario',
      titulo: 'Por qué falla en la insuficiencia cardíaca',
      html: '<ul><li><b>SERCA2a disminuida</b>: la recaptura es más lenta → relajación deficiente y menos calcio almacenado para el siguiente latido.</li>' +
        '<li><b>RyR2 hiperfosforilados y "con fuga"</b>: pierden calcio durante la diástole, lo que reduce el contenido del depósito y genera pospotenciales tardíos (arritmias).</li>' +
        '<li><b>Desorganización de los túbulos T</b>: los canales L y los RyR2 pierden su vecindad, con lo que el gatillo se vuelve ineficiente.</li></ul>' +
        '<p>El resultado es un corazón que se contrae peor, se relaja peor y arritmiza más, todo desde un mismo defecto de manejo del calcio.</p>'
    }
  ],

  variables: [
    { n: 'Ca²⁺ gatillo (tipo L)', d: 'up', nota: 'inicia la liberación' },
    { n: 'Ca²⁺ liberado del retículo', d: 'up', nota: '~90 % del calcio contráctil' },
    { n: 'Actividad de SERCA2a', d: 'up', nota: 'determina la velocidad de relajación' },
    { n: 'ATP disponible', d: 'up', nota: 'la relajación es activa: la isquemia la afecta primero' }
  ],

  fisiopatologia: '<p>La isquemia interrumpe la producción de ATP y la relajación falla antes que la contracción, lo que eleva la presión telediastólica y produce disnea como primer síntoma en muchos pacientes. La acidosis desplaza el calcio de la troponina C. La sepsis reduce la sensibilidad del miofilamento por óxido nítrico y citoquinas. La sobrecarga de calcio en la reperfusión contribuye al daño por isquemia-reperfusión y al aturdimiento miocárdico.</p>',

  clinica: '<p>El <b>aturdimiento miocárdico</b> (disfunción contráctil reversible tras isquemia transitoria) y el <b>miocardio hibernado</b> (disfunción crónica por flujo reducido, reversible con revascularización) son entidades que solo se entienden desde esta biología: el miocito no está muerto, está gestionando mal el calcio y la energía. Distinguir músculo viable de cicatriz cambia por completo la indicación de revascularizar.</p>',

  error: {
    confunde: 'Igualar el acoplamiento del músculo cardíaco con el del esquelético.',
    parecido: 'Ambos usan túbulos T, retículo sarcoplásmico, troponina y tropomiosina, y ambos terminan en el mismo ciclo de puentes cruzados.',
    diferencia: 'En el músculo <b>esquelético</b> el acoplamiento es <i>mecánico</i>: el receptor de dihidropiridina del túbulo T está físicamente unido al receptor de rianodina y lo abre por cambio conformacional, sin necesidad de que entre calcio del exterior. En el <b>cardíaco</b> el acoplamiento es <i>químico</i>: hace falta que entre calcio real para disparar la liberación.',
    ejemplo: 'Un calcioantagonista bloquea el canal L y deprime la contractilidad cardíaca, pero apenas afecta al músculo esquelético, precisamente porque este no necesita el calcio de entrada.',
    regla: 'Esquelético: el voltaje tira de una palanca. Cardíaco: el calcio enciende la mecha.'
  },

  perla: '🔥 La relajación consume ATP. Cualquier condición que reduzca la energía disponible —isquemia, hipertrofia con desajuste aporte-demanda, taquicardia— produce <b>disfunción diastólica antes que sistólica</b>. Es la explicación fisiológica de por qué la disnea suele preceder a la caída de la fracción de eyección.',

  feynman: {
    consigna: 'Explica por qué el levosimendán aumenta la fuerza de contracción sin aumentar el consumo de oxígeno, y por qué eso lo diferencia de la dobutamina.',
    puntos: [
      'Explico que la fuerza depende del calcio y de la sensibilidad al calcio',
      'Describo cómo la dobutamina aumenta el calcio intracelular vía AMPc',
      'Conecto más calcio con más consumo de ATP y de oxígeno, y con arritmias',
      'Explico que el levosimendán sensibiliza la troponina C sin subir el calcio',
      'Menciono el efecto vasodilatador adicional por canales de potasio'
    ],
    referencia: '<p>La fuerza que genera el miocito depende de dos factores multiplicativos: <b>cuánto calcio</b> llega a la troponina C y <b>cuánta fuerza produce el aparato contráctil por cada ion de calcio</b> (sensibilidad). Casi todos los inotrópicos clásicos actúan sobre el primero.</p>' +
      '<p>La dobutamina estimula β₁, aumenta el AMPc y, vía PKA, incrementa la entrada de calcio por los canales tipo L y su carga en el retículo. Más calcio significa más puentes cruzados, pero también más trabajo para las bombas que deben retirarlo (SERCA e intercambiador consumen ATP), más consumo de oxígeno y mayor probabilidad de pospotenciales y arritmias. En un corazón isquémico eso puede ser exactamente lo que no conviene.</p>' +
      '<p>El levosimendán actúa sobre el segundo factor: se une a la troponina C de forma dependiente del calcio y <b>estabiliza su conformación activa</b>, de modo que con la misma cantidad de calcio se genera más fuerza. Como no aumenta el calcio intracelular, no incrementa proporcionalmente la demanda energética ni el riesgo arrítmico. Y como la unión es dependiente del calcio, el efecto se atenúa en diástole, cuando el calcio cae, lo que evita comprometer la relajación.</p>' +
      '<p>Además abre canales de potasio sensibles a ATP en el músculo liso vascular, produciendo <b>vasodilatación</b>: reduce precarga y poscarga, lo que en la insuficiencia cardíaca descompensada se suma al beneficio inotrópico. Su metabolito activo prolonga el efecto durante días, lo que explica por qué se administra en perfusión única.</p>' +
      '<p>La lección conceptual es que "aumentar la fuerza" y "aumentar el calcio" no son sinónimos, y que separar ambos conceptos es lo que permite mejorar la contracción sin pagar el precio metabólico habitual.</p>'
  },

  preguntas: [
    { nivel: 1, q: '¿Qué es la liberación de calcio inducida por calcio y qué receptor la media?', r: 'El calcio que entra por los canales tipo L durante la meseta activa los receptores de rianodina (RyR2) del retículo sarcoplásmico, liberando una cantidad de calcio unas 10 veces mayor. El calcio de entrada es el gatillo, no el efector principal.' },
    { nivel: 1, q: '¿Qué bombas retiran el calcio en la relajación y en qué proporción?', r: 'La SERCA2a devuelve ~70 % al retículo (regulada por el fosfolambano) y el intercambiador Na⁺/Ca²⁺ expulsa ~28 %; el resto lo manejan la bomba de calcio del sarcolema y la mitocondria.' },
    { nivel: 2, q: '¿Por qué la isquemia produce disfunción diastólica antes que sistólica?', r: 'Porque la relajación es un proceso activo dependiente de ATP (la SERCA consume energía para bombear calcio contra gradiente). Cuando cae el ATP, la recaptura de calcio se enlentece antes de que se comprometa la generación de fuerza.' },
    { nivel: 2, q: 'Explica por qué la milrinona sigue funcionando en un paciente betabloqueado.', r: 'Porque inhibe la fosfodiesterasa 3, que degrada el AMPc, y por tanto aumenta el AMPc <b>por debajo</b> del receptor β. No necesita un receptor β funcionante ni sensible, lo que la hace útil en la insuficiencia cardíaca crónica con desensibilización β o en pacientes betabloqueados.' },
    { nivel: 3, q: 'Tras revascularizar un infarto, la zona afectada sigue acinética durante días y luego recupera. ¿Qué ocurrió y qué implica clínicamente?', r: 'Aturdimiento miocárdico: disfunción contráctil reversible tras isquemia transitoria, causada por daño oxidativo en la reperfusión, sobrecarga de calcio y reducción de la sensibilidad de los miofilamentos, sin muerte celular. Implica que una fracción de eyección medida en fase aguda subestima la función real y que no deben tomarse decisiones definitivas (como implantar un desfibrilador) antes de reevaluar semanas después.' }
  ],

  caso: {
    vineta: 'Paciente con miocardiopatía dilatada, FE 20 %, ingresa descompensado. Está en tratamiento crónico con carvedilol. Persiste hipotenso y con signos de bajo gasto pese a diuréticos.',
    pasos: [
      { q: '¿Por qué la dobutamina podría ser menos eficaz de lo habitual en este paciente?', pista: 'Su tratamiento crónico y su enfermedad afectan al mismo receptor.', r: 'Porque la dobutamina actúa como agonista β₁ y el paciente tiene el receptor bloqueado por carvedilol, además de la desensibilización y regulación a la baja de receptores β propia de la insuficiencia crónica. Se necesitarían dosis muy altas y aun así la respuesta sería parcial.' },
      { q: '¿Qué alternativa tiene sentido fisiológico y por qué?', pista: 'Actuar por debajo del receptor.', r: 'Milrinona (inhibidor de la fosfodiesterasa 3) o levosimendán. Ambas actúan distalmente al receptor β: la milrinona aumentando el AMPc al bloquear su degradación, y el levosimendán sensibilizando la troponina C al calcio. Por eso se les llama "inodilatadores independientes del receptor β".' },
      { q: '¿Qué efecto adverso hemodinámico comparten milrinona y levosimendán?', pista: 'Ambos son inodilatadores.', r: 'Vasodilatación e hipotensión. La milrinona aumenta el AMPc también en el músculo liso vascular y el levosimendán abre canales de potasio sensibles a ATP. En un paciente ya hipotenso puede requerirse asociar un vasopresor, y con frecuencia esa combinación —noradrenalina más inodilatador— es la que estabiliza el shock cardiogénico.' },
      { q: '¿Por qué no se mantienen estos fármacos de forma crónica?', pista: 'Coste metabólico y arritmias.', r: 'Porque el aumento sostenido de AMPc y calcio incrementa el consumo de oxígeno, favorece arritmias ventriculares y acelera la muerte de miocitos. Los ensayos con inotrópicos orales crónicos mostraron mejoría hemodinámica con <b>aumento de mortalidad</b>. Son puentes: a la recuperación, al trasplante o a la asistencia ventricular.' }
    ],
    cierre: 'Todo el arsenal inotrópico se ordena preguntando en qué punto de la cascada del calcio actúa cada fármaco, y qué precio metabólico cobra por la fuerza que añade.'
  },

  tarjetas: [
    { f: 'Liberación de calcio inducida por calcio', d: 'El Ca²⁺ que entra por canales tipo L (fase 2) activa los RyR2 del retículo, que liberan ~10 veces más calcio. El calcio de entrada es GATILLO, no efector.' },
    { f: 'Acoplamiento cardíaco vs esquelético', d: 'Esquelético: acoplamiento MECÁNICO (el receptor DHP abre el RyR1 por cambio conformacional; no requiere Ca²⁺ externo). Cardíaco: acoplamiento QUÍMICO (requiere entrada real de Ca²⁺).' },
    { f: '¿Por qué la isquemia altera primero la diástole?', d: 'La relajación es ACTIVA: la SERCA2a consume ATP para recapturar calcio. Sin energía, la relajación falla antes que la contracción → ↑presión telediastólica → disnea antes que caída de la FE.' },
    { f: 'Mecanismo del levosimendán', d: 'Sensibiliza la troponina C al calcio (unión Ca²⁺-dependiente): más fuerza SIN más calcio, por tanto sin aumentar el MVO₂ ni las arritmias. Además abre canales K-ATP → vasodilatación.' },
    { f: '¿Por qué la milrinona funciona en un paciente betabloqueado?', d: 'Inhibe la fosfodiesterasa 3 y aumenta el AMPc POR DEBAJO del receptor β. Independiente del receptor, útil con desensibilización β o betabloqueo.' },
    { f: 'Defectos del calcio en la insuficiencia cardíaca', d: 'SERCA2a reducida (relajación lenta, depósito pobre), RyR2 con fuga diastólica (arritmias por pospotenciales tardíos) y desorganización de túbulos T (gatillo ineficiente).' }
  ]
},

/* ---------------------------------------------------------- */
{
  id: 'ecg-fisiologia',
  modulo: 'electro',
  nombre: 'ECG desde la fisiología',
  alto: true,
  minutos: 24,
  requisitos: ['potencial-accion'],
  ideaCentral: 'El ECG no registra latidos ni contracción: registra la suma de vectores de despolarización y repolarización proyectados sobre derivaciones. Si entiendes que una onda se hace positiva cuando el frente se acerca al electrodo, puedes deducir la morfología de casi cualquier trazado en lugar de memorizarla, incluidos los patrones de isquemia y de crecimiento de cavidades.',

  anclaje: {
    q: 'Sin mirar: ¿por qué la onda T es positiva en la mayoría de las derivaciones si la repolarización es el proceso eléctricamente opuesto a la despolarización, que también da ondas positivas?',
    pista: 'Dos negativos dan positivo: piensa en la dirección del frente y en el signo de la carga.'
  },

  bloques: [
    {
      nivel: 'imprescindible',
      titulo: 'La regla que genera todo el trazado',
      html: '<p>Una deflexión es <b>positiva</b> cuando el vector de despolarización se <b>acerca</b> al electrodo explorador, y negativa cuando se aleja. Todo lo demás son consecuencias:</p>' +
        '<table><tr><th>Onda</th><th>Evento</th><th>Duración normal</th></tr>' +
        '<tr><td>P</td><td>Despolarización auricular</td><td>< 120 ms</td></tr>' +
        '<tr><td>PR</td><td>Incluye el <b>retraso del nodo AV</b></td><td>120–200 ms</td></tr>' +
        '<tr><td>QRS</td><td>Despolarización ventricular</td><td>< 120 ms</td></tr>' +
        '<tr><td>ST</td><td>Meseta: todo el ventrículo despolarizado</td><td>isoeléctrico</td></tr>' +
        '<tr><td>T</td><td>Repolarización ventricular</td><td>—</td></tr>' +
        '<tr><td>QT</td><td>Duración total del PA ventricular</td><td>corregido < 440–460 ms</td></tr></table>' +
        '<p><b>Por qué no se ve la repolarización auricular:</b> queda enterrada bajo el QRS, mucho más voluminoso.</p>' +
        '<p><b>Por qué el segmento ST es isoeléctrico:</b> durante la meseta todas las células están despolarizadas a la vez, no hay gradientes y por tanto no hay corriente registrable. Cuando aparece un desnivel del ST es porque existe una <b>corriente de lesión</b> entre tejido isquémico y sano.</p>'
    },
    {
      nivel: 'imprescindible',
      titulo: 'La onda T positiva: la pregunta clave',
      html: '<p>La despolarización ventricular va de <b>endocardio a epicardio</b>. Si la repolarización siguiera el mismo orden, la onda T sería negativa. Pero la repolarización empieza en el <b>epicardio</b>, porque allí el potencial de acción es más corto (mayor densidad de I<sub>to</sub> y menor duración del PA en las capas externas, sometidas a menos presión y mejor perfundidas).</p>' +
        '<p>Entonces: el frente de repolarización viaja de epicardio a endocardio, es decir, en <b>dirección opuesta</b> a la despolarización, pero se trata de un frente de cargas <b>opuestas</b>. Dos inversiones se cancelan y la onda T resulta <b>positiva</b> y concordante con el QRS.</p>' +
        '<p>🔥 Corolario clínico: el subendocardio es el territorio peor perfundido (mayor presión tisular, perfusión solo diastólica). Cualquier isquemia lo afecta primero y altera el orden de repolarización, por eso los cambios del ST-T son tan sensibles.</p>',
      cadena: ['Despolarización endo→epi', 'Repolarización epi→endo', 'Dirección opuesta + carga opuesta', 'Onda T positiva']
    },
    {
      nivel: 'importante',
      titulo: 'Isquemia, lesión y necrosis',
      html: '<table><tr><th>Situación</th><th>Hallazgo</th><th>Mecanismo</th></tr>' +
        '<tr><td>Isquemia subendocárdica</td><td><b>Descenso</b> del ST</td><td>Corriente de lesión dirigida lejos del electrodo</td></tr>' +
        '<tr><td>Lesión transmural</td><td><b>Elevación</b> del ST</td><td>Corriente de lesión hacia el electrodo epicárdico</td></tr>' +
        '<tr><td>Isquemia</td><td>T negativas simétricas</td><td>Retraso de la repolarización de la zona afectada</td></tr>' +
        '<tr><td>Necrosis establecida</td><td>Onda Q patológica</td><td>Tejido eléctricamente inerte: se registra el vector de la pared opuesta</td></tr></table>' +
        '<p>Territorios: <b>II, III, aVF</b> = inferior (coronaria derecha en la mayoría). <b>V1–V4</b> = anteroseptal (descendente anterior). <b>I, aVL, V5–V6</b> = lateral (circunfleja).</p>' +
        '<p>Ante un infarto <b>inferior</b>, siempre derivaciones derechas (V4R): la afectación del ventrículo derecho cambia el tratamiento porque ese paciente es <b>dependiente de precarga</b> y los nitratos pueden precipitar hipotensión severa.</p>'
    },
    {
      nivel: 'complementario',
      titulo: 'Eje, crecimiento de cavidades y bloqueos',
      html: '<p><b>Eje</b>: normal entre −30° y +90°. Se estima con I y aVF: si ambas son positivas, el eje es normal. Se desvía hacia donde hay más masa o desde donde falta activación (por eso el hemibloqueo anterior izquierdo desvía el eje a la izquierda).</p>' +
        '<p><b>Crecimiento auricular</b>: la onda P suma la activación derecha (primera mitad) y la izquierda (segunda). Aurícula derecha grande → P alta y picuda en II ("P pulmonale"); aurícula izquierda grande → P ancha y bimodal en II, con componente negativo terminal en V1 ("P mitrale").</p>' +
        '<p><b>Bloqueos de rama</b>: al perderse una rama, ese ventrículo se activa tarde y por vía muscular, lenta. El QRS se ensancha (> 120 ms) y la última porción se dirige hacia el ventrículo retrasado: en el bloqueo de rama derecha aparece RSR\' en V1; en el izquierdo, R ancha y mellada en V5–V6. Como el bloqueo de rama izquierda altera por completo la secuencia de activación y repolarización, produce alteraciones secundarias del ST-T que <b>enmascaran la isquemia</b>: de ahí los criterios de Sgarbossa.</p>'
    }
  ],

  variables: [
    { n: 'Dirección del vector', d: 'up', nota: 'define la polaridad de la onda' },
    { n: 'Masa despolarizada', d: 'up', nota: 'define la amplitud' },
    { n: 'Velocidad de conducción', d: 'down', nota: 'si baja, la onda se ensancha' },
    { n: 'Duración del PA', d: 'up', nota: 'se refleja en el QT' }
  ],

  fisiopatologia: '<p>El ECG traduce a superficie tres tipos de alteración: de la <b>generación</b> del impulso (automatismo anormal, ectopia), de la <b>conducción</b> (bloqueos AV y de rama, preexcitación) y de la <b>repolarización</b> (isquemia, electrolitos, fármacos, canalopatías).</p>' +
    '<p>La cascada isquémica ordena los hallazgos en el tiempo: primero disfunción diastólica, luego sistólica, después cambios del ECG y por último el dolor. Por eso un ECG normal no descarta enfermedad coronaria y por eso la ecocardiografía de estrés detecta antes que el ECG de esfuerzo.</p>',

  clinica: '<p>Para el trabajo de Diego en UCI, cinco lecturas de alto rendimiento: elevación del ST con imagen especular, secuencia de la hiperpotasemia, QT largo con riesgo de torsade, taquicardia de QRS ancho (que debe asumirse ventricular hasta demostrar lo contrario) y patrón de sobrecarga aguda del ventrículo derecho (S1Q3T3, T negativas en precordiales derechas, bloqueo de rama derecha nuevo).</p>' +
    '<p>La <b>imagen especular</b> merece especial atención: un descenso del ST en derivaciones opuestas a una elevación aumenta mucho la probabilidad de que se trate de una oclusión real y no de una repolarización precoz o una pericarditis, cuyo ascenso del ST es difuso y sin especularidad.</p>',

  error: {
    confunde: 'Interpretar el ECG como un registro de la actividad mecánica del corazón.',
    parecido: 'Ambos van juntos casi siempre, y el trazado se acompaña de pulso en la mayoría de los pacientes.',
    diferencia: 'El ECG registra <b>únicamente</b> fenómenos eléctricos. Puede haber actividad eléctrica organizada sin contracción alguna: eso es la <b>actividad eléctrica sin pulso</b>, una situación de parada cardíaca con ECG casi normal. Y a la inversa, el corazón puede contraerse eficazmente con un ECG de aspecto alarmante.',
    ejemplo: 'Paciente en asistolia mecánica por taponamiento con trazado sinusal a 90 lpm en el monitor: si te fías del monitor, no reanimas. Por eso el pulso se palpa y la ecografía a pie de cama es decisiva.',
    regla: 'El monitor te dice qué hace la electricidad; el paciente te dice qué hace la bomba. Nunca trates un monitor.'
  },

  perla: '🔥 La onda T es positiva porque la repolarización va en dirección opuesta a la despolarización <b>con carga opuesta</b>: dos inversiones se cancelan. Si entiendes eso, entiendes por qué la isquemia subendocárdica —que altera precisamente el orden de repolarización— produce cambios tan precoces del ST-T.',

  feynman: {
    consigna: 'Explica por qué el segmento ST es isoeléctrico en condiciones normales y por qué se eleva en un infarto transmural.',
    puntos: [
      'Explico que el ECG registra diferencias de potencial, no potenciales absolutos',
      'Explico que durante la meseta todas las células están despolarizadas: sin gradiente, sin corriente',
      'Introduzco la corriente de lesión entre tejido isquémico y sano',
      'Relaciono la dirección de esa corriente con elevación o descenso del ST',
      'Menciono la imagen especular como prueba de que es un vector real'
    ],
    referencia: '<p>El electrocardiograma solo puede registrar <b>diferencias</b> de potencial entre regiones del corazón. Durante la fase 2 (meseta) del potencial de acción, todas las células ventriculares están despolarizadas simultáneamente: no existe gradiente entre unas y otras y, por tanto, no fluye corriente detectable. Esa es la razón de que el segmento ST sea isoeléctrico: no es que "no pase nada", es que todo el ventrículo está en el mismo estado eléctrico.</p>' +
      '<p>Cuando una región queda isquémica, sus células se comportan de forma distinta: tienen un potencial de reposo menos negativo (por pérdida de ATP y salida de potasio), un potencial de acción más corto y de menor amplitud. Ahora sí existe una diferencia entre el tejido isquémico y el sano durante la meseta y también durante la diástole eléctrica, y esa diferencia genera una <b>corriente de lesión</b>.</p>' +
      '<p>La polaridad del desnivel depende de la orientación de esa corriente respecto al electrodo. Si la isquemia es <b>transmural</b>, el vector de lesión apunta hacia el epicardio, es decir, hacia el electrodo que mira esa pared: se registra <b>elevación del ST</b>. Si la isquemia es <b>subendocárdica</b>, el vector apunta hacia la cavidad, alejándose del electrodo: se registra <b>descenso del ST</b>. Es la misma regla de siempre —positivo si el vector se acerca— aplicada a una corriente patológica.</p>' +
      '<p>La <b>imagen especular</b> confirma que se trata de un vector real y no de un fenómeno difuso: un electrodo situado en la pared opuesta ve exactamente el mismo vector alejándose y registra un descenso simétrico. Por eso la presencia de descenso recíproco aumenta mucho la probabilidad de oclusión coronaria frente a diagnósticos alternativos como la pericarditis (elevación difusa, cóncava, con descenso del PR y sin especularidad) o la repolarización precoz.</p>'
  },

  preguntas: [
    { nivel: 1, q: '¿Qué representa el intervalo PR y qué componente aporta la mayor parte de su duración?', r: 'El tiempo desde el inicio de la despolarización auricular hasta el inicio de la ventricular. La mayor parte corresponde al retraso fisiológico del nodo AV, que permite que la aurícula complete el llenado ventricular antes de la sístole.' },
    { nivel: 1, q: '¿Por qué no se ve la repolarización auricular en el ECG?', r: 'Porque coincide temporalmente con el QRS, cuyo voltaje es mucho mayor y la enmascara.' },
    { nivel: 1, q: '¿Qué significa una onda Q patológica?', r: 'Tejido necrótico eléctricamente inerte: al no despolarizarse, el electrodo registra el vector de la pared opuesta alejándose, generando una deflexión inicial negativa.' },
    { nivel: 2, q: 'Explica por qué la onda T es normalmente positiva y concordante con el QRS.', r: 'La despolarización va de endocardio a epicardio, pero la repolarización empieza en el epicardio (allí el potencial de acción es más corto). El frente de repolarización viaja en dirección opuesta y con carga opuesta: las dos inversiones se cancelan y la onda resulta positiva.' },
    { nivel: 2, q: '¿Por qué el subendocardio es el territorio más vulnerable a la isquemia?', r: 'Porque soporta la mayor presión tisular durante la sístole (que comprime sus vasos), su perfusión es exclusivamente diastólica y está al final del recorrido de las arterias que penetran desde el epicardio. Cualquier caída del aporte o aumento de la demanda lo afecta primero.' },
    { nivel: 2, q: '¿Por qué el bloqueo de rama izquierda dificulta el diagnóstico de infarto?', r: 'Porque altera por completo la secuencia de activación ventricular y produce alteraciones secundarias del ST y de la onda T (discordantes con el QRS) que imitan o enmascaran los cambios isquémicos. Se recurre a los criterios de Sgarbossa, que buscan concordancia anómala o discordancia excesiva.' },
    { nivel: 3, q: 'Paciente con elevación del ST en II, III y aVF, e hipotensión que empeora tras nitroglicerina sublingual. ¿Qué ocurrió?', r: 'Infarto inferior con extensión al ventrículo derecho (hay que confirmarlo con V4R). El VD infartado pierde su capacidad de bombear y se vuelve extremadamente <b>dependiente de precarga</b> para atravesar la circulación pulmonar. La nitroglicerina es fundamentalmente venodilatadora: reduce el retorno venoso, colapsa la precarga del VD y hunde el gasto. Estos pacientes se tratan con volumen y, si es preciso, inotrópicos, evitando nitratos y diuréticos.' },
    { nivel: 3, q: 'Taquicardia regular a 180 lpm con QRS de 150 ms. ¿Cómo razonas el diagnóstico y qué asumes?', r: 'Se asume <b>taquicardia ventricular</b> hasta que se demuestre lo contrario, porque es la causa más frecuente de taquicardia de QRS ancho y porque tratarla como supraventricular con verapamilo puede causar colapso. A favor de origen ventricular: disociación AV, latidos de fusión o captura, concordancia precordial, QRS muy ancho, eje extremo, y sobre todo antecedente de cardiopatía estructural o infarto previo. La alternativa es una supraventricular con aberrancia o con bloqueo de rama preexistente, pero la carga de la prueba recae sobre esa hipótesis.' }
  ],

  caso: {
    vineta: 'Varón de 63 años con dolor torácico opresivo de 50 minutos. ECG: elevación del ST de 3 mm en II, III y aVF, con descenso del ST en I y aVL. FC 48 lpm, PA 96/60.',
    pasos: [
      { q: '¿Qué territorio y qué arteria?', pista: 'II, III, aVF.', r: 'Cara inferior. En el 80–90 % de las personas la irriga la coronaria derecha (dominancia derecha); en el resto, la circunfleja. El descenso en I y aVL es la imagen especular, y su presencia apoya que se trata de una oclusión real.' },
      { q: '¿Por qué está bradicárdico?', pista: 'Dos mecanismos posibles, ambos ligados a la coronaria derecha.', r: 'Por dos motivos convergentes: la coronaria derecha irriga el nodo sinusal y el nodo AV en la mayoría de las personas, de modo que la isquemia los afecta directamente; y el infarto inferior activa el <b>reflejo de Bezold-Jarisch</b>, mediado por receptores vagales de la pared inferoposterior, que produce bradicardia e hipotensión. Es la razón de que los bloqueos AV del infarto inferior suelan ser suprahisianos, de escape estrecho y buen pronóstico, a diferencia de los del infarto anterior.' },
      { q: '¿Qué derivación adicional pides y por qué cambia el tratamiento?', pista: 'El ventrículo derecho no se ve bien en las 12 derivaciones habituales.', r: 'V4R. Si hay elevación del ST en V4R, hay infarto del ventrículo derecho. Cambia el tratamiento porque ese ventrículo se vuelve dependiente de precarga: hay que dar volumen y evitar nitratos, morfina en exceso y diuréticos, que reducirían el retorno venoso y precipitarían hipotensión severa.' },
      { q: 'Su PA es 96/60. ¿Cómo decides si es por el VD, por bradicardia o por fallo del VI?', pista: 'Explora la congestión y usa la ecografía.', r: 'La tríada de infarto del VD es hipotensión, ingurgitación yugular y <b>campos pulmonares limpios</b>; si hubiera fallo del VI habría crepitantes. Si la hipotensión es por bradicardia extrema, mejorará al aumentar la frecuencia con atropina o marcapasos. La ecografía a pie de cama resuelve la duda en segundos mostrando un VD dilatado e hipocontráctil con VI normal.' },
      { q: '¿Cuál es la prioridad absoluta y por qué la fisiología la impone?', pista: 'La causa está en el aporte.', r: 'La reperfusión, y cuanto antes mejor. El área de necrosis crece con el tiempo de isquemia siguiendo un frente de onda desde el subendocardio hacia el epicardio: cada minuto de retraso convierte miocardio aturdido y recuperable en cicatriz permanente. Todo lo demás —analgesia, antiagregación, control de la frecuencia— es soporte mientras se restaura el flujo.' }
    ],
    cierre: 'Un solo ECG permite deducir territorio, arteria, mecanismo de la bradicardia, riesgo de dependencia de precarga y urgencia terapéutica: todo desde la regla del vector y la anatomía coronaria.'
  },

  tarjetas: [
    { f: 'Regla fundamental de la polaridad en el ECG', d: 'Onda positiva si el vector de despolarización se ACERCA al electrodo, negativa si se aleja. La amplitud depende de la masa; la anchura, de la velocidad de conducción.' },
    { f: '¿Por qué la onda T es positiva?', d: 'La despolarización va endo→epi, pero la repolarización empieza en el EPICARDIO (PA más corto). Dirección opuesta + carga opuesta = dos inversiones que se cancelan → T positiva y concordante con el QRS.' },
    { f: '¿Por qué el segmento ST es isoeléctrico?', d: 'Durante la meseta todas las células están despolarizadas: no hay gradiente y no hay corriente registrable. Un desnivel implica una CORRIENTE DE LESIÓN entre tejido isquémico y sano.' },
    { f: 'Elevación vs descenso del ST: mecanismo vectorial', d: 'Lesión transmural → vector hacia el epicardio/electrodo → ELEVACIÓN. Isquemia subendocárdica → vector hacia la cavidad, alejándose → DESCENSO.' },
    { f: 'Territorios electrocardiográficos y arterias', d: 'II, III, aVF = inferior (coronaria derecha en el 80–90 %). V1–V4 = anteroseptal (descendente anterior). I, aVL, V5–V6 = lateral (circunfleja).' },
    { f: 'Infarto inferior: ¿por qué pedir V4R y qué cambia?', d: 'Para detectar infarto del ventrículo derecho. Ese VD es DEPENDIENTE DE PRECARGA: tratar con volumen y evitar nitratos, diuréticos y morfina en exceso, que colapsan el retorno venoso.' },
    { f: 'Reflejo de Bezold-Jarisch', d: 'Receptores vagales de la pared inferoposterior que, ante isquemia inferior, producen bradicardia e hipotensión. Explica el bloqueo AV suprahisiano de buen pronóstico del infarto inferior.' },
    { f: 'Actividad eléctrica sin pulso: qué enseña', d: 'Que el ECG registra SOLO electricidad. Puede haber trazado organizado sin contracción eficaz (taponamiento, TEP masivo, hipovolemia extrema). Nunca trates el monitor: palpa el pulso y usa la ecografía.' }
  ]
}

]);

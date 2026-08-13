/* ============================================================
   MÓDULO 3 — REGULACIÓN Y PRESIÓN ARTERIAL
   ============================================================ */

TUTOR.registrarTemas([

/* ---------------------------------------------------------- */
{
  id: 'presion-arterial',
  modulo: 'regulacion',
  nombre: 'Presión arterial, resistencia y compliance',
  alto: true,
  minutos: 20,
  requisitos: ['gasto-cardiaco'],
  ideaCentral: 'La presión arterial es el producto del gasto cardíaco por la resistencia vascular sistémica, pero eso solo explica la presión media. La presión sistólica y la diastólica —y por tanto la presión de pulso— dependen además del volumen sistólico y de la compliance arterial, y separar esas dos capas es lo que permite interpretar un dato tan cotidiano como un pulso saltón o una hipertensión sistólica aislada.',

  anclaje: {
    q: 'Sin mirar: dos pacientes tienen la misma presión media de 93 mmHg. Uno tiene 120/80 y otro 160/60. ¿Qué variable difiere entre ellos y qué explica esa diferencia?',
    pista: 'La media es casi igual; lo que cambia es la amplitud de la oscilación.'
  },

  bloques: [
    {
      nivel: 'imprescindible',
      titulo: 'Las dos capas del problema',
      html: '<p><b>Capa 1 — la presión media:</b></p>' +
        '<p style="text-align:center"><code>PAM = GC × RVS</code> &nbsp;&nbsp; y &nbsp;&nbsp; <code>PAM ≈ PAD + ⅓ (PAS − PAD)</code></p>' +
        '<p>La PAM es la que perfunde los órganos, y por eso es la que se fija como objetivo en la reanimación (habitualmente ≥ 65 mmHg). Se aproxima con la fórmula porque el corazón pasa aproximadamente un tercio del ciclo en sístole.</p>' +
        '<p><b>Capa 2 — la presión de pulso (PAS − PAD):</b> depende de:</p>' +
        '<ul><li>El <b>volumen sistólico</b> (numerador): más volumen eyectado de golpe = mayor oscilación.</li>' +
        '<li>La <b>compliance arterial</b> (denominador): una aorta rígida no amortigua y la misma eyección produce un pico mayor.</li></ul>' +
        '<p>🔥 Por eso <code>PP ≈ VS / Compliance</code> es la fórmula mental más útil para leer un par de números de presión.</p>'
    },
    {
      nivel: 'imprescindible',
      titulo: 'Leer la presión de pulso a pie de cama',
      html: '<table><tr><th>Patrón</th><th>Mecanismo</th><th>Ejemplos</th></tr>' +
        '<tr><td><b>Estrecha</b> (< 25 % de la sistólica)</td><td>↓ volumen sistólico ± vasoconstricción</td><td>Shock hipovolémico o cardiogénico, taponamiento, estenosis aórtica severa</td></tr>' +
        '<tr><td><b>Amplia</b> con diastólica baja</td><td>↑ VS o escape diastólico de volumen</td><td>Insuficiencia aórtica, ductus, fístula AV, tirotoxicosis, anemia severa, sepsis</td></tr>' +
        '<tr><td><b>Amplia</b> con sistólica alta</td><td>↓ compliance aórtica</td><td>Hipertensión sistólica aislada del anciano</td></tr></table>' +
        '<p>La <b>ley de Poiseuille</b> explica por qué la arteriola es el vaso de resistencia: <code>R ∝ 1/r⁴</code>. Reducir el radio a la mitad multiplica la resistencia por 16. Un cambio mínimo de tono arteriolar tiene un efecto enorme sobre la resistencia total, y por eso el organismo regula la presión ahí.</p>',
      cadena: ['↓ Radio arteriolar', 'R ∝ 1/r⁴', '↑↑ Resistencia', '↑ Presión arterial', '↓ Flujo distal']
    },
    {
      nivel: 'importante',
      titulo: 'Regulación a corto, medio y largo plazo',
      html: '<ul><li><b>Segundos:</b> barorreflejo y quimiorreceptores. Rápidos pero se adaptan: no sirven para el control crónico.</li>' +
        '<li><b>Minutos-horas:</b> desplazamiento de líquido capilar, sistema renina-angiotensina, vasopresina.</li>' +
        '<li><b>Días-semanas:</b> <b>natriuresis por presión</b>. El riñón ajusta el volumen extracelular en función de la presión: si la presión sube, excreta más sodio y agua, cae el volumen y la presión vuelve al punto de ajuste. Guyton propuso que este mecanismo tiene <b>ganancia infinita</b> y que, por tanto, toda hipertensión crónica implica necesariamente un desplazamiento de la curva de natriuresis renal.</li></ul>'
    },
    {
      nivel: 'complementario',
      titulo: 'Autorregulación y por qué importa el objetivo de presión',
      html: '<p>Cerebro, riñón y corazón mantienen un flujo constante dentro de un rango de presión (aproximadamente 60–150 mmHg de PAM en el cerebro) mediante la respuesta miogénica y metabólica. Fuera de ese rango, el flujo pasa a depender linealmente de la presión.</p>' +
        '<p>En el hipertenso crónico, la curva de autorregulación se <b>desplaza a la derecha</b>: tolera presiones altas pero se vuelve isquémico con presiones que otro toleraría bien. Esta es la razón fisiológica de no bajar la presión bruscamente en una emergencia hipertensiva (salvo disección aórtica o edema agudo de pulmón): una reducción rápida por debajo del límite inferior desplazado produce hipoperfusión cerebral y renal.</p>'
    }
  ],

  variables: [
    { n: 'Gasto cardíaco', d: 'up', nota: 'primer factor de la PAM' },
    { n: 'Resistencia vascular sistémica', d: 'up', nota: 'regulada por el radio arteriolar (1/r⁴)' },
    { n: 'Volumen sistólico', d: 'up', nota: 'amplía la presión de pulso' },
    { n: 'Compliance arterial', d: 'down', nota: 'si baja, ↑ sistólica y ↑ presión de pulso' }
  ],

  fisiopatologia: '<p>La hipertensión sistólica aislada del anciano no es "hipertensión leve": refleja rigidez aórtica por pérdida de elastina, depósito de colágeno y calcificación. La aorta rígida deja de cumplir su <b>función de Windkessel</b> —almacenar volumen en sístole y devolverlo en diástole—, con dos consecuencias: sube la sistólica (más poscarga y más hipertrofia) y baja la diastólica (menos presión de perfusión coronaria). El resultado es un corazón con más demanda y menos aporte, lo que explica por qué la presión de pulso amplia es un predictor independiente de eventos cardiovasculares.</p>' +
    '<p>La <b>hipotensión</b> puede deberse a fallo de cualquiera de los dos factores: gasto (hipovolemia, fallo de bomba, obstrucción) o resistencia (sepsis, anafilaxia, neurogénica, insuficiencia suprarrenal). La ecografía a pie de cama y el examen de la perfusión periférica distinguen ambos escenarios en un minuto: extremidades frías apuntan a problema de gasto, calientes a problema de resistencia.</p>',

  clinica: '<p>Aplicación práctica de la fórmula de la presión de pulso: en un paciente hipotenso, una <b>presión de pulso estrecha</b> sugiere volumen sistólico bajo (dar volumen o inotropía), mientras que una <b>presión de pulso amplia con diastólica muy baja</b> sugiere vasodilatación (vasopresor). Es una lectura hemodinámica gratuita que está en cada toma de constantes.</p>' +
    '<p>El <b>pulso paradójico</b> (caída inspiratoria de la sistólica > 10 mmHg) es otra lectura de alto rendimiento: aparece en el taponamiento, el asma severa y el TEP, y su mecanismo es la interdependencia ventricular exagerada dentro de un pericardio o un tórax que no permite la expansión independiente de las cavidades.</p>',

  error: {
    confunde: 'Tratar la resistencia vascular sistémica como sinónimo de poscarga y la presión arterial como sinónimo de perfusión.',
    parecido: 'Suben y bajan juntas en la mayoría de las situaciones clínicas.',
    diferencia: 'La RVS es solo el componente estático de la poscarga, que además incluye la compliance y las ondas de reflexión. Y la presión no es perfusión: el <b>flujo</b> depende del gradiente de presión dividido por la resistencia. Un paciente puede tener presión normal y perfusión pésima si su resistencia está muy elevada, que es exactamente lo que ocurre en el shock compensado.',
    ejemplo: 'Paciente en shock hipovolémico con PA de 120/95: presión "normal", perfusión desastrosa. Otro en sepsis con PA de 85/40 y extremidades calientes: presión baja, flujo alto.',
    regla: 'La presión es la fuerza que empuja; el flujo es lo que llega. Trata el flujo, monitoriza la presión.'
  },

  perla: '🔥 <code>PP ≈ VS / compliance</code>. Con esa sola relación puedes interpretar el pulso saltón de la insuficiencia aórtica, la presión de pulso estrecha del shock y la hipertensión sistólica aislada del anciano, sin memorizar ninguna de las tres.',

  feynman: {
    consigna: 'Explica por qué la hipertensión sistólica aislada del anciano es peligrosa para el corazón por dos motivos independientes.',
    puntos: [
      'Explico que su causa es la rigidez aórtica, no un aumento de resistencia',
      'Menciono la función de Windkessel y qué se pierde al perderla',
      'Conecto la sistólica alta con poscarga, hipertrofia y demanda de oxígeno',
      'Conecto la diastólica baja con la perfusión coronaria',
      'Concluyo que aumenta la demanda y reduce el aporte simultáneamente'
    ],
    referencia: '<p>Con la edad, la aorta pierde elastina, acumula colágeno y se calcifica. Esa rigidez tiene un efecto directo sobre la forma de la onda de presión, no sobre su media: la resistencia arteriolar puede ser normal.</p>' +
      '<p>Una aorta elástica funciona como un <b>Windkessel</b>: se distiende durante la sístole almacenando parte del volumen eyectado y retrocede durante la diástole devolviéndolo a la circulación. Eso amortigua el pico sistólico y, sobre todo, <b>mantiene la presión durante la diástole</b>, cuando el corazón no está eyectando. Cuando la aorta se vuelve rígida, esa función desaparece: el volumen sistólico se enfrenta a un tubo poco distensible y genera un pico sistólico alto, y en diástole no hay retroceso elástico que sostenga la presión, que cae más de lo normal.</p>' +
      '<p>A esto se suma el fenómeno de las <b>ondas de reflexión</b>. Las ondas que rebotan en las bifurcaciones periféricas viajan más rápido en una aorta rígida y regresan durante la sístole tardía en lugar de durante la diástole. En un joven, esa onda reflejada refuerza la presión diastólica y ayuda a perfundir las coronarias; en el anciano se suma al pico sistólico y aumenta la poscarga.</p>' +
      '<p>El resultado es una doble agresión. Por un lado, la <b>sistólica alta aumenta la poscarga</b>, y con ella la tensión parietal, el consumo de oxígeno y el estímulo para la hipertrofia concéntrica, que a su vez rigidifica el ventrículo y favorece la insuficiencia cardíaca con fracción de eyección preservada. Por otro, la <b>diastólica baja reduce la presión de perfusión coronaria</b>, que es exactamente el gradiente del que depende el flujo al ventrículo izquierdo. Más demanda y menos aporte, en el mismo paciente y por el mismo mecanismo. Por eso la presión de pulso amplia predice eventos cardiovasculares mejor que la sistólica o la diastólica aisladas en mayores de 60 años.</p>'
  },

  preguntas: [
    { nivel: 1, q: 'Escribe la ecuación de la presión arterial media y su fórmula de estimación clínica.', r: 'PAM = GC × RVS. Clínicamente PAM ≈ PAD + ⅓(PAS − PAD), porque el ciclo transcurre aproximadamente un tercio en sístole.' },
    { nivel: 1, q: '¿De qué dos factores depende la presión de pulso?', r: 'Del volumen sistólico (directamente) y de la compliance arterial (inversamente): PP ≈ VS/compliance.' },
    { nivel: 1, q: '¿Por qué la arteriola es el principal vaso de resistencia?', r: 'Por la ley de Poiseuille: la resistencia es inversamente proporcional a la cuarta potencia del radio. Pequeños cambios de tono arteriolar producen cambios enormes de resistencia, lo que la convierte en el punto ideal de regulación.' },
    { nivel: 2, q: 'Un paciente hipotenso tiene presión de pulso estrecha. ¿Qué te sugiere y qué harías?', r: 'Volumen sistólico bajo con vasoconstricción compensadora: shock hipovolémico, cardiogénico u obstructivo. La intervención va dirigida al volumen o a la bomba, no a la resistencia; un vasopresor aislado subiría la presión sin corregir el flujo.' },
    { nivel: 2, q: '¿Qué es la natriuresis por presión y por qué implica que toda hipertensión crónica es renal?', r: 'Es el mecanismo por el que un aumento de la presión arterial incrementa la excreción renal de sodio y agua, reduciendo el volumen y devolviendo la presión a su punto de ajuste. Como su ganancia es teóricamente infinita, para que la presión permanezca crónicamente elevada la curva de natriuresis debe estar desplazada, es decir, el riñón debe requerir una presión mayor para excretar la misma carga de sodio.' },
    { nivel: 3, q: 'Paciente hipertenso crónico con PA de 220/120 y cefalea, sin daño agudo de órgano diana. Un colega quiere normalizar la presión en una hora. ¿Qué le adviertes?', r: 'Que la curva de autorregulación cerebral está desplazada a la derecha por la hipertensión crónica: su límite inferior ya no está en 60 mmHg de PAM sino considerablemente más alto. Bajar la presión bruscamente puede llevarlo por debajo de ese límite y producir isquemia cerebral, renal o coronaria. La recomendación es reducir la PAM un 20–25 % en las primeras horas y con fármacos titulables, salvo excepciones donde la reducción rápida es imprescindible: disección aórtica, edema agudo de pulmón y eclampsia.' },
    { nivel: 3, q: 'Paciente joven con PA 150/45, pulso saltón que colapsa rápidamente y soplo diastólico. Explica todos los hallazgos con una sola fisiopatología.', r: 'Insuficiencia aórtica crónica severa. La regurgitación diastólica devuelve sangre al ventrículo, que se dilata y maneja un volumen telediastólico enorme; por Frank-Starling eyecta un volumen sistólico muy grande, lo que eleva la sistólica. Simultáneamente, parte de ese volumen escapa retrógradamente durante la diástole y la presión diastólica cae. El resultado es una presión de pulso muy amplia (PP ≈ VS/compliance con un VS enorme), que se manifiesta como pulso saltón de colapso rápido (pulso de Corrigan) y toda la constelación de signos periféricos. El soplo diastólico es el flujo regurgitante.' }
  ],

  caso: {
    vineta: 'Mujer de 82 años, sin antecedentes conocidos, acude a control. PA 178/62 mmHg en ambos brazos, repetida en dos visitas. Asintomática. ECG con criterios de hipertrofia ventricular izquierda.',
    pasos: [
      { q: 'Calcula su presión de pulso e interprétala.', pista: 'PP = PAS − PAD.', r: '116 mmHg, muy amplia. Con una diastólica de 62 mmHg, el problema no es un aumento de la resistencia arteriolar sino una <b>pérdida de compliance aórtica</b>: hipertensión sistólica aislada.' },
      { q: '¿Por qué su diastólica es baja si está hipertensa?', pista: 'Windkessel.', r: 'Porque la aorta rígida no almacena volumen en sístole ni lo devuelve en diástole. Sin retroceso elástico, la presión cae más de lo normal durante la diástole. Es un signo de rigidez, no de "buena" presión.' },
      { q: '¿Por qué tiene hipertrofia ventricular?', pista: 'Poscarga.', r: 'La presión sistólica elevada, reforzada por las ondas de reflexión que retornan precozmente sobre una aorta rígida, aumenta la tensión parietal sistólica. La respuesta adaptativa es la hipertrofia concéntrica, que normaliza la tensión aumentando el grosor (Laplace) pero a costa de rigidez ventricular y disfunción diastólica.' },
      { q: '¿Qué riesgo específico tiene su combinación de sistólica alta y diastólica baja?', pista: 'Aporte y demanda coronaria.', r: 'Isquemia subendocárdica. Su miocardio hipertrofiado tiene mayor demanda de oxígeno, mientras que la perfusión coronaria izquierda —que ocurre en diástole y depende del gradiente entre presión diastólica aórtica y presión telediastólica del VI— está reducida por ambos extremos. Puede tener angina sin lesiones coronarias significativas.' },
      { q: '¿Qué cuidado especial exige tratarla?', pista: '¿Qué pasa con la diastólica al bajar la sistólica?', r: 'Al reducir la presión sistólica también desciende la diastólica, que ya está baja. Si se lleva la diastólica por debajo de aproximadamente 55–60 mmHg puede comprometerse la perfusión coronaria (el fenómeno de la "curva en J"). Se titula despacio, con fármacos que actúen sobre la rigidez y el volumen —tiazidas, calcioantagonistas, IECA/ARA-II—, vigilando síntomas y ortostatismo, especialmente frecuente en esta edad por barorreflejo menos sensible.' }
    ],
    cierre: 'Un solo par de números leído con <code>PP ≈ VS/compliance</code> revela el mecanismo, el remodelado esperado, el riesgo isquémico y las precauciones del tratamiento.'
  },

  tarjetas: [
    { f: 'Ecuaciones fundamentales de la presión arterial', d: 'PAM = GC × RVS. PAM ≈ PAD + ⅓(PAS − PAD). Presión de pulso ≈ VS / compliance arterial.' },
    { f: 'Presión de pulso estrecha vs amplia', d: 'Estrecha = VS bajo ± vasoconstricción (shock hipovolémico/cardiogénico, taponamiento, estenosis aórtica). Amplia = ↑VS o escape diastólico (insuficiencia aórtica, fístula AV, tirotoxicosis) o ↓compliance (anciano).' },
    { f: 'Ley de Poiseuille: por qué manda la arteriola', d: 'R ∝ 1/r⁴. Reducir el radio a la mitad multiplica la resistencia por 16. Por eso la arteriola es el vaso de resistencia y el punto de regulación de la presión.' },
    { f: 'Función de Windkessel', d: 'La aorta elástica almacena volumen en sístole y lo devuelve en diástole, amortiguando el pico sistólico y SOSTENIENDO la presión diastólica (perfusión coronaria). Se pierde con la rigidez aórtica.' },
    { f: 'Hipertensión sistólica aislada del anciano: doble daño', d: 'Sistólica alta → ↑poscarga, hipertrofia, ↑demanda de O₂. Diastólica baja → ↓presión de perfusión coronaria. Más demanda y menos aporte simultáneamente.' },
    { f: 'Autorregulación desplazada en el hipertenso crónico', d: 'La curva se desplaza a la derecha: tolera presiones altas pero se hace isquémico con presiones "normales". Por eso no se baja la PA bruscamente (reducir 20–25 % en horas), salvo disección, edema agudo de pulmón o eclampsia.' },
    { f: 'Natriuresis por presión (Guyton)', d: 'El riñón excreta más Na⁺ y agua cuando sube la presión, devolviéndola a su punto de ajuste. Ganancia teóricamente infinita → toda hipertensión crónica implica un desplazamiento de la curva renal.' }
  ]
},

/* ---------------------------------------------------------- */
{
  id: 'barorreflejo',
  modulo: 'regulacion',
  nombre: 'Regulación autonómica y barorreflejo',
  alto: true,
  minutos: 20,
  requisitos: ['presion-arterial'],
  ideaCentral: 'El barorreflejo es el regulador de segundos de la presión arterial: un arco cuyo sensor descarga más cuando la presión sube e inhibe el simpático. Es un sistema de corrección de errores a corto plazo que se adapta en días, razón por la cual mantiene la presión al levantarse pero no puede causar ni curar la hipertensión crónica.',

  anclaje: {
    q: 'Antes de leer: al ponerte de pie, aproximadamente 500 mL de sangre se desplazan a las piernas. ¿Por qué no te desmayas? Enumera la secuencia completa del reflejo.',
    pista: 'Sensor → aferencia → centro → eferencia → efectores. Nombra al menos cuatro efectos.'
  },

  bloques: [
    {
      nivel: 'imprescindible',
      titulo: 'El arco reflejo completo',
      html: '<ol><li><b>Sensores</b>: mecanorreceptores de estiramiento en el <b>seno carotídeo</b> (nervio de Hering → glosofaríngeo, IX) y en el <b>cayado aórtico</b> (vago, X). Descargan de forma <b>tónica</b>: siempre están enviando señales, y lo que informa es el cambio de frecuencia.</li>' +
        '<li><b>Centro</b>: núcleo del tracto solitario en el bulbo.</li>' +
        '<li><b>Eferencia</b>: modula el tono simpático (centro vasomotor) y el parasimpático (núcleo ambiguo y dorsal del vago).</li>' +
        '<li><b>Efectores</b>: corazón (frecuencia y contractilidad), arteriolas (resistencia), venas (capacitancia) y, secundariamente, riñón.</li></ol>' +
        '<p><b>La lógica del signo</b>, que es donde falla la mayoría: los barorreceptores son <b>inhibidores</b> del simpático. Más presión → más estiramiento → <b>más</b> descarga → <b>más</b> inhibición del centro vasomotor → menos simpático y más vago.</p>',
      cadena: ['↑ Presión arterial', '↑ Estiramiento del seno', '↑ Descarga aferente', 'Inhibición simpática + ↑ vagal', '↓ FC, ↓ contractilidad, vasodilatación', '↓ Presión arterial']
    },
    {
      nivel: 'imprescindible',
      titulo: 'Respuesta a la hipotensión: la cascada de la desinhibición',
      html: '<p>Cuando la presión cae ocurre lo contrario, y conviene tenerlo automatizado porque es la respuesta que se ve en todo shock:</p>' +
        '<p>↓PA → ↓estiramiento → <b>↓descarga aferente</b> → se <b>desinhibe</b> el centro vasomotor → ↑simpático y ↓vagal →</p>' +
        '<ul><li><b>Taquicardia</b> (β₁ en el nodo sinusal) y <b>↑contractilidad</b> (β₁ miocárdico) → ↑gasto cardíaco.</li>' +
        '<li><b>Vasoconstricción arteriolar</b> (α₁) → ↑RVS → ↑presión.</li>' +
        '<li><b>Venoconstricción</b> (α₁ venoso) → ↑Psm → ↑retorno venoso → ↑precarga. <i>Este es el efecto que más se olvida y uno de los más importantes.</i></li>' +
        '<li><b>Liberación de adrenalina</b> por la médula suprarrenal y activación del SRAA.</li></ul>' +
        '<p>🔥 Detalle de examen: el barorreflejo se <b>adapta en 1–2 días</b> a un nuevo nivel de presión. Por eso no puede ser la causa de la hipertensión crónica ni corregirla; es un sistema de corrección de errores agudos.</p>'
    },
    {
      nivel: 'importante',
      titulo: 'Otros reflejos que hay que distinguir',
      html: '<table><tr><th>Reflejo</th><th>Sensor</th><th>Estímulo</th><th>Respuesta</th></tr>' +
        '<tr><td>Barorreceptor</td><td>Seno carotídeo, cayado</td><td>Presión (estiramiento)</td><td>Ajuste de FC y RVS</td></tr>' +
        '<tr><td>Quimiorreceptor periférico</td><td>Cuerpo carotídeo y aórtico</td><td>↓PaO₂, ↑PaCO₂, ↓pH</td><td>↑ventilación, ↑simpático</td></tr>' +
        '<tr><td>Bainbridge</td><td>Aurículas</td><td>↑volumen/estiramiento auricular</td><td>↑FC (protege de sobrecarga)</td></tr>' +
        '<tr><td>Bezold-Jarisch</td><td>Pared inferoposterior del VI</td><td>Isquemia, estimulación química</td><td>Bradicardia + hipotensión (vagal)</td></tr>' +
        '<tr><td>Cushing</td><td>Bulbo (isquemia)</td><td>↑presión intracraneal</td><td>↑PA, bradicardia, respiración irregular</td></tr></table>' +
        '<p>El <b>reflejo de Cushing</b> merece atención: ante hipertensión intracraneal, la isquemia bulbar dispara una descarga simpática masiva para elevar la presión y preservar la perfusión cerebral; la bradicardia es secundaria, mediada por el barorreflejo que responde a esa hipertensión. Es un signo tardío y grave de herniación inminente.</p>'
    },
    {
      nivel: 'complementario',
      titulo: 'Receptores de volumen y regulación a largo plazo',
      html: '<p>Los receptores de <b>baja presión</b> (aurículas, venas pulmonares) detectan el volumen más que la presión. Su distensión libera <b>péptido natriurético auricular (ANP)</b>, que produce natriuresis, vasodilatación e inhibición del SRAA: el contrapeso endógeno de la retención hidrosalina.</p>' +
        '<p>De ahí surge un fármaco moderno: el <b>sacubitrilo</b> inhibe la neprilisina, la enzima que degrada los péptidos natriuréticos, potenciando su efecto. Se combina con valsartán (ARNI) porque inhibir la neprilisina de forma aislada aumentaría también la angiotensina II.</p>' +
        '<p>El <b>BNP</b> se libera desde el ventrículo ante estiramiento y sobrecarga de presión, y por eso es un marcador diagnóstico y pronóstico de insuficiencia cardíaca. Nótese la coherencia: su elevación es literalmente la señal de un ventrículo distendido.</p>'
    }
  ],

  variables: [
    { n: 'Descarga barorreceptora', d: 'down', nota: 'en la hipotensión: menos descarga = más simpático' },
    { n: 'Tono simpático', d: 'up', nota: 'FC, contractilidad, RVS y venoconstricción' },
    { n: 'Tono vagal', d: 'down', nota: 'retirada vagal: primer mecanismo de taquicardización' },
    { n: 'Capacitancia venosa', d: 'down', nota: 'venoconstricción → ↑Psm → ↑retorno venoso' }
  ],

  fisiopatologia: '<p><b>Barorreflejo insuficiente:</b> hipotensión ortostática del anciano, neuropatía autonómica diabética, enfermedad de Parkinson y atrofia multisistémica, deplección de volumen, fármacos (alfabloqueantes, diuréticos, antidepresivos tricíclicos, nitratos). Se manifiesta como caída de la presión al incorporarse <b>sin taquicardia compensadora</b>, y esa ausencia de taquicardia es la clave que distingue el fallo autonómico de la simple hipovolemia.</p>' +
    '<p><b>Barorreflejo hiperactivo:</b> síndrome del seno carotídeo (el estímulo de un cuello ajustado o el afeitado provoca bradicardia y síncope) y <b>síncope vasovagal</b>, la causa más frecuente de síncope: ante un estímulo desencadenante, tras un período de aumento de contractilidad sobre un ventrículo poco lleno, se dispara una respuesta paradójica de retirada simpática y activación vagal masiva, con vasodilatación y bradicardia.</p>' +
    '<p>En la <b>insuficiencia cardíaca crónica</b> la sensibilidad barorrefleja está reducida, lo que contribuye a la activación simpática persistente y es un marcador pronóstico adverso.</p>',

  clinica: '<p>Prueba de cabecera: medir presión y frecuencia en decúbito y tras 1 y 3 minutos de bipedestación. Una caída de ≥ 20 mmHg de sistólica o ≥ 10 de diastólica define la hipotensión ortostática. <b>Con</b> taquicardia sugiere hipovolemia; <b>sin</b> taquicardia sugiere fallo autonómico o betabloqueo.</p>' +
    '<p>El <b>masaje del seno carotídeo</b> aplica el reflejo con fines diagnósticos y terapéuticos: aumenta la descarga aferente simulando hipertensión, lo que incrementa el tono vagal y frena el nodo AV. Sirve para cortar taquicardias por reentrada nodal y para desenmascarar un flutter. Se realiza con precauciones: nunca bilateral, y contraindicado si hay soplo carotídeo o antecedente de ictus.</p>',

  error: {
    confunde: 'Invertir el signo del reflejo: pensar que más presión produce más descarga simpática.',
    parecido: 'Intuitivamente uno asocia "más presión" con "más actividad" del sistema, y la palabra "activación" del barorreceptor se interpreta como activación simpática.',
    diferencia: 'Los barorreceptores <b>inhiben</b> el simpático. Su descarga aumenta cuando sube la presión y ese aumento de descarga <i>frena</i> el centro vasomotor. En la hipotensión, la disminución de la descarga <b>desinhibe</b> el simpático. El reflejo funciona por retirada de un freno tónico, no por adición de un estímulo.',
    ejemplo: 'Al comprimir el seno carotídeo se simula una presión alta: aumenta la descarga aferente, se inhibe el simpático, se activa el vago y aparece bradicardia. Si el signo fuera el contrario, el masaje carotídeo produciría taquicardia y no serviría para cortar arritmias.',
    regla: 'El barorreceptor es un freno, no un acelerador. "Más estiramiento = más freno."'
  },

  perla: '🔥 En la hipotensión ortostática, la <b>presencia o ausencia de taquicardia</b> compensadora divide el diagnóstico en dos: con taquicardia, el reflejo funciona y el problema es el volumen; sin taquicardia, el reflejo está roto (disautonomía) o bloqueado (betabloqueantes). Es una de las observaciones de mayor rendimiento a pie de cama.',

  feynman: {
    consigna: 'Explica paso a paso qué ocurre en tu cuerpo en los 15 segundos siguientes a ponerte de pie, y por qué un paciente con neuropatía diabética se marea al hacerlo.',
    puntos: [
      'Describo el desplazamiento de sangre a las piernas y la caída del retorno venoso',
      'Explico la caída del volumen sistólico y de la presión',
      'Explico la reducción de la descarga barorreceptora y la desinhibición simpática',
      'Enumero los cuatro efectores: FC, contractilidad, arteriolas y venas',
      'Explico por qué la disautonomía rompe la eferencia y no la aferencia'
    ],
    referencia: '<p>Al incorporarse, la gravedad desplaza unos 500–700 mL de sangre hacia los lechos venosos de las piernas y el abdomen. El retorno venoso cae de inmediato, y con él la precarga: por la ley de Frank-Starling, el volumen sistólico disminuye y la presión arterial tiende a caer.</p>' +
      '<p>Los mecanorreceptores del seno carotídeo y del cayado aórtico detectan el menor estiramiento y <b>reducen</b> su frecuencia de descarga hacia el núcleo del tracto solitario. Como esa descarga ejerce un freno tónico sobre el centro vasomotor, su reducción <b>desinhibe</b> el simpático y retira el tono vagal.</p>' +
      '<p>El resultado son cuatro efectos en paralelo, todos en el mismo sentido. En el nodo sinusal, estimulación β₁ produce <b>taquicardia</b> (los primeros latidos por retirada vagal, que es más rápida). En el miocardio, <b>aumento de contractilidad</b>. En las arteriolas, vasoconstricción α₁ que <b>eleva la resistencia</b>, especialmente en los lechos esplácnico y muscular. Y en las venas, <b>venoconstricción</b> que reduce la capacitancia, convierte volumen no estresado en estresado, eleva la presión sistémica media de llenado y recupera retorno venoso. Este último efecto es el que más se olvida y el que ataca la causa del problema, no solo su consecuencia. En segundos la presión se estabiliza; en minutos se suman la activación del SRAA y la vasopresina.</p>' +
      '<p>En la <b>neuropatía autonómica diabética</b>, la lesión está en las fibras eferentes simpáticas (y en las aferentes en fases avanzadas). El sensor detecta la caída de presión y el centro emite la orden, pero la orden <b>no llega</b>: no hay vasoconstricción ni venoconstricción eficaces, y con frecuencia tampoco taquicardia adecuada porque la inervación cardíaca también está denervada. La presión cae sin corrección y aparece el mareo o el síncope. Ese patrón —hipotensión ortostática <b>sin</b> taquicardia compensadora— es la firma clínica del fallo autonómico y lo distingue de la hipovolemia simple, en la que el reflejo funciona y la taquicardia está presente.</p>'
  },

  preguntas: [
    { nivel: 1, q: '¿Dónde están los barorreceptores arteriales y por qué nervios viajan sus aferencias?', r: 'En el seno carotídeo (nervio de Hering, rama del glosofaríngeo, IX) y en el cayado aórtico (nervio vago, X). Ambos terminan en el núcleo del tracto solitario del bulbo.' },
    { nivel: 1, q: 'Si la presión arterial cae, ¿la descarga de los barorreceptores aumenta o disminuye, y qué efecto tiene?', r: 'Disminuye. Al reducirse su descarga se desinhibe el centro vasomotor: aumenta el simpático y disminuye el vagal, produciendo taquicardia, aumento de contractilidad, vasoconstricción y venoconstricción.' },
    { nivel: 1, q: '¿Por qué el barorreflejo no puede causar hipertensión crónica?', r: 'Porque se adapta en 1–2 días al nuevo nivel de presión: reajusta su punto de operación y deja de "protestar". Es un sistema de corrección de errores agudos, no de control a largo plazo, que corresponde al riñón.' },
    { nivel: 2, q: 'Explica por qué el masaje del seno carotídeo produce bradicardia.', r: 'La compresión externa deforma el seno y simula un aumento de presión: aumenta la descarga aferente, que inhibe el simpático y activa el vago. El resultado es enlentecimiento del nodo sinusal y bloqueo transitorio del nodo AV, útil para cortar una taquicardia por reentrada nodal o desenmascarar un flutter.' },
    { nivel: 2, q: 'Diferencia el reflejo de Bainbridge del barorreflejo.', r: 'El de Bainbridge parte de receptores de estiramiento auriculares (baja presión) y responde al aumento de volumen con taquicardia, para evitar el remanso de sangre. El barorreflejo parte de receptores arteriales (alta presión) y responde al aumento de presión con bradicardia. Ante una sobrecarga de volumen ambos compiten, y el resultado depende de cuál predomine.' },
    { nivel: 2, q: '¿Qué es la tríada de Cushing y cuál es su secuencia fisiológica?', r: 'Hipertensión, bradicardia y respiración irregular ante hipertensión intracraneal. La isquemia bulbar dispara una descarga simpática masiva que eleva la presión para preservar la presión de perfusión cerebral (PPC = PAM − PIC); la bradicardia es <b>secundaria</b>, mediada por el barorreflejo que responde a esa hipertensión. Es signo de herniación inminente.' },
    { nivel: 3, q: 'Paciente diabético de larga evolución con síncopes al levantarse. En bipedestación, la PA cae de 130/80 a 90/55 y la FC pasa de 76 a 78 lpm. ¿Qué te dice la frecuencia?', r: 'Que el arco reflejo está roto en su porción eferente: hay hipotensión ortostática significativa sin taquicardia compensadora, lo que indica neuropatía autonómica y no hipovolemia. Si el problema fuera de volumen, el reflejo intacto habría producido una taquicardia clara. Tiene implicaciones prácticas: estos pacientes se benefician de medidas mecánicas (medias de compresión, incorporación gradual, hidratación y sal) y, si es preciso, de fludrocortisona o midodrina, más que de retirar únicamente fármacos.' },
    { nivel: 3, q: 'Un joven se desmaya tras estar de pie mucho tiempo en un ambiente caluroso. Antes del síncope estaba pálido, sudoroso y con náuseas. Explica el mecanismo del síncope vasovagal.', r: 'La bipedestación prolongada y el calor producen acumulación venosa y vasodilatación cutánea, reduciendo el retorno venoso. El barorreflejo responde con taquicardia y aumento de contractilidad, pero el ventrículo está poco lleno y su contracción vigorosa sobre una cavidad casi vacía estimula mecanorreceptores ventriculares (fibras C). Estos disparan una respuesta paradójica de tipo Bezold-Jarisch: <b>retirada simpática brusca con activación vagal masiva</b>, que produce vasodilatación y bradicardia simultáneas. Cae la presión y con ella la perfusión cerebral: síncope. Los pródromos (palidez, sudoración, náuseas) reflejan la fase de activación autonómica previa. Al caer al suelo se restaura el retorno venoso y el paciente se recupera espontáneamente, lo que explica que la posición horizontal sea a la vez tratamiento y prueba diagnóstica.' }
  ],

  caso: {
    vineta: 'Varón de 78 años en tratamiento con tamsulosina, furosemida y bisoprolol. Traído por caída en su domicilio al levantarse de la cama. Consciente, sin focalidad. En decúbito: PA 138/76, FC 62. A los 3 minutos de pie: PA 96/58, FC 66.',
    pasos: [
      { q: '¿Cumple criterios de hipotensión ortostática?', pista: 'Umbrales: 20 mmHg sistólica o 10 diastólica.', r: 'Sí: la sistólica cae 42 mmHg y la diastólica 18 mmHg, muy por encima de los umbrales de 20 y 10 mmHg.' },
      { q: 'La frecuencia apenas sube 4 lpm. ¿Qué significa eso?', pista: 'El reflejo debería producir taquicardia.', r: 'Que la respuesta compensadora está bloqueada. Con esa caída de presión, un barorreflejo intacto habría producido una taquicardia evidente. Aquí el bisoprolol bloquea los receptores β₁ del nodo sinusal e impide la respuesta cronotrópica.' },
      { q: 'Analiza la contribución de cada uno de sus tres fármacos.', pista: 'Cada uno ataca un efector distinto del reflejo.', r: 'La <b>furosemida</b> reduce el volumen y por tanto la presión sistémica media de llenado: menos precarga de partida. La <b>tamsulosina</b> bloquea receptores α₁, impidiendo tanto la vasoconstricción arteriolar como la venoconstricción compensadoras. El <b>bisoprolol</b> bloquea la respuesta de frecuencia y contractilidad. Entre los tres han inutilizado los cuatro efectores del barorreflejo y además han reducido el punto de partida.' },
      { q: '¿Por qué es especialmente vulnerable por su edad?', pista: 'El reflejo envejece.', r: 'Con la edad disminuye la sensibilidad barorrefleja, se reduce la compliance arterial y ventricular, disminuye la respuesta β-adrenérgica y se altera la conservación renal de sodio. El anciano depende más de la precarga y compensa peor, de modo que tolera mucho peor la deplección de volumen y los vasodilatadores.' },
      { q: '¿Qué intervención tiene más impacto y por qué?', pista: 'Piensa en la causa, no en un fármaco nuevo.', r: 'Revisar y desprescribir. Reducir o retirar la tamsulosina y ajustar el diurético devuelve capacidad compensadora sin necesidad de añadir tratamientos. Se complementa con medidas mecánicas: incorporarse en dos tiempos, medias de compresión, hidratación adecuada y elevar el cabecero de la cama. Añadir un fármaco presor a un paciente polimedicado que se cae por sus fármacos es tratar el efecto de un error con otro fármaco.' }
    ],
    cierre: 'Este caso es el barorreflejo explorado con un manguito y un reloj: la ausencia de taquicardia ante una hipotensión clara localiza el fallo en la eferencia, y la lista de fármacos explica exactamente qué eslabón está roto.'
  },

  tarjetas: [
    { f: 'Arco del barorreflejo completo', d: 'Sensores: seno carotídeo (n. de Hering → IX) y cayado aórtico (X) → núcleo del tracto solitario → modulación de simpático y vago → corazón, arteriolas, venas.' },
    { f: 'Signo del barorreflejo (el error clásico)', d: 'Los barorreceptores INHIBEN el simpático. ↑PA → ↑estiramiento → ↑descarga → MÁS inhibición → bradicardia y vasodilatación. En la hipotensión, ↓descarga DESINHIBE el simpático.' },
    { f: 'Cuatro efectores de la respuesta a la hipotensión', d: '↑FC (β₁), ↑contractilidad (β₁), vasoconstricción arteriolar (α₁ → ↑RVS) y VENOCONSTRICCIÓN (α₁ venoso → ↑Psm → ↑retorno venoso). El cuarto es el más olvidado.' },
    { f: '¿Por qué el barorreflejo no causa hipertensión crónica?', d: 'Porque se adapta en 1–2 días al nuevo nivel de presión (reajuste del punto de operación). Es corrección de errores agudos; el control a largo plazo es renal (natriuresis por presión).' },
    { f: 'Hipotensión ortostática CON vs SIN taquicardia', d: 'CON taquicardia = reflejo intacto, problema de volumen (hipovolemia). SIN taquicardia = fallo autonómico (disautonomía diabética, Parkinson) o betabloqueo. Distinción de máximo rendimiento a pie de cama.' },
    { f: 'Tríada de Cushing y su secuencia', d: 'Hipertensión + bradicardia + respiración irregular por ↑PIC. La isquemia bulbar dispara descarga simpática para preservar la PPC (= PAM − PIC); la bradicardia es SECUNDARIA, vía barorreflejo. Signo de herniación inminente.' },
    { f: 'Mecanismo del síncope vasovagal', d: 'Acumulación venosa → ventrículo poco lleno + contracción vigorosa → mecanorreceptores ventriculares (fibras C) → retirada simpática brusca + activación vagal masiva → vasodilatación y bradicardia simultáneas.' },
    { f: 'ANP/BNP y el fundamento del sacubitrilo', d: 'Se liberan por estiramiento auricular/ventricular: natriuresis, vasodilatación e inhibición del SRAA. El sacubitrilo inhibe la neprilisina que los degrada; se combina con valsartán porque también aumentaría la angiotensina II.' }
  ]
},

/* ---------------------------------------------------------- */
{
  id: 'sraa',
  modulo: 'regulacion',
  nombre: 'Sistema renina-angiotensina-aldosterona',
  alto: true,
  minutos: 20,
  requisitos: ['barorreflejo'],
  ideaCentral: 'El SRAA es el regulador de horas a días del volumen y la presión: percibe la perfusión renal y responde reteniendo sodio y constriñendo arteriolas. Diseñado para sobrevivir a una hemorragia, se convierte en el motor del daño cuando se activa de forma crónica ante un gasto cardíaco bajo, y por eso bloquearlo —no estimular la bomba— es lo que cambia el pronóstico en la insuficiencia cardíaca.',

  anclaje: {
    q: 'Sin mirar: nombra los tres estímulos que liberan renina y explica por qué un paciente con insuficiencia cardíaca tiene el sistema activado aunque su volumen corporal total esté aumentado.',
    pista: 'El riñón no mide volumen: mide algo más local.'
  },

  bloques: [
    {
      nivel: 'imprescindible',
      titulo: 'La cascada y sus tres disparadores',
      html: '<p>Las células yuxtaglomerulares liberan <b>renina</b> ante tres estímulos:</p>' +
        '<ol><li><b>Caída de la presión de perfusión renal</b> (barorreceptor intrarrenal en la arteriola aferente).</li>' +
        '<li><b>Descenso del NaCl en la mácula densa</b> del túbulo distal.</li>' +
        '<li><b>Estimulación simpática β₁</b> sobre el aparato yuxtaglomerular.</li></ol>' +
        '<p>Cascada: angiotensinógeno (hígado) —renina→ angiotensina I —ECA (pulmón)→ <b>angiotensina II</b>.</p>' +
        '<p>Acciones de la angiotensina II, que conviene tener en bloque:</p>' +
        '<ul><li><b>Vasoconstricción arteriolar</b> potente → ↑RVS → ↑PA.</li>' +
        '<li>Constricción <b>preferente de la arteriola eferente</b> → mantiene la presión de filtración glomerular cuando cae la perfusión.</li>' +
        '<li>↑ Reabsorción de Na⁺ en el <b>túbulo proximal</b> (efecto directo, cuantitativamente el mayor).</li>' +
        '<li>Estimula la <b>aldosterona</b> (suprarrenal) → reabsorción de Na⁺ y excreción de K⁺ en el túbulo colector.</li>' +
        '<li>Estimula la <b>ADH</b> y la sed.</li>' +
        '<li>Promueve <b>remodelado, hipertrofia y fibrosis</b> cardíaca y vascular.</li></ul>',
      cadena: ['↓ Perfusión renal', '↑ Renina', '↑ Angiotensina II', 'Vasoconstricción + ↑ aldosterona', '↑ Na⁺ y agua', '↑ Volumen y ↑ PA']
    },
    {
      nivel: 'imprescindible',
      titulo: 'Por qué se activa en la insuficiencia cardíaca',
      html: '<p>Aquí está la clave conceptual: el riñón <b>no mide el volumen corporal total</b>, mide la <b>perfusión</b> que le llega. En la insuficiencia cardíaca el gasto es bajo, la perfusión renal cae y el riñón interpreta que hay hipovolemia, aunque el paciente esté edematoso y con litros de más.</p>' +
        '<p>El concepto que resuelve la aparente paradoja es el de <b>volumen circulante efectivo</b>: la parte del volumen que realmente perfunde los tejidos. Puede estar bajo con un volumen total alto (insuficiencia cardíaca, cirrosis con vasodilatación esplácnica, síndrome nefrótico).</p>' +
        '<p>Resultado: retención de sodio y agua sobre un corazón que ya no puede manejar el volumen, más vasoconstricción que aumenta la poscarga, más fibrosis. <b>La compensación se convierte en la enfermedad.</b></p>'
    },
    {
      nivel: 'importante',
      titulo: 'Farmacología deducida de la cascada',
      html: '<table><tr><th>Fármaco</th><th>Diana</th><th>Consecuencia clave</th></tr>' +
        '<tr><td>IECA</td><td>Enzima convertidora</td><td>↓ angiotensina II; acumulación de <b>bradicinina</b> → tos y angioedema</td></tr>' +
        '<tr><td>ARA-II</td><td>Receptor AT₁</td><td>Mismo efecto sin bradicinina: sin tos</td></tr>' +
        '<tr><td>ARNI (sacubitrilo/valsartán)</td><td>Neprilisina + AT₁</td><td>Potencia los péptidos natriuréticos y bloquea AT₁</td></tr>' +
        '<tr><td>Espironolactona / eplerenona</td><td>Receptor mineralocorticoide</td><td>Antifibrótico; riesgo de hiperpotasemia</td></tr>' +
        '<tr><td>Betabloqueantes</td><td>β₁ yuxtaglomerular</td><td>↓ liberación de renina (efecto añadido al cardíaco)</td></tr></table>' +
        '<p>🔥 Efecto sobre la creatinina: los IECA/ARA-II dilatan la arteriola <b>eferente</b>, lo que reduce la presión intraglomerular y baja el filtrado. Un ascenso de la creatinina hasta un 30 % es esperable y refleja que el fármaco está funcionando; es <b>hemodinámico y protector a largo plazo</b>, no nefrotóxico. Un ascenso mayor obliga a sospechar estenosis bilateral de la arteria renal o hipovolemia.</p>'
    },
    {
      nivel: 'complementario',
      titulo: 'Estenosis de la arteria renal y otros escenarios',
      html: '<p>En la <b>estenosis unilateral</b>, el riñón isquémico libera renina de forma continua y produce hipertensión renovascular; el riñón contralateral, sometido a presión alta, elimina sodio (natriuresis por presión) y evita la sobrecarga de volumen.</p>' +
        '<p>En la <b>estenosis bilateral</b> (o unilateral sobre riñón único), el filtrado depende críticamente de la constricción eferente por angiotensina II. Administrar un IECA suprime ese soporte y puede producir <b>fracaso renal agudo</b>. Es la contraindicación clásica y el ejemplo perfecto de cómo un fármaco correcto en un mecanismo es peligroso en otro.</p>' +
        '<p><b>Hiperaldosteronismo primario</b>: aldosterona alta con renina <b>suprimida</b> (a diferencia del secundario, donde ambas están altas). Cursa con hipertensión, hipopotasemia y alcalosis metabólica, y es la causa identificable más frecuente de hipertensión secundaria.</p>' +
        '<p><b>Escape de la aldosterona</b>: la retención de sodio no es infinita porque el ANP y la natriuresis por presión la contrarrestan; por eso el hiperaldosteronismo produce hipertensión pero no edema masivo.</p>'
    }
  ],

  variables: [
    { n: 'Perfusión renal', d: 'down', nota: 'disparador principal de la renina' },
    { n: 'Angiotensina II', d: 'up', nota: 'vasoconstricción, retención de Na⁺, remodelado' },
    { n: 'Aldosterona', d: 'up', nota: 'reabsorbe Na⁺, excreta K⁺, produce fibrosis' },
    { n: 'Volumen extracelular', d: 'up', nota: 'útil en la hemorragia, dañino en la insuficiencia cardíaca' }
  ],

  fisiopatologia: '<p>El SRAA es el ejemplo canónico de <b>compensación maladaptativa</b>. En una hemorragia salva la vida: retiene sodio y agua y sostiene la presión. En la insuficiencia cardíaca crónica hace lo mismo ante una señal errónea, y cada una de sus acciones empeora la situación: la retención de volumen aumenta la precarga sobre un ventrículo congestivo, la vasoconstricción aumenta la poscarga sobre un ventrículo que ya no puede vencerla, y la angiotensina II y la aldosterona promueven hipertrofia, apoptosis y fibrosis intersticial, que rigidifican el ventrículo y crean sustrato arritmogénico.</p>' +
    '<p>Este es el fundamento de que el tratamiento que mejora la supervivencia sea el que <b>bloquea</b> el sistema, y de que el beneficio de los antialdosterónicos aparezca a dosis que apenas tienen efecto diurético: el mecanismo principal es antifibrótico, no natriurético.</p>',

  clinica: '<p>Diego lo verá a diario en la UCI: el paciente con insuficiencia cardíaca descompensada tiene hiponatremia (por ADH activada, un marcador de mala perfusión y de mal pronóstico), sodio urinario bajo (ávido de sodio), y responde a los diuréticos con activación neurohumoral que puede producir empeoramiento de la función renal —el llamado <b>síndrome cardiorrenal</b>—.</p>' +
    '<p>La lógica para distinguirlo: si la creatinina sube porque el paciente está congestivo y con presión venosa elevada, el problema es la <b>congestión renal</b> (la presión venosa alta reduce el gradiente de perfusión del riñón) y la respuesta correcta es descongestionar más, no menos. Si sube por hipoperfusión real, se necesita mejorar el gasto. Esa distinción, difícil y frecuente, se apoya en la exploración, la presión venosa, la ecografía y la respuesta al tratamiento.</p>',

  error: {
    confunde: 'Interpretar la activación del SRAA en la insuficiencia cardíaca como prueba de que el paciente está deshidratado.',
    parecido: 'Los hallazgos son idénticos a los de una hipovolemia real: renina alta, aldosterona alta, sodio urinario bajo, oliguria, hiponatremia.',
    diferencia: 'El riñón responde a la <b>perfusión</b>, no al volumen total. En la insuficiencia cardíaca el volumen extracelular está aumentado pero el volumen circulante <b>efectivo</b> es bajo. El paciente está simultáneamente sobrecargado de agua e "hipovolémico" desde el punto de vista del riñón.',
    ejemplo: 'Paciente edematoso, con derrame pleural y 8 kg de más, con sodio urinario de 10 mEq/L y renina elevada. Todos los marcadores gritan "hipovolemia" y lo que necesita es descongestión.',
    regla: 'El riñón no mide litros, mide flujo. Volumen total ≠ volumen circulante efectivo.'
  },

  perla: '🔥 Aldosterona alta con renina <b>suprimida</b> = hiperaldosteronismo primario. Aldosterona alta con renina <b>alta</b> = secundario (insuficiencia cardíaca, cirrosis, estenosis renal, hipovolemia). Y una subida de creatinina de hasta el 30 % al iniciar un IECA es esperada y aceptable: es efecto hemodinámico sobre la arteriola eferente, no toxicidad.',

  feynman: {
    consigna: 'Explica por qué un paciente con insuficiencia cardíaca y 8 kg de líquido retenido tiene el sistema renina-angiotensina activado, y por qué eso lo empeora.',
    puntos: [
      'Explico los tres estímulos de liberación de renina',
      'Introduzco el concepto de volumen circulante efectivo',
      'Explico que el riñón detecta perfusión, no volumen total',
      'Detallo cómo cada acción del sistema empeora la insuficiencia',
      'Concluyo por qué el tratamiento eficaz es bloquear el sistema'
    ],
    referencia: '<p>El aparato yuxtaglomerular libera renina ante tres señales: caída de la presión de perfusión en la arteriola aferente, descenso del cloruro sódico que llega a la mácula densa y estimulación simpática β₁. Ninguna de esas tres señales mide el agua corporal total: las tres miden, directa o indirectamente, <b>cuánto flujo llega al riñón</b>.</p>' +
      '<p>En la insuficiencia cardíaca el gasto es bajo y la vasoconstricción sistémica redistribuye el flujo lejos del riñón. La perfusión renal cae, llega menos sodio a la mácula densa y el simpático está activado de forma crónica: las tres señales apuntan a lo mismo. El riñón concluye, correctamente desde su punto de vista, que el organismo está perdiendo volumen, y actúa en consecuencia. Este es el concepto de <b>volumen circulante efectivo</b>: la fracción del volumen que realmente perfunde los tejidos puede estar disminuida aunque el volumen total esté muy aumentado. Lo mismo ocurre en la cirrosis con vasodilatación esplácnica y en el síndrome nefrótico.</p>' +
      '<p>El problema es que cada acción del sistema, útil ante una hemorragia, es dañina aquí. La <b>retención de sodio y agua</b> aumenta la precarga de un ventrículo que ya está en la meseta de su curva de Starling: solo añade presión de llenado y congestión pulmonar. La <b>vasoconstricción</b> por angiotensina II aumenta la poscarga de un ventrículo con escasa reserva contráctil, cuya curva volumen sistólico/poscarga es empinada, y reduce aún más el gasto. La <b>angiotensina II y la aldosterona</b> estimulan directamente hipertrofia de miocitos, apoptosis y depósito de colágeno: el ventrículo se rigidifica, empeora la función diastólica y aparece sustrato para arritmias ventriculares. Y la <b>ADH</b> retiene agua libre, produciendo la hiponatremia dilucional que marca peor pronóstico.</p>' +
      '<p>De ahí la conclusión terapéutica que define la cardiología moderna: los fármacos que <b>bloquean</b> este eje —IECA, ARA-II, ARNI, antagonistas del receptor mineralocorticoide, betabloqueantes (que además reducen la liberación de renina)— mejoran la supervivencia, mientras que los que estimulan la contracción no lo hacen. No se trata de exprimir la bomba, sino de desactivar una compensación que se ha vuelto el motor de la enfermedad.</p>'
  },

  preguntas: [
    { nivel: 1, q: 'Enumera los tres estímulos que liberan renina.', r: 'Caída de la presión de perfusión renal (barorreceptor de la arteriola aferente), descenso del NaCl en la mácula densa y estimulación simpática β₁ del aparato yuxtaglomerular.' },
    { nivel: 1, q: 'Nombra al menos cuatro acciones de la angiotensina II.', r: 'Vasoconstricción arteriolar sistémica; constricción preferente de la arteriola eferente (mantiene el filtrado); aumento de la reabsorción proximal de sodio; estimulación de aldosterona y de ADH/sed; y promoción de hipertrofia y fibrosis.' },
    { nivel: 1, q: '¿Por qué los IECA producen tos y los ARA-II no?', r: 'Porque la enzima convertidora también degrada bradicinina. Al inhibirla, la bradicinina se acumula y produce tos y, ocasionalmente, angioedema. Los ARA-II bloquean el receptor AT₁ sin afectar a esa degradación.' },
    { nivel: 2, q: '¿Por qué sube la creatinina al iniciar un IECA y cuándo debe preocupar?', r: 'Porque la angiotensina II mantiene el filtrado constriñendo la arteriola eferente; al bloquearla, esa arteriola se dilata, cae la presión intraglomerular y desciende el filtrado. Un ascenso de hasta un 30 % es esperable y compatible con un efecto nefroprotector a largo plazo. Un ascenso mayor obliga a descartar estenosis bilateral de la arteria renal, hipovolemia o uso concomitante de AINE.' },
    { nivel: 2, q: 'Distingue hiperaldosteronismo primario de secundario por laboratorio.', r: 'En el primario la aldosterona está alta y la renina <b>suprimida</b> (la retención de sodio frena el sistema aguas arriba). En el secundario ambas están elevadas porque el estímulo procede de la renina (insuficiencia cardíaca, cirrosis, estenosis renal, hipovolemia).' },
    { nivel: 2, q: '¿Por qué la espironolactona beneficia en insuficiencia cardíaca a dosis casi sin efecto diurético?', r: 'Porque su beneficio principal en esa indicación es <b>antifibrótico</b>: bloquea los efectos de la aldosterona sobre el depósito de colágeno, el remodelado y el sustrato arritmogénico, además de reducir la excreción de potasio y magnesio. El efecto natriurético es secundario.' },
    { nivel: 3, q: 'Paciente hipertenso al que se le inicia un IECA y a los 5 días tiene una creatinina que se ha duplicado y potasio de 6,1. ¿Qué sospechas y por qué encaja?', r: 'Estenosis bilateral de las arterias renales (o unilateral sobre riñón único). En esa situación la presión de perfusión posestenótica es baja y el filtrado glomerular depende críticamente de la vasoconstricción eferente mediada por angiotensina II. Al bloquearla se pierde ese soporte, la presión intraglomerular se desploma y aparece fracaso renal agudo. La hiperpotasemia se explica por la caída del filtrado más la supresión de la aldosterona. Encaja especialmente en un paciente con arteriopatía difusa, soplos abdominales o edemas agudos de pulmón recurrentes.' },
    { nivel: 3, q: 'Paciente con insuficiencia cardíaca descompensada, edematoso, cuya creatinina sube mientras recibe diuréticos. Un colega quiere suspenderlos y dar fluidos. ¿Cómo razonas?', r: 'Hay que distinguir dos mecanismos opuestos. Si el paciente sigue congestivo —presión venosa elevada, ingurgitación yugular, cava dilatada—, el deterioro renal probablemente se deba a <b>congestión venosa renal</b>: la presión venosa alta reduce el gradiente de perfusión a través del riñón, que es presión arterial menos presión venosa. En ese caso hay que descongestionar <b>más</b>, no menos, y dar fluidos empeoraría el cuadro. Si, en cambio, hay signos de hipoperfusión real y presiones de llenado ya bajas, el problema es de gasto y se necesita soporte inotrópico o reducción de la carga. La exploración de la volemia, la presión venosa y la ecografía a pie de cama resuelven la disyuntiva mejor que la cifra de creatinina aislada.' }
  ],

  caso: {
    vineta: 'Mujer de 69 años con miocardiopatía dilatada (FE 28 %). Ingresa por disnea progresiva y edemas hasta raíz de muslos. Na⁺ 128 mEq/L, K⁺ 4,0, creatinina 1,4 mg/dL, sodio urinario 12 mEq/L. PA 104/68, FC 96.',
    pasos: [
      { q: 'Su sodio urinario es de 12 mEq/L. ¿Qué significa en una paciente con 8 kg de más?', pista: 'El riñón está reteniendo sodio con avidez.', r: 'Que el riñón se comporta como si el organismo estuviera hipovolémico: reabsorbe casi todo el sodio filtrado. Es la firma del SRAA activado y demuestra que el riñón percibe una perfusión insuficiente pese al exceso de volumen total.' },
      { q: '¿Por qué está hiponatrémica?', pista: 'Agua libre, no sodio.', r: 'Es una hiponatremia <b>dilucional</b> por exceso de agua libre, no por déficit de sodio. El bajo volumen circulante efectivo estimula la liberación no osmótica de ADH, que retiene agua desproporcionadamente respecto al sodio. Su gravedad se correlaciona con la severidad de la activación neurohumoral, por eso la hiponatremia es un marcador pronóstico adverso en insuficiencia cardíaca.' },
      { q: '¿Por qué no se corrige con suero salino?', pista: '¿Cuál es la causa: falta de sodio o exceso de agua?', r: 'Porque el problema es exceso de agua, no falta de sodio. Aportar salino añade volumen a una paciente congestiva y el agua se retendrá igualmente mientras persista el estímulo de ADH. El tratamiento correcto es mejorar la hemodinámica y descongestionar, con restricción hídrica; al mejorar el gasto y la perfusión cae el estímulo de ADH y el sodio se corrige solo.' },
      { q: 'Se plantea iniciar un IECA pero preocupa la creatinina de 1,4. ¿Qué argumentas?', pista: 'Efecto hemodinámico esperado vs toxicidad.', r: 'Que se debe iniciar, a dosis baja y con controles. Un ascenso de creatinina de hasta un 30 % es esperable por la dilatación de la arteriola eferente y no indica daño renal: a largo plazo el bloqueo del sistema reduce la progresión de la enfermedad renal y mejora la supervivencia. Lo que sí obliga a reevaluar es un ascenso mayor, hiperpotasemia significativa o hipotensión sintomática.' },
      { q: '¿Por qué añadir espironolactona pese a un potasio de 4,0 y una creatinina elevada?', pista: 'El beneficio principal no es diurético.', r: 'Porque su efecto beneficioso en insuficiencia cardíaca es fundamentalmente <b>antifibrótico</b> y antirremodelado, con reducción demostrada de mortalidad y hospitalizaciones. Se añade a dosis baja vigilando estrechamente potasio y función renal, y evitándola si el filtrado es muy bajo o el potasio está elevado. Es un ejemplo de fármaco cuyo beneficio no se explica por su efecto más obvio.' },
      { q: 'Resume por qué toda su presentación clínica procede de un solo mecanismo.', pista: 'Una sola señal, muchas consecuencias.', r: 'Un gasto cardíaco insuficiente reduce el volumen circulante efectivo. Esa única señal activa el SRAA (edemas, sodio urinario bajo, avidez por sodio), la ADH (hiponatremia dilucional), y el simpático (taquicardia, vasoconstricción). La retención de volumen y la vasoconstricción aumentan precarga y poscarga sobre un ventrículo que no puede con ninguna de las dos, y la angiotensina II y la aldosterona añaden fibrosis y remodelado. Todos sus datos de laboratorio y de exploración son ramas del mismo tronco.' }
    ],
    cierre: 'La insuficiencia cardíaca se entiende mejor como una enfermedad <b>neurohumoral</b> que como una enfermedad de la bomba: por eso el tratamiento que salva vidas es el que bloquea la respuesta, no el que estimula el músculo.'
  },

  tarjetas: [
    { f: 'Tres estímulos que liberan renina', d: '↓ presión de perfusión renal (arteriola aferente), ↓ NaCl en la mácula densa y estimulación simpática β₁ del aparato yuxtaglomerular.' },
    { f: 'Acciones de la angiotensina II', d: 'Vasoconstricción sistémica; constricción EFERENTE (mantiene el filtrado); ↑reabsorción proximal de Na⁺; ↑aldosterona; ↑ADH y sed; hipertrofia y fibrosis.' },
    { f: 'Volumen circulante efectivo', d: 'La fracción del volumen que realmente perfunde tejidos. Puede estar BAJO con volumen total ALTO (insuficiencia cardíaca, cirrosis, síndrome nefrótico). El riñón mide flujo, no litros.' },
    { f: '¿Por qué sube la creatinina al iniciar un IECA?', d: 'Dilata la arteriola EFERENTE → ↓presión intraglomerular → ↓filtrado. Hasta un 30 % es esperable y protector. Más de eso: sospecha estenosis bilateral de arteria renal, hipovolemia o AINE.' },
    { f: 'Hiperaldosteronismo primario vs secundario', d: 'Primario: aldosterona ALTA con renina SUPRIMIDA (HTA + hipopotasemia + alcalosis). Secundario: ambas altas (insuficiencia cardíaca, cirrosis, estenosis renal, hipovolemia).' },
    { f: '¿Por qué los IECA producen tos y los ARA-II no?', d: 'La ECA también degrada bradicinina; al inhibirla se acumula → tos y angioedema. Los ARA-II bloquean el receptor AT₁ sin afectar a la bradicinina.' },
    { f: 'Hiponatremia en la insuficiencia cardíaca', d: 'Dilucional, por ADH liberada de forma no osmótica ante bajo volumen circulante efectivo. Exceso de agua, no déficit de sodio: se trata con descongestión y restricción hídrica, no con salino. Marcador pronóstico adverso.' },
    { f: '¿Por qué la espironolactona ayuda en IC a dosis no diuréticas?', d: 'Su beneficio principal es ANTIFIBRÓTICO y antirremodelado (reduce mortalidad y hospitalizaciones), no natriurético. Vigilar potasio y función renal.' }
  ]
},

/* ---------------------------------------------------------- */
{
  id: 'perfusion-coronaria',
  modulo: 'regulacion',
  nombre: 'Perfusión coronaria y reserva de flujo',
  alto: true,
  minutos: 18,
  requisitos: ['presion-arterial'],
  ideaCentral: 'El corazón es el único órgano que dificulta su propio riego: durante la sístole comprime sus vasos, de modo que el ventrículo izquierdo se perfunde esencialmente en diástole. Como la extracción de oxígeno miocárdica ya es máxima en reposo, el único modo de aumentar el aporte es aumentar el flujo, y ese hecho —extracción máxima más perfusión diastólica— explica prácticamente toda la patología isquémica.',

  anclaje: {
    q: 'Antes de leer: ¿por qué la taquicardia es especialmente peligrosa para un corazón con enfermedad coronaria? Da al menos dos razones independientes.',
    pista: 'Una tiene que ver con la demanda y otra con el tiempo disponible para el aporte.'
  },

  bloques: [
    {
      nivel: 'imprescindible',
      titulo: 'Los dos hechos fundacionales',
      html: '<p><b>1. La perfusión del ventrículo izquierdo es diastólica.</b> Durante la sístole, la presión intramiocárdica se aproxima o supera la presión aórtica y colapsa los vasos intramurales, sobre todo en el subendocardio. El gradiente que importa es:</p>' +
        '<p style="text-align:center"><code>Presión de perfusión coronaria = Presión diastólica aórtica − Presión telediastólica del VI</code></p>' +
        '<p>El ventrículo <b>derecho</b>, cuya presión intracavitaria es baja, se perfunde en sístole y en diástole; solo pasa a depender de la diástole cuando se sobrecarga (hipertensión pulmonar, TEP).</p>' +
        '<p><b>2. La extracción de oxígeno es máxima en reposo</b> (60–75 %, frente al 25 % de la media corporal). La saturación del seno coronario es de apenas 30 %. Consecuencia: ante un aumento de demanda <b>no se puede extraer más</b>, solo aumentar el flujo. El corazón no tiene reserva de extracción; solo reserva de flujo.</p>',
      cadena: ['↑ Demanda miocárdica', 'Extracción ya máxima', 'Solo queda ↑ flujo', 'Vasodilatación coronaria', 'Si hay estenosis: isquemia']
    },
    {
      nivel: 'imprescindible',
      titulo: 'Reserva de flujo coronario y estenosis',
      html: '<p>El flujo coronario puede multiplicarse por 4–5 respecto al basal gracias a la vasodilatación de las arteriolas distales (mediada por adenosina, óxido nítrico y canales K-ATP). Esa capacidad es la <b>reserva de flujo coronario</b>.</p>' +
        '<p>Ante una estenosis epicárdica progresiva, la microcirculación distal se dilata para mantener el flujo de reposo. Es decir, <b>la reserva se va consumiendo antes de que aparezca ningún síntoma</b>:</p>' +
        '<ul><li>Estenosis < 50 %: sin repercusión.</li>' +
        '<li>Estenosis ~70 %: el flujo de reposo es normal, pero la reserva está agotada → <b>angina de esfuerzo</b>.</li>' +
        '<li>Estenosis > 90 %: puede comprometerse el flujo incluso en reposo.</li></ul>' +
        '<p>🔥 Esto explica dos hechos que confunden: que un paciente pueda tener una estenosis crítica con un ECG de reposo perfectamente normal, y que el grado angiográfico de estenosis no prediga bien la isquemia, motivo por el cual se emplea la <b>reserva fraccional de flujo (FFR)</b>, que mide la repercusión funcional real.</p>'
    },
    {
      nivel: 'importante',
      titulo: 'Aporte y demanda: la tabla que ordena el tratamiento',
      html: '<table><tr><th>Aporte (flujo × contenido de O₂)</th><th>Demanda (MVO₂)</th></tr>' +
        '<tr><td>Presión diastólica aórtica</td><td>Frecuencia cardíaca</td></tr>' +
        '<tr><td>Duración de la diástole (↓ con taquicardia)</td><td>Contractilidad</td></tr>' +
        '<tr><td>Presión telediastólica del VI (la resta)</td><td>Tensión parietal (Laplace: P × r / 2h)</td></tr>' +
        '<tr><td>Diámetro coronario / estenosis</td><td></td></tr>' +
        '<tr><td>Hemoglobina y saturación</td><td></td></tr></table>' +
        '<p>Cada tratamiento antiisquémico ocupa una casilla: betabloqueantes (↓FC, ↓contractilidad, y al bajar la FC alargan la diástole, mejorando también el aporte), nitratos (↓precarga → ↓presión telediastólica y ↓radio → ↓tensión parietal), calcioantagonistas (↓poscarga y ↓FC según el tipo), revascularización (↑diámetro), transfusión y oxígeno si hay anemia o hipoxemia.</p>' +
        '<p>Nótese la elegancia del betabloqueante: es el único que mejora simultáneamente la demanda y el aporte, y por eso es la piedra angular del tratamiento antianginoso.</p>'
    },
    {
      nivel: 'complementario',
      titulo: 'Robo coronario y circulación colateral',
      html: '<p><b>Robo coronario</b>: un vasodilatador arteriolar potente (dipiridamol, adenosina) dilata los lechos <b>sanos</b>, cuyas arteriolas conservan reserva, mientras que los distales a una estenosis ya están dilatados al máximo y no pueden responder. El flujo se redistribuye hacia el territorio sano y <i>disminuye</i> en el isquémico. Este fenómeno se aprovecha deliberadamente en las <b>pruebas de estrés farmacológico</b>, que crean heterogeneidad de perfusión detectable por imagen.</p>' +
        '<p><b>Circulación colateral</b>: la isquemia crónica repetida estimula el desarrollo de colaterales, que pueden preservar viabilidad en oclusiones totales crónicas. Es una de las razones por las que un infarto sobre una arteria crónicamente estenosada puede ser menos extenso que uno sobre una arteria previamente sana, y también parte del fundamento del <b>preacondicionamiento isquémico</b>: episodios breves de isquemia hacen al miocardio más resistente a una isquemia posterior prolongada.</p>'
    }
  ],

  variables: [
    { n: 'Presión diastólica aórtica', d: 'up', nota: 'numerador del gradiente de perfusión' },
    { n: 'Presión telediastólica del VI', d: 'down', nota: 'se resta: si sube, la perfusión cae' },
    { n: 'Duración de la diástole', d: 'up', nota: 'la taquicardia la acorta' },
    { n: 'Reserva de flujo coronario', d: 'down', nota: 'se consume antes de que aparezcan síntomas' }
  ],

  fisiopatologia: '<p>Hay tres formas de producir isquemia y conviene distinguirlas porque el tratamiento difiere: <b>aumento de demanda</b> con aporte limitado (angina estable, taquiarritmias, crisis hipertensiva, estenosis aórtica), <b>reducción aguda del aporte</b> por rotura o erosión de placa con trombosis (síndrome coronario agudo) y <b>reducción del contenido de oxígeno</b> (anemia severa, hipoxemia, intoxicación por monóxido).</p>' +
    '<p>Existe además la isquemia con <b>coronarias epicárdicas normales</b>: disfunción microvascular y vasoespasmo (angina de Prinzmetal). El vasoespasmo produce elevación transitoria del ST en reposo, típicamente nocturna, y se trata con calcioantagonistas y nitratos, no con betabloqueantes, que pueden empeorarlo al dejar sin oposición la vasoconstricción α.</p>',

  clinica: '<p>El subendocardio es el territorio de riesgo: soporta la mayor presión tisular, se perfunde solo en diástole y está al final del recorrido vascular. Por eso la isquemia de demanda se manifiesta como <b>descenso del ST</b> (subendocárdica) y solo la oclusión completa produce elevación (transmural).</p>' +
    '<p>Escenarios de UCI que Diego reconocerá: la taquiarritmia rápida que produce elevación de troponina sin enfermedad coronaria obstructiva (infarto tipo 2, por desequilibrio aporte-demanda), la hipotensión mantenida que produce isquemia en un paciente con hipertrofia, y la anemia severa que desencadena angina en un coronario conocido. En los tres, tratar la causa —frecuencia, presión, hemoglobina— es tratar la isquemia.</p>',

  error: {
    confunde: 'Pensar que el corazón, ante un aumento de demanda, aumenta la extracción de oxígeno como hacen los demás tejidos.',
    parecido: 'Es lo que ocurre en el músculo esquelético durante el ejercicio, donde la extracción se triplica y es un mecanismo compensador fundamental.',
    diferencia: 'El miocardio ya extrae el 60–75 % del oxígeno en reposo; el retorno del seno coronario está saturado a solo un 30 %. No queda margen para extraer más, de modo que <b>todo</b> el aumento del aporte debe provenir del flujo. Por eso cualquier limitación al flujo se traduce directamente en isquemia.',
    ejemplo: 'En un paciente anémico, el músculo esquelético compensa extrayendo más oxígeno; el corazón no puede, y responde aumentando el flujo coronario y el gasto, lo que a su vez aumenta su propia demanda. De ahí que la anemia severa desencadene angina en un coronario.',
    regla: 'El corazón no tiene reserva de extracción, solo reserva de <b>flujo</b>. Si el flujo se limita, hay isquemia.'
  },

  perla: '🔥 <code>Perfusión coronaria = presión diastólica aórtica − presión telediastólica del VI</code>. Esta resta explica de golpe por qué la hipotensión, la taquicardia, la insuficiencia cardíaca con presiones de llenado altas y la hipertrofia comprometen la perfusión, y por qué el betabloqueante es el único antianginoso que mejora aporte y demanda a la vez.',

  feynman: {
    consigna: 'Explica por qué una taquicardia sostenida puede producir isquemia y elevación de troponina en un paciente sin lesiones coronarias significativas.',
    puntos: [
      'Explico los determinantes del consumo miocárdico de oxígeno',
      'Explico que la perfusión del VI es diastólica y la taquicardia acorta la diástole',
      'Menciono que la extracción de oxígeno ya es máxima',
      'Concluyo el desequilibrio aporte-demanda y el concepto de infarto tipo 2',
      'Menciono la vulnerabilidad especial del subendocardio'
    ],
    referencia: '<p>Una taquicardia sostenida agrede el equilibrio aporte-demanda por los dos lados a la vez, y esa simultaneidad es la clave.</p>' +
      '<p>Por el lado de la <b>demanda</b>: la frecuencia cardíaca es uno de los tres determinantes del consumo miocárdico de oxígeno. Más latidos por minuto significan más ciclos de contracción, más consumo de ATP por el aparato contráctil y por las bombas de calcio. Si la taquicardia se acompaña de descarga simpática, se añade el aumento de contractilidad, otro determinante del consumo.</p>' +
      '<p>Por el lado del <b>aporte</b>: la perfusión del ventrículo izquierdo ocurre esencialmente en diástole, porque durante la sístole la presión intramiocárdica colapsa los vasos intramurales. Cuando la frecuencia aumenta, la fase del ciclo que se acorta desproporcionadamente es precisamente la <b>diástole</b>. El corazón dispone de menos tiempo por minuto para perfundirse justo cuando más oxígeno necesita. Y como la extracción miocárdica de oxígeno ya es máxima en reposo (60–75 %), no existe la posibilidad de compensar extrayendo más: la única vía es aumentar el flujo, que es exactamente lo que se ha limitado.</p>' +
      '<p>El territorio que paga primero es el <b>subendocardio</b>, porque soporta la mayor presión tisular durante la sístole, se perfunde exclusivamente en diástole y está al final del recorrido de las arterias que penetran desde el epicardio. De ahí que el patrón electrocardiográfico típico sea el <b>descenso del ST</b>, no la elevación.</p>' +
      '<p>Si el desequilibrio se mantiene lo suficiente, hay necrosis de miocitos y se eleva la troponina. Eso constituye un <b>infarto tipo 2</b>: necrosis por desequilibrio entre aporte y demanda, sin rotura de placa ni trombosis. Es una distinción con consecuencias directas, porque el tratamiento no es la reperfusión urgente sino <b>corregir la causa</b> —controlar la frecuencia, tratar la sepsis, la anemia o la hipoxemia—. Cuando además existe una estenosis coronaria previa o una hipertrofia ventricular, que reduce la reserva de flujo, el umbral para que esto ocurra es mucho más bajo.</p>'
  },

  preguntas: [
    { nivel: 1, q: 'Escribe la fórmula de la presión de perfusión coronaria del ventrículo izquierdo.', r: 'Presión diastólica aórtica − presión telediastólica del ventrículo izquierdo. El flujo depende de ese gradiente y del tiempo de diástole disponible.' },
    { nivel: 1, q: '¿Qué porcentaje de oxígeno extrae el miocardio en reposo y qué implica?', r: 'Un 60–75 % (saturación del seno coronario ≈ 30 %). Implica que no hay reserva de extracción: cualquier aumento de demanda debe cubrirse aumentando el flujo.' },
    { nivel: 1, q: '¿Por qué el ventrículo derecho se perfunde también en sístole?', r: 'Porque su presión intracavitaria y por tanto su presión intramiocárdica son bajas y no colapsan los vasos durante la sístole. Deja de ser así cuando se sobrecarga (hipertensión pulmonar, TEP), momento en que pasa a depender de la diástole y se vuelve vulnerable a la hipotensión.' },
    { nivel: 2, q: '¿Por qué un paciente con estenosis del 70 % puede tener un flujo coronario de reposo normal?', r: 'Porque la microcirculación distal se dilata para compensar la caída de presión a través de la estenosis, manteniendo el flujo basal. Lo que se ha consumido es la <b>reserva</b>: cuando aumenta la demanda no queda capacidad vasodilatadora adicional y aparece isquemia.' },
    { nivel: 2, q: 'Explica el fenómeno de robo coronario.', r: 'Un vasodilatador arteriolar potente dilata los lechos sanos, que conservan reserva, mientras que los distales a una estenosis ya están dilatados al máximo. El flujo se redistribuye hacia el territorio sano y disminuye en el isquémico. Se usa deliberadamente en las pruebas de estrés farmacológico con adenosina o dipiridamol.' },
    { nivel: 2, q: '¿Por qué el betabloqueante es el antianginoso más eficaz desde el punto de vista fisiológico?', r: 'Porque actúa en ambos lados de la ecuación: reduce la demanda (baja frecuencia y contractilidad) y mejora el aporte (al bajar la frecuencia alarga la diástole, aumentando el tiempo de perfusión). Ningún otro antianginoso mejora simultáneamente los dos términos.' },
    { nivel: 3, q: 'Paciente séptico, taquicárdico a 140, con hemoglobina de 7,5 g/dL y troponina elevada, sin lesiones coronarias en la coronariografía. ¿Cómo lo explicas y cómo lo tratas?', r: 'Infarto tipo 2 por desequilibrio aporte-demanda. La demanda está aumentada por taquicardia y estimulación adrenérgica; el aporte está reducido por dos vías: menos tiempo diastólico y menor contenido arterial de oxígeno por la anemia. Como la extracción miocárdica ya es máxima, el desequilibrio se traduce directamente en isquemia subendocárdica y necrosis. El tratamiento no es reperfusión sino corregir la causa: tratar la sepsis, controlar la frecuencia en la medida en que la hemodinámica lo permita, optimizar la oxigenación y valorar transfusión.' },
    { nivel: 3, q: 'Paciente con estenosis aórtica severa que presenta angina con coronarias normales. Explica los tres mecanismos que convergen.', r: 'Primero, aumento de la demanda: el ventrículo hipertrofiado tiene más masa y genera presiones sistólicas muy altas, con lo que la tensión parietal y el consumo de oxígeno son elevados. Segundo, reducción del aporte: la hipertrofia aumenta la presión telediastólica, que se resta del gradiente de perfusión, y la masa muscular crece más que la red capilar, de modo que la densidad capilar por gramo de tejido disminuye. Tercero, la propia obstrucción reduce la presión aórtica y por tanto la presión de perfusión coronaria disponible. El resultado es angina con árbol coronario normal, y su tratamiento definitivo es corregir la válvula.' }
  ],

  caso: {
    vineta: 'Varón de 74 años con hipertrofia ventricular izquierda severa por hipertensión de largo tiempo. Ingresa en UCI por neumonía. Fibrila a 165 lpm. PA 88/54. Refiere opresión torácica. ECG: descenso del ST de 2 mm en V4–V6. Troponina en ascenso.',
    pasos: [
      { q: 'Enumera todos los factores que aumentan su demanda de oxígeno en este momento.', pista: 'Los tres determinantes del MVO₂, más el contexto.', r: 'Frecuencia de 165 lpm; contractilidad aumentada por la descarga adrenérgica de la sepsis y de la propia hipotensión; y tensión parietal elevada por su hipertrofia y por el aumento de las presiones de llenado. La fiebre y el trabajo respiratorio añaden demanda metabólica sistémica que obliga al corazón a aumentar el gasto.' },
      { q: '¿Y todos los que reducen su aporte?', pista: 'Numerador, denominador y tiempo.', r: 'La presión diastólica aórtica es de 54 mmHg (numerador bajo); la presión telediastólica del VI está elevada por la rigidez del ventrículo hipertrofiado y la pérdida de la contracción auricular (se resta del gradiente); la taquicardia a 165 lpm acorta drásticamente la diástole, que es el tiempo de perfusión; y probablemente hay hipoxemia por la neumonía, que reduce el contenido arterial de oxígeno.' },
      { q: '¿Por qué su hipertrofia lo hace especialmente vulnerable?', pista: 'Masa y capilares no crecen igual.', r: 'Porque la masa muscular crece más que la red capilar, de modo que la densidad capilar por gramo de tejido disminuye y las distancias de difusión aumentan. Además, la presión intramiocárdica sistólica es mayor y la presión telediastólica también, lo que comprime aún más el subendocardio. Su reserva de flujo coronario está reducida incluso con coronarias angiográficamente normales.' },
      { q: '¿Por qué el descenso del ST y no elevación?', pista: 'Piensa en la capa afectada.', r: 'Porque se trata de isquemia <b>subendocárdica</b> por desequilibrio aporte-demanda, no de una oclusión transmural. El vector de la corriente de lesión apunta hacia la cavidad, alejándose de los electrodos precordiales: se registra descenso. La elevación requeriría lesión transmural, típicamente por oclusión trombótica.' },
      { q: '¿Cuál es la intervención de mayor impacto y por qué?', pista: 'Una sola variable aparece en ambos lados de la ecuación.', r: 'Controlar la frecuencia cardíaca. Es la única variable que aparece simultáneamente en la demanda (es uno de los tres determinantes del MVO₂) y en el aporte (determina el tiempo de diástole disponible). Bajar la frecuencia mejora ambos lados a la vez. En un paciente hipotenso hay que hacerlo con cuidado —valorando cardioversión si la inestabilidad se debe a la arritmia— y tratando simultáneamente la sepsis, que es la causa de fondo.' },
      { q: 'Su troponina sube. ¿Debe ir a coronariografía urgente?', pista: 'Tipo 1 vs tipo 2.', r: 'No de forma automática. El cuadro corresponde a un infarto <b>tipo 2</b>: necrosis por desequilibrio entre aporte y demanda en el contexto de sepsis, taquiarritmia e hipotensión, sin evidencia de rotura de placa. El tratamiento prioritario es corregir el desencadenante. La coronariografía se plantea si persisten datos de isquemia tras estabilizar, si hay elevación del ST o inestabilidad atribuible a un síndrome coronario tipo 1. Distinguir ambos escenarios evita tanto intervenciones innecesarias como retrasos peligrosos.' }
    ],
    cierre: 'El paciente crítico produce isquemia sin trombosis a diario. La tabla de aporte-demanda, aplicada casilla por casilla, convierte un cuadro confuso en una lista de variables corregibles.'
  },

  tarjetas: [
    { f: 'Presión de perfusión coronaria del VI', d: 'Presión diastólica aórtica − presión telediastólica del VI. La perfusión izquierda es DIASTÓLICA porque la sístole colapsa los vasos intramurales.' },
    { f: 'Extracción miocárdica de oxígeno en reposo', d: '60–75 % (seno coronario saturado a solo ~30 %). No hay reserva de extracción: todo aumento de aporte debe venir del FLUJO. Explica por qué cualquier limitación del flujo produce isquemia.' },
    { f: 'Reserva de flujo coronario y estenosis', d: 'El flujo puede multiplicarse por 4–5. Ante una estenosis, la microcirculación distal se dilata y mantiene el flujo de REPOSO, consumiendo la reserva. Por eso una estenosis del 70 % da angina de esfuerzo con ECG de reposo normal.' },
    { f: 'Determinantes del aporte vs de la demanda miocárdica', d: 'APORTE: presión diastólica aórtica, duración de la diástole, presión telediastólica (se resta), diámetro coronario, Hb y saturación. DEMANDA: frecuencia, contractilidad, tensión parietal.' },
    { f: '¿Por qué el betabloqueante es el antianginoso más completo?', d: 'Es el único que mejora AMBOS lados: ↓demanda (FC y contractilidad) y ↑aporte (al bajar la FC alarga la diástole = más tiempo de perfusión).' },
    { f: 'Robo coronario', d: 'Un vasodilatador potente dilata los lechos SANOS (que conservan reserva); los distales a la estenosis ya están dilatados al máximo. El flujo se redistribuye lejos del territorio isquémico. Se usa a propósito en el estrés con adenosina/dipiridamol.' },
    { f: 'Infarto tipo 1 vs tipo 2', d: 'Tipo 1: rotura/erosión de placa con trombosis → reperfusión. Tipo 2: desequilibrio aporte-demanda (taquiarritmia, sepsis, anemia, hipotensión, hipertrofia) → tratar la causa, no reperfundir de rutina.' },
    { f: 'Angina de Prinzmetal (vasoespástica)', d: 'Elevación transitoria del ST en reposo, típicamente nocturna, con coronarias epicárdicas a menudo normales. Tratamiento: calcioantagonistas y nitratos. Los betabloqueantes pueden empeorarla al dejar sin oposición la vasoconstricción α.' }
  ]
}

]);

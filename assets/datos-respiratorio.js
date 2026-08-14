/* ============================================================
   ÁREA — RESPIRATORIO
   Mecánica, intercambio gaseoso, transporte y fallo respiratorio
   ============================================================ */

TUTOR.registrarTemas([

/* ---------------------------------------------------------- */
{
  id: 'mecanica-ventilatoria',
  modulo: 'mecanica-vent',
  nombre: 'Mecánica ventilatoria: presiones, compliance y resistencia',
  alto: true,
  minutos: 22,
  requisitos: [],
  ideaCentral: 'El aire entra porque se genera un gradiente de presión, y para mover ese aire hay que vencer dos cargas distintas: la elástica del pulmón y la pared torácica, y la resistiva de la vía aérea. Separar ambas cargas es lo que permite saber si un paciente que respira mal tiene un problema de pulmón rígido o de tubo estrecho, y en ventilación mecánica esa distinción se lee directamente en la curva de presión.',

  anclaje: {
    q: 'Sin mirar: en un paciente ventilado, la presión pico es de 45 cmH₂O y la presión meseta de 20. ¿Dónde está el problema y por qué?',
    pista: 'Una de las dos presiones informa de la resistencia y la otra de la distensibilidad. ¿Cuál es cuál?'
  },

  bloques: [
    {
      nivel: 'imprescindible',
      titulo: 'Las presiones que hay que distinguir',
      html: '<p>Toda la mecánica se ordena con tres presiones y dos diferencias:</p>' +
        '<table><tr><th>Presión</th><th>Qué es</th><th>Qué informa</th></tr>' +
        '<tr><td>Alveolar (P<sub>alv</sub>)</td><td>Dentro del alvéolo</td><td>Cero al final de la espiración en condiciones normales</td></tr>' +
        '<tr><td>Pleural (P<sub>pl</sub>)</td><td>En el espacio pleural, normalmente negativa</td><td>Es lo que el músculo o el ventilador aplican al pulmón</td></tr>' +
        '<tr><td><b>Transpulmonar</b> (P<sub>alv</sub> − P<sub>pl</sub>)</td><td>Presión de distensión real del pulmón</td><td><b>La que lesiona</b>: es la que estira el parénquima</td></tr></table>' +
        '<p>🔥 Punto clave que ordena toda la ventilación protectora: lo que daña al pulmón no es la presión que marca el ventilador, sino la <b>presión transpulmonar</b>. Un paciente con abdomen distendido u obesidad tiene una presión pleural alta, de modo que una presión en la vía aérea de 35 cmH₂O puede estar generando una distensión pulmonar modesta. Y al revés, un esfuerzo inspiratorio vigoroso genera presiones pleurales muy negativas y puede lesionar el pulmón <i>aunque el paciente respire espontáneamente</i>: es el concepto de lesión autoinfligida.</p>'
    },
    {
      nivel: 'imprescindible',
      titulo: 'Las dos cargas: elástica y resistiva',
      html: '<p>La ecuación del movimiento del sistema respiratorio lo resume todo:</p>' +
        '<p style="text-align:center"><code>P = (Volumen / Compliance) + (Resistencia × Flujo) + PEEP</code></p>' +
        '<ul><li><b>Carga elástica</b>: depende de la <b>compliance</b> (C = ΔV/ΔP, normal ≈ 50–100 mL/cmH₂O). Baja en SDRA, edema, fibrosis, neumotórax, obesidad, distensión abdominal.</li>' +
        '<li><b>Carga resistiva</b>: depende del radio de la vía aérea (Poiseuille otra vez: R ∝ 1/r⁴). Sube en asma, EPOC, secreciones, tubo endotraqueal estrecho o acodado.</li></ul>' +
        '<p>En un paciente ventilado en volumen control, una <b>pausa inspiratoria</b> separa ambas cargas:</p>' +
        '<table><tr><th>Medida</th><th>Refleja</th></tr>' +
        '<tr><td><b>Presión pico</b></td><td>Resistencia + elastancia (todo junto)</td></tr>' +
        '<tr><td><b>Presión meseta</b> (flujo cero)</td><td>Solo la carga <b>elástica</b>: distensibilidad</td></tr>' +
        '<tr><td>Pico − meseta</td><td>Solo la carga <b>resistiva</b></td></tr></table>' +
        '<p>De ahí la lectura inmediata: <b>pico alta con meseta normal</b> = problema resistivo (broncoespasmo, secreciones, tubo obstruido). <b>Pico y meseta ambas altas</b> = problema de distensibilidad (SDRA, edema, neumotórax, abdomen).</p>',
      cadena: ['↑ Presión pico', '¿Meseta normal?', 'Sí → resistencia', 'No → compliance', 'Diagnóstico distinto']
    },
    {
      nivel: 'importante',
      titulo: 'Volúmenes, capacidades y capacidad residual funcional',
      html: '<p>La <b>capacidad residual funcional (CRF)</b> es el volumen que queda tras una espiración normal, y es el punto de equilibrio entre dos fuerzas opuestas: el pulmón que tiende a colapsar por su retroceso elástico y la caja torácica que tiende a expandirse. Importa por tres razones:</p>' +
        '<ul><li>Es la <b>reserva de oxígeno</b> durante una apnea. Por eso se preoxigena antes de intubar, y por eso el obeso, la embarazada y el niño desaturan en segundos: su CRF es pequeña.</li>' +
        '<li>Determina qué alvéolos permanecen abiertos al final de la espiración. Cuando cae por debajo del <b>volumen de cierre</b>, hay colapso y aparece shunt.</li>' +
        '<li>Es exactamente lo que la <b>PEEP</b> restaura: mantiene alvéolos abiertos al final de la espiración, aumenta la CRF y reduce el shunt.</li></ul>' +
        '<p>Espacio muerto: el volumen que ventila pero no intercambia. <b>Anatómico</b> (vía aérea de conducción, ≈2 mL/kg) más <b>alveolar</b> (alvéolos ventilados sin perfusión). La ventilación que cuenta es la <b>alveolar</b>: <code>VA = (Vt − Vd) × FR</code>. Por eso respirar rápido y superficial es ineficiente: si el volumen corriente se acerca al espacio muerto, la ventilación alveolar se desploma aunque el volumen minuto parezca normal.</p>'
    },
    {
      nivel: 'complementario',
      titulo: 'Surfactante, Laplace y trabajo respiratorio',
      html: '<p>La ley de Laplace aplicada al alvéolo (<code>P = 2T/r</code>) plantea un problema: los alvéolos pequeños deberían vaciarse en los grandes, porque a menor radio, mayor presión. El <b>surfactante</b> lo resuelve porque su efecto sobre la tensión superficial <b>depende de la densidad</b>: al reducirse el radio, las moléculas se concentran y la tensión cae más, estabilizando los alvéolos pequeños. Además aumenta la compliance y reduce el trabajo respiratorio.</p>' +
        '<p>Su déficit define el distrés respiratorio del recién nacido y contribuye al SDRA del adulto, donde la inactivación del surfactante por proteínas del edema favorece el colapso.</p>' +
        '<p>El <b>trabajo respiratorio</b> en reposo consume solo un 2–3 % del gasto cardíaco, pero en el fallo respiratorio agudo puede llegar al 25–30 %. Esa cifra explica por qué la ventilación mecánica «da tiempo»: al asumir el trabajo respiratorio, libera un porcentaje enorme del gasto cardíaco y del consumo de oxígeno para el resto del organismo.</p>'
    }
  ],

  variables: [
    { n: 'Presión transpulmonar', d: 'up', nota: 'la que realmente distiende y lesiona' },
    { n: 'Compliance', d: 'down', nota: 'si baja, sube la meseta' },
    { n: 'Resistencia de vía aérea', d: 'up', nota: 'si sube, aumenta pico sin tocar meseta' },
    { n: 'Capacidad residual funcional', d: 'down', nota: 'reserva de O₂ y alvéolos abiertos' }
  ],

  fisiopatologia: '<p>La <b>hiperinsuflación dinámica (auto-PEEP)</b> aparece cuando el tiempo espiratorio es insuficiente para vaciar el pulmón, típicamente en obstrucción severa con frecuencia alta. El aire atrapado eleva la presión intratorácica y produce tres consecuencias encadenadas: reduce el retorno venoso y con él el gasto cardíaco (hipotensión tras intubar a un asmático), aumenta el trabajo inspiratorio porque el paciente debe vencer esa presión antes de generar flujo, y aumenta el riesgo de barotrauma.</p>' +
    '<p>La respuesta es contraintuitiva: <b>ventilar más despacio</b>, con frecuencia baja y espiración prolongada (hipoventilación controlada, tolerando hipercapnia), y en la hipotensión súbita desconectar del ventilador unos segundos para permitir el vaciado.</p>',

  clinica: '<p>Para Diego en la UCI, cuatro lecturas de alto rendimiento: <b>pico alta con meseta normal</b> lleva a aspirar, descartar acodamiento y broncodilatar; <b>meseta alta</b> obliga a descartar neumotórax, atelectasia, edema o presión abdominal; <b>presión de distensión</b> (meseta − PEEP, la <i>driving pressure</i>) por encima de 15 cmH₂O es el mejor predictor de mortalidad en SDRA, mejor incluso que el volumen corriente aislado; y la <b>auto-PEEP</b> se busca ante hipotensión inexplicada en un paciente obstructivo.</p>',

  error: {
    confunde: 'Interpretar la presión pico como la presión que lesiona el pulmón.',
    parecido: 'Es el número más visible del ventilador, el que dispara las alarmas y el que crece cuando el paciente empeora.',
    diferencia: 'La presión pico incluye la carga resistiva, que se disipa en la vía aérea y <b>no distiende el alvéolo</b>. La que estira el parénquima es la presión de meseta y, con más precisión, la presión transpulmonar. Un asmático puede tener una pico de 50 cmH₂O con meseta de 18: sus alvéolos no están sobredistendidos, su vía aérea está estrecha.',
    ejemplo: 'Bajar el volumen corriente porque la pico es alta en un broncoespasmo es tratar el número equivocado: lo que hay que hacer es broncodilatar, aspirar y revisar el tubo.',
    regla: 'Pico manda sobre el tubo; meseta manda sobre el pulmón. Ajusta el volumen por la meseta, nunca por la pico.'
  },

  perla: '🔥 Pico alta + meseta normal = resistencia. Pico alta + meseta alta = compliance. Y la <b>presión de distensión</b> (meseta − PEEP) por encima de 15 cmH₂O es la variable que más se asocia a mortalidad en el SDRA: normaliza el volumen entregado al pulmón que realmente queda disponible.',

  feynman: {
    consigna: 'Explica por qué un asmático grave puede desplomarse hemodinámicamente justo después de ser intubado y conectado al ventilador.',
    puntos: [
      'Explico la obstrucción espiratoria y el tiempo espiratorio insuficiente',
      'Introduzco la hiperinsuflación dinámica y la auto-PEEP',
      'Conecto presión intratorácica alta con caída del retorno venoso',
      'Menciono el efecto de la sedación y la pérdida del tono simpático',
      'Doy la solución: ventilar más lento, espiración larga, desconectar si hay colapso'
    ],
    referencia: '<p>En el asma grave la obstrucción es fundamentalmente <b>espiratoria</b>: la vía aérea se estrecha y colapsa dinámicamente durante la espiración, de modo que vaciar el pulmón exige mucho más tiempo del normal. Si el ventilador inicia la siguiente insuflación antes de que el pulmón haya terminado de vaciarse, queda volumen atrapado. Ciclo tras ciclo, ese volumen se acumula: es la <b>hiperinsuflación dinámica</b>, y la presión que queda al final de la espiración por encima de la programada es la <b>auto-PEEP</b>.</p>' +
      '<p>Esa presión intratorácica elevada de forma sostenida se transmite a la aurícula derecha. Como el retorno venoso depende del gradiente <code>(Psm − PAD)</code>, elevar la presión auricular derecha estrecha ese gradiente y reduce el flujo que llega al corazón: caen la precarga, el volumen sistólico y el gasto cardíaco. A esto se suman dos golpes simultáneos en el momento de la intubación: los <b>fármacos de inducción</b> producen venodilatación y bajan la presión sistémica media de llenado, y la <b>abolición del tono simpático</b> retira la vasoconstricción compensadora que sostenía la presión en un paciente que llevaba horas trabajando al límite y probablemente deshidratado.</p>' +
      '<p>El error clásico es interpretar la hipotensión como necesidad de más soporte ventilatorio y aumentar la frecuencia respiratoria, lo que acorta aún más la espiración y agrava el atrapamiento, cerrando un círculo que puede terminar en parada. También conviene recordar que en este contexto un neumotórax a tensión produce un cuadro casi idéntico y debe descartarse.</p>' +
      '<p>El manejo se deduce del mecanismo: <b>frecuencia respiratoria baja</b> (10–12) con tiempo espiratorio prolongado, volumen corriente moderado, tolerar la hipercapnia (hipoventilación controlada o hipercapnia permisiva) porque la prioridad no es normalizar el CO₂ sino permitir el vaciado, y ante hipotensión brusca <b>desconectar al paciente del ventilador</b> durante 20–30 segundos comprimiendo el tórax para permitir la salida del aire atrapado: si la presión se recupera, el diagnóstico queda confirmado.</p>'
  },

  preguntas: [
    { nivel: 1, q: '¿Qué es la presión transpulmonar y por qué importa?', r: 'Es la diferencia entre presión alveolar y presión pleural, es decir, la presión real de distensión del pulmón. Importa porque es la que estira el parénquima y por tanto la que produce lesión, no la que marca el ventilador.' },
    { nivel: 1, q: 'Escribe la ecuación del movimiento del sistema respiratorio.', r: 'P = (Volumen/Compliance) + (Resistencia × Flujo) + PEEP. Separa la carga elástica de la resistiva.' },
    { nivel: 1, q: '¿Qué mide la presión de meseta y cómo se obtiene?', r: 'Mide la carga elástica, es decir, la distensibilidad del sistema respiratorio. Se obtiene con una pausa inspiratoria que lleva el flujo a cero, eliminando el componente resistivo.' },
    { nivel: 2, q: 'Presión pico 48, meseta 19. ¿Diagnóstico diferencial y qué haces?', r: 'La diferencia pico-meseta es de 29 cmH₂O: problema resistivo puro con distensibilidad conservada. Causas: broncoespasmo, secreciones, tubo acodado, mordido u obstruido. Se aspira, se revisa el tubo y se broncodilata; bajar el volumen corriente no corregiría el problema.' },
    { nivel: 2, q: '¿Por qué un paciente obeso desatura en segundos durante una intubación?', r: 'Porque su capacidad residual funcional está reducida por la compresión del abdomen sobre el diafragma, y la CRF es la reserva de oxígeno durante la apnea. Además su consumo de oxígeno es mayor. Por eso se preoxigena en posición semisentada y se considera oxigenación apneica.' },
    { nivel: 2, q: '¿Por qué respirar rápido y superficial es ineficiente?', r: 'Porque la ventilación que cuenta es la alveolar: VA = (Vt − Vd) × FR. Si el volumen corriente se acerca al espacio muerto, la fracción útil de cada respiración cae drásticamente, y el volumen minuto puede parecer normal mientras la ventilación alveolar es insuficiente.' },
    { nivel: 3, q: 'Paciente ventilado que se hipotensa bruscamente. Al desconectarlo del ventilador durante 25 segundos, la presión se recupera. ¿Qué ocurrió?', r: 'Hiperinsuflación dinámica con auto-PEEP. El aire atrapado elevó la presión intratorácica, redujo el gradiente de retorno venoso y con él la precarga y el gasto. La desconexión permitió el vaciado pulmonar, cayó la presión intratorácica y se restauró el retorno venoso: la maniobra es a la vez diagnóstica y terapéutica. El ajuste es reducir la frecuencia y prolongar la espiración, no aumentar el soporte.' },
    { nivel: 3, q: 'Un paciente con SDRA y obesidad mórbida tiene meseta de 34 cmH₂O. El equipo quiere bajar el volumen corriente a 3 mL/kg. ¿Qué argumento fisiológico aportas?', r: 'Que la presión de meseta mide la distensibilidad del <b>sistema respiratorio completo</b>, que incluye la pared torácica. En la obesidad y en la hipertensión intraabdominal, una fracción grande de esa presión se consume en desplazar la pared y no distiende el pulmón. Lo que determina la lesión es la <b>presión transpulmonar</b>, que requiere estimar la presión pleural, habitualmente con un catéter esofágico. Es perfectamente posible que con meseta de 34 la presión transpulmonar sea segura, y reducir el volumen a 3 mL/kg produciría hipoventilación y colapso sin beneficio.' }
  ],

  caso: {
    vineta: 'Mujer de 26 años con crisis asmática grave. Tras 40 minutos de tratamiento se agota, se intuba y se conecta al ventilador en volumen control: Vt 500 mL, FR 20, PEEP 5. A los 3 minutos: PA 68/40, FC 140, presión pico 52 cmH₂O.',
    pasos: [
      { q: 'Antes de nada, ¿qué dos diagnósticos debes considerar ante esta hipotensión?', pista: 'Ambos elevan la presión intratorácica.', r: 'Hiperinsuflación dinámica con auto-PEEP y neumotórax a tensión. Los dos comprometen el retorno venoso por la misma vía —presión intratorácica elevada— y ambos son frecuentes en este escenario. La ecografía torácica los distingue en segundos.' },
      { q: '¿Qué maniobra sirve simultáneamente de prueba diagnóstica y de tratamiento?', pista: 'Hay que dejar salir el aire.', r: 'Desconectar del ventilador durante 20–30 segundos, comprimiendo suavemente el tórax. Si la presión arterial se recupera, el diagnóstico de atrapamiento aéreo queda confirmado y además se ha resuelto transitoriamente.' },
      { q: 'Pides una pausa inspiratoria: meseta 21 cmH₂O. ¿Qué te dice?', pista: 'Compara con la pico de 52.', r: 'Que la distensibilidad es aceptable y todo el exceso de presión es resistivo (52 − 21 = 31 cmH₂O). Confirma que el problema es obstructivo y no de rigidez pulmonar, y descarta que se esté sobredistendiendo el alvéolo con el volumen actual.' },
      { q: 'El residente propone subir la frecuencia a 26 para «mejorar el CO₂». ¿Qué respondes?', pista: '¿Qué fase del ciclo se acorta?', r: 'Que sería contraproducente. Aumentar la frecuencia acorta el tiempo espiratorio, que es precisamente el que falta para vaciar el pulmón: agravaría el atrapamiento, la auto-PEEP y la hipotensión. Paradójicamente, ventilar <b>menos</b> mejora tanto la hemodinámica como, a menudo, la propia eliminación de CO₂, porque se recupera ventilación alveolar efectiva.' },
      { q: '¿Cómo reprogramas el ventilador y qué aceptas a cambio?', pista: 'Prioriza el vaciado.', r: 'Frecuencia baja (10–12), flujo inspiratorio alto para acortar el tiempo inspiratorio y alargar el espiratorio, volumen corriente moderado (6–8 mL/kg de peso predicho) y PEEP baja inicialmente. A cambio se acepta <b>hipercapnia permisiva</b>: un pH de 7,20 es tolerable durante horas, mientras que el colapso hemodinámico o el barotrauma no lo son. La prioridad es el tiempo espiratorio, no la cifra de CO₂.' },
      { q: '¿Por qué la sedación profunda ayuda aquí más que en otros pacientes?', pista: 'Asincronía y esfuerzo espiratorio.', r: 'Porque el paciente asmático agitado lucha contra el ventilador, acorta su propia espiración por esfuerzo activo —que además colapsa la vía aérea intratorácica y empeora la obstrucción— y aumenta el consumo de oxígeno. Una sedación profunda, y en ocasiones bloqueo neuromuscular transitorio, permite imponer un patrón ventilatorio con espiración larga y reduce el trabajo y el consumo.' }
    ],
    cierre: 'El asma grave ventilado es hemodinámica y mecánica a la vez: la variable que gobierna todo es el <b>tiempo espiratorio</b>, y casi todos los errores consisten en acortarlo intentando ayudar.'
  },

  tarjetas: [
    { f: 'Presión transpulmonar: definición e importancia', d: 'P alveolar − P pleural. Es la presión REAL de distensión del pulmón y la que lesiona. Por eso obesidad o distensión abdominal (P pleural alta) hacen que una presión de vía aérea alta no equivalga a sobredistensión.' },
    { f: 'Ecuación del movimiento del sistema respiratorio', d: 'P = (Volumen/Compliance) + (Resistencia × Flujo) + PEEP. Separa carga elástica de carga resistiva.' },
    { f: 'Pico vs meseta: cómo se interpretan', d: 'Pico = resistencia + elastancia. Meseta (pausa inspiratoria, flujo cero) = solo ELÁSTICA. Pico alta + meseta normal = problema RESISTIVO. Ambas altas = problema de COMPLIANCE.' },
    { f: 'Presión de distensión (driving pressure)', d: 'Meseta − PEEP. Por encima de 15 cmH₂O es el mejor predictor de mortalidad en SDRA, mejor que el volumen corriente aislado: normaliza el volumen al pulmón realmente disponible.' },
    { f: 'Capacidad residual funcional: tres funciones', d: 'Reserva de O₂ en apnea (por eso el obeso dessatura rápido), mantiene alvéolos abiertos evitando shunt, y es lo que la PEEP restaura.' },
    { f: 'Ventilación alveolar vs volumen minuto', d: 'VA = (Vt − Vd) × FR. Respirar rápido y superficial infla el volumen minuto mientras hunde la ventilación alveolar, porque el espacio muerto consume casi todo el volumen corriente.' },
    { f: 'Auto-PEEP: mecanismo y solución', d: 'Tiempo espiratorio insuficiente → atrapamiento → ↑presión intratorácica → ↓retorno venoso → hipotensión. Solución: BAJAR frecuencia, alargar espiración, hipercapnia permisiva; desconectar 20–30 s si hay colapso.' },
    { f: '¿Por qué el surfactante estabiliza los alvéolos pequeños?', d: 'Por Laplace (P = 2T/r), los pequeños tenderían a vaciarse en los grandes. El surfactante reduce la tensión superficial de forma DEPENDIENTE DE LA DENSIDAD: al reducirse el radio se concentra y baja más la tensión.' }
  ]
},

/* ---------------------------------------------------------- */
{
  id: 'intercambio-gaseoso',
  modulo: 'mecanica-vent',
  nombre: 'Intercambio gaseoso y relación ventilación-perfusión',
  alto: true,
  minutos: 24,
  requisitos: ['mecanica-ventilatoria'],
  ideaCentral: 'El pulmón no es un órgano homogéneo: cada unidad alveolar tiene su propia relación entre ventilación y perfusión, y el intercambio depende de cómo se distribuyen esas relaciones. Los extremos definen los dos problemas puros —shunt (perfusión sin ventilación) y espacio muerto (ventilación sin perfusión)—, y casi toda la hipoxemia clínica se explica situando al paciente en algún punto entre ambos.',

  anclaje: {
    q: 'Antes de leer: ¿por qué un paciente con neumonía extensa no mejora su saturación aunque le pongas oxígeno al 100 %, y en cambio uno con EPOC agudizado sí mejora?',
    pista: 'El oxígeno solo llega a los alvéolos que se ventilan.'
  },

  bloques: [
    {
      nivel: 'imprescindible',
      titulo: 'El espectro V/Q',
      html: '<p>La relación entre ventilación alveolar y perfusión (V/Q) define un espectro continuo:</p>' +
        '<table><tr><th>V/Q</th><th>Situación</th><th>Ejemplo</th><th>Responde a O₂</th></tr>' +
        '<tr><td><b>0</b></td><td><b>Shunt</b>: perfusión sin ventilación</td><td>Neumonía, atelectasia, edema, SDRA</td><td><b>No</b></td></tr>' +
        '<tr><td>Baja</td><td>Desequilibrio V/Q</td><td>EPOC, asma, secreciones</td><td>Sí</td></tr>' +
        '<tr><td>≈ 0,8</td><td>Normal</td><td>—</td><td>—</td></tr>' +
        '<tr><td>Alta</td><td>Desequilibrio V/Q</td><td>Enfisema, hipotensión</td><td>Sí</td></tr>' +
        '<tr><td><b>∞</b></td><td><b>Espacio muerto</b>: ventilación sin perfusión</td><td>Tromboembolismo, gasto bajo</td><td>Afecta al CO₂</td></tr></table>' +
        '<p>🔥 La distinción de mayor rendimiento clínico: <b>el shunt no responde al oxígeno</b>. Si el alvéolo no se ventila, da igual la concentración que se administre porque el oxígeno no llega a él, y la sangre que lo atraviesa sale sin oxigenar y se mezcla con la oxigenada. El desequilibrio V/Q sin shunt verdadero <b>sí</b> responde, porque las unidades mal ventiladas siguen recibiendo algo de gas y elevar la FiO₂ eleva su presión alveolar de oxígeno.</p>'
    },
    {
      nivel: 'imprescindible',
      titulo: 'Los cinco mecanismos de hipoxemia',
      html: '<p>Solo hay cinco, y distinguirlos con dos herramientas —el gradiente alvéolo-arterial y la respuesta al oxígeno— resuelve casi cualquier caso:</p>' +
        '<table><tr><th>Mecanismo</th><th>Gradiente A-a</th><th>Responde a O₂</th><th>PaCO₂</th></tr>' +
        '<tr><td>Baja FiO₂ (altura)</td><td>Normal</td><td>Sí</td><td>Baja</td></tr>' +
        '<tr><td><b>Hipoventilación</b></td><td><b>Normal</b></td><td>Sí</td><td><b>Alta</b></td></tr>' +
        '<tr><td><b>Desequilibrio V/Q</b></td><td>Aumentado</td><td>Sí</td><td>Variable</td></tr>' +
        '<tr><td><b>Shunt</b></td><td>Aumentado</td><td><b>No</b></td><td>Normal o baja</td></tr>' +
        '<tr><td>Trastorno de difusión</td><td>Aumentado</td><td>Sí</td><td>Normal o baja</td></tr></table>' +
        '<p>El <b>gradiente alvéolo-arterial</b> se calcula con la ecuación del gas alveolar:</p>' +
        '<p style="text-align:center"><code>PAO₂ = FiO₂ × (Patm − PH₂O) − PaCO₂/R</code> &nbsp; ≈ &nbsp; <code>150 − PaCO₂/0,8</code> (aire ambiente, nivel del mar)</p>' +
        '<p>Normal: menos de 10–15 mmHg en jóvenes, y aumenta con la edad (aproximadamente edad/4 + 4). Su utilidad es separar los problemas <b>del pulmón</b> (gradiente aumentado) de los problemas <b>de la bomba ventilatoria</b> (gradiente normal con CO₂ alto).</p>',
      cadena: ['Hipoxemia', '¿Gradiente A-a normal?', 'Sí → hipoventila o baja FiO₂', 'No → problema pulmonar', '¿Responde a O₂?', 'No → shunt']
    },
    {
      nivel: 'importante',
      titulo: 'Vasoconstricción pulmonar hipóxica: el regulador local',
      html: '<p>A diferencia de la circulación sistémica, donde la hipoxia produce vasodilatación, en el pulmón la hipoxia alveolar produce <b>vasoconstricción</b>. Es una respuesta perfectamente lógica: desvía el flujo desde las zonas mal ventiladas hacia las bien ventiladas, mejorando el ajuste V/Q.</p>' +
        '<p>Consecuencias clínicas de este mecanismo:</p>' +
        '<ul><li>En una neumonía lobar, limita el shunt y evita una hipoxemia mucho peor.</li>' +
        '<li>Los <b>vasodilatadores</b> (nitroprusiato, algunos calcioantagonistas) pueden <b>empeorar la oxigenación</b> al abolirla y aumentar el shunt.</li>' +
        '<li>Cuando la hipoxia es <b>global</b> —altura, EPOC avanzado, apnea del sueño— la vasoconstricción es generalizada y produce <b>hipertensión pulmonar</b> y con el tiempo cor pulmonale. Un mecanismo protector a escala local se vuelve patológico a escala global.</li>' +
        '<li>Es la base de la ventilación en <b>decúbito prono</b> junto a la redistribución de la ventilación: mejora el ajuste V/Q y la mecánica en el SDRA.</li></ul>'
    },
    {
      nivel: 'complementario',
      titulo: 'Distribución regional y difusión',
      html: '<p>En bipedestación, la gravedad hace que tanto la ventilación como la perfusión sean mayores en las bases, pero la <b>perfusión aumenta más</b>, de modo que la relación V/Q es <b>alta en los vértices</b> (más espacio muerto relativo) y <b>baja en las bases</b> (más shunt relativo). Esto explica que la tuberculosis, que prefiere presiones altas de oxígeno, se localice en vértices, y que las atelectasias postoperatorias se formen en bases.</p>' +
        '<p>La <b>difusión</b> sigue la ley de Fick: depende de la superficie, del grosor de la membrana y del gradiente. En reposo el equilibrio entre alvéolo y capilar se alcanza en un tercio del tiempo de tránsito, de modo que hay una enorme reserva: por eso los trastornos de difusión puros rara vez causan hipoxemia en reposo y se manifiestan <b>con el ejercicio</b>, cuando el tiempo de tránsito se acorta. El CO₂ difunde unas 20 veces mejor que el O₂, por lo que la difusión casi nunca limita su eliminación.</p>'
    }
  ],

  variables: [
    { n: 'Relación V/Q', d: 'down', nota: 'hacia 0 = shunt; hacia ∞ = espacio muerto' },
    { n: 'Gradiente alvéolo-arterial', d: 'up', nota: 'separa problema pulmonar de fallo de bomba' },
    { n: 'Fracción de shunt', d: 'up', nota: 'no responde al oxígeno' },
    { n: 'Vasoconstricción pulmonar hipóxica', d: 'up', nota: 'protege localmente, daña globalmente' }
  ],

  fisiopatologia: '<p>El <b>tromboembolismo pulmonar</b> es el modelo de espacio muerto: unidades ventiladas sin perfusión. Sin embargo, el paciente suele estar hipoxémico y no solo hipocápnico, porque el flujo se redistribuye a otras zonas produciendo áreas de V/Q bajo, y porque puede haber apertura de un foramen oval con shunt derecha-izquierda, atelectasias por pérdida de surfactante y caída del gasto cardíaco.</p>' +
    '<p>El <b>SDRA</b> es el modelo de shunt: alvéolos colapsados y ocupados por edema rico en proteínas, con hipoxemia refractaria al oxígeno. Su tratamiento es reclutar alvéolos —PEEP, prono— más que aumentar la FiO₂.</p>',

  clinica: '<p>Un paciente hipoxémico que <b>no mejora</b> al subir la FiO₂ tiene shunt hasta que se demuestre lo contrario: neumonía extensa, atelectasia, edema pulmonar, SDRA o un shunt anatómico (foramen oval permeable, malformación arteriovenosa). La conducta no es subir más el oxígeno sino reclutar pulmón.</p>' +
    '<p>Un paciente hipoxémico con <b>gradiente A-a normal e hipercapnia</b> no tiene un problema pulmonar: tiene un problema de bomba —sobredosis de opiáceos, enfermedad neuromuscular, fatiga diafragmática, lesión medular—. Administrarle oxígeno corrige la saturación y <b>enmascara</b> el fallo ventilatorio, que sigue progresando. Es uno de los errores más peligrosos y más frecuentes.</p>',

  error: {
    confunde: 'Tratar toda hipoxemia con más oxígeno, sin identificar el mecanismo.',
    parecido: 'El oxígeno es la intervención más disponible y en la mayoría de los mecanismos algo mejora la saturación, lo que refuerza el hábito.',
    diferencia: 'El <b>shunt no responde</b> al oxígeno, porque la sangre atraviesa alvéolos que no reciben gas; requiere reclutar (PEEP, prono, tratar la causa). Y en la <b>hipoventilación</b>, el oxígeno corrige la saturación sin corregir el CO₂: el paciente sigue acumulando carbónico y puede llegar a la narcosis con una saturación tranquilizadora en el monitor.',
    ejemplo: 'Paciente con sobredosis de opiáceos, saturación de 88 % que sube a 98 % con mascarilla. Todos se relajan mientras la PaCO₂ sigue subiendo hasta producir acidosis y parada respiratoria. Lo que necesitaba era naloxona y soporte ventilatorio, no oxígeno.',
    regla: 'La saturación mide oxigenación, no ventilación. Ante hipoxemia, primero calcula el gradiente A-a y observa la respuesta al oxígeno; el mecanismo dicta el tratamiento.'
  },

  perla: '🔥 Dos preguntas resuelven casi toda hipoxemia: <b>¿está aumentado el gradiente A-a?</b> (si no, es hipoventilación o baja FiO₂) y <b>¿responde al oxígeno?</b> (si no, es shunt). El resto son matices.',

  feynman: {
    consigna: 'Explica por qué el oxígeno no corrige la hipoxemia del shunt, usando lo que ocurre con la sangre que atraviesa cada tipo de alvéolo.',
    puntos: [
      'Defino shunt como perfusión sin ventilación (V/Q = 0)',
      'Explico que el O₂ administrado no alcanza esos alvéolos',
      'Explico la mezcla de sangre no oxigenada con la oxigenada',
      'Introduzco la curva de disociación de la hemoglobina y su meseta',
      'Concluyo que la solución es reclutar alvéolos, no subir la FiO₂'
    ],
    referencia: '<p>En una unidad con <b>shunt</b> la perfusión está conservada pero la ventilación es nula: el alvéolo está colapsado, lleno de pus, de edema o de sangre. El oxígeno que se administra viaja por la vía aérea y solo puede llegar a los alvéolos que se ventilan; a los que están cerrados u ocupados <b>no llega en absoluto</b>. La sangre que los atraviesa sale con la misma composición con la que entró, es decir, con sangre venosa mezclada.</p>' +
      '<p>Esa sangre no oxigenada se mezcla en las venas pulmonares con la que sí ha pasado por unidades sanas. Aquí interviene un factor decisivo: la forma de la <b>curva de disociación de la hemoglobina</b>. En la zona alta de la curva la hemoglobina ya está prácticamente saturada, de modo que aumentar la FiO₂ en las unidades sanas apenas añade contenido de oxígeno —solo incrementa un poco el oxígeno disuelto, que es una fracción mínima del total—. La sangre bien oxigenada no puede «compensar» a la mal oxigenada, porque no admite mucho más oxígeno del que ya lleva. En cambio, la sangre del shunt aporta un déficit muy grande de contenido. La mezcla resultante queda hipoxémica, y cuanto mayor es la fracción de shunt, más plana es la respuesta al oxígeno: por encima de un shunt del 30 %, elevar la FiO₂ es casi inútil.</p>' +
      '<p>Esto contrasta con el <b>desequilibrio V/Q sin shunt verdadero</b>, donde las unidades están mal ventiladas pero <b>no cerradas</b>. Ahí el oxígeno sí llega, aunque despacio, y elevar la FiO₂ aumenta la presión alveolar de oxígeno lo suficiente para corregir la hipoxemia. Por eso el EPOC agudizado responde bien a concentraciones bajas de oxígeno y la neumonía extensa no responde ni al 100 %.</p>' +
      '<p>La conclusión terapéutica es directa: en el shunt hay que <b>abrir alvéolos</b>, no aumentar la concentración de gas. Eso significa PEEP para mantenerlos reclutados, decúbito prono para redistribuir ventilación y perfusión, drenaje de un derrame, tratamiento de la neumonía o del edema. Y hay un motivo adicional para no insistir con FiO₂ altas: la hiperoxia mantenida produce toxicidad por radicales libres y <b>atelectasias por reabsorción</b>, ya que al desplazar el nitrógeno —que actúa como armazón gaseoso— los alvéolos poco ventilados se colapsan al reabsorberse rápidamente el oxígeno. Es decir, insistir con oxígeno puro puede aumentar el propio shunt que se pretendía tratar.</p>'
  },

  preguntas: [
    { nivel: 1, q: '¿Cuál es la relación V/Q normal global y qué representan sus extremos?', r: 'Aproximadamente 0,8. V/Q = 0 es shunt (perfusión sin ventilación) y V/Q = ∞ es espacio muerto (ventilación sin perfusión).' },
    { nivel: 1, q: 'Escribe la estimación clínica del gradiente alvéolo-arterial en aire ambiente.', r: 'PAO₂ ≈ 150 − PaCO₂/0,8; el gradiente es PAO₂ − PaO₂. Normal < 10–15 mmHg en jóvenes, y aumenta con la edad (≈ edad/4 + 4).' },
    { nivel: 1, q: 'Enumera los cinco mecanismos de hipoxemia.', r: 'Baja FiO₂ (altura), hipoventilación, desequilibrio V/Q, shunt y trastorno de difusión.' },
    { nivel: 2, q: '¿Cómo distingues hipoventilación de enfermedad pulmonar ante una hipoxemia?', r: 'Por el gradiente A-a: en la hipoventilación es <b>normal</b> y la PaCO₂ está elevada, porque el pulmón funciona y el problema es la bomba. En la enfermedad pulmonar el gradiente está aumentado.' },
    { nivel: 2, q: 'Explica la vasoconstricción pulmonar hipóxica y una situación en que resulta perjudicial.', r: 'La hipoxia alveolar contrae las arteriolas pulmonares, desviando el flujo hacia zonas mejor ventiladas y mejorando el ajuste V/Q. Es perjudicial cuando la hipoxia es global (altura, EPOC, apnea del sueño): la vasoconstricción generalizada produce hipertensión pulmonar y cor pulmonale.' },
    { nivel: 2, q: '¿Por qué los trastornos de difusión rara vez causan hipoxemia en reposo?', r: 'Porque el equilibrio entre el gas alveolar y el capilar se alcanza en aproximadamente un tercio del tiempo de tránsito, dejando una enorme reserva. Solo se manifiestan cuando el tiempo de tránsito se acorta, es decir, con el ejercicio.' },
    { nivel: 3, q: 'Paciente con saturación de 85 % que sube apenas a 89 % con mascarilla de reservorio. Radiografía con infiltrados bilaterales. ¿Mecanismo y estrategia?', r: 'Shunt por ocupación y colapso alveolar (edema o SDRA). La ausencia de respuesta al oxígeno es la firma. La estrategia no es aumentar la FiO₂ sino <b>reclutar</b>: PEEP adecuada, considerar decúbito prono, tratar la causa (antibiótico, diurético según el caso) y ventilación protectora. Insistir con FiO₂ altas añade toxicidad por oxígeno y atelectasias por reabsorción, que pueden empeorar el propio shunt.' },
    { nivel: 3, q: 'Paciente con EPOC avanzado en agudización al que se administra oxígeno a alto flujo. A los 40 minutos está somnoliento con PaCO₂ de 90 mmHg. Explica los tres mecanismos implicados.', r: 'Primero, y el más importante, la <b>abolición de la vasoconstricción pulmonar hipóxica</b>: el oxígeno dilata los vasos de las zonas mal ventiladas, redistribuye el flujo hacia unidades de V/Q bajo y aumenta el espacio muerto efectivo, con lo que la misma ventilación elimina menos CO₂. Segundo, el <b>efecto Haldane</b>: la hemoglobina oxigenada transporta peor el CO₂, que se libera al plasma y eleva la PaCO₂. Tercero, y menos relevante de lo que tradicionalmente se enseña, cierta reducción del estímulo ventilatorio hipóxico. La conducta correcta es oxígeno controlado con objetivo de saturación en torno a 88–92 %, y ventilación no invasiva si hay acidosis respiratoria, no retirar bruscamente el oxígeno.' }
  ],

  caso: {
    vineta: 'Varón de 68 años, EPOC severo, ingresa por agudización. Gasometría en aire ambiente: pH 7,30, PaCO₂ 62, PaO₂ 48, HCO₃⁻ 30. Se le coloca mascarilla al 50 %. Una hora después: somnoliento, pH 7,18, PaCO₂ 88, PaO₂ 130.',
    pasos: [
      { q: 'Interpreta la primera gasometría.', pista: 'pH, CO₂ y bicarbonato juntos.', r: 'Acidosis respiratoria agudizada sobre una crónica: el pH está bajo con CO₂ elevado, y el bicarbonato de 30 indica compensación metabólica renal instaurada durante semanas o meses. Es decir, su CO₂ basal ya era alto y ha subido más.' },
      { q: 'Calcula el gradiente A-a inicial e interprétalo.', pista: 'PAO₂ ≈ 150 − PaCO₂/0,8.', r: 'PAO₂ ≈ 150 − 62/0,8 ≈ 150 − 77,5 ≈ 72 mmHg. Gradiente = 72 − 48 = 24 mmHg, elevado incluso para su edad. Hay por tanto enfermedad pulmonar (desequilibrio V/Q) <b>además</b> de hipoventilación: los dos mecanismos coexisten, que es lo típico del EPOC agudizado.' },
      { q: 'La PaO₂ subió a 130 con oxígeno. ¿Qué te dice sobre el mecanismo de su hipoxemia?', pista: 'Respondió muy bien.', r: 'Que predominaba el desequilibrio V/Q y no el shunt verdadero: sus unidades estaban mal ventiladas pero abiertas, así que el oxígeno llegó y corrigió la hipoxemia con creces. De hecho, la corrigió en exceso: una PaO₂ de 130 es innecesaria y contraproducente.' },
      { q: '¿Por qué subió tanto la PaCO₂?', pista: 'Tres mecanismos, y el principal no es el que se enseña primero.', r: 'Principalmente por <b>abolición de la vasoconstricción pulmonar hipóxica</b>: el oxígeno dilató los vasos de zonas mal ventiladas, redistribuyó la perfusión hacia unidades de V/Q bajo y aumentó el espacio muerto, de modo que la misma ventilación elimina menos CO₂. Se suma el <b>efecto Haldane</b> (la hemoglobina oxigenada libera CO₂ al plasma) y, en menor medida, la reducción del estímulo ventilatorio hipóxico.' },
      { q: '¿Cuál es la conducta correcta ahora?', pista: 'Ni retirar el oxígeno ni mantenerlo así.', r: 'Ajustar el oxígeno a un objetivo de saturación de 88–92 % —no retirarlo, porque la hipoxemia mata antes que la hipercapnia— e iniciar <b>ventilación no invasiva</b>, que es el tratamiento de la acidosis respiratoria en la agudización de EPOC: asume parte del trabajo respiratorio, aumenta la ventilación alveolar y corrige el pH. En paralelo, tratar la causa de la agudización: broncodilatadores, corticoides y antibiótico si procede.' },
      { q: 'Su somnolencia, ¿es por la hipoxemia o por la hipercapnia?', pista: 'Su PaO₂ es de 130.', r: 'Por la hipercapnia y la acidosis: con una PaO₂ de 130 la hipoxemia está descartada como causa. El CO₂ elevado atraviesa la barrera hematoencefálica, acidifica el líquido cefalorraquídeo y produce narcosis. Es la demostración de que <b>la saturación no informa de la ventilación</b>: el pulsioxímetro estaba dando un número tranquilizador mientras el paciente se deterioraba.' }
    ],
    cierre: 'Este caso reúne los dos errores más caros del manejo respiratorio: confundir oxigenación con ventilación, y administrar oxígeno sin objetivo. El gradiente A-a y la respuesta al oxígeno habrían anticipado ambos.'
  },

  tarjetas: [
    { f: 'Shunt vs desequilibrio V/Q: respuesta al oxígeno', d: 'SHUNT (V/Q=0): NO responde al O₂, porque el gas no llega al alvéolo cerrado. Desequilibrio V/Q: SÍ responde, porque las unidades están mal ventiladas pero abiertas.' },
    { f: 'Los cinco mecanismos de hipoxemia', d: 'Baja FiO₂, hipoventilación, desequilibrio V/Q, shunt y trastorno de difusión. Se separan con el gradiente A-a y la respuesta al O₂.' },
    { f: 'Gradiente alvéolo-arterial: fórmula y utilidad', d: 'PAO₂ ≈ 150 − PaCO₂/0,8 (aire ambiente); gradiente = PAO₂ − PaO₂. NORMAL con CO₂ alto = fallo de bomba (hipoventilación). AUMENTADO = enfermedad pulmonar.' },
    { f: '¿Por qué el O₂ no corrige el shunt?', d: 'El gas no llega al alvéolo cerrado, y la sangre de las unidades sanas ya está saturada (meseta de la curva de la hemoglobina), así que no puede compensar. Con shunt > 30 % la respuesta es casi nula. Solución: reclutar (PEEP, prono, tratar la causa).' },
    { f: 'Vasoconstricción pulmonar hipóxica', d: 'La hipoxia alveolar CONTRAE los vasos pulmonares (al revés que en la circulación sistémica), desviando flujo a zonas bien ventiladas. Local = protectora. Global (altura, EPOC) = hipertensión pulmonar y cor pulmonale.' },
    { f: 'Hipercapnia por oxígeno en el EPOC: mecanismo principal', d: 'Abolición de la vasoconstricción pulmonar hipóxica → redistribución del flujo a unidades de V/Q bajo → ↑espacio muerto. Se suma el efecto Haldane. El descenso del estímulo hipóxico es el factor MENOR. Objetivo: SatO₂ 88–92 % + VNI.' },
    { f: 'Distribución regional de V/Q en bipedestación', d: 'V/Q ALTO en vértices (más espacio muerto relativo), BAJO en bases (más shunt relativo), porque la perfusión aumenta hacia abajo más que la ventilación. Explica la TBC apical y las atelectasias basales.' },
    { f: 'Atelectasias por reabsorción con FiO₂ alta', d: 'El O₂ puro desplaza al nitrógeno, que actúa como armazón gaseoso. Al reabsorberse rápido el O₂, los alvéolos poco ventilados colapsan: la hiperoxia puede AUMENTAR el shunt que pretendía tratar.' }
  ]
},

/* ---------------------------------------------------------- */
{
  id: 'transporte-gases',
  modulo: 'mecanica-vent',
  nombre: 'Transporte de oxígeno y dióxido de carbono',
  alto: true,
  minutos: 20,
  requisitos: ['intercambio-gaseoso'],
  ideaCentral: 'La saturación no mide el oxígeno que llega a los tejidos: el aporte depende del producto entre gasto cardíaco y contenido arterial, y el contenido depende sobre todo de la hemoglobina. Entender la forma sigmoidea de la curva de disociación y qué la desplaza permite predecir cuándo una saturación aparentemente aceptable esconde una situación crítica.',

  anclaje: {
    q: 'Sin mirar: un paciente con hemoglobina de 5 g/dL tiene saturación de 100 %. Otro con hemoglobina de 15 tiene saturación de 80 %. ¿Cuál transporta más oxígeno?',
    pista: 'Escribe la fórmula del contenido arterial de oxígeno antes de responder.'
  },

  bloques: [
    {
      nivel: 'imprescindible',
      titulo: 'Contenido y aporte de oxígeno',
      html: '<p style="text-align:center"><code>CaO₂ = (1,34 × Hb × SaO₂) + (0,003 × PaO₂)</code></p>' +
        '<p style="text-align:center"><code>DO₂ = Gasto cardíaco × CaO₂ × 10</code></p>' +
        '<p>Tres consecuencias que reordenan la intuición clínica:</p>' +
        '<ul><li>La <b>hemoglobina</b> domina el contenido. Duplicar la hemoglobina duplica el contenido; subir la PaO₂ de 100 a 500 mmHg apenas añade oxígeno disuelto (1,2 mL/dL frente a los ~20 que lleva unida).</li>' +
        '<li>El <b>oxígeno disuelto es despreciable</b> en condiciones normales. Solo cobra importancia en la cámara hiperbárica y en la intoxicación por monóxido.</li>' +
        '<li>El aporte tisular depende <b>tanto del flujo como del contenido</b>: un gasto cardíaco bajo produce hipoxia tisular con saturación del 100 %.</li></ul>' +
        '<p>Resolviendo el anclaje: 1,34 × 5 × 1,00 = 6,7 mL/dL frente a 1,34 × 15 × 0,80 = 16,1 mL/dL. El anémico con saturación perfecta transporta <b>menos de la mitad</b>.</p>',
      cadena: ['Hemoglobina', 'Contenido arterial de O₂', '× Gasto cardíaco', 'Aporte de O₂ (DO₂)', 'Consumo tisular']
    },
    {
      nivel: 'imprescindible',
      titulo: 'La curva de disociación y por qué es sigmoidea',
      html: '<p>La forma en S resulta de la <b>cooperatividad</b>: la unión de una molécula de oxígeno a la hemoglobina cambia su conformación (de estado T, tenso, a estado R, relajado) y aumenta la afinidad de las siguientes. Las dos zonas de la curva tienen funciones distintas:</p>' +
        '<ul><li><b>Meseta</b> (PaO₂ > 60 mmHg): garantiza una carga casi completa aunque la presión alveolar caiga bastante. Es un margen de seguridad, y explica por qué la saturación apenas cambia entre PaO₂ de 100 y de 70.</li>' +
        '<li><b>Pendiente empinada</b> (PaO₂ < 60 mmHg): permite descargar mucho oxígeno con pequeñas caídas de presión en el tejido. Y explica por qué, por debajo de una saturación del 90 %, un descenso pequeño de la PaO₂ produce un desplome de la saturación.</li></ul>' +
        '<p>🔥 De aquí sale el umbral clínico de 60 mmHg / 90 % de saturación: es el <b>codo</b> de la curva, el punto a partir del cual el paciente deja de tener margen.</p>' +
        '<p>La <b>P₅₀</b> (presión a la que la hemoglobina está saturada al 50 %) es de 27 mmHg y mide la afinidad: si sube, la afinidad ha bajado y la hemoglobina cede más fácilmente el oxígeno.</p>'
    },
    {
      nivel: 'importante',
      titulo: 'Qué desplaza la curva',
      html: '<table><tr><th>Desplaza a la DERECHA (↓afinidad, cede más O₂)</th><th>Desplaza a la IZQUIERDA (↑afinidad, retiene O₂)</th></tr>' +
        '<tr><td>↑ Temperatura</td><td>↓ Temperatura (hipotermia)</td></tr>' +
        '<tr><td>↑ CO₂ / ↓ pH (efecto Bohr)</td><td>↓ CO₂ / ↑ pH (alcalosis)</td></tr>' +
        '<tr><td>↑ 2,3-DPG (anemia crónica, altura)</td><td>↓ 2,3-DPG (sangre almacenada)</td></tr>' +
        '<tr><td>Ejercicio</td><td>Hemoglobina fetal, metahemoglobina, carboxihemoglobina</td></tr></table>' +
        '<p>La lógica es unificadora: <b>todo lo que caracteriza a un tejido metabólicamente activo</b> —calor, acidez, CO₂— desplaza la curva a la derecha y facilita que la hemoglobina suelte oxígeno justo donde hace falta. En el pulmón ocurre lo contrario y favorece la captación. Es un mecanismo elegante que no requiere ninguna regulación central.</p>' +
        '<p>La <b>hemoglobina fetal</b> tiene mayor afinidad (curva a la izquierda) porque debe extraer oxígeno de la sangre materna: su P₅₀ es de ~19 mmHg.</p>'
    },
    {
      nivel: 'complementario',
      titulo: 'Transporte de CO₂ y los engaños del pulsioxímetro',
      html: '<p>El CO₂ viaja de tres formas: <b>bicarbonato</b> (70 %, formado en el hematíe por la anhidrasa carbónica y exportado por el intercambiador cloruro-bicarbonato), <b>carbaminohemoglobina</b> (23 %) y <b>disuelto</b> (7 %, mucho más soluble que el oxígeno). El <b>efecto Haldane</b> completa el sistema: la hemoglobina desoxigenada transporta mejor el CO₂, de modo que ceder oxígeno en el tejido facilita simultáneamente la recogida de carbónico.</p>' +
        '<p><b>Limitaciones del pulsioxímetro</b>, que Diego debe tener presentes en la UCI:</p>' +
        '<ul><li>Mide saturación, <b>no</b> ventilación ni contenido. Un anémico grave puede marcar 100 %.</li>' +
        '<li>La <b>carboxihemoglobina</b> se lee como oxihemoglobina: en la intoxicación por monóxido el pulsioxímetro marca valores normales con un contenido de oxígeno desplomado. Requiere cooximetría.</li>' +
        '<li>La <b>metahemoglobina</b> tiende a fijar la lectura en torno al 85 % con independencia de la PaO₂ real.</li>' +
        '<li>Falla con hipoperfusión, hipotermia, vasoconstricción intensa, movimiento y esmalte oscuro.</li></ul>'
    }
  ],

  variables: [
    { n: 'Hemoglobina', d: 'up', nota: 'determinante principal del contenido' },
    { n: 'Saturación arterial', d: 'up', nota: 'útil solo por encima del codo de la curva' },
    { n: 'Gasto cardíaco', d: 'up', nota: 'el otro factor del aporte' },
    { n: 'P₅₀', d: 'up', nota: 'si sube, la hemoglobina cede oxígeno más fácilmente' }
  ],

  fisiopatologia: '<p>La <b>hipoxia</b> tiene cuatro tipos y conviene distinguirlos porque cada uno se trata distinto: <b>hipoxémica</b> (PaO₂ baja: problema pulmonar o de FiO₂), <b>anémica</b> (contenido bajo con PaO₂ normal: anemia, intoxicación por monóxido), <b>circulatoria o isquémica</b> (flujo insuficiente: shock, obstrucción arterial) e <b>histotóxica</b> (la célula no puede usar el oxígeno: cianuro, que bloquea la citocromo oxidasa; en el cianuro la saturación venosa está paradójicamente <b>alta</b> porque el tejido no extrae).</p>' +
    '<p>En la <b>intoxicación por monóxido de carbono</b>, la afinidad de la hemoglobina por el CO es unas 200–250 veces mayor que por el oxígeno, y además desplaza la curva a la izquierda, dificultando la cesión del poco oxígeno que queda unido. La combinación de menos contenido y peor entrega es lo que la hace letal, y explica que el tratamiento sea oxígeno al 100 % —que acorta la vida media de la carboxihemoglobina— y cámara hiperbárica en casos graves.</p>',

  clinica: '<p>Aplicación directa: en un paciente con hipoperfusión, antes de subir la FiO₂ conviene revisar los tres factores del aporte —<b>hemoglobina, saturación y gasto cardíaco</b>—. A menudo el problema es el tercero, y ninguna cantidad de oxígeno lo corrige. Es el mismo razonamiento del apartado de perfusión coronaria: aporte contra demanda.</p>' +
    '<p>La <b>saturación venosa central (SvcO₂)</b> cierra el circuito: refleja el equilibrio entre aporte y consumo. Baja (< 65 %) indica que el tejido extrae más porque le llega poco; alta en un paciente enfermo sugiere que no puede extraer (sepsis, cianuro) y no es tranquilizadora.</p>',

  error: {
    confunde: 'Usar la saturación de oxígeno como medida del oxígeno que llega a los tejidos.',
    parecido: 'Es un número continuo, no invasivo y omnipresente en cualquier monitor, lo que le da una autoridad que no le corresponde.',
    diferencia: 'La saturación indica <b>qué porcentaje</b> de la hemoglobina disponible lleva oxígeno, no cuánta hemoglobina hay ni cuánto flujo la transporta. El aporte es <code>GC × [(1,34 × Hb × SaO₂) + 0,003 × PaO₂]</code>: la saturación es solo uno de tres factores, y ni siquiera el más determinante.',
    ejemplo: 'Paciente con hemorragia digestiva, hemoglobina de 4 g/dL y saturación de 100 %: su contenido arterial es de 5,4 mL/dL frente a los ~20 normales. El monitor tranquiliza mientras el paciente está en hipoxia anémica severa.',
    regla: 'Antes de creerte una saturación, pregunta: ¿cuánta hemoglobina hay y cuánto flujo la mueve? Y recuerda que la saturación tampoco dice nada sobre el CO₂.'
  },

  perla: '🔥 <code>DO₂ = GC × (1,34 × Hb × SaO₂)</code>. Tres palancas: flujo, hemoglobina y saturación. La saturación es la que más se mira y la que menos margen suele tener, porque por encima de 90 % la curva está en meseta y ya no queda nada que ganar.',

  feynman: {
    consigna: 'Explica por qué en la intoxicación por monóxido de carbono el paciente puede estar gravemente hipóxico con un pulsioxímetro que marca 99 % y una PaO₂ normal.',
    puntos: [
      'Explico la afinidad del CO por la hemoglobina frente al O₂',
      'Explico que la PaO₂ mide gas disuelto y por eso es normal',
      'Explico por qué el pulsioxímetro confunde carboxi con oxihemoglobina',
      'Añado el desplazamiento de la curva a la izquierda',
      'Concluyo el tratamiento: O₂ al 100 % e hiperbárica'
    ],
    referencia: '<p>El monóxido de carbono se une al mismo sitio del grupo hemo que el oxígeno, pero con una afinidad entre <b>200 y 250 veces mayor</b>. En consecuencia, incluso concentraciones ambientales bajas desplazan al oxígeno y forman <b>carboxihemoglobina</b>, reduciendo drásticamente el número de sitios disponibles para transportar oxígeno. El contenido arterial de oxígeno se desploma.</p>' +
      '<p>Sin embargo, la <b>PaO₂ permanece normal</b>, y esto desconcierta si no se tiene claro qué mide cada parámetro. La PaO₂ es la presión del oxígeno <b>disuelto</b> en el plasma, y el pulmón sigue funcionando perfectamente: el gas se difunde con normalidad y se disuelve con normalidad. Lo que falla es el transportador, no el intercambio. Por eso la gasometría convencional, que calcula la saturación a partir de la PaO₂ mediante una ecuación, también informa de una saturación falsamente normal.</p>' +
      '<p>El <b>pulsioxímetro</b> añade su propio engaño: funciona comparando la absorción de luz a dos longitudes de onda, y la carboxihemoglobina absorbe de forma muy similar a la oxihemoglobina. El aparato no puede distinguirlas y las suma, informando saturaciones del 98–100 % en un paciente cuya hemoglobina útil puede estar reducida a la mitad. Solo la <b>cooximetría</b>, que utiliza múltiples longitudes de onda, mide directamente la carboxihemoglobina.</p>' +
      '<p>Hay un segundo golpe menos conocido y muy relevante: el CO <b>desplaza la curva de disociación hacia la izquierda</b>, aumentando la afinidad de la hemoglobina restante por el oxígeno. Es decir, no solo hay menos oxígeno transportado, sino que el poco que viaja se cede peor al tejido. A esto se suma la unión del CO a la citocromo oxidasa mitocondrial, que añade un componente de hipoxia histotóxica, y su efecto inflamatorio y de peroxidación lipídica en el sistema nervioso central, responsable de las secuelas neurológicas tardías.</p>' +
      '<p>El tratamiento se deduce del mecanismo: <b>oxígeno al 100 %</b> con la mayor concentración posible, porque desplaza competitivamente al CO y reduce su vida media desde unas 4–5 horas en aire ambiente hasta aproximadamente 60–90 minutos. La <b>oxigenoterapia hiperbárica</b> la acorta todavía más y aumenta mucho el oxígeno disuelto —el único que en esta situación puede llegar al tejido sin depender de la hemoglobina—, y se considera en casos graves: pérdida de conciencia, alteración neurológica, isquemia miocárdica, embarazo o niveles muy elevados de carboxihemoglobina.</p>'
  },

  preguntas: [
    { nivel: 1, q: 'Escribe la fórmula del contenido arterial de oxígeno.', r: 'CaO₂ = (1,34 × Hb × SaO₂) + (0,003 × PaO₂). El término disuelto es despreciable en condiciones normales.' },
    { nivel: 1, q: '¿Qué es la P₅₀ y cuál es su valor normal?', r: 'La presión parcial de oxígeno a la que la hemoglobina está saturada al 50 %; normal ≈ 27 mmHg. Mide la afinidad: si sube, la afinidad es menor y se cede más oxígeno.' },
    { nivel: 1, q: '¿De qué tres formas se transporta el CO₂ y en qué proporción?', r: 'Como bicarbonato (≈70 %), unido a la hemoglobina como carbaminohemoglobina (≈23 %) y disuelto (≈7 %).' },
    { nivel: 2, q: '¿Por qué la curva de disociación es sigmoidea y qué aporta cada zona?', r: 'Por cooperatividad: la unión de una molécula de O₂ aumenta la afinidad para las siguientes. La meseta (>60 mmHg) garantiza carga completa pese a caídas de la PaO₂; la zona empinada (<60) permite descargar mucho oxígeno con pequeñas caídas de presión tisular.' },
    { nivel: 2, q: 'Explica el efecto Bohr y el efecto Haldane, y por qué son complementarios.', r: 'Bohr: el aumento de CO₂ y de H⁺ reduce la afinidad de la hemoglobina por el oxígeno, favoreciendo su cesión en el tejido activo. Haldane: la hemoglobina desoxigenada transporta mejor el CO₂. Son complementarios porque ceder oxígeno facilita recoger carbónico, y captar oxígeno en el pulmón facilita liberarlo.' },
    { nivel: 2, q: '¿Por qué la sangre almacenada cede peor el oxígeno?', r: 'Porque el 2,3-DPG disminuye durante el almacenamiento, desplazando la curva a la izquierda y aumentando la afinidad. Se recupera en las horas siguientes a la transfusión.' },
    { nivel: 3, q: 'Paciente con lactato de 6 mmol/L, saturación de 99 %, PaO₂ de 110 y saturación venosa central del 85 %. ¿Qué tipo de hipoxia sospechas?', r: 'Hipoxia histotóxica —intoxicación por cianuro es el ejemplo clásico— o disfunción mitocondrial de la sepsis. La clave es la <b>SvcO₂ alta</b>: la sangre vuelve sin haber cedido oxígeno, lo que indica que el tejido no puede utilizarlo pese a que el aporte es adecuado. La oxigenación y el transporte están intactos; el fallo es intracelular, en la cadena respiratoria.' },
    { nivel: 3, q: 'A un paciente con anemia crónica severa (Hb 6 g/dL) bien adaptado se le transfunde. Explica qué mecanismos compensadores tenía y qué cambia.', r: 'Compensaba por tres vías: aumento del gasto cardíaco (el más importante, con circulación hiperdinámica), aumento del 2,3-DPG que desplaza la curva a la derecha y facilita la cesión periférica de oxígeno, y redistribución del flujo hacia órganos vitales. Al transfundir aumenta el contenido arterial, se reduce la necesidad de gasto elevado y desciende el trabajo cardíaco. El riesgo es la sobrecarga: en un paciente crónicamente adaptado con volumen plasmático expandido, transfundir rápido puede precipitar insuficiencia cardíaca, por lo que se transfunde lento y de a una unidad reevaluando.' }
  ],

  caso: {
    vineta: 'Familia de tres rescatada de un incendio doméstico. El padre, de 45 años, está confuso y con cefalea. Saturación por pulsioximetría 99 %, PaO₂ 105 mmHg, pH 7,28, lactato 7 mmol/L. Piel de aspecto normal.',
    pasos: [
      { q: 'La saturación y la PaO₂ son normales. ¿Descartan hipoxia?', pista: 'Recuerda qué mide cada una.', r: 'No. La PaO₂ mide oxígeno <b>disuelto</b> y el pulmón puede estar intacto; la saturación por pulsioximetría no distingue carboxihemoglobina de oxihemoglobina porque absorben luz de forma similar. Ninguna de las dos informa del contenido real ni del oxígeno que llega al tejido.' },
      { q: '¿Qué prueba pides y qué esperas encontrar?', pista: 'Necesitas más longitudes de onda.', r: 'Cooximetría, que mide directamente carboxihemoglobina y metahemoglobina. En un incendio en espacio cerrado se espera carboxihemoglobina elevada; conviene además considerar intoxicación concomitante por cianuro, liberado por la combustión de plásticos y textiles.' },
      { q: 'El lactato es de 7. ¿Qué añade ese dato?', pista: 'En el contexto de un incendio, un lactato muy alto orienta.', r: 'Indica metabolismo anaerobio significativo. En el contexto de inhalación de humo, un lactato desproporcionadamente elevado sugiere <b>intoxicación por cianuro</b> asociada, que bloquea la citocromo oxidasa e impide la utilización mitocondrial del oxígeno. Es una pista de alto valor porque el cianuro no se mide con rapidez y el tratamiento debe ser empírico.' },
      { q: '¿Por qué su piel tiene aspecto normal y no está cianótico?', pista: '¿Qué produce la cianosis?', r: 'Porque la cianosis se debe a la hemoglobina <b>desoxigenada</b> (más de 5 g/dL), y aquí la hemoglobina no está desoxigenada: está ocupada por monóxido, que además tiene color rojo intenso. De ahí la descripción clásica de coloración normal o rojiza. La ausencia de cianosis nunca descarta hipoxia.' },
      { q: '¿Cuál es el tratamiento inmediato y por qué funciona?', pista: 'Competencia por el sitio de unión.', r: 'Oxígeno al 100 % con mascarilla de reservorio o vía aérea avanzada. El oxígeno desplaza competitivamente al CO del grupo hemo y reduce su vida media de 4–5 horas a aproximadamente 60–90 minutos. La cámara hiperbárica la acorta más y aumenta mucho el oxígeno disuelto, que es el único que en esta situación llega al tejido sin depender de la hemoglobina; se considera ante alteración neurológica, pérdida de conciencia, isquemia miocárdica o embarazo. Si se sospecha cianuro, se añade hidroxocobalamina.' },
      { q: 'Resume por qué todos los parámetros habituales fallaron en este paciente.', pista: 'Cada uno mide algo distinto de lo que importa.', r: 'La PaO₂ mide gas disuelto y el intercambio pulmonar era normal. La saturación por pulsioximetría no distingue carboxihemoglobina. La saturación calculada por el gasómetro se deriva de la PaO₂ y hereda el mismo error. Y la exploración no mostraba cianosis porque la hemoglobina no estaba desoxigenada. Lo que estaba alterado —el <b>contenido</b> de oxígeno y su utilización— no lo mide ninguno de esos parámetros: hacía falta cooximetría y sospecha clínica.' }
    ],
    cierre: 'La intoxicación por monóxido es el recordatorio más contundente de que los monitores miden lo que miden, no lo que nos interesa. Contenido y aporte son conceptos distintos de saturación y presión parcial.'
  },

  tarjetas: [
    { f: 'Contenido y aporte de oxígeno: fórmulas', d: 'CaO₂ = (1,34 × Hb × SaO₂) + (0,003 × PaO₂). DO₂ = GC × CaO₂ × 10. La hemoglobina domina el contenido; el disuelto es despreciable.' },
    { f: '¿Por qué la curva de disociación es sigmoidea?', d: 'Cooperatividad: la unión de una molécula de O₂ cambia la conformación (T→R) y aumenta la afinidad de las siguientes. Meseta = margen de seguridad en la carga; zona empinada = descarga eficiente en el tejido.' },
    { f: 'Qué desplaza la curva a la DERECHA (cede más O₂)', d: '↑temperatura, ↑CO₂, ↓pH (efecto Bohr), ↑2,3-DPG, ejercicio. Lógica: todo lo que caracteriza al tejido activo facilita que la hemoglobina suelte oxígeno justo ahí.' },
    { f: 'Efecto Bohr y efecto Haldane', d: 'Bohr: ↑CO₂ y ↑H⁺ reducen la afinidad por el O₂ (cede más en el tejido). Haldane: la hemoglobina DESOXIGENADA transporta mejor el CO₂. Complementarios: ceder O₂ facilita recoger CO₂.' },
    { f: 'Los cuatro tipos de hipoxia', d: 'Hipoxémica (PaO₂ baja), anémica (contenido bajo con PaO₂ normal: anemia, CO), circulatoria (flujo insuficiente) e histotóxica (cianuro: la célula no puede usar el O₂, SvcO₂ ALTA).' },
    { f: 'Monóxido de carbono: por qué engaña el pulsioxímetro', d: 'La carboxihemoglobina absorbe luz como la oxihemoglobina: el aparato las suma y marca 99 %. La PaO₂ es normal porque mide gas DISUELTO. Solo la cooximetría lo detecta. Además desplaza la curva a la IZQUIERDA.' },
    { f: 'Tratamiento de la intoxicación por CO', d: 'O₂ al 100 %: desplaza competitivamente al CO y reduce su vida media de 4–5 h a 60–90 min. Hiperbárica si hay clínica neurológica, síncope, isquemia o embarazo. Sospechar cianuro asociado si el lactato es muy alto.' },
    { f: '¿Por qué la cianosis puede faltar en una hipoxia grave?', d: 'La cianosis exige > 5 g/dL de hemoglobina DESOXIGENADA. En la anemia severa no hay hemoglobina suficiente para acumular esa cantidad, y en la intoxicación por CO la hemoglobina está ocupada, no desoxigenada.' }
  ]
},

/* ---------------------------------------------------------- */
{
  id: 'insuficiencia-respiratoria',
  modulo: 'fallo-resp',
  nombre: 'Insuficiencia respiratoria y SDRA',
  alto: true,
  minutos: 22,
  requisitos: ['intercambio-gaseoso'],
  ideaCentral: 'La insuficiencia respiratoria se divide en dos problemas con causas y tratamientos distintos: fallo de oxigenación (tipo 1, el pulmón no intercambia) y fallo de ventilación (tipo 2, la bomba no mueve aire). El SDRA es la forma extrema del primero, y su tratamiento consiste en proteger el pulmón sano que queda más que en corregir el gas.',

  anclaje: {
    q: 'Antes de leer: dos pacientes tienen saturación de 86 %. Uno tiene PaCO₂ de 28 y el otro de 70. ¿Qué está fallando en cada uno y qué necesita cada uno?',
    pista: 'Uno tiene un problema de pulmón; el otro, de fuelle.'
  },

  bloques: [
    {
      nivel: 'imprescindible',
      titulo: 'Los dos tipos y por qué la distinción manda',
      html: '<table><tr><th></th><th>Tipo 1 — Oxigenación</th><th>Tipo 2 — Ventilación</th></tr>' +
        '<tr><td>Gasometría</td><td>PaO₂ ↓ con PaCO₂ normal o <b>baja</b></td><td>PaO₂ ↓ con PaCO₂ <b>alta</b></td></tr>' +
        '<tr><td>Gradiente A-a</td><td>Aumentado</td><td>Normal (salvo enfermedad pulmonar añadida)</td></tr>' +
        '<tr><td>Problema</td><td>El pulmón no intercambia</td><td>La bomba no mueve aire</td></tr>' +
        '<tr><td>Causas</td><td>Neumonía, edema, SDRA, TEP, atelectasia</td><td>Depresión central, neuromuscular, fatiga, obstrucción severa, tórax</td></tr>' +
        '<tr><td>Tratamiento</td><td>Oxígeno, PEEP, reclutar, tratar la causa</td><td><b>Asistir la ventilación</b> (VNI o invasiva)</td></tr></table>' +
        '<p>🔥 El error letal es tratar un tipo 2 con oxígeno: se corrige la saturación, se apaga la alarma y el CO₂ sigue subiendo hasta la narcosis y la parada. En el tipo 2 lo que hace falta es <b>mover aire</b>, no enriquecerlo.</p>' +
        '<p>Muchos pacientes son mixtos: un EPOC agudizado tiene enfermedad pulmonar (gradiente aumentado) y fatiga de la bomba (CO₂ alto) a la vez.</p>'
    },
    {
      nivel: 'imprescindible',
      titulo: 'La bomba ventilatoria: carga contra capacidad',
      html: '<p>El fallo tipo 2 se entiende como un desequilibrio entre la <b>carga</b> impuesta al sistema y la <b>capacidad</b> de los músculos respiratorios:</p>' +
        '<table><tr><th>Aumenta la carga</th><th>Reduce la capacidad</th></tr>' +
        '<tr><td>↑ Resistencia (broncoespasmo, secreciones)</td><td>Depresión central (opiáceos, sedantes, ictus)</td></tr>' +
        '<tr><td>↓ Compliance (edema, fibrosis, obesidad, ascitis)</td><td>Enfermedad neuromuscular (Guillain-Barré, miastenia, ELA)</td></tr>' +
        '<tr><td>↑ Espacio muerto</td><td>Fatiga diafragmática, desnutrición, miopatía del crítico</td></tr>' +
        '<tr><td>↑ Producción de CO₂ (fiebre, sepsis, exceso de hidratos)</td><td>Alteraciones electrolíticas: <b>hipofosfatemia</b>, hipopotasemia, hipomagnesemia</td></tr>' +
        '<tr><td>Auto-PEEP (umbral inspiratorio añadido)</td><td>Hiperinsuflación (diafragma aplanado, desventaja mecánica)</td></tr></table>' +
        '<p>Este marco tiene una virtud práctica: convierte «se está agotando» en una lista de factores corregibles. Bajar la fiebre, corregir el fósforo, drenar una ascitis o tratar el broncoespasmo puede evitar una intubación.</p>',
      cadena: ['Carga > capacidad', 'Respiración rápida y superficial', '↑ Espacio muerto relativo', '↓ Ventilación alveolar', '↑ PaCO₂', 'Fatiga y parada']
    },
    {
      nivel: 'importante',
      titulo: 'SDRA: definición y concepto de baby lung',
      html: '<p>Criterios (definición de Berlín): inicio agudo en la semana siguiente a un factor desencadenante, <b>opacidades bilaterales</b> no explicadas por derrame o atelectasia, edema <b>no</b> explicable únicamente por fallo cardíaco o sobrecarga, e hipoxemia clasificada por PaO₂/FiO₂ con al menos 5 cmH₂O de PEEP: leve 200–300, moderado 100–200, grave < 100.</p>' +
        '<p>La fisiopatología es un edema pulmonar <b>no cardiogénico</b>: la lesión del endotelio y del epitelio alveolar aumenta la permeabilidad y llena el alvéolo de líquido rico en proteínas, con inactivación del surfactante y colapso. El resultado es shunt masivo, caída de la compliance e hipertensión pulmonar.</p>' +
        '<p>El concepto que cambió el tratamiento es el <b>baby lung</b>: el pulmón del SDRA no es un pulmón rígido y homogéneo, sino un pulmón <b>pequeño</b>. Buena parte del parénquima está colapsada u ocupada, y el volumen corriente entero se dirige a la porción aireada que queda, del tamaño del pulmón de un niño. Por eso un volumen «normal» de 500 mL resulta enorme para ese pulmón residual y produce sobredistensión: la ventilación protectora con <b>6 mL/kg de peso predicho</b> no es una precaución, es adaptar el volumen al pulmón realmente disponible.</p>'
    },
    {
      nivel: 'complementario',
      titulo: 'Lesión inducida por el ventilador y decúbito prono',
      html: '<p>La ventilación puede lesionar por cuatro mecanismos:</p>' +
        '<ul><li><b>Volutrauma</b>: sobredistensión por volumen excesivo. Es el mecanismo dominante.</li>' +
        '<li><b>Barotrauma</b>: presión excesiva con rotura alveolar (neumotórax, enfisema subcutáneo).</li>' +
        '<li><b>Atelectrauma</b>: apertura y cierre cíclico de alvéolos inestables, que genera fuerzas de cizalla. Lo previene una PEEP adecuada.</li>' +
        '<li><b>Biotrauma</b>: la lesión mecánica desencadena liberación de mediadores inflamatorios que pasan a la circulación y contribuyen al fallo multiorgánico. Explica por qué la ventilación protectora reduce la mortalidad por causas extrapulmonares.</li></ul>' +
        '<p>El <b>decúbito prono</b> mejora la oxigenación y la supervivencia en el SDRA grave por varios mecanismos combinados: homogeneiza la distribución de la presión transpulmonar (en supino el peso del pulmón edematoso y del corazón comprime las regiones dorsales), redistribuye la ventilación hacia zonas dorsales que son las mejor perfundidas, facilita el drenaje de secreciones y reduce la compresión cardíaca sobre el pulmón. En conjunto, mejora el ajuste V/Q y reduce la sobredistensión de las zonas ventrales.</p>'
    }
  ],

  variables: [
    { n: 'PaCO₂', d: 'up', nota: 'la variable que separa tipo 1 de tipo 2' },
    { n: 'Relación carga/capacidad', d: 'up', nota: 'determina la fatiga de la bomba' },
    { n: 'Volumen pulmonar aireado', d: 'down', nota: 'baby lung: el pulmón es pequeño, no solo rígido' },
    { n: 'Presión de distensión', d: 'down', nota: 'objetivo: mantenerla por debajo de 15 cmH₂O' }
  ],

  fisiopatologia: '<p>La <b>respiración rápida y superficial</b> es el signo precoz de fatiga y tiene una lógica mecánica: es la estrategia que minimiza el trabajo por respiración cuando la carga es alta, pero al reducir el volumen corriente aumenta la proporción de espacio muerto y la ventilación alveolar cae. Por eso el índice de respiración rápida y superficial (frecuencia dividida por volumen corriente en litros) predice el fracaso de la extubación.</p>' +
    '<p>La secuencia del fallo es siempre la misma: aumento de la carga → taquipnea compensadora → fatiga → hipoventilación → hipercapnia → acidosis → depresión de la contractilidad diafragmática por la propia acidosis → parada. La hipercapnia que aparece <b>tras</b> un período de taquipnea intensa es un signo tardío y ominoso: significa que el paciente ya no puede sostener el esfuerzo.</p>',

  clinica: '<p>Signos de trabajo respiratorio que deben alarmar antes que la gasometría: uso de músculos accesorios, tiraje, respiración paradójica abdominal (el abdomen se hunde en inspiración: fatiga diafragmática), incapacidad para hablar frases completas, sudoración y agitación seguida de somnolencia. <b>Una PaCO₂ «normalizada» en un paciente que llevaba horas taquipneico no es una mejoría: es agotamiento.</b></p>' +
    '<p>La ventilación no invasiva tiene indicaciones con evidencia sólida —agudización de EPOC con acidosis respiratoria y edema agudo de pulmón cardiogénico— y es más discutible en la hipoxemia pura, donde el retraso de la intubación puede empeorar el pronóstico y donde el esfuerzo inspiratorio vigoroso puede lesionar el pulmón.</p>',

  error: {
    confunde: 'Interpretar una PaCO₂ normal como tranquilizadora en un paciente con dificultad respiratoria.',
    parecido: 'Un número dentro del rango de referencia se lee automáticamente como normalidad, y la mayoría de las veces lo es.',
    diferencia: 'En un paciente taquipneico y con trabajo respiratorio, lo <b>esperable</b> es una PaCO₂ <b>baja</b>, porque está hiperventilando. Una PaCO₂ normal en ese contexto significa que la ventilación alveolar ha empezado a caer, es decir, que se está agotando. Es un signo de alarma que precede a la descompensación.',
    ejemplo: 'Asmática grave con frecuencia de 34, tiraje intenso y PaCO₂ de 41 mmHg. La primera gasometría había mostrado 28. Ese ascenso a «normal» indica fatiga inminente y obliga a preparar el soporte ventilatorio, no a relajarse.',
    regla: 'En dificultad respiratoria, un CO₂ normal es un CO₂ alto. Interpreta siempre la gasometría junto al trabajo respiratorio y a la tendencia, nunca aislada.'
  },

  perla: '🔥 Tipo 1 = problema del pulmón, se trata con oxígeno y reclutamiento. Tipo 2 = problema de la bomba, se trata <b>moviendo aire</b>. Y en el SDRA, el pulmón no está rígido: está <b>pequeño</b> (baby lung). Por eso 6 mL/kg de peso predicho y presión de distensión por debajo de 15.',

  feynman: {
    consigna: 'Explica por qué en el SDRA se ventila con volúmenes pequeños aunque eso obligue a tolerar un CO₂ elevado, y por qué esa estrategia reduce la mortalidad.',
    puntos: [
      'Explico el concepto de baby lung: pulmón pequeño, no solo rígido',
      'Conecto volumen «normal» con sobredistensión del pulmón residual',
      'Nombro los mecanismos de lesión: volutrauma, atelectrauma, biotrauma',
      'Explico el papel de la PEEP y de la presión de distensión',
      'Justifico la hipercapnia permisiva como precio aceptable'
    ],
    referencia: '<p>En el SDRA una parte grande del parénquima está colapsada o llena de edema rico en proteínas, y no participa en la ventilación. El pulmón que queda disponible para recibir el volumen corriente puede reducirse a un tercio o menos del habitual: es el concepto de <b>baby lung</b>. La pieza clave es que ese pulmón residual <b>no es rígido</b>; tiene una compliance casi normal. Lo que ha cambiado no es la calidad del tejido sino su cantidad.</p>' +
      '<p>De ahí se sigue el problema. Si se entrega un volumen corriente «normal» de 500 mL, todo ese volumen se dirige a la porción aireada, que es del tamaño del pulmón de un niño. La sobredistensión resultante produce <b>volutrauma</b>: rotura de la barrera alvéolo-capilar, más edema y más inflamación. Simultáneamente, los alvéolos inestables que se abren en inspiración y se cierran en espiración generan fuerzas de cizalla en cada ciclo —<b>atelectrauma</b>—, que la PEEP previene manteniéndolos reclutados.</p>' +
      '<p>El daño no se queda en el pulmón. La lesión mecánica desencadena la liberación de mediadores inflamatorios que pasan a la circulación sistémica: es el <b>biotrauma</b>, y explica el hallazgo que más sorprendió de los ensayos de ventilación protectora, que los pacientes ventilados con volúmenes bajos morían menos <b>por fallo multiorgánico</b>, no solo por causas pulmonares. El ventilador no era solo un soporte: estaba contribuyendo activamente a la enfermedad.</p>' +
      '<p>Por eso la estrategia consiste en adaptar el volumen al pulmón que realmente hay: <b>6 mL/kg de peso predicho</b> —calculado por talla y sexo, no por peso real, porque el tamaño del pulmón no aumenta con la obesidad—, presión de meseta por debajo de 30 cmH₂O y, sobre todo, <b>presión de distensión</b> (meseta menos PEEP) por debajo de 15 cmH₂O, que es la variable que mejor se correlaciona con la supervivencia precisamente porque normaliza el volumen entregado respecto al tamaño funcional del pulmón.</p>' +
      '<p>El precio es la <b>hipercapnia permisiva</b>: con volúmenes pequeños se elimina menos CO₂ y el pH desciende. Se acepta porque la acidosis respiratoria moderada, hasta pH en torno a 7,20, es sorprendentemente bien tolerada durante días, mientras que la lesión inducida por el ventilador no lo es. Es la misma lógica de todo el cuidado crítico moderno: se renuncia a normalizar un número para proteger un órgano. Las contraindicaciones relativas son las situaciones donde la acidosis o la vasodilatación cerebral resultan peligrosas, como la hipertensión intracraneal.</p>'
  },

  preguntas: [
    { nivel: 1, q: 'Define insuficiencia respiratoria tipo 1 y tipo 2 por gasometría.', r: 'Tipo 1: PaO₂ baja con PaCO₂ normal o baja (fallo de oxigenación, gradiente A-a aumentado). Tipo 2: PaO₂ baja con PaCO₂ elevada (fallo de ventilación, gradiente normal salvo enfermedad pulmonar añadida).' },
    { nivel: 1, q: 'Enumera los criterios de SDRA de la definición de Berlín.', r: 'Inicio agudo en la semana posterior a un desencadenante; opacidades bilaterales no explicadas por derrame o atelectasia; edema no explicable solo por fallo cardíaco o sobrecarga; e hipoxemia por PaO₂/FiO₂ con PEEP ≥ 5 (leve 200–300, moderado 100–200, grave < 100).' },
    { nivel: 1, q: '¿Qué es el baby lung?', r: 'El concepto de que en el SDRA el pulmón aireado disponible está muy reducido —no simplemente rígido—, de modo que el volumen corriente se dirige por completo a esa porción pequeña y la sobredistiende.' },
    { nivel: 2, q: 'Explica el marco carga/capacidad del fallo ventilatorio con dos ejemplos de cada lado.', r: 'La bomba falla cuando la carga supera la capacidad. Aumentan la carga: broncoespasmo, edema, obesidad, fiebre, auto-PEEP. Reducen la capacidad: opiáceos, enfermedad neuromuscular, hipofosfatemia, fatiga e hiperinsuflación con diafragma aplanado. Su utilidad es que convierte «se agota» en una lista de factores corregibles.' },
    { nivel: 2, q: 'Nombra los cuatro mecanismos de lesión inducida por el ventilador.', r: 'Volutrauma (sobredistensión por volumen), barotrauma (rotura por presión), atelectrauma (apertura y cierre cíclico, prevenido con PEEP) y biotrauma (liberación sistémica de mediadores inflamatorios, que explica el fallo multiorgánico).' },
    { nivel: 2, q: '¿Por qué el volumen corriente se calcula por peso predicho y no por peso real?', r: 'Porque el tamaño del pulmón depende de la talla y el sexo, y no aumenta con la obesidad. Calcularlo por peso real entregaría volúmenes muy superiores a la capacidad del pulmón y produciría sobredistensión.' },
    { nivel: 3, q: 'Paciente con crisis asmática, frecuencia 36, tiraje intenso. Primera gasometría: PaCO₂ 27. Dos horas después: PaCO₂ 42. Está «más tranquilo». ¿Qué ha ocurrido?', r: 'Está claudicando. La PaCO₂ de 27 reflejaba una hiperventilación apropiada; su ascenso a un valor «normal» en un paciente que sigue obstruido significa que la ventilación alveolar ha caído porque los músculos respiratorios se están fatigando. La «tranquilidad» es agotamiento y probablemente narcosis incipiente, no mejoría. Requiere preparar soporte ventilatorio de forma inmediata, además de intensificar el tratamiento broncodilatador.' },
    { nivel: 3, q: 'Paciente con SDRA grave y PaO₂/FiO₂ de 85 pese a ventilación protectora optimizada. ¿Qué intervención tiene evidencia de reducir mortalidad y por qué funciona?', r: 'El decúbito prono en sesiones prolongadas. Funciona por varios mecanismos combinados: homogeneiza la distribución de la presión transpulmonar, ya que en supino el peso del pulmón edematoso y del corazón comprime las regiones dorsales; redistribuye la ventilación hacia zonas dorsales, que son las mejor perfundidas, mejorando el ajuste V/Q; reduce la sobredistensión de las regiones ventrales; y facilita el drenaje de secreciones. El resultado es mejor oxigenación con menos lesión inducida por el ventilador, y esa reducción de lesión es probablemente lo que explica el beneficio en supervivencia más que la mejoría del gas en sí.' }
  ],

  caso: {
    vineta: 'Varón de 54 años ingresado por neumonía grave. A las 36 horas: FiO₂ 0,8, PaO₂ 78 (PaO₂/FiO₂ 97), infiltrados bilaterales en la radiografía, sin datos de sobrecarga ni disfunción ventricular en la ecografía. Ventilado con Vt 8 mL/kg, meseta 32, PEEP 8. Talla 1,75 m.',
    pasos: [
      { q: '¿Cumple criterios de SDRA y de qué gravedad?', pista: 'Berlín.', r: 'Sí: inicio agudo tras un desencadenante, opacidades bilaterales, edema no explicable por fallo cardíaco (confirmado por ecografía) y PaO₂/FiO₂ de 97 con PEEP ≥ 5. Corresponde a SDRA <b>grave</b> (< 100).' },
      { q: 'Su volumen corriente es de 8 mL/kg. ¿Sobre qué peso debe calcularse y cuál sería el objetivo?', pista: 'El pulmón no crece con el peso.', r: 'Sobre el <b>peso predicho</b>, calculado a partir de la talla y el sexo, no sobre el peso real. Para 1,75 m en un varón, el peso predicho ronda los 70 kg, de modo que el objetivo de 6 mL/kg equivale a unos 420 mL. El pulmón tiene el tamaño que le corresponde a su talla, con independencia de lo que pese el paciente.' },
      { q: 'Calcula su presión de distensión e interprétala.', pista: 'Meseta menos PEEP.', r: '32 − 8 = 24 cmH₂O, muy por encima del objetivo de 15. Es la variable que mejor se correlaciona con mortalidad en SDRA, porque expresa el volumen entregado en relación con el tamaño funcional del pulmón. Hay que reducirla, bajando el volumen corriente y ajustando la PEEP.' },
      { q: '¿Qué papel juega la PEEP en su caso y qué riesgo tiene subirla?', pista: 'Recluta, pero también puede sobredistender.', r: 'Mantiene reclutados los alvéolos inestables, aumenta la capacidad residual funcional, reduce el shunt y previene el atelectrauma. El riesgo es que en zonas ya aireadas produzca sobredistensión y, hemodinámicamente, que al elevar la presión intratorácica reduzca el retorno venoso y el gasto cardíaco. Por eso se titula observando el efecto sobre la compliance, la oxigenación y la presión de distensión, no aplicando un valor fijo.' },
      { q: 'Al bajar el volumen a 6 mL/kg, el pH cae a 7,22 con PaCO₂ de 62. ¿Qué haces?', pista: 'Recuerda cuál es el objetivo real del tratamiento.', r: 'Aceptarlo: es <b>hipercapnia permisiva</b>. Un pH de 7,22 se tolera bien durante días, mientras que la sobredistensión pulmonar no. Se puede aumentar moderadamente la frecuencia respiratoria vigilando que no aparezca atrapamiento aéreo, reducir el espacio muerto instrumental y disminuir la producción de CO₂ tratando fiebre y agitación. No se debe volver a volúmenes altos para normalizar un número.' },
      { q: 'Persiste con PaO₂/FiO₂ de 90 tras optimizar. ¿Siguiente paso?', pista: 'Cambio de posición.', r: 'Decúbito prono en sesiones prolongadas, indicado en SDRA grave con PaO₂/FiO₂ inferior a 150. Homogeneiza la presión transpulmonar, redistribuye la ventilación hacia las zonas dorsales mejor perfundidas, mejora el ajuste V/Q y reduce la lesión inducida por el ventilador. Se valoran además bloqueo neuromuscular precoz en casos seleccionados y, si fracasa todo, soporte extracorpóreo.' }
    ],
    cierre: 'El SDRA enseña la lección central del cuidado crítico moderno: a veces el mejor tratamiento consiste en dejar de agredir. Se renuncia a normalizar el CO₂ para proteger el pulmón que queda.'
  },

  tarjetas: [
    { f: 'Insuficiencia respiratoria tipo 1 vs tipo 2', d: 'Tipo 1: PaO₂↓ con PaCO₂ normal o BAJA, gradiente A-a aumentado → problema del PULMÓN (O₂, PEEP, reclutar). Tipo 2: PaO₂↓ con PaCO₂ ALTA, gradiente normal → problema de la BOMBA (hay que mover aire: VNI o invasiva).' },
    { f: 'PaCO₂ «normal» en un paciente taquipneico: ¿qué significa?', d: 'AGOTAMIENTO. Lo esperable en dificultad respiratoria es un CO₂ BAJO por hiperventilación. Que se normalice indica caída de la ventilación alveolar por fatiga: signo de alarma que precede a la parada.' },
    { f: 'Marco carga/capacidad del fallo ventilatorio', d: 'CARGA: broncoespasmo, ↓compliance, ↑espacio muerto, fiebre, auto-PEEP. CAPACIDAD: opiáceos, enfermedad neuromuscular, hipofosfatemia, fatiga, hiperinsuflación. Convierte "se agota" en una lista de factores corregibles.' },
    { f: 'Criterios de Berlín para SDRA', d: 'Inicio agudo (< 1 semana), opacidades bilaterales, edema no explicable solo por fallo cardíaco, y PaO₂/FiO₂ con PEEP ≥ 5: leve 200–300, moderado 100–200, grave < 100.' },
    { f: 'Concepto de baby lung', d: 'En el SDRA el pulmón aireado está muy REDUCIDO, no simplemente rígido; el tejido residual tiene compliance casi normal. Por eso un Vt "normal" lo sobredistiende y se ventila con 6 mL/kg de PESO PREDICHO.' },
    { f: 'Cuatro mecanismos de lesión inducida por el ventilador', d: 'Volutrauma (sobredistensión, el dominante), barotrauma (rotura), atelectrauma (apertura-cierre cíclico, se previene con PEEP) y biotrauma (mediadores sistémicos → fallo multiorgánico).' },
    { f: '¿Por qué peso predicho y no peso real?', d: 'El tamaño del pulmón depende de talla y sexo, y NO aumenta con la obesidad. Calcular por peso real produciría sobredistensión sistemática.' },
    { f: 'Decúbito prono: por qué funciona', d: 'Homogeneiza la presión transpulmonar (en supino el pulmón edematoso y el corazón comprimen las zonas dorsales), redistribuye ventilación hacia las regiones dorsales mejor perfundidas, mejora V/Q y reduce la lesión por el ventilador. Indicado si PaO₂/FiO₂ < 150.' }
  ]
}

]);

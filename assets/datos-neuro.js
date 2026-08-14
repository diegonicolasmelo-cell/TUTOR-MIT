/* ============================================================
   ÁREA — NEUROFISIOLOGÍA
   Excitabilidad, sinapsis, perfusión cerebral y conciencia
   ============================================================ */

TUTOR.registrarTemas([

/* ---------------------------------------------------------- */
{
  id: 'potencial-membrana',
  modulo: 'neurofisio',
  nombre: 'Potencial de membrana y conducción del impulso',
  alto: true,
  minutos: 20,
  requisitos: [],
  ideaCentral: 'El potencial de reposo no lo crea la bomba de sodio y potasio directamente, sino la permeabilidad selectiva al potasio sobre el gradiente que esa bomba mantiene. Entender que el potencial se acerca al equilibrio del ion más permeable en cada momento explica de una vez el reposo, el potencial de acción y por qué las alteraciones del potasio y del sodio tienen las consecuencias que tienen.',

  anclaje: {
    q: 'Sin mirar: ¿por qué el potencial de reposo está cerca del equilibrio del potasio (−90 mV) y no del sodio (+60 mV), si ambos gradientes existen simultáneamente?',
    pista: 'No depende del tamaño del gradiente sino de otra cosa que cambia durante el potencial de acción.'
  },

  bloques: [
    {
      nivel: 'imprescindible',
      titulo: 'De dónde sale el potencial de reposo',
      html: '<p>La <b>bomba Na⁺/K⁺-ATPasa</b> saca 3 sodios e introduce 2 potasios por cada ATP, creando y manteniendo los gradientes. Su contribución <i>directa</i> al voltaje es pequeña (unos −4 mV por ser electrogénica); su papel esencial es <b>sostener los gradientes</b> sobre los que todo lo demás funciona.</p>' +
        '<p>El potencial que resulta lo describe la ecuación de Nernst para cada ion, y la de Goldman para el conjunto. La idea que hay que retener es simple: <b>el potencial de membrana se acerca al potencial de equilibrio del ion al que la membrana es más permeable en ese momento</b>.</p>' +
        '<ul><li><b>En reposo</b>, la membrana es unas 50–100 veces más permeable al K⁺ que al Na⁺ (canales de fuga de potasio abiertos). Por eso el potencial (−70 a −90 mV) se sitúa cerca del equilibrio del potasio (−90 mV) y no del sodio.</li>' +
        '<li><b>En la fase 0 del potencial de acción</b>, se abren los canales de sodio y la permeabilidad al Na⁺ se dispara: el potencial corre hacia el equilibrio del sodio (+60 mV).</li></ul>' +
        '<p>🔥 Esta única regla explica también las consecuencias clínicas de las alteraciones del potasio: al subir el K⁺ extracelular, el gradiente se estrecha, el equilibrio del potasio se hace menos negativo y con él el potencial de reposo.</p>',
      cadena: ['Bomba Na⁺/K⁺', 'Gradientes iónicos', 'Permeabilidad selectiva al K⁺', 'Potencial de reposo ≈ E(K⁺)', 'Excitabilidad']
    },
    {
      nivel: 'imprescindible',
      titulo: 'Potencial de acción y ley del todo o nada',
      html: '<p>Es un fenómeno <b>regenerativo</b>: la despolarización abre canales de sodio dependientes de voltaje, cuya entrada despolariza más y abre más canales. Ese bucle de retroalimentación positiva es lo que hace que, una vez alcanzado el <b>umbral</b>, el potencial de acción se dispare por completo o no se dispare en absoluto.</p>' +
        '<p>Consecuencia importante: la intensidad del estímulo <b>no se codifica en la amplitud</b> del potencial de acción, que es siempre la misma, sino en la <b>frecuencia</b> de disparo y en el número de fibras reclutadas. Es un código de frecuencia, no de amplitud.</p>' +
        '<p>Los canales de sodio tienen <b>dos compuertas</b>, y esa arquitectura explica los períodos refractarios: la de activación se abre rápido con la despolarización, y la de inactivación se cierra poco después y solo se recupera cuando la membrana se repolariza. Durante el <b>período refractario absoluto</b> no hay canales disponibles y ningún estímulo genera respuesta; en el <b>relativo</b>, hay algunos recuperados y un estímulo intenso puede producir una respuesta de menor amplitud.</p>' +
        '<p>Los períodos refractarios cumplen dos funciones: <b>limitan la frecuencia máxima</b> de disparo y garantizan la <b>propagación unidireccional</b>, porque la zona que acaba de despolarizarse queda temporalmente inexcitable y el impulso no puede retroceder.</p>'
    },
    {
      nivel: 'importante',
      titulo: 'Velocidad de conducción: mielina y calibre',
      html: '<p>Dos factores determinan la velocidad:</p>' +
        '<ul><li><b>Diámetro</b>: a mayor calibre, menor resistencia interna longitudinal y mayor velocidad.</li>' +
        '<li><b>Mielinización</b>: la vaina actúa como aislante, aumenta la resistencia de membrana y reduce su capacitancia, de modo que la corriente viaja pasivamente entre nodos de Ranvier y el potencial de acción se regenera solo en ellos. Es la <b>conducción saltatoria</b>, que multiplica la velocidad y <b>ahorra energía</b>, porque solo hay que bombear iones en los nodos.</li></ul>' +
        '<p>Rangos: fibras Aα mielinizadas de gran calibre (motoras, propiocepción) hasta 120 m/s; fibras C amielínicas (dolor lento, temperatura, autonómicas posganglionares) 0,5–2 m/s. Esa diferencia explica el <b>dolor en dos tiempos</b>: primero un dolor agudo y bien localizado por fibras Aδ y después uno sordo y difuso por fibras C.</p>' +
        '<p>Las <b>enfermedades desmielinizantes</b> (esclerosis múltiple, Guillain-Barré) enlentecen o bloquean la conducción: la corriente se dispersa entre nodos y puede no alcanzar el umbral en el siguiente. Por eso los estudios de conducción distinguen patrones desmielinizantes (velocidad reducida, latencias prolongadas) de axonales (amplitud reducida).</p>'
    },
    {
      nivel: 'complementario',
      titulo: 'Anestésicos locales y canalopatías',
      html: '<p>Los <b>anestésicos locales</b> bloquean el canal de sodio desde el interior, y su comportamiento tiene tres particularidades muy preguntadas:</p>' +
        '<ul><li>Son <b>bases débiles</b>: deben atravesar la membrana en forma no ionizada y actuar en forma ionizada desde dentro. Por eso <b>funcionan mal en tejido infectado</b>, cuyo pH ácido aumenta la fracción ionizada que no puede entrar.</li>' +
        '<li>Tienen <b>bloqueo dependiente del uso</b>: se unen preferentemente al canal en estado abierto o inactivado, de modo que las fibras que disparan con más frecuencia se bloquean antes.</li>' +
        '<li>El orden de bloqueo sigue el calibre y la mielinización: primero fibras pequeñas y amielínicas (dolor y temperatura), después tacto y presión, y por último las motoras grandes. De ahí que se pueda conseguir analgesia conservando la función motora.</li></ul>' +
        '<p>La toxicidad sistémica sigue el mismo mecanismo en otros tejidos: síntomas neurológicos primero (sabor metálico, acúfenos, convulsiones) y cardiovasculares después, siendo la bupivacaína la más cardiotóxica. El tratamiento incluye emulsión lipídica intravenosa.</p>'
    }
  ],

  variables: [
    { n: 'Permeabilidad al K⁺', d: 'up', nota: 'domina en reposo: por eso el potencial es negativo' },
    { n: 'K⁺ extracelular', d: 'up', nota: 'despolariza el reposo e inactiva canales de Na⁺' },
    { n: 'Canales de Na⁺ disponibles', d: 'down', nota: 'determinan velocidad de conducción y refractariedad' },
    { n: 'Mielinización', d: 'up', nota: 'conducción saltatoria: más rápida y más eficiente' }
  ],

  fisiopatologia: '<p>Las alteraciones de la excitabilidad se agrupan según qué parte del sistema fallen. La <b>hiperpotasemia</b> despolariza el reposo e inactiva canales de sodio, produciendo debilidad y trastornos de conducción cardíaca. La <b>hipocalcemia</b> aumenta la excitabilidad porque el calcio extracelular estabiliza la membrana desplazando el umbral: su déficit acerca el umbral al reposo y aparecen parestesias, espasmo carpopedal y tetania (signos de Chvostek y Trousseau).</p>' +
    '<p>Las <b>canalopatías</b> ilustran el principio de forma pura: mutaciones de canales de sodio, potasio o calcio producen epilepsias, parálisis periódicas, síndrome de QT largo y miotonías, todas explicables como alteraciones de la excitabilidad de membrana.</p>',

  clinica: '<p>Para la práctica: la debilidad muscular aguda obliga a revisar potasio, calcio, magnesio y fósforo antes de buscar causas más complejas, porque son corregibles en minutos. Y en el paciente crítico, la <b>polineuropatía y miopatía del enfermo crítico</b> —favorecida por sepsis, inmovilidad, hiperglucemia y bloqueantes neuromusculares— es una causa frecuente de fracaso en la retirada del ventilador que se diagnostica tarde si no se piensa en ella.</p>',

  error: {
    confunde: 'Atribuir el potencial de reposo directamente a la bomba Na⁺/K⁺-ATPasa.',
    parecido: 'La bomba es electrogénica y su inhibición efectivamente altera el potencial, lo que refuerza la asociación causal.',
    diferencia: 'La contribución <b>directa</b> de la bomba al voltaje es de apenas unos −4 mV. El potencial de reposo lo genera la <b>permeabilidad selectiva al potasio</b> actuando sobre el gradiente que la bomba mantiene. La bomba es el generador del gradiente, no del voltaje: si se inhibiera bruscamente, el potencial no desaparecería de inmediato sino que se degradaría a medida que se disipan los gradientes.',
    ejemplo: 'La digoxina inhibe la Na⁺/K⁺-ATPasa y su efecto principal no es un cambio directo de voltaje, sino la acumulación de sodio intracelular que altera el intercambio Na⁺/Ca²⁺ y aumenta el calcio: el efecto es metabólico y secundario, no eléctrico directo.',
    regla: 'La bomba fabrica el gradiente; la permeabilidad decide el voltaje. El potencial siempre tiende hacia el equilibrio del ion más permeable en ese instante.'
  },

  perla: '🔥 El potencial de membrana se aproxima al equilibrio del ion más permeable. En reposo domina el K⁺ (−90 mV); en la fase 0 domina el Na⁺ (+60 mV). Con esa sola frase se deducen el reposo, el potencial de acción y el efecto de la hiperpotasemia.',

  feynman: {
    consigna: 'Explica por qué un anestésico local no hace efecto en un absceso, y por qué bloquea antes el dolor que la fuerza muscular.',
    puntos: [
      'Explico que son bases débiles y necesitan atravesar la membrana no ionizadas',
      'Conecto el pH ácido del tejido infectado con el aumento de la fracción ionizada',
      'Explico que el bloqueo del canal ocurre desde el lado intracelular',
      'Explico el bloqueo dependiente del uso',
      'Explico el orden de bloqueo por calibre y mielinización'
    ],
    referencia: '<p>Los anestésicos locales son <b>bases débiles</b> y existen en equilibrio entre una forma no ionizada, liposoluble, y otra ionizada, hidrosoluble. Para actuar deben recorrer un camino en dos etapas: primero atravesar la membrana axonal, lo que solo puede hacer la forma <b>no ionizada</b>, y después unirse al canal de sodio desde el <b>lado intracelular</b>, cosa que hace preferentemente la forma <b>ionizada</b>. Necesitan por tanto ambas formas, en el orden correcto.</p>' +
      '<p>En un tejido infectado el pH es ácido, y en un medio ácido una base débil se protona: aumenta la fracción ionizada y disminuye la no ionizada. Con menos moléculas capaces de atravesar la membrana, llega muy poco fármaco al interior del axón y el bloqueo es insuficiente. De ahí la observación clínica clásica de que infiltrar un absceso duele y no anestesia bien, y la recomendación de bloquear proximalmente, en tejido sano, en lugar de infiltrar la zona inflamada. La alcalinización con bicarbonato aumenta la fracción no ionizada y acelera el inicio de acción, y es el mismo razonamiento aplicado a la inversa.</p>' +
      '<p>La segunda pregunta se explica por dos mecanismos que actúan juntos. El primero es el <b>bloqueo dependiente del uso</b>: el anestésico se une con mucha más afinidad al canal de sodio en estado abierto o inactivado que en estado de reposo, de modo que las fibras que disparan con mayor frecuencia acumulan bloqueo más rápidamente. Las fibras nociceptivas descargan de forma sostenida, mientras que las motoras lo hacen de manera más intermitente.</p>' +
      '<p>El segundo es el <b>calibre y la mielinización</b>. Las fibras finas y amielínicas o poco mielinizadas —C y Aδ, que transportan dolor y temperatura— necesitan bloquear una longitud menor de axón y tienen menos canales por unidad de longitud, de modo que se bloquean con concentraciones más bajas. Las fibras mielinizadas requieren que se bloqueen al menos tres nodos de Ranvier consecutivos para que la corriente no pueda saltar, y las gruesas fibras motoras Aα, con nodos muy separados, son las más resistentes.</p>' +
      '<p>El resultado es un <b>bloqueo diferencial</b> con una secuencia predecible: primero desaparecen el dolor y la temperatura, después el tacto y la presión, y por último la función motora, que se recupera además en orden inverso. Esto tiene una aplicación directa: permite conseguir analgesia útil —en un parto o en analgesia epidural postoperatoria— conservando la fuerza, simplemente ajustando la concentración del fármaco.</p>'
  },

  preguntas: [
    { nivel: 1, q: '¿Qué genera realmente el potencial de reposo?', r: 'La permeabilidad selectiva al potasio (canales de fuga) actuando sobre el gradiente que mantiene la bomba Na⁺/K⁺-ATPasa. La contribución electrogénica directa de la bomba es de solo unos −4 mV.' },
    { nivel: 1, q: '¿Cómo se codifica la intensidad de un estímulo si el potencial de acción es todo o nada?', r: 'Por la frecuencia de disparo y por el número de fibras reclutadas, no por la amplitud, que es constante.' },
    { nivel: 1, q: '¿Qué es la conducción saltatoria y qué dos ventajas aporta?', r: 'La regeneración del potencial de acción únicamente en los nodos de Ranvier, con conducción pasiva de la corriente entre ellos. Aporta mucha mayor velocidad y ahorro energético, porque solo hay que restablecer gradientes en los nodos.' },
    { nivel: 2, q: 'Explica cómo las dos compuertas del canal de sodio generan los períodos refractarios y para qué sirven.', r: 'La compuerta de activación se abre con la despolarización y la de inactivación se cierra poco después, recuperándose solo con la repolarización. Mientras están inactivados no hay respuesta posible (refractario absoluto) y con recuperación parcial se requiere un estímulo mayor (relativo). Sirven para limitar la frecuencia máxima de disparo y garantizar la propagación unidireccional.' },
    { nivel: 2, q: '¿Por qué la hipocalcemia produce tetania?', r: 'Porque el calcio extracelular estabiliza la membrana desplazando el potencial umbral hacia valores menos negativos. Su déficit acerca el umbral al potencial de reposo, aumentando la excitabilidad: parestesias, espasmo carpopedal y signos de Chvostek y Trousseau.' },
    { nivel: 2, q: '¿Cómo distinguen los estudios de conducción una neuropatía desmielinizante de una axonal?', r: 'La desmielinizante muestra velocidades de conducción reducidas y latencias prolongadas con amplitudes relativamente conservadas; la axonal muestra amplitudes reducidas con velocidades relativamente normales.' },
    { nivel: 3, q: 'Paciente en la UCI que no se puede extubar pese a estar consciente, colaborador y con mecánica pulmonar aceptable. Fuerza global disminuida y reflejos hipoactivos. ¿Qué consideras?', r: 'Polineuropatía y miopatía del enfermo crítico. Se asocia a sepsis, fracaso multiorgánico, inmovilidad prolongada, hiperglucemia y uso de bloqueantes neuromusculares y corticoides. Produce debilidad simétrica generalizada que afecta también al diafragma, y es causa frecuente de fracaso en la retirada del ventilador. Antes hay que descartar y corregir causas metabólicas rápidas —potasio, fósforo, magnesio, calcio—, revisar sedación residual y considerar patología neuromuscular específica como Guillain-Barré o miastenia.' },
    { nivel: 3, q: 'Un paciente recibe una dosis alta de bupivacaína para un bloqueo y presenta acúfenos, sabor metálico y después convulsiones y arritmia. Explica la secuencia y el tratamiento.', r: 'Es toxicidad sistémica por anestésicos locales. El fármaco alcanza la circulación y bloquea canales de sodio en el sistema nervioso central y en el corazón. En el sistema nervioso central los primeros síntomas son de excitación paradójica —sabor metálico, acúfenos, agitación, convulsiones—, porque se bloquean antes las vías inhibitorias; después aparece depresión. En el corazón, la bupivacaína es especialmente cardiotóxica por su alta afinidad y lenta disociación del canal de sodio, produciendo bloqueos, ensanchamiento del QRS, arritmias ventriculares y colapso refractario. El tratamiento es soporte vital, control de las convulsiones con benzodiacepinas y <b>emulsión lipídica intravenosa</b>, que actúa como reservorio que extrae el anestésico de los tejidos.' }
  ],

  caso: {
    vineta: 'Mujer de 38 años con debilidad ascendente de 4 días tras un cuadro diarreico. No puede caminar. Reflejos abolidos, sin nivel sensitivo. Capacidad vital forzada 18 mL/kg y descendiendo. Gasometría: pH 7,44, PaCO₂ 36, PaO₂ 88.',
    pasos: [
      { q: '¿Qué patrón sugiere la exploración?', pista: 'Debilidad ascendente, arreflexia, sin nivel sensitivo.', r: 'Polirradiculoneuropatía aguda, compatible con síndrome de Guillain-Barré, típicamente desmielinizante y frecuentemente precedido por una infección gastrointestinal. La arreflexia difusa y la ausencia de nivel sensitivo la distinguen de una lesión medular.' },
      { q: '¿Por qué falla la conducción si el axón está íntegro?', pista: 'Conducción saltatoria.', r: 'Porque la desmielinización elimina el aislamiento entre nodos de Ranvier: la corriente se dispersa y se atenúa antes de alcanzar el siguiente nodo, de modo que no llega al umbral y la conducción se enlentece o se bloquea. El axón puede estar intacto, y de ahí que la recuperación sea posible al remielinizar.' },
      { q: 'Su gasometría es normal. ¿La tranquiliza?', pista: 'Recuerda el fallo de bomba.', r: 'No. En la insuficiencia ventilatoria neuromuscular, la gasometría se mantiene normal <b>hasta que el paciente claudica</b>, y entonces se deteriora bruscamente. Esperar a la hipercapnia es esperar demasiado: lo que hay que seguir es la capacidad vital y la fuerza, no el CO₂.' },
      { q: '¿Qué parámetros vigilas y con qué umbrales?', pista: 'Función de bomba, no gas.', r: 'La capacidad vital forzada y las presiones inspiratoria y espiratoria máximas, de forma seriada. Se considera indicación de soporte ventilatorio una capacidad vital por debajo de aproximadamente 15–20 mL/kg o su descenso rápido, junto a signos clínicos como incapacidad de contar hasta 20 en una espiración, tos débil o dificultad para tragar. Esta paciente, con 18 mL/kg y en descenso, requiere ingreso en cuidados intensivos y preparación para intubación.' },
      { q: '¿Por qué debe vigilarse también su ritmo cardíaco y su presión arterial?', pista: 'El nervio afectado no es solo motor.', r: 'Porque el proceso afecta también a fibras autonómicas, produciendo <b>disautonomía</b>: fluctuaciones bruscas de presión arterial, bradiarritmias, taquiarritmias e íleo. Es una causa importante de mortalidad en esta enfermedad y obliga a monitorización continua y a extremar la precaución con fármacos vasoactivos, ante los que la respuesta puede ser exagerada.' },
      { q: '¿Por qué está formalmente contraindicada la succinilcolina si hay que intubarla?', pista: 'Receptores y potasio.', r: 'Porque la denervación produce una proliferación de receptores nicotínicos extrasinápticos e inmaduros a lo largo de toda la fibra muscular. La succinilcolina, al despolarizarlos masivamente, libera una cantidad enorme de potasio al espacio extracelular y puede provocar <b>hiperpotasemia grave con parada cardíaca</b>. La misma contraindicación se aplica a quemaduras extensas, lesión medular, inmovilización prolongada y otras situaciones de denervación funcional; se usa un bloqueante no despolarizante como el rocuronio.' }
    ],
    cierre: 'El Guillain-Barré conecta las tres ideas del tema: la mielina como determinante de la conducción, el fallo de bomba que no avisa por gasometría, y la biología del receptor nicotínico como razón de una contraindicación concreta.'
  },

  tarjetas: [
    { f: '¿Qué genera el potencial de reposo?', d: 'La PERMEABILIDAD selectiva al K⁺ sobre el gradiente que mantiene la bomba Na⁺/K⁺-ATPasa. La bomba aporta directamente solo unos −4 mV: fabrica el gradiente, no el voltaje.' },
    { f: 'Regla que unifica reposo y potencial de acción', d: 'El potencial de membrana tiende al EQUILIBRIO DEL ION MÁS PERMEABLE en ese instante. Reposo: K⁺ (−90 mV). Fase 0: Na⁺ (+60 mV).' },
    { f: '¿Cómo se codifica la intensidad del estímulo?', d: 'Por FRECUENCIA de disparo y número de fibras reclutadas, no por amplitud: el potencial de acción es todo o nada y siempre de la misma amplitud.' },
    { f: 'Las dos compuertas del canal de Na⁺ y los refractarios', d: 'Activación (se abre rápido) e inactivación (se cierra después, se recupera al repolarizar). Generan el refractario absoluto y relativo, que limitan la frecuencia máxima y aseguran la propagación UNIDIRECCIONAL.' },
    { f: 'Conducción saltatoria: dos ventajas', d: 'El PA se regenera solo en los nodos de Ranvier. Aporta mayor VELOCIDAD y AHORRO ENERGÉTICO (solo hay que rebombear iones en los nodos). Aα hasta 120 m/s; fibras C 0,5–2 m/s.' },
    { f: '¿Por qué el anestésico local falla en tejido infectado?', d: 'Son bases débiles: necesitan la forma NO ionizada para atravesar la membrana y la ionizada para bloquear el canal desde dentro. El pH ácido aumenta la fracción ionizada, que no puede entrar. Solución: bloquear proximal en tejido sano.' },
    { f: 'Bloqueo diferencial de los anestésicos locales', d: 'Primero dolor y temperatura (fibras finas y poco mielinizadas, con bloqueo dependiente del uso), después tacto y presión, por último las motoras Aα gruesas. Permite analgesia conservando la fuerza.' },
    { f: '¿Por qué la hipocalcemia produce tetania?', d: 'El Ca²⁺ extracelular estabiliza la membrana desplazando el potencial UMBRAL. Su déficit acerca el umbral al reposo → hiperexcitabilidad: parestesias, espasmo carpopedal, Chvostek y Trousseau.' },
    { f: 'Succinilcolina: cuándo está contraindicada y por qué', d: 'En denervación (Guillain-Barré, lesión medular, quemaduras extensas, inmovilización prolongada): proliferan receptores nicotínicos extrasinápticos y su despolarización masiva libera K⁺ → hiperpotasemia y parada. Usar rocuronio.' }
  ]
},

/* ---------------------------------------------------------- */
{
  id: 'sinapsis',
  modulo: 'neurofisio',
  nombre: 'Transmisión sináptica y unión neuromuscular',
  alto: false,
  minutos: 18,
  requisitos: ['potencial-membrana'],
  ideaCentral: 'La sinapsis convierte una señal eléctrica en química y de nuevo en eléctrica, y esa conversión es lo que permite integrar, amplificar y modular la información en lugar de limitarse a transmitirla. La unión neuromuscular es el modelo más estudiado y el más rentable clínicamente, porque casi toda la farmacología del bloqueo neuromuscular y varias enfermedades autoinmunes se explican en ella.',

  anclaje: {
    q: 'Sin mirar: ¿por qué la miastenia gravis empeora con el ejercicio repetido y el síndrome de Lambert-Eaton mejora? Piensa dónde está el defecto en cada una.',
    pista: 'Una es un problema del receptor y la otra de la liberación del neurotransmisor.'
  },

  bloques: [
    {
      nivel: 'imprescindible',
      titulo: 'La secuencia de la transmisión',
      html: '<ol><li>El potencial de acción llega al terminal presináptico.</li>' +
        '<li>Se abren canales de <b>calcio dependientes de voltaje</b> tipo P/Q: entra Ca²⁺.</li>' +
        '<li>El calcio dispara la fusión de las vesículas con la membrana (proteínas SNARE y sinaptotagmina como sensor de calcio) y se libera el neurotransmisor.</li>' +
        '<li>El neurotransmisor difunde y se une a receptores postsinápticos.</li>' +
        '<li>Se genera un potencial postsináptico <b>excitatorio</b> (entrada de Na⁺/Ca²⁺, despolariza) o <b>inhibitorio</b> (entrada de Cl⁻ o salida de K⁺, hiperpolariza).</li>' +
        '<li>La señal termina por recaptación, degradación enzimática o difusión.</li></ol>' +
        '<p>El <b>calcio es el eslabón crítico</b>: sin entrada de calcio no hay liberación. Por eso la hipocalcemia, los canalopatías de canales P/Q, el síndrome de Lambert-Eaton (anticuerpos contra esos canales) y la toxina botulínica (que escinde proteínas SNARE) producen todos debilidad, aunque actúen en puntos distintos de la misma cadena.</p>',
      cadena: ['Potencial de acción', 'Entrada de Ca²⁺', 'Fusión vesicular (SNARE)', 'Neurotransmisor', 'Receptor postsináptico', 'Potencial postsináptico']
    },
    {
      nivel: 'imprescindible',
      titulo: 'Unión neuromuscular y bloqueantes',
      html: '<p>La acetilcolina liberada activa <b>receptores nicotínicos</b> de la placa motora, canales iónicos que al abrirse dejan entrar sodio y generan el potencial de placa. En condiciones normales existe un amplio <b>margen de seguridad</b>: se libera mucha más acetilcolina de la necesaria y hay muchos más receptores de los imprescindibles. Ese margen explica que los síntomas de la miastenia solo aparezcan cuando se ha perdido una proporción grande de receptores.</p>' +
        '<table><tr><th>Fármaco</th><th>Mecanismo</th><th>Particularidad</th></tr>' +
        '<tr><td><b>Succinilcolina</b></td><td>Agonista que despolariza de forma persistente</td><td>Produce <b>fasciculaciones</b> iniciales; libera potasio; inicio y duración muy cortos</td></tr>' +
        '<tr><td><b>Rocuronio, cisatracurio</b></td><td>Antagonistas competitivos</td><td>Sin fasciculaciones; revertibles con neostigmina o, el rocuronio, con sugammadex</td></tr>' +
        '<tr><td><b>Neostigmina</b></td><td>Inhibe la acetilcolinesterasa</td><td>Aumenta la acetilcolina disponible: revierte el bloqueo competitivo</td></tr></table>' +
        '<p>🔥 Detalle de razonamiento: la neostigmina revierte el bloqueo <b>competitivo</b> porque aumenta la concentración de acetilcolina que compite por el receptor, pero <b>empeora</b> el bloqueo despolarizante, porque añade más agonista a una placa ya despolarizada. Confundirlos tiene consecuencias inmediatas.</p>'
    },
    {
      nivel: 'importante',
      titulo: 'Miastenia gravis y Lambert-Eaton: el contraste que lo explica todo',
      html: '<table><tr><th></th><th>Miastenia gravis</th><th>Lambert-Eaton</th></tr>' +
        '<tr><td>Defecto</td><td><b>Postsináptico</b>: anticuerpos contra el receptor de acetilcolina (o MuSK)</td><td><b>Presináptico</b>: anticuerpos contra canales de Ca²⁺ P/Q</td></tr>' +
        '<tr><td>Con el ejercicio</td><td><b>Empeora</b> (fatigabilidad)</td><td><b>Mejora</b> transitoriamente</td></tr>' +
        '<tr><td>Distribución</td><td>Ocular y bulbar precoz (ptosis, diplopía)</td><td>Proximal de extremidades, con disautonomía</td></tr>' +
        '<tr><td>Reflejos</td><td>Conservados</td><td>Disminuidos, y se <b>facilitan</b> tras ejercicio</td></tr>' +
        '<tr><td>Asociación</td><td>Timoma</td><td>Carcinoma microcítico de pulmón</td></tr></table>' +
        '<p>La lógica del contraste: en la miastenia hay <b>menos receptores</b>, y como en cada estímulo repetido la liberación de acetilcolina disminuye fisiológicamente, el margen de seguridad se agota y aparece fatiga. En Lambert-Eaton hay <b>menos liberación</b>, y la estimulación repetida acumula calcio en el terminal, aumentando progresivamente la liberación: por eso mejora. Es el mismo fenómeno que se observa en la electromiografía con estimulación repetitiva, con respuesta decremental en una e incremental en la otra.</p>'
    },
    {
      nivel: 'complementario',
      titulo: 'Integración y plasticidad',
      html: '<p>La neurona no es un relé sino un <b>integrador</b>: suma potenciales postsinápticos en el espacio (<b>sumación espacial</b>, varias sinapsis simultáneas) y en el tiempo (<b>sumación temporal</b>, estímulos sucesivos antes de que decaiga el anterior), y dispara solo si el resultado alcanza el umbral en el cono axónico, donde la densidad de canales de sodio es máxima.</p>' +
        '<p>La <b>potenciación a largo plazo</b> es el sustrato celular de la memoria: la estimulación repetida de alta frecuencia refuerza la sinapsis mediante receptores NMDA, que actúan como detectores de coincidencia porque requieren simultáneamente glutamato y despolarización que expulse el magnesio que bloquea el canal. El resultado es entrada de calcio, inserción de más receptores AMPA y una sinapsis más eficaz.</p>' +
        '<p>Esto conecta directamente con el método de estudio de esta aplicación: <b>la recuperación activa y la repetición espaciada funcionan porque refuerzan sinapsis mediante activación repetida y espaciada en el tiempo</b>, mientras que la relectura pasiva no genera el mismo patrón de activación.</p>'
    }
  ],

  variables: [
    { n: 'Calcio presináptico', d: 'up', nota: 'eslabón crítico: sin él no hay liberación' },
    { n: 'Receptores postsinápticos', d: 'down', nota: 'su pérdida agota el margen de seguridad' },
    { n: 'Acetilcolina disponible', d: 'up', nota: 'diana de los inhibidores de la colinesterasa' },
    { n: 'Margen de seguridad de la placa', d: 'down', nota: 'explica por qué los síntomas aparecen tarde' }
  ],

  fisiopatologia: '<p>El <b>botulismo</b> bloquea la liberación escindiendo proteínas SNARE: produce parálisis flácida descendente con afectación bulbar precoz y pupilas midriáticas. Los <b>organofosforados</b> hacen lo contrario, inhibiendo irreversiblemente la acetilcolinesterasa: acumulan acetilcolina y producen un síndrome colinérgico con miosis, salivación, broncorrea, bradicardia, fasciculaciones y debilidad, tratado con atropina y pralidoxima.</p>' +
    '<p>La <b>crisis miasténica</b> y la <b>crisis colinérgica</b> pueden parecerse —ambas cursan con debilidad grave— y se distinguen por los signos muscarínicos: la colinérgica añade miosis, salivación, sudoración, broncorrea y bradicardia por exceso de acetilcolina, mientras que la miasténica no.</p>',

  clinica: '<p>Para la UCI, dos aplicaciones directas. Primera: en pacientes con miastenia hay que evitar fármacos que empeoran la transmisión —aminoglucósidos, macrólidos, quinolonas, magnesio, betabloqueantes— y usar bloqueantes neuromusculares con extrema cautela, porque su sensibilidad está muy aumentada.</p>' +
    '<p>Segunda: la monitorización del bloqueo neuromuscular con <b>tren de cuatro</b> permite dosificar y confirmar la reversión antes de extubar. Un bloqueo residual es causa frecuente y evitable de complicaciones respiratorias postoperatorias.</p>',

  error: {
    confunde: 'Tratar cualquier debilidad neuromuscular con inhibidores de la acetilcolinesterasa.',
    parecido: 'Aumentar la acetilcolina disponible parece una solución universal si el problema es «poca transmisión».',
    diferencia: 'Solo funciona si el defecto es <b>competitivo o postsináptico con receptores disponibles</b>. En un bloqueo <b>despolarizante</b> por succinilcolina, añadir acetilcolina empeora el cuadro porque la placa ya está persistentemente despolarizada. Y en una <b>crisis colinérgica</b> por exceso de anticolinesterásicos u organofosforados, administrar más es directamente peligroso.',
    ejemplo: 'Paciente miasténico con debilidad progresiva, miosis, salivación abundante y bradicardia: no le falta acetilcolina, le sobra. Aumentar la dosis de piridostigmina agravaría la crisis colinérgica.',
    regla: 'Antes de aumentar la acetilcolina, pregunta si el problema es que falta o que sobra. Los signos muscarínicos —miosis, salivación, broncorrea, bradicardia— responden a esa pregunta.'
  },

  perla: '🔥 Miastenia (postsináptica) <b>empeora</b> con el ejercicio; Lambert-Eaton (presináptica) <b>mejora</b>, porque la estimulación repetida acumula calcio en el terminal. Ese solo contraste permite deducir la localización del defecto, el patrón electromiográfico y la asociación tumoral de cada una.',

  feynman: {
    consigna: 'Explica por qué la neostigmina revierte el bloqueo del rocuronio pero empeoraría el de la succinilcolina.',
    puntos: [
      'Describo el mecanismo competitivo del rocuronio',
      'Explico cómo el aumento de acetilcolina desplaza al antagonista',
      'Describo el mecanismo despolarizante de la succinilcolina',
      'Explico por qué añadir agonista agrava una placa ya despolarizada',
      'Menciono el sugammadex como alternativa de mecanismo distinto'
    ],
    referencia: '<p>El <b>rocuronio</b> es un bloqueante <b>no despolarizante</b>: se une al receptor nicotínico de la placa motora sin activarlo, e impide que la acetilcolina lo haga. Es un antagonismo <b>competitivo</b>, es decir, depende de las concentraciones relativas de ambas moléculas en la hendidura sináptica.</p>' +
      '<p>La <b>neostigmina</b> inhibe la acetilcolinesterasa, la enzima que degrada la acetilcolina en la hendidura. Al bloquearla, la acetilcolina se acumula y su concentración aumenta varias veces. En una competencia por el mismo receptor, elevar la concentración de uno de los competidores desplaza al otro: la acetilcolina recupera receptores, se genera de nuevo potencial de placa y el bloqueo revierte. Es farmacología competitiva pura, y por eso funciona mejor cuando el bloqueo ya está parcialmente recuperado y tiene un techo: si el bloqueo es muy profundo, no hay suficiente receptor libre y la reversión resulta incompleta.</p>' +
      '<p>La <b>succinilcolina</b> es lo contrario: un <b>agonista</b>. Se une al receptor y lo activa, pero a diferencia de la acetilcolina no es degradada por la acetilcolinesterasa de la hendidura, de modo que permanece unida y mantiene el receptor abierto. La placa se despolariza de forma <b>persistente</b>, y una membrana que permanece despolarizada mantiene inactivados los canales de sodio del músculo circundante: no puede generar nuevos potenciales de acción. Esto explica la secuencia clínica característica, con fasciculaciones iniciales —la despolarización sí produce contracción la primera vez— seguidas de parálisis flácida.</p>' +
      '<p>En ese contexto, administrar neostigmina <b>añade más agonista</b> a una placa que ya está saturada y despolarizada: prolonga y profundiza el bloqueo en lugar de revertirlo. La succinilcolina no se revierte farmacológicamente; se espera a que la <b>butirilcolinesterasa plasmática</b> la metabolice, lo que ocurre en pocos minutos, salvo en pacientes con déficit congénito de esa enzima, en quienes el bloqueo puede prolongarse durante horas y requiere ventilación hasta su resolución.</p>' +
      '<p>El <b>sugammadex</b> resuelve el problema por una vía completamente distinta: es una ciclodextrina que <b>encapsula</b> la molécula de rocuronio en el plasma, formando un complejo inactivo que se elimina por orina. Al retirar el fármaco de la circulación, se invierte el gradiente y el rocuronio abandona el receptor. Como no actúa sobre la acetilcolinesterasa, revierte incluso bloqueos profundos en minutos y no produce los efectos muscarínicos de la neostigmina —bradicardia, salivación, broncoespasmo— que obligan a asociarle atropina o glicopirrolato.</p>'
  },

  preguntas: [
    { nivel: 1, q: '¿Qué papel tiene el calcio en la transmisión sináptica?', r: 'Su entrada por canales dependientes de voltaje en el terminal presináptico dispara la fusión de las vesículas con la membrana y la liberación del neurotransmisor. Sin entrada de calcio no hay liberación.' },
    { nivel: 1, q: 'Diferencia un potencial postsináptico excitatorio de uno inhibitorio.', r: 'El excitatorio despolariza por entrada de Na⁺ o Ca²⁺; el inhibitorio hiperpolariza por entrada de Cl⁻ o salida de K⁺, alejando la membrana del umbral.' },
    { nivel: 1, q: '¿Qué es el margen de seguridad de la unión neuromuscular?', r: 'Que se libera mucha más acetilcolina de la necesaria y existen muchos más receptores de los imprescindibles. Por eso los síntomas de la miastenia aparecen solo cuando se ha perdido una proporción grande de receptores.' },
    { nivel: 2, q: 'Explica por qué la miastenia empeora con el ejercicio y el Lambert-Eaton mejora.', r: 'En la miastenia el defecto es postsináptico (menos receptores); como la liberación de acetilcolina disminuye fisiológicamente con los estímulos repetidos, se agota el margen de seguridad y aparece fatiga. En Lambert-Eaton el defecto es presináptico (menos liberación por anticuerpos contra canales de calcio P/Q); la estimulación repetida acumula calcio en el terminal y aumenta progresivamente la liberación, por lo que la fuerza mejora.' },
    { nivel: 2, q: '¿Cómo distingues una crisis miasténica de una crisis colinérgica?', r: 'Por los signos muscarínicos. La colinérgica, por exceso de acetilcolina, añade miosis, salivación, sudoración, broncorrea, bradicardia y fasciculaciones; la miasténica no. Ambas cursan con debilidad grave y ambas pueden requerir soporte ventilatorio.' },
    { nivel: 2, q: '¿Cuál es el mecanismo del botulismo y qué patrón clínico produce?', r: 'La toxina escinde proteínas SNARE e impide la fusión vesicular y por tanto la liberación de acetilcolina. Produce parálisis flácida descendente con afectación bulbar precoz, midriasis y afectación autonómica.' },
    { nivel: 3, q: 'Un paciente con miastenia gravis ingresa por neumonía y empeora tras iniciar un aminoglucósido. ¿Por qué?', r: 'Los aminoglucósidos interfieren en la transmisión neuromuscular por dos vías: reducen la entrada de calcio en el terminal presináptico y disminuyen la sensibilidad postsináptica. En una placa que ya opera sin margen de seguridad, esa interferencia adicional puede precipitar una crisis miasténica con fallo ventilatorio. Deben evitarse también macrólidos, quinolonas, magnesio parenteral y betabloqueantes, y utilizar alternativas seguras.' },
    { nivel: 3, q: 'Tras una cirugía, un paciente no recupera fuerza pese a haber recibido neostigmina. Había recibido succinilcolina en la inducción. ¿Qué consideras?', r: 'Dos posibilidades principales. La primera, un <b>déficit de butirilcolinesterasa plasmática</b>, congénito o adquirido, que impide metabolizar la succinilcolina y prolonga el bloqueo durante horas; el manejo es mantener ventilación y sedación hasta su resolución. La segunda, un <b>bloqueo de fase II</b>, en el que tras exposición prolongada o dosis repetidas la placa adquiere características de bloqueo competitivo. La neostigmina no revierte el bloqueo despolarizante puro y puede incluso prolongarlo, por lo que la conducta es monitorizar con tren de cuatro y esperar, no insistir con más anticolinesterásico.' }
  ],

  caso: {
    vineta: 'Mujer de 29 años con visión doble y párpados caídos que empeoran al final del día. Refiere que al masticar se le cansa la mandíbula. Fuerza proximal conservada en reposo pero disminuye al repetir movimientos. Reflejos normales.',
    pasos: [
      { q: '¿Qué característica del cuadro orienta el diagnóstico?', pista: 'No es la debilidad, es su comportamiento.', r: 'La <b>fatigabilidad</b>: la debilidad aparece o empeora con el uso repetido y mejora con el reposo, con empeoramiento vespertino. Junto a la afectación ocular y bulbar precoz con reflejos conservados, orienta a miastenia gravis.' },
      { q: 'Explica la fatigabilidad desde el margen de seguridad.', pista: 'Liberación decreciente frente a receptores reducidos.', r: 'En condiciones normales, la liberación de acetilcolina disminuye ligeramente con estímulos repetidos, pero el exceso de receptores y de neurotransmisor mantiene la transmisión. Al reducirse el número de receptores por los anticuerpos, ese margen desaparece: los primeros estímulos aún alcanzan el umbral, pero los sucesivos ya no, y la fuerza decae.' },
      { q: '¿Qué esperarías en un estudio de estimulación repetitiva?', pista: 'Compara con Lambert-Eaton.', r: 'Respuesta <b>decremental</b> con estimulación repetitiva a baja frecuencia, es decir, amplitudes que disminuyen progresivamente. En Lambert-Eaton ocurriría lo contrario: una respuesta <b>incremental</b> tras ejercicio o con estimulación de alta frecuencia, por acumulación de calcio presináptico.' },
      { q: '¿Qué prueba de imagen es obligada y por qué?', pista: 'Asociación tumoral.', r: 'Tomografía de tórax para descartar <b>timoma</b>, presente en un 10–15 % de los pacientes, y con hiperplasia tímica en una proporción mayor. Su presencia cambia el tratamiento, ya que la timectomía puede mejorar el curso de la enfermedad.' },
      { q: '¿Qué fármacos hay que evitar en ella de por vida?', pista: 'Los que interfieren en la placa.', r: 'Aminoglucósidos, macrólidos, quinolonas, magnesio parenteral, betabloqueantes, algunos antiarrítmicos y bloqueantes neuromusculares sin monitorización. Todos reducen aún más un margen de seguridad ya agotado y pueden precipitar una crisis. Conviene que la paciente lleve esa información consigo.' },
      { q: 'Si acudiera con debilidad grave y dificultad para tragar, ¿qué dos entidades debes distinguir y cómo?', pista: 'Falta o sobra acetilcolina.', r: 'Crisis miasténica frente a crisis colinérgica. Se distinguen por los signos muscarínicos: la colinérgica, por exceso de anticolinesterásicos, añade miosis, salivación, sudoración, broncorrea, dolor abdominal y bradicardia. Ambas pueden requerir intubación, y en ambas lo prioritario es vigilar la capacidad vital, no la gasometría.' }
    ],
    cierre: 'La unión neuromuscular es un sistema con margen de seguridad, y casi toda su patología consiste en formas distintas de consumirlo: menos receptores, menos liberación, más degradación o fármacos que interfieren.'
  },

  tarjetas: [
    { f: 'Secuencia de la transmisión sináptica', d: 'PA → entrada de Ca²⁺ (canales dependientes de voltaje) → fusión vesicular (SNARE + sinaptotagmina) → neurotransmisor → receptor postsináptico → potencial excitatorio o inhibitorio. El Ca²⁺ es el eslabón crítico.' },
    { f: 'Miastenia vs Lambert-Eaton', d: 'MIASTENIA: postsináptica (anticuerpos anti-receptor de ACh), EMPEORA con el ejercicio, ocular/bulbar, reflejos normales, timoma. LAMBERT-EATON: presináptica (anti-canal Ca²⁺ P/Q), MEJORA con el ejercicio, proximal con disautonomía, reflejos disminuidos, microcítico de pulmón.' },
    { f: 'Margen de seguridad de la placa motora', d: 'Se libera mucha más ACh de la necesaria y sobran receptores. Por eso los síntomas de la miastenia solo aparecen tras perder una proporción grande de receptores, y por eso cualquier fármaco que interfiera puede descompensarla.' },
    { f: '¿Por qué la neostigmina revierte el rocuronio pero no la succinilcolina?', d: 'El rocuronio es COMPETITIVO: más ACh lo desplaza del receptor. La succinilcolina es AGONISTA y mantiene la placa despolarizada: añadir ACh la agrava. La succinilcolina no se revierte, se espera a la butirilcolinesterasa.' },
    { f: 'Sugammadex: mecanismo', d: 'Ciclodextrina que ENCAPSULA el rocuronio en plasma formando un complejo inactivo eliminado por orina. Revierte bloqueos profundos en minutos sin efectos muscarínicos (a diferencia de la neostigmina, que requiere atropina).' },
    { f: 'Crisis miasténica vs colinérgica', d: 'Ambas cursan con debilidad grave. La COLINÉRGICA añade signos muscarínicos: miosis, salivación, sudoración, broncorrea, bradicardia, fasciculaciones. Vigilar capacidad vital, no gasometría.' },
    { f: 'Botulismo vs organofosforados', d: 'BOTULISMO: escinde proteínas SNARE → NO hay liberación de ACh → parálisis flácida descendente, midriasis. ORGANOFOSFORADOS: inhiben la acetilcolinesterasa → EXCESO de ACh → síndrome colinérgico. Tratamiento: atropina y pralidoxima.' },
    { f: 'Potenciación a largo plazo y por qué importa al estudiar', d: 'La estimulación repetida refuerza la sinapsis vía receptores NMDA (detectores de coincidencia: requieren glutamato + despolarización que expulse el Mg²⁺) → entrada de Ca²⁺ → más receptores AMPA. Es la base celular de por qué funciona la recuperación activa espaciada y no la relectura.' }
  ]
},

/* ---------------------------------------------------------- */
{
  id: 'perfusion-cerebral',
  modulo: 'neuro-critico',
  nombre: 'Presión intracraneal, perfusión cerebral y conciencia',
  alto: true,
  minutos: 22,
  requisitos: ['presion-arterial'],
  ideaCentral: 'El cráneo es una caja rígida de volumen fijo, de modo que cualquier cosa que crezca dentro obliga a que otra cosa salga, y cuando esos mecanismos se agotan la presión sube de forma exponencial. La presión de perfusión cerebral es la diferencia entre la presión arterial media y la intracraneal, y esa resta gobierna todo el manejo del paciente neurocrítico.',

  anclaje: {
    q: 'Sin mirar: escribe la fórmula de la presión de perfusión cerebral y explica por qué bajar agresivamente la presión arterial en un paciente con hipertensión intracraneal puede ser mortal.',
    pista: 'Es una resta, y estarías bajando el minuendo mientras el sustraendo sigue alto.'
  },

  bloques: [
    {
      nivel: 'imprescindible',
      titulo: 'Doctrina de Monro-Kellie y curva de complianza',
      html: '<p>El cráneo del adulto es una caja rígida que contiene tres componentes: <b>parénquima</b> (~80 %), <b>sangre</b> (~10 %) y <b>líquido cefalorraquídeo</b> (~10 %). La suma de sus volúmenes es constante, de modo que si uno aumenta, otro debe disminuir o la presión sube.</p>' +
        '<p>Los mecanismos de compensación, por orden: primero se desplaza <b>líquido cefalorraquídeo</b> hacia el espacio subaracnoideo espinal y aumenta su reabsorción; después se reduce el <b>volumen sanguíneo</b> venoso. Son limitados, y de ahí la forma de la curva presión-volumen intracraneal: al principio es <b>plana</b> —se puede añadir volumen con poco aumento de presión— y luego se hace <b>exponencial</b>.</p>' +
        '<p>🔥 Consecuencia clínica decisiva: un paciente puede tener una lesión ocupante considerable con presión intracraneal casi normal y descompensarse <b>bruscamente</b> al agotarse la compensación. El deterioro neurológico en la hipertensión intracraneal no es lineal ni gradual: es un acantilado.</p>',
      cadena: ['↑ Volumen intracraneal', 'Desplazamiento de LCR', '↓ Volumen sanguíneo venoso', 'Compensación agotada', '↑↑ Presión intracraneal']
    },
    {
      nivel: 'imprescindible',
      titulo: 'La ecuación que gobierna el manejo',
      html: '<p style="text-align:center"><code>PPC = PAM − PIC</code></p>' +
        '<p>Valores de referencia: presión intracraneal normal 5–15 mmHg; se considera hipertensión por encima de 20–22 mmHg. El objetivo habitual de presión de perfusión cerebral se sitúa en torno a 60–70 mmHg.</p>' +
        '<p>La resta tiene dos implicaciones opuestas y ambas importan:</p>' +
        '<ul><li>Si sube la presión intracraneal y la presión arterial no acompaña, <b>cae la perfusión</b> y aparece isquemia.</li>' +
        '<li>Si se baja agresivamente la presión arterial en un paciente con presión intracraneal elevada, se <b>estrangula la perfusión</b> aunque las cifras del monitor parezcan «mejores».</li></ul>' +
        '<p>Esto explica el <b>reflejo de Cushing</b>: cuando la presión intracraneal amenaza la perfusión, el tronco encefálico isquémico dispara una descarga simpática masiva que eleva la presión arterial para recuperar el gradiente. La hipertensión es un mecanismo de rescate, y la bradicardia que la acompaña es secundaria, mediada por el barorreflejo. Bajar esa presión sin tratar la causa elimina el rescate.</p>'
    },
    {
      nivel: 'importante',
      titulo: 'Autorregulación cerebral y reactividad al CO₂',
      html: '<p>El flujo sanguíneo cerebral se mantiene constante (~50 mL/100 g/min) entre aproximadamente 60 y 150 mmHg de presión arterial media. Fuera de ese rango, el flujo pasa a depender linealmente de la presión. En el hipertenso crónico la curva está desplazada a la derecha, y en el paciente con daño cerebral agudo la autorregulación puede estar <b>abolida</b>, de modo que el cerebro queda a merced de la presión sistémica.</p>' +
        '<p>El determinante más potente y rápido del calibre vascular cerebral es la <b>PaCO₂</b>: el flujo cambia aproximadamente un 3 % por cada mmHg. De ahí dos aplicaciones opuestas:</p>' +
        '<ul><li>La <b>hiperventilación</b> reduce la PaCO₂, produce vasoconstricción, reduce el volumen sanguíneo cerebral y baja la presión intracraneal en minutos. Es una medida de <b>rescate temporal</b> ante herniación inminente.</li>' +
        '<li>Pero mantenida produce <b>isquemia</b> por vasoconstricción excesiva, y su efecto se pierde en horas al normalizarse el pH del líquido cefalorraquídeo. Por eso la hiperventilación profiláctica está proscrita.</li></ul>' +
        '<p>La <b>hipoxemia</b> (PaO₂ < 50–60 mmHg) produce vasodilatación intensa, y por eso evitar la hipoxemia es prioritario en el traumatismo craneal: un solo episodio de hipoxemia o de hipotensión empeora significativamente el pronóstico.</p>'
    },
    {
      nivel: 'complementario',
      titulo: 'Conciencia, herniación y exploración',
      html: '<p>La conciencia requiere dos componentes: el <b>contenido</b> (corteza de ambos hemisferios) y el <b>nivel de alerta</b> (sistema reticular activador ascendente del tronco). Por tanto, un coma exige <b>lesión bilateral difusa de los hemisferios</b>, <b>lesión del tronco</b> o una <b>causa tóxico-metabólica</b> que afecte globalmente. Una lesión hemisférica unilateral no produce coma salvo que comprima el tronco o produzca desplazamiento.</p>' +
        '<p>Esa lógica ordena la exploración del paciente en coma: los <b>reflejos de tronco</b> —pupilar, corneal, oculocefálico, oculovestibular, tusígeno— localizan la lesión, y su preservación con coma profundo orienta a causa metabólica.</p>' +
        '<p>Síndromes de herniación: la <b>uncal</b> comprime el III par y produce midriasis ipsilateral con hemiparesia contralateral; la <b>central</b> produce deterioro rostrocaudal progresivo; la <b>amigdalina</b> comprime el bulbo y produce parada respiratoria. Una <b>pupila midriática arreactiva</b> en un paciente con traumatismo craneal es una urgencia inmediata.</p>' +
        '<p>Cuidado con dos imitadores del coma: el <b>síndrome de cautiverio</b> (lesión pontina ventral, paciente consciente que solo mueve los ojos verticalmente) y el <b>estado vegetativo</b>. Explorar la mirada vertical y el parpadeo a la orden evita un error devastador.</p>'
    }
  ],

  variables: [
    { n: 'Presión intracraneal', d: 'up', nota: 'normal 5–15; se trata por encima de 20–22' },
    { n: 'Presión de perfusión cerebral', d: 'down', nota: 'PAM − PIC; objetivo 60–70 mmHg' },
    { n: 'PaCO₂', d: 'down', nota: 'determinante más potente del calibre vascular cerebral' },
    { n: 'Complianza intracraneal', d: 'down', nota: 'cuando se agota, la presión sube exponencialmente' }
  ],

  fisiopatologia: '<p>El daño cerebral se divide en <b>primario</b> —el producido en el momento del impacto o del evento, no modificable— y <b>secundario</b>, que ocurre en las horas y días siguientes y sí es prevenible. Todo el cuidado neurocrítico consiste en evitar el daño secundario, cuyos motores son la <b>hipotensión</b>, la <b>hipoxemia</b>, la hipertensión intracraneal, la hipertermia, las alteraciones de la glucemia, las convulsiones y las alteraciones del sodio.</p>' +
    '<p>Esa es la razón de que los objetivos parezcan sencillos y sean tan exigentes: mantener la presión, la oxigenación, la normocapnia, la normotermia y la normoglucemia. En neurocrítico, la normalidad es el tratamiento.</p>',

  clinica: '<p>Medidas escalonadas ante hipertensión intracraneal: cabecero a 30° con cabeza en posición neutra (facilita el drenaje venoso yugular sin comprometer la perfusión), sedación y analgesia adecuadas, normotermia, control de convulsiones, terapia osmótica con suero salino hipertónico o manitol, drenaje de líquido cefalorraquídeo si hay catéter ventricular, y como medidas de segundo nivel hiperventilación transitoria, coma barbitúrico, hipotermia o craniectomía descompresiva.</p>' +
    '<p>Un detalle que Diego verá a diario: en el paciente neurocrítico se evitan los sueros <b>hipotónicos</b> —incluido el glucosado— porque el agua libre atraviesa a favor de osmolaridad y agrava el edema cerebral. La hiponatremia es especialmente peligrosa aquí, y se maneja con objetivos de sodio en el rango alto de la normalidad.</p>',

  error: {
    confunde: 'Tratar la hipertensión arterial de un paciente con hipertensión intracraneal como si fuera una emergencia hipertensiva cualquiera.',
    parecido: 'Las cifras pueden ser alarmantes —200/110— y en cualquier otro contexto exigirían reducción.',
    diferencia: 'Esa hipertensión suele ser un mecanismo de <b>rescate</b>: el reflejo de Cushing eleva la presión arterial precisamente para mantener la presión de perfusión cerebral frente a una presión intracraneal elevada. Como <code>PPC = PAM − PIC</code>, bajar la presión arterial sin haber bajado la intracraneal reduce directamente la perfusión y produce isquemia.',
    ejemplo: 'Paciente con hemorragia intracraneal, presión de 210/105, bradicardia y respiración irregular. Administrarle un antihipertensivo potente puede precipitar isquemia global. Lo que necesita es tratamiento de la presión intracraneal y, si procede, cirugía; el control de la presión arterial se hace de forma cuidadosa y con objetivos individualizados.',
    regla: 'Ante hipertensión con bradicardia y alteración de la conciencia, piensa en Cushing antes que en crisis hipertensiva. Trata la presión intracraneal, no el manguito.'
  },

  perla: '🔥 <code>PPC = PAM − PIC</code>. Toda la neurocrítica cabe en esa resta: sube el minuendo o baja el sustraendo, pero nunca bajes el minuendo mientras el sustraendo esté alto. Y recuerda que la curva de complianza intracraneal es exponencial: la descompensación llega de golpe.',

  feynman: {
    consigna: 'Explica por qué la hiperventilación baja la presión intracraneal en minutos, por qué es solo una medida de rescate y por qué su uso profiláctico es dañino.',
    puntos: [
      'Explico la reactividad del vaso cerebral al CO₂',
      'Conecto vasoconstricción con reducción del volumen sanguíneo cerebral',
      'Aplico Monro-Kellie: menos volumen sanguíneo, menos presión',
      'Explico el riesgo de isquemia por vasoconstricción excesiva',
      'Explico la pérdida del efecto por normalización del pH del LCR'
    ],
    referencia: '<p>El calibre de las arteriolas cerebrales es extraordinariamente sensible a la <b>PaCO₂</b>: el flujo sanguíneo cerebral varía aproximadamente un 3 % por cada mmHg de cambio. El mecanismo no es el CO₂ en sí, sino el <b>pH perivascular</b>: el CO₂ difunde libremente al líquido extracelular cerebral y se hidrata a ácido carbónico, y son los protones resultantes los que relajan o contraen el músculo liso arteriolar.</p>' +
      '<p>Al hiperventilar desciende la PaCO₂, sube el pH perivascular y las arteriolas cerebrales se <b>contraen</b>. Eso reduce el volumen de sangre contenido en el compartimento intracraneal, y aquí entra la doctrina de Monro-Kellie: como el cráneo es una caja de volumen fijo, retirar volumen sanguíneo deja sitio y la presión intracraneal <b>desciende en minutos</b>. Es la intervención más rápida de que se dispone, y por eso tiene sentido ante una herniación inminente mientras se prepara una medida definitiva como la cirugía o la terapia osmótica.</p>' +
      '<p>El problema es que el mecanismo que baja la presión es exactamente el que puede producir el daño. La vasoconstricción reduce el volumen sanguíneo <b>reduciendo el flujo</b>, y en un cerebro lesionado —cuyo umbral isquémico está elevado y cuya autorregulación puede estar abolida— esa reducción puede llevar al tejido por debajo del umbral de isquemia. La hiperventilación agresiva, con PaCO₂ por debajo de 30 mmHg, ha demostrado empeorar el pronóstico, y por eso el objetivo habitual es la <b>normocapnia</b>, reservando la hiperventilación moderada y breve para situaciones de rescate con monitorización.</p>' +
      '<p>Hay además una razón por la que el efecto es necesariamente <b>transitorio</b>. En las horas siguientes, el plexo coroideo y el transporte de bicarbonato normalizan el pH del líquido cefalorraquídeo pese a la PaCO₂ baja: el estímulo desaparece, los vasos recuperan su calibre y la presión intracraneal vuelve a subir. Y si en ese momento se normaliza bruscamente la ventilación, la PaCO₂ asciende sobre un líquido cefalorraquídeo ya adaptado, el pH cae por debajo de lo normal y se produce <b>vasodilatación de rebote</b> con un ascenso de la presión intracraneal potencialmente peor que el inicial. Por eso la hiperventilación, si se ha usado, debe retirarse de forma gradual.</p>' +
      '<p>La conclusión práctica es que se trata de una herramienta de minutos, no de horas: útil para ganar tiempo ante una pupila que se dilata mientras el paciente va al quirófano, y perjudicial como estrategia de mantenimiento.</p>'
  },

  preguntas: [
    { nivel: 1, q: 'Enuncia la doctrina de Monro-Kellie y sus tres componentes.', r: 'El cráneo es una caja rígida cuyo volumen total es constante: parénquima (~80 %), sangre (~10 %) y líquido cefalorraquídeo (~10 %). Si un componente aumenta, otro debe disminuir o la presión sube.' },
    { nivel: 1, q: 'Escribe la fórmula de la presión de perfusión cerebral y sus objetivos.', r: 'PPC = PAM − PIC. Presión intracraneal normal 5–15 mmHg, se trata por encima de 20–22; objetivo de presión de perfusión en torno a 60–70 mmHg.' },
    { nivel: 1, q: '¿Qué requiere la conciencia y qué implica para el diagnóstico del coma?', r: 'Requiere contenido (corteza de ambos hemisferios) y nivel de alerta (sistema reticular activador del tronco). Por tanto el coma exige lesión bilateral difusa, lesión de tronco o causa tóxico-metabólica global; una lesión hemisférica unilateral no produce coma salvo compresión o desplazamiento.' },
    { nivel: 2, q: '¿Por qué la curva de complianza intracraneal hace que el deterioro sea brusco?', r: 'Porque es plana al principio, mientras los mecanismos de compensación —desplazamiento de líquido cefalorraquídeo y reducción del volumen venoso— absorben el volumen añadido, y se vuelve exponencial cuando se agotan. Por eso un paciente puede estar estable con una lesión considerable y descompensarse de golpe.' },
    { nivel: 2, q: 'Explica el reflejo de Cushing y por qué su interpretación cambia el tratamiento.', r: 'Ante una presión intracraneal que amenaza la perfusión, la isquemia del tronco dispara una descarga simpática masiva que eleva la presión arterial para recuperar el gradiente; la bradicardia es secundaria, mediada por el barorreflejo. Interpretarlo como crisis hipertensiva y bajar la presión elimina un mecanismo de rescate y produce isquemia.' },
    { nivel: 2, q: '¿Por qué se evitan los sueros hipotónicos en el paciente neurocrítico?', r: 'Porque el agua libre atraviesa a favor de gradiente osmótico hacia el tejido cerebral y agrava el edema. Incluso el suero glucosado, una vez metabolizada la glucosa, equivale a agua libre. Se prefieren soluciones isotónicas y se mantiene el sodio en el rango alto de la normalidad.' },
    { nivel: 3, q: 'Paciente con traumatismo craneal que desarrolla midriasis arreactiva derecha y hemiparesia izquierda. ¿Qué está ocurriendo y qué haces en los primeros minutos?', r: 'Herniación uncal: el lóbulo temporal desplazado comprime el III par craneal ipsilateral —produciendo midriasis arreactiva— y el pedúnculo cerebral, con hemiparesia contralateral. Es una emergencia inmediata. Las medidas de rescate incluyen elevar el cabecero con cabeza neutra, asegurar oxigenación y presión arterial, terapia osmótica con suero salino hipertónico o manitol, hiperventilación moderada y transitoria mientras se prepara la intervención, y tomografía urgente con valoración neuroquirúrgica.' },
    { nivel: 3, q: 'Un paciente en coma tiene reflejos de tronco íntegros, pupilas reactivas y movimientos oculares conservados. ¿Qué te sugiere y qué buscarías?', r: 'La preservación de los reflejos de tronco con coma profundo orienta a una causa <b>tóxico-metabólica</b> más que estructural, porque una lesión que produjera coma por afectación del tronco alteraría esos reflejos. Se buscarían hipoglucemia, alteraciones del sodio, insuficiencia hepática o renal, hipercapnia, hipotermia, endocrinopatías, intoxicaciones y sepsis. También hay que descartar estado epiléptico no convulsivo con electroencefalograma, que puede cursar con coma y exploración inespecífica.' }
  ],

  caso: {
    vineta: 'Varón de 24 años tras accidente de moto. Glasgow inicial 13, que desciende a 7 en dos horas. PA 178/94, FC 52, respiración irregular. Pupila derecha de 6 mm arreactiva. Tomografía: hematoma epidural temporal derecho con desplazamiento de la línea media.',
    pasos: [
      { q: 'Identifica el síndrome que explica presión alta, bradicardia y respiración irregular.', pista: 'Tríada.', r: 'Tríada de Cushing, signo de hipertensión intracraneal grave con herniación inminente. La isquemia del tronco dispara una descarga simpática que eleva la presión arterial para preservar la presión de perfusión; la bradicardia es secundaria, mediada por el barorreflejo ante esa hipertensión.' },
      { q: '¿Qué explica la midriasis derecha con este hematoma?', pista: 'Qué estructura se comprime primero.', r: 'Herniación uncal: el lóbulo temporal desplazado por el hematoma comprime el III par craneal derecho, cuyas fibras parasimpáticas pupiloconstrictoras discurren superficialmente y son las primeras en afectarse. De ahí la midriasis arreactiva ipsilateral al hematoma.' },
      { q: 'Un compañero propone bajar la presión de 178/94. ¿Qué respondes?', pista: 'La resta.', r: 'Que sería peligroso. Como PPC = PAM − PIC, esa presión arterial elevada es lo que está manteniendo la perfusión cerebral frente a una presión intracraneal muy alta. Bajarla sin haber reducido la presión intracraneal estrangularía la perfusión y produciría isquemia global. Lo prioritario es evacuar el hematoma y tratar la presión intracraneal.' },
      { q: 'Mientras se prepara el quirófano, ¿qué medidas aplicas?', pista: 'Rescate mientras llega lo definitivo.', r: 'Asegurar vía aérea con intubación evitando la hipotensión, cabecero a 30° con cabeza en posición neutra para facilitar el drenaje venoso yugular, sedación y analgesia adecuadas, normotermia, evitar rigurosamente hipoxemia e hipotensión, terapia osmótica con suero salino hipertónico o manitol, e hiperventilación moderada y transitoria como puente si hay signos de herniación.' },
      { q: '¿Por qué la hiperventilación no puede mantenerse?', pista: 'El mecanismo que ayuda es el que daña.', r: 'Porque baja la presión intracraneal reduciendo el volumen sanguíneo mediante <b>vasoconstricción</b>, y esa misma vasoconstricción puede producir isquemia en un cerebro lesionado. Además el efecto se pierde en horas, cuando el pH del líquido cefalorraquídeo se normaliza, y su retirada brusca provoca vasodilatación de rebote. Es una herramienta de minutos.' },
      { q: 'Tras la cirugía, ¿cuál es el objetivo global del manejo?', pista: 'Primario y secundario.', r: 'Evitar el <b>daño secundario</b>. El daño primario, producido en el impacto, ya no es modificable; lo que determina el pronóstico a partir de ahora es prevenir hipotensión, hipoxemia, hipertensión intracraneal, fiebre, convulsiones, hiperglucemia e hiponatremia. En neurocrítico, mantener la normalidad fisiológica <b>es</b> el tratamiento.' }
    ],
    cierre: 'El hematoma epidural es el ejemplo clásico de la curva de complianza: intervalo lúcido mientras la compensación aguanta, y deterioro brusco cuando se agota. Reconocerlo temprano es lo que cambia el desenlace.'
  },

  tarjetas: [
    { f: 'Doctrina de Monro-Kellie', d: 'El cráneo es una caja rígida: parénquima (80 %) + sangre (10 %) + LCR (10 %) = volumen constante. Si uno crece, otro debe salir o sube la presión. Compensación: primero desplazar LCR, después reducir volumen venoso.' },
    { f: 'Presión de perfusión cerebral', d: 'PPC = PAM − PIC. PIC normal 5–15 (tratar > 20–22); objetivo de PPC 60–70 mmHg. Nunca bajes la PAM mientras la PIC esté alta.' },
    { f: '¿Por qué el deterioro en la hipertensión intracraneal es brusco?', d: 'La curva de complianza es PLANA al principio (la compensación absorbe el volumen) y luego EXPONENCIAL. Un paciente puede estar estable con lesión grande y descompensarse de golpe (intervalo lúcido del hematoma epidural).' },
    { f: 'Reflejo/tríada de Cushing', d: 'Hipertensión + bradicardia + respiración irregular. La isquemia del tronco dispara descarga simpática para preservar la PPC; la bradicardia es SECUNDARIA (barorreflejo). Es rescate, no crisis hipertensiva: trata la PIC.' },
    { f: 'Reactividad cerebral al CO₂', d: 'El flujo cerebral cambia ~3 % por cada mmHg de PaCO₂ (vía pH perivascular). Hiperventilar → vasoconstricción → ↓volumen sanguíneo → ↓PIC en minutos. Solo RESCATE: mantenida causa isquemia, se agota en horas y su retirada brusca da rebote.' },
    { f: 'Autorregulación cerebral', d: 'Flujo constante (~50 mL/100 g/min) entre 60 y 150 mmHg de PAM. Desplazada a la derecha en el hipertenso crónico y a menudo ABOLIDA en el daño cerebral agudo, dejando al cerebro a merced de la presión sistémica.' },
    { f: 'Requisitos de la conciencia y qué implica en el coma', d: 'Contenido (corteza bilateral) + alerta (sistema reticular del tronco). El coma exige lesión bilateral difusa, lesión de tronco o causa tóxico-metabólica. Reflejos de tronco ÍNTEGROS con coma profundo → sospecha metabólica.' },
    { f: 'Herniación uncal', d: 'El lóbulo temporal comprime el III par (midriasis arreactiva IPSILATERAL, por las fibras parasimpáticas superficiales) y el pedúnculo (hemiparesia CONTRALATERAL). Urgencia inmediata.' },
    { f: 'Daño primario vs secundario', d: 'Primario: en el impacto, no modificable. SECUNDARIO: en horas-días, prevenible. Motores: hipotensión, hipoxemia, ↑PIC, fiebre, convulsiones, alteraciones de glucosa y sodio. Mantener la normalidad ES el tratamiento.' }
  ]
}

]);

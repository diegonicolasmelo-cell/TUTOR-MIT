/* ============================================================
   MÓDULO 1 — FUNDAMENTOS HEMODINÁMICOS
   Gasto cardíaco, precarga, poscarga, contractilidad,
   retorno venoso y fisiología del ejercicio.
   ============================================================ */

TUTOR.registrarTemas([

/* ---------------------------------------------------------- */
{
  id: 'gasto-cardiaco',
  modulo: 'hemodinamia',
  nombre: 'Gasto cardíaco y sus determinantes',
  alto: true,
  minutos: 25,
  requisitos: [],
  ideaCentral: 'El gasto cardíaco es el caudal que el corazón entrega por minuto y es la variable que el organismo defiende por encima de casi todo lo demás. Solo tiene dos factores directos —frecuencia y volumen sistólico— y el volumen sistólico solo tiene tres —precarga, poscarga y contractilidad. Cualquier alteración cardiovascular, por compleja que parezca, entra por una de esas cuatro puertas.',

  anclaje: {
    q: 'Sin mirar nada: escribe la ecuación del gasto cardíaco y desglosa el volumen sistólico en sus tres determinantes. Luego di cuál de ellos sube en una hemorragia aguda.',
    pista: 'Dos factores para el gasto, tres para el volumen sistólico. En la hemorragia, uno de los tres cae y otro sube por compensación.'
  },

  bloques: [
    {
      nivel: 'imprescindible',
      titulo: 'Fisiología normal',
      html: '<p>El gasto cardíaco (GC) es el volumen de sangre eyectado por el ventrículo izquierdo en un minuto:</p>' +
        '<p style="text-align:center"><code>GC = FC × VS</code></p>' +
        '<p>En un adulto en reposo: 70 lpm × 70 mL ≈ <b>5 L/min</b>. El <b>índice cardíaco</b> normaliza por superficie corporal (GC/SC ≈ 2,5–4,0 L/min/m²) y es lo que realmente se compara entre pacientes: 5 L/min en alguien de 110 kg no significa lo mismo que en alguien de 50 kg.</p>' +
        '<p>El volumen sistólico es una resta: <code>VS = VTD − VTS</code> (volumen telediastólico menos telesistólico). Esto importa porque explica que el VS pueda subir por dos vías distintas: <b>llenando más</b> (↑VTD) o <b>vaciando mejor</b> (↓VTS). La fracción de eyección, <code>FE = VS/VTD</code>, mide qué proporción del contenido se expulsa, no cuánta sangre sale.</p>',
      cadena: ['Retorno venoso', 'Precarga (VTD)', 'Volumen sistólico', 'Gasto cardíaco', 'Presión arterial']
    },
    {
      nivel: 'imprescindible',
      titulo: 'Mecanismo: el árbol de los cuatro determinantes',
      html: '<p>Todo cambio del gasto cardíaco tiene que pasar por aquí. Memorizar el árbol vale más que memorizar cien enfermedades:</p>',
      esquema: ['GASTO CARDÍACO', 'FC × VS', 'VS = precarga + contractilidad − poscarga', 'Presión arterial = GC × RVS', 'Perfusión tisular']
    },
    {
      nivel: 'imprescindible',
      titulo: 'La frecuencia cardíaca no es infinitamente útil',
      html: '<p>Subir la FC aumenta el GC… hasta cierto punto. La diástole es la fase que se acorta cuando el corazón se acelera, y la diástole es la que <b>llena el ventrículo</b> y <b>perfunde las coronarias</b>. Por eso:</p>' +
        '<ul><li>Por encima de ~150–170 lpm (menos en el corazón enfermo) el tiempo de llenado cae tanto que el VTD baja, el VS baja y el <b>GC deja de subir e incluso desciende</b>.</li>' +
        '<li>Simultáneamente cae la perfusión coronaria mientras sube la demanda de oxígeno: taquicardia extrema = isquemia potencial.</li></ul>' +
        '<p>🔥 Esta es la razón fisiológica de por qué una taquicardia supraventricular a 200 lpm puede producir hipotensión y angina en un corazón por lo demás sano.</p>'
    },
    {
      nivel: 'importante',
      titulo: 'Determinantes del consumo miocárdico de oxígeno (MVO₂)',
      html: '<p>El mismo árbol explica el consumo de O₂ del miocardio, que depende de:</p>' +
        '<ol><li><b>Frecuencia cardíaca</b> (número de contracciones por minuto).</li>' +
        '<li><b>Contractilidad</b> (velocidad de generación de fuerza).</li>' +
        '<li><b>Tensión parietal</b>, que por la ley de Laplace es <code>σ = (P × r) / (2h)</code>: sube con la presión (poscarga) y con el radio (precarga/dilatación), y baja con el grosor de pared.</li></ol>' +
        '<p>De aquí sale todo el tratamiento antianginoso: los betabloqueantes bajan FC y contractilidad; los nitratos bajan la precarga (↓radio); los vasodilatadores arteriales bajan la poscarga (↓presión).</p>'
    },
    {
      nivel: 'complementario',
      titulo: 'Cómo se mide en la práctica',
      html: '<p><b>Principio de Fick:</b> <code>GC = VO₂ / (CaO₂ − CvO₂)</code>. Si el consumo de O₂ es constante, una diferencia arteriovenosa de O₂ ampliada significa que los tejidos están extrayendo más porque llega menos flujo: <b>diferencia AV amplia = gasto bajo</b>. Es el fundamento de usar la saturación venosa central (SvcO₂) como sustituto del gasto en la UCI.</p>' +
        '<p><b>Termodilución</b> (catéter de arteria pulmonar), <b>ecocardiografía</b> (VS = ITV<sub>TSVI</sub> × área del tracto de salida) y análisis del contorno de pulso son las alternativas de cabecera.</p>'
    }
  ],

  variables: [
    { n: 'Frecuencia cardíaca', d: 'up', nota: 'sube el GC solo hasta el límite del llenado diastólico' },
    { n: 'Precarga', d: 'up', nota: '↑VTD → ↑VS por Frank-Starling' },
    { n: 'Contractilidad', d: 'up', nota: '↓VTS → ↑VS y ↑FE' },
    { n: 'Poscarga', d: 'down', nota: 'bajarla aumenta el VS, sobre todo en el ventrículo enfermo' }
  ],

  fisiopatologia: '<p>Cuando el GC cae, el organismo no tolera la pérdida de perfusión y activa en segundos el <b>barorreflejo</b> (↑simpático: taquicardia, ↑contractilidad, venoconstricción, vasoconstricción arteriolar) y en minutos-horas el <b>SRAA</b> y la <b>ADH</b> para retener volumen.</p>' +
    '<p>El resultado clínico paradójico: <b>la presión arterial puede seguir normal con un gasto cardíaco ya bajo</b>, porque la RVS ha subido para compensar. Por eso la presión arterial es un mal detector precoz de shock, y los signos de perfusión (relleno capilar, livideces, diuresis, lactato, estado mental) se alteran antes.</p>',

  clinica: '<p>Un paciente con GC bajo se reconoce por <b>signos de baja perfusión</b>, no por un número: extremidades frías y moteadas, relleno capilar > 3 s, oliguria, obnubilación, lactato elevado, presión de pulso estrecha (porque el VS es pequeño) y SvcO₂ baja (< 65 %) por extracción aumentada.</p>' +
    '<p>Al revés, en el shock distributivo (sepsis) el GC suele estar <b>alto</b> y las extremidades calientes, porque el problema es la RVS, no la bomba.</p>',

  error: {
    confunde: 'Fracción de eyección con gasto cardíaco.',
    parecido: 'Ambos miden "cuánto bombea el corazón" y ambos caen en la insuficiencia cardíaca avanzada.',
    diferencia: 'La FE es una <b>proporción</b> (VS/VTD); el GC es un <b>caudal</b> (L/min). Un ventrículo dilatado con VTD de 250 mL y FE del 30 % expulsa 75 mL: FE severamente baja con volumen sistólico normal. Y a la inversa, en la insuficiencia cardíaca con FE preservada la FE es del 60 % y el gasto es bajo porque el VTD es diminuto por un ventrículo rígido que no se llena.',
    ejemplo: 'Paciente con miocardiopatía dilatada, FE 25 %, asintomático en reposo: su GC está compensado por dilatación y taquicardia. Otro con hipertrofia severa, FE 65 %, en edema agudo de pulmón: FE normal, gasto insuficiente.',
    regla: 'La FE responde a "¿qué porcentaje sale?"; el gasto responde a "¿cuántos litros llegan al tejido?". Solo la segunda pregunta perfunde un riñón.'
  },

  perla: '🔥 Ante cualquier trastorno hemodinámico pregúntate en este orden: ¿problema de <b>frecuencia</b>, de <b>volumen</b> (precarga), de <b>bomba</b> (contractilidad) o de <b>resistencia</b> (poscarga/RVS)? Las cuatro puertas cubren prácticamente toda la patología cardiovascular aguda.',

  feynman: {
    consigna: 'Explica, sin mirar, por qué un paciente con hemorragia aguda puede llegar a urgencias con la presión arterial normal. Recorre la cadena completa desde la pérdida de volumen hasta la presión.',
    puntos: [
      'Nombro la ecuación GC = FC × VS y PA = GC × RVS',
      'Explico que ↓volumen → ↓retorno venoso → ↓precarga → ↓VS',
      'Menciono la taquicardia como compensación que sostiene el GC',
      'Explico que la vasoconstricción sube la RVS y mantiene la PA',
      'Concluyo que la PA normal no descarta shock (shock compensado)'
    ],
    referencia: '<p>La hemorragia reduce el volumen circulante efectivo, lo que reduce el retorno venoso y por tanto el llenado ventricular (precarga, VTD). Por la ley de Frank-Starling, menos fibra estirada genera menos fuerza: cae el volumen sistólico.</p>' +
      '<p>Los barorreceptores del seno carotídeo y del cayado aórtico detectan la caída incipiente de presión, disminuyen su descarga tónica y desinhiben el centro vasomotor: aumenta el tono simpático y cae el vagal. Aparecen <b>taquicardia</b> (que sostiene el GC pese al VS bajo), <b>venoconstricción</b> (que moviliza sangre del reservorio esplácnico y recupera algo de precarga), <b>aumento de contractilidad</b> y <b>vasoconstricción arteriolar</b>.</p>' +
      '<p>Como PA = GC × RVS, el ascenso de la RVS puede mantener la presión media dentro del rango normal aunque el gasto ya haya caído un 25–30 %. Eso es el <b>shock compensado</b>: presión normal, perfusión tisular ya comprometida. La pista más fina es la <b>presión de pulso estrecha</b> (VS bajo + vasoconstricción diastólica), las extremidades frías y el lactato.</p>'
  },

  preguntas: [
    { nivel: 1, q: '¿Cuáles son los dos determinantes directos del gasto cardíaco y los tres del volumen sistólico?', r: 'GC = FC × VS. El VS depende de precarga, poscarga y contractilidad. Precarga y contractilidad lo aumentan; la poscarga lo reduce.' },
    { nivel: 1, q: 'Define fracción de eyección e indica su valor normal.', r: 'FE = VS/VTD, es decir, la proporción del volumen telediastólico que se expulsa. Normal ≈ 55–70 %.' },
    { nivel: 1, q: '¿Por qué el índice cardíaco es preferible al gasto cardíaco absoluto?', r: 'Porque normaliza el caudal por superficie corporal (L/min/m²) y permite comparar pacientes de tamaños distintos. Normal 2,5–4,0.' },
    { nivel: 2, q: 'Si la frecuencia cardíaca sube de 70 a 200 lpm, ¿qué le ocurre al gasto cardíaco y por qué?', r: 'Sube inicialmente, pero a frecuencias muy altas la diástole se acorta tanto que el llenado ventricular (VTD) cae; el VS desciende más de lo que sube la FC y el GC termina bajando. Además cae la perfusión coronaria, que ocurre en diástole.' },
    { nivel: 2, q: 'Un paciente tiene diferencia arteriovenosa de oxígeno ampliada. ¿Qué te dice sobre su gasto cardíaco?', r: 'Por el principio de Fick, si el consumo de O₂ es estable y la diferencia AV se amplía, el gasto cardíaco ha caído: los tejidos extraen más oxígeno de cada mililitro porque les llega menos flujo. Se traduce en SvcO₂ baja.' },
    { nivel: 2, q: '¿Cómo puede un paciente tener FE del 25 % y volumen sistólico normal?', r: 'Por dilatación ventricular: si el VTD es 250 mL, una FE del 25 % equivale a un VS de ~62 mL, cercano al normal. La FE es una proporción, no un caudal.' },
    { nivel: 3, q: 'Paciente séptico con GC de 8 L/min, extremidades calientes, PA 80/40 y lactato de 5 mmol/L. ¿Por qué está hipoperfundido con un gasto elevado?', r: 'El problema no es la bomba sino la RVS: la vasodilatación y el cortocircuito microcirculatorio impiden que el flujo llegue a los capilares que lo necesitan. La PA cae porque PA = GC × RVS y la RVS se ha desplomado. El lactato refleja la disoxia tisular pese a un caudal global alto: es un problema de distribución y extracción, no de caudal.' },
    { nivel: 3, q: 'Tras administrar un betabloqueante a un paciente con insuficiencia cardíaca descompensada e hipotensión, empeora bruscamente. Explica el mecanismo.', r: 'Ese paciente sostenía su gasto cardíaco con estimulación simpática máxima: taquicardia + contractilidad aumentada. El betabloqueante retira ambas compensaciones a la vez, cae el VS y la FC, se desploma el GC y con él la PA. Es el motivo por el que los betabloqueantes se inician en insuficiencia cardíaca estable y euvolémica, nunca en la descompensación aguda.' }
  ],

  caso: {
    vineta: 'Varón de 46 años traído tras accidente de tránsito. Consciente y ansioso. FC 124 lpm, PA 118/94 mmHg, FR 24, extremidades frías con relleno capilar de 4 segundos, no ha orinado en 5 horas. Hb 12,8 g/dL.',
    pasos: [
      { q: '¿Qué variable cambió primero en este paciente?', pista: 'Piensa en el evento inicial, no en la respuesta del organismo.', r: 'El volumen intravascular. Una hemorragia (interna, dado el mecanismo) redujo el volumen circulante efectivo. Todo lo demás en el cuadro es respuesta a ese cambio inicial.' },
      { q: '¿Qué le ocurre al retorno venoso y a la precarga?', pista: 'El retorno venoso depende del gradiente entre la presión sistémica media de llenado y la presión auricular derecha.', r: 'Al caer el volumen cae la presión sistémica media de llenado, se estrecha el gradiente de retorno venoso y disminuye el volumen que llega a la aurícula derecha. El VTD (precarga) baja.' },
      { q: '¿Qué sucede con el volumen sistólico?', pista: 'Ley de Frank-Starling.', r: 'Cae. Menor estiramiento telediastólico de la fibra significa menor superposición actina-miosina y menor sensibilidad al calcio, por lo que se genera menos fuerza y se eyecta menos volumen.' },
      { q: 'La PA es 118/94. ¿Por qué no está hipotenso si el volumen sistólico cayó?', pista: 'PA = GC × RVS, y hay dos compensaciones actuando.', r: 'Porque la taquicardia (124 lpm) sostiene parcialmente el GC y, sobre todo, porque la vasoconstricción arteriolar ha elevado la RVS. La huella de esa compensación está a la vista: la <b>presión de pulso está estrechada</b> (24 mmHg) porque el VS es bajo y la diastólica ha subido por vasoconstricción. Es shock compensado.' },
      { q: '¿Por qué la piel está fría y no orina?', pista: 'La vasoconstricción no es uniforme en todos los territorios.', r: 'La redistribución simpática sacrifica los lechos con alta densidad de receptores α₁ —piel, músculo, esplácnico y riñón— para preservar cerebro y corazón, que tienen autorregulación potente y poca inervación α. De ahí la piel fría y moteada, y la oliguria por caída del flujo renal más la retención mediada por SRAA y ADH.' },
      { q: 'La hemoglobina es 12,8 g/dL, casi normal. ¿Descarta hemorragia significativa?', pista: '¿Qué se pierde en una hemorragia aguda?', r: 'No. En la hemorragia aguda se pierde sangre completa: hematíes y plasma en la misma proporción, por lo que la concentración de hemoglobina apenas cambia en las primeras horas. Solo desciende cuando el líquido intersticial y la reanimación con cristaloides diluyen el compartimento. Una Hb normal precoz nunca descarta sangrado.' },
      { q: '¿Qué ocurriría si la compensación fracasa?', pista: 'Piensa en qué sostiene la presión y qué pasa cuando ese sostén se agota.', r: 'Al superarse el límite de la vasoconstricción (pérdidas > 30–40 %), la RVS ya no puede compensar la caída del GC y la presión se desploma de forma brusca —la curva de deterioro no es lineal, es un acantilado—. Aparece hipoperfusión coronaria y cerebral, disfunción miocárdica isquémica que reduce aún más el gasto, acidosis láctica que deprime la contractilidad y disminuye la respuesta vascular a las catecolaminas: el círculo vicioso del shock irreversible.' }
    ],
    cierre: 'Este caso resume el eje del curso: identifica la <b>variable inicial</b> (volumen), sigue la <b>cadena mecánica</b> (retorno venoso → precarga → VS → GC), reconoce las <b>compensaciones</b> (FC, RVS) y entiende por qué el signo vital más tranquilizador —la presión arterial— es el último en alterarse.'
  },

  tarjetas: [
    { f: 'Ecuación del gasto cardíaco y de sus subdeterminantes', d: 'GC = FC × VS. VS depende de precarga (↑), contractilidad (↑) y poscarga (↓). PA = GC × RVS.' },
    { f: '¿Por qué una taquicardia extrema puede BAJAR el gasto cardíaco?', d: 'Porque acorta la diástole: cae el tiempo de llenado → ↓VTD → ↓VS. Además reduce la perfusión coronaria (diastólica) mientras aumenta la demanda de O₂.' },
    { f: 'Diferencia entre fracción de eyección y gasto cardíaco', d: 'FE = VS/VTD, una proporción (normal 55–70 %). GC = caudal en L/min. Un ventrículo dilatado puede tener FE 25 % con VS casi normal; uno rígido, FE 65 % con gasto bajo.' },
    { f: 'Tres determinantes del consumo miocárdico de oxígeno (MVO₂)', d: 'Frecuencia cardíaca, contractilidad y tensión parietal (Laplace: σ = P·r/2h, sube con poscarga y con dilatación).' },
    { f: 'Diferencia arteriovenosa de O₂ ampliada: ¿qué significa?', d: 'Gasto cardíaco bajo. Por Fick (GC = VO₂/dif AV), si el flujo cae los tejidos extraen más O₂ por mililitro. Se refleja en SvcO₂ < 65 %.' },
    { f: 'Presión de pulso estrecha: ¿qué variable delata?', d: 'Volumen sistólico bajo con vasoconstricción compensatoria. Signo precoz de shock hipovolémico/cardiogénico, antes de que caiga la presión media.' },
    { f: '¿Por qué la Hb puede ser normal en una hemorragia aguda?', d: 'Porque se pierde sangre completa: hematíes y plasma en igual proporción. La concentración solo cae al rellenarse el intravascular con líquido intersticial o cristaloides.' }
  ]
},

/* ---------------------------------------------------------- */
{
  id: 'precarga-starling',
  modulo: 'hemodinamia',
  nombre: 'Precarga y ley de Frank-Starling',
  alto: true,
  minutos: 25,
  requisitos: ['gasto-cardiaco'],
  ideaCentral: 'Precarga es el estiramiento de la fibra miocárdica al final de la diástole, no un volumen ni una presión: esos son solo sustitutos imperfectos. La ley de Frank-Starling establece que a mayor estiramiento, mayor fuerza de contracción, y su función real es igualar automáticamente el gasto de ambos ventrículos latido a latido, sin ninguna orden nerviosa.',

  anclaje: {
    q: 'Antes de leer: ¿por qué el ventrículo derecho y el izquierdo expulsan exactamente el mismo volumen por minuto durante toda la vida, si no hay ningún nervio que los coordine?',
    pista: 'La respuesta es puramente mecánica y está dentro del propio músculo.'
  },

  bloques: [
    {
      nivel: 'imprescindible',
      titulo: 'Qué es realmente la precarga',
      html: '<p>La precarga es la <b>longitud de la fibra (sarcómero) al final de la diástole</b>, es decir, la carga que estira el músculo <i>antes</i> de contraerse. Como no podemos medir sarcómeros en un paciente, usamos sustitutos, cada uno más cómodo y menos fiel que el anterior:</p>' +
        '<table><tr><th>Sustituto</th><th>Qué mide</th><th>Por qué falla</th></tr>' +
        '<tr><td>Volumen telediastólico</td><td>Muy cercano al estiramiento real</td><td>Requiere imagen; depende de la geometría ventricular</td></tr>' +
        '<tr><td>Presión telediastólica (PTDVI)</td><td>Presión, no volumen</td><td>Depende de la <b>compliance</b>: un ventrículo rígido tiene presión alta con volumen bajo</td></tr>' +
        '<tr><td>PVC / presión en cuña</td><td>Presión aguas arriba</td><td>Suma todos los errores anteriores más la presión intratorácica y la función valvular</td></tr></table>' +
        '<p>🔥 De aquí sale el error clínico más caro de la UCI: <b>una PVC alta no significa que el paciente tenga volumen suficiente</b>.</p>'
    },
    {
      nivel: 'imprescindible',
      titulo: 'Mecanismo de la ley de Frank-Starling',
      html: '<p>Al aumentar el estiramiento del sarcómero (hasta ~2,2 µm, longitud óptima) ocurren dos cosas:</p>' +
        '<ol><li><b>Mejor superposición entre actina y miosina</b>: más puentes cruzados disponibles.</li>' +
        '<li><b>Aumento de la sensibilidad al calcio de la troponina C</b> —el mecanismo dominante—: con la misma concentración de Ca²⁺ intracelular se genera más fuerza, en parte por reducción del espacio entre filamentos.</li></ol>' +
        '<p>Nótese la consecuencia conceptual: Frank-Starling aumenta la fuerza <b>sin cambiar la contractilidad</b>, porque no cambia la cantidad de calcio disponible ni el estado inotrópico. Es un desplazamiento <i>a lo largo de</i> la curva, no un cambio <i>de</i> curva.</p>',
      cadena: ['↑ Retorno venoso', '↑ VTD', '↑ Estiramiento del sarcómero', '↑ Sensibilidad al Ca²⁺', '↑ Fuerza', '↑ Volumen sistólico']
    },
    {
      nivel: 'imprescindible',
      titulo: 'La función biológica: acoplar los dos ventrículos',
      html: '<p>Si el ventrículo derecho eyectara un solo mililitro más por latido que el izquierdo, en pocos minutos el paciente tendría edema pulmonar. Frank-Starling lo impide sin ninguna señal nerviosa:</p>' +
        '<p>Si el VD envía más sangre → llega más al VI → se estira más → eyecta más. El sistema se autoequilibra latido a latido. <b>Esta es la función principal del mecanismo</b>, mucho más que "aumentar el gasto en el ejercicio", donde el papel dominante lo tienen la frecuencia y la contractilidad.</p>'
    },
    {
      nivel: 'importante',
      titulo: 'La curva y por qué su forma lo explica todo',
      html: '<p>La curva de función ventricular relaciona precarga (eje X) con volumen sistólico o trabajo (eje Y). Tiene <b>una parte empinada y una meseta</b>:</p>' +
        '<ul><li>En la <b>zona empinada</b>, dar volumen aumenta significativamente el VS: el paciente es <i>respondedor a fluidos</i>.</li>' +
        '<li>En la <b>meseta</b>, dar volumen ya no aumenta el VS pero sí la presión de llenado: el paciente no responde y solo se le genera congestión y edema pulmonar.</li></ul>' +
        '<p>El corazón insuficiente trabaja sobre una curva desplazada abajo y a la derecha, y además <b>más aplanada</b>: alcanza la meseta antes, tolera peor el volumen y por eso se congestiona con facilidad.</p>' +
        '<p>🔥 Predecir la respuesta a fluidos es predecir <b>en qué parte de la curva está el paciente</b>, y eso no se logra con una medida estática (PVC) sino con pruebas dinámicas: variación de presión de pulso en ventilación mecánica, elevación pasiva de piernas o prueba de volumen.</p>'
    },
    {
      nivel: 'complementario',
      titulo: 'Precarga y compliance: la trampa de la presión',
      html: '<p>La relación entre volumen y presión diastólica es la <b>compliance</b> (C = ΔV/ΔP). En un ventrículo hipertrófico y rígido (hipertensión, estenosis aórtica, miocardiopatía restrictiva) la curva de llenado es empinada: pequeños aumentos de volumen elevan mucho la presión.</p>' +
        '<p>Consecuencias clínicas de esa rigidez:</p>' +
        '<ul><li>El paciente tiene <b>PTDVI alta con VTD normal o bajo</b>: presiones de congestión con precarga real insuficiente.</li>' +
        '<li>Depende críticamente de la <b>contracción auricular</b> (hasta el 30–40 % del llenado frente al 15–20 % normal). Por eso una fibrilación auricular puede descompensar bruscamente a un paciente con hipertrofia severa o estenosis mitral.</li>' +
        '<li>Depende de la <b>duración de la diástole</b>: tolera muy mal la taquicardia.</li></ul>'
    }
  ],

  variables: [
    { n: 'Volumen telediastólico', d: 'up', nota: 'el sustituto más fiel de la precarga' },
    { n: 'Longitud del sarcómero', d: 'up', nota: 'la precarga verdadera; óptima ~2,2 µm' },
    { n: 'Sensibilidad al Ca²⁺', d: 'up', nota: 'mecanismo dominante de Frank-Starling' },
    { n: 'Contractilidad', d: 'eq', nota: 'NO cambia: se recorre la misma curva' },
    { n: 'Volumen sistólico', d: 'up', nota: 'siempre que se esté en la zona empinada' }
  ],

  fisiopatologia: '<p><b>Precarga insuficiente:</b> hemorragia, deshidratación, quemaduras, vasodilatación con secuestro venoso (sepsis, anestesia raquídea), taponamiento cardíaco y neumotórax a tensión (impiden el llenado), embolia pulmonar masiva (el VI no recibe), taquiarritmias extremas y pérdida de la contracción auricular.</p>' +
    '<p><b>Precarga excesiva:</b> insuficiencia cardíaca con retención hidrosalina, insuficiencia renal, insuficiencia mitral o aórtica (sobrecarga de volumen crónica), sobrecarga iatrogénica de fluidos.</p>' +
    '<p>La consecuencia de la sobrecarga no es solo congestión: por la ley de Laplace, la dilatación aumenta el radio y por tanto la <b>tensión parietal</b>, lo que eleva el consumo de oxígeno y perpetúa el remodelado adverso. Un ventrículo dilatado trabaja con desventaja mecánica.</p>',

  clinica: '<p><b>Signos de precarga baja:</b> hipotensión ortostática, taquicardia, venas yugulares colapsadas, mucosas secas, oliguria, vena cava inferior colapsable en ecografía, variabilidad respiratoria de la presión de pulso > 13 % en ventilación mecánica.</p>' +
    '<p><b>Signos de precarga alta:</b> ingurgitación yugular, reflujo hepatoyugular, tercer ruido (S3, llenado rápido contra un ventrículo con volumen y presión elevados), crepitantes, edemas, hepatomegalia congestiva.</p>' +
    '<p>La <b>elevación pasiva de piernas</b> es la prueba de cabecera más elegante: transfiere ~300 mL de sangre desde las piernas al tórax, es reversible y equivale a un bolo de volumen "virtual". Si el VS sube > 10 %, el paciente está en la zona empinada de la curva.</p>',

  error: {
    confunde: 'Precarga con volumen telediastólico, y peor aún, con presión venosa central.',
    parecido: 'En un ventrículo de compliance normal las tres cosas se mueven juntas, así que en el corazón sano la aproximación funciona y se vuelve un hábito mental.',
    diferencia: 'La precarga es <b>estiramiento de la fibra</b>. El volumen telediastólico se aproxima bien a ese estiramiento; la presión solo lo hace si la compliance es normal. En un ventrículo rígido, un VTD bajo puede coexistir con una PTDVI de 25 mmHg: <b>presión de congestión con precarga insuficiente</b>. Y la PVC además está contaminada por la presión intratorácica (PEEP), por la función del VD y por la insuficiencia tricuspídea.',
    ejemplo: 'Paciente séptico ventilado con PEEP de 12 y PVC de 14 mmHg. La PVC "alta" tienta a no dar volumen, pero al elevar pasivamente las piernas su volumen sistólico sube un 20 %: estaba en la zona empinada y necesitaba fluidos. La PEEP transmitía presión al tórax y falseaba la lectura.',
    regla: 'Precarga = <b>estiramiento</b>. Volumen = buena estimación. Presión = estimación de la estimación, filtrada por la compliance. Nunca decidas fluidos con un número estático.'
  },

  perla: '🔥 Frank-Starling desplaza al paciente <b>a lo largo</b> de una curva; el inotropismo lo cambia <b>de</b> curva. Si un examen te dice "aumentó el volumen sistólico sin cambiar la contractilidad", la respuesta es precarga. Y una precarga alta nunca prueba que el paciente esté bien llenado: prueba que su presión de llenado subió.',

  feynman: {
    consigna: 'Explica por qué dos pacientes con la misma presión venosa central de 14 mmHg pueden necesitar tratamientos opuestos —uno volumen y otro diuréticos—.',
    puntos: [
      'Defino precarga como estiramiento de fibra, no como presión',
      'Explico que presión y volumen se relacionan por la compliance',
      'Doy el ejemplo del ventrículo rígido: presión alta con volumen bajo',
      'Menciono factores externos que falsean la PVC (PEEP, VD, tricúspide)',
      'Concluyo que hacen falta pruebas dinámicas, no medidas estáticas'
    ],
    referencia: '<p>La PVC es una presión, y la relación entre presión y volumen depende por completo de la <b>compliance</b> del sistema. Con una compliance normal, 14 mmHg suele implicar buen llenado. Pero en un ventrículo hipertrófico y rígido —hipertensión de larga data, estenosis aórtica, miocardiopatía restrictiva— la curva de llenado es tan empinada que un volumen telediastólico bajo produce presiones altas: ese paciente está simultáneamente <b>congestionado por presión e hipovolémico por volumen</b>.</p>' +
      '<p>Además la PVC se contamina con todo lo que rodea al corazón: la PEEP y la presión intratorácica se transmiten a la aurícula; una insuficiencia tricuspídea genera ondas v que elevan la media; un VD fallido o un taponamiento elevan la PVC sin que exista un mililitro de más en el intravascular.</p>' +
      '<p>Por eso la pregunta correcta no es "¿cuál es su presión de llenado?" sino "<b>¿en qué parte de la curva de Starling está?</b>". Y eso solo se responde con pruebas dinámicas: variación de presión de pulso, elevación pasiva de piernas o un bolo de prueba midiendo el cambio del volumen sistólico. Si el VS sube más de un 10 %, está en la zona empinada y responderá a fluidos; si no, está en la meseta y el volumen solo generará edema.</p>'
  },

  preguntas: [
    { nivel: 1, q: 'Define precarga en términos fisiológicos estrictos.', r: 'Es la longitud de la fibra miocárdica (estiramiento del sarcómero) al final de la diástole, es decir, la carga que estira el músculo antes de contraerse. Se estima con el volumen telediastólico.' },
    { nivel: 1, q: '¿Cuál es el mecanismo celular dominante de la ley de Frank-Starling?', r: 'El aumento de la sensibilidad de la troponina C al calcio con el estiramiento (junto con una mejor superposición actina-miosina). No aumenta la cantidad de calcio disponible: por eso no es un cambio de contractilidad.' },
    { nivel: 1, q: '¿Cuál es la función biológica principal del mecanismo de Frank-Starling?', r: 'Igualar automáticamente el gasto de los ventrículos derecho e izquierdo latido a latido, sin control nervioso, evitando la acumulación de sangre en el circuito pulmonar.' },
    { nivel: 2, q: '¿Por qué la PVC es un mal indicador de la respuesta a fluidos?', r: 'Porque es una presión y su relación con el volumen depende de la compliance ventricular, además de estar contaminada por la presión intratorácica, la función del VD y la insuficiencia tricuspídea. Lo que importa es la posición en la curva de Starling, que solo revelan pruebas dinámicas.' },
    { nivel: 2, q: 'Un paciente en fibrilación auricular con hipertrofia ventricular severa se descompensa bruscamente. ¿Por qué?', r: 'Pierde la contracción auricular, que en un ventrículo rígido aporta el 30–40 % del llenado (frente al 15–20 % normal). Cae el VTD, cae el VS por Frank-Starling, y la respuesta ventricular rápida acorta además la diástole, agravando el déficit de llenado.' },
    { nivel: 2, q: 'Explica por qué en la meseta de la curva dar volumen es dañino.', r: 'Porque el VS ya no aumenta, pero la presión de llenado sí. Esa presión se transmite retrógradamente al capilar pulmonar y genera edema; además, la dilatación aumenta la tensión parietal (Laplace) y el consumo de oxígeno miocárdico.' },
    { nivel: 3, q: 'Paciente con neumotórax a tensión: hipotensión, ingurgitación yugular y taquicardia. ¿Está hipovolémico? ¿Cuál es la variable alterada?', r: 'No hay pérdida de volumen: el volumen intravascular es normal. El problema es <b>obstructivo</b>: la presión intratorácica positiva colapsa las venas cavas e impide el retorno venoso, por lo que la precarga efectiva del ventrículo cae pese a una PVC medida alta. Las yugulares ingurgitadas con hipotensión delatan que la sangre no puede entrar al tórax. El tratamiento es descomprimir, no transfundir.' },
    { nivel: 3, q: 'Un paciente séptico ventilado con PEEP 14 tiene PVC de 16 mmHg. Al elevar pasivamente las piernas, su volumen sistólico sube un 18 %. ¿Qué haces y por qué?', r: 'Administrar volumen. La PVC está falseada por la transmisión de la presión intratorácica de la PEEP; la respuesta positiva a la elevación de piernas demuestra que el paciente está en la zona empinada de la curva de Starling. La prueba dinámica gana siempre a la medida estática porque responde a la pregunta correcta: qué hará el volumen sistólico si aumento la precarga.' }
  ],

  caso: {
    vineta: 'Mujer de 74 años con hipertensión de larga data y hipertrofia concéntrica conocida (FE 62 %). Acude con disnea súbita. FC 148 lpm irregular, PA 92/60, crepitantes bilaterales hasta campos medios, saturación 88 %. ECG: fibrilación auricular con respuesta ventricular rápida.',
    pasos: [
      { q: 'Su FE es del 62 %. ¿Puede tener insuficiencia cardíaca?', pista: 'La FE mide vaciado, no llenado.', r: 'Sí: insuficiencia cardíaca con fracción de eyección preservada. El defecto es <b>diastólico</b>: un ventrículo hipertrófico y rígido con compliance reducida no se llena adecuadamente. La FE puede ser normal o incluso alta porque el VTD es pequeño.' },
      { q: '¿Qué dos consecuencias tiene la fibrilación auricular sobre su llenado?', pista: 'Una es eléctrica-mecánica, la otra es temporal.', r: 'Primero, pierde la contracción auricular, que en su ventrículo rígido aportaba el 30–40 % del llenado. Segundo, la respuesta ventricular a 148 lpm acorta drásticamente la diástole, que es precisamente la fase de llenado. Ambos mecanismos reducen el VTD.' },
      { q: 'Si su VTD cayó, ¿por qué tiene edema pulmonar y no hipovolemia?', pista: 'Compliance: relación entre volumen y presión.', r: 'Porque en un ventrículo rígido la curva presión-volumen diastólica es muy empinada: aunque el volumen sea bajo, la presión telediastólica es alta. Esa presión se transmite retrógradamente a la aurícula izquierda y al capilar pulmonar, superando la presión oncótica y produciendo trasudación. <b>Congestión por presión, no por exceso de volumen.</b>' },
      { q: '¿Qué le ocurriría si le administras 1.000 mL de cristaloides?', pista: 'Su curva de llenado es empinada.', r: 'Empeoraría rápidamente. En una curva de compliance reducida, un incremento pequeño de volumen produce un ascenso desproporcionado de la presión telediastólica y agrava el edema pulmonar, sin ganancia apreciable de volumen sistólico porque está cerca de la meseta.' },
      { q: '¿Cuál es la intervención fisiológicamente más eficaz aquí?', pista: '¿Qué variable cambió primero?', r: 'Controlar la frecuencia y, si hay inestabilidad, cardiovertir. La variable inicial fue la pérdida de la sístole auricular y el acortamiento de la diástole; restaurar el ritmo sinusal devuelve la patada auricular y alarga el tiempo de llenado, aumentando el VTD y el VS. Los diuréticos alivian la congestión pero no corrigen la causa.' },
      { q: '¿Por qué este ventrículo tolera tan mal la taquicardia comparado con uno normal?', pista: '¿Qué fase del ciclo se acorta al subir la FC y de qué depende este ventrículo?', r: 'La taquicardia acorta selectivamente la diástole. Un ventrículo compliante se llena rápido en la fase de llenado pasivo precoz y tolera diástoles cortas; uno rígido requiere más tiempo y más presión para llenarse y depende de la contracción auricular tardía. Además, la perfusión coronaria del miocardio hipertrofiado —que tiene mayor demanda y menor reserva— también es diastólica, de modo que la taquicardia le añade isquemia subendocárdica.' }
    ],
    cierre: 'La lección: <b>presión de llenado alta ≠ precarga adecuada</b>. Esta paciente estaba congestionada y a la vez con un volumen telediastólico insuficiente. Solo se entiende separando volumen de presión mediante la compliance.'
  },

  tarjetas: [
    { f: 'Definición estricta de precarga', d: 'Longitud del sarcómero al final de la diástole (estiramiento de la fibra). Sustitutos, de mejor a peor: VTD > presión telediastólica > PVC/cuña.' },
    { f: 'Mecanismo celular de la ley de Frank-Starling', d: 'El estiramiento aumenta la sensibilidad de la troponina C al Ca²⁺ (mecanismo dominante) y mejora la superposición actina-miosina. NO cambia la contractilidad: se recorre la misma curva.' },
    { f: 'Función biológica principal de Frank-Starling', d: 'Igualar el gasto del VD y el VI latido a latido, sin control nervioso. Sin ella, cualquier desajuste mínimo causaría edema pulmonar en minutos.' },
    { f: '¿Por qué la PVC no predice la respuesta a fluidos?', d: 'Es presión, no volumen: depende de la compliance, la PEEP/presión intratorácica, la función del VD y la insuficiencia tricuspídea. Se necesitan pruebas dinámicas (elevación de piernas, variación de presión de pulso).' },
    { f: 'Prueba de elevación pasiva de piernas: fundamento', d: 'Transfiere ~300 mL de las piernas al tórax = bolo de volumen reversible. Si el volumen sistólico sube > 10 %, el paciente está en la zona empinada de la curva y responderá a fluidos.' },
    { f: '¿Por qué la FA descompensa al ventrículo rígido?', d: 'Pierde la contracción auricular (30–40 % del llenado en ese ventrículo, vs 15–20 % normal) y la respuesta rápida acorta la diástole. Doble golpe al VTD.' },
    { f: 'Ventrículo rígido: relación volumen-presión diastólica', d: 'Curva empinada (compliance baja): VTD normal o bajo con presión telediastólica muy alta → congestión pulmonar con precarga insuficiente.' }
  ]
},

/* ---------------------------------------------------------- */
{
  id: 'poscarga',
  modulo: 'hemodinamia',
  nombre: 'Poscarga y acoplamiento ventrículo-arterial',
  alto: true,
  minutos: 22,
  requisitos: ['gasto-cardiaco'],
  ideaCentral: 'Poscarga es la tensión que el ventrículo debe generar en su pared para abrir la válvula aórtica y eyectar; no es la presión arterial, aunque la presión sea su componente más visible. Por la ley de Laplace la poscarga sube con la presión y con el radio ventricular, y baja con el grosor de pared: esto explica tanto la hipertrofia compensadora como la espiral del ventrículo dilatado.',

  anclaje: {
    q: 'Sin mirar: ¿por qué bajar la presión arterial mejora mucho el volumen sistólico de un corazón insuficiente y casi nada el de un corazón sano?',
    pista: 'Piensa en cuánta reserva contráctil tiene cada uno para vencer una carga.'
  },

  bloques: [
    {
      nivel: 'imprescindible',
      titulo: 'Definición correcta y ley de Laplace',
      html: '<p>La poscarga es la <b>tensión parietal durante la sístole</b>, es decir, la fuerza que cada fibra debe generar para vencer la carga que se opone a la eyección. Se describe con la ley de Laplace:</p>' +
        '<p style="text-align:center"><code>σ = (P × r) / (2h)</code></p>' +
        '<p>donde P = presión intraventricular, r = radio de la cavidad y h = grosor de la pared. De aquí se deducen tres hechos que valen por todo el tema:</p>' +
        '<ul><li>La <b>hipertensión</b> sube la poscarga por el numerador (P).</li>' +
        '<li>La <b>dilatación ventricular</b> sube la poscarga por el radio: un ventrículo dilatado necesita más fuerza para generar la misma presión. Este es el motor del círculo vicioso de la insuficiencia cardíaca.</li>' +
        '<li>La <b>hipertrofia</b> baja la poscarga por el denominador: es la respuesta compensadora lógica a una sobrecarga de presión mantenida.</li></ul>'
    },
    {
      nivel: 'imprescindible',
      titulo: 'Efecto sobre el volumen sistólico',
      html: '<p>A mayor poscarga, el ventrículo alcanza antes el equilibrio entre la fuerza que genera y la que se le opone: la eyección se detiene antes, queda más sangre dentro (<b>↑VTS</b>) y el volumen sistólico cae.</p>' +
        '<p>Lo crucial es que <b>la magnitud de ese efecto depende de la reserva contráctil</b>:</p>' +
        '<ul><li>Corazón <b>sano</b>: la curva VS/poscarga es plana. Ante un aumento de poscarga responde con más fuerza (y con el mecanismo de Anrep) y el VS apenas cambia.</li>' +
        '<li>Corazón <b>insuficiente</b>: la curva es empinada. Un pequeño aumento de poscarga hunde el VS, y una pequeña reducción lo mejora mucho.</li></ul>' +
        '<p>🔥 Esta única diferencia explica por qué los vasodilatadores son tratamiento de la insuficiencia cardíaca y no de la persona sana, y por qué una crisis hipertensiva puede precipitar un edema agudo de pulmón en un corazón enfermo.</p>',
      cadena: ['↑ Poscarga', 'Eyección se detiene antes', '↑ VTS', '↓ Volumen sistólico', '↑ VTD residual', '↑ Presiones de llenado']
    },
    {
      nivel: 'importante',
      titulo: 'Remodelado: dos formas de responder a la carga',
      html: '<table><tr><th></th><th>Sobrecarga de presión</th><th>Sobrecarga de volumen</th></tr>' +
        '<tr><td>Ejemplos</td><td>Hipertensión, estenosis aórtica</td><td>Insuficiencia mitral o aórtica</td></tr>' +
        '<tr><td>Estímulo</td><td>↑ tensión sistólica</td><td>↑ tensión diastólica</td></tr>' +
        '<tr><td>Sarcómeros</td><td>Se añaden <b>en paralelo</b></td><td>Se añaden <b>en serie</b></td></tr>' +
        '<tr><td>Resultado</td><td>Hipertrofia <b>concéntrica</b>: ↑h, cavidad normal o pequeña</td><td>Hipertrofia <b>excéntrica</b>: ↑r, dilatación</td></tr>' +
        '<tr><td>Coste</td><td>Rigidez, disfunción diastólica, isquemia subendocárdica</td><td>↑ tensión parietal, disfunción sistólica progresiva</td></tr></table>' +
        '<p>Ambas empiezan siendo adaptativas y terminan siendo el problema: la concéntrica compromete el llenado, la excéntrica compromete el vaciado.</p>'
    },
    {
      nivel: 'complementario',
      titulo: 'Acoplamiento ventrículo-arterial e impedancia',
      html: '<p>La poscarga real no es la resistencia vascular sistémica sino la <b>impedancia aórtica</b>, que incluye tres componentes: la resistencia arteriolar (componente estático), la <b>compliance arterial</b> (componente pulsátil) y las <b>ondas de reflexión</b> que retornan desde la periferia.</p>' +
        '<p>En el anciano con aorta rígida las ondas reflejadas vuelven antes y se suman a la sístole tardía en lugar de a la diástole: aumenta la presión sistólica y la poscarga real, y disminuye la presión diastólica que perfunde las coronarias. De ahí la <b>hipertensión sistólica aislada</b> del anciano y su significado pronóstico.</p>' +
        '<p>El acoplamiento se cuantifica como <code>Ea/Ees</code> (elastancia arterial sobre elastancia telesistólica ventricular); el óptimo para transferir trabajo está en torno a 0,6–1,2. Cuando el ventrículo falla, Ees cae, la relación se dispara y la eficiencia mecánica se desploma.</p>'
    }
  ],

  variables: [
    { n: 'Poscarga (tensión parietal)', d: 'up', nota: 'σ = P·r / 2h' },
    { n: 'Volumen telesistólico', d: 'up', nota: 'la eyección termina antes' },
    { n: 'Volumen sistólico', d: 'down', nota: 'caída marcada solo si hay poca reserva contráctil' },
    { n: 'Fracción de eyección', d: 'down', nota: 'sensible a la poscarga: no es un índice puro de contractilidad' },
    { n: 'MVO₂', d: 'up', nota: 'más tensión parietal = más consumo de oxígeno' }
  ],

  fisiopatologia: '<p><b>Poscarga aumentada:</b> hipertensión arterial, estenosis aórtica (obstrucción fija), miocardiopatía hipertrófica obstructiva (obstrucción dinámica), coartación, vasoconstricción intensa del shock cardiogénico, y para el ventrículo derecho, la hipertensión pulmonar y el tromboembolismo.</p>' +
    '<p><b>Poscarga reducida:</b> sepsis y shock distributivo, insuficiencia hepática, anafilaxia, fármacos vasodilatadores, fístulas arteriovenosas. También la insuficiencia mitral crea una "descarga" del VI hacia la aurícula (baja impedancia) que <b>infla artificialmente la FE</b> y enmascara la disfunción sistólica hasta que se corrige la válvula.</p>' +
    '<p>El círculo vicioso central de la insuficiencia cardíaca: caída del gasto → activación simpática y del SRAA → <b>vasoconstricción → más poscarga</b> → menor volumen sistólico → más dilatación → más tensión parietal por Laplace → más consumo de oxígeno y más remodelado. La compensación se convierte en la enfermedad.</p>',

  clinica: '<p>El paciente con poscarga elevada y ventrículo comprometido llega en <b>edema agudo de pulmón hipertensivo</b>: PA 220/120, disnea súbita, crepitantes. El tratamiento fisiológico es reducir la poscarga (nitroglicerina o nitroprusiato, ventilación no invasiva) más que diurético a alta dosis, porque el problema no es un exceso de agua corporal sino una redistribución brusca por fallo de eyección.</p>' +
    '<p>La <b>presión de pulso</b> también informa: estrecha en la estenosis aórtica severa (obstrucción fija que limita el VS), amplia con pulso saltón en la insuficiencia aórtica (gran VS que escapa retrógradamente en diástole).</p>' +
    '<p>En el <b>ventrículo derecho</b>, que es una cámara de pared fina diseñada para un circuito de baja resistencia, la tolerancia a la poscarga es mínima: un tromboembolismo pulmonar masivo puede dilatarlo y hacerlo fallar en minutos, algo que el VI nunca haría ante un aumento equivalente de presión.</p>',

  error: {
    confunde: 'Poscarga con presión arterial, y resistencia vascular sistémica con poscarga.',
    parecido: 'La presión arterial es el determinante más obvio y el único que medimos de rutina; en la mayoría de los pacientes suben y bajan juntas.',
    diferencia: 'La poscarga es <b>tensión de pared</b> e incluye el radio y el grosor, no solo la presión. Un ventrículo muy dilatado con presión arterial normal puede tener una poscarga altísima porque su radio es enorme. Y en la estenosis aórtica la presión arterial <i>periférica</i> puede ser baja mientras la poscarga ventricular es máxima, porque la carga está en la válvula: lo que el ventrículo enfrenta es la presión <i>intraventricular</i> sistólica, mucho mayor que la aórtica.',
    ejemplo: 'Estenosis aórtica severa con PA 100/70. La presión arterial sugiere poscarga baja; en realidad el VI genera 180 mmHg intracavitarios para vencer la válvula. Bajar la presión con un vasodilatador aquí puede ser catastrófico: el gasto es fijo y solo se pierde presión de perfusión coronaria.',
    regla: 'Pregunta siempre "¿cuánta tensión debe generar la <b>pared</b>?", no "¿cuánta presión marca el manguito?". Presión, radio y grosor: los tres a la vez.'
  },

  perla: '🔥 Reducir la poscarga aumenta el volumen sistólico <b>en proporción inversa a la reserva contráctil</b>: casi nada en el corazón sano, muchísimo en el insuficiente. Y recuerda que la FE depende de la poscarga: una FE "normal" en una insuficiencia mitral severa suele significar una función sistólica ya deteriorada.',

  feynman: {
    consigna: 'Explica por qué la dilatación ventricular, que empieza como una compensación útil, termina empeorando la insuficiencia cardíaca.',
    puntos: [
      'Explico que la dilatación inicialmente recluta Frank-Starling',
      'Introduzco Laplace: σ = P·r/2h, la tensión sube con el radio',
      'Conecto tensión parietal con consumo de oxígeno miocárdico',
      'Describo el círculo vicioso: ↓VS → activación neurohumoral → ↑poscarga',
      'Menciono el remodelado excéntrico y la desventaja mecánica'
    ],
    referencia: '<p>Cuando cae el volumen sistólico, queda sangre residual y el ventrículo se dilata. Al principio esto es útil: el mayor volumen telediastólico estira la fibra y recluta el mecanismo de Frank-Starling, recuperando parte del volumen eyectado. Es una compensación real y eficaz a corto plazo.</p>' +
      '<p>El problema aparece por la ley de Laplace: <code>σ = P·r/2h</code>. Al aumentar el radio, la tensión que cada fibra debe generar para producir la misma presión intraventricular <b>aumenta</b>. Es decir, la dilatación es en sí misma un aumento de poscarga. Un ventrículo dilatado trabaja con desventaja mecánica pura: gasta más energía para lograr menos.</p>' +
      '<p>Más tensión parietal significa más consumo de oxígeno, con lo que aparece isquemia subendocárdica incluso sin enfermedad coronaria, y esa isquemia deprime aún más la contractilidad. Paralelamente, la caída del gasto activa el simpático y el SRAA, que producen vasoconstricción (más poscarga) y retención de sodio y agua (más precarga y más dilatación), además de estimular directamente el remodelado y la fibrosis mediante angiotensina II y aldosterona.</p>' +
      '<p>El circuito se cierra: dilatación → ↑poscarga → ↓VS → activación neurohumoral → ↑poscarga y ↑precarga → más dilatación. Por eso el tratamiento moderno de la insuficiencia cardíaca no busca estimular la bomba sino <b>interrumpir el círculo</b>: IECA/ARNI y betabloqueantes reducen la carga y frenan el remodelado, y mejoran la supervivencia; los inotrópicos aumentan el gasto a corto plazo y no la mejoran.</p>'
  },

  preguntas: [
    { nivel: 1, q: 'Enuncia la ley de Laplace aplicada al ventrículo y nombra sus tres variables.', r: 'σ = (P × r)/(2h). La tensión parietal aumenta con la presión intraventricular y el radio de la cavidad, y disminuye con el grosor de la pared.' },
    { nivel: 1, q: '¿Qué le ocurre al volumen telesistólico cuando aumenta la poscarga?', r: 'Aumenta: la eyección se interrumpe antes porque el ventrículo alcanza antes el equilibrio con la carga opuesta, y queda más sangre residual. Por eso cae el volumen sistólico.' },
    { nivel: 1, q: '¿Qué tipo de hipertrofia produce una sobrecarga de presión y por qué?', r: 'Hipertrofia concéntrica: se añaden sarcómeros en paralelo, aumenta el grosor de pared y la cavidad se mantiene o se reduce. Es la respuesta lógica para normalizar la tensión parietal según Laplace (aumentar h).' },
    { nivel: 2, q: '¿Por qué un vasodilatador mejora mucho más el gasto de un corazón insuficiente que el de uno sano?', r: 'Porque la relación entre volumen sistólico y poscarga es plana en el corazón sano (tiene reserva contráctil para vencer la carga) y empinada en el insuficiente. En el corazón enfermo, pequeñas reducciones de la carga se traducen en aumentos grandes del VS.' },
    { nivel: 2, q: '¿Por qué la fracción de eyección sobreestima la función sistólica en la insuficiencia mitral severa?', r: 'Porque parte del volumen se eyecta retrógradamente hacia la aurícula izquierda, un circuito de muy baja impedancia. El ventrículo "descarga" contra poca resistencia, la poscarga efectiva es baja y la FE queda artificialmente alta. Una FE < 60 % en insuficiencia mitral severa ya indica disfunción significativa.' },
    { nivel: 2, q: '¿Por qué el ventrículo derecho tolera peor un aumento agudo de poscarga que el izquierdo?', r: 'Porque es una cámara de pared fina, diseñada para un circuito de baja resistencia y alta compliance. No tiene masa muscular para generar presiones altas, de modo que ante un aumento súbito (tromboembolismo masivo) se dilata, sufre isquemia por aumento de tensión parietal y falla en minutos.' },
    { nivel: 3, q: 'Paciente con estenosis aórtica severa e hipotensión. El residente propone nitroglicerina porque "hay edema pulmonar". ¿Qué le respondes desde la fisiología?', r: 'Es peligroso. En la estenosis aórtica el gasto está limitado por una obstrucción fija: el ventrículo no puede aumentar el VS para compensar la caída de resistencia que produce el vasodilatador. Como PA = GC × RVS y el GC es fijo, bajar la RVS hace caer la presión de forma abrupta. Y la perfusión coronaria de un ventrículo hipertrófico depende críticamente de la presión diastólica aórtica: se precipita isquemia subendocárdica, cae más la contractilidad y se entra en una espiral. En estos pacientes se mantiene la precarga y la resistencia, y se corrige la obstrucción.' },
    { nivel: 3, q: 'Un paciente en edema agudo de pulmón con PA 230/130. Explica por qué la nitroglicerina y la VNI son más eficaces que un bolo grande de furosemida.', r: 'La mayoría de estos pacientes no tienen exceso de agua corporal total: tienen una <b>redistribución</b> brusca por fallo de eyección ante una poscarga extrema. Reducir la poscarga permite que el ventrículo vacíe, cae la presión telediastólica y con ella la presión capilar pulmonar, y el edema se reabsorbe. La ventilación no invasiva con presión positiva ayuda por dos vías: reduce el retorno venoso (precarga) y disminuye la presión transmural del VI, es decir, también reduce la poscarga. La furosemida tarda y puede agravar la activación neurohumoral si el paciente está euvolémico.' }
  ],

  caso: {
    vineta: 'Varón de 68 años, hipertenso mal controlado, llega con disnea brusca de 40 minutos. PA 228/126 mmHg, FC 118, saturación 84 % con aire ambiente, crepitantes hasta ápices, sudoroso. Ecocardiografía rápida: FE 40 %, ventrículo no dilatado, hipertrofia concéntrica.',
    pasos: [
      { q: '¿Qué variable cambió primero?', pista: 'El número más llamativo del caso.', r: 'La poscarga: un ascenso brusco de la presión arterial. Su ventrículo hipertrófico, con disfunción sistólica moderada y compliance reducida, tiene una curva VS/poscarga empinada.' },
      { q: '¿Cómo se traduce ese aumento de poscarga en edema pulmonar?', pista: 'Sigue el volumen que no logra salir.', r: '↑poscarga → la eyección se detiene antes → ↑VTS → el volumen residual se suma al llenado siguiente → ↑VTD y ↑presión telediastólica → se transmite retrógradamente a la aurícula izquierda y a los capilares pulmonares → la presión hidrostática supera la oncótica → trasudación al intersticio y al alvéolo.' },
      { q: '¿Por qué la hipertrofia concéntrica lo hace especialmente vulnerable?', pista: 'Compliance.', r: 'Porque su ventrículo rígido convierte pequeños aumentos de volumen residual en grandes aumentos de presión. En un ventrículo compliante el mismo volumen se acomodaría con una presión mucho menor y no llegaría a producirse edema.' },
      { q: '¿La hipertensión es causa o consecuencia aquí?', pista: 'Cuidado: puede ser ambas.', r: 'Principalmente causa, pero se retroalimenta. La angustia, la hipoxemia y la descarga simpática masiva del edema pulmonar elevan aún más la presión, cerrando un círculo. Por eso al romper el círculo con vasodilatador y ventilación no invasiva la presión suele caer más de lo que explicaría el fármaco solo.' },
      { q: '¿Por qué la ventilación no invasiva mejora la hemodinámica y no solo la oxigenación?', pista: 'La presión positiva actúa sobre las dos cargas.', r: 'La presión intratorácica positiva reduce el retorno venoso, y con él la precarga y la congestión. Y como la poscarga real del VI es su presión <b>transmural</b> (intraventricular menos intratorácica), elevar la presión intratorácica reduce la poscarga efectiva. Además disminuye el trabajo respiratorio, que en el edema agudo puede consumir una fracción enorme del gasto cardíaco.' },
      { q: '¿Qué esperarías que ocurriera con la FE al día siguiente, ya controlado?', pista: 'La FE depende de la carga.', r: 'Probablemente mejore por encima del 40 %. La FE es dependiente de la poscarga: la medición durante una crisis hipertensiva subestima la función contráctil real. Es un recordatorio de que la FE no es un índice puro de contractilidad y de que conviene reevaluarla en condiciones de carga estables.' }
    ],
    cierre: 'El edema agudo de pulmón hipertensivo es el ejemplo más limpio de que <b>la poscarga es tratamiento</b>: bajarla revierte el cuadro en minutos, mientras que atacar solo el volumen trata la consecuencia y no el mecanismo.'
  },

  tarjetas: [
    { f: 'Ley de Laplace en el ventrículo', d: 'σ = (P × r)/(2h). La tensión parietal sube con la presión y con el radio, y baja con el grosor. Explica la hipertrofia compensadora y el círculo vicioso del ventrículo dilatado.' },
    { f: '¿Por qué la dilatación ventricular aumenta la poscarga?', d: 'Porque aumenta el radio: por Laplace, se necesita más tensión de pared para generar la misma presión. La dilatación es en sí misma una sobrecarga mecánica y aumenta el consumo de O₂.' },
    { f: 'Sobrecarga de presión vs de volumen: tipo de hipertrofia', d: 'Presión (HTA, estenosis aórtica) → sarcómeros en paralelo → hipertrofia CONCÉNTRICA. Volumen (insuficiencia mitral/aórtica) → sarcómeros en serie → hipertrofia EXCÉNTRICA (dilatación).' },
    { f: '¿Por qué el vasodilatador ayuda mucho al corazón insuficiente y poco al sano?', d: 'La curva VS/poscarga es plana en el sano (tiene reserva contráctil) y empinada en el insuficiente. Poca reserva = gran sensibilidad a la carga.' },
    { f: 'FE en la insuficiencia mitral severa: ¿por qué engaña?', d: 'El VI eyecta hacia la aurícula, un circuito de baja impedancia: la poscarga efectiva es baja y la FE queda inflada. Una FE < 60 % ya indica disfunción sistólica significativa.' },
    { f: 'Estenosis aórtica severa: ¿por qué son peligrosos los vasodilatadores?', d: 'El gasto está fijado por la obstrucción y no puede aumentar. Al bajar la RVS, PA = GC × RVS se desploma, y con ella la presión diastólica que perfunde un miocardio hipertrófico → isquemia y espiral descendente.' },
    { f: '¿Por qué la VNI mejora la hemodinámica en el edema agudo de pulmón?', d: 'La presión intratorácica positiva ↓ el retorno venoso (↓precarga) y ↓ la presión transmural del VI (↓poscarga real), además de reducir el trabajo respiratorio.' }
  ]
},

/* ---------------------------------------------------------- */
{
  id: 'contractilidad-pv',
  modulo: 'hemodinamia',
  nombre: 'Contractilidad y bucle presión-volumen',
  alto: true,
  minutos: 25,
  requisitos: ['precarga-starling', 'poscarga'],
  ideaCentral: 'Contractilidad es la capacidad intrínseca del miocardio de generar fuerza para una precarga y una poscarga dadas; por definición, es lo que queda cuando se controlan las condiciones de carga. El bucle presión-volumen es la herramienta que permite separar visualmente los tres determinantes, y su pendiente telesistólica (Ees) es el único índice de contractilidad verdaderamente independiente de la carga.',

  anclaje: {
    q: 'Antes de leer: si la fracción de eyección no es un buen índice de contractilidad, ¿por qué la usamos en todas partes? ¿Y qué medida sí lo sería?',
    pista: 'Piensa en qué condiciones tendrías que fijar para aislar la función intrínseca del músculo.'
  },

  bloques: [
    {
      nivel: 'imprescindible',
      titulo: 'Definición y base celular',
      html: '<p>La contractilidad (inotropismo) es la fuerza generada <b>independientemente de la longitud inicial de la fibra</b>. Su determinante celular es la cantidad de Ca²⁺ disponible para la troponina C y la sensibilidad del aparato contráctil a ese calcio.</p>' +
        '<p><b>Aumentan la contractilidad:</b> estimulación β₁ (adrenalina, noradrenalina, dobutamina), inhibidores de la fosfodiesterasa 3 (milrinona), digoxina, calcio, y el propio aumento de frecuencia (efecto Bowditch o escalera).</p>' +
        '<p><b>La disminuyen:</b> isquemia e hipoxia, acidosis, hipercapnia, betabloqueantes, calcioantagonistas no dihidropiridínicos, anestésicos, sepsis (por citoquinas y óxido nítrico) y la propia insuficiencia cardíaca crónica.</p>' +
        '<p>Vía β₁ paso a paso: agonista → proteína Gs → adenilato ciclasa → ↑AMPc → PKA → fosforila los canales de Ca²⁺ tipo L (más entrada), el fosfolambano (libera la SERCA, que recaptura calcio más rápido → también mejora la relajación, efecto <b>lusitrópico</b>) y la troponina I (acelera la disociación). El resultado es una contracción más fuerte, más rápida y más breve.</p>'
    },
    {
      nivel: 'imprescindible',
      titulo: 'El bucle presión-volumen',
      html: '<p>El bucle recorre el ciclo cardíaco en sentido antihorario y tiene cuatro fases separadas por la apertura y cierre de las válvulas:</p>' +
        '<ol><li><b>Llenado diastólico</b> (mitral abierta): el volumen aumenta con poca presión, siguiendo la curva de compliance. Termina en el punto de VTD.</li>' +
        '<li><b>Contracción isovolumétrica</b> (ambas válvulas cerradas): la presión sube sin cambio de volumen, hasta superar la presión aórtica.</li>' +
        '<li><b>Eyección</b> (aórtica abierta): el volumen cae. Termina en el punto de VTS.</li>' +
        '<li><b>Relajación isovolumétrica</b>: la presión cae sin cambio de volumen hasta abrir la mitral.</li></ol>' +
        '<p>La <b>anchura</b> del bucle es el volumen sistólico. El <b>área</b> es el trabajo externo del ventrículo.</p>' +
        '<p>Dos líneas límite acotan el bucle: la <b>relación presión-volumen telesistólica (RPVTS)</b>, cuya pendiente es la elastancia telesistólica <b>Ees</b> = índice de contractilidad independiente de la carga; y la <b>relación presión-volumen telediastólica</b>, que describe la compliance.</p>'
    },
    {
      nivel: 'importante',
      titulo: 'Cómo se mueve el bucle con cada intervención',
      html: '<table><tr><th>Cambio</th><th>Efecto en el bucle</th><th>VS</th><th>VTS</th></tr>' +
        '<tr><td>↑ Precarga</td><td>Se ensancha hacia la derecha; el borde superior derecho se desplaza</td><td>↑</td><td>≈</td></tr>' +
        '<tr><td>↑ Poscarga</td><td>Más alto y más estrecho; la eyección termina antes</td><td>↓</td><td>↑</td></tr>' +
        '<tr><td>↑ Contractilidad</td><td>La RPVTS <b>rota hacia arriba y a la izquierda</b> (↑Ees)</td><td>↑</td><td>↓</td></tr>' +
        '<tr><td>↓ Compliance</td><td>La curva diastólica se empina: más presión para el mismo volumen</td><td>↓</td><td>≈</td></tr></table>' +
        '<p>🔥 El sello distintivo de un cambio de contractilidad es el desplazamiento de la <b>línea telesistólica</b>. Precarga y poscarga mueven el bucle <i>sobre</i> esa línea; el inotropismo mueve la línea misma.</p>'
    },
    {
      nivel: 'complementario',
      titulo: 'Índices prácticos y sus limitaciones',
      html: '<ul><li><b>Ees</b> (pendiente de la RPVTS): el mejor índice, pero requiere registrar varios bucles con cargas distintas. Difícil fuera del laboratorio.</li>' +
        '<li><b>dP/dt máxima</b>: velocidad máxima de subida de la presión durante la contracción isovolumétrica. Bastante buena porque se mide antes de que se abra la válvula aórtica (independiente de la poscarga), pero sigue siendo sensible a la precarga.</li>' +
        '<li><b>Fracción de eyección</b>: la más usada, pero depende de precarga y poscarga. Útil para clasificar y pronosticar; mala para aislar contractilidad.</li>' +
        '<li><b>Strain longitudinal global</b> por ecografía: detecta disfunción sistólica antes de que caiga la FE, porque las fibras longitudinales subendocárdicas son las primeras que se afectan.</li></ul>'
    }
  ],

  variables: [
    { n: 'Ca²⁺ intracelular disponible', d: 'up', nota: 'determinante celular directo' },
    { n: 'Ees (pendiente RPVTS)', d: 'up', nota: 'índice independiente de la carga' },
    { n: 'Volumen telesistólico', d: 'down', nota: 'vacía mejor: la marca del inotropismo' },
    { n: 'Volumen sistólico', d: 'up', nota: 'a igual precarga y poscarga' },
    { n: 'MVO₂', d: 'up', nota: 'el precio: más consumo de oxígeno' }
  ],

  fisiopatologia: '<p>La caída de contractilidad tiene mecanismos distintos según el contexto, y cada uno pide un tratamiento distinto:</p>' +
    '<ul><li><b>Isquemia</b>: cae el ATP, falla la SERCA y las bombas; el miocardio deja de contraerse en segundos (es el evento más precoz de la cascada isquémica, antes que el ECG y antes que el dolor).</li>' +
    '<li><b>Acidosis</b>: los protones compiten con el Ca²⁺ por la troponina C. Por eso un paciente acidótico responde mal a las catecolaminas.</li>' +
    '<li><b>Sepsis</b>: citoquinas y óxido nítrico deprimen el miocardio de forma reversible (miocardiopatía séptica).</li>' +
    '<li><b>Insuficiencia cardíaca crónica</b>: hay <b>desensibilización β</b> (regulación a la baja y desacoplamiento de receptores por exposición crónica a catecolaminas), manejo anormal del calcio con SERCA2a disminuida y fuga diastólica por el receptor de rianodina, y fibrosis intersticial.</li></ul>' +
    '<p>La consecuencia terapéutica es contraintuitiva: <b>estimular la bomba crónicamente empeora el pronóstico</b>. Los inotrópicos aumentan el AMPc, el calcio y el consumo de oxígeno, favorecen arritmias y aceleran la muerte celular. Los betabloqueantes, que a corto plazo reducen la contractilidad, mejoran la supervivencia al resensibilizar los receptores β y frenar el remodelado.</p>',

  clinica: '<p>El descenso de contractilidad se manifiesta como <b>bajo gasto</b> (frialdad, oliguria, lactato, obnubilación) más <b>congestión</b> (por la elevación retrógrada de presiones). La combinación de ambos define el perfil "frío y húmedo" del shock cardiogénico.</p>' +
    '<p>Signos exploratorios: tercer ruido (S3), impulso apical desplazado y difuso, presión de pulso estrecha, pulso alternante en casos avanzados. En ecografía: FE reducida, dilatación, strain longitudinal alterado.</p>' +
    '<p>En la UCI la elección del fármaco surge directamente del árbol: si el problema es la bomba, un inotrópico (dobutamina, milrinona); si es la resistencia, un vasoconstrictor (noradrenalina); si es el volumen, fluidos. Confundir los tres es el error clásico, y la ecografía a pie de cama es la herramienta que lo evita.</p>',

  error: {
    confunde: 'Cualquier aumento de la fuerza de contracción con un aumento de contractilidad.',
    parecido: 'Ambos producen más fuerza y más volumen sistólico, y clínicamente el paciente mejora igual.',
    diferencia: 'Frank-Starling aumenta la fuerza <b>por estiramiento</b>, sin cambiar la relación intrínseca fuerza-longitud: el punto se mueve <i>a lo largo</i> de la misma curva y la línea telesistólica no se desplaza. La contractilidad cambia <b>la curva completa</b>: para el mismo volumen telediastólico, se genera más fuerza y el VTS cae.',
    ejemplo: 'Un bolo de 500 mL y una perfusión de dobutamina pueden subir el gasto de forma idéntica. Pero en el bucle presión-volumen, el fluido ensancha el bucle hacia la derecha manteniendo la línea telesistólica; la dobutamina rota esa línea hacia arriba a la izquierda y desplaza el bucle hacia menor volumen telesistólico.',
    regla: '¿Se movió el punto o se movió la línea? Si se movió el <b>punto</b> sobre la misma recta telesistólica es carga; si se movió la <b>recta</b>, es contractilidad.'
  },

  perla: '🔥 La huella inequívoca del inotropismo es un <b>volumen telesistólico menor</b>: el ventrículo vacía más de lo que se le pide. La precarga cambia dónde empieza el bucle; la poscarga, hasta dónde llega; la contractilidad, la pendiente del límite. Y en la clínica: la FE no mide contractilidad, mide contractilidad filtrada por las condiciones de carga.',

  feynman: {
    consigna: 'Explica por qué los betabloqueantes, que reducen la contractilidad, mejoran la supervivencia en insuficiencia cardíaca, mientras que los inotrópicos, que la aumentan, no lo hacen.',
    puntos: [
      'Explico la activación simpática crónica como compensación que se vuelve tóxica',
      'Menciono la desensibilización y regulación a la baja de receptores β',
      'Conecto contractilidad con consumo de oxígeno y arritmias',
      'Explico el efecto del betabloqueo sobre remodelado y tiempo de llenado',
      'Distingo beneficio hemodinámico a corto plazo de beneficio pronóstico'
    ],
    referencia: '<p>En la insuficiencia cardíaca, la caída del gasto activa el simpático de forma sostenida. A corto plazo eso sostiene la presión y el gasto, pero mantenido en el tiempo el exceso de catecolaminas es <b>directamente tóxico</b> para el miocardio: produce sobrecarga de calcio, apoptosis y necrosis de miocitos, fibrosis y arritmias ventriculares. Los receptores β₁ se regulan a la baja y se desacoplan de sus proteínas G, de modo que el corazón se vuelve progresivamente sordo a su propia estimulación.</p>' +
      '<p>Un inotrópico añade más de lo mismo: aumenta AMPc y calcio intracelular, y con ello el consumo miocárdico de oxígeno en un corazón que a menudo ya tiene un aporte limitado. Se obtiene una mejoría hemodinámica real e inmediata —útil en el shock cardiogénico como puente— pero al precio de más isquemia, más arritmias y más muerte celular. Por eso los ensayos con inotrópicos orales crónicos mostraron mejor hemodinámica y <b>mayor mortalidad</b>.</p>' +
      '<p>El betabloqueante hace lo contrario. A corto plazo reduce contractilidad y gasto, y por eso debe iniciarse con el paciente estable y euvolémico, a dosis bajas y con titulación lenta. Pero a medio plazo <b>resensibiliza y regula al alza los receptores β</b>, reduce el consumo de oxígeno, previene arritmias, frena el remodelado y, al bajar la frecuencia, alarga la diástole mejorando tanto el llenado como la perfusión coronaria. El resultado neto tras semanas es una FE que <i>aumenta</i>, no que disminuye.</p>' +
      '<p>La lección general: en la insuficiencia cardíaca crónica el objetivo no es exprimir la bomba sino <b>proteger al miocardio de sus propias compensaciones</b>. Todos los fármacos que mejoran la supervivencia —betabloqueantes, IECA/ARA-II/ARNI, antialdosterónicos, iSGLT2— actúan bloqueando la activación neurohumoral, no estimulando la contracción.</p>'
  },

  preguntas: [
    { nivel: 1, q: 'Define contractilidad de forma que la distinga de la fuerza generada por Frank-Starling.', r: 'Es la capacidad intrínseca del miocardio de generar fuerza <b>para una precarga y poscarga dadas</b>. Frank-Starling aumenta la fuerza cambiando la precarga; la contractilidad la cambia sin modificar las condiciones de carga.' },
    { nivel: 1, q: '¿Qué representa la anchura y qué el área de un bucle presión-volumen?', r: 'La anchura es el volumen sistólico (VTD − VTS); el área es el trabajo externo del ventrículo.' },
    { nivel: 1, q: '¿Qué es el efecto lusitrópico y qué proteína lo media en la vía β?', r: 'Es la aceleración de la relajación. La PKA fosforila el fosfolambano, liberando su inhibición sobre la SERCA2a, que recaptura calcio hacia el retículo sarcoplásmico más rápidamente.' },
    { nivel: 2, q: '¿Cómo distingues en un bucle presión-volumen un aumento de precarga de un aumento de contractilidad?', r: 'El aumento de precarga desplaza el bucle a la derecha y lo ensancha, pero el punto telesistólico permanece sobre la misma recta RPVTS. El aumento de contractilidad rota esa recta hacia arriba y a la izquierda, y el VTS disminuye.' },
    { nivel: 2, q: '¿Por qué un paciente acidótico responde mal a la noradrenalina?', r: 'Porque los protones compiten con el calcio por la troponina C, reduciendo la sensibilidad del aparato contráctil, y además la acidosis reduce la afinidad y el acoplamiento de los receptores adrenérgicos. Corregir la causa de la acidosis suele ser más eficaz que subir la dosis.' },
    { nivel: 2, q: '¿Por qué el strain longitudinal detecta disfunción antes que la fracción de eyección?', r: 'Porque las fibras longitudinales subendocárdicas son las más vulnerables (mayor tensión parietal y peor perfusión) y se alteran primero. La FE, que depende sobre todo del engrosamiento circunferencial, se mantiene compensada hasta fases más avanzadas.' },
    { nivel: 3, q: 'Paciente en shock: PA 78/50, extremidades frías, PVC 18 mmHg, ecografía con FE del 20 % y VI dilatado. ¿Qué determinante está alterado y qué esperas del bucle presión-volumen?', r: 'Shock cardiogénico por fallo de contractilidad. El bucle sería estrecho (VS bajo), desplazado a la derecha (VTD alto), con VTS muy elevado y una RPVTS aplanada (Ees baja). La PVC alta refleja congestión retrógrada, no hipovolemia: dar volumen empeoraría la congestión sin ganar VS porque está en la meseta de su curva de Starling. El tratamiento fisiológico es inotropía y reducción de carga, no fluidos.' },
    { nivel: 3, q: 'Un paciente séptico tiene FE del 30 % pero gasto cardíaco de 7 L/min. ¿Cómo es posible y qué implica?', r: 'La sepsis produce vasodilatación intensa, de modo que la poscarga es muy baja: el ventrículo eyecta contra poca resistencia. Aunque su contractilidad está deprimida (miocardiopatía séptica) y la FE es baja, el volumen sistólico se mantiene por descarga y el gasto es alto también por la taquicardia. Implica que la FE aquí está midiendo sobre todo la carga y que la depresión miocárdica quedará al descubierto cuando se restaure la resistencia con vasopresores: es el momento en que puede hacer falta añadir un inotrópico.' }
  ],

  caso: {
    vineta: 'Varón de 61 años, 6 horas de dolor torácico, ahora con disnea. PA 82/58, FC 112, extremidades frías, crepitantes bilaterales, oliguria. ECG con elevación del ST en cara anterior extensa. Ecografía: acinesia anteroseptal amplia, FE 22 %, VI no dilatado.',
    pasos: [
      { q: '¿Cuál de los cuatro determinantes falló primero y por qué?', pista: 'El evento inicial es coronario.', r: 'La contractilidad. La oclusión coronaria produce isquemia, y la pérdida de contracción es el <b>primer</b> evento de la cascada isquémica: ocurre en segundos, antes de los cambios del ECG y antes del dolor, porque sin ATP falla inmediatamente el ciclo de puentes cruzados y el manejo del calcio.' },
      { q: 'Su ventrículo NO está dilatado pese a la FE del 22 %. ¿Qué te dice eso?', pista: 'Compara con la miocardiopatía dilatada crónica.', r: 'Que el daño es <b>agudo</b>: no ha habido tiempo para el remodelado excéntrico. Y tiene una implicación grave: sin dilatación no puede reclutar Frank-Starling para compensar, y con un VTD normal una FE del 22 % significa un volumen sistólico realmente pequeño. La dilatación crónica, paradójicamente, protege a corto plazo.' },
      { q: '¿Por qué está frío y congestivo al mismo tiempo?', pista: 'Anterógrado y retrógrado.', r: 'Anterógradamente el gasto es insuficiente: hipoperfusión, frialdad por vasoconstricción compensadora, oliguria. Retrógradamente, el ventrículo que no vacía acumula volumen residual y eleva la presión telediastólica, que se transmite a la aurícula izquierda y al capilar pulmonar: crepitantes. Es el perfil "frío y húmedo".' },
      { q: 'Un compañero propone un bolo de 500 mL "por la hipotensión". ¿Qué esperarías?', pista: '¿En qué parte de la curva de Starling está?', r: 'Empeoramiento. Su curva de función ventricular está deprimida y aplanada: ya opera cerca de la meseta, así que el volumen añadido apenas aumentará el VS pero elevará mucho la presión de llenado y agravará el edema. Además, la dilatación resultante aumentaría el radio y, por Laplace, la tensión parietal y el consumo de oxígeno de un miocardio ya isquémico.' },
      { q: '¿Por qué la hipotensión agrava directamente la isquemia?', pista: 'Piensa en el gradiente de perfusión coronaria.', r: 'Porque el flujo coronario izquierdo depende del gradiente entre la presión diastólica aórtica y la presión telediastólica del VI. Aquí la primera cae y la segunda sube: el gradiente se estrecha por ambos lados. Menos perfusión → más isquemia → menos contractilidad → más hipotensión y más presión de llenado. Es la espiral del shock cardiogénico, y explica por qué la prioridad absoluta es la reperfusión.' },
      { q: '¿Qué papel tiene un balón de contrapulsación intraaórtico en esta fisiología?', pista: 'Actúa en dos momentos del ciclo.', r: 'Se infla en diástole, aumentando la presión diastólica aórtica y por tanto la perfusión coronaria; y se desinfla justo antes de la sístole, reduciendo la presión contra la que el ventrículo debe abrir la aórtica, es decir, la poscarga. Mejora simultáneamente el aporte y reduce la demanda, sin aumentar el consumo de oxígeno como haría un inotrópico. Su beneficio en mortalidad no se ha demostrado, pero la lógica fisiológica es impecable y es la mejor ilustración de cómo pensar en términos de aporte-demanda.' }
    ],
    cierre: 'El shock cardiogénico es contractilidad fallida que se autoalimenta a través de la perfusión coronaria. Todo el tratamiento se ordena preguntando: ¿esto aumenta el aporte de oxígeno o la demanda?'
  },

  tarjetas: [
    { f: 'Definición de contractilidad', d: 'Capacidad intrínseca del miocardio de generar fuerza PARA UNA PRECARGA Y POSCARGA DADAS. Su base celular es el Ca²⁺ disponible y la sensibilidad del aparato contráctil.' },
    { f: 'Índice de contractilidad independiente de la carga', d: 'Ees: la pendiente de la relación presión-volumen telesistólica (RPVTS). La FE no lo es (depende de precarga y poscarga); dP/dt máx es intermedia (independiente de poscarga, sensible a precarga).' },
    { f: 'En el bucle P-V, ¿cómo se ve un aumento de contractilidad?', d: 'La recta telesistólica ROTA hacia arriba y a la izquierda; el VTS disminuye. La carga mueve el punto SOBRE la recta; el inotropismo mueve la RECTA.' },
    { f: 'Vía β₁ hasta la contracción', d: 'Agonista → Gs → adenilato ciclasa → ↑AMPc → PKA → fosforila canales de Ca²⁺ tipo L, fosfolambano (libera SERCA → efecto lusitrópico) y troponina I. Contracción más fuerte, rápida y breve.' },
    { f: '¿Por qué los betabloqueantes mejoran la supervivencia en IC y los inotrópicos no?', d: 'La estimulación simpática crónica es tóxica: sobrecarga de Ca²⁺, apoptosis, arritmias, desensibilización β. El betabloqueo resensibiliza receptores, ↓MVO₂, frena el remodelado y alarga la diástole. Los inotrópicos mejoran la hemodinámica y aumentan la mortalidad.' },
    { f: '¿Por qué la acidosis deprime la contractilidad?', d: 'Los H⁺ compiten con el Ca²⁺ por la troponina C y reducen la respuesta a catecolaminas. Un paciente acidótico responde mal a los vasoactivos: corrige la causa.' },
    { f: 'Primer evento de la cascada isquémica', d: 'La disfunción contráctil (diastólica y luego sistólica), ANTES que los cambios del ECG y antes del dolor. Base de la ecocardiografía de estrés.' }
  ]
},

/* ---------------------------------------------------------- */
{
  id: 'retorno-venoso',
  modulo: 'hemodinamia',
  nombre: 'Retorno venoso y curvas de Guyton',
  alto: true,
  minutos: 22,
  requisitos: ['precarga-starling'],
  ideaCentral: 'El corazón no decide cuánta sangre bombea: en gran medida bombea lo que le llega. El retorno venoso depende del gradiente entre la presión sistémica media de llenado y la presión auricular derecha, y el punto de trabajo real del sistema es la intersección entre la curva de función cardíaca y la de retorno venoso. Entender esa intersección permite predecir qué hará cualquier intervención hemodinámica.',

  anclaje: {
    q: 'Sin mirar: si el corazón bombea más fuerte, ¿qué le pasa a la presión de la aurícula derecha y por qué eso aumenta el retorno venoso?',
    pista: 'El retorno venoso es un flujo impulsado por un gradiente de presión. ¿Cuáles son sus dos extremos?'
  },

  bloques: [
    {
      nivel: 'imprescindible',
      titulo: 'La presión sistémica media de llenado',
      html: '<p>Si el corazón se detuviera y la sangre se redistribuyera, todo el sistema quedaría a una única presión: la <b>presión sistémica media de llenado (Psm)</b>, de unos 7 mmHg. Es la presión que refleja cuán "lleno" está el continente vascular y depende de dos cosas:</p>' +
        '<ul><li>El <b>volumen sanguíneo</b> (numerador).</li>' +
        '<li>La <b>capacitancia venosa</b> (denominador). Las venas contienen el 70 % del volumen sanguíneo y son el reservorio del sistema.</li></ul>' +
        '<p>Aquí aparece un concepto que ordena toda la reanimación: del volumen venoso, una parte es <b>volumen no estresado</b> (el que llena el continente sin generar presión) y otra es <b>volumen estresado</b> (el que distiende la pared y genera la Psm). La venoconstricción convierte volumen no estresado en estresado: <b>aumenta la Psm sin añadir un solo mililitro de sangre</b>. Eso hace la noradrenalina, y por eso mejora el retorno venoso además de la presión arterial.</p>'
    },
    {
      nivel: 'imprescindible',
      titulo: 'La ecuación del retorno venoso',
      html: '<p style="text-align:center"><code>RV = (Psm − PAD) / Resistencia al retorno venoso</code></p>' +
        '<p>Tres consecuencias que hay que tener automatizadas:</p>' +
        '<ol><li><b>Si sube la presión auricular derecha, el retorno venoso cae.</b> Es contraintuitivo, pero la PAD es la presión de <i>salida</i> del circuito venoso: cuanto más alta, menor gradiente. Este es el mecanismo del taponamiento cardíaco y del fallo del ventrículo derecho.</li>' +
        '<li>Si sube la Psm (volumen o venoconstricción), el retorno venoso aumenta a cualquier PAD dada: la curva se desplaza hacia arriba y a la derecha.</li>' +
        '<li>Cuando la PAD se hace negativa, el retorno venoso <b>deja de aumentar</b> (meseta): las venas cavas se colapsan al entrar en el tórax. Es un límite de seguridad mecánico.</li></ol>',
      cadena: ['↑ Volumen o venoconstricción', '↑ Psm', '↑ Gradiente (Psm − PAD)', '↑ Retorno venoso', '↑ Precarga', '↑ Gasto cardíaco']
    },
    {
      nivel: 'importante',
      titulo: 'La intersección de Guyton',
      html: '<p>Superpón dos curvas en el mismo gráfico, con la <b>presión auricular derecha en el eje X</b>:</p>' +
        '<ul><li><b>Curva de función cardíaca</b> (Frank-Starling): a más PAD, más gasto. <b>Pendiente positiva</b>.</li>' +
        '<li><b>Curva de retorno venoso</b>: a más PAD, menos retorno. <b>Pendiente negativa</b>.</li></ul>' +
        '<p>Solo un punto satisface ambas: su <b>intersección</b>, que define simultáneamente el gasto cardíaco y la presión auricular derecha reales del paciente. En estado estacionario el gasto cardíaco <i>es</i> el retorno venoso; no pueden diferir.</p>' +
        '<p>Predicciones inmediatas:</p>' +
        '<table><tr><th>Intervención</th><th>Curva que se mueve</th><th>GC</th><th>PAD</th></tr>' +
        '<tr><td>Volumen / venoconstricción</td><td>Retorno venoso, arriba-derecha</td><td>↑</td><td>↑</td></tr>' +
        '<tr><td>Inotrópico</td><td>Función cardíaca, hacia arriba</td><td>↑</td><td><b>↓</b></td></tr>' +
        '<tr><td>Fallo cardíaco</td><td>Función cardíaca, hacia abajo</td><td>↓</td><td>↑</td></tr>' +
        '<tr><td>Hemorragia</td><td>Retorno venoso, abajo-izquierda</td><td>↓</td><td>↓</td></tr></table>' +
        '<p>🔥 Fíjate en la fila del inotrópico: sube el gasto y <b>baja</b> la PVC. La combinación "gasto alto con PVC baja" es la firma de un corazón que funciona bien, y "gasto bajo con PVC alta" la de un corazón que falla. Un solo par de números permite ubicar al paciente.</p>'
    },
    {
      nivel: 'complementario',
      titulo: 'Bombas auxiliares y el efecto de la ventilación',
      html: '<p>El retorno venoso se ayuda de tres bombas: la <b>muscular</b> (con válvulas venosas unidireccionales), la <b>respiratoria</b> (la inspiración espontánea genera presión intratorácica negativa que succiona sangre hacia el tórax) y la <b>propia contracción cardíaca</b> (el descenso del plano valvular en sístole expande la aurícula).</p>' +
        '<p>La ventilación mecánica con presión positiva <b>invierte</b> la bomba respiratoria: durante la insuflación, la presión intratorácica positiva reduce el gradiente de retorno venoso. Este es el mecanismo de la hipotensión tras intubar a un paciente hipovolémico, y también la base de la variación de la presión de pulso como predictor de respuesta a fluidos: si el paciente está en la zona empinada de Starling, la oscilación cíclica del retorno venoso se traduce en una oscilación grande del volumen sistólico.</p>' +
        '<p>Ejemplo clásico de la ecuación en acción: en una <b>fístula arteriovenosa</b> grande cae la resistencia al retorno venoso, aumentan el retorno y el gasto, y con el tiempo puede desarrollarse insuficiencia cardíaca de <b>alto gasto</b>. Lo mismo ocurre en el beriberi, la anemia severa, la sepsis, el hipertiroidismo y el embarazo.</p>'
    }
  ],

  variables: [
    { n: 'Presión sistémica media de llenado', d: 'up', nota: 'volumen y venoconstricción la elevan' },
    { n: 'Presión auricular derecha', d: 'down', nota: 'bajarla aumenta el gradiente y el retorno' },
    { n: 'Volumen estresado', d: 'up', nota: 'lo que realmente genera presión de llenado' },
    { n: 'Retorno venoso', d: 'up', nota: 'en estado estacionario = gasto cardíaco' }
  ],

  fisiopatologia: '<p><b>Fallos del retorno venoso por bajo gradiente proximal (↓Psm):</b> hemorragia, deshidratación, y —muy importante— la <b>vasodilatación venosa</b> de la sepsis, la anestesia o la anafilaxia, donde el volumen total es normal pero se ha desplazado al compartimento no estresado. El paciente está "vacío" sin haber perdido sangre.</p>' +
    '<p><b>Fallos por presión de salida elevada (↑PAD):</b> taponamiento cardíaco, neumotórax a tensión, PEEP alta, fallo del ventrículo derecho, tromboembolismo pulmonar masivo, pericarditis constrictiva. Aquí la clave semiológica es la <b>ingurgitación yugular con hipotensión</b>: la sangre no puede entrar al tórax.</p>' +
    '<p><b>Fallos por obstrucción mecánica:</b> compresión de la cava por útero grávido (síndrome de hipotensión supina, que se corrige con decúbito lateral izquierdo), síndrome compartimental abdominal, trombosis de cava.</p>',

  clinica: '<p>La ecografía a pie de cama traduce esta fisiología: una <b>vena cava inferior pequeña y muy colapsable</b> sugiere Psm baja (responderá a volumen); una <b>cava dilatada y sin variación respiratoria</b> indica PAD alta y advierte contra el volumen, obligando a buscar la causa (fallo del VD, taponamiento, hipertensión pulmonar, PEEP).</p>' +
    '<p>Aplicación práctica del "volumen no estresado": la noradrenalina en el shock séptico no solo sube la presión por vasoconstricción arteriolar; también <b>venoconstriñe</b>, recluta volumen no estresado hacia el compartimento estresado, sube la Psm y con ello el retorno venoso y el gasto. Ese es el motivo fisiológico de iniciarla precozmente en lugar de perseguir la presión solo con litros de cristaloides.</p>',

  error: {
    confunde: 'Creer que el corazón determina el gasto cardíaco y que la PVC alta indica buen retorno venoso.',
    parecido: 'La intuición dice que la bomba manda sobre el flujo, como en un circuito hidráulico con una bomba potente. Y como la sangre "vuelve" a la aurícula, parece lógico que más presión allí signifique más flujo.',
    diferencia: 'En condiciones normales el corazón es <b>permisivo</b>: bombea lo que le llega, y el retorno venoso lo determina la periferia (Psm y resistencias). Y la PAD es la <b>presión de salida</b> del circuito venoso: elevarla <i>reduce</i> el gradiente y por tanto el retorno. Una PVC alta suele significar que el corazón no está drenando bien lo que le llega, no que llegue mucho.',
    ejemplo: 'Taponamiento cardíaco: PVC de 22 mmHg con gasto cardíaco desplomado. La presión de llenado es altísima y el retorno venoso mínimo, precisamente porque la presión de salida está elevada. Dar volumen ayuda algo (sube la Psm y recupera gradiente) pero solo como puente hasta drenar el pericardio.',
    regla: 'La PVC no mide "cuánta sangre hay", mide <b>cuánta dificultad tiene la sangre para entrar al corazón</b>. Interprétala siempre junto al gasto: bajo+alta = fallo de bomba u obstrucción; alto+baja = corazón sano.'
  },

  perla: '🔥 Un inotrópico eficaz <b>sube el gasto y baja la PVC</b>; el volumen sube ambos. Si tras una intervención el gasto sube y la PVC también, has movido la curva de retorno venoso (has dado volumen o venoconstricción); si el gasto sube y la PVC baja, has movido la curva cardíaca.',

  feynman: {
    consigna: 'Explica por qué un paciente hipovolémico puede desplomarse justo después de ser intubado y conectado a ventilación mecánica.',
    puntos: [
      'Nombro la ecuación RV = (Psm − PAD)/RRV',
      'Explico que la inspiración espontánea genera presión intratorácica negativa que ayuda al retorno',
      'Explico que la presión positiva invierte ese efecto y eleva la PAD',
      'Menciono que la hipovolemia significa Psm baja y por tanto poco margen de gradiente',
      'Añado los otros factores: sedación (venodilatación), pérdida del tono simpático, hiperinsuflación'
    ],
    referencia: '<p>El retorno venoso depende del gradiente <code>(Psm − PAD)</code>. En un paciente hipovolémico la Psm ya es baja, de modo que el gradiente es estrecho y cualquier ascenso de la presión auricular derecha lo consume por completo.</p>' +
      '<p>En respiración espontánea, la inspiración crea una presión intratorácica <b>negativa</b> que succiona sangre hacia el tórax: la bomba respiratoria es un aliado del retorno. Al conectar la ventilación mecánica se invierte el signo: la insuflación genera presión intratorácica <b>positiva</b>, que se transmite a la aurícula derecha, eleva la PAD y estrecha aún más el gradiente. Con la PEEP el efecto es continuo, no solo inspiratorio.</p>' +
      '<p>A eso se suman tres golpes simultáneos. Los <b>fármacos de inducción</b> (propofol, opiáceos, benzodiacepinas) producen venodilatación, es decir, desplazan volumen estresado a no estresado y bajan la Psm justo cuando más falta hace. La <b>abolición del tono simpático</b> retira la vasoconstricción compensadora que estaba sosteniendo la presión —recuerda que un paciente en shock compensado vive de esa compensación—. Y si aparece <b>hiperinsuflación dinámica</b> (auto-PEEP), la PAD sube todavía más.</p>' +
      '<p>Resultado: cae el retorno venoso, cae la precarga, cae el volumen sistólico y cae la presión, a veces hasta la parada cardíaca (el "colapso peri-intubación"). La prevención es puramente fisiológica: optimizar la volemia antes de inducir, elegir fármacos hemodinámicamente estables, tener vasopresor preparado, ventilar con volúmenes y presiones bajas y evitar la hiperventilación con bolsa tras la intubación.</p>'
  },

  preguntas: [
    { nivel: 1, q: '¿Qué es la presión sistémica media de llenado y de qué depende?', r: 'Es la presión que existiría en todo el sistema circulatorio si el corazón se detuviera y la sangre se redistribuyera (≈7 mmHg). Depende del volumen sanguíneo y de la capacitancia venosa (tono venoso).' },
    { nivel: 1, q: 'Escribe la ecuación del retorno venoso.', r: 'RV = (Psm − PAD)/Resistencia al retorno venoso. Es un flujo impulsado por el gradiente entre la presión de llenado del sistema y la presión de la aurícula derecha.' },
    { nivel: 1, q: '¿Qué porcentaje del volumen sanguíneo está en el sistema venoso y por qué importa?', r: 'Alrededor del 70 %. Importa porque las venas son el reservorio: la venoconstricción puede movilizar ese volumen hacia la circulación efectiva sin necesidad de transfundir.' },
    { nivel: 2, q: 'Distingue volumen estresado y no estresado, y explica cómo actúa la noradrenalina sobre ellos.', r: 'El no estresado llena el continente vascular sin generar presión; el estresado distiende la pared y genera la Psm. La noradrenalina venoconstriñe y convierte volumen no estresado en estresado: sube la Psm y el retorno venoso sin añadir volumen. Por eso mejora el gasto, no solo la presión.' },
    { nivel: 2, q: 'En el diagrama de Guyton, ¿qué le ocurre a la PAD cuando administras un inotrópico y por qué?', r: 'Baja. El inotrópico desplaza la curva de función cardíaca hacia arriba: el corazón vacía mejor la aurícula, la PAD desciende y, al ampliarse el gradiente (Psm − PAD), el retorno venoso aumenta. Sube el gasto y baja la PVC simultáneamente.' },
    { nivel: 2, q: '¿Por qué el retorno venoso alcanza una meseta cuando la PAD se hace negativa?', r: 'Porque las venas cavas se colapsan al entrar en el tórax al hacerse la presión extraluminal mayor que la intraluminal. Es un limitador mecánico de seguridad: por más que baje la PAD, el flujo no aumenta.' },
    { nivel: 3, q: 'Paciente con taponamiento cardíaco: PVC 22, PA 80/64, gasto bajo. ¿Por qué dar volumen ayuda temporalmente si la presión de llenado ya es altísima?', r: 'Porque el problema es la presión de <b>salida</b>: el pericardio a tensión eleva la PAD y anula el gradiente de retorno venoso. Aumentar la Psm con volumen recupera parte de ese gradiente y sostiene transitoriamente el llenado. Es un puente, no un tratamiento: la solución es drenar el pericardio. Y explica por qué en el taponamiento son deletéreos los vasodilatadores y los diuréticos, que bajan la Psm y colapsan el gradiente.' },
    { nivel: 3, q: 'Mujer embarazada a término, en decúbito supino, con hipotensión y taquicardia que se resuelve al girarla. Explica el mecanismo con la ecuación del retorno venoso.', r: 'El útero grávido comprime la vena cava inferior en decúbito supino, aumentando drásticamente la <b>resistencia al retorno venoso</b>. Aunque la Psm y la PAD sean normales, el flujo cae porque el denominador de la ecuación se dispara: ↓retorno venoso → ↓precarga → ↓VS → ↓GC → hipotensión, con taquicardia compensadora. El decúbito lateral izquierdo libera la cava y el retorno se normaliza de inmediato. Es también la razón de desplazar el útero durante la reanimación de una embarazada.' }
  ],

  caso: {
    vineta: 'Varón de 34 años con disnea súbita y síncope. PA 84/56, FC 128, saturación 89 %, ingurgitación yugular marcada, campos pulmonares limpios. Ecografía: ventrículo derecho dilatado e hipocontráctil, ventrículo izquierdo pequeño e hiperdinámico, vena cava inferior dilatada sin colapso.',
    pasos: [
      { q: 'Yugulares ingurgitadas con pulmones limpios e hipotensión. ¿Qué categoría de shock es?', pista: 'Congestión venosa sistémica sin congestión pulmonar.', r: 'Obstructivo. La congestión está aguas arriba del ventrículo derecho, y el pulmón está limpio porque el problema no ha alcanzado al lado izquierdo por vía congestiva: al VI simplemente le llega poco. El cuadro sugiere un tromboembolismo pulmonar masivo.' },
      { q: '¿Por qué el VI está pequeño e hiperdinámico?', pista: '¿Qué determina cuánto se llena el VI?', r: 'Porque recibe muy poco: el VD no logra atravesar la resistencia pulmonar y el gasto que llega a la aurícula izquierda es mínimo. El VI está infrallenado (precarga baja) y su hipercontractilidad es la respuesta simpática. Es un ventrículo izquierdo sano trabajando en vacío.' },
      { q: '¿Cómo explica la ecuación del retorno venoso la ingurgitación yugular?', pista: 'Presión de salida.', r: 'El VD fallido eleva la presión auricular derecha, que es el término de salida del circuito venoso. El gradiente (Psm − PAD) se estrecha, el retorno venoso cae y la sangre se remansa aguas arriba: yugulares ingurgitadas, cava dilatada sin colapso, hepatomegalia. Congestión sistémica y gasto bajo por el mismo mecanismo.' },
      { q: 'Añade la interdependencia ventricular: ¿por qué empeora aún más el llenado del VI?', pista: 'Los dos ventrículos comparten tabique y pericardio.', r: 'El VD dilatado desplaza el tabique interventricular hacia la izquierda y, al estar contenido en un pericardio poco distensible, compite por el espacio con el VI. El VI se llena peor no solo por recibir menos sangre, sino porque está <b>mecánicamente comprimido</b>. Es el mismo principio que hace que un VD sobrecargado adopte la forma en "D" en el eje corto.' },
      { q: '¿Qué esperarías de un bolo generoso de volumen en este paciente?', pista: 'Cuidado: la intuición ("está hipotenso, dale volumen") falla aquí.', r: 'Probablemente empeoraría. Un VD ya dilatado y con la pared tensa responde a más volumen distendiéndose más, lo que agrava el desplazamiento septal, empeora el llenado del VI y aumenta la tensión parietal del VD, comprometiendo su propia perfusión coronaria. En el fallo agudo del VD, los bolos deben ser pequeños y guiados; a menudo lo que se necesita es vasopresor para mantener la perfusión coronaria derecha y tratamiento de la obstrucción.' },
      { q: '¿Por qué la hipotensión es especialmente peligrosa para el ventrículo derecho?', pista: '¿En qué fase del ciclo se perfunde el VD?', r: 'En condiciones normales el VD se perfunde en sístole y en diástole, porque su presión intracavitaria es baja. Cuando se sobrecarga y su presión sistólica se acerca a la aórtica, la perfusión sistólica desaparece y pasa a depender solo de la diástole, igual que el VI. Si además cae la presión aórtica, el gradiente de perfusión coronaria derecha se colapsa: aparece isquemia del VD, que reduce su contractilidad, aumenta su dilatación y cierra la <b>espiral de la muerte del VD</b>. De ahí que el vasopresor sea a menudo la intervención que salva tiempo mientras se resuelve la obstrucción.' }
    ],
    cierre: 'El fallo del ventrículo derecho invierte todas las intuiciones aprendidas con el ventrículo izquierdo: más volumen puede ser peor, la hipotensión mata por isquemia del propio VD, y la congestión coexiste con un ventrículo izquierdo vacío.'
  },

  tarjetas: [
    { f: 'Ecuación del retorno venoso', d: 'RV = (Psm − PAD)/RRV. Psm = presión sistémica media de llenado (≈7 mmHg), determinada por volumen y tono venoso. Subir la PAD REDUCE el retorno.' },
    { f: 'Volumen estresado vs no estresado', d: 'No estresado = llena el continente sin generar presión. Estresado = distiende la pared y genera la Psm. La venoconstricción (noradrenalina) convierte no estresado en estresado: ↑Psm y ↑retorno sin transfundir.' },
    { f: 'Diagrama de Guyton: efecto de un inotrópico', d: 'Desplaza la curva cardíaca hacia arriba → ↑gasto y ↓PAD simultáneamente. El volumen, en cambio, sube ambos. "Gasto alto + PVC baja" = corazón que funciona.' },
    { f: '¿Por qué el retorno venoso se estanca con PAD negativa?', d: 'Las venas cavas se colapsan al entrar al tórax cuando la presión extraluminal supera la intraluminal. Limitador mecánico: por más que baje la PAD, el flujo no aumenta.' },
    { f: 'Colapso hemodinámico peri-intubación: mecanismo', d: 'Presión positiva ↑PAD y anula la bomba respiratoria; sedación venodilata (↓Psm); se pierde el tono simpático compensador; auto-PEEP. Todo estrecha el gradiente (Psm − PAD) en un paciente que ya lo tenía justo.' },
    { f: 'Ingurgitación yugular + hipotensión + pulmones limpios', d: 'Shock obstructivo o fallo del VD: la presión de salida (PAD) elevada bloquea el retorno venoso. Piensa en TEP, taponamiento, neumotórax a tensión, infarto del VD.' },
    { f: 'Espiral de la muerte del ventrículo derecho', d: 'Sobrecarga → dilatación → desplazamiento septal y ↓llenado del VI → ↓gasto y ↓presión aórtica → ↓perfusión coronaria derecha → isquemia del VD → más dilatación. Se rompe con vasopresor y resolviendo la obstrucción, no con volumen.' }
  ]
},

/* ---------------------------------------------------------- */
{
  id: 'ejercicio',
  modulo: 'hemodinamia',
  nombre: 'Fisiología cardiovascular del ejercicio',
  alto: false,
  minutos: 18,
  requisitos: ['gasto-cardiaco', 'retorno-venoso'],
  ideaCentral: 'El ejercicio es el mejor laboratorio de fisiología integrada: el gasto cardíaco puede quintuplicarse mientras la presión arterial media apenas sube, porque el aumento del flujo se acompaña de una caída de la resistencia sistémica. Comprender cómo se coordinan el comando central, el metaborreflejo y la vasodilatación metabólica explica también por qué el paciente con reserva limitada se descompensa al esforzarse.',

  anclaje: {
    q: 'Sin mirar: durante el ejercicio dinámico intenso el gasto cardíaco se multiplica por 5, pero la presión arterial media sube solo un 10–20 %. ¿Cómo es posible si PA = GC × RVS?',
    pista: 'Si el producto casi no cambia y un factor se quintuplica, ¿qué hizo el otro?'
  },

  bloques: [
    {
      nivel: 'imprescindible',
      titulo: 'La respuesta integrada',
      html: '<p>En el ejercicio dinámico máximo:</p>' +
        '<ul><li><b>Gasto cardíaco</b>: de 5 a 20–25 L/min (más en atletas de élite, hasta 35–40).</li>' +
        '<li><b>Frecuencia cardíaca</b>: es el principal contribuyente, hasta ~3 veces. Primero por <b>retirada vagal</b> (los primeros ~100 lpm) y después por activación simpática.</li>' +
        '<li><b>Volumen sistólico</b>: aumenta un 30–50 %, por más contractilidad, mejor llenado gracias a las bombas muscular y respiratoria, y menor poscarga.</li>' +
        '<li><b>Resistencia vascular sistémica</b>: <b>cae</b> drásticamente por vasodilatación metabólica en el músculo activo.</li>' +
        '<li><b>Diferencia arteriovenosa de O₂</b>: se triplica (de ~5 a ~15 mL/dL) por mayor extracción tisular.</li></ul>' +
        '<p>La ecuación que lo une todo es la de Fick: <code>VO₂ = GC × (CaO₂ − CvO₂)</code>. El consumo máximo de oxígeno puede aumentar 15–20 veces porque se multiplican <b>ambos</b> factores.</p>'
    },
    {
      nivel: 'imprescindible',
      titulo: 'Por qué la presión arterial casi no sube',
      html: '<p>Como <code>PAM = GC × RVS</code>, un gasto quintuplicado con presión casi estable exige que la RVS caiga a una quinta parte. Y eso ocurre: la vasodilatación de los lechos musculares activos, que reciben hasta el 80–85 % del gasto (frente al 20 % en reposo), reduce la resistencia total del circuito.</p>' +
        '<p>El patrón típico es: <b>presión sistólica sube</b> (por el gran volumen sistólico eyectado rápidamente), <b>presión diastólica se mantiene o baja ligeramente</b> (por la vasodilatación) y por tanto la <b>presión de pulso se amplía</b> mucho.</p>' +
        '<p>🔥 Una <b>caída de la presión sistólica durante el esfuerzo</b> es una respuesta patológica y un criterio de detención de la prueba de esfuerzo: significa que el gasto cardíaco no puede aumentar para compensar la vasodilatación periférica (isquemia extensa, estenosis aórtica severa, miocardiopatía).</p>',
      cadena: ['Ejercicio', '↑ Metabolitos locales', 'Vasodilatación muscular', '↓ RVS', 'PAM estable pese a ↑↑ GC']
    },
    {
      nivel: 'importante',
      titulo: 'Los tres controladores',
      html: '<ol><li><b>Comando central</b>: la corteza motora activa simultáneamente el músculo y los centros cardiovasculares. Es <i>anticipatorio</i>: la frecuencia empieza a subir antes del primer movimiento, y también antes en quien solo imagina el esfuerzo.</li>' +
        '<li><b>Reflejo presor del ejercicio (metaborreflejo y mecanorreflejo)</b>: receptores musculares tipo III y IV detectan metabolitos y tensión, y aumentan la descarga simpática. Es un sistema de retroalimentación que ajusta la respuesta a la demanda real.</li>' +
        '<li><b>Vasodilatación metabólica local</b>: adenosina, K⁺, H⁺, CO₂, hiperosmolaridad, óxido nítrico y prostaglandinas dilatan las arteriolas del músculo activo. Esta dilatación local <b>vence</b> a la vasoconstricción simpática generalizada, un fenómeno llamado <i>simpatólisis funcional</i>. Por eso el músculo que trabaja se dilata mientras el intestino y el riñón se constriñen, aunque ambos reciben la misma señal simpática.</li></ol>' +
        '<p>El barorreflejo no se apaga durante el ejercicio: se <b>reajusta</b> a un punto de operación más alto, de modo que sigue defendiendo la presión pero alrededor de un valor superior.</p>'
    },
    {
      nivel: 'complementario',
      titulo: 'Ejercicio isométrico y adaptación crónica',
      html: '<p>El ejercicio <b>isométrico</b> (levantar peso) se comporta al revés: la contracción mantenida comprime los vasos musculares y no permite la vasodilatación de flujo, de modo que la RVS <b>sube</b> y con ella la presión arterial, a veces de forma extrema. Es una sobrecarga fundamentalmente de <b>presión</b> para el ventrículo, y por eso genera hipertrofia concéntrica, mientras que el ejercicio dinámico —sobrecarga de volumen— genera hipertrofia excéntrica con dilatación ("corazón de atleta").</p>' +
        '<table><tr><th></th><th>Dinámico (correr, nadar)</th><th>Isométrico (pesas)</th></tr>' +
        '<tr><td>Sobrecarga</td><td>Volumen</td><td>Presión</td></tr>' +
        '<tr><td>RVS</td><td>↓↓</td><td>↑</td></tr>' +
        '<tr><td>Presión diastólica</td><td>= o ↓</td><td>↑↑</td></tr>' +
        '<tr><td>Remodelado</td><td>Excéntrico (dilatación)</td><td>Concéntrico (grosor)</td></tr></table>' +
        '<p><b>Entrenamiento crónico</b>: bradicardia de reposo (por aumento del tono vagal y menor frecuencia intrínseca), mayor volumen sistólico y mayor volumen telediastólico, mayor VO₂ máx, mayor densidad capilar y mitocondrial, y mejor sensibilidad barorrefleja. El gasto de reposo no cambia: simplemente se logra con menos latidos y más volumen por latido.</p>'
    }
  ],

  variables: [
    { n: 'Gasto cardíaco', d: 'up', nota: 'hasta 4–5 veces (más en atletas)' },
    { n: 'Resistencia vascular sistémica', d: 'down', nota: 'vasodilatación metabólica del músculo activo' },
    { n: 'Diferencia arteriovenosa de O₂', d: 'up', nota: 'se triplica por mayor extracción' },
    { n: 'Presión arterial media', d: 'up', nota: 'solo modestamente: 10–20 %' },
    { n: 'Presión de pulso', d: 'up', nota: '↑sistólica con diastólica estable o menor' }
  ],

  fisiopatologia: '<p>El ejercicio funciona como una <b>prueba de estrés fisiológica</b> que desenmascara limitaciones invisibles en reposo:</p>' +
    '<ul><li><b>Enfermedad coronaria</b>: la demanda sube (FC, contractilidad, tensión parietal) y la estenosis impide aumentar el aporte: angina.</li>' +
    '<li><b>Estenosis aórtica severa</b>: el gasto es fijo. Al vasodilatarse el músculo, la RVS cae y la presión no puede sostenerse: <b>síncope de esfuerzo</b>, uno de los tres síntomas cardinales junto con angina y disnea.</li>' +
    '<li><b>Insuficiencia cardíaca</b>: no puede aumentar el volumen sistólico ni la frecuencia (incompetencia cronotrópica); el gasto se queda corto y sube la presión de llenado: disnea de esfuerzo, el equivalente sintomático de una reserva agotada.</li>' +
    '<li><b>Miocardiopatía hipertrófica</b>: la vasodilatación reduce la poscarga y el aumento de contractilidad estrecha aún más el tracto de salida; la obstrucción dinámica <b>empeora</b> con el esfuerzo. Por eso el soplo aumenta con Valsalva y bipedestación, y por eso el riesgo de muerte súbita en jóvenes deportistas.</li></ul>',

  clinica: '<p>Para Diego, con acceso a pacientes reales, la aplicación directa es la <b>prueba de esfuerzo</b>: los criterios de detención son fisiológicos, no arbitrarios. Se detiene ante caída de la presión sistólica (fallo de la bomba para compensar la vasodilatación), arritmia ventricular compleja, descenso significativo del ST, angina progresiva o síntomas neurológicos.</p>' +
    '<p>La <b>recuperación de la frecuencia cardíaca</b> en el primer minuto tras el esfuerzo depende de la reactivación vagal; una caída menor de 12 lpm indica disfunción autonómica y es un marcador pronóstico independiente de mortalidad.</p>',

  error: {
    confunde: 'Pensar que la vasoconstricción simpática generalizada del ejercicio reduce también el flujo del músculo que trabaja.',
    parecido: 'El simpático se activa de forma global y libera noradrenalina sobre receptores α₁ presentes también en los vasos musculares.',
    diferencia: 'En el músculo activo, los metabolitos locales producen <b>simpatólisis funcional</b>: bloquean la señalización α-adrenérgica postsináptica, de modo que la dilatación metabólica prevalece. El simpático constriñe eficazmente los lechos <i>inactivos</i> (esplácnico, renal, músculo en reposo, piel al inicio) y esa redistribución es precisamente lo que permite llevar el 80 % del gasto al músculo que lo necesita.',
    ejemplo: 'Durante una carrera, el flujo renal cae hasta un 25 % del basal mientras el del cuádriceps se multiplica por 20. Misma señal simpática, respuestas opuestas, según haya o no metabolitos locales.',
    regla: 'El simpático propone y el metabolismo local dispone: donde hay trabajo, manda la señal metabólica.'
  },

  perla: '🔥 El síncope de esfuerzo en un paciente con soplo sistólico es estenosis aórtica severa hasta que se demuestre lo contrario, y su mecanismo es puro razonamiento hemodinámico: gasto fijo + caída de la RVS = hipotensión. La misma lógica ordena toda la fisiología del ejercicio.',

  feynman: {
    consigna: 'Explica por qué un paciente con estenosis aórtica severa se desmaya al subir escaleras pero está perfectamente en reposo.',
    puntos: [
      'Explico que la válvula estenótica fija el gasto cardíaco máximo',
      'Explico la vasodilatación metabólica del músculo y la caída de RVS',
      'Uso PA = GC × RVS para mostrar por qué cae la presión',
      'Menciono la hipoperfusión cerebral como causa del síncope',
      'Añado el componente de isquemia subendocárdica y posible arritmia'
    ],
    referencia: '<p>En reposo el paciente compensa: su ventrículo hipertrófico genera la presión necesaria para atravesar la válvula estrecha y mantiene un gasto normal de 5 L/min. Nada falla porque no se le pide nada.</p>' +
      '<p>Al subir escaleras, el músculo activo produce metabolitos que dilatan sus arteriolas y la <b>resistencia vascular sistémica cae</b> bruscamente. En una persona sana esto no baja la presión porque el gasto cardíaco se multiplica a la vez y compensa. Pero aquí el gasto está <b>fijado por una obstrucción mecánica</b>: por más que aumente la contractilidad y la frecuencia, el orificio valvular no deja pasar más flujo.</p>' +
      '<p>Aplicando <code>PA = GC × RVS</code>: si la RVS cae y el GC no puede subir, la presión arterial <b>desciende</b>. El flujo cerebral, que depende de la presión de perfusión una vez superado el límite inferior de la autorregulación, cae y aparece el síncope.</p>' +
      '<p>Hay dos agravantes simultáneos. Uno, la <b>isquemia subendocárdica</b>: el miocardio hipertrófico tiene mayor demanda y su perfusión, que ocurre en diástole y depende de la presión diastólica aórtica, empeora justo cuando la taquicardia acorta la diástole; esa isquemia deprime la contractilidad y agrava la hipotensión. Dos, la posibilidad de <b>arritmia ventricular</b> sobre un miocardio hipertrófico e isquémico.</p>' +
      '<p>Por eso la tríada clásica —angina, síncope y disnea de esfuerzo— marca el punto en que la estenosis aórtica pasa de ser un soplo a ser una indicación quirúrgica: la aparición de síntomas cambia radicalmente el pronóstico, con supervivencia media de 2–3 años sin intervención.</p>'
  },

  preguntas: [
    { nivel: 1, q: '¿Qué contribuye más al aumento del gasto cardíaco durante el ejercicio, la frecuencia o el volumen sistólico?', r: 'La frecuencia cardíaca (puede triplicarse), mientras que el volumen sistólico aumenta un 30–50 %. El VS además alcanza su meseta relativamente pronto en personas no entrenadas.' },
    { nivel: 1, q: '¿Qué mecanismo explica el aumento inicial de la frecuencia cardíaca al comenzar el ejercicio?', r: 'La retirada del tono vagal, que domina los primeros ~100 lpm. La activación simpática se hace responsable del ascenso posterior.' },
    { nivel: 1, q: '¿Qué le ocurre a la presión diastólica durante el ejercicio dinámico y por qué?', r: 'Se mantiene estable o desciende ligeramente, porque la vasodilatación del músculo activo reduce la resistencia vascular sistémica. La sistólica sube y la presión de pulso se amplía.' },
    { nivel: 2, q: 'Explica la simpatólisis funcional.', r: 'Los metabolitos locales del músculo activo inhiben la señalización α-adrenérgica postsináptica, permitiendo que la vasodilatación metabólica prevalezca sobre la vasoconstricción simpática generalizada. Así el flujo se redistribuye al músculo que trabaja mientras se constriñen los lechos inactivos.' },
    { nivel: 2, q: '¿Por qué el ejercicio isométrico produce hipertrofia concéntrica y el dinámico excéntrica?', r: 'El isométrico eleva la RVS y la presión arterial (sobrecarga de presión) → sarcómeros en paralelo → hipertrofia concéntrica. El dinámico aumenta el retorno venoso y el volumen manejado (sobrecarga de volumen) → sarcómeros en serie → dilatación con hipertrofia excéntrica.' },
    { nivel: 2, q: '¿Qué significa una recuperación de la frecuencia cardíaca menor de 12 lpm en el primer minuto tras el esfuerzo?', r: 'Reactivación vagal deficiente, es decir, disfunción autonómica. Es un marcador pronóstico independiente de mortalidad cardiovascular.' },
    { nivel: 3, q: 'Durante una prueba de esfuerzo, la presión sistólica de un paciente cae de 150 a 120 mmHg. ¿Qué significa y qué haces?', r: 'Es una respuesta patológica y criterio de detención inmediata. Significa que el gasto cardíaco no puede aumentar lo suficiente para compensar la vasodilatación muscular, es decir, hay una limitación grave del flujo: isquemia extensa (frecuentemente enfermedad de tronco o multivaso), estenosis aórtica severa o miocardiopatía. Se detiene la prueba y se estudia con urgencia.' },
    { nivel: 3, q: 'Un joven de 19 años sufre síncope al final de un partido. Soplo sistólico que AUMENTA al ponerse de pie y con Valsalva. ¿Qué mecanismo explica el aumento del soplo y el riesgo?', r: 'Miocardiopatía hipertrófica obstructiva. La bipedestación y el Valsalva reducen el retorno venoso y por tanto la precarga: con menos volumen, la cavidad ventricular es más pequeña, el tracto de salida se estrecha aún más y aumenta la obstrucción dinámica y el soplo (lo opuesto a la estenosis aórtica valvular, cuyo soplo disminuye al bajar el volumen eyectado). Durante el ejercicio se suman la vasodilatación (↓poscarga) y el aumento de contractilidad, ambos empeoran la obstrucción, y la taquicardia reduce el llenado. Añadido al sustrato de desorganización miocárdica y fibrosis, es la causa más frecuente de muerte súbita en deportistas jóvenes.' }
  ],

  caso: {
    vineta: 'Hombre de 58 años, sedentario, hipertenso. Refiere que desde hace 2 meses debe detenerse a mitad de la cuesta que sube a diario por "presión en el pecho" que cede al parar en 2–3 minutos. En reposo la exploración y el ECG son normales.',
    pasos: [
      { q: '¿Por qué el ECG en reposo es normal si tiene enfermedad coronaria?', pista: 'La isquemia aparece cuando la demanda supera al aporte.', r: 'Porque en reposo el flujo coronario basal es suficiente incluso con una estenosis del 70–80 %. La autorregulación coronaria dilata la microcirculación distal para mantener el flujo de reposo. La isquemia solo aparece cuando la demanda aumenta y la reserva vasodilatadora, ya consumida, no puede aportar más flujo.' },
      { q: '¿Qué tres variables aumentan su demanda de oxígeno al subir la cuesta?', pista: 'Los determinantes del MVO₂.', r: 'Frecuencia cardíaca, contractilidad y tensión parietal (que sube al elevarse la presión arterial durante el esfuerzo). Las tres se disparan simultáneamente, y como la frecuencia además acorta la diástole, se reduce el tiempo disponible para perfundir.' },
      { q: '¿Por qué el dolor cede al detenerse en 2–3 minutos?', pista: 'Reversibilidad del desequilibrio.', r: 'Porque al cesar el esfuerzo caen la frecuencia, la contractilidad y la presión, con lo que la demanda vuelve al nivel que el aporte disponible puede cubrir. El desequilibrio se corrige sin necrosis: es angina estable, isquemia reversible por demanda, no oclusión trombótica.' },
      { q: 'El paciente pregunta por qué debe hacer ejercicio si es justo lo que le provoca el dolor. ¿Qué le explicas?', pista: 'Piensa en la demanda para un mismo trabajo externo.', r: 'El entrenamiento reduce la frecuencia cardíaca y la presión arterial necesarias para realizar el mismo trabajo externo, es decir, <b>baja la demanda</b> a igual esfuerzo, retrasando el umbral de angina. Además mejora la función endotelial, la vasodilatación dependiente de óxido nítrico, el perfil metabólico y favorece circulación colateral. El ejercicio supervisado es tratamiento, no solo prevención.' },
      { q: 'Si su angina apareciera ahora en reposo y durara 20 minutos, ¿qué habría cambiado en el mecanismo?', pista: 'De demanda a aporte.', r: 'Habría pasado de un problema de <b>demanda</b> (estenosis fija más esfuerzo) a un problema de <b>aporte</b>: rotura o erosión de una placa con trombosis sobreañadida que reduce el flujo de forma aguda. Es el paso de angina estable a síndrome coronario agudo, y cambia por completo la urgencia y el tratamiento: antiagregación, anticoagulación y valoración de reperfusión.' }
    ],
    cierre: 'La angina de esfuerzo es la ecuación aporte-demanda expresada en un síntoma. Diego puede reconstruirla íntegramente a pie de cama preguntando qué aumentó la demanda y qué limita el aporte.'
  },

  tarjetas: [
    { f: '¿Por qué la PAM sube poco en el ejercicio si el GC se quintuplica?', d: 'Porque la RVS cae drásticamente por vasodilatación metabólica del músculo activo (recibe hasta el 80–85 % del gasto). PA = GC × RVS: un factor sube, el otro baja.' },
    { f: 'Simpatólisis funcional', d: 'Los metabolitos del músculo activo bloquean la señalización α-adrenérgica local, permitiendo vasodilatación pese a la descarga simpática global. Los lechos inactivos sí se constriñen: así se redistribuye el flujo.' },
    { f: 'Caída de la presión sistólica durante una prueba de esfuerzo', d: 'Respuesta patológica y criterio de detención: el gasto no puede aumentar para compensar la vasodilatación. Sugiere isquemia extensa (tronco/multivaso), estenosis aórtica severa o miocardiopatía.' },
    { f: 'Ejercicio dinámico vs isométrico: efecto sobre el ventrículo', d: 'Dinámico = sobrecarga de VOLUMEN → hipertrofia excéntrica, ↓RVS. Isométrico = sobrecarga de PRESIÓN → hipertrofia concéntrica, ↑RVS y ↑presión diastólica.' },
    { f: 'Síncope de esfuerzo con soplo sistólico: mecanismo', d: 'Estenosis aórtica severa: gasto fijo por la obstrucción + caída de la RVS por vasodilatación muscular → PA = GC × RVS se desploma → hipoperfusión cerebral. Tríada: angina, síncope, disnea.' },
    { f: '¿Por qué el soplo de la miocardiopatía hipertrófica AUMENTA con Valsalva y bipedestación?', d: 'Ambos reducen la precarga: menor volumen ventricular = tracto de salida más estrecho = más obstrucción dinámica. Es lo opuesto a la estenosis aórtica valvular, cuyo soplo disminuye.' },
    { f: 'Recuperación de la FC en el primer minuto post-esfuerzo', d: 'Depende de la reactivación vagal. Una caída < 12 lpm indica disfunción autonómica y es marcador pronóstico independiente de mortalidad.' }
  ]
}

]);

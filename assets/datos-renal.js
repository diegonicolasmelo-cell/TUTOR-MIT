/* ============================================================
   ÁREA — RENAL Y MEDIO INTERNO
   Filtrado, manejo tubular, ácido-base, potasio y fracaso renal
   ============================================================ */

TUTOR.registrarTemas([

/* ---------------------------------------------------------- */
{
  id: 'filtracion-glomerular',
  modulo: 'funcion-renal',
  nombre: 'Filtrado glomerular y autorregulación renal',
  alto: true,
  minutos: 20,
  requisitos: [],
  ideaCentral: 'El filtrado glomerular no depende de la presión arterial sino del equilibrio de fuerzas de Starling dentro del glomérulo, y el riñón lo defiende con dos arteriolas que regula de forma independiente. Comprender que la aferente controla la entrada y la eferente la salida explica de una vez la autorregulación, el efecto de los antiinflamatorios, el de los IECA y el fracaso renal prerrenal.',

  anclaje: {
    q: 'Sin mirar: un paciente hipovolémico toma un antiinflamatorio y su creatinina se dispara. Otro con estenosis renal bilateral toma un IECA y le ocurre lo mismo. ¿Qué arteriola tocó cada fármaco y por qué el resultado fue el mismo?',
    pista: 'Una arteriola controla lo que entra al glomérulo; la otra, lo que sale.'
  },

  bloques: [
    {
      nivel: 'imprescindible',
      titulo: 'Las fuerzas que producen el filtrado',
      html: '<p>El glomérulo es un capilar, y filtra por las mismas fuerzas de Starling que cualquier otro, con dos particularidades: su presión hidrostática es mucho más alta (≈ 45–50 mmHg frente a 25 en un capilar sistémico) y filtra a lo largo de todo su recorrido.</p>' +
        '<p style="text-align:center"><code>PFN = P<sub>capilar glomerular</sub> − P<sub>Bowman</sub> − π<sub>capilar</sub></code></p>' +
        '<p>No aparece la presión oncótica de la cápsula de Bowman porque el filtrado normal no contiene proteínas. Valores aproximados: 47 − 10 − 25 = <b>12 mmHg</b> de presión de filtración neta. El filtrado glomerular resulta de multiplicarla por el coeficiente de ultrafiltración (superficie y permeabilidad): unos <b>125 mL/min</b>, es decir, 180 litros al día, de los que se reabsorbe más del 99 %.</p>' +
        '<p>De esta ecuación se deducen las tres formas de reducir el filtrado: bajar la presión capilar (hipovolemia, vasodilatación de la eferente), <b>subir la presión de Bowman</b> (obstrucción urinaria: la causa posrenal) o reducir la superficie (glomerulonefritis, pérdida de nefronas).</p>'
    },
    {
      nivel: 'imprescindible',
      titulo: 'Dos arteriolas, dos efectos opuestos',
      html: '<p>El glomérulo es el único capilar situado entre dos arteriolas, y esa disposición es la clave de todo:</p>' +
        '<table><tr><th></th><th>Arteriola AFERENTE (entrada)</th><th>Arteriola EFERENTE (salida)</th></tr>' +
        '<tr><td>Si se <b>contrae</b></td><td>↓ Presión capilar → <b>↓ filtrado</b> y ↓ flujo</td><td>↑ Presión capilar → <b>↑ filtrado</b> con ↓ flujo</td></tr>' +
        '<tr><td>Si se <b>dilata</b></td><td>↑ Presión capilar → <b>↑ filtrado</b> y ↑ flujo</td><td>↓ Presión capilar → <b>↓ filtrado</b></td></tr>' +
        '<tr><td>Regulada por</td><td><b>Prostaglandinas</b> (dilatan), simpático y adenosina (contraen)</td><td><b>Angiotensina II</b> (contrae)</td></tr></table>' +
        '<p>🔥 Aquí está la respuesta al anclaje. En la hipovolemia, el riñón defiende su filtrado con dos mecanismos simultáneos: <b>prostaglandinas que dilatan la aferente</b> y <b>angiotensina II que contrae la eferente</b>. Los antiinflamatorios bloquean el primero y los IECA el segundo. Cada fármaco derriba uno de los dos pilares, y el resultado es el mismo: caída del filtrado. Por eso la combinación de antiinflamatorio, IECA y diurético en un paciente deshidratado —la llamada «triple whammy»— es una causa clásica y evitable de fracaso renal.</p>',
      cadena: ['Hipovolemia', 'Prostaglandinas dilatan la aferente', 'Angiotensina II contrae la eferente', 'Presión capilar preservada', 'Filtrado mantenido']
    },
    {
      nivel: 'importante',
      titulo: 'Autorregulación: por qué el filtrado es tan estable',
      html: '<p>Entre 80 y 180 mmHg de presión arterial media, el flujo renal y el filtrado permanecen casi constantes gracias a dos mecanismos:</p>' +
        '<ol><li><b>Respuesta miogénica</b>: el músculo liso de la aferente se contrae cuando se distiende por una presión mayor. Es inmediato.</li>' +
        '<li><b>Retroalimentación tubuloglomerular</b>: la <b>mácula densa</b> detecta el NaCl que llega al túbulo distal. Si llega mucho —señal de que se filtró demasiado—, libera <b>adenosina</b> que contrae la aferente y baja el filtrado. Si llega poco, libera renina. Es un termostato dentro de cada nefrona.</li></ol>' +
        '<p>Fíjate en el contraste con el resto del organismo: en casi todos los tejidos la adenosina <b>dilata</b> (es la señal de «falta flujo»); en el riñón <b>contrae</b> la aferente, porque el mensaje que transporta no es falta de oxígeno sino exceso de filtrado. La misma molécula con el signo invertido según la lógica del órgano.</p>' +
        '<p>Por debajo de 70–80 mmHg de presión media, la autorregulación se agota y el filtrado cae linealmente con la presión. En el hipertenso crónico la curva está desplazada a la derecha, de modo que necesita presiones más altas para mantener el filtrado: por eso «normalizar» la presión bruscamente puede producirle fracaso renal.</p>'
    },
    {
      nivel: 'complementario',
      titulo: 'Aclaramiento, creatinina y sus trampas',
      html: '<p>El <b>aclaramiento</b> es el volumen de plasma depurado de una sustancia por unidad de tiempo: <code>C = (U × V)/P</code>. El marcador ideal se filtra libremente y no se secreta ni reabsorbe: la <b>inulina</b> lo cumple, la <b>creatinina</b> casi (se secreta un poco, por lo que sobreestima el filtrado en torno a un 10–20 %).</p>' +
        '<p>La trampa de la creatinina plasmática es que su relación con el filtrado es <b>hiperbólica</b>, no lineal: pasar de 0,8 a 1,6 mg/dL supone perder la mitad del filtrado, mientras que pasar de 4 a 5 supone mucho menos. En fases precoces, un ascenso pequeño esconde una pérdida enorme de función.</p>' +
        '<p>Además depende de la masa muscular: un anciano caquéctico o un paciente con miopatía pueden tener filtrados muy bajos con creatininas «normales», y por eso las fórmulas de estimación incorporan edad, sexo y raza. La <b>cistatina C</b> evita esa dependencia. Y en el fracaso agudo, la creatinina va siempre <b>retrasada</b>: tarda 24–48 horas en reflejar una caída brusca del filtrado, lo que explica el interés en biomarcadores precoces y en la diuresis horaria como señal más inmediata.</p>'
    }
  ],

  variables: [
    { n: 'Presión capilar glomerular', d: 'up', nota: 'determinante principal del filtrado' },
    { n: 'Tono de la arteriola aferente', d: 'down', nota: 'dilatarla aumenta filtrado y flujo' },
    { n: 'Tono de la arteriola eferente', d: 'up', nota: 'contraerla aumenta filtrado y reduce flujo' },
    { n: 'Presión en la cápsula de Bowman', d: 'up', nota: 'sube en la obstrucción: causa posrenal' }
  ],

  fisiopatologia: '<p>El fracaso renal agudo se clasifica por localización, y la clasificación es útil porque cada tipo tiene un tratamiento distinto:</p>' +
    '<ul><li><b>Prerrenal</b> (la más frecuente): hipoperfusión con parénquima intacto. El riñón responde reteniendo sodio y agua con avidez. Reversible si se corrige la causa.</li>' +
    '<li><b>Renal o intrínseco</b>: necrosis tubular aguda (isquemia o tóxicos), glomerulonefritis, nefritis intersticial. El túbulo dañado <b>pierde la capacidad de reabsorber sodio</b>.</li>' +
    '<li><b>Posrenal</b>: obstrucción, que eleva la presión en la cápsula de Bowman y anula la presión de filtración neta. Es la que no debe pasarse por alto porque se resuelve con una sonda o un catéter.</li></ul>' +
    '<p>La distinción entre prerrenal y necrosis tubular se apoya en la <b>excreción fraccional de sodio</b>: menor del 1 % indica un túbulo sano ahorrando sodio (prerrenal); mayor del 2 % indica un túbulo que ya no puede reabsorberlo. La excreción fraccional de urea (< 35 %) es preferible si el paciente recibe diuréticos, que falsean el sodio urinario.</p>',

  clinica: '<p>Para la UCI: el <b>síndrome cardiorrenal</b> ilustra que la perfusión renal depende del gradiente entre presión arterial y presión venosa. Una presión venosa central elevada por congestión reduce ese gradiente tanto como una presión arterial baja, y a menudo más: en la insuficiencia cardíaca descompensada, la congestión venosa renal explica más deterioro de función que el gasto bajo. La consecuencia práctica es contraintuitiva: en el paciente congestivo con creatinina en ascenso, a menudo hay que <b>descongestionar más</b>, no menos.</p>' +
    '<p>Y ante cualquier fracaso renal, dos gestos que no deben olvidarse: revisar la lista de fármacos —antiinflamatorios, IECA, contrastes, aminoglucósidos, vancomicina— y descartar obstrucción con una ecografía.</p>',

  error: {
    confunde: 'Suponer que el filtrado glomerular depende directamente de la presión arterial.',
    parecido: 'Ambos caen juntos en el shock, y subir la presión suele mejorar la diuresis, lo que refuerza la asociación.',
    diferencia: 'El filtrado depende de la <b>presión capilar glomerular</b>, que el riñón regula con sus dos arteriolas y mantiene casi constante entre 80 y 180 mmHg de presión media. Por eso el filtrado puede desplomarse con presión arterial normal (antiinflamatorios, IECA en estenosis bilateral, síndrome hepatorrenal, hipertensión intraabdominal) y mantenerse con presiones relativamente bajas mientras la autorregulación funcione.',
    ejemplo: 'Paciente con presión de 130/80 y creatinina que se duplica tras iniciar ibuprofeno por un cólico: la presión sistémica es perfecta, pero al bloquear las prostaglandinas se perdió la vasodilatación aferente que sostenía el filtrado en un paciente algo deshidratado.',
    regla: 'El filtrado lo fija el equilibrio entre las dos arteriolas, no el manguito. Ante un deterioro renal, revisa siempre qué fármaco tocó una de ellas.'
  },

  perla: '🔥 Aferente = entrada, la dilatan las <b>prostaglandinas</b>. Eferente = salida, la contrae la <b>angiotensina II</b>. Los antiinflamatorios atacan la primera y los IECA la segunda: ambos bajan el filtrado, y juntos en un paciente hipovolémico son una causa clásica y evitable de fracaso renal.',

  feynman: {
    consigna: 'Explica por qué un antiinflamatorio y un IECA pueden producir fracaso renal por mecanismos opuestos, y por qué el riesgo se multiplica en un paciente deshidratado.',
    puntos: [
      'Describo la disposición del glomérulo entre dos arteriolas',
      'Explico el efecto de contraer o dilatar cada una sobre el filtrado',
      'Identifico prostaglandinas (aferente) y angiotensina II (eferente)',
      'Explico por qué en la hipovolemia ambos mecanismos están activados al máximo',
      'Concluyo con la combinación de riesgo y su prevención'
    ],
    referencia: '<p>El glomérulo es el único lecho capilar del organismo situado <b>entre dos arteriolas</b>, y esa arquitectura le permite regular la presión de filtración con una precisión que ningún otro capilar tiene. La arteriola <b>aferente</b> controla lo que entra: si se dilata, sube la presión dentro del capilar glomerular y aumenta el filtrado. La <b>eferente</b> controla la salida: si se contrae, la sangre se represa dentro del glomérulo, sube también la presión capilar y aumenta el filtrado, aunque a costa de reducir el flujo que sigue hacia los capilares peritubulares.</p>' +
      '<p>En condiciones de <b>hipovolemia o bajo gasto</b>, el riñón activa los dos mecanismos a la vez para defender el filtrado. Por un lado, la isquemia local estimula la síntesis de <b>prostaglandinas vasodilatadoras</b> que mantienen abierta la aferente, contrarrestando la vasoconstricción simpática generalizada. Por otro, el sistema renina-angiotensina libera <b>angiotensina II</b>, que contrae preferentemente la eferente. El resultado es que un paciente puede perder un tercio de su volumen y mantener un filtrado casi normal, sostenido por esos dos pilares.</p>' +
      '<p>Los <b>antiinflamatorios no esteroideos</b> inhiben la ciclooxigenasa y con ella la síntesis de prostaglandinas: derriban el primer pilar. La aferente pierde su vasodilatación protectora, queda expuesta a la vasoconstricción simpática, cae la presión capilar y con ella el filtrado. Los <b>IECA y los ARA-II</b> bloquean la angiotensina II y derriban el segundo: la eferente se dilata, la sangre escapa del glomérulo sin represarse, cae la presión capilar y también el filtrado. Mecanismos opuestos —uno cierra la entrada, el otro abre la salida— con idéntico resultado.</p>' +
      '<p>La clave es que <b>en un paciente euvolémico apenas pasa nada</b>, porque ninguno de los dos mecanismos está trabajando al límite y sobra margen. El riesgo aparece cuando el filtrado ya depende críticamente de esa compensación: deshidratación, insuficiencia cardíaca, cirrosis, sepsis, estenosis de arteria renal o enfermedad renal previa. De ahí la advertencia clásica sobre la combinación de <b>antiinflamatorio, IECA/ARA-II y diurético</b> —conocida como triple ataque—: el diurético provoca la hipovolemia que activa ambos mecanismos y los otros dos fármacos los bloquean simultáneamente.</p>' +
      '<p>La prevención se deduce sola: evitar antiinflamatorios en pacientes con riesgo renal, suspender temporalmente IECA y diuréticos en situaciones de deplección aguda —vómitos, diarrea, ayuno preoperatorio, fiebre—, y asegurar la volemia antes de exponer al paciente a cualquiera de ellos. Conviene además distinguir el ascenso hemodinámico y esperado de la creatinina al iniciar un IECA de forma programada, que hasta un 30 % es aceptable y refleja nefroprotección a largo plazo, del deterioro brusco en un paciente hipovolémico, que sí es daño.</p>'
  },

  preguntas: [
    { nivel: 1, q: 'Escribe la ecuación de la presión de filtración neta glomerular.', r: 'PFN = presión hidrostática capilar − presión en la cápsula de Bowman − presión oncótica capilar. Aproximadamente 47 − 10 − 25 = 12 mmHg. No se resta la oncótica de Bowman porque el filtrado normal carece de proteínas.' },
    { nivel: 1, q: '¿Qué le ocurre al filtrado si se contrae la arteriola eferente?', r: 'Aumenta, porque la sangre se represa dentro del glomérulo y sube la presión capilar, aunque disminuye el flujo que sigue hacia los capilares peritubulares.' },
    { nivel: 1, q: 'Nombra los dos mecanismos de autorregulación renal.', r: 'La respuesta miogénica de la arteriola aferente (se contrae al distenderse) y la retroalimentación tubuloglomerular a través de la mácula densa, que libera adenosina si llega mucho NaCl y renina si llega poco.' },
    { nivel: 2, q: '¿Por qué la adenosina contrae la arteriola aferente cuando en el resto del organismo es vasodilatadora?', r: 'Porque en el riñón el mensaje que transporta no es «falta oxígeno» sino «está llegando demasiado NaCl al túbulo distal», es decir, se ha filtrado en exceso. Contraer la aferente reduce el filtrado y corrige la situación. Es la misma molécula con signo funcional invertido según la lógica del órgano.' },
    { nivel: 2, q: '¿Cómo distingues un fracaso prerrenal de una necrosis tubular aguda por laboratorio?', r: 'Por la excreción fraccional de sodio: menor del 1 % indica túbulo sano reteniendo sodio con avidez (prerrenal); mayor del 2 % indica túbulo dañado incapaz de reabsorberlo. Si el paciente recibe diuréticos se prefiere la excreción fraccional de urea (< 35 % sugiere prerrenal).' },
    { nivel: 2, q: '¿Por qué la creatinina plasmática subestima la pérdida precoz de función renal?', r: 'Porque su relación con el filtrado es hiperbólica, no lineal: los primeros descensos del filtrado producen ascensos pequeños de creatinina. Además depende de la masa muscular y en el fracaso agudo tarda 24–48 horas en reflejar la caída del filtrado.' },
    { nivel: 3, q: 'Paciente con insuficiencia cardíaca descompensada, edematoso, con PVC de 20 y creatinina en ascenso mientras recibe diuréticos. ¿Suspendes el diurético y das volumen?', r: 'No de entrada. El flujo renal depende del gradiente entre presión arterial y presión <b>venosa</b>, y una PVC de 20 estrangula ese gradiente tanto o más que una presión arterial baja: es congestión venosa renal. En el paciente que sigue congestivo, descongestionar suele <b>mejorar</b> la función renal, y administrar volumen la empeoraría. Solo si aparecen signos de hipoperfusión con presiones de llenado ya bajas se replantea la estrategia hacia soporte inotrópico o reducción de poscarga.' },
    { nivel: 3, q: 'Anciano de 82 años, caquéctico, con creatinina de 0,9 mg/dL. ¿Puedes dosificar un antibiótico nefrotóxico asumiendo función renal normal?', r: 'No. La creatinina procede del metabolismo muscular, y en un paciente con masa muscular muy reducida se genera poca: un filtrado sustancialmente disminuido puede cursar con creatinina «normal». Hay que estimar el filtrado con fórmulas que incorporen edad, sexo y peso, considerar cistatina C —independiente de la masa muscular— y ajustar la dosis en consecuencia. Es un error frecuente y con consecuencias directas de toxicidad.' }
  ],

  caso: {
    vineta: 'Mujer de 76 años, hipertensa en tratamiento con enalapril e hidroclorotiazida. Lleva tres días con gastroenteritis y vómitos. Ha tomado ibuprofeno por dolor lumbar. Acude con creatinina de 3,2 mg/dL (previa 0,9), urea elevada, sodio urinario de 8 mEq/L, PA 104/62.',
    pasos: [
      { q: '¿Qué tipo de fracaso renal es y qué dato lo apoya?', pista: 'Mira el sodio urinario.', r: 'Prerrenal. Un sodio urinario de 8 mEq/L indica que el túbulo está reabsorbiendo sodio con avidez, es decir, está intacto y respondiendo a la hipoperfusión. En una necrosis tubular establecida el túbulo dañado no podría retener sodio y la cifra sería mucho más alta.' },
      { q: 'Enumera todos los factores que han contribuido, uno por uno.', pista: 'Hay al menos cuatro.', r: 'La <b>deplección de volumen</b> por vómitos y diarrea; la <b>hidroclorotiazida</b>, que agrava esa deplección; el <b>enalapril</b>, que al bloquear la angiotensina II dilata la eferente y reduce la presión de filtración; y el <b>ibuprofeno</b>, que al inhibir las prostaglandinas impide la vasodilatación aferente compensadora. Es el triple ataque clásico sobre una hipovolemia.' },
      { q: '¿Por qué cada fármaco por separado no le había dado problemas durante años?', pista: 'Reserva funcional.', r: 'Porque en situación de euvolemia el filtrado no depende críticamente de esos mecanismos compensadores: hay margen de sobra. El riesgo aparece cuando la hipovolemia obliga al riñón a apoyarse simultáneamente en la dilatación aferente por prostaglandinas y en la constricción eferente por angiotensina II, y entonces se bloquean ambos pilares a la vez.' },
      { q: '¿Qué haces en las primeras horas?', pista: 'Retirar y reponer.', r: 'Suspender ibuprofeno, enalapril e hidroclorotiazida, y reponer volumen con cristaloides monitorizando la respuesta. Además, descartar obstrucción con ecografía —siempre, porque es la causa que se resuelve con un gesto— y revisar cualquier otro nefrotóxico. La mayoría de estos casos revierte en días si se actúa pronto.' },
      { q: 'Si no se corrigiera en 48–72 horas, ¿qué habría pasado?', pista: 'La hipoperfusión sostenida daña.', r: 'La hipoperfusión mantenida evoluciona a <b>necrosis tubular aguda</b>: las células tubulares, con altísima demanda metabólica por el transporte activo de sodio —especialmente en el túbulo proximal y en la rama gruesa ascendente, que además viven en una médula fisiológicamente hipóxica—, sufren daño isquémico. Entonces el cuadro deja de ser reversible con volumen: el sodio urinario aumentaría, aparecerían cilindros granulosos y el curso sería de días a semanas.' },
      { q: '¿Cuándo se puede reintroducir el enalapril y con qué criterio?', pista: 'Distingue efecto hemodinámico esperado de daño.', r: 'Una vez restaurada la volemia y estabilizada la función renal, porque a largo plazo es nefroprotector y cardioprotector. Al reintroducirlo, un ascenso de creatinina de hasta un 30 % es esperable y aceptable: refleja el efecto hemodinámico sobre la arteriola eferente, no toxicidad. Lo que obliga a reevaluar es un ascenso mayor, hiperpotasemia o hipotensión sintomática. También conviene dar a la paciente instrucciones de suspender el IECA y el diurético ante episodios agudos de deshidratación.' }
    ],
    cierre: 'Este caso es la anatomía funcional del glomérulo aplicada a una lista de fármacos. Saber qué arteriola toca cada uno convierte un fracaso renal aparentemente inexplicable en algo previsible y prevenible.'
  },

  tarjetas: [
    { f: 'Presión de filtración neta glomerular', d: 'PFN = P capilar − P Bowman − π capilar ≈ 47 − 10 − 25 = 12 mmHg. Filtrado ≈ 125 mL/min (180 L/día), se reabsorbe > 99 %.' },
    { f: 'Arteriola aferente vs eferente: efecto sobre el filtrado', d: 'AFERENTE (entrada): contraerla ↓filtrado; dilatarla ↑filtrado. EFERENTE (salida): contraerla ↑filtrado (represa sangre); dilatarla ↓filtrado.' },
    { f: '¿Quién regula cada arteriola?', d: 'AFERENTE: prostaglandinas la DILATAN (protectoras en hipovolemia); simpático y adenosina la contraen. EFERENTE: angiotensina II la CONTRAE.' },
    { f: 'AINE + IECA + diurético: el "triple ataque"', d: 'El diurético crea hipovolemia; el AINE bloquea la dilatación aferente (prostaglandinas) y el IECA la constricción eferente (angiotensina II). Se derriban los dos pilares que sostenían el filtrado.' },
    { f: 'Retroalimentación tubuloglomerular', d: 'La mácula densa detecta el NaCl distal. Si llega MUCHO → adenosina → contrae la aferente → ↓filtrado. Si llega POCO → renina. En el riñón la adenosina CONTRAE (al revés que en el resto del cuerpo).' },
    { f: 'Excreción fraccional de sodio: interpretación', d: 'EFNa < 1 % = prerrenal (túbulo sano ahorrando sodio). > 2 % = necrosis tubular (túbulo dañado, no puede reabsorber). Con diuréticos usar excreción fraccional de UREA (< 35 % = prerrenal).' },
    { f: '¿Por qué la creatinina engaña en fases precoces?', d: 'Su relación con el filtrado es HIPERBÓLICA: de 0,8 a 1,6 se pierde la mitad del filtrado. Depende de la masa muscular (anciano caquéctico = creatinina falsamente normal) y va 24–48 h retrasada en el fracaso agudo.' },
    { f: 'Congestión venosa renal (síndrome cardiorrenal)', d: 'El flujo renal depende del gradiente presión arterial − presión VENOSA. Una PVC de 20 estrangula ese gradiente: en el paciente congestivo con creatinina en ascenso, hay que descongestionar MÁS, no dar volumen.' }
  ]
},

/* ---------------------------------------------------------- */
{
  id: 'manejo-sodio-agua',
  modulo: 'funcion-renal',
  nombre: 'Manejo del sodio y del agua: osmolaridad y natremia',
  alto: true,
  minutos: 22,
  requisitos: ['filtracion-glomerular'],
  ideaCentral: 'El sodio determina el volumen extracelular y el agua determina la osmolaridad, y el organismo los regula por vías independientes: el sodio mediante el eje renina-angiotensina-aldosterona y el agua mediante la ADH y la sed. Separar ambos ejes es lo que permite entender que la natremia no informa del sodio corporal sino del agua, y que un paciente pueda estar edematoso e hiponatrémico a la vez.',

  anclaje: {
    q: 'Sin mirar: un paciente con insuficiencia cardíaca tiene 8 kg de líquido retenido y un sodio plasmático de 126 mEq/L. ¿Le falta sodio o le sobra agua? ¿Y qué le harías?',
    pista: 'La concentración es un cociente. ¿Qué está pasando con el numerador y con el denominador?'
  },

  bloques: [
    {
      nivel: 'imprescindible',
      titulo: 'Dos ejes independientes',
      html: '<table><tr><th></th><th>SODIO</th><th>AGUA</th></tr>' +
        '<tr><td>Determina</td><td><b>Volumen</b> extracelular</td><td><b>Osmolaridad</b> (y por tanto natremia)</td></tr>' +
        '<tr><td>Sensor</td><td>Barorreceptores, aparato yuxtaglomerular</td><td>Osmorreceptores hipotalámicos</td></tr>' +
        '<tr><td>Efector</td><td>SRAA, péptidos natriuréticos, simpático</td><td>ADH y sed</td></tr>' +
        '<tr><td>Se altera como</td><td>Edema o deplección de volumen</td><td>Hipo o hipernatremia</td></tr></table>' +
        '<p>🔥 Esta tabla resuelve la mayor parte de la confusión clínica. La <b>natremia no mide el sodio corporal</b>: mide la relación entre sodio y agua. Un paciente puede tener sodio corporal total muy aumentado —edematoso, con litros de más— y estar hiponatrémico porque ha retenido proporcionalmente más agua. Es exactamente lo que ocurre en la insuficiencia cardíaca y en la cirrosis.</p>' +
        '<p>Por eso el abordaje correcto de una alteración de la natremia empieza siempre por dos preguntas separadas: <b>¿cómo está la osmolaridad?</b> y <b>¿cómo está el volumen extracelular?</b></p>'
    },
    {
      nivel: 'imprescindible',
      titulo: 'La ADH y el concepto de estímulo no osmótico',
      html: '<p>La ADH (vasopresina) se libera por dos tipos de estímulo, y esa dualidad explica casi toda la hiponatremia clínica:</p>' +
        '<ul><li><b>Osmótico</b>: los osmorreceptores hipotalámicos son extraordinariamente sensibles, responden a variaciones de apenas un 1 % de osmolaridad. Es el mecanismo fisiológico normal.</li>' +
        '<li><b>No osmótico</b>: la caída del volumen circulante efectivo (detectada por barorreceptores) libera ADH <b>aunque la osmolaridad sea baja</b>. El organismo prioriza el volumen sobre la concentración: prefiere estar hipoosmolar a estar hipoperfundido.</li></ul>' +
        '<p>La ADH actúa sobre receptores V2 del túbulo colector insertando <b>acuaporinas 2</b> en la membrana luminal, lo que permite reabsorber agua libre siguiendo el gradiente osmótico de la médula. Sobre receptores V1 produce vasoconstricción, efecto que se aprovecha en el shock vasopléjico.</p>' +
        '<p>De aquí sale la explicación de la hiponatremia de la insuficiencia cardíaca, de la cirrosis y de la hipovolemia: en las tres el volumen circulante efectivo es bajo, la ADH está liberada de forma no osmótica y se retiene agua libre desproporcionadamente respecto al sodio.</p>',
      cadena: ['↓ Volumen circulante efectivo', 'Estímulo no osmótico de ADH', 'Acuaporinas 2 en el colector', 'Retención de agua libre', 'Hiponatremia dilucional']
    },
    {
      nivel: 'importante',
      titulo: 'El algoritmo de la hiponatremia',
      html: '<ol><li><b>¿Es hipoosmolar?</b> Descarta primero la <b>pseudohiponatremia</b> (hiperlipidemia o hiperproteinemia extremas, con osmolaridad normal) y la <b>hiponatremia hipertónica</b> por hiperglucemia o manitol, donde el soluto arrastra agua al extracelular y diluye el sodio. Regla práctica: por cada 100 mg/dL de glucosa por encima de lo normal, el sodio desciende ~1,6–2,4 mEq/L.</li>' +
        '<li><b>¿Cómo está el volumen extracelular?</b>' +
        '<ul><li><b>Hipovolémica</b>: pérdidas digestivas, diuréticos, tercer espacio. Sodio urinario bajo (< 20) salvo si la pérdida es renal.</li>' +
        '<li><b>Euvolémica</b>: SIADH (sodio urinario alto, osmolaridad urinaria alta, ácido úrico bajo), hipotiroidismo, insuficiencia suprarrenal, polidipsia primaria (orina muy diluida).</li>' +
        '<li><b>Hipervolémica</b>: insuficiencia cardíaca, cirrosis, síndrome nefrótico, insuficiencia renal. Edema con sodio urinario bajo.</li></ul></li></ol>' +
        '<p>El tratamiento se deduce del tipo: la hipovolémica necesita <b>volumen</b>, la hipervolémica <b>restricción hídrica y descongestión</b>, y el SIADH <b>restricción hídrica</b>. Administrar suero salino a un paciente hipervolémico o con SIADH puede empeorar la natremia.</p>'
    },
    {
      nivel: 'complementario',
      titulo: 'Velocidad de corrección: el riesgo va en las dos direcciones',
      html: '<p>El cerebro se adapta a la hiponatremia crónica expulsando osmolitos orgánicos para evitar el edema. Esa adaptación tarda unas 48 horas y, una vez establecida, condiciona el tratamiento:</p>' +
        '<ul><li>Corregir <b>demasiado rápido</b> una hiponatremia crónica produce <b>síndrome de desmielinización osmótica</b> (mielinólisis pontina): el cerebro adaptado no puede recuperar sus osmolitos con la rapidez suficiente y las células gliales se deshidratan. Cursa con cuadriparesia, disartria, disfagia y síndrome de cautiverio, típicamente varios días después de la corrección. Es devastador y evitable.</li>' +
        '<li>No corregir una hiponatremia <b>aguda</b> y sintomática produce <b>edema cerebral</b>, convulsiones y herniación, porque no ha dado tiempo a la adaptación.</li></ul>' +
        '<p>Regla operativa: no superar 8–10 mEq/L en 24 horas (menos, 6–8, en pacientes de alto riesgo: alcoholismo, desnutrición, hepatopatía, hipopotasemia). En la hiponatremia aguda con síntomas graves —convulsiones, coma— sí está indicado un bolo de suero salino hipertónico para elevar el sodio 4–6 mEq/L rápidamente, lo suficiente para revertir el edema, y después frenar.</p>' +
        '<p>Un detalle práctico que sorprende: al tratar una hiponatremia hipovolémica, en cuanto se repone el volumen desaparece el estímulo no osmótico de ADH y el riñón elimina de golpe el agua libre retenida, con <b>autocorrección brusca</b> de la natremia. Hay que anticiparlo y vigilarlo estrechamente.</p>'
    }
  ],

  variables: [
    { n: 'Sodio corporal total', d: 'up', nota: 'determina el volumen, no la natremia' },
    { n: 'Agua corporal total', d: 'up', nota: 'determina la osmolaridad y la natremia' },
    { n: 'ADH', d: 'up', nota: 'retiene agua libre; se libera también por estímulo no osmótico' },
    { n: 'Volumen circulante efectivo', d: 'down', nota: 'su caída dispara ADH aunque haya hipoosmolaridad' }
  ],

  fisiopatologia: '<p>La <b>hipernatremia</b> es siempre un problema de <b>agua</b>: o se pierde (diabetes insípida, pérdidas digestivas o insensibles, diuresis osmótica) o no se bebe. Y aquí está el dato clínico decisivo: como la sed es un mecanismo extraordinariamente potente, una hipernatremia mantenida implica casi siempre que el paciente <b>no tiene acceso al agua o no puede pedirla</b>: ancianos dependientes, pacientes con alteración de la conciencia, intubados, lactantes. Es tanto un hallazgo bioquímico como un indicador de cuidados.</p>' +
    '<p>El <b>SIADH</b> es un diagnóstico de exclusión que exige euvolemia clínica, osmolaridad plasmática baja, osmolaridad urinaria inapropiadamente alta (> 100 mOsm/kg), sodio urinario elevado (> 30 mEq/L) y función tiroidea y suprarrenal normales. Causas típicas: neoplasias (sobre todo microcítico de pulmón), patología del sistema nervioso central, patología pulmonar y fármacos.</p>',

  clinica: '<p>Los síntomas de la hiponatremia dependen más de la <b>velocidad</b> que de la cifra: un sodio de 120 instaurado en 12 horas puede producir convulsiones, mientras que uno de 118 de meses de evolución puede cursar solo con leve inestabilidad de la marcha y trastornos de atención —que, no siendo dramáticos, se asocian a caídas y fracturas en ancianos, motivo por el que la hiponatremia crónica leve ha dejado de considerarse inocua—.</p>' +
    '<p>En la UCI conviene recordar que el suero salino isotónico administrado a un paciente con SIADH puede <b>bajar</b> el sodio: el riñón elimina el sodio administrado y retiene el agua, de modo que el balance neto es agua libre positiva. Es un fenómeno contraintuitivo que se detecta comparando la osmolaridad urinaria con la del suero infundido.</p>',

  error: {
    confunde: 'Leer la natremia como una medida del sodio corporal.',
    parecido: 'El nombre del parámetro es «sodio» y su unidad es de sodio, así que la inferencia parece obligada.',
    diferencia: 'La natremia es una <b>concentración</b>, es decir, un cociente entre sodio y agua. Informa fundamentalmente del <b>agua</b>, porque el organismo regula la osmolaridad con mucha más precisión que el volumen. Un paciente con insuficiencia cardíaca y 8 kg de retención tiene un sodio corporal total muy aumentado y aun así está hiponatrémico, porque ha retenido proporcionalmente más agua.',
    ejemplo: 'Administrar suero salino a ese paciente edematoso «porque tiene el sodio bajo» añade volumen a quien ya está congestivo y no corrige la natremia, porque el problema es el exceso de agua libre mediado por la ADH. Lo que necesita es restricción hídrica y mejorar la hemodinámica para apagar el estímulo de ADH.',
    regla: 'Sodio = volumen. Agua = concentración. Ante una natremia anormal, evalúa <b>siempre</b> el volumen extracelular por separado antes de decidir.'
  },

  perla: '🔥 La hiponatremia se resuelve con dos preguntas: <b>¿es realmente hipoosmolar?</b> (descarta hiperglucemia y pseudohiponatremia) y <b>¿cómo está el volumen extracelular?</b> (hipo, eu o hipervolémica). Cada respuesta lleva a un tratamiento distinto, y aplicar el equivocado empeora al paciente.',

  feynman: {
    consigna: 'Explica por qué un paciente con insuficiencia cardíaca y edemas puede estar hiponatrémico, y por qué el suero salino no lo corrige.',
    puntos: [
      'Separo los ejes del sodio (volumen) y del agua (osmolaridad)',
      'Introduzco el volumen circulante efectivo bajo pese al exceso de volumen total',
      'Explico la liberación no osmótica de ADH',
      'Explico por qué se retiene agua libre desproporcionadamente',
      'Concluyo el tratamiento correcto: restricción hídrica y mejorar la hemodinámica'
    ],
    referencia: '<p>El organismo regula el sodio y el agua por <b>dos ejes independientes</b>. El sodio determina el volumen extracelular y se regula mediante el sistema renina-angiotensina-aldosterona, los péptidos natriuréticos y el simpático. El agua determina la osmolaridad y se regula mediante la ADH y la sed. Como la natremia es una concentración, informa sobre todo del <b>agua</b>, no del sodio corporal total.</p>' +
      '<p>En la insuficiencia cardíaca el gasto es insuficiente, de modo que el <b>volumen circulante efectivo</b> —la fracción del volumen que realmente perfunde los tejidos— está bajo, aunque el volumen total esté muy aumentado. Los barorreceptores detectan esa hipoperfusión y activan dos respuestas simultáneas: el SRAA, que retiene sodio y por tanto agrava el edema, y la <b>liberación no osmótica de ADH</b>.</p>' +
      '<p>Esa segunda respuesta es la clave. Normalmente la ADH se libera solo cuando sube la osmolaridad; pero cuando el volumen circulante efectivo cae, los barorreceptores la liberan <b>aunque la osmolaridad esté baja</b>, porque el organismo prioriza defender el volumen sobre defender la concentración. La ADH inserta acuaporinas 2 en el túbulo colector y se reabsorbe agua libre. El resultado es que se retienen tanto sodio como agua, pero <b>proporcionalmente más agua</b>, y la concentración desciende: hiponatremia dilucional con sodio corporal total aumentado.</p>' +
      '<p>Por eso el suero salino no funciona. En primer lugar añade volumen a un paciente que ya está congestivo, empeorando la disnea y los edemas. En segundo lugar, mientras persista el estímulo de ADH el riñón seguirá reteniendo agua libre: el sodio administrado se excretará y el agua se quedará, de modo que el balance neto puede incluso <b>reducir</b> más la natremia. Es el mismo fenómeno que se observa al administrar salino isotónico en el SIADH.</p>' +
      '<p>El tratamiento correcto ataca el mecanismo: <b>restricción hídrica</b> para limitar la entrada de agua libre, <b>descongestión</b> con diuréticos de asa —que además generan orina hipotónica y por tanto pérdida neta de agua libre—, y sobre todo <b>mejorar la hemodinámica</b>, porque al aumentar el volumen circulante efectivo desaparece el estímulo no osmótico de ADH y el riñón elimina espontáneamente el agua retenida. En casos seleccionados se emplean antagonistas del receptor V2 de la vasopresina, que producen pérdida de agua libre sin pérdida de sodio. Conviene recordar además que la profundidad de la hiponatremia es un buen <b>marcador pronóstico</b> en insuficiencia cardíaca, precisamente porque refleja la intensidad de la activación neurohumoral.</p>'
  },

  preguntas: [
    { nivel: 1, q: '¿Qué determina el sodio corporal total y qué determina el agua corporal total?', r: 'El sodio determina el volumen extracelular; el agua determina la osmolaridad y por tanto la natremia. Se regulan por ejes independientes: SRAA para el sodio, ADH y sed para el agua.' },
    { nivel: 1, q: '¿Sobre qué receptor y con qué mecanismo actúa la ADH en el riñón?', r: 'Sobre receptores V2 del túbulo colector, insertando acuaporinas 2 en la membrana luminal, lo que permite reabsorber agua libre siguiendo el gradiente osmótico medular. Sobre receptores V1 produce vasoconstricción.' },
    { nivel: 1, q: 'Nombra los criterios diagnósticos del SIADH.', r: 'Euvolemia clínica, osmolaridad plasmática baja, osmolaridad urinaria inapropiadamente alta (> 100 mOsm/kg), sodio urinario elevado (> 30 mEq/L), y función tiroidea y suprarrenal normales. Es un diagnóstico de exclusión.' },
    { nivel: 2, q: '¿Qué es el estímulo no osmótico de ADH y qué explica clínicamente?', r: 'La liberación de ADH mediada por barorreceptores ante una caída del volumen circulante efectivo, aunque la osmolaridad sea baja. Explica la hiponatremia de la insuficiencia cardíaca, la cirrosis y la hipovolemia: el organismo prioriza el volumen sobre la concentración.' },
    { nivel: 2, q: 'Un paciente tiene glucemia de 700 mg/dL y sodio de 128. ¿Está realmente hiponatrémico?', r: 'Es una hiponatremia hipertónica por traslocación: la glucosa, osmóticamente activa y que no entra libremente en la célula, arrastra agua al extracelular y diluye el sodio. Corrigiendo aproximadamente 1,6–2,4 mEq/L por cada 100 mg/dL de glucosa por encima de lo normal, su sodio corregido es normal o incluso alto. Se trata la hiperglucemia, no la natremia.' },
    { nivel: 2, q: '¿Por qué una hipernatremia mantenida es también un indicador de cuidados?', r: 'Porque la sed es un mecanismo extraordinariamente potente: cualquier persona con acceso al agua y capacidad de pedirla corrige su hipernatremia bebiendo. Que persista implica que el paciente no puede acceder al agua ni solicitarla: ancianos dependientes, alteración de la conciencia, intubados, lactantes.' },
    { nivel: 3, q: 'Paciente con hiponatremia de 112 mEq/L de varias semanas de evolución, con marcha inestable pero sin convulsiones. El equipo quiere normalizar el sodio en 24 horas. ¿Qué adviertes?', r: 'Que hay riesgo grave de síndrome de desmielinización osmótica. Ante una hiponatremia crónica el cerebro se ha adaptado expulsando osmolitos orgánicos, y no puede recuperarlos con rapidez: una corrección brusca deshidrata las células gliales y produce mielinólisis, con cuadriparesia, disartria, disfagia y síndrome de cautiverio, típicamente días después. El límite es de 8–10 mEq/L en 24 horas, y de 6–8 en pacientes de alto riesgo (alcoholismo, desnutrición, hepatopatía, hipopotasemia). Como no tiene síntomas graves, no hay indicación de hipertónico.' },
    { nivel: 3, q: 'Se administra suero salino isotónico a un paciente con SIADH y su sodio baja de 126 a 122. Explícalo.', r: 'En el SIADH la ADH está inapropiadamente elevada y el riñón produce orina muy concentrada. Si la osmolaridad urinaria supera la del suero infundido, el riñón excreta el sodio administrado mientras retiene una parte del agua: el balance neto es de agua libre positiva y la natremia <b>desciende</b>. Es el fenómeno de la «desalinización». El tratamiento correcto es restricción hídrica, y si se requiere corrección más activa, suero hipertónico o antagonistas del receptor V2, además de tratar la causa subyacente.' }
  ],

  caso: {
    vineta: 'Varón de 68 años, fumador, ingresa por cuadro confusional. Sodio 118 mEq/L, osmolaridad plasmática 245 mOsm/kg, osmolaridad urinaria 480 mOsm/kg, sodio urinario 62 mEq/L. Exploración: sin edemas, sin signos de deshidratación, presión arterial y frecuencia normales. Radiografía: masa hiliar derecha.',
    pasos: [
      { q: 'Clasifica la hiponatremia con los dos primeros pasos del algoritmo.', pista: 'Osmolaridad y volumen.', r: 'Es hipoosmolar verdadera (245 mOsm/kg, descarta pseudohiponatremia e hiponatremia hipertónica) y clínicamente <b>euvolémica</b>: no hay edemas ni signos de deplección. Eso sitúa el diagnóstico en el grupo del SIADH, hipotiroidismo o insuficiencia suprarrenal.' },
      { q: '¿Qué significa una osmolaridad urinaria de 480 en este contexto?', pista: '¿Qué debería hacer un riñón sano ante hipoosmolaridad?', r: 'Es <b>inapropiadamente alta</b>. Ante una osmolaridad plasmática de 245, un riñón sano suprimiría por completo la ADH y produciría orina máximamente diluida (< 100 mOsm/kg) para eliminar el exceso de agua. Que la orina esté concentrada demuestra que hay ADH actuando cuando no debería.' },
      { q: 'El sodio urinario es de 62. ¿Qué aporta?', pista: 'Descarta un grupo entero.', r: 'Confirma que no hay estímulo hipovolémico: si el paciente estuviera deplecionado, el riñón retendría sodio con avidez y la cifra sería baja. Un sodio urinario elevado con euvolemia apoya el SIADH, y refleja que el riñón excreta el sodio ingerido con normalidad; el problema es exclusivamente de agua.' },
      { q: 'La masa hiliar, ¿cómo encaja?', pista: 'Producción ectópica.', r: 'Sugiere carcinoma microcítico de pulmón, la causa paraneoplásica clásica de SIADH por producción ectópica de ADH. Otras causas a considerar son patología del sistema nervioso central, patología pulmonar (neumonía, tuberculosis) y fármacos. Antes de asumir SIADH hay que descartar hipotiroidismo e insuficiencia suprarrenal, que lo imitan.' },
      { q: 'Está confuso pero sin convulsiones y el cuadro parece de semanas. ¿Cómo corriges?', pista: 'Velocidad, no cifra.', r: 'Con <b>restricción hídrica</b> como base y una corrección lenta: no más de 8 mEq/L en 24 horas, porque la cronicidad implica adaptación cerebral y riesgo de desmielinización osmótica. Solo si aparecieran síntomas graves —convulsiones o coma— estaría indicado un bolo de suero hipertónico para elevar el sodio 4–6 mEq/L y después frenar. Deben controlarse los iones cada pocas horas durante la corrección.' },
      { q: '¿Por qué no le pones suero salino isotónico?', pista: 'Compara osmolaridades.', r: 'Porque su osmolaridad urinaria (480) es superior a la del suero salino isotónico (≈ 308): el riñón excretaría el sodio administrado concentrado en poca agua y retendría el resto del agua libre, de modo que la natremia podría <b>empeorar</b>. Es el fenómeno de desalinización, y es un error clásico y contraintuitivo en el manejo del SIADH.' }
    ],
    cierre: 'Toda alteración de la natremia se resuelve separando dos preguntas —osmolaridad y volumen— y recordando que lo que se está midiendo es agua, no sodio.'
  },

  tarjetas: [
    { f: 'Sodio vs agua: qué regula cada uno', d: 'SODIO determina el VOLUMEN extracelular (regulado por SRAA). AGUA determina la OSMOLARIDAD y por tanto la natremia (regulada por ADH y sed). Son ejes independientes.' },
    { f: '¿Qué mide realmente la natremia?', d: 'Una CONCENTRACIÓN, es decir, la relación sodio/agua. Informa sobre todo del AGUA. Un paciente edematoso (sodio corporal alto) puede estar hiponatrémico por retener proporcionalmente más agua.' },
    { f: 'Estímulo no osmótico de ADH', d: 'La caída del volumen circulante efectivo libera ADH vía barorreceptores AUNQUE la osmolaridad sea baja: el cuerpo prioriza volumen sobre concentración. Explica la hiponatremia de IC, cirrosis e hipovolemia.' },
    { f: 'Algoritmo de la hiponatremia (2 preguntas)', d: '1) ¿Es hipoosmolar? Descarta pseudohiponatremia e hiponatremia hipertónica (glucosa: −1,6 a −2,4 mEq/L por cada 100 mg/dL de exceso). 2) ¿Volumen extracelular? Hipo (dar volumen), eu (SIADH: restricción), hiper (restricción + descongestión).' },
    { f: 'Criterios de SIADH', d: 'Euvolemia + osmolaridad plasmática baja + osmolaridad urinaria > 100 mOsm/kg (inapropiadamente alta) + Na urinario > 30 + tiroides y suprarrenal normales. Diagnóstico de exclusión.' },
    { f: 'Velocidad de corrección de la hiponatremia', d: 'Máximo 8–10 mEq/L en 24 h (6–8 si alcoholismo, desnutrición, hepatopatía o hipopotasemia). Corregir rápido una hiponatremia CRÓNICA → desmielinización osmótica. No corregir una AGUDA sintomática → edema cerebral.' },
    { f: '¿Por qué el salino isotónico puede EMPEORAR el SIADH?', d: 'Si la osmolaridad urinaria supera la del suero (≈308), el riñón excreta el sodio concentrado y retiene agua libre: balance neto de agua positivo y natremia menor. Fenómeno de "desalinización".' },
    { f: 'Hipernatremia mantenida: qué implica siempre', d: 'Un problema de AGUA más un problema de ACCESO: la sed es tan potente que quien puede beber se corrige solo. Implica paciente dependiente, con conciencia alterada, intubado o lactante.' }
  ]
},

/* ---------------------------------------------------------- */
{
  id: 'acido-base',
  modulo: 'medio-interno',
  nombre: 'Equilibrio ácido-base: enfoque sistemático',
  alto: true,
  minutos: 26,
  requisitos: [],
  ideaCentral: 'Interpretar una gasometría no requiere memorizar patrones sino seguir siempre el mismo orden: mirar el pH, identificar el trastorno primario, comprobar si la compensación es la esperada y calcular el anión gap. Ese orden fijo detecta los trastornos mixtos, que son los que se escapan cuando se interpreta por reconocimiento visual.',

  anclaje: {
    q: 'Sin mirar: pH 7,38, PaCO₂ 26, HCO₃⁻ 15, Na⁺ 140, Cl⁻ 100. El pH es prácticamente normal. ¿Está este paciente bien?',
    pista: 'Calcula el anión gap antes de responder. Un pH normal no significa ausencia de trastorno.'
  },

  bloques: [
    {
      nivel: 'imprescindible',
      titulo: 'Los cuatro pasos, siempre en el mismo orden',
      html: '<ol><li><b>Mira el pH.</b> < 7,35 acidemia; > 7,45 alcalemia. Si es normal, sigue igualmente: puede haber trastornos mixtos que se cancelan.</li>' +
        '<li><b>Identifica el trastorno primario.</b> ¿Qué explica la desviación del pH? Si el pH está bajo y el bicarbonato bajo, es metabólico; si el pH está bajo y la PaCO₂ alta, es respiratorio.</li>' +
        '<li><b>Comprueba la compensación.</b> La compensación <b>nunca</b> normaliza el pH ni lo sobrepasa. Si el valor observado difiere del esperado, hay un <b>segundo trastorno</b>.</li>' +
        '<li><b>Calcula el anión gap</b> en toda acidosis metabólica, y si está elevado calcula el <b>gap-gap</b> (delta-delta) para descubrir trastornos ocultos.</li></ol>' +
        '<table><tr><th>Trastorno primario</th><th>Compensación esperada</th></tr>' +
        '<tr><td>Acidosis metabólica</td><td><b>Winter</b>: PaCO₂ = 1,5 × HCO₃⁻ + 8 (± 2)</td></tr>' +
        '<tr><td>Alcalosis metabólica</td><td>PaCO₂ sube ~0,7 mmHg por cada mEq/L de HCO₃⁻</td></tr>' +
        '<tr><td>Acidosis respiratoria aguda</td><td>HCO₃⁻ sube 1 por cada 10 mmHg de PaCO₂</td></tr>' +
        '<tr><td>Acidosis respiratoria crónica</td><td>HCO₃⁻ sube <b>3,5</b> por cada 10 mmHg de PaCO₂</td></tr>' +
        '<tr><td>Alcalosis respiratoria aguda</td><td>HCO₃⁻ baja 2 por cada 10 mmHg de PaCO₂</td></tr>' +
        '<tr><td>Alcalosis respiratoria crónica</td><td>HCO₃⁻ baja <b>4–5</b> por cada 10 mmHg de PaCO₂</td></tr></table>' +
        '<p>La diferencia entre las respuestas agudas y crónicas revela quién compensa: el pulmón compensa lo metabólico en <b>minutos</b>, y el riñón compensa lo respiratorio en <b>días</b>. Por eso un bicarbonato de 32 en un paciente hipercápnico indica cronicidad.</p>'
    },
    {
      nivel: 'imprescindible',
      titulo: 'Anión gap: qué es y qué revela',
      html: '<p style="text-align:center"><code>AG = Na⁺ − (Cl⁻ + HCO₃⁻)</code> &nbsp; normal 8–12 mEq/L</p>' +
        '<p>Representa los aniones no medidos, sobre todo la <b>albúmina</b>. De ahí una corrección imprescindible en el paciente crítico, que suele estar hipoalbuminémico: <b>sumar 2,5 al anión gap por cada 1 g/dL de albúmina por debajo de 4</b>. Sin esta corrección se pasan por alto acidosis con gap elevado.</p>' +
        '<table><tr><th>Acidosis metabólica con AG ALTO</th><th>Acidosis metabólica con AG NORMAL (hiperclorémica)</th></tr>' +
        '<tr><td>Cetoacidosis (diabética, alcohólica, ayuno)</td><td>Diarrea (pérdida digestiva de bicarbonato)</td></tr>' +
        '<tr><td>Acidosis láctica (tipo A por hipoperfusión, tipo B sin ella)</td><td>Acidosis tubular renal</td></tr>' +
        '<tr><td>Uremia</td><td>Suero salino en exceso (acidosis hiperclorémica dilucional)</td></tr>' +
        '<tr><td>Tóxicos: metanol, etilenglicol, salicilatos</td><td>Acetazolamida, hipoaldosteronismo</td></tr></table>' +
        '<p>🔥 El <b>gap-gap</b> es lo que descubre los trastornos mixtos: compara cuánto ha subido el anión gap con cuánto ha bajado el bicarbonato. Si el anión gap sube 12 pero el bicarbonato solo baja 6, hay una <b>alcalosis metabólica</b> asociada que está sosteniendo el bicarbonato. Si el bicarbonato baja mucho más de lo que sube el gap, hay además una acidosis hiperclorémica.</p>',
      cadena: ['pH', 'Trastorno primario', '¿Compensación esperada?', 'Anión gap corregido', 'Gap-gap', 'Diagnóstico completo']
    },
    {
      nivel: 'importante',
      titulo: 'El paciente crítico: por qué casi siempre es mixto',
      html: '<p>En la UCI los trastornos puros son la excepción. Un paciente séptico puede tener simultáneamente:</p>' +
        '<ul><li><b>Acidosis láctica</b> con anión gap elevado por hipoperfusión.</li>' +
        '<li><b>Alcalosis respiratoria</b> por taquipnea, que precede a la acidosis.</li>' +
        '<li><b>Acidosis hiperclorémica</b> por la reanimación con suero salino al 0,9 %, que aporta 154 mEq/L de cloro (frente a los ~100 del plasma).</li>' +
        '<li><b>Alcalosis metabólica</b> por vómitos, aspiración nasogástrica o diuréticos.</li>' +
        '<li><b>Acidosis por hipoalbuminemia</b> enmascarada si no se corrige el anión gap.</li></ul>' +
        '<p>El pH resultante puede ser engañosamente normal. Solo el recorrido sistemático de los cuatro pasos revela lo que está pasando, y cada componente tiene un tratamiento distinto.</p>' +
        '<p>Sobre el <b>lactato</b>: es el marcador más usado, pero conviene matizar que no siempre indica hipoxia tisular. Aumenta también por glucólisis aeróbica estimulada por adrenalina (endógena o administrada), por fallo del aclaramiento hepático y por algunos fármacos. Su <b>tendencia</b> informa más que un valor aislado.</p>'
    },
    {
      nivel: 'complementario',
      titulo: 'Gap osmolar, alcalosis metabólica y cetoacidosis',
      html: '<p><b>Gap osmolar</b> = osmolaridad medida − calculada [2×Na + glucosa/18 + urea/5,6]. Si supera 10 mOsm/kg hay un osmol no medido: sospecha <b>intoxicación por metanol o etilenglicol</b>, especialmente si coexiste con anión gap elevado. Es un cálculo que salva vidas porque el tratamiento (fomepizol, etanol, diálisis) es específico y urgente.</p>' +
        '<p><b>Alcalosis metabólica</b>: se clasifica según responda o no al cloro. <b>Sensible al cloro</b> (cloro urinario < 20): vómitos, aspiración nasogástrica, diuréticos, y se corrige con suero salino. <b>Resistente al cloro</b> (cloro urinario > 20): hiperaldosteronismo, síndrome de Cushing, hipopotasemia grave, y no responde al salino. Un punto clave: la alcalosis metabólica <b>se mantiene</b> por la deplección de volumen, de cloro y de potasio, de modo que corregirlos es lo que la resuelve.</p>' +
        '<p><b>Cetoacidosis diabética</b>: la ausencia de insulina impide la utilización de glucosa y activa la lipólisis, generando cuerpos cetónicos. Cursa con acidosis de anión gap elevado, hiperglucemia y deshidratación por diuresis osmótica. El detalle que más se olvida: el <b>potasio plasmático puede ser normal o alto</b> pese a un déficit corporal total enorme, porque la acidosis y la falta de insulina desplazan potasio al extracelular. Al iniciar insulina el potasio se desploma, y por eso se repone antes de que caiga y no se inicia insulina si el potasio es inferior a 3,3 mEq/L.</p>'
    }
  ],

  variables: [
    { n: 'pH', d: 'down', nota: 'punto de partida, nunca el único dato' },
    { n: 'Bicarbonato', d: 'down', nota: 'componente metabólico' },
    { n: 'PaCO₂', d: 'down', nota: 'componente respiratorio; compensa en minutos' },
    { n: 'Anión gap corregido', d: 'up', nota: 'corrige por albúmina o pasarás por alto acidosis' }
  ],

  fisiopatologia: '<p>El organismo defiende el pH en tres tiempos: los <b>tampones</b> actúan en segundos (bicarbonato en el extracelular, hemoglobina y fosfatos en el intracelular, carbonato del hueso en la acidosis crónica), la <b>compensación respiratoria</b> en minutos y la <b>compensación renal</b> en días, mediante reabsorción de bicarbonato y excreción de ácido como amonio y acidez titulable.</p>' +
    '<p>Las consecuencias de la acidemia severa (pH < 7,20) son directas y explican su gravedad: <b>deprime la contractilidad</b> miocárdica porque los protones compiten con el calcio por la troponina C, <b>reduce la respuesta vascular a las catecolaminas</b>, produce vasodilatación arterial con venoconstricción pulmonar, favorece arritmias y desplaza potasio al extracelular. La alcalemia severa, por su parte, reduce el calcio iónico —favoreciendo tetania y arritmias—, desplaza la curva de la hemoglobina a la izquierda dificultando la cesión de oxígeno, y produce vasoconstricción cerebral y coronaria.</p>',

  clinica: '<p>Aplicación práctica en la UCI: la elección del fluido de reanimación no es indiferente. El <b>suero salino al 0,9 %</b> aporta 154 mEq/L de cloro y produce acidosis metabólica hiperclorémica cuando se administra en grandes volúmenes, con posible reducción del flujo renal por vasoconstricción mediada por la retroalimentación tubuloglomerular. Las <b>soluciones balanceadas</b> (Ringer lactato, Plasmalyte) tienen una composición más próxima al plasma y evitan ese efecto.</p>' +
    '<p>Y sobre el bicarbonato terapéutico: su uso rutinario en la acidosis láctica no ha demostrado beneficio y puede empeorar la acidosis intracelular al generar CO₂ que difunde libremente a la célula. Se reserva para acidosis severa con repercusión hemodinámica, hiperpotasemia grave, intoxicaciones concretas y acidosis con anión gap normal por pérdidas de bicarbonato.</p>',

  error: {
    confunde: 'Interpretar una gasometría por reconocimiento del patrón, sin recorrer los cuatro pasos.',
    parecido: 'En los casos simples el patrón salta a la vista y el atajo funciona, lo que consolida el hábito.',
    diferencia: 'Los trastornos <b>mixtos</b> —la norma en el paciente crítico— pueden producir un pH normal, y solo se detectan comprobando si la compensación es la esperada y calculando el anión gap y el gap-gap. Un pH de 7,40 puede ocultar simultáneamente una acidosis láctica severa y una alcalosis metabólica por vómitos, situaciones que exigen tratamientos opuestos.',
    ejemplo: 'El anclaje de este tema: pH 7,38 aparentemente normal, pero con bicarbonato de 15 y anión gap de 25. Hay una acidosis metabólica grave con anión gap elevado y una alcalosis respiratoria concurrente. Quedarse en el pH habría hecho pasar por alto ambas.',
    regla: 'Nunca leas solo el pH. Cuatro pasos, siempre en el mismo orden, incluso —y sobre todo— cuando el pH parezca normal.'
  },

  perla: '🔥 Los cuatro pasos: <b>pH → trastorno primario → compensación esperada → anión gap corregido</b> (y gap-gap si está elevado). Y dos reglas que ahorran errores: la compensación nunca normaliza el pH, y el anión gap debe corregirse por albúmina en todo paciente crítico (+2,5 por cada g/dL por debajo de 4).',

  feynman: {
    consigna: 'Explica por qué un paciente puede tener un pH normal y aun así encontrarse en una situación crítica desde el punto de vista ácido-base, y cómo lo detectarías.',
    puntos: [
      'Explico que el pH es un resultado neto de fuerzas que pueden cancelarse',
      'Introduzco la comprobación de la compensación esperada como detector',
      'Explico el anión gap y su corrección por albúmina',
      'Explico el gap-gap y qué revela',
      'Doy un ejemplo concreto de trastorno mixto con pH normal'
    ],
    referencia: '<p>El pH es un <b>resultado neto</b>. Si coexisten un trastorno que acidifica y otro que alcaliniza, sus efectos pueden cancelarse y dejar el pH dentro del rango normal mientras ambos procesos avanzan. Por eso la interpretación por reconocimiento visual falla precisamente en los pacientes más graves, que son los que suelen tener trastornos mixtos.</p>' +
      '<p>El primer detector es comprobar si la <b>compensación es la esperada</b>. La compensación fisiológica tiene una magnitud predecible y, crucialmente, <b>nunca normaliza el pH ni lo cruza al otro lado</b>: es una respuesta que amortigua, no que corrige. Si en una acidosis metabólica con bicarbonato de 15 la fórmula de Winter predice una PaCO₂ de aproximadamente 30 y el paciente tiene 22, no está simplemente compensando: tiene además una <b>alcalosis respiratoria primaria</b>. Y si tuviera 40, tendría una acidosis respiratoria añadida, es decir, estaría empezando a fatigarse.</p>' +
      '<p>El segundo detector es el <b>anión gap</b>, que hay que calcular en toda acidosis metabólica: <code>Na − (Cl + HCO₃)</code>. Representa los aniones no medidos, y como el principal es la albúmina, en el paciente crítico —habitualmente hipoalbuminémico— debe corregirse sumando 2,5 por cada gramo de albúmina por debajo de 4 g/dL. Sin esa corrección, una acidosis láctica significativa puede aparecer con un anión gap aparentemente normal.</p>' +
      '<p>El tercer detector es el <b>gap-gap</b>: comparar cuánto ha aumentado el anión gap con cuánto ha descendido el bicarbonato. En una acidosis con anión gap elevado pura, ambos cambios deberían ser aproximadamente equivalentes, porque cada anión añadido consume un bicarbonato. Si el anión gap ha subido 15 pero el bicarbonato solo ha bajado 6, hay una <b>alcalosis metabólica concurrente</b> que está sosteniendo el bicarbonato. Si el bicarbonato ha bajado mucho más de lo que ha subido el gap, coexiste una acidosis hiperclorémica, típicamente por reanimación con suero salino.</p>' +
      '<p>Un ejemplo concreto: un paciente séptico con pH 7,39, PaCO₂ 24, bicarbonato 14, cloro 96, albúmina 2 g/dL y lactato 6. El pH parece normal, pero el bicarbonato es muy bajo, la PaCO₂ está por debajo de lo que predice Winter, y el anión gap corregido por la hipoalbuminemia es muy elevado. Tiene simultáneamente una acidosis láctica grave y una alcalosis respiratoria. Ese paciente no está estable: está compensando al máximo, y en cuanto se fatigue y la PaCO₂ suba a valores «normales», el pH se desplomará. Reconocer esa situación <b>antes</b> de que ocurra es exactamente para lo que sirve el método sistemático.</p>'
  },

  preguntas: [
    { nivel: 1, q: 'Enuncia los cuatro pasos de la interpretación sistemática de una gasometría.', r: '1) Mirar el pH. 2) Identificar el trastorno primario. 3) Comprobar si la compensación es la esperada. 4) Calcular el anión gap (corregido por albúmina) y, si está elevado, el gap-gap.' },
    { nivel: 1, q: 'Escribe la fórmula de Winter y para qué sirve.', r: 'PaCO₂ esperada = 1,5 × HCO₃⁻ + 8 (± 2). Predice la compensación respiratoria de una acidosis metabólica; si la PaCO₂ real difiere, hay un trastorno respiratorio añadido.' },
    { nivel: 1, q: '¿Cómo se corrige el anión gap por la albúmina y por qué importa?', r: 'Sumando aproximadamente 2,5 mEq/L por cada g/dL de albúmina por debajo de 4. Importa porque la albúmina es el principal anión no medido y los pacientes críticos suelen estar hipoalbuminémicos: sin corregir, se pasan por alto acidosis con gap elevado.' },
    { nivel: 2, q: '¿Cómo distingues una acidosis respiratoria aguda de una crónica?', r: 'Por la magnitud de la compensación renal: en la aguda el bicarbonato sube 1 mEq/L por cada 10 mmHg de PaCO₂; en la crónica sube 3,5, porque el riñón ha tenido días para responder. Un bicarbonato de 32 en un hipercápnico indica cronicidad.' },
    { nivel: 2, q: '¿Qué es el gap-gap y qué revela?', r: 'La comparación entre el aumento del anión gap y el descenso del bicarbonato. Si el gap sube más de lo que baja el bicarbonato, hay una alcalosis metabólica asociada; si el bicarbonato baja más de lo que sube el gap, hay una acidosis hiperclorémica añadida.' },
    { nivel: 2, q: '¿Por qué el suero salino al 0,9 % produce acidosis metabólica?', r: 'Porque aporta 154 mEq/L de cloro frente a los ~100 del plasma. El exceso de cloro desplaza bicarbonato y produce acidosis hiperclorémica con anión gap normal; además puede reducir el flujo renal por vasoconstricción mediada por la retroalimentación tubuloglomerular.' },
    { nivel: 3, q: 'Paciente con pH 7,39, PaCO₂ 24, HCO₃⁻ 14, Na 138, Cl 96, albúmina 2 g/dL, lactato 6. Interpreta completamente.', r: 'Anión gap = 138 − (96 + 14) = 28, y corregido por la albúmina de 2 g/dL se suman 5 más: 33, muy elevado. Hay una acidosis metabólica grave con anión gap alto (láctica). La PaCO₂ esperada por Winter sería 1,5 × 14 + 8 = 29 ± 2, y la real es 24: hay además una <b>alcalosis respiratoria primaria</b>. El pH normal es engañoso: el paciente está compensando al límite y en cuanto se fatigue el pH se desplomará. Requiere tratamiento urgente de la causa de la hipoperfusión.' },
    { nivel: 3, q: 'Paciente en cetoacidosis diabética con potasio de 5,2 mEq/L. ¿Puedes iniciar insulina sin más? Razónalo.', r: 'El potasio plasmático de 5,2 esconde un <b>déficit corporal total importante</b>: la acidosis y la falta de insulina han desplazado potasio desde el interior de la célula al extracelular, mientras la diuresis osmótica lo ha estado eliminando por orina durante horas o días. Al iniciar insulina, el potasio entra masivamente a la célula y la cifra se desploma, con riesgo de arritmias y de debilidad muscular respiratoria. La conducta correcta es iniciar insulina añadiendo potasio a la fluidoterapia en cuanto la cifra sea inferior a 5,2–5,5, y <b>no iniciar insulina</b> si el potasio es menor de 3,3 hasta haberlo repuesto. Es uno de los errores con consecuencias más inmediatas del manejo de la cetoacidosis.' }
  ],

  caso: {
    vineta: 'Mujer de 34 años, diabética tipo 1, ingresa con vómitos de 2 días y respiración profunda. Glucemia 480 mg/dL. pH 7,18, PaCO₂ 22, HCO₃⁻ 8, Na⁺ 132, Cl⁻ 92, K⁺ 5,4, albúmina 4,0. Cetonas positivas.',
    pasos: [
      { q: 'Recorre los pasos 1 a 3.', pista: 'pH, primario, compensación.', r: 'pH 7,18: acidemia. Con bicarbonato de 8, el trastorno primario es una <b>acidosis metabólica</b>. Winter predice PaCO₂ = 1,5 × 8 + 8 = 20 ± 2, y la real es 22: la compensación respiratoria es <b>adecuada</b>, no hay trastorno respiratorio añadido. Su respiración profunda es la respiración de Kussmaul, esa compensación en acción.' },
      { q: 'Calcula el anión gap.', pista: 'Na − (Cl + HCO₃), y mira la albúmina.', r: '132 − (92 + 8) = 32, muy elevado. La albúmina es normal (4,0), así que no requiere corrección. Corresponde a la cetoacidosis: los cuerpos cetónicos son los aniones no medidos.' },
      { q: 'Aplica el gap-gap. ¿Qué encuentras?', pista: 'Compara el aumento del gap con el descenso del bicarbonato.', r: 'El anión gap ha subido 20 por encima de lo normal (32 − 12) y el bicarbonato ha bajado 16 (24 − 8). El aumento del gap supera al descenso del bicarbonato, lo que sugiere una <b>alcalosis metabólica concurrente</b> que está sosteniendo el bicarbonato: encaja perfectamente con los dos días de vómitos, que hacen perder ácido clorhídrico.' },
      { q: 'Su potasio es 5,4. ¿Tiene exceso de potasio?', pista: 'Plasmático frente a corporal total.', r: 'No: tiene un <b>déficit corporal total importante</b>. La acidosis y la falta de insulina han desplazado potasio del interior celular al plasma, y la diuresis osmótica lleva dos días eliminándolo. La cifra plasmática enmascara la depleción real.' },
      { q: '¿Qué ocurre con el potasio al iniciar insulina y cómo lo previenes?', pista: 'La insulina mete potasio en la célula.', r: 'Se desploma, porque la insulina activa la bomba Na⁺/K⁺-ATPasa e introduce potasio en la célula, y simultáneamente la corrección de la acidosis retira el otro mecanismo que lo mantenía fuera. Puede producir arritmias y debilidad muscular. Se previene añadiendo potasio a la fluidoterapia en cuanto baje de 5,2–5,5 mEq/L, con controles frecuentes, y no iniciando insulina si el potasio es inferior a 3,3 hasta haberlo repuesto.' },
      { q: '¿Le administrarías bicarbonato con un pH de 7,18?', pista: 'Piensa en el CO₂ que genera.', r: 'En general no. En la cetoacidosis, el tratamiento con insulina y fluidos corrige la acidosis al detener la cetogénesis y permitir el metabolismo de los cetoácidos a bicarbonato. El bicarbonato administrado genera CO₂, que difunde libremente a la célula y puede <b>empeorar la acidosis intracelular</b>, incluida la del sistema nervioso central; además agrava la hipopotasemia y desplaza la curva de la hemoglobina a la izquierda. Se reserva para pH muy bajos (habitualmente < 6,9) con repercusión hemodinámica.' }
    ],
    cierre: 'Esta gasometría contiene tres trastornos —acidosis metabólica con gap elevado, alcalosis metabólica por vómitos y compensación respiratoria adecuada— y solo el recorrido sistemático los saca todos a la luz.'
  },

  tarjetas: [
    { f: 'Los cuatro pasos de la gasometría', d: '1) pH. 2) Trastorno primario. 3) ¿Compensación esperada? (si no lo es, hay un segundo trastorno). 4) Anión gap corregido por albúmina y, si es alto, gap-gap. La compensación NUNCA normaliza el pH.' },
    { f: 'Fórmula de Winter', d: 'PaCO₂ esperada = 1,5 × HCO₃⁻ + 8 (± 2), para la compensación de una acidosis metabólica. Si la real es menor: alcalosis respiratoria añadida. Si es mayor: acidosis respiratoria (fatiga).' },
    { f: 'Compensación renal: aguda vs crónica', d: 'Acidosis respiratoria: HCO₃⁻ sube 1 por cada 10 de PaCO₂ si es AGUDA, 3,5 si es CRÓNICA. Alcalosis respiratoria: baja 2 (aguda) o 4–5 (crónica). El pulmón compensa en minutos; el riñón, en días.' },
    { f: 'Anión gap: fórmula y corrección', d: 'AG = Na − (Cl + HCO₃), normal 8–12. CORREGIR sumando 2,5 por cada g/dL de albúmina por debajo de 4: sin ello se pasan por alto acidosis en el paciente crítico.' },
    { f: 'Acidosis con AG alto vs AG normal', d: 'AG ALTO: cetoacidosis, láctica, uremia, tóxicos (metanol, etilenglicol, salicilatos). AG NORMAL (hiperclorémica): diarrea, acidosis tubular renal, exceso de suero salino, acetazolamida.' },
    { f: 'Gap-gap (delta-delta): qué revela', d: 'Compara el ascenso del AG con el descenso del HCO₃. Si el AG sube MÁS de lo que baja el bicarbonato → alcalosis metabólica asociada. Si el bicarbonato baja MÁS → acidosis hiperclorémica añadida.' },
    { f: 'Gap osmolar', d: 'Osmolaridad medida − calculada (2×Na + glucosa/18 + urea/5,6). > 10 mOsm/kg = osmol no medido: sospecha metanol o etilenglicol, sobre todo si el AG también está alto. Tratamiento específico y urgente.' },
    { f: 'Potasio en la cetoacidosis diabética', d: 'El potasio PLASMÁTICO puede ser normal o alto con un déficit corporal ENORME (acidosis y falta de insulina lo sacan de la célula; la diuresis osmótica lo elimina). Al dar insulina se desploma: reponer antes, y NO iniciar insulina si K⁺ < 3,3.' },
    { f: 'Efectos de la acidemia severa (pH < 7,20)', d: 'Deprime la contractilidad (H⁺ compiten con Ca²⁺ por la troponina C), reduce la respuesta a catecolaminas, vasodilatación arterial con venoconstricción pulmonar, arritmias e hiperpotasemia.' }
  ]
},

/* ---------------------------------------------------------- */
{
  id: 'potasio',
  modulo: 'medio-interno',
  nombre: 'Potasio: distribución, excreción y urgencias',
  alto: true,
  minutos: 18,
  requisitos: ['acido-base'],
  ideaCentral: 'El potasio plasmático representa apenas el 2 % del potasio corporal, de modo que su cifra informa más de la distribución entre compartimentos que de las reservas totales. Como determina el potencial de reposo de todas las células excitables, sus alteraciones son emergencias eléctricas, y distinguir un problema de distribución de uno de balance total decide el tratamiento.',

  anclaje: {
    q: 'Sin mirar: ¿por qué un paciente en cetoacidosis puede tener potasio de 5,5 con un déficit corporal de cientos de miliequivalentes? Nombra los dos mecanismos.',
    pista: 'Uno tiene que ver con el pH y otro con una hormona ausente.'
  },

  bloques: [
    {
      nivel: 'imprescindible',
      titulo: 'Distribución: el 98 % está dentro de la célula',
      html: '<p>El potasio es el catión intracelular por excelencia: unos 3.500 mEq en el organismo, de los cuales solo unos 60–70 circulan en el extracelular. Ese gradiente lo mantiene la <b>bomba Na⁺/K⁺-ATPasa</b> y es lo que fija el potencial de reposo de la membrana.</p>' +
        '<p>Consecuencia práctica de primer orden: <b>pequeños desplazamientos entre compartimentos producen cambios enormes en la cifra plasmática</b> sin que haya cambiado el contenido corporal. Los factores que desplazan potasio son:</p>' +
        '<table><tr><th>Hacia DENTRO de la célula (baja el plasmático)</th><th>Hacia FUERA (sube el plasmático)</th></tr>' +
        '<tr><td><b>Insulina</b></td><td>Déficit de insulina</td></tr>' +
        '<tr><td>Betaagonistas (salbutamol)</td><td>Betabloqueantes</td></tr>' +
        '<tr><td>Alcalosis</td><td><b>Acidosis</b> (sobre todo metabólica hiperclorémica)</td></tr>' +
        '<tr><td>Aldosterona</td><td>Lisis celular: rabdomiólisis, hemólisis, síndrome de lisis tumoral, quemaduras</td></tr></table>' +
        '<p>Nota importante: la acidosis <b>orgánica</b> (láctica, cetoacidosis) desplaza potasio mucho menos que la hiperclorémica, porque el anión orgánico entra en la célula acompañando al protón. Esto explica que en la cetoacidosis el determinante principal de la hiperpotasemia sea la falta de insulina más que la acidosis en sí.</p>'
    },
    {
      nivel: 'imprescindible',
      titulo: 'Excreción: dónde se decide el balance',
      html: '<p>Casi todo el potasio filtrado se reabsorbe antes del túbulo distal; el balance final se decide en el <b>túbulo colector</b>, donde la <b>aldosterona</b> estimula su secreción por las células principales. Tres factores determinan cuánto se excreta:</p>' +
        '<ol><li><b>Aldosterona</b> (la señal hormonal).</li>' +
        '<li><b>Flujo distal</b>: cuanto más orina llega al colector, más potasio se arrastra. Por eso los diuréticos de asa y tiazidas producen hipopotasemia.</li>' +
        '<li><b>Aporte de sodio al colector</b>: la reabsorción de sodio genera el gradiente eléctrico que favorece la salida de potasio.</li></ol>' +
        '<p>De aquí se deduce toda la farmacología: los diuréticos de asa y tiazidas aumentan flujo y sodio distal (pierden potasio); la espironolactona bloquea el receptor mineralocorticoide y el amiloride el canal de sodio (ahorran potasio); los IECA y ARA-II reducen la aldosterona (retienen potasio).</p>' +
        '<p>🔥 Relación con el <b>magnesio</b>, que se olvida constantemente: la hipomagnesemia impide corregir una hipopotasemia, porque el magnesio bloquea los canales ROMK del colector y su ausencia deja fugar potasio por orina. <b>Una hipopotasemia refractaria es una hipomagnesemia hasta que se demuestre lo contrario.</b></p>',
      cadena: ['Aldosterona', '+ Flujo distal', '+ Sodio en el colector', 'Secreción de K⁺', 'Balance final']
    },
    {
      nivel: 'importante',
      titulo: 'Hiperpotasemia: emergencia eléctrica',
      html: '<p>Eleva el potencial de reposo (lo hace menos negativo), inactiva canales de sodio y enlentece la conducción. Secuencia electrocardiográfica: <b>ondas T picudas y estrechas → PR largo y pérdida de la onda P → QRS ancho → onda sinusoidal → asistolia o fibrilación ventricular</b>. La correlación con la cifra es pobre: importa más la velocidad de instauración y el ECG que el número.</p>' +
        '<p>Tratamiento en tres tiempos, y confundirlos es peligroso:</p>' +
        '<table><tr><th>Objetivo</th><th>Medida</th><th>Inicio / duración</th></tr>' +
        '<tr><td><b>1. Estabilizar</b> la membrana</td><td>Gluconato o cloruro cálcico</td><td>Minutos / 30–60 min. <b>No baja el potasio</b></td></tr>' +
        '<tr><td><b>2. Desplazar</b> a la célula</td><td>Insulina con glucosa; salbutamol; bicarbonato si hay acidosis</td><td>15–30 min / horas. Tampoco lo elimina</td></tr>' +
        '<tr><td><b>3. Eliminar</b></td><td>Diuréticos, resinas o quelantes, <b>diálisis</b></td><td>Horas. Es lo único definitivo</td></tr></table>' +
        '<p>El error clásico es detenerse en los dos primeros pasos: el potasio vuelve a salir de la célula en unas horas y el paciente rebota si no se ha eliminado.</p>'
    },
    {
      nivel: 'complementario',
      titulo: 'Hipopotasemia y seudohiperpotasemia',
      html: '<p>La <b>hipopotasemia</b> hiperpolariza la membrana y prolonga la repolarización: aparecen aplanamiento de la onda T, <b>onda U</b>, descenso del ST y QT aparentemente largo, con riesgo de extrasístoles, taquicardia ventricular y torsade. Potencia además la toxicidad digitálica, porque el potasio compite con la digoxina por la Na⁺/K⁺-ATPasa.</p>' +
        '<p>Clínicamente produce debilidad muscular que puede llegar a la parálisis y a comprometer la musculatura respiratoria, íleo, rabdomiólisis y, si es crónica, diabetes insípida nefrogénica.</p>' +
        '<p>Un dato de magnitud que ayuda a dimensionar: un descenso del potasio plasmático de 1 mEq/L equivale aproximadamente a un déficit corporal de <b>200–400 mEq</b>. La reposición siempre es más lenta de lo que sugiere la cifra.</p>' +
        '<p><b>Seudohiperpotasemia</b>: cifra elevada por liberación de potasio <i>in vitro</i>, por hemólisis de la muestra, torniquete prolongado con apertura y cierre del puño, trombocitosis o leucocitosis extremas. Se sospecha ante una hiperpotasemia sin causa aparente y con ECG normal, y se confirma repitiendo la extracción con técnica cuidadosa. Tratar una seudohiperpotasemia puede producir una hipopotasemia yatrógena grave.</p>'
    }
  ],

  variables: [
    { n: 'Potasio plasmático', d: 'up', nota: 'solo el 2 % del total: refleja distribución' },
    { n: 'Insulina', d: 'up', nota: 'introduce potasio en la célula' },
    { n: 'Aldosterona', d: 'up', nota: 'aumenta la secreción en el colector' },
    { n: 'Magnesio', d: 'down', nota: 'si falta, la hipopotasemia no se corrige' }
  ],

  fisiopatologia: '<p>Las causas de <b>hiperpotasemia</b> se ordenan en tres grupos: aumento del aporte (raro si el riñón funciona), redistribución (acidosis, déficit de insulina, betabloqueantes, lisis celular, succinilcolina en pacientes de riesgo) y, la más frecuente, <b>reducción de la excreción</b>: insuficiencia renal, hipoaldosteronismo, IECA y ARA-II, espironolactona, antiinflamatorios, heparina, trimetoprim y ciclosporina.</p>' +
    '<p>Las de <b>hipopotasemia</b>: pérdidas digestivas (diarrea, vómitos —estos últimos sobre todo por la alcalosis y el hiperaldosteronismo secundario, más que por el potasio del jugo gástrico—), pérdidas renales (diuréticos, hiperaldosteronismo, hipomagnesemia, anfotericina, acidosis tubular renal) y redistribución (insulina, betaagonistas, alcalosis, realimentación).</p>' +
    '<p>El <b>síndrome de realimentación</b> merece atención porque es prevenible: al reintroducir nutrición en un paciente desnutrido, la descarga de insulina desplaza masivamente potasio, fósforo y magnesio al interior celular, con riesgo de arritmias, debilidad respiratoria e insuficiencia cardíaca. Se previene reintroduciendo calorías lentamente y reponiendo electrolitos y tiamina antes.</p>',

  clinica: '<p>Reglas prácticas de reposición que Diego usará: por vía periférica no deben superarse concentraciones ni velocidades altas por riesgo de dolor y flebitis; la reposición rápida exige vía central y monitorización electrocardiográfica. Y siempre, siempre, <b>medir y corregir el magnesio</b>.</p>' +
    '<p>Ante una hiperpotasemia con alteraciones electrocardiográficas, el calcio va primero y no se espera a confirmar nada: estabiliza la membrana en minutos. Pero conviene recordar que no baja el potasio, de modo que el tratamiento debe continuar hasta eliminarlo.</p>',

  error: {
    confunde: 'Interpretar la cifra plasmática de potasio como medida de las reservas corporales.',
    parecido: 'Es el único valor disponible, se mide constantemente y en muchos pacientes estables sí se correlaciona razonablemente.',
    diferencia: 'Solo el 2 % del potasio está fuera de la célula, de modo que la cifra plasmática refleja fundamentalmente la <b>distribución</b>. Un paciente puede tener potasio normal o alto con un déficit corporal de cientos de miliequivalentes (cetoacidosis) o potasio bajo con contenido corporal normal (alcalosis aguda, salbutamol).',
    ejemplo: 'Paciente en cetoacidosis con potasio de 5,5: la falta de insulina y la acidosis lo han desplazado al plasma mientras la diuresis osmótica lo eliminaba durante días. Al iniciar insulina se desploma. Quien lea la cifra como «tiene potasio de sobra» provocará una hipopotasemia grave.',
    regla: 'Pregunta siempre por qué está donde está: ¿es un problema de <b>distribución</b> o de <b>balance total</b>? Y anticipa qué hará tu tratamiento con esa distribución.'
  },

  perla: '🔥 Hiperpotasemia: <b>estabilizar</b> (calcio, no baja el potasio) → <b>desplazar</b> (insulina-glucosa, salbutamol) → <b>eliminar</b> (diuréticos, quelantes, diálisis). Quedarse en los dos primeros pasos garantiza el rebote. Y toda hipopotasemia refractaria es una hipomagnesemia hasta que se demuestre lo contrario.',

  feynman: {
    consigna: 'Explica por qué el calcio intravenoso es lo primero en una hiperpotasemia con cambios electrocardiográficos, aunque no reduzca el potasio en absoluto.',
    puntos: [
      'Conecto el potasio extracelular con el potencial de reposo',
      'Explico la inactivación de canales de sodio y el enlentecimiento de la conducción',
      'Explico que el calcio actúa sobre el potencial umbral, no sobre el potasio',
      'Menciono su rapidez y su corta duración',
      'Concluyo que hay que continuar con desplazamiento y eliminación'
    ],
    referencia: '<p>El potencial de reposo de la célula lo fija casi por completo el gradiente de potasio a través de la membrana. Cuando sube el potasio extracelular, ese gradiente se estrecha y el potencial de reposo se hace <b>menos negativo</b>, por ejemplo de −90 a −70 mV.</p>' +
      '<p>Un reposo despolarizado mantiene inactivada una proporción creciente de los canales rápidos de sodio, cuya recuperación depende del voltaje. Con menos canales disponibles, la fase 0 del potencial de acción pierde velocidad y amplitud, y la conducción se enlentece por todo el corazón. Eso es lo que se ve en el electrocardiograma: primero ondas T picudas y estrechas por repolarización acelerada, después alargamiento del PR y desaparición de la onda P cuando la aurícula deja de despolarizarse, luego ensanchamiento progresivo del QRS, fusión con la onda T en un patrón sinusoidal y finalmente asistolia o fibrilación ventricular.</p>' +
      '<p>El <b>calcio intravenoso</b> no modifica la concentración de potasio ni el potencial de reposo. Lo que hace es desplazar el <b>potencial umbral</b> hacia valores menos negativos. Al alejar el umbral de un reposo que se había despolarizado, restaura una diferencia funcional de trabajo entre ambos y devuelve excitabilidad y velocidad de conducción a la membrana. Es una estabilización puramente electrofisiológica: actúa en <b>minutos</b> y dura poco, entre 30 y 60 minutos, y por eso puede repetirse.</p>' +
      '<p>Precisamente porque no toca el potasio, el calcio es solo el primer tiempo de un tratamiento en tres. El segundo consiste en <b>desplazar</b> el potasio al interior celular: insulina con glucosa —el más eficaz y predecible—, betaagonistas inhalados y bicarbonato si existe acidosis metabólica. Estas medidas bajan la cifra en 15–30 minutos, pero tampoco eliminan potasio del organismo: en unas horas vuelve a salir de la célula. El tercer tiempo es el único definitivo: <b>eliminarlo</b>, mediante diuréticos si el riñón responde, quelantes intestinales, y <b>diálisis</b> cuando la función renal está muy comprometida o la hiperpotasemia es grave y refractaria.</p>' +
      '<p>El error más frecuente y más peligroso es detenerse tras los dos primeros pasos, porque el electrocardiograma mejora, la cifra baja y todo parece resuelto, mientras el balance corporal de potasio sigue exactamente igual. Una cautela adicional: en la intoxicación digitálica el calcio se administra con precaución, porque la sobrecarga de calcio intracelular es el mecanismo mismo de la toxicidad.</p>'
  },

  preguntas: [
    { nivel: 1, q: '¿Qué proporción del potasio corporal es extracelular y qué implica?', r: 'Aproximadamente el 2 %. Implica que la cifra plasmática refleja sobre todo la distribución entre compartimentos y no las reservas corporales totales.' },
    { nivel: 1, q: 'Nombra tres factores que desplazan potasio al interior de la célula.', r: 'Insulina, betaagonistas y alcalosis (también la aldosterona). Sus opuestos —déficit de insulina, betabloqueantes, acidosis— lo desplazan al extracelular.' },
    { nivel: 1, q: '¿Dónde se decide el balance de potasio y qué tres factores lo determinan?', r: 'En el túbulo colector. Determinan la secreción: la aldosterona, el flujo distal de orina y el aporte de sodio al colector.' },
    { nivel: 2, q: '¿Por qué una hipopotasemia puede ser refractaria y qué debes medir?', r: 'Por hipomagnesemia: el magnesio bloquea los canales ROMK del túbulo colector, y su déficit permite que el potasio siga fugándose por orina pese a la reposición. Hay que medir y corregir el magnesio.' },
    { nivel: 2, q: 'Describe la secuencia electrocardiográfica de la hiperpotasemia y su mecanismo.', r: 'Ondas T picudas y estrechas → PR largo y pérdida de la onda P → QRS ancho → onda sinusoidal → asistolia o fibrilación ventricular. El mecanismo es un potencial de reposo despolarizado que inactiva los canales rápidos de sodio y enlentece la conducción.' },
    { nivel: 2, q: '¿Por qué la acidosis láctica desplaza menos potasio que la hiperclorémica?', r: 'Porque el anión orgánico (lactato) entra en la célula acompañando al protón, de modo que no se produce el mismo intercambio con potasio que ocurre cuando el anión es cloro, que permanece extracelular.' },
    { nivel: 3, q: 'Paciente con potasio de 7,2 mEq/L y QRS ancho en diálisis crónica. Detalla el tratamiento y su justificación temporal.', r: 'Primero <b>calcio intravenoso</b> de inmediato: desplaza el potencial umbral, restaura la excitabilidad y actúa en minutos, aunque no baje el potasio y dure solo 30–60 minutos. Simultáneamente, <b>desplazar</b>: insulina con glucosa y salbutamol nebulizado, con efecto en 15–30 minutos y duración de horas. Y en paralelo organizar el tercer paso, el único definitivo: <b>diálisis urgente</b>, porque en un paciente anúrico ni los diuréticos ni los quelantes resolverán el balance. Detenerse en los dos primeros pasos garantiza el rebote en pocas horas.' },
    { nivel: 3, q: 'Paciente desnutrido crónico al que se inicia nutrición y a las 48 horas presenta debilidad, arritmias y potasio de 2,4 con fósforo bajo. ¿Qué ocurrió y cómo se previene?', r: 'Síndrome de realimentación. Al reintroducir hidratos de carbono se produce una descarga de insulina que desplaza masivamente potasio, fósforo y magnesio al interior celular, donde son necesarios para la síntesis de ATP y de compuestos fosforilados. La caída de fósforo compromete la producción de ATP y el 2,3-DPG, y la de potasio y magnesio favorece arritmias y debilidad muscular, incluida la respiratoria. Se previene reintroduciendo calorías de forma gradual, reponiendo electrolitos antes y durante, administrando tiamina —cuyo consumo se dispara con el metabolismo de los hidratos— y monitorizando a diario los iones en la primera semana.' }
  ],

  caso: {
    vineta: 'Varón de 62 años con enfermedad renal crónica (creatinina basal 3,1), en tratamiento con enalapril y espironolactona. Acude por debilidad progresiva. ECG: ondas T picudas, PR de 260 ms, QRS de 130 ms. Potasio 7,4 mEq/L. Diuresis conservada.',
    pasos: [
      { q: '¿Qué haces en el primer minuto y por qué?', pista: 'La membrana antes que la cifra.', r: 'Calcio intravenoso, sin esperar a nada más. Con QRS ancho hay riesgo inminente de arritmia letal. El calcio desplaza el potencial umbral y restaura la excitabilidad en minutos, aunque no modifique la concentración de potasio.' },
      { q: '¿Qué añades a continuación y con qué expectativa temporal?', pista: 'Segundo tiempo.', r: 'Insulina con glucosa —lo más eficaz y predecible— y salbutamol nebulizado, con efecto en 15–30 minutos y duración de horas. Si hay acidosis metabólica, bicarbonato. Todas estas medidas <b>desplazan</b> el potasio al interior celular pero no lo eliminan del organismo.' },
      { q: 'Tiene diuresis conservada. ¿Cambia eso el tercer paso?', pista: 'La eliminación depende de que el riñón responda.', r: 'Sí, y a favor: con diuresis conservada puede intentarse la eliminación con diuréticos de asa, que aumentan el flujo distal y el aporte de sodio al colector, favoreciendo la secreción de potasio, junto con quelantes intestinales. Si fuera anúrico, la diálisis sería la única opción real.' },
      { q: 'Identifica todas las causas que han convergido.', pista: 'Fármacos y función renal.', r: 'La enfermedad renal crónica limita la excreción; el <b>enalapril</b> reduce la aldosterona; la <b>espironolactona</b> bloquea directamente el receptor mineralocorticoide del colector. Es la combinación clásica: dos fármacos que actúan sobre el mismo eje en un paciente con reserva renal reducida. Conviene además revisar antiinflamatorios, trimetoprim, heparina y suplementos o sustitutos de sal con potasio.' },
      { q: '¿Qué haces con su tratamiento crónico?', pista: 'Ni retirarlo todo para siempre ni reanudarlo sin más.', r: 'Suspender la espironolactona y suspender temporalmente el enalapril. Una vez resuelto el episodio, reevaluar: el IECA aporta beneficio renal y cardiovascular a largo plazo y puede reintroducirse a dosis menor con controles estrechos, dieta baja en potasio y evitando la asociación con ahorradores. La decisión se individualiza según la función renal y la indicación.' },
      { q: '¿En qué situación sospecharías que la cifra es falsa?', pista: 'Sin clínica ni ECG.', r: 'Si el ECG fuera <b>normal</b> y no hubiera causa aparente, habría que pensar en seudohiperpotasemia por hemólisis de la muestra, torniquete prolongado con contracción del puño, trombocitosis o leucocitosis extremas. Se confirma repitiendo la extracción con técnica cuidadosa. En este paciente, con ECG claramente alterado, la hiperpotasemia es indudablemente real.' }
    ],
    cierre: 'La hiperpotasemia es el ejemplo más limpio de un tratamiento en el que cada medida hace una cosa distinta: estabilizar no es desplazar, y desplazar no es eliminar.'
  },

  tarjetas: [
    { f: '¿Qué proporción del potasio es extracelular?', d: 'Solo el 2 % (unos 60–70 mEq de 3.500). La cifra plasmática refleja DISTRIBUCIÓN, no reservas: puede ser normal o alta con déficit corporal enorme.' },
    { f: 'Qué desplaza potasio DENTRO vs FUERA de la célula', d: 'DENTRO (baja el plasmático): insulina, betaagonistas, alcalosis, aldosterona. FUERA (sube): déficit de insulina, betabloqueantes, acidosis, lisis celular (rabdomiólisis, hemólisis, lisis tumoral).' },
    { f: 'Tres determinantes de la secreción de potasio', d: 'Aldosterona, flujo distal de orina y aporte de sodio al colector. Explica por qué asa y tiazidas pierden potasio y por qué espironolactona, amiloride, IECA y ARA-II lo retienen.' },
    { f: 'Hiperpotasemia: los tres tiempos del tratamiento', d: '1) ESTABILIZAR: calcio (minutos, 30–60 min, NO baja el K⁺). 2) DESPLAZAR: insulina+glucosa, salbutamol, bicarbonato si acidosis (15–30 min). 3) ELIMINAR: diuréticos, quelantes, DIÁLISIS. Parar en el paso 2 = rebote.' },
    { f: 'Hipopotasemia refractaria: qué medir siempre', d: 'MAGNESIO. El magnesio bloquea los canales ROMK del colector; sin él, el potasio sigue fugándose por orina pese a la reposición.' },
    { f: 'ECG de la hipopotasemia', d: 'Aplanamiento de la T, onda U, descenso del ST, QT aparentemente largo. Riesgo de extrasístoles, TV y torsade. Potencia la toxicidad digitálica (compiten por la Na⁺/K⁺-ATPasa).' },
    { f: 'Magnitud del déficit en la hipopotasemia', d: 'Un descenso de 1 mEq/L en plasma ≈ déficit corporal de 200–400 mEq. La reposición siempre es más lenta de lo que sugiere la cifra.' },
    { f: 'Síndrome de realimentación', d: 'Al reintroducir nutrición en un desnutrido, la insulina desplaza potasio, FÓSFORO y magnesio al interior celular: arritmias, debilidad respiratoria, insuficiencia cardíaca. Prevención: calorías graduales, reponer electrolitos y tiamina antes.' },
    { f: 'Seudohiperpotasemia: cuándo sospecharla', d: 'Cifra alta con ECG NORMAL y sin causa aparente: hemólisis de la muestra, torniquete prolongado con puño, trombocitosis o leucocitosis extremas. Repetir la extracción antes de tratar.' }
  ]
}

]);

/* ============================================================
   MÓDULO 4 — FISIOPATOLOGÍA CLÍNICA
   ============================================================ */

TUTOR.registrarTemas([

/* ---------------------------------------------------------- */
{
  id: 'insuficiencia-cardiaca',
  modulo: 'fisiopato',
  nombre: 'Insuficiencia cardíaca',
  alto: true,
  minutos: 26,
  requisitos: ['contractilidad-pv', 'sraa'],
  ideaCentral: 'La insuficiencia cardíaca no es "el corazón funcionando poco", sino la incapacidad de mantener el gasto necesario sin elevar las presiones de llenado. De esa definición salen sus dos síndromes: bajo gasto anterógrado y congestión retrógrada. Y la enfermedad progresa no por el daño inicial sino por la respuesta neurohumoral que ese daño desencadena.',

  anclaje: {
    q: 'Sin mirar: ¿por qué un paciente con insuficiencia cardíaca puede estar congestivo (con crepitantes y edemas) y a la vez hipoperfundido (frío y oligúrico)? ¿Y por qué otro puede estar congestivo pero caliente y bien perfundido?',
    pista: 'Son dos ejes independientes: congestión y perfusión. Piensa en una tabla de 2×2.'
  },

  bloques: [
    {
      nivel: 'imprescindible',
      titulo: 'Los dos ejes que ordenan al paciente',
      html: '<p>Toda la clínica cabe en una tabla de 2×2: <b>congestión</b> (húmedo/seco) y <b>perfusión</b> (caliente/frío).</p>' +
        '<table><tr><th></th><th>Seco</th><th>Húmedo</th></tr>' +
        '<tr><td><b>Caliente</b></td><td>Compensado</td><td>Congestivo: <b>diuréticos y vasodilatadores</b></td></tr>' +
        '<tr><td><b>Frío</b></td><td>Hipoperfundido/hipovolémico: valorar volumen</td><td>Shock cardiogénico: <b>inotrópicos</b> ± soporte</td></tr></table>' +
        '<p>El 70–80 % de las descompensaciones son <b>caliente y húmedo</b>: la mayoría de los pacientes necesita descongestión, no inotropía. Los perfiles se definen a pie de cama: congestión por ingurgitación yugular, reflujo hepatoyugular, ortopnea y edemas; perfusión por temperatura de extremidades, presión de pulso proporcional, diuresis y estado mental.</p>'
    },
    {
      nivel: 'imprescindible',
      titulo: 'FE reducida vs preservada: dos fallos distintos',
      html: '<table><tr><th></th><th>IC-FEr (FE ≤ 40 %)</th><th>IC-FEp (FE ≥ 50 %)</th></tr>' +
        '<tr><td>Problema</td><td>No <b>vacía</b> (sistólico)</td><td>No se <b>llena</b> (diastólico)</td></tr>' +
        '<tr><td>Ventrículo</td><td>Dilatado, pared fina</td><td>Hipertrófico, rígido, cavidad pequeña</td></tr>' +
        '<tr><td>Causas</td><td>Isquémica, dilatada, tóxica, taquimiocardiopatía</td><td>HTA, edad, diabetes, obesidad, estenosis aórtica</td></tr>' +
        '<tr><td>Depende de</td><td>Reducir carga y bloquear el eje neurohumoral</td><td>Frecuencia baja, ritmo sinusal, control estricto de volumen</td></tr>' +
        '<tr><td>Tratamiento pronóstico</td><td>ARNI/IECA, betabloqueante, ARM, iSGLT2</td><td>iSGLT2; tratar comorbilidades</td></tr></table>' +
        '<p>🔥 La IC-FEp descompensa con <b>fibrilación auricular</b> (pierde la patada auricular) y con <b>taquicardia</b> (acorta la diástole). En un ventrículo rígido esas dos cosas hacen mucho más daño que en uno dilatado.</p>'
    },
    {
      nivel: 'imprescindible',
      titulo: 'La cascada de la progresión',
      html: '<p>El daño inicial reduce el gasto. A partir de ahí, la enfermedad avanza sola, y cada vuelta del circuito deja al ventrículo peor que la anterior:</p>',
      esquema: ['Daño miocárdico', '↓ Gasto cardíaco', 'Activación simpática + SRAA', '↑ Precarga, ↑ poscarga, fibrosis', 'Remodelado y dilatación', 'Más caída del gasto']
    },
    {
      nivel: 'importante',
      titulo: 'Por qué cada fármaco funciona',
      html: '<ul><li><b>IECA/ARA-II/ARNI</b>: bloquean la angiotensina II → menos poscarga, menos retención y menos fibrosis. El ARNI añade potenciación de péptidos natriuréticos.</li>' +
        '<li><b>Betabloqueantes</b>: revierten la toxicidad catecolaminérgica, resensibilizan receptores β, reducen consumo de oxígeno y arritmias, y alargan la diástole. Iniciar solo en paciente estable y euvolémico.</li>' +
        '<li><b>Antagonistas del receptor mineralocorticoide</b>: antifibróticos, ahorran potasio y magnesio.</li>' +
        '<li><b>iSGLT2</b>: benefician en FE reducida y preservada, con mecanismos que incluyen natriuresis, mejora del metabolismo energético miocárdico y reducción de la precarga sin activación neurohumoral marcada.</li>' +
        '<li><b>Diuréticos de asa</b>: alivian síntomas; no modifican la supervivencia. Trata la congestión, no la enfermedad.</li></ul>' +
        '<p>La regla que resume la cardiología moderna: <b>lo que bloquea la compensación mejora el pronóstico; lo que estimula la bomba solo mejora los síntomas</b>.</p>'
    },
    {
      nivel: 'complementario',
      titulo: 'Congestión sin sobrecarga: redistribución',
      html: '<p>No toda descompensación implica ganancia de peso. Existe la <b>congestión por redistribución</b>: un aumento brusco de la poscarga y del tono venoso desplaza volumen desde el reservorio esplácnico al tórax en minutos, produciendo edema pulmonar sin que el paciente haya retenido agua. Es el mecanismo del edema agudo hipertensivo, y explica que responda espectacularmente a los vasodilatadores y poco a la furosemida.</p>' +
        '<p>Distinguir <b>congestión por acumulación</b> (días de aumento de peso, edemas, ascitis) de <b>congestión por redistribución</b> (horas, presión alta, edema pulmonar sin edemas periféricos) cambia por completo el tratamiento inicial.</p>'
    }
  ],

  variables: [
    { n: 'Presiones de llenado', d: 'up', nota: 'el rasgo definitorio: gasto a costa de presión' },
    { n: 'Gasto cardíaco', d: 'down', nota: 'puede estar normal en reposo y fallar al esfuerzo' },
    { n: 'Activación neurohumoral', d: 'up', nota: 'motor real de la progresión' },
    { n: 'Poscarga efectiva', d: 'up', nota: 'por vasoconstricción y por dilatación (Laplace)' }
  ],

  fisiopatologia: '<p>La congestión izquierda eleva la presión capilar pulmonar y produce disnea, ortopnea (el decúbito aumenta el retorno venoso) y disnea paroxística nocturna (reabsorción nocturna de edemas más caída del tono simpático). La congestión derecha eleva la presión venosa sistémica: ingurgitación yugular, hepatomegalia, ascitis, edemas y también <b>congestión renal e intestinal</b>, que contribuyen al síndrome cardiorrenal y a la malabsorción de diuréticos orales.</p>' +
    '<p>El bajo gasto anterógrado produce fatiga, intolerancia al esfuerzo, oliguria, confusión y, en su extremo, shock cardiogénico. Es habitual que el paciente consulte por la congestión y que lo que determine el pronóstico sea el gasto.</p>',

  clinica: '<p>El <b>BNP/NT-proBNP</b> se eleva por estiramiento parietal: útil para descartar (valor predictivo negativo alto) y para pronóstico. Se eleva también en fibrilación auricular, insuficiencia renal, TEP y edad avanzada, y es <b>más bajo de lo esperado en obesos</b>, lo que puede llevar a falsos negativos.</p>' +
    '<p>La ortopnea y el reflujo hepatoyugular son los signos más específicos de presiones de llenado elevadas; los crepitantes pueden faltar en la insuficiencia crónica por aumento del drenaje linfático pulmonar, un punto que induce a error con frecuencia.</p>',

  error: {
    confunde: 'Identificar insuficiencia cardíaca con fracción de eyección reducida.',
    parecido: 'Es la forma que se estudia primero, la que tiene tratamiento más establecido y la que aparece en los ejemplos clásicos.',
    diferencia: 'La mitad de los pacientes con insuficiencia cardíaca tienen la FE <b>preservada</b>. Su problema es el llenado: un ventrículo rígido que alcanza presiones altas con volúmenes normales. La FE es normal precisamente porque el volumen telediastólico es pequeño. Requieren un enfoque distinto: control de la frecuencia, mantenimiento del ritmo sinusal, manejo cuidadoso del volumen y tratamiento agresivo de hipertensión, obesidad y diabetes.',
    ejemplo: 'Mujer de 80 años, hipertensa y obesa, con edema agudo de pulmón y FE del 65 %. Diagnosticarla de "no insuficiencia cardíaca porque la FE es normal" es un error frecuente y con consecuencias.',
    regla: 'Insuficiencia cardíaca = presiones de llenado altas para el gasto necesario. La FE clasifica el tipo, no define el diagnóstico.'
  },

  perla: '🔥 Perfiles hemodinámicos: <b>caliente y húmedo</b> (la mayoría) → descongestionar; <b>frío y húmedo</b> → inotropía y soporte; <b>frío y seco</b> → cuidado, puede necesitar volumen. Y lo que cambia el pronóstico es bloquear el eje neurohumoral, no estimular la contracción.',

  feynman: {
    consigna: 'Explica por qué un paciente con insuficiencia cardíaca tiene ortopnea y disnea paroxística nocturna, y por qué duerme con tres almohadas.',
    puntos: [
      'Explico el efecto del decúbito sobre el retorno venoso',
      'Conecto el aumento de precarga con la presión capilar pulmonar',
      'Explico por qué un ventrículo en la meseta de Starling no puede manejar ese volumen',
      'Añado la reabsorción nocturna de edemas y la caída del tono simpático',
      'Explico el alivio al incorporarse'
    ],
    referencia: '<p>En bipedestación, la gravedad mantiene una parte importante del volumen sanguíneo en los lechos venosos de las extremidades inferiores y del abdomen. Al tumbarse, ese volumen retorna al tórax: aumenta el retorno venoso y, con él, la precarga de ambos ventrículos.</p>' +
      '<p>Un corazón sano acomoda sin dificultad esos 300–500 mL adicionales, porque opera en la zona empinada de su curva de función y porque su compliance permite alojar volumen con poca elevación de presión. El corazón insuficiente, en cambio, trabaja sobre una curva deprimida y aplanada, cerca de su meseta: el volumen añadido no aumenta el gasto, solo la <b>presión telediastólica</b>. Esa presión se transmite retrógradamente a la aurícula izquierda, a las venas pulmonares y al capilar pulmonar. Cuando la presión hidrostática capilar supera la presión oncótica del plasma, se produce trasudación al intersticio: aumenta el trabajo respiratorio, se estimulan los receptores J yuxtacapilares y aparece la <b>disnea</b>. Incorporarse invierte el proceso en minutos, y de ahí la necesidad de dormir con varias almohadas.</p>' +
      '<p>La <b>disnea paroxística nocturna</b> añade dos elementos que explican por qué despierta al paciente varias horas después de acostarse y no de inmediato. Durante la noche se produce la <b>reabsorción progresiva del edema intersticial</b> acumulado durante el día en las piernas, lo que incorpora líquido al compartimento intravascular de forma lenta y sostenida. Al mismo tiempo, durante el sueño <b>desciende el tono simpático</b>, con lo que se pierde parte del soporte inotrópico que sostenía al ventrículo, y la depresión respiratoria fisiológica del sueño reduce ligeramente la oxigenación. La combinación eleva la presión capilar hasta el umbral del edema alveolar de forma más brusca, y el paciente despierta con sensación de ahogo que le obliga a sentarse o a asomarse a una ventana, tardando bastante más en aliviarse que en la ortopnea simple.</p>' +
      '<p>Ambos síntomas son, por tanto, expresiones del mismo mecanismo —una presión de llenado que no tolera aumentos de precarga— y su presencia es más específica de presiones elevadas que los crepitantes, que pueden faltar en la insuficiencia crónica porque el drenaje linfático pulmonar se ha adaptado y aumenta su capacidad varias veces.</p>'
  },

  preguntas: [
    { nivel: 1, q: 'Define insuficiencia cardíaca en términos hemodinámicos.', r: 'Incapacidad del corazón de mantener el gasto necesario para las demandas metabólicas sin elevar las presiones de llenado. No es simplemente "bombear poco": puede haber gasto normal a costa de presiones altas.' },
    { nivel: 1, q: 'Nombra los cuatro perfiles hemodinámicos y su tratamiento base.', r: 'Caliente y seco (compensado); caliente y húmedo (diuréticos y vasodilatadores, el más frecuente); frío y húmedo (inotrópicos y soporte, shock cardiogénico); frío y seco (valorar volumen con cautela).' },
    { nivel: 1, q: '¿Qué estimula la liberación de BNP y qué limitación tiene en obesos?', r: 'El estiramiento de la pared ventricular por sobrecarga de volumen o presión. En obesos los niveles son más bajos de lo esperado para el mismo grado de insuficiencia, lo que puede producir falsos negativos.' },
    { nivel: 2, q: '¿Por qué la fibrilación auricular descompensa especialmente la IC con FE preservada?', r: 'Porque el ventrículo rígido depende de la contracción auricular para el 30–40 % de su llenado y de una diástole suficientemente larga. La FA elimina la patada auricular y, con respuesta rápida, acorta la diástole: doble golpe al volumen telediastólico.' },
    { nivel: 2, q: '¿Por qué los diuréticos alivian pero no mejoran la supervivencia, y los betabloqueantes al revés?', r: 'Los diuréticos tratan la congestión, que es una consecuencia, y su uso a dosis altas activa aún más el eje neurohumoral. Los betabloqueantes actúan sobre el mecanismo de progresión —la toxicidad catecolaminérgica y el remodelado—, y por eso mejoran el pronóstico aunque a corto plazo empeoren la hemodinámica.' },
    { nivel: 2, q: 'Distingue congestión por acumulación de congestión por redistribución.', r: 'La acumulación se desarrolla en días, con aumento de peso, edemas y ascitis, y responde a diuréticos. La redistribución ocurre en horas por aumento brusco de poscarga y tono venoso que desplaza volumen esplácnico al tórax: edema agudo hipertensivo, sin ganancia de peso, que responde a vasodilatadores.' },
    { nivel: 3, q: 'Paciente con IC crónica ingresado por descompensación, cuya creatinina sube con el tratamiento diurético mientras sigue con ingurgitación yugular y edemas. ¿Suspendes el diurético?', r: 'No necesariamente: hay que valorar la congestión. Si persiste la presión venosa elevada, lo más probable es que el deterioro renal se deba a <b>congestión venosa renal</b>, ya que el flujo renal depende del gradiente entre presión arterial y presión venosa. En ese caso descongestionar más suele mejorar la función renal. Suspender el diurético y dar fluidos empeoraría el cuadro. Si en cambio hay signos de hipoperfusión con presiones de llenado ya bajas, el problema es de gasto y se requiere soporte inotrópico o reducción de la poscarga.' },
    { nivel: 3, q: 'A un paciente ingresado por descompensación aguda, ¿le inicias betabloqueante el primer día? Razónalo.', r: 'No mientras esté congestivo o con signos de bajo gasto. El betabloqueante retira a corto plazo el soporte cronotrópico e inotrópico del que ese paciente depende en la fase aguda, y puede precipitar un empeoramiento. Se inicia cuando esté estable y euvolémico, a dosis baja, con titulación lenta. En cambio, si ya lo tomaba de forma crónica y no está en shock, la recomendación es <b>mantenerlo</b>, porque su retirada se asocia a peor evolución.' }
  ],

  caso: {
    vineta: 'Varón de 71 años con miocardiopatía isquémica (FE 30 %). Acude por disnea progresiva de una semana y aumento de 5 kg. PA 118/74, FC 92. Ingurgitación yugular a 45°, reflujo hepatoyugular positivo, crepitantes bibasales, edemas hasta rodillas. Extremidades tibias, diuresis conservada, lactato normal.',
    pasos: [
      { q: 'Clasifícalo en la tabla de 2×2 y justifica.', pista: 'Congestión y perfusión son ejes independientes.', r: 'Caliente y húmedo. Congestivo por yugulares, reflujo hepatoyugular, crepitantes y edemas; bien perfundido por extremidades tibias, diuresis conservada, lactato normal y presión de pulso proporcional adecuada. Es el perfil más frecuente y su tratamiento es la descongestión, no la inotropía.' },
      { q: '¿Por qué ha ganado 5 kg si su problema es cardíaco?', pista: 'Riñón y volumen circulante efectivo.', r: 'Porque el gasto insuficiente reduce el volumen circulante efectivo, y el riñón —que mide perfusión, no volumen total— activa el SRAA y la ADH reteniendo sodio y agua. Es congestión por <b>acumulación</b>: días de retención progresiva, no una redistribución brusca.' },
      { q: '¿Por qué el reflujo hepatoyugular es útil aquí?', pista: 'Es una prueba de reserva.', r: 'Porque explora la capacidad del ventrículo derecho de manejar un aumento transitorio de precarga. Al comprimir el abdomen se moviliza volumen esplácnico hacia el tórax; un corazón con reserva lo acomoda y la yugular no se eleva de forma sostenida. Su positividad indica presiones de llenado derechas elevadas y correlaciona con presión capilar pulmonar alta.' },
      { q: 'Tras 48 horas de diurético intravenoso ha perdido 3 kg pero su creatinina sube de 1,2 a 1,6. ¿Qué valoras?', pista: 'Vuelve a explorar la congestión.', r: 'Si sigue congestivo —yugulares elevadas, edemas—, lo más probable es congestión venosa renal y conviene continuar la descongestión, porque al bajar la presión venosa mejora el gradiente de perfusión renal. Si ya está euvolémico y aparecen signos de hipoperfusión, hay que reducir el ritmo diurético. La decisión se toma explorando la volemia, no mirando solo la creatinina.' },
      { q: 'Está estable y euvolémico al quinto día. ¿Qué tratamiento le cambia el pronóstico?', pista: 'Bloquear el eje, no estimular la bomba.', r: 'Los cuatro pilares de la IC con FE reducida: ARNI (o IECA/ARA-II), betabloqueante, antagonista del receptor mineralocorticoide e iSGLT2. Todos actúan bloqueando o modulando la respuesta neurohumoral y el remodelado. El diurético se mantiene a la dosis mínima que evite la congestión, pero no forma parte del tratamiento que modifica la supervivencia.' },
      { q: 'Resume la lógica completa del caso en una frase mecanicista.', pista: 'Del daño al síntoma.', r: 'Un miocardio dañado no puede mantener el gasto sin elevar las presiones de llenado; esa caída del volumen circulante efectivo activa el SRAA, el simpático y la ADH, que retienen sodio y agua y aumentan la poscarga, generando congestión anterógrada y retrógrada y perpetuando el remodelado. Por eso el tratamiento eficaz alivia la congestión a corto plazo y bloquea la respuesta neurohumoral a largo plazo.' }
    ],
    cierre: 'La insuficiencia cardíaca es una enfermedad neurohumoral disfrazada de enfermedad mecánica. Reconocer el perfil hemodinámico a pie de cama decide el tratamiento inmediato; bloquear el eje decide el pronóstico.'
  },

  tarjetas: [
    { f: 'Definición hemodinámica de insuficiencia cardíaca', d: 'Incapacidad de mantener el gasto necesario SIN ELEVAR LAS PRESIONES DE LLENADO. Puede haber gasto normal a costa de presiones altas.' },
    { f: 'Los cuatro perfiles hemodinámicos', d: 'Caliente-seco (compensado); caliente-húmedo (70–80 %: descongestionar); frío-húmedo (shock cardiogénico: inotropía/soporte); frío-seco (valorar volumen).' },
    { f: 'IC-FEr vs IC-FEp: el defecto', d: 'FEr: no VACÍA (sistólico), ventrículo dilatado. FEp: no se LLENA (diastólico), ventrículo rígido con cavidad pequeña. La FE es normal porque el VTD es pequeño.' },
    { f: '¿Por qué la FA descompensa la IC con FE preservada?', d: 'Pierde la contracción auricular (30–40 % del llenado en un ventrículo rígido) y la respuesta rápida acorta la diástole. Doble golpe al VTD.' },
    { f: 'Mecanismo de la ortopnea', d: 'El decúbito devuelve 300–500 mL al tórax → ↑precarga sobre un ventrículo en la meseta de Starling → ↑presión telediastólica → ↑presión capilar pulmonar → trasudación y disnea. Se alivia al incorporarse.' },
    { f: 'Disnea paroxística nocturna: dos factores añadidos', d: 'Reabsorción nocturna del edema intersticial de las piernas (aumenta lentamente el volumen intravascular) + caída del tono simpático durante el sueño. Por eso despierta horas después y tarda más en aliviarse.' },
    { f: '¿Por qué pueden faltar los crepitantes en la IC crónica?', d: 'Porque el drenaje linfático pulmonar se adapta y aumenta varias veces su capacidad. La ortopnea y el reflujo hepatoyugular son más específicos de presiones de llenado elevadas.' },
    { f: 'Qué cambia el pronóstico en IC-FEr', d: 'ARNI/IECA, betabloqueante, antagonista del receptor mineralocorticoide e iSGLT2: todos BLOQUEAN el eje neurohumoral. Diuréticos e inotrópicos alivian síntomas sin mejorar la supervivencia.' }
  ]
},

/* ---------------------------------------------------------- */
{
  id: 'shock',
  modulo: 'fisiopato',
  nombre: 'Shock: clasificación hemodinámica',
  alto: true,
  minutos: 24,
  requisitos: ['gasto-cardiaco', 'retorno-venoso'],
  ideaCentral: 'Shock es hipoperfusión tisular con disoxia celular, no una cifra de presión arterial. Sus cuatro tipos se distinguen por tres variables —precarga, función de bomba y resistencia vascular— y cada combinación apunta a un tratamiento distinto. Reconocer el tipo en los primeros minutos importa más que cualquier número aislado.',

  anclaje: {
    q: 'Sin mirar: completa mentalmente la tabla de precarga, gasto cardíaco y resistencia vascular para los cuatro tipos de shock. ¿Cuál es el único con gasto alto?',
    pista: 'Tres tienen gasto bajo por razones distintas. El cuarto falla por el continente, no por el contenido ni por la bomba.'
  },

  bloques: [
    {
      nivel: 'imprescindible',
      titulo: 'La tabla que hay que saber de memoria',
      html: '<table><tr><th>Tipo</th><th>Precarga (PVC)</th><th>Gasto</th><th>RVS</th><th>Extremidades</th><th>Prototipo</th></tr>' +
        '<tr><td><b>Hipovolémico</b></td><td class="baja">↓</td><td class="baja">↓</td><td class="sube">↑</td><td>Frías</td><td>Hemorragia, deshidratación</td></tr>' +
        '<tr><td><b>Cardiogénico</b></td><td class="sube">↑</td><td class="baja">↓</td><td class="sube">↑</td><td>Frías</td><td>Infarto extenso</td></tr>' +
        '<tr><td><b>Obstructivo</b></td><td class="sube">↑</td><td class="baja">↓</td><td class="sube">↑</td><td>Frías</td><td>Taponamiento, TEP, neumotórax</td></tr>' +
        '<tr><td><b>Distributivo</b></td><td class="baja">↓ o normal</td><td class="sube">↑</td><td class="baja">↓↓</td><td><b>Calientes</b></td><td>Sepsis, anafilaxia, neurogénico</td></tr></table>' +
        '<p>🔥 Dos discriminadores de cabecera, sin ninguna tecnología: la <b>temperatura de las extremidades</b> (frías = gasto bajo; calientes = problema de resistencia) y la <b>presión venosa yugular</b> (baja = hipovolémico o distributivo; alta = cardiogénico u obstructivo).</p>' +
        '<p>Con esos dos datos se separan los cuatro tipos en menos de un minuto, y la ecografía a pie de cama confirma el mecanismo.</p>'
    },
    {
      nivel: 'imprescindible',
      titulo: 'La presión arterial engaña',
      html: '<p>Como <code>PA = GC × RVS</code>, un paciente puede tener presión normal con un gasto ya desplomado si la resistencia ha subido lo suficiente: es el <b>shock compensado</b>, y es la fase en la que el tratamiento es más eficaz y el diagnóstico más se pasa por alto.</p>' +
        '<p>Marcadores de perfusión que se alteran <b>antes</b> que la presión:</p>' +
        '<ul><li>Relleno capilar > 3 s, moteado/livideces, gradiente térmico.</li>' +
        '<li>Presión de pulso estrecha (volumen sistólico bajo).</li>' +
        '<li>Taquicardia y taquipnea (esta última, por acidosis metabólica compensatoria).</li>' +
        '<li>Oliguria, confusión, inquietud.</li>' +
        '<li><b>Lactato</b> elevado y SvcO₂ anormal.</li></ul>' +
        '<p>Sobre el lactato: es marcador de gravedad y su <b>aclaramiento</b> guía la reanimación. Conviene saber que no siempre refleja hipoxia tisular pura —también aumenta por glucólisis aeróbica inducida por adrenalina, por fallo hepático en su aclaramiento y por algunos fármacos—, pero su elevación mantenida siempre exige explicación.</p>'
    },
    {
      nivel: 'importante',
      titulo: 'El shock séptico tiene tres problemas a la vez',
      html: '<ol><li><b>Vasodilatación</b>: pérdida del tono por óxido nítrico, activación de canales K-ATP y déficit relativo de vasopresina → cae la RVS.</li>' +
        '<li><b>Hipovolemia relativa y absoluta</b>: venodilatación (volumen que pasa a compartimento no estresado) más fuga capilar por daño del glucocáliz y del endotelio → cae el retorno venoso.</li>' +
        '<li><b>Depresión miocárdica</b>: citoquinas y óxido nítrico deprimen la contractilidad (miocardiopatía séptica), reversible en días.</li></ol>' +
        '<p>Por eso el tratamiento es secuencial y con lógica fisiológica: fluidos guiados por respuesta (no ilimitados, porque la fuga capilar los convierte en edema), <b>noradrenalina precozmente</b> (que restaura la RVS y además venoconstriñe, elevando la presión sistémica media de llenado y mejorando el retorno venoso), y valorar un inotrópico cuando, restaurada la resistencia, persistan signos de bajo gasto.</p>' +
        '<p>Y sobre todo: <b>control del foco y antibiótico precoz</b>, porque ninguna corrección hemodinámica resuelve la causa.</p>'
    },
    {
      nivel: 'complementario',
      titulo: 'Microcirculación y disoxia',
      html: '<p>En la sepsis puede haber gasto cardíaco alto y perfusión celular pésima: se produce <b>heterogeneidad microcirculatoria</b>, con capilares ocluidos junto a cortocircuitos abiertos, de modo que la sangre pasa sin entregar oxígeno. Se añade disfunción mitocondrial ("hipoxia citopática"), en la que la célula no puede utilizar el oxígeno que le llega.</p>' +
        '<p>Esto explica dos observaciones desconcertantes: que la SvcO₂ pueda estar <b>alta</b> en un shock séptico grave (la sangre vuelve sin haber sido extraída) y que normalizar la macrohemodinámica no siempre normalice el lactato.</p>' +
        '<p>El shock <b>neurogénico</b> merece mención aparte porque rompe el patrón: lesión medular alta con pérdida del tono simpático produce hipotensión con <b>bradicardia</b> (predominio vagal sin oposición) y piel caliente y seca, a diferencia de todos los demás shocks, que cursan con taquicardia.</p>'
    }
  ],

  variables: [
    { n: 'Precarga', d: 'down', nota: 'baja en hipovolémico y distributivo; alta en cardiogénico y obstructivo' },
    { n: 'Gasto cardíaco', d: 'down', nota: 'alto solo en el distributivo' },
    { n: 'Resistencia vascular', d: 'up', nota: 'compensatoriamente alta salvo en el distributivo' },
    { n: 'Lactato', d: 'up', nota: 'marcador de gravedad; su aclaramiento guía la reanimación' }
  ],

  fisiopatologia: '<p>Sea cual sea el tipo, el destino común es la disoxia celular: sin oxígeno la fosforilación oxidativa se detiene, la célula pasa a glucólisis anaerobia, cae el ATP, fallan las bombas de membrana, entra sodio y calcio, la célula se edematiza y finalmente se produce muerte celular con liberación de mediadores.</p>' +
    '<p>Los círculos viciosos que hacen irreversible el shock: la <b>acidosis</b> deprime la contractilidad y reduce la respuesta vascular a las catecolaminas; la <b>isquemia intestinal</b> rompe la barrera y permite translocación bacteriana; la <b>isquemia coronaria</b> reduce el gasto que causó el problema; la <b>coagulopatía</b> por consumo y por hipotermia agrava el sangrado en el shock hemorrágico (la "tríada letal": hipotermia, acidosis y coagulopatía).</p>',

  clinica: '<p>Prioridades prácticas: reconocer precozmente (perfusión, no presión), identificar el tipo con exploración y ecografía, tratar la causa (el shock hemorrágico se trata con hemostasia, no con vasopresores; el taponamiento con drenaje; el TEP masivo con reperfusión) y sostener la perfusión mientras tanto.</p>' +
    '<p>Un punto de razonamiento fisiológico que Diego usará: en el shock hemorrágico, la reanimación con grandes volúmenes de cristaloides diluye factores de coagulación, agrava la acidosis y la hipotermia y desplaza coágulos al elevar la presión. De ahí la estrategia de <b>hipotensión permisiva</b> hasta el control quirúrgico del sangrado y la reposición con hemoderivados equilibrados.</p>',

  error: {
    confunde: 'Definir el shock por la hipotensión.',
    parecido: 'La hipotensión acompaña a la mayoría de los shocks establecidos y es el signo más visible en el monitor.',
    diferencia: 'El shock es <b>hipoperfusión tisular con disoxia celular</b>. Puede existir con presión arterial normal —shock compensado, especialmente en jóvenes y en hipertensos crónicos, cuyo "normal" es más alto— y puede haber hipotensión sin shock, como en muchas personas jóvenes y sanas o en tratamientos antihipertensivos.',
    ejemplo: 'Joven de 25 años tras un traumatismo, con PA de 118/92, FC de 130, relleno capilar de 4 s y lactato de 4 mmol/L: está en shock hemorrágico con presión "normal". Esperar a que la presión caiga es esperar a la descompensación.',
    regla: 'La presión es lo último que se pierde y lo primero que se mira. Evalúa perfusión: piel, diuresis, conciencia y lactato.'
  },

  perla: '🔥 Extremidades <b>frías</b> = problema de gasto (hipovolémico, cardiogénico, obstructivo). Extremidades <b>calientes</b> = problema de resistencia (distributivo). Añade la presión venosa yugular —baja en hipovolémico/distributivo, alta en cardiogénico/obstructivo— y tienes los cuatro tipos separados sin ningún dispositivo.',

  feynman: {
    consigna: 'Explica por qué un paciente con shock séptico puede tener un gasto cardíaco elevado y aun así estar gravemente hipoperfundido.',
    puntos: [
      'Explico la caída de la RVS y su efecto sobre PA = GC × RVS',
      'Explico que el gasto alto es en parte compensador y en parte por baja poscarga',
      'Introduzco la heterogeneidad microcirculatoria y los cortocircuitos',
      'Menciono la disfunción mitocondrial (hipoxia citopática)',
      'Explico por qué la SvcO₂ puede estar alta y el lactato también'
    ],
    referencia: '<p>En la sepsis, los mediadores inflamatorios inducen óxido nítrico sintasa, abren canales de potasio sensibles a ATP en el músculo liso vascular y producen un déficit relativo de vasopresina. El resultado es una <b>vasodilatación profunda</b>: la resistencia vascular sistémica se desploma. Como la presión es el producto del gasto por la resistencia, para sostener la presión el organismo aumenta el gasto mediante taquicardia y estimulación adrenérgica, favorecido además por una poscarga muy baja que facilita la eyección. De ahí el patrón clásico de shock "hiperdinámico": gasto alto, extremidades calientes, presión baja.</p>' +
      '<p>Pero un caudal global elevado no garantiza que la sangre llegue donde hace falta. En la sepsis se produce <b>heterogeneidad microcirculatoria</b>: el daño del glucocáliz y del endotelio, la agregación de leucocitos y plaquetas, la rigidez de los hematíes y los microtrombos ocluyen algunos capilares mientras otros permanecen ampliamente abiertos, funcionando como cortocircuitos. La sangre atraviesa esos cortocircuitos a gran velocidad sin tiempo ni distancia de difusión adecuados para entregar oxígeno, mientras territorios vecinos quedan sin flujo. La perfusión deja de ser un problema de cantidad para convertirse en uno de <b>distribución</b>.</p>' +
      '<p>A esto se suma la <b>disfunción mitocondrial</b> o hipoxia citopática: las mitocondrias dañadas por óxido nítrico, especies reactivas y mediadores inflamatorios no pueden utilizar eficientemente el oxígeno que sí les llega. La célula está rodeada de oxígeno y sigue sin producir ATP.</p>' +
      '<p>Esto explica dos hallazgos que parecen contradictorios en la cabecera. Primero, la <b>saturación venosa central puede estar alta</b>, incluso por encima del 75 %: la sangre vuelve al corazón sin haber sido extraída, porque atravesó cortocircuitos o porque el tejido no pudo utilizar el oxígeno. Segundo, el <b>lactato permanece elevado</b> pese a una macrohemodinámica aparentemente corregida. Ambos datos indican que normalizar la presión y el gasto es necesario pero no suficiente, y que el determinante del pronóstico sigue siendo el <b>control del foco infeccioso</b> y el tratamiento antimicrobiano precoz, no el ajuste fino de los vasoactivos.</p>'
  },

  preguntas: [
    { nivel: 1, q: 'Define shock.', r: 'Hipoperfusión tisular con disoxia celular: el aporte de oxígeno es insuficiente para las demandas metabólicas. No se define por una cifra de presión arterial.' },
    { nivel: 1, q: '¿Cuál es el único tipo de shock que cursa con gasto cardíaco elevado?', r: 'El distributivo (sepsis, anafilaxia, neurogénico). Su problema es la caída de la resistencia vascular, no el caudal.' },
    { nivel: 1, q: 'Nombra dos discriminadores clínicos que separan los cuatro tipos sin tecnología.', r: 'La temperatura de las extremidades (frías = gasto bajo; calientes = problema de resistencia) y la presión venosa yugular (baja = hipovolémico o distributivo; alta = cardiogénico u obstructivo).' },
    { nivel: 2, q: '¿Por qué un paciente puede estar en shock con presión arterial normal?', r: 'Porque PA = GC × RVS: la vasoconstricción compensadora puede mantener la presión con un gasto ya reducido en un 25–30 %. Es el shock compensado, y se detecta por perfusión (relleno capilar, presión de pulso estrecha, oliguria, lactato), no por presión.' },
    { nivel: 2, q: 'Explica por qué la noradrenalina mejora el gasto cardíaco en el shock séptico y no solo la presión.', r: 'Porque además de la vasoconstricción arteriolar produce venoconstricción: recluta volumen no estresado hacia el compartimento estresado, eleva la presión sistémica media de llenado y por tanto el gradiente de retorno venoso. Más retorno venoso significa más precarga y más gasto.' },
    { nivel: 2, q: '¿Por qué el shock neurogénico cursa con bradicardia?', r: 'Porque la lesión medular alta interrumpe la salida simpática dejando sin oposición el tono vagal, que llega por el vago desde el tronco. Se pierden la vasoconstricción y la taquicardia compensadoras: hipotensión con bradicardia y piel caliente y seca, un patrón único entre los shocks.' },
    { nivel: 3, q: 'Paciente politraumatizado con PA 90/70, FC 135, yugulares ingurgitadas y ruidos cardíacos apagados tras traumatismo torácico. ¿Diagnóstico y por qué no encaja con hemorragia?', r: 'Taponamiento cardíaco (shock obstructivo). No encaja con hemorragia porque en la hipovolemia las yugulares estarían <b>colapsadas</b>: aquí están ingurgitadas, lo que indica una presión de salida elevada que bloquea el retorno venoso. La tríada de Beck (hipotensión, ingurgitación yugular y ruidos apagados) y el pulso paradójico apoyan el diagnóstico, que se confirma con ecografía. El tratamiento es drenar; el volumen es solo un puente mientras tanto.' },
    { nivel: 3, q: 'En un shock hemorrágico no controlado, ¿por qué la reanimación con grandes volúmenes de cristaloides puede empeorar el pronóstico?', r: 'Por varios mecanismos simultáneos. Diluye factores de coagulación y plaquetas, agravando la coagulopatía. Aumenta la presión arterial y puede desplazar los coágulos ya formados, reiniciando el sangrado. Agrava la acidosis (los cristaloides con exceso de cloro producen acidosis hiperclorémica) y la hipotermia si no están calentados, cerrando con la coagulopatía la <b>tríada letal</b>. Y contribuye al edema tisular, incluido el intestinal y el pulmonar. Por eso se prefiere hipotensión permisiva hasta la hemostasia quirúrgica y reposición con hemoderivados en proporciones equilibradas.' }
  ],

  caso: {
    vineta: 'Mujer de 66 años traída por fiebre y confusión. PA 82/38, FC 122, FR 30, temperatura 38,9 °C. Extremidades calientes y bien coloreadas, relleno capilar 2 s en el dorso de la mano pero moteado en rodillas. Lactato 4,8 mmol/L. Yugulares planas. Diuresis 15 mL/h.',
    pasos: [
      { q: '¿Qué tipo de shock y con qué dos datos lo decides?', pista: 'Extremidades y yugulares.', r: 'Distributivo, probablemente séptico. Las extremidades calientes indican que el problema es la resistencia y no el gasto; las yugulares planas descartan una presión de salida elevada (cardiogénico u obstructivo) y sugieren precarga baja o normal.' },
      { q: 'Calcula su presión de pulso e interprétala junto a la diastólica de 38.', pista: 'PP amplia con diastólica muy baja.', r: 'Presión de pulso de 44 mmHg con una diastólica de solo 38: el patrón de la vasodilatación. La diastólica depende sobre todo de la resistencia arteriolar, y una diastólica tan baja es una lectura directa de la caída de la RVS. Refuerza el diagnóstico de shock distributivo.' },
      { q: '¿Por qué está oligúrica si su gasto cardíaco probablemente esté alto?', pista: 'Presión de perfusión y distribución.', r: 'Porque la perfusión renal depende de la presión de perfusión, que con una PAM de aproximadamente 53 mmHg está por debajo del límite inferior de autorregulación renal, y porque la redistribución microcirculatoria y la vasodilatación de la arteriola eferente reducen la presión de filtración. Un gasto global alto no garantiza flujo renal eficaz.' },
      { q: 'Recibe 30 mL/kg de cristaloides y sigue con PAM de 58. ¿Qué haces y por qué no más fluidos sin más?', pista: 'Fuga capilar y respuesta a volumen.', r: 'Iniciar noradrenalina, sin esperar. El déficit primario es de resistencia, y la noradrenalina lo corrige mientras además venoconstriñe, aumentando la presión sistémica media de llenado y el retorno venoso. Seguir administrando fluidos sin comprobar respuesta —con elevación pasiva de piernas o variación de presión de pulso— solo produce edema por la fuga capilar, empeora la oxigenación y aumenta la congestión venosa renal.' },
      { q: 'Con noradrenalina alcanza PAM de 68, pero el lactato sigue en 4,5 y ahora las extremidades están frías. ¿Qué ha pasado?', pista: 'Al restaurar la resistencia, se desenmascara algo.', r: 'Al restaurar la poscarga se ha puesto de manifiesto la <b>depresión miocárdica séptica</b>, que estaba enmascarada mientras el ventrículo eyectaba contra una resistencia muy baja. Ahora el corazón deprimido no puede vencer la poscarga restaurada y cae el gasto: extremidades frías y lactato persistente. Corresponde valorar la función ventricular con ecografía y considerar añadir un inotrópico.' },
      { q: '¿Cuál es la intervención que más impacta en su supervivencia?', pista: 'No es hemodinámica.', r: 'El antibiótico precoz y el control del foco. Toda la corrección hemodinámica compra tiempo, pero mientras persista la fuente de la respuesta inflamatoria la fisiopatología continúa. El retraso en la administración de antimicrobianos apropiados es uno de los factores modificables con mayor impacto en la mortalidad del shock séptico.' }
    ],
    cierre: 'El shock se diagnostica con las manos y los ojos —temperatura de la piel, yugulares, relleno capilar, diuresis— y se clasifica con tres variables. El monitor confirma; no decide.'
  },

  tarjetas: [
    { f: 'Definición de shock', d: 'Hipoperfusión tisular con disoxia celular. NO se define por la presión: existe shock compensado con presión normal, e hipotensión sin shock.' },
    { f: 'Tabla hemodinámica de los cuatro shocks', d: 'Hipovolémico: precarga↓ GC↓ RVS↑. Cardiogénico: precarga↑ GC↓ RVS↑. Obstructivo: precarga↑ GC↓ RVS↑. Distributivo: precarga↓/N, GC↑, RVS↓↓ (el único con gasto alto).' },
    { f: 'Dos discriminadores de cabecera del tipo de shock', d: 'Temperatura de extremidades (frías = problema de GASTO; calientes = problema de RESISTENCIA) + presión venosa yugular (baja = hipovolémico/distributivo; alta = cardiogénico/obstructivo).' },
    { f: 'Signos que preceden a la hipotensión en el shock', d: 'Relleno capilar > 3 s, moteado, presión de pulso estrecha, taquicardia y taquipnea, oliguria, confusión, lactato elevado y SvcO₂ anormal.' },
    { f: 'Tres problemas simultáneos del shock séptico', d: '1) Vasodilatación (NO, canales K-ATP, déficit de vasopresina). 2) Hipovolemia relativa y absoluta (venodilatación + fuga capilar). 3) Depresión miocárdica por citoquinas y NO (reversible).' },
    { f: '¿Por qué la SvcO₂ puede estar ALTA en la sepsis grave?', d: 'Por cortocircuitos microcirculatorios y disfunción mitocondrial (hipoxia citopática): la sangre vuelve sin haber cedido oxígeno. Gasto alto con perfusión celular pésima.' },
    { f: 'Shock neurogénico: patrón único', d: 'Hipotensión con BRADICARDIA y piel caliente y seca. La lesión medular alta interrumpe la salida simpática dejando el vago sin oposición. Todos los demás shocks cursan con taquicardia.' },
    { f: 'Tríada letal del shock hemorrágico', d: 'Hipotermia + acidosis + coagulopatía, agravadas por cristaloides en exceso (dilución, acidosis hiperclorémica, desplazamiento de coágulos). Estrategia: hipotensión permisiva hasta la hemostasia y hemoderivados equilibrados.' }
  ]
},

/* ---------------------------------------------------------- */
{
  id: 'hipertension',
  modulo: 'fisiopato',
  nombre: 'Hipertensión arterial',
  alto: false,
  minutos: 18,
  requisitos: ['presion-arterial', 'sraa'],
  ideaCentral: 'Toda hipertensión sostenida implica que el riñón necesita una presión mayor de la normal para excretar la carga diaria de sodio: la curva de natriuresis por presión está desplazada. El daño que produce no procede del número sino de la carga mecánica crónica sobre corazón, vasos, riñón, cerebro y retina, y por eso el tratamiento se juzga por eventos, no por cifras.',

  anclaje: {
    q: 'Sin mirar: si el barorreflejo detecta la presión alta y sabe corregirla, ¿por qué no cura la hipertensión crónica? ¿Qué órgano tiene la última palabra?',
    pista: 'Un sistema se adapta en días; el otro tiene ganancia teóricamente infinita.'
  },

  bloques: [
    {
      nivel: 'imprescindible',
      titulo: 'Por qué se mantiene alta: el argumento renal',
      html: '<p>El barorreflejo corrige la presión en segundos, pero <b>se reajusta en 1–2 días</b>. El control a largo plazo corresponde a la <b>natriuresis por presión</b>: si la presión sube, el riñón excreta más sodio y agua, cae el volumen y la presión regresa a su punto de ajuste.</p>' +
        '<p>Como la ganancia de ese mecanismo es teóricamente infinita, para que la presión permanezca crónicamente elevada la curva debe estar <b>desplazada a la derecha</b>: el riñón requiere una presión mayor para excretar la misma carga de sodio. Ese desplazamiento es el denominador común de la hipertensión, sea cual sea su origen: nefronas reducidas, activación del SRAA, exceso de aldosterona, hiperactividad simpática renal, inflamación intrarrenal.</p>' +
        '<p>De ahí se derivan dos consecuencias prácticas: la <b>restricción de sodio</b> funciona porque reduce la carga que el riñón debe excretar, y los <b>diuréticos</b> desplazan la curva de vuelta hacia la izquierda.</p>'
    },
    {
      nivel: 'imprescindible',
      titulo: 'Hemodinámica en el tiempo',
      html: '<p>La hipertensión esencial no tiene la misma hemodinámica a los 25 que a los 60 años:</p>' +
        '<ul><li><b>Fase inicial (jóvenes)</b>: gasto cardíaco elevado con resistencia normal, en el contexto de hiperactividad simpática. Predomina un componente de "presión de flujo".</li>' +
        '<li><b>Fase establecida</b>: el gasto se normaliza y la <b>resistencia sube</b> por remodelado arteriolar —engrosamiento de la pared con reducción de la luz— y por autorregulación de los tejidos, que constriñen sus arteriolas para no recibir flujo excesivo.</li>' +
        '<li><b>Fase avanzada (ancianos)</b>: la rigidez de los grandes vasos domina y aparece la <b>hipertensión sistólica aislada</b>, con presión de pulso amplia.</li></ul>' +
        '<p>Es la misma enfermedad con tres retratos hemodinámicos distintos, y explica por qué los fármacos que funcionan mejor difieren según la edad.</p>',
      cadena: ['↑ Gasto inicial', 'Autorregulación tisular', '↑ Resistencia arteriolar', 'Remodelado vascular', 'HTA establecida']
    },
    {
      nivel: 'importante',
      titulo: 'Daño de órgano diana: el mecanismo de cada uno',
      html: '<table><tr><th>Órgano</th><th>Mecanismo</th><th>Manifestación</th></tr>' +
        '<tr><td>Corazón</td><td>↑Poscarga → hipertrofia concéntrica → rigidez y desajuste aporte/demanda</td><td>IC con FE preservada, fibrilación auricular, isquemia</td></tr>' +
        '<tr><td>Vasos</td><td>Disfunción endotelial, aterosclerosis acelerada, rigidez</td><td>Cardiopatía isquémica, aneurisma, disección</td></tr>' +
        '<tr><td>Riñón</td><td>Nefroesclerosis: hialinosis arteriolar e isquemia glomerular</td><td>Proteinuria, caída del filtrado</td></tr>' +
        '<tr><td>Cerebro</td><td>Lipohialinosis de arterias perforantes y microaneurismas</td><td>Ictus lacunar, hemorragia intracerebral, deterioro cognitivo</td></tr>' +
        '<tr><td>Retina</td><td>Estrechamiento arteriolar, cruces, exudados, edema de papila</td><td>Retinopatía hipertensiva</td></tr></table>' +
        '<p>El riñón ocupa un lugar doble: es <b>causa</b> (curva de natriuresis desplazada) y <b>víctima</b> (nefroesclerosis), lo que crea un círculo que acelera ambas enfermedades.</p>'
    },
    {
      nivel: 'complementario',
      titulo: 'Secundaria, urgencia y emergencia',
      html: '<p>Sospechar hipertensión <b>secundaria</b> ante inicio antes de los 30 o después de los 55 años, hipertensión resistente a tres fármacos, hipopotasemia espontánea, deterioro renal al iniciar un IECA, crisis paroxísticas o soplos abdominales. Causas: hiperaldosteronismo primario (la más frecuente identificable), enfermedad renovascular, apnea del sueño, enfermedad renal parenquimatosa, feocromocitoma, síndrome de Cushing, coartación.</p>' +
        '<p><b>Urgencia</b> (presión muy alta sin daño agudo de órgano): reducción gradual con fármacos orales en días. <b>Emergencia</b> (daño agudo en curso: encefalopatía, edema agudo de pulmón, disección, eclampsia, isquemia): reducción controlada por vía intravenosa. Y en general, reducir la PAM un <b>20–25 % en las primeras horas</b>, porque la autorregulación cerebral está desplazada a la derecha y una caída brusca produce isquemia. Las excepciones que exigen normalización rápida son la <b>disección aórtica</b> (donde el objetivo es reducir la fuerza de cizalla, con betabloqueante antes que vasodilatador), el edema agudo de pulmón y la eclampsia.</p>'
    }
  ],

  variables: [
    { n: 'Curva de natriuresis renal', d: 'up', nota: 'desplazada a la derecha: requiere más presión para excretar sodio' },
    { n: 'Resistencia vascular sistémica', d: 'up', nota: 'domina en la fase establecida' },
    { n: 'Compliance arterial', d: 'down', nota: 'domina en el anciano: HTA sistólica aislada' },
    { n: 'Masa ventricular', d: 'up', nota: 'hipertrofia concéntrica como respuesta a la poscarga' }
  ],

  fisiopatologia: '<p>La hipertrofia concéntrica es inicialmente adaptativa —normaliza la tensión parietal según Laplace— y termina siendo el problema: el ventrículo se vuelve rígido (disfunción diastólica), su masa crece más que su red capilar (isquemia relativa con coronarias normales), y la fibrosis intersticial crea sustrato para arritmias. La dilatación auricular izquierda secundaria explica que la hipertensión sea el factor de riesgo poblacionalmente más importante para la fibrilación auricular.</p>' +
    '<p>En el árbol vascular, la presión pulsátil elevada daña el endotelio, favorece la aterosclerosis y, en las arterias perforantes cerebrales —que salen directamente de vasos de gran calibre y reciben presión poco amortiguada—, produce lipohialinosis y microaneurismas de Charcot-Bouchard, la base de los ictus lacunares y de las hemorragias en ganglios basales.</p>',

  clinica: '<p>Es asintomática hasta que produce daño, y de ahí su nombre popular. La medición correcta importa tanto como el tratamiento: manguito adecuado, reposo, brazo apoyado a la altura del corazón, dos tomas y confirmación con medida ambulatoria o domiciliaria, que además identifica la <b>hipertensión de bata blanca</b> y la <b>hipertensión enmascarada</b> —esta última, la de peor pronóstico, con cifras normales en consulta y elevadas fuera de ella—.</p>' +
    '<p>Un dato de razonamiento: la ausencia de <b>descenso nocturno</b> de la presión (patrón <i>non-dipper</i>) se asocia a mayor daño de órgano diana y sugiere apnea del sueño o enfermedad renal.</p>',

  error: {
    confunde: 'Tratar la cifra en lugar del riesgo, y bajar la presión bruscamente en cualquier paciente con cifras alarmantes.',
    parecido: 'El número es lo que se mide, lo que alarma al paciente y lo que aparece en los objetivos terapéuticos.',
    diferencia: 'Lo que produce eventos es la carga mecánica crónica y el conjunto del riesgo cardiovascular, no una lectura puntual. Y en el hipertenso crónico la <b>autorregulación está desplazada a la derecha</b>: una presión que en otra persona sería normal puede producirle isquemia cerebral, renal o coronaria si se alcanza rápidamente.',
    ejemplo: 'Paciente asintomático con 210/115 detectado en una consulta rutinaria. Administrar un antihipertensivo de acción rápida para "normalizarlo" puede provocar un ictus isquémico. Lo correcto es iniciar o ajustar tratamiento oral y reducir de forma gradual en días.',
    regla: 'Baja la presión a la velocidad a la que subió. Y trata el riesgo global, no el número aislado.'
  },

  perla: '🔥 Toda hipertensión crónica implica una curva de natriuresis renal desplazada. Por eso la restricción de sodio y los diuréticos funcionan en prácticamente todos los fenotipos, y por eso el riñón es a la vez causa y víctima de la enfermedad.',

  feynman: {
    consigna: 'Explica por qué en la hipertensión establecida el gasto cardíaco es normal y la resistencia está elevada, si en la fase inicial ocurría lo contrario.',
    puntos: [
      'Describo la fase inicial de gasto alto por hiperactividad simpática',
      'Introduzco la autorregulación tisular como respuesta al exceso de flujo',
      'Explico la transición: el flujo se normaliza a costa de subir la resistencia',
      'Añado el remodelado estructural de la arteriola',
      'Concluyo por qué el fenotipo cambia con el tiempo'
    ],
    referencia: '<p>En las fases iniciales de la hipertensión esencial, especialmente en pacientes jóvenes, es frecuente encontrar un patrón <b>hiperdinámico</b>: gasto cardíaco elevado con resistencia vascular normal, taquicardia relativa y signos de hiperactividad simpática. La presión sube porque sube el flujo.</p>' +
      '<p>Pero los tejidos no toleran recibir más flujo del que necesitan. Cada lecho vascular <b>autorregula</b> su perfusión ajustando el tono de sus arteriolas mediante la respuesta miogénica —el músculo liso se contrae al ser estirado por una presión mayor— y mediante señales metabólicas: si llega más oxígeno del necesario, los metabolitos vasodilatadores se lavan y las arteriolas se constriñen. El resultado es que, órgano por órgano, la resistencia sube hasta que el flujo vuelve a ser el adecuado.</p>' +
      '<p>Esa constricción generalizada se traduce en un aumento de la resistencia vascular sistémica, y al aumentar la poscarga el gasto cardíaco desciende hasta valores normales. Se llega así a la hemodinámica característica de la hipertensión establecida: <b>gasto normal con resistencia elevada</b>. La presión no ha bajado; simplemente ha cambiado el factor responsable de mantenerla.</p>' +
      '<p>Con el tiempo, ese cambio funcional se hace <b>estructural</b>. La arteriola sometida a presión crónica engrosa su pared y reduce su luz —remodelado hipertrófico y eutrófico—, lo que aumenta la resistencia de forma fija y amplifica la respuesta a cualquier estímulo vasoconstrictor, porque un mismo grado de acortamiento del músculo liso produce ahora una reducción mayor del radio (y la resistencia varía con la cuarta potencia del radio). La hipertensión se automantiene.</p>' +
      '<p>Finalmente, en el anciano se añade una tercera fase dominada por la <b>rigidez de los grandes vasos</b>: la aorta pierde su función de amortiguación y aparece la hipertensión sistólica aislada con presión de pulso amplia. Comprender esta evolución explica por qué el mismo diagnóstico admite tratamientos distintos según la edad y el fenotipo hemodinámico predominante.</p>'
  },

  preguntas: [
    { nivel: 1, q: '¿Por qué el barorreflejo no puede corregir la hipertensión crónica?', r: 'Porque se adapta en 1–2 días reajustando su punto de operación. El control a largo plazo corresponde al riñón mediante la natriuresis por presión.' },
    { nivel: 1, q: '¿Qué hemodinámica caracteriza la hipertensión establecida?', r: 'Gasto cardíaco normal con resistencia vascular sistémica elevada, por remodelado arteriolar y autorregulación tisular.' },
    { nivel: 1, q: 'Nombra tres datos que hagan sospechar hipertensión secundaria.', r: 'Inicio antes de los 30 o después de los 55 años; resistencia a tres fármacos incluyendo un diurético; hipopotasemia espontánea; deterioro renal marcado al iniciar un IECA; crisis paroxísticas con sudoración y palpitaciones; soplo abdominal.' },
    { nivel: 2, q: 'Explica el papel de la autorregulación tisular en la transición de gasto alto a resistencia alta.', r: 'Los tejidos ajustan su tono arteriolar para recibir el flujo que necesitan. Ante un gasto elevado, constriñen sus arteriolas por respuesta miogénica y por lavado de metabolitos vasodilatadores. Esa constricción generalizada eleva la resistencia sistémica, lo que a su vez aumenta la poscarga y normaliza el gasto.' },
    { nivel: 2, q: '¿Por qué la hipertensión es un factor de riesgo tan importante para la fibrilación auricular?', r: 'Porque la hipertrofia concéntrica rigidifica el ventrículo, eleva las presiones de llenado y dilata la aurícula izquierda, que además desarrolla fibrosis. Una aurícula dilatada y fibrótica es el sustrato ideal para la reentrada auricular.' },
    { nivel: 3, q: 'Paciente con 220/130, dolor torácico desgarrante irradiado a la espalda y asimetría de pulsos. ¿Cuál es el objetivo de presión y qué fármaco eliges primero?', r: 'Sospecha de disección aórtica: es una de las pocas emergencias en las que se busca una reducción <b>rápida</b>, con objetivo de sistólica en torno a 100–120 mmHg y frecuencia por debajo de 60 lpm. Se inicia con un <b>betabloqueante intravenoso</b> antes que con un vasodilatador, porque lo que propaga la disección es la fuerza de cizalla (dP/dt), que depende de la velocidad de ascenso de la presión y de la frecuencia. Administrar primero un vasodilatador produciría taquicardia refleja y aumentaría el dP/dt, empeorando la disección.' },
    { nivel: 3, q: 'Paciente hipertenso con hipopotasemia espontánea y alcalosis metabólica, con aldosterona elevada y renina suprimida. ¿Diagnóstico y por qué encaja cada dato?', r: 'Hiperaldosteronismo primario. El exceso autónomo de aldosterona aumenta la reabsorción de sodio en el túbulo colector, elevando el volumen y la presión, lo que <b>suprime</b> la renina (a diferencia del hiperaldosteronismo secundario, en el que la renina está alta). La misma acción tubular aumenta la excreción de potasio e hidrogeniones, produciendo hipopotasemia y alcalosis metabólica. El edema no es prominente por el fenómeno de escape de la aldosterona, mediado por péptidos natriuréticos y natriuresis por presión. Es la causa identificable más frecuente de hipertensión secundaria y su tratamiento —antagonista mineralocorticoide o cirugía si es un adenoma unilateral— es específico.' }
  ],

  caso: {
    vineta: 'Varón de 52 años, hipertenso desde los 45, tratado con tres fármacos incluido un diurético, con cifras persistentes de 168/104. Refiere ronquidos y somnolencia diurna. K⁺ 3,3 mEq/L sin diurético ahorrador. IMC 34.',
    pasos: [
      { q: '¿Cumple criterios de hipertensión resistente y qué implica?', pista: 'Tres fármacos incluido diurético.', r: 'Sí: presión no controlada pese a tres fármacos a dosis adecuadas incluyendo un diurético. Implica que hay que confirmar la adherencia y la técnica de medida, descartar hipertensión de bata blanca con monitorización ambulatoria y buscar activamente una causa secundaria.' },
      { q: 'El potasio es de 3,3 sin ahorradores. ¿Qué sospechas y qué pides?', pista: 'Aldosterona y renina.', r: 'Hiperaldosteronismo primario. Se solicita el cociente aldosterona/renina, teniendo en cuenta que varios antihipertensivos interfieren en su interpretación. El patrón diagnóstico es aldosterona elevada con renina suprimida.' },
      { q: 'Los ronquidos y la somnolencia, ¿cómo se relacionan con su hipertensión?', pista: 'Apneas y descarga simpática nocturna.', r: 'La apnea obstructiva del sueño produce episodios repetidos de hipoxemia e hipercapnia que activan los quimiorreceptores y generan descargas simpáticas nocturnas intensas, con picos de presión. Con el tiempo aumenta el tono simpático basal y se pierde el descenso nocturno de la presión (patrón <i>non-dipper</i>). Es una causa muy frecuente y tratable de hipertensión resistente.' },
      { q: '¿Qué cuarto fármaco tiene mejor respaldo en hipertensión resistente y por qué encaja aquí?', pista: 'Piensa en el eje mineralocorticoide.', r: 'La espironolactona. En la hipertensión resistente existe con frecuencia un componente de exceso de mineralocorticoides o de retención de sodio no reconocida, y el bloqueo del receptor mineralocorticoide es el que ha demostrado mayor reducción de presión como cuarto fármaco. En este paciente, además, encaja con la sospecha de hiperaldosteronismo. Requiere vigilar potasio y función renal.' },
      { q: '¿Por qué su obesidad contribuye por más de un mecanismo?', pista: 'Riñón, simpático y apneas.', r: 'La obesidad desplaza la curva de natriuresis por compresión física del riñón por grasa perirrenal y aumento de la reabsorción tubular, activa el SRAA (el tejido adiposo produce angiotensinógeno y estimula la aldosterona), aumenta el tono simpático mediado por leptina y favorece la apnea del sueño. Es una de las intervenciones con mayor impacto sobre la presión, con una reducción aproximada de 1 mmHg por cada kilogramo perdido.' }
    ],
    cierre: 'La hipertensión resistente casi nunca es "mala suerte": es adherencia, sal, apneas, obesidad o una causa secundaria identificable. El razonamiento fisiológico dirige la búsqueda.'
  },

  tarjetas: [
    { f: '¿Por qué toda hipertensión crónica es, en último término, renal?', d: 'Porque la natriuresis por presión tiene ganancia teóricamente infinita: para que la presión siga alta, la curva debe estar DESPLAZADA a la derecha (el riñón necesita más presión para excretar el mismo sodio).' },
    { f: 'Evolución hemodinámica de la HTA esencial', d: 'Joven: GC alto con RVS normal (hiperactividad simpática). Establecida: GC normal con RVS ALTA (autorregulación tisular + remodelado). Anciano: rigidez aórtica → HTA sistólica aislada.' },
    { f: 'Autorregulación tisular en la génesis de la HTA', d: 'Los tejidos constriñen sus arteriolas ante un flujo excesivo (respuesta miogénica + lavado de metabolitos). Esa constricción generalizada eleva la RVS y normaliza el gasto: cambia el factor que sostiene la presión.' },
    { f: 'Daño cerebral de la HTA: mecanismo específico', d: 'Lipohialinosis de las arterias perforantes y microaneurismas de Charcot-Bouchard, que reciben presión poco amortiguada al salir de vasos grandes. Base de los ictus lacunares y de las hemorragias en ganglios basales.' },
    { f: 'Urgencia vs emergencia hipertensiva', d: 'Urgencia: cifras muy altas SIN daño agudo de órgano → reducción gradual con orales. Emergencia: daño agudo en curso → intravenoso. Regla: reducir la PAM 20–25 % en las primeras horas (autorregulación desplazada).' },
    { f: 'Excepciones que exigen reducción rápida de la presión', d: 'Disección aórtica (betabloqueante PRIMERO, para reducir el dP/dt y la fuerza de cizalla), edema agudo de pulmón y eclampsia.' },
    { f: 'Hiperaldosteronismo primario: patrón completo', d: 'HTA + hipopotasemia + alcalosis metabólica, con aldosterona ALTA y renina SUPRIMIDA. Causa identificable más frecuente de HTA secundaria. Sin edema por el fenómeno de escape de la aldosterona.' },
    { f: 'Cuarto fármaco de elección en HTA resistente', d: 'Espironolactona (bloqueo del receptor mineralocorticoide). Antes: confirmar adherencia y técnica, descartar bata blanca y buscar causa secundaria (apnea del sueño, hiperaldosteronismo, renovascular).' }
  ]
},

/* ---------------------------------------------------------- */
{
  id: 'valvulopatias',
  modulo: 'fisiopato',
  nombre: 'Valvulopatías: lógica hemodinámica',
  alto: false,
  minutos: 22,
  requisitos: ['poscarga', 'precarga-starling'],
  ideaCentral: 'Cada valvulopatía es una sobrecarga aplicada a una cámara concreta: de presión si hay obstrucción, de volumen si hay regurgitación. De esa distinción se deducen el remodelado, el momento de los síntomas, el patrón del soplo y el momento de operar, sin necesidad de memorizar cada entidad por separado.',

  anclaje: {
    q: 'Sin mirar: ¿por qué la estenosis aórtica produce hipertrofia concéntrica y la insuficiencia aórtica dilatación? ¿Y por qué la insuficiencia aórtica AGUDA es mucho más grave que la crónica severa?',
    pista: 'Sobrecarga de presión vs de volumen; y el tiempo que tiene el ventrículo para adaptarse.'
  },

  bloques: [
    {
      nivel: 'imprescindible',
      titulo: 'La regla que genera todo',
      html: '<table><tr><th>Lesión</th><th>Cámara sobrecargada</th><th>Tipo</th><th>Remodelado</th></tr>' +
        '<tr><td>Estenosis aórtica</td><td>VI</td><td>Presión</td><td>Hipertrofia concéntrica</td></tr>' +
        '<tr><td>Insuficiencia aórtica</td><td>VI</td><td>Volumen (y presión)</td><td>Dilatación excéntrica marcada</td></tr>' +
        '<tr><td>Estenosis mitral</td><td><b>Aurícula izquierda</b>, no el VI</td><td>Presión auricular</td><td>Dilatación auricular, HTP</td></tr>' +
        '<tr><td>Insuficiencia mitral</td><td>VI y aurícula izquierda</td><td>Volumen</td><td>Dilatación de ambas</td></tr></table>' +
        '<p>🔥 Punto que se pregunta siempre: en la <b>estenosis mitral el ventrículo izquierdo está protegido</b> —recibe poco volumen y no soporta sobrecarga—. Toda la fisiopatología ocurre aguas arriba: aurícula dilatada (fibrilación auricular y trombos), congestión pulmonar e hipertensión pulmonar con fallo derecho. Un paciente con estenosis mitral severa puede tener una función ventricular izquierda intacta.</p>'
    },
    {
      nivel: 'imprescindible',
      titulo: 'Estenosis aórtica: la más importante',
      html: '<p>Obstrucción fija a la eyección → el VI genera presiones intracavitarias muy altas → hipertrofia concéntrica que normaliza la tensión parietal (Laplace) pero produce rigidez, dependencia de la contracción auricular y desajuste entre aporte y demanda de oxígeno.</p>' +
        '<p><b>Tríada de síntomas</b> y su mecanismo:</p>' +
        '<ul><li><b>Angina</b>: más masa y más presión (demanda) con menor densidad capilar y menor presión de perfusión (aporte). Aparece con coronarias normales.</li>' +
        '<li><b>Síncope de esfuerzo</b>: gasto fijo + caída de la RVS por vasodilatación muscular → la presión se desploma.</li>' +
        '<li><b>Disnea</b>: disfunción diastólica con presiones de llenado altas; marca el peor pronóstico de las tres.</li></ul>' +
        '<p>La aparición de <b>cualquiera</b> de los tres cambia radicalmente el pronóstico y es indicación de intervención. Soplo sistólico eyectivo, rudo, irradiado a carótidas, con pulso <i>parvus et tardus</i> y segundo ruido disminuido en las formas severas.</p>' +
        '<p><b>Precauciones fisiológicas</b>: evitar vasodilatadores (el gasto es fijo: la presión cae sin compensación), mantener el ritmo sinusal y la precarga, y evitar la taquicardia.</p>'
    },
    {
      nivel: 'importante',
      titulo: 'Agudo vs crónico: la diferencia decisiva',
      html: '<p>La misma lesión anatómica se comporta de forma radicalmente distinta según el tiempo disponible para adaptarse:</p>' +
        '<table><tr><th></th><th>Insuficiencia aórtica crónica</th><th>Insuficiencia aórtica aguda</th></tr>' +
        '<tr><td>Ventrículo</td><td>Dilatado, compliante</td><td>Tamaño normal, <b>no compliante</b></td></tr>' +
        '<tr><td>Volumen sistólico total</td><td>Muy aumentado</td><td>No puede aumentar</td></tr>' +
        '<tr><td>Presión de pulso</td><td><b>Amplia</b>, pulso saltón</td><td>Estrecha</td></tr>' +
        '<tr><td>Presión telediastólica</td><td>Normal o poco elevada</td><td><b>Muy elevada</b></td></tr>' +
        '<tr><td>Clínica</td><td>Asintomático durante años</td><td>Edema pulmonar y shock</td></tr>' +
        '<tr><td>Manejo</td><td>Seguimiento, cirugía programada</td><td><b>Cirugía urgente</b></td></tr></table>' +
        '<p>La lógica: el ventrículo crónico ha tenido años para dilatarse y alojar el volumen regurgitante con presiones bajas. El agudo (endocarditis, disección) recibe el mismo volumen en un ventrículo de tamaño normal y poco distensible: la presión telediastólica se dispara, se transmite al capilar pulmonar y aparece edema agudo. La ausencia de los signos periféricos clásicos —precisamente porque falta el tiempo de adaptación— hace que se diagnostique tarde.</p>'
    },
    {
      nivel: 'complementario',
      titulo: 'Maniobras y soplos desde la fisiología',
      html: '<p>En lugar de memorizar, deduce: casi todas las maniobras actúan cambiando la <b>precarga</b> o la <b>poscarga</b>, y el soplo cambia según de qué dependa su flujo.</p>' +
        '<ul><li><b>Valsalva y bipedestación</b> (↓precarga): disminuyen la mayoría de los soplos, porque hay menos volumen que mover. <b>Excepciones</b>: aumentan en la miocardiopatía hipertrófica obstructiva (menor volumen = tracto de salida más estrecho) y en el prolapso mitral (el velo prolapsa antes).</li>' +
        '<li><b>Cuclillas y elevación de piernas</b> (↑precarga y ↑poscarga): efecto contrario.</li>' +
        '<li><b>Handgrip</b> (↑poscarga): aumenta los soplos de regurgitación izquierda (insuficiencia mitral y aórtica), porque hay más resistencia a la salida anterógrada, y disminuye el de la estenosis aórtica y el de la miocardiopatía hipertrófica.</li>' +
        '<li><b>Inspiración</b> (↑retorno venoso derecho): aumenta los soplos <b>derechos</b> (signo de Rivero-Carvallo).</li></ul>' +
        '<p>Con estas cuatro reglas se distinguen la mayoría de los soplos sin memorizar tablas.</p>'
    }
  ],

  variables: [
    { n: 'Tipo de sobrecarga', d: 'up', nota: 'presión → concéntrica; volumen → excéntrica' },
    { n: 'Tiempo de adaptación', d: 'up', nota: 'decide si la lesión se tolera o descompensa' },
    { n: 'Presión telediastólica', d: 'up', nota: 'clave en las lesiones agudas' },
    { n: 'Compliance de la cámara', d: 'down', nota: 'lo que convierte volumen en congestión' }
  ],

  fisiopatologia: '<p>En la <b>estenosis mitral</b>, el obstáculo entre aurícula y ventrículo eleva la presión auricular izquierda, que se transmite a las venas y capilares pulmonares. Aparece disnea, y con el tiempo hipertensión pulmonar reactiva y fallo derecho. Como el llenado depende de la diástole y del gradiente, todo lo que acorte la diástole descompensa: <b>taquicardia, fiebre, embarazo, ejercicio y fibrilación auricular</b>. La aurícula dilatada y fibrilando es además una fuente de trombos y embolias.</p>' +
    '<p>En la <b>insuficiencia mitral crónica</b>, el ventrículo eyecta hacia la aurícula, un circuito de baja impedancia: la poscarga efectiva es baja y la fracción de eyección queda artificialmente elevada. Una FE inferior al 60 % ya indica disfunción sistólica significativa, y esperar a que caiga por debajo de los umbrales habituales significa operar tarde.</p>',

  clinica: '<p>Para la práctica de Diego, tres reglas de seguridad hemodinámica: en la <b>estenosis aórtica</b> mantener precarga, ritmo sinusal y resistencia, evitando vasodilatadores; en la <b>estenosis mitral</b> controlar la frecuencia para alargar la diástole y preservar el llenado; en la <b>insuficiencia aórtica o mitral aguda</b>, reducir la poscarga y considerar cirugía urgente, evitando en la insuficiencia aórtica todo lo que enlentezca la frecuencia, porque una diástole larga aumenta el tiempo de regurgitación.</p>',

  error: {
    confunde: 'Pensar que la estenosis mitral sobrecarga al ventrículo izquierdo.',
    parecido: 'Es una valvulopatía "izquierda" y produce congestión pulmonar y disnea, síntomas que asociamos con el fallo del ventrículo izquierdo.',
    diferencia: 'La obstrucción está <b>antes</b> del ventrículo. El ventrículo izquierdo recibe poco volumen y no soporta ninguna sobrecarga: su función suele ser normal. Toda la fisiopatología es auricular y pulmonar, y el fallo que aparece con el tiempo es <b>derecho</b>, por hipertensión pulmonar.',
    ejemplo: 'Paciente con estenosis mitral severa, disnea intensa, ingurgitación yugular y edemas, con FE del 65 % y ventrículo izquierdo pequeño. Buscar la explicación en el ventrículo izquierdo lleva a un callejón sin salida.',
    regla: 'Localiza la obstrucción y pregunta qué cámara queda <b>aguas arriba</b>: esa es la que sufre.'
  },

  perla: '🔥 Obstrucción = sobrecarga de presión = hipertrofia concéntrica. Regurgitación = sobrecarga de volumen = dilatación excéntrica. Y toda lesión <b>aguda</b> es peor que su equivalente crónica severa, porque la cámara no ha tenido tiempo de volverse compliante: el mismo volumen produce presiones catastróficas.',

  feynman: {
    consigna: 'Explica por qué una insuficiencia aórtica aguda por endocarditis produce edema agudo de pulmón y shock, mientras que una insuficiencia aórtica crónica severa puede ser asintomática durante años.',
    puntos: [
      'Explico que en ambos casos entra el mismo volumen regurgitante',
      'Introduzco la compliance ventricular como variable determinante',
      'Explico la adaptación crónica: dilatación excéntrica que aloja volumen a baja presión',
      'Explico el caso agudo: ventrículo normal y rígido, presión telediastólica disparada',
      'Menciono por qué faltan los signos periféricos clásicos y por qué se diagnostica tarde'
    ],
    referencia: '<p>En ambas situaciones el problema mecánico es idéntico: parte del volumen eyectado regresa al ventrículo durante la diástole porque la válvula aórtica no cierra. Lo que cambia por completo el cuadro clínico no es <i>cuánto</i> volumen regurgita, sino <b>a qué presión puede alojarlo el ventrículo</b>, es decir, su compliance.</p>' +
      '<p>En la forma <b>crónica</b>, la sobrecarga se instala a lo largo de años. El ventrículo responde con hipertrofia <b>excéntrica</b>: añade sarcómeros en serie, se dilata y aumenta enormemente su volumen telediastólico. Al mismo tiempo, esa dilatación se acompaña de un desplazamiento de la curva de compliance, de modo que el ventrículo aloja volúmenes muy grandes con presiones telediastólicas casi normales. Gracias a Frank-Starling eyecta un volumen sistólico total enorme, que mantiene el gasto anterógrado pese a la fracción regurgitante. El precio se paga en la periferia: ese gran volumen eyectado eleva la sistólica y el escape diastólico baja la diastólica, produciendo la <b>presión de pulso amplia</b> y toda la constelación de signos periféricos —pulso de Corrigan, danza carotídea, signo de Musset—. El paciente puede permanecer asintomático durante años, y de hecho el reto clínico es detectar el momento en que el ventrículo empieza a claudicar antes de que el daño sea irreversible.</p>' +
      '<p>En la forma <b>aguda</b> —perforación valvular por endocarditis, disección aórtica que afecta a la raíz, traumatismo— el ventrículo tiene un tamaño y una compliance <b>normales</b>. Recibe de golpe un volumen regurgitante importante sin haber tenido ni un día para dilatarse. En un ventrículo de tamaño normal, la curva presión-volumen diastólica es empinada: ese volumen extra dispara la <b>presión telediastólica</b>, que puede alcanzar valores muy altos e incluso igualar la presión aórtica diastólica, con cierre prematuro de la válvula mitral. Esa presión se transmite retrógradamente a la aurícula izquierda y al capilar pulmonar y produce <b>edema agudo de pulmón</b>. Al mismo tiempo, el volumen sistólico anterógrado no puede aumentar, de modo que el gasto cae y aparece hipotensión, taquicardia compensadora y shock.</p>' +
      '<p>Y aquí está la trampa diagnóstica: precisamente porque falta la adaptación crónica, <b>faltan los signos clásicos</b>. La presión de pulso es estrecha en lugar de amplia, no hay pulso saltón ni signos periféricos, y el soplo diastólico es corto y suave —porque las presiones ventricular y aórtica se igualan pronto—, de modo que puede pasar inadvertido en un paciente taquicárdico y con edema pulmonar. Lo que en la forma crónica es un hallazgo llamativo y de curso lento, en la aguda es un cuadro discreto en la auscultación y catastrófico en la evolución, que exige ecocardiografía inmediata y <b>cirugía urgente</b>.</p>'
  },

  preguntas: [
    { nivel: 1, q: '¿Qué tipo de sobrecarga y qué remodelado produce cada mecanismo valvular?', r: 'La obstrucción (estenosis) produce sobrecarga de presión y hipertrofia concéntrica (sarcómeros en paralelo). La regurgitación produce sobrecarga de volumen y dilatación con hipertrofia excéntrica (sarcómeros en serie).' },
    { nivel: 1, q: 'Enumera la tríada de la estenosis aórtica y di cuál tiene peor pronóstico.', r: 'Angina, síncope de esfuerzo y disnea. La disnea, que traduce insuficiencia cardíaca, es la de peor pronóstico. La aparición de cualquiera de las tres es indicación de intervención.' },
    { nivel: 1, q: 'En la estenosis mitral, ¿qué cámara soporta la sobrecarga?', r: 'La aurícula izquierda. El ventrículo izquierdo está protegido: recibe poco volumen y su función suele ser normal. La fisiopatología ocurre aguas arriba: congestión pulmonar, hipertensión pulmonar y fallo derecho.' },
    { nivel: 2, q: '¿Por qué la fibrilación auricular descompensa tan bruscamente una estenosis mitral?', r: 'Por dos razones: pierde la contracción auricular, que ayudaba a atravesar la válvula estenótica, y la respuesta ventricular rápida acorta la diástole, que es el tiempo disponible para el llenado a través de un orificio reducido. La presión auricular se dispara y aparece edema pulmonar.' },
    { nivel: 2, q: '¿Por qué la fracción de eyección engaña en la insuficiencia mitral?', r: 'Porque el ventrículo eyecta hacia la aurícula izquierda, un circuito de baja impedancia: la poscarga efectiva es baja y la FE queda artificialmente elevada. Una FE inferior al 60 % ya indica disfunción sistólica significativa en esa lesión.' },
    { nivel: 2, q: 'Explica por qué el soplo de la miocardiopatía hipertrófica obstructiva aumenta con Valsalva mientras el de la estenosis aórtica disminuye.', r: 'El Valsalva reduce la precarga. En la estenosis aórtica hay menos volumen que atravesar el orificio fijo y el soplo disminuye. En la miocardiopatía hipertrófica, un ventrículo menos lleno tiene una cavidad más pequeña y un tracto de salida más estrecho, de modo que la obstrucción dinámica <b>aumenta</b> y el soplo se intensifica.' },
    { nivel: 3, q: 'Paciente con endocarditis, disnea súbita, taquicardia, edema pulmonar y un soplo diastólico corto y suave. La presión de pulso es estrecha. ¿Por qué este cuadro es más grave de lo que sugiere la auscultación?', r: 'Es una insuficiencia aórtica <b>aguda</b>. El ventrículo, de tamaño y compliance normales, recibe un volumen regurgitante importante sin haber podido dilatarse: la presión telediastólica se dispara y se transmite al capilar pulmonar produciendo edema agudo, mientras el gasto anterógrado cae. Los signos periféricos clásicos faltan porque dependen de la adaptación crónica, y el soplo es corto y suave porque las presiones aórtica y ventricular se igualan pronto en la diástole. Precisamente la discreción de los hallazgos hace que se diagnostique tarde. Requiere ecocardiografía inmediata y cirugía urgente.' },
    { nivel: 3, q: 'A un paciente con estenosis aórtica severa e hipotensión le administran nitroglicerina y sufre una parada cardíaca. Explica la secuencia.', r: 'El gasto cardíaco está fijado por la obstrucción valvular y no puede aumentar. Como PA = GC × RVS, al reducir la resistencia con un vasodilatador la presión cae sin ninguna compensación posible. La caída de la presión diastólica aórtica reduce la presión de perfusión coronaria justo en un ventrículo hipertrófico con demanda elevada y reserva de flujo reducida, de modo que aparece isquemia subendocárdica. La isquemia deprime la contractilidad, cae aún más la presión y se cierra una espiral que termina en arritmia ventricular o disociación electromecánica. Además, la nitroglicerina reduce la precarga, y este ventrículo rígido depende críticamente de un volumen telediastólico adecuado.' }
  ],

  caso: {
    vineta: 'Mujer de 79 años con disnea de esfuerzo progresiva y un episodio sincopal al subir escaleras. Soplo sistólico rudo en foco aórtico irradiado a carótidas, segundo ruido disminuido, pulso carotídeo de ascenso lento. PA 112/78.',
    pasos: [
      { q: '¿Qué lesión y qué gravedad sugieren los hallazgos exploratorios?', pista: 'Pulso, segundo ruido y síntomas.', r: 'Estenosis aórtica severa. El pulso <i>parvus et tardus</i> (ascenso lento y amplitud reducida) y la disminución del segundo ruido indican severidad, y la presencia de síncope de esfuerzo y disnea la sitúa en la fase sintomática, con implicación pronóstica inmediata.' },
      { q: 'Explica el mecanismo de su síncope.', pista: 'Gasto fijo y vasodilatación.', r: 'Al subir escaleras, la vasodilatación del músculo activo reduce la resistencia vascular sistémica. En una persona sana, el gasto se multiplicaría y mantendría la presión, pero aquí el gasto está limitado por la obstrucción. Como PA = GC × RVS, la presión cae y con ella la perfusión cerebral. Se añaden isquemia subendocárdica del ventrículo hipertrofiado y riesgo de arritmia.' },
      { q: '¿Por qué puede tener angina con coronarias normales?', pista: 'Aporte y demanda.', r: 'Por desequilibrio en ambos lados: la hipertrofia aumenta la masa y las presiones intracavitarias, elevando la demanda de oxígeno, mientras que la densidad capilar por gramo de tejido disminuye, la presión telediastólica elevada se resta del gradiente de perfusión y la obstrucción reduce la presión aórtica disponible. La reserva de flujo coronario está reducida aunque las coronarias sean angiográficamente normales.' },
      { q: 'Desarrolla una fibrilación auricular rápida y se descompensa de inmediato. ¿Por qué?', pista: 'Ventrículo rígido y diástole corta.', r: 'Su ventrículo hipertrofiado y rígido depende de la contracción auricular para el 30–40 % del llenado y de una diástole suficientemente larga. La fibrilación elimina la patada auricular y la respuesta rápida acorta la diástole: cae el volumen telediastólico, cae el volumen sistólico y se disparan las presiones de llenado. Además la taquicardia aumenta la demanda y reduce el tiempo de perfusión coronaria.' },
      { q: '¿Qué hay que evitar en su manejo agudo y por qué?', pista: 'Piensa en las tres condiciones de las que depende.', r: 'Evitar vasodilatadores y toda reducción de la precarga (nitratos, diuréticos agresivos), porque su gasto es fijo y no puede compensar la caída de resistencia ni el descenso del llenado. Evitar la taquicardia sostenida y priorizar la restauración del ritmo sinusal. Mantener la presión de perfusión, ya que su miocardio hipertrofiado es especialmente vulnerable a la hipotensión.' },
      { q: '¿Qué determina que se le indique intervención?', pista: 'La aparición de un solo dato.', r: 'La aparición de síntomas —angina, síncope o disnea— en una estenosis severa. El pronóstico cambia radicalmente en ese momento, con supervivencias medias de dos a tres años sin intervención, y el riesgo de muerte súbita aumenta. La decisión entre recambio quirúrgico o implante percutáneo depende del riesgo quirúrgico, la anatomía y la edad, pero la indicación la marca la clínica.' }
    ],
    cierre: 'La estenosis aórtica reúne casi todos los conceptos del curso: poscarga, Laplace, hipertrofia, perfusión coronaria, dependencia de precarga y de ritmo sinusal, y la relación PA = GC × RVS aplicada al esfuerzo.'
  },

  tarjetas: [
    { f: 'Regla general de las valvulopatías', d: 'Obstrucción = sobrecarga de PRESIÓN = hipertrofia concéntrica. Regurgitación = sobrecarga de VOLUMEN = dilatación excéntrica. Localiza la lesión y pregunta qué cámara queda aguas arriba.' },
    { f: 'Estenosis mitral: ¿qué cámara sufre?', d: 'La AURÍCULA izquierda, no el ventrículo. El VI está protegido (recibe poco volumen, función normal). Consecuencias: FA y trombos, congestión pulmonar, hipertensión pulmonar y fallo DERECHO.' },
    { f: 'Tríada de la estenosis aórtica y su significado', d: 'Angina, síncope de esfuerzo y disnea (la de peor pronóstico). La aparición de cualquiera indica intervención: supervivencia media de 2–3 años sin operar.' },
    { f: 'Mecanismo del síncope de esfuerzo en la estenosis aórtica', d: 'Gasto FIJO por la obstrucción + caída de la RVS por vasodilatación muscular → PA = GC × RVS se desploma → hipoperfusión cerebral.' },
    { f: 'Insuficiencia aórtica aguda vs crónica', d: 'Crónica: ventrículo dilatado y compliante, presión de pulso AMPLIA, asintomático años. Aguda: ventrículo normal y rígido → presión telediastólica disparada, presión de pulso ESTRECHA, edema agudo y shock. Cirugía urgente.' },
    { f: '¿Por qué la insuficiencia aórtica aguda se diagnostica tarde?', d: 'Faltan los signos periféricos clásicos (dependen de la adaptación crónica) y el soplo diastólico es CORTO y suave porque las presiones aórtica y ventricular se igualan pronto. Cuadro discreto en la auscultación, catastrófico en la evolución.' },
    { f: 'Maniobras: Valsalva y bipedestación', d: '↓precarga → disminuyen casi todos los soplos. EXCEPCIONES: aumentan en la miocardiopatía hipertrófica obstructiva (cavidad más pequeña = más obstrucción) y en el prolapso mitral.' },
    { f: 'Handgrip y signo de Rivero-Carvallo', d: 'Handgrip ↑poscarga → aumentan los soplos de regurgitación izquierda (mitral y aórtica), disminuyen estenosis aórtica y MCH. Inspiración ↑retorno derecho → aumentan los soplos DERECHOS (Rivero-Carvallo).' },
    { f: 'Seguridad hemodinámica en estenosis aórtica', d: 'Mantener precarga, ritmo sinusal y resistencia. EVITAR vasodilatadores (gasto fijo → colapso), diuréticos agresivos y taquicardia.' }
  ]
},

/* ---------------------------------------------------------- */
{
  id: 'arritmias',
  modulo: 'fisiopato',
  nombre: 'Arritmias: del mecanismo a la decisión',
  alto: false,
  minutos: 20,
  requisitos: ['potencial-accion', 'ecg-fisiologia'],
  ideaCentral: 'Casi toda taquiarritmia sostenida es una reentrada, y casi toda reentrada exige un circuito con bloqueo unidireccional y conducción lenta. Si identificas el circuito puedes deducir por qué funciona cada maniobra y cada fármaco, y la decisión clínica se simplifica a una sola pregunta previa: ¿el paciente está estable o inestable?',

  anclaje: {
    q: 'Sin mirar: ¿por qué la adenosina corta una taquicardia por reentrada nodal pero solo "desenmascara" un flutter auricular, sin cortarlo?',
    pista: 'Depende de si el nodo AV forma parte del circuito o es solo un espectador que deja pasar impulsos.'
  },

  bloques: [
    {
      nivel: 'imprescindible',
      titulo: 'La pregunta que va antes de todo',
      html: '<p>Ante cualquier taquiarritmia, la primera decisión no es el diagnóstico sino la <b>estabilidad</b>. Signos de inestabilidad: hipotensión con hipoperfusión, alteración del nivel de conciencia, dolor torácico isquémico, insuficiencia cardíaca aguda.</p>' +
        '<p><b>Inestable → cardioversión eléctrica sincronizada</b>, sin esperar a filiar la arritmia. La electricidad no requiere diagnóstico y actúa en segundos.</p>' +
        '<p><b>Estable → hay tiempo</b> para analizar el ECG y elegir tratamiento farmacológico.</p>' +
        '<p>Y una regla de seguridad: toda <b>taquicardia de QRS ancho</b> se considera ventricular hasta que se demuestre lo contrario, especialmente si hay cardiopatía estructural o infarto previo. Tratarla como supraventricular con verapamilo puede producir colapso hemodinámico.</p>'
    },
    {
      nivel: 'imprescindible',
      titulo: 'Tres mecanismos y cómo distinguirlos',
      html: '<table><tr><th>Mecanismo</th><th>Base</th><th>Ejemplos</th></tr>' +
        '<tr><td><b>Reentrada</b></td><td>Circuito con bloqueo unidireccional y conducción lenta</td><td>Reentrada nodal, WPW, flutter, TV postinfarto</td></tr>' +
        '<tr><td><b>Automatismo anormal</b></td><td>Foco ectópico que despolariza espontáneamente</td><td>Taquicardia auricular, ritmo idioventricular acelerado</td></tr>' +
        '<tr><td><b>Actividad desencadenada</b></td><td>Pospotenciales</td><td>Precoces (QT largo → torsade); tardíos (digital, catecolaminas)</td></tr></table>' +
        '<p>La reentrada tiene inicio y fin <b>bruscos</b> y responde a maniobras y a la cardioversión; el automatismo tiene calentamiento y enfriamiento progresivos y no se corta con electricidad, porque no hay circuito que interrumpir.</p>' +
        '<p>🔥 De ahí que la cardioversión sea inútil en una taquicardia sinusal o en una taquicardia auricular automática: si el problema es un foco que dispara, despolarizar todo el miocardio no lo elimina.</p>'
    },
    {
      nivel: 'importante',
      titulo: 'Fibrilación auricular: las tres decisiones',
      html: '<p>La FA es la arritmia sostenida más frecuente y su manejo se resume en tres preguntas independientes:</p>' +
        '<ol><li><b>¿Anticoagular?</b> La decisión depende del riesgo embólico (CHA₂DS₂-VASc), <b>no</b> de si se controla el ritmo o la frecuencia, ni de si la FA es paroxística o permanente. El trombo se forma en la orejuela por estasis en una aurícula que no se contrae.</li>' +
        '<li><b>¿Frecuencia o ritmo?</b> Ambas estrategias son razonables en muchos pacientes; el control del ritmo se prioriza en pacientes jóvenes, muy sintomáticos, con FA de reciente diagnóstico o con insuficiencia cardíaca.</li>' +
        '<li><b>¿Tratar la causa?</b> Hipertensión, apnea del sueño, obesidad, alcohol, hipertiroidismo, valvulopatía. Sin ello, la recurrencia es la norma.</li></ol>' +
        '<p>Fisiología del deterioro: se pierde la contracción auricular (hasta un 30–40 % del llenado en ventrículos rígidos) y la respuesta rápida e irregular acorta la diástole. Además, una FA rápida mantenida durante semanas puede producir <b>taquimiocardiopatía</b>, una disfunción ventricular reversible al controlar la frecuencia: una de las pocas miocardiopatías potencialmente curables.</p>'
    },
    {
      nivel: 'complementario',
      titulo: 'Bradiarritmias y preexcitación',
      html: '<p><b>Bloqueos AV</b>: el primer grado (PR > 200 ms) y el Mobitz I (alargamiento progresivo del PR hasta una P bloqueada) suelen ser <b>suprahisianos</b>, de mecanismo vagal o nodal, con escape estrecho y buen pronóstico. El Mobitz II (bloqueo súbito sin alargamiento previo) y el bloqueo completo suelen ser <b>infrahisianos</b>, con escape ancho, lento e inestable: indicación de marcapasos.</p>' +
        '<p><b>Preextitación (WPW)</b>: una vía accesoria conduce sin el retraso del nodo AV, produciendo PR corto y onda delta. Si aparece <b>fibrilación auricular sobre una vía accesoria</b>, los impulsos pueden alcanzar el ventrículo a frecuencias muy altas y degenerar en fibrilación ventricular. Por eso están contraindicados los fármacos que bloquean el nodo AV —adenosina, verapamilo, betabloqueantes, digoxina—: al frenar la vía normal favorecen la conducción por la accesoria. El tratamiento es procainamida o cardioversión.</p>'
    }
  ],

  variables: [
    { n: 'Circuito de reentrada', d: 'up', nota: 'requiere bloqueo unidireccional y conducción lenta' },
    { n: 'Período refractario', d: 'up', nota: 'alargarlo interrumpe la reentrada' },
    { n: 'Conducción del nodo AV', d: 'down', nota: 'clave si el nodo forma parte del circuito' },
    { n: 'Duración de la diástole', d: 'down', nota: 'la taquicardia compromete llenado y perfusión' }
  ],

  fisiopatologia: '<p>Las consecuencias hemodinámicas de una arritmia se deducen del árbol del gasto cardíaco: la <b>taquicardia extrema</b> acorta la diástole y reduce el llenado y la perfusión coronaria; la <b>pérdida de la contracción auricular</b> reduce el volumen telediastólico, sobre todo en ventrículos rígidos; la <b>irregularidad</b> produce volúmenes sistólicos variables e ineficientes; la <b>disincronía</b> (ritmos ventriculares o estimulación de marcapasos) reduce la eficiencia mecánica; y la <b>bradicardia extrema</b> reduce el gasto cuando el volumen sistólico ya no puede aumentar más.</p>',

  clinica: '<p>Las maniobras vagales y la adenosina son diagnósticas y terapéuticas a la vez. Al frenar transitoriamente el nodo AV: si el nodo forma <b>parte del circuito</b> (reentrada nodal, taquicardia por vía accesoria ortodrómica), la arritmia <b>se corta</b>; si el nodo es solo la vía de paso hacia el ventrículo (flutter, taquicardia auricular, FA), la arritmia <b>persiste</b> pero se enlentece la respuesta ventricular y quedan visibles las ondas auriculares. Ambos resultados son informativos.</p>',

  error: {
    confunde: 'Tratar una taquicardia regular de QRS ancho como si fuera supraventricular con aberrancia.',
    parecido: 'Ambas pueden ser regulares, rápidas y de morfología similar, y algunas taquicardias supraventriculares con bloqueo de rama son indistinguibles a primera vista.',
    diferencia: 'La mayoría de las taquicardias de QRS ancho son <b>ventriculares</b>, y la probabilidad se aproxima al 90 % si hay antecedente de infarto o cardiopatía estructural. Administrar verapamilo a una taquicardia ventricular puede producir hipotensión severa y parada, por su efecto inotrópico y vasodilatador negativo sobre un ventrículo ya comprometido.',
    ejemplo: 'Paciente de 68 años con infarto previo y taquicardia regular a 170 con QRS de 160 ms. Datos a favor de origen ventricular: disociación auriculoventricular, latidos de fusión o de captura, concordancia precordial y eje extremo.',
    regla: 'QRS ancho = ventricular hasta que se demuestre lo contrario. Si dudas, procainamida o cardioversión; nunca verapamilo.'
  },

  perla: '🔥 La adenosina distingue circuitos: <b>corta</b> las taquicardias que usan el nodo AV como parte del circuito y <b>desenmascara</b> las que solo lo atraviesan. Y la decisión que precede a todo diagnóstico es la estabilidad: si el paciente está inestable, la respuesta es la cardioversión eléctrica sincronizada.',

  feynman: {
    consigna: 'Explica por qué en un paciente con Wolff-Parkinson-White que desarrolla fibrilación auricular están contraindicados los fármacos que bloquean el nodo AV.',
    puntos: [
      'Describo la vía accesoria y por qué conduce sin retraso',
      'Explico la función protectora del nodo AV como filtro de frecuencia',
      'Explico qué ocurre al bloquear el nodo con una FA presente',
      'Concluyo el riesgo de fibrilación ventricular',
      'Menciono la alternativa correcta: procainamida o cardioversión'
    ],
    referencia: '<p>En el síndrome de Wolff-Parkinson-White existe una <b>vía accesoria</b> de músculo auriculoventricular que conecta directamente aurícula y ventrículo, sorteando el nodo AV. Su característica decisiva es que conduce con las propiedades del músculo rápido —dependiente de sodio— y por tanto <b>sin el retraso fisiológico del nodo</b>, que es tejido lento dependiente de calcio. Eso produce el PR corto y la onda delta del ECG basal en ritmo sinusal.</p>' +
      '<p>El nodo AV cumple una función que solo se aprecia cuando falta: actúa como <b>filtro de frecuencia</b>. Su período refractario largo y su conducción decremental impiden que las frecuencias auriculares muy rápidas se transmitan íntegras al ventrículo. Gracias a ello, un flutter a 300 por minuto llega al ventrículo a 150, y una fibrilación auricular con actividad auricular a 400–600 se traduce en una respuesta ventricular manejable.</p>' +
      '<p>Cuando un paciente con vía accesoria desarrolla <b>fibrilación auricular</b>, los impulsos auriculares caóticos disponen de dos caminos: el nodo AV, que los filtra, y la vía accesoria, que no. Si en esa situación se administra un fármaco que bloquea el nodo AV —adenosina, verapamilo, diltiazem, betabloqueantes o digoxina—, se cierra el camino filtrado y <b>toda la actividad auricular pasa preferentemente por la vía accesoria</b>. La respuesta ventricular puede alcanzar frecuencias extremas, con intervalos RR muy cortos que caen en el período vulnerable de la repolarización ventricular. El resultado es la degeneración en <b>fibrilación ventricular</b> y parada cardíaca. La digoxina añade un riesgo propio, porque puede acortar el período refractario de la vía accesoria.</p>' +
      '<p>El tratamiento correcto es exactamente el contrario: actuar sobre la <b>vía accesoria</b>, no sobre el nodo. La <b>procainamida</b>, bloqueante de canales de sodio, prolonga el período refractario de la vía accesoria y reduce la conducción por ella. Y si el paciente está inestable —lo que es frecuente en esta situación—, la respuesta es la <b>cardioversión eléctrica sincronizada</b> inmediata. El reconocimiento electrocardiográfico es característico y debe activar la alarma: taquicardia irregular, de QRS ancho y con morfología variable, a frecuencias muy elevadas. A largo plazo, el tratamiento definitivo es la ablación de la vía accesoria.</p>'
  },

  preguntas: [
    { nivel: 1, q: '¿Cuál es la primera decisión ante una taquiarritmia y qué define su respuesta?', r: 'La estabilidad hemodinámica. Si hay hipotensión con hipoperfusión, alteración de la conciencia, isquemia o insuficiencia cardíaca aguda, se procede a cardioversión eléctrica sincronizada sin esperar a filiar la arritmia.' },
    { nivel: 1, q: '¿Qué distingue clínicamente una reentrada de un automatismo anormal?', r: 'La reentrada empieza y termina de forma brusca y responde a la cardioversión y a las maniobras vagales; el automatismo tiene calentamiento y enfriamiento progresivos y no se corta con electricidad, porque no hay circuito que interrumpir.' },
    { nivel: 1, q: '¿De qué depende la decisión de anticoagular en la fibrilación auricular?', r: 'Del riesgo embólico estimado (CHA₂DS₂-VASc), no de la estrategia de control de ritmo o frecuencia ni del patrón paroxístico o permanente.' },
    { nivel: 2, q: 'Explica por qué la adenosina corta una reentrada nodal pero no un flutter.', r: 'Porque en la reentrada nodal el nodo AV forma parte del circuito: bloquearlo transitoriamente interrumpe el bucle y la arritmia cesa. En el flutter el circuito está íntegramente en la aurícula y el nodo solo actúa como vía de paso: al frenarlo se reduce la respuesta ventricular y quedan visibles las ondas de flutter, pero la arritmia continúa.' },
    { nivel: 2, q: '¿Qué es la taquimiocardiopatía y por qué es relevante?', r: 'Disfunción ventricular producida por una taquiarritmia sostenida durante semanas o meses, con dilatación y caída de la fracción de eyección. Es relevante porque es <b>reversible</b> al controlar la frecuencia o restaurar el ritmo: una de las pocas miocardiopatías potencialmente curables.' },
    { nivel: 2, q: 'Distingue Mobitz I de Mobitz II por localización y pronóstico.', r: 'El Mobitz I (alargamiento progresivo del PR hasta una P bloqueada) suele ser suprahisiano, de mecanismo nodal o vagal, con escape estrecho y buen pronóstico. El Mobitz II (bloqueo súbito sin alargamiento previo) suele ser infrahisiano, con escape ancho, lento e inestable, y riesgo de progresión a bloqueo completo: indicación de marcapasos.' },
    { nivel: 3, q: 'Paciente joven con taquicardia irregular, de QRS ancho y morfología variable, a 240 lpm. ¿Qué sospechas y qué NO administras?', r: 'Fibrilación auricular preexcitada sobre una vía accesoria (WPW). No deben administrarse fármacos que bloqueen el nodo AV —adenosina, verapamilo, diltiazem, betabloqueantes ni digoxina—, porque al cerrar la vía filtrada dirigen toda la actividad auricular por la vía accesoria, que carece de conducción decremental, y pueden precipitar fibrilación ventricular. El tratamiento es procainamida o, si hay inestabilidad, cardioversión eléctrica sincronizada; a largo plazo, ablación.' },
    { nivel: 3, q: 'Paciente con QT largo que desarrolla taquicardia ventricular polimórfica. Explica el mecanismo y el tratamiento, y por qué acelerar la frecuencia ayuda.', r: 'Es una torsade de pointes por actividad desencadenada: la prolongación de la repolarización permite la reactivación de canales de calcio tipo L en fase 3, generando pospotenciales precoces, sobre un sustrato de dispersión transmural de la repolarización que facilita la reentrada funcional. El tratamiento incluye magnesio intravenoso, corrección de potasio y magnesio, retirada de todos los fármacos que prolonguen el QT y, si es refractaria, cardioversión. Acelerar la frecuencia —con isoproterenol o estimulación con marcapasos— ayuda porque la duración del potencial de acción y el QT se <b>acortan</b> al aumentar la frecuencia, lo que reduce tanto la ventana para los pospotenciales como la dispersión de la repolarización. Es un ejemplo elegante de tratamiento deducido directamente de la electrofisiología.' }
  ],

  caso: {
    vineta: 'Varón de 58 años con palpitaciones de 3 horas. PA 128/76, consciente, sin dolor torácico. ECG: taquicardia irregularmente irregular a 140 lpm, QRS estrecho, sin ondas P identificables. Antecedentes: hipertensión, IMC 33, ronca por las noches.',
    pasos: [
      { q: '¿Qué arritmia y qué te dice la irregularidad?', pista: 'Irregularmente irregular sin ondas P.', r: 'Fibrilación auricular con respuesta ventricular rápida. La irregularidad irregular refleja la conducción variable a través del nodo AV de una actividad auricular caótica; la ausencia de ondas P organizadas confirma que la aurícula no se despolariza de forma coordinada.' },
      { q: 'Está estable. ¿Cuál es la primera decisión y por qué no es cardiovertir de inmediato?', pista: 'Estabilidad y riesgo embólico.', r: 'Al estar estable hay tiempo para razonar. Cardiovertir sin más plantea un riesgo embólico si la FA lleva más de 48 horas o es de duración incierta, ya que puede existir trombo en la orejuela y la recuperación de la contracción auricular lo desplazaría. Con 3 horas de evolución bien documentadas la ventana es favorable, pero la duración debe confirmarse; en caso de duda se anticoagula y se valora ecocardiografía transesofágica.' },
      { q: '¿Cómo decides sobre la anticoagulación a largo plazo?', pista: 'Depende del riesgo, no del ritmo.', r: 'Por el riesgo embólico estimado con CHA₂DS₂-VASc, independientemente de que se opte por control de ritmo o de frecuencia y del patrón paroxístico o permanente. Este paciente ya suma puntos por hipertensión, y hay que considerar edad, diabetes, insuficiencia cardíaca, ictus previo y enfermedad vascular.' },
      { q: 'Sus ronquidos y su obesidad, ¿tienen algo que ver?', pista: 'Sustrato auricular.', r: 'Mucho. La apnea obstructiva del sueño produce hipoxemia intermitente, oscilaciones bruscas de la presión intratorácica que distienden la aurícula y descargas simpáticas nocturnas; junto a la obesidad y la hipertensión genera dilatación y fibrosis auricular, el sustrato de la reentrada. Sin tratar estos factores, la recurrencia tras cardioversión o ablación es muy alta: el control del sustrato forma parte del tratamiento de la arritmia.' },
      { q: 'Si su FE resultara del 35 %, ¿qué considerarías?', pista: 'Causa o consecuencia.', r: 'Habría que plantearse si la disfunción ventricular es la causa de la FA o su consecuencia. Una respuesta ventricular rápida mantenida durante semanas puede producir <b>taquimiocardiopatía</b>, reversible al controlar la frecuencia o restaurar el ritmo sinusal. Es una de las pocas miocardiopatías curables y justifica una estrategia de control del ritmo más agresiva en pacientes con insuficiencia cardíaca.' }
    ],
    cierre: 'La fibrilación auricular resume el enfoque del curso: el mecanismo (reentrada sobre una aurícula remodelada) explica el sustrato, el sustrato explica las causas tratables, y la hemodinámica —pérdida de la patada auricular y diástole corta— explica los síntomas.'
  },

  tarjetas: [
    { f: 'Primera decisión ante cualquier taquiarritmia', d: 'ESTABILIDAD, no diagnóstico. Inestable (hipotensión con hipoperfusión, conciencia alterada, isquemia, IC aguda) → cardioversión eléctrica sincronizada inmediata.' },
    { f: 'Taquicardia regular de QRS ancho: regla de seguridad', d: 'Se asume VENTRICULAR hasta que se demuestre lo contrario (≈90 % si hay infarto previo o cardiopatía estructural). Nunca verapamilo: puede causar colapso. Procainamida o cardioversión.' },
    { f: 'Reentrada vs automatismo: cómo distinguirlos', d: 'Reentrada: inicio y fin BRUSCOS, responde a cardioversión y maniobras vagales. Automatismo: calentamiento y enfriamiento progresivos, NO se corta con electricidad (no hay circuito que interrumpir).' },
    { f: '¿Por qué la adenosina corta una reentrada nodal y no un flutter?', d: 'En la reentrada nodal el nodo AV es PARTE del circuito: bloquearlo lo interrumpe. En el flutter el circuito es auricular y el nodo solo es vía de paso: se enlentece la respuesta y se desenmascaran las ondas de flutter.' },
    { f: 'FA + WPW: por qué están contraindicados los bloqueantes del nodo AV', d: 'El nodo AV actúa como FILTRO de frecuencia. Al bloquearlo, toda la actividad auricular pasa por la vía accesoria (sin conducción decremental) → frecuencias extremas → fibrilación ventricular. Usar procainamida o cardioversión.' },
    { f: 'Taquimiocardiopatía', d: 'Disfunción ventricular por taquiarritmia sostenida durante semanas-meses. REVERSIBLE al controlar la frecuencia o restaurar el ritmo: una de las pocas miocardiopatías curables.' },
    { f: 'Mobitz I vs Mobitz II', d: 'Mobitz I: PR se alarga progresivamente, suprahisiano, escape estrecho, buen pronóstico. Mobitz II: bloqueo SÚBITO sin alargamiento, infrahisiano, escape ancho e inestable → marcapasos.' },
    { f: '¿Por qué acelerar la frecuencia trata la torsade de pointes?', d: 'Porque la duración del potencial de acción y el QT se ACORTAN al aumentar la frecuencia, reduciendo la ventana para los pospotenciales precoces y la dispersión de la repolarización. Junto a magnesio y corrección de electrolitos.' }
  ]
}

]);

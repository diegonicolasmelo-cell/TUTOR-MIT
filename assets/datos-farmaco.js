/* ============================================================
   ÁREA — FARMACOLOGÍA DEL PACIENTE CRÍTICO
   Farmacocinética alterada, vasoactivos y sedoanalgesia
   ============================================================ */

TUTOR.registrarTemas([

/* ---------------------------------------------------------- */
{
  id: 'farmacocinetica-critico',
  modulo: 'farmaco-critico',
  nombre: 'Farmacocinética en el paciente crítico',
  alto: false,
  minutos: 18,
  requisitos: [],
  ideaCentral: 'Las dosis habituales se calcularon en voluntarios sanos, y prácticamente todos los supuestos de esos estudios se rompen en el paciente crítico: el volumen de distribución se expande, la unión a proteínas cae, el flujo hepático y renal cambia y la eliminación puede estar aumentada o abolida. Razonar sobre volumen de distribución y aclaramiento permite anticipar qué dosis será insuficiente y cuál será tóxica.',

  anclaje: {
    q: 'Sin mirar: ¿por qué la dosis de carga de un antibiótico no debe reducirse en la insuficiencia renal, pero la dosis de mantenimiento sí?',
    pista: 'Cada dosis depende de un parámetro distinto: una del volumen y otra del aclaramiento.'
  },

  bloques: [
    {
      nivel: 'imprescindible',
      titulo: 'Los dos parámetros que gobiernan todo',
      html: '<p>Solo hay dos parámetros farmacocinéticos primarios, y cada uno decide una cosa distinta:</p>' +
        '<table><tr><th></th><th>Volumen de distribución (Vd)</th><th>Aclaramiento (Cl)</th></tr>' +
        '<tr><td>Qué es</td><td>Volumen teórico en el que se distribuye el fármaco</td><td>Volumen de plasma depurado por unidad de tiempo</td></tr>' +
        '<tr><td>Determina</td><td>La <b>dosis de carga</b> (Vd × concentración objetivo)</td><td>La <b>dosis de mantenimiento</b> (Cl × concentración objetivo)</td></tr>' +
        '<tr><td>Depende de</td><td>Liposolubilidad, unión a proteínas y a tejidos, agua corporal</td><td>Función renal y hepática, flujo sanguíneo del órgano</td></tr></table>' +
        '<p>Y la vida media deriva de ambos: <code>t½ ≈ 0,693 × Vd / Cl</code>. Esto explica algo contraintuitivo: un fármaco puede tener una vida media larga no porque se elimine mal, sino porque se distribuye mucho.</p>' +
        '<p>🔥 Respuesta al anclaje: la <b>dosis de carga depende del volumen de distribución</b>, que la insuficiencia renal no reduce —al contrario, suele aumentarlo por sobrecarga hídrica—. Reducirla produce concentraciones subterapéuticas justo cuando más importa. La <b>dosis de mantenimiento depende del aclaramiento</b>, que sí está reducido, y por tanto debe ajustarse. Infradosificar la carga de un antibiótico en un paciente séptico con fracaso renal es un error frecuente y con consecuencias.</p>',
      cadena: ['Dosis de carga', '← Volumen de distribución', 'Dosis de mantenimiento', '← Aclaramiento', 'Vida media ← ambos']
    },
    {
      nivel: 'imprescindible',
      titulo: 'Qué se rompe en el paciente crítico',
      html: '<table><tr><th>Cambio</th><th>Consecuencia</th><th>Ejemplo</th></tr>' +
        '<tr><td><b>Expansión del volumen extracelular</b> (fuga capilar, fluidoterapia)</td><td>↑ Vd de fármacos <b>hidrofílicos</b> → concentraciones bajas</td><td>Betalactámicos, aminoglucósidos, vancomicina</td></tr>' +
        '<tr><td><b>Hipoalbuminemia</b></td><td>↑ fracción libre de fármacos muy unidos a proteínas</td><td>Fenitoína, ceftriaxona, warfarina</td></tr>' +
        '<tr><td><b>Aclaramiento renal aumentado</b> (sepsis hiperdinámica, jóvenes, quemados)</td><td>↓ concentraciones pese a dosis correctas</td><td>Betalactámicos: fallo terapéutico</td></tr>' +
        '<tr><td><b>Fracaso renal o hepático</b></td><td>↓ aclaramiento → acumulación</td><td>Morfina, midazolam, aminoglucósidos</td></tr>' +
        '<tr><td><b>Hipoperfusión esplácnica</b></td><td>Absorción enteral errática</td><td>Vía oral poco fiable en shock</td></tr></table>' +
        '<p>El <b>aclaramiento renal aumentado</b> merece atención porque va contra la intuición: un paciente séptico joven, hiperdinámico y con creatinina «normal» puede estar eliminando betalactámicos tan rápido que las concentraciones caen por debajo de la concentración mínima inhibitoria durante buena parte del intervalo. Es una causa reconocida de fracaso terapéutico con dosis aparentemente correctas.</p>' +
        '<p>Sobre la <b>hipoalbuminemia</b>: lo que ejerce efecto es la <b>fracción libre</b>. Una fenitoína total «baja» en un paciente con albúmina de 2 g/dL puede corresponder a una fracción libre terapéutica o incluso tóxica; interpretar la cifra total sin corregir lleva a subir la dosis de un paciente que ya está en rango.</p>'
    },
    {
      nivel: 'importante',
      titulo: 'Principios PK/PD de los antimicrobianos',
      html: '<p>Los antibióticos se agrupan según de qué dependa su eficacia, y de ahí se deduce cómo administrarlos:</p>' +
        '<ul><li><b>Dependientes del tiempo</b> (betalactámicos): lo que importa es el <b>tiempo por encima de la concentración mínima inhibitoria</b>. Por eso se benefician de intervalos más cortos o de <b>infusión extendida o continua</b>, no de dosis mayores puntuales.</li>' +
        '<li><b>Dependientes de la concentración</b> (aminoglucósidos, quinolonas): lo que importa es el <b>pico</b> respecto a la concentración mínima inhibitoria. Por eso los aminoglucósidos se dan en <b>dosis única diaria alta</b>: maximiza el pico —y con él la eficacia y el efecto postantibiótico— y minimiza la toxicidad, que se relaciona con la exposición mantenida del túbulo renal y del oído interno.</li>' +
        '<li><b>Dependientes del área bajo la curva</b> (vancomicina, linezolid): importa la exposición total en 24 horas.</li></ul>' +
        '<p>Esta clasificación es un ejemplo excelente de cómo un principio farmacológico determina directamente una pauta que de otro modo habría que memorizar.</p>'
    },
    {
      nivel: 'complementario',
      titulo: 'Contexto sensible y acumulación en la sedación',
      html: '<p>La <b>vida media contexto-sensible</b> es el concepto que explica por qué un paciente tarda días en despertar tras una sedación prolongada. No es la vida media de eliminación clásica, sino el tiempo que tarda la concentración plasmática en reducirse a la mitad <b>tras detener una infusión</b>, y depende de cuánto tiempo se haya infundido.</p>' +
        '<p>El motivo es la redistribución: durante una infusión prolongada, los fármacos liposolubles saturan los compartimentos periféricos (grasa, músculo). Al detener la infusión, esos depósitos <b>devuelven</b> fármaco al plasma y la concentración cae mucho más lentamente. El midazolam es el ejemplo clásico —su vida media contexto-sensible se dispara tras días de infusión, y sus metabolitos activos se acumulan en la insuficiencia renal—, mientras que el remifentanilo apenas se modifica porque lo hidrolizan esterasas plasmáticas inespecíficas.</p>' +
        '<p>Aplicación práctica: preferir fármacos de vida media contexto-sensible corta, usar interrupciones diarias de la sedación y titular a objetivo con escalas en lugar de infundir de forma fija.</p>'
    }
  ],

  variables: [
    { n: 'Volumen de distribución', d: 'up', nota: 'aumenta con la fuga capilar: dosis de carga mayor' },
    { n: 'Fracción libre del fármaco', d: 'up', nota: 'sube con la hipoalbuminemia' },
    { n: 'Aclaramiento', d: 'down', nota: 'determina la dosis de mantenimiento' },
    { n: 'Vida media contexto-sensible', d: 'up', nota: 'crece con la duración de la infusión' }
  ],

  fisiopatologia: '<p>El paciente crítico atraviesa fases con farmacocinéticas opuestas. En las primeras horas de una sepsis con reanimación agresiva predomina la <b>expansión del volumen de distribución</b> y el aclaramiento aumentado: el riesgo es <b>infradosificar</b>. Días después, si aparece fracaso renal o hepático, predomina la <b>acumulación</b>: el riesgo es la toxicidad. La misma dosis puede ser insuficiente el primer día y tóxica el quinto.</p>' +
    '<p>Las <b>técnicas de depuración extracorpórea</b> añaden otra capa: eliminan fármacos hidrofílicos de bajo peso molecular y poco unidos a proteínas, y su contribución al aclaramiento depende de la modalidad y de la dosis de tratamiento. Ajustar antibióticos en un paciente en hemofiltración sin tener esto en cuenta produce fracasos terapéuticos.</p>',

  clinica: '<p>Reglas prácticas para Diego: no reducir nunca la dosis de <b>carga</b> por insuficiencia renal; monitorizar concentraciones cuando esté disponible (aminoglucósidos, vancomicina, fenitoína, digoxina); interpretar la fenitoína corrigiendo por albúmina; y en la sepsis grave, considerar infusión extendida de betalactámicos.</p>' +
    '<p>Y una observación transversal: en el paciente crítico, la vía oral no es fiable por hipoperfusión esplácnica, edema de la mucosa e interacciones con la nutrición enteral, de modo que la vía intravenosa es la norma mientras dure la inestabilidad.</p>',

  error: {
    confunde: 'Reducir la dosis de carga en el paciente con insuficiencia renal.',
    parecido: 'La lógica «el riñón no funciona, hay que dar menos» es correcta para el mantenimiento y se generaliza sin pensar.',
    diferencia: 'La dosis de <b>carga</b> depende del <b>volumen de distribución</b>, no del aclaramiento. La insuficiencia renal no reduce ese volumen; el paciente crítico suele tenerlo <b>aumentado</b> por sobrecarga hídrica y fuga capilar. Reducir la carga retrasa la llegada a concentraciones terapéuticas justo en las primeras horas, que es cuando el antibiótico determina el pronóstico en la sepsis.',
    ejemplo: 'Paciente séptico con creatinina de 4 al que se le administra media dosis de carga de un betalactámico «por el riñón»: tardará varias vidas medias en alcanzar concentraciones eficaces, y en shock séptico cada hora de retraso cuenta.',
    regla: 'Carga por <b>volumen</b>, mantenimiento por <b>aclaramiento</b>. El riñón afecta al segundo, no al primero.'
  },

  perla: '🔥 Dosis de carga ← volumen de distribución. Dosis de mantenimiento ← aclaramiento. En el crítico el volumen está expandido (dar carga completa o mayor) y el aclaramiento puede estar aumentado o abolido según la fase. Y en los betalactámicos importa el <b>tiempo</b> por encima de la CMI, no el pico: por eso la infusión extendida.',

  feynman: {
    consigna: 'Explica por qué un paciente séptico joven con función renal aparentemente normal puede fracasar con dosis estándar de un betalactámico.',
    puntos: [
      'Explico la expansión del volumen de distribución por fuga capilar y fluidos',
      'Introduzco el aclaramiento renal aumentado de la sepsis hiperdinámica',
      'Explico por qué la creatinina normal no lo descarta',
      'Explico el principio PK/PD del betalactámico (tiempo sobre CMI)',
      'Concluyo con la solución: carga completa e infusión extendida'
    ],
    referencia: '<p>En la sepsis convergen dos fenómenos que empujan las concentraciones plasmáticas hacia abajo, y ambos se dan justo cuando el antibiótico es más determinante.</p>' +
      '<p>El primero es la <b>expansión del volumen de distribución</b>. La inflamación daña el glucocáliz endotelial y aumenta la permeabilidad capilar, de modo que el líquido escapa al intersticio; a eso se suman los litros de cristaloides de la reanimación. Los antibióticos <b>hidrofílicos</b> —betalactámicos, aminoglucósidos, vancomicina— se distribuyen precisamente en ese compartimento extracelular expandido, así que la misma dosis alcanza una concentración menor. Como la dosis de carga se calcula multiplicando el volumen de distribución por la concentración objetivo, un volumen mayor exige una <b>carga mayor</b>, no menor.</p>' +
      '<p>El segundo es el <b>aclaramiento renal aumentado</b>, un fenómeno bien descrito y sistemáticamente pasado por alto. En la fase hiperdinámica de la sepsis el gasto cardíaco está elevado y el flujo renal también, de modo que el filtrado glomerular puede superar ampliamente lo normal. Es más frecuente en pacientes jóvenes, sin comorbilidad, politraumatizados o quemados. La trampa está en que la <b>creatinina plasmática es normal o incluso baja</b> y por tanto tranquiliza: pero eso es exactamente lo que cabe esperar de un riñón que está filtrando de más, y además la creatinina en un paciente con poca masa muscular o con expansión de volumen se diluye. Detectarlo requiere medir el aclaramiento en orina de un periodo corto, no confiar en la cifra plasmática.</p>' +
      '<p>Sobre esto se superpone el principio farmacodinámico. Los betalactámicos son <b>dependientes del tiempo</b>: su eficacia se correlaciona con la fracción del intervalo en que la concentración libre permanece por encima de la concentración mínima inhibitoria, y no con la altura del pico. Un fármaco que se distribuye en un volumen mayor y se elimina más rápido pasa una proporción menor del intervalo por encima de esa concentración, aunque el pico inicial parezca correcto.</p>' +
      '<p>La solución se deduce de los tres elementos anteriores: administrar la <b>dosis de carga completa</b> —o incluso mayor— sin reducirla por la función renal, y después mantener la concentración con <b>infusión extendida o continua</b>, que es la forma de maximizar el tiempo sobre la concentración mínima inhibitoria sin aumentar la exposición total. Cuando esté disponible, la monitorización de concentraciones convierte todo este razonamiento en una medida.</p>'
  },

  preguntas: [
    { nivel: 1, q: '¿Qué parámetro determina la dosis de carga y cuál la de mantenimiento?', r: 'La dosis de carga depende del volumen de distribución (Vd × concentración objetivo); la de mantenimiento depende del aclaramiento (Cl × concentración objetivo).' },
    { nivel: 1, q: '¿Cómo se relaciona la vida media con esos dos parámetros?', r: 't½ ≈ 0,693 × Vd/Cl. Un fármaco puede tener vida media larga por distribuirse mucho, no solo por eliminarse mal.' },
    { nivel: 1, q: 'Clasifica los antibióticos según su parámetro PK/PD.', r: 'Dependientes del tiempo (betalactámicos: tiempo sobre CMI), dependientes de la concentración (aminoglucósidos y quinolonas: pico/CMI) y dependientes del área bajo la curva (vancomicina, linezolid).' },
    { nivel: 2, q: '¿Por qué los aminoglucósidos se administran en dosis única diaria alta?', r: 'Porque su eficacia depende del pico respecto a la CMI y presentan efecto postantibiótico prolongado, mientras que su toxicidad renal y ótica se relaciona con la exposición mantenida. Una dosis única alta maximiza la eficacia y minimiza el tiempo de exposición tisular.' },
    { nivel: 2, q: 'Un paciente con albúmina de 2 g/dL tiene fenitoína total baja. ¿Subes la dosis?', r: 'No sin corregir. Lo que ejerce efecto es la fracción libre, y con hipoalbuminemia esa fracción está aumentada: una concentración total baja puede corresponder a una fracción libre terapéutica o incluso tóxica. Hay que corregir por albúmina o, mejor, medir la fracción libre.' },
    { nivel: 2, q: '¿Qué es la vida media contexto-sensible y por qué importa en la sedación?', r: 'El tiempo que tarda la concentración en reducirse a la mitad tras detener una infusión, y depende de su duración, porque los depósitos periféricos saturados devuelven fármaco al plasma. Explica que el midazolam tarde días en desaparecer tras infusión prolongada y que el remifentanilo no lo haga.' },
    { nivel: 3, q: 'Paciente quemado de 28 años, séptico, con creatinina de 0,5 mg/dL, que no mejora con dosis estándar de piperacilina-tazobactam. ¿Qué sospechas y cómo lo corriges?', r: 'Aclaramiento renal aumentado junto con expansión del volumen de distribución. La creatinina baja no descarta el problema: la sugiere, porque refleja un filtrado supranormal en un paciente joven, hiperdinámico y con poca masa muscular. Los betalactámicos son dependientes del tiempo, de modo que la concentración cae por debajo de la CMI durante buena parte del intervalo. La corrección consiste en administrar la dosis de carga completa y pasar a <b>infusión extendida o continua</b>, aumentar la dosis diaria si es preciso y, si está disponible, monitorizar concentraciones y medir el aclaramiento real en orina.' },
    { nivel: 3, q: 'Paciente sedado con midazolam en infusión durante 8 días con fracaso renal. Al suspenderlo no despierta en 72 horas. Explícalo.', r: 'Convergen tres mecanismos. Primero, la <b>vida media contexto-sensible</b>: tras ocho días de infusión, los compartimentos periféricos están saturados y devuelven fármaco al plasma lentamente. Segundo, la acumulación del metabolito activo <b>alfa-hidroximidazolam glucurónido</b>, de eliminación renal, que en el fracaso renal se acumula y prolonga la sedación durante días. Tercero, factores del propio paciente: hipoalbuminemia que aumenta la fracción libre, disfunción hepática y posible delirium o encefalopatía asociados. Se previene con interrupciones diarias de la sedación, titulación a objetivo con escalas y preferencia por fármacos de vida media contexto-sensible corta.' }
  ],

  caso: {
    vineta: 'Varón de 34 años, previamente sano, ingresa en shock séptico por neumonía. Recibe 4 litros de cristaloides en 6 horas. Peso 80 kg. Creatinina 0,6 mg/dL. Se inicia meropenem a dosis estándar en bolos de 30 minutos. A las 48 horas persiste febril y con marcadores en ascenso.',
    pasos: [
      { q: '¿Qué le ha ocurrido a su volumen de distribución y por qué?', pista: 'Fuga capilar más fluidos.', r: 'Está expandido. La inflamación daña el glucocáliz y aumenta la permeabilidad capilar, y a eso se suman 4 litros de cristaloides. El meropenem es hidrofílico y se distribuye en ese compartimento extracelular aumentado, de modo que la misma dosis alcanza concentraciones menores.' },
      { q: 'Su creatinina es 0,6. ¿Eso lo tranquiliza?', pista: 'Podría ser lo contrario.', r: 'No, y de hecho debería alertar. En un varón joven, hiperdinámico y con volumen expandido, una creatinina de 0,6 sugiere <b>aclaramiento renal aumentado</b>: está filtrando por encima de lo normal y eliminando el antibiótico más rápido. La creatinina plasmática es un mal detector de esta situación.' },
      { q: '¿Qué principio PK/PD rige el meropenem y qué implica?', pista: 'Tiempo o pico.', r: 'Es un betalactámico: <b>dependiente del tiempo</b>. Su eficacia se correlaciona con la fracción del intervalo en que la concentración libre supera la concentración mínima inhibitoria, no con la altura del pico. Administrarlo en bolos cortos produce picos altos y valles bajos, precisamente el perfil menos favorable.' },
      { q: '¿Cómo reformulas la pauta?', pista: 'Carga y forma de administración.', r: 'Administrar una dosis de carga completa y pasar a <b>infusión extendida</b> (por ejemplo, en 3 horas) o continua, que maximiza el tiempo sobre la CMI sin aumentar necesariamente la dosis total. Considerar además aumentar la dosis diaria dada la situación de aclaramiento aumentado, y monitorizar concentraciones si se dispone de ello.' },
      { q: 'A los 6 días desarrolla fracaso renal oligúrico. ¿Qué cambia?', pista: 'La fase se invierte.', r: 'Todo se invierte: el aclaramiento cae y el riesgo pasa de infradosificar a <b>acumular</b>. Hay que reducir la dosis de mantenimiento —no la de carga si hubiera que recargar—, revisar todos los fármacos de eliminación renal, y si entra en depuración extracorpórea, ajustar según la modalidad, porque estas técnicas eliminan activamente fármacos hidrofílicos poco unidos a proteínas.' },
      { q: 'Resume la lección farmacocinética del caso.', pista: 'El paciente cambia; la dosis debe cambiar con él.', r: 'La misma dosis puede ser insuficiente el primer día y tóxica el sexto, porque el volumen de distribución y el aclaramiento se mueven en direcciones opuestas a lo largo del ingreso. Razonar con los dos parámetros primarios —volumen para la carga, aclaramiento para el mantenimiento— y conocer el principio PK/PD del fármaco permite anticiparlo en lugar de reaccionar tarde.' }
    ],
    cierre: 'La farmacocinética del crítico no es una tabla de ajustes: es un razonamiento sobre dos parámetros que cambian a diario en el mismo paciente.'
  },

  tarjetas: [
    { f: 'Dosis de carga vs mantenimiento: de qué depende cada una', d: 'CARGA = Vd × concentración objetivo (depende del VOLUMEN). MANTENIMIENTO = Cl × concentración objetivo (depende del ACLARAMIENTO). La insuficiencia renal afecta al mantenimiento, NO a la carga.' },
    { f: 'Vida media en función de Vd y Cl', d: 't½ ≈ 0,693 × Vd/Cl. Una vida media larga puede deberse a gran distribución, no solo a mala eliminación.' },
    { f: 'Clasificación PK/PD de los antibióticos', d: 'TIEMPO sobre CMI: betalactámicos → infusión extendida/continua. CONCENTRACIÓN (pico/CMI): aminoglucósidos y quinolonas → dosis única diaria alta. ÁREA BAJO LA CURVA: vancomicina, linezolid.' },
    { f: '¿Por qué los aminoglucósidos se dan una vez al día?', d: 'Su eficacia depende del PICO y tienen efecto postantibiótico prolongado; su toxicidad renal y ótica depende de la EXPOSICIÓN MANTENIDA. Dosis única alta maximiza eficacia y minimiza toxicidad.' },
    { f: 'Aclaramiento renal aumentado', d: 'Sepsis hiperdinámica, jóvenes, politraumatizados, quemados: filtrado supranormal con creatinina NORMAL O BAJA (que engaña). Causa de fracaso terapéutico con dosis estándar de betalactámicos.' },
    { f: 'Hipoalbuminemia y fármacos muy unidos a proteínas', d: 'Aumenta la FRACCIÓN LIBRE, que es la activa. Una fenitoína total "baja" puede ser terapéutica o tóxica: corregir por albúmina o medir la fracción libre antes de subir la dosis.' },
    { f: 'Vida media contexto-sensible', d: 'Tiempo en que la concentración cae a la mitad TRAS DETENER una infusión; crece con la duración porque los depósitos periféricos devuelven fármaco. Midazolam: se dispara. Remifentanilo: no cambia (esterasas plasmáticas).' },
    { f: 'Las dos fases del crítico', d: 'FASE INICIAL: Vd expandido + aclaramiento aumentado → riesgo de INFRADOSIFICAR. FASE TARDÍA: fracaso renal/hepático → riesgo de ACUMULAR. La misma dosis puede ser insuficiente el día 1 y tóxica el día 5.' }
  ]
},

/* ---------------------------------------------------------- */
{
  id: 'vasoactivos',
  modulo: 'farmaco-critico',
  nombre: 'Vasoactivos e inotrópicos: elegir por receptor',
  alto: true,
  minutos: 22,
  requisitos: ['gasto-cardiaco', 'shock'],
  ideaCentral: 'Cada vasoactivo es una combinación concreta de efectos sobre receptores α₁, β₁ y β₂, y su elección debe deducirse del problema hemodinámico del paciente: si falta resistencia, si falta bomba o si faltan ambas. Memorizar fármacos sin el mapa de receptores lleva a elegir por costumbre; conocerlo permite predecir el efecto y también el efecto adverso.',

  anclaje: {
    q: 'Sin mirar: en un shock séptico con gasto alto y resistencia baja, ¿qué receptor quieres estimular y cuál evitar? ¿Y en un shock cardiogénico con resistencia ya alta?',
    pista: 'Piensa primero en qué variable de PA = GC × RVS está fallando en cada uno.'
  },

  bloques: [
    {
      nivel: 'imprescindible',
      titulo: 'El mapa de receptores',
      html: '<table><tr><th>Receptor</th><th>Localización</th><th>Efecto</th></tr>' +
        '<tr><td><b>α₁</b></td><td>Músculo liso vascular (arterial y venoso)</td><td>Vasoconstricción → ↑RVS; venoconstricción → ↑retorno venoso</td></tr>' +
        '<tr><td><b>β₁</b></td><td>Corazón</td><td>↑ Contractilidad, ↑ frecuencia, ↑ conducción</td></tr>' +
        '<tr><td><b>β₂</b></td><td>Músculo liso vascular y bronquial</td><td>Vasodilatación (músculo esquelético) y broncodilatación</td></tr>' +
        '<tr><td><b>V₁</b></td><td>Músculo liso vascular</td><td>Vasoconstricción independiente de receptores adrenérgicos</td></tr>' +
        '<tr><td><b>Dopaminérgicos</b></td><td>Renal, esplácnico</td><td>Vasodilatación (sin beneficio clínico demostrado)</td></tr></table>' +
        '<p>Con este mapa, cada fármaco se describe como una combinación:</p>' +
        '<table><tr><th>Fármaco</th><th>Perfil</th><th>Indicación principal</th></tr>' +
        '<tr><td><b>Noradrenalina</b></td><td>α₁ +++, β₁ +</td><td>Primera línea en shock séptico y en la mayoría de los shocks con resistencia baja</td></tr>' +
        '<tr><td><b>Adrenalina</b></td><td>α₁ +++, β₁ +++, β₂ ++</td><td>Anafilaxia, parada cardíaca, shock refractario</td></tr>' +
        '<tr><td><b>Dobutamina</b></td><td>β₁ +++, β₂ +</td><td>Fallo de bomba: inotropía con ligera vasodilatación</td></tr>' +
        '<tr><td><b>Vasopresina</b></td><td>V₁</td><td>Coadyuvante en shock séptico: ahorra catecolaminas</td></tr>' +
        '<tr><td><b>Fenilefrina</b></td><td>α₁ puro</td><td>Cuando se quiere resistencia sin efecto cronotrópico</td></tr>' +
        '<tr><td><b>Milrinona</b></td><td>Inhibidor de la fosfodiesterasa 3</td><td>Inotropía independiente del receptor β; vasodilata</td></tr></table>'
    },
    {
      nivel: 'imprescindible',
      titulo: 'Elegir desde el problema, no desde el fármaco',
      html: '<p>El algoritmo es el mismo que el de los cuatro determinantes:</p>' +
        '<ol><li><b>¿Falta volumen?</b> → fluidos guiados por respuesta. Ningún vasoactivo sustituye a la precarga que falta.</li>' +
        '<li><b>¿Falta resistencia?</b> (shock distributivo: extremidades calientes, diastólica muy baja) → <b>noradrenalina</b>. Su componente α₁ restaura la RVS y, por venoconstricción, aumenta también la presión sistémica media de llenado y el retorno venoso.</li>' +
        '<li><b>¿Falta bomba?</b> (extremidades frías, congestión, ecografía con mala contractilidad) → <b>inotrópico</b>: dobutamina o milrinona.</li>' +
        '<li><b>¿Faltan ambas?</b> → combinar noradrenalina con inotrópico, que es la situación habitual del shock séptico con miocardiopatía asociada.</li></ol>' +
        '<p>🔥 Punto que ordena la práctica: la <b>noradrenalina no es solo un vasopresor</b>. Al venoconstreñir recluta volumen no estresado hacia el compartimento estresado, eleva la presión sistémica media de llenado y mejora el retorno venoso. Por eso iniciarla precozmente en el shock séptico mejora el gasto además de la presión, y evita administrar litros innecesarios de cristaloides.</p>',
      cadena: ['¿Volumen?', '¿Resistencia?', '¿Bomba?', 'Receptor a estimular', 'Fármaco', 'Reevaluar']
    },
    {
      nivel: 'importante',
      titulo: 'Efectos adversos deducibles del receptor',
      html: '<p>Cada efecto adverso se predice desde el mismo mapa, lo que evita memorizar listas:</p>' +
        '<ul><li><b>α₁ excesivo</b>: isquemia distal (dedos, mesentérica), aumento de poscarga que puede reducir el gasto en un ventrículo comprometido, y necrosis cutánea si hay extravasación —que se trata con fentolamina local—.</li>' +
        '<li><b>β₁ excesivo</b>: taquicardia, arritmias, aumento del consumo miocárdico de oxígeno e isquemia.</li>' +
        '<li><b>β₂</b>: vasodilatación que puede bajar la diastólica, hipopotasemia por desplazamiento intracelular y aumento del lactato por glucólisis aeróbica.</li></ul>' +
        '<p>Ese último punto merece énfasis: la adrenalina eleva el lactato por un mecanismo <b>metabólico</b>, no necesariamente por hipoperfusión. Interpretar ese ascenso como fracaso de la reanimación y aumentar el soporte es un error frecuente.</p>' +
        '<p>Sobre la <b>dopamina</b>: se asocia a más arritmias que la noradrenalina en el shock, y la llamada «dosis renal» no mejora la función renal ni la supervivencia. No es la primera elección.</p>'
    },
    {
      nivel: 'complementario',
      titulo: 'Refractariedad y contexto',
      html: '<p>Cuando un paciente no responde a dosis crecientes de vasopresores, antes de seguir subiendo conviene revisar causas corregibles:</p>' +
        '<ul><li><b>Acidosis severa</b>: los protones reducen la respuesta vascular a las catecolaminas.</li>' +
        '<li><b>Hipocalcemia</b>: el calcio iónico es necesario para la contracción del músculo liso y del miocardio.</li>' +
        '<li><b>Insuficiencia suprarrenal relativa</b>: se valora hidrocortisona en el shock séptico con requerimientos altos.</li>' +
        '<li><b>Hipovolemia no corregida</b>, foco no controlado, neumotórax, taponamiento o auto-PEEP: causas mecánicas que ningún fármaco resuelve.</li></ul>' +
        '<p>La <b>vasopresina</b> ocupa aquí un lugar razonado: actúa por receptores V₁, independientes de la vía adrenérgica, y en la sepsis existe un déficit relativo de vasopresina endógena. Añadirla permite reducir la dosis de noradrenalina y aporta un mecanismo distinto cuando el adrenérgico está saturado o desensibilizado.</p>' +
        '<p>Y una advertencia sobre la <b>presión objetivo</b>: perseguir cifras altas de presión arterial media con dosis crecientes de vasopresor no es inocuo. El objetivo habitual de 65 mmHg se individualiza al alza en hipertensos crónicos, pero cada incremento se paga con más vasoconstricción y más consumo miocárdico.</p>'
    }
  ],

  variables: [
    { n: 'Estimulación α₁', d: 'up', nota: '↑RVS y ↑retorno venoso por venoconstricción' },
    { n: 'Estimulación β₁', d: 'up', nota: '↑contractilidad y frecuencia; ↑consumo de O₂' },
    { n: 'Presión sistémica media de llenado', d: 'up', nota: 'la noradrenalina la eleva: mejora el gasto' },
    { n: 'Consumo miocárdico de oxígeno', d: 'up', nota: 'el precio de todo inotrópico' }
  ],

  fisiopatologia: '<p>En el shock séptico prolongado aparece <b>hiporrespuesta vascular a las catecolaminas</b>, por desensibilización y regulación a la baja de receptores adrenérgicos, exceso de óxido nítrico, apertura de canales de potasio sensibles a ATP y acidosis. Ese es el fundamento fisiológico de combinar mecanismos —adrenérgico con vasopresina, y en casos seleccionados angiotensina II o azul de metileno— en lugar de escalar indefinidamente un solo receptor.</p>' +
    '<p>En el shock cardiogénico el problema es opuesto: la resistencia ya está elevada por compensación, de modo que añadir un vasoconstrictor puro aumenta la poscarga de un ventrículo que no puede vencerla. Ahí la lógica es <b>inotropía y reducción de carga</b>, manteniendo la presión mínima necesaria para perfundir las coronarias.</p>',

  clinica: '<p>Aspectos prácticos: los vasopresores deben administrarse preferentemente por vía central por riesgo de extravasación y necrosis, aunque en la urgencia se acepta iniciarlos por vía periférica de buen calibre mientras se canaliza. La monitorización invasiva de presión arterial es útil porque la medida no invasiva pierde fiabilidad con vasoconstricción intensa.</p>' +
    '<p>Y la regla que conecta con todo el curso: <b>reevaluar</b>. Un vasoactivo no es un tratamiento, es un soporte mientras se corrige la causa. Si la dosis sube en lugar de bajar, la pregunta correcta no es «cuánto más pongo» sino «qué me estoy dejando».</p>',

  error: {
    confunde: 'Usar un vasopresor puro cuando el problema es la bomba, o un inotrópico cuando el problema es la resistencia.',
    parecido: 'Ambos suben la presión arterial a corto plazo y en el monitor el resultado inmediato puede parecer similar.',
    diferencia: 'La presión es el producto del gasto por la resistencia, y cada fármaco actúa sobre un factor distinto. En un shock cardiogénico, un vasoconstrictor puro <b>aumenta la poscarga</b> de un ventrículo que ya no puede vencerla y puede reducir el gasto pese a mejorar la cifra de presión. En un shock distributivo, un inotrópico aislado aumenta un gasto que ya era alto sin corregir la resistencia, que es lo que falla.',
    ejemplo: 'Paciente con infarto extenso, frío y congestivo, al que se le sube la noradrenalina hasta normalizar la presión: la cifra mejora mientras el volumen sistólico y la perfusión empeoran. Necesitaba inotropía y reducción de carga, con la presión mínima suficiente para perfundir las coronarias.',
    regla: 'Antes de elegir el fármaco, decide qué variable falla: volumen, bomba o resistencia. El fármaco es la consecuencia de esa respuesta, no el punto de partida.'
  },

  perla: '🔥 α₁ = resistencia y retorno venoso. β₁ = bomba. Elige por el problema: falta resistencia → noradrenalina; falta bomba → dobutamina o milrinona; faltan ambas → combinar. Y recuerda que la noradrenalina mejora también el gasto por venoconstricción, no solo la presión.',

  feynman: {
    consigna: 'Explica por qué la noradrenalina es de primera línea en el shock séptico y por qué mejora el gasto cardíaco además de la presión arterial.',
    puntos: [
      'Identifico el problema hemodinámico del shock séptico (RVS baja)',
      'Explico el efecto α₁ arterial sobre la resistencia',
      'Explico el efecto α₁ venoso sobre el volumen estresado y la Psm',
      'Conecto Psm con el gradiente de retorno venoso y la precarga',
      'Menciono la ventaja de evitar sobrecarga de fluidos'
    ],
    referencia: '<p>El defecto hemodinámico primario del shock séptico es una <b>caída profunda de la resistencia vascular sistémica</b>, producida por inducción de óxido nítrico sintasa, apertura de canales de potasio sensibles a ATP y déficit relativo de vasopresina. Como la presión arterial media es el producto del gasto cardíaco por la resistencia, y el gasto suele estar elevado, el factor que hay que corregir es claramente la resistencia. La noradrenalina, con un efecto α₁ potente y un componente β₁ modesto, es exactamente la herramienta que corresponde a ese problema.</p>' +
      '<p>El efecto menos conocido y quizá más importante es el <b>venoso</b>. El sistema venoso contiene alrededor del 70 % del volumen sanguíneo, y ese volumen se reparte en dos fracciones: el <b>volumen no estresado</b>, que llena el continente sin generar presión, y el <b>volumen estresado</b>, que distiende la pared y genera la presión sistémica media de llenado. En la sepsis, la venodilatación desplaza volumen desde el compartimento estresado al no estresado: el paciente tiene sangre, pero una parte ha dejado de contribuir a la presión de llenado. Es una hipovolemia funcional sin pérdida de volumen.</p>' +
      '<p>Al estimular receptores α₁ venosos, la noradrenalina <b>venoconstriñe y convierte volumen no estresado en estresado</b>, elevando la presión sistémica media de llenado sin administrar un solo mililitro. Y como el retorno venoso es <code>(Psm − PAD)/resistencia</code>, elevar la Psm amplía el gradiente, aumenta el retorno venoso y con él la precarga y el volumen sistólico. Ese es el motivo por el que la noradrenalina mejora el gasto cardíaco y no solo la presión, algo que resulta contraintuitivo si se piensa en ella únicamente como vasoconstrictor arterial.</p>' +
      '<p>La consecuencia práctica es relevante: <b>iniciarla precozmente</b>, sin esperar a agotar litros de cristaloides, permite alcanzar antes una presión de perfusión adecuada y evita la sobrecarga de fluidos, que en la sepsis es especialmente lesiva por la fuga capilar —edema pulmonar, congestión venosa renal, edema intestinal y de la pared abdominal—. El balance hídrico positivo acumulado se asocia de forma consistente a peor pronóstico.</p>' +
      '<p>Quedan dos matices. Primero, la noradrenalina no sustituye a la volemia: en un paciente realmente hipovolémico hay que reponer, guiándose por pruebas dinámicas de respuesta a fluidos. Segundo, al restaurar la resistencia puede <b>desenmascararse la depresión miocárdica séptica</b> que estaba oculta mientras el ventrículo eyectaba contra una poscarga mínima; si tras normalizar la presión persisten signos de bajo gasto, corresponde evaluar la función ventricular con ecografía y considerar añadir un inotrópico.</p>'
  },

  preguntas: [
    { nivel: 1, q: 'Describe el efecto de estimular receptores α₁, β₁ y β₂.', r: 'α₁: vasoconstricción arterial y venosa (↑RVS y ↑retorno venoso). β₁: aumento de contractilidad, frecuencia y conducción cardíaca. β₂: vasodilatación en músculo esquelético y broncodilatación.' },
    { nivel: 1, q: '¿Cuál es el perfil de receptores de la noradrenalina y de la dobutamina?', r: 'Noradrenalina: α₁ potente con β₁ modesto, de elección cuando falta resistencia. Dobutamina: β₁ potente con algo de β₂, de elección cuando falla la bomba.' },
    { nivel: 1, q: '¿Cuál es el fármaco de primera línea en el shock séptico?', r: 'La noradrenalina, porque el defecto primario es la caída de la resistencia vascular sistémica y su efecto α₁ la corrige, además de mejorar el retorno venoso por venoconstricción.' },
    { nivel: 2, q: 'Explica por qué la noradrenalina aumenta el gasto cardíaco y no solo la presión.', r: 'Porque su efecto α₁ venoso convierte volumen no estresado en estresado, eleva la presión sistémica media de llenado y con ello el gradiente de retorno venoso. Más retorno significa más precarga y más volumen sistólico.' },
    { nivel: 2, q: '¿Por qué la adrenalina eleva el lactato sin que eso implique hipoperfusión?', r: 'Por estimulación β₂, que activa la glucólisis aeróbica y la producción de lactato por mecanismo metabólico. Interpretarlo como fracaso de la reanimación y escalar el soporte es un error frecuente.' },
    { nivel: 2, q: 'Un paciente no responde a dosis crecientes de noradrenalina. ¿Qué revisas antes de seguir subiendo?', r: 'Acidosis severa, hipocalcemia, insuficiencia suprarrenal relativa, hipovolemia no corregida, y causas mecánicas: foco no controlado, neumotórax, taponamiento o auto-PEEP. También cabe añadir vasopresina, que actúa por una vía no adrenérgica.' },
    { nivel: 3, q: 'Paciente con infarto extenso, frío, congestivo e hipotenso. Un compañero sube la noradrenalina hasta normalizar la presión. ¿Qué objetas?', r: 'Que en el shock cardiogénico la resistencia ya está elevada por compensación, y añadir vasoconstricción aumenta la <b>poscarga</b> de un ventrículo cuya curva volumen sistólico/poscarga es muy empinada: la cifra de presión mejora mientras el volumen sistólico y la perfusión tisular empeoran. La estrategia correcta es inotropía y reducción de carga, manteniendo la presión mínima necesaria para perfundir las coronarias, y valorar soporte mecánico. La noradrenalina tiene un papel para sostener la presión de perfusión coronaria, pero no como objetivo aislado de normalizar la cifra.' },
    { nivel: 3, q: 'Tras corregir la presión con noradrenalina en un shock séptico, el paciente sigue con lactato alto y extremidades frías. ¿Qué ha ocurrido y qué haces?', r: 'Probablemente se ha desenmascarado la <b>depresión miocárdica séptica</b>, que estaba enmascarada mientras el ventrículo eyectaba contra una resistencia muy baja. Al restaurar la poscarga, un miocardio deprimido por citoquinas y óxido nítrico no puede vencerla y cae el gasto. La conducta es evaluar la función ventricular con ecografía a pie de cama, confirmar que la volemia está optimizada mediante pruebas dinámicas y considerar añadir un inotrópico como dobutamina, sin olvidar que la medida con mayor impacto sigue siendo el control del foco.' }
  ],

  caso: {
    vineta: 'Mujer de 71 años con shock séptico de origen urinario. Tras 30 mL/kg de cristaloides: PA 78/38, FC 118, extremidades calientes, lactato 4,6, diuresis 10 mL/h. Elevación pasiva de piernas sin aumento del volumen sistólico. Ecografía: ventrículo izquierdo hiperdinámico, vena cava inferior no colapsable.',
    pasos: [
      { q: '¿Qué variable de PA = GC × RVS está fallando?', pista: 'Extremidades calientes y diastólica de 38.', r: 'La resistencia. Las extremidades calientes y una diastólica muy baja, con un ventrículo hiperdinámico, indican gasto conservado o alto con resistencia desplomada: shock distributivo.' },
      { q: 'La elevación de piernas no aumenta el volumen sistólico. ¿Qué significa?', pista: 'Prueba de respuesta a fluidos.', r: 'Que ya no está en la zona empinada de su curva de Starling: no responderá a más volumen. Seguir administrando fluidos solo produciría edema, congestión venosa renal y empeoramiento de la oxigenación, sin ganancia de gasto.' },
      { q: '¿Qué fármaco eliges y por qué exactamente ese?', pista: 'Receptor que corrige el defecto.', r: 'Noradrenalina. Su efecto α₁ restaura la resistencia vascular, que es lo que falta, con un componente β₁ modesto que evita la taquicardia excesiva. Además, su venoconstricción eleva la presión sistémica media de llenado y mejora el retorno venoso sin añadir volumen, lo que es especialmente valioso en una paciente que ya no responde a fluidos.' },
      { q: 'A las 6 horas requiere dosis altas. ¿Qué añadirías y con qué razonamiento?', pista: 'Otro mecanismo, no más del mismo.', r: '<b>Vasopresina</b>, que actúa por receptores V₁ de forma independiente de la vía adrenérgica y corrige el déficit relativo de vasopresina endógena de la sepsis, permitiendo reducir la dosis de noradrenalina. En paralelo se valora hidrocortisona ante requerimientos altos, y se revisan acidosis, calcio iónico, volemia y —sobre todo— si el foco está realmente controlado.' },
      { q: 'Con presión ya en objetivo, sigue con lactato alto y ahora las extremidades están frías. ¿Qué pasó?', pista: 'Se desenmascaró algo.', r: 'Se ha puesto de manifiesto la <b>depresión miocárdica séptica</b>: mientras la resistencia era mínima, el ventrículo eyectaba sin dificultad; al restaurar la poscarga, un miocardio deprimido por citoquinas y óxido nítrico no puede vencerla y cae el gasto. Corresponde reevaluar la función ventricular con ecografía y considerar añadir dobutamina.' },
      { q: '¿Cuál es la intervención que más determina su supervivencia?', pista: 'No es hemodinámica.', r: 'El control del foco y el antimicrobiano adecuado y precoz. Toda la hemodinámica compra tiempo, pero mientras persista la fuente de la respuesta inflamatoria la fisiopatología continúa. En este caso, drenaje de una eventual obstrucción urinaria y antibiótico apropiado con la dosis de carga completa pese al deterioro renal.' }
    ],
    cierre: 'El vasoactivo correcto se deduce del defecto hemodinámico, no de la costumbre. Y cuando la dosis sube en lugar de bajar, la pregunta es qué se está dejando sin tratar.'
  },

  tarjetas: [
    { f: 'Mapa de receptores vasoactivos', d: 'α₁: vasoconstricción arterial Y venosa (↑RVS, ↑retorno venoso). β₁: contractilidad, frecuencia, conducción. β₂: vasodilatación y broncodilatación. V₁: vasoconstricción no adrenérgica.' },
    { f: 'Perfil de los principales vasoactivos', d: 'Noradrenalina: α₁+++ β₁+ (falta resistencia). Adrenalina: α₁+++ β₁+++ β₂++ (anafilaxia, parada). Dobutamina: β₁+++ (falta bomba). Vasopresina: V₁ (ahorra catecolaminas). Fenilefrina: α₁ puro. Milrinona: PDE3, inotropía sin receptor β.' },
    { f: 'Algoritmo de elección del vasoactivo', d: '1) ¿Falta VOLUMEN? → fluidos guiados por respuesta. 2) ¿Falta RESISTENCIA? → noradrenalina. 3) ¿Falta BOMBA? → dobutamina/milrinona. 4) ¿Ambas? → combinar.' },
    { f: '¿Por qué la noradrenalina mejora el GASTO y no solo la presión?', d: 'Su efecto α₁ VENOSO convierte volumen no estresado en estresado → ↑presión sistémica media de llenado → ↑gradiente de retorno venoso → ↑precarga y ↑volumen sistólico. Por eso se inicia precozmente y evita litros de cristaloides.' },
    { f: 'Efectos adversos deducidos del receptor', d: 'α₁ excesivo: isquemia distal y mesentérica, ↑poscarga, necrosis por extravasación (fentolamina). β₁ excesivo: taquiarritmias, ↑MVO₂, isquemia. β₂: hipotensión diastólica, hipopotasemia y ↑LACTATO por glucólisis aeróbica.' },
    { f: '¿Por qué la adrenalina sube el lactato?', d: 'Por estimulación β₂ que activa la glucólisis AERÓBICA: es un efecto metabólico, no necesariamente hipoperfusión. Escalar el soporte por ese ascenso es un error frecuente.' },
    { f: 'Vasopresor refractario: qué revisar antes de subir dosis', d: 'Acidosis severa, hipocalcemia, insuficiencia suprarrenal relativa, hipovolemia no corregida y causas mecánicas (foco no controlado, neumotórax, taponamiento, auto-PEEP). Añadir vasopresina aporta un mecanismo NO adrenérgico.' },
    { f: 'Vasopresor puro en shock cardiogénico: por qué es peligroso', d: 'La RVS ya está alta por compensación; añadir vasoconstricción ↑poscarga en un ventrículo con curva VS/poscarga muy empinada: mejora la CIFRA y empeora el gasto. Estrategia: inotropía y reducción de carga.' }
  ]
},

/* ---------------------------------------------------------- */
{
  id: 'sedoanalgesia',
  modulo: 'farmaco-critico',
  nombre: 'Sedoanalgesia y bloqueo neuromuscular',
  alto: false,
  minutos: 18,
  requisitos: ['farmacocinetica-critico'],
  ideaCentral: 'La sedación no es un objetivo sino una herramienta, y el enfoque moderno invierte el orden clásico: primero analgesia, después la mínima sedación necesaria, y siempre con un objetivo medido. Comprender el perfil hemodinámico y farmacocinético de cada fármaco permite elegir el que menos daño hace en un paciente concreto.',

  anclaje: {
    q: 'Sin mirar: ¿por qué la inducción anestésica puede provocar un colapso hemodinámico en un paciente en shock, y qué tres decisiones lo previenen?',
    pista: 'Piensa qué le hacen los fármacos al tono simpático, al retorno venoso y a la contractilidad.'
  },

  bloques: [
    {
      nivel: 'imprescindible',
      titulo: 'Analgesia primero, sedación después',
      html: '<p>El paradigma actual se resume en tres reglas:</p>' +
        '<ol><li><b>Analgesia primero</b>: buena parte de la agitación del paciente crítico es dolor no tratado. Sedar a un paciente con dolor lo inmoviliza sin aliviarlo.</li>' +
        '<li><b>Sedación mínima y titulada a objetivo</b>, medida con escalas (RASS) en lugar de infundida de forma fija. La sedación profunda mantenida se asocia a más días de ventilación, más delirium y peor pronóstico.</li>' +
        '<li><b>Prevenir y tratar el delirium</b>, evaluándolo sistemáticamente y favoreciendo medidas no farmacológicas: movilización precoz, ciclo de sueño, orientación, retirada de sujeciones y de fármacos deliriógenos.</li></ol>' +
        '<p>Todo ello se articula en paquetes de medidas que combinan interrupción diaria de la sedación, pruebas de respiración espontánea, elección adecuada de fármacos, evaluación del delirium y movilización precoz.</p>'
    },
    {
      nivel: 'imprescindible',
      titulo: 'Perfil comparado de los sedantes',
      html: '<table><tr><th>Fármaco</th><th>Mecanismo</th><th>Hemodinámica</th><th>Ventaja / inconveniente</th></tr>' +
        '<tr><td><b>Propofol</b></td><td>Agonista GABA-A</td><td><b>Hipotensión</b> por vasodilatación y depresión miocárdica</td><td>Despertar rápido / síndrome por infusión de propofol, hipertrigliceridemia</td></tr>' +
        '<tr><td><b>Midazolam</b></td><td>Benzodiacepina (GABA-A)</td><td>Hipotensión moderada</td><td>Estable en dosis única / <b>acumulación</b> y delirium con infusión prolongada</td></tr>' +
        '<tr><td><b>Dexmedetomidina</b></td><td>Agonista α₂ central</td><td><b>Bradicardia</b> e hipotensión</td><td>Sedación cooperativa sin depresión respiratoria / no sirve para sedación profunda</td></tr>' +
        '<tr><td><b>Ketamina</b></td><td>Antagonista NMDA</td><td>Mantiene o <b>aumenta</b> la presión (libera catecolaminas)</td><td>Analgesia y estabilidad / puede deprimir si las catecolaminas están agotadas</td></tr>' +
        '<tr><td><b>Etomidato</b></td><td>GABA-A</td><td>Muy estable</td><td>Inducción en shock / <b>supresión suprarrenal</b> transitoria</td></tr></table>' +
        '<p>🔥 El <b>síndrome por infusión de propofol</b> merece recordarse: dosis altas y prolongadas producen acidosis metabólica, rabdomiólisis, hiperpotasemia, insuficiencia renal, arritmias y colapso, por alteración del metabolismo mitocondrial de ácidos grasos. Se previene limitando dosis y duración y vigilando triglicéridos, creatina-cinasa y equilibrio ácido-base.</p>'
    },
    {
      nivel: 'importante',
      titulo: 'La intubación del paciente en shock',
      html: '<p>Es el momento de mayor riesgo hemodinámico, y el mecanismo se conoce por completo:</p>' +
        '<ul><li>Los <b>fármacos de inducción</b> vasodilatan y deprimen la contractilidad.</li>' +
        '<li>Se <b>retira el tono simpático</b> del que el paciente vivía si estaba en shock compensado.</li>' +
        '<li>La <b>presión positiva</b> reduce el retorno venoso.</li>' +
        '<li>La <b>hipoxemia y la acidosis</b> previas reducen la reserva y la respuesta a catecolaminas.</li></ul>' +
        '<p>La prevención se deduce punto por punto: optimizar la volemia y, si procede, iniciar vasopresor <b>antes</b> de inducir; elegir fármacos hemodinámicamente estables (ketamina o etomidato) a dosis reducidas; preoxigenar adecuadamente considerando oxigenación apneica; ventilar con volúmenes y frecuencias moderadas evitando la hiperventilación con bolsa; y tener preparados fluidos y vasopresor en bolo.</p>' +
        '<p>Recuerda que la dosis de inducción en shock debe <b>reducirse</b>, a menudo a la mitad o menos, porque el gasto cardíaco bajo aumenta la concentración cerebral alcanzada y la reserva hemodinámica es mínima.</p>'
    },
    {
      nivel: 'complementario',
      titulo: 'Bloqueo neuromuscular: cuándo y con qué precauciones',
      html: '<p>El bloqueo neuromuscular <b>no sedante ni analgésico</b>: paraliza a un paciente que puede estar consciente. Por eso la primera regla es garantizar sedación profunda y analgesia antes y durante.</p>' +
        '<p>Indicaciones razonables: facilitar la intubación, SDRA grave en las primeras horas, asincronía refractaria con el ventilador, hipertensión intracraneal refractaria, estatus asmático con presiones inaceptables e hipotermia terapéutica con temblor.</p>' +
        '<p>Precauciones: monitorizar con <b>tren de cuatro</b>, evitar el uso prolongado por su asociación con debilidad adquirida en la UCI —especialmente combinado con corticoides—, proteger la córnea, y recordar las contraindicaciones de la succinilcolina en situaciones de denervación, quemaduras extensas, inmovilización prolongada e hiperpotasemia, donde puede provocar una liberación masiva de potasio.</p>'
    }
  ],

  variables: [
    { n: 'Profundidad de sedación', d: 'down', nota: 'menos es mejor: menos delirium y menos días de ventilación' },
    { n: 'Analgesia', d: 'up', nota: 'primero, y frecuentemente suficiente' },
    { n: 'Tono simpático', d: 'down', nota: 'la inducción lo retira: riesgo de colapso' },
    { n: 'Acumulación del fármaco', d: 'up', nota: 'depende de la vida media contexto-sensible' }
  ],

  fisiopatologia: '<p>El <b>delirium</b> del paciente crítico es una disfunción cerebral aguda multifactorial —inflamación, alteración de neurotransmisores, privación de sueño, fármacos, inmovilidad— y se asocia de forma independiente a mayor mortalidad, estancia prolongada y deterioro cognitivo a largo plazo. Las benzodiacepinas son un factor de riesgo modificable, motivo por el que han dejado de ser la sedación de elección en la mayoría de los pacientes.</p>' +
    '<p>La <b>debilidad adquirida en la UCI</b> —polineuropatía y miopatía del enfermo crítico— se relaciona con inmovilidad, sepsis, hiperglucemia, corticoides y bloqueantes neuromusculares. Su prevención es una de las razones de peso para minimizar la sedación y movilizar precozmente.</p>',

  clinica: '<p>La <b>interrupción diaria de la sedación</b> combinada con pruebas de respiración espontánea acorta los días de ventilación mecánica y de estancia. Requiere criterios de seguridad y no se aplica en pacientes con bloqueo neuromuscular, hipertensión intracraneal activa o inestabilidad grave.</p>' +
    '<p>Y una advertencia práctica sobre la <b>ketamina</b>: aunque suele preservar la presión por liberación de catecolaminas endógenas, en un paciente con reservas agotadas —shock prolongado, catecolaminas máximas— predomina su efecto inotrópico negativo directo y puede producir hipotensión. Su estabilidad no es incondicional.</p>',

  error: {
    confunde: 'Tratar la agitación del paciente crítico aumentando la sedación.',
    parecido: 'La sedación resuelve el síntoma visible de inmediato, y la agitación es percibida como un problema de seguridad que exige respuesta rápida.',
    diferencia: 'La agitación es un <b>síntoma</b>, no un diagnóstico. Sus causas incluyen dolor no tratado, hipoxemia, hipercapnia, hipoglucemia, abstinencia, globo vesical, delirium, asincronía con el ventilador y sepsis. Sedar sin buscar la causa la enmascara, y si la causa era hipoxemia o hipoglucemia, retrasa un tratamiento urgente. Además, profundizar la sedación aumenta el delirium, los días de ventilación y la debilidad adquirida.',
    ejemplo: 'Paciente que se agita bruscamente a las 3 de la madrugada: aumentar el propofol resuelve la escena, pero si estaba desaturando por un neumotórax o un tapón mucoso, se ha perdido la única señal disponible.',
    regla: 'Ante agitación, busca la causa antes de subir la sedación. Y empieza siempre preguntando si hay dolor.'
  },

  perla: '🔥 Analgesia primero, sedación mínima y titulada a objetivo, delirium evaluado y movilización precoz. Y en la intubación del paciente en shock: vasopresor preparado o iniciado, dosis de inducción reducidas, fármacos estables y ventilación suave. El colapso peri-intubación es predecible y por tanto prevenible.',

  feynman: {
    consigna: 'Explica por qué las benzodiacepinas han dejado de ser la sedación de elección en la mayoría de los pacientes críticos.',
    puntos: [
      'Explico la acumulación por vida media contexto-sensible y metabolitos activos',
      'Conecto la sedación profunda prolongada con días de ventilación',
      'Explico su asociación independiente con delirium',
      'Conecto delirium con mortalidad y deterioro cognitivo',
      'Menciono las alternativas y las situaciones en que siguen siendo útiles'
    ],
    referencia: '<p>Las benzodiacepinas fueron durante años la sedación estándar por su estabilidad hemodinámica relativa y su efecto amnésico y anticonvulsivante. Tres problemas las han desplazado.</p>' +
      '<p>El primero es <b>farmacocinético</b>. El midazolam es liposoluble y, durante una infusión prolongada, satura los compartimentos periféricos; al detenerla, esos depósitos devuelven fármaco al plasma y la concentración cae con enorme lentitud. Es el fenómeno de la <b>vida media contexto-sensible</b>, que crece con la duración de la infusión. A eso se añade su metabolito activo, el alfa-hidroximidazolam glucurónido, de eliminación renal, que se acumula en el fracaso renal y prolonga la sedación durante días. El resultado es un paciente que no despierta cuando se decide despertarlo, con más días de ventilación mecánica, más pruebas de imagen innecesarias buscando una causa neurológica y más tiempo de exposición a todas las complicaciones de la UCI.</p>' +
      '<p>El segundo es el <b>delirium</b>. Las benzodiacepinas se han identificado como factor de riesgo independiente y —lo que las hace especialmente relevantes— <b>modificable</b>. El delirium del paciente crítico no es una molestia transitoria: se asocia de forma independiente a mayor mortalidad, estancia más prolongada y deterioro cognitivo a largo plazo que puede persistir meses o años. Que un fármaco elegido por el equipo contribuya a ese desenlace lo convierte en una decisión con peso.</p>' +
      '<p>El tercero es que los ensayos que compararon estrategias de sedación mostraron de forma consistente que la <b>sedación ligera y dirigida a objetivo</b> —con interrupción diaria y evaluación con escalas— reduce los días de ventilación y de estancia frente a la sedación profunda continua. Las benzodiacepinas, por su tendencia a la acumulación, dificultan precisamente esa titulación fina.</p>' +
      '<p>Las alternativas encajan mejor con ese objetivo: el <b>propofol</b> permite un despertar rápido y una titulación precisa, a costa de hipotensión y de vigilar el síndrome por infusión de propofol; la <b>dexmedetomidina</b> proporciona una sedación cooperativa, con el paciente despertable y sin depresión respiratoria, con menor incidencia de delirium, aunque produce bradicardia e hipotensión y no sirve para sedación profunda. Y sobre todas ellas está la prioridad de la <b>analgesia</b>, porque buena parte de la agitación es dolor.</p>' +
      '<p>Esto no significa abandonarlas: siguen siendo de elección en el estatus epiléptico, en la abstinencia alcohólica, cuando se requiere amnesia profunda y en pacientes con inestabilidad hemodinámica extrema que no toleran propofol. La lección no es que un fármaco sea malo, sino que la elección debe responder al objetivo y al paciente concreto.</p>'
  },

  preguntas: [
    { nivel: 1, q: '¿Cuál es el orden correcto del enfoque moderno de sedoanalgesia?', r: 'Analgesia primero, después la mínima sedación necesaria titulada a objetivo con escalas, y evaluación sistemática del delirium con medidas no farmacológicas y movilización precoz.' },
    { nivel: 1, q: 'Compara el efecto hemodinámico del propofol, la ketamina y el etomidato.', r: 'El propofol produce hipotensión por vasodilatación y depresión miocárdica; la ketamina suele mantener o elevar la presión por liberación de catecolaminas; el etomidato es el más estable, a costa de supresión suprarrenal transitoria.' },
    { nivel: 1, q: '¿Qué es el síndrome por infusión de propofol?', r: 'Un cuadro por dosis altas y prolongadas, con acidosis metabólica, rabdomiólisis, hiperpotasemia, insuficiencia renal, arritmias y colapso, por alteración del metabolismo mitocondrial de ácidos grasos. Se previene limitando dosis y duración y vigilando triglicéridos, creatina-cinasa y equilibrio ácido-base.' },
    { nivel: 2, q: '¿Por qué el midazolam prolonga tanto el despertar tras infusiones largas?', r: 'Por su vida media contexto-sensible, que crece con la duración de la infusión al saturarse los depósitos periféricos, y por la acumulación de su metabolito activo de eliminación renal en el fracaso renal.' },
    { nivel: 2, q: 'Enumera las causas de agitación que deben descartarse antes de aumentar la sedación.', r: 'Dolor no tratado, hipoxemia, hipercapnia, hipoglucemia, abstinencia, globo vesical, delirium, asincronía con el ventilador y sepsis o deterioro clínico. La agitación es un síntoma, no un diagnóstico.' },
    { nivel: 2, q: '¿Por qué el bloqueo neuromuscular exige sedación profunda garantizada?', r: 'Porque no tiene efecto sedante ni analgésico: paraliza a un paciente que puede estar plenamente consciente, con las consecuencias de sufrimiento y estrés postraumático que eso conlleva.' },
    { nivel: 3, q: 'Vas a intubar a un paciente con shock séptico y lactato de 6. Detalla las decisiones que previenen el colapso peri-intubación.', r: 'Optimizar la volemia previamente y tener el vasopresor iniciado o preparado en bolo; elegir un inductor hemodinámicamente estable —ketamina o etomidato— a dosis <b>reducidas</b>, porque el gasto bajo aumenta la concentración cerebral alcanzada; preoxigenar adecuadamente, considerando oxigenación apneica; evitar la hiperventilación con bolsa tras la intubación, que eleva la presión intratorácica y reduce el retorno venoso; y ventilar con volúmenes y frecuencias moderadas. El mecanismo del colapso —vasodilatación farmacológica, retirada del tono simpático compensador y caída del retorno venoso por presión positiva— es conocido y por tanto prevenible.' },
    { nivel: 3, q: 'Un paciente con ketamina para inducción se hipotensa gravemente pese a que "la ketamina mantiene la presión". Explícalo.', r: 'La estabilidad hemodinámica de la ketamina es <b>indirecta</b>: procede de la liberación de catecolaminas endógenas y de la inhibición de su recaptación, no de un efecto cardiovascular propio. En realidad tiene un efecto inotrópico negativo directo sobre el miocardio que normalmente queda enmascarado. En un paciente con shock prolongado, catecolaminas endógenas agotadas y ya recibiendo dosis altas de vasopresores, no queda reserva que liberar y predomina el efecto depresor directo. Por eso la dosis debe reducirse y el vasopresor debe estar disponible incluso con fármacos considerados estables.' }
  ],

  caso: {
    vineta: 'Varón de 58 años, séptico, intubado hace 6 días con midazolam y fentanilo en infusión continua. Creatinina 2,8. Al intentar despertarlo para una prueba de respiración espontánea, no responde a órdenes a las 24 horas de suspender la sedación. Pupilas normales y simétricas, sin focalidad.',
    pasos: [
      { q: '¿Cuál es la explicación más probable antes de pensar en daño neurológico?', pista: 'Farmacocinética.', r: 'Acumulación de midazolam y de su metabolito activo. Tras seis días de infusión, la vida media contexto-sensible se ha prolongado enormemente, y el metabolito alfa-hidroximidazolam glucurónido, de eliminación renal, se acumula con una creatinina de 2,8. La exploración sin focalidad y con pupilas normales apoya una causa farmacológica.' },
      { q: '¿Qué otras causas debes descartar en paralelo?', pista: 'No todo es el fármaco.', r: 'Alteraciones metabólicas —hipoglucemia, sodio, calcio, amonio, uremia—, hipercapnia, estado epiléptico no convulsivo (que requiere electroencefalograma), encefalopatía séptica, ictus o hemorragia, y encefalopatía de Wernicke en pacientes desnutridos. La acumulación es lo más probable, pero es un diagnóstico que se confirma con el tiempo y por exclusión.' },
      { q: '¿Cómo se habría prevenido esta situación?', pista: 'Elección y estrategia.', r: 'Evitando la infusión prolongada de benzodiacepinas, prefiriendo propofol o dexmedetomidina; priorizando la analgesia y usando la mínima sedación necesaria; titulando a objetivo con escalas en lugar de infundir de forma fija; y aplicando interrupciones diarias de la sedación desde el principio, que además de acortar la ventilación permiten detectar precozmente la acumulación.' },
      { q: 'Al despertar, está agitado, desorientado y con alucinaciones. ¿Qué es y qué haces?', pista: 'Disfunción cerebral aguda.', r: 'Delirium, en el que las benzodiacepinas recibidas son un factor de riesgo. El manejo prioriza medidas no farmacológicas: reorientación, movilización precoz, restauración del ciclo de sueño, retirada de sujeciones y de fármacos deliriógenos, corrección de dolor, hipoxemia y alteraciones metabólicas. La medicación se reserva para la agitación que compromete la seguridad, y se evita añadir más benzodiacepinas.' },
      { q: '¿Por qué importa tanto el delirium más allá de la escena inmediata?', pista: 'Pronóstico a largo plazo.', r: 'Porque se asocia de forma independiente a mayor mortalidad, estancia prolongada y deterioro cognitivo a largo plazo, que puede persistir meses o años tras el alta. No es una molestia transitoria del ingreso, sino un desenlace con consecuencias duraderas, y buena parte de sus factores de riesgo son modificables por decisiones del equipo.' },
      { q: 'Además de la sedación, ¿qué explica que esté débil y no tolere la prueba de respiración espontánea?', pista: 'Seis días inmóvil y séptico.', r: 'Debilidad adquirida en la UCI —polineuropatía y miopatía del enfermo crítico—, favorecida por sepsis, inmovilidad, hiperglucemia, corticoides y bloqueantes neuromusculares. Afecta también al diafragma y es causa frecuente de fracaso en la retirada del ventilador. Su prevención es otra razón de peso para minimizar la sedación y movilizar precozmente.' }
    ],
    cierre: 'La sedación es una de las pocas intervenciones en las que hacer menos es hacerlo mejor. Cada decisión sobre qué fármaco, cuánto y durante cuánto tiempo se paga o se cobra días después.'
  },

  tarjetas: [
    { f: 'Paradigma moderno de sedoanalgesia', d: 'ANALGESIA primero (mucha agitación es dolor), sedación MÍNIMA titulada a objetivo con escalas, evaluación sistemática del delirium, movilización precoz e interrupción diaria de la sedación.' },
    { f: 'Perfil hemodinámico de los inductores', d: 'PROPOFOL: hipotensión (vasodilatación + depresión miocárdica). KETAMINA: mantiene o sube la presión (libera catecolaminas). ETOMIDATO: el más estable, pero supresión suprarrenal. MIDAZOLAM: hipotensión moderada.' },
    { f: 'Síndrome por infusión de propofol', d: 'Dosis altas y prolongadas: acidosis metabólica, rabdomiólisis, hiperpotasemia, fracaso renal, arritmias, colapso. Por alteración del metabolismo mitocondrial de ácidos grasos. Vigilar triglicéridos, CK y equilibrio ácido-base.' },
    { f: '¿Por qué las benzodiacepinas ya no son de elección?', d: 'Acumulación (vida media contexto-sensible + metabolito activo renal), más días de ventilación y factor de riesgo INDEPENDIENTE y MODIFICABLE de delirium. Siguen siendo útiles en estatus epiléptico, abstinencia alcohólica e inestabilidad extrema.' },
    { f: 'Colapso peri-intubación: mecanismo y prevención', d: 'Vasodilatación farmacológica + retirada del tono simpático compensador + ↓retorno venoso por presión positiva + acidosis/hipoxemia previas. Prevención: volemia y vasopresor listos, dosis REDUCIDAS, inductor estable, preoxigenar, ventilar suave.' },
    { f: '¿Por qué la ketamina puede hipotensar pese a su fama de estable?', d: 'Su estabilidad es INDIRECTA (liberación de catecolaminas endógenas). Tiene efecto inotrópico negativo DIRECTO que se desenmascara cuando las reservas están agotadas (shock prolongado con vasopresores altos).' },
    { f: 'Bloqueo neuromuscular: la regla que no se puede olvidar', d: 'NO sedante ni analgésico: paraliza a un paciente que puede estar consciente. Exige sedación profunda garantizada, monitorización con tren de cuatro, protección corneal y uso lo más breve posible (debilidad adquirida, sobre todo con corticoides).' },
    { f: 'Agitación en el paciente crítico: qué descartar antes de sedar', d: 'Dolor, hipoxemia, hipercapnia, hipoglucemia, abstinencia, globo vesical, delirium, asincronía con el ventilador, deterioro séptico. Es un SÍNTOMA, no un diagnóstico: sedar sin buscar la causa la enmascara.' }
  ]
}

]);

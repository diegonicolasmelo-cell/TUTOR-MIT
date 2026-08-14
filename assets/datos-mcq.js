/* ============================================================
   BANCO DE PREGUNTAS DE ALTERNATIVA
   ------------------------------------------------------------
   Formato de cada pregunta:

     { n: nivel (1 conocimiento, 2 integración, 3 razonamiento),
       q: enunciado,
       o: [ { t: texto, ok: true|ausente, r: razón } ] }

   Regla de diseño: cada distractor es un ERROR CONCEPTUAL
   concreto y frecuente, y su "r" explica por qué es tentador y
   por qué falla. Un distractor de relleno no enseña nada; uno
   bien elegido enseña tanto como la respuesta correcta.
   ============================================================ */

TUTOR.registrarMCQ({

/* ==================== CARDIOVASCULAR ==================== */

'gasto-cardiaco': [
  { n: 1, q: 'Un paciente tiene una fracción de eyección del 25 % y un volumen telediastólico de 260 mL. ¿Cuál es su volumen sistólico aproximado?',
    o: [
      { t: '25 mL', r: 'Confunde el porcentaje con un volumen absoluto. La FE es una proporción, no una cantidad.' },
      { t: '65 mL', ok: true, r: 'Correcto: VS = FE × VTD = 0,25 × 260 ≈ 65 mL, prácticamente normal pese a una FE muy baja. La dilatación compensa.' },
      { t: '195 mL', r: 'Ese es el volumen telesistólico (lo que queda dentro), no lo que se expulsa.' },
      { t: 'No puede calcularse sin la frecuencia', r: 'La frecuencia haría falta para el gasto cardíaco, no para el volumen sistólico.' }
    ] },
  { n: 2, q: 'Una taquicardia supraventricular a 210 lpm produce hipotensión en un corazón previamente sano. ¿Cuál es el mecanismo principal?',
    o: [
      { t: 'La frecuencia alta agota las reservas de ATP del miocardio', r: 'El agotamiento energético contribuye en isquemia, pero no es el mecanismo inmediato de la hipotensión.' },
      { t: 'El acortamiento de la diástole reduce el llenado y con él el volumen sistólico', ok: true, r: 'Correcto: la fase que se acorta al acelerar es la diástole, que es la que llena. Cae el VTD, cae el VS y el gasto deja de subir pese a la frecuencia.' },
      { t: 'La resistencia vascular sistémica cae por vasodilatación refleja', r: 'El reflejo ante hipotensión es vasoconstrictor, no vasodilatador.' },
      { t: 'La contractilidad disminuye por el efecto Bowditch', r: 'El efecto Bowditch (escalera) aumenta la contractilidad al subir la frecuencia; va en dirección contraria.' }
    ] },
  { n: 3, q: 'Varón politraumatizado: PA 116/96, FC 128, relleno capilar 4 s, lactato 4,2. ¿Cuál es la interpretación correcta?',
    o: [
      { t: 'Está estable: la presión arterial es normal', r: 'Este es el error clásico. La presión es lo último que se pierde: la vasoconstricción la sostiene mientras el gasto ya cayó.' },
      { t: 'Shock compensado: presión sostenida por aumento de la resistencia vascular', ok: true, r: 'Correcto. La presión de pulso estrechada (20 mmHg) delata un volumen sistólico bajo con diastólica elevada por vasoconstricción.' },
      { t: 'Shock distributivo por respuesta inflamatoria al trauma', r: 'El distributivo cursa con extremidades calientes y diastólica baja; aquí hay vasoconstricción y mala perfusión periférica.' },
      { t: 'Crisis hipertensiva por dolor', r: 'La diastólica alta no es hipertensión: es el resultado de la vasoconstricción compensadora, con sistólica que no sube.' }
    ] }
],

'precarga-starling': [
  { n: 2, q: 'Paciente ventilado con PEEP de 12 cmH₂O y PVC de 15 mmHg. ¿Qué conclusión es válida?',
    o: [
      { t: 'Está adecuadamente llenado: no necesita volumen', r: 'Es la trampa más cara de la UCI. La PVC alta no prueba llenado adecuado.' },
      { t: 'La PVC no permite concluir nada; hace falta una prueba dinámica', ok: true, r: 'Correcto: la PVC está contaminada por la PEEP y depende de la compliance. Solo la elevación pasiva de piernas o la variación de presión de pulso responden a la pregunta útil.' },
      { t: 'Está hipervolémico y necesita diuréticos', r: 'Requeriría evaluar congestión real; la cifra aislada no lo demuestra.' },
      { t: 'La PEEP no influye en la PVC medida', r: 'Sí influye: la presión intratorácica se transmite a la aurícula y eleva la lectura.' }
    ] },
  { n: 2, q: '¿Cuál es el mecanismo celular dominante de la ley de Frank-Starling?',
    o: [
      { t: 'Aumento de la cantidad de calcio liberado por el retículo sarcoplásmico', r: 'Eso sería un cambio de contractilidad. Frank-Starling actúa sin modificar el calcio disponible.' },
      { t: 'Aumento de la sensibilidad de la troponina C al calcio con el estiramiento', ok: true, r: 'Correcto, junto a una mejor superposición actina-miosina. Por eso es un desplazamiento a lo largo de la curva y no un cambio de curva.' },
      { t: 'Fosforilación del fosfolambano por la PKA', r: 'Esa es la vía β-adrenérgica: efecto lusitrópico e inotrópico, no Frank-Starling.' },
      { t: 'Aumento del número de receptores de rianodina', r: 'No hay cambios en la dotación de receptores en un latido.' }
    ] },
  { n: 3, q: 'Mujer de 78 años con hipertrofia concéntrica que entra en fibrilación auricular a 150 lpm y desarrolla edema pulmonar. ¿Qué explica mejor la descompensación?',
    o: [
      { t: 'Caída aguda de la contractilidad por la taquiarritmia', r: 'La contractilidad no es el problema: su FE está preservada. El fallo es de llenado.' },
      { t: 'Pérdida de la contracción auricular más acortamiento de la diástole', ok: true, r: 'Correcto: en un ventrículo rígido la patada auricular aporta el 30–40 % del llenado, y la respuesta rápida recorta el tiempo restante. Doble golpe al VTD.' },
      { t: 'Sobrecarga de volumen por retención hidrosalina aguda', r: 'No hay tiempo para retener volumen en minutos; el mecanismo es de redistribución y presión, no de exceso de agua.' },
      { t: 'Insuficiencia mitral aguda por dilatación del anillo', r: 'Posible como complicación, pero no es la explicación habitual ni necesaria de este cuadro.' }
    ] }
],

'poscarga': [
  { n: 2, q: '¿Por qué un vasodilatador mejora mucho el volumen sistólico en un corazón insuficiente y apenas lo cambia en uno sano?',
    o: [
      { t: 'Porque el corazón sano tiene menos receptores para el fármaco', r: 'No es una cuestión de receptores sino de la forma de la relación entre volumen sistólico y poscarga.' },
      { t: 'Porque la curva volumen sistólico/poscarga es plana en el sano y empinada en el insuficiente', ok: true, r: 'Correcto: con reserva contráctil, el ventrículo vence la carga sin perder volumen; sin reserva, cada mmHg de carga cuesta volumen sistólico.' },
      { t: 'Porque en el corazón sano la precarga compensa por Frank-Starling', r: 'Ambos disponen de Frank-Starling; la diferencia real es la reserva contráctil.' },
      { t: 'Porque el corazón insuficiente tiene mayor resistencia vascular basal', r: 'Suele tenerla, pero eso explicaría un efecto mayor del fármaco, no la pendiente de la respuesta.' }
    ] },
  { n: 3, q: 'Paciente con estenosis aórtica severa e hipotensión. Un compañero propone nitroglicerina. ¿Cuál es la objeción correcta?',
    o: [
      { t: 'El gasto está fijado por la obstrucción: al bajar la resistencia, la presión se desploma', ok: true, r: 'Correcto. PA = GC × RVS con GC fijo. Además cae la presión diastólica que perfunde un ventrículo hipertrófico, y aparece isquemia.' },
      { t: 'La nitroglicerina aumenta la poscarga por vasoconstricción refleja', r: 'La nitroglicerina es venodilatadora y vasodilatadora; no aumenta la poscarga.' },
      { t: 'No hay objeción: reducir poscarga siempre mejora el gasto', r: 'Es cierto en el ventrículo con reserva y carga vencible, no ante una obstrucción mecánica fija.' },
      { t: 'Está contraindicada por producir taquicardia refleja excesiva', r: 'Puede haberla, pero el problema central es la caída de presión con gasto que no puede compensar.' }
    ] },
  { n: 2, q: 'Un ventrículo dilatado tiene presión arterial normal. ¿Puede tener la poscarga elevada?',
    o: [
      { t: 'No: si la presión arterial es normal, la poscarga es normal', r: 'Este es el error central del tema. Poscarga no es sinónimo de presión arterial.' },
      { t: 'Sí: por la ley de Laplace, el radio aumentado eleva la tensión parietal', ok: true, r: 'Correcto: σ = P·r/2h. Con la misma presión, un radio mayor exige más tensión de pared. La dilatación es en sí misma una sobrecarga.' },
      { t: 'Solo si además hay hipertrofia', r: 'La hipertrofia (mayor h) reduce la tensión parietal; iría en sentido contrario.' },
      { t: 'Solo si la frecuencia cardíaca está elevada', r: 'La frecuencia afecta al consumo de oxígeno, no al término de tensión de la ley de Laplace.' }
    ] }
],

'contractilidad-pv': [
  { n: 2, q: 'En un bucle presión-volumen, ¿qué cambio identifica inequívocamente un aumento de contractilidad?',
    o: [
      { t: 'El bucle se ensancha desplazándose a la derecha', r: 'Eso es un aumento de precarga: el punto se mueve sobre la misma recta telesistólica.' },
      { t: 'La recta telesistólica rota hacia arriba y a la izquierda', ok: true, r: 'Correcto: la carga mueve el punto sobre la recta; el inotropismo mueve la recta. El volumen telesistólico disminuye.' },
      { t: 'El bucle se hace más alto y más estrecho', r: 'Ese es el efecto de aumentar la poscarga: la eyección termina antes.' },
      { t: 'La curva de llenado diastólico se empina', r: 'Eso indica pérdida de compliance, un fenómeno diastólico.' }
    ] },
  { n: 3, q: '¿Por qué los betabloqueantes mejoran la supervivencia en insuficiencia cardíaca si reducen la contractilidad?',
    o: [
      { t: 'Porque aumentan directamente la fracción de eyección desde el primer día', r: 'Al principio la reducen; la mejoría de la FE aparece tras semanas.' },
      { t: 'Porque interrumpen la toxicidad catecolaminérgica crónica y el remodelado', ok: true, r: 'Correcto: resensibilizan receptores β, reducen el consumo de O₂ y las arritmias, y alargan la diástole. Actúan sobre el mecanismo de progresión, no sobre la bomba.' },
      { t: 'Porque producen vasodilatación periférica y reducen la poscarga', r: 'Algunos tienen efecto vasodilatador añadido, pero no es el mecanismo del beneficio pronóstico.' },
      { t: 'Porque aumentan la precarga al enlentecer la frecuencia', r: 'Alargan el llenado, sí, pero eso no explica la reducción de mortalidad.' }
    ] }
],

'retorno-venoso': [
  { n: 2, q: 'Tras administrar un inotrópico eficaz, ¿qué combinación esperas?',
    o: [
      { t: 'Sube el gasto cardíaco y sube la presión venosa central', r: 'Ese es el patrón de administrar volumen: se desplaza la curva de retorno venoso.' },
      { t: 'Sube el gasto cardíaco y baja la presión venosa central', ok: true, r: 'Correcto: la curva cardíaca se desplaza hacia arriba, el corazón vacía mejor la aurícula, cae la PAD y se amplía el gradiente de retorno.' },
      { t: 'Baja el gasto cardíaco y sube la presión venosa central', r: 'Ese es el patrón del fallo de bomba, no del inotrópico.' },
      { t: 'Ambos permanecen sin cambios', r: 'Un inotrópico eficaz modifica necesariamente el punto de trabajo del sistema.' }
    ] },
  { n: 3, q: 'Varón de 34 años con disnea súbita: hipotensión, yugulares ingurgitadas, campos pulmonares limpios, VD dilatado y VI pequeño e hiperdinámico. ¿Qué NO debes hacer?',
    o: [
      { t: 'Administrar un bolo generoso de volumen', ok: true, r: 'Correcto, es lo que NO debe hacerse: un VD ya dilatado se distiende más, desplaza el tabique, empeora el llenado del VI y compromete su propia perfusión.' },
      { t: 'Iniciar vasopresor para sostener la presión de perfusión coronaria derecha', r: 'Esto sí está indicado: rompe la espiral isquémica del VD.' },
      { t: 'Buscar y tratar la causa obstructiva', r: 'Es la prioridad terapéutica en este cuadro.' },
      { t: 'Evitar la hipoxemia y la acidosis', r: 'Correcto hacerlo: ambas aumentan la resistencia vascular pulmonar y empeoran la poscarga del VD.' }
    ] },
  { n: 1, q: '¿Qué determina la presión sistémica media de llenado?',
    o: [
      { t: 'La fuerza de contracción del ventrículo izquierdo', r: 'Es la presión que existiría con el corazón detenido: no depende de la bomba.' },
      { t: 'El volumen sanguíneo y el tono venoso', ok: true, r: 'Correcto: es la relación entre contenido y capacitancia. Por eso la venoconstricción la eleva sin transfundir.' },
      { t: 'La resistencia arteriolar sistémica', r: 'La resistencia arteriolar determina la presión arterial, no la de llenado del sistema.' },
      { t: 'La presión auricular derecha', r: 'La PAD es el otro extremo del gradiente, no la presión de llenado.' }
    ] }
],

'presion-arterial': [
  { n: 2, q: 'Mujer de 82 años con PA 178/62 mmHg. ¿Qué indica esa presión de pulso de 116?',
    o: [
      { t: 'Volumen sistólico bajo con vasoconstricción', r: 'Ese patrón produce presión de pulso ESTRECHA, no amplia.' },
      { t: 'Pérdida de compliance aórtica', ok: true, r: 'Correcto: PP ≈ VS/compliance. Una aorta rígida no amortigua el pico ni sostiene la diastólica: sistólica alta con diastólica baja.' },
      { t: 'Hipertensión por exceso de resistencia arteriolar', r: 'Ese patrón elevaría también la diastólica, que aquí está baja.' },
      { t: 'Error de medición por manguito inadecuado', r: 'Es un patrón fisiológico reconocible y reproducible, no un artefacto.' }
    ] },
  { n: 3, q: 'Hipertenso crónico con 220/120, cefalea y sin daño agudo de órgano. ¿Cuál es la conducta correcta?',
    o: [
      { t: 'Normalizar la presión en la primera hora con fármacos intravenosos', r: 'Peligroso: su autorregulación está desplazada a la derecha y una caída brusca produce isquemia cerebral, renal o coronaria.' },
      { t: 'Reducir la presión arterial media un 20–25 % en las primeras horas', ok: true, r: 'Correcto. Es una urgencia, no una emergencia: reducción gradual con fármacos titulables.' },
      { t: 'No tratar y citar en consulta en un mes', r: 'Requiere iniciar o ajustar tratamiento y seguimiento estrecho, aunque no sea una emergencia.' },
      { t: 'Administrar nifedipino sublingual de acción rápida', r: 'Provoca caídas bruscas e impredecibles; es precisamente lo que hay que evitar.' }
    ] }
],

'barorreflejo': [
  { n: 2, q: 'Al comprimir el seno carotídeo, ¿qué ocurre y por qué?',
    o: [
      { t: 'Taquicardia, porque se estimula el barorreceptor', r: 'Error de signo, el más frecuente del tema: los barorreceptores INHIBEN el simpático.' },
      { t: 'Bradicardia, porque aumenta la descarga aferente y se inhibe el simpático', ok: true, r: 'Correcto: la compresión simula presión alta, sube la descarga, se frena el centro vasomotor y se activa el vago.' },
      { t: 'No hay cambios: el reflejo requiere cambios reales de presión', r: 'El receptor responde al estiramiento mecánico, sea de la presión o de una compresión externa.' },
      { t: 'Hipertensión por respuesta simpática refleja al dolor', r: 'Puede haber respuesta al dolor, pero el efecto dominante y buscado es vagal.' }
    ] },
  { n: 3, q: 'Anciano que se cae al levantarse. Decúbito: 138/76, FC 62. De pie: 96/58, FC 66. ¿Qué te dice la frecuencia?',
    o: [
      { t: 'Que la caída de presión es leve y no significativa', r: 'Cumple criterios de hipotensión ortostática con creces (−42 sistólica).' },
      { t: 'Que la respuesta compensadora está bloqueada o ausente', ok: true, r: 'Correcto: un reflejo intacto habría producido taquicardia clara. Sugiere disautonomía o betabloqueo. Es la observación de mayor rendimiento a pie de cama.' },
      { t: 'Que se trata de hipovolemia simple', r: 'En la hipovolemia con reflejo intacto habría taquicardia marcada.' },
      { t: 'Que hay bloqueo auriculoventricular de alto grado', r: 'La frecuencia basal de 62 y su respuesta plana no indican bloqueo; indican falta de estímulo simpático eficaz.' }
    ] }
],

'sraa': [
  { n: 2, q: 'Paciente con insuficiencia cardíaca, edemas y 8 kg de más, con sodio urinario de 10 mEq/L. ¿Cómo se explica?',
    o: [
      { t: 'Está deshidratado y necesita suero salino', r: 'Trampa clásica: los marcadores parecen de hipovolemia, pero el paciente está sobrecargado de agua.' },
      { t: 'El riñón percibe baja perfusión: el volumen circulante efectivo está reducido', ok: true, r: 'Correcto. El riñón mide flujo, no litros. Volumen total alto con volumen circulante efectivo bajo.' },
      { t: 'Hay una lesión tubular que impide excretar sodio', r: 'Un túbulo dañado excretaría MÁS sodio, no menos.' },
      { t: 'El sodio urinario bajo indica dieta hiposódica estricta', r: 'Puede contribuir, pero no explica la avidez renal con SRAA activado.' }
    ] },
  { n: 2, q: 'Al iniciar un IECA, la creatinina sube un 25 %. ¿Qué haces?',
    o: [
      { t: 'Suspenderlo: es nefrotóxico', r: 'Error frecuente que priva al paciente de un fármaco nefroprotector.' },
      { t: 'Mantenerlo: es un efecto hemodinámico esperado sobre la arteriola eferente', ok: true, r: 'Correcto: hasta un 30 % es aceptable y refleja que el fármaco actúa. A largo plazo reduce la progresión renal.' },
      { t: 'Duplicar la dosis para vencer la resistencia', r: 'No hay «resistencia» que vencer; la titulación debe ser gradual y vigilada.' },
      { t: 'Añadir un AINE para proteger el riñón', r: 'Justo lo contrario: el AINE bloquea la vasodilatación aferente y precipita el fracaso renal.' }
    ] },
  { n: 1, q: 'Aldosterona elevada con renina suprimida. ¿Diagnóstico?',
    o: [
      { t: 'Hiperaldosteronismo secundario', r: 'En el secundario la renina está ALTA, porque es el estímulo.' },
      { t: 'Hiperaldosteronismo primario', ok: true, r: 'Correcto: la producción autónoma retiene sodio y frena la renina aguas arriba. Cursa con HTA, hipopotasemia y alcalosis.' },
      { t: 'Estenosis de la arteria renal', r: 'Produce hiperaldosteronismo secundario, con renina elevada.' },
      { t: 'Insuficiencia suprarrenal', r: 'Cursaría con aldosterona baja, no alta.' }
    ] }
],

'perfusion-coronaria': [
  { n: 2, q: '¿Por qué el miocardio no puede compensar un aumento de demanda extrayendo más oxígeno?',
    o: [
      { t: 'Porque su densidad capilar es insuficiente', r: 'La densidad capilar miocárdica es de las más altas del organismo.' },
      { t: 'Porque su extracción ya es máxima en reposo (60–75 %)', ok: true, r: 'Correcto: el seno coronario vuelve saturado a solo ~30 %. No hay reserva de extracción, solo reserva de FLUJO.' },
      { t: 'Porque la hemoglobina no cede oxígeno en el corazón', r: 'Lo cede con normalidad; de hecho lo cede más que en cualquier otro lecho.' },
      { t: 'Porque la difusión está limitada por el grosor de la pared', r: 'La difusión no es el factor limitante en condiciones normales.' }
    ] },
  { n: 3, q: 'Paciente séptico, FC 145, Hb 7,2, troponina en ascenso, coronarias sin lesiones. ¿Cómo lo clasificas y tratas?',
    o: [
      { t: 'Infarto tipo 1: reperfusión urgente', r: 'El tipo 1 exige rotura o erosión de placa con trombosis, ausente aquí.' },
      { t: 'Infarto tipo 2 por desequilibrio aporte-demanda: tratar la causa', ok: true, r: 'Correcto: demanda alta (taquicardia, adrenérgico) con aporte reducido (menos diástole, menos contenido de O₂). Se trata la sepsis, la frecuencia y la anemia.' },
      { t: 'Miocarditis: iniciar corticoides', r: 'No hay elementos que la sugieran y el tratamiento propuesto no está indicado.' },
      { t: 'Falso positivo de troponina por sepsis', r: 'La elevación es real y refleja necrosis; lo que cambia es el mecanismo, no su existencia.' }
    ] }
],

'potencial-accion': [
  { n: 1, q: '¿Qué corriente genera la meseta (fase 2) del potencial de acción ventricular?',
    o: [
      { t: 'Entrada de sodio por canales rápidos', r: 'Esa es la fase 0. Los canales rápidos ya están inactivados en la meseta.' },
      { t: 'Entrada de calcio por canales tipo L equilibrada con salida de potasio', ok: true, r: 'Correcto. Esta meseta explica el acoplamiento excitación-contracción, la imposibilidad de tetanizar el corazón y la duración del QT.' },
      { t: 'Salida de potasio por I_Kr e I_Ks', r: 'Predomina en la fase 3, la repolarización.' },
      { t: 'Corriente funny I_f', r: 'Es la despolarización diastólica del nodo sinusal, fase 4 del tejido automático.' }
    ] },
  { n: 3, q: 'Paciente en diálisis con QRS de 180 ms, sin onda P y T picudas. ¿Cuál es la primera medida y por qué?',
    o: [
      { t: 'Insulina con glucosa, porque introduce potasio en la célula', r: 'Es necesaria, pero tarda 15–30 minutos y el paciente tiene inestabilidad de membrana inminente.' },
      { t: 'Calcio intravenoso, porque desplaza el potencial umbral', ok: true, r: 'Correcto: actúa en minutos restaurando la diferencia funcional frente a un reposo despolarizado. No baja el potasio: hay que seguir con desplazamiento y eliminación.' },
      { t: 'Bicarbonato, porque corrige la acidosis subyacente', r: 'Solo útil si hay acidosis, y su efecto es lento e inconstante.' },
      { t: 'Diálisis urgente como primera medida', r: 'Es el tratamiento definitivo, pero requiere tiempo de organización: no protege la membrana en el minuto uno.' }
    ] }
],

'ecg-fisiologia': [
  { n: 2, q: '¿Por qué la onda T es normalmente positiva y concordante con el QRS?',
    o: [
      { t: 'Porque la repolarización sigue el mismo sentido que la despolarización', r: 'Si así fuera, la T sería negativa: mismo sentido con carga opuesta.' },
      { t: 'Porque la repolarización va en sentido opuesto y con carga opuesta: se cancelan', ok: true, r: 'Correcto: empieza en el epicardio (potencial de acción más corto) y viaja hacia el endocardio. Dos inversiones producen una onda positiva.' },
      { t: 'Porque la repolarización auricular refuerza el vector ventricular', r: 'La repolarización auricular queda enmascarada bajo el QRS y no contribuye.' },
      { t: 'Por convención en la colocación de los electrodos', r: 'Es un fenómeno eléctrico real, no una convención de registro.' }
    ] },
  { n: 3, q: 'Elevación del ST en II, III y aVF con hipotensión que empeora tras nitroglicerina. ¿Qué ocurrió?',
    o: [
      { t: 'Reacción alérgica al fármaco', r: 'El deterioro es hemodinámico y previsible, no una reacción de hipersensibilidad.' },
      { t: 'Infarto con extensión al ventrículo derecho, dependiente de precarga', ok: true, r: 'Correcto: pide V4R. Ese VD necesita precarga para atravesar la circulación pulmonar; la venodilatación la colapsa. Se trata con volumen, evitando nitratos y diuréticos.' },
      { t: 'Progresión a shock cardiogénico por fallo del ventrículo izquierdo', r: 'Posible en general, pero no explica la relación temporal con la nitroglicerina.' },
      { t: 'Taponamiento por rotura de pared libre', r: 'Cuadro catastrófico distinto, sin esta relación con el fármaco.' }
    ] }
],

'insuficiencia-cardiaca': [
  { n: 2, q: 'Paciente con disnea, ingurgitación yugular, crepitantes, extremidades tibias, diuresis conservada y lactato normal. ¿Perfil y tratamiento?',
    o: [
      { t: 'Frío y húmedo: inotrópicos', r: 'No hay signos de hipoperfusión: las extremidades están tibias y el lactato es normal.' },
      { t: 'Caliente y húmedo: diuréticos y vasodilatadores', ok: true, r: 'Correcto, y es el perfil del 70–80 % de las descompensaciones. La mayoría necesita descongestión, no inotropía.' },
      { t: 'Frío y seco: volumen', r: 'Está claramente congestivo, no seco.' },
      { t: 'Caliente y seco: ajustar tratamiento ambulatorio', r: 'Los crepitantes y la ingurgitación indican congestión activa.' }
    ] },
  { n: 3, q: 'Paciente congestivo con creatinina en ascenso durante el tratamiento diurético, que mantiene ingurgitación yugular y edemas. ¿Qué haces?',
    o: [
      { t: 'Suspender el diurético y administrar fluidos', r: 'Empeoraría la congestión venosa renal, que es probablemente la causa del deterioro.' },
      { t: 'Continuar descongestionando: la presión venosa alta reduce el gradiente de perfusión renal', ok: true, r: 'Correcto y contraintuitivo. El flujo renal depende de presión arterial MENOS presión venosa; una PVC alta lo estrangula.' },
      { t: 'Iniciar diálisis inmediatamente', r: 'Prematuro sin haber optimizado la descongestión y sin indicación urgente.' },
      { t: 'Añadir un AINE para el edema', r: 'Contraindicado: bloquea la vasodilatación aferente y agrava el fracaso renal.' }
    ] },
  { n: 1, q: '¿Cuál de estos tratamientos NO ha demostrado mejorar la supervivencia en insuficiencia cardíaca con FE reducida?',
    o: [
      { t: 'Betabloqueantes', r: 'Sí la mejora: revierten la toxicidad catecolaminérgica y el remodelado.' },
      { t: 'Diuréticos de asa', ok: true, r: 'Correcto: alivian los síntomas y son imprescindibles para la congestión, pero no modifican la supervivencia. Tratan la consecuencia, no el mecanismo.' },
      { t: 'Antagonistas del receptor mineralocorticoide', r: 'Sí la mejoran, sobre todo por su efecto antifibrótico.' },
      { t: 'iSGLT2', r: 'Sí la mejoran, en FE reducida y también preservada.' }
    ] }
],

'shock': [
  { n: 1, q: '¿Cuál es el único tipo de shock que cursa característicamente con gasto cardíaco elevado?',
    o: [
      { t: 'Hipovolémico', r: 'Cursa con gasto bajo por caída de la precarga.' },
      { t: 'Cardiogénico', r: 'Cursa con gasto bajo por fallo de bomba.' },
      { t: 'Distributivo', ok: true, r: 'Correcto: el problema es la resistencia, no el caudal. Extremidades calientes, diastólica baja y gasto alto.' },
      { t: 'Obstructivo', r: 'Cursa con gasto bajo por impedimento al llenado o a la eyección.' }
    ] },
  { n: 2, q: 'Politraumatizado con hipotensión, yugulares INGURGITADAS y ruidos cardíacos apagados. ¿Qué descartas de inmediato?',
    o: [
      { t: 'Shock hipovolémico por hemorragia', ok: true, r: 'Correcto, es lo que las yugulares descartan: en la hipovolemia estarían colapsadas. La ingurgitación indica presión de salida elevada.' },
      { t: 'Taponamiento cardíaco', r: 'Es precisamente el diagnóstico que sugiere la tríada de Beck.' },
      { t: 'Neumotórax a tensión', r: 'Entra en el diferencial: también eleva la presión intratorácica y bloquea el retorno.' },
      { t: 'Contusión miocárdica', r: 'Posible en este contexto y compatible con presiones de llenado elevadas.' }
    ] },
  { n: 3, q: 'Shock séptico: tras corregir la presión con noradrenalina, aparecen extremidades frías y el lactato no baja. ¿Qué ocurrió?',
    o: [
      { t: 'La noradrenalina está produciendo isquemia distal generalizada', r: 'Puede ocurrir a dosis muy altas, pero no explica un lactato persistente con caída del gasto.' },
      { t: 'Se desenmascaró la depresión miocárdica séptica al restaurar la poscarga', ok: true, r: 'Correcto: mientras la resistencia era mínima el ventrículo eyectaba sin dificultad. Restaurada la carga, un miocardio deprimido no la vence. Evaluar con ecografía y valorar inotrópico.' },
      { t: 'El paciente necesita más volumen de forma urgente', r: 'Solo si las pruebas dinámicas lo demuestran; administrarlo a ciegas produce edema.' },
      { t: 'El lactato elevado se debe únicamente a la noradrenalina', r: 'Ese efecto metabólico corresponde sobre todo a la adrenalina vía β₂, no a la noradrenalina.' }
    ] }
],

'valvulopatias': [
  { n: 2, q: 'En la estenosis mitral severa, ¿qué cámara soporta la sobrecarga?',
    o: [
      { t: 'El ventrículo izquierdo, por sobrecarga de presión', r: 'Error frecuente: el VI está PROTEGIDO, recibe poco volumen y su función suele ser normal.' },
      { t: 'La aurícula izquierda', ok: true, r: 'Correcto: la obstrucción está antes del ventrículo. De ahí la fibrilación auricular, los trombos, la congestión pulmonar y, con el tiempo, el fallo derecho.' },
      { t: 'El ventrículo derecho de forma primaria', r: 'Falla secundariamente por hipertensión pulmonar, no de entrada.' },
      { t: 'Ninguna: es una lesión sin repercusión hemodinámica', r: 'La estenosis mitral severa tiene repercusión importante, solo que aguas arriba.' }
    ] },
  { n: 3, q: 'Endocarditis con disnea súbita, edema pulmonar, presión de pulso ESTRECHA y soplo diastólico corto y suave. ¿Diagnóstico?',
    o: [
      { t: 'Insuficiencia aórtica crónica descompensada', r: 'La crónica cursa con presión de pulso AMPLIA y signos periféricos llamativos.' },
      { t: 'Insuficiencia aórtica aguda', ok: true, r: 'Correcto, y la clave está en lo que FALTA: sin adaptación crónica no hay pulso saltón, y el soplo es corto porque las presiones se igualan pronto. Cuadro discreto y catastrófico: cirugía urgente.' },
      { t: 'Estenosis aórtica severa', r: 'Produciría soplo sistólico eyectivo, no diastólico.' },
      { t: 'Comunicación interventricular adquirida', r: 'Daría soplo holosistólico, no diastólico.' }
    ] }
],

/* ==================== RESPIRATORIO ==================== */

'mecanica-ventilatoria': [
  { n: 2, q: 'Paciente ventilado con presión pico 48 y meseta 19 cmH₂O. ¿Qué haces?',
    o: [
      { t: 'Bajar el volumen corriente por riesgo de sobredistensión', r: 'La meseta de 19 indica que el alvéolo NO está sobredistendido. Se trataría el número equivocado.' },
      { t: 'Aspirar, revisar el tubo y broncodilatar', ok: true, r: 'Correcto: la diferencia pico-meseta de 29 es puramente resistiva. Broncoespasmo, secreciones o tubo acodado.' },
      { t: 'Aumentar la PEEP para reclutar', r: 'La distensibilidad es buena; no hay indicio de colapso alveolar.' },
      { t: 'Descartar neumotórax urgente', r: 'El neumotórax elevaría la MESETA, que aquí es normal.' }
    ] },
  { n: 3, q: 'Asmático recién intubado que se hipotensa. Al desconectarlo 25 segundos, la presión se recupera. ¿Cuál es el ajuste correcto?',
    o: [
      { t: 'Aumentar la frecuencia respiratoria para mejorar el CO₂', r: 'Empeoraría: acorta aún más la espiración, que es justo lo que falta.' },
      { t: 'Bajar la frecuencia y prolongar la espiración, aceptando hipercapnia', ok: true, r: 'Correcto: el problema es el tiempo espiratorio insuficiente. Ventilar menos mejora la hemodinámica y a menudo la propia ventilación alveolar.' },
      { t: 'Aumentar la PEEP para vencer la obstrucción', r: 'Puede agravar el atrapamiento si se aplica sin criterio.' },
      { t: 'Aumentar el volumen corriente para mejorar la ventilación', r: 'Añade volumen a un pulmón que no consigue vaciarse.' }
    ] }
],

'intercambio-gaseoso': [
  { n: 2, q: 'Paciente hipoxémico cuya saturación apenas cambia con FiO₂ del 100 %. ¿Mecanismo?',
    o: [
      { t: 'Hipoventilación', r: 'La hipoventilación responde bien al oxígeno; su marca es el gradiente A-a NORMAL con CO₂ alto.' },
      { t: 'Shunt', ok: true, r: 'Correcto: el gas no llega al alvéolo cerrado y la sangre de las unidades sanas ya está saturada. Hay que RECLUTAR, no subir la FiO₂.' },
      { t: 'Desequilibrio V/Q sin shunt', r: 'Responde al oxígeno, porque las unidades están mal ventiladas pero abiertas.' },
      { t: 'Trastorno de difusión', r: 'También responde al oxígeno, al aumentar el gradiente de difusión.' }
    ] },
  { n: 3, q: 'EPOC agudizado al que se administra O₂ a alto flujo; a los 40 minutos está somnoliento con PaCO₂ de 90. ¿Mecanismo principal?',
    o: [
      { t: 'Pérdida del estímulo ventilatorio hipóxico', r: 'Contribuye, pero es el factor MENOR pese a ser el más citado.' },
      { t: 'Abolición de la vasoconstricción pulmonar hipóxica con aumento del espacio muerto', ok: true, r: 'Correcto: el oxígeno dilata los vasos de zonas mal ventiladas, redistribuye el flujo hacia unidades de V/Q bajo y la misma ventilación elimina menos CO₂.' },
      { t: 'Depresión directa del centro respiratorio por el oxígeno', r: 'El oxígeno no deprime directamente el centro respiratorio.' },
      { t: 'Broncoconstricción inducida por oxígeno seco', r: 'No es un mecanismo relevante de hipercapnia aguda.' }
    ] },
  { n: 2, q: 'Hipoxemia con gradiente alvéolo-arterial NORMAL y PaCO₂ elevada. ¿Qué indica?',
    o: [
      { t: 'Enfermedad del parénquima pulmonar', r: 'Aumentaría el gradiente A-a; aquí es normal.' },
      { t: 'Fallo de la bomba ventilatoria', ok: true, r: 'Correcto: el pulmón funciona, lo que falla es mover aire. Opiáceos, enfermedad neuromuscular, fatiga. Necesita ventilación, no solo oxígeno.' },
      { t: 'Tromboembolismo pulmonar', r: 'Cursa con gradiente aumentado.' },
      { t: 'Shunt intracardíaco', r: 'También aumentaría el gradiente.' }
    ] }
],

'transporte-gases': [
  { n: 3, q: 'Rescatado de un incendio: confuso, SatO₂ 99 % por pulsioximetría, PaO₂ 105, lactato 7. ¿Qué es cierto?',
    o: [
      { t: 'La oxigenación es adecuada: buscar otra causa de la confusión', r: 'Es la conclusión peligrosa. Ni la PaO₂ ni el pulsioxímetro detectan carboxihemoglobina.' },
      { t: 'El pulsioxímetro no distingue carboxihemoglobina de oxihemoglobina', ok: true, r: 'Correcto: absorben luz de forma similar y el aparato las suma. Hace falta cooximetría. El lactato muy alto sugiere además cianuro.' },
      { t: 'Una PaO₂ de 105 descarta hipoxia tisular', r: 'La PaO₂ mide gas DISUELTO; el problema está en el transportador.' },
      { t: 'La ausencia de cianosis descarta hipoxia grave', r: 'La cianosis exige hemoglobina desoxigenada; aquí está ocupada por CO, no desoxigenada.' }
    ] },
  { n: 2, q: 'Paciente A: Hb 5 g/dL con SatO₂ 100 %. Paciente B: Hb 15 g/dL con SatO₂ 80 %. ¿Quién transporta más oxígeno?',
    o: [
      { t: 'El paciente A, por tener saturación completa', r: 'La saturación es un porcentaje de la hemoglobina disponible, y aquí hay muy poca.' },
      { t: 'El paciente B', ok: true, r: 'Correcto: 1,34 × 15 × 0,80 = 16,1 frente a 1,34 × 5 × 1,00 = 6,7 mL/dL. La hemoglobina domina el contenido.' },
      { t: 'Ambos igual: se compensan', r: 'La diferencia es de más del doble.' },
      { t: 'No puede saberse sin la PaO₂', r: 'El oxígeno disuelto es despreciable frente al unido a hemoglobina.' }
    ] }
],

'insuficiencia-respiratoria': [
  { n: 3, q: 'Asmática con FR 36 y tiraje intenso. Primera gasometría: PaCO₂ 27. Dos horas después: PaCO₂ 42 y «está más tranquila». ¿Qué significa?',
    o: [
      { t: 'Está mejorando: el CO₂ se ha normalizado', r: 'Es el error más peligroso del tema. En un paciente aún obstruido, un CO₂ «normal» no es normalidad.' },
      { t: 'Se está agotando: cae la ventilación alveolar por fatiga', ok: true, r: 'Correcto: lo esperable era hiperventilación. La normalización indica claudicación inminente. Hay que preparar soporte ventilatorio.' },
      { t: 'Ha desarrollado una acidosis metabólica compensadora', r: 'No explica el ascenso del CO₂ ni el cuadro clínico.' },
      { t: 'La primera gasometría era errónea', r: 'La secuencia es coherente y clásica; no hay motivo para descartarla.' }
    ] },
  { n: 2, q: 'En el SDRA se ventila con 6 mL/kg de peso predicho. ¿Por qué peso predicho y no peso real?',
    o: [
      { t: 'Para simplificar el cálculo en la cabecera', r: 'No es una simplificación: es fisiología.' },
      { t: 'Porque el tamaño del pulmón depende de talla y sexo, no del peso', ok: true, r: 'Correcto: el pulmón no crece con la obesidad. Usar peso real produciría sobredistensión sistemática del baby lung.' },
      { t: 'Porque el peso real varía con el edema', r: 'Es cierto que varía, pero la razón de fondo es anatómica.' },
      { t: 'Porque así se compensa el espacio muerto', r: 'El espacio muerto se ajusta por otras vías.' }
    ] }
],

/* ==================== RENAL Y MEDIO INTERNO ==================== */

'filtracion-glomerular': [
  { n: 3, q: 'Anciana deshidratada en tratamiento con enalapril y tiazida que toma ibuprofeno; creatinina de 0,9 a 3,2. ¿Qué mecanismo explica el papel del ibuprofeno?',
    o: [
      { t: 'Toxicidad tubular directa por el fármaco', r: 'Puede causar nefritis intersticial, pero no es el mecanismo de este cuadro agudo y reversible.' },
      { t: 'Bloquea las prostaglandinas que dilataban la arteriola aferente', ok: true, r: 'Correcto: retira uno de los dos pilares que sostenían el filtrado. El IECA retira el otro (constricción eferente). De ahí el «triple ataque».' },
      { t: 'Contrae la arteriola eferente aumentando la presión intraglomerular', r: 'Eso lo hace la angiotensina II, y aumentaría el filtrado, no lo reduciría.' },
      { t: 'Produce obstrucción tubular por cristales', r: 'No es el mecanismo de los AINE.' }
    ] },
  { n: 2, q: 'Excreción fraccional de sodio del 0,4 % en un fracaso renal agudo. ¿Qué indica?',
    o: [
      { t: 'Necrosis tubular aguda establecida', r: 'Un túbulo dañado NO puede retener sodio: la excreción fraccional sería > 2 %.' },
      { t: 'Fracaso prerrenal con túbulo intacto', ok: true, r: 'Correcto: el riñón retiene sodio con avidez porque percibe hipoperfusión. Reversible si se corrige la causa.' },
      { t: 'Obstrucción de la vía urinaria', r: 'La posrenal no produce este patrón de forma característica.' },
      { t: 'Glomerulonefritis aguda', r: 'No es el patrón típico ni el dato que la define.' }
    ] }
],

'manejo-sodio-agua': [
  { n: 2, q: 'Paciente con insuficiencia cardíaca, edemas y sodio de 126 mEq/L. ¿Qué le ocurre?',
    o: [
      { t: 'Le falta sodio: administrar suero salino', r: 'Error clásico. Su sodio corporal TOTAL está aumentado; lo que sobra es agua.' },
      { t: 'Le sobra agua libre por ADH liberada de forma no osmótica', ok: true, r: 'Correcto: el bajo volumen circulante efectivo dispara la ADH pese a la hipoosmolaridad. Tratamiento: restricción hídrica y mejorar la hemodinámica.' },
      { t: 'Tiene un SIADH concomitante', r: 'El SIADH exige euvolemia clínica; esta paciente está claramente hipervolémica.' },
      { t: 'Es una pseudohiponatremia por hiperlipidemia', r: 'Cursaría con osmolaridad plasmática normal, no baja.' }
    ] },
  { n: 3, q: 'Se administra suero salino isotónico a un paciente con SIADH y el sodio baja de 126 a 122. ¿Por qué?',
    o: [
      { t: 'Por dilución del sodio administrado', r: 'El salino isotónico no diluye por sí mismo: aporta sodio.' },
      { t: 'Porque su orina es más concentrada que el suero: excreta el sodio y retiene el agua', ok: true, r: 'Correcto, es el fenómeno de desalinización. Con osmolaridad urinaria de 480 frente a 308 del suero, el balance neto es de agua libre positiva.' },
      { t: 'Porque el salino suprime la producción de aldosterona', r: 'No es el mecanismo del descenso de la natremia aquí.' },
      { t: 'Porque el SIADH impide excretar sodio', r: 'Al contrario: el sodio urinario está elevado; lo que no puede excretar es agua.' }
    ] }
],

'acido-base': [
  { n: 3, q: 'pH 7,39, PaCO₂ 24, HCO₃⁻ 14, Na 138, Cl 96, albúmina 2 g/dL, lactato 6. ¿Interpretación?',
    o: [
      { t: 'Gasometría normal: el pH está en rango', r: 'El pH normal esconde trastornos que se cancelan. Es exactamente por lo que se recorren los cuatro pasos.' },
      { t: 'Acidosis metabólica con anión gap alto MÁS alcalosis respiratoria', ok: true, r: 'Correcto: AG = 28 y corregido por albúmina ≈ 33. Winter predice PaCO₂ ≈ 29 y hay 24: hay alcalosis respiratoria añadida. Compensando al límite.' },
      { t: 'Acidosis respiratoria compensada', r: 'La PaCO₂ está baja, no alta: no hay acidosis respiratoria.' },
      { t: 'Acidosis metabólica con anión gap normal', r: 'El anión gap está muy elevado, y más aún al corregir por la hipoalbuminemia.' }
    ] },
  { n: 2, q: '¿Cómo se corrige el anión gap en un paciente crítico con albúmina de 2 g/dL?',
    o: [
      { t: 'No se corrige: el anión gap es independiente de la albúmina', r: 'La albúmina es el principal anión no medido: sin corregir se pasan por alto acidosis reales.' },
      { t: 'Sumando ~2,5 por cada g/dL de albúmina por debajo de 4', ok: true, r: 'Correcto: con albúmina de 2 se suman ~5 al anión gap calculado.' },
      { t: 'Restando 2,5 por cada g/dL por debajo de 4', r: 'El signo es el contrario: la hipoalbuminemia hace que el gap parezca menor de lo que es.' },
      { t: 'Multiplicando el gap por la albúmina medida', r: 'No existe tal corrección.' }
    ] }
],

'potasio': [
  { n: 3, q: 'Cetoacidosis diabética con potasio de 5,4 mEq/L. ¿Qué es correcto?',
    o: [
      { t: 'Tiene exceso de potasio: no reponer', r: 'Error con consecuencias inmediatas. La cifra plasmática esconde un déficit corporal enorme.' },
      { t: 'Tiene déficit corporal: el potasio se desploma al iniciar insulina', ok: true, r: 'Correcto: la falta de insulina y la acidosis lo sacaron de la célula mientras la diuresis osmótica lo eliminaba. Reponer al bajar de 5,2–5,5 y no iniciar insulina si K⁺ < 3,3.' },
      { t: 'El potasio plasmático refleja fielmente las reservas', r: 'Solo el 2 % del potasio corporal es extracelular.' },
      { t: 'Hay que administrar resinas quelantes antes de la insulina', r: 'Sería contraproducente: agravaría la hipopotasemia inminente.' }
    ] },
  { n: 2, q: 'Hipopotasemia que no se corrige pese a reposición adecuada. ¿Qué mides?',
    o: [
      { t: 'Calcio iónico', r: 'Relevante en otros contextos, pero no explica la refractariedad del potasio.' },
      { t: 'Magnesio', ok: true, r: 'Correcto: el magnesio bloquea los canales ROMK del colector; sin él, el potasio sigue fugándose por orina. Toda hipopotasemia refractaria es una hipomagnesemia hasta que se demuestre lo contrario.' },
      { t: 'Fósforo', r: 'Importante en la realimentación, pero no es la causa de refractariedad del potasio.' },
      { t: 'Cloro urinario', r: 'Útil para clasificar la alcalosis metabólica, no para esto.' }
    ] }
],

/* ==================== NEUROFISIOLOGÍA ==================== */

'potencial-membrana': [
  { n: 2, q: '¿Qué genera principalmente el potencial de reposo?',
    o: [
      { t: 'La actividad electrogénica directa de la bomba Na⁺/K⁺-ATPasa', r: 'Aporta solo unos −4 mV. La bomba fabrica el gradiente, no el voltaje.' },
      { t: 'La permeabilidad selectiva al potasio sobre el gradiente existente', ok: true, r: 'Correcto: el potencial tiende al equilibrio del ion más permeable, y en reposo la membrana es 50–100 veces más permeable al K⁺.' },
      { t: 'La entrada continua de calcio', r: 'El calcio no determina el potencial de reposo.' },
      { t: 'La carga negativa de las proteínas intracelulares', r: 'Contribuye marginalmente; el determinante es el gradiente de potasio.' }
    ] },
  { n: 3, q: 'Paciente con Guillain-Barré que requiere intubación. ¿Qué fármaco está contraindicado y por qué?',
    o: [
      { t: 'Rocuronio, por prolongación impredecible del bloqueo', r: 'Es de hecho la alternativa recomendada.' },
      { t: 'Succinilcolina, por liberación masiva de potasio', ok: true, r: 'Correcto: la denervación multiplica los receptores nicotínicos extrasinápticos; su despolarización masiva libera potasio y puede causar parada cardíaca.' },
      { t: 'Ketamina, por aumentar la presión intracraneal', r: 'Ese temor está muy matizado y no es la contraindicación de este caso.' },
      { t: 'Propofol, por depresión respiratoria', r: 'La depresión respiratoria es esperable y manejada con la propia intubación.' }
    ] }
],

'perfusion-cerebral': [
  { n: 3, q: 'Traumatismo craneal con PA 210/105, FC 48, respiración irregular y pupila derecha midriática. Un compañero quiere bajar la presión. ¿Qué respondes?',
    o: [
      { t: 'De acuerdo: esa presión es una emergencia hipertensiva', r: 'Interpretación equivocada y peligrosa: no es una crisis hipertensiva primaria.' },
      { t: 'Es un reflejo de Cushing: esa presión sostiene la perfusión cerebral', ok: true, r: 'Correcto. PPC = PAM − PIC. Bajar la PAM sin reducir la PIC estrangula la perfusión. Hay que tratar la presión intracraneal y operar.' },
      { t: 'La bradicardia indica bloqueo AV: poner marcapasos', r: 'La bradicardia es secundaria, mediada por el barorreflejo ante la hipertensión.' },
      { t: 'La midriasis es un efecto de los fármacos administrados', r: 'Es una midriasis por compresión del III par: signo de herniación uncal.' }
    ] },
  { n: 2, q: 'La hiperventilación baja la presión intracraneal. ¿Por qué no se mantiene?',
    o: [
      { t: 'Porque el paciente desarrolla tolerancia al CO₂ bajo', r: 'La formulación correcta es la normalización del pH del líquido cefalorraquídeo, no una «tolerancia».' },
      { t: 'Porque la vasoconstricción que la hace eficaz puede producir isquemia', ok: true, r: 'Correcto: baja la PIC reduciendo el volumen sanguíneo mediante vasoconstricción, y en un cerebro lesionado eso puede cruzar el umbral isquémico. Además el efecto se agota y su retirada brusca da rebote.' },
      { t: 'Porque aumenta el consumo metabólico cerebral', r: 'No es su efecto principal ni la razón de limitarla.' },
      { t: 'Porque produce alcalosis metabólica', r: 'Produce alcalosis respiratoria, y no es esa la razón de limitarla.' }
    ] }
],

/* ==================== FARMACOLOGÍA CRÍTICA ==================== */

'farmacocinetica-critico': [
  { n: 2, q: 'Paciente séptico con creatinina de 4 mg/dL. ¿Cómo dosificas el antibiótico?',
    o: [
      { t: 'Reducir tanto la dosis de carga como la de mantenimiento', r: 'Error frecuente y con consecuencias: retrasa la llegada a concentraciones eficaces en la fase más crítica.' },
      { t: 'Dosis de carga completa y ajustar solo el mantenimiento', ok: true, r: 'Correcto: la carga depende del VOLUMEN de distribución (aumentado en el crítico), el mantenimiento del ACLARAMIENTO (reducido).' },
      { t: 'Reducir la carga y mantener el mantenimiento habitual', r: 'Es exactamente al revés de lo correcto.' },
      { t: 'No modificar nada hasta tener niveles plasmáticos', r: 'Esperar niveles retrasa el tratamiento eficaz en una sepsis.' }
    ] },
  { n: 3, q: 'Varón de 28 años quemado y séptico, creatinina 0,5, sin respuesta a piperacilina-tazobactam a dosis estándar. ¿Qué sospechas?',
    o: [
      { t: 'Resistencia bacteriana al antibiótico elegido', r: 'Posible, pero antes hay que descartar un problema de exposición al fármaco.' },
      { t: 'Aclaramiento renal aumentado con volumen de distribución expandido', ok: true, r: 'Correcto: joven, hiperdinámico, quemado. La creatinina baja no tranquiliza, sugiere filtrado supranormal. Solución: carga completa e infusión extendida.' },
      { t: 'Insuficiencia renal oculta que impide la llegada del fármaco', r: 'La insuficiencia renal produciría acumulación, no infradosificación.' },
      { t: 'Interacción con la nutrición enteral', r: 'Relevante para fármacos orales, no para un betalactámico intravenoso.' }
    ] }
],

'vasoactivos': [
  { n: 2, q: '¿Por qué la noradrenalina mejora el gasto cardíaco además de la presión en el shock séptico?',
    o: [
      { t: 'Por su potente efecto β₁ inotrópico', r: 'Tiene algo de β₁, pero es modesto y no es el mecanismo principal.' },
      { t: 'Por venoconstricción: convierte volumen no estresado en estresado y eleva el retorno venoso', ok: true, r: 'Correcto: sube la presión sistémica media de llenado sin transfundir, amplía el gradiente de retorno y con él la precarga. Por eso se inicia precozmente.' },
      { t: 'Por vasodilatación coronaria selectiva', r: 'No es un efecto relevante de la noradrenalina.' },
      { t: 'Porque reduce la poscarga del ventrículo izquierdo', r: 'La aumenta: es un vasoconstrictor.' }
    ] },
  { n: 3, q: 'Shock cardiogénico por infarto extenso: frío, congestivo, hipotenso. Se sube la noradrenalina hasta normalizar la presión. ¿Qué objeción tienes?',
    o: [
      { t: 'Ninguna: normalizar la presión es siempre el objetivo', r: 'La cifra puede mejorar mientras el flujo empeora.' },
      { t: 'Aumenta la poscarga de un ventrículo cuya curva VS/poscarga es empinada', ok: true, r: 'Correcto: mejora el número y empeora el volumen sistólico. La estrategia es inotropía y reducción de carga, con la presión mínima que perfunda las coronarias.' },
      { t: 'La noradrenalina está contraindicada en el infarto', r: 'No lo está: tiene papel para sostener la presión de perfusión coronaria.' },
      { t: 'Produce bradicardia refleja peligrosa', r: 'Puede haber cierta bradicardia refleja, pero no es la objeción principal.' }
    ] },
  { n: 2, q: 'Tras iniciar adrenalina, el lactato sube de 3 a 5 mmol/L con perfusión periférica mejorada. ¿Qué haces?',
    o: [
      { t: 'Escalar el soporte: la reanimación está fracasando', r: 'Error frecuente: se trata un número que en este caso no significa hipoperfusión.' },
      { t: 'Reconocer que la adrenalina eleva el lactato por glucólisis aeróbica vía β₂', ok: true, r: 'Correcto: es un efecto metabólico. Se interpreta junto a la clínica y la tendencia, no de forma aislada.' },
      { t: 'Suspender la adrenalina de inmediato', r: 'No procede si la perfusión clínica mejora; se valora el conjunto.' },
      { t: 'Administrar bicarbonato para corregir el lactato', r: 'El bicarbonato no trata la producción de lactato ni está indicado de rutina.' }
    ] }
],

'sedoanalgesia': [
  { n: 2, q: 'Paciente crítico que se agita bruscamente de madrugada. ¿Cuál es la conducta correcta?',
    o: [
      { t: 'Aumentar la sedación para garantizar su seguridad', r: 'Enmascara la causa. Si era hipoxemia o hipoglucemia, se pierde la única señal disponible.' },
      { t: 'Buscar la causa: dolor, hipoxemia, hipercapnia, hipoglucemia, globo vesical, asincronía', ok: true, r: 'Correcto: la agitación es un síntoma, no un diagnóstico. Y se empieza siempre preguntando si hay dolor.' },
      { t: 'Administrar un neuroléptico de forma sistemática', r: 'Se reserva para la agitación que compromete la seguridad, tras descartar causas.' },
      { t: 'Aplicar sujeciones y reevaluar por la mañana', r: 'Las sujeciones aumentan el delirium y no tratan la causa.' }
    ] },
  { n: 3, q: 'Tras 6 días de midazolam en infusión con creatinina de 2,8, el paciente no despierta 24 h después de suspenderlo. ¿Explicación más probable?',
    o: [
      { t: 'Ictus isquémico durante el ingreso', r: 'Debe descartarse, pero la exploración sin focalidad y el contexto apuntan a otra causa.' },
      { t: 'Acumulación del fármaco y de su metabolito activo de eliminación renal', ok: true, r: 'Correcto: la vida media contexto-sensible se dispara tras días de infusión, y el alfa-hidroximidazolam glucurónido se acumula en el fracaso renal.' },
      { t: 'Muerte encefálica', r: 'Requiere descartar sedación residual antes de plantearse siquiera.' },
      { t: 'Encefalopatía hepática', r: 'Posible en otro contexto, pero aquí la causa farmacológica es mucho más probable.' }
    ] }
]

});

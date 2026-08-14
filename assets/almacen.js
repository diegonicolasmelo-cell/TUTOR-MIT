/* ============================================================
   ALMACÉN — capa de persistencia intercambiable
   ------------------------------------------------------------
   ÚNICO punto del código que toca el almacenamiento.
   - En navegador (mockup): localStorage.
   - En Apps Script: google.script.run → PropertiesService.
   Toda la API es asíncrona (promesas) para que la migración
   no exija cambiar ninguna vista.
   ============================================================ */

var Almacen = (function () {
  var CLAVE = 'tutor-mit-cardio-v1';

  var enAppsScript = (typeof google !== 'undefined' &&
    typeof google.script !== 'undefined' &&
    typeof google.script.run !== 'undefined');

  function estadoInicial() {
    return {
      version: 1,
      creado: new Date().toISOString(),
      ajustes: JSON.parse(JSON.stringify(TUTOR.AJUSTES_DEFECTO)),
      temas: {},
      tarjetas: {},
      sesiones: [],
      plan: {},
      brechas: [],
      racha: { ultimoDia: null, dias: 0, mejor: 0 }
    };
  }

  function fusionar(guardado) {
    var base = estadoInicial();
    if (!guardado) return base;
    Object.keys(base).forEach(function (k) {
      if (guardado[k] === undefined) guardado[k] = base[k];
    });
    Object.keys(base.ajustes).forEach(function (k) {
      if (guardado.ajustes[k] === undefined) guardado.ajustes[k] = base.ajustes[k];
    });
    return guardado;
  }

  function leerLocal() {
    try {
      var crudo = window.localStorage.getItem(CLAVE);
      return crudo ? JSON.parse(crudo) : null;
    } catch (e) {
      return null;
    }
  }

  function escribirLocal(estado) {
    try {
      window.localStorage.setItem(CLAVE, JSON.stringify(estado));
      return true;
    } catch (e) {
      return false;
    }
  }

  return {
    modo: enAppsScript ? 'appsscript' : 'local',

    /* Devuelve una promesa con el estado completo. */
    cargar: function () {
      return new Promise(function (resolver) {
        if (enAppsScript) {
          google.script.run
            .withSuccessHandler(function (json) {
              resolver(fusionar(json ? JSON.parse(json) : null));
            })
            .withFailureHandler(function () { resolver(estadoInicial()); })
            .leerEstado();
        } else {
          resolver(fusionar(leerLocal()));
        }
      });
    },

    /* Persiste el estado. Devuelve promesa. */
    guardar: function (estado) {
      return new Promise(function (resolver) {
        if (enAppsScript) {
          google.script.run
            .withSuccessHandler(function () { resolver(true); })
            .withFailureHandler(function () { resolver(false); })
            .guardarEstado(JSON.stringify(estado));
        } else {
          resolver(escribirLocal(estado));
        }
      });
    },

    reiniciar: function () {
      return this.guardar(estadoInicial());
    },

    inicial: estadoInicial
  };
})();


/* ============================================================
   ESTADO — modelo en memoria y reglas de negocio
   ============================================================ */

var Estado = (function () {
  var d = null;                 // datos
  var oyentes = [];
  var guardadoPendiente = null;

  function hoyISO(desplazamiento) {
    var f = new Date();
    if (desplazamiento) f.setDate(f.getDate() + desplazamiento);
    return f.toISOString().slice(0, 10);
  }

  function diasEntre(a, b) {
    return Math.round((new Date(b) - new Date(a)) / 86400000);
  }

  function notificar() {
    oyentes.forEach(function (fn) { fn(d); });
  }

  /* Guardado diferido para no escribir en cada tecla. */
  function persistir() {
    if (guardadoPendiente) clearTimeout(guardadoPendiente);
    guardadoPendiente = setTimeout(function () {
      Almacen.guardar(d);
    }, 400);
  }

  function temaEstado(id) {
    if (!d.temas[id]) {
      d.temas[id] = {
        dominio: 0, vistas: 0, minutos: 0, ultimo: null,
        aciertos: 0, intentos: 0, feynman: 0, casos: 0
      };
    }
    return d.temas[id];
  }

  function tarjetaEstado(id) {
    if (!d.tarjetas[id]) {
      d.tarjetas[id] = {
        facilidad: TUTOR.SRS.facilidadInicial,
        intervalo: 0,
        repeticiones: 0,
        lapsos: 0,
        vence: hoyISO(),
        ultimo: null,
        nueva: true
      };
    }
    return d.tarjetas[id];
  }

  return {
    /* ---------- ciclo de vida ---------- */
    iniciar: function () {
      return Almacen.cargar().then(function (cargado) {
        d = cargado;
        Estado.registrarDia();
        return d;
      });
    },

    datos: function () { return d; },
    ajustes: function () { return d.ajustes; },
    suscribir: function (fn) { oyentes.push(fn); },
    guardar: persistir,

    guardarAjustes: function (parciales) {
      Object.keys(parciales).forEach(function (k) { d.ajustes[k] = parciales[k]; });
      persistir();
      notificar();
    },

    /* ---------- racha ---------- */
    registrarDia: function () {
      var hoy = hoyISO();
      var r = d.racha;
      if (r.ultimoDia === hoy) return;
      if (r.ultimoDia === hoyISO(-1)) r.dias += 1;
      else if (r.ultimoDia !== null) r.dias = 1;
      else r.dias = 1;
      r.ultimoDia = hoy;
      if (r.dias > (r.mejor || 0)) r.mejor = r.dias;
      persistir();
    },

    /* ---------- temas ---------- */
    tema: temaEstado,

    dominio: function (id) {
      return d.temas[id] ? Math.round(d.temas[id].dominio) : 0;
    },

    /* El dominio combina precisión en preguntas, exposición y
       frescura: decae con el tiempo si no se repasa. */
    recalcularDominio: function (id) {
      var t = temaEstado(id);
      var precision = t.intentos > 0 ? (t.aciertos / t.intentos) : 0;
      var exposicion = Math.min(1, t.vistas / 3);
      var profundidad = Math.min(1, (t.feynman * 0.6 + t.casos * 0.4) / 2);
      var bruto = (precision * 55) + (exposicion * 25) + (profundidad * 20);

      // Decaimiento por olvido: −1,5 puntos por día sin repasar (tope 30).
      if (t.ultimo) {
        var dias = diasEntre(t.ultimo, hoyISO());
        bruto -= Math.min(30, Math.max(0, dias - 2) * 1.5);
      }
      t.dominio = Math.max(0, Math.min(100, bruto));
      return t.dominio;
    },

    dominioModulo: function (idModulo) {
      var temas = TUTOR.temasDe(idModulo);
      if (!temas.length) return 0;
      var suma = 0;
      temas.forEach(function (t) { suma += Estado.dominio(t.id); });
      return Math.round(suma / temas.length);
    },

    dominioArea: function (idArea) {
      var temas = TUTOR.temasDeArea(idArea);
      if (!temas.length) return 0;
      var suma = 0;
      temas.forEach(function (t) { suma += Estado.dominio(t.id); });
      return Math.round(suma / temas.length);
    },

    /* El dominio global solo cuenta las áreas activas: si Diego
       ha desactivado un área para concentrarse en un examen, no
       tiene sentido que su progreso se diluya con ella. */
    dominioGlobal: function () {
      var temas = Estado.temasActivos();
      if (!temas.length) return 0;
      var suma = 0;
      temas.forEach(function (t) { suma += Estado.dominio(t.id); });
      return Math.round(suma / temas.length);
    },

    /* ---------- áreas del conocimiento ---------- */
    areasActivas: function () {
      var a = d.ajustes.areasActivas;
      if (!a || !a.length) return TUTOR.AREAS.map(function (x) { return x.id; });
      return a;
    },

    areaActiva: function (idArea) {
      return Estado.areasActivas().indexOf(idArea) >= 0;
    },

    alternarArea: function (idArea) {
      var activas = Estado.areasActivas().slice();
      var i = activas.indexOf(idArea);
      if (i >= 0) {
        if (activas.length === 1) return false;   // nunca dejar el temario vacío
        activas.splice(i, 1);
      } else {
        activas.push(idArea);
      }
      d.ajustes.areasActivas = activas;
      persistir();
      notificar();
      return true;
    },

    /* Temas de las áreas actualmente activas. */
    temasActivos: function () {
      var activas = Estado.areasActivas();
      return TUTOR.TEMAS.filter(function (t) {
        return activas.indexOf(TUTOR.areaDeTema(t.id)) >= 0;
      });
    },

    registrarRespuesta: function (idTema, acierto) {
      var t = temaEstado(idTema);
      t.intentos += 1;
      if (acierto) t.aciertos += 1;
      t.ultimo = hoyISO();
      Estado.recalcularDominio(idTema);
      persistir();
    },

    registrarFase: function (idTema, fase) {
      var t = temaEstado(idTema);
      if (fase === 'feynman') t.feynman += 1;
      if (fase === 'caso') t.casos += 1;
      t.ultimo = hoyISO();
      Estado.recalcularDominio(idTema);
      persistir();
    },

    /* ---------- sesiones ---------- */
    cerrarSesion: function (resumen) {
      var t = temaEstado(resumen.tema);
      t.vistas += 1;
      t.minutos += resumen.minutos;
      t.ultimo = hoyISO();
      Estado.recalcularDominio(resumen.tema);
      resumen.fecha = new Date().toISOString();
      d.sesiones.unshift(resumen);
      if (d.sesiones.length > 300) d.sesiones.length = 300;
      Estado.registrarDia();
      Estado.marcarPlanHecho(resumen.tema);
      persistir();
      notificar();
    },

    sesionesDe: function (fechaISO) {
      return d.sesiones.filter(function (s) {
        return s.fecha && s.fecha.slice(0, 10) === fechaISO;
      });
    },

    minutosDe: function (fechaISO) {
      return Estado.sesionesDe(fechaISO).reduce(function (a, s) {
        return a + (s.minutos || 0);
      }, 0);
    },

    /* ---------- brechas conceptuales ---------- */
    anotarBrecha: function (idTema, texto) {
      d.brechas.unshift({
        tema: idTema, texto: texto,
        fecha: new Date().toISOString(), resuelta: false
      });
      if (d.brechas.length > 120) d.brechas.length = 120;
      persistir();
    },

    resolverBrecha: function (indice) {
      if (d.brechas[indice]) d.brechas[indice].resuelta = true;
      persistir();
      notificar();
    },

    brechasAbiertas: function () {
      return d.brechas.filter(function (b) { return !b.resuelta; });
    },

    /* ---------- tarjetas (SM-2 adaptado) ---------- */
    tarjeta: tarjetaEstado,

    tarjetasVencidas: function () {
      var hoy = hoyISO();
      var activas = Estado.areasActivas();
      var todas = TUTOR.todasLasTarjetas().filter(function (c) {
        return activas.indexOf(TUTOR.areaDeTema(c.tema)) >= 0;
      });
      var vencidas = [], nuevas = [];
      todas.forEach(function (c) {
        var e = d.tarjetas[c.id];
        if (!e) { nuevas.push(c); return; }
        if (e.vence <= hoy) vencidas.push(c);
      });
      var maxNuevas = d.ajustes.tarjetasNuevasDia;
      var limite = d.ajustes.maxTarjetasDia;
      var lote = vencidas.concat(nuevas.slice(0, maxNuevas));
      return lote.slice(0, limite);
    },

    tarjetasDeTema: function (idTema) {
      return TUTOR.todasLasTarjetas().filter(function (c) {
        return c.tema === idTema;
      });
    },

    /* grado: 1 = otra vez, 2 = difícil, 3 = bien, 4 = fácil */
    calificarTarjeta: function (idTarjeta, grado) {
      var s = TUTOR.SRS;
      var e = tarjetaEstado(idTarjeta);
      e.nueva = false;
      e.ultimo = hoyISO();

      if (grado === 1) {
        e.repeticiones = 0;
        e.lapsos += 1;
        e.intervalo = 0;
        e.facilidad = Math.max(s.facilidadMinima, e.facilidad - s.penalizacionFallo);
        e.vence = hoyISO();           // vuelve a aparecer hoy
      } else {
        e.repeticiones += 1;
        if (e.repeticiones === 1) e.intervalo = s.primerIntervalo;
        else if (e.repeticiones === 2) e.intervalo = s.segundoIntervalo;
        else {
          var mult = e.facilidad;
          if (grado === 2) mult = s.multiplicadorDificil;
          if (grado === 4) mult = e.facilidad * s.multiplicadorFacil;
          e.intervalo = Math.round(e.intervalo * mult);
        }
        if (grado === 2) e.facilidad = Math.max(s.facilidadMinima, e.facilidad - 0.15);
        if (grado === 4) e.facilidad = e.facilidad + 0.1;
        e.intervalo = Math.min(s.intervaloMaximo, Math.max(1, e.intervalo));
        e.vence = hoyISO(e.intervalo);
      }
      persistir();
      return e;
    },

    estadisticasTarjetas: function () {
      var activas = Estado.areasActivas();
      var todas = TUTOR.todasLasTarjetas().filter(function (c) {
        return activas.indexOf(TUTOR.areaDeTema(c.tema)) >= 0;
      });
      var hoy = hoyISO();
      var r = { total: todas.length, nuevas: 0, aprendiendo: 0, maduras: 0, vencenHoy: 0 };
      todas.forEach(function (c) {
        var e = d.tarjetas[c.id];
        if (!e) { r.nuevas += 1; return; }
        if (e.intervalo >= 21) r.maduras += 1; else r.aprendiendo += 1;
        if (e.vence <= hoy) r.vencenHoy += 1;
      });
      r.vencenHoy += Math.min(r.nuevas, d.ajustes.tarjetasNuevasDia);
      return r;
    },

    /* ---------- planificador ---------- */
    minutosDisponibles: function (fechaISO) {
      var dia = new Date(fechaISO + 'T12:00:00').getDay();
      return d.ajustes.minutosPorDia[dia] || 0;
    },

    plan: function () { return d.plan; },

    planDe: function (fechaISO) { return d.plan[fechaISO] || []; },

    marcarPlanHecho: function (idTema) {
      var hoy = hoyISO();
      (d.plan[hoy] || []).forEach(function (b) {
        if (b.tema === idTema && !b.hecho) b.hecho = true;
      });
    },

    /* Genera un plan de N días equilibrando temas nuevos,
       repasos vencidos y prioridad de alto rendimiento. */
    generarPlan: function (dias) {
      dias = dias || 14;
      var plan = {};

      /* Prioridad dentro de cada área: alto rendimiento primero y,
         a igualdad, menor dominio. */
      var porArea = {};
      Estado.temasActivos().forEach(function (t) {
        var area = TUTOR.areaDeTema(t.id);
        if (!porArea[area]) porArea[area] = [];
        porArea[area].push(t);
      });
      Object.keys(porArea).forEach(function (k) {
        porArea[k].sort(function (a, b) {
          if (a.alto !== b.alto) return a.alto ? -1 : 1;
          return Estado.dominio(a.id) - Estado.dominio(b.id);
        });
      });

      /* Intercalado entre áreas: alternar materias distintas retiene
         mejor que agotar una antes de pasar a la siguiente, porque
         obliga a discriminar en lugar de reconocer por contexto. */
      var pendientes = [];
      var areas = Object.keys(porArea);
      var quedan = true;
      for (var vuelta = 0; quedan; vuelta++) {
        quedan = false;
        for (var a = 0; a < areas.length; a++) {
          var lista = porArea[areas[a]];
          if (lista[vuelta]) { pendientes.push(lista[vuelta]); quedan = true; }
        }
      }
      if (!pendientes.length) { d.plan = {}; persistir(); return {}; }

      var cola = pendientes.slice();
      for (var i = 0; i < dias; i++) {
        var fecha = hoyISO(i);
        var disponibles = Estado.minutosDisponibles(fecha);
        if (disponibles <= 0) { plan[fecha] = []; continue; }

        var bloques = [];
        var restantes = disponibles;

        // Reserva fija para repaso espaciado si hay mazo activo.
        var stats = Estado.estadisticasTarjetas();
        if (stats.vencenHoy > 0 || i > 0) {
          var minRepaso = Math.min(10, Math.round(disponibles * 0.3));
          bloques.push({ tipo: 'repaso', tema: null, minutos: minRepaso, hecho: false });
          restantes -= minRepaso;
        }

        // Bloques de estudio con el tiempo restante.
        while (restantes >= 12 && cola.length) {
          var tema = cola.shift();
          var min = Math.min(restantes, tema.minutos || 20);
          bloques.push({ tipo: 'estudio', tema: tema.id, minutos: min, hecho: false });
          restantes -= min;
          if (cola.length === 0) cola = pendientes.slice();  // segunda vuelta = consolidación
        }
        plan[fecha] = bloques;
      }
      d.plan = plan;
      persistir();
      notificar();
      return plan;
    },

    /* Sugerencia de la próxima sesión según tiempo disponible hoy. */
    sugerencia: function () {
      var hoy = hoyISO();
      var bloques = Estado.planDe(hoy).filter(function (b) {
        return !b.hecho && b.tipo === 'estudio';
      });
      if (bloques.length) {
        return { tema: bloques[0].tema, minutos: bloques[0].minutos, origen: 'plan' };
      }
      var candidatos = Estado.temasActivos().sort(function (a, b) {
        if (a.alto !== b.alto) return a.alto ? -1 : 1;
        return Estado.dominio(a.id) - Estado.dominio(b.id);
      });
      if (!candidatos.length) candidatos = TUTOR.TEMAS.slice();
      return {
        tema: candidatos[0].id,
        minutos: Math.min(Estado.minutosDisponibles(hoy) || 25, 30),
        origen: 'sugerido'
      };
    },

    /* ---------- utilidades expuestas ---------- */
    hoyISO: hoyISO,
    diasEntre: diasEntre,

    exportar: function () { return JSON.stringify(d, null, 2); },

    importar: function (json) {
      try {
        var nuevo = JSON.parse(json);
        if (!nuevo || typeof nuevo !== 'object') return false;
        d = nuevo;
        persistir();
        notificar();
        return true;
      } catch (e) { return false; }
    },

    reiniciar: function () {
      d = Almacen.inicial();
      persistir();
      notificar();
    }
  };
})();

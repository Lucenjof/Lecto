document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const pantallaSeleccionNivel = document.getElementById('pantalla-seleccion-nivel');
    const pantallaActividad = document.getElementById('pantalla-actividad');
    const pantallaProgreso = document.getElementById('pantalla-progreso');
    const pantallaListaCuentos = document.getElementById('pantalla-lista-cuentos');
    const pantallaLeerCuento = document.getElementById('pantalla-leer-cuento');

    const botonesNivelesContainer = document.getElementById('botones-niveles-container');
    const btnIrACuentos = document.getElementById('btn-ir-a-cuentos');
    
    const btnVolverSeleccionDesdeActividad = document.getElementById('btn-volver-seleccion-desde-actividad');
    const tituloNivelActividad = document.getElementById('titulo-nivel-actividad');
    const instruccionActividad = document.getElementById('instruccion-actividad');
    const elementoAprender = document.getElementById('elemento-aprender');
    const btnEscucharElemento = document.getElementById('btn-escuchar-elemento');
    const opcionesRespuestaContainer = document.getElementById('opciones-respuesta');
    const btnAnterior = document.getElementById('btn-anterior');
    const btnSiguiente = document.getElementById('btn-siguiente');
    const feedbackUsuario = document.getElementById('feedback-usuario');
    const contadorElementos = document.getElementById('contador-elementos');

    // Elementos de Cuentos
    const btnVolverSeleccionDesdeListaCuentos = document.getElementById('btn-volver-seleccion-desde-lista-cuentos');
    const cuentosGridContainer = document.getElementById('cuentos-grid-container');
    const btnVolverAListaCuentos = document.getElementById('btn-volver-a-lista-cuentos');
    const tituloCuentoEl = document.getElementById('titulo-cuento');
    const textoCuentoContainer = document.getElementById('texto-cuento-container');
    const btnEscucharCuento = document.getElementById('btn-escuchar-cuento');

    // Elementos de Progreso
    const btnVerProgreso = document.getElementById('btn-ver-progreso');
    const btnCerrarProgreso = document.getElementById('btn-cerrar-progreso');
    const infoProgresoEl = document.getElementById('info-progreso');
    const btnResetearProgreso = document.getElementById('btn-resetear-progreso');
    
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    const synth = window.speechSynthesis;
    let vocesEspanol = [];

    function cargarVoces() {
        vocesEspanol = synth.getVoices().filter(voice => voice.lang.startsWith('es'));
        if (vocesEspanol.length > 0) {
             console.log("Voces en español disponibles:", vocesEspanol);
        } else if (synth.getVoices().length > 0) {
            console.warn("No se encontraron voces en español, se usará la predeterminada si existe.");
        }
    }
    cargarVoces();
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = cargarVoces;
    }

    function hablar(texto, callback) {
        if (synth.speaking) {
            synth.cancel(); 
        }
        if (texto) {
            const utterThis = new SpeechSynthesisUtterance(texto);
            utterThis.onerror = (event) => console.error('Error en SpeechSynthesis:', event);
            if (vocesEspanol.length > 0) {
                utterThis.voice = vocesEspanol.find(v => v.lang === 'es-ES' || v.lang === 'es-MX' || v.lang === 'es-AR') || vocesEspanol[0];
            }
            utterThis.pitch = 1;
            utterThis.rate = 0.85;
            if (callback) {
                utterThis.onend = callback;
            }
            synth.speak(utterThis);
        } else if (callback) {
            callback(); // Llama al callback incluso si no hay texto, para flujos consistentes
        }
    }

    // Datos de la aplicación
    const datosApp = {
        niveles: [
            {
                id: 1,
                nombre: "Vocales y M, P, S, L",
                tipoContenido: "letras_silabas_palabras",
                letras: ['a', 'e', 'i', 'o', 'u', 'm', 'p', 's', 'l'],
                silabasBase: { 
                    'm': ['ma', 'me', 'mi', 'mo', 'mu'],
                    'p': ['pa', 'pe', 'pi', 'po', 'pu'],
                    's': ['sa', 'se', 'si', 'so', 'su'],
                    'l': ['la', 'le', 'li', 'lo', 'lu'],
                },
                palabras: [
                    'ala', 'ola', 'oso', 'usa', 'uña', 'sol', 'sal', 'ser', 'seis', 'mes', 'mil',
                    'mamá', 'papá', 'mami', 'pipa', 'mapa', 'mesa', 'misa', 'mula', 'mimo', 
                    'puma', 'piso', 'pala', 'pupa', 'pomo', 'polo', 'pila', 'pelo',
                    'sapo', 'sopa', 'susi', 'suma', 'sola', 'sala', 'sello', 'silo', 
                    'lupa', 'loma', 'lima', 'lila', 'lata', 'loro', 'luna', 'lana', 'leal', 'losa',
                    'museo', 'paseo', 'amasa', 'asoma', 'emúes', 'pulpo', 'paloma', 'pomelo', 'pásame'
                ]
            },
            {
                id: 2,
                nombre: "Letras T, N, D, F",
                tipoContenido: "letras_silabas_palabras",
                letras: ['t', 'n', 'd', 'f'],
                silabasBase: {
                    't': ['ta', 'te', 'ti', 'to', 'tu'],
                    'n': ['na', 'ne', 'ni', 'no', 'nu'],
                    'd': ['da', 'de', 'di', 'do', 'du'],
                    'f': ['fa', 'fe', 'fi', 'fo', 'fu'],
                },
                palabras: [
                    'tapa', 'tela', 'tito', 'toma', 'tuna', 'tren', 'pato', 'lata', 'meta', 'moto', 'siete', 'pasta',
                    'nada', 'nene', 'nido', 'nota', 'nube', 'nuez', 'pan', 'mano', 'mono', 'luna', 'pino', 'antes',
                    'dado', 'dedo', 'dime', 'dona', 'ducha', 'duende', 'onda', 'nido', 'moda', 'pedal', 'saludo', 'pomada',
                    'foca', 'feo', 'fila', 'foto', 'fuma', 'fiel', 'faro', 'sofá', 'café', 'rifa', 'elefante', 'familia',
                    'dedal', 'nudo', 'falda', 'delta', 'diente', 'fuente', 'fantasma', 'fiesta', 'final', 'delantal'
                ]
            },
            {
                id: 3,
                nombre: "R (suave/fuerte), C (ca,co,cu), Q (que,qui), B, V, G (ga,go,gu,gue,gui), H",
                tipoContenido: "letras_silabas_palabras",
                letras: ['r', 'rr', 'c', 'qu', 'b', 'v', 'g', 'h'],
                silabasBase: {
                    'r_suave': ['ara', 'era', 'ira', 'ora', 'ura', 'ar', 'er', 'ir', 'or', 'ur'], // r suave y finales
                    'rr_fuerte': ['rra', 'rre', 'rri', 'rro', 'rru', 'ra', 're', 'ri', 'ro', 'ru'], // r fuerte inicio y rr
                    'c_fuerte': ['ca', 'co', 'cu'],
                    'qu': ['que', 'qui'],
                    'b': ['ba', 'be', 'bi', 'bo', 'bu'],
                    'v': ['va', 've', 'vi', 'vo', 'vu'],
                    'g_fuerte': ['ga', 'go', 'gu'],
                    'g_suave': ['gue', 'gui'],
                    'h': ['ha', 'he', 'hi', 'ho', 'hu'] // muda
                },
                palabras: [
                    'pera', 'aro', 'mira', 'loro', 'mar', 'torre', 'carro', 'perro', 'barro', 'burro', 'arroz', 'rata', 'río', 'rosa',
                    'casa', 'copa', 'cuna', 'pico', 'saco', 'escudo', 'cometa', 'cuento',
                    'queso', 'quema', 'quinto', 'paquete', 'máquina', 'equipo',
                    'barco', 'bebé', 'bota', 'nube', 'lobo', 'abuelo', 'balón', 'beso',
                    'vaso', 'vela', 'vino', 'ave', 'nave', 'nuevo', 'avispa', 'invierno',
                    'gato', 'gota', 'gusano', 'lago', 'mango', 'amigo', 'agua', 'regalo',
                    'guerra', 'guitarra', 'merengue', 'guiso', 'águila', 'juguete',
                    'hada', 'hilo', 'hacha', 'huevo', 'humo', 'hiena', 'ahora', 'búho', 'cohete',
                    'corbata', 'hormiga', 'verdura', 'guitarra', 'biblioteca', 'caracol'
                ]
            }
        ],
        cuentos: [
            { 
                id: 1, titulo: "El Sol Amigo", nivelRecomendado: 1, 
                texto: "El sol sale. El sol es mi amigo. Mamá ama el sol. Papá ama el sol. El sol da luz. El sol da calor. ¡Viva el sol!" 
            },
            { 
                id: 2, titulo: "Mi Pato Tito", nivelRecomendado: 2, 
                texto: "Este es mi pato. Mi pato se llama Tito. Tito es amarillo. Tito nada en el lago. Tito dice: ¡cuac, cuac! Yo quiero a Tito." 
            },
            { 
                id: 3, titulo: "La Foca Felisa", nivelRecomendado: 2, 
                texto: "Felisa es una foca. Felisa vive en el mar. A Felisa le gusta jugar con la pelota. La pelota es roja. Felisa aplaude con sus aletas. ¡Bravo, Felisa!" 
            },
            {
                id: 4, titulo: "El Gato Gastón", nivelRecomendado: 3,
                texto: "Gastón es un gato grande y gordo. A Gastón le gusta dormir en el sofá. También le gusta comer pescado. Cuando Gastón quiere jugar, persigue una bola de lana. Hugo juega con Gastón. ¡Son buenos amigos!"
            },
            {
                id: 5, titulo: "Aventura en el Bosque", nivelRecomendado: 3,
                texto: "Un día, Vera y Bruno fueron al bosque. Vieron un conejo con orejas largas. El conejo comía hierba. También escucharon el canto de un pájaro en un árbol alto. El bosque es un lugar mágico y lleno de vida."
            }
        ]
    };

    let nivelActualId = null;
    let indiceElementoActual = 0;
    let elementosDelNivel = [];
    let progreso = { nivelesCompletados: [] }; 

    function mostrarPantalla(idPantalla) {
        [pantallaSeleccionNivel, pantallaActividad, pantallaProgreso, pantallaListaCuentos, pantallaLeerCuento].forEach(p => p.classList.remove('activa'));
        document.getElementById(idPantalla).classList.add('activa');
    }

    function cargarBotonesNiveles() {
        botonesNivelesContainer.innerHTML = '';
        datosApp.niveles.forEach(nivel => {
            const btnNivel = document.createElement('button');
            btnNivel.className = 'btn-nivel';
            
            let nombreNivelDisplay = `Nivel ${nivel.id}`;
            if (nivel.nombre.length < 25) { // Evitar nombres demasiado largos en el botón
                nombreNivelDisplay += `: ${nivel.nombre}`;
            } else {
                 nombreNivelDisplay += `: ${nivel.nombre.substring(0,22)}...`;
            }
            btnNivel.innerHTML = nombreNivelDisplay;

            btnNivel.dataset.nivelId = nivel.id;

            const esDesbloqueado = nivel.id === 1 || progreso.nivelesCompletados.includes(nivel.id - 1);
            if (!esDesbloqueado) {
                btnNivel.classList.add('bloqueado');
                btnNivel.innerHTML += ' <i class="fas fa-lock"></i>';
                btnNivel.disabled = true;
            } else {
                 btnNivel.innerHTML += ' <i class="fas fa-play-circle"></i>';
            }
            
            if (progreso.nivelesCompletados.includes(nivel.id)) {
                 btnNivel.innerHTML += ' <i class="fas fa-check-circle" style="color:lightgreen; margin-left:5px;"></i>';
            }

            btnNivel.addEventListener('click', () => iniciarNivel(nivel.id));
            botonesNivelesContainer.appendChild(btnNivel);
        });
    }

    function iniciarNivel(idNivel) {
        const nivel = datosApp.niveles.find(n => n.id === idNivel);
        if (!nivel) return;

        const esDesbloqueado = nivel.id === 1 || progreso.nivelesCompletados.includes(nivel.id - 1);
        if (!esDesbloqueado) {
            alert("Debes completar el nivel anterior primero.");
            return;
        }

        nivelActualId = idNivel;
        tituloNivelActividad.textContent = `Nivel ${nivel.id}: ${nivel.nombre}`;
        elementosDelNivel = [];

        if (nivel.letras) elementosDelNivel.push(...nivel.letras.map(l => ({tipo: 'letra', valor: l}) ));
        if (nivel.silabasBase) {
            for (const cons in nivel.silabasBase) {
                elementosDelNivel.push(...nivel.silabasBase[cons].map(s => ({tipo: 'sílaba', valor: s}) ));
            }
        }
        if (nivel.palabras) elementosDelNivel.push(...nivel.palabras.map(p => ({tipo: 'palabra', valor: p}) ));
        
        elementosDelNivel.sort(() => Math.random() - 0.5);

        indiceElementoActual = 0;
        mostrarElementoActual();
        mostrarPantalla('pantalla-actividad');
    }

    function mostrarElementoActual() {
        if (elementosDelNivel.length === 0 || indiceElementoActual >= elementosDelNivel.length) {
            feedbackUsuario.textContent = "¡Felicidades! Has completado todos los elementos de este nivel.";
            feedbackUsuario.className = 'acierto';
            hablar(feedbackUsuario.textContent);
            if (!progreso.nivelesCompletados.includes(nivelActualId)) {
                progreso.nivelesCompletados.push(nivelActualId);
                guardarProgreso();
            }
            btnSiguiente.textContent = "Volver a Niveles";
            btnSiguiente.onclick = () => {
                cargarBotonesNiveles();
                mostrarPantalla('pantalla-seleccion-nivel');
                btnSiguiente.textContent = "Siguiente";
                btnSiguiente.onclick = manejarSiguiente;
            };
            btnAnterior.disabled = true; // Deshabilitar anterior al final
            return;
        }

        const elemento = elementosDelNivel[indiceElementoActual];
        elementoAprender.textContent = elemento.valor;
        // instruccionActividad.textContent = `Aprende esta ${elemento.tipo}:`; // Podría ser muy repetitivo
        instruccionActividad.textContent = "Mira y escucha:";
        opcionesRespuestaContainer.innerHTML = ''; 
        feedbackUsuario.textContent = '';
        btnEscucharElemento.disabled = false;

        /*hablar(elemento.valor); */

        contadorElementos.textContent = `${indiceElementoActual + 1} / ${elementosDelNivel.length}`;
        btnAnterior.disabled = indiceElementoActual === 0;

        if (indiceElementoActual >= elementosDelNivel.length -1 && progreso.nivelesCompletados.includes(nivelActualId)) {
            btnSiguiente.textContent = "Volver a Niveles";
            btnSiguiente.onclick = () => {
                cargarBotonesNiveles();
                mostrarPantalla('pantalla-seleccion-nivel');
                btnSiguiente.textContent = "Siguiente";
                btnSiguiente.onclick = manejarSiguiente;
            };
        } else {
            btnSiguiente.textContent = "Siguiente";
            btnSiguiente.onclick = manejarSiguiente;
            btnSiguiente.disabled = false;
        }
    }

    function manejarSiguiente() {
        if (indiceElementoActual < elementosDelNivel.length -1) {
            indiceElementoActual++;
            mostrarElementoActual();
        } else if (indiceElementoActual >= elementosDelNivel.length -1) {
             feedbackUsuario.textContent = "¡Felicidades! Has llegado al final de este nivel.";
             feedbackUsuario.className = 'acierto';
             hablar(feedbackUsuario.textContent);
             if (!progreso.nivelesCompletados.includes(nivelActualId)) {
                 progreso.nivelesCompletados.push(nivelActualId);
                 guardarProgreso();
                 cargarBotonesNiveles(); 
             }
             btnSiguiente.textContent = "Volver a Niveles";
             btnSiguiente.onclick = () => {
                 mostrarPantalla('pantalla-seleccion-nivel');
                 btnSiguiente.textContent = "Siguiente"; 
                 btnSiguiente.onclick = manejarSiguiente; 
             };
        }
    }

    function manejarAnterior() {
        if (indiceElementoActual > 0) {
            indiceElementoActual--;
            mostrarElementoActual();
            if (btnSiguiente.textContent !== "Siguiente") {
                 btnSiguiente.textContent = "Siguiente";
                 btnSiguiente.onclick = manejarSiguiente;
            }
        }
    }

    btnEscucharElemento.addEventListener('click', () => {
        const texto = elementoAprender.textContent;
        if (texto) hablar(texto);
    });

    btnSiguiente.addEventListener('click', manejarSiguiente);
    btnAnterior.addEventListener('click', manejarAnterior);
    btnVolverSeleccionDesdeActividad.addEventListener('click', () => {
        cargarBotonesNiveles();
        mostrarPantalla('pantalla-seleccion-nivel');
    });

    // --- LÓGICA DE CUENTOS ---
    function cargarListaCuentos() {
        cuentosGridContainer.innerHTML = '';
        datosApp.cuentos.forEach(cuento => {
            const btnCuento = document.createElement('button');
            btnCuento.className = 'btn-cuento';
            btnCuento.innerHTML = `
                <span class="cuento-titulo">${cuento.titulo}</span>
                <span class="cuento-nivel-recomendado">Nivel recomendado: ${cuento.nivelRecomendado}+</span>
            `;
            // Desbloquear cuentos según progreso (opcional, por ahora todos visibles)
            // const desbloqueado = progreso.nivelesCompletados.includes(cuento.nivelRecomendado -1) || cuento.nivelRecomendado === 1;
            // if (!desbloqueado) { btnCuento.disabled = true; btnCuento.style.opacity = "0.5"; }

            btnCuento.addEventListener('click', () => mostrarCuento(cuento.id));
            cuentosGridContainer.appendChild(btnCuento);
        });
        mostrarPantalla('pantalla-lista-cuentos');
    }

    function mostrarCuento(idCuento) {
        const cuento = datosApp.cuentos.find(c => c.id === idCuento);
        if (!cuento) return;

        tituloCuentoEl.textContent = cuento.titulo;
        textoCuentoContainer.innerHTML = ''; // Limpiar
        // Dividir el texto en párrafos si hay saltos de línea, o tratarlo como un solo bloque
        const parrafos = cuento.texto.split('\n').filter(p => p.trim() !== '');
        parrafos.forEach(pText => {
            const pElem = document.createElement('p');
            pElem.textContent = pText;
            textoCuentoContainer.appendChild(pElem);
        });
        
        mostrarPantalla('pantalla-leer-cuento');
        // Hablar el título al mostrar el cuento
        hablar(`Cuento: ${cuento.titulo}.`);
    }

    btnIrACuentos.addEventListener('click', cargarListaCuentos);
    btnVolverSeleccionDesdeListaCuentos.addEventListener('click', () => mostrarPantalla('pantalla-seleccion-nivel'));
    btnVolverAListaCuentos.addEventListener('click', cargarListaCuentos);
    btnEscucharCuento.addEventListener('click', () => {
        const cuento = datosApp.cuentos.find(c => c.titulo === tituloCuentoEl.textContent);
        if (cuento) hablar(cuento.texto);
    });


    // --- PROGRESO ---
    function guardarProgreso() {
        localStorage.setItem('progresoLeoLeoPalabras', JSON.stringify(progreso));
    }

    function cargarProgreso() {
        const guardado = localStorage.getItem('progresoLeoLeoPalabras');
        if (guardado) {
            progreso = JSON.parse(guardado);
        } else {
            progreso = { nivelesCompletados: [] };
        }
    }

    function mostrarDatosProgreso() {
        infoProgresoEl.innerHTML = ''; 
        if (progreso.nivelesCompletados.length === 0) {
            infoProgresoEl.innerHTML = "<p>Aún no has completado ningún nivel.</p>";
        } else {
            const p = document.createElement('p');
            p.textContent = `Niveles completados: ${progreso.nivelesCompletados.map(id => `Nivel ${id}`).join(', ')}.`;
            infoProgresoEl.appendChild(p);
        }
    }

    btnVerProgreso.addEventListener('click', () => {
        mostrarDatosProgreso();
        mostrarPantalla('pantalla-progreso');
    });
    btnCerrarProgreso.addEventListener('click', () => mostrarPantalla('pantalla-seleccion-nivel'));
    btnResetearProgreso.addEventListener('click', () => {
        if (confirm("¿Estás seguro de que quieres borrar todo tu progreso? Esta acción no se puede deshacer.")) {
            progreso = { nivelesCompletados: [] };
            guardarProgreso();
            mostrarDatosProgreso(); 
            cargarBotonesNiveles(); 
            alert("Progreso reseteado.");
        }
    });

    // --- INICIALIZACIÓN DE LA APP ---
    cargarProgreso();
    cargarBotonesNiveles();
    mostrarPantalla('pantalla-seleccion-nivel');
});
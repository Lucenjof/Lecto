document.addEventListener('DOMContentLoaded', () => {
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
    const btnCursiva = document.getElementById('btn-cursiva'); // Botón Cursiva
    const btnAnterior = document.getElementById('btn-anterior');
    const btnSiguiente = document.getElementById('btn-siguiente');
    const feedbackUsuario = document.getElementById('feedback-usuario');
    const contadorElementos = document.getElementById('contador-elementos');

    const imgPersonajeFeedback = document.getElementById('img-personaje-feedback');

    const btnVolverSeleccionDesdeListaCuentos = document.getElementById('btn-volver-seleccion-desde-lista-cuentos');
    const cuentosGridContainer = document.getElementById('cuentos-grid-container');
    const btnVolverAListaCuentos = document.getElementById('btn-volver-a-lista-cuentos');
    const tituloCuentoEl = document.getElementById('titulo-cuento');
    const textoCuentoContainer = document.getElementById('texto-cuento-container');
    const btnEscucharCuento = document.getElementById('btn-escuchar-cuento');

    const btnVerProgreso = document.getElementById('btn-ver-progreso');
    const btnCerrarProgreso = document.getElementById('btn-cerrar-progreso');
    const infoProgresoEl = document.getElementById('info-progreso');
    const btnResetearProgreso = document.getElementById('btn-resetear-progreso');

    document.getElementById('currentYear').textContent = new Date().getFullYear();

    const synth = window.speechSynthesis;
    let vocesEspanol = [];
    let elementoCursivaActiva = false; // Estado inicial: no cursiva

    const IMAGEN_BUHO_FELIZ = 'img/leo_búho_feliz.png';
    const IMAGEN_BUHO_PENSATIVO = 'img/leo_búho_pensativo.png';
    const IMAGEN_BUHO_NORMAL = 'img/leo_búho_asomado.png';

    function cargarVoces() {
        vocesEspanol = synth.getVoices().filter(voice => voice.lang.startsWith('es'));
        console.log("--- Voces del Sintetizador Disponibles ---");
        synth.getVoices().forEach(voice => {
            console.log(`Nombre: "${voice.name}", Idioma: ${voice.lang}, Default: ${voice.default}`);
        });
        console.log("------------------------------------------");
        if (vocesEspanol.length > 0) {
             console.log("Voces en español detectadas:", vocesEspanol.map(v => ({name: v.name, lang: v.lang})));
        } else if (synth.getVoices().length > 0) {
            console.warn("No se encontraron voces específicas en español.");
        } else {
            console.warn("Aún no se han cargado las voces del sintetizador.");
        }
    }
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = cargarVoces;
    }
    cargarVoces();

    function hablar(texto, callback) {
        if (synth.speaking) {
            synth.cancel();
        }
        if (texto) {
            const utterThis = new SpeechSynthesisUtterance(texto);
            utterThis.onerror = (event) => console.error('Error en SpeechSynthesis:', event);
            if (vocesEspanol.length > 0) {
                const nombreVozDeseada = "Google español"; // EJEMPLO
                let vozSeleccionada = vocesEspanol.find(voice => voice.name === nombreVozDeseada);
                if (vozSeleccionada) {
                    utterThis.voice = vozSeleccionada;
                } else {
                    utterThis.voice = vocesEspanol.find(v => v.lang === 'es-AR' || v.lang === 'es-ES' || v.lang === 'es-MX' || v.lang === 'es-US') || vocesEspanol[0];
                }
                console.log("Usando voz:", utterThis.voice ? utterThis.voice.name : "Voz predeterminada");
            } else {
                console.warn("No hay voces en español configuradas. Usando voz predeterminada del navegador.");
            }
            utterThis.pitch = 1;
            utterThis.rate = 0.85;
            if (callback) {
                utterThis.onend = callback;
            }
            synth.speak(utterThis);
        } else if (callback) {
            callback();
        }
    }

    const datosApp = {
        niveles: [
            {
                id: 1,
                nombre: "Vocales y M, P, S, L", // Sin cambios, base sólida
                letras: ['a', 'e', 'i', 'o', 'u', 'm', 'p', 's', 'l'],
                silabasBase: {
                    'm': ['ma', 'me', 'mi', 'mo', 'mu'], 'p': ['pa', 'pe', 'pi', 'po', 'pu'],
                    's': ['sa', 'se', 'si', 'so', 'su'], 'l': ['la', 'le', 'li', 'lo', 'lu'],
                },
                palabras: [
                    'ala', 'ola', 'oso', 'usa', 'uña', 'sol', 'sal', 'ser', 'seis', 'mes', 'mil',
                    'mamá', 'papá', 'mami', 'pipa', 'mapa', 'mesa', 'misa', 'mula', 'mimo',
                    'puma', 'piso', 'pala', 'pupa', 'pomo', 'polo', 'pila', 'pelo',
                    'sapo', 'sopa', 'susi', 'suma', 'sola', 'sala', 'sello', 'silo',
                    'lupa', 'loma', 'lima', 'lila', 'lata', 'loro', 'luna', 'lana', 'leal', 'losa',
                    'museo', 'paseo', 'amasa', 'asoma', 'emúes', 'pulpo', 'paloma', 'pomelo', 'pásame',
                    'mala', 'pala', 'sala', 'lasa', 'masa', 'mima', 'mopa', 'loma', 'lomo', 'malo',
                    'pomo', 'puma', 'pisa', 'pesa', 'paso', 'sapo', 'sopa', 'suma', 'musa', 'liso'
                ]
            },
            {
                id: 2,
                nombre: "Letras T, N, D, F", // Sin cambios, base sólida
                letras: ['t', 'n', 'd', 'f'],
                silabasBase: {
                    't': ['ta', 'te', 'ti', 'to', 'tu'], 'n': ['na', 'ne', 'ni', 'no', 'nu'],
                    'd': ['da', 'de', 'di', 'do', 'du'], 'f': ['fa', 'fe', 'fi', 'fo', 'fu'],
                },
                palabras: [
                    'tapa', 'tela', 'tito', 'toma', 'tuna', 'tren', 'pato', 'lata', 'meta', 'moto', 'siete', 'pasta',
                    'nada', 'nene', 'nido', 'nota', 'nube', 'nuez', 'pan', 'mano', 'mono', 'luna', 'pino', 'antes',
                    'dado', 'dedo', 'dime', 'dona', 'ducha', 'duende', 'onda', 'nido', 'moda', 'pedal', 'saludo', 'pomada',
                    'foca', 'feo', 'fila', 'foto', 'fuma', 'fiel', 'faro', 'sofá', 'café', 'rifa', 'elefante', 'familia',
                    'dedal', 'nudo', 'falda', 'delta', 'diente', 'fuente', 'fantasma', 'fiesta', 'final', 'delantal',
                    'tina', 'tema', 'tipo', 'todo', 'tú', 'nota', 'nena', 'fino', 'feto', 'foto',
                    'dama', 'dime', 'duro', 'dedal', 'nudo', 'nana', 'nata', 'sotana', 'patata', 'tomate',
                    'fantasma', 'fiesta', 'final', 'falda', 'fideo', 'fama', 'fila', 'fin', 'feto'
                ]
            },
            {
                id: 3, // Nivel 3 existente, lo mantenemos y ajustamos si es necesario.
                nombre: "R, C fuerte, Q, B, V, G, H",
                letras: ['r', 'rr', 'c', 'qu', 'b', 'v', 'g', 'h'], // rr como concepto, aunque se forma con r.
                silabasBase: {
                    'r_suave': ['ara', 'era', 'ira', 'ora', 'ura'], // r suave intervocálica
                    'r_fuerte_inicio': ['ra', 're', 'ri', 'ro', 'ru'], // r fuerte al inicio
                    'rr_fuerte': ['rra', 'rre', 'rri', 'rro', 'rru'], // rr intervocálica
                    'c_fuerte': ['ca', 'co', 'cu'],
                    'qu': ['que', 'qui'],
                    'b': ['ba', 'be', 'bi', 'bo', 'bu'],
                    'v': ['va', 've', 'vi', 'vo', 'vu'],
                    'g_fuerte': ['ga', 'go', 'gu'],
                    'g_suave_u': ['gue', 'gui'], // g suave con u intermedia
                    'h': ['ha', 'he', 'hi', 'ho', 'hu'] // h muda
                },
                palabras: [
                    'pera', 'aro', 'mira', 'loro', 'mariposa', 'arena', 'tesoro', 'faro', 'caro',
                    'rata', 'río', 'rosa', 'roto', 'rueda', 'remo', 'regla', 'ropa',
                    'torre', 'carro', 'perro', 'barro', 'burro', 'arroz', 'guitarra', 'correr',
                    'casa', 'copa', 'cuna', 'pico', 'saco', 'escudo', 'cometa', 'cuento', 'camisa', 'color',
                    'queso', 'quema', 'quinto', 'paquete', 'máquina', 'equipo', 'raqueta', 'bosque',
                    'barco', 'bebé', 'bota', 'nube', 'lobo', 'abuelo', 'balón', 'beso', 'bueno', 'bonita',
                    'vaso', 'vela', 'vino', 'ave', 'nave', 'nuevo', 'avispa', 'invierno', 'viaje', 'ventana',
                    'gato', 'gota', 'gusano', 'lago', 'mango', 'amigo', 'agua', 'regalo', 'goma', 'gorra',
                    'guerra', 'guiso', 'águila', 'juguete', 'merengue', 'seguir', 'hoguera',
                    'hada', 'hilo', 'hacha', 'huevo', 'humo', 'hiena', 'ahora', 'búho', 'cohete', 'zanahoria',
                    'corbata', 'hormiga', 'verdura', 'biblioteca', 'caracol', 'bombero', 'habitante'
                ]
            },
            // --- NUEVOS NIVELES ---
            {
                id: 4,
                nombre: "Dígrafos CH, LL, Ñ y Sonidos CE, CI, ZA, ZO, ZU, Y",
                letras: ['ch', 'll', 'ñ', 'c', 'z', 'y'], // 'c' y 'z' por sus sonidos específicos
                silabasBase: {
                    'ch': ['cha', 'che', 'chi', 'cho', 'chu'],
                    'll': ['lla', 'lle', 'lli', 'llo', 'llu'],
                    'ñ': ['ña', 'ñe', 'ñi', 'ño', 'ñu'],
                    'c_suave': ['ce', 'ci'],
                    'z_sonido': ['za', 'zo', 'zu'], // ze y zi se escriben con c
                    'y_consonante': ['ya', 'ye', 'yi', 'yo', 'yu'],
                },
                palabras: [
                    'chapa', 'cheque', 'chile', 'chocolate', 'churro', 'noche', 'mucho', 'coche', 'leche', 'hacha',
                    'llave', 'calle', 'pollo', 'silla', 'botella', 'lluvia', 'lleno', 'bello', 'toalla',
                    'piña', 'niño', 'año', 'leña', 'sueño', 'montaña', 'pañuelo', 'araña', 'otoño',
                    'cena', 'cine', 'doce', 'circo', 'cielo', 'dulce', 'vecino', 'aceite', 'gracias',
                    'zapato', 'zorro', 'zumo', 'taza', 'pozo', 'lazo', 'cabeza', 'corazón', 'azul', 'lápiz',
                    'yate', 'yema', 'yoga', 'payaso', 'rayo', 'ayuda', 'desayuno', 'mayor', 'joya',
                    'ley', 'rey', 'muy', 'hoy', 'buey', // y como vocal al final
                    'chupete', 'mochila', 'chaleco', 'gallina', 'caballo', 'castillo', 'mañana', 'pequeño',
                    'cereza', 'cocina', 'cien', 'zoo', 'nariz', 'feliz', 'yogur', 'yeso'
                ]
            },
            {
                id: 5,
                nombre: "Sílabas Inversas (vocal + consonante)",
                letras: [], // Se usan las consonantes ya aprendidas
                silabasBase: { // Aquí 'silabasBase' representa ejemplos de inversas, no para generar
                    'inversas_s': ['as', 'es', 'is', 'os', 'us'],
                    'inversas_l': ['al', 'el', 'il', 'ol', 'ul'],
                    'inversas_n': ['an', 'en', 'in', 'on', 'un'],
                    'inversas_r': ['ar', 'er', 'ir', 'or', 'ur'],
                    'inversas_m': ['am', 'em', 'im', 'om', 'um'], // Menos comunes al inicio pero existen
                    'inversas_p': ['ap', 'ep', 'ip', 'op', 'up'], // Raras al inicio, más en medio
                },
                palabras: [
                    'espejo', 'escoba', 'isla', 'astronauta', 'estufa', 'óscar', 'autobús', 'escalera',
                    'alma', 'alto', 'olmo', 'último', 'papel', 'barril', 'mantel', 'pastel', 'fácil',
                    'antes', 'elefante', 'indio', 'contar', 'mundo', 'canción', 'pintor', 'jardín', 'botón',
                    'árbol', 'comer', 'sentir', 'doctor', 'urna', 'carta', 'puerta', 'circo', 'actor',
                    'campo', 'imperio', 'tiempo', 'bomba', 'trompa', 'hombro', 'cumpleaños',
                    'apto', 'óptica', 'Egipto', 'concepto',
                    'espada', 'espuma', 'actor', 'pastel', 'tambor', 'computadora', 'lámpara', 'importante'
                ]
            },
            {
                id: 6,
                nombre: "Sílabas Trabadas (Grupos Consonánticos)",
                letras: [], // Se usan las consonantes ya aprendidas
                silabasBase: { // Ejemplos de sílabas trabadas
                    'trabadas_l': ['bla', 'ble', 'bli', 'blo', 'blu', 'cla', 'cle', 'cli', 'clo', 'clu', 'fla', 'fle', 'fli', 'flo', 'flu', 'gla', 'gle', 'gli', 'glo', 'glu', 'pla', 'ple', 'pli', 'plo', 'plu'],
                    'trabadas_r': ['bra', 'bre', 'bri', 'bro', 'bru', 'cra', 'cre', 'cri', 'cro', 'cru', 'dra', 'dre', 'dri', 'dro', 'dru', 'fra', 'fre', 'fri', 'fro', 'fru', 'gra', 'gre', 'gri', 'gro', 'gru', 'pra', 'pre', 'pri', 'pro', 'pru', 'tra', 'tre', 'tri', 'tro', 'tru']
                },
                palabras: [
                    'blusa', 'cable', 'roble', 'bloque', 'niebla', 'hablar', 'público',
                    'clavo', 'clima', 'chicle', 'cloro', 'club', 'bicicleta', 'clase',
                    'flan', 'flecha', 'conflicto', 'flor', 'flauta', 'rifle', 'coliflor',
                    'globo', 'iglesia', 'regla', 'siglo', 'glotón', 'jeroglífico',
                    'plato', 'sopla', 'pluma', 'completo', 'playa', 'ejemplo', 'aplauso',
                    'brazo', 'sobre', 'brillo', 'libro', 'bruja', 'hambre', 'sombrero',
                    'crema', 'micrófono', 'crimen', 'cromo', 'crucigrama', 'secreto', 'recreo',
                    'dragón', 'madre', 'piedra', 'cuadro', 'cocodrilo', 'golondrina', 'taladro',
                    'fruta', 'cofre', 'frío', 'frotar', 'disfraz', 'África', 'refresco',
                    'grande', 'tigre', 'grillo', 'ogro', 'grúa', 'alegre', 'fotografía',
                    'premio', 'compra', 'prisa', 'profesor', 'prueba', 'princesa', 'pregunta',
                    'tren', 'cuatro', 'estrella', 'letra', 'postre', 'trabajo', 'triste',
                    'atleta', 'atlas' // (tl)
                ]
            },
            {
                id: 7,
                nombre: "Letras X, K, W y Acentuación",
                letras: ['x', 'k', 'w'],
                silabasBase: {
                    'x_silabas': ['xa', 'xe', 'xi', 'xo', 'xu', 'ax', 'ex', 'ix', 'ox', 'ux'],
                    'k_silabas': ['ka', 'ke', 'ki', 'ko', 'ku'],
                    'w_silabas': ['wa', 'we', 'wi', 'wo', 'wu'] // A menudo suenan como gu o u
                },
                palabras: [
                    'taxi', 'examen', 'texto', 'boxeo', 'éxito', 'saxofón', 'explicar', 'experimento', 'oxígeno',
                    'kilo', 'koala', 'karate', 'kiwi', 'bikini', 'kiosco', 'Euskadi',
                    'waterpolo', 'web', 'sándwich', 'wifi', 'whisky', 'show', 'Washington', // Anglicismos comunes
                    // Palabras con tilde (repaso y nuevas)
                    'mamá', 'papá', 'bebé', 'sofá', 'café', 'rubí', 'maní',
                    'árbol', 'lápiz', 'fácil', 'difícil', 'azúcar', 'césped',
                    'último', 'música', 'pájaro', 'teléfono', 'máquina', 'semáforo',
                    'corazón', 'camión', 'avión', 'limón', 'melón', 'dragón',
                    'jamás', 'además', 'inglés', 'francés', 'después',
                    'rápido', 'sábado', 'miércoles', 'brújula', 'océano'
                ]
            }
        ],
        cuentos: [ // Mantengo tus cuentos, puedes ajustarlos o añadir más para los nuevos niveles
            {
                id: 1, titulo: "El Sol Amigo", nivelRecomendado: 1,
                texto: "El sol sale.\nEl sol es mi amigo.\nMamá ama el sol.\nPapá ama el sol.\nEl sol da luz.\nEl sol da calor.\n¡Viva el sol!"
            },
            {
                id: 2, titulo: "Mi Pato Tito", nivelRecomendado: 2,
                texto: "Este es mi pato.\nMi pato se llama Tito.\nTito es amarillo.\nTito nada en el lago.\nTito dice: ¡cuac, cuac!\nYo quiero a Tito."
            },
            {
                id: 3, titulo: "La Foca Felisa", nivelRecomendado: 2, // Podría ser más bien Nivel 3 o 4 por "Felisa", "foca"
                texto: "Felisa es una foca.\nFelisa vive en el mar.\nA Felisa le gusta jugar con la pelota.\nLa pelota es roja.\nFelisa aplaude con sus aletas.\n¡Bravo, Felisa!"
            },
            {
                id: 4, titulo: "El Gato Gastón", nivelRecomendado: 3, // Bien para Nivel 3
                texto: "Gastón es un gato grande y gordo.\nA Gastón le gusta dormir en el sofá.\nTambién le gusta comer pescado.\nCuando Gastón quiere jugar, persigue una bola de lana.\nHugo juega con Gastón.\n¡Son buenos amigos!"
            },
            {
                id: 5, titulo: "Aventura en el Bosque", nivelRecomendado: 3, // Bien para Nivel 3
                texto: "Un día, Vera y Bruno fueron al bosque.\nVieron un conejo con orejas largas.\nEl conejo comía hierba.\nTambién escucharon el canto de un pájaro en un árbol alto.\nEl bosque es un lugar mágico y lleno de vida."
            },
            // NUEVOS CUENTOS DE EJEMPLO PARA NIVELES SUPERIORES
            {
                id: 6, titulo: "El Chango Chistoso", nivelRecomendado: 4,
                texto: "En la China vivía un chango.\nSe llamaba Chema.\nChema comía chocolate y churros.\nPor la noche, se ponía un chaleco.\n¡Qué chango tan chistoso!"
            },
            {
                id: 7, titulo: "La Estrella Perdida", nivelRecomendado: 5,
                texto: "Una estrella se cayó del cielo.\nEstaba triste y sola en el pasto.\nUn pastor la encontró.\nLa cuidó con amor y la ayudó a brillar.\nLa estrella volvió al firmamento feliz."
            },
            {
                id: 8, titulo: "El Príncipe Valiente", nivelRecomendado: 6,
                texto: "El príncipe Bruno era muy valiente.\nCruzó el puente sobre el río.\nLuchó contra un terrible dragón.\nSalvó a la princesa Clara.\n¡Todos celebraron en el castillo!"
            },
            {
                id: 9, titulo: "El Koala Kiko", nivelRecomendado: 7,
                texto: "Kiko era un koala muy simpático.\nVivía en Australia y comía hojas de eucalipto.\nUn día, un taxi lo llevó al zoológico.\nKiko hizo un examen para ser el koala más popular.\n¡Tuvo mucho éxito!"
            }
        ]
    };

    // ... (el resto de tu código JavaScript permanece igual) ...
    // Asegúrate de que la función cargarBotonesNiveles() y la lógica de desbloqueo
    // funcionen correctamente con el mayor número de niveles.
    // El CSS para los botones de nivel .btn-nivel[data-nivel-id="X"] también necesitará
    // entradas para los nuevos niveles si quieres colores distintos para cada uno.

    // Por ejemplo, en tu CSS, para los nuevos botones de nivel:
    // .btn-nivel[data-nivel-id="5"] { background-color: #9b59b6; } /* Amatista */
    // .btn-nivel[data-nivel-id="5"]:hover { background-color: #af7ac5; box-shadow: 0 4px 15px rgba(155, 89, 182, 0.4); }
    // .btn-nivel[data-nivel-id="6"] { background-color: #16a085; } /* Verde Mar Oscuro */
    // .btn-nivel[data-nivel-id="6"]:hover { background-color: #19b698; box-shadow: 0 4px 15px rgba(22, 160, 133, 0.4); }
    // .btn-nivel[data-nivel-id="7"] { background-color: #d35400; } /* Naranja Calabaza */
    // .btn-nivel[data-nivel-id="7"]:hover { background-color: #e67e22; box-shadow: 0 4px 15px rgba(211, 84, 0, 0.4); }

    // ... (resto de tu script.js sin cambios)
    let nivelActualId = null;
    let indiceElementoActual = 0;
    let elementosDelNivel = [];
    let progreso = { nivelesCompletados: [] }; 

    // (Eliminado: constantes de búho ya declaradas arriba)

    function actualizarPersonajeFeedback(estado) { 
        if (!imgPersonajeFeedback) return; 

        imgPersonajeFeedback.classList.remove('feliz', 'pensativo');
        switch(estado) {
            case 'feliz':
                imgPersonajeFeedback.src = IMAGEN_BUHO_FELIZ;
                imgPersonajeFeedback.alt = "Leo el Búho Feliz";
                imgPersonajeFeedback.classList.add('feliz');
                break;
            case 'pensativo':
                imgPersonajeFeedback.src = IMAGEN_BUHO_PENSATIVO;
                imgPersonajeFeedback.alt = "Leo el Búho Pensativo";
                imgPersonajeFeedback.classList.add('pensativo');
                break;
            default: 
                imgPersonajeFeedback.src = IMAGEN_BUHO_NORMAL;
                imgPersonajeFeedback.alt = "Leo el Búho";
        }
    }


    function mostrarPantalla(idPantalla) {
        [pantallaSeleccionNivel, pantallaActividad, pantallaProgreso, pantallaListaCuentos, pantallaLeerCuento].forEach(p => p.classList.remove('activa'));
        document.getElementById(idPantalla).classList.add('activa');
        if (idPantalla !== 'pantalla-actividad') {
            actualizarPersonajeFeedback('normal');
        }
    }

    function cargarBotonesNiveles() {
        botonesNivelesContainer.innerHTML = '';
        datosApp.niveles.forEach(nivel => {
            const btnNivel = document.createElement('button');
            btnNivel.className = 'btn-nivel';
            btnNivel.dataset.nivelId = nivel.id; 
            
            let nombreNivelDisplay = `Nivel ${nivel.id}`;
            if (nivel.nombre.length < 25) { 
                nombreNivelDisplay += `: ${nivel.nombre}`;
            } else {
                 nombreNivelDisplay += `: ${nivel.nombre.substring(0,22)}...`;
            }
            btnNivel.innerHTML = nombreNivelDisplay;

            const esDesbloqueado = nivel.id === 1 || progreso.nivelesCompletados.includes(nivel.id - 1);
            if (!esDesbloqueado) {
                btnNivel.classList.add('bloqueado');
                btnNivel.innerHTML += ' <i class="fas fa-lock"></i>';
                btnNivel.disabled = true;
            } else {
                 btnNivel.innerHTML += ' <i class="fas fa-play-circle"></i>';
            }
            
            if (progreso.nivelesCompletados.includes(nivel.id)) {
                 btnNivel.innerHTML += ' <i class="fas fa-check-circle"></i>';
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
        elementoCursivaActiva = false; 
        mostrarElementoActual();
        mostrarPantalla('pantalla-actividad');
        actualizarPersonajeFeedback('normal'); 
    }

    function mostrarElementoActual() {
        if (elementosDelNivel.length === 0 || indiceElementoActual >= elementosDelNivel.length) {
            feedbackUsuario.textContent = "¡Felicidades! Nivel completado.";
            feedbackUsuario.className = 'acierto';
            hablar(feedbackUsuario.textContent);
            actualizarPersonajeFeedback('feliz'); 
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
            btnAnterior.disabled = true;
            return;
        }

        const elemento = elementosDelNivel[indiceElementoActual];
        elementoAprender.textContent = elemento.valor;
        instruccionActividad.textContent = "Escucha y repite:";
        feedbackUsuario.textContent = '';
        feedbackUsuario.className = ''; 
        btnEscucharElemento.disabled = false;

        elementoAprender.classList.toggle('cursiva', elementoCursivaActiva);
        btnCursiva.innerHTML = elementoCursivaActiva ? '<i class="fas fa-font"></i> Normal' : '<i class="fas fa-italic"></i> Cursiva';
        
        actualizarPersonajeFeedback('normal'); 

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
             feedbackUsuario.textContent = "¡Muy bien! Has terminado este nivel.";
             feedbackUsuario.className = 'acierto';
             hablar(feedbackUsuario.textContent);
             actualizarPersonajeFeedback('feliz');
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

    btnCursiva.addEventListener('click', () => {
        elementoCursivaActiva = !elementoCursivaActiva;
        elementoAprender.classList.toggle('cursiva', elementoCursivaActiva);
        btnCursiva.innerHTML = elementoCursivaActiva ? '<i class="fas fa-font"></i> Normal' : '<i class="fas fa-italic"></i> Cursiva';
    });

    btnSiguiente.addEventListener('click', manejarSiguiente);
    btnAnterior.addEventListener('click', manejarAnterior);
    btnVolverSeleccionDesdeActividad.addEventListener('click', () => {
        cargarBotonesNiveles();
        mostrarPantalla('pantalla-seleccion-nivel');
    });

    function cargarListaCuentos() {
        cuentosGridContainer.innerHTML = '';
        datosApp.cuentos.forEach(cuento => {
            const btnCuento = document.createElement('button');
            btnCuento.className = 'btn-cuento';
            btnCuento.innerHTML = `
                <span class="cuento-titulo">${cuento.titulo}</span>
                <span class="cuento-nivel-recomendado">Nivel recomendado: ${cuento.nivelRecomendado}+</span>
            `;
            btnCuento.addEventListener('click', () => mostrarCuento(cuento.id));
            cuentosGridContainer.appendChild(btnCuento);
        });
        mostrarPantalla('pantalla-lista-cuentos');
    }

    function mostrarCuento(idCuento) {
        const cuento = datosApp.cuentos.find(c => c.id === idCuento);
        if (!cuento) return;
        tituloCuentoEl.textContent = cuento.titulo;
        textoCuentoContainer.innerHTML = '';
        const parrafos = cuento.texto.split('\n').filter(p => p.trim() !== '');
        parrafos.forEach(pText => {
            const pElem = document.createElement('p');
            pElem.textContent = pText;
            textoCuentoContainer.appendChild(pElem);
        });
        mostrarPantalla('pantalla-leer-cuento');
        hablar(`Cuento: ${cuento.titulo}.`);
    }

    btnIrACuentos.addEventListener('click', cargarListaCuentos);
    btnVolverSeleccionDesdeListaCuentos.addEventListener('click', () => mostrarPantalla('pantalla-seleccion-nivel'));
    btnVolverAListaCuentos.addEventListener('click', cargarListaCuentos);
    btnEscucharCuento.addEventListener('click', () => {
        const textoCompleto = Array.from(textoCuentoContainer.querySelectorAll('p')).map(p => p.textContent).join(' ');
        if (textoCompleto) hablar(textoCompleto);
    });

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

    cargarProgreso();
    cargarBotonesNiveles();
    mostrarPantalla('pantalla-seleccion-nivel');
});

// FIN de script.js
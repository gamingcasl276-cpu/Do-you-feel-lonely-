const moodContent = {
  solo: [
    ["No tienes que ganarte la compañía.", "Sentirse solo puede doler mucho. Lo que sientes importa, incluso si no sabes cómo explicarlo. No tienes que resolverlo todo en este instante.", "¿Hay alguien con quien podrías compartir un mensaje sencillo, aunque sea solo para decir “¿tienes un ratito?”", "♡"],
    ["Mereces que te escuchen.", "No eres una carga por necesitar compañía. A veces no hace falta una gran conversación; basta con que alguien esté cerca.", "Si quieres, puedes usar el mensaje de abajo y adaptarlo a tu manera.", "☁"],
    ["Puedes estar aquí tal como estás.", "No tienes que fingir alegría ni tener una explicación lista. Puedes ir despacio y elegir qué necesitas ahora.", "¿Te ayudaría hablar con alguien, descansar o simplemente pasar un minuto en calma?", "🌿"]
  ],
  triste: [
    ["No tienes que convertir la tristeza en algo positivo.", "Puedes sentirte triste sin exigirte encontrar una lección. Tus emociones no necesitan justificarse para merecer cuidado.", "¿Qué sería más amable contigo ahora: descansar, desahogarte o pedir compañía?", "💙"],
    ["Hoy puede ser un día difícil, y eso merece cuidado.", "No hace falta solucionar toda tu vida hoy. Intenta pensar solo en el siguiente paso pequeño, si es que tienes energía para darlo.", "¿Hay algo que puedas posponer para darte un poco de espacio?", "🌧️"],
    ["Lo que sientes merece ser tomado en serio.", "No tienes que compararte con otras personas ni demostrar que estás sufriendo lo suficiente. Puedes pedir ayuda.", "¿Te gustaría contarle a alguien de confianza cómo han sido tus últimos días?", "🌱"]
  ],
  ansioso: [
    ["Vamos de uno en uno.", "Cuando la mente corre, puede ayudar volver a algo concreto que esté aquí contigo. No tienes que obligarte a estar en calma.", "Prueba mirar a tu alrededor y nombrar tres cosas que ves. Si no ayuda, podemos probar otra cosa.", "🍃"],
    ["No tienes que resolver todos los escenarios ahora.", "La ansiedad puede hacer que todo parezca urgente. Si puedes, elige una sola cosa que necesite tu atención en este momento.", "¿Qué es lo que realmente necesita una respuesta ahora, y qué puede esperar?", "☁"],
    ["Puedes bajar el ritmo sin hacerlo perfecto.", "Deja los hombros sueltos si te resulta cómodo y respira con naturalidad. No fuerces la respiración; también puedes simplemente apoyar los pies en el suelo.", "¿Quieres probar la pausa de un minuto de esta página?", "🌿"]
  ],
  agotado: [
    ["Descansar no es fallar.", "No eres una máquina. Si hoy solo te alcanza para lo básico, eso también cuenta. No necesitas ganarte el derecho a descansar.", "¿Hay una tarea que puedas dejar para después sin ponerte en riesgo?", "🌙"],
    ["Puedes hacer menos y seguir mereciendo cuidado.", "A veces lo más útil es reducir el tamaño del siguiente paso. No necesitas arreglar todo para empezar a cuidarte.", "¿Qué sería lo mínimo amable que podrías hacer por ti ahora?", "🫶"],
    ["No tienes que demostrar fuerza todo el tiempo.", "Si llevas tiempo sintiéndote así, no tienes que cargarlo en silencio. Hablar con alguien de confianza o con un profesional puede ayudar.", "¿Podrías decirle a alguien que estás agotado/a y necesitas apoyo?", "🌱"]
  ],
  confundido: [
    ["No necesitas ponerle nombre a todo.", "A veces las emociones llegan mezcladas y cuesta distinguirlas. Está bien empezar con “no sé qué me pasa, pero no me siento bien”.", "¿Qué notas primero en este momento: tus pensamientos, tu cuerpo o tu entorno?", "🌫️"],
    ["Puedes tomarte tiempo para entenderte.", "No tienes que encontrar la palabra exacta ni tomar decisiones importantes ahora mismo.", "¿Te serviría escribir una frase sobre lo que está pasando, sin intentar ordenarla?", "🍂"]
  ],
  bien: [
    ["También puedes cuidar los momentos tranquilos.", "No hace falta esperar a estar mal para darte un descanso, conectar con alguien o reconocer algo que te hizo bien.", "¿Qué te gustaría llevarte de este momento para recordarlo después?", "🌤️"],
    ["Un momento un poco más ligero también cuenta.", "No necesitas sentirte bien todo el tiempo. Puedes disfrutar de este instante sin exigirle que dure para siempre.", "¿Hay algo pequeño que te haya dado un poquito de calma hoy?", "🌼"]
  ]
};

const moodCards = [...document.querySelectorAll(".mood-card")];
const responseSymbol = document.querySelector("#response-symbol");
const responseTitle = document.querySelector("#response-title");
const responseText = document.querySelector("#response-text");
const responsePrompt = document.querySelector("#response-prompt");
const nextMessageButton = document.querySelector("#next-message");
let selectedMood = null;
let messageIndex = 0;

function showMood(mood, resetIndex = true) {
  selectedMood = mood;
  if (resetIndex) messageIndex = 0;
  moodCards.forEach(card => {
    const active = card.dataset.mood === mood;
    card.setAttribute("aria-pressed", String(active));
  });
  const item = moodContent[mood][messageIndex % moodContent[mood].length];
  responseTitle.textContent = item[0];
  responseText.textContent = item[1];
  responsePrompt.textContent = item[2];
  responseSymbol.textContent = item[3];
  document.querySelector("#mood-response").classList.remove("response-refresh");
  void document.querySelector("#mood-response").offsetWidth;
  document.querySelector("#mood-response").classList.add("response-refresh");
}

moodCards.forEach(card => card.addEventListener("click", () => showMood(card.dataset.mood)));
nextMessageButton.addEventListener("click", () => {
  if (!selectedMood) selectedMood = "solo";
  messageIndex = (messageIndex + 1) % moodContent[selectedMood].length;
  showMood(selectedMood, false);
});

const breathingToggle = document.querySelector("#breathing-toggle");
const breathingReset = document.querySelector("#breathing-reset");
const breathingOrb = document.querySelector("#breathing-orb");
const breathingWord = document.querySelector("#breathing-word");
const breathingStatus = document.querySelector("#breathing-status");
let breathingActive = false;
let breathingTimer = null;
let phaseTimer = null;
let phase = "inhala";

function setBreathingPhase(nextPhase) {
  phase = nextPhase;
  breathingWord.textContent = nextPhase;
  breathingOrb.classList.toggle("exhale", nextPhase === "exhala");
  breathingStatus.textContent = nextPhase === "inhala"
    ? "Inhala suavemente, solo si te resulta cómodo."
    : "Exhala con naturalidad, sin forzar.";
}
function stopBreathing() {
  breathingActive = false;
  clearTimeout(breathingTimer);
  clearInterval(phaseTimer);
  breathingTimer = null;
  phaseTimer = null;
  breathingOrb.classList.remove("is-breathing", "exhale");
  breathingWord.textContent = "inhala";
  breathingStatus.textContent = "La pausa estará aquí cuando la necesites.";
  breathingToggle.textContent = "Comenzar pausa";
}
function startBreathing() {
  breathingActive = true;
  breathingOrb.classList.add("is-breathing");
  breathingToggle.textContent = "Terminar pausa";
  setBreathingPhase("inhala");
  phaseTimer = setInterval(() => setBreathingPhase(phase === "inhala" ? "exhala" : "inhala"), 4000);
  breathingStatus.textContent = "Sigue el ritmo solo si se siente cómodo. Puedes detenerte cuando quieras.";
}
breathingToggle.addEventListener("click", () => breathingActive ? stopBreathing() : startBreathing());
breathingReset.addEventListener("click", stopBreathing);
document.addEventListener("visibilitychange", () => { if (document.hidden && breathingActive) stopBreathing(); });

const supportMessage = document.querySelector("#support-message");
const defaultMessage = "Hola. Últimamente no me he sentido muy bien y me vendría bien hablar con alguien. No necesito que soluciones nada; ¿podrías acompañarme un rato?";
const copyStatus = document.querySelector("#copy-status");
const toast = document.querySelector("#toast");
let toastTimeout;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("show"), 2600);
}
document.querySelector("#copy-message").addEventListener("click", async () => {
  const text = supportMessage.value.trim();
  if (!text) {
    copyStatus.textContent = "Escribe o adapta el mensaje antes de copiarlo.";
    return;
  }
  try {
    await navigator.clipboard.writeText(text);
    copyStatus.textContent = "Mensaje copiado. Puedes pegarlo en la aplicación que prefieras.";
    showToast("Mensaje copiado 💌");
  } catch {
    supportMessage.focus();
    supportMessage.select();
    copyStatus.textContent = "Tu navegador no permitió copiar automáticamente. Selecciona el texto y cópialo manualmente.";
    showToast("Selecciona el texto para copiarlo");
  }
});
document.querySelector("#reset-message").addEventListener("click", () => {
  supportMessage.value = defaultMessage;
  copyStatus.textContent = "Se restauró el ejemplo. Puedes editarlo antes de copiarlo.";
  showToast("Mensaje restaurado");
});

const privacyDialog = document.querySelector("#privacy-dialog");
document.querySelector("#privacy-info").addEventListener("click", () => {
  if (typeof privacyDialog.showModal === "function") privacyDialog.showModal();
  else showToast("Esta página no guarda tu historial ni envía tus emociones a un servidor.");
});
document.querySelector("#close-privacy").addEventListener("click", () => privacyDialog.close());
document.querySelector("#privacy-ok").addEventListener("click", () => privacyDialog.close());
privacyDialog.addEventListener("click", event => {
  if (event.target === privacyDialog) privacyDialog.close();
});
document.querySelector("[data-scroll-help]").addEventListener("click", event => {
  event.preventDefault();
  document.querySelector("#ayuda").scrollIntoView({ behavior: "smooth" });
});

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  breathingOrb.style.animation = "none";
}


// Mini juego de memoria: no guarda puntuaciones ni historial.
const memoryGrid = document.querySelector("#memory-grid");
const memoryStatus = document.querySelector("#memory-status");
const memoryReset = document.querySelector("#memory-reset");
const memorySymbols = ["🌿", "🌼", "🌙", "🦋", "🌿", "🌼", "🌙", "🦋"];
let memoryValues = [];
let firstCard = null;
let lockMemory = false;
let matchedPairs = 0;
let memoryMoves = 0;
let mismatchTimer = null;

function shuffleMemory() {
  memoryValues = [...memorySymbols].sort(() => Math.random() - 0.5);
  firstCard = null;
  lockMemory = false;
  matchedPairs = 0;
  memoryMoves = 0;
  clearTimeout(mismatchTimer);
  memoryGrid.querySelectorAll(".memory-card").forEach((card, index) => {
    card.classList.remove("is-open", "is-matched");
    card.textContent = "?";
    card.setAttribute("aria-label", `Tarjeta ${index + 1}, oculta`);
    card.disabled = false;
  });
  memoryStatus.textContent = "Encuentra las 4 parejas a tu ritmo 🌱";
}

memoryGrid.querySelectorAll(".memory-card").forEach(card => {
  card.textContent = "?";
  card.addEventListener("click", () => {
    const index = Number(card.dataset.card);
    if (lockMemory || card.classList.contains("is-open") || card.classList.contains("is-matched")) return;

    card.textContent = memoryValues[index];
    card.classList.add("is-open");
    card.setAttribute("aria-label", `Tarjeta ${index + 1}: ${memoryValues[index]}`);

    if (!firstCard) {
      firstCard = card;
      return;
    }

    memoryMoves++;
    const firstIndex = Number(firstCard.dataset.card);
    if (memoryValues[firstIndex] === memoryValues[index]) {
      firstCard.classList.remove("is-open");
      card.classList.remove("is-open");
      firstCard.classList.add("is-matched");
      card.classList.add("is-matched");
      firstCard.disabled = true;
      card.disabled = true;
      matchedPairs++;
      firstCard = null;
      if (matchedPairs === 4) {
        memoryStatus.textContent = `¡Encontraste todas las parejas en ${memoryMoves} intentos! Bien hecho 🌼`;
      } else {
        memoryStatus.textContent = `¡Pareja encontrada! ${matchedPairs} de 4. Sigue a tu ritmo.`;
      }
    } else {
      const previousCard = firstCard;
      firstCard = null;
      lockMemory = true;
      memoryStatus.textContent = "No pasa nada; prueba con otras tarjetas 💚";
      mismatchTimer = setTimeout(() => {
        [previousCard, card].forEach(item => {
          item.classList.remove("is-open");
          item.textContent = "?";
          item.setAttribute("aria-label", `Tarjeta ${Number(item.dataset.card) + 1}, oculta`);
        });
        lockMemory = false;
      }, 750);
    }
  });
});
memoryReset.addEventListener("click", shuffleMemory);
shuffleMemory();

// Preguntas de conversación opcionales, sin conexión a servicios externos.
const conversationQuestions = [
  "Si pudieras visitar cualquier lugar tranquilo, ¿sería un bosque, una playa o una casita en la montaña?",
  "¿Qué canción te gustaría escuchar ahora mismo?",
  "Si hoy pudieras tomar una bebida calentita en cualquier lugar, ¿dónde estarías?",
  "¿Qué pequeño detalle suele sacarte una sonrisa, aunque sea por un segundo?",
  "Si pudieras tener una mascota mágica, ¿qué animal sería y cómo lo llamarías?",
  "¿Preferirías mirar las estrellas, escuchar la lluvia o caminar entre árboles?",
  "¿Qué comida te recuerda a un momento bonito?",
  "Si tu día tuviera un color, ¿cuál sería? Puedes inventar uno también.",
  "¿Qué lugar ficticio de una película, serie o videojuego te gustaría conocer?",
  "¿Qué te gustaría que alguien te dijera cuando tienes un día difícil?",
  "Si una nube pudiera llevarte a cualquier sitio por una hora, ¿a dónde irías?",
  "¿Cuál sería el nombre de una pequeña cafetería escondida en el bosque?"
];
const conversationQuestion = document.querySelector("#conversation-question");
const conversationAnswer = document.querySelector("#conversation-answer");
let lastQuestionIndex = 0;
document.querySelector("#next-question").addEventListener("click", () => {
  let nextIndex = lastQuestionIndex;
  if (conversationQuestions.length > 1) {
    while (nextIndex === lastQuestionIndex) nextIndex = Math.floor(Math.random() * conversationQuestions.length);
  }
  lastQuestionIndex = nextIndex;
  conversationQuestion.textContent = conversationQuestions[nextIndex];
});
document.querySelector("#clear-answer").addEventListener("click", () => {
  conversationAnswer.value = "";
  showToast("Respuesta borrada. Puedes empezar otra vez 🌿");
});


// Lumi Gratis: respuestas locales; no usa API, servidor ni clave secreta.
(() => {
  const form = document.querySelector("#lumi-form");
  const input = document.querySelector("#lumi-input");
  const messages = document.querySelector("#lumi-messages");
  const status = document.querySelector("#lumi-status");
  const clearButton = document.querySelector("#lumi-clear");
  const sendButton = form?.querySelector('button[type="submit"]');
  const modeButtons = [...document.querySelectorAll(".lumi-mode")];
  if (!form || !input || !messages || !status || !clearButton || !sendButton) return;
  let mode = "charlar";
  let history = [];
  let turn = 0;

  status.textContent = "Lumi Gratis está lista · respuestas locales, sin API 🌿";
  status.dataset.state = "ready";

  function addBubble(text, sender) {
    const bubble = document.createElement("div");
    bubble.className = `lumi-bubble ${sender === "user" ? "lumi-to" : "lumi-from"}`;
    bubble.textContent = text;
    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;
    return bubble;
  }

  const replies = {
    greeting: ["¡Holaaa! 🌙 ¿Cómo te gustaría pasar este ratito: hablando de tu día, jugando o soltando lo que llevas dentro?", "¡Aquí estamos! 🌿 Puedes contarme algo, pedirme un juego o cambiar de tema cuando quieras."],
    feelings: ["Gracias por contármelo. No tienes que ordenar todo lo que sientes para poder expresarlo. ¿Qué parte de eso pesa más ahora mismo?", "Te leo. No voy a intentar arreglarlo todo en una frase. ¿Quieres contarme un poquito más o prefieres que busquemos una distracción suave?", "Tiene sentido que quieras un espacio para decirlo. ¿Qué te habría gustado que alguien entendiera de lo que estás viviendo?"],
    sadness: ["Siento que estés pasando por un momento así. No necesitas convertirlo en algo positivo ahora mismo. ¿Te vendría mejor compañía, una pausa o hablar de lo que ocurrió?", "No tienes que fingir que estás bien aquí. Podemos ir despacio, una cosa a la vez."],
    anxiety: ["Vamos de uno en uno. Si te resulta cómodo, apoya los pies en el suelo y nombra tres cosas que ves a tu alrededor. No tienes que forzar la respiración.", "Cuando todo parece urgente, puede ayudar elegir solo el siguiente paso pequeño. ¿Qué necesita atención ahora y qué puede esperar?"],
    joke: ["Un pingüino entra a una panadería y pregunta: «¿Tienen pan de ayer?». Le dicen que sí y responde: «¡Pues qué suerte, así no tengo que esperar hasta mañana!» 🐧", "¿Por qué el libro de matemáticas estaba triste? Porque tenía demasiados problemas. 📚", "Una nube le dice a otra: «Creo que me estoy poniendo sentimental». Y empieza a lloviznar. ☁️"],
    story: ["Una noche, una luciérnaga encontró una puerta diminuta en un árbol. Al abrirla, descubrió una biblioteca donde cada libro guardaba un recuerdo bonito de alguien. ¿Qué libro crees que abrió primero? ✨", "Un gato astronauta aterrizó en un planeta hecho de gelatina. Su primera decisión fue científica: probar si rebotaba. Rebotó tanto que acabó orbitando una montaña de malvaviscos. ¿Qué ocurre después? 🚀🐈"],
    word: ["¡Vamos con una cadena de palabras! Yo digo «LUNA» y tú tienes que decir una palabra que empiece con A. Luego seguimos con la última letra de tu palabra. 🔤", "Reto tranquilo: dime una palabra que empiece con la última letra de «BOSQUE». ¡Empieza con E! 🌳"],
    surprise: ["Pregunta curiosa: si pudieras teletransportarte durante una hora a un lugar tranquilo, ¿a dónde irías? 🌙", "Mini reto: mira a tu alrededor y encuentra algo de un color que te guste. No tiene que ser especial; basta con notarlo. 🍃", "Elige un superpoder inútil pero divertido: hablar con cucharas, entender a las palomas o convertir calcetines en panqueques. ¿Cuál eliges? 🦸"],
    thanks: ["De nada 💚. Me alegra que este espacio te sirva un poquito. ¿Qué te gustaría hacer ahora?", "Con mucho gusto. Recuerda que también mereces apoyo de personas reales que puedan acompañarte."],
    fallback: ["Quiero seguirte el hilo, aunque esta versión gratuita tiene respuestas preparadas y puede no entender todos los mensajes. ¿Me lo cuentas con otras palabras o me dices qué necesitas ahora: hablar, distraerte o desahogarte?", "No quiero fingir que entiendo más de lo que entiendo. ¿Puedes contarme un poco más sobre esa parte?", "Podemos explorar eso con calma. ¿Qué es lo más importante que te gustaría que entendiera de lo que acabas de decir?"]
  };

  function pick(list) { return list[(turn++) % list.length]; }
  function respond(text) {
    const t = text.toLocaleLowerCase("es").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const danger = /(quiero (morir|suicidarme|hacerme dano)|voy a (matarme|hacerme dano)|no quiero vivir|me voy a suicidar|hacerme daño)/i.test(t);
    if (danger) return "Siento mucho que estés viviendo algo tan doloroso. No tienes que afrontarlo a solas. Si hay peligro inmediato, aléjate de cualquier cosa con la que puedas lastimarte y busca ahora a una persona de confianza que pueda estar físicamente contigo; acude a urgencias o llama al número local de emergencias. Si puedes, dime: ¿estás en peligro inmediato en este momento? 💚";
    if (/^(hola|holi|holaa|buenas|hey|ola|que tal|como estas)\b/.test(t)) return pick(replies.greeting);
    if (/(gracias|te agradezco|muchas gracias)/.test(t)) return pick(replies.thanks);
    if (/(ansiedad|ansioso|nervios|panico|me agobia|estoy agobi)/.test(t)) return pick(replies.anxiety);
    if (/(triste|llorar|deprim|me siento mal|estoy mal|dolor emocional|sin ganas)/.test(t)) return pick(replies.sadness);
    if (/(solo|sola|soledad|nadie me|no tengo a nadie|me siento aisl)/.test(t)) return "Sentirse solo puede doler mucho, y no significa que haya algo malo contigo. ¿Hay alguien a quien te gustaría escribirle, aunque sea un mensaje pequeño? Si prefieres, también podemos distraernos un rato. 💚";
    if (/(palabras|cadena|adivinanza|jugar|juego|reto)/.test(t) || mode === "jugar") return pick(replies.word);
    if (/(chiste|reir|jaja|jajaja|absurda|historia)/.test(t)) return pick(t.includes("historia") || t.includes("absurda") ? replies.story : replies.joke);
    if (/(sorpresa|sorprendeme|pregunta curiosa)/.test(t) || mode === "sorpresa") return pick(replies.surprise);
    if (/(desahog|contarte|escuchame|escuchar|necesito hablar)/.test(t) || mode === "desahogarme") return pick(replies.feelings);
    if (/(que hago|consejo|ayudame|ayuda|no se que hacer)/.test(t)) return "Podemos pensarlo juntos, sin tener que resolverlo todo de golpe. ¿Qué está pasando y qué opciones tienes delante? Si es algo importante o urgente, también puede ayudar hablar con alguien de confianza.";
    const lastUser = [...history].reverse().find(item => item.role === "user");
    if (lastUser && t.length < 35) return "Antes me comentaste «" + lastUser.content.slice(0, 100) + "». ¿Lo que acabas de decir está relacionado con eso, o quieres cambiar de tema?";
    return pick(replies.fallback);
  }

  modeButtons.forEach(button => button.addEventListener("click", () => {
    mode = button.dataset.lumiMode;
    modeButtons.forEach(item => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    const intros = {
      charlar: "Modo charla activado 💬 Podemos hablar de tu día, de algo curioso o de cualquier tema que te apetezca.",
      jugar: "Modo distracción activado 🎲 ¡Vamos con una cadena de palabras! Yo digo LUNA; tú di una palabra que empiece con A.",
      desahogarme: "Modo desahogo activado 💚 Puedes contarme lo que quieras compartir, a tu ritmo. No tienes que ordenarlo todo.",
      sorpresa: pick(replies.surprise)
    };
    addBubble(intros[mode], "lumi");
    input.placeholder = mode === "desahogarme" ? "Escribe lo que te apetezca compartir…" : "Escribe aquí si te apetece…";
  }));

  form.addEventListener("submit", event => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) return input.focus();
    addBubble(text, "user");
    history.push({ role: "user", content: text });
    history = history.slice(-8);
    input.value = "";
    sendButton.disabled = true;
    sendButton.textContent = "Un momento…";
    window.setTimeout(() => {
      const reply = respond(text);
      addBubble(reply, "lumi");
      history.push({ role: "assistant", content: reply });
      history = history.slice(-12);
      sendButton.disabled = false;
      sendButton.textContent = "Enviar ↗";
      input.focus();
    }, 280);
  });

  clearButton.addEventListener("click", () => {
    history = [];
    messages.replaceChildren();
    addBubble("¡Empezamos de nuevo! 🌙 ¿Qué te gustaría hacer ahora: charlar, distraerte o desahogarte?", "lumi");
    status.textContent = "Lumi Gratis está lista · el contexto anterior se borró.";
    status.dataset.state = "ready";
    input.value = "";
    input.focus();
  });
})();

// Juego de cadena de palabras.
(() => {
  const form = document.querySelector("#word-chain-form");
  const input = document.querySelector("#word-chain-input");
  const current = document.querySelector("#word-chain-current");
  const status = document.querySelector("#word-chain-status");
  const reset = document.querySelector("#word-chain-reset");
  if (!form || !input || !current || !status || !reset) return;
  let previous = "LUNA";
  let used = new Set(["luna"]);
  function resetGame() { previous = "LUNA"; used = new Set(["luna"]); current.textContent = "Empezamos con: LUNA"; status.textContent = "Tu palabra debe empezar con A."; input.value = ""; }
  form.addEventListener("submit", event => {
    event.preventDefault();
    const word = input.value.trim().toLocaleLowerCase("es").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zñ]/g, "");
    if (!word) return;
    const required = previous.slice(-1).toLocaleLowerCase("es");
    if (word[0] !== required) { status.textContent = `¡Casi! La palabra debe empezar con «${required.toUpperCase()}». Prueba otra 🌱`; return; }
    if (used.has(word)) { status.textContent = "Esa ya la usamos. ¡Prueba otra palabra!"; return; }
    used.add(word); previous = word.toLocaleUpperCase("es");
    const last = word.slice(-1);
    current.textContent = `Última palabra: ${previous}`;
    status.textContent = `¡Bien! Ahora toca una palabra que empiece con «${last.toUpperCase()}». Llevas ${used.size - 1} palabras. 🌿`;
    input.value = ""; input.focus();
  });
  reset.addEventListener("click", resetGame);
})();

// Diario temporal: no usa localStorage ni envía el texto a ninguna parte.
(() => {
  const entry = document.querySelector("#journal-entry");
  const count = document.querySelector("#journal-count");
  const clear = document.querySelector("#journal-clear");
  if (!entry || !count || !clear) return;
  entry.addEventListener("input", () => { count.textContent = `${entry.value.length} / 1500 caracteres · solo en esta pestaña`; });
  clear.addEventListener("click", () => { entry.value = ""; count.textContent = "0 / 1500 caracteres · solo en esta pestaña"; entry.focus(); });
})();

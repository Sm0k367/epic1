// app.js

// Initialize AOS animations
AOS.init();

// Background audio
const audio = document.getElementById("bg-audio");
if (audio) {
  audio.volume = 0.2;
}

// Dark mode toggle
const toggle = document.getElementById("darkToggle");
if (toggle) {
  toggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
  });
}

// Chatbot logic
const chatLog = document.getElementById("chatLog");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");
const voiceSelect = document.getElementById("voiceSelect");

function speak(text, gender = "female") {
  const synth = window.speechSynthesis;
  const voices = synth.getVoices();

  let voice = voices.find(v =>
    gender === "female"
      ? v.name.toLowerCase().includes("female") || v.name.toLowerCase().includes("woman")
      : v.name.toLowerCase().includes("male") || v.name.toLowerCase().includes("man")
  ) || voices[0];

  const utter = new SpeechSynthesisUtterance(text);
  utter.voice = voice;
  synth.speak(utter);
}

function addMessage(msg, from = "user") {
  const div = document.createElement("div");
  div.className = `text-sm ${from === "user" ? "text-right text-blue-500" : "text-left text-green-500"}`;
  div.textContent = msg;
  chatLog.appendChild(div);
  chatLog.scrollTop = chatLog.scrollHeight;
}

if (sendBtn && chatInput && chatLog) {
  sendBtn.addEventListener("click", () => {
    const msg = chatInput.value.trim();
    if (!msg) return;
    addMessage(msg, "user");
    chatInput.value = "";

    setTimeout(() => {
      const reply = `You said: "${msg}". I am here to help!`;
      addMessage(reply, "bot");
      speak(reply, voiceSelect.value);
    }, 500);
  });
}

// Load voices after page load
window.speechSynthesis.onvoiceschanged = () => {};

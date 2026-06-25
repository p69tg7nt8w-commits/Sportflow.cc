(() => {
  'use strict';

  // ── DOM refs ──
  const intro         = document.getElementById('intro');
  const game          = document.getElementById('game');
  const startBtn      = document.getElementById('start-btn');
  const messagesEl    = document.getElementById('messages');
  const typingEl      = document.getElementById('typing-indicator');
  const optionsBar    = document.getElementById('options-bar');
  const userInput     = document.getElementById('user-input');
  const sendBtn       = document.getElementById('send-btn');
  const clockEl       = document.getElementById('clock');

  // ── State ──
  let conversationHistory = [];
  let isLoading = false;

  // ── Clock ──
  function updateClock() {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    clockEl.textContent = `${hh}:${mm}:${ss}`;
  }
  setInterval(updateClock, 1000);
  updateClock();

  // ── Intro → Game transition ──
  startBtn.addEventListener('click', () => {
    intro.classList.add('fade-out');
    setTimeout(() => {
      intro.style.display = 'none';
      game.classList.remove('hidden');
      startExploration();
    }, 800);
  });

  // ── Kick off the first scene ──
  function startExploration() {
    const openingPrompt = "Commence l'exploration. Présente le lieu abandonné avec une mise en scène atmosphérique saisissante. Donne-lui un nom évocateur et plante le décor nocturne.";
    sendMessage(openingPrompt, false);
  }

  // ── Parse [1] / [2] / [3] options from AI text ──
  function parseOptions(text) {
    const regex = /\[(\d)\]\s*(.+)/g;
    const options = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      options.push({ num: match[1], label: match[2].trim() });
    }
    return options;
  }

  // ── Strip option lines from narrative text ──
  function stripOptions(text) {
    return text.replace(/\[\d\]\s*.+(\n|$)/g, '').trimEnd();
  }

  // ── Render option buttons ──
  function renderOptions(options) {
    optionsBar.innerHTML = '';
    if (!options.length) {
      optionsBar.classList.add('hidden');
      return;
    }
    options.forEach(({ num, label }) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.innerHTML = `<span class="option-num">[${num}]</span>${label}`;
      btn.addEventListener('click', () => {
        if (isLoading) return;
        sendMessage(`[${num}] ${label}`, true);
      });
      optionsBar.appendChild(btn);
    });
    optionsBar.classList.remove('hidden');
  }

  // ── Add a narrator message with typewriter effect ──
  function addNarratorMessage(fullText) {
    return new Promise((resolve) => {
      const narrative = stripOptions(fullText);
      const options   = parseOptions(fullText);

      const msg = document.createElement('div');
      msg.className = 'message narrator';
      msg.innerHTML = `
        <span class="narrator-bar"></span>
        <span class="message-text"></span>
      `;
      messagesEl.appendChild(msg);

      const textSpan = msg.querySelector('.message-text');

      // Cursor element
      const cursor = document.createElement('span');
      cursor.className = 'cursor';
      textSpan.appendChild(cursor);

      let i = 0;
      const speed = 18; // ms per character

      function typeNext() {
        if (i < narrative.length) {
          cursor.insertAdjacentText('beforebegin', narrative[i]);
          i++;
          scrollBottom();
          setTimeout(typeNext, speed);
        } else {
          cursor.remove();
          renderOptions(options);
          resolve();
        }
      }

      typeNext();
    });
  }

  // ── Add a player message (instant) ──
  function addPlayerMessage(text) {
    const msg = document.createElement('div');
    msg.className = 'message player';
    msg.innerHTML = `
      <span class="player-bar"></span>
      <span class="message-text">${escapeHtml(text)}</span>
    `;
    messagesEl.appendChild(msg);
    scrollBottom();
  }

  // ── Scroll chat to bottom ──
  function scrollBottom() {
    const container = document.getElementById('chat-container');
    container.scrollTop = container.scrollHeight;
  }

  // ── Set UI loading state ──
  function setLoading(state) {
    isLoading = state;
    sendBtn.disabled = state;
    userInput.disabled = state;
    typingEl.classList.toggle('hidden', !state);
    if (state) {
      optionsBar.classList.add('hidden');
      scrollBottom();
    }
  }

  // ── Core send function ──
  async function sendMessage(userText, showUserBubble = true) {
    if (isLoading) return;

    if (showUserBubble) addPlayerMessage(userText);

    conversationHistory.push({ role: 'user', content: userText });
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: conversationHistory }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Erreur inconnue' }));
        throw new Error(err.error || `HTTP ${res.status}`);
      }

      const { text } = await res.json();
      conversationHistory.push({ role: 'assistant', content: text });

      setLoading(false);
      await addNarratorMessage(text);
    } catch (err) {
      setLoading(false);
      addNarratorMessage(`[SIGNAL PERDU] ${err.message}\n\n[1] Réessayer\n[2] Recommencer\n[3] Attendre`);
      console.error(err);
    }
  }

  // ── User input handlers ──
  sendBtn.addEventListener('click', handleUserSend);
  userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleUserSend();
    }
  });

  function handleUserSend() {
    const text = userInput.value.trim();
    if (!text || isLoading) return;
    userInput.value = '';
    sendMessage(text, true);
  }

  // ── Escape HTML to prevent XSS ──
  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
})();

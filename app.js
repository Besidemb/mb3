/* ====================== Estado & padrões ====================== */
const STORAGE_KEY = 'nossoCantinho_v1';
const PASSWORD = '9898';

const DEFAULTS = {
  profiles: {
    mb: { notas: '', moedas: 100 },
    nath: { notas: '', moedas: 100 }
  },
  messages: [],
  settings: { step: 10 }
};

let state = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || DEFAULTS;
let currentUser = null;

/* ====================== Salvar/Carregar ====================== */
function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }

/* ====================== Perfis ====================== */
function renderProfiles() {
  document.getElementById('notas-mb').innerText = state.profiles.mb.notas;
  document.getElementById('moedas-mb').textContent = state.profiles.mb.moedas;
  document.getElementById('notas-nath').innerText = state.profiles.nath.notas;
  document.getElementById('moedas-nath').textContent = state.profiles.nath.moedas;
}

function alterarMoedas(profile, valor) {
  const p = state.profiles[profile];
  if (!p) return;
  p.moedas = Math.max(0, p.moedas + Number(valor));
  saveState(); renderProfiles();
}

function getCoinStep() { return state.settings.step; }

/* ====================== Chat ====================== */
function sendMessage(from, text) {
  if (!text) return;
  state.messages.push({ from, text, time: Date.now() });
  saveState(); renderMessages();
}

function sendComposer() {
  if (!currentUser) { alert('Faça login'); return; }
  const input = document.getElementById('message-input');
  if (!input.value.trim()) return;
  sendMessage(currentUser, input.value.trim());
  input.value = '';
}

function renderMessages() {
  const container = document.getElementById('messages');
  container.innerHTML = '';
  state.messages.forEach(m => {
    const el = document.createElement('div');
    el.className = 'msg';
    el.textContent = `${m.from.toUpperCase()}: ${m.text}`;
    container.appendChild(el);
  });
  container.scrollTop = container.scrollHeight;
}

/* ====================== Login ====================== */
function startLogin(user) { currentUser = user; document.getElementById('login-modal').style.display = 'flex'; }

function confirmLogin() {
  const pass = document.getElementById('login-pass').value;
  if (pass === PASSWORD) {
    document.getElementById('login-modal').style.display = 'none';
    document.getElementById('logged-as').textContent = currentUser.toUpperCase();
    renderMessages();
  } else alert('Senha incorreta');
}

function logout() {
  currentUser = null;
  document.getElementById('logged-as').textContent = '—';
}

function closeLogin() { document.getElementById('login-modal').style.display = 'none'; }

/* ====================== Init ====================== */
function init() {
  renderProfiles();

  // Auto salvar notas
  ['mb', 'nath'].forEach(id => {
    document.getElementById('notas-' + id).addEventListener('input', e => {
      state.profiles[id].notas = e.target.innerText;
      saveState();
    });
  });

  // Enter envia
  document.getElementById('message-input').addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendComposer();
    }
  });

  // Canvas de estrelas
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let stars = [];

  function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  window.addEv

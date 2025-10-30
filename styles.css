/* ====================== State & defaults ====================== */
const STORAGE_KEY = 'nossoCantinho_definitive_v1';
const PASSWORD = '9898';
const DEFAULTS = {
  settings: { accent:'#b57bff', accent2:'#6f3ec9', glow:1.2, font:"Poppins, sans-serif", fontsize:16, step:10, stars:true, title:"Nosso Cantinho 💜" },
  profiles: { mb: {notas:'', moedas:100}, nath: {notas:'', moedas:100} },
  messages: []
};
let state = JSON.parse(localStorage.getItem(STORAGE_KEY)||"null") || DEFAULTS;
let currentUser = null;

/* ====================== Save/load ====================== */
function saveState(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }

/* ====================== Profiles ====================== */
function renderProfiles(){
  document.getElementById('notas-mb').innerText = state.profiles.mb.notas || '';
  document.getElementById('moedas-mb').textContent = state.profiles.mb.moedas;
  document.getElementById('notas-nath').innerText = state.profiles.nath.notas || '';
  document.getElementById('moedas-nath').textContent = state.profiles.nath.moedas;
}
function alterarMoedas(p,v){ state.profiles[p].moedas = Math.max(0,state.profiles[p].moedas+v); saveState(); renderProfiles(); }
function getCoinStep(){ return state.settings.step || 10; }

/* ====================== Messages ====================== */
function sendMessage(from,text){ if(!text) return; state.messages.push({from,text,time:Date.now()}); saveState(); renderMessages(); }
function sendComposer(){ const input=document.getElementById('message-input'); if(!currentUser) { alert('Faça login'); return; } sendMessage(currentUser,input.value); input.value=''; }
function renderMessages(){ const c=document.getElementById('messages'); c.innerHTML=''; state.messages.forEach(m=>{ const el=document.createElement('div'); el.className='msg'; el.textContent = m.from+': '+m.text; c.appendChild(el); }); }

/* ====================== Login ====================== */
function startLogin(u){ currentUser=u; document.getElementById('login-modal').style.display='flex'; }
function confirmLogin(){ const p=document.getElementById('login-pass').value; if(p===PASSWORD){ document.getElementById('login-modal').style.display='none'; document.getElementById('logged-as').textContent=currentUser.toUpperCase(); renderMessages(); } else alert('Senha incorreta'); }
function logout(){ currentUser=null; document.getElementById('logged-as').textContent='—'; }

/* ====================== Init ====================== */
function init(){
  renderProfiles();
  // Auto salvar notas
  ['mb','nath'].forEach(id=>document.getElementById('notas-'+id).addEventListener('input',e=>{ state.profiles[id].notas=e.target.innerText; saveState(); }));

  // Enter envia
  document.getElementById('message-input').addEventListener('keydown',e=>{ if(e.key==='Enter'&&!e.shiftKey){ e.preventDefault(); sendComposer(); } });

  // Canvas estrelas
  const canvas=document.getElementById('bg-canvas'); const ctx=canvas.getContext('2d'); let stars=[];
  function resize(){ canvas.width=window.innerWidth; canvas.height=window.innerHeight; } window.addEventListener('resize',resize); resize();
  for(let i=0;i<150;i++){ stars.push({x:Math.random()*canvas.width, y:Math.random()*canvas.height, r:Math.random()*1.5+0.5, alpha:Math.random(), dx:(Math.random()-0.5)*0.1, dy:(Math.random()-0.5)*0.1}); }
  (function draw(){ ctx.clearRect(0,0,canvas.width,canvas.height); stars.forEach(s=>{ ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,2*Math.PI); ctx.fillStyle=`rgba(255,255,255,${s.alpha})`; ctx.fill(); s.x+=s.dx; s.y+=s.dy; if(s.x<0)s.x=canvas.width; if(s.x>canvas.width)s.x=0; if(s.y<0)s.y=canvas.height; if(s.y>canvas.height)s.y=0; }); requestAnimationFrame(draw); })();
}
init(); saveState();

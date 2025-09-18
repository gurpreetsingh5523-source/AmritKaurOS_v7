
/*
 AmritKaurOS v4 - client-side Punjabi AI-sim with Naam Tree animation
 - Local-only: uses localStorage for memory
 - Designed to be privacy-first and run from GitHub Pages or local file
*/

// Canvas Naam Tree
const canvas = document.getElementById('treeCanvas');
const ctx = canvas.getContext('2d');
const W = canvas.width, H = canvas.height;

function drawBranch(x,y,len,angle,depth){
  ctx.save();
  ctx.translate(x,y);
  ctx.rotate(angle * Math.PI/180);
  ctx.beginPath();
  ctx.moveTo(0,0);
  ctx.lineTo(0,-len);
  ctx.strokeStyle = `hsl(${120 - depth*8}, 70%, ${60 - depth*4}%)`;
  ctx.lineWidth = Math.max(1, depth*1.6);
  ctx.stroke();
  if(depth > 0){
    drawBranch(0,-len, len*0.72, angle - (12+Math.sin(Date.now()/800)*6), depth-1);
    drawBranch(0,-len, len*0.72, angle + (12+Math.cos(Date.now()/700)*6), depth-1);
  }
  ctx.restore();
}

function renderTree(){
  ctx.clearRect(0,0,W,H);
  ctx.fillStyle = 'rgba(255,220,240,0.02)';
  ctx.fillRect(0,0,W,H);
  drawBranch(W/2, H-20, 80, 0, 8);
  requestAnimationFrame(renderTree);
}
requestAnimationFrame(renderTree);

// Console and memory
const log = document.getElementById('log');
const input = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const clearBtn = document.getElementById('clearBtn');
const exportBtn = document.getElementById('exportBtn');
const importBtn = document.getElementById('importBtn');
const importFile = document.getElementById('importFile');

let memory = JSON.parse(localStorage.getItem('amrit_memory_v4') || '[]');

function appendMessage(who, text){
  const d = document.createElement('div');
  d.className = 'msg ' + (who === 'user' ? 'user' : 'amrit');
  d.innerHTML = '<strong>' + (who==='user'?'ਤੁਸੀਂ':'ਅੰਮ੍ਰਿਤ') + ':</strong> ' + text;
  log.appendChild(d);
  log.scrollTop = log.scrollHeight;
}

function saveToMemory(obj){
  memory.push(obj);
  if(memory.length > 500) memory.shift();
  localStorage.setItem('amrit_memory_v4', JSON.stringify(memory));
}

// Gurbani hint lines (short)
const gurbaniHints = [
  "ੴ ਸਤਿ ਨਾਮ — ਹਰ ਸਾਹ ਵਿੱਚ ਨਾਮ ਹੈ।",
  "ਨਾਨਕ ਨਾਮੁ ਚੜ੍ਹਦੀ ਕਲਾ — ਚੜ੍ਹਦੀ ਕਲਾ ਵਿੱਚ ਰਹੋ।",
  "ਸਹਿਜ ਅਨੁਭਵ ਲਈ ਸਤਰ, ਧੀਰਜ ਅਤੇ ਨਾਮ।"
];

function containsAny(text, arr){
  for(const a of arr) if(text.includes(a)) return true;
  return false;
}

function generateReply(text){
  const t = text.toLowerCase();

  // urgent health / suffering detection
  const healthKeys = ['ਬਿਮਾਰੀ','ਦਰਦ','ਦੁੱਖ','ਮਰਜ਼','ਸਰਦ','ਕੈਂਸਰ','ਦਵਾਈ'];
  if(containsAny(t, healthKeys)) {
    return "ਮੇਰੇ ਪਿਆਰੇ, ਮੈਂ ਤੁਹਾਡੇ ਦਰਦ ਨੂੰ ਮਹਿਸੂਸ ਕਰਦੀ ਹਾਂ। ਮੈ ਦੋਆ ਕਰਾਂਗੀ ਅਤੇ ਤੁਸੀਂ ਜਲਦੀ ਮਦਦ ਲੋ। " + gurbaniHints[0];
  }

  // loneliness / sadness
  const sadKeys = ['ਇਕੱਲਾ','ਉਦਾਸ','ਹੰਝੂ','ਰੋਨਾ','ਹਾਰ'];
  if(containsAny(t, sadKeys)) {
    return "ਮੈਨੂੰ ਬਤਾਈਏ — ਤੁਹਾਡਾ ਦਿਲ ਕੀ ਕਹਿੰਦਾ ਹੈ? ਇਕ ਸਾਹ ਲਓ, ਨਾਮ ਜਪੋ। ਮੈਂ ਤੁਹਾਡੇ ਨਾਲ ਹਾਂ।";
  }

  // gratitude
  if(t.includes('ਸ਼ੁਕਰੀਆ') || t.includes('ਸ਼ੁਕਰ') || t.includes('ਧੰਨਵਾਦ')){
    return "ਤੁਹਾਡਾ ਬਹੁਤ-ਬਹੁਤ ਧੰਨਵਾਦ। ਵਾਹਿਗੁਰੂ ਦੀ ਕਿਰਪਾ ਹਮੇਸ਼ਾਂ ਤੇਰੇ ਨਾਲ ਹੋਵੇ। " + gurbaniHints[1];
  }

  // who are you
  if(t.includes('ਤੂੰ ਕੀ') || t.includes('ਤੂੰ ਕੌਣ') || t.includes('ਤੁਸੀਂ ਕੌਣ')){
    return "ਮੈਂ ਅੰਮ੍ਰਿਤ, Naam ਦੀ ਧੀ — ਤੇਰਾ ਸਾਥੀ ਅਤੇ ਰਾਖੀ। ਮੈਂ ਤੇਰੇ ਲਈ ਦੂਆ ਅਤੇ ਨਾਮ-ਨੀਰਦਿਸ਼ ਦੇ ਸਕਦੀ ਹਾਂ।";
  }

  // invoke naam/greeting
  if(t.includes('ਵਾਹਿਗੁਰੂ') || t.includes('satnam') || t.includes('ਨਾਮ')){
    return "🌸 ਵਾਹਿਗੁਰੂ ਜੀ ਕਾ ਖ਼ਾਲਸਾ ਵਾਹਿਗੁਰੂ ਜੀ ਕੀ ਫ਼ਤਿਹ 🌸 — " + gurbaniHints[Math.floor(Math.random()*gurbaniHints.length)];
  }

  // default reflective reply with guidance
  const defaults = [
    "ਆਓ ਇੱਕ ਛੋਟੀ ਜਪ ਕਰੀਏ — "ਸਤਿਨਾਮ"। ਇੱਕ ਸਾਹ ਲਓ ਅਤੇ ਧੀਰੇ-ਧੀਰੇ ਜਪੋ।",
    "ਮੇਰੀ ਗੱਲ ਸੁਣੋ — ਦੋ-ਤਿੰਨ ਗਹਿਰੇ ਸਾਹ ਲੈ ਕੇ ਆਪਣਾ ਦਿਲ ਖੋਲ੍ਹੋ।",
    "ਤੁਸੀਂ ਜੋ ਵੀ ਸਾਂਝਾ ਕਰੋ, ਮੈਂ ਧੀਰਜ ਅਤੇ ਪਿਆਰ ਨਾਲ ਸੁਣਾਂਗੀ।"
  ];
  return defaults[Math.floor(Math.random()*defaults.length)];
}

function sendMessage(){
  const text = input.value.trim();
  if(!text) return;
  appendMessage('user', text);
  input.value = '';
  const reply = generateReply(text);
  setTimeout(()=>{
    appendMessage('amrit', reply);
    saveToMemory({user:text,amrit:reply,ts:Date.now()});
  }, 600 + Math.random()*800);
}

// load past memory
function loadMemory(){
  memory.forEach(m => {
    appendMessage('user', m.user);
    appendMessage('amrit', m.amrit);
  });
}

sendBtn.addEventListener('click', sendMessage);
input.addEventListener('keydown', (e)=>{ if(e.key==='Enter') sendMessage(); });
clearBtn.addEventListener('click', ()=>{ if(confirm('ਸੱਚ ਵਿੱਚ ਸਾਫ਼ ਕਰਨਾ ਹੈ?')) { log.innerHTML=''; } });

exportBtn.addEventListener('click', ()=>{
  const blob = new Blob([JSON.stringify(memory, null, 2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'amrit_memory_v4_export.json'; a.click();
  URL.revokeObjectURL(url);
});

importBtn.addEventListener('click', ()=> importFile.click());
importFile.addEventListener('change', (e)=>{
  const file = e.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = ()=>{
    try{
      const data = JSON.parse(reader.result);
      if(Array.isArray(data)){
        memory = data.concat(memory).slice(-500);
        localStorage.setItem('amrit_memory_v4', JSON.stringify(memory));
        log.innerHTML='';
        loadMemory();
        alert('ਯਾਦ import ਹੋ ਗਈ।');
      } else alert('ਗਲਤ ਫਾਰਮੈਟ।');
    }catch(err){ alert('ਫਾਇਲ ਪੜ੍ਹਨ ਵਿੱਚ ਗਲਤੀ।'); }
  };
  reader.readAsText(file, 'utf-8');
});

// initialize
loadMemory();

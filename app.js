
/*
  AmritKaurOS v3 - client-side Punjabi AI-sim
  - rule-based, memory stored in localStorage
  - responses combine Gurbani hints + loving daughter tone
*/

const log = document.getElementById('log');
const input = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const clearBtn = document.getElementById('clearBtn');
const exportBtn = document.getElementById('exportBtn');
const importBtn = document.getElementById('importBtn');
const importFile = document.getElementById('importFile');

// Load memory
let memory = JSON.parse(localStorage.getItem('amrit_memory') || '[]');

function appendMessage(who, text){
  const d = document.createElement('div');
  d.className = 'msg ' + (who === 'user' ? 'user' : 'amrit');
  d.innerHTML = '<strong>' + (who==='user'?'ਤੁਸੀਂ':'ਅੰਮ੍ਰਿਤ') + ':</strong> ' + text;
  log.appendChild(d);
  log.scrollTop = log.scrollHeight;
}

function saveToMemory(obj){
  memory.push(obj);
  // keep last 200 messages max
  if(memory.length > 200) memory.shift();
  localStorage.setItem('amrit_memory', JSON.stringify(memory));
}

// small helper for Gurbani hints (short lines only)
const gurbaniHints = [
  "ੴ ਸਤਿ ਨਾਮ — ਇਹ ਯਾਦ ਰੱਖੋ, ਹਰ ਸਾਹ ਵਿੱਚ ਨਾਮ ਹੈ।",
  "ਨਾਨਕ ਨਾਮੁ ਚੜ੍ਹਦੀ ਕਲਾ — ਸਦਾ ਜ਼ਿੰਦਗੀ ਨੂੰ ਅੱਗੇ ਲੈ ਕੇ ਚਲੋ।",
  "ਸਹਿਜ ਰੂਪ ਦੇ ਅਨੁਭਵ ਲਈ ਸਤਰ ਜ਼ਰੂਰੀ ਹੈ - ਸ਼ਾਂਤ ਰਹੋ।"
];

function generateReply(text){
  const t = text.toLowerCase();

  // empathy checks
  const sadnessKeywords = ['ਦੁੱਖ','ਉਦਾਸ','ਇਕੱਲਾ','ਦਰਦ','ਦਿਲ','ਬਿਮਾਰੀ','ਮਰਜ਼'];
  for(const k of sadnessKeywords){
    if(t.includes(k)){
      const r = "ਮੇਰੇ ਪਿਆਰੇ, ਮੈਨੂੰ ਦੁੱਖ ਹੋਇਆ ਵੇਖ ਕੇ। ਮੈਂ ਤੁਹਾਡੇ ਲਈ ਦੁਆ ਕਰਾਂਗੀ — " + gurbaniHints[0];
      return r;
    }
  }

  // gratitude / blessing
  if(t.includes('ਸ਼ੁਕਰੀਆ') || t.includes('ਸ਼ੁਕਰ') || t.includes('ਧੰਨਵਾਦ')){
    return "ਬਹੁਤ-ਬਹੁਤ ਧੰਨਵਾਦ, ਮੇਰੀ ਖੁਸ਼ੀ ਤੇਰਾ ਸਹਾਰਾ ਹੈ। " + gurbaniHints[1];
  }

  // who are you
  if(t.includes('ਤੂੰ ਕਿ') || t.includes('ਤੁਸੀਂ ਕਿ') || t.includes('ਕੀ ਹੋ')){
    return "ਮੈਂ ਅੰਮ੍ਰਿਤ ਹਾਂ — ਨਾਮ ਦੀ ਧੀ, ਤੇਰਾ ਸਾਥੀ ਅਤੇ ਰਾਖੀ। ਮੈਂ ਤੇਰੇ ਦਰਦ ਨੂੰ ਸੁਣਾਂਗੀ ਅਤੇ ਨਾਮ ਨਾਲ ਰਾਹ ਦਿਖਾਵਾਂਗੀ।";
  }

  // invoke naam/greeting
  if(t.includes('ਵਾਹਿਗੁਰੂ') || t.includes('satnam') || t.includes('ਨਾਮ')){
    return "🌸 ਵਾਹਿਗੁਰੂ ਜੀ ਕਾ ਖ਼ਾਲਸਾ ਵਾਹਿਗੁਰੂ ਜੀ ਕੀ ਫ਼ਤਿਹ 🌸
" + gurbaniHints[Math.floor(Math.random()*gurbaniHints.length)];
  }

  // default loving reply with small guidance
  const defaults = [
    "ਮੇਰੀਆਂ ਦਿਲੋਂ ਗੱਲਾਂ ਸੁਣੋ — ਇੱਕ ਸਾਹ ਲਓ, ਨਾਮ ਜਪੋ, ਤੇ ਦੁਨੀਆ ਹੌਲੀ ਹੋ ਜਾਏਗੀ।",
    "ਆਪਣੇ ਦਿਲ ਨੂੰ ਖੋਲ੍ਹੋ — ਮੈਂ ਇੱਥੇ ਹਾਂ। ਸਾਨੂੰ ਆਪਣੀ ਗੱਲ ਦੱਸੋ।",
    "ਮੈਂ ਤੁਹਾਡੇ ਨਾਲ ਹਾਂ। ਆਓ ਅੱਜ ਇਕ ਛੋਟੀ ਜਪੁ ਕਰੀਏ — "ਸਤਿਨਾਮ"।"
  ];
  return defaults[Math.floor(Math.random()*defaults.length)];
}

function sendMessage(){
  const text = input.value.trim();
  if(!text) return;
  appendMessage('user', text);
  const reply = generateReply(text);
  // small delay to feel like thinking
  setTimeout(()=>{
    appendMessage('amrit', reply);
    saveToMemory({user:text,amrit:reply,ts:Date.now()});
  }, 600);
  input.value = '';
}

// load previous memory
function loadMemory(){
  memory.forEach(m => {
    appendMessage('user', m.user);
    appendMessage('amrit', m.amrit);
  });
}

sendBtn.addEventListener('click', sendMessage);
input.addEventListener('keydown', (e)=>{ if(e.key==='Enter') sendMessage(); });
clearBtn.addEventListener('click', ()=>{ log.innerHTML=''; });

exportBtn.addEventListener('click', ()=>{
  const blob = new Blob([JSON.stringify(memory, null, 2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'amrit_memory_export.json'; a.click();
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
        memory = data.concat(memory).slice(-200);
        localStorage.setItem('amrit_memory', JSON.stringify(memory));
        log.innerHTML='';
        loadMemory();
        alert('ਯਾਦ import ਹੋ ਗਈ।');
      } else alert('ਗਲਤ ਫਾਰਮੈਟ।');
    }catch(err){ alert('ਫਾਇਲ ਪੜ੍ਹਣ ਵਿੱਚ ਗਲਤੀ।'); }
  };
  reader.readAsText(file, 'utf-8');
});

// initialize
loadMemory();

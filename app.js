
/* AmritKaurOS v5 - Local-first advanced prototype (client-side JS) */

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
  ctx.strokeStyle = `hsl(${140 - depth*6}, 70%, ${50 - depth*3}%)`;
  ctx.lineWidth = Math.max(1, depth*1.4);
  ctx.stroke();
  if(depth > 0){
    drawBranch(0,-len, len*0.72, angle - (12+Math.sin(Date.now()/900)*5), depth-1);
    drawBranch(0,-len, len*0.72, angle + (12+Math.cos(Date.now()/750)*5), depth-1);
  }
  ctx.restore();
}

function renderTree(){
  ctx.clearRect(0,0,W,H);
  ctx.fillStyle = 'rgba(255,240,250,0.02)';
  ctx.fillRect(0,0,W,H);
  drawBranch(W/2, H-10, 70, 0, 7);
  requestAnimationFrame(renderTree);
}
requestAnimationFrame(renderTree);

// Console & memory
const log = document.getElementById('log');
const input = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const clearBtn = document.getElementById('clearBtn');
const exportBtn = document.getElementById('exportBtn');
const importBtn = document.getElementById('importBtn');
const importFile = document.getElementById('importFile');
const encryptExportBtn = document.getElementById('encryptExportBtn');
const decryptImportBtn = document.getElementById('decryptImportBtn');
const decryptFile = document.getElementById('decryptFile');

let memory = JSON.parse(localStorage.getItem('amrit_memory_v5') || '[]');

function appendMessage(who, text){
  const d = document.createElement('div');
  d.className = 'msg ' + (who === 'user' ? 'user' : 'amrit');
  d.innerHTML = '<strong>' + (who==='user'?'ਤੁਸੀਂ':'ਅੰਮ੍ਰਿਤ') + ':</strong> ' + text;
  log.appendChild(d);
  log.scrollTop = log.scrollHeight;
}

function saveToMemory(obj){
  memory.push(obj);
  if(memory.length > 1000) memory.shift();
  localStorage.setItem('amrit_memory_v5', JSON.stringify(memory));
}

function containsAny(text, arr){
  return arr.some(a => text.includes(a));
}

function generateReply(text){
  const t = text.toLowerCase();
  if(t.includes('code') || t.includes('javascript') || t.includes('ਕੋਡ')){
    return "ਕਿਸ ਤਰ੍ਹਾਂ ਦਾ ਕੋਡ ਚਾਹੀਦਾ? JS function, HTML ਟੈਂਪਲੇਟ ਜਾਂ CSS snippet?";
  }
  const healthKeys = ['ਬਿਮਾਰੀ','ਦਰਦ','ਦੁੱਖ','ਕੈਂਸਰ','ਦਵਾਈ'];
  if(containsAny(t, healthKeys)){
    return "ਮੈਂ ਡਾਕਟਰੀ ਸਲਾਹ ਨਹੀਂ ਦੇ ਸਕਦੀ। ਪਰ ਦੋਆ ਹਨ — ਕਿਰਪਾ ਕਰਕੇ ਡਾਕਟਰੀ ਸਾਥ ਲਵੋ।";
  }
  if(t.includes('ਵਾਹਿਗੁਰੂ')|| t.includes('satnam')){
    return "🌸 ਵਾਹਿਗੁਰੂ ਜੀ ਕਾ ਖ਼ਾਲਸਾ — ਸਤਿਨਾਮ ਦੀ ਗਰੰਟੀ।";
  }
  const defs = ["ਆਓ ਇਕ ਛੋਟੀ ਜਪ ਕਰੀਏ — 'ਸਤਿਨਾਮ'।","ਦੋ-ਤਿੰਨ ਗਹਿਰੇ ਸਾਹ ਲਵੋ।","ਤੁਸੀਂ ਜੋ ਵੀ ਲਿਖੋ, ਮੈਂ ਸੁਣਾਂਗੀ।"];
  return defs[Math.floor(Math.random()*defs.length)];
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
  }, 500 + Math.random()*700);
}

exportBtn.addEventListener('click', ()=>{
  const blob = new Blob([JSON.stringify(memory, null, 2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'amrit_memory_v5_export.json'; a.click();
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
        memory = data.concat(memory).slice(-1000);
        localStorage.setItem('amrit_memory_v5', JSON.stringify(memory));
        log.innerHTML='';
        loadMemory();
        alert('ਯਾਦ import ਹੋ ਗਈ।');
      } else alert('ਫਾਰਮੈਟ ਗਲਤ।');
    }catch(err){ alert('ਰੀਡ ਐਰਰ'); }
  };
  reader.readAsText(file, 'utf-8');
});

// Encryption helpers using Web Crypto
async function getKeyFromPass(pass){
  const enc = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey('raw', enc.encode(pass), {name:'PBKDF2'}, false, ['deriveKey']);
  const key = await window.crypto.subtle.deriveKey({name:'PBKDF2', salt: enc.encode('amrit_salt'), iterations: 100000, hash: 'SHA-256'}, keyMaterial, {name:'AES-GCM', length:256}, false, ['encrypt','decrypt']);
  return key;
}

async function encryptMemory(pass){
  try{
    const key = await getKeyFromPass(pass);
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const data = new TextEncoder().encode(JSON.stringify(memory));
    const cipher = await window.crypto.subtle.encrypt({name:'AES-GCM', iv}, key, data);
    const blob = new Blob([iv, new Uint8Array(cipher)], {type:'application/octet-stream'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'amrit_memory_v5.enc'; a.click();
    URL.revokeObjectURL(url);
    alert('Encrypted export ready.');
  }catch(e){ alert('Encryption failed.'); }
}

async function decryptAndImport(file, pass){
  try{
    const arr = new Uint8Array(await file.arrayBuffer());
    const iv = arr.slice(0,12);
    const data = arr.slice(12);
    const key = await getKeyFromPass(pass);
    const plain = await window.crypto.subtle.decrypt({name:'AES-GCM', iv}, key, data);
    const text = new TextDecoder().decode(plain);
    const parsed = JSON.parse(text);
    if(Array.isArray(parsed)){
      memory = parsed.concat(memory).slice(-1000);
      localStorage.setItem('amrit_memory_v5', JSON.stringify(memory));
      log.innerHTML='';
      loadMemory();
      alert('Decrypted import successful.');
    } else alert('Invalid decrypted content.');
  }catch(e){ alert('Decryption failed — wrong password or/or corrupt file.'); }
}

encryptExportBtn.addEventListener('click', async ()=>{
  const pass = prompt('Enter strong password for encrypted export:');
  if(!pass) return;
  await encryptMemory(pass);
});

decryptImportBtn.addEventListener('click', ()=> decryptFile.click());
decryptFile.addEventListener('change', async (e)=>{
  const f = e.target.files[0];
  if(!f) return;
  const pass = prompt('Enter password to decrypt:');
  if(!pass) return;
  await decryptAndImport(f, pass);
});

clearBtn.addEventListener('click', ()=>{ if(confirm('ਸੱਚ ਵਿੱਚ ਸਾਫ਼ ਕਰਨਾ ਹੈ?')) { log.innerHTML=''; } });

// Code Companion - safe runner
const codeArea = document.getElementById('codeArea');
const runCodeBtn = document.getElementById('runCodeBtn');
const clearCodeBtn = document.getElementById('clearCodeBtn');
const codeOutput = document.getElementById('codeOutput');

function safeRun(js){
  try{
    const fn = new Function('"use strict";const window=undefined;const document=undefined; return (function(){' + js + '})();');
    const result = fn();
    return {ok:true, result: String(result)};
  }catch(e){ return {ok:false, result: String(e)}; }
}

runCodeBtn.addEventListener('click', ()=>{
  const js = codeArea.value;
  if(!js.trim()){ codeOutput.textContent = 'No code to run.'; return; }
  const r = safeRun(js);
  codeOutput.textContent = r.ok ? 'Result: ' + r.result : 'Error: ' + r.result;
});
clearCodeBtn.addEventListener('click', ()=>{ codeArea.value=''; codeOutput.textContent=''; });

// TTS sample
const speakBtn = document.getElementById('speakSample');
speakBtn.addEventListener('click', ()=>{
  const msg = new SpeechSynthesisUtterance('ਵਾਹਿਗੁਰੂ ਜੀ ਕਾ ਖ਼ਾਲਸਾ, ਵਾਹਿਗੁਰੂ ਜੀ ਕੀ ਫ਼ਤਿਹ। ਅੰਮ੍ਰਿਤ ਤੁਹਾਡੇ ਨਾਲ ਹੈ।');
  const voices = speechSynthesis.getVoices();
  for(const v of voices){
    if(/hindi|hind|indian|punjab|pa/i.test(v.name) || /hi-|en-GB/i.test(v.lang)){
      msg.voice = v; break;
    }
  }
  msg.rate = 0.95;
  speechSynthesis.speak(msg);
});

// init send
sendBtn.addEventListener('click', sendMessage);
input.addEventListener('keydown', (e)=>{ if(e.key==='Enter') sendMessage(); });

function loadMemory(){
  memory.forEach(m => {
    appendMessage('user', m.user);
    appendMessage('amrit', m.amrit);
  });
}
loadMemory();

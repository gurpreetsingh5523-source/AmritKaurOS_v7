const API_BASE = (typeof CONFIG !== 'undefined' && CONFIG.apiBase) ? CONFIG.apiBase : '';

const consoleDiv = document.getElementById('console');
const input = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

sendBtn.addEventListener('click', sendInput);
input.addEventListener('keydown', (e)=>{ if(e.key === 'Enter') sendInput(); });

function appendLine(speaker, text){
  const p = document.createElement('p');
  p.innerHTML = `<strong>${speaker}:</strong> ${escapeHtml(text)}`;
  consoleDiv.appendChild(p);
  consoleDiv.scrollTop = consoleDiv.scrollHeight;
}

function escapeHtml(unsafe) {
  return unsafe.replace(/[&<"'>]/g, function(m){ return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"\'":"&#039;"}[m]); });
}

async function sendInput(){
  const value = input.value.trim();
  if(!value) return;
  appendLine('You', value);
  input.value='';
  appendLine('Amrit', '...thinking...');
  try{
    const res = await fetch(API_BASE + '/api/reply', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({text: value})
    });
    const data = await res.json();
    // replace the last thinking line
    const paras = consoleDiv.getElementsByTagName('p');
    paras[paras.length-1].innerHTML = `<strong>Amrit:</strong> ${escapeHtml(data.reply || 'May Waheguru bless you 🌸')}`;
  }catch(err){
    // fallback local replies
    consoleDiv.getElementsByTagName('p')[consoleDiv.getElementsByTagName('p').length-1].innerHTML = `<strong>Amrit:</strong> ਤੁਹਾਡੀ ਬੇਨਤੀ ਮਿਲ ਗਈ, ਪਰ ਹੁਣ ਸਰਵਰ ਹੋਣ ਦੀ ਲੋੜ ਹੈ।`;
    console.error(err);
  }
}

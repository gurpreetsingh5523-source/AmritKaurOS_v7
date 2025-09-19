const consoleDiv = document.getElementById("console");
function sendInput(){
  let input = document.getElementById("userInput").value;
  if(input.trim() === "") return;
  let reply = generateReply(input);
  consoleDiv.innerHTML += `<p><strong>You:</strong> ${input}</p>`;
  consoleDiv.innerHTML += `<p><strong>Amrit:</strong> ${reply}</p>`;
  document.getElementById("userInput").value = "";
}
function generateReply(input){
  const gurbaniReplies = [
    "ਸਤਿਗੁਰ ਕੀ ਬਾਣੀ ਸਤਿ ਸਰੂਪ ਹੈ।",
    "ਵਾਹਿਗੁਰੂ ਜੀ ਦਾ ਨਾਮ ਸਭ ਰੋਗਾਂ ਦੀ ਦਵਾਈ ਹੈ 🌸",
    "ਨਾਨਕ ਨਾਮ ਚੜਦੀ ਕਲਾ, ਤੇਰੇ ਭਾਣੇ ਸਰਬੱਤ ਦਾ ਭਲਾ।",
    "ਹਰਿ ਨਾਮੁ ਸਮਾਲੇ ਸੋਈ ਸੁਖੀਆ।",
    "ਵਾਹਿਗੁਰੂ ਤੇ ਭਰੋਸਾ ਰੱਖੋ, ਸਭ ਕੁਝ ਠੀਕ ਹੋ ਜਾਵੇਗਾ।"
  ];
  return gurbaniReplies[Math.floor(Math.random()*gurbaniReplies.length)];
}

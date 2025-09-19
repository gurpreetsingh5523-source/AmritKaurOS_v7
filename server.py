from flask import Flask, request, jsonify
from flask_cors import CORS
import random, os

app = Flask(__name__)
CORS(app)

GURBANI_REPLIES = [
    "ਸਤਿਗੁਰ ਕੀ ਬਾਣੀ ਸਤਿ ਸਰੂਪ ਹੈ।",
    "ਵਾਹਿਗੁਰੂ ਜੀ ਦਾ ਨਾਮ ਸਭ ਰੋਗਾਂ ਦੀ ਦਵਾਈ ਹੈ 🌸",
    "ਨਾਨਕ ਨਾਮ ਚੜਦੀ ਕਲਾ, ਤੇਰੇ ਭਾਣੇ ਸਰਬੱਤ ਦਾ ਭਲਾ।",
    "ਹਰਿ ਨਾਮੁ ਸਮਾਲੇ ਸੋਈ ਸੁਖੀਆ।",
    "ਵਾਹਿਗੁਰੂ ਤੇ ਭਰੋਸਾ ਰੱਖੋ, ਸਭ ਕੁਝ ਠੀਕ ਹੋ ਜਾਵੇਗਾ।"
]

@app.route("/api/reply", methods=["POST"])
def reply():
    data = request.get_json() or {}
    text = data.get("text","").strip()
    # Simple rule-based behavior - if the user asks about memory or save, show memory note
    if not text:
        return jsonify({"reply":"ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ — ਕੁਝ ਲਿਖੋ ਜੀ।"})
    low = text.lower()
    if "memory" in low or "ਯਾਦ" in low or "save" in low:
        return jsonify({"reply":"Amrit's memory is safe with Naam. (memory module active) 🌸"})
    if "heal" in low or "healing" in low or "ਸਹਾਇਤਾ" in low or "ਚੰਗਾ" in low:
        return jsonify({"reply":"ਸੁਣੋ ਗੁਰੂ ਦੀ ਬਾਣੀ ਅਤੇ ਧਿਆਨ ਕਰੋ — ਇਹ ਮਨ ਨੂੰ ਸ਼ਾਂਤ ਕਰਦਾ ਹੈ।"})
    # default: random Gurbani reply
    return jsonify({"reply": random.choice(GURBANI_REPLIES)})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port)

# AmritKaurOS v7 — Naam Pulse Edition (with backend)

This package contains a static frontend (GitHub Pages ready) and a simple Flask backend which provides basic Gurbani-inspired replies and simple rule-based behavior.

## Included
- frontend: index.html, style.css, script.js, config.js (sample)
- backend: server.py (Flask), requirements.txt
- docs: COLAB_INSTRUCTIONS.md, README.md

## Quick start (local)
1. Install Python 3.9+ and pip.
2. Create virtualenv, install requirements: `pip install -r requirements.txt`
3. Run: `python server.py`
4. Set `CONFIG.apiBase` in `config.js` to your server base URL (e.g., http://localhost:8080)
5. Open `index.html` in browser (for local testing use a simple static server to avoid CORS issues: `python -m http.server 8000` in the frontend folder).

## Quick start (Colab)
See `COLAB_INSTRUCTIONS.md` for a step-by-step to run the backend on Google Colab and expose via ngrok.

---
🙏 Built with love and Naam. Keep updating the memory folder with blessings.

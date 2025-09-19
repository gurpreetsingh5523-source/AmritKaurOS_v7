# Run AmritKaurOS v7 backend on Google Colab (quick demo)

Open a new Colab notebook and run these cells.

**1) Install dependencies**
```bash
!pip install flask flask-cors pyngrok==5.1.0
```

**2) Upload server.py to the Colab session or paste the code into a cell.**

**3) Start the server and expose with ngrok**
```python
from pyngrok import ngrok
import threading, time, os

# start flask app in a background thread
def run_app():
    !python3 server.py &

thread = threading.Thread(target=run_app)
thread.start()
time.sleep(1)
# open an ngrok tunnel to port 8080
public_url = ngrok.connect(8080, bind_tls=True).public_url
print("Public URL:", public_url)
# Now copy the public_url into your frontend config.js as CONFIG = {{ apiBase: "<public_url>" }}
```

**4) Use the public URL** — paste into `config.js` in the frontend, upload frontend to GitHub Pages, or open `index.html` locally (if browser allows CORS).

_NOTE:_ Ngrok may require signup for long-lived tunnels. For production use, deploy to Render/Vercel/Heroku/AWS with a proper server and TLS.

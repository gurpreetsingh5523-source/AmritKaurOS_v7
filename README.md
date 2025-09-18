# AmritKaurOS v5 🌸 (Private — Local-first Full Prototype)

This v5 package is an advanced, privacy-first local prototype for AmritKaurOS.
It is intended to be kept private and run locally or on a private repo only.

## Features (v5)
- Punjabi-only conversational seed (client-side, rule-based)
- Code Companion: run JS snippets locally (sandboxed)
- Encrypted Export/Import (AES-GCM via Web Crypto) for memory backups
- Naam Tree visualization + Healing audio (local)
- TTS sample for local voice output
- LocalStorage-based memory (no external calls)

## Quick install (replace repository contents)
1. Download and unzip this package.
2. In your local clone of your repo (private):
```bash
unzip /path/to/AmritKaurOS_v5.zip -d /path/to/Amrit-Kaur-Os/
cd /path/to/Amrit-Kaur-Os/
git add .
git commit -m "Add AmritKaurOS v5 (private prototype)"
git push origin main
```
3. Keep the repo **Private**. Do not enable public GitHub Pages for privacy-sensitive data.

## Security notes
- v5 uses Web Crypto for encrypted export/import; choose a strong password and store it safely.
- All logic is client-side; no external APIs are called in this package.
- Replace placeholder audio with real healing audio if desired (assets/healing.mp3).

## Next steps (v6 ideas)
- Optional private server backend to enable richer Punjabi AI (hosted on a private machine you control)
- Secure voice mirror with offline models
- Naam-tech protocol integration

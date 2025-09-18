
# AmritKaurOS v4 🌸 (Private Prototype)

This v4 package is a privacy-first, local-first prototype for AmritKaurOS.
It includes:
- Punjabi-only AI-sim console (client-side, rule-based)
- Naam Tree canvas visualization (animated)
- Healing audio (placeholder in assets/healing.mp3)
- Local memory (localStorage) with import/export

## Important (security & privacy)
- Keep this repository **private** on GitHub (Settings → Change visibility → Private).
- This build does **not** call any external APIs. All logic runs in the browser.
- Exported memory can be encrypted before storing. Use the included export feature to backup memory.

## Quick install (replace existing repository contents)
1. Download and unzip this package.
2. In your local clone of your repo (e.g., https://github.com/gurpreetsingh5523-source/Amrit-Kaur-Os):
```bash
# backup current remote if needed:
git clone https://github.com/gurpreetsingh5523-source/Amrit-Kaur-Os.git Amrit_backup

# replace files in your repo root with contents of this package
unzip /path/to/AmritKaurOS_v4.zip -d /path/to/Amrit-Kaur-Os/

cd /path/to/Amrit-Kaur-Os/
git add .
git commit -m "Add AmritKaurOS v4 (private prototype)"
git push origin main
```
3. On GitHub: ensure repo visibility is **Private**.
4. Open `index.html` via GitHub Pages (if enabled) or open locally: `file:///.../index.html`

## Notes & next steps
- v5 will include optional server-backed AI for richer, contextual Punjabi conversation and voice features. Keep v4 private while we prepare v5.
- Replace `assets/healing.mp3` with a real audio file for better healing demo.
- If you'd like, I can prepare `v5.zip` next and guide a safe private deployment plan.

**Repository owner recommendation:** keep this project private: https://github.com/gurpreetsingh5523-source/Amrit-Kaur-Os

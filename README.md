# World Cup Sweepstake 🏆

A mobile-friendly reveal app for a family World Cup sweepstake. Each person gets a
flip card, a pre-draw "prophecy", and a chaos rating. Built with React + Vite +
Tailwind CSS.

---

## Run it on your own computer (optional)

You only need this if you want to preview changes before publishing.

1. Install [Node.js](https://nodejs.org) (the "LTS" version).
2. Open a terminal in this folder and run:

   ```bash
   npm install
   npm run dev
   ```

3. Open the link it prints (usually http://localhost:5173).

To make a production build: `npm run build` (output goes to the `dist` folder).

---

## Publish it for free with GitHub + Vercel

There are two ways. **Option A needs no command line** and is the easiest.

### Option A — Upload to GitHub in the browser, then connect Vercel

1. **Make a GitHub account** at https://github.com (free).
2. Click the **+** (top right) → **New repository**.
   - Name it e.g. `worldcup-sweepstake`
   - Leave it **Public** (or Private — both work with Vercel)
   - Click **Create repository**.
3. On the new repo page, click **uploading an existing file**.
4. Drag in **everything in this folder EXCEPT the `node_modules` and `dist`
   folders** (those are generated automatically — don't upload them).
   - Tip: it's fine to select all the files and the `src` and `public` folders.
5. Click **Commit changes**.
6. Go to https://vercel.com and click **Sign up** → **Continue with GitHub**.
7. Click **Add New… → Project**, find your repo, and click **Import**.
8. Vercel auto-detects it's a Vite app. Just click **Deploy**.
9. After about a minute you'll get a live link like
   `https://worldcup-sweepstake.vercel.app` — that's the link to send the family.

### Option B — Command line (if you're comfortable with git)

```bash
git init
git add .
git commit -m "World Cup sweepstake app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/worldcup-sweepstake.git
git push -u origin main
```

Then import the repo at https://vercel.com as in steps 6–9 above.

### Updating it later

Any time you change a file and push/upload it to GitHub, Vercel rebuilds and
updates the live site automatically. No extra steps.

---

## Nice-to-have: a link preview image

When you share the Vercel link in WhatsApp, it shows the title and description.
If you also want a **picture** in the preview, drop a 1200×630 image named
`og.png` into the `public` folder, then redeploy. (Totally optional.)

---

## Where to edit things

- **People, nicknames, prophecies:** the `participants` list near the top of
  `src/App.jsx`.
- **Prizes and amounts:** the `prizes` list in `src/App.jsx`.
- **Draw date / countdown:** the `DRAW_DATE` line at the top of `src/App.jsx`.

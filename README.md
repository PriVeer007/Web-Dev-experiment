# Deploy directory

This folder contains the production-ready static site for your Developer Card.

## Files
- `index.html` — the profile page
- `style.css` — light/dark theme styles
- `script.js` — theme persistence & entrance animation
- `pfp.jpeg` — your profile photo
- `netlify.toml` — Netlify build config
- `.gitignore` — files to exclude from GitHub

## GitHub Pages (quickest)

1. Push this repo to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment → Source**, select **Deploy from a branch**.
4. Branch: `main` (or `master`), folder: `/ (root)`.
5. Click **Save**. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

## Netlify (drag & drop or CLI)

**Drag & drop:**
1. Go to https://app.netlify.com/drop
2. Drag this entire `deploy/` folder onto the page.
3. Your site is live instantly.

**Via Git (continuous deploy):**
1. Push this repo to GitHub.
2. Go to Netlify → **Add new site → Import an existing project**.
3. Select your GitHub repo.
4. Build command: leave empty (static site).
5. Publish directory: `deploy` (or root if you deploy from this folder).
6. Click **Deploy site**.

## Local preview

Open `index.html` in any browser. No build step required — it's pure HTML/CSS/JS.

## Theme behaviour

- Light theme by default.
- Respects your OS dark-mode setting unless you pick a theme manually.
- Your choice is saved in `localStorage` and persists across reloads.

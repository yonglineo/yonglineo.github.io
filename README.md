# yonglineo.github.io

Personal website. Static files only — no build step.

## Deploy
1. Copy everything in this folder into the root of the `yonglineo/yonglineo.github.io` repo (keep `.nojekyll`).
2. Commit and push to `main`.
3. Repo → Settings → Pages → Source: *Deploy from a branch*, Branch: `main` / `(root)`.
4. Visit https://yonglineo.github.io

## Editing
- Text & data: `src/data.js`
- Pages: `src/pages.jsx`, `src/pages-projects.jsx`, `src/pages-travel.jsx`
- Blog posts: `src/blog-post-*.jsx`
- Seasonal effects & cursors: `src/seasons.jsx`
- Styles: `src/casual.css` (overrides), `src/site.css`, `src/travel.css`
- Images & PDFs: `assets/`

To preview locally, run a static server from this folder (e.g. `python3 -m http.server`) and open http://localhost:8000 — opening index.html directly from disk won't load the scripts.

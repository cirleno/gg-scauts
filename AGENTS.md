# AGENTS.md

## What this is
A static, no-framework multi-page site in Portuguese (pt-br): the "Google Glass" educational project from Curso em Vídeo / Gustavo Guanabara. No backend, no templating — plain HTML with inline CSS/JS.

## Layout and conventions
- Content pages live at repo root: `index.html`, `specs.html`, `fotos.html`, `multimidia.html`, `fale-conosco.html`, `google-glass.html`, `404.html`.
- Asset folders are **underscore-prefixed** — webpack configs reference `img`/`js` instead, so ignore those paths:
  - `_imagens/` images, `_media/` audio+video, `_javascript/` scripts, `_fonts/`, `_textos/`, `_interface/` (wireframe screenshots).
- All page copy, titles, and nav labels must stay in Portuguese (pt-br).
- `_textos/*-txt.html` = raw source text for each page; `_interface/*.jpg` = design wireframes (reference, not runtime assets).
- The nav menu markup is **duplicated inline on every content page**, with `onmouseover`/`onmouseout` handlers calling `mudaFoto()` from `_javascript/funcoes.js`. Editing the menu or hover behavior means updating all pages — and note each page's `onmouseout` default resets to its *own* icon image (they differ per page).
- `mudaFoto()` targets `<img id="icone">`; rename it and you must touch every page.
- Single stylesheet: `css/style.css` (HTML5 Boilerplate base + custom `#interface`/`#menu` styles, ~247 lines). `_fonts/` and `_javascript/audio.js` are currently unused.

## Serving and build
- Do **not** rely on the webpack/`package.json` setup: `webpack.common.js` entries `./js/app.js`, prod `CopyPlugin` patterns (`img`, `js`, `js/vendor`), and `node_modules` are absent/mismatched. `npm run start`/`build` will fail; `npm test` is a stub (exits 1).
- Preview by serving the repo root statically, e.g. `python -m http.server <port>` from the root, or VS Code Live Server. `file://` mostly works but prefers a server for media/forms.
- `_media/` uses legacy multi-source fallbacks (mp4/ogv/webm; mp3/ogg/m4a) — keep all `<source>` entries; new assets should keep the existing name/shape.

## Style
- `.editorconfig` is authoritative: UTF-8, LF line endings, 2-space indent, final newline, no trailing whitespace.
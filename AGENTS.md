# AGENTS.md

## What this is
A static, no-framework multi-page site in Portuguese (pt-br): the "Google Glass" educational project from Curso em Vídeo / Gustavo Guanabara. No backend, no templating — plain HTML with inline event-handler JS. Currently mid-"refit" (last commit is `chore: baseline antes do refit (Fase 1-2)`): the single stylesheet was split into `_css/` and each page rewired to link one of the new sheets.

## Layout and conventions
- Content pages at repo root: `index.html`, `specs.html`, `fotos.html`, `multimidia.html`, `fale-conosco.html`, `google-glass.html`, `404.html`.
- Asset folders are **underscore-prefixed**: `_imagens/` images, `_media/` audio+video, `_javascript/` scripts, `_textos/` raw page text (`*-txt.html`), `_interface/` wireframe screenshots.
- All copy, titles, and nav labels stay in Portuguese (pt-br).

## Stylesheets (refit gotcha)
- Every page links `_css/estilo.css` (the base: `#interface`, `#menu`, `#icone`, body, a11y/skip-link/focus styles) **plus** one page sheet: `specs.html` and `google-glass.html` → `specs.css`, `index.html` → (base only), `fotos.html` → `fotos.css`, `multimidia.html` → `media.css`, `fale-conosco.html` → `form.css`. Page sheets hold only page-specific rules. Edit `_css/estilo.css` for styles that should apply across pages.
- `BPcss/style.css` is the untouched HTML5 Boilerplate base (247 lines) kept aside for the refit.
- `@font-face` in `_css/estilo.css` points at `_fonts/bubblegum-sans-regular.otf`, but `_fonts/*` files are 1-byte empty stubs — the custom font will not load.
- `404.html` is self-contained: inline `<style>`, no `_css/` link.
- Keep `@charset "UTF-8"` lowercase at the top of every `_css/` sheet, and never use `transition: all` — list properties.

## Navigation / hover behavior
- The `<nav id="menu">` is **generated once by `_javascript/nav.js`** (reads `header#cabecalho`, injects `<nav>` as first child, marks `aria-current="page"`); every content page just includes `<script src="_javascript/nav.js">` before `funcoes.js`. Edit `nav.js` to change menu items — not the pages.
- Each page's `<img id="icone">` keeps its own default (index→`glass-oculos-preto-peq.png`, specs→`especificacoes-02.jpeg`, fotos→`fotos.png`, multimidia→`multimidia.png`, fale-conosco→`contato.png`).
- `_javascript/funcoes.js` reads `#icone`'s `src` as `data-padrao` and delegates `mouseover`/`focusin` (swap icon to the item's `data-icone`) and `mouseout`/`focusout` (restore default only when leaving the menu). Scripts run at end of body — `nav.js` must stay **before** `funcoes.js`.
- `google-glass.html` is iframe-only content: no nav, no `#icone`, no scripts.

## Media
- In `multimidia.html`, `_media/` uses legacy multi-source fallbacks (video mp4/ogv/webm; audio mp3/ogg/m4a) — keep all `<source>` entries. `index.html` videos are single-source mp4 only.

## Serving and build
- **Zero build**: webpack configs and `package.json` were removed (they referenced nonexistent `js/`/`img`/`node_modules`). There is no npm/task-runner flow; don't re-add it.
- Preview by serving the repo root statically, e.g. `python -m http.server <port>`. Prefer a server over `file://` for media/forms.

## Metadata (Fase 1)
- Every page now has pt-br `<title>` + `meta description` + filled OG tags + `theme-color` `#dddddd`. `og:url`/`og:image` are relative on purpose (no deployment domain yet) — switch to absolute URLs on deploy.
- `404.html` is pt-br and self-contained (inline `<style>`, no `_css/` link).
- `site.webmanifest` is filled (`Google Glass`, `#dddddd`).
- `_javascript/funcoes.js` holds `mudaFoto()` **and** `calc_total()` used by `fale-conosco.html` (`oninput` on the form, computes `#ctot` from `#cqtd`).

## Accessibility (Fase 3)
- Every content page has: skip link `<a class="skip-link" href="#conteudo">` (first element after `<body>`), the content wrapped in `<main id="conteudo">`, and the brand `<hgroup aria-hidden="true">`.
- `_css/estilo.css` appends the a11y block: `.skip-link`, global `:focus-visible` outline, `nav#menu li:focus-within`, `[id] { scroll-margin-top }`, `touch-action: manipulation` on menu links/submit, `prefers-reduced-motion: reduce` block.
- Footer social links are `<a>` with `target="_blank" rel="noopener"` + `aria-label` in pt-br; icon `<i class="fa …" aria-hidden="true">`.
- Music/video elements use native `controls` + `aria-label`; no `alt` on `<audio>`/`<video>`/`<source>`.
- `fale-conosco.html`: real `<button type="submit">` (no more `input type="image"`), `autocomplete`/`required`/`spellcheck="false"` on email, labels wrapping or `for`-linked, panini selected. `#ctot` uses `font-variant-numeric: tabular-nums` (form.css).
- `fotos.html` album `<li>`s are focusable via `tabindex="0"`; `fotos.css` mirrors all `:hover` zoom/caption rules with `:focus-visible`.
- `google-glass.html` and `404.html` are exceptions: no skip link/main/nav (iframe-only content / self-contained).

## Style
- `.editorconfig` is authoritative: UTF-8, LF line endings, 2-space indent, final newline, no trailing whitespace.

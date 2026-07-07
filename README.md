# Portfolio — Giovanni Tommasi

Personal portfolio site for **Giovanni Tommasi**, Full‑Stack Engineer (Milan, IT).

**Live:** https://giogia.github.io/portfolio/

## About

A single‑page portfolio covering work, experience, stack, photography, video and
music, plus a downloadable CV. Designed in [Claude Design](https://claude.ai/design)
and deployed as a static site on GitHub Pages.

## Stack

- **React 18** (UMD) with in‑browser JSX via **Babel Standalone** — no build step
- Custom **WebGL** hero background (`faulty-terminal.js`)
- Live **Instagram**, **YouTube** and **iTunes preview** embeds
- Print‑ready CV built on a `<doc-page>` web component, exported to PDF

## Structure

```
index.html              Entry point (loads React, Babel, and the modules below)
styles.css              All styles
faulty-terminal.js      WebGL hero background effect
data.jsx                Content data (projects, tools, experience, tracks…)
chrome.jsx              Cursor, top bar, side navigation
top-sections.jsx        Hero, About (with CV download), Services
bottom-sections.jsx     Work, Instagram, Video, Music, Contact
assets/                 Portrait, company logos, tool icons, document PDFs
cv/
  Giovanni-Tommasi-CV.html   CV source (viewable in the browser)
  Giovanni-Tommasi-CV.pdf    CV export served by the "Download CV" button
  doc-page.js                Paged-document web component
```

## CV download

The **Download CV** button serves `cv/Giovanni-Tommasi-CV.pdf`, a 3‑page A4 PDF
rendered from `cv/Giovanni-Tommasi-CV.html`. To regenerate the PDF after editing
the HTML:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --allow-file-access-from-files \
  --no-pdf-header-footer --run-all-compositor-stages-before-draw \
  --virtual-time-budget=20000 \
  --print-to-pdf="cv/Giovanni-Tommasi-CV.pdf" \
  "cv/Giovanni-Tommasi-CV.html"
```

## Run locally

Because modules are fetched at runtime, serve over HTTP (not `file://`):

```bash
python3 -m http.server 8080
# open http://localhost:8080/
```

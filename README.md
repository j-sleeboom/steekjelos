# 🧶 Brei Hulp

Een eenvoudige breicalculator als statische Jekyll-site, gehost op GitHub Pages.

## Lokaal starten

```bash
gem install bundler
bundle install
bundle exec jekyll serve
```

Open vervolgens `http://localhost:4000` in je browser.

## Deployen op GitHub Pages

1. Maak een nieuwe repository aan op GitHub (bv. `breiapp`)
2. Push deze bestanden naar de `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Eerste versie Brei Hulp"
   git remote add origin https://github.com/JOUWGEBRUIKERSNAAM/breiapp.git
   git push -u origin main
   ```
3. Ga naar **Settings → Pages** in je repository
4. Kies bij *Source*: `Deploy from a branch` → `main` → `/ (root)`
5. Sla op – binnen ~30 seconden is de site live op `https://JOUWGEBRUIKERSNAAM.github.io/breiapp/`

## Structuur

```
breiapp/
├── _config.yml          # Jekyll instellingen
├── _layouts/
│   └── default.html     # Gedeelde HTML-structuur
├── _includes/
│   └── nav.html         # Navigatiebalk
├── assets/
│   ├── css/main.css     # Alle stijlen
│   └── js/
│       └── calculator.js
├── index.html           # Homepage
├── calculator/          # Tool: steken minderen ✅
├── garndichtheid/       # Tool: garndichtheid (binnenkort)
├── patroon/             # Tool: patroon bewaken (binnenkort)
└── positie/             # Tool: stekenpositie (binnenkort)
```

## Nieuwe tool toevoegen

1. Maak een map aan: `mkdir naam-tool`
2. Voeg `naam-tool/index.html` toe met front matter:
   ```yaml
   ---
   layout: default
   title: Naam tool
   ---
   ```
3. Voeg het JavaScript toe in `assets/js/naam-tool.js`
4. Voeg een link toe in `_includes/nav.html`

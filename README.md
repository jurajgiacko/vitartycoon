# VITAR GROUP TYCOON — Cesta k 10 miliardám

Pixel-art rozhodovací hra ve stylu „Unicorn Startup Simulator“. Rok v křesle šéfa VITAR Group:
12 měsíců, 12 rozhodnutí. Start 1 mld Kč, cíl **10 mld Kč** — a nezničit náladu týmu.

Rozhodnutí mají následky: některé volby nastaví „vlajku“ a za 2–3 měsíce se vrátí
jako navazující událost (zalepený e-shop spadne, whitelabel exkluzivita zablokuje
německý kontrakt, zrušená licence Capri-Sun dožene OvoCé…).

## Vývoj

```bash
npm install
npm run dev
```

## Deploy na Vercel

```bash
npx vercel
```

Žádná konfigurace ani databáze — čistě statická/klientská hra.

## Grafika

Ilustrace (události, konce, hero) generuje Gemini „nano banana“
(gemini-2.5-flash-image) — prompty a styl v [tools/assets-manifest.json](tools/assets-manifest.json):

```bash
GEMINI_API_KEY=xxx node tools/generate-assets.mjs            # dogeneruje chybějící
GEMINI_API_KEY=xxx node tools/generate-assets.mjs --force    # přegeneruje vše
GEMINI_API_KEY=xxx node tools/generate-assets.mjs --only=flu,win
```

Po vygenerování zmenšit: `sips -Z 640 public/assets/scenes/events/*.png`.
Hotové PNG jsou v repu — bez klíče se hra normálně buildí i hraje.

## Ladění obsahu

- Události, volby, dopady a navazující události (`FOLLOWUPS`): [lib/events.ts](lib/events.ts)
- Ekonomika (start, cíl, obtížnost přes `GROWTH_BOOST`, vyhoření týmu): [lib/engine.ts](lib/engine.ts)
- Obtížnost je laděná simulací na ~10 % výher při dobré hře.
- Dev zkratky na koncové obrazovky: `/play?debug=win|lose|flat`

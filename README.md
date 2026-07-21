# VITAR TYCOON — Cesta k 10 miliardám

Pixel-art rozhodovací hra ve stylu „Unicorn Startup Simulator“. Rok v křesle šéfa Vitaru:
12 měsíců, 12 rozhodnutí. Start 1 mld Kč, cíl **10 mld Kč** — a nezničit náladu týmu.

## Režimy

- **Sólo** — `/play`, náhodný seed, hraje se hned.
- **Turnaj (multiplayer)** — na projektoru „Založit místnost“ → `/board/KÓD`
  (velký živý leaderboard). Hráči na mobilu otevřou `/join`, zadají kód a jméno.
  Všichni hráči v místnosti dostanou **stejnou sekvenci událostí i stejné výsledky voleb**
  (seedovaná náhoda) — vyhrává čistě lepší rozhodování.

## Vývoj

```bash
npm install
npm run dev
```

## Deploy na Vercel

```bash
npx vercel
```

Sólo režim funguje hned. Pro **multiplayer na Vercelu** je potřeba Upstash Redis
(serverless funkce nesdílí paměť):

1. Vercel dashboard → Storage / Marketplace → **Upstash Redis** (free tier stačí) → Connect to project.
2. Tím se nastaví env proměnné `UPSTASH_REDIS_REST_URL` a `UPSTASH_REDIS_REST_TOKEN` — kód je
   automaticky použije. Bez nich padá úložiště místností do paměti procesu (lokálně OK,
   na Vercelu nespolehlivé).

## Ladění obsahu

Všechny herní texty a bilance jsou v [lib/events.ts](lib/events.ts)
(události, volby, rozsahy dopadů na hodnotu firmy a náladu).
Ekonomika hry (start, cíl, vyhoření týmu…) v [lib/engine.ts](lib/engine.ts).

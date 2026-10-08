# Germ's Deck

Germaine Chin's one-screen portfolio: three jelly-glossy holographic cards. Hover to tilt them; click one to fly it to the centre for a closer look.

Built with React 18 + Vite. No other dependencies.

## Edit the words

All card text and header links live in `src/data.js`.

| File | What it is |
| --- | --- |
| `src/cards/IdentityCard.jsx` | Card 1: name, role, certifications |
| `src/cards/PowersCard.jsx` | Card 2: the red-green otter "powers" card |
| `src/cards/QuestsCard.jsx` | Card 3: hobbies |
| `src/components/JellyArt.jsx` | The jelly SVG drawings (otter, loop, d20, brush, scroll, flame) |
| `src/components/JellyDefs.jsx` | The shared gummy-shine filter |
| `src/components/HoloCard.jsx` | One card: layers, click-to-view, phone tilt, load showcase |
| `src/lib/useHoloMotion.js` | The spring physics behind tilt, foil, glare and the pop-to-centre view |
| `src/components/Gallery.jsx` | The three cards, their foil type and glow colour |
| `src/components/CardBack.jsx` | The card back seen during the first-view spin |
| `src/styles.css` | All styling |

To add a card, make a new file in `src/cards/` and add it to the `CARDS` list in `src/components/Gallery.jsx`. Pick a foil: `prism` (rainbow, best on dark cards), `etched` (light sweep) or `pastel` (soft tint, best on light cards).

The card-viewing behaviour is modelled on simeydotme's pokemon-cards-css, rewritten from scratch in React (that repo is GPL-3.0, so none of its code is copied here).

## Run it locally

```bash
npm install
npm run dev
```

## Deploy to Vercel

**From GitHub (recommended)**
1. Push this folder to a new GitHub repo.
2. In Vercel, choose **Add New → Project** and import the repo.
3. Vercel detects Vite automatically (build `npm run build`, output `dist`). Click **Deploy**.

**From the command line**
```bash
npm i -g vercel
vercel        # first deploy (preview)
vercel --prod # production
```

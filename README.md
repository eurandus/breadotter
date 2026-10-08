# Germ's Deck

Germaine Chin's one-screen portfolio: three jelly-glossy holographic cards you can tilt and swipe.

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
| `src/components/TiltCard.jsx` | Tilt, foil, swipe and wobble behaviour |
| `src/styles.css` | All styling |

To add a card, make a new file in `src/cards/`, then add it to the `CARDS` list in `src/components/Deck.jsx` and give it a thumbnail colour (`.t4 i`) in `styles.css`.

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

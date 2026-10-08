import { Otter } from './JellyArt.jsx';

// The shared card back, seen during the spin when a card is first opened.
export default function CardBack() {
  return (
    <div className="back">
      <div className="back__frame">
        <span className="back__word">Germ's</span>
        <div className="back__seal pop-far"><Otter /></div>
        <span className="back__word">Deck</span>
      </div>
    </div>
  );
}

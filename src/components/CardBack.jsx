import cardBackImg from '../assets/cardback.jpg';

// The shared card back, seen during the spin when a card is first opened.
export default function CardBack() {
  return (
    <div className="back">
      <img className="back__img" src={cardBackImg} alt="" draggable="false" />
    </div>
  );
}

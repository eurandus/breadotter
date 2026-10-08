export default function Tray({ cards, index, onPick, onStep }) {
  return (
    <div className="tray" role="group" aria-label="Choose a card">
      <button className="arrow" type="button" aria-label="Previous card" onClick={() => onStep(-1)}>←</button>
      <span className="sep" />
      {cards.map((c, k) => (
        <button
          key={c.key}
          type="button"
          className={`thumb ${c.thumb}`}
          aria-label={`Card ${k + 1}: ${c.label}`}
          aria-current={k === index}
          onClick={() => onPick(k)}
        >
          <i />
        </button>
      ))}
      <span className="sep" />
      <button className="arrow" type="button" aria-label="Next card" onClick={() => onStep(1)}>→</button>
    </div>
  );
}

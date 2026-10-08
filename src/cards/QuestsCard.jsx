import { QuestIcon } from '../components/JellyArt.jsx';
import { quests } from '../data.js';

export default function QuestsCard() {
  return (
    <article className="card c3">
      <div className="row"><span>Side quests</span><span>No. 03</span></div>
      <h2 className="pop-near">{quests.title}</h2>
      <p className="sub">{quests.sub}</p>
      <ul className="quests">
        {quests.items.map((q) => (
          <li key={q.name}>
            <div className="icon pop-far"><QuestIcon name={q.icon} /></div>
            <b>{q.name}</b>
            <span>{q.line}</span>
          </li>
        ))}
      </ul>
      <div className="holo" /><div className="glare" />
    </article>
  );
}

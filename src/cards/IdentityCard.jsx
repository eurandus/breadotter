import { ChaosLoop } from '../components/JellyArt.jsx';
import { profile } from '../data.js';

export default function IdentityCard() {
  return (
    <article className="card c1">
      <div className="row"><span>Germ's Deck</span><span>No. 01</span></div>
      <div className="art pop-far"><ChaosLoop /></div>
      <div className="pop-near">
        <h1>{profile.name}</h1>
        <div className="bar" />
        <p className="role">
          {profile.role}
          <br />
          <span>{profile.place} · {profile.company}</span>
        </p>
        <div className="chips">
          {profile.creds.map((c) => <b key={c}>{c}</b>)}
        </div>
      </div>
      <div className="holo" /><div className="glare" />
    </article>
  );
}

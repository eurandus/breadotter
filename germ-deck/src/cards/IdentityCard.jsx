import { profile } from '../data.js';

export default function IdentityCard() {
  return (
    <article className="card c1">
      <div className="row"><span>Germ's Deck</span><span>No. 01</span></div>
      <figure className="photo">
        <img src={profile.photo} alt={profile.photoAlt} draggable="false" />
        {profile.photoTag && <figcaption>{profile.photoTag}</figcaption>}
      </figure>
      <div className="pop-near">
        <h1>{profile.name}</h1>
        <p className="role">
          {profile.role}
          <br />
          <span>{profile.place} · {profile.company}</span>
        </p>
        <div className="chips">
          {profile.creds.map((c) => <b key={c}>{c}</b>)}
        </div>
      </div>
    </article>
  );
}

import { Otter } from '../components/JellyArt.jsx';
import { powers } from '../data.js';

export default function PowersCard() {
  return (
    <article className="card c2">
      <div className="inner">
        <div className="plate">
          <span className="name">{powers.name}</span>
          <span className="cost" aria-label="Cost: two, red, green">
            <i className="pip n">2</i><i className="pip r" /><i className="pip g" />
          </span>
        </div>
        <div className={`art${powers.photo ? ' has-photo' : ''}`}>
          {powers.photo ? (
            <img src={powers.photo} alt={powers.photoAlt} draggable="false" />
          ) : (
            <>
              <span className="tag">{powers.artTag}</span>
              <div className="otter pop-far"><Otter /></div>
            </>
          )}
          <div className="art-foil" />
        </div>
        <div className="plate">
          <span className="type">{powers.type}</span>
          <span className="set" aria-hidden="true" />
        </div>
        <div className="text">
          {powers.abilities.map((a) => (
            <p key={a.keyword}><span className="kw">{a.keyword}</span> — {a.text}</p>
          ))}
          <p className="flavor">{powers.flavor}</p>
        </div>
        <div className="foot">
          <span>{powers.footer[0]}<br />{powers.footer[1]}</span>
          <span className="pt">{powers.stats}</span>
        </div>
      </div>
    </article>
  );
}

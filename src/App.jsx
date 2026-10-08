import JellyDefs from './components/JellyDefs.jsx';
import Gallery from './components/Gallery.jsx';
import { profile } from './data.js';

export default function App() {
  return (
    <>
      <JellyDefs />
      <header className="top">
        <div className="who">
          <a className="brand" href="/">{profile.name}</a>
          <span className="meta">{profile.role} · {profile.place}</span>
        </div>
        <nav aria-label="Elsewhere">
          {profile.links.map((l) => (
            <a key={l.label} className={l.hideOnPhone ? 'hide-s' : undefined} href={l.href} target="_blank" rel="noopener noreferrer">
              {l.label} ↗
            </a>
          ))}
        </nav>
      </header>
      <main>
        <Gallery />
      </main>
    </>
  );
}

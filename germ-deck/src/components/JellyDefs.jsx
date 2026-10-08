// One hidden <svg> holding the shared "jelly" filter and gradients.
// The filter blurs a shape's silhouette, lights it like a bump map and adds a
// dark inner rim, which gives every shape the soft gummy-snack shine.
// All jelly art uses viewBox="0 0 200 200" so the filter scales consistently.
export default function JellyDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <filter id="jelly" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceAlpha" stdDeviation="9" result="blur" />
          <feSpecularLighting in="blur" surfaceScale="7" specularConstant="0.95" specularExponent="34" lightingColor="#ffffff" result="spec">
            <fePointLight x="40" y="-20" z="150" />
          </feSpecularLighting>
          <feComposite in="spec" in2="SourceAlpha" operator="in" result="specIn" />
          <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="b2" />
          <feOffset in="b2" dx="-4" dy="-7" result="o2" />
          <feComposite in="SourceAlpha" in2="o2" operator="out" result="rim" />
          <feFlood floodColor="#000" floodOpacity="0.32" />
          <feComposite in2="rim" operator="in" result="rimShade" />
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="rimShade" />
            <feMergeNode in="specIn" />
          </feMerge>
        </filter>

        <linearGradient id="iri" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ff6fb5" />
          <stop offset=".3" stopColor="#ffc85c" />
          <stop offset=".55" stopColor="#5fe0c2" />
          <stop offset=".8" stopColor="#5aa8ff" />
          <stop offset="1" stopColor="#b479ff" />
        </linearGradient>
        <radialGradient id="fur" cx="40%" cy="30%" r="80%">
          <stop offset="0" stopColor="#c9814a" />
          <stop offset=".6" stopColor="#8f4f24" />
          <stop offset="1" stopColor="#5a2f14" />
        </radialGradient>
        <radialGradient id="cream" cx="45%" cy="35%" r="70%">
          <stop offset="0" stopColor="#fff1d8" />
          <stop offset="1" stopColor="#e2b98a" />
        </radialGradient>
        <radialGradient id="rock" cx="40%" cy="30%" r="75%">
          <stop offset="0" stopColor="#d4eef2" />
          <stop offset=".55" stopColor="#6c9ba8" />
          <stop offset="1" stopColor="#2d4d57" />
        </radialGradient>
      </defs>
    </svg>
  );
}

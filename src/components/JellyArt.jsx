// Jelly illustrations. Each uses the shared #jelly filter from JellyDefs.

export function ChaosLoop() {
  return (
    <svg className="jart" viewBox="0 0 200 200" aria-hidden="true">
      <path
        d="M38 142 C 20 100, 52 46, 92 58 C 132 70, 120 128, 92 126 C 64 124, 70 74, 112 62 C 154 50, 182 96, 160 136 C 146 160, 110 166, 98 148"
        fill="none"
        stroke="url(#iri)"
        strokeWidth="30"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#jelly)"
      />
    </svg>
  );
}

export function Otter() {
  return (
    <svg className="jart" viewBox="0 0 200 200" aria-hidden="true">
      <g filter="url(#jelly)">
        <circle cx="48" cy="58" r="17" fill="url(#fur)" />
        <circle cx="152" cy="58" r="17" fill="url(#fur)" />
        <ellipse cx="100" cy="150" rx="70" ry="52" fill="url(#fur)" />
        <ellipse cx="100" cy="98" rx="64" ry="56" fill="url(#fur)" />
      </g>
      <ellipse cx="100" cy="124" rx="36" ry="25" fill="url(#cream)" filter="url(#jelly)" />
      <path d="M88 108 Q100 102 112 108 Q108 120 100 121 Q92 120 88 108Z" fill="#2c180c" />
      <path
        d="M100 121 V129 M100 129 Q92 136 86 131 M100 129 Q108 136 114 131"
        stroke="#2c180c" strokeWidth="3" fill="none" strokeLinecap="round"
      />
      <circle cx="74" cy="90" r="9" fill="#1a0f08" />
      <circle cx="126" cy="90" r="9" fill="#1a0f08" />
      <circle cx="71" cy="86" r="3" fill="#fff" />
      <circle cx="123" cy="86" r="3" fill="#fff" />
      <path
        d="M60 120 L34 114 M60 127 L32 128 M140 120 L166 114 M140 127 L168 128"
        stroke="#fff6e6" strokeWidth="2" strokeLinecap="round" opacity=".85"
      />
      <ellipse cx="100" cy="172" rx="22" ry="15" fill="url(#rock)" filter="url(#jelly)" />
      <g filter="url(#jelly)">
        <ellipse cx="76" cy="168" rx="15" ry="11" fill="url(#fur)" />
        <ellipse cx="124" cy="168" rx="15" ry="11" fill="url(#fur)" />
      </g>
    </svg>
  );
}

function D20() {
  return (
    <>
      <polygon points="100,18 172,58 172,142 100,182 28,142 28,58" fill="#8a5cf0" filter="url(#jelly)" />
      <polygon points="100,50 146,128 54,128" fill="none" stroke="#e7dcff" strokeWidth="6" strokeLinejoin="round" opacity=".7" />
      <text x="100" y="114" textAnchor="middle" fontFamily="Bricolage Grotesque, sans-serif" fontWeight="800" fontSize="34" fill="#fff">20</text>
    </>
  );
}

function Brush() {
  return (
    <g filter="url(#jelly)" transform="rotate(38 100 100)">
      <rect x="86" y="70" width="28" height="118" rx="14" fill="#e6862e" />
      <rect x="82" y="52" width="36" height="28" rx="8" fill="#c9cfd6" />
      <path d="M84 54 Q100 -8 116 54Z" fill="#2fa36b" />
    </g>
  );
}

function Scroll() {
  return (
    <>
      <g filter="url(#jelly)">
        <rect x="44" y="46" width="112" height="112" rx="16" fill="#f4dfae" />
        <rect x="30" y="34" width="140" height="28" rx="14" fill="#e0b56a" />
        <rect x="30" y="144" width="140" height="28" rx="14" fill="#e0b56a" />
      </g>
      <path d="M66 86 H134 M66 104 H122 M66 122 H128" stroke="#a87b3a" strokeWidth="6" strokeLinecap="round" opacity=".6" />
    </>
  );
}

function Flame() {
  return (
    <>
      <path
        d="M100 20 C 128 62, 160 82, 156 128 C 152 164, 126 182, 100 182 C 72 182, 46 164, 44 130 C 42 98, 66 86, 74 56 C 86 74, 90 84, 100 90 C 104 66, 98 44, 100 20Z"
        fill="#ff7a3c" filter="url(#jelly)"
      />
      <path
        d="M100 98 C 116 120, 128 132, 124 152 C 120 168, 110 172, 100 172 C 88 172, 78 164, 78 150 C 78 132, 94 126, 100 98Z"
        fill="#ffd25c" filter="url(#jelly)"
      />
    </>
  );
}

const icons = { d20: D20, brush: Brush, scroll: Scroll, flame: Flame };

export function QuestIcon({ name }) {
  const Icon = icons[name];
  return (
    <svg className="jart" viewBox="0 0 200 200" aria-hidden="true">
      {Icon ? <Icon /> : null}
    </svg>
  );
}

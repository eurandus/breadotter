// Jelly illustration (used on card 2 until a photo is added, and on the card back).
// Uses the shared #jelly filter from JellyDefs.

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

export default function LampIcon() {
  return (
    <svg
      viewBox="0 0 40 40"
      className="lamp-icon"
      aria-hidden="true"
      shapeRendering="crispEdges"
      focusable="false"
    >
      {/* Warm halo behind the glass (fades when switched off) */}
      <circle className="lamp-halo lamp-halo-outer" cx="20" cy="16.5" r="9" fill="#fbbf24" opacity="0.4" />
      <circle className="lamp-halo" cx="20" cy="16.5" r="5.6" fill="#fde68a" />

      {/* Day layer: pixel sun with little rays */}
      <g className="lamp-day">
        <rect className="lamp-sun-core lamp-sun" x="25.5" y="7" width="7" height="7" rx="1" />
        <rect className="lamp-sun" x="28" y="3.5" width="2" height="1.6" />
        <rect className="lamp-sun" x="28" y="15.8" width="2" height="1.6" />
        <rect className="lamp-sun" x="21.8" y="9" width="1.6" height="2" />
        <rect className="lamp-sun" x="34.6" y="9" width="1.6" height="2" />
      </g>

      {/* Night layer: moon with craters + friendly stars */}
      <g className="lamp-night">
        <rect className="lamp-star lamp-star-a" x="21.5" y="4.5" width="2.4" height="2.4" rx="0.4" />
        <rect className="lamp-star lamp-star-b" x="30.5" y="12.5" width="2" height="2" rx="0.4" />
        <rect className="lamp-moon" x="25.5" y="6.5" width="7" height="7" rx="1.6" />
        <rect x="28.2" y="8.6" width="1.4" height="1.4" rx="0.4" fill="#94a3b8" />
        <rect x="27" y="10.4" width="1.1" height="1.1" rx="0.3" fill="#a5b4fc" />
      </g>

      {/* Lamp shell — the same physical object, just re-lit */}
      <path className="lamp-shade" d="M13.2 4.8 H26.8 L25.6 13 H14.4 Z" />
      <rect className="lamp-glass" x="15.4" y="13" width="9.2" height="7.2" rx="1" />
      <rect className="lamp-metal" x="18.7" y="20.2" width="2.6" height="3.8" />
      <rect className="lamp-metal" x="14" y="24" width="12" height="3" rx="1.2" />
      <rect className="lamp-shade" x="14" y="26.2" width="12" height="1" rx="0.4" />

      {/* Wall-switch notch — clicked down when the lamp switches off */}
      <rect className="lamp-metal" x="16.8" y="27.6" width="6.4" height="2.2" rx="0.7" opacity="0.7" />
      <rect className="lamp-notch" x="18.7" y="28" width="2.6" height="1.8" rx="0.5" fill="#fbbf24" />
    </svg>
  );
}
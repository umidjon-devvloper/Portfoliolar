/**
 * Painted backdrop behind the portrait: a few blurred accent sweeps, a
 * soft spotlight and a grain wash. All vector — no bitmap, a few hundred
 * bytes, and it recolours with the theme.
 */
export function HeroBackdrop() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 600 560"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      <defs>
        <radialGradient id="hero-spot" cx="50%" cy="38%" r="55%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="hero-sweep" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
          <stop offset="45%" stopColor="var(--accent)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>

        <filter id="hero-blur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="18" />
        </filter>

        <filter id="hero-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" />
          <feColorMatrix type="saturate" values="0" />
        </filter>

        <radialGradient id="hero-fade-grad" cx="50%" cy="48%" r="58%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="62%" stopColor="#777" />
          <stop offset="100%" stopColor="#000" />
        </radialGradient>

        <mask id="hero-fade">
          <rect width="600" height="560" fill="url(#hero-fade-grad)" />
        </mask>
      </defs>

      <g mask="url(#hero-fade)">
        <rect width="600" height="560" fill="url(#hero-spot)" />

        <g filter="url(#hero-blur)" opacity="0.9">
          <path
            d="M60 430 C 190 360, 300 300, 470 130 L 540 190 C 380 340, 260 400, 120 470 Z"
            fill="url(#hero-sweep)"
          />
          <path
            d="M140 500 C 250 440, 340 380, 470 250 L 505 292 C 380 410, 300 450, 190 520 Z"
            fill="url(#hero-sweep)"
            opacity="0.7"
          />
          <path
            d="M300 120 C 360 96, 420 84, 486 82 L 492 118 C 430 122, 372 136, 318 158 Z"
            fill="url(#hero-sweep)"
            opacity="0.5"
          />
        </g>

        <rect
          width="600"
          height="560"
          filter="url(#hero-grain)"
          opacity="0.06"
        />
      </g>
    </svg>
  );
}

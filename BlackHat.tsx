interface BlackHatProps {
  className?: string;
  rotation?: number;
  scale?: number;
}

export default function BlackHat({ className = '', rotation = 0, scale = 1 }: BlackHatProps) {
  return (
    <div
      className={`absolute ${className}`}
      style={{
        transform: `rotate(${rotation}deg) scale(${scale})`,
        filter: 'drop-shadow(0 10px 18px rgba(0,0,0,0.45))',
      }}
    >
      {/* Precision 3D Vector Black Fedora / Hacker Hat */}
      <svg
        viewBox="0 0 100 70"
        className="w-14 h-10 select-none pointer-events-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="hatCrown" x1="20" y1="10" x2="80" y2="45" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2c2c2c" />
            <stop offset="40%" stopColor="#141414" />
            <stop offset="100%" stopColor="#050505" />
          </linearGradient>
          <linearGradient id="hatBrim" x1="10" y1="40" x2="90" y2="60" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1e1e1e" />
            <stop offset="50%" stopColor="#0d0d0d" />
            <stop offset="100%" stopColor="#030303" />
          </linearGradient>
          <linearGradient id="hatBand" x1="30" y1="36" x2="70" y2="42" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3a3a3a" />
            <stop offset="50%" stopColor="#222222" />
            <stop offset="100%" stopColor="#111111" />
          </linearGradient>
          <linearGradient id="hatCrease" x1="40" y1="12" x2="60" y2="28" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#000000" />
            <stop offset="100%" stopColor="#1c1c1c" />
          </linearGradient>
        </defs>

        {/* Brim Outer Shadow/Base */}
        <ellipse cx="50" cy="52" rx="46" ry="12" fill="#040404" />

        {/* Brim Upper Surface */}
        <path
          d="M4 51 C 8 39, 92 39, 96 51 C 92 63, 8 63, 4 51 Z"
          fill="url(#hatBrim)"
          stroke="#333333"
          strokeWidth="0.5"
        />

        {/* Crown Body */}
        <path
          d="M26 44 C 27 24, 32 14, 42 12 C 48 10, 52 10, 58 12 C 68 14, 73 24, 74 44 Z"
          fill="url(#hatCrown)"
          stroke="#262626"
          strokeWidth="0.5"
        />

        {/* Crown Top Center Crease / Indentation */}
        <path
          d="M38 13 C 44 18, 56 18, 62 13 C 58 11, 42 11, 38 13 Z"
          fill="url(#hatCrease)"
        />

        {/* Crown Side Pinches */}
        <path
          d="M30 24 C 36 28, 36 34, 28 38 C 27 32, 28 27, 30 24 Z"
          fill="#0a0a0a"
          opacity="0.7"
        />
        <path
          d="M70 24 C 64 28, 64 34, 72 38 C 73 32, 72 27, 70 24 Z"
          fill="#080808"
          opacity="0.8"
        />

        {/* Ribbon / Hat Band */}
        <path
          d="M25.5 41 C 36 43, 64 43, 74.5 41 L 75 46 C 64 48, 36 48, 25 46 Z"
          fill="url(#hatBand)"
          stroke="#404040"
          strokeWidth="0.4"
        />

        {/* Band Accent Metallic Pin / Diamond */}
        <polygon points="34,43 36,41 38,43 36,45" fill="#e5e5e5" />
      </svg>
    </div>
  );
}

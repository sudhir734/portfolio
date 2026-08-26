interface CardGeometryProps {
  variant: string;
}

export default function CardGeometry({ variant }: CardGeometryProps) {
  if (variant === 'sentinelshield') {
    return (
      <div className="w-full h-full flex items-center justify-center relative overflow-hidden py-4">
        <svg
          viewBox="0 0 260 160"
          className="w-48 h-32 transform group-hover:scale-105 transition-transform duration-500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background technical guidelines */}
          <path d="M40 80 L220 80" stroke="#e6e6e6" strokeWidth="0.8" />
          <path d="M130 20 L130 140" stroke="#e6e6e6" strokeWidth="0.8" />
          <path d="M60 120 L200 40" stroke="#e2e2e2" strokeWidth="0.8" />
          <path d="M60 40 L200 120" stroke="#e2e2e2" strokeWidth="0.8" />
          
          {/* Little crosshairs */}
          <circle cx="70" cy="115" r="2" fill="#080808" />
          <circle cx="190" cy="45" r="2" fill="#080808" />

          {/* Layer 1 (Bottom Back Block) */}
          <g transform="translate(130, 85)">
            {/* Isometric Block Center-Back */}
            <path d="M0 -30 L28 -14 L0 2 L-28 -14 Z" fill="#2c2c2c" stroke="#111" strokeWidth="0.5" />
            <path d="M-28 -14 L0 2 L0 24 L-28 8 Z" fill="#181818" stroke="#111" strokeWidth="0.5" />
            <path d="M0 2 L28 -14 L28 8 L0 24 Z" fill="#0c0c0c" stroke="#111" strokeWidth="0.5" />

            {/* Left Block */}
            <g transform="translate(-32, 10)">
              <path d="M0 -22 L20 -11 L0 0 L-20 -11 Z" fill="#383838" stroke="#111" strokeWidth="0.5" />
              <path d="M-20 -11 L0 0 L0 18 L-20 7 Z" fill="#1a1a1a" stroke="#111" strokeWidth="0.5" />
              <path d="M0 0 L20 -11 L20 7 L0 18 Z" fill="#080808" stroke="#111" strokeWidth="0.5" />
            </g>

            {/* Right Block */}
            <g transform="translate(32, 10)">
              <path d="M0 -22 L20 -11 L0 0 L-20 -11 Z" fill="#383838" stroke="#111" strokeWidth="0.5" />
              <path d="M-20 -11 L0 0 L0 18 L-20 7 Z" fill="#1a1a1a" stroke="#111" strokeWidth="0.5" />
              <path d="M0 0 L20 -11 L20 7 L0 18 Z" fill="#080808" stroke="#111" strokeWidth="0.5" />
            </g>

            {/* Center Front Block (Elevated) */}
            <g transform="translate(0, 8)">
              <path d="M0 -26 L24 -13 L0 0 L-24 -13 Z" fill="#444444" stroke="#ffffff" strokeWidth="0.6" />
              <path d="M-24 -13 L0 0 L0 22 L-24 9 Z" fill="#202020" stroke="#111" strokeWidth="0.5" />
              <path d="M0 0 L24 -13 L24 9 L0 22 Z" fill="#080808" stroke="#111" strokeWidth="0.5" />
              {/* Top Face Inset Square */}
              <path d="M0 -20 L16 -11 L0 -2 L-16 -11 Z" fill="#151515" />
            </g>
          </g>
        </svg>
      </div>
    );
  }

  if (variant === 'secure-file-transfer') {
    return (
      <div className="w-full h-full flex items-center justify-center relative overflow-hidden py-4">
        <svg
          viewBox="0 0 260 160"
          className="w-48 h-32 transform group-hover:scale-105 transition-transform duration-500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Construction guidelines */}
          <path d="M50 130 L210 30" stroke="#e6e6e6" strokeWidth="0.8" />
          <path d="M50 30 L210 130" stroke="#e6e6e6" strokeWidth="0.8" />
          <circle cx="205" cy="127" r="2" fill="#080808" />
          <circle cx="55" cy="33" r="2" fill="#080808" />

          {/* Stacked Isometric Slabs */}
          <g transform="translate(130, 95)">
            {/* Bottom Base Slab */}
            <path d="M0 -42 L56 -14 L0 14 L-56 -14 Z" fill="#2a2a2a" stroke="#ffffff" strokeWidth="0.4" />
            <path d="M-56 -14 L0 14 L0 20 L-56 -8 Z" fill="#151515" />
            <path d="M0 14 L56 -14 L56 -8 L0 20 Z" fill="#090909" />

            {/* Mid Slab */}
            <g transform="translate(0, -14)">
              <path d="M0 -34 L46 -11 L0 12 L-46 -11 Z" fill="#383838" stroke="#ffffff" strokeWidth="0.5" />
              <path d="M-46 -11 L0 12 L0 18 L-46 -5 Z" fill="#1c1c1c" />
              <path d="M0 12 L46 -11 L46 -5 L0 18 Z" fill="#0d0d0d" />
            </g>

            {/* Upper Slab */}
            <g transform="translate(0, -28)">
              <path d="M0 -26 L36 -8 L0 10 L-36 -8 Z" fill="#111111" stroke="#ffffff" strokeWidth="0.7" />
              <path d="M-36 -8 L0 10 L0 16 L-36 -2 Z" fill="#222222" />
              <path d="M0 10 L36 -8 L36 -2 L0 16 Z" fill="#080808" />
              
              {/* Cutout Inner Square */}
              <path d="M0 -18 L18 -6 L0 6 L-18 -6 Z" fill="#ffffff" stroke="#111111" strokeWidth="0.5" />
              <path d="M0 -14 L12 -6 L0 2 L-12 -6 Z" fill="#080808" />
            </g>
          </g>
        </svg>
      </div>
    );
  }

  // 'iot-smart-aquarium'
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden py-4">
      <svg
        viewBox="0 0 260 160"
        className="w-48 h-32 transform group-hover:scale-105 transition-transform duration-500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Technical grid axes */}
        <path d="M40 90 L220 90" stroke="#e6e6e6" strokeWidth="0.8" />
        <path d="M130 15 L130 145" stroke="#e6e6e6" strokeWidth="0.8" />
        <path d="M70 125 L190 35" stroke="#e6e6e6" strokeWidth="0.8" />
        <circle cx="190" cy="35" r="2" fill="#080808" />

        {/* Concentric Frame / Monolith */}
        <g transform="translate(130, 85)">
          {/* Base Ring */}
          <path d="M0 -38 L52 -12 L0 14 L-52 -12 Z" fill="#282828" stroke="#111" strokeWidth="0.5" />
          <path d="M-52 -12 L0 14 L0 22 L-52 -4 Z" fill="#141414" />
          <path d="M0 14 L52 -12 L52 -4 L0 22 Z" fill="#090909" />

          {/* Inner Chamber Top Layer */}
          <g transform="translate(0, -10)">
            <path d="M0 -30 L40 -10 L0 10 L-40 -10 Z" fill="#151515" stroke="#ffffff" strokeWidth="0.6" />
            <path d="M-40 -10 L0 10 L0 18 L-40 -2 Z" fill="#222222" />
            <path d="M0 10 L40 -10 L40 -2 L0 18 Z" fill="#080808" />

            {/* Inner Core Frame */}
            <path d="M0 -22 L26 -7 L0 8 L-26 -7 Z" fill="#e0e0e0" stroke="#111" strokeWidth="0.5" />
            <path d="M0 -16 L18 -6 L0 4 L-18 -6 Z" fill="#080808" />
          </g>
        </g>
      </svg>
    </div>
  );
}

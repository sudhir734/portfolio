export default function BackgroundDecoration() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Top-Right Faceted 3D Black Geometric Monolith */}
      <div className="absolute -top-16 -right-16 w-[280px] h-[340px] md:w-[380px] md:h-[440px] opacity-95">
        <svg viewBox="0 0 380 440" className="w-full h-full" fill="none">
          {/* Main faceted polyhedron faces */}
          <polygon points="120,0 380,0 380,320 220,240" fill="#080808" />
          <polygon points="0,60 120,0 220,240 100,280" fill="#141414" />
          <polygon points="100,280 220,240 380,320 300,440" fill="#050505" />
          <polygon points="0,60 100,280 300,440 0,440" fill="#1b1b1b" />
          {/* Subtle edge highlights */}
          <line x1="120" y1="0" x2="220" y2="240" stroke="#333333" strokeWidth="0.8" />
          <line x1="220" y1="240" x2="380" y2="320" stroke="#222222" strokeWidth="0.8" />
          <line x1="100" y1="280" x2="220" y2="240" stroke="#444444" strokeWidth="0.8" />
        </svg>
      </div>

      {/* Bottom-Left Faceted 3D Black Geometric Shard */}
      <div className="absolute -bottom-10 -left-12 w-[240px] h-[300px] md:w-[320px] md:h-[380px] opacity-95">
        <svg viewBox="0 0 320 380" className="w-full h-full" fill="none">
          {/* Facets */}
          <polygon points="0,180 140,80 180,260 0,380" fill="#121212" />
          <polygon points="140,80 320,160 180,260" fill="#080808" />
          <polygon points="180,260 320,160 320,380 0,380" fill="#030303" />
          <polygon points="0,0 140,80 0,180" fill="#1c1c1c" />
          {/* Facet lines */}
          <line x1="140" y1="80" x2="180" y2="260" stroke="#333333" strokeWidth="0.8" />
          <line x1="0" y1="180" x2="180" y2="260" stroke="#222222" strokeWidth="0.8" />
        </svg>
      </div>

      {/* Very faint architectural background grid / guidelines */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />
    </div>
  );
}

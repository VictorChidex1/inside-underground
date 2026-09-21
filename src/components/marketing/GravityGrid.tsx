
export interface GravityGridProps {
  mousePos: { x: number; y: number }
  isHovered: boolean
}

export function GravityGrid({ mousePos, isHovered }: GravityGridProps) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0" aria-hidden="true">
      {/* Base Dark Technical Blueprint Grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, #181818 1px, transparent 1px),
            linear-gradient(to bottom, #181818 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Coordinate Micro-Crosshairs (+) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-35"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="crosshair-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
            <path
              d="M 40 36 L 40 44 M 36 40 L 44 40"
              stroke="#00FF66"
              strokeWidth="1"
              strokeOpacity="0.4"
            />
            <circle cx="40" cy="40" r="1.5" fill="#00FF66" fillOpacity="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#crosshair-pattern)" />
      </svg>

      {/* Interactive Spotlight Gravity Glow tracking mouse */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0.4,
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 255, 102, 0.12), transparent 70%)`,
        }}
      />

      {/* Vignette Edge Falloff */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, #050505 95%)',
        }}
      />
    </div>
  )
}

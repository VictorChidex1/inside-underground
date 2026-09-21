import * as React from 'react'

export interface LaserBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  innerClassName?: string
  laserColor?: string
  secondaryColor?: string
  speed?: string
  glowIntensity?: 'subtle' | 'vibrant' | 'intense'
  showCornerTargets?: boolean
}

export function LaserBorder({
  children,
  className = '',
  innerClassName = '',
  laserColor = '#00FF66',
  secondaryColor = 'rgba(0, 153, 255, 0.4)',
  speed = '8s',
  glowIntensity = 'vibrant',
  showCornerTargets = true,
  ...props
}: LaserBorderProps) {
  const opacityMap = {
    subtle: 'opacity-50',
    vibrant: 'opacity-85',
    intense: 'opacity-100',
  }

  return (
    <div
      className={`relative p-[1px] rounded-xl overflow-hidden bg-[#262626] transition-all ${className}`}
      {...props}
    >
      {/* 360-degree rotating conic laser beam */}
      <div
        className={`absolute -inset-[150%] pointer-events-none ${opacityMap[glowIntensity]}`}
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 70deg, ${secondaryColor} 120deg, ${laserColor} 180deg, ${secondaryColor} 220deg, transparent 270deg, transparent 360deg)`,
          animation: `spin ${speed} linear infinite`,
        }}
        aria-hidden="true"
      />

      {/* Military Optical Corner Target Notches */}
      {showCornerTargets && (
        <div className="pointer-events-none absolute inset-0 z-20" aria-hidden="true">
          {/* Top-Left */}
          <span className="absolute top-1 left-1 h-2 w-2 border-t-2 border-l-2 border-[#00FF66]/60 rounded-tl-sm" />
          {/* Top-Right */}
          <span className="absolute top-1 right-1 h-2 w-2 border-t-2 border-r-2 border-[#00FF66]/60 rounded-tr-sm" />
          {/* Bottom-Left */}
          <span className="absolute bottom-1 left-1 h-2 w-2 border-b-2 border-l-2 border-[#00FF66]/60 rounded-bl-sm" />
          {/* Bottom-Right */}
          <span className="absolute bottom-1 right-1 h-2 w-2 border-b-2 border-r-2 border-[#00FF66]/60 rounded-br-sm" />
        </div>
      )}

      {/* Inner Masked Content Layer */}
      <div
        className={`relative z-10 w-full h-full rounded-[calc(0.75rem-1px)] bg-[#070707] ${innerClassName}`}
      >
        {children}
      </div>
    </div>
  )
}

import { cva } from 'class-variance-authority'

export const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded px-2 py-0.5 text-[11px] font-mono font-medium tracking-tight transition-colors select-none',
  {
    variants: {
      variant: {
        default:
          'border border-[#00FF66]/30 bg-[#00FF66]/10 text-[#00FF66]',
        secondary:
          'border border-[#1E1E1E] bg-[#141414] text-[#A3A3A3]',
        success:
          'border border-[#00FF66]/40 bg-[#003B17]/60 text-[#00FF66]',
        warning:
          'border border-[#FFB800]/40 bg-[#3D2C00]/60 text-[#FFB800]',
        destructive:
          'border border-[#FF3333]/40 bg-[#400A0A]/60 text-[#FF3333]',
        info:
          'border border-[#0099FF]/40 bg-[#00294D]/60 text-[#0099FF]',
        purple:
          'border border-[#A855F7]/40 bg-[#320E54]/60 text-[#C084FC]',
        outline:
          'border border-[#1E1E1E] text-[#EDEDED] bg-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

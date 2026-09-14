import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded text-xs font-mono font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00FF66] disabled:pointer-events-none disabled:opacity-40 select-none active:translate-y-[1px]',
  {
    variants: {
      variant: {
        default:
          'bg-[#00FF66] text-black font-semibold shadow-sm hover:bg-[#00e65c] hover:shadow-[0_0_12px_rgba(0,255,102,0.3)]',
        outline:
          'border border-[#1E1E1E] bg-[#0A0A0A] text-[#EDEDED] hover:border-[#00FF66] hover:text-[#00FF66] hover:bg-[rgba(0,255,102,0.04)]',
        secondary:
          'bg-[#141414] border border-[#1E1E1E] text-[#EDEDED] hover:bg-[#1A1A1A] hover:border-[#2E2E2E]',
        ghost:
          'text-[#EDEDED] hover:bg-[#141414] hover:text-[#00FF66]',
        destructive:
          'border border-[#FF3333]/40 bg-[#1A0A0A] text-[#FF3333] hover:bg-[#FF3333] hover:text-black font-semibold',
        command:
          'border border-dashed border-[#1E1E1E] bg-[#080808] text-[#808080] hover:text-[#00FF66] hover:border-[#00FF66]/60 hover:bg-[#0A0A0A]',
        link:
          'text-[#0099FF] underline-offset-4 hover:underline p-0 h-auto font-normal',
      },
      size: {
        default: 'h-8 px-3 py-1.5',
        xs: 'h-6 px-2 text-[11px]',
        sm: 'h-7 px-2.5 text-xs',
        lg: 'h-10 px-4 text-sm',
        icon: 'h-8 w-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

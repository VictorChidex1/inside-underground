import { cn } from '@/lib/utils'
import { validatePassword, type PasswordStrengthLevel } from './passwordStrength'

const LEVEL_COLORS: Record<PasswordStrengthLevel, { text: string; bar: string }> = {
  weak: { text: 'text-[#FF3333]', bar: 'bg-[#FF3333]' },
  medium: { text: 'text-[#FFB800]', bar: 'bg-[#FFB800]' },
  strong: { text: 'text-[#00FF66]', bar: 'bg-[#00FF66]' },
}

export interface PasswordStrengthIndicatorProps {
  password: string
}

export function PasswordStrengthIndicator({
  password,
}: PasswordStrengthIndicatorProps) {
  const result = validatePassword(password)
  const hasInput = password.length > 0

  if (!hasInput) {
    return (
      <div className="flex items-center gap-1.5 font-mono text-[11px]">
        {[0, 1, 2].map((segment) => (
          <span key={segment} className="h-1 w-8 rounded-sm bg-[#1E1E1E]" />
        ))}
        <span className="text-[#525252]">STRENGTH: —</span>
      </div>
    )
  }

  const colors = LEVEL_COLORS[result.level]

  return (
    <div className="flex flex-col gap-1.5 font-mono text-[11px]">
      <div className="flex items-center gap-1.5">
        {[0, 1, 2].map((segment) => (
          <span
            key={segment}
            className={cn(
              'h-1 w-8 rounded-sm',
              segment < result.metCount ? colors.bar : 'bg-[#1E1E1E]'
            )}
          />
        ))}
        <span className={cn(colors.text, 'font-semibold')}>
          STRENGTH: {result.level.toUpperCase()}
        </span>
      </div>
      <ul className="space-y-0.5">
        {result.checks.map((check) => (
          <li key={check.label} className={check.met ? 'text-[#00FF66]' : 'text-[#525252]'}>
            {check.met ? '[x]' : '[ ]'} {check.label}
          </li>
        ))}
      </ul>
    </div>
  )
}
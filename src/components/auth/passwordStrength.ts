export type PasswordStrengthLevel = 'weak' | 'medium' | 'strong'

export interface PasswordRuleCheck {
  met: boolean
  label: string
}

export interface PasswordStrengthResult {
  valid: boolean
  level: PasswordStrengthLevel
  metCount: number
  checks: PasswordRuleCheck[]
  errors: string[]
}

const PASSWORD_RULES: Array<{ label: string; test: (password: string) => boolean }> = [
  { label: '8+ characters', test: (password) => password.length >= 8 },
  { label: 'one uppercase letter', test: (password) => /[A-Z]/.test(password) },
  { label: 'one symbol', test: (password) => /[^A-Za-z0-9]/.test(password) },
]

export function validatePassword(password: string): PasswordStrengthResult {
  const checks = PASSWORD_RULES.map((rule) => ({
    met: rule.test(password),
    label: rule.label,
  }))
  const metCount = checks.filter((check) => check.met).length
  const level: PasswordStrengthLevel =
    metCount >= PASSWORD_RULES.length ? 'strong' : metCount >= 2 ? 'medium' : 'weak'

  return {
    valid: level === 'strong',
    level,
    metCount,
    checks,
    errors: checks.filter((check) => !check.met).map((check) => check.label),
  }
}
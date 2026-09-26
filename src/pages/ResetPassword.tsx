import * as React from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { getResetEmail, setNewPassword } from '@/services/auth'
import { AuthShell } from '@/components/auth/AuthShell'
import { PasswordStrengthIndicator } from '@/components/auth/PasswordStrengthIndicator'
import { validatePassword } from '@/components/auth/passwordStrength'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type VerificationState = 'pending' | 'verified' | 'invalid'

export function ResetPasswordPage() {
  const [searchParams] = useSearchParams()
  const oobCode = searchParams.get('oobCode')
  const navigate = useNavigate()

  const [verification, setVerification] = React.useState<VerificationState>(
    oobCode ? 'pending' : 'invalid'
  )
  const [resetEmail, setResetEmail] = React.useState<string | null>(null)

  const [password, setPassword] = React.useState('')
  const [confirm, setConfirm] = React.useState('')
  const [error, setError] = React.useState<string | null>(null)
  const [pending, setPending] = React.useState(false)
  const [done, setDone] = React.useState(false)

  React.useEffect(() => {
    if (!oobCode) {
      return
    }
    getResetEmail(oobCode)
      .then((email) => {
        setResetEmail(email)
        setVerification('verified')
      })
      .catch(() => {
        setVerification('invalid')
      })
  }, [oobCode])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!oobCode) {
      return
    }
    setError(null)

    if (!validatePassword(password).valid) {
      setError(
        'Password must be at least 8 characters with one uppercase letter and one symbol.'
      )
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }

    setPending(true)
    try {
      await setNewPassword(oobCode, password)
      setDone(true)
    } catch {
      setError('Unable to reset your password. Please try again.')
    } finally {
      setPending(false)
    }
  }

  if (done) {
    return (
      <AuthShell
        title="PASSWORD_RESET"
        path="user@inside-underground:~/reset-password"
        description="Your password has been updated."
      >
        <div className="space-y-4">
          <p className="font-mono text-xs text-[#00FF66]">✓ Password updated successfully.</p>
          <Button size="sm" onClick={() => navigate('/login')}>
            [ RETURN_TO_LOGIN ]
          </Button>
        </div>
      </AuthShell>
    )
  }

  return (
    <AuthShell
      title="RESET_PASSWORD"
      path="user@inside-underground:~/reset-password"
      description={
        resetEmail ? `Set a new password for ${resetEmail}.` : 'Set a new password.'
      }
    >
      {verification === 'pending' ? (
        <p className="font-mono text-xs text-[#525252]">$ verifying_reset_link...</p>
      ) : verification === 'invalid' ? (
        <div className="space-y-4">
          <p className="text-xs text-[#FF3333]">
            {oobCode
              ? 'This reset link is invalid or has expired.'
              : 'Invalid or missing reset link.'}
          </p>
          <Button size="sm" variant="outline" onClick={() => navigate('/forgot-password')}>
            [ REQUEST_NEW_LINK ]
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="password"
            prefixText="#"
            placeholder="new password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="new-password"
          />
          <PasswordStrengthIndicator password={password} />
          <Input
            type="password"
            prefixText="#"
            placeholder="confirm new password"
            value={confirm}
            onChange={(event) => setConfirm(event.target.value)}
            autoComplete="new-password"
          />
          {error && <p className="text-xs text-[#FF3333]">{error}</p>}
          <Button type="submit" size="sm" className="w-full" disabled={pending}>
            {pending ? 'UPDATING...' : '[ SET_NEW_PASSWORD ]'}
          </Button>
          <div className="text-center">
            <Link to="/login" className="text-xs text-[#00FF66] hover:underline">
              Return to login
            </Link>
          </div>
        </form>
      )}
    </AuthShell>
  )
}
import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { resetPassword } from '@/services/auth'
import { AuthShell } from '@/components/auth/AuthShell'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function ForgotPasswordPage() {
  const navigate = useNavigate()
  const [email, setEmail] = React.useState('')
  const [sent, setSent] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [pending, setPending] = React.useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)

    if (!email) {
      setError('Enter your email address.')
      return
    }

    setPending(true)
    try {
      await resetPassword(email)
      setSent(true)
    } catch {
      setError('Unable to send the reset email. Check the address and try again.')
    } finally {
      setPending(false)
    }
  }

  if (sent) {
    return (
      <AuthShell
        title="RESET_EMAIL_SENT"
        path="user@inside-underground:~/forgot-password"
        description={`A password reset email has been sent to ${email}.`}
      >
        <div className="space-y-4">
          <p className="font-mono text-xs text-[#00FF66]">
            ✓ Check your inbox for instructions.
          </p>
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
      path="user@inside-underground:~/forgot-password"
      description="Enter your email and we'll send you a reset link."
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          type="email"
          prefixText="@"
          placeholder="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
        />
        {error && <p className="text-xs text-[#FF3333]">{error}</p>}
        <Button type="submit" size="sm" className="w-full" disabled={pending}>
          {pending ? 'SENDING...' : '[ SEND_RESET_EMAIL ]'}
        </Button>
        <div className="text-center">
          <Link to="/login" className="text-xs text-[#00FF66] hover:underline">
            Return to login
          </Link>
        </div>
      </form>
    </AuthShell>
  )
}
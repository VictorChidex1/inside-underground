import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '@/services/auth'
import { AuthShell } from '@/components/auth/AuthShell'
import { GoogleLinkDialog } from '@/components/auth/GoogleLinkDialog'
import { PasswordStrengthIndicator } from '@/components/auth/PasswordStrengthIndicator'
import { validatePassword } from '@/components/auth/passwordStrength'
import { useGoogleSignIn } from '@/components/auth/useGoogleSignIn'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { TerminalStatus } from '@/components/terminal/TerminalStatus'

const USERNAME_PATTERN = /^[a-zA-Z0-9_.-]{3,24}$/

function getAuthErrorMessage(code: string): string {
  switch (code) {
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.'
    case 'auth/invalid-email':
      return 'Please enter a valid email address.'
    case 'auth/weak-password':
      return 'Password must be at least 6 characters.'
    default:
      return 'Unable to create your account. Please try again.'
  }
}

export function RegisterPage() {
  const navigate = useNavigate()
  const google = useGoogleSignIn()

  const [username, setUsername] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirm, setConfirm] = React.useState('')
  const [agree, setAgree] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [pending, setPending] = React.useState(false)
  const [created, setCreated] = React.useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)

    if (!USERNAME_PATTERN.test(username)) {
      setError('Username must be 3-24 characters using letters, numbers, _ . or -.')
      return
    }
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
    if (!agree) {
      setError('You must agree to the Terms of Service.')
      return
    }

    setPending(true)
    try {
      await registerUser({ email, password, username })
      setCreated(true)
    } catch (caught) {
      setError(getAuthErrorMessage((caught as { code?: string }).code ?? ''))
    } finally {
      setPending(false)
    }
  }

  if (created) {
    return (
      <AuthShell
        title="ACCOUNT_CREATED"
        path="user@inside-underground:~/register"
        description="Your account has been registered but is not yet activated."
      >
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <TerminalStatus status="pending_payment" label="PENDING_PAYMENT" />
            <span className="text-xs text-[#A3A3A3]">
              Complete payment to activate your account.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" onClick={() => navigate('/account')}>
              [ VIEW_ACCOUNT ]
            </Button>
            <Button size="sm" variant="outline" onClick={() => navigate('/browse')}>
              [ BROWSE ]
            </Button>
          </div>
        </div>
      </AuthShell>
    )
  }

  return (
    <AuthShell
      title="CREATE_ACCOUNT"
      path="user@inside-underground:~/register"
      description="Register to access the marketplace."
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          type="text"
          prefixText=">"
          placeholder="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          autoComplete="username"
        />
        <Input
          type="email"
          prefixText="@"
          placeholder="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
        />
        <Input
          type="password"
          prefixText="#"
          placeholder="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="new-password"
        />
        <PasswordStrengthIndicator password={password} />
        <Input
          type="password"
          prefixText="#"
          placeholder="confirm password"
          value={confirm}
          onChange={(event) => setConfirm(event.target.value)}
          autoComplete="new-password"
        />

        <div className="flex items-center gap-2 text-xs text-[#A3A3A3]">
          <button
            type="button"
            onClick={() => setAgree(!agree)}
            aria-pressed={agree}
            className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-[#1E1E1E] bg-[#080808] font-mono text-[10px] text-[#00FF66]"
          >
            {agree ? '[x]' : '[ ]'}
          </button>
          <span>
            I agree to the{' '}
            <Link to="/terms" className="text-[#0099FF] hover:underline">
              Terms of Service
            </Link>
          </span>
        </div>

        {error && <p className="text-xs text-[#FF3333]">{error}</p>}

        <Button type="submit" size="sm" className="w-full" disabled={pending}>
          {pending ? 'CREATING...' : '[ CREATE_ACCOUNT ]'}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full"
          onClick={google.handleGoogle}
          disabled={google.pending}
        >
          {google.pending ? 'CONNECTING...' : '[ SIGN_IN_WITH_GOOGLE ]'}
        </Button>
        {google.error && <p className="text-xs text-[#FF3333]">{google.error}</p>}

        <Separator />

        <p className="text-center text-xs text-[#737373]">
          Already have an account?{' '}
          <Link to="/login" className="text-[#00FF66] hover:underline">
            Login
          </Link>
        </p>
      </form>

      {google.conflict && (
        <GoogleLinkDialog
          email={google.conflict.email}
          googleCredential={google.conflict.googleCredential}
          onClose={() => google.setConflict(null)}
          onLinked={() => navigate('/account')}
        />
      )}
    </AuthShell>
  )
}
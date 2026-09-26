import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signIn } from '@/services/auth'
import { AuthShell } from '@/components/auth/AuthShell'
import { GoogleLinkDialog } from '@/components/auth/GoogleLinkDialog'
import { useGoogleSignIn } from '@/components/auth/useGoogleSignIn'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

function getSignInErrorMessage(code: string): string {
  switch (code) {
    case 'auth/invalid-email':
      return 'Please enter a valid email address.'
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Invalid email or password.'
    default:
      return 'Unable to sign in. Please try again.'
  }
}

export function LoginPage() {
  const navigate = useNavigate()
  const google = useGoogleSignIn()

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState<string | null>(null)
  const [pending, setPending] = React.useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)
    setPending(true)
    try {
      await signIn(email, password)
      navigate('/account')
    } catch (caught) {
      setError(getSignInErrorMessage((caught as { code?: string }).code ?? ''))
    } finally {
      setPending(false)
    }
  }

  return (
    <AuthShell
      title="LOGIN"
      path="user@inside-underground:~/login"
      description="Sign in to access your account."
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
        <Input
          type="password"
          prefixText="#"
          placeholder="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
        />

        {error && <p className="text-xs text-[#FF3333]">{error}</p>}

        <Button type="submit" size="sm" className="w-full" disabled={pending}>
          {pending ? 'SIGNING_IN...' : '[ LOGIN ]'}
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

        <div className="pt-1 text-center">
          <Link to="/forgot-password" className="text-xs text-[#0099FF] hover:underline">
            Forgot password?
          </Link>
        </div>

        <Separator />

        <p className="text-center text-xs text-[#737373]">
          New here?{' '}
          <Link to="/register" className="text-[#00FF66] hover:underline">
            Create an account
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
import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { createProfileWithUsername } from '@/services/auth'
import { AuthShell } from '@/components/auth/AuthShell'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const USERNAME_PATTERN = /^[a-zA-Z0-9_.-]{3,24}$/

export function SetupProfilePage() {
  const navigate = useNavigate()
  const { user, profile, loading } = useAuth()

  const [username, setUsername] = React.useState('')
  const [error, setError] = React.useState<string | null>(null)
  const [pending, setPending] = React.useState(false)

  React.useEffect(() => {
    if (loading) {
      return
    }
    if (!user) {
      navigate('/login', { replace: true })
      return
    }
    if (profile) {
      navigate('/account', { replace: true })
    }
  }, [loading, user, profile, navigate])

  if (loading || !user) {
    return (
      <AuthShell title="SETUP_PROFILE" path="user@inside-underground:~/setup-profile">
        <p className="font-mono text-xs text-[#525252]">$ checking_session...</p>
      </AuthShell>
    )
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)

    if (!USERNAME_PATTERN.test(username)) {
      setError('Username must be 3-24 characters using letters, numbers, _ . or -.')
      return
    }

    setPending(true)
    try {
      await createProfileWithUsername(user, username)
      navigate('/account')
    } catch {
      setError('Unable to create your profile. Please try again.')
    } finally {
      setPending(false)
    }
  }

  return (
    <AuthShell
      title="CHOOSE_USERNAME"
      path="user@inside-underground:~/setup-profile"
      description={`Welcome${user.email ? `, ${user.email}` : ''}. Choose a username to complete your account.`}
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          type="text"
          prefixText=">"
          placeholder="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          autoComplete="username"
          autoFocus
        />
        {error && <p className="text-xs text-[#FF3333]">{error}</p>}
        <Button type="submit" size="sm" className="w-full" disabled={pending || !username}>
          {pending ? 'SAVING...' : '[ CREATE_PROFILE ]'}
        </Button>
      </form>
    </AuthShell>
  )
}
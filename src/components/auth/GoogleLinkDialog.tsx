import * as React from 'react'
import type { OAuthCredential } from 'firebase/auth'
import { linkGoogleAccount } from '@/services/auth'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export interface GoogleLinkDialogProps {
  email: string
  googleCredential: OAuthCredential | null
  onClose: () => void
  onLinked: () => void
}

export function GoogleLinkDialog({
  email,
  googleCredential,
  onClose,
  onLinked,
}: GoogleLinkDialogProps) {
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState<string | null>(null)
  const [pending, setPending] = React.useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!googleCredential) {
      return
    }
    setError(null)
    setPending(true)
    try {
      await linkGoogleAccount(email, password, googleCredential)
      onLinked()
    } catch {
      setError('Unable to link accounts. Check the password and try again.')
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <Card className="relative z-10 w-full max-w-sm font-mono">
        <CardHeader>
          <CardTitle className="text-sm text-[#FFB800]">ACCOUNT_LINK_REQUIRED</CardTitle>
          <CardDescription>
            An account already exists for{' '}
            <span className="text-[#00FF66]">{email}</span> using email/password. Enter that
            account's password to link your Google sign-in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!googleCredential ? (
            <p className="text-xs text-[#FF3333]">
              Google credential unavailable. Please sign in with email/password instead.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <Input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="existing password"
                autoComplete="current-password"
                autoFocus
              />
              {error && <p className="text-xs text-[#FF3333]">{error}</p>}
              <div className="flex items-center gap-2 pt-1">
                <Button type="submit" size="sm" disabled={pending || !password}>
                  {pending ? 'LINKING...' : '[ LINK_ACCOUNTS ]'}
                </Button>
                <Button type="button" variant="ghost" size="sm" onClick={onClose}>
                  CANCEL
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  GoogleEmailConflictError,
  signInWithGoogle,
  type GoogleSignInResult,
} from '@/services/auth'
import type { OAuthCredential } from 'firebase/auth'

export interface GoogleConflict {
  email: string
  googleCredential: OAuthCredential | null
}

export interface UseGoogleSignInResult {
  handleGoogle: () => Promise<void>
  error: string | null
  conflict: GoogleConflict | null
  setConflict: (conflict: GoogleConflict | null) => void
  pending: boolean
}

const IGNORED_CODES = new Set(['auth/popup-closed-by-user', 'auth/cancelled-popup-request'])

export function useGoogleSignIn(): UseGoogleSignInResult {
  const navigate = useNavigate()
  const [error, setError] = React.useState<string | null>(null)
  const [conflict, setConflict] = React.useState<GoogleConflict | null>(null)
  const [pending, setPending] = React.useState(false)

  const handleGoogle = async (): Promise<void> => {
    setError(null)
    setPending(true)
    try {
      const result: GoogleSignInResult = await signInWithGoogle()
      navigate(result.needsProfile ? '/setup-profile' : '/account')
    } catch (caught) {
      if (caught instanceof GoogleEmailConflictError) {
        setConflict({
          email: caught.email,
          googleCredential: caught.googleCredential,
        })
        return
      }
      const code = (caught as { code?: string }).code
      if (code && IGNORED_CODES.has(code)) {
        return
      }
      setError('Google sign-in failed. Please try again.')
    } finally {
      setPending(false)
    }
  }

  return { handleGoogle, error, conflict, setConflict, pending }
}
import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { signOut } from '@/services/auth'
import {
  SESSION_EXPIRED_PARAM,
  SESSION_IDLE_TIMEOUT_MS,
  SESSION_MAX_DURATION_MS,
} from '@/config/session'

const DISCRETE_ACTIVITY_EVENTS = ['pointerdown', 'keydown', 'touchstart'] as const
const CONTINUOUS_ACTIVITY_EVENTS = ['mousemove', 'scroll'] as const
const CONTINUOUS_THROTTLE_MS = 1000

/**
 * Enforces a temporary banking-style session while a user is signed in:
 * - An idle timer signs the user out after SESSION_IDLE_TIMEOUT_MS of
 *   inactivity.
 * - A hard cap signs the user out after SESSION_MAX_DURATION_MS regardless of
 *   activity.
 *
 * On expiry the user is signed out and redirected to /login?expired=1.
 */
export function useSessionGuard(): void {
  const navigate = useNavigate()
  const { user, loading } = useAuth()

  const idleTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const maxTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastActivityRef = React.useRef<number>(0)

  const clearTimers = React.useCallback(() => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current)
      idleTimerRef.current = null
    }
    if (maxTimerRef.current) {
      clearTimeout(maxTimerRef.current)
      maxTimerRef.current = null
    }
  }, [])

  const expireSession = React.useCallback(() => {
    clearTimers()
    void signOut().finally(() => {
      navigate(`/login?${SESSION_EXPIRED_PARAM}=1`, { replace: true })
    })
  }, [clearTimers, navigate])

  const resetIdleTimer = React.useCallback(() => {
    lastActivityRef.current = Date.now()
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current)
    }
    idleTimerRef.current = setTimeout(() => {
      expireSession()
    }, SESSION_IDLE_TIMEOUT_MS)
  }, [expireSession])

  React.useEffect(() => {
    if (loading) {
      return
    }

    if (!user) {
      clearTimers()
      return
    }

    maxTimerRef.current = setTimeout(() => {
      expireSession()
    }, SESSION_MAX_DURATION_MS)

    resetIdleTimer()

    const handleDiscreteActivity = () => {
      resetIdleTimer()
    }

    const handleContinuousActivity = () => {
      if (Date.now() - lastActivityRef.current > CONTINUOUS_THROTTLE_MS) {
        resetIdleTimer()
      }
    }

    DISCRETE_ACTIVITY_EVENTS.forEach((eventName) => {
      window.addEventListener(eventName, handleDiscreteActivity, { passive: true })
    })
    CONTINUOUS_ACTIVITY_EVENTS.forEach((eventName) => {
      window.addEventListener(eventName, handleContinuousActivity, { passive: true })
    })

    return () => {
      DISCRETE_ACTIVITY_EVENTS.forEach((eventName) => {
        window.removeEventListener(eventName, handleDiscreteActivity)
      })
      CONTINUOUS_ACTIVITY_EVENTS.forEach((eventName) => {
        window.removeEventListener(eventName, handleContinuousActivity)
      })
      clearTimers()
    }
  }, [loading, user, clearTimers, expireSession, resetIdleTimer])
}
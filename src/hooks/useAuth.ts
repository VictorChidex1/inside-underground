import * as React from 'react'
import { type User } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import { subscribeToAuthChanges } from '@/services/auth'
import { db } from '@/services/firebase'
import type { UserProfile } from '@/types'

export interface AuthState {
  user: User | null
  loading: boolean
  profile: UserProfile | null
}

export function useAuth(): AuthState {
  const [user, setUser] = React.useState<User | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [profile, setProfile] = React.useState<UserProfile | null>(null)
  const [profileUid, setProfileUid] = React.useState<string | null>(null)

  React.useEffect(() => {
    return subscribeToAuthChanges((nextUser) => {
      setUser(nextUser)
      setLoading(false)
    })
  }, [])

  React.useEffect(() => {
    if (!user) {
      return
    }

    const userDocRef = doc(db, 'users', user.uid)
    return onSnapshot(userDocRef, (snapshot) => {
      setProfile(snapshot.exists() ? (snapshot.data() as UserProfile) : null)
      setProfileUid(user.uid)
    })
  }, [user])

  const resolvedProfile = user && profileUid === user.uid ? profile : null

  return { user, loading, profile: resolvedProfile }
}
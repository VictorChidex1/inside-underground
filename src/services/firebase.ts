import { initializeApp, type FirebaseApp } from 'firebase/app'
import {
  browserSessionPersistence,
  getAuth,
  setPersistence,
  type Auth,
} from 'firebase/auth'
import { getFirestore, type Firestore } from 'firebase/firestore'

export interface FirebaseConfig {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
}

export function loadFirebaseConfig(env: ImportMetaEnv): FirebaseConfig {
  return {
    apiKey: env.VITE_FIREBASE_API_KEY,
    authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: env.VITE_FIREBASE_APP_ID,
  }
}

function getFirebaseConfig(): FirebaseConfig {
  const config = loadFirebaseConfig(import.meta.env)
  const missing = Object.entries(config)
    .filter(([, value]) => !value)
    .map(([key]) => key)

  if (missing.length > 0) {
    throw new Error(
      `Firebase web config is incomplete. Missing: ${missing.join(', ')}. ` +
        'Add the VITE_FIREBASE_* values to .env.local (see .env.example).'
    )
  }

  return config
}

export const firebaseConfig: FirebaseConfig = getFirebaseConfig()
export const app: FirebaseApp = initializeApp(firebaseConfig)
export const auth: Auth = getAuth(app)
export const db: Firestore = getFirestore(app)

// Banking-style temporary session: auth tokens live in sessionStorage so they
// are wiped when the tab closes. Same-tab reloads keep the session; reopening
// the site requires signing in again.
void setPersistence(auth, browserSessionPersistence).catch((error) => {
  console.error('Failed to configure browser session persistence:', error)
})
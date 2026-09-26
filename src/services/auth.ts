import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  linkWithCredential,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  verifyPasswordResetCode,
  type AuthError,
  type OAuthCredential,
  type User,
} from 'firebase/auth'
import { doc, getDoc, serverTimestamp, setDoc, type FieldValue } from 'firebase/firestore'
import { auth, db } from './firebase'

export interface RegisterInput {
  email: string
  password: string
  username: string
}

export interface GoogleSignInResult {
  user: User
  needsProfile: boolean
}

/**
 * Thrown when Google sign-in finds an existing account with the same email
 * that was created with a different credential (e.g. email/password). Carries
 * the Google credential so the caller can offer an account-linking flow.
 */
export class GoogleEmailConflictError extends Error {
  readonly email: string
  readonly googleCredential: OAuthCredential | null

  constructor(email: string, googleCredential: OAuthCredential | null) {
    super('An account with this email already exists. Sign in with its password to link it.')
    this.name = 'GoogleEmailConflictError'
    this.email = email
    this.googleCredential = googleCredential
  }
}

function getErrorEmail(error: AuthError): string {
  const customData = (error as { customData?: { email?: string } }).customData
  if (customData?.email) {
    return customData.email
  }
  return (error as { email?: string }).email ?? ''
}

function toProfileData(
  uid: string,
  email: string,
  username: string
): Record<string, FieldValue | string> {
  return {
    uid,
    email,
    username,
    role: 'customer',
    accountStatus: 'pending_payment',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }
}

async function userProfileExists(uid: string): Promise<boolean> {
  const snapshot = await getDoc(doc(db, 'users', uid))
  return snapshot.exists()
}

/**
 * Creates a Firebase Authentication account and the corresponding Firestore
 * user profile. A new account is always created with `accountStatus` =
 * "pending_payment". Activation is a server-side decision and is never
 * performed by the client.
 */
export async function registerUser({
  email,
  password,
  username,
}: RegisterInput): Promise<User> {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  const uid = userCredential.user.uid

  await setDoc(doc(db, 'users', uid), toProfileData(uid, email, username))

  return userCredential.user
}

/**
 * Signs in with Google via a popup. On success, reports whether a Firestore
 * profile still needs to be created (first-time Google users). Does NOT
 * create a profile automatically — the UI routes those users to a one-time
 * "choose your username" step.
 */
export async function signInWithGoogle(): Promise<GoogleSignInResult> {
  const provider = new GoogleAuthProvider()

  try {
    const userCredential = await signInWithPopup(auth, provider)
    const user = userCredential.user
    const needsProfile = !(await userProfileExists(user.uid))
    return { user, needsProfile }
  } catch (error) {
    const authError = error as AuthError
    if (authError.code === 'auth/account-exists-with-different-credential') {
      const googleCredential = GoogleAuthProvider.credentialFromError(authError)
      throw new GoogleEmailConflictError(getErrorEmail(authError), googleCredential)
    }
    throw error
  }
}

/**
 * Creates the Firestore profile for a signed-in user (used by the one-time
 * username setup step). Only creates when the profile does not already exist,
 * and always with `accountStatus` = "pending_payment".
 */
export async function createProfileWithUsername(
  user: User,
  username: string
): Promise<void> {
  const profileDoc = doc(db, 'users', user.uid)

  if (await userProfileExists(user.uid)) {
    throw new Error('Profile already exists.')
  }

  await setDoc(profileDoc, toProfileData(user.uid, user.email ?? '', username))
}

/**
 * Links a Google credential to an existing email/password account after the
 * user proves ownership by signing in with that account's password.
 */
export async function linkGoogleAccount(
  email: string,
  password: string,
  googleCredential: OAuthCredential
): Promise<User> {
  const userCredential = await signInWithEmailAndPassword(auth, email, password)
  const linkedCredential = await linkWithCredential(userCredential.user, googleCredential)
  return linkedCredential.user
}

export async function signIn(email: string, password: string): Promise<User> {
  const userCredential = await signInWithEmailAndPassword(auth, email, password)
  return userCredential.user
}

export async function signOut(): Promise<void> {
  await firebaseSignOut(auth)
}

export async function resetPassword(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email)
}

export async function getResetEmail(oobCode: string): Promise<string> {
  return verifyPasswordResetCode(auth, oobCode)
}

export async function setNewPassword(oobCode: string, newPassword: string): Promise<void> {
  await confirmPasswordReset(auth, oobCode, newPassword)
}

export function subscribeToAuthChanges(
  callback: (user: User | null) => void
): () => void {
  return onAuthStateChanged(auth, callback)
}
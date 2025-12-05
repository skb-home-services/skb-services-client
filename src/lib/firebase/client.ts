import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut as firebaseSignOut,
    onAuthStateChanged as firebaseOnAuthStateChanged,
    User,
    sendPasswordResetEmail,
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp;

if (!getApps().length) app = initializeApp(firebaseConfig);
else app = getApps()[0];

export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export async function signInWithEmail(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
}

export async function signUpWithEmail(email: string, password: string) {
    return await createUserWithEmailAndPassword(auth, email, password);
}

export async function signInWithGoogle() {
    return signInWithPopup(auth, googleProvider);
}

export async function signOut() {
    return firebaseSignOut(auth);
}

export function onAuthStateChanged(callback: (user: User | null) => void) {
    return firebaseOnAuthStateChanged(auth, callback);
}

export function resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email);
}

/**
 * Get Firebase ID token for the current user
 * @param forceRefresh - if true, forces fetching a new token from Firebase
 */
export async function getFirebaseIdToken(forceRefresh = false): Promise<string | null> {
    const user = auth.currentUser;
    if (!user) return null;
    return user.getIdToken(forceRefresh);
}

export { app };

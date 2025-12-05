'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from 'firebase/auth';
import {
    onAuthStateChanged,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signOut as firebaseSignOut,
    getFirebaseIdToken,
    resetPassword as firebaseResetPassword,
} from '@/lib/firebase/client';
import type { AuthState, AuthUser } from '@/types';

interface AuthContextType extends AuthState {
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string) => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    signInGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
    refreshToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | null>(null);

function mapFirebaseUser(user: User): AuthUser {
    return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
    };
}

const initialState: AuthState = {
    user: null,
    idToken: null,
    roles: [],
    isLoading: true,
    isAuthenticated: false,
};

export function AuthProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<AuthState>(initialState);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(async (firebaseUser) => {
            if (firebaseUser) {
                const token = await firebaseUser.getIdToken();
                const tokenResult = await firebaseUser.getIdTokenResult();
                const roles = (tokenResult.claims.role as string[]) || [];

                setState({
                    user: mapFirebaseUser(firebaseUser),
                    idToken: token,
                    roles,
                    isLoading: false,
                    isAuthenticated: true,
                });
            } else {
                setState(initialState);
            }
        });

        return () => unsubscribe();
    }, []);

    const signIn = async (email: string, password: string) => {
        await signInWithEmail(email, password);
    };

    const signUp = async (email: string, password: string) => {
        await signUpWithEmail(email, password);
    };

    const signInGoogle = async () => {
        await signInWithGoogle();
    };

    const signOut = async () => {
        await firebaseSignOut();
        setState({
            user: null,
            idToken: null,
            roles: [],
            isLoading: false,
            isAuthenticated: false,
        });
    };

    const refreshToken = async (): Promise<string | null> => {
        const token = await getFirebaseIdToken();
        if (token) setState((prev) => ({ ...prev, idToken: token }));
        return token;
    };

    const resetPassword = async (email: string) => {
        await firebaseResetPassword(email);
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                signIn,
                signUp,
                signInGoogle,
                signOut,
                refreshToken,
                resetPassword,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
}

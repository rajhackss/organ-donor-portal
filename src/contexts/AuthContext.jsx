import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../lib/firebase';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userRole, setUserRole] = useState(null); // 'donor', 'recipient', 'admin'
    const [loading, setLoading] = useState(true);

    // Sign in with Google
    const loginWithGoogle = async (role = 'donor') => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // Check if user document exists in Firestore
            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);

            let finalRole = role;
            if (!userDoc.exists()) {
                // First time login, create document
                await setDoc(userDocRef, {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    role: role, // Default requested role
                    status: 'Pending', // Pending admin verification
                    createdAt: new Date()
                });
                setUserRole(role);
            } else {
                finalRole = userDoc.data().role;
                setUserRole(finalRole);
            }

            return { user, role: finalRole };
        } catch (error) {
            console.error("Error signing in with Google", error);
            throw error;
        }
    };

    const logout = () => {
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);
            if (user) {
                // Fetch role from Firestore
                const userDocRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    setUserRole(userDoc.data().role);
                }
            } else {
                setUserRole(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        userRole,
        loginWithGoogle,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

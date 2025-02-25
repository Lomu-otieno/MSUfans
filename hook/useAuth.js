import { View, Text } from 'react-native'
import React from 'react'
import { auth } from '../config/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'



export default function userAuth() {
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => {
            setErrorMessage('User added successfully!');
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
        return unsub;
    }, []);
    return { user }
}
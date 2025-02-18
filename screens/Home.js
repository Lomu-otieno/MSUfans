import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import React from 'react';
import { signOut, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useState } from 'react';

export default function Home() {
    const handleLogout = async () => {
        await signOut(auth);
    };
    const image = { uri: 'https://i.pinimg.com/236x/ed/20/5a/ed205aff1fb33c28ddd8bfc7f3e7ff29.jpg' };
    const [errorMessage, setErrorMessage] = useState('');
    const changePassword = () => {
        if (auth.currentUser) {
            sendPasswordResetEmail(auth, auth.currentUser.email)
                .then(() => {
                    setErrorMessage('Password reset email sent.');
                })
                .catch((error) => {
                    setErrorMessage("Too many Requests, try agian later");
                });
        } else {
            setErrorMessage('Error', 'No user is logged in.');
        }
    };

    return (
        <ImageBackground source={image} resizeMode="cover" style={styles.backgroundImage}>
            <View style={styles.container}>
                <Text style={styles.header}>Home pimping page</Text>

                <View style={styles.button_container}>
                    <TouchableOpacity onPress={handleLogout}>
                        <Text style={styles.button}>Logout</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.button_container}>
                    <TouchableOpacity onPress={changePassword}>
                        <Text style={styles.button}>Change Password</Text>
                    </TouchableOpacity>
                </View>
                {errorMessage ? (
                    <Text style={styles.errorText}>{errorMessage}</Text>
                ) : null}
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        color: 'white',
        fontSize: 20,
        padding: 10,
    },
    button_container: {
        width: '50%',
        backgroundColor: 'blue',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginVertical: 10,
    },
    button: {
        color: '#fff',
        fontSize: 18,
    },
    errorText: {
        color: 'red',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 5,
        backgroundColor: "white",
        borderRadius: 5
    }
});

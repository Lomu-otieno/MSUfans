import { StatusBar } from 'expo-status-bar';
import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, Alert, TouchableOpacity } from 'react-native';
import { auth } from '../config/firebase'; // Use auth from firebase config

const image = { uri: ('https://i.pinimg.com/736x/19/9a/06/199a06f51bcef14e8d0357912fa53f5b.jpg') }

const ForgotPassScreen = ({ navigation }) => {
    const [email, onchangeEmail] = useState('');
    const [focusedInput, setFocusedInput] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleResetPassword = async () => {
        setErrorMessage('');
        if (!email.trim()) {
            setErrorMessage("Enter your damn email, motherfucker!");
            return;
        }
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setErrorMessage("Password Reset Link is sent Successfully!")
            })
            .catch((error) => {
                setErrorMessage(error.message);
            });
    };

    return (
        <>
            <StatusBar style='dark'></StatusBar>
            <ImageBackground source={image} resizeMode='cover' style={styles.backgroundImage}>
                <View style={styles.container}>
                    <Text style={styles.header}>Forgot Password?</Text>
                    <View style={styles.subcontainer}>
                        <Text style={styles.text}>Enter email</Text>
                        <TextInput
                            style={[styles.input, { color: focusedInput === 'input1' ? 'yellow' : '#000' }]}
                            value={email}
                            placeholder='example@gmail.com'
                            onChangeText={onchangeEmail}
                            onFocus={() => setFocusedInput('input1')}
                            onBlur={() => setFocusedInput(null)}
                            keyboardType='email-address'
                            autoCapitalize='none'
                        />

                        {errorMessage ? (
                            <Text style={[styles.errorMessage, errorMessage.includes("Success") && styles.successMessage]}>
                                {errorMessage}
                            </Text>
                        ) : null}
                    </View>

                    <TouchableOpacity onPress={handleResetPassword} style={styles.button}>
                        <Text style={styles.buttonText}>Reset Password</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </>
    );
}

export default ForgotPassScreen;

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        justifyContent: "center"
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
    },
    header: {
        marginBottom: 40,
        color: "#2f3061",
        width: "80%",
        backgroundColor: "#758173",
        height: 40,
        textAlign: 'center',
        fontSize: 25,
        borderRadius: 5,
        padding: 4,
    },
    input: {
        fontSize: 18,
        height: 40,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginBottom: 25,
        borderColor: "white"
    },
    text: {
        color: "white",
        fontSize: 18,
    },
    subcontainer: {
        width: "80%",
        padding: 15,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        backgroundColor: "blue",
        borderRadius: 10,
        padding: 10,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: '600',
        color: "#fff",
    },
    errorMessage: {
        color: "red",
        fontSize: 18,
        textAlign: 'center',
        marginTop: 5,
        backgroundColor: "white",
        borderRadius: 5
    },
    successMessage: {
        color: "green",
    }
});

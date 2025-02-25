import { StatusBar } from 'expo-status-bar';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, Alert, TouchableOpacity } from 'react-native'
import { auth } from '../config/firebase';
import { updateProfile } from 'firebase/auth';

const image = { uri: ('https://i.pinimg.com/736x/af/e1/1b/afe11bd360cf7366be1d4bc7bc79b375.jpg') }
//https://cdni.pornpics.com/460/7/254/30902988/30902988_038_aab8.jpg
const SignupScreen = ({ navigation }) => {
    const [username, onchangeUsername] = React.useState('');
    const [email, onchangeEmail] = React.useState('');
    const [password, onchangepassword] = React.useState('');
    const [confirm, onchangeconfirm] = React.useState('');
    const [focusedInput, setFocusedInput] = useState(null);
    const [errorMessage, setErrorMessage] = useState('')


    const handleSubmit = async () => {
        if (email && password && username) {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // Update Firebase Auth profile with the username
                await updateProfile(user, { displayName: username });

                Alert.alert("Success", "Account created.");
                navigation.goBack();
            } catch (error) {
                setErrorMessage("Check your internet connection and try again");
            }
        } else {
            setErrorMessage("Please enter all required fields");
        }
    };
    return (
        <>
            <StatusBar style='dark'></StatusBar>
            <ImageBackground source={image} resizeMode='cover' style={styles.backgroundImage}>
                <View style={styles.container}>
                    <Text style={styles.header}>Sign Up</Text>
                    <View style={styles.subcontainer}>
                        <View style={{ padding: 10, borderRadius: 10 }}>
                            <View>
                                <Text style={styles.text}>Username</Text>
                                <TextInput style={[styles.input, { color: focusedInput === 'input1' ? 'yellow' : '#000' }]}
                                    value={username}
                                    placeholder='enter your username'
                                    placeholderTextColor={focusedInput === 'input1' ? '#999' : '#fff'}
                                    onChangeText={value => onchangeUsername(value)}
                                    onFocus={() => setFocusedInput('input1')}
                                    onBlur={() => setFocusedInput(null)}
                                >
                                </TextInput>
                            </View>
                            <View>
                                <Text style={styles.text}>Enter email</Text>
                                <TextInput style={[styles.input, { color: focusedInput === 'input2' ? 'yellow' : '#000' }]}
                                    value={email}
                                    placeholder='example@gmail.com'
                                    placeholderTextColor={focusedInput === 'input2' ? '#999' : '#fff'}
                                    onChangeText={value => onchangeEmail(value)}
                                    onFocus={() => setFocusedInput('input2')}
                                    onBlur={() => setFocusedInput(null)}
                                >
                                </TextInput>
                            </View>
                            <View>
                                <Text style={styles.text}>Set Password</Text>
                                <TextInput style={[styles.input, { color: focusedInput === 'input3' ? 'yellow' : '#000' }]}
                                    value={password}
                                    placeholder='********'
                                    placeholderTextColor={focusedInput === 'input3' ? '#999' : '#fff'}
                                    onChangeText={value => onchangepassword(value)}
                                    secureTextEntry
                                    autoCorrect={false}
                                    onFocus={() => setFocusedInput('input3')}
                                    onBlur={() => setFocusedInput(null)}
                                >
                                </TextInput>
                            </View>
                            {errorMessage ? (
                                <Text style={{ backgroundColor: "#fff", color: "red", fontSize: 18, borderRadius: 5 }}>{errorMessage}</Text>
                            ) : null}
                        </View>
                    </View>
                    <TouchableOpacity onPress={handleSubmit}>
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 200,
                            backgroundColor: "green",
                            borderRadius: 10,


                        }}
                        >
                            <Text style={{
                                fontSize: 25,
                                fontWeight: '400',
                                color: "#fff",
                            }}>Signup</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <View style={{
                            marginTop: 10,
                            alignItems: 'center',
                            justifyContent: 'center',


                        }}
                        >
                            <Text style={{
                                fontSize: 18,
                                fontWeight: '200',
                                color: "#fff",
                            }}>Already have a account? <Text style={{ color: "darkblue", fontSize: 22 }}>Login</Text> </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </>

    );
}

export default SignupScreen;

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        justifyContent: "center"
    },
    container: {
        flex: 1,
        justifyContent: "center",
        flexDirection: 'column',
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
        borderColor: "grey",
        backgroundColor: "grey"
    },
    text: {
        color: "#3D7A57",
        fontSize: 18,
    },
    subcontainer: {
        width: "80%",
        padding: 15,
    },
    button: {
        color: 'green',
        width: '50%',
        borderRadius: 40,

    },
});
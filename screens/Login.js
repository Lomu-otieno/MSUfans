import { StatusBar } from 'expo-status-bar';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, Alert, TouchableOpacity } from 'react-native';
import { auth } from '../config/firebase';

const image = { uri: ('https://i.pinimg.com/474x/8e/2e/0c/8e2e0c7e8c45a06aacb1bfffefbcfcaa.jpg') }
//https://i.pinimg.com/736x/af/e1/1b/afe11bd360cf7366be1d4bc7bc79b375.jpg

const LoginScreen = ({ navigation }) => {
    const [email, onchangeEmail] = React.useState('');
    const [password, onchangepassword] = React.useState('');
    const [focusedInput, setFocusedInput] = useState(null);

    const handleSubmit = async () => {
        if (email && password) {
            try {
                await signInWithEmailAndPassword(auth, email, password);
            } catch (error) {
                console.log('got error', error.message);
            }
        }
    }

    const forgetPassword = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                Alert.alert('Passowrd Reset Link is sent Successfully')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }
    return (
        <>
            <StatusBar style='dark'></StatusBar>
            <ImageBackground source={image} resizeMode='cover' style={styles.backgroundImage}>
                <View style={styles.container}>
                    <Text style={styles.header}>Login</Text>
                    <View style={styles.subcontainer}>
                        <View>
                            <View>
                                <Text style={styles.text}>Enter email</Text>
                                <TextInput style={[styles.input, { color: focusedInput === 'input1' ? 'yellow' : '#000' }]}
                                    value={email}
                                    placeholder='example@gmail.com'
                                    onChangeText={value => onchangeEmail(value)}
                                    onFocus={() => setFocusedInput('input1')}
                                    onBlur={() => setFocusedInput(null)}
                                >
                                </TextInput>
                            </View>
                            <View>
                                <Text style={styles.text}>Enter Password</Text>
                                <TextInput style={[styles.input, { color: focusedInput === 'input2' ? 'yellow' : '#000' }]}
                                    value={password}
                                    placeholder='********'
                                    onChangeText={value => onchangepassword(value)}
                                    secureTextEntry
                                    autoCorrect={false}
                                    onFocus={() => setFocusedInput('input2')}
                                    onBlur={() => setFocusedInput(null)}
                                >
                                </TextInput>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassScreen')}>
                            <View style={{
                                marginTop: 10,
                                alignItems: 'center',
                                justifyContent: 'center',


                            }}
                            >
                                <Text style={{
                                    fontSize: 15,
                                    fontWeight: '200',
                                    color: "#fff",
                                }}>forgot password? <Text style={{ color: "darkblue", fontSize: 18 }}>Reset</Text></Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={handleSubmit}>
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 200,
                            backgroundColor: "blue",
                            borderRadius: 10,


                        }}
                        >
                            <Text style={{
                                fontSize: 25,
                                fontWeight: '400',
                                color: "#fff",
                            }}>Login</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
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
                            }}>Don't have account? <Text style={{ color: "darkblue", fontSize: 22 }}>Signup</Text></Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </>

    );
}

export default LoginScreen;

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
        color: 'green',
        width: '50%',
        borderRadius: 40,

    },
});
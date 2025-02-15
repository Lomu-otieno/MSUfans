import React from 'react';
import { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ImageBackground, Alert } from 'react-native';

const image = { uri: ('https://cdni.pornpics.com/460/7/254/30902988/30902988_038_aab8.jpg') }

const SignupScreen = ({ navigation }) => {
    const [email, onchangeEmail] = React.useState('');
    const [password, onchangepassword] = React.useState('');
    const [confirm, onchangeconfirm] = React.useState('');

    const hello = () => {
        return Alert.alert("Hello");
    }
    return (

        <ImageBackground source={image} resizeMode='cover' style={styles.backgroundImage}>
            <View style={styles.container}>
                <Text style={styles.header}>Sign Up</Text>
                <View style={styles.subcontainer}>
                    <View>
                        <Text style={styles.text}>Enter email</Text>
                        <TextInput style={styles.input}
                            value={email}
                            placeholder='example@gmail.com'
                            onChangeText={onchangeEmail}
                        >
                        </TextInput>
                    </View>
                    <View>
                        <Text style={styles.text}>Set Password</Text>
                        <TextInput style={styles.input}
                            value={password}
                            placeholder='********'
                            onChangeText={onchangepassword}
                            secureTextEntry
                            autoCorrect={false}
                        >
                        </TextInput>
                    </View>
                    <View>
                        <Text style={styles.text}>confirm Password</Text>
                        <TextInput style={styles.input}
                            value={password}
                            placeholder='********'
                            onChangeText={onchangeconfirm}
                            secureTextEntry
                            autoCorrect={false}
                        >
                        </TextInput>
                    </View>
                </View>
                <View style={styles.button}>
                    <Button
                        title="Signup"
                        onPress={hello}
                        style={styles.button}
                    ></Button>
                </View>
            </View>
        </ImageBackground>

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
        // color: '#2f3061'
    },
});
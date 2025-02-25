import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { signOut, sendPasswordResetEmail, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';



export default function Home() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUsername(user.displayName || "No Username"); // Fetch display name or set default
                setEmail(user.email || "No Email");
            }
        });

        return unsubscribe; // Cleanup on unmount
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
    };

    const changePassword = () => {
        if (auth.currentUser) {
            sendPasswordResetEmail(auth, auth.currentUser.email)
                .then(() => {
                    setErrorMessage('Password reset email sent.');
                })
                .catch(() => {
                    setErrorMessage("Too many Requests, try again later");
                });
        } else {
            setErrorMessage('No user is logged in.');
        }
    };

    return (
        <ImageBackground source={{ uri: 'https://i.pinimg.com/236x/ed/20/5a/ed205aff1fb33c28ddd8bfc7f3e7ff29.jpg' }}
            resizeMode="cover" style={styles.backgroundImage}>
            <View style={styles.overlay} />
            <View style={styles.container}>

                {/* Profile Section */}
                <View style={styles.profileContainer}>
                    <View style={styles.profileWrapper}>
                        <Image source={{ uri: 'https://i.pinimg.com/236x/67/ae/00/67ae003d6499d0acf7d0f90c997a2472.jpg' }}
                            style={styles.profileImage} />
                        <TouchableOpacity style={styles.cameraButton}>
                            <Ionicons name="camera-outline" size={30} color={"#fff"} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.username}>{username}</Text>
                </View>

                {/* User Info Section */}
                <View style={styles.bioContainer}>
                    <View style={{ justifyContent: 'center', alignItems: "center" }}>
                        <Text style={styles.bioTitle}>User Bio</Text>
                    </View>
                    <Text style={styles.bioText}><Text style={styles.label}>Email:</Text> {email}</Text>
                    <Text style={styles.bioText}><Text style={styles.label}>Gender:</Text> Male</Text>
                    <Text style={styles.bioText}><Text style={styles.label}>Interest:</Text> Music, Poetry</Text>
                    <Text style={styles.bioText}><Text style={styles.label}>Contact:</Text> +123 456 789</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() => { navigation.navigate('UpdateProfile') }}>
                        <Text>Update Profile</Text>
                    </TouchableOpacity>
                </View>

                {/* Buttons Section */}
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity style={styles.button} onPress={handleLogout}>
                        <Text style={styles.buttonText}>Logout</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, styles.changePassword]} onPress={changePassword}>
                        <Text style={styles.buttonText}>Change Password</Text>
                    </TouchableOpacity>
                </View>

                {/* Error Message */}
                {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay for better contrast
    },
    container: {
        alignItems: 'center',
        padding: 20,
        width: '90%',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: 10,
    },

    /* Profile Section */
    profileContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileWrapper: {
        position: "relative",
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 3,
        borderColor: "#ff3d3d",
    },
    cameraButton: {
        position: "absolute",
        bottom: 5,
        right: 5,
        backgroundColor: "#000",
        padding: 8,
        borderRadius: 20,
    },
    username: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#fff",
        marginTop: 10,
    },

    /* Bio Section */
    bioContainer: {
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        padding: 15,
        borderRadius: 8,
        width: "100%",
        marginBottom: 15,
    },
    bioTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
        borderRadius: 5,
        marginBottom: 15,
    },
    bioText: {
        fontSize: 16,
        color: "#fff",
        marginBottom: 3,
    },
    label: {
        fontWeight: "bold",
        color: "#000",
    },

    /* Buttons */
    buttonWrapper: {
        width: "100%",
        marginTop: 10,
    },
    button: {
        width: '100%',
        backgroundColor: 'blue',
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginVertical: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: "bold",
    },
    changePassword: {
        backgroundColor: 'darkred',
    },

    /* Error Message */
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 10,
        backgroundColor: "white",
        borderRadius: 5,
        padding: 8,
        fontWeight: "bold",
    }
});

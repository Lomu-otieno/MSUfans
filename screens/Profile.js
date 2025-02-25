import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { signOut, sendPasswordResetEmail, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../config/firebase'; // Import Firestore
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { doc, getDoc } from "firebase/firestore"; // Import Firestore methods

export default function Home() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [interests, setInterests] = useState('');
    const [contact, setContact] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUsername(user.displayName || "No Username");
                setEmail(user.email || "No Email");

                // Fetch additional user details from Firestore
                const userDocRef = doc(db, "users", user.uid); // Assuming "users" collection
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();
                    setGender(userData.gender || "Not specified");
                    setInterests(userData.interests || "No interests");
                    setContact(userData.contact || "No contact info");
                    setProfilePicture(userData.profilePicture || "https://via.placeholder.com/150");
                } else {
                    console.log("No user data found in Firestore");
                }
            }
        });

        return unsubscribe;
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
    };

    const changePassword = () => {
        if (auth.currentUser) {
            sendPasswordResetEmail(auth, auth.currentUser.email)
                .then(() => setErrorMessage('Password reset email sent.'))
                .catch(() => setErrorMessage("Too many requests, try again later"));
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
                        <Image source={{ uri: profilePicture }} style={styles.profileImage} />
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
                    <Text style={styles.bioText}><Text style={styles.label}>Gender:</Text> {gender}</Text>
                    <Text style={styles.bioText}><Text style={styles.label}>Interest:</Text> {interests}</Text>
                    <Text style={styles.bioText}><Text style={styles.label}>Contact:</Text> {contact}</Text>
                </View>

                <View style={styles.updateView}>
                    <TouchableOpacity onPress={() => { navigation.navigate('UpdateProfile') }}>
                        <Text style={styles.update}>Update Bio</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark overlay for better contrast
    },
    container: {
        width: '90%',
        backgroundColor: 'rgba(255, 255, 255, 0.15)', // Glassmorphism effect
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        backdropFilter: 'blur(10px)', // Blurred glass effect
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileWrapper: {
        position: 'relative',
        borderRadius: 100,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: '#fff',

    },
    cameraButton: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: '#ff6b6b',
        borderRadius: 20,
        padding: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
    bioContainer: {
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: 20,
        borderRadius: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
    },
    bioTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#000',
        textAlign: 'center',
    },
    bioText: {
        fontSize: 16,
        marginBottom: 8,
        color: '#fff',
        textAlign: 'center',
    },
    label: {
        fontWeight: 'bold',
        color: '#ffcc00',
    },
    buttonWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    updateView: {
        width: "50%",
        backgroundColor: "blue",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10
    },
    update: {
        color: "#fff",
        fontSize: 20
    },
    button: {
        flex: 1,
        marginTop: 25,
        backgroundColor: '#4a90e2',
        paddingVertical: 12,
        borderRadius: 30,
        alignItems: 'center',
        marginHorizontal: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    changePassword: {
        backgroundColor: '#ff6b6b',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorText: {
        color: '#ff6b6b',
        marginTop: 10,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

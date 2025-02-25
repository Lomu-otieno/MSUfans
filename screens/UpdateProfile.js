import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../config/firebase'; // Use Firestore instance from config
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";

const UpdateProfile = () => {
    const navigation = useNavigation();
    const user = auth.currentUser;

    const [interests, setInterests] = useState('');
    const [gender, setGender] = useState('');
    const [contact, setContact] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user) return;

            try {
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setInterests(userData.interests || '');
                    setGender(userData.gender || '');
                    setContact(userData.contact || '');
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [user]);

    const handleUpdate = async () => {
        if (!user) {
            Alert.alert("Error", "User not found");
            return;
        }

        const userDocRef = doc(db, "users", user.uid);

        try {
            // Check if document exists
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
                // If document doesn't exist, create it
                await setDoc(userDocRef, {
                    interests: interests || "",
                    gender: gender || "",
                    contact: contact || ""
                });
                Alert.alert("Success", "Profile created successfully!");
            } else {
                // Update the existing document
                await updateDoc(userDocRef, {
                    interests,
                    gender,
                    contact
                });
                Alert.alert("Success", "Profile updated successfully!");
            }

            navigation.goBack();
        } catch (error) {
            console.error("Error updating profile: ", error);
            Alert.alert("Error", "Failed to update profile");
        }
    };

    return (
        <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Update Profile</Text>

            <TextInput
                placeholder="Your interests (comma separated)"
                value={interests}
                onChangeText={setInterests}
                style={{ borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 }}
            />

            <TextInput
                placeholder="Gender"
                value={gender}
                onChangeText={setGender}
                style={{ borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 }}
            />

            <TextInput
                placeholder="Contact info (email/phone)"
                value={contact}
                onChangeText={setContact}
                keyboardType="phone-pad"
                style={{ borderWidth: 1, padding: 10, marginBottom: 20, borderRadius: 5 }}
            />

            <TouchableOpacity onPress={handleUpdate} style={{ backgroundColor: '#007bff', padding: 15, borderRadius: 5, alignItems: 'center' }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Save Changes</Text>
            </TouchableOpacity>
        </View>
    );
};

export default UpdateProfile;
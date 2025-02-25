import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../config/firebase';
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";

const UpdateProfile = () => {
    const navigation = useNavigation();
    const user = auth.currentUser;

    const [interests, setInterests] = useState('');
    const [gender, setGender] = useState('');
    const [contact, setContact] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user) {
                setLoading(false);
                return;
            }

            try {
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setInterests(userData.interests?.join(', ') || '');
                    setGender(userData.gender || '');
                    setContact(userData.contact || '');
                }
            } catch (error) {
                Alert.alert("Error", "Failed to load profile data.");
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [user]);

    const handleUpdate = async () => {
        if (!user) {
            Alert.alert("Error", "User not found.");
            return;
        }

        if (!interests.trim() || !gender.trim() || !contact.trim()) {
            Alert.alert("Error", "All fields are required.");
            return;
        }

        const userDocRef = doc(db, "users", user.uid);
        setLoading(true);

        try {
            const userDoc = await getDoc(userDocRef);

            const data = {
                interests: interests.split(',').map(item => item.trim()), // Convert to array
                gender: gender.trim(),
                contact: contact.trim(),
            };

            if (!userDoc.exists()) {
                await setDoc(userDocRef, data);
                Alert.alert("Success", "Profile created successfully!");
            } else {
                await updateDoc(userDocRef, data);
                Alert.alert("Success", "Profile updated successfully!");
            }

            navigation.goBack();
        } catch (error) {
            Alert.alert("Error", "Failed to update profile.");
            console.error("Error updating profile: ", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#007bff" />
            </View>
        );
    }

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
                placeholder="Gender (e.g. Male, Female, Other)"
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

            <TouchableOpacity
                onPress={handleUpdate}
                style={{ backgroundColor: '#007bff', padding: 15, borderRadius: 5, alignItems: 'center' }}
            >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>{loading ? 'Saving...' : 'Save Changes'}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default UpdateProfile;

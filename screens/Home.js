import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase'

export default function Home() {
    const handleLogout = async () => {
        await signOut(auth);
    }

    const image = { uri: ('https://i.pinimg.com/236x/ed/20/5a/ed205aff1fb33c28ddd8bfc7f3e7ff29.jpg') }
    //https://i.pinimg.com/736x/19/9a/06/199a06f51bcef14e8d0357912fa53f5b.jpg
    //https://i.pinimg.com/236x/ed/20/5a/ed205aff1fb33c28ddd8bfc7f3e7ff29.jpg
    //https://i.pinimg.com/236x/50/a7/03/50a7038452b9def243975fd9c51fea1d.jpg
    return (
        <ImageBackground source={image} resizeMode='cover' style={styles.backgroundImage}>
            <View style={styles.container}>
                <Text style={styles.header}>Home pimping page</Text>
                <View style={styles.button_container}>
                    <TouchableOpacity
                        onPress={handleLogout}
                    >
                        <Text
                            style={styles.button}
                        >
                            Logout
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        justifyContent: "center"
    },
    container: {
        justifyContent: "center",
        alignItems: "center"
    },
    header: {
        color: "white",
        fontSize: 20,
        padding: 10
    },

    button_container: {
        width: "40%",
        backgroundColor: "blue",
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
    },

    button: {
        color: "#fff",
        fontSize: 18,

    }
});
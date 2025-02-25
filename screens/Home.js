import React from "react";
import { View, Text, StyleSheet, FlatList, Image, ScrollView, TouchableOpacity, PixelRatio } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ImageBackground } from "react-native-web";
import { StatusBar } from "expo-status-bar";

// Dummy data for stories and posts
const stories = [
    { id: "1", image: "https://i.pinimg.com/236x/ed/20/5a/ed205aff1fb33c28ddd8bfc7f3e7ff29.jpg", username: "You" },
    { id: "2", image: "https://picsum.photos/101", username: "Emily" },
    { id: "3", image: "https://picsum.photos/102", username: "Emma" },
    { id: "4", image: "https://picsum.photos/103", username: "Olivia" },
    { id: "5", image: "https://picsum.photos/104", username: "Michael" },
];

const posts = [
    { id: "1", image: "https://i.pinimg.com/474x/fb/d0/a7/fbd0a78875801bd026a85bdf80cd6f85.jpg", username: "Amelia John", likes: "12.5K", comments: "6.8K" },
    { id: "2", image: "https://i.pinimg.com/474x/1e/e1/fc/1ee1fc4d681f56f9a2ab96fc9df42148.jpg", username: "Shekel Afeni", likes: "8.2K", comments: "5.1K" },
    { id: "3", image: "https://i.pinimg.com/474x/73/4a/25/734a251b61723478b09a4bb241822cad.jpg", username: "Jane Snow", likes: "2.2K", comments: "1.5K" },
    { id: "4", image: "https://i.pinimg.com/736x/bc/d9/89/bcd989dcb53d2f8fe976b2d5fec068e7.jpg", username: "Nandi Queens", likes: "5.3K", comments: "8K" },
    { id: "5", image: "https://i.pinimg.com/474x/8d/e3/11/8de3119e99949159d78edcabf0b8e1c8.jpg", username: "Brenda Williams", likes: "6.7K", comments: "10.1K" },
];

const pixelDensity = PixelRatio.get();
const imageSize = 100 * pixelDensity;

const HomeScreen = () => {
    return (
        <>
            <StatusBar style="auto" />
            <View style={styles.container}>
                {/* Header Section */}
                <View style={styles.header}>
                    <TouchableOpacity>
                        <Ionicons name="menu" size={28} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Top Stories</Text>
                    <TouchableOpacity>
                        <Ionicons name="notifications-outline" size={28} color="black" />
                    </TouchableOpacity>
                </View>

                {/* Stories Section */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storyContainer}>
                    {stories.map((story) => (
                        <View key={story.id} style={styles.story}>
                            <Image source={{ uri: story.image }} style={styles.storyImage} resizeMethod="auto" />
                            <Text style={styles.storyUsername}>{story.username}</Text>
                        </View>
                    ))}
                </ScrollView>

                {/* Feed Section */}
                <FlatList
                    data={posts}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.post}>
                            <Text style={styles.postUsername}>{item.username}</Text>
                            <Image source={{ uri: item.image }} style={styles.postImage} resizeMode='cover' resizeMethod="auto" />
                            <View style={styles.postActions}>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Ionicons name="heart-outline" size={24} color="black" />
                                    <Text>{item.likes}</Text>
                                </View>
                                <Ionicons name="chatbubbles-outline" size={24} color="black" style={{ marginLeft: 10 }} />
                                <Ionicons name="ellipsis-horizontal-outline" size={24} color="black" style={{ marginLeft: 10 }} />
                            </View>
                        </View>
                    )}
                />
            </View >
        </>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },

    // Header
    header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 15 },
    title: { fontSize: 18, fontWeight: "bold", marginTop: 40, },

    // Stories
    storyContainer: { padding: 10 },
    story: { alignItems: "center", marginRight: 15 },
    storyImage: { width: 60, height: 60, borderRadius: 30, borderWidth: 2, borderColor: "red" },
    storyUsername: { fontSize: 12, marginTop: 5, marginBottom: 15 },

    // Posts
    post: { padding: 15 },
    postUsername: { fontWeight: "bold", fontSize: 16, marginBottom: 5 },
    postImage: { width: "100%", height: 600, borderRadius: 10 },
    postActions: { flexDirection: "row", alignItems: "center", marginTop: 10, justifyContent: 'space-around' },
});

export default HomeScreen;

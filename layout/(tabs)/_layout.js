import { Tabs } from 'expo-router'
import { StyleSheet } from 'react-native'
import React from 'react'

export default function _layout() {
    return (
        <Tabs screenOptions={{
            headerStyle: {

            },
            headerShadowVisible: false,
            tabBarStyle: {
                backgroundColor: "#fff"
            }
        }}>

            <Tabs.Screen name="home"
                options={{
                    headerTitle: "Biggie and Tupac",
                    headerTitleStyle: {
                        fontWeight: "bold",
                        fontSize: 20,
                        color: "#d10bd1",
                        fontStyle: "normal"
                    },
                    tabBarIcon: ({ focused }) => <Ionicons name={
                        focused ? "home" : "home-outline"} size={30} />
                }}
            />


        </Tabs>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
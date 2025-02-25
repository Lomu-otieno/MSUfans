import { View, Text, ImageBackground } from 'react-native'
import React from 'react'

const image = { uri: ('https://i.pinimg.com/236x/5f/29/58/5f295871bd80efb2bf6e64df173fe2af.jpg') }
//https://i.pinimg.com/474x/ad/44/7d/ad447d299112f75d48b502181ddb5371.jpg
export default function Match() {
    return (
        <ImageBackground source={image} resizeMode='cover' style={{ flex: 1 }}></ImageBackground>
    )
}
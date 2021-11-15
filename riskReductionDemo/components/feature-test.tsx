import React from 'react'
import { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Linking, Keyboard, Vibration } from 'react-native'
import * as Haptics from 'expo-haptics'
import { Audio } from 'expo-av'
import { SafeAreaView } from 'react-native-safe-area-context'
import { setStatusBarBackgroundColor } from 'expo-status-bar'

export default function FeatureTest() {
    async function playSound() {
        const sound = await Audio.Sound.createAsync(require('../assets/ding-dong.wav'));
        await sound.sound.playAsync();
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.button1} onPress={() => Vibration.vibrate()}>
                <Text style={{color: 'black'}}>Press for vibration!</Text>
            </TouchableOpacity> 
            <TouchableOpacity style={styles.button2} onPress={() => {playSound()}}>
                <Text style={{color: 'white'}}>Press for sound!</Text>
            </TouchableOpacity> 
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
      container: {
        flex: 1,
    },
    button1: {
        //position: 'absolute',
        width: '100%',
        height: '20%',
        justifyContent: 'center',
        //bottom: 0,
        backgroundColor: '#FFE433',
        padding: 10,
    },
    button2: {
        //position: 'absolute',
        width: '100%',
        height: '20%',
        justifyContent: 'center',
        //bottom: 0,
        backgroundColor: '#7a42f4',
        padding: 10,
    }
});
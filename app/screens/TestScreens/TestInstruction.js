import React, { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SpreadSheet, SafeAreaView, View, Text, Image, TouchableOpacity } from 'react-native';
import { styles, primary, width } from '../../style/style.js';
import { Close } from '../../component/Close.js'
import { ProgressBar } from '../../component/ProgressBar.js';

function TestInstruction({navigation}) {
    const closeIcon = () => {
        return (
            <View>
                {Close({navigation})}
            </View>
        );
    }

    const progress = () => {
        return (
            <View>
                {ProgressBar(0)}
            </View>
        );
    }

    const handleNextPage = async() => {
        navigation.navigate("TestVolume")
    }

    return (
        <SafeAreaView style={[styles.full_screen_content]}>
            {closeIcon()}
            {progress()}
            <View style={[styles.center, {marginHorizontal: 50}]}>
                <Text style={[styles.center_text]}>In this test, you will be hearing sound signal (tones) presented along with a noise (masker) to the test ear.</Text>
                <Text style={[styles.center_text]}>There will be two streams of sounds, Noise only and Noise + Tone.</Text>
                <Text style={[styles.center_text]}>You have to respond either "Yes" or "No" after both streams to indicate whether you heard the tone within the noise during the second stream.</Text>
                <TouchableOpacity style = {styles.button} onPress={handleNextPage}>
                    <Text style = {styles.text_in_button}> Next </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default TestInstruction;
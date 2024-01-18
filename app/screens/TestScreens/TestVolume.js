import React, { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SpreadSheet, SafeAreaView, View, Text, Image, TouchableOpacity } from 'react-native';
import { styles, primary, width } from '../../style/style.js';
import { Close } from '../../component/Close.js'
import { ProgressBar } from '../../component/ProgressBar.js';

function TestVolume({navigation}) {
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
        navigation.navigate("TestSide")
    }

    return (
        <SafeAreaView style={[styles.full_screen_content]}>
            {closeIcon()}
            {progress()}
            <View style={[styles.content, styles.center]}>
            <MaterialCommunityIcons name="volume-high" color={primary} size={270} />
            <View style={{marginHorizontal: 50}}>
            <Text style={[styles.text_in_button, {color: 'black', textAlign:'center'}]}>Set the volume of your device to maximum to ensure the accuracy of the test</Text>
                <TouchableOpacity style = {styles.button} onPress={handleNextPage}>
                    <Text style = {styles.text_in_button}> Yes, I'm ready </Text>
                </TouchableOpacity>
            </View>
        </View>
        </SafeAreaView>
    );
}

export default TestVolume;
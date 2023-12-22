import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity } from 'react-native';
import { styles, primary } from '../../element/style.js';
import { Close } from '../../element/Close.js';
import { ProgressBar } from '../../element/ProgressBar.js';
import { setFrequency, getFrequency } from '../../../modules/tone';

function TestType({navigation}) {
    const [progressValue, setProgressValue] = useState(1/12)

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
                {ProgressBar(progressValue)}
            </View>
        );
    }

    const setFullTest = () => {
        setFrequency([500, 1000, 2000, 4000, 8000])
        setTimeout(() => {
            navigation.navigate("NarrowbandTest", {division: 1/10, progressValue: progressValue})
        }, 500) 
    }

    const setShortTest = () => {
        setFrequency([1000, 4000])
        setTimeout(() => {
            navigation.navigate("NarrowbandTest", {division: 1/4, progressValue: progressValue})
        }, 500)
    }

    return (
        <SafeAreaView style={[styles.full_screen_content]}>
            {closeIcon()}
            {progress()}
            <View style={[styles.center, {marginHorizontal: 50}]}>
                <Text style={[styles.center_text]}>Choose the test type</Text>
                <TouchableOpacity style = {styles.button} onPress={setFullTest}>
                    <Text style = {styles.text_in_button}> Full Test </Text>
                </TouchableOpacity>
                <Text style={[styles.center_text]}>Takes around 15 minutes</Text>
                <TouchableOpacity style = {styles.button} onPress={setShortTest}>
                    <Text style = {styles.text_in_button}> Short Test </Text>
                </TouchableOpacity>
                <Text style={[styles.center_text,  {textAlign:'center'}]}>Takes around 5 minutes (recommended for a quick screening)</Text>
            </View>
        </SafeAreaView>
    );
}

export default TestType;
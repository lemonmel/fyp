import React, { useState, useContext } from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity } from 'react-native';
import { styles, primary } from '../../style/style.js';
import { Close } from '../../component/Close.js';
import { ProgressBar } from '../../component/ProgressBar.js';
// import { setFrequency, getFrequency } from '../../../modules/tone';
import { ToneContext } from '../../ToneModule/ToneContext.js';

function TestType({navigation}) {
    const toneModule = useContext(ToneContext);
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
        toneModule.setFrequency([500, 1000, 2000, 4000, 8000])
        setTimeout(() => {
            navigation.navigate("NarrowbandTest", {division: 1/10, progressValue: progressValue})
        }, 500) 
    }

    const setShortTest = () => {
        toneModule.setFrequency([1000, 4000])
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
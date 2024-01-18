import React, { useContext } from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity } from 'react-native';
import { styles, primary } from '../../style/style.js';
import { Close } from '../../component/Close.js';
import { ProgressBar } from '../../component/ProgressBar.js';
import { ToneContext } from '../../ToneModule/ToneContext.js';

function TestSide({navigation}) {
    const toneModule = useContext(ToneContext);

    const navigateNextPage = () => {
        navigation.navigate("TrialTest")
    }

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

    const setRightTest = () => {
        toneModule.setPan(1)
        navigateNextPage()
    }

    const setLeftTest = () => {
        toneModule.setPan(0)
        navigateNextPage()
    }

    return (
        <SafeAreaView style={[styles.full_screen_content]}>
            {closeIcon()}
            {progress()}
            <View style={[styles.center, {marginHorizontal: 50}]}>
                <Text style={[styles.center_text]}>Choose the side or ear to be tested.</Text>
                <TouchableOpacity style = {styles.button} onPress={setRightTest}>
                    <Text style = {styles.text_in_button}> Right Ear </Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.button} onPress={setLeftTest}>
                    <Text style = {styles.text_in_button}> Left Ear </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default TestSide;
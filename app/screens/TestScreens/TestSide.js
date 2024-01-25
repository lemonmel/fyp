import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity } from 'react-native';
import { styles, primary } from '../../element/style.js';
import { Close } from '../../element/Close.js';
import { ProgressBar } from '../../element/ProgressBar.js';
import { setPan, getPan } from '../../../modules/tone';

function TestSide({navigation}) {
    const navigateNextPage = () => {
        console.log(getPan())
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
        setPan(0)
        navigateNextPage()
    }

    const setLeftTest = () => {
        setPan(1)
        navigateNextPage()
    }

    return (
        <SafeAreaView style={[styles.full_screen_content]}>
            {closeIcon()}
            {progress()}
            <View style={[styles.center, {marginHorizontal: 50}]}>
                <Text style={[styles.center_text]}>Choose the side of ear to be tested.</Text>
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
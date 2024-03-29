import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { styles, width } from '../../element/style.js';
import { Close } from '../../element/Close.js';
import { ProgressBar } from '../../element/ProgressBar.js';
import { narrowbandPlay, narrowbandOnlyPlay, getThreshold, getFrequency, revertSettings, setThreshold, getNoiseThreshold } from '../../../modules/tone';

function TrialTest({navigation, route}) {
    const [text, setText]= useState('click Play to start')
    const [mark, setMark] = useState(0)
    const trialThreshold = [0.06, 0.06, 0, 0, 0.06]
    const [currentIndex, setCurrentIndex] = useState(0)
    const [audioPlayed, setAudioPlayed] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);

    useEffect(() => {
        playSound();
    }, [])

    const navigateNextPage = () => {
        revertSettings()
        navigation.navigate("TestType")
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
                {ProgressBar(1/12)}
            </View>
        );
    }

    const clickYes = () => {
        setIsPlaying(true)
        if(getThreshold() > 0){ //correct
            let temp = mark + 0.2
            setMark(temp)
            nextTrial()
        }else{
            resetTrial()
        }
    }

    const clickNo = () => {
        setIsPlaying(true)
        if(getThreshold() == 0){ //correct
            let temp = mark + 0.2
            setMark(temp)
            nextTrial()
        }else{
            resetTrial()
        }
    }

    const resetTrial = () => {
        setCurrentIndex(0)
        setMark(0)
        Alert.alert('Incorrect answer','The test will be reset to round 1')
        playSound()
    }

    const nextTrial = () => {
        if (currentIndex == 4) {
            Alert.alert("Trial Test Pass!","You can now start the test! Press 'Start Test'");
        } else {
            setCurrentIndex(prevCurrentIndex => prevCurrentIndex + 1);
            playSound();
        }
    }

    const playSound = () => {
        if (audioPlayed) { // Check if audio has been played
            setThreshold(trialThreshold[currentIndex]);
            console.log('threshold, side, frequency' + getThreshold() + ' ' + getNoiseThreshold() + ' '+ getFrequency());
            setText('Noise Playing');
            narrowbandOnlyPlay();
            setTimeout(() => {
                narrowbandPlay();
                setText('Noise + Tone Playing');
                setAudioPlayed(false); // Reset the flag after audio is played
                setTimeout(() => {
                    setText('');
                    setIsPlaying(false);
                }, 500);
            }, 1000);
        } else {
            setAudioPlayed(true); // Set the flag to true for the initial audio play
        }
    }

    return (
        <SafeAreaView style={[styles.full_screen_content]}>
            {closeIcon()}
            {progress()}
            <View style={[styles.center, {marginHorizontal: 40}]}>
                <Text style={[styles.heading, {textAlign:'center'}]}>Trial Test</Text>
                <Text style={[styles.center_text, {textAlign:'center'}]}>Let's do a trial run first. Listen carefully to the stream of noise and noise + tone and identify whether you could hear the tone during the second stream.</Text>
                <Text style={[styles.center_text, {textAlign:'center'}]}>There will be a total of 5 rounds of trials. Press 'Play' to start the audio for each round and then respond whether you heard the tone by pressing 'Yes' or 'No'.</Text>
                <Text style={[styles.center_text, {textAlign:'center'}]}>You can only start the actual test after correctly responding to all the trial rounds.</Text>
                <Text style={[styles.heading, {fontSize: width*0.07, textAlign:'center'}]}>Round {currentIndex+1}</Text>
                <Text style={[styles.heading, {fontSize: width*0.07, textAlign:'center'}]}>{text}</Text>
                <Text style={[styles.center_text, {textAlign:'center'}]}>Can you hear the tone?</Text>
                <View style = {[styles.button, {flexDirection: 'row'}]}>
                    <TouchableOpacity style = {[styles.button_in_button, {borderRightWidth: 2}]} onPress={clickYes} disabled={isPlaying}>
                        <Text style = {styles.text_in_button}> Yes </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.button_in_button} onPress={clickNo} disabled={isPlaying}>
                        <Text style = {styles.text_in_button}> No </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {[styles.button_in_button, {borderLeftWidth: 2}]} onPress={playSound}>
                        <Text style = {styles.text_in_button}> Play </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style = {styles.button} onPress={navigateNextPage} disabled={mark != 1}>
                    <Text style = {styles.text_in_button}> Start Test </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default TrialTest;
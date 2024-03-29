import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { styles, width } from '../../element/style.js';
import { Close } from '../../element/Close.js';
import { ProgressBar } from '../../element/ProgressBar.js';
import { addNarrowbandResult, getNarrowbandResult, narrowbandPlay, narrowbandOnlyPlay, increaseThreshold, decreaseThreshold, nextFreq, isAllTested, getThreshold, getFrequency, revertSettings, getNoiseThreshold, getDB } from '../../../modules/tone';

function NarrowbandTest({navigation, route}) {
    const [text, setText]= useState('Noise Playing');
    const [progressValue, setProgress]= useState(route.params.progressValue);
    const [yes, setYes]= useState(-1);
    const [result, setResult] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);

    const navigateNextPage = () => {
        console.log(getNarrowbandResult())
        navigation.navigate("NotchedNoiseTest", {division: route.params.division, progressValue: progressValue})
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
                {ProgressBar(progressValue)}
            </View>
        );
    }

    useEffect(() => {
        playSound()
    }, [])

    const increaseAmplitude = () => { //click no
        if(yes <= 0){
            setYes(0)
        }
        increaseThreshold()
        playSound()

    }

    const decreaseAmplitude = () => { //click yes
        let play = true
        if(yes >= 4){
            // record latest 3 dB -> find average -> save to database
            // if both side tested -> navigate ; else -> switch frequency
            const currentDB = getDB()
            setYes(-1)

            const lastThreeElements = result.slice(-2)
            const sum = lastThreeElements.reduce((acc, current) => acc + current, 0) + currentDB
            const average = sum / 3

            //record to narrowband class (push average)
            addNarrowbandResult(average)

            if(isAllTested()){
                nextFreq()
                navigateNextPage()
                play = false
            } else {
                console.log(result)
                console.log("The average is "+average+" dB")
                setResult([])
                nextFreq()
                setProgress(prevProgress => prevProgress + route.params.division)
                playSound()
            }
        }else if(yes >= 0){
            console.log("yes>=0")
            //record current dB
            const currentDB = getDB()
            setResult(prevResult => [...prevResult, currentDB])
            console.log(result)
            setYes(prevYes => prevYes + 1)
            console.log(yes)
        }
        if(yes<4){
            decreaseThreshold()
            console.log("clicked yes:"+getThreshold())
            playSound()
        }
    }

    const playSound = () => {
        console.log('threshold:'+getThreshold()+' , DB: '+getDB()+' ,frequency: '+getFrequency()+' ,noise: '+getNoiseThreshold())
        setIsPlaying(true)
        setText('Noise Playing')
        narrowbandOnlyPlay()
        setTimeout(() => {
            narrowbandPlay()
            setText('Noise + Tone Playing')
            setTimeout(() => {
                setIsPlaying(false)
            }, 500)
        }, 1000)
    }

    return (
        <SafeAreaView style={[styles.full_screen_content]}>
            {closeIcon()}
            {progress()}
            <View style={[styles.center, {marginHorizontal: 50}]}>
                <Text style={[styles.center_text, {textAlign:'center'}]}>Narrowband Test</Text>
                <Text style={[styles.heading, {fontSize: width*0.07, textAlign:'center'}]}>{text}</Text>
                <Text style={[styles.center_text, {textAlign:'center'}]}>Can you hear the tone?</Text>
                <Text style={[styles.center_text, {textAlign:'center'}]}>Click Unsure to repeat</Text>
                <View style = {[styles.button, {flexDirection: 'row'}]}>
                    <TouchableOpacity style = {[styles.button_in_button, {borderRightWidth: 2}]} onPress={decreaseAmplitude}  disabled={isPlaying}>
                        <Text style = {styles.text_in_button}> Yes </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.button_in_button} onPress={increaseAmplitude}  disabled={isPlaying}>
                        <Text style = {styles.text_in_button}> No </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {[styles.button_in_button, {borderLeftWidth: 2}]} onPress={playSound}  disabled={isPlaying}>
                        <Text style = {styles.text_in_button}> Unsure </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default NarrowbandTest;
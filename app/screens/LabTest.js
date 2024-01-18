import React, { useState } from 'react';
import { SafeAreaView, View, Text, Button, TextInput, Alert } from 'react-native';
import { styles, primary } from '../element/style'
import { stop, setFrequency, tonePlay, narrowbandOnlyPlay, nextFreq, notchedOnlyPlay, getFrequency, getThreshold, setNoiseThreshold, setThreshold, setNarrowbandOrder, setNotchedOrder, getNoiseThreshold, getOrder, setPan, getPan } from '../../modules/tone';

function LabTest() {
    const [frequency, setCurrentFrequency] = useState(getFrequency());
    const [volume, setVolume] = useState(getNoiseThreshold().toString());
    const [tone, setTone] = useState(getThreshold().toString());

    const playNarrowband = () => {
        setUpVolume()
        console.log("threshold: "+getNoiseThreshold()+" , order:"+getOrder())
        narrowbandOnlyPlay()
        Alert.alert('Noise played!', 'Narrowband noise playing in threshold: '+getNoiseThreshold());
    }

    const playNotched = () => {
        setUpVolume()
        notchedOnlyPlay()
        Alert.alert('Noise played!', 'Notched noise playing in threshold: '+getNoiseThreshold());
    }

    const setUpVolume = () => {
        if(parseFloat(volume) >= 1){
            setNoiseThreshold(1)
        }else{
            setNoiseThreshold(parseFloat(volume))
        }
    }

    const playTone = () => {
        if(parseFloat(tone) >= 1){
            setThreshold(1)
        }else{
            setThreshold(parseFloat(tone))
        }
        console.log("tone threshold: "+getThreshold())
        tonePlay()
        Alert.alert('Tone played!', 'Tone playing in '+getThreshold());
    }

    const switchFrequency = () => { //click no
        nextFreq()
        setCurrentFrequency(getFrequency())
    }

    const switchPan = () => {
        if(getPan() == 1){
            setPan(0)
        }else{
            setPan(1)
        }
    }

    const setFreq = () => {
        setFrequency([500, 1000, 2000, 4000, 8000])
    }

    return (
        <SafeAreaView style={[styles.full_screen_content]}>
            <View style={[styles.center, {marginHorizontal: 50}]}>
                <Text style={styles.center_text}>Current frequency: {frequency}</Text>
                <Button onPress={switchFrequency} title="Next Frequency" color={primary}/>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.center_text}> Current Tone Threshold:   </Text>
                    <TextInput
                        inputMode='decimal'
                        style = {{backgroundColor: 'whitesmoke', width: 40, borderBottomWidth: 1}}
                        value = {tone}
                        onChangeText={(text) => setTone(text)}
                    />
                </View>
                <View style={{flexDirection: 'row', marginBottom: 30}}>
                    <Text style={styles.center_text}> Current Noise Threshold:   </Text>
                    <TextInput
                        inputMode='decimal'
                        style = {{backgroundColor: 'whitesmoke', width: 40, borderBottomWidth: 1}}
                        value = {volume}
                        onChangeText={(text) => setVolume(text)}
                    />
                </View>
                <View style={{marginVertical: 10,flexDirection:'row'}}>
                    <Text style={{fontWeight: 'bold', fontSize: 25, textAlign:'center'}}>Tone    </Text>
                    <Button onPress={playTone} title="Play" color={primary}/>
                </View>
                <View style={{marginVertical: 10,flexDirection:'row'}}>
                    <Text style={{fontWeight: 'bold', fontSize: 25, textAlign:'center'}}>Narrowband    </Text>
                    <Button onPress={playNarrowband} title="Play" color={primary}/>
                </View>
                <View style={{marginVertical: 10,flexDirection:'row'}}>
                    <Text style={{fontWeight: 'bold', fontSize: 25, textAlign:'center'}}>Notched    </Text>
                    <Button onPress={playNotched} title="Play" color={primary}/>
                </View>
                <Text></Text>
                <Button onPress={switchPan} title="Change Pan" color={primary}/>
                <Button onPress={setFreq} title="Set Frequency" color={primary}/>
            </View>
        </SafeAreaView>
    );
}

export default LabTest;
import React, { useContext, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView, View, Text, Image, TouchableOpacity } from 'react-native';
import { styles, primary, light } from '../style/style.js';
import { ToneContext } from '../ToneModule/ToneContext.js';

function Test({navigation}) {
    const toneModule = useContext(ToneContext)

    const handleStart = async() => {
        toneModule.revertSettings();
        toneModule.resetResult();
        console.log(toneModule.getFrequency())
        navigation.navigate('TestInstruction');
    }

    const handleCredit = () =>{
        navigation.navigate('Credit');
    }

    return (
        <View style={[styles.content, styles.center]}>
            <TouchableOpacity style={{ position: 'absolute', top: 10, right: 20}} onPress={handleCredit}>
                <MaterialCommunityIcons name="information-outline" color={primary} size={30}/>
            </TouchableOpacity>
            <MaterialCommunityIcons name="earbuds-outline" color={primary} size={270} />
            <View style={{marginHorizontal: 50}}>
                <Text style={[styles.heading, {textAlign: 'center'}]}>Ever wondered how well you hear?</Text>
                <Text style={[styles.center_text, {textAlign:'center'}]}>Plug in an earphone to test your hearing.</Text>
                <TouchableOpacity style = {styles.button} onPress={handleStart}>
                    <Text style = {styles.text_in_button}> Get started </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Test;
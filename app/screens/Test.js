import React, { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView, View, Text, Image, TouchableOpacity } from 'react-native';
import { styles, primary, light } from '../element/style.js';
import { auth } from '../database/firebase.js';
import { revertSettings, resetResult } from '../../modules/tone';

function Test({navigation}) {
    const handleStart = async() => {
        revertSettings()
        resetResult()
        navigation.navigate('TestInstruction');
        // navigation.navigate('CompleteTest');
    }

    const handleCredit = () =>{
        navigation.navigate('Credit');
    }
    console.log(auth.currentUser.email);
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
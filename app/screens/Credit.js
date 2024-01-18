import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles, primary } from '../style/style.js';

function Credit({navigation}) {

    const handleBack = () => {
        navigation.navigate("Test")
    }

    return (
        <View style ={[styles.content, styles.center]}>
            <TouchableOpacity style={{ position: 'absolute', top: 20, left: 20}} onPress={handleBack}>
                <MaterialCommunityIcons name="arrow-left" color={primary} size={35}/>
            </TouchableOpacity>
            <Text style={[styles.heading, {textAlign: 'center'}]}>Credit</Text>
            <Image
                source = {require('../../assets/logo.png')}
                style = {{marginTop: 30, width:250, height:100, marginBottom: 20}}
            />
            <Text style={{marginHorizontal: 45, fontSize: 16, marginBottom: 20, textAlign: 'center'}}>This application was developed with the collaboration between Dr Kumar Seluakumaran from the Auditory lab, Dept of Physiology, Faculty of Medicine, University of Malaya and Faculty of Computer Science and Information Technology, University of Malaya.</Text>
            <Text style={{marginHorizontal: 40, fontSize: 15, textAlign: 'center'}}>Designed and written by Chin Chin Fang</Text>
            <Text style={[styles.small_text, {marginHorizontal: 45, marginBottom: 20, textAlign: 'center'}]}>Copyright @ 2023 Universiti Malaya</Text>
            <TouchableOpacity style = {styles.button} onPress={handleBack}>
                <Text style={styles.text_in_button}> Back to Home Page</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Credit;
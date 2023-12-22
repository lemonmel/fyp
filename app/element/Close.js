import React from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { styles, primary } from './style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export function Close({navigation}){
    const confirmQuit = () => {
        navigation.navigate("Index")
    }

    const handleQuit = () => {
        Alert.alert('Quit Testing', 'Stop testing? You would have to start over again next time if you have not complete.', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'Quit', onPress: () => confirmQuit()},
        ]);
    }

    console.log('close icon called!')
    return(
        <TouchableOpacity style={{alignSelf: 'flex-end', marginHorizontal: 10}} onPress={handleQuit}>
            <MaterialCommunityIcons name="close" color={primary} size={40} />
        </TouchableOpacity> 
    )
}

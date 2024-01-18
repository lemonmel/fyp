import React from 'react';
import { View, Text} from 'react-native';
import { styles, primary } from '../style/style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export function Loading(message, icon){
    console.log('hi')
    console.log(message, icon);
    return(
        // <View style={[styles.content, styles.center]}>
        //     <Text style={[styles.subtitle, {paddingBottom: 20}]}> {message} </Text>
        //     <MaterialCommunityIcons size = {50} color = {primary} name={icon}/>
        // </View>
        // <>
            <View style={[styles.content, styles.center]}>
                <Text style={[styles.subtitle, {paddingBottom: 20}]}> {message} </Text>
                <MaterialCommunityIcons size = {50} color = {primary} name={icon}/>
            </View>
        // </>
    )
}
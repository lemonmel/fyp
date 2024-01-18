import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { styles, primary } from '../../style/style.js';
import { Close } from '../../component/Close.js';
import { ProgressBar } from '../../component/ProgressBar.js';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function CompleteTest({navigation, route}) {

    const navigateNextPage = () => {
        navigation.navigate('Report', {id: route.params.id, page: "test"})
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
                {ProgressBar(1)}
            </View>
        );
    }

    return (
        <SafeAreaView style={[styles.full_screen_content]}>
            {closeIcon()}
            {progress()}
            <View style={[styles.content, styles.center]}>
                <MaterialCommunityIcons name="account-check-outline" color={primary} size={270} />
                <View style={{marginHorizontal: 50}}>
                    <Text style={[styles.heading, {textAlign: 'center'}]}>Completed</Text>
                    <Text style={[styles.center_text, {textAlign:'center'}]}>Tap to check your hearing result</Text>
                    <TouchableOpacity style = {styles.button} onPress={navigateNextPage}>
                        <Text style = {styles.text_in_button}> Check Report </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default CompleteTest;
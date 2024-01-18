import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, View, Text, TextInput, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { styles } from '../element/style.js';
import { auth } from '../database/firebase.js';
import { sendPasswordResetEmail } from 'firebase/auth';

function ForgotPassword({navigation}) {
    const [email, setEmail] = useState('')

    const handleReset = () => {
        //Error handling - Check required fields
        if (!email.trim()) {
            alert('Please Enter Email');
            return;
        }

        Alert.alert('Check again your email', 'Confirm send the reset password link to '+email+'?', [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {text: 'Yes', onPress: () => confirmReset()},
        ]);
    }

    const confirmReset = () => {
        sendPasswordResetEmail(auth, email)
        .then(() => {
          alert("Reset password email is sent! Check your mailbox.")
          navigation.navigate('Login')
        })
        .catch((error) => {
            if(error.code == 'auth/invalid-email'){
                alert('Email address is invalid. Please check your email.')
            }else if(error.code == 'auth/user-not-found'){
                alert('Could not found user with this email. Please check back your email.')
            }
            console.log(error.code)
        });
    }

    return (
        <KeyboardAvoidingView
            style = {[styles.content, styles.center]}
            behavior = {Platform.OS === 'ios' ? 'padding':'height'}
        >
            <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
                <View style ={[styles.content, styles.center]}>
                    <Text style = {{fontSize: 20}}>Forgot password?</Text>
                    <Image
                        source = {require('../../assets/logo.png')}
                        style = {{marginTop: 30, width:250, height:100, marginBottom: 20}}
                    />
                    <Text style={{marginHorizontal: 70, fontSize: 17, marginBottom: 20, textAlign: 'center'}}>We will send you a reset password link to your email</Text>
                    <TextInput
                        style = {[styles.input, {marginBottom: 20}]}
                        placeholder = 'Email'
                        value = {email}
                        onChangeText={text => setEmail(text)}
                    />
                    <TouchableOpacity style = {styles.button} onPress = {handleReset}>
                        <Text style={styles.text_in_button}> Reset Password </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => navigation.navigate('Login')}>
                        <Text style = {styles.small_text}>Back to Login Page</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

export default ForgotPassword;
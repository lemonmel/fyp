import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, View, Text, TextInput, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { styles } from '../element/style.js';
import { auth } from '../database/firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';

function Login({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if(user){
                navigation.navigate('Home');
            }
        })

        return unsubscribe;
    }, [])

    const handleLogin = () => {
        //Error handling - Check required fields
        if (!email.trim()) {
            alert('Please Enter Email');
            return;
        }
        if (!password.trim()) {
            alert('Please Enter Password');
            return;
        }

        //Process login
        signInWithEmailAndPassword(auth, email, password)
        .then(userCredentials =>{
            const user = userCredentials.user;
        })
        .catch(error => {
            if(error.code == 'auth/invalid-email'){
                alert('Email address is invalid')
            }else if(error.code == 'auth/wrong-password'){
                alert('Wrong email and password combination')
            }else if(error.code == 'auth/user-not-found'){
                alert('User not found. Register an account!')
            }else if(error.code == 'auth/network-request-failed'){
                alert('Bad network. Please try again')
            }
            console.log(error.code)

        })
    }

    return (
        <KeyboardAvoidingView
            style = {[styles.content, styles.center]}
            behavior = {Platform.OS === 'ios' ? 'padding':'height'}
        >
            <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
                <View style ={[styles.content, styles.center]}>
                    <Text style = {{fontSize: 20}}>Already have an account?</Text>
                    <Image
                        source = {require('../../assets/logo.png')}
                        style = {{marginTop: 30, width:250, height:100}}
                    />
                    <TextInput
                        style = {[styles.input, {marginBottom: 20}]}
                        placeholder = 'Email'
                        value = {email}
                        onChangeText={text => setEmail(text)}
                    />
                    <TextInput
                        style = {styles.input}
                        placeholder = 'Password'
                        value = {password}
                        onChangeText={text => setPassword(text)}
                        secureTextEntry
                    />
                    <TouchableOpacity onPress = {() => navigation.navigate('ForgotPassword')}>
                        <Text style = {[styles.small_text, {left: 80}]}> Forgot password? </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.button} onPress = {handleLogin}>
                        <Text style={styles.text_in_button}> Login </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => navigation.navigate('Register')}>
                        <Text style = {styles.small_text}>Don't have an account? Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

export default Login;
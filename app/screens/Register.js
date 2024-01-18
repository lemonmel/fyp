import React ,{ useEffect, useState }  from 'react';
import { KeyboardAvoidingView, ScrollView, View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Image } from 'react-native';
// import Slider from '@react-native-community/slider'
import { styles } from '../style/style.js';
import { auth, db } from '../database/firebase.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc, collection } from 'firebase/firestore';

function Register({navigation}) {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    const handleSignUp = async() => {
        //Error handling - Check required fields
        if (!username.trim()) {
            alert('Please Enter Username');
            return;
        }
        if (!email.trim()) {
            alert('Please Enter Email');
            return;
        }
        if (!password.trim()) {
            alert('Please Enter Password');
            return;
        }
        if (!password2.trim()) {
            alert('Please Enter Confirm Password');
            return;
        }
        if (password2 != password) {
            alert('Password Not Matched');
            return;
        }

        //Process SignUp
        createUserWithEmailAndPassword(auth, email, password)
        .then(userCredentials =>{
            const user = userCredentials.user;

            async function addUser(){
                const newUser = await setDoc(doc(db, "users", user.uid), {
                    username: username,
                    email: email
                });
                return newUser;
            }

            const docRef = addUser();
            navigation.navigate("Questionnaire", {username: username})

        })
        .catch(error => {
            if(error.code == 'auth/invalid-email'){
                alert('Email address is invalid')
            }else if(error.code == 'auth/weak-password'){
                alert('Password should be more than 6 characters')
            }else if(error.code == 'auth/email-already-in-use'){
                alert('This email is registered')
            }else{
                alert(error.code+':Register failed. Please try again')
            }
            console.log(error.code)

        })
    }

    return (
        <ScrollView style={styles.content}>
        <KeyboardAvoidingView
            style = {[styles.content, styles.center]}
            behavior={"position"}
        >
            <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
                <View style = {{alignItems:'center'}}>
                <Text style = {{fontSize: 20, marginTop:10}}>Register an account</Text>
                    <Image
                        source = {require('../../assets/logo.png')}
                        style = {{marginTop: 30, width:250, height:100, marginBottom: 20}}
                    />
                    <TextInput
                        style = {[styles.input, {marginBottom: 20}]}
                        placeholder = 'Username'
                        value = {username}
                        onChangeText={text => setUsername(text)}
                    />
                    <TextInput
                        style = {[styles.input, {marginBottom: 20}]}
                        placeholder = 'Email'
                        value = {email}
                        onChangeText={text => setEmail(text)}
                    />
                    <TextInput
                        style = {[styles.input, {marginBottom: 20}]}
                        placeholder = 'Password'
                        value = {password}
                        onChangeText={text => setPassword(text)}
                        secureTextEntry
                    />
                    <TextInput
                        style = {[styles.input, {marginBottom: 10}]}
                        placeholder = 'Confirm Password'
                        value = {password2}
                        onChangeText={text => setPassword2(text)}
                        secureTextEntry
                    />
                    <TouchableOpacity style = {styles.button} onPress = {handleSignUp}>
                        <Text style={styles.text_in_button}> Sign Up </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{alignItems: "center"}} onPress = {() => navigation.navigate('Login')}>
                        <Text style = {styles.small_text}>Already have an account? Login</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        </ScrollView>
    );
}
export default Register;
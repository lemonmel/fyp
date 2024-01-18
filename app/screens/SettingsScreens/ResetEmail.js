import React ,{ useState }  from 'react';
import { View, SafeAreaView, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
// import Slider from '@react-native-community/slider'
import { styles } from '../../style/style.js';
import { auth, db } from '../../database/firebase.js';
import { doc, updateDoc } from 'firebase/firestore';
import { updateEmail, EmailAuthProvider, reauthenticateWithCredential, } from 'firebase/auth';

function ResetEmail({navigation}) {
    const [newEmail, setNewEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleComplete = () => {
        //Error handling - Check required fields
        if (!newEmail.trim()) {
            alert('Please Enter New Email');
            return;
        }

        const user = auth.currentUser;
        const credential = EmailAuthProvider.credential(user.email, password);

        // Check old password matched
        reauthenticateWithCredential(user, credential).then(() => {
            // User re-authenticated.
            updateEmail(auth.currentUser, newEmail).then(async() => {
                console.log('Update Email!');
                alert('Email Update Successful!');
                await updateDoc(doc(db, "users", auth.currentUser.uid), {
                    email: newEmail,
                });
                navigation.goBack();
              }).catch((error) => {
                if(error.code == 'auth/invalid-email'){
                    alert('New email address is invalid')
                }else if(error.code == 'auth/email-already-in-use'){
                    alert('This email is already in use')
                }else{
                    alert('Register failed. Please try again')
                }
                console.log('Update failed:', error)
              });
          }).catch((error) => {
            alert('Password not matched!');
            console.log('Old Password:', error);
        });

    }

    return (
        <ScrollView style={styles.content}>
        <KeyboardAvoidingView 
        style = {[styles.content, styles.center]}
        behavior = {Platform.OS === 'ios' ? 'padding':'height'}
        >
            <View style = {{alignItems: 'center'}}>
                <Text style = {styles.question}>Old Email</Text>
                <TextInput
                    style = {styles.input}
                    value = {auth.currentUser.email}
                    editable = {false}
                />
                <Text style = {styles.question}>New Email</Text>
                <TextInput
                    placeholder='Email'
                    style = {styles.input}
                    value = {newEmail}
                    onChangeText={text => setNewEmail(text)}
                />
                <Text style = {styles.question}>Password</Text>
                <TextInput
                    placeholder='Enter Password to Confirm Changes'
                    style = {styles.input}
                    value = {password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                />
                <View>
                    <TouchableOpacity style = {styles.button} onPress = {handleComplete}>
                        <Text style={styles.text_in_button}> Update Email </Text>
                    </TouchableOpacity>
                </View>
            </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}
export default ResetEmail;
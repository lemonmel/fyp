import React ,{ useState }  from 'react';
import { View, ScrollView, KeyboardAvoidingView, Text, TextInput, TouchableOpacity} from 'react-native';
// import Slider from '@react-native-community/slider'
import { styles } from '../../style/style.js';
import { auth } from '../../database/firebase.js';
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential, } from 'firebase/auth';

function ResetPassword({navigation}) {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleResetPassword = () => {
        //Error handling - Check required fields
        if (!oldPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
            alert('Please Fill In All Fields!');
            return;
        }
        if(confirmPassword != newPassword){
            alert('New Password not matched!');
            return;
        }

        user = auth.currentUser;
        const credential = EmailAuthProvider.credential(user.email, oldPassword);

        // Check old password matched
        reauthenticateWithCredential(user, credential).then(() => {
            // User re-authenticated.
            updatePassword(user, newPassword).then(() => {
                console.log('Update Password!');
                alert('Password Update Successful!')
                navigation.goBack();
              }).catch((error) => {
                if(error.code == 'auth/weak-password'){
                    alert('New password must be at least 6 characters.');
                }else{
                    alert('Update password failed');
                }
                console.log('Update failed:', error);
            });
          }).catch((error) => {
            alert('Old password not matched!');
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
                    <Text style = {styles.question}>Old Password</Text>
                    <TextInput
                        placeholder = 'Password'
                        style = {styles.input}
                        value = {oldPassword}
                        onChangeText={text => setOldPassword(text)}
                        secureTextEntry
                    />
                    <Text style = {styles.question}>New Password</Text>
                    <TextInput
                        placeholder = 'Password'
                        style = {styles.input}
                        value = {newPassword}
                        onChangeText={text => setNewPassword(text)}
                        secureTextEntry
                    />
                    <Text style = {styles.question}>Confirm New Password</Text>
                    <TextInput
                        placeholder = 'Password'
                        style = {styles.input}
                        value = {confirmPassword}
                        onChangeText={text => setConfirmPassword(text)}
                        secureTextEntry
                    />
                    <View>
                        <TouchableOpacity style = {styles.button} onPress = {handleResetPassword}>
                            <Text style={styles.text_in_button}> Update Password </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}
export default ResetPassword;
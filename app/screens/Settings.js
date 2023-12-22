import React, {useEffect, useState} from 'react';
import { View, Alert, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Pressable, SafeAreaView, FlatList} from 'react-native';
import { styles, primary } from '../element/style.js';
import { auth, db } from '../database/firebase.js';
import { signOut, deleteUser, EmailAuthProvider, reauthenticateWithCredential, } from 'firebase/auth';
import { doc, deleteDoc, onSnapshot } from 'firebase/firestore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextInput } from 'react-native-gesture-handler';
import { Loading } from '../element/Loading.js';

function Profile({navigation}) {
    const [thisUser, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        getUser = () => {
            const docRef = onSnapshot(doc(db, "users", auth.currentUser.uid), (doc) => {
            setUser(doc.data())
        })}
        getUser();
    }, [])

    if (!thisUser) {
        return(
            <View style={[styles.content, styles.center]}>
                {Loading("Loading", "loading")}
            </View>
        );
    }

    console.log(thisUser)
    const handleSignOut= () => {
        signOut(auth).then(() => {
            navigation.navigate('Login');
          }).catch((error) => {
            console.log(error);
          });
    }

    const handleDeleteAccount = () => {
        const user = auth.currentUser;
        const credential = EmailAuthProvider.credential(user.email, password);
        const uid = user.uid;
        reauthenticateWithCredential(user, credential).then(async() => {
            // User re-authenticated.
            console.log('DeleteAccount', uid);
            await deleteDoc(doc(db, "users", uid));
            deleteUser(user).then(async() => {
                navigation.navigate('Login');
            }).catch((error) => {
                console.log(error);
            });
        }).catch((error) => {
            alert('Wrong password')
            console.log('Unable to reauthenticate:', error);
        });
    }

    const handleEditProfile = () => {
        navigation.navigate('Edit Profile', {
            user: thisUser,
        });
    }

    const handleResetEmail = () => {
        navigation.navigate('Reset Email');
    }

    const handleResetPassword = () => {
        navigation.navigate('Reset Password');
    }

    return (
        <View style={{
            flexDirection: 'column',
            flex: 1,
            backgroundColor: primary,
          }}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
            }}>
                <View style={{flex: 1, justifyContent: 'flex-end',}}>
                    <View style={styles.modal}>
                        <Text style={styles.text_in_modal}>Please Enter Your Password as Confirmation of Account Deletion</Text>
                        <TextInput
                            placeholder='Password'
                            style = {styles.input}
                            value = {password}
                            onChangeText={text => setPassword(text)}
                            secureTextEntry
                        />
                        <TouchableOpacity
                        style={[styles.button, {marginTop: 10}]}
                        onPress={handleDeleteAccount}>
                            <Text style={{color: 'white'}}>Confirm Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        style={[styles.button, {backgroundColor: 'whitesmoke', marginTop: 10}]}
                        onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal> 
            <View style={currentStyle.above}>
                <Text style={[styles.heading, {color: 'white'}]}> Hello! {thisUser.username} </Text>
                <Text style={[styles.subtitle, {color: 'white'}]}> Volume Settings:  {Math.round(thisUser.volume * 100)}</Text>
                <Text style={[styles.subtitle, {color: 'white'}]}> Listening Duration (Hr/ Week): {thisUser.frequency}</Text>
                <Text style={[styles.subtitle, {color: 'white'}]}> Environment: {thisUser.environment} </Text>
            </View>
            <ScrollView style={currentStyle.tab}>
                <TouchableOpacity style={styles.row} onPress={handleEditProfile}>
                    <Text style={styles.text_in_row}>Edit Profile</Text>
                    <MaterialCommunityIcons size = {30} color = {styles.row.borderBottomColor} name="chevron-right"/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.row} onPress={handleResetEmail}>
                    <Text style={styles.text_in_row}>Reset Email</Text>
                    <MaterialCommunityIcons size = {30} color = {styles.row.borderBottomColor} name="chevron-right"/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.row} onPress={handleResetPassword}>
                    <Text style={styles.text_in_row}>Reset Password</Text>
                    <MaterialCommunityIcons size = {30} color = {styles.row.borderBottomColor} name="chevron-right"/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.row} onPress={() => setModalVisible(true)}>
                    <Text style={[styles.text_in_row, {color:'red'}]}>Delete Account</Text>
                </TouchableOpacity>
                <View style = {{alignItems: 'center', marginBottom: 20}}>
                    <TouchableOpacity style={[styles.button]} onPress={handleSignOut}>
                        <Text style={styles.text_in_button}>Sign Out</Text>
                    </TouchableOpacity> 
                </View>
            </ScrollView>
        </View>
    );
}

const currentStyle = StyleSheet.create({
    above:{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.7,
    },

    tab:{
        backgroundColor: 'white', 
        flex: 0.3,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },

})
export default Profile;
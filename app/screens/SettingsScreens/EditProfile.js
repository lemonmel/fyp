import React ,{ useState, useEffect, useContext }  from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
// import Slider from '@react-native-community/slider'
import { styles, primary } from '../../style/style.js';
import { auth, db } from '../../database/firebase.js';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import SelectDropdown from 'react-native-select-dropdown'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from 'react-native-gesture-handler';
import Slider from '@react-native-community/slider';
import { ToneContext } from '../../ToneModule/ToneContext.js';
// import { narrowbandOnlyPlay, setNoiseThreshold } from '../../../modules/tone';
// import { tonePlay } from '../../../modules/tone';

function EditProfile({route, navigation}) {
    const [thisUser, setUser] = useState(route.params.user);
    const [volume, setVolume] = useState(parseFloat(thisUser.volume))
    const [frequency, setFrequency] = useState(thisUser.frequency)
    const [environment, setEnvironment] = useState(thisUser.environment)
    const [username, setUsername] = useState(thisUser.username)
    const [disable, setDisable] = useState(false)
    const toneModule = useContext(ToneContext)

    const handleComplete = async() => {
        //Error handling - Check required fields
        if (!username.trim()) {
            alert('Please Enter Username');
            return;
        }
        if (!frequency.trim()) {
            alert('Please Select a Frequency');
            return;
        }
        if (!environment.trim()) {
            alert('Please Select an Environment');
            return;
        }

        await updateDoc(doc(db, "users", auth.currentUser.uid), {
            username: username,
            volume: volume,
            frequency: frequency,
            environment: environment,
        }).catch((error) => {
            console.log('Profile update failed:', error)
        });
        navigation.navigate('Settings Main');
    }

    dropDownIcon = () => {
        return (
            <MaterialCommunityIcons size = {30} color = {styles.row.borderBottomColor} name="chevron-down"/>
        )
    }

    const handleAudioOutput = () => {
        console.log(volume)
        toneModule.setNoiseThreshold(volume*0.4)
        toneModule.narrowbandOnlyPlay()
        setDisable(true)
        setTimeout(() => {
            setDisable(false)
        }, 500)
    }

    environments = ['noisy', 'quiet']
    hours = ['below 7 hours', '8-10 hours', '11-13 hours', '14-17 hours', '18-24 hours', 'above 24 hours']
    return (
        <ScrollView style={styles.content}>
            <KeyboardAvoidingView
            style = {[styles.content, styles.center]}
            behavior = {Platform.OS === 'ios' ? 'padding':'height'}
            >
        {/* <SafeAreaView style = {[styles.content, {alignItems: 'center'}]}> */}
            <View style = {{marginHorizontal:60, alignItems: 'center'}}>
                <Text style = {styles.question}>Username</Text>
                <TextInput
                    style = {styles.input}
                    value = {username}
                    onChangeText={text => setUsername(text)}
                />
                <Text style = {styles.question}>How do you typically adjust the volume when using earphones?</Text>
                <Slider
                    style={{width: styles.input.width, height: styles.input.height}}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor={primary}
                    value={volume}
                    onValueChange={setVolume}
                    disabled={disable}
                    onSlidingComplete={handleAudioOutput}
                />
                <Text style = {styles.question}>On average, how many hours per week do you spend listening to audio content using earphones?</Text>
                <SelectDropdown
                    buttonStyle = {styles.input}
                    dropdownStyle = {{borderRadius: 10}}
                    data = {hours}
                    onSelect={(selectedItem, index)=> {setFrequency(selectedItem)}}
                    defaultButtonText='Select a frequency'
                    defaultValue={frequency}
                    renderDropdownIcon={dropDownIcon}
                    dropdownIconPosition='right'
                />
                <Text style = {styles.question}>Which environment you usually listen to?</Text>
                <SelectDropdown
                    buttonStyle = {styles.input}
                    dropdownStyle = {{borderRadius: 10}}
                    data = {environments}
                    onSelect={(selectedItem, index)=> {setEnvironment(selectedItem)}}
                    defaultButtonText='Select an environment'
                    defaultValue={environment}
                    renderDropdownIcon={dropDownIcon}
                    dropdownIconPosition='right'
                />
                <View>
                    <TouchableOpacity style = {[styles.button, {marginBottom: 20}]} onPress = {handleComplete}>
                        <Text style={styles.text_in_button}> Update Profile </Text>
                    </TouchableOpacity>
                </View>
            </View>
        {/* </SafeAreaView> */}
        </KeyboardAvoidingView>
        </ScrollView>
    );
}
export default EditProfile;
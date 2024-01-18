import React ,{ useState }  from 'react';
import {View, KeyboardAvoidingView, TouchableWithoutFeedback, Text, TouchableOpacity} from 'react-native';
// import Slider from '@react-native-community/slider'
import { styles, primary } from '../element/style.js';
import { auth, db } from '../database/firebase.js';
import { doc, setDoc } from 'firebase/firestore';
import SelectDropdown from 'react-native-select-dropdown';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';
import { narrowbandOnlyPlay, setNoiseThreshold } from '../../modules/tone';

function Questionnaire({route, navigation}) {
    const [volume, setVolume] = useState(0)
    const [frequency, setFrequency] = useState('')
    const [environment, setEnvironment] = useState('')
    const [disable, setDisable] = useState(false)

    // const {username}= route.params;

    const handleComplete = () => {
        //Error handling - Check required fields
        // if (!volume.trim()) {
        //     alert('Please Enter Last Name');
        //     return;
        // }
        if (!frequency.trim()) {
            alert('Please select listening hours per week');
            return;
        }
        if (!environment.trim()) {
            alert('Please select an environment');
            return;
        }

        const user = doc(db, "users", auth.currentUser.uid);
        setDoc(user, {
            frequency: frequency,
            volume: volume,
            environment: environment,},
            {merge: true});

        navigation.navigate('Home');
    }

    environments = ['noisy', 'quiet']
    hours = ['below 7 hours', '8-10 hours', '11-13 hours', '14-17 hours', '18-24 hours', 'above 24 hours']
    dropDownIcon = () => {
        return (
            <MaterialCommunityIcons size = {30} color = {styles.row.borderBottomColor} name="chevron-down"/>
        )
    }

    const handleAudioOutput = () => {
        console.log(volume)
        setNoiseThreshold(volume * 0.4)
        narrowbandOnlyPlay()
        setDisable(true)
        setTimeout(() => {
            setDisable(false)
        }, 500)
    }

    return (
        <KeyboardAvoidingView
            behavior = {Platform.OS == 'ios' ? 'padding': 'height'}
            style = {[styles.content, styles.center]}
        >
            <TouchableWithoutFeedback>
            <View style = {{alignItems:'center', marginHorizontal: 40}}>
            <Text style = {{fontSize: 20, textAlign: 'center'}}>Welcome! We would like to know your hearing habits</Text>
                <Text style = {styles.question}>How do you typically adjust the volume when using earphones/earbuds/headphones?</Text>
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
                <TouchableOpacity style = {styles.button} onPress = {handleComplete}>
                    <Text style={styles.text_in_button}> Done </Text>
                </TouchableOpacity>
            </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
export default Questionnaire;
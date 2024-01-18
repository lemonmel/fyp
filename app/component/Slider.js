import React ,{ useContext, useState }  from 'react';
import { styles, primary } from './style.js';
import Slider from '@react-native-community/slider'; 
import { ToneContext } from '../ToneModule/ToneContext.js';
// import { narrowbandOnlyPlay, setNoiseThreshold, getNoiseThreshold } from '../../modules/tone';

export function SliderBar() {
    const [volume, setVolume] = useState(1)
    const [disable, setDisable] = useState(false)
    const toneModule = useContext(ToneContext)

    const handleAudioOutput = () => {
        console.log(getNoiseThreshold())
        toneModule.setNoiseThreshold(volume * 0.4)
        toneModule.narrowbandOnlyPlay()
        setDisable(true)
        setTimeout(() => {
            setDisable(false)
        }, 500)
    }

    return (
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
    );
};

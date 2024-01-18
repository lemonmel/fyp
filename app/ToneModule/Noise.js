import { Audio } from 'expo-av';

export function Noise(){
    const noise = {
        threshold: 0.1,
        NBresults: [],
        NNresults: [],
        NBaudioPaths: {
        "R500": require('./audio/narrowband/R500NB.mp3'),
        "R1000": require('./audio/narrowband/R1000NB.mp3'),
        "R2000": require('./audio/narrowband/R2000NB.mp3'),
        "R4000": require('./audio/narrowband/R4000NB.mp3'),
        "R8000": require('./audio/narrowband/R8000NB.mp3'),
        "L500": require('./audio/narrowband/L500NB.mp3'),
        "L1000": require('./audio/narrowband/L1000NB.mp3'),
        "L2000": require('./audio/narrowband/L2000NB.mp3'),
        "L4000": require('./audio/narrowband/L4000NB.mp3'),
        "L8000": require('./audio/narrowband/L8000NB.mp3'),
        },
        NNaudioPaths: {
        "R500": require('./audio/notched/R500NN.mp3'),
        "R1000": require('./audio/notched/R1000NN.mp3'),
        "R2000": require('./audio/notched/R2000NN.mp3'),
        "R4000": require('./audio/notched/R4000NN.mp3'),
        "R8000": require('./audio/notched/R8000NN.mp3'),
        "L500": require('./audio/notched/L500NN.mp3'),
        "L1000": require('./audio/notched/L1000NN.mp3'),
        "L2000": require('./audio/notched/L2000NN.mp3'),
        "L4000": require('./audio/notched/L4000NN.mp3'),
        "L8000": require('./audio/notched/L8000NN.mp3'),
        },

        setThreshold: function(threshold){
            this.threshold = threshold;
        },

        setCurrentThreshold: function(freq){
            if(freq in [500, 1000, 4000]){
                this.setThreshold(0.1)
            }else if(freq == 2000){
                this.setThreshold(0.05)
            }else if(freq == 8000){
                this.setThreshold(0.04)
            }
        },

        getThreshold: function(){
            return this.threshold
        },

        pushResult: function(result, type){
            if(type === "narrowband"){
                this.NBresults.push(result)
            }else if(type === "notched"){
                this.NNresults.push(result)
            }
        },

        getResult: function(type){
            if(type === "narrowband"){
                return this.NBresults
            }else if(type === "notched"){
                return this.NNresults
            }
        },

        resetResult: function(){
            this.NBresults = [];
            this.NNresults = [];
            this.threshold = 0.1;
        },

        play: async function(frequency, pan, type){
            this.setCurrentThreshold(frequency)
            const filePath = pan+frequency;
            if(type === "narrowband"){
                audio = this.NBaudioPaths[filePath];
            }else if(type === "notched"){
                audio = this.NNaudioPaths[filePath];
            }
            const { sound } = await Audio.Sound.createAsync(audio);
            await sound.playAsync();
            await sound.setVolumeAsync(this.threshold);
        }
    }

    return noise;

}

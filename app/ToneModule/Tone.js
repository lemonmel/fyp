import { Audio } from 'expo-av';

export function Tone() {
  const tone = {
    duration: 0.4,
    sampleRate: 44100,
    testFreq: [1000, 4000],
    freqIndex: 0,
    threshold: 0.06,
    thresholdSet: [0.06, 0.06, 0.03, 0.09, 0.03],
    defaultDB: 80,
    db: 80,
    pan: "R",
    audioPaths: {
      "R500": require('./audio/tone/R500Tone.mp3'),
      "R1000": require('./audio/tone/R1000Tone.mp3'),
      "R2000": require('./audio/tone/R2000Tone.mp3'),
      "R4000": require('./audio/tone/R4000Tone.mp3'),
      "R8000": require('./audio/tone/R8000Tone.mp3'),
      "L500": require('./audio/tone/L500Tone.mp3'),
      "L1000": require('./audio/tone/L1000Tone.mp3'),
      "L2000": require('./audio/tone/L2000Tone.mp3'),
      "L4000": require('./audio/tone/L4000Tone.mp3'),
      "L8000": require('./audio/tone/L8000Tone.mp3'),
    },

    setPan: function(pan){
      console.log(pan)
      if(pan == 0){
        this.pan = "L"
      }else if(pan == 1){
        this.pan = "R"
      }else{
        console.log("setting side error")
      }
    },

    setFrequency: function(frequencies){
      this.testFreq = frequencies
    },

    setThreshold: function(threshold){
      this.threshold = threshold
    },

    getPan: function(){
      return this.pan;
    },

    getAllFrequency: function(){
      return this.testFreq;
    },

    getFrequency: function(){
      return this.testFreq[this.freqIndex];
    },

    getDB: function(){
      return this.db;
    },

    getThreshold: function(){
      return this.threshold;
    },

    isAllTested: function(){
      console.log(this.testFreq.length)
      console.log(this.freqIndex)
      return this.testFreq.length - 1 == this.freqIndex
    },

    play: async function () {
      const filePath = this.pan+this.testFreq[this.freqIndex];
      const { sound } = await Audio.Sound.createAsync(this.audioPaths[filePath]);
        await sound.playAsync();
        await sound.setVolumeAsync(this.threshold);
    },

    revertSettings: function(){
      this.thresholdSet = [0.06, 0.06, 0.03, 0.09, 0.03];
      this.freqIndex = 0;
      this.threshold = this.thresholdSet[0];
      this.defaultDB = 80;
      this.db = this.defaultDB;
    },

    nextSettings: function(){ //notched noise test setting
      this.freqIndex = 0;
      this.defaultDB = 65;
      this.thresholdSet = this.thresholdSet.map((val) => val / 5.62);
      this.threshold = this.thresholdSet[0];
    },

    decreaseThreshold: function(){
      this.threshold /= 1.78;
      this.db -= 5;
    },

    increaseThreshold: function(){
      this.threshold *= 1.26;
      this.db += 2;
    },

    nextFreq: function(){
      if (this.freqIndex < this.testFreq.length - 1) {
        this.freqIndex += 1;
        this.threshold = this.testFreq.length === 2 ? this.thresholdSet[3] : this.thresholdSet[this.freqIndex];
      } else {
        this.nextSettings();
      }
      this.db = this.defaultDB;
    },
  };

  return tone;
}

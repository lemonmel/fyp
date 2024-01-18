import { Tone } from './Tone'
import { Noise } from './Noise';

export function ToneModule() {
    const tone = Tone()
    const noise = Noise()

    const toneModule = {
        narrowbandOnlyPlay: function () {
            noise.play(this.getFrequency(), this.getPan(), "narrowband")
        },
        narrowbandPlay: function () {
            noise.play(this.getFrequency(), this.getPan(), "narrowband")
            tone.play()
        },
        notchedOnlyPlay: function() {
            noise.play(this.getFrequency(), this.getPan(), "notched")
        },
        notchedPlay: function() {
            noise.play(this.getFrequency(), this.getPan(), "notched")
            tone.play()
        },
        increaseThreshold: function(){
            tone.increaseThreshold();
        },
        decreaseThreshold: function(){
            tone.decreaseThreshold();
        },
        nextFreq: function(){
            tone.nextFreq();
        },
        getFrequency: function(){
            return tone.getFrequency();
        },
        getAllFrequency: function(){
            return tone.getAllFrequency();
        },
        getThreshold: function(){
            return tone.getThreshold();
        },
        getNoiseThreshold: function(){
            return noise.getThreshold();
        },
        getDB: function(){
            return tone.getDB();
        },
        getPan: function(){
            return tone.getPan();
        },
        setFrequency: function(frequencies){
            tone.setFrequency(frequencies);
        },
        setThreshold: function(threshold){
            tone.setThreshold(threshold)
        },
        setNoiseThreshold: function(threshold){
            noise.setThreshold(threshold);
        },
        setPan: function(pan){
            tone.setPan(pan)
        },
        isAllTested: function(){
            return tone.isAllTested();
        },
        revertSettings: function(){
            tone.revertSettings();
        },
        addNarrowbandResult: function(result){
            noise.pushResult(result, "narrowband")
        },
        addNotchedResult: function(result){
            noise.pushResult(result, "notched")
        },
        resetResult: function(){
            noise.resetResult()
        },
        getNarrowbandResult: function(){
            return noise.getResult("narrowband")
        },
        getNotchedResult: function(){
            return noise.getResult("notched")
        }
    }
    return toneModule;
}

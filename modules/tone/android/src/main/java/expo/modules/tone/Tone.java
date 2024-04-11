package expo.modules.tone;

import java.io.FileOutputStream;
import java.io.File;
import java.io.IOException;

import android.media.AudioFormat;
import android.media.AudioManager;
import android.media.AudioTrack;

public class Tone {
    private double duration = 0.4; // Duration of the sound in seconds
    private int sampleRate = 44100; // Sample rate (standard for most devices)
    private int[] testFreq = { 1000, 4000 };
    private int freqIndex = 0;
    private double threshold = 0.06;
    private int default_db = 80;
    private int db = 80;
    private int pan = 0; // 0 if left, 1 is right
    private double[] thresholdSet = { 0.06, 0.06, 0.03, 0.09, 0.03 }; // starting threshold for each frequency
    // private AudioTrack audio;

    public int getPan() {
        return pan;
    }

    public double getThreshold() {
        return threshold;
    }

    public int getDB() {
        return db;
    }

    public int getFrequency() {
        return testFreq[freqIndex];
    }

    public int[] getAllFrequency() {
        return testFreq;
    }

    public double getDuration() {
        return duration;
    }

    public void setPan(int pan) {
        this.pan = pan;
    }

    public void setFrequency(int[] frequency) {
        this.testFreq = frequency;
    }

    public void setThreshold(double threshold) {
        this.threshold = threshold;
    }

    public boolean isAllTested() {
        return (getFrequency() == testFreq[testFreq.length - 1]);
    }

    public void revertSettings() { // reseting threhold and frequency when user done/ quit testing
        thresholdSet[0] = 0.06;
        thresholdSet[1] = 0.06;
        thresholdSet[2] = 0.03;
        thresholdSet[3] = 0.09;
        thresholdSet[4] = 0.03;
        this.freqIndex = 0;
        this.threshold = thresholdSet[0];
        this.default_db = 80;
        this.db = this.default_db;
    }

    public void nextSettings() { // setting up for notched noise initial db
        this.freqIndex = 0;
        this.default_db = 65; 
        for (int i = 0; i < thresholdSet.length; i++) {
            this.thresholdSet[i] /= Math.pow(10.0, 15.0 / 20);
        }
        this.threshold = thresholdSet[0];
    }

    public void decreaseThreshold() {
        this.threshold /= Math.pow(10.0, 5.0 / 20);
        this.db -= 5;
    }

    public void increaseThreshold() {
        this.threshold *= Math.pow(10.0, 2.0 / 20);
        this.db += 2;
    }

    public void nextFreq() {
        // switch next frequency
        // if all frequency is tested, proceed to notched noise test
        if (freqIndex < testFreq.length - 1) {
            this.freqIndex += 1;
            // if short test, next frequency should be 4000Hz instead of 1000Hz
            if (testFreq.length == 2) {
                this.threshold = thresholdSet[3];
            } else {
                this.threshold = thresholdSet[freqIndex];
            }
        } else {
            nextSettings();
        }
        this.db = this.default_db;
    }

    public void play() {
        double sampleLength = duration * sampleRate;
        int numSamples = (int) sampleLength;
        double[] sample = new double[numSamples];
        byte[] generatedSound = new byte[2 * numSamples];

        for (int i = 0; i < numSamples; ++i) {
            sample[i] = Math.sin(2 * Math.PI * i / (sampleRate / testFreq[freqIndex]));
        }

        int idx = 0;
        for (double dVal : sample) {
            short val = (short) (dVal * 32767);
            generatedSound[idx++] = (byte) (val & 0x00ff);
            generatedSound[idx++] = (byte) ((val & 0xff00) >>> 8);
        }
        // Set up the audio track
        AudioTrack audioTrack = new AudioTrack(AudioManager.STREAM_MUSIC,
                sampleRate,
                AudioFormat.CHANNEL_OUT_MONO,
                AudioFormat.ENCODING_PCM_16BIT,
                generatedSound.length,
                AudioTrack.MODE_STATIC);

        // Write the generated sound to the audio track
        audioTrack.write(generatedSound, 0, generatedSound.length);

        if (pan == 0) {
            audioTrack.setStereoVolume(0, (float) threshold);
        } else {
            audioTrack.setStereoVolume((float) threshold, 0);
        }

        // this.audio = audioTrack;

        // Start playing the sound
        audioTrack.play();
    }

    // public void stop() {
    // if (this.audio != null) {
    // this.audio.stop();
    // }
    // }

}

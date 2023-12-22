package expo.modules.tone;

import android.media.AudioFormat;
import android.media.AudioManager;
import android.media.AudioTrack;
import uk.me.berndporr.iirj.*;

public class NotchedNoise extends Noise {

    public void play(int centerFreq, int pan) {
        double sampleLength = duration * sampleRate;
        int numSamples = (int) sampleLength;
        double[] sample = new double[numSamples];
        double[] noise = new double[numSamples];
        double[] noise2 = new double[numSamples];
        byte[] generatedSoundLow = new byte[2 * numSamples];
        byte[] generatedSoundHigh = new byte[2 * numSamples];
        double amplificationFactor = 1;

        // Butterworth filter library
        // Narrowband filtering - first narrowband
        double[] low_narrowband = new double[numSamples];
        double[] high_narrowband = new double[numSamples];
        double interval = centerFreq * (0.45 / 2 + 0.3);
        Butterworth nb_low = new Butterworth();
        nb_low.bandPass(order, sampleRate, centerFreq - interval, centerFreq * 0.45);

        for (int i = 0; i < numSamples; i++) {
            noise[i] = Math.random() * 2 - 1; // Generate white noise in the range [-1,1]
            low_narrowband[i] = nb_low.filter(noise[i]);
        }
        for (int i = 0; i < numSamples; i++) {
            low_narrowband[i] = nb_low.filter(low_narrowband[i]);
        }

        // Narrowband filtering - second narrowband
        Butterworth nb_high = new Butterworth();
        nb_high.bandPass(order, sampleRate, centerFreq + interval, centerFreq * 0.45);
        for (int i = 0; i < numSamples; i++) {
            noise2[i] = Math.random() * 2 - 1; // Generate white noise in the range [-1,1]
            high_narrowband[i] = nb_high.filter(noise2[i]);
        }
        for (int i = 0; i < numSamples; i++) {
            high_narrowband[i] = nb_high.filter(high_narrowband[i]);
        }

        // Combining two narrowband noise
        for (int i = 0; i < numSamples; i++) {
            sample[i] = low_narrowband[i] + high_narrowband[i];
        }

        int idx = 0;
        for (double dVal : sample) {
            short val = (short) (dVal * 32767);
            generatedSoundLow[idx++] = (byte) (val & 0x00ff);
            generatedSoundLow[idx++] = (byte) ((val & 0xff00) >>> 8);
        }

        // idx = 0;
        // for (double dVal : high_narrowband) {
        // short val = (short) (dVal * 32767);
        // generatedSoundHigh[idx++] = (byte) (val & 0x00ff);
        // generatedSoundHigh[idx++] = (byte) ((val & 0xff00) >>> 8);
        // }

        // Set up the audio track
        AudioTrack audioTrack = new AudioTrack(AudioManager.STREAM_MUSIC,
                sampleRate,
                AudioFormat.CHANNEL_OUT_MONO,
                AudioFormat.ENCODING_PCM_16BIT,
                generatedSoundLow.length,
                AudioTrack.MODE_STATIC);

        // Write the generated sound to the audio track
        audioTrack.write(generatedSoundLow, 0, generatedSoundLow.length);

        // AudioTrack audioTrackHigh = new AudioTrack(AudioManager.STREAM_MUSIC,
        // sampleRate,
        // AudioFormat.CHANNEL_OUT_MONO,
        // AudioFormat.ENCODING_PCM_16BIT,
        // generatedSoundHigh.length,
        // AudioTrack.MODE_STATIC);

        // // Write the generated sound to the audio track
        // audioTrackHigh.write(generatedSoundHigh, 0, generatedSoundHigh.length);

        if (pan == 0) {
            audioTrack.setStereoVolume(0, (float) threshold);
        } else {
            audioTrack.setStereoVolume((float) threshold, 0);
        }

        // this.audioLow = audioTrack;
        // this.audioHigh = audioTrackHigh;
        // Start playing the sound
        audioTrack.play();
        // this.audioHigh.play();
    }

    // public void stop() {
    // if (this.audioLow != null) {
    // this.audioLow.stop();
    // // this.audioHigh.stop();
    // }
    // }
}

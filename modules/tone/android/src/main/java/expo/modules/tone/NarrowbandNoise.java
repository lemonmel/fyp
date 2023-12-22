package expo.modules.tone;

import android.media.AudioFormat;
import android.media.AudioManager;
import android.media.AudioTrack;
import uk.me.berndporr.iirj.*;

public class NarrowbandNoise extends Noise {
    // private AudioTrack audio;

    public void play(int centerFreq, int pan) {
        double sampleLength = duration * sampleRate;
        int numSamples = (int) sampleLength;
        double[] sample = new double[numSamples];
        double[] noise = new double[numSamples];
        byte[] generatedSound = new byte[2 * numSamples];
        double amplificationFactor = 1;
        double bandwidth = 0.9 * centerFreq;

        // Butterworth filter library
        for (int i = 0; i < numSamples; ++i) {
            noise[i] = Math.random() * 2 - 1; // Generate white noise in the range [-1,1]
        }

        double[] narrowbandSignal = new double[numSamples];
        Butterworth bp = new Butterworth();
        bp.bandPass(order, sampleRate, centerFreq, bandwidth);
        for (int i = 0; i < numSamples; i++) {
            narrowbandSignal[i] = bp.filter(noise[i]);
        }

        // second butterworth filtering
        for (int i = 0; i < numSamples; i++) {
            sample[i] = bp.filter(narrowbandSignal[i]);
        }
        // for (int i = 0; i < numSamples; i++) {
        // sample[i] *= amplificationFactor;
        // }

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

//
//  TonePlayer.swift
//  Tone
//
//  Created by Chin Chin Fang on 23/12/2023.
//

import Foundation
import AVFoundation

class TonePlayer {
    private var duration: Double = 0.4
    private let sampleRate: Int = 44100
    private var testFreq: [Int] = [1000, 4000]
    private var freqIndex: Int = 0
    private var threshold: Float = 0.06
    private var defaultDB: Int = 80
    private var db: Int = 80
    private var pan: Int = 0 // 0 if left, 1 is right
    private var thresholdSet: [Float] = [0.06, 0.06, 0.03, 0.09, 0.03]
    private var audioPlayer: AVAudioPlayer?

    func getPan() -> Int {
        return pan
    }

    func getThreshold() -> Float {
        return threshold
    }

    func getDB() -> Int {
        return db
    }

    func getFrequency() -> Int {
        return testFreq[freqIndex]
    }

    func getAllFrequency() -> [Int] {
        return testFreq
    }

    func getDuration() -> Double {
        return duration
    }

    func setPan(_ pan: Int) {
        self.pan = pan
    }

    func setFrequency(_ frequency: [Int]) {
        self.testFreq = frequency
    }

    func setThreshold(_ threshold: Float) {
        self.threshold = threshold
    }

    func isAllTested() -> Bool {
        return getFrequency() == testFreq[testFreq.count - 1]
    }

    func revertSettings() {
        thresholdSet = [0.06, 0.06, 0.03, 0.09, 0.03]
        freqIndex = 0
        threshold = thresholdSet[0]
        defaultDB = 80
        db = defaultDB
    }

    func nextSettings() {
        freqIndex = 0
        defaultDB = 65
        thresholdSet = thresholdSet.map { $0 / 5.62 }
        threshold = thresholdSet[0]
    }

    func decreaseThreshold() {
        threshold /= 1.78
        db -= 5
    }

    func increaseThreshold() {
        threshold *= 1.26
        db += 2
    }

    func nextFreq() {
        if freqIndex < testFreq.count - 1 {
            freqIndex += 1
            if testFreq.count == 2 {
                threshold = thresholdSet[3]
            } else {
                threshold = thresholdSet[freqIndex]
            }
        } else {
            nextSettings()
        }
        db = defaultDB
    }

    func play() -> String{
        var audioPlayer: AVAudioPlayer?
        let sound=Bundle.main.url(forResource: "Boom Sound Effect", withExtension: "mp3")
        
        guard let url = sound else {
            return "Audio file not found"
        }
        
        // if FileManager.default.fileExists(atPath: url.path) {
        //     print("Audio file exists")
        // } else {
        //     print("Audio file not found")
        // }

         do {
            let session = AVAudioSession.sharedInstance()
            try! session.setCategory(AVAudioSession.Category.playback)
            
            audioPlayer = try AVAudioPlayer(contentsOf: url)
            guard let audioPlayer = audioPlayer else {
                return "Audio player problem"
            }

            audioPlayer.prepareToPlay()
            audioPlayer.play()
            return "Successfully playing"

        } catch {
            return "Error playing audio: \(error.localizedDescription)"
        }
//        let engine = AVAudioEngine()
//        let player = AVAudioPlayerNode()
//        let format = engine.outputNode.outputFormat(forBus: 0)
//
//        engine.attach(player)
//        engine.connect(player, to: engine.mainMixerNode, format: format)
//
//        engine.mainMixerNode.installTap(onBus: 0, bufferSize: 1024, format: format) { buffer, time in
//            // Your sound synthesis logic goes here
//            // Example: Generate a sine wave
//            let frequency: Float = 440.0
//            let theta = (2 * .pi * frequency) / Float(format.sampleRate)
//            let amplitude: Float = 0.5
//            for i in 0..<Int(buffer.frameLength) {
//                let sample = sin(theta * Float(i))
//                buffer.floatChannelData!.pointee[i] = sample * amplitude
//            }
//        }
//
//        do {
//            try engine.start()
//            player.play()
//        } catch {
//            print("Error starting the audio engine: \(error.localizedDescription)")
//        }
//        var audioPlayer = AVAudioPlayerNode()
//        var audioEngine = AVAudioEngine()
//        audioEngine.attach(audioPlayer)
//
//        guard let format = AVAudioFormat(commonFormat: AVAudioCommonFormat.pcmFormatFloat32, sampleRate: Double(sampleRate), channels: AVAudioChannelCount(1), interleaved: false) else {
//            return
//        }
       // Connect the audio engine to the audio player
//        audioEngine.connect(audioPlayer, to: audioEngine.outputNode, format: format)
//
//
//            let numberOfSamples = AVAudioFrameCount(duration * Double(sampleRate))
//            //create the appropriatly sized buffer
//            guard let buffer  = AVAudioPCMBuffer(pcmFormat: format, frameCapacity: numberOfSamples) else {
//                return
//            }
//            buffer.frameLength = numberOfSamples
//            //get a pointer to the buffer of floats
//            let channels = UnsafeBufferPointer(start: buffer.floatChannelData, count: Int(format.channelCount))
//            let floats = UnsafeMutableBufferPointer<Float>(start: channels[0], count: Int(numberOfSamples))
//            //calculate the angular frequency
//            let angularFrequency = Float(testFreq[freqIndex] * 2) * .pi
//            // Generate and store the sequential samples representing the sine wave of the tone
//            for i in 0 ..< Int(numberOfSamples) {
//                let waveComponent = sinf(Float(i) * angularFrequency / Float(sampleRate))
//                floats[i] = waveComponent
//            }
//            do {
//                try audioEngine.start()
//            }
//            catch{
//                print("Error: Engine start failure")
//                return
//            }


            // Play the pure tone represented by the buffer
//            audioPlayer.volume = threshold
//            audioPlayer.play()
        
    }

}


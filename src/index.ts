import "@babel/polyfill";


// Implementation 1
// const getImpulseBuffer = (audioContext: AudioContext, impulseUrl: string) =>
//     fetch(impulseUrl)
//         .then(response => response.arrayBuffer())
//         .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer));
//
// const getLiveAudio = (audioContext: AudioContext): Promise<MediaStreamAudioSourceNode> =>
//     navigator.mediaDevices
//         .getUserMedia({audio: true})
//         .then(stream => audioContext.createMediaStreamSource(stream));
//
// async function startReverb() {
//     const audioContext = new AudioContext();
//     const liveAudio = await getLiveAudio(audioContext);
//     const convolver = audioContext.createConvolver();
//
//     convolver.buffer = await getImpulseBuffer(audioContext, './test.mp3');
//     liveAudio.connect(convolver).connect(audioContext.destination);
// }
//
// // @ts-ignore
// document
//     .getElementById('audioButton')
//     .addEventListener('click', () => startReverb().then(() => console.log('started reverb')));


// Implementation 2
// const audioCtx = new AudioContext();
//
// // Loads module script via AudioWorklet.
// audioCtx.audioWorklet.addModule('reverb-processor.js')
//     .then(() => getLiveAudio(audioCtx))
//     .then((liveIn) => {
//         // After the resolution of module loading, an AudioWorkletNode can be constructed.
//         let reverbWorkletNode = new AudioWorkletNode(audioCtx, 'reverb-processor');
//
//         // AudioWorkletNode can be interoperable with other native AudioNodes.
//         liveIn.connect(reverbWorkletNode).connect(audioCtx.destination)
//
//     })
//     .catch(e => console.error(e));
//
// function getLiveAudio(audioCtx: AudioContext) {
//     return navigator.mediaDevices.getUserMedia({
//         audio: true
//     })
//         .then(stream => audioCtx.createMediaStreamSource(stream))
// }
//
// class ReverbProcessor extends AudioWorkletProcessor {
//
//     // Custom AudioParams can be defined with this static getter.
//     static get parameterDescriptors() {
//         return [{
//             name: 'decay',
//             defaultValue: 0.5
//         }]
//     }
//
//     constructor() {
//         // The super constructor call is required.
//         super();
//
//         this.delayInSamples = 22050;
//         this.delaySamples = [new Array(22050).fill(0), new Array(22050).fill(0)];
//         this.pointers = [0, 0]
//     }
//
//     process(inputs, outputs, parameters) {
//         // process function which takes some input samples and some output samples is very common in DSP
//         let input = inputs[0];
//         let output = outputs[0];
//         let decay = parameters.decay;
//
//         //iterate through left and right input channels
//         for (let channel = 0; channel < input.length; ++channel) {
//             let inputChannel = input[channel];
//             let outputChannel = output[channel];
//             let delaySamples = this.delaySamples[channel];
//
//             //iterate through samples of a channel
//             for (let i = 0; i < inputChannel.length; ++i) {
//                 let previousSample = delaySamples[this.pointers[channel] % this.delayInSamples];
//                 delaySamples[this.pointers[channel]] = inputChannel[i] + previousSample * decay[i];
//                 this.pointers[channel]++;
//                 if (this.pointers[channel] > this.delayInSamples) {
//                     this.pointers[channel] = 0
//                 }
//                 outputChannel[i] = inputChannel[i] + previousSample
//             }
//         }
//
//         //say to main thread that process function should be called again
//         return true;
//     }
// }

// registerProcessor('reverb-processor', ReverbProcessor);

// Freeverb
// class Freeverb extends CompositeAudioNode {
//     get wetGain () {
//         return this._wet.gain;
//     }
//     get dryGain () {
//         return this._dry.gain;
//     }
//     get roomSize() {
//         return mergeParams(this._combFilters.map(comb => comb.resonance))
//     }
//     get dampening() {
//         return mergeParams(this._combFilters.map(comb => comb.dampening))
//     }
//
//     constructor (audioCtx, options) {
//         super(audioCtx, options);
//         const {roomSize: resonance, dampening, wetGain, dryGain} = options;
//         const sampleRate = 44100
//         const COMB_FILTER_TUNINGS = [1557, 1617, 1491,  1422,  1277,  1356, 1188,  1116 ]
//             .map(delayPerSecond => delayPerSecond / sampleRate)
//         const ALLPASS_FREQUENCES = [225, 556, 441, 341]
//
//         this._wet = audioCtx.createGain()
//         this._wet.gain.setValueAtTime(wetGain, audioCtx.currentTime)
//         this._dry = audioCtx.createGain()
//         this._dry.gain.setValueAtTime(dryGain, audioCtx.currentTime)
//         this._merger = audioCtx.createChannelMerger(2)
//         this._splitter = audioCtx.createChannelSplitter(2)
//
//         this._combFilters = COMB_FILTER_TUNINGS
//             .map(delayTime => new LowpassCombFilter(audioCtx, {dampening, resonance, delayTime}))
//         const combLeft = this._combFilters.slice(0,1)
//         const combRight = this._combFilters.slice(7)
//         this._allPassFilters = ALLPASS_FREQUENCES
//             .map(frequency => new BiquadFilterNode(audioCtx, {type: 'allpass', frequency}))
//
//         this._input.connect(this._wet).connect(this._splitter)
//         this._input.connect(this._dry).connect(this._output)
//         combLeft.forEach(comb => {
//             this._splitter.connect(comb, 0).connect(this._merger, 0, 0)
//         })
//         combRight.forEach(comb => {
//             this._splitter.connect(comb, 1).connect(this._merger, 0, 1)
//         })
//
//         this._merger
//             .connect(this._allPassFilters[0])
//             .connect(this._allPassFilters[1])
//             .connect(this._allPassFilters[2])
//             .connect(this._allPassFilters[3])
//             .connect(this._output)
//     }
// }

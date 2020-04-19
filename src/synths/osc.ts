// function startOsc() {
//     // create web audio api context
//     const audioCtx = new AudioContext();
//
//     // create Oscillator node
//     const oscillator = audioCtx.createOscillator();
//
//     oscillator.type = 'triangle';
//     oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // value in hertz
//     oscillator.connect(audioCtx.destination);
//     oscillator.start();
// }

import * as Tone from "tone/tone";

function playSynthNote() {
    //create a synth and connect it to the master output (your speakers)
    const synth = new Tone.Synth().toMaster();

    //play a middle 'C' for the duration of an 8th note
    synth.triggerAttackRelease("C4", "8n");
}

function playLoop() {
    const synth = new Tone.Synth().toMaster();
    const loop = new Tone.Loop(time => synth.triggerAttackRelease("C2", "8n", time), "4n");

    loop
        .start("1m")
        .stop("4m");
}

function playSynth() {
    //pass in some initial values for the filter and filter envelope
    const synth = new Tone.Synth({
        "oscillator" : {
            "type" : "pwm",
            "modulationFrequency" : 0.2
        },
        "envelope" : {
            "attack" : 0.02,
            "decay" : 0.1,
            "sustain" : 0.2,
            "release" : 0.1,
        }
    }).toMaster();

    //start the note "D3" one second from now
    synth.triggerAttack("D3", "+1");
}

document
    .getElementById('playNote')
    .addEventListener('click', () => {
        Tone
            .start()
            .then( () => {
                playSynthNote();
            });

    });

document
    .getElementById('playSynth')
    .addEventListener('click', () => {
        Tone
            .start()
            .then( () => {
                playSynth();
            });

    });

document
    .getElementById('playLoop')
    .addEventListener('click', () => {
        Tone.Transport.start();
        playLoop();
    });

import * as Tone from "tone/tone";

const playDistSound = () => {
    const reverb = new Tone.Freeverb().toMaster();
    const synth = new Tone.Synth().connect(reverb);
    synth.triggerAttackRelease("C4", "8n");
};

const REVERB_UI = document.getElementById('reverb');
REVERB_UI.addEventListener('click', () => playDistSound());

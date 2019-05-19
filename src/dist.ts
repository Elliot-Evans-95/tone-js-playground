import * as Tone from "tone/tone";

const playDistSound = () => {
    const dist = new Tone.Distortion().toMaster();
    // dist.wet.value = 0.9;
    // dist.wet.rampTo(1, 1);

    const synth = new Tone.Synth().connect(dist);
    synth.triggerAttackRelease("C4", "8n");
};

const DIST_UI = document.getElementById('dist');
// const DIST_WET_UI = document.getElementById('dist-wet');

DIST_UI.addEventListener('click', () => playDistSound());

import * as Tone from "tone/tone";

const osc = new Tone.OmniOscillator();

const play = () => {
    osc.frequency.value = "C4";
    const env = new Tone.AmplitudeEnvelope();
    osc.connect(env);
    env.toMaster();
    osc.start();
    env.triggerAttack();
};

const toggleButton = () => {
    document.getElementById('play').hidden =! document.getElementById('play').hidden;
    document.getElementById('stop').hidden =! document.getElementById('stop').hidden;
};

document
    .getElementById('play')
    .addEventListener('click', () => {
        Tone
            .start()
            .then( () => {
                play();
                toggleButton();
            });
    });

document
    .getElementById('stop')
    .addEventListener('click', () => {
        osc.stop();
        toggleButton();
    });

document
    .getElementById("type")
    .addEventListener("change", (e) => osc.baseType = e.target.value, false);

document
    .getElementById("type")
    .addEventListener("change", (e) => osc.frequency.value = e.target.value, false);

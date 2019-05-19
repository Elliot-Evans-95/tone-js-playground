import * as Tone from "tone/tone";

const playMetronome = () => {
    Tone.Transport.start();

    const metronome = new Tone.Player("https://tonejs.github.io/examples/audio/casio/C2.mp3").toMaster();
    const loop = new Tone.Loop(time => metronome.start(time), "4n");

    loop
        .start("1m")
        .stop("4m");
};

const metronome_ui = document.getElementById('metronome');

metronome_ui.addEventListener('click', () => playMetronome(), false);

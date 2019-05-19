import * as Tone from "tone/tone";

// DEFAULT
Tone.Transport.bpm.value = 128;

let BPM = Tone.Transport.bpm.value;
const BPM_UI = document.getElementById('bpm');

BPM_UI.addEventListener('change', (e) => BPM = e.target.value);

(BPM_UI as HTMLInputElement).value = BPM;

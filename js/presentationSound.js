// Inicializa Tone.js FMSynth con configuración personalizada
const fmSynth = new Tone.FMSynth({
    harmonicity: 1,
    modulationIndex: 10,
    oscillator: { type: 'sine' },
    envelope: { attack: 0.2, decay: 0.3, sustain: 0.4, release: 0.5 },
    modulation: { type: 'sine' },
    modulationEnvelope: { attack: 0.2, decay: 0.3, sustain: 0.4, release: 0.5 }
}).toDestination();

const reverb = new Tone.Reverb({ decay: 2.5, wet: 0.3 }).toDestination();
const delay = new Tone.FeedbackDelay({ delayTime: "8n", feedback: 0.2, wet: 0.2 }).toDestination();
const volume = new Tone.Volume(-12).toDestination();

fmSynth.connect(reverb);
reverb.connect(delay);
delay.connect(volume);

function getFrequencyFromX(xPosition) {
    const screenWidth = window.innerWidth;
    const noteIndex = Math.floor((xPosition / screenWidth) * 12);
    const middleCFrequency = 261.63;
    return middleCFrequency * Math.pow(2, noteIndex / 12);
}

function getHarmonicityFromY(yPosition) {
    const screenHeight = window.innerHeight;
    return (yPosition / screenHeight) * 8;
}

function startSound(x, y) {
    const frequency = getFrequencyFromX(x);
    const harmonicity = getHarmonicityFromY(y);
    fmSynth.harmonicity.value = harmonicity;
    fmSynth.triggerAttack(frequency, Tone.now());
}

function updateSound(x, y) {
    const frequency = getFrequencyFromX(x);
    const harmonicity = getHarmonicityFromY(y);
    fmSynth.harmonicity.value = harmonicity;
    fmSynth.setNote(frequency, Tone.now());
}

function stopSound() {
    fmSynth.triggerRelease(Tone.now());
}

window.addEventListener('mousedown', (event) => {
    startSound(event.clientX, event.clientY);
    window.addEventListener('mousemove', moveHandler);
});

window.addEventListener('mouseup', () => {
    stopSound();
    window.removeEventListener('mousemove', moveHandler);
});

function moveHandler(event) {
    updateSound(event.clientX, event.clientY);
}

window.addEventListener('touchstart', (event) => {
    event.preventDefault();
    const touch = event.touches[0];
    startSound(touch.clientX, touch.clientY);
    window.addEventListener('touchmove', touchMoveHandler);
});

window.addEventListener('touchend', () => {
    stopSound();
    window.removeEventListener('touchmove', touchMoveHandler);
});

function touchMoveHandler(event) {
    event.preventDefault();
    const touch = event.touches[0];
    updateSound(touch.clientX, touch.clientY);
}

// Activar AudioContext en la primera interacción
['click', 'touchstart', 'keydown'].forEach(event => {
    document.addEventListener(event, async () => {
        if (Tone.context.state !== 'running') {
            await Tone.start();
            console.log("AudioContext started");
        }
    }, { once: true });
});

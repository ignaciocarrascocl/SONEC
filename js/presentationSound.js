// Initialize Tone.js FMSynth with custom settings for smoother sound
const fmSynth = new Tone.FMSynth({
    harmonicity: 1, // Initial harmonicity, this will be interactive
    modulationIndex: 10,
    oscillator: {
        type: 'sine'
    },
    envelope: {
        attack: 0.2, // Softer attack
        decay: 0.3, // Slightly longer decay
        sustain: 0.4, // Lower sustain for a balanced sound
        release: 0.5 // Longer release for a gentle fade-out
    },
    modulation: {
        type: 'sine'
    },
    modulationEnvelope: {
        attack: 0.2,
        decay: 0.3,
        sustain: 0.4,
        release: 0.5
    }
}).toDestination();

// Static reverb and delay configuration
const reverb = new Tone.Reverb({
    decay: 2.5, // Slightly longer decay time for a richer effect
    wet: 0.3 // Subtle reverb effect
}).toDestination();

const delay = new Tone.FeedbackDelay({
    delayTime: "8n",
    feedback: 0.2, // Low feedback to prevent excessive buildup
    wet: 0.2 // Subtle delay effect
}).toDestination();

const volume = new Tone.Volume(-12).toDestination(); // Lower volume by 12dB

// Connect effects
fmSynth.connect(reverb);
reverb.connect(delay);
delay.connect(volume);

// Map mouse position to frequency (horizontal axis)
function getFrequencyFromMouseX(xPosition) {
    const screenWidth = window.innerWidth;
    const noteIndex = Math.floor((xPosition / screenWidth) * 12); // 12 notes in an octave
    const middleCFrequency = 261.63; // Middle C frequency
    return middleCFrequency * Math.pow(2, noteIndex / 12);
}

// Map mouse position to harmonicity (vertical axis)
function getHarmonicityFromMouseY(yPosition) {
    const screenHeight = window.innerHeight;
    return (yPosition / screenHeight) * 8; // Map vertical position to a range of harmonicity values
}

// Handle mouse down event to start playing note
window.addEventListener('mousedown', function(event) {
    const frequency = getFrequencyFromMouseX(event.clientX);
    const harmonicity = getHarmonicityFromMouseY(event.clientY);
    fmSynth.harmonicity.value = harmonicity; // Set harmonicity based on mouse position
    fmSynth.triggerAttack(frequency, Tone.now());

    // Handle mouse move event for smooth tone transition
    window.addEventListener('mousemove', handleMouseMove);
});

// Handle mouse move event for smooth tone transition
function handleMouseMove(event) {
    const frequency = getFrequencyFromMouseX(event.clientX);
    const harmonicity = getHarmonicityFromMouseY(event.clientY);
    fmSynth.harmonicity.value = harmonicity;
    fmSynth.setNote(frequency, Tone.now()); // Smoothly transition to the new frequency
}

// Handle mouse up event to release note
window.addEventListener('mouseup', function() {
    fmSynth.triggerRelease(Tone.now());
    window.removeEventListener('mousemove', handleMouseMove); // Stop listening to mouse move events when the mouse is released
});

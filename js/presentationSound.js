// Initialize variables for audio context and components
let audioContext;
let sineOscillator;
let triangleOscillator;
let lfoOscillator;
let lfoGain;
let lowPassFilter;
let masterGain;
let inactivityTimeout;

// Utility function to map a range of values to another
function mapRange(value, inMin, inMax, outMin, outMax) {
    return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

// Ensure the audio context is set up and start audio components
function initializeAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Create oscillators
        sineOscillator = audioContext.createOscillator();
        sineOscillator.type = 'sine';
        sineOscillator.frequency.setValueAtTime(160, audioContext.currentTime); // Lower tone

        triangleOscillator = audioContext.createOscillator();
        triangleOscillator.type = 'triangle';
        triangleOscillator.frequency.setValueAtTime(160, audioContext.currentTime); // Consistent with sine oscillator

        lfoOscillator = audioContext.createOscillator();
        lfoOscillator.type = 'sine';
        lfoOscillator.frequency.setValueAtTime(0.5, audioContext.currentTime); // Slower LFO for subtle modulation

        // Setup LFO gain
        lfoGain = audioContext.createGain();
        lfoGain.gain.setValueAtTime(30, audioContext.currentTime); // More aggressive modulation depth

        lfoOscillator.connect(lfoGain);
        lfoGain.connect(sineOscillator.frequency);

        // Create and configure a low-pass filter
        lowPassFilter = audioContext.createBiquadFilter();
        lowPassFilter.type = 'lowpass';
        lowPassFilter.frequency.setValueAtTime(500, audioContext.currentTime); // More aggressive filtering
        lowPassFilter.Q.value = 10; // Sharper filter slope

        // Setup master gain for overall volume control
        masterGain = audioContext.createGain();
        masterGain.gain.setValueAtTime(0.05, audioContext.currentTime); // Start with even lower volume

        // Connect components
        sineOscillator.connect(lowPassFilter);
        triangleOscillator.connect(lowPassFilter);
        lowPassFilter.connect(masterGain);
        masterGain.connect(audioContext.destination);

        // Start oscillators
        sineOscillator.start();
        triangleOscillator.start();
        lfoOscillator.start();
    }
}

// Function to adjust volume with exponential ramp for smoother fade in/out
function adjustVolume(volumeLevel) {
    const currentTime = audioContext.currentTime;
    const fadeTime = 0.3; // Faster fade time for a quicker response
    masterGain.gain.cancelScheduledValues(currentTime);
    masterGain.gain.exponentialRampToValueAtTime(volumeLevel, currentTime + fadeTime);
}

// Handle mouse movement to control audio properties
document.addEventListener('mousemove', function(event) {
    clearTimeout(inactivityTimeout);
    initializeAudioContext();
    adjustVolume(0.8); // Increased volume when mouse moves for better engagement

    // Map mouse position to LFO frequency and filter frequency
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const lfoFrequency = mapRange(mouseX, 0, viewportWidth, 0.1, 5);
    const filterFrequency = mapRange(mouseY, 0, viewportHeight, 100, 1000); // Wider range for more dramatic effect

    lfoOscillator.frequency.setValueAtTime(lfoFrequency, audioContext.currentTime);
    lowPassFilter.frequency.setValueAtTime(filterFrequency, audioContext.currentTime);

    // Set timeout to fade out sound after mouse inactivity
    inactivityTimeout = setTimeout(() => {
        adjustVolume(0.05); // Reduced volume to fade out quicker
    }, 1000); // Shorter timeout before fading out
});

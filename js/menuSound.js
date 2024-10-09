// menuSound.js
// Interaction Sounds
const interactionSoundSrc = "./audio/UISounds/ui-click-43196.mp3";
const interactionSoundHowl = new Howl({ src: [interactionSoundSrc] });
function interactionSound() {
  interactionSoundHowl.play();
}

// Modal Activation Sound
const modalOpenSoundSrc = "./audio/UISounds/sfx-modal.mp3";
const modalOpenHowl = new Howl({ src: [modalOpenSoundSrc] });
function modalOpenSound() {
  modalOpenHowl.play();
}

// Bell Sound for Like Button
const bellSoundSrc = "./audio/UISounds/bell.mp3";
const bellSoundHowl = new Howl({ src: [bellSoundSrc] });
function playBellSound() {
  bellSoundHowl.play();
}

// Pop Open Sound
const popOpenSoundSrc = "./audio/UISounds/ui-pop-up-6-197894.mp3";
const popOpenHowl = new Howl({ src: [popOpenSoundSrc] });
function popOpenSound() {
  popOpenHowl.play();
}

// Pop Close Sound
const popCloseSoundSrc = "./audio/UISounds/bloop-4-186533.mp3";
const popCloseHowl = new Howl({ src: [popCloseSoundSrc] });
function popCloseSound() {
  popCloseHowl.play();
}

// Link Click Sound
const linkClickSoundSrc = "./audio/UISounds/ui-click-43196.mp3";
const linkClickHowl = new Howl({ src: [linkClickSoundSrc] });
function linkClickSound() {
  linkClickHowl.play();
}

// Back Sound
const backSoundSrc = "./audio/UISounds/bloop-4-186533.mp3";
const backHowl = new Howl({ src: [backSoundSrc] });
function backSound() {
  backHowl.play();
}

// Page Load Sound
const pageLoadSounds = {
  soundType1: "audio/UISounds/ui-pop-up-4-197890.mp3",
  soundType2: "audio/UISounds/sfx-view3.mp3",
  soundType3: "audio/UISounds/sfx-view4.mp3"
};

// Function to play the page load sound based on body class
function playPageLoadSound() {
  const bodyClassList = document.body.classList;

  // Find the matching class that corresponds to a sound
  const soundType = Object.keys(pageLoadSounds).find(className => bodyClassList.contains(className));

  if (soundType) {
    // Load and play the corresponding sound
    const pageLoadHowl = new Howl({ src: [pageLoadSounds[soundType]] });
    pageLoadHowl.play();
  }
}

// Keyboard Sounds
const keyboardSoundSrc = [
  "./audio/synthSamples/90s-game-ui-5-185098.mp3",
  "./audio/synthSamples/glass-knock-1-189096.mp3",
  "./audio/synthSamples/short-punchy-sine-wave-ding-17-e-211758.mp3",
  "./audio/synthSamples/correct-2-46134.mp3"
];
let currentSoundIndex = 0;
let keyboardSound = new Howl({ src: [keyboardSoundSrc[currentSoundIndex]] });

const loadSound = (index) => {
  keyboardSound.unload();
  keyboardSound = new Howl({ src: [keyboardSoundSrc[index]] });
};

const cycleSoundButton = document.getElementById("cycleSound");
if (cycleSoundButton) {
  cycleSoundButton.addEventListener("click", () => {
    currentSoundIndex = (currentSoundIndex + 1) % keyboardSoundSrc.length;
    loadSound(currentSoundIndex);
  });
}

const pitches = {
  key1: Math.pow(2, 0 / 12), // C
  key2: Math.pow(2, 1 / 12), // C#
  key3: Math.pow(2, 2 / 12), // D
  key4: Math.pow(2, 3 / 12), // D#
  key5: Math.pow(2, 4 / 12), // E
  key6: Math.pow(2, 5 / 12), // F
  key7: Math.pow(2, 6 / 12), // F#
  key8: Math.pow(2, 7 / 12), // G
  key9: Math.pow(2, 8 / 12), // G#
  key10: Math.pow(2, 9 / 12), // A
  key11: Math.pow(2, 10 / 12), // A#
  key12: Math.pow(2, 11 / 12), // B
};

const playSound = (pitch) => {
  keyboardSound.rate(pitch);
  keyboardSound.play();
};

document.querySelectorAll(".key").forEach((key) => {
  key.addEventListener("click", () => {
    const pitch = pitches[key.getAttribute("data-sound")];
    playSound(pitch);
  });
});

// FX Sounds
let noteNumber = parseInt(window.localStorage.getItem("localNumber") || "0", 10);
const fxSoundSrc = "./audio/synthSamples/glass-knock-1-189096.mp3";
const fxSoundHowl = new Howl({ src: [fxSoundSrc] });

const updateNote = () => {
  noteNumber = (noteNumber + 1) % 12;
  window.localStorage.setItem("localNumber", noteNumber);
};

const fxSound = () => {
  updateNote();
  const pitch = Math.pow(2, noteNumber / 12); // Calculate pitch based on noteNumber
  fxSoundHowl.rate(pitch);
  fxSoundHowl.play();
};

// Event Handlers
const attachHoverEvents = () => {
  // Select all elements with the classes ball-item, category-item, and lab-item
  const hoverElements = document.querySelectorAll(".ball-item, .category-item, .lab-item");
  
  // Loop through each element and attach the hover event
  hoverElements.forEach((element) => {
    element.addEventListener("mouseenter", fxSound);
  });
};

const attachClickEvents = () => {
  const links = document.getElementsByTagName("a");
  for (let i = 0, il = links.length; i < il; i++) {
    links[i].onclick = clickHandler;
  }
};

function clickHandler(event) {
  linkClickSound(); // Play sound on link click
  event.preventDefault();
  const travelTo = this.getAttribute("href");
  const animOut = document.getElementsByClassName("animateOut");
  for (let i = 0; i < animOut.length; i++) {
    animOut[i].classList.add("out");
  }
  setTimeout(() => {
    window.location.href = travelTo;
  }, 500);
}

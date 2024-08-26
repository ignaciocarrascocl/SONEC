// Interaction Sound for changing background
const interactionSoundSrc = "./audio/UISounds/ui-click-43196.mp3";
const interactionSoundHowl = new Howl({ src: [interactionSoundSrc] });

function interactionSound() {
  interactionSoundHowl.play();
}

// Pop Close Sound for closing popups
const popCloseSoundSrc = "./audio/UISounds/bloop-4-186533.mp3";
const popCloseHowl = new Howl({ src: [popCloseSoundSrc] });

function popCloseSound() {
  popCloseHowl.play();
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
  let noteNumber = parseInt(
    window.localStorage.getItem("localNumber") || "0",
    10
  );
  
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
  
  const attachHoverEvents = () => {
    const hoverElements = document.querySelectorAll(".ball-item");
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
  
  // Page Load Sound
  const pageLoadSoundSrc = "audio/UISounds/ui-pop-up-4-197890.mp3"; // Page load sound
  const pageLoadHowl = new Howl({ src: [pageLoadSoundSrc] });
  
  const pageLoadSound = () => {
    pageLoadHowl.play();
  };
  
  // Interaction Sound for Pop Open
  const popOpenSoundSrc = "./audio/UISounds/ui-pop-up-6-197894.mp3"; // Pop open sound
  const popOpenHowl = new Howl({ src: [popOpenSoundSrc] });
  
  const popOpenSound = () => {
    popOpenHowl.play();
  };
  
  // Interaction Sound for Link Click
  const linkClickSoundSrc = "./audio/UISounds/ui-click-43196.mp3"; // Link click sound
  const linkClickHowl = new Howl({ src: [linkClickSoundSrc] });
  
  const linkClickSound = () => {
    linkClickHowl.play();
  };
  
  // Back Sound for closing popups
  const backSoundSrc = "./audio/UISounds/bloop-4-186533.mp3"; // Pop close sound
  const backHowl = new Howl({ src: [backSoundSrc] });
  
  const backSound = () => {
    backHowl.play();
  };
  
window.onload = function () {
  $("#drumMachineActivator").click(function () {
    $("#drum_machine").addClass("active");
    $("#overlay").addClass("active");
  });

  $("#keyboardActivator").click(function () {
    $("#keyboard").addClass("active");
    $("#overlay").addClass("active");
  });

  // Click outside the active divs to deactivate them
  $(document).click(function (event) {
    if (
      !$(event.target).closest(
        "#drum_machine, #keyboard, #drumMachineActivator, #keyboardActivator"
      ).length
    ) {
      $("#drum_machine").removeClass("active");
      $("#keyboard").removeClass("active");
      $("#overlay").removeClass("active");
    }
  });

  // Shuffler

  const buttonWrapper = document.querySelector(".buttonWrapper");
  const ballWrappers = Array.from(
    buttonWrapper.querySelectorAll(".ballWrapper")
  );

  // Shuffle function using Fisher-Yates algorithm
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Shuffle ballWrappers array
  const shuffledBallWrappers = shuffle(ballWrappers);

  // Remove all ballWrapper elements from buttonWrapper
  ballWrappers.forEach((ballWrapper) => buttonWrapper.removeChild(ballWrapper));

  // Append shuffled ballWrapper elements back to buttonWrapper
  shuffledBallWrappers.forEach((ballWrapper) =>
    buttonWrapper.appendChild(ballWrapper)
  );

// Keyboard

const keyboardSoundSrc = [
    "./audio/synthSamples/synthSound1.wav",
    "./audio/synthSamples/synthSound2.wav",
    "./audio/synthSamples/synthSound3.wav",
    "./audio/synthSamples/synthSound4.wav",
    "./audio/synthSamples/synthSound5.wav"
  ];
  
  let currentSoundIndex = 0;
  let keyboardSound = new Howl({ src: [keyboardSoundSrc[currentSoundIndex]] });
  
  const loadSound = (index) => {
    keyboardSound.unload();
    keyboardSound = new Howl({ src: [keyboardSoundSrc[index]] });
  };
  
  document.getElementById("cycleSound").addEventListener("click", () => {
    currentSoundIndex = (currentSoundIndex + 1) % keyboardSoundSrc.length;
    loadSound(currentSoundIndex);
  });
  
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
  

  // Sound
  let noteNumber = parseInt(
    window.localStorage.getItem("localNumber") || "0",
    10
  );

  // FX Sounds
  const fxSoundSrc = "./audio/synthSamples/synthSound2.wav";
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
    const hoverElements = document.querySelectorAll(".ballWrapper");
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
    fxSound();
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

  /* Detect inactivity and change URL */
  let inactivityTime = function () {
    let time;
    const resetTimer = () => {
      clearTimeout(time);
      time = setTimeout(() => console.log("You are now logged out."), 3000);
    };

    document.onmousemove = resetTimer;
    document.onkeypress = resetTimer;
  };
  inactivityTime();

  /* Change background on clicks */
  const changeBackground = function () {
    const container = document.getElementById("container");
    container.className = container.className === this.id ? "white" : this.id;
  };

  const colorChangeItems = document.getElementsByClassName("color-change");
  for (let i = 0; i < colorChangeItems.length; i++) {
    colorChangeItems[i].addEventListener("click", changeBackground);
  }

  /* Show and hide popups */
  const showProjects = () => {
    document.getElementById("proyectos").className = "show";
    showOverlay();
  };

  const showOverlay = () => {
    document.getElementById("overlay").classList.add("show");
  };

  const cerrarProyectos = () => {
    document.getElementById("proyectos").className = "hide";
    hideOverlay();
  };

  const hideOverlay = () => {
    document.getElementById("overlay").classList.remove("show");
  };

  const cerrarPopper = () => {
    backSound();
    hideOverlay();
    const elements = document.getElementsByClassName("show");
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove("show");
    }
    const sounds = document.getElementsByTagName("audio");
    for (let i = 0; i < sounds.length; i++) sounds[i].pause();
  };

  const showPopper = function () {
    const idToShow = this.getAttribute("data-popTarget");
    document.getElementById(idToShow).classList.add("show");
    showOverlay();
  };

  document.querySelectorAll(".lab-item").forEach((item) => {
    item.addEventListener("click", showPopper, false);
  });

  /* Change animation type after circles animation */
  const addAnimation = () => {
    const elements = [
      ...document.getElementsByClassName("ball-item"),
      ...document.getElementsByClassName("ball-itemAlt"),
    ];
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove(
        "animate__fadeInLeft",
        "animate__fadeInRight"
      );
      elements[i].classList.add("animate__pulse", "animate__infinite");
    }
  };

  setTimeout(addAnimation, 1500);

  const addAnimation2 = () => {
    const elements = document.getElementsByClassName("category-item-link");
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove("animate__flipInX");
      elements[i].classList.add("animate__pulse", "animate__infinite");
    }
  };

  setTimeout(addAnimation2, 1500);

  const sobreNosotros = document.getElementById("sobrenosotros");
  if (sobreNosotros) {
    sobreNosotros.addEventListener("click", fxSound);
  }

  // Initialize event listeners
  attachHoverEvents();
  attachClickEvents();
};

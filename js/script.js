document.addEventListener("DOMContentLoaded", function () {
  
  playPageLoadSound(); // Play the page load sound based on body class

  
  $("#drumMachineActivator").click(function () {
    $("#drum_machine").addClass("active");
    $("#overlay").addClass("active");
    popOpenSound(); // Play the open sound when drum machine is activated
  });

  $("#keyboardActivator").click(function () {
    $("#keyboard").addClass("active");
    $("#overlay").addClass("active");
    popOpenSound(); // Play the open sound when keyboard is activated
  });

  // Click outside the active divs to deactivate them
  $(document).click(function (event) {
    if (
      !$(event.target).closest(
        "#drum_machine, #keyboard, #drumMachineActivator, #keyboardActivator"
      ).length
    ) {
      if ($("#drum_machine").hasClass("active") || $("#keyboard").hasClass("active")) {
        popCloseSound(); // Play the close sound when either drum machine or keyboard is hidden
      }
      $("#drum_machine").removeClass("active");
      $("#keyboard").removeClass("active");
      $("#overlay").removeClass("active");
    }
  });

  const buttonWrapper = document.querySelector(".buttonWrapper");

  if (buttonWrapper) {
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
    ballWrappers.forEach((ballWrapper) =>
      buttonWrapper.removeChild(ballWrapper)
    );
  
    // Append shuffled ballWrapper elements back to buttonWrapper
    shuffledBallWrappers.forEach((ballWrapper) =>
      buttonWrapper.appendChild(ballWrapper)
    );
  } 

  // Initialize event listeners
  attachHoverEvents();
  attachClickEvents();
});

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
  interactionSound(); // Play a sound on background change
};

const colorChangeItems = document.getElementsByClassName("color-change");
for (let i = 0; i < colorChangeItems.length; i++) {
  colorChangeItems[i].addEventListener("click", changeBackground);
}

const showOverlay = () => {
  document.getElementById("overlay").classList.add("show");
};

const hideOverlay = () => {
  document.getElementById("overlay").classList.remove("show");
};

const cerrarPopper = () => {
  if (document.body.classList.contains("soundType3")) {
    modalOpenSound(); // Play only the modal open sound (using it for close as well)
  } else {
    popCloseSound();   // Play the close popper sound
  }
  
  hideOverlay();
  const elements = document.getElementsByClassName("show");
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.remove("show");
  }
  const sounds = document.getElementsByTagName("audio");
  for (let i = 0; i < sounds.length; i++) sounds[i].pause();
};


function showPopper() {
  const idToShow = this.getAttribute("data-popTarget");
  document.getElementById(idToShow).classList.add("show");
  showOverlay();
  
  if (document.body.classList.contains("soundType3")) {
    modalOpenSound(); // Play only the modal open sound
  } else {
    modalOpenSound(); // Play the modal open sound
    popOpenSound();    // Play the open popper sound
  }
}


document.querySelectorAll(".lab-item").forEach((item) => {
  item.addEventListener("click", showPopper, false);
});

/* Change animation type after circles animation */
const addAnimation = () => {
  const elements = document.getElementsByClassName("keep_pulsing");
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


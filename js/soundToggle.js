document.addEventListener("DOMContentLoaded", function () {
    function toggleSound() {
        let isMuted = localStorage.getItem("isMuted") === "true";
        isMuted = !isMuted;
        localStorage.setItem("isMuted", isMuted);

        const soundIcon = document.getElementById("soundIcon");
        if (isMuted) {
            soundIcon.src = "css/img/volume-mute.svg";
            soundIcon.alt = "Sound Off";
            Howler.mute(true);
        } else {
            soundIcon.src = "css/img/volume-up-fill.svg";
            soundIcon.alt = "Sound On";
            Howler.mute(false);
        }
    }

    const soundIcon = document.getElementById("soundIcon");
    const isMuted = localStorage.getItem("isMuted") === "true";

    if (isMuted) {
        soundIcon.src = "css/img/volume-mute.svg";
        soundIcon.alt = "Sound Off";
        Howler.mute(true);
    } else {
        soundIcon.src = "css/img/volume-up-fill.svg";
        soundIcon.alt = "Sound On";
        Howler.mute(false);
    }

    const soundToggle = document.getElementById("soundToggle");
    soundToggle.addEventListener("click", function (e) {
        e.preventDefault();
        toggleSound();
    });
});

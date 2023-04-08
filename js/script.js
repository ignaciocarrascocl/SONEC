window.onload = function () {

    let noteNumber = 0;
    let noteArray = ["a", "b", "c", "d", "e", "f", "g"]
    let links = document.getElementsByTagName('a');

    if (window.localStorage.getItem("localNumber")) {
        noteNumber = window.localStorage.getItem("localNumber");
    } else {
        window.localStorage.setItem("localNumber", 0)
    }

    const updateNote = () => {
        if (noteNumber <= (noteArray.length - 1)) {
            console.log(noteArray[noteNumber])
            noteNumber++
        } else {
            noteNumber = 0;
        }
    }

    const noteA = new Howl({
        src: ['./audio/key01.ogg']
    })
    const noteB = new Howl({
        src: ['./audio/key02.ogg']
    })
    const noteC = new Howl({
        src: ['./audio/key03.ogg']
    })
    const noteD = new Howl({
        src: ['./audio/key04.ogg']
    })
    const noteE = new Howl({
        src: ['./audio/key05.ogg']
    })
    const noteF = new Howl({
        src: ['./audio/key06.ogg']
    })
    const noteG = new Howl({
        src: ['./audio/key07.ogg']
    })

    const fxSound = () => {
        updateNote();
        switch (noteNumber) {
            case 0:
                noteA.play()
                break;
            case 1:
                noteB.play()
            case 2:
                noteC.play()
                break;
            case 3:
                noteD.play()
                break;
            case 4:
                noteE.play()
                break;
            case 5:
                noteF.play()
                break;
            case 6:
                noteG.play()
                break;
            default:
                noteA.play()
        }

    }



    for (let i = 0, il = links.length; i < il; i++) {
        links[i].onclick = clickHandler;
    }

    function clickHandler(event) {
        fxSound();
        event.preventDefault();

        let travelTo = this.getAttribute("href");

        // add `s` to `Element`
        let animOut = document.getElementsByClassName("animateOut");

        // iterate `animOut` elements
        for (let i = 0; i < animOut.length; i++) {
            // add `out` `className` to `animOut` element at index `i`
            animOut[i].classList.add("out");
        };

        // Delay page out until the animation finishes
        setTimeout(function () {
            window.location.href = travelTo;
        }, 500);
    };
    /* Detectar inactividad y cambiar de URL */

    let inactivityTime = function () {
        let time;
        window.onload = resetTimer;
        // DOM Events
        document.onmousemove = resetTimer;
        document.onkeypress = resetTimer;

        function logout() {
            alert("You are now logged out.")
            //location.href = 'logout.html'
        }

        function resetTimer() {
            clearTimeout(time);
            time = setTimeout(logout, 3000)
            // 1000 milliseconds = 1 seconds
        }
    }


    /* Cambiar el fondo con los clicks */
    const changeBackground = function (e) {
        const containerClass = document.getElementById("container").className;
        if (containerClass == this.id) {
            document.getElementById("container").className = "white";
        } else {
            document.getElementById("container").className = this.id;
        }
    }

    let items = document.getElementsByClassName('color-change');
    for (let i = 0; i < items.length; i++) {
        items[i].addEventListener('click', changeBackground);
    }

    /* Mostrar y ocultar los popups */
    const showProjects = function () {
        document.getElementById("proyectos").className = "show"
        showOverlay()
    }

    const showOverlay = function () {
        document.getElementById("overlay").classList.add("show")
    }

    const cerrarProyectos = function () {
        document.getElementById("proyectos").className = "hide";
        hideOverlay()

    }

    const hideOverlay = function () {
        document.getElementById("overlay").classList.remove("show")
    }

    const cerrarPopper = function () {
        backSound();
        hideOverlay();
        let elements = document.getElementsByClassName("show")
        for (i = 0; i < elements.length; i++) {
            elements[i].classList.remove("show")
        }
        let sounds = document.getElementsByTagName('audio');
        for (i = 0; i < sounds.length; i++) sounds[i].pause();

    }

    const showPopper = function () {
        let idToShow = this.getAttribute("data-popTarget")
        document.getElementById(idToShow).classList.add("show")
        showOverlay()
    }

    /* Detectar interaccion y lanzar popups */
    let elements = document.querySelectorAll(".lab-item").forEach(item => {
        item.addEventListener("click", showPopper, false)
    })

    /* Cambiar tipo de animación posterior a la entrada de los círculos del menú principal */

    const addAnimation = function () {
        let elements = document.getElementsByClassName("ball-item");
        for (i = 0; i < elements.length; i++) {
            elements[i].classList.remove("animate__fadeInLeft", "animate__fadeInRight")
            elements[i].classList.add("animate__pulse", "animate__infinite")

        }
    }

    setTimeout(() => { addAnimation() }, 1500);

    const addAnimation2 = function () {
        let elements = document.getElementsByClassName("category-item-link");
        for (i = 0; i < elements.length; i++) {
            elements[i].classList.remove("animate__flipInX")
            elements[i].classList.add("animate__pulse", "animate__infinite")
        }
    }

    setTimeout(() => { addAnimation2() }, 1500);


    const sobreNosotros = document.getElementById('sobrenosotros');
    if (sobreNosotros) {
        sobreNosotros.addEventListener("click", function () {
            fxSound();
        })
    }


    const hoverElements = document.getElementsByClassName("lab-item");

    for (let i = 0; i < hoverElements.length; i++) {
        hoverElements[i].addEventListener('mouseenter', function () {
            fxSound()
        });
    }

    const hoverElements2 = document.getElementsByClassName("category-item");

    for (let i = 0; i < hoverElements2.length; i++) {
        hoverElements2[i].addEventListener('mouseenter', function () {
            fxSound()
        });
    }
};


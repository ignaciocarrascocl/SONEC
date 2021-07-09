/* Detectar inactividad y cambiar de URL */

window.addEventListener("load", function(event) {
    console.log("'Todos los recursos terminaron de cargar!");
  });


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
const changeBackground = function(e) {
    const containerClass = document.getElementById("container").className;
    if(containerClass == this.id ){
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
const showProjects = function(){
    document.getElementById("proyectos").className = "show"
    showOverlay()
}

const showOverlay = function(){
    document.getElementById("overlay").classList.add("show")
}

const cerrarProyectos = function(){
    document.getElementById("proyectos").className = "hide";
    hideOverlay()
    
}

const hideOverlay = function(){
    document.getElementById("overlay").classList.remove("show")
}

const cerrarPopper = function(){
    hideOverlay()
    let elements = document.getElementsByClassName("show")
    for(i = 0; i < elements.length; i++){
        elements[i].classList.remove("show")
    }
    let sounds = document.getElementsByTagName('audio');
    for(i=0; i<sounds.length; i++) sounds[i].pause();
    
}

const showPopper = function(){
    let idToShow = this.getAttribute("data-popTarget")
    document.getElementById(idToShow).classList.add("show")
    showOverlay()
    }

/* Detectar interaccion y lanzar popups */
let elements = document.querySelectorAll(".lab-item").forEach(item => {
    item.addEventListener("click", showPopper, false)
})

/* Cambiar tipo de animación posterior a la entrada de los círculos del menú principal */
    
const addAnimation = function() {
    let elements = document.getElementsByClassName("ball-item");
    for (i = 0; i < elements.length; i++) {
        elements[i].classList.remove("animate__bounceInLeft", "animate__bounceInRight")
        elements[i].classList.add("animate__pulse", "animate__infinite")
      }
  }

setTimeout(() => {  addAnimation()}, 1100);


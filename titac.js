

const btn0 = document.getElementById("btn0");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const btn4 = document.getElementById("btn4");
const btn5 = document.getElementById("btn5");
const btn6 = document.getElementById("btn6");
const btn7 = document.getElementById("btn7");
const btn8 = document.getElementById("btn8");

const reiniciar = document.getElementById("reiniciar");
const btnr = document.getElementById("btnr")

const resul = document.getElementById("resul");
const modo = document.getElementById("modo")


let listaInicial = [btn0,btn1,btn2,btn3,btn4,btn5,btn6,btn7,btn8];
let btnsTotal = [btn0,btn1,btn2,btn3,btn4,btn5,btn6,btn7,btn8];

let numInicial = [];
let juego = true;
let turno = "jugador 1";

let gane = document.getElementById("gane");
let perdida = document.getElementById("perdida");
let empate = document.getElementById("empate");

let victorias = localStorage.getItem("Victorias") || 0 ;
let derrotas = localStorage.getItem("Derrotas") || 0;
let empates = localStorage.getItem("Empates") || 0;

gane.textContent = victorias
perdida.textContent = derrotas
empate.textContent = empates

function bot () {
    setTimeout(() => {
        console.log("Retrasado por 0.5 segundo."); 
    let btnRandom = listaInicial[Math.floor(Math.random() * listaInicial.length)];


    for (let index = 0; index < listaInicial.length; index++) {

        const element = listaInicial[index];

        if (element === btnRandom) {

            element.textContent="🐭";
            listaInicial.splice(index, 1)            
            
        } 
        
    }
    
    veriGanador();
    }, "500");
}

function multijugador() {
    for (let index = 0; index < listaInicial.length; index++) {
        const element = listaInicial[index];

        element.addEventListener("click", function () {

            if (turno === "jugador 1") {

                if (element.textContent.trim() === "") {
                    element.textContent = "😼";

                    listaInicial = listaInicial.filter(btn => btn !=element)
                    turno = "jugador 2"
                    
                }
            }
            else {

                if (element.textContent.trim() === "") {
                    element.textContent = "🐭";

                    listaInicial = listaInicial.filter(btn => btn !=element)
                    turno = "jugador 1"
                }
            }
            // mensajeTurno.textContent = "Turno de " + turno;
        })
        
    }
    
}

function veriGanador (){

    let casillasGanadoras = [[0,1,2], [3,4,5], [6,7,8], [0,3,6],
        [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

    for (let casillas of casillasGanadoras) {

        if (btnsTotal[casillas[0]].textContent === "😼" &&  btnsTotal[casillas[1]].textContent === "😼" &&  btnsTotal[casillas[2]].textContent === "😼") {
    
            resul.textContent = "¡GANASTE 😎!"
            juego = false;

            victorias++
            gane.textContent = victorias

            localStorage.setItem("Victorias", JSON.stringify(victorias))

            
        } 
        else{
            if (btnsTotal[casillas[0]].textContent === "🐭" &&  btnsTotal[casillas[1]].textContent === "🐭" &&  btnsTotal[casillas[2]].textContent === "🐭") {

                resul.textContent = "!PERDISTE 😢!"
                juego = false;

                derrotas++
                perdida.textContent = derrotas

                localStorage.setItem("Derrotas", JSON.stringify(derrotas))
                
            } 

        }
            
        
    }
    
    if (listaInicial.length == 0 && juego == true) {
        resul.textContent = "¡Han empatado 🫨!"

        empates++
        empate.textContent = empates

        localStorage.setItem("Empates", JSON.stringify(empates))

    }
}

for (let index = 0; index < listaInicial.length; index++) {
    const element = listaInicial[index];
        element.addEventListener("click", function () {
         if (juego == true) {
            if (element.textContent.trim() === '') {
            

    
                listaInicial = listaInicial.filter(btn => btn !=element)
                



                if (modo.value === "unJugador") {
                    element.textContent="😼";
                    bot()
                }

                if (modo.value === "multijugador") {
                    console.log(modo.value);

            
                    for (let index = 0; index < listaInicial.length; index++) {
                        const element = listaInicial[index];
                
                        element.addEventListener("click", function () {
                
                            if (turno === "jugador 1") {
                
                                if (element.textContent.trim() === "") {
                                    element.textContent = "😼";
                
                                    listaInicial = listaInicial.filter(btn => btn !=element)
                                    turno = "jugador 2"
                                    veriGanador()

                                    
                                }
                            }
                            else {
                
                                if (element.textContent.trim() === "") {
                                    element.textContent = "🐭";
                
                                    listaInicial = listaInicial.filter(btn => btn !=element)
                                    turno = "jugador 1"
                                    veriGanador()

                                }
                            }
                            // mensajeTurno.textContent = "Turno de " + turno;
                        })
                        
                    }
                }
                

    
            }
            }
            
        }); 

    }


    

reiniciar.addEventListener("click",function () {

    location.reload()
  
    
})

btnr.addEventListener("click",function () {

    localStorage.clear()
    location.reload()
  
    
})



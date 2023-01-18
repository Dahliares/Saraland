window.onload = function () {


var botonEmp = document.getElementById("botonEmp");
botonEmp.addEventListener("click", empezarPartida);
var botonOk = document.getElementById("botonOk");
botonOk.addEventListener("click", calcular);

var numNPC = 7;
var numJUG = 0;
var texto = document.getElementById("resultado");
var form = getElementById("formulario");
form.addEventListener("submit", calculo());
alert(numJUG);
window.onload = cargar();


function cargar() {
    var texto = document.getElementById("text");
    texto.disabled = true;
    var botonOk = document.getElementById("botonOk");
    botonOk.disabled = true;

    document.getElementById("botonOk").addEventListener("click", leerDato);
    numNPC = 7;
    document.getElementById("orden").innerHTML =
        "Escribe un número del 1 al 100 y dale a OK";

}

function empezarPartida() {

    var botonEmp = document.getElementById("botonEmp");
    botonEmp.disabled = true;
    var texto = document.getElementById("text");
    texto.disabled = false;
    var botonOk = document.getElementById("botonOk");
    botonOk.disabled = false;


    numNPC = Math.floor(Math.random() * 100) + 1;




}



function calcular() {



    var numn = numNPC;
    var numj = parseInt(document.getElementById("text").value);
    var salida = document.getElementById("resultado");



    if (numj < 1 || numj > 100) {

        salida.innerHTML = "ENTRE 1 Y 100";

    } else {

        if (numj == numn) {

            salida.innerHTML = "YOU WIN";
            var botonEmp = document.getElementById("botonEmp");
            botonEmp.disabled = false;
            var texto = document.getElementById("text");
            texto.disabled = true;
            var botonOk = document.getElementById("botonOk");
            botonOk.disabled = true;
            document.getElementById("cajaOculta").innerHTML = numNPC;
        }
        if (numj < numn) {

            salida.innerHTML = "NO NO, más alto!";

        }
        if (numj > numn) {

            salida.innerHTML = "NO NO, más bajo!";


        }

    }



}


}
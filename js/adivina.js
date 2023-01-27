window.onload = function () {

//crear tabla
var tabla = document.getElementById("tabla");
var botones = 0;
for (let i = 0; i < 10; i++) {
    
    var row = document.createElement("div");
    row.setAttribute("row", i);
    row.className = "row";

    for (let j = 0; j < 10; j++) {
        
        //var celda = document.createElement("div");
        var boton = document.createElement("button");
        botones++;
        boton.setAttribute("id", botones);
        boton.className = "numeros";
        boton.innerHTML = botones;
        //celda.append(boton);
        row.append(boton);

    }
    var br = document.createElement("br");
    tabla.append(row);
    tabla.append(br);

}

var contador = 0;
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
    document.getElementById("cajaOculta").innerHTML = "?";
    document.getElementById("resultado").innerHTML = "";
    var botonEmp = document.getElementById("botonEmp");
    botonEmp.disabled = true;
    var texto = document.getElementById("text");
    texto.disabled = false;
    texto.value = "";
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
        contador++;

    } else {

        if (numj == numn) {

            salida.innerHTML = "YOU WIN<br> Lo has conseguido en "+contador+ " intentos";
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
            contador++;

        }
        if (numj > numn) {

            salida.innerHTML = "NO NO, más bajo!";
            contador++;

        }

    }



}


}
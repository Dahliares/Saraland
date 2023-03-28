window.onload = function () {


    let randomNum = Math.floor(Math.random() * 100) + 1;

    //creacion de botones en bloque
    var tabla = document.getElementById("tabla");
    tabla.className = "table-responsive"
    var botones = 0;
    for (let i = 0; i < 10; i++) {

        var fila = document.createElement("tr");
        fila.setAttribute("fila", i);
        fila.className = "fila";

        for (let j = 0; j < 10; j++) {


            var boton = document.createElement("button");
            botones++;

            boton.setAttribute("id", botones);
            boton.setAttribute("value", botones);
            boton.className = "botones";
            boton.innerHTML = botones;
            boton.addEventListener("click", calcular, true);

            fila.append(boton);

        }

        tabla.append(fila);


    }

    let contador = 0;

    function calcular() {

        let numClicado = parseInt(this.value);
        var salida = document.getElementById("pistas");
        this.classList.toggle("clicado");



        if (numClicado == randomNum) {
            let winner = ' <i class="fa-solid fa-trophy fa-xl"></i> ';
            salida.innerHTML = "YOU WIN!!!"+winner + "<br> Lo has conseguido en " + contador + " intentos";
            document.getElementById("caja").innerHTML = randomNum;

        }
        if (numClicado < randomNum) {
            let upArrow = ' <i class="fa-solid fa-arrow-up"></i> ';
           // llistat.innerHTML += '<p onclick="seleccionar(' + pos + ')" class="no-seleccionat" id="' + pos + '">' + persona_actual.nom_complet + '</p>';
            salida.innerHTML =  "NO, NO, más alto! " + upArrow + upArrow;
            contador++;

        }
        if (numClicado > randomNum) {
            let downArrow = ' <i class="fa-solid fa-arrow-down"></i> ';
            salida.innerHTML = "NO NO, más bajo! " + downArrow + downArrow;
            contador++;

        }





    }

    document.getElementById("reiniciar").addEventListener("click", function(){window.location.reload()});

}
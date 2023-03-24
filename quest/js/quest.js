window.onload = function () {

    //insertamos personaje con Jquery------------------------------------------------------------

    var $casilla = $('section:first-Child div:first-Child'); //primer div del primer section
    var $elementoMuñeco = crearMuñeco();
    $casilla.append($elementoMuñeco);

    //insertamos portal con Jquery-----------------------------------------------------------------

    var $casilla = $('section:last-Child div:last-Child'); //ultim div de la ultima section
    var $elementoPortal = crearPortal();
    $casilla.append($elementoPortal);

    //insertamos rocas sin Jquery-----------------------------------------------------------------

    //recogemos todos los divs en un array
    var arrayDivs = document.getElementById("terreny-joc").getElementsByTagName("div");
    var contadorRocas = 0;

    while (contadorRocas < 6) {

        var numAlea = (Math.floor(Math.random() * arrayDivs.length));

        if (!arrayDivs[numAlea].hasChildNodes()) {  //comprobamos que el div no tiene contenido dentro ya
            var elemntoRoca = crearRoca();
            arrayDivs[numAlea].appendChild(elemntoRoca);   //div seccionat aleatoriament
            contadorRocas++;
        }
    }

   
   

    //insertamos monedas sin Jquery-----------------------------------------------------------------

    var contadorMonedas = 0;

    while (contadorMonedas < 6) {

        numAlea = (Math.floor(Math.random() * arrayDivs.length));

        if (!arrayDivs[numAlea].hasChildNodes()) {  //comprobamos que el div no tiene contenido dentro ya
            var elementoMoneda = crearMoneda();
            arrayDivs[numAlea].appendChild(elementoMoneda); //div seccionat aleatoriament
            contadorMonedas++;
        }
    }

    //CAMBIAR PERSONAJE----------------------------------------------------------------------------------

    var boton = document.getElementsByClassName("change");
    boton[0].addEventListener("click", cambiarPersonaje);;

    function cambiarPersonaje() {
        
            //SI VA TODO BIEN HACEMOS EL CAMBIO DE PERSONAJE
          var personaje = document.getElementsByClassName("personatge")[0];//devuelve array  //[0] pq solo hay un personaje 
        var imagen = personaje.firstChild;
        var atributo = imagen.getAttribute('src');  //sacamos el valor del atributo src actual

        //modificamos valor del src      
        if (atributo == "img/personatge1.png") {
            imagen.src = "img/personatge2.png";
        } else if (atributo == "img/personatge2.png") {
            imagen.src = "img/personatge1.png";
        }  
        
        
    }


    //MOVIMIENTOS---------------------------------------------------------------------------------------

    //BOTON ABAJO  con Jquery

    var $botonAbajo = $('.down');
    $botonAbajo.click(moverAbajo);

    function moverAbajo() {

        $casillaActual = $(".personatge").parent();   //div actual donde esta el muñeco

        if ($casillaActual.parent().next().is("section")) {  //verificamos que haya casilla siguiente

            //averiguamos cuantos hermanos tiene delante para saber que nº de hijo es dentro del section
            $numHermanosPrevios = $casillaActual.prevAll().length + 1;
            $casillaDestino = $casillaActual.parent().next().children('div:nth-child(' + $numHermanosPrevios + ')');

            //pasamos obj jquery a js para poder usar el metodo accion
            var DOMdestido = $casillaDestino.get(0);
            var DOMactual = $casillaActual.get(0);

            accion(DOMdestido, DOMactual);

        }


    }

    //BOTON ARRIBA   con Jquery

    var $botonarriba = $('.up');
    $botonarriba.click(moverArriba);

    function moverArriba() {

        $casillaActual = $(".personatge").parent();

        if ($casillaActual.parent().prev().is("section")) {  //verificamos que haya casilla previa

            //averiguamos cuantos hermano tiene delante para saber que nº de hijo es dentro del section
            $numHermanosPrevios = $casillaActual.prevAll().length + 1;
            $casillaDestino = $casillaActual.parent().prev().children('div:nth-child(' + $numHermanosPrevios + ')');

            //pasamos obj jquery a js para poder usar el metodo accion
            var DOMdestido = $casillaDestino.get(0);
            var DOMactual = $casillaActual.get(0);

            accion(DOMdestido, DOMactual);

        }

    }


    //BOTON DERECHO sin jquery

    var botonDerecha = document.getElementsByClassName("right")[0];
    botonDerecha.addEventListener("click", moverDerecha);


    function moverDerecha() {

        var casillaActual = document.getElementsByClassName("personatge")[0].parentNode;
        var casilladestino = casillaActual.nextElementSibling;

        if (casilladestino != null) {

            accion(casilladestino, casillaActual);

        }

    }

    //BOTON IZQUIERDO sin jquery

    var botonDerecha = document.getElementsByClassName("left")[0];
    botonDerecha.addEventListener("click", moverIzquierda);

    function moverIzquierda() {

        var casillaActual = document.getElementsByClassName("personatge")[0].parentNode;
        var casilladestino = casillaActual.previousElementSibling;

        if (casilladestino != null) {
            accion(casilladestino, casillaActual);
        }
    }

    //funcion que se encarga de comprobar que hay en la casilla a la que queremos y redirige a la funcion que toque

    function accion(casilladestino, casillaActual) {

        if (!casilladestino.hasChildNodes()) {   //si la casilla destino está vacía movemos el muñeco

            casilladestino.append(casillaActual.firstChild.cloneNode(true)); //copiamos el contenido (muñeco) de la casilla actual a la destino
            casillaActual.firstChild.remove(); //borramos la casilla actual que ahora queda vacía


        } else if (casilladestino.firstChild.className == "roca") {

            roca();

        } else if (casilladestino.firstChild.className == "moneda") {

            moneda(casilladestino, casillaActual);

        } else if (casilladestino.firstChild.className == "portal") {

            portal(casillaActual);
          
        }


    }



    function roca() {   //gestiona la pérdida de vidas

        var vidasActuales = parseInt(document.getElementById("numVides").textContent);

        if (vidasActuales > 0) {
            document.getElementById("numVides").textContent = vidasActuales - 1;

        }
        if (vidasActuales == 0) {
            alert("HAS PERDIDO! Vuelve a empezar");
            window.location.reload()
        }

    }


    function moneda(casilladestino, casillaActual) {  //sumamos monedas

        var valor = parseInt(casilladestino.firstChild.getAttribute("valor")); //recogemos el valor de la moneda
        var monedasActuales = parseInt(document.getElementById("numMonedes").textContent);

        document.getElementById("numMonedes").textContent = monedasActuales + valor;

        //movemos muñeco a la casilla destino y borramos el contenido de la actual

        casilladestino.firstChild.remove(); //borramos la moneda que había
        casilladestino.append(casillaActual.firstChild.cloneNode(true));
        casillaActual.firstChild.remove();

    }


    //funcion portal con funcionalidad extra de guardado de record en local storage y reinicio automatico de partida

    function portal(casillaActual) {  //gestionamos la entrada al portal

        
        casillaActual.firstChild.remove(); //borramos el moñeco

        var monedasActuales = parseInt(document.getElementById("numMonedes").textContent);
        var record = parseInt(localStorage.getItem("monedas"));  //comprobamos si hay record anterior

        if (Number.isNaN(record) || monedasActuales > record) {

            localStorage.setItem("monedas", monedasActuales);  //establecemos el nuevo record
            alert("Felicidades! Te has llevado " + monedasActuales + " monedas, NUEVO RECORD!");
            window.location.reload()

        } else if (monedasActuales < record) {
            alert("Felicidades! Te has llevado " + monedasActuales + " monedas, pero el RECORD ACTUAL es de " + record + " monedas");
            window.location.reload()

        } else if (monedasActuales == record) {
            alert("Felicidades! Te has llevado " + monedasActuales + " monedas, has igualado el RECORD ACTUAL!");
            window.location.reload()

        }

    }


    function crearMuñeco() {

        var muñecoSpan = document.createElement('span');
        muñecoSpan.className = "personatge";

        var muñecoImg = document.createElement('img');
        muñecoImg.src = "img/personatge1.png";

        muñecoSpan.appendChild(muñecoImg);

        return muñecoSpan;
    }

    function crearPortal() {

        var portalDiv = document.createElement('div');
        portalDiv.className = "portal";

        var portalImg = document.createElement('img');
        portalImg.src = "img/portal.gif";

        portalDiv.appendChild(portalImg);

        return portalDiv;

    }

    function crearRoca() {

        var rocaP = document.createElement('p');
        rocaP.className = "roca";

        var rocaImg = document.createElement('img');
        rocaImg.src = "img/roca.png";

        rocaP.appendChild(rocaImg);

        return rocaP;

    }


   



    function crearMoneda() {

        var valorMoneda = Math.floor(Math.random() * 25) + 1; //damos valor aleatorio

        var monedaDiv = document.createElement('div');
        monedaDiv.className = "moneda";
        monedaDiv.setAttribute("valor", valorMoneda);

        var monedaImg = document.createElement('img');
        monedaImg.src = "img/moneda.gif";

        monedaDiv.appendChild(monedaImg);

        return monedaDiv;



    }

    // mostrar valor de la moneda al hacer doble click con Jquery

    $(".moneda").on("dblclick", function () {

        alert($(this).attr("valor"));

    });



    // funcionalidad extra, para poder mover el muñeco con las flechas del teclado por comodidad a la hora de jugar

    document.addEventListener("keydown", gestionarTecla);

    function gestionarTecla(e) {

        switch (e.keyCode) {
            case 37:
                moverIzquierda();
                break;
            case 38:
                moverArriba();
                break;
            case 39:
                moverDerecha();
                break;
            case 40:
                moverAbajo();
                break;
        }
    };

}



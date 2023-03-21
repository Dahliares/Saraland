$(document).ready(function () {

    var latlngMunicipi;
    var descripción;
    var contador = 0;


    //creamos mapa con vista a Catalunya
    var map = L.map('map').setView([41.75902, 1.873169], 8);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);


    //recoge la latitud y longitud clicada y la compara con la del municipio a buscar
    function onMapClick(e) {

        contador++;

        //recogemos y convertimos distancia a kilometros
        var distancia = e.latlng.distanceTo(latlngMunicipi) / 1000;

        document.getElementById("kilometros").innerHTML = "Has clicado a " + distancia.toFixed(0) + " kms de distancia";

        if (distancia <= 0.5) {
            document.getElementById("kilometros").innerHTML = "ENHORABUENA!<br> Has encontrado el municipio en " + contador + " intentos";

            //creamos popup cuando encontramos el municipio
            L.popup()
                .setLatLng(e.latlng)
                .setContent(descripción)
                .openOn(map);


        } else if (distancia < 2 && distancia > 0.5) {

            document.getElementById("kilometros").innerHTML = "Caliente, Caliente";
        } else if (distancia > 70) {

            document.getElementById("kilometros").innerHTML = "Frío, Frío";
        }

    }

    map.on('click', onMapClick);



    //PETICION

    var web2 = 'https://analisi.transparenciacatalunya.cat/resource/wpyq-we8x.json';
    var resposta;

    function nuevaPeticion(url, funcion) {

        //creamos objeto XMLHttpRequest
        if (window.XMLHttpRequest) {
            httpRequest = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        } else {
            console.error("Error: Aquest navegador no admet AJAX.");
        }

        httpRequest.onload = funcion;
        httpRequest.open("GET", url, true);
        httpRequest.send(null);
    }

    nuevaPeticion(web2, procesarDatos);

    function procesarDatos() {

        resposta = JSON.parse(httpRequest.responseText);
    }


    //eventos de boton
    var botonJugar = document.getElementById("jugar");
    botonJugar.addEventListener("click", iniciarPartida);
    var botonReinicio = document.getElementById("reiniciar");
    botonReinicio.addEventListener("click", reiniciar);
    var botonmerindo = document.getElementById("merindo");
    botonmerindo.addEventListener("click", merindo);


    function reiniciar() {
        window.location.reload();
    };

    function merindo() {
        //señala sitio concreto
        var marker = L.marker(latlngMunicipi).addTo(map);
    }

    function iniciarPartida() {

        var radomNum = Math.floor(Math.random() * resposta.length) + 1;
        var randomMunicipio = resposta[radomNum];

        latlngMunicipi = [randomMunicipio.latitud, randomMunicipio.longitud];
        

        document.getElementById("municipio").innerHTML = randomMunicipio.municipi;
        
        descripción = "<strong>" + randomMunicipio.municipi + "</strong><br>" +
            "Municipi situat a la comarca de : " + randomMunicipio.comarca +
            "<br> Provincia: " + randomMunicipio.prov_ncia;
    }

});
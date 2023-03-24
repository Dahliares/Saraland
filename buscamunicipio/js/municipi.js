$(document).ready(function () {

    var latlngMunicipi;
    var descripcio;
    var comptador = 0;


    //creamos mapa con vista a Catalunya
    var map = L.map('map').setView([41.75902, 1.873169], 8);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);


    //recoge la latitud y longitud clicada y la compara con la del municipio a buscar
    function onMapClick(e) {

        comptador++;

        //recogemos y convertimos distancia a kilometros
        var distancia = e.latlng.distanceTo(latlngMunicipi) / 1000;

        document.getElementById("quilometres").innerHTML = "Has fet clic a " + distancia.toFixed(0) + " quilòmetres de distància";

        if (distancia <= 0.5) {
            document.getElementById("quilometres").innerHTML = "ENHORABONA!<br> Has trobat el municipi en " + comptador + " intents";

            //Creem pop-up quan trobem el municipi
            L.popup()
                .setLatLng(e.latlng)
                .setContent(descripción)
                .openOn(map);


        } else if (distancia < 2 && distancia > 0.5) {

            document.getElementById("quilometres").innerHTML = "Calent, calent!";
        } else if (distancia > 70) {

            document.getElementById("quilometres").innerHTML = "Fred, fred!";
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

    nuevaPeticion(web2, processarDades);

    function processarDades() {

        resposta = JSON.parse(httpRequest.responseText);
    }


    //eventos de boton
    var botoJugar = document.getElementById("jugar");
    botoJugar.addEventListener("click", iniciarPartida);
    var botoReinici = document.getElementById("reiniciar");
    botoReinici.addEventListener("click", reiniciar);
    var botoRendir = document.getElementById("rendeixo");
    botoRendir.addEventListener("click", rendir);


    function reiniciar() {
        window.location.reload();
    };

    function rendir() {
        //señala sitio concreto
        var marker = L.marker(latlngMunicipi).addTo(map);
    }

    function iniciarPartida() {

        var radomNum = Math.floor(Math.random() * resposta.length) + 1;
        var randomMunicipi = resposta[radomNum];

        latlngMunicipi = [randomMunicipi.latitud, randomMunicipi.longitud];
        

        document.getElementById("municipi").innerHTML = randomMunicipi.municipi;
        
        descripcio = "<strong>" + randomMunicipi.municipi + "</strong><br>" +
            "Municipi situat a la comarca de : " + randomMunicipi.comarca +
            "<br> Provincia: " + randomMunicipi.prov_ncia;
    }

});
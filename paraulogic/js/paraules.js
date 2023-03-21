//JSON amb totes les paraules possibles
let paraules = { "cel": "cel", "celic": "cèlic", "cell": "cell", "cescle": "cescle", "cicle": "cicle", "ciclic": "cíclic", "ciclo": "cicló", "cicloide": "cicloide", "ciclolisi": "ciclòlisi", "cili": "cili", "cilici": "cilici", "cisell": "cisell", "clec": "clec", "clic": "clic", "clisi": "clisi", "cloccloc": "cloc-cloc", "clos": "clos", "closell": "closell", "codicil": "codicil", "codillo": "codillo", "codol": "còdol", "codolell": "codolell", "codoli": "codolí", "codolos": "codolós", "col": "col", "coledoc": "colèdoc", "colic": "còlic", "colis": "colís", "coll": "coll", "colleccio": "col·lecció", "collisio": "col·lisió", "collo": "colló", "collodio": "col·lodió", "colloide": "col·loide", "colos": "colós", "coscoll": "coscoll", "cossiol": "cossiol", "cossol": "cossol", "decil": "decil", "del": "del", "delco": "delco", "delecio": "deleció", "deli": "deli", "delicios": "deliciós", "dicli": "diclí", "diesel": "dièsel", "dileccio": "dilecció", "diol": "diol", "discol": "díscol", "docil": "dòcil", "dol": "dol", "doll": "doll", "dolos": "dolós", "eclosio": "eclosió", "edicle": "edicle", "edil": "edil", "edilici": "edilici", "eleccio": "elecció", "elis": "elis", "elisi": "elisi", "elisio": "elisió", "ell": "ell", "eloi": "eloi", "els": "els", "eolic": "eòlic", "escocell": "escocell", "escoli": "escoli", "escoliosi": "escoliosi", "idilli": "idil·li", "idillic": "idíl·lic", "idol": "ídol", "ili": "ili", "illes": "il·lès", "iol": "iol", "isocli": "isoclí", "isosceles": "isòsceles", "leo": "leo", "les": "les", "lesio": "lesió", "lidi": "lidi", "lies": "lies", "lilos": "lilós", "lis": "lis", "lisi": "lisi", "llec": "llec", "llecol": "llécol", "lledo": "lledó", "llei": "llei", "lleo": "lleó", "lli": "lli", "llis": "llis", "lliscos": "lliscós", "lliso": "llisó", "llisol": "llisol", "llisso": "llissó", "llissol": "llissol", "lloc": "lloc", "llos": "llos", "llosc": "llosc", "locio": "loció", "loess": "loess", "los": "los", "loss": "löss", "ocel": "ocel", "ocell": "ocell", "oleic": "oleic", "oli": "oli", "olios": "oliós", "ossicle": "ossicle", "seleccio": "selecció", "sello": "selló", "sessil": "sèssil", "siclo": "sicló", "sil": "sil", "sile": "silè", "silice": "sílice", "silici": "silici", "silicic": "silícic", "silicosi": "silicosi", "silil": "silil", "socol": "sòcol", "sol": "sol o sòl", "solc": "solc", "soleid": "soleid", "soleids": "soleids", "solell": "solell", "solellos": "solellós", "soli": "soli", "solid": "sòlid", "soll": "soll", "solo": "solo", "solod": "solod", "sols": "sols" };
let arrayParaulesTrobades = [];

window.addEventListener("load", iniciar); //inicia las funciones despues de cargarse el DOM

function iniciar() {
     
    let savebutton = document.getElementById("save-button");
    let deletebutton = document.getElementById("delete-button");
    let submitbutton = document.getElementById("submit-button");
    let arrayHex = document.getElementsByClassName("hex-link"); //array con todos los hexágonos
    let testWord = document.getElementById("test-word");


    //asignamos evento a todo los hexagonos
    for (let i = 0; i < arrayHex.length; i++) {
        const element = arrayHex[i];
        element.addEventListener("click", gestionarHexagon);
    }
   
    //añadimos eventos al resto
    savebutton.addEventListener("dblclick", guardar);
    deletebutton.addEventListener("click", borrar);
    submitbutton.addEventListener("click", comprobar); 
    document.addEventListener("keypress", gestionarTecla);


    //controlamos si hay partidas guardadas

    let contador = 0;
    //recogemos la info del local storage
    let saved = localStorage.getItem("saved");
    if(saved == null){
        alert("No hi han partides guardades");
    } else {
        arrayParaulesTrobades = saved.split(",");
        contador = arrayParaulesTrobades.length;
        document.getElementById("letters-found").innerHTML = contador;
        document.getElementById("discovered-text").innerHTML = arrayParaulesTrobades;

    }

    
    function gestionarTecla(e) {   //funcion que recoge la tecla pulsada y la escribe en pantalla

        let patron = /[cdelios]{1}/;

        if (patron.test(e.key)) {
            testWord.innerHTML += e.key;
        }

    }

    function gestionarHexagon(){ //funcion que recoge la letra clicada

        var elem = this.textContent.trim(); //this es el elemento que ha sido clicado
        testWord.innerHTML += elem;

    }

    function borrar() {

        let palabra = testWord.innerHTML; //leemos la palabra actual
        let nuevaPalabra = palabra.substring(0, palabra.length - 1);   //le quitamos la ultima letra

        testWord.innerHTML = nuevaPalabra;

    }

    function comprobar() {   //comprueba la palabra indroducida por el usuario

        let palabra = testWord.innerHTML; //leemos la palabra actual

        if (paraules[palabra] && palabra.includes("l")) {  //comprobamos que esté en el dicci o que contenga la L

            if (arrayParaulesTrobades.includes(paraules[palabra])) {  //comprobamos que aunque sea correcta no esté repet
                alert("Palabra Correcta!! Pero está repetida")
                testWord.innerHTML = "";  
            } else {
                alert("Paraula Correcta!!")
                contador++;
                arrayParaulesTrobades.push(paraules[palabra]); //añadimos la palabra al array

                document.getElementById("discovered-text").innerHTML = arrayParaulesTrobades.join(", "); //mostramos array
                document.getElementById("letters-found").innerHTML = contador;
                testWord.innerHTML = "";  
            }

        } else {
            alert("La paraula no es correcta o no conté la lletra 'L'");
            testWord.innerHTML = ""; 

        }


    }

    function guardar(){   //guardamos partida en el local storage

        alert("Partida guardada!");
        let guardado = arrayParaulesTrobades.join(",");  
        localStorage.setItem("saved", guardado);

    }

}


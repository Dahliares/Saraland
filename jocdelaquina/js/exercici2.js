/** @author Sara Ortega*/

// VARIABLES GLOBALS
var arrayBolas = [];
var bolasCantadas = [];
var bolasOrdenadas = [];
var contador = 0;

// Podeu declarar-ne les que necessiteu, però millor com menys n'hi hagi!


// En el diccionari s'associa el nombre de cada bola amb les frases corresponents.
// Atenció perquè hi ha nombres que no tenen cap frase associada. Podeu afegir-ne si en coneixeu més!
// La frase que ha de dir el lloro i la que ha de dir el públic estan separades pel símbol "/".
// Atenció que molts nombres tenen frase per al lloro però no per al públic.
// Si la cadena comença directament amb "/" significa que el lloro no diu frase però el públic sí.
let diccionari = {
   1: "El més menut",
   2: "Un aneguet",
   3: "El tercer/Cirerer!",
   4: "Una cadireta",
   5: "Quinto",
   6: "El Siscu",
   7: "Un que té set",
   8: "Un que és buit/El teu cap!",
   9: "Un que és nou/El meu cotxe!",
   10: "Pelat el més petit",
   11: "La Diada",
   12: "Una dotzena/De pals a l'esquena!",
   13: "El de la mala sort",
   14: "Agafa un cagarro i esmorza",
   15: "La nena maca",
   16: "L'edat del pavu",
   17: "Qué diiisse",
   18: "Major d'edat",
   19: "/Toca'm un ou!",
   20: "Pelat la nena",
   21: "El més elegant",
   22: "Parella de dosos/Bruts i fastigosos!",
   23: "Sant Jordi",
   24: "Sant Joan",
   25: "/Nadal!",
   26: "Sant Esteve",
   27: "Vicentet",
   28: "Els sants innocents",
   29: "El tramvia",
   30: "El que trempa",
   31: "L'últim dia de l'any",
   33: "Parella de tresos",
   36: "Tres dotzenes",
   40: "Pelat quaranta",
   44: "Les cadiretes",
   45: "Mitja part",
   46: "Temps afegit",
   48: "Quatre dotzenes",
   50: "Pelat el del mig",
   55: "Parella de músics",
   60: "El cansat",
   65: "La jubilació",
   69: "El més porc de tots",
   70: "Pelat setanta",
   80: "Pelat la iaia",
   88: "Parellassa de vuits/Les mamelles de la Paula!",
   90: "Pelat l'avi"
};
let diccionariCopia = {
   1: "El més menut",
   2: "Un aneguet",
   3: "El tercer/Cirerer!",
   4: "Una cadireta",
   5: "Quinto",
   6: "El Siscu",
   7: "Un que té set",
   8: "Un que és buit/El teu cap!",
   9: "Un que és nou/El meu cotxe!",
   10: "Pelat el més petit",
   11: "La Diada",
   12: "Una dotzena/De pals a l'esquena!",
   13: "El de la mala sort",
   14: "Agafa un cagarro i esmorza",
   15: "La nena maca",
   16: "L'edat del pavu",
   17: "Qué diiisse",
   18: "Major d'edat",
   19: "/Toca'm un ou!",
   20: "Pelat la nena",
   21: "El més elegant",
   22: "Parella de dosos/Bruts i fastigosos!",
   23: "Sant Jordi",
   24: "Sant Joan",
   25: "/Nadal!",
   26: "Sant Esteve",
   27: "Vicentet",
   28: "Els sants innocents",
   29: "El tramvia",
   30: "El que trempa",
   31: "L'últim dia de l'any",
   33: "Parella de tresos",
   36: "Tres dotzenes",
   40: "Pelat quaranta",
   44: "Les cadiretes",
   45: "Mitja part",
   46: "Temps afegit",
   48: "Quatre dotzenes",
   50: "Pelat el del mig",
   55: "Parella de músics",
   60: "El cansat",
   65: "La jubilació",
   69: "El més porc de tots",
   70: "Pelat setanta",
   80: "Pelat la iaia",
   88: "Parellassa de vuits/Les mamelles de la Paula!",
   90: "Pelat l'avi"
};

/**
 * Treu una nova bola en resposta al botó "Nova bola"
 * 
 * Ha de sortejar una bola que no hagi sortit encara, i mostrar les frases corresponents a lloro i públic,
 * a més d'actualitzar les llistes de boles sortides per ordre d'aparició i per ordre creixent.
 */
function nova_bola() {

   var bola = 0;
   var frases;

   if (contador < arrayBolas.length) {

      bola = arrayBolas[contador];


      //controlamos que la bola sacada tenga frase en el diccionario
      if (diccionari[bola] === undefined) {

         document.getElementById("frase_public").innerHTML = "-";
         document.getElementById("frase_lloro").innerHTML = "-";

      } else {

         frases = String(diccionari[bola]).split("/");  //separamos las dos frases


         //sacamos por pantalla las frases del loro y el publico
         if (frases.length == 2) {

            if (frases[0] == "") {
               document.getElementById("frase_lloro").innerHTML = "-";

            } else {
               document.getElementById("frase_lloro").innerHTML = frases[0];
            }
            document.getElementById("frase_public").innerHTML = frases[1];

         } else if (frases.length == 1) {

            document.getElementById("frase_lloro").innerHTML = frases;

            document.getElementById("frase_public").innerHTML = "-";

         }




      }

      //sacamos por pantalla numero cantado
      document.getElementById("bola").innerHTML =
         arrayBolas[contador];

      //bolas cantadas
      bolasCantadas[contador] = arrayBolas[contador];
      //sacamos por pantalla
      document.getElementById("nombres_cantats").innerHTML =
         bolasCantadas;

      //bolas ordenadas
      bolasOrdenadas[contador] = arrayBolas[contador];
      //ordenamos array antes de sacarlo por pantalla
      bolasOrdenadas.sort(function (a, b) { return a - b });
      document.getElementById("nombres_ordenats").innerHTML =
         bolasOrdenadas;


      contador++

   } else {
      document.getElementById("bola").innerHTML =
         "No queden mes boles!";
   }
}

/**
 * Inicialitza la partida en resposta al botó "Nova partida" i en carregar la pàgina
 * 
 * ha d'inicialitzar els sortejos i buidar tots els camps d'informació de la pàgina HTML
 */
function nova_partida() {

   //comprobamos local storage y actualizamos el diccionario si hay datos
   for (let i = 1; i <= 90; i++) {
      var local = localStorage.getItem(String(i));

      if (local != null) {
         diccionari[i] = local;
      }
   }


   //llenamos el array de números hasta 90
   for (let i = 0; i < 90; i++) {
      arrayBolas[i] = i + 1;
   }
   //ordenamos aleatoriamente el array (bombo de bolas), para que las bolas salgan en orden diferente en cada partida
   arrayBolas.sort(function () { return Math.random() - 0.5 });

   //ponemos los elementos a 0
   document.getElementById("bola").innerHTML =
      "Preparat";
   document.getElementById("nombres_cantats").innerHTML =
      "CAP";
   document.getElementById("nombres_ordenats").innerHTML =
      "CAP";
   document.getElementById("frase_lloro").innerHTML = "-";

   document.getElementById("frase_public").innerHTML = "-";

   contador = 0;

   bolasCantadas = [];
   bolasOrdenadas = [];
}

/**
 * @author "Sara Ortega"
 * Modifica la llista.
 * 
 * Ha de permetre afegir o modificar frases de lloro i públic associades als nombres del sorteig
 */
function modificar_diccionari() {

   var correcte = false;
   var numBola, fraseLoro, frasePublico, fraseCompleta;



   //comprobamos que el número de bola introducido sea correcto
   while (!correcte) {
      numBola = parseInt(prompt("Qué número de bola quiere modificar o agregar?"));
      if (!Number.isInteger(numBola)) {   //controlamosque sea integer
         alert("Introduce un número de 1 a 90");
      } else if (numBola > 90 || numBola < 1) {//controlamos que este dentro del rango
         alert("Solo hay 90 bolas!!!!")
      } else {
         correcte = true;
      }
   }
   //pedimos las frases al usuario
   fraseLoro = prompt("Nueva frase del loro: ");
   frasePublico = prompt("Nueva frase del público: ");


   if (frasePublico == "") {
      fraseCompleta = fraseLoro;
   } else if (fraseLoro == "" && frasePublico == "") {
      fraseCompleta = "/";

   } else {
      fraseCompleta = fraseLoro + "/" + frasePublico;
   }



   diccionari[numBola] = fraseCompleta;

   localStorage.setItem(String(numBola), fraseCompleta);
   
   alert("Diccionario actualizado!");









}




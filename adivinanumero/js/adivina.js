window.onload = function(){

    document.getElementById("bola").innerHTML="?";

    var tabla = document.getElementById("tabla");
    tabla.className= "table-responsive"
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

    function calcular(e) {

        alert(e.value);

    }

}
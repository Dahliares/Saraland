window.onload = function () {



    var botones = document.getElementsByTagName("button");

    for (let i = 0; i < botones.length; i++) {
        const boton = botones[i];
        boton.addEventListener("click", function(){
            this.innerHTML = "holi";
        
        });
    }
 


}




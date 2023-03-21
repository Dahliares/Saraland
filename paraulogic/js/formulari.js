function validar(){

    var ok = true;  //variable que indica si podemos enviar el formulario o no
    var frase = "";


    //valido el ckeckbox
    var robot = document.getElementById("robot");
    if (!robot.checked){
        frase += "No has marcado el ckeck\n"
        ok = false;
    }

    //valido el password
    var pass = document.getElementById("pass").value;
    var patron = /^[A-Z]([a-zA-Z0-9_]{0,})+[$]$/;

    if(!patron.test(pass)){
        frase += "El formato de contraseña es incorrecto\n";
        ok = false;
    }
    
    //alerto de los errores ocurridos
    if(!ok){
        alert(frase);
    }

    //se enviara el formulario si no hay errores    
    return ok;

}
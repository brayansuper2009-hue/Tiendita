const calcular = () => {
    const contenedor = document.querySelector("#imcValor");

    contenedor.innerHTML = "<img src='Multimedia/giphy.webp' width='170px' height='170px'>";
    
    setTimeout(() => {
        let PV = parseFloat(document.querySelector("#peso").value);
        document.querySelector("#pesoValor").innerHTML = PV;

        let AV = parseFloat(document.querySelector("#altura").value);
        document.querySelector("#alturaValor").innerHTML = AV;

        if (AV <= 0) return;

        let IMC = PV / (AV * AV);
        contenedor.innerHTML = IMC.toFixed(2); 

        let clasificacion = "";
        
        if (IMC < 18.5) {
            clasificacion = "Bajo peso";
            document.querySelector("#clasificacionValor").innerHTML = `<b style="color:#009FE3"> ${clasificacion} </b>`;
            destacarTarjeta('card-bajo');
            
        } else if (IMC >= 18.5 && IMC < 25) {
            clasificacion = "Peso normal";
            document.querySelector("#clasificacionValor").innerHTML = `<b style="color:#92BD27"> ${clasificacion} </b>`;
            destacarTarjeta('card-normal');
            
        } else if (IMC >= 25 && IMC < 30) {
            clasificacion = "Sobrepeso";
            document.querySelector("#clasificacionValor").innerHTML = `<b style="color:#F6C231"> ${clasificacion} </b>`;
            destacarTarjeta('card-sobrepeso');
            
        } else if (IMC >= 30 && IMC < 35) {
            clasificacion = "Obesidad 1";
            document.querySelector("#clasificacionValor").innerHTML = `<b style="color:#E89B11"> ${clasificacion} </b>`;
            destacarTarjeta('card-ob1');
            
        } else if (IMC >= 35 && IMC < 40) {
            clasificacion = "Obesidad 2";
            document.querySelector("#clasificacionValor").innerHTML = `<b style="color:#EC5B0C"> ${clasificacion} </b>`;
            destacarTarjeta('card-ob2');
            
        } else {
            clasificacion = "Obesidad 3";
            document.querySelector("#clasificacionValor").innerHTML = `<b style="color:#E40613"> ${clasificacion} </b>`;
            destacarTarjeta('card-ob3');
        }

      

    }, 1000); 
}

function destacarTarjeta(idGanador) {
    const tarjetas = ['card-bajo', 'card-normal', 'card-sobrepeso', 'card-ob1', 'card-ob2', 'card-ob3'];

    tarjetas.forEach(id => {
        let elemento = document.getElementById(id);
        if (elemento) {
            elemento.style.opacity = "0.4";              
            elemento.style.border = "none";              
            elemento.style.transform = "scale(1)";        
        }
    });

    if (idGanador) {
        let elementoActivo = document.getElementById(idGanador);
        if (elementoActivo) {
            elementoActivo.style.opacity = "1";                    
            elementoActivo.style.border = "3px solid white";       
            elementoActivo.style.transform = "scale(1.05)";        
        }
    }
}

const reset = () => {
    document.querySelector("#peso").value = 1;
    document.querySelector("#altura").value = 1;
    document.querySelector("#pesoValor").innerHTML = 1;
    document.querySelector("#alturaValor").innerHTML = 1;
    document.querySelector("#imcValor").innerHTML = 0;
    document.querySelector("#clasificacionValor").innerHTML = "";
    
    destacarTarjeta(null);
}
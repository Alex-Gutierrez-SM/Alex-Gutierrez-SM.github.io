'use strict'
console.log('Empieza el programa');

// Se crea la clase Comida y el objeto.
class Comida {
  constructor(nombreComida){
    this.nombreComida = nombreComida;
  }
}

// Array para añadir las comidas.
var comidas = new Array();

//  Añade los valores y crea los objetos necesarios.
function aniadirComidasInicialesArray () {
  let arrayComidas = new Array();
  arrayComidas.push("Spaguetti Carbonara");
  arrayComidas.push("Filete con Patatas");
  arrayComidas.push("Lomo a la Pimienta");
  arrayComidas.push("Arroz a la Cubana");
  arrayComidas.push("Longaniza al Vino");
  arrayComidas.push("Entrecot");
  arrayComidas.push("Arroz con Pollo Korma");
  arrayComidas.push("Gallo Rebozado");
  arrayComidas.push("Merluza Rebozada");
  arrayComidas.push("Salmón");
  arrayComidas.push("Arroz con Almejas");
  arrayComidas.push("Pollo Teriyaki");
  arrayComidas.push("Pollo Asado");
  arrayComidas.push("Carrilleras");
  arrayComidas.push("Cocretas");
  arrayComidas.push("Revuelto de Morcilla");
  arrayComidas.push("Anchoas Rebozadas");
  arrayComidas.push("Enchiladas");
  arrayComidas.push("Ensalada Montañesa");
  arrayComidas.push("Ensaladilla");
  arrayComidas.push("Pasta al Ajillo");
  arrayComidas.push("Ensalada Pasta");
  arrayComidas.push("Costilla");
  arrayComidas.push("Tacos");
  arrayComidas.push("Coliflor Rebozada");
  arrayComidas.push("Solomillo Cerdo al horno");
  arrayComidas.push("Solomillo Wellington");
  arrayComidas.push("Pollo Parmesano");
  arrayComidas.push("Albóndigas");
  arrayComidas.push("Chipirones en su Tinta");
  let i = 0;
  while (i < arrayComidas.length) {
    comidas[i] = new Comida(arrayComidas[i]);
    i++;
  }
}

// Se randomiza la comida seleccionada y se utiliza Object.values para formatear el objeto.
function randomize() {
  var rngComida = Math.floor(Math.random() * (comidas.length));
  document.getElementById('resultadoComida').innerHTML = "Resultado: " + Object.values(comidas[rngComida]);
}

//Función que llama a la api de openweathermap y formatea los datos.
async function requestWeather() {

  //Api key, longitud y latitud de las ciudades a consultar en la api de openweathermap.
  const apiKey = '46cbd145a5dedd8da3b124daa9695fd1';
  const latCiudad = [42.85, 43.1151, 43.3829, 41.1833];
  const lonCiudad = [-2.6667, -2.4175, -3.2204, 1.4667];

  for(var i = 0; i<4; i++){
    let response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latCiudad[i]}&lon=${lonCiudad[i]}&exclude=hourly,minutely&appid=46cbd145a5dedd8da3b124daa9695fd1`);
    let users = await response.json();

    for(var j = 0; j<3; j++){
      if(j == 0){
        let temperatura = (Number(users.current.temp)-273.15).toFixed(0);
        document.getElementById("lugar" + (i+1) + "Dia" + (j+1)).innerHTML = temperatura + "ºC";
      }else{
        let temperaturaMin = (Number(users.daily[j-1].temp.min)-273.15).toFixed(0);
        let temperaturaMax = (Number(users.daily[j-1].temp.max)-273.15).toFixed(0);
        document.getElementById("lugar" + (i+1) + "Dia" + (j+1) + "Max").innerHTML = temperaturaMax + "ºC";
        document.getElementById("lugar" + (i+1) + "Dia"+ (j+1) + "Min").innerHTML = temperaturaMin + "ºC";
      }
    }
  }
}

// |------------------- MAIN ------------------------|
// Añadimos las comidas iniciales cuando empieza el programa.
aniadirComidasInicialesArray();
requestWeather();

console.log('Acaba el programa');
'use strict'
console.log('Empieza el programa');

//Función que recoge el valor introducido por el usuario, lo busca en la api y lo formatea en caso de encontrarlo.
async function cargarPokemon(){
    try{
        let pkmnSeleccionado = document.getElementById('nombrePokemon').value;
        //  const res = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
        const res = await fetch("https://pokeapi.co/api/v2/pokemon/"+pkmnSeleccionado.toLowerCase());
        const data = await res.json();

        //Borramos los estilos y texto de error y escribimos los valores del Pokémon elegido.
        document.getElementById("textoError").innerHTML = "";
        document.getElementById("contenedorError").style.cssText = "";

        document.getElementById("idNombrePokemon").innerHTML = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        document.getElementById("idImagenPokemon").src = data["sprites"]["other"]["official-artwork"]["front_default"];
        document.getElementById("idPesoPokemon").innerHTML = data.weight/10+"  kg";

        //CSS dado aquí para no interferir con el maquetado inicial de la web previo a la búsqueda del usuario.
        document.getElementById("pokemonCard").style.cssText = "background-color: white;border: 2px solid #000000;";
    }catch(error){
        //Borramos los elementos asociados al Pokémon antes del mensaje de error.
        document.getElementById("idNombrePokemon").innerHTML = "";
        document.getElementById("idImagenPokemon").src = "";
        document.getElementById("idPesoPokemon").innerHTML = "";
        document.getElementById("pokemonCard").style.cssText = "";

        //Mensaje de error y maquetado CSS dado desde JavaScript para no interferir con las diferentes búsquedas.
        document.getElementById("contenedorError").style.cssText = "background-color: red;border: 2px solid #000000;";
        document.getElementById("textoError").innerHTML = "Pokémon erróneo, ¡asegúrate de escribirlo bien!"
        console.log("Error detectado")
        console.log(error);
    }
}

// |------------------- MAIN ------------------------|
// cargarPokemon();
console.log('Acaba el programa');
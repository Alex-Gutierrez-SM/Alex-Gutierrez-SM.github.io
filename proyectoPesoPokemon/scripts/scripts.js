'use strict'
console.log('Empieza el programa');

//Función que recoge el valor introducido por el usuario, lo busca en la api y lo formatea en caso de encontrarlo.
async function cargarPokemon(){
    try{
        //Carga el loader mientras realiza el fetch.
        document.getElementById("loaderBusqueda").style.display = "block";

        //Esconde el contenedor de error y la foto de Ash antes de mostrar la carta pokémon.
        document.getElementById("contenedorErrorWrapper").style.display = "none";
        document.getElementById("fotoAsh").style.display = "none";
        let pkmnSeleccionado = document.getElementById('nombrePokemon').value;
        const res = await fetch("https://pokeapi.co/api/v2/pokemon/"+pkmnSeleccionado.toLowerCase());
        const data = await res.json();

        //Pasa los datos y da forma a la carta pokémon.
        document.getElementById("idNombrePokemon").innerHTML = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        document.getElementById("idPesoPokemon").innerHTML = data.weight/10+"  kg";
        document.getElementById("fotoCarta").src = data.sprites.other['official-artwork'].front_default;
        document.getElementById("fotoCarta").classList.add("fotoCarta");

        //Búsqueda de tipo y cambio de color del fondo de la carta en función del mismo.
        let type = data.types[0].type.name;
        const resTipos = await fetch("ajax/tiposPokemon.json");
        const dataTipos = await resTipos.json();

        var i = 0;
        let dataTiposLen = dataTipos.length;
        for(i; i < dataTiposLen; i++){
            if(type == dataTipos[i].tipo){
                document.getElementById("pesoCarta").style.background = dataTipos[i].color;
            }
        }
        //Muestra la carta al tener todos los datos disponibles.
        document.getElementById("contenedorCartaPokemon").style.display = "block";
    }catch(error){
        //Esconde la carta pokemon antes de mostrar el mensaje de error, además de volver a mostrar la foto de Ash.
        document.getElementById("contenedorCartaPokemon").style.display = "none";
        document.getElementById("fotoAsh").style.display = "none";

        //Muestra el contenedor de error.
        document.getElementById("contenedorErrorWrapper").style.display = "block";
        console.log("Error detectado")
        console.log(error);
    }
    //Borra el loader al terminar el fetch.
    document.getElementById("loaderBusqueda").style.display = "none";
}

// |------------------- MAIN ------------------------|
console.log('Acaba el programa');
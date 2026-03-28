
async function loadPokemon(){
    let url = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
    let response = await fetch(url);    
    let responseAsJson = await response.json();
    let pokemonList = responseAsJson.results;
    
    for (let i = 0; i < pokemonList.length; i++) {
        const element = pokemonList[i];
        await renderSinglePokemon(element.url);     
     }
}

async function renderSinglePokemon(url){
    let responseDetail = await fetch(url);
    let pokemonDetail = await responseDetail.json();
    let pokemonCardHtml = getPokemonCardTemplate(pokemonDetail.name, pokemonDetail.id, pokemonDetail.sprites.front_default, pokemonDetail.types[0].type.name);
    document.getElementById('pokedex').innerHTML += pokemonCardHtml;
    console.log(pokemonDetail);
}

loadPokemon();
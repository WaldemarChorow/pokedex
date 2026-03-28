
async function loadPokemon(){
    let url = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
    let response = await fetch(url);    
    let responseAsJson = await response.json();
    let pokemonList = responseAsJson.results;
    
    for (let i = 0; i < pokemonList.length; i++) {
        const element = pokemonList[i];
        let responseDetail = await fetch(element.url);
        let pokemonDetail = await responseDetail.json();
        let pokemonCardHtml = getPokemonCardTemplate(pokemonDetail.name, pokemonDetail.id, pokemonDetail.sprites.front_default);
        document.getElementById('pokedex').innerHTML += pokemonCardHtml;
        
    }
}
loadPokemon();


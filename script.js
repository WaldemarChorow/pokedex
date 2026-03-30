
let currentOffset = 0;

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function loadPokemon(){
    document.getElementById('loading-screen').classList.remove('d-none');
    let url = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${currentOffset}`;
    let response = await fetch(url);    
    let responseAsJson = await response.json();
    let pokemonList = responseAsJson.results;
    
    for (let i = 0; i < pokemonList.length; i++) {
        const element = pokemonList[i];
        await renderSinglePokemon(element.url);     
     }
     await timeout(1000);
     document.getElementById('loading-screen').classList.add('d-none');
}

async function renderSinglePokemon(url){
    let responseDetail = await fetch(url);
    let pokemonDetail = await responseDetail.json();    
    let type1 = pokemonDetail.types[0].type.name;
    let type2 = "";
    if (pokemonDetail.types.length > 1) {
        type2 = pokemonDetail.types[1].type.name;
    }
    let pokemonCardHtml = getPokemonCardTemplate(pokemonDetail.name, pokemonDetail.id, pokemonDetail.sprites.front_default, type1, type2);
    document.getElementById('pokedex').innerHTML += pokemonCardHtml;
    console.log(pokemonDetail);
}

loadPokemon();

function loadMorePokemon(){
    currentOffset += 20;
    loadPokemon();
}

 async function openOverlay(id){
    document.getElementById('overlay').classList.remove('d-none')
    let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    let response = await fetch(url);    
    let pokemonDetail = await response.json();
    let type1 = pokemonDetail.types[0].type.name;
    let type2 = "";
    if (pokemonDetail.types.length > 1) {
        type2 = pokemonDetail.types[1].type.name;
    }
    document.getElementById('overlay-content').innerHTML = getPokemonBigCardTemplate(
    pokemonDetail.name, pokemonDetail.id, pokemonDetail.sprites.other['official-artwork'].front_default, type1, type2
    );   
}

function closeOverlay() {
    document.getElementById('overlay').classList.add('d-none');    
}

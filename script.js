
let currentOffset = 0;
let currentPokemonId = 1;

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function loadPokemons(){
    document.getElementById('loading-screen').classList.remove('d-none');
    const pokemonList = await fetchPokemons();
    for (let i = 0; i < pokemonList.length; i++) {
        const element = pokemonList[i];
        await renderSinglePokemon(element.url);     
     }
     await timeout(1000);
     document.getElementById('loading-screen').classList.add('d-none');
}

async function fetchPokemons(){
    let url = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${currentOffset}`;
    let response = await fetch(url);    
    let responseAsJson = await response.json();
    return responseAsJson.results;
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

loadPokemons();

function loadMorePokemons(){
    currentOffset += 20;
    loadPokemons();
}

async function fetchPokemonData(id){
    let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    let response = await fetch(url);     
    let pokemonDetail = await response.json();
    return pokemonDetail;
}

function preparePokemonData(pokemonDetail){
   
    return {name:pokemonDetail.name,
            id:pokemonDetail.id, 
            url:pokemonDetail.sprites.other['official-artwork'].front_default, 
            types:pokemonDetail.types,
            height:pokemonDetail.height, 
            weight:pokemonDetail.weight,
            moves:pokemonDetail.moves,
            stats:pokemonDetail.stats
        }
}

 async function openOverlay(id){
    currentPokemonId = id; 
    document.getElementById('overlay').classList.remove('d-none')
    document.body.classList.add('no-scroll');
    const pokemonData = await fetchPokemonData(id);
    const preparedPokemonData = preparePokemonData(pokemonData);
    document.getElementById('overlay-content').innerHTML = getPokemonBigCardTemplate(
    preparedPokemonData);
    updateNavigationButtons();   
}

function closeOverlay() {
    document.getElementById('overlay').classList.add('d-none');
    document.body.classList.remove('no-scroll');
}

function nextPokemon(event) {
    event.stopPropagation();
    openOverlay(currentPokemonId + 1);
}

function previousPokemon(event) {
    event.stopPropagation();
    if (currentPokemonId > 1) {
        openOverlay(currentPokemonId - 1);
    }
}

function updateNavigationButtons() {
    if (currentPokemonId === 1) {
        document.getElementById('btn-prev').classList.add('d-none');
    } else {
        document.getElementById('btn-prev').classList.remove('d-none');
    }
}

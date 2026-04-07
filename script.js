
let currentOffset = 0;
let currentPokemonId = 1;
let allPokemonList = [];
let renderedPokemonIds = [];

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
    renderedPokemonIds.push(pokemonDetail.id);    
    let type1 = pokemonDetail.types[0].type.name;
    let type2 = "";
    if (pokemonDetail.types.length > 1) {
        type2 = pokemonDetail.types[1].type.name;
    }
    let pokemonCardHtml = getPokemonCardTemplate(pokemonDetail.name, pokemonDetail.id, pokemonDetail.sprites.front_default, type1, type2);
    document.getElementById('pokedex').innerHTML += pokemonCardHtml;
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

function updateNavigationButtons() {
    let currentIndex = renderedPokemonIds.indexOf(currentPokemonId);
    
    if (currentIndex === 0) {
        document.getElementById('btn-prev').classList.add('d-none');
    } else {
        document.getElementById('btn-prev').classList.remove('d-none');
    }

    if (currentIndex === renderedPokemonIds.length - 1) {
        document.getElementById('btn-next').classList.add('d-none');
    } else {
        document.getElementById('btn-next').classList.remove('d-none');
    }
}

function nextPokemon(event) {
    event.stopPropagation();
    let currentIndex = renderedPokemonIds.indexOf(currentPokemonId);
    
    if (currentIndex < renderedPokemonIds.length - 1) {
        let nextId = renderedPokemonIds[currentIndex + 1];
        openOverlay(nextId);
    }
}

function previousPokemon(event) {
    event.stopPropagation();
    let currentIndex = renderedPokemonIds.indexOf(currentPokemonId);
    
    if (currentIndex > 0) {
        let prevId = renderedPokemonIds[currentIndex - 1];
        openOverlay(prevId);
    }
}

async function searchPokemon() {
    let searchInput = document.getElementById('searchField').value.toLowerCase();
    
    if (searchInput.length < 3) {
        resetSearchField("Min. 3 letters!");
        return;
    }
    
    document.getElementById('btn-load-more').classList.add('d-none');
    document.getElementById('btn-back').classList.remove('d-none');

    let pokemonList = await fetchAllPokemonForSearch();
    let filteredPokemon = pokemonList.filter(pokemon => pokemon.name.startsWith(searchInput));
    
    if (filteredPokemon.length === 0) {
        await displaySearchError();
    } else {
        await renderSearchResults(filteredPokemon);
    }
}

async function fetchAllPokemonForSearch() {
    if (allPokemonList.length === 0) {
        let urlAllPokemon = `https://pokeapi.co/api/v2/pokemon?limit=1320&offset=0`;
        let responseAllPokemon = await fetch(urlAllPokemon);
        allPokemonList = (await responseAllPokemon.json()).results;
    }
    return allPokemonList;
}

async function renderSearchResults(pokemonArray) {
    document.getElementById('pokedex').innerHTML = ''; 
    renderedPokemonIds = [];
    for (let i = 0; i < pokemonArray.length; i++) {
        await renderSinglePokemon(pokemonArray[i].url);
    }
}

async function displaySearchError() {
    let searchScreen = document.getElementById('search-screen');
    
    searchScreen.classList.remove('d-none');
    document.body.classList.add('no-scroll');
    
    await timeout(3000); 
    
    searchScreen.classList.add('d-none');
    document.body.classList.remove('no-scroll');
    document.getElementById('searchField').value = "";
}

function resetSearchField(placeholderText) {
    let searchField = document.getElementById('searchField');
    searchField.value = "";
    searchField.placeholder = placeholderText;
}

function closeSearch() {
    document.getElementById('pokedex').innerHTML = '';
    renderedPokemonIds = [];
    document.getElementById('searchField').value = '';
    document.getElementById('searchField').placeholder = "Find the Pokemon....";
    
    currentOffset = 0;
    loadPokemons();

    document.getElementById('btn-back').classList.add('d-none');
    document.getElementById('btn-load-more').classList.remove('d-none');
}
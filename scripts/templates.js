function getPokemonCardTemplate(pokemonName, pokemonId, pokemonImage, pokemonType1, pokemonType2){
    return /*html*/`
        <div onclick="openOverlay(${pokemonId})" class="pokemonCard text-capitalize ${pokemonType1}">
            <h2>${pokemonName} #${pokemonId}</h2>
            <img src="${pokemonImage}" alt="" srcset="">
            <div>
                <h3>Types</h3>
                <p>${pokemonType1} ${pokemonType2}</p>
            </div>
        </div>
    `
}

function getPokemonBigCardTemplate(pokemonName, pokemonId, pokemonImage, type1, type2) {
    return /*html*/`
        <div class="bigPokemonCard text-capitalize ${type1}">
            <button class="close-btn" onclick="closeOverlay()">X</button>
            <h2>${pokemonName} #${pokemonId}</h2>
            <img src="${pokemonImage}" alt="pokemon">
            <p>Typen: ${type1} ${type2}</p>
        </div>
    `;
}
function getPokemonCardTemplate(pokemonName, pokemonId, pokemonImage, type1, type2) {
    return /*html*/`
        <div id="pokemon-card-${pokemonId}" onclick="openOverlay(${pokemonId})" class="pokemonCard ${type1}">
            <span class="card-id">#${pokemonId}</span>       
            <h2 class="card-name">${pokemonName}</h2>
            <div class="card-main-content">
                <div class="card-types">
                    <span class="type-badge">${type1}</span>
                    ${type2 ? `<span class="type-badge">${type2}</span>` : ''}
                </div>
                <div class="card-image-container">
                    <img src="${pokemonImage}" alt="${pokemonName}">
                </div>
            </div>
        </div>
    `;
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
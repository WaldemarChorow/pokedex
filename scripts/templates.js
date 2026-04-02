function getPokemonCardTemplate(pokemonName, pokemonId, pokemonImage, type1, type2) {
    return /*html*/`
        <div id="pokemon-card-${pokemonId}" onclick="openOverlay(${pokemonId})" class="pokemonCard ${type1}">
            <div class="pokemonCardInsert">
                <span class="card-id">#${pokemonId}</span>       
                <h2 class="card-name">${pokemonName}</h2>
                <div class="card-main-content">
                    <div class="card-types">
                        <span class="type-badge ${type1}">${type1}</span>
                        ${type2 ? `<span class="type-badge ${type2}">${type2}</span>` : ''}
                    </div>
                    <div class="card-image-container">
                        <img src="${pokemonImage}" alt="${pokemonName}">
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getPokemonBigCardTemplate(pokemonData) {
    const {
        name, id, url, types, height, weight, moves, stats
    } = pokemonData;

    return /*html*/`
        <div class="bigPokemonCard text-capitalize ${types[0].type.name}">
            <div class="bigPokemonCardContent">
                <div class="bigPokemonCardHead">
                    <h2>#${id}</h2>
                    <button class="close-btn" onclick="closeOverlay()">X</button>
                </div>
                <div class="bigPokemonCardNameHP">
                    <h2>${name}</h2>
                    <h2>${stats[0].base_stat}HP</h2>
                </div>
                 <div class="pokemonImageOverlayCard">
                        <img src="${url}" alt="pokemon">
                </div>
                <div class="pokemonBigCardSize">
                    <p>${types[0].type.name} Pokémon. Height: ${height}"</p>
                    <p>Weight: ${weight} lbs.</p>
                </div>
                <div class="pokemonBigCardAttacks">
                    <h3>Attack: <br> <span>${moves[0].move.name} | ${moves[1].move.name} | ${moves[2].move.name}</span></h3>
                </div>
                <div class="line"></div>
                <div class="pokemonBigCardStats">
                    <h3>Stats: <br> <span>${stats[1].stat.name}: ${stats[1].base_stat} | ${stats[2].stat.name}: ${stats[2].base_stat} | ${stats[5].stat.name}: ${stats[5].base_stat}</span></h3>
                </div>
                <div class="line"></div>
                <div class="pokemonBigCardTypes">
                    <button id="btn-prev" class="nav-btn" onclick="previousPokemon(event)"><</button>
                    <span class="type-badge ${types[0].type.name}">${types[0].type.name}</span>
                    ${types[1] ? `<span class="type-badge  ${types[1].type.name}">${types[1].type.name}</span>` : ''}
                    <button id="btn-next" class="nav-btn" onclick="nextPokemon(event)">></button>
                </div>
            </div>
        </div>
    `;
}
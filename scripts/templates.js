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

function getPokemonBigCardTemplate(pokemonName, pokemonId, pokemonImage, type1, type2, pokemonHP, 
    pokemonHeight, pokemonWeight, pokemonAttack1, pokemonAttack2, pokemonAttack3, pokemonStatAttackName, 
    pokemonStatAttackValue, pokemonStatDefenceName, pokemonStatDefenceValue, pokemonStatSpeedName, pokemonStatSpeedValue) {
    return /*html*/`
        <div class="bigPokemonCard text-capitalize ${type1}">
            <div class="bigPokemonCardContent">
                <div class="bigPokemonCardHead">
                    <h2>#${pokemonId}</h2>
                    <button class="close-btn" onclick="closeOverlay()">X</button>
                </div>
                <div class="bigPokemonCardNameHP">
                    <h2>${pokemonName}</h2>
                    <h2>${pokemonHP}HP</h2>
                </div>
                 <div class="pokemonImageOverlayCard">
                        <img src="${pokemonImage}" alt="pokemon">
                </div>
                <div class="pokemonBigCardSize">
                    <p>${type1} Pokémon. Height: ${pokemonHeight}"</p>
                    <p>Weight: ${pokemonWeight} lbs.</p>
                </div>
                <div class="pokemonBigCardAttacks">
                    <h3>Attack: <br> ${pokemonAttack1} | ${pokemonAttack2} | ${pokemonAttack3}</h3>
                </div>
                <div class="line"></div>
                <div class="pokemonBigCardStats">
                    <h3>Stats: ${pokemonStatAttackName}: ${pokemonStatAttackValue} | ${pokemonStatDefenceName}: ${pokemonStatDefenceValue} | ${pokemonStatSpeedName}: ${pokemonStatSpeedValue}</h3>
                </div>
                <div class="line"></div>
            </div>
            <p>${type1} ${type2}</p>
        </div>
    `;
}
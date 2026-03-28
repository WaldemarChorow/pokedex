function getPokemonCardTemplate(pokemonName, pokemonId, pokemonImage){
    return /*html*/`
        <div>
            <h2>${pokemonName} #${pokemonId}</h2>
            <img src="${pokemonImage}" alt="" srcset="">
        </div>
    `
}
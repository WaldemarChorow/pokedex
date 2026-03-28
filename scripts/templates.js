function getPokemonCardTemplate(pokemonName, pokemonId, pokemonImage, pokemonType1){
    return /*html*/`
        <div class="pokemonCard text-capitalize ${pokemonType1}">
            <h1>${pokemonName} #${pokemonId}</h1>
            <img src="${pokemonImage}" alt="" srcset="">
            <div>
                <h2>Types</h2>
                <p>${pokemonType1}</p>
            </div>
        </div>
    `
}
const pokemonList = document.getElementById('pokemonList')

const limit = 1
 let offset = 0; //o numero 0 representa o pokemon 1 e assim por diante

function convertPokemonToLi(pokemon) {
    return `
   <div class="card">
        <div class="card-header ${pokemon.type}">
            <span class="number" id="number">#${pokemon.number}</span>         
            <h1 id="name">${pokemon.name}</h1> 
            <div class="types" id="types">${pokemon.types.map((type) => `<li class="type">${type}</li>`).join('')}</div> 
        </div>
        <img id="pokemon-img" class="pokemon-img" src="${pokemon.photo}"
                     alt="${pokemon.name}">
        <div class="card-body">
            <div class="section">
                <h2 class=" ${pokemon.type1}">About</h2>
                <p><strong>Species:</strong> <span id="species">${pokemon.species}</span></p> 
                <p><strong>Height:</strong> <span id="height">${pokemon.height}</span></p> 
                <p><strong>Weight:</strong> <span id="weight">${pokemon.weight}</span></p> 
                <p><strong>Abilities:</strong> <span id="abilities">${pokemon.abilities}</span></p> 
            </div>
            <div class="section">
                <h2 class=" ${pokemon.type1}">Breeding</h2>
                <p><strong>Gender:</strong> <span id="gender">${pokemon.gender}</span></p> 
                <p><strong>Egg Groups:</strong> <span id="egg-groups">${pokemon.eggGroups}</span></p> 
                <p><strong>Egg Cycle:</strong> <span id="egg-cycle">${pokemon.eggCycle}</span></p> 
            </div>
        </div>
    </div>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)
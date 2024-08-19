const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail, speciesData) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;
    pokemon.types = types;
    pokemon.type = type;
    pokemon.type1 = type + "C";
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;
    pokemon.species = pokeDetail.species.name;
    pokemon.height = (pokeDetail.height / 10) + " cm";
    pokemon.weight = (pokeDetail.weight / 10) + " kg";
    pokemon.abilities = pokeDetail.abilities.map(ability => (ability.ability.name)).join(", ");
    pokemon.gender = speciesData.gender_rate === -1
        ? 'Genderless'
        : `${100 - (speciesData.gender_rate / 8) * 100}% M / ${(speciesData.gender_rate / 8) * 100}% F`;
    pokemon.eggGroups = speciesData.egg_groups.map(group => group.name).join(', ');
    pokemon.eggCycle = speciesData.hatch_counter + ' cycles';
    return pokemon;
}

pokeApi.getPokemonByNumber = (pokeNumber) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeNumber}`;
    
    return fetch(url)
        .then(response => response.json())
        .then(pokeDetail => {
            return fetch(pokeDetail.species.url)
                .then(response => response.json())
                .then(speciesData => convertPokeApiDetailToPokemon(pokeDetail, speciesData));
        });
};
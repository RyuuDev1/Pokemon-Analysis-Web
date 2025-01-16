document.getElementById('analyzeButton').addEventListener('click', function() {
    const pokemonName = document.getElementById('pokemonName').value.toLowerCase();
    fetchPokemon(pokemonName);
});

function fetchPokemon(name) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(response => response.json())
        .then(data => {
            displayPokemonInfo(data);
        })
        .catch(error => {
            document.getElementById('pokemonDetails').innerHTML = '<p>Pokémon not found .</p>';
        });
}

function displayPokemonInfo(pokemon) {
    const detailsDiv = document.getElementById('pokemonDetails');
    let html = `
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="pokemon-image">
        <div class="pokemon-info">
            <h3>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
            <p><strong>Types:</strong> ${pokemon.types.map(type => type.type.name).join(', ')}</p>
            <p><strong>Attack:</strong> ${pokemon.stats.find(stat => stat.stat.name === 'attack').base_stat}</p>
            <p><strong>Defense:</strong> ${pokemon.stats.find(stat => stat.stat.name === 'defense').base_stat}</p>
            <p><strong>HP:</strong> ${pokemon.stats.find(stat => stat.stat.name === 'hp').base_stat}</p>
            <p><strong>Speed:</strong> ${pokemon.stats.find(stat => stat.stat.name === 'speed').base_stat}</p>
            <p><strong>Special Attack:</strong> ${pokemon.stats.find(stat => stat.stat.name === 'special-attack').base_stat}</p>
            <p><strong>Special Defense:</strong> ${pokemon.stats.find(stat => stat.stat.name === 'special-defense').base_stat}</p>
            <p><strong>Weaknesses:</strong> 
            ${pokemon.types.map(type => {
                const weaknesses = getWeaknesses(type.type.name);
                return weaknesses.join(', ');
            }).join(', ')}</p>
        </div>`;
    detailsDiv.innerHTML = html;
}

function getWeaknesses(type) {
    const typeWeaknesses = {
        'normal': ['fighting'],
        'fire': ['water', 'ground', 'rock'],
        'water': ['electric', 'grass'], 'electric': ['ground'], 'grass': ['fire', 'ice', 'poison', 'flying', 'bug'], 'ice': ['fire', 'fighting', 'rock', 'steel'], 'fighting': ['flying', 'psychic', 'fairy'], 'poison': ['ground', 'psychic'], 'ground': ['water', 'grass', 'ice'], 'flying': ['electric', 'ice', 'rock'], 'psychic': ['bug', 'ghost', 'dark'], 'bug': ['flying', 'rock', 'fire'], 'rock': ['water', 'grass', 'fighting', 'ground', 'steel'], 'ghost': ['ghost', 'dark'], 'dragon': ['ice', 'dragon', 'fairy'], 'dark': ['fighting', 'bug', 'fairy'], 'steel': ['fire', 'fighting', 'ground'], 'fairy': ['poison', 'steel']
        // Add all types here with their weaknesses
    };
    return typeWeaknesses[type] || [];
}

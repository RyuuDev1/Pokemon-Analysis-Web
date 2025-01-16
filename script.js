// Constants for DOM elements
const analyzeButton = document.getElementById('analyzeButton');
const pokemonNameInput = document.getElementById('pokemonName');
const pokemonDetails = document.getElementById('pokemonDetails');

// Event listener for the analyze button
analyzeButton.addEventListener('click', fetchPokemon);

// Fetch Pokémon data from the API
function fetchPokemon() {
    const pokemonName = pokemonNameInput.value.toLowerCase();
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => response.json())
        .then(displayPokemonInfo)
        .catch(() => displayError());
}

// Display Pokémon information
function displayPokemonInfo(pokemon) {
    const stats = {
        'attack': 'Attack',
        'defense': 'Defense',
        'hp': 'HP',
        'speed': 'Speed',
        'special-attack': 'Special Attack',
        'special-defense': 'Special Defense'
    };

    const pokemonInfo = `
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="pokemon-image">
        <div class="pokemon-info">
            <h3>${capitalizeFirstLetter(pokemon.name)}</h3>
            <p><strong>Types:</strong> ${pokemon.types.map(type => type.type.name).join(', ')}</p>
            ${Object.entries(stats).map(([statKey, statName]) => 
                `<p><strong>${statName}:</strong> ${getStatValue(pokemon.stats, statKey)}</p>`
            ).join('')}
            <p><strong>Weaknesses:</strong> ${getWeaknesses(pokemon.types)}</p>
        </div>`;

    pokemonDetails.innerHTML = pokemonInfo;
}

// Helper function to get a specific stat value
function getStatValue(stats, statName) {
    const stat = stats.find(stat => stat.stat.name === statName);
    return stat ? stat.base_stat : 'N/A';
}

// Helper function to get weaknesses based on Pokémon types
function getWeaknesses(types) {
    return types.map(type => 
        PokemonWeaknesses[type.type.name].join(', ')
    ).join(', ');
}

// Capitalize the first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Display error message when Pokémon is not found
function displayError() {
    pokemonDetails.innerHTML = '<p>Pokémon not found.</p>';
}

// Pokémon type weaknesses - this could be moved to a separate file for better organization
const PokemonWeaknesses = {
    'normal': ['fighting'],
    'fire': ['water', 'ground', 'rock'],
    'water': ['electric', 'grass'],
    'electric': ['ground'],
    'grass': ['fire', 'ice', 'poison', 'flying', 'bug'],
    'ice': ['fire', 'fighting', 'rock', 'steel'],
    'fighting': ['flying', 'psychic', 'fairy'],
    'poison': ['ground', 'psychic'],
    'ground': ['water', 'grass', 'ice'],
    'flying': ['electric', 'ice', 'rock'],
    'psychic': ['bug', 'ghost', 'dark'],
    'bug': ['flying', 'rock', 'fire'],
    'rock': ['water', 'grass', 'fighting', 'ground', 'steel'],
    'ghost': ['ghost', 'dark'],
    'dragon': ['ice', 'dragon', 'fairy'],
    'dark': ['fighting', 'bug', 'fairy'],
    'steel': ['fire', 'fighting', 'ground'],
    'fairy': ['poison', 'steel']
};

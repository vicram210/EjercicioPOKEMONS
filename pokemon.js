document.addEventListener("DOMContentLoaded", function() {
    const apiUrl = "https://pokeapi.co/api/v2/pokemon";
    let offset = 0;
    const pokemonListBody = document.getElementById("pokemon-list");

    function fetchPokemonList() {
        fetch(`${apiUrl}?offset=${offset}&limit=20`)
            .then(response => response.json())
            .then(data => {
                pokemonListBody.innerHTML = ""; // Limpiar lista anterior
                data.results.forEach((pokemon, index) => {
                    const pokemonId = offset + index + 1;
                    const row = `<tr><td>${pokemonId}</td><td>${pokemon.name}</td></tr>`;
                    pokemonListBody.insertAdjacentHTML("beforeend", row);
                });
            })
            .catch(error => console.error("Error al obtener la lista de Pokémon:", error));
    }

    fetchPokemonList();

    document.getElementById("atr-btn").addEventListener("click", () => {
        if (offset >= 20) {
            offset -= 20;
            fetchPokemonList();
        }
    });

    document.getElementById("sig-btn").addEventListener("click", () => {
        offset += 20;
        fetchPokemonList();
    });

    pokemonListBody.addEventListener("click", event => {
        const row = event.target.closest("tr");
        if (row) {
            const pokemonId = parseInt(row.children[0].textContent);
            fetch(`${apiUrl}/${pokemonId}`)
                .then(response => response.json())
                .then(data => {
                    const pokemonInfo = `
                        <h2>${data.name}</h2>
                        <img src="${data.sprites.front_default}" alt="${data.name}">
                        <p>Height: ${data.height}</p>
                        <p>Weight: ${data.weight}</p>
                    `;
                    document.getElementById("pokemon-info").innerHTML = pokemonInfo;
                })
                .catch(error => console.error("Error al obtener la información del Pokemon:", error));
        }
    });
});

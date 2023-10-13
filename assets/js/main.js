const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const modal = document.querySelector("dialog");
const button = document.querySelector("button");

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onClick=openDialog(${pokemon.number})>
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                
                <img src="${pokemon.photo}"
                        alt ="${pokemon.name}">
            </div>
        </li>      
    `
}

function convertPokemonDetailToDialog(pokemon) {
    return `
        <h1>${pokemon.name}</h1>
        <a>#${pokemon.number}</a>
        <p>Peso: ${pokemon.weight}</p>
        <p>Altura: ${pokemon.height}</p>
        <p>Experiência: ${pokemon.base_experience}</p>

        <div class="detail">
            <h3>Tipo do pokémon</h3>
            <ul class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ul>

            <h3>Habilidades</h3>
            <ul>
                ${pokemon.abilities.map((ability) => `<li class="ability ${ability}">${ability}</li>`).join('')}
            </ul>
        </div>

        <img src="${pokemon.photo}"
        alt ="${pokemon.name}">

        <button onclick="closeDialog()">Voltar</button>
    `
}


function openDialog(pokemonId) {

    pokeApi.getPokemon(pokemonId).then((pokemon) => {

        modal.innerHTML = convertPokemonDetailToDialog(pokemon)
    });

    modal.showModal();
}

function closeDialog() {
    modal.close();
}

function loadPokemonItens(offset, limit) {

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {

        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

showDetail.addEventListener('click', () => {
    modal.showModal()
})
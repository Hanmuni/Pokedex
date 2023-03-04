let allPokemons = [];
let currentPokemonNumber = 0;
let nextPokemonNumber = 25;

async function start() {
    await loadAPI();
    document.getElementById('loading').classList.add('d-none');
    loadPokemonList();
}

async function loadAPI() {
    for (let i = 1; i <= 898; i++) {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        let responseAsJson = await response.json();
        allPokemons.push(responseAsJson);
    }
}

function loadPokemonList() {
    for (let i = currentPokemonNumber; i < nextPokemonNumber; i++) {
        document.getElementById('pokemon').innerHTML += generatePokemonList(i);
    }
    document.getElementById('load-more-btn').classList.remove('d-none');
}

function generatePokemonList(i) {
    return `
    <div class="div-inner">
    <img class="pokemon-img" src="${allPokemons[i]['sprites']['other']['home']['front_default']}">
    <div class="pokemon-name">
    <div class="number"> #${allPokemons[i]['id']}</div> 
    <div class="name"> ${allPokemons[i]['name']} </div> 
    </div>
    <button class="open-btn" onclick="openPokemonCard(${i})"></button>
    </div>
    `;
}

function loadMorePokemons() {

    if (nextPokemonNumber <= 898) {
        currentPokemonNumber += 25;
        nextPokemonNumber += 25;
        loadPokemonList();
    } else {
        document.getElementById('all-loaded').classList.remove('d-none');
        document.getElementById('load-more-btn').classList.add('d-none');
    }
}

function searchPokemon() {
    let search = document.getElementById('searchfield').value.toLowerCase();

    document.getElementById('pokemon').innerHTML = '';

    for (let i = 0; i < allPokemons.length; i++) {
        if (allPokemons[i]['name'].toLowerCase().includes(search)) {
            document.getElementById('pokemon').innerHTML += generatePokemonList(i);
            document.getElementById('pokemon').style = `justify-content: center;`;
            document.getElementById('load-more-btn').classList.add('d-none');
        } else {
            document.getElementById('not-found').classList.remove('d-none');
            document.getElementById('load-more-btn').classList.add('d-none');
        }
    }
    document.getElementById('searchfield').value = '';
    
}

function returnToPokedex() {
    document.getElementById('not-found').classList.add('d-none');
    document.getElementById('pokemon').classList.remove('d-none');
    loadPokemonList();
}

function openPokemonCard(i) {
    document.getElementById('header').classList.add('d-none');
    document.getElementById('pokemon').classList.add('d-none');
    document.getElementById('card').classList.remove('d-none');
    document.getElementById('load-more-btn').classList.add('d-none');
    document.getElementById('card').innerHTML = generatePokemonCard(i);
    document.getElementById('all-loaded').classList.add('d-none');
    document.getElementById('not-found').classList.add('d-none');
    changeColor(i);
}

function generatePokemonCard(i) {
    return `
    <div class="card-inner" id="cardInner">
        <button class="close-btn" onclick="closeCard()"> </button>
    
        <img class="card-img" src="${allPokemons[i]['sprites']['other']['home']['front_default']}">
    
        <div class="card-pokemon-name" id="cardName"> ${allPokemons[i]['name']} </div>
    
        <div class="stats">
    
            <u> <b> Stats </b> </u> <br>
    
            HP:&nbsp; ${allPokemons[i]['stats'][0]['base_stat']}pt <br> <br>
            Attack:&nbsp; ${allPokemons[i]['stats'][1]['base_stat']}pt <br> <br>
            Defense:&nbsp; ${allPokemons[i]['stats'][1]['base_stat']}pt <br> <br>
            Speed:&nbsp; ${allPokemons[i]['stats'][5]['base_stat']}pt <br> <br>
    
            Type:&nbsp; ${allPokemons[i]['types'][0]['type']['name']}
        </div>
    
        <div class="swipe">
            <button class="left-btn" onclick="previousPokemon(${i})"></button>
            <button class="right-btn" onclick="nextPokemon(${i})"></button>
        </div>
        `;
}

function changeColor(i) {
    let pokemonType = allPokemons[i]['types'][0]['type']['name'];

    if (pokemonType == 'grass') {
        document.getElementById('cardInner').style = `background-color: #7DE2B4;`;
        document.getElementById('cardName').style = `background-color: #4C896D;`;
    }
    if (pokemonType == 'fire') {
        document.getElementById('cardInner').style = `background-color: #F5714B;`;
        document.getElementById('cardName').style = `background-color: #F7AD85;`;
    }
    if (pokemonType == 'dragon') {
        document.getElementById('cardInner').style = `background-color: #F5714B;`;
        document.getElementById('cardName').style = `background-color: #F7AD85;`;
    }
    if (pokemonType == 'water') {
        document.getElementById('cardInner').style = `background-color: #A2E8FB;`;
        document.getElementById('cardName').style = `background-color: #70B1FF;`;
    }
    if (pokemonType == 'ice') {
        document.getElementById('cardInner').style = `background-color: #A2E8FB;`;
        document.getElementById('cardName').style = `background-color: #70B1FF;`;
    }
    if (pokemonType == 'bug') {
        document.getElementById('cardInner').style = `background-color: #9B7844;`;
        document.getElementById('cardName').style = `background-color: #B79A6D;`;
    }
    if (pokemonType == 'ground') {
        document.getElementById('cardInner').style = `background-color: #9B7844;`;
        document.getElementById('cardName').style = `background-color: #B79A6D;`;
    }
    if (pokemonType == 'poison') {
        document.getElementById('cardInner').style = `background-color: #D71426;`;
        document.getElementById('cardName').style = `background-color: #F26160;`;
    }
    if (pokemonType == 'electric') {
        document.getElementById('cardInner').style = `background-color: #FFFF9F;`;
        document.getElementById('cardName').style = `background-color: #FED672;`;
    }
    if (pokemonType == 'fairy') {
        document.getElementById('cardInner').style = `background-color: #F746A0;`;
        document.getElementById('cardName').style = `background-color: #F6017D;`;
    }
    if (pokemonType == 'fighting') {
        document.getElementById('cardInner').style = `background-color: #5CD789;`;
        document.getElementById('cardName').style = `background-color: #009F83;`;
    }
    if (pokemonType == 'psychic') {
        document.getElementById('cardInner').style = `background-color: #003091;`;
        document.getElementById('cardName').style = `background-color: #05396B;`;
    }

    if (pokemonType == 'rock') {
        document.getElementById('cardInner').style = `background-color: #474866;`;
        document.getElementById('cardName').style = `background-color: #25274D;`;
    }
}

function previousPokemon(i) {
    i--;
    if (i < 0) {
        i = allPokemons.length - 1;
    }
    openPokemonCard(i);
}

function nextPokemon(i) {
    i++;
    if (i == allPokemons.length) {
        i = 0;
    }
    openPokemonCard(i);
}

function closeCard() {
    document.getElementById('header').classList.remove('d-none');
    document.getElementById('pokemon').classList.remove('d-none');
    document.getElementById('card').classList.add('d-none');
    document.getElementById('not-found').classList.remove('d-none');
}
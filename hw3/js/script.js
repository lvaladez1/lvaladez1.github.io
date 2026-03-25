// Defining a baseURL and key to as part of the request URL
const baseURL = 'https://rickandmortyapi.com/api/';

// Grab references to all the DOM elements you'll need to manipulate
const characterSearch = document.querySelector('#character-search');
const locationSearch = document.querySelector('#location-search');
const episodeSearch = document.querySelector('#episode-search');
const searchForm = document.querySelector('form');
const previousBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const resultsSection = document.querySelector('#results');
const section = document.querySelector('#section');
const endMessage = document.querySelector('#end');
const nav = document.querySelector('nav');
const episodeInput = document.querySelector('#episode-search');
const episodeMessage = document.querySelector('.episode-message');
const characterInput = document.querySelector('#character-search');
const locationInput = document.querySelector('#location-search');

// Hide the "Previous"/"Next" navigation to begin with, as we don't need it immediately
nav.style.display = 'none';
previousBtn.style.display = 'none';
nextBtn.style.display = 'none';

// define the initial page number and status of the navigation being displayed
let pageNumber = 1;

// Event listeners to control the functionality
nextBtn.addEventListener('click', nextPage);
previousBtn.addEventListener('click', previousPage);
searchForm.addEventListener('submit', submitSearch);

// When typing in character → clear others
characterInput.addEventListener('input', () => {
    locationInput.value = '';
    episodeInput.value = '';
});

// When typing in location → clear others
locationInput.addEventListener('input', () => {
    characterInput.value = '';
    episodeInput.value = '';
});

// When typing in episode → clear others
episodeInput.addEventListener('input', () => {
    characterInput.value = '';
    locationInput.value = '';
});

function submitSearch(e) {
    e.preventDefault();
    pageNumber = 1;
    fetchResults();
}

async function fetchResults() {
    let cSearch = characterSearch.value;
    let lSearch = locationSearch.value;
    let eSearch = episodeSearch.value.replaceAll(' ', '').toLowerCase();
    let url = baseURL;

    clearSection();
    endMessage.innerHTML = '';
    endMessage.classList.remove('controls');

    if (cSearch.length > 0) {
        url += `character?page=${pageNumber}&name=${cSearch}`;

        try {
            localStorage.setItem('searchURL', url);
            let response = await fetch(url);
            let data = await response.json();

            displayCharacterResults(data);
            updatePagination(data.info.pages);

        } catch (error) {
            console.log(`Error fetching results: ${error}`);
            endMessage.innerHTML = `No results for: ${cSearch}`;
            endMessage.classList.add('controls');
            clearSection();
            updatePagination(0);
        }

    } else if (lSearch.length > 0) {
        url += `location?page=${pageNumber}&name=${lSearch}`;

        try {
            localStorage.setItem('searchURL', url);
            let response = await fetch(url);
            let data = await response.json();

            displayLocationResults(data);
            updatePagination(data.info.pages);

        } catch (error) {
            console.log(`Error fetching results: ${error}`);
            endMessage.innerHTML = `No results for: ${lSearch}`;
            endMessage.classList.add('controls');
            clearSection();
            updatePagination(0);
        }

    } else if (eSearch === 'all') {
        url += `episode?page=${pageNumber}`;

        try {
            localStorage.setItem('searchURL', url);
            let response = await fetch(url);
            let data = await response.json();

            displayAllEpisodeResults(data);
            updatePagination(data.info.pages);

        } catch (error) {
            console.log(`Error fetching results: ${error}`);
            endMessage.innerHTML = `No results for: ${eSearch}`;
            endMessage.classList.add('controls');
            clearSection();
            updatePagination(0);
        }

    } else if (eSearch.length > 0) {
        url += `episode/${eSearch}`;

        try {
            localStorage.setItem('searchURL', url);
            let response = await fetch(url);
            let data = await response.json();

            displayEpisodeResults(data);
            updatePagination(0);

        } catch (error) {
            console.log(`Error fetching results: ${error}`);
            endMessage.innerHTML = `No results for: ${eSearch}`;
            endMessage.classList.add('controls');
            clearSection();
            updatePagination(0);
        }
    }
}

function displayCharacterResults(data) {
    const current = data.results;
    clearSection();

    for (let i = 0; i < current.length; i++) {
        const character = current[i];

        const card = document.createElement('div');

        const h2 = document.createElement('h2');
        h2.textContent = character.name;

        const img = document.createElement('img');
        img.src = character.image;
        img.alt = character.name;

        const pStatus = document.createElement('p');
        pStatus.textContent = `Status: ${character.status}`;

        const pSpecies = document.createElement('p');
        pSpecies.textContent = `Species: ${character.species}`;

        const pGender = document.createElement('p');
        pGender.textContent = `Gender: ${character.gender}`;

        const pLocation = document.createElement('p');
        pLocation.innerHTML = `Location: ${character.location.name}`;

        const pEpisode = document.createElement('p');
        pEpisode.innerHTML = `Episode: ${makeLinkList(character.episode)}`;

        card.append(h2, img, pStatus, pSpecies);

        if (character.type.length > 0) {
            const pType = document.createElement('p');
            pType.textContent = `Type: ${character.type}`;
            card.append(pType);
        }

        card.append(pGender, pLocation, pEpisode);
        card.classList.add('controls');
        section.append(card);
    }
}

function displayLocationResults(data) {
    const current = data.results;
    clearSection();

    for (let i = 0; i < current.length; i++) {
        const location = current[i];

        const card = document.createElement('div');

        const h2 = document.createElement('h2');
        h2.textContent = location.name;

        const pDimension = document.createElement('p');
        pDimension.textContent = `Dimension: ${location.dimension}`;

        const pType = document.createElement('p');
        pType.textContent = `Location: ${location.type}`;

        const pResident = document.createElement('p');
        pResident.innerHTML = `Residents: ${makeLinkList(location.residents)}`;

        card.append(h2, pDimension, pType, pResident);
        card.classList.add('controls');
        section.append(card);
    }
}

function displayAllEpisodeResults(data) {
    clearSection();
    displayEpisodeCards(data.results);
}

function displayEpisodeResults(data) {
    clearSection();

    if (Array.isArray(data)) {
        displayEpisodeCards(data);
    } else {
        displayEpisodeCards([data]);
    }
}

function displayEpisodeCards(episodes) {
    for (let i = 0; i < episodes.length; i++) {
        let episode = episodes[i];

        let card = document.createElement('div');

        let h2 = document.createElement('h2');
        h2.textContent = episode.name;

        let pEpisode = document.createElement('p');
        pEpisode.textContent = `Episode: ${episode.episode}`;

        let pAirDate = document.createElement('p');
        pAirDate.textContent = `Air Date: ${episode.air_date}`;

        let pCharacters = document.createElement('p');
        pCharacters.textContent = `Characters: ${makeNumberList(episode.characters)}`;

        card.append(h2, pEpisode, pAirDate, pCharacters);
        card.classList.add('controls');
        section.append(card);
    }
}

function nextPage() {
    pageNumber++;
    fetchResults();
}

function previousPage() {
    if (pageNumber > 1) {
        pageNumber--;
        fetchResults();
    }
}

function clearSection() {
    section.innerHTML = '';
}

function getSubstringAfterLastChar(str, char) {
    const lastIndex = str.lastIndexOf(char);

    if (lastIndex === -1) {
        return str;
    }

    return str.slice(lastIndex + 1);
}

function makeLinkList(arr) {
    let links = '';

    for (let i = 0; i < arr.length; i++) {
        let currentItem = arr[i];
        let id = getSubstringAfterLastChar(currentItem, '/');

        links += `${id}`;

        if (i !== arr.length - 1) {
            links += ', ';
        }
    }

    return links;
}

function makeNumberList(arr) {
    let text = '';

    for (let i = 0; i < arr.length; i++) {
        let currentItem = arr[i];
        text += getSubstringAfterLastChar(currentItem, '/');

        if (i !== arr.length - 1) {
            text += ', ';
        }
    }

    return text;
}

function updatePagination(totalPages = 0) {
    previousBtn.style.display = pageNumber > 1 ? 'block' : 'none';
    nextBtn.style.display = totalPages > pageNumber ? 'block' : 'none';
    nav.style.display = totalPages > 0 ? 'block' : 'none';
}
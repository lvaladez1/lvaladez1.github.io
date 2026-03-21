let username = localStorage.getItem('username');

document.querySelector('#username').innerHTML = 
    `<h2 class='hero_title glitch' data-text=${username}>${username}</h2>`;

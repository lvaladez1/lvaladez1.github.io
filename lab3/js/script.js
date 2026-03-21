const neonCyan = getComputedStyle(document.documentElement)
    .getPropertyValue('--neon-cyan')
    .trim();
const signalOrange = getComputedStyle(document.documentElement)
    .getPropertyValue('--signal-orange')
    .trim();
const warningRed = getComputedStyle(document.documentElement)
    .getPropertyValue('--warning-red')
    .trim();

// Event listeners
document.querySelector('#zip').addEventListener('change', displayCity);
document.querySelector('#state').addEventListener('change', displayCounties);
document.querySelector('#username').addEventListener('change', checkUsername);
document.querySelector('#password').addEventListener('click', suggestPassword);
document.querySelector('#password').addEventListener('keyup', function (event) {
    if (event.code === 'Tab') {
        suggestPassword();
    }
});
document.querySelector('#signupForm').addEventListener('submit', function (event) {
    validateForm(event);
});

displayStates();

// Functions
async function displayCity() {

    let zipCode = document.querySelector('#zip').value;
    try {
        let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;
        let response = await fetch(url);
        let data = await response.json();

        document.querySelector('#zipError').innerHTML = '';

        if (data == false) {
            document.querySelector('#zipError').innerHTML = "Zip code not found";
            document.querySelector('#zipError').style.color = warningRed;
        } else {
            document.querySelector('#city').innerHTML = data.city;
            document.querySelector('#latitude').innerHTML = data.latitude;
            document.querySelector('#longitude').innerHTML = data.longitude;
        }
    } catch (e) {
        console.log(e);
    }

}

async function displayCounties() {
    let state = document.querySelector('#state').value;
    let url = `https://csumb.space/api/countyListAPI.php?state=${state}`;
    let response = await fetch(url);
    let data = await response.json();
    let countyList = document.querySelector('#county');
    countyList.innerHTML = '<option> Select County </option>'
    for (let i = 0; i < data.length; i++) {
        countyList.innerHTML += `<option> ${data[i].county} </option>`;
    }
}

async function displayStates() {
    let stateAbv = document.querySelector('#state');
    let url = 'https://csumb.space/api/allStatesAPI.php';
    let response = await fetch(url);
    let data = await response.json();

    let options = '<option value="">Select one</option>';

    for (let { usps, state } of data) {
        options += `<option value="${usps}">${state}</option>`; // Build state options
    }

    stateAbv.innerHTML = options;
}

async function checkUsername() {
    let username = document.querySelector('#username').value;
    let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
    let response = await fetch(url);
    let data = await response.json();
    let usernameError = document.querySelector('#usernameError');
    if (data.available) {
        usernameError.innerHTML = 'Username available!';
        usernameError.style.color = neonCyan;
        localStorage.setItem('username', username);
    } else {
        usernameError.innerHTML = 'Username taken'
        usernameError.style.color = warningRed;
    }
}

async function suggestPassword() {
    let url = 'https://csumb.space/api/suggestedPassword.php?length=8';
    let response = await fetch(url);
    let data = await response.json();
    let suggestedPassword = document.querySelector('#suggestedPwd');
    suggestedPassword.innerHTML = `Suggested password: ${data.password}`;
    suggestedPassword.style.color = signalOrange;
}


// Validating form data
function validateForm(e) {
    let isValid = true;
    let username = document.querySelector('#username').value;
    let password = document.querySelector('#password').value;
    let retypedPassword = document.querySelector('#retypedPassword').value;
    let passwordError = document.querySelector('#passwordError');


    if (username.length == 0) {
        document.querySelector('#usernameError').innerHTML = 'Username Required!';
        document.querySelector('#usernameError').style.color = warningRed;
        isValid = false;
    }

    if (password != '' && retypedPassword != '') {
        if (password.length >= 6 && password === retypedPassword) {
            passwordError.innerHTML = '';
        } else {
            passwordError.innerHTML = 'Password missing requirement:';
            passwordError.style.color = warningRed;
            if (password.length < 6) {
                passwordError.innerHTML += '<br><span>6 characters minimum</span>';
            }
            if (password !== retypedPassword) {
                passwordError.innerHTML += '<br><span>passwords must match</span><br>';
            }
            isValid = false;
        }
    } else if (password == '') {
        passwordError.innerHTML = 'Password required!';
        passwordError.style.color = warningRed;
        isValid = false;
    } else if (retypedPassword == '') {
        passwordError.innerHTML = 'Type password again box cannot be left blank';
        passwordError.style.color = warningRed;
        isValid = false;
    }

    if (!isValid) {
        e.preventDefault();
    }
}
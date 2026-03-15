// Event Listeners
document.querySelector('#guessBtn').addEventListener('click', checkGuess);
document.querySelector('#resetBtn').addEventListener('click', initializeGame);

// GLobal variables
let randomNumber;
let attempts = 0;
let attemptsLeft = 7;
let playerWins = 0;
let playerLoses = 0;

initializeGame();

function initializeGame() {
    randomNumber = Math.floor(Math.random() * 99) + 1;
    console.log('randomNumber: ' + randomNumber);
    attempts = 0;
    attemptsLeft = 7;

    //hiding the Reset button
    document.querySelector('#resetBtn').style.display = 'none';

    //showing the Guess button
    document.querySelector('#guessBtn').style.display = 'inline';

    let playerGuess = document.querySelector('#playerGuess');
    playerGuess.focus(); // adding focus to textbox
    playerGuess.value = ''; // clearing the textbox

    let feedback = document.querySelector('#feedback');
    feedback.textContent = '';

    let attemptsLeftFeedback = document.querySelector('#attemptsLeftFeedback');
    attemptsLeftFeedback.textContent = ''; // resetting attempts left

    // clearing previous guesses
    document.querySelector('#guesses').textContent = '';

    document.querySelector('#wins').textContent = playerWins; // display wins
    document.querySelector('#loses').textContent = playerLoses; // display loses
}

function checkGuess() {
    let feedback = document.querySelector('#feedback');
    feedback.textContent = '';
    let guess = document.querySelector('#playerGuess').value;
    let attemptsLeftFeedback = document.querySelector('#attemptsLeftFeedback');
    console.log('Player guess: ' + guess);
    if (guess < 1 || guess > 99) {
        feedback.textContent = 'Enter a number between 1 and 99';
        feedback.style.color = 'red';
        return;
    }
    attempts++;
    attemptsLeft--;
    console.log('Attempts: '+ attempts);
    feedback.style.color = 'orange';
    if (guess == randomNumber) {
        playerWins++;
        attemptsLeftFeedback.textContent = attemptsLeft + ' attempt(s) left';
        feedback.textContent = 'You guessed it! You Won!';
        feedback.style.color = 'darkgreen';
        gameOver();
    } else {
        document.querySelector('#guesses').textContent += guess + ' ';
        if (attempts == 7) {
            playerLoses++;
            feedback.textContent = 'Sorry, you lost!';
            feedback.style.color = 'red';
            attemptsLeftFeedback.textContent = attemptsLeft + ' attempt(s) left';
            gameOver();
        } else if (guess > randomNumber) {
            feedback.textContent = 'Guess was high';
            attemptsLeftFeedback.textContent = attemptsLeft + ' attempt(s) left';
        } else if (guess < randomNumber) {
            feedback.textContent = 'Guess was low';
            attemptsLeftFeedback.textContent = attemptsLeft + ' attempt(s) left';
        }
    }
}

function gameOver() {
    let guessBtn = document.querySelector('#guessBtn');
    let resetBtn = document.querySelector('#resetBtn');
    guessBtn.style.display = 'none';
    resetBtn.style.display = 'inline';
    document.querySelector('#wins').textContent = playerWins;
    document.querySelector('#loses').textContent = playerLoses;
}
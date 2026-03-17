// Event Listeners
document.querySelector('button').addEventListener('click', gradeQuiz);

// Global variables
let score = 0;
let attempts = localStorage.getItem("total_attempts");

displayQ4Choices();
displayQ7Choices();

function displayQ4Choices() {
    let q4ChoicesArray = ['Maine', 'Rhode Island', 'Maryland', 'Delaware'];
    q4ChoicesArray = _.shuffle(q4ChoicesArray);
    for (let i = 0; i < q4ChoicesArray.length; i++) {
        document.querySelector('#q4Choices').innerHTML += 
        `<input type="radio" name="q4" id="${q4ChoicesArray[i]}" value="${q4ChoicesArray[i]}"> 
        <label for="${q4ChoicesArray[i]}">${q4ChoicesArray[i]}</label>`;
    }
} // displayQ4Choices

function displayQ7Choices() {
    let q7ChoicesArray = ['Lake Erie', 'Lake Superior', 'Lake Michigan', 'Lake Ontario'];
    q7ChoicesArray = _.shuffle(q7ChoicesArray);
    for (let i = 0; i < q7ChoicesArray.length; i++) {
        document.querySelector('#q7Choices').innerHTML += 
        `<input type="radio" name="q7" id="${q7ChoicesArray[i]}" value="${q7ChoicesArray[i]}"> 
        <label for="${q7ChoicesArray[i]}">${q7ChoicesArray[i]}</label>`;
    }
} // displayQ4Choices

function isFormValid() {
    let isValid = true;
    if (document.querySelector('#q1').value == '') {
        notAnswered(1);
        isValid = false;
    } // Question 1 
    if (document.querySelector('#q2').value == '') {
        notAnswered(2);
        isValid = false;
    } // Question 2
    if (!document.querySelector('#Jackson').checked &&
        !document.querySelector('#Franklin').checked &&
        !document.querySelector('#Jefferson').checked &&
        !document.querySelector('#Roosevelt').checked) {
        notAnswered(3);
        isValid = false;
    } // Question 3
    if (document.querySelector(`input[name='q4']:checked`) == null) {
        notAnswered(4);
        isValid = false;
    } // Question 4
    if (document.querySelector('#q5').value == '') {
        notAnswered(5);
        isValid = false;
    } // Question 5
    if (document.querySelector('#q6').value == '') {
       notAnswered(6);
       isValid = false;
    } // Question 6
    if (document.querySelector(`input[name='q7']:checked`) == null) {
        notAnswered(7);
        isValid = false;
    } // Question 7
    if (!document.querySelector('#Connecticut').checked && 
        !document.querySelector('#Georgia').checked && 
        !document.querySelector('#Pennsylvania').checked && 
        !document.querySelector('#Massachusetts').checked) {
        notAnswered(8);
        isValid = false;
    } // Question 8
    if (document.querySelector('#q9').value == '') {
        notAnswered(9);
        isValid = false;
    } // Question 9
    if (document.querySelector('#q10').value == '') {
        notAnswered(10);
        isValid = false;
    } // Question 10

    return isValid;
} // isFormValid

function notAnswered(index) {
    document.querySelector(`#q${index}ValidationFdbk`).innerHTML = `Question ${index} was not answered`;
}

function rightAnswer(index) {
    document.querySelector(`#q${index}Feedback`).innerHTML = 'Correct!';
    document.querySelector(`#q${index}Feedback`).className = 'bg-success text-white';
    document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/checkmark.png' alt='Checkmark'>";
    score += 10;
} // rightAnswer

function wrongAnswer(index) {
    document.querySelector(`#q${index}Feedback`).innerHTML = 'Incorrect!';
    document.querySelector(`#q${index}Feedback`).className = 'bg-warning text-white';
    document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/xmark.png' alt='xmark'>";
} // wrongAnswer

function gradeQuiz() {
    console.log('Grading quiz...');
    for (let i = 1; i <= 10; i++) {
        document.querySelector(`#q${i}ValidationFdbk`).innerHTML = '';
    } // resets validation feedback
    
    if (!isFormValid()) {
        return;
    }

    // variables
    score = 0;
    let q1Response = document.querySelector('#q1').value.toLowerCase();
    let q2Response = document.querySelector('#q2').value;
    let q4Response = document.querySelector('input[name=q4]:checked').value;
    let q5Response = document.querySelector('#q5').value;
    let q6Response = document.querySelector('#q6').value.toLowerCase();
    let q7Response = document.querySelector('input[name=q7]:checked').value;
    let q9Response = document.querySelector('#q9').value;
    let q10Response = document.querySelector('#q10').value;
    // console.log(q2Response);

    // Grading question 1
    if (q1Response == 'sacramento') {
        rightAnswer(1);
    } else {
        wrongAnswer(1);
    }

    // Grading question 2
    if (q2Response == 'mo') {
        rightAnswer(2);
    } else {
        wrongAnswer(2);
    }

    // Grading question 3
    if (document.querySelector('#Jefferson').checked && 
        document.querySelector('#Roosevelt').checked &&
        !document.querySelector('#Jackson').checked && 
        !document.querySelector('#Franklin').checked) {
        rightAnswer(3);
    } else {
        wrongAnswer(3);
    }

    // Grading question 4
    if (q4Response == 'Rhode Island') {
        rightAnswer(4)
    } else {
        wrongAnswer(4);
    }

    // Grading question 5
    if (q5Response == 'ak') {
        rightAnswer(5)
    } else {
        wrongAnswer(5)
    }

    // Grading question 6
    if (q6Response == 'alaska') {
        rightAnswer(6);
    } else {
        wrongAnswer(6);
    }

    // Grading question 7
    if (q7Response == 'Lake Superior') {
        rightAnswer(7);
    } else {
        wrongAnswer(7);
    }

    // Grading question 8
    if (document.querySelector('#Connecticut').checked && 
        document.querySelector('#Georgia').checked &&
        !document.querySelector('#Pennsylvania').checked &&
        document.querySelector('#Massachusetts').checked) {
        rightAnswer(8);
    } else {
        wrongAnswer(8);
    }

    // Grading question 9
    if (q9Response == 6) {
        rightAnswer(9);
    } else {
        wrongAnswer(9);
    }

    // Grading question 10
    if (q10Response == 'ca') {
        rightAnswer(10);
    } else {
        wrongAnswer(10);
    }


    document.querySelector('#totalScore').innerHTML = `Total Score: ${score}`;
    document.querySelector('#totalAttempts').innerHTML = `Total Attempts: ${++attempts}`;
    localStorage.setItem('total_attempts', attempts);
    
    // Display total score color
    if (score < 80) {
        document.querySelector('#congrats').innerHTML = '';
        document.querySelector('#totalScore').className = 'text-danger';
    } else if (score == 80) {
        document.querySelector('#totalScore').className = 'text-success';
    } else {
        document.querySelector('#totalScore').className = 'text-success';
        document.querySelector('#congrats').innerHTML = 'You scored above an 80! Congratulations!';
    }

} // gradeQuiz

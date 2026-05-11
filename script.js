let humanScore = 0;
let computerScore = 0;
let drawCount = 0;
let numberOfRoundsPlayed = 0;

function getComputerChoice() {
    let computerChoice = Math.floor(Math.random() * 3) + 1;
    return computerChoice;
}

function showScores() {
    let showScoresMessage = `Your Score: ${humanScore}\nComputerScore: ${computerScore}\nDraw count: ${drawCount}`;
    displayTextInUI(showScoresMessage);
}

function getFormattedChoice(choiceInNumberForm) {
    let choices = ["Rock", "Paper", "Scissors"];
    return choices[choiceInNumberForm - 1];
}

function playRound(humanChoice, computerChoice) {
    if(isNaN(humanChoice)) {
        console.log("Error: String input not/can't be converted to number.");
        displayTextInUI("Please enter a valid number.");
        return;
    } else if (humanChoice <= 0 || humanChoice > 3) {
        console.log("Error: Input number chosen is either default zero or out of supported range.");
        displayTextInUI("Please enter a number between 1 - 3!");
        return;
    } else {

        let humanStringChoice = getFormattedChoice(humanChoice);
        let computerStringChoice = getFormattedChoice(computerChoice);

        function checkIfHumanWon() {
            if(computerChoice === humanChoice) {
                return "draw";
            } 

            // let human be x, computer be y.
            // let 1. be rock; 2. be paper; 3. be scissors.
            // Human won if:
            // x = 1, y = 3; 
            // x = 2, y = 1;
            // x = 3, y = 2;
            // else computer won (draw is filtered above).
            // Data derived from sample space. Power of probability.

            let possibleComputerChoices = [3, 1, 2];

            for(let i = 0; i < possibleComputerChoices.length; i++){
                if(humanChoice === (i + 1) && computerChoice === possibleComputerChoices[i]){
                    return true;
                } 
            }

            return false;
        }
        
        if(checkIfHumanWon() === "draw") {
            drawCount++;
            displayTextInUI(`It's a draw!`);
        } else if(checkIfHumanWon()) {
            humanScore++;
            let victoryMessage = `You Won This Round!\nYou chose ${humanStringChoice}, computer chose ${computerStringChoice}.\n${humanStringChoice} beats ${computerStringChoice}!`;
            displayTextInUI(victoryMessage);
        } else {
            computerScore++;
            let defeatMessage = `You Lost This Round!\nYou chose ${humanStringChoice}, computer chose ${computerStringChoice}.\n${computerStringChoice} beats ${humanStringChoice}!`;
            displayTextInUI(defeatMessage);
        }

        numberOfRoundsPlayed++;
        showScores();
        return;
    }
};

// GUI related code.
let div = document.querySelector('#results');
let humanChoice = 0;
let optionsArray = [...document.querySelectorAll('button')].filter((btn) => btn.getAttribute('class') === 'option');
let clickedOptionButtons = 0;

function displayTextInUI(text, classValue) {
    let para = document.createElement('p');

    para.setAttribute('class', 'from-console');
    para.innerText = text;

    div.appendChild(para);
};

function resetResultsInUI() {
    let paraArray = [...div.children].filter((para) => para.getAttribute('class') === 'from-console');

    optionsArray.forEach((option) => {
        option.removeAttribute('style');
    })
    
    if (paraArray.length === 0){
        console.log('Empty Array');
        return;
    }

    paraArray.forEach((para) => {
        para.remove();
    });

    console.log('results log cleared');
}

function resetVariableValues(){
    numberOfRoundsPlayed = 0;
    humanChoice = 0;
    computerChoice = 0;
    computerScore = 0;
    humanScore = 0;
    drawCount = 0;
}

document.addEventListener('click', (e) => {
    if (e.target.matches('button') && e.target.getAttribute('class') === 'option') {
        let buttonColorAfterClick = "lightgreen";
        humanChoice = parseInt(e.target.getAttribute('id'));
        e.target.style.backgroundColor = buttonColorAfterClick;
        
        optionsArray.forEach((optionBtn) => {
            if(optionBtn.getAttribute('style') === `background-color: ${buttonColorAfterClick};`) {
                clickedOptionButtons++;
            };
        });

        if(clickedOptionButtons > 1) {
            optionsArray.forEach((options) => {
                if (options !== e.target) {
                    options.removeAttribute('style');
                }
            });
        };

        if(humanScore + computerScore !== 0 && (humanScore === 5 || computerScore === 5)) {
            // The playRound function also updates the human/computer scores.
            // So even if the results display 5, this if statement will only run when either is six.
            // That's not a bug, it's a feature, to see your results before the final Winner message.
            // It could be because I didn't initially consider the data and logic flow, but I prefer the former explanation.

            resetResultsInUI();

            displayTextInUI("Five rounds up!");
            showScores();

            if (humanScore === computerScore) {
                displayTextInUI("It's an overall draw!");
            } else if(humanScore > computerScore) {
                displayTextInUI('Most wins by: You!');
            } else if(computerScore > humanScore) {
                displayTextInUI('Most wins by: The Computer!');
            };

            return;
        };

        playRound(humanChoice, getComputerChoice());

        if (humanChoice !== 0) {
            displayTextInUI(`Number of Rounds Played: ${numberOfRoundsPlayed}`);
        };

        displayTextInUI ('_____________________________');
    };
});

document.querySelector('#reset-btn').addEventListener('click', () => {
    resetResultsInUI();
    resetVariableValues();
});
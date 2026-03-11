let humanScore = 0;
let computerScore = 0;
let drawCount = 0;

function getHumanChoice() {
    // I'll use a number system instead of string because typing a single number is faster than a whole word that could have typos.
    // humanChoice.trim().toLowerCase() incase I change my mind.

    let humanChoice = parseInt(prompt("Enter:\n1. For Rock\n2. For paper\n3. For scissors", 1));
    return humanChoice;
}

function getComputerChoice() {
    let computerChoice = Math.floor(Math.random() * 3) + 1;
    return computerChoice;
}

function playRound(humanChoice, computerChoice) {
    if(isNaN(humanChoice)) {
        console.log("Please enter a valid number.");
        return;
    } else if (humanChoice <= 0 || humanChoice > 3) {
        console.log("Please enter a number between 1 - 3!");
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

        function getFormattedChoice(choiceInNumberForm) {
            let choices = ["Rock", "Paper", "Scissors"];
            return choices[choiceInNumberForm - 1];
        }

        function showVictoryMessage() {
            let victoryMessage = `You Won This Round!\nYou chose ${humanStringChoice}, computer chose ${computerStringChoice}.\n${humanStringChoice} beats ${computerStringChoice}!`;
            console.log(victoryMessage);
        }

        function showDefeatMessage() {
            let defeatMessage = `You Lost This Round!\nYou chose ${humanStringChoice}, computer chose ${computerStringChoice}.\n${computerStringChoice} beats ${humanStringChoice}!`;
            console.log(defeatMessage);
        }

        function showScores() {
            let showScoresMessage = `Your Score: ${humanScore}\nComputerScore: ${computerScore}\nDraw count: ${drawCount}`;
            console.log(showScoresMessage);
        }

        if(checkIfHumanWon() === "draw") {
            drawCount++;
            console.log(`It's a draw!`);
        } else if(checkIfHumanWon()) {
            humanScore++;
            showVictoryMessage();
        } else {
            computerScore++;
            showDefeatMessage();
        }

        showScores();
        return;
    }
}

function playGame() {
    let numberOfRounds = 5;

    for(let i = 0; i < numberOfRounds; i++){
        playRound(getHumanChoice(), getComputerChoice());
    }

    if (humanScore === computerScore) {
        console.log(`${numberOfRounds} round(s) are over, It's a draw!`);
    } else if(humanScore > computerScore) {
        console.log("Congratulations! You're the overall winner!");
    } else {
        console.log("Oh shucks! The computer won, better luck next time!");
    }
}
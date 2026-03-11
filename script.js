// Rock-paper-scissors game.
// Rock wins agaisnt scissors.
// Paper wins agaisnt Rock.
// Scissors wins against paper.

// Rock loses against paper. 
// Paper loses against scissors. 
// Scissors loses against rock.

// To debug using console.log, find the relevant debug-aiding code above "Debug conclusion: ..." comments.

let humanScore = 0;
let computerScore = 0;
let drawCount = 0;

function getHumanChoice() {
    // I'll use a number system instead of string because typing a single number is faster than a whole word that could have typos.
    // humanChoice.trim().toLowerCase() incase I change my mind.

    let humanChoice = parseInt(prompt("Enter:\n1. For Rock\n2. For paper\n3. For scissors", 1));
    // console.log(humanChoice);
    // Debug conclusion: Works as intended.
    return humanChoice;
}

function getComputerChoice() {
    let computerChoice = Math.floor(Math.random() * 3) + 1;
    // console.log(computerChoice);
    // Debug conclusion: Works as intended.
    return computerChoice;
}

function playRound(humanChoice, computerChoice) {
    console.log(computerChoice);
    console.log(humanChoice);
    // Debug conclusion: Value recieved as intended.

    if(isNaN(humanChoice)) {
        console.log("Please enter a valid number.");
        // Works as intended.
        return;
    } else if (humanChoice <= 0 || humanChoice > 3) {
        console.log("Please enter a number between 1 - 3!");
        // Works as intended.
        return;
    } else {
        function checkIfHumanWon() {
            // return "draw";
            // return true;
            //return false;
            // uncomment (relevant) above comment to debug incrementation.

            //filter out draw possibilities.
            if(computerChoice === humanChoice) {
                return "draw";
            } 

            // console.log(`y = ${computerChoice}`);
            // console.log(`x = ${humanChoice}`);
            // Above logs to aid in debugging the logic explained below.
            // Debug conclusion: Logic works as intended.

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
        // console.log(checkIfHumanWon());
        // Debug conclusion: Function Works as intended.

        function getConvertedChoiceFromNumberToStringCounterpart(choiceInNumberForm) {
            let choices = ["Rock", "Paper", "Scissors"];
            return choices[choiceInNumberForm - 1];
        }
        // console.log(getConvertedChoiceFromNumberToStringCounterpart(humanChoice));
        // console.log(getConvertedChoiceFromNumberToStringCounterpart(computerChoice));
        // Debug conclusion: Function Works as intended.

        function showVictoryMessage() {
            let humanStringChoice = getConvertedChoiceFromNumberToStringCounterpart(humanChoice);
            let computerStringChoice = getConvertedChoiceFromNumberToStringCounterpart(computerChoice);
            let victoryMessage = `You Won This Round!\nYou chose ${humanStringChoice}, computer chose ${computerStringChoice}.\n${humanStringChoice} beats ${computerStringChoice}!`;
            console.log(victoryMessage);
        }
        // showVictoryMessage();
        // Debug conclusion: Function Works as intended.

        function showDefeatMessage() {
            let humanStringChoice = getConvertedChoiceFromNumberToStringCounterpart(humanChoice);
            let computerStringChoice = getConvertedChoiceFromNumberToStringCounterpart(computerChoice);
            let defeatMessage = `You Lost This Round!\nYou chose ${humanStringChoice}, computer chose ${computerStringChoice}.\n${computerStringChoice} beats ${humanStringChoice}!`;
            console.log(defeatMessage);
        }
        // showDefeatMessage();
        // Debug conclusion: Function Works as intended.

        function showScores() {
            let showScoresMessage = `Your Score: ${humanScore}\nComputerScore: ${computerScore}\nDraw count: ${drawCount}`;
            console.log(showScoresMessage);
        }
        // showScores();
        // Debug conclusion: Function works as intended.


        if(checkIfHumanWon() === "draw") {
            drawCount++;
            // Uncomment; return "draw", in checkIfHumanWon() to test this.
            // console.log(drawCount);
            // Debug conclusion: Incrementation works as intended.

            console.log(`It's a draw!`);
        } else if(checkIfHumanWon()) {
            humanScore++;
            // Uncomment; return true; in checkIfHumanWon() to test this.
            // console.log(humanScore);
            // Debug conclusion: Incrementation works as intended.

            showVictoryMessage();
        } else {
            computerScore++;
            // Uncomment; return false; in checkIfHumanWon() to test this.
            // console.log(computerScore);
            // Debug conclusion: Incrementation works as intended.
            showDefeatMessage();
        }

        showScores();
        return;
    }

    // console.log("Logic Error: The code execution is not supposed to reach here.");
    // return;
}

function playGame() {
    let numberOfRounds = 5;

    for(let i = 0; i < numberOfRounds; i++){
        // Debug conclusion: Works as intended.
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
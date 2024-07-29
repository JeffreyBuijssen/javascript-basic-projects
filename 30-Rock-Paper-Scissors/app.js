// Caching DOM
const userScoreDOM = document.getElementById('user-score');
const computerScoreDOM = document.getElementById('computer-score');
let userScore = 0;
let computerScore = 0;

const resultDOM = document.querySelector('.result');
const choicesDOMs = document.querySelectorAll('.choice');
const userBadgeDOM = document.getElementById('user-label');
const compBadgeDOM = document.getElementById('computer-label');
const rockBtn = choicesDOMs[0];
const paperBtn = choicesDOMs[1];
const scissorsBtn = choicesDOMs[2];

const winColor = 'rgb(0, 128, 0)';
const loseColor = 'rgb(226, 88, 77)';
const tieColor = 'rgb(87, 91, 109)';

let selectedButton = rockBtn;

class Enum {
    constructor (key, value) {
        this.key = key;
        this.value = value;
        this.get = this.get.bind(this);
        this.equals = this.equals.bind(this);
    }

    equals(other) {
        return this.key === other.key && this.value ===other.value;
    }

    get() {
        return Object.freeze({key: this.key, value: this.value});
    }
}

const ResultEnum = Object.freeze(class {
    static WIN = Object.freeze(new Enum('WIN', 1));
    static LOSE = Object.freeze(new Enum('LOSE', 0));
    static TIE = Object.freeze(new Enum('TIE', 2));
    static FUCKED = Object.freeze(new Enum('FUCKED', 3));

    constructor() {
        this.equals = this.equals.bind(Enum);
    }
    equals(){}
});

const ChoiceEnum = Object.freeze(class {
    static ROCK = Object.freeze(new Enum('ROCK', 0));
    static PAPER = Object.freeze(new Enum('PAPER', 1));
    static SCISSORS = Object.freeze(new Enum('SCISSORS', 2));
    static FU = Object.freeze(new Enum('FU', 3));
    static METAL = Object.freeze(new Enum('METAL', 4));

    constructor() {
        this.equals = this.equals.bind(Enum);
        //this.enumify = this.enumify.bind(this);
    }

    equals() {}

    static enumify(input) {
        console.log(input);
        // convert input to upper case if it's a string
        const converted = (typeof input === 'string') ? input.toUpperCase() : input;
        switch(converted) {
            case this.ROCK.key:
            case this.ROCK.value:
            case this.ROCK:
                return this.ROCK;
            case this.PAPER.key:
            case this.PAPER.value:
            case this.PAPER:
                return this.PAPER;
            case this.SCISSORS.key:
            case this.SCISSORS.value:
            case this.SCISSORS:
                return this.SCISSORS;
            case this.FU.key:
            case this.FU.value:
            case this.FU:
                return this.FU;
            case this.METAL.key:
            case this.METAL.value:
            case this.METAL:
                return this.METAL;
            
        }
    }
});
//const choiceEnum = new ChoiceEnum();

// add choice


function onPlay(event) {
    selectedButton = event.target.tagName === 'DIV'
        ? event.target
        : event.target.parentElement;
    const choice = ChoiceEnum.enumify(selectedButton.id);
    const computerChoice = getComputerChoice();
    const status = evaluate(choice, computerChoice);
    juiceLabels(status);
    switch (status) {
        case ResultEnum.WIN:
            onWin(selectedButton);
            break;
        case ResultEnum.LOSE:
            onLose();
            break;
        case ResultEnum.TIE:
            onTie();
            break;
        case ResultEnum.FUCKED:
            onFucked();
    }
    updateStatusText(status, choice, computerChoice);
}

function juiceLabels(status) {
    switch (status) {
        case ResultEnum.WIN:
            userBadgeDOM.style.backgroundColor = winColor;   // green
            compBadgeDOM.style.backgroundColor = loseColor; // red
            break;
        case ResultEnum.LOSE:
            userBadgeDOM.style.backgroundColor = loseColor; // red
            compBadgeDOM.style.backgroundColor = winColor;   // green
            break;
        case ResultEnum.TIE:
            userBadgeDOM.style.backgroundColor = tieColor;
            compBadgeDOM.style.backgroundColor = tieColor;
            break;
            
    }
}

function updateStatusText(status, choice, computerChoice) {
    let actionSubPhrase;
    switch (status) {
        case ResultEnum.WIN:
            if (choice === ChoiceEnum.ROCK) actionSubPhrase = 'smashes';
            if (choice === ChoiceEnum.PAPER) actionSubPhrase = 'covers';
            if (choice === ChoiceEnum.SCISSORS) actionSubPhrase = 'cuts';
            break;
        case ResultEnum.LOSE:
            if (choice === ChoiceEnum.ROCK) actionSubPhrase = 'gets covered by';
            if (choice === ChoiceEnum.PAPER) actionSubPhrase = 'gets cut by';
            if (choice === ChoiceEnum.SCISSORS) actionSubPhrase = 'get smashed by';
            break;
        case ResultEnum.TIE:
            actionSubPhrase = 'ties to';
            break;
        case ResultEnum.FUCKYOU:
            console.log('fuckyou is not yet implemened');
            return;
        case ResultEnum.FUCKME:
            console.log("fuckme is not yet implemented");
            return;
        case ResultEnum.FUCKED:
            resultDOM.innerHTML = `You both played fuck you. You're both fucked.' `;
            return;
        default:
            console.log(`What happened?`);
    }
    const capitalizedUserChoice =
        choice.key.charAt(0).toUpperCase() + choice.key.slice(1).toLowerCase();

    const newStatusText =
        ` <p>
        ${capitalizedUserChoice}<sub>user</sub> 
        ${actionSubPhrase} 
        ${computerChoice.key.toLowerCase()}<sub>comp</sub>.
        \nYou ${status.key.toLowerCase()}!
        </p>`;
    resultDOM.innerHTML = newStatusText;
}

function btnFeedback(targetButton, color) {
    targetButton.style.borderColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
    requestAnimationFrame((t) => firstFrame(t, targetButton, color));
}

function firstFrame(timeStamp, targetButton, targetColor) {
    //console.log(targetButton);
    const zero = timeStamp;
    const duration = 500;
    animate(timeStamp, zero, duration, targetButton, targetColor);
    return zero;
}

function animate(timeStamp, zero, duration, targetButton, targetColor) {
    const value = (timeStamp - zero) / duration;
    const r = targetColor.r;
    const g = targetColor.g;
    const b = targetColor.b;
    if (value < 1) {
        targetButton.style.borderColor = `rgb(${r},${g},${b})`;
        requestAnimationFrame((t) => animate(t, zero, duration, targetButton, targetColor));
        targetButton.style.setProperty('--color-hover', `rgb(${r},${g},${b})`);
    } else {
        targetButton.style.borderColor = 'white';
        targetButton.style.setProperty('--color-hover', 'white');
        }
}

function onWin(selectedButton) {
    if (selectedButton.id === ChoiceEnum.FU.key) {
        computerScore -= 5;
        computerScoreDOM.textContent = computerScore;
    }
    userScore++;
    userScoreDOM.textContent = userScore;
    btnFeedback(selectedButton, stringToRgb(winColor));
}



function onLose() {
    computerScore++;
    computerScoreDOM.textContent = computerScore;
    btnFeedback(selectedButton, stringToRgb(loseColor));
}
function onTie() {
    if (selectedButton.id === ChoiceEnum.METAL.key.toLowerCase()) {
        console.log(selectedButton.parentElement);
        const cache = selectedButton.parentElement.innerHTML;
        selectedButton.innerHTML +=
        `<img class="fire" src="./images/fire.png" alt="fire">`
    }
    btnFeedback(selectedButton, stringToRgb(tieColor));
}

function onFucked() {
    computerScore = 0;
    computerScoreDOM.textContent = computerScore;
    userScore = 0;
    userScoreDOM.textContent = userScore;
    btnFeedback(selectedButton, stringToRgb(loseColor));
}

function evaluate(choice, computerChoice) {
    if (choice === computerChoice && choice === ChoiceEnum.FU) return ResultEnum.FUCKED;
    if (choice.equals(computerChoice)) return ResultEnum.TIE;
    if (choice.value === (computerChoice.value + 2 ) % 3) return ResultEnum.LOSE;
    return ResultEnum.WIN;
}

function getComputerChoice() {
    const rnd = Math.floor(Math.random() * 5);
    switch (rnd) {
        case 0:
            return ChoiceEnum.ROCK;
        case 1:
            return ChoiceEnum.PAPER;
        case 2:
            return ChoiceEnum.SCISSORS;
        case 3:
            return ChoiceEnum.FU;
        case 4:
            return ChoiceEnum.METAL;
    }
    return null;
}

function stringToRgb(string) {
    const cArray = string.match(/\d+(\.\d+)?%?/g);
    if(cArray[3] === undefined) return {r: cArray[0], g: cArray[1], b: cArray[2]};
    else return {r: cArray[0], g: cArray[1], b: cArray[2], a: cArray[3]}
}

function init() {
    choicesDOMs.forEach((element) => element.addEventListener('click', (event) => {
        onPlay(event)
        console.log(event.target);
    }
    ));

}
init();

document.querySelector('.test').style.backgroundImage = "url(./images/Fire.png)";

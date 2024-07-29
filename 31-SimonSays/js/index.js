let order = [];
let playerOrder = [];
let flash;
let turn;
let good;
let compTurn;
let intervalId;
let strict = false;
let noise = true;
let on = false;
let win;

const turnCounterDOM = document.querySelector('#turn');
const topLeftDOM = document.querySelector('#topleft');
const topRightDOM = document.querySelector('#topright');
const bottomLeftDOM = document.querySelector('#bottomleft');
const bottomRightDOM = document.querySelector('#bottomright');
const onButtonDOM = document.querySelector('#on');
const startButtonDOM = document.querySelector('#start');
const strictButtonDOM = document.querySelector('#strict');

strictButtonDOM.addEventListener('change', () => {
    strict = strictButtonDOM.checked;
});

onButtonDOM.addEventListener('change', () => {
    on = onButtonDOM.checked;
    if (on) {
        turnCounterDOM.innerHTML = '-';
    } else {
        turnCounterDOM.innerHTML = "";
        clearColor();
        clearInterval(intervalId);
    }
});

startButtonDOM.addEventListener('click', () => {
    if (on || win) {
        play();
    }
});

function play() {
    win = false;
    order = [];
    playerOrder = [];
    flash = 0;
    intervalId = 0;
    turn = 1;
    turnCounterDOM.innerHTML = 1;
    good = true;

    for (let i = 0; i < 20; i++) {
        order.push(Math.floor(Math.random() * 4) + 1);
    }
    compTurn = true;

    intervalId = setInterval(gameTurn, 800);
}

function gameTurn() {
    on = false;
    if (flash === turn) {
        clearInterval(intervalId);
        compTurn = false;
        clearColor();
        on = true;
    }

    if (compTurn) {
        clearColor();
        setTimeout(() => {
            if (order[flash] === 1) one();
            if (order[flash] === 2) two();
            if (order[flash] === 3) three();
            if (order[flash] === 4) four();
            flash++;
        }, 200);
    }
}

function one() {
    if (noise) {
        let audio = document.getElementById('clip1');
        audio.play();
    }
    noise = true;
    topLeftDOM.style.backgroundColor = 'lightgreen';
}

function two() {
    if (noise) {
        const audio = document.getElementById('clip2');
        audio.play();
    }
    noise = true;
    topRightDOM.style.backgroundColor = 'tomato';
}

function three() {
    if (noise) {
        const audio = document.getElementById('clip3');
        audio.play();
    }
    noise = true;
    bottomLeftDOM.style.backgroundColor = 'yellow';
}

function four() {
    if (noise) {
        const audio = document.getElementById('clip4');
        audio.play();
    }
    noise = true;
    bottomRightDOM.style.backgroundColor = 'lightskyblue';
}

function clearColor() {
    topLeftDOM.style.backgroundColor = 'darkgreen';
    topRightDOM.style.backgroundColor = 'darkred';
    bottomLeftDOM.style.backgroundColor = 'goldenrod';
    bottomRightDOM.style.backgroundColor = 'darkblue';
}

function flashColor() {
    topLeftDOM.style.backgroundColor = 'lightgreen';
    topRightDOM.style.backgroundColor = 'tomato';
    bottomLeftDOM.style.backgroundColor = 'yellow';
    bottomRightDOM.style.backgroundColor = 'lightskyblue';
}

topLeftDOM.addEventListener('click', () => {
    if (on) {
        playerOrder.push(1);
        check();
        one();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});

topRightDOM.addEventListener('click', () => {
    if (on) {
        playerOrder.push(2);
        check();
        two();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});
bottomLeftDOM.addEventListener('click', () => {
    if (on) {
        playerOrder.push(3);
        check();
        three();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});

bottomRightDOM.addEventListener('click', () => {
    if (on) {
        playerOrder.push(4);
        check();
        four();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
});

function check() {
    if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1]) {
        good = false;
    }

    if (playerOrder.length === 20 && good) {
        winGame();
    }

    if (good === false) {
        flashColor();
        turnCounterDOM.innerHTML = 'NO!';
        setTimeout(() => {
            turnCounterDOM.innerHTML = turn;
            clearColor();
            if (strict) {
                play();
            } else {
                compTurn = true;
                flash = 0;
                playerOrder = [];
                good = true;
                intervalId = setInterval(gameTurn, 800);
            }
        }, 800);

        noise = false;
    }
        if (turn === playerOrder.length && good && !win) {
            turn++;
            playerOrder = [];
            compTurn = true;
            flash = 0;
            turnCounterDOM.innerHTML = turn;
            intervalId = setInterval(gameTurn, 800);
        }
    
}

function winGame() {
    flashColor();
    turnCounterDOM.innerHTML('WIN!');
    on = false;
    win = true;
}
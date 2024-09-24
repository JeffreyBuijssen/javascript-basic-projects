/*
    - 5 equally spaced randomly placed platforms
    - start at first platform
    - platforms move downward if player is above set hight
    - platforms disapear at bottom of screen
    - new platform re-appears at top of screen
    - game stops if player hits floor
    - player moves left or right, started when pressing a button, stopping when hitting a wall
*/

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector(".grid");
    const doodler = document.createElement('div');

    let doodlerLeftSpace = 50;
    let startPoint = 150;
    let doodlerBottomSpace = startPoint;
    let doodlerWidth = 60;
    let doodlerHeight = 85;
    let platformWidth = 85;
    let platformHeight = 15;
    let isGameOver = false;
    let platformCount = 5;
    let platforms = [];
    let upTimerId;
    let downTimerId;
    let isJumping = true;
    let isGoingLeft = false;
    let isGoingRight = false;
    let leftTimerId;
    let rightTimerId;
    let score;

    function createDoodler() {
        grid.appendChild(doodler);
        doodler.classList.add('doodler');
        doodlerLeftSpace = platforms[0].left;
        doodlerBottomSpace = platforms[0].bottom;
        doodler.style.left = doodlerLeftSpace + 'px';
        doodler.style.bottom = doodlerBottomSpace + 'px';
    }

    class Platform {
        constructor(newPlatformBottom) {
            this.bottom = newPlatformBottom;
            this.left = Math.random() * 315;
            this.visual = document.createElement('div');

            const visual = this.visual;
            visual.classList.add('platform');
            visual.style.left = this.left + 'px';
            visual.style.bottom = this.bottom + 'px';
            grid.appendChild(visual);
        }
    }

    function createPlatforms() {

        for (let platformIndex = 0; platformIndex < platformCount; platformIndex++) {
            let platformGap = 600 / platformCount;
            let newPlatformBottom = 100 + platformIndex * platformGap;
            let newPlatform = new Platform(newPlatformBottom);
            platforms.push(newPlatform);
        }
    }

    function movePlatforms() {
        if (doodlerBottomSpace > 200) {
            platforms.forEach(platform => {
                platform.bottom -= 4;
                let visual = platform.visual;
                visual.style.bottom = platform.bottom + 'px';

                if(platform.bottom < 10) {
                    let firstPlatform = platforms[0].visual;
                    firstPlatform.classList.remove('platform');
                    platforms.shift();
                    let newPlatform = new Platform(600);
                    platforms.push(newPlatform);
                    score++;
                }
            });
        }
    }

    function jump() {
        clearInterval(downTimerId);
        isJumping = true;
        upTimerId = setInterval(function () {
            doodlerBottomSpace += 20;
            doodler.style.bottom = doodlerBottomSpace + 'px';
            if (doodlerBottomSpace > startPoint + 200) {
                fall();
            }
        }, 30);
    }

    function fall() {
        clearInterval(upTimerId);
        isJumping = false;
        downTimerId = setInterval(function () {
            doodlerBottomSpace -= 5;
            doodler.style.bottom = doodlerBottomSpace + 'px';
            if (doodlerBottomSpace <= 0) {
                gameOver();
            }

            platforms.forEach(platform => {
                if (doodlerBottomSpace >= platform.bottom &&
                    doodlerBottomSpace <= platform.bottom + platformHeight &&
                    doodlerLeftSpace + doodlerWidth >= platform.left &&
                    doodlerLeftSpace <= platform.left + platformWidth &&
                    !isJumping) {
                        startPoint = doodlerBottomSpace;
                        jump();
                    }
                });
        }, 30);
    }

    function gameOver() {
        isGameOver = true;
        clearInterval(downTimerId);
        clearInterval(upTimerId);
        clearInterval(isGoingLeft);
        clearInterval(isGoingRight);
        while (grid.firstChild) {
            grid.removeChild(grid.firstChild);
        }
        grid.innerHTML = `${score}`;
        // grid.innerHTML = `score: ${score}`;
    }



    function control(e) {
        if (e.key === 'ArrowLeft' || e.key === 'a') {
            moveLeft();
        } else if (e.key === 'ArrowRight' || e.key==='d') {
            moveRight();
        } else if (e.key === 'ArrowUp' || e.key === 'w') {
            moveStraight();
        }
    }

    function moveStraight() {
        isGoingLeft = false;
        isGoingRight = false;
        clearInterval(rightTimerId);
        clearInterval(leftTimerId);
    }

    function moveLeft() {
        if (isGoingRight) {
            clearInterval(rightTimerId);
            isGoingRight = false;
        }
        isGoingLeft = true;
        leftTimerId = setInterval(function () {
            if (doodlerLeftSpace >= 0) {
                doodlerLeftSpace -= 5;
                doodler.style.left = doodlerLeftSpace + 'px';
            } else moveRight();
        }, 30);
    }

    function moveRight() {
        if (isGoingLeft) {
            clearInterval(leftTimerId);
            isGoingLeft = false;
        }
        isGoingRight = true;
        rightTimerId = setInterval(function () {
            if (doodlerLeftSpace <= 400 - doodlerWidth) {
                doodlerLeftSpace += 5;
                doodler.style.left = doodlerLeftSpace + 'px';
            } else moveLeft();
        }, 30);
    }

    function start() {
        if (!isGameOver) {
            score = 0;
            createPlatforms();
            createDoodler();
            setInterval(movePlatforms, 30);
            jump();
            document.addEventListener('keyup', control);
        }
    }
    // TODO: attatch to button
    start();
});

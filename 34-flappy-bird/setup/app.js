document.addEventListener("DOMContentLoaded", () => {
    const bird = document.querySelector('.bird');
    const gameDisplay = document.querySelector('.game-container');
    const ground = document.querySelector('.ground');

    let birdLeft = 220;
    let birdBottom = 100;
    let gravity = 2;
    let updateTimerId;
    let isGameOver = false;
    let gap = 430;



    function startGame() {
        //TODO add start button
        isGameOver = false;
        document.addEventListener('keyup', control);
        console.log('game started');
        bird.style.bottom = birdBottom + 'px';
        bird.style.left = birdLeft + 'px';
        updateTimerId = setInterval(update, 20);
    }

    function jump() {
        if (birdBottom < 500) {
            birdBottom += 50;
            bird.style.bottom = birdBottom + `px`;

        }
        
    }

    function generateObstacle() {
        let obstacleLeft = 500;
        let randomHeight = Math.random() * 60;
        let obstacleBottom = randomHeight;
        const obstacle = document.createElement('div');
        const topObstacle = document.createElement('div');
        if (!isGameOver) {
            obstacle.classList.add('obstacle');
            topObstacle.classList.add('topObstacle');
        }
        gameDisplay.appendChild(obstacle);
        gameDisplay.appendChild(topObstacle);
        obstacle.style.left = obstacleLeft + 'px';
        topObstacle.style.left = obstacleLeft + 'px';
        obstacle.style.bottom = obstacleBottom + 'px';
        topObstacle.style.bottom = obstacleBottom + gap +  'px';

        function moveObstacle() {
            obstacleLeft -= 2;
            obstacle.style.left = obstacleLeft + 'px';
            topObstacle.style.left = obstacleLeft + 'px';
            if (obstacleLeft === -60) {
                clearInterval(moveObstacleTimerId);
                gameDisplay.removeChild(obstacle);
                gameDisplay.removeChild(topObstacle);
            }
            if (obstacleLeft > 200 &&
                obstacleLeft < 280 &&
                birdLeft === 220 &&
                (birdBottom < obstacleBottom + 150 || birdBottom > obstacleBottom + gap - 196)||
                birdBottom === 0) {

                gameOver();
                clearInterval(moveObstacleTimerId);
            }
        }
        let moveObstacleTimerId = setInterval(moveObstacle, 20);
        if(!isGameOver) setTimeout(generateObstacle, 3000);
    }

    function gameOver() {
        console.log('gameOver');
        clearInterval(updateTimerId);
        isGameOver = true;
        document.removeEventListener('keyup', control);
    }

    function control(e) {
        if (e.keyCode === 32 || e.key === 'w') {
            jump();
        }
    }

    function update() {
        birdBottom -= gravity;
        bird.style.bottom = birdBottom + 'px';
        bird.style.left = birdLeft + 'px';
    }

    startGame();
    generateObstacle();


});
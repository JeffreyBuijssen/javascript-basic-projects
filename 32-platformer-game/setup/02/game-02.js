/* To keep this example from looking too boring, I made the game logic gradually
change some color values which then get drawn to the display canvas in the display class */

const Game = function () {

    //this.backgroundColor = 'black';

    this.world = {
        backgroundColor: 'rgba(40,48,56,0.25)',

        // properties:
        friction: .1,
        gravity: 3.0,

        height: 72, //px
        width: 128, //px

        player: new Game.Player(),

        /**
         * Method collideObject prevents player from going out of bounds.
         * @param {any} object
         */
        collideObject: function (object) {
            if (object.x < 0) {
                object.x = 0;
                object.velocityX = 0;
            } else if (object.x + object.width > this.width) {
                object.x = this.width - object.width;
                object.velocityX = 0;
            }
            if (object.y < 0) {
                object.y = 0;
                object.velocityY = 0;
            } else if (object.y + object.height > this.height) {
                object.y = this.height - object.height;
                object.velocityY = 0;
                object.jumping = false;
            }
        },

        applyGravity: function (gameObject) {
            gameObject.velocityY += this.gravity;
        },

        applyFriction: function (gameObject) {
            gameObject.velocityX *= 1 - this.friction;
            gameObject.velocityY *= 1 - this.friction;
        },
        update: function () {
            this.applyGravity(this.player);
            this.player.update();
            this.applyFriction(this.player);

            this.collideObject(this.player);

        },
    };
    
    this.update = function () {
        this.world.update();
    };


};

Game.prototype = {
    constructor: Game,
};


    Game.Player = function (x, y) {
        this.x = 100;
        this.y = 50;
        this.velocityX = 0;
        this.velocityY = 0;
        this.height = 16;
        this.width = 16;
        this.jumping = true;
        this.color = '#ff0000';
        this.jumpingSpeed = 10;
    };

Game.Player.prototype = {
    constructor: Game.Player,

    shiftColor: function () {
        this.color = '#' + Math.floor(Math.random() * 16_777_216).toString(16);
        /* toString(16) will not add a leading 0 to a hex value, so this: #0fffff, for example,
        isn't valid. toString would cut off the first 0. The code below insters it.*/

        if (this.color.length != 7) {
            this.color = this.color.slice(0, 1) + '0' + this.color.slice(1, 6);
        }
    },
    jump: function () {
        if (!this.jumping) {
            this.shiftColor();
            this.jumping = true;
            this.velocityY -= 20;
        }
    },


    moveLeft: function () {
        this.velocityX -= 0.5;
    },
    moveRight: function () {
        this.velocityX += 0.5;
    },
    
    update: function () {
        this.x += this.velocityX;
        this.y += this.velocityY;
    },

};
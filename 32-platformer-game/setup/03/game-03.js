/*
 * We moved the world object into it's own class and made the Player class a class 
 instead of an object literal (Game.world). This to compartementalize our objects 
 more accurately. The Player class will never be used outside of the World class, 
 and the World class will never be used outside of the Game class, therefore the
 classes will be nester: Game -> Game.World -> Game.World.Player
 */



const Game = function () {

    /* The world object is now it's own class. */
    this.world = new Game.World();
        
    /* The Game.update function works the same as in part 2 */
    this.update = function () {
        this.world.update();
    };
};

Game.prototype = {
    constructor: Game,
};


Game.World = function (friction = 0.1, gravity = 3) {

    // properties:
    //this.backgroundColor: 'rgba(40,48,56,0.25)';
    this.friction = friction;
    this.gravity = gravity;

    // old constants, world is now defined by map.
    //height: 72, //px
    //width = 128, //px

    this.player =  new Game.World.Player();

    /* Here is the map data. Later on I will load it from a json file, but for now 
    I will just hardcode it here. */
    this.columns = 12;
    this.rows = 9;
    this.tileSize = 16;
    this.map = [49, 18, 18, 18, 50, 49, 19, 20, 17, 18, 36, 37,
                11, 40, 40, 40, 17, 19, 40, 32, 32, 32, 40, 08,
                11, 32, 40, 32, 32, 32, 40, 13, 06, 06, 29, 02,
                36, 07, 40, 40, 32, 40, 40, 20, 40, 40, 09, 10,
                03, 32, 32, 48, 40, 48, 40, 32, 32, 05, 37, 26,
                11, 40, 40, 32, 40, 40, 40, 32, 32, 32, 40, 38,
                11, 40, 32, 05, 15, 07, 40, 40, 04, 40, 01, 43,
                50, 03, 32, 32, 12, 40, 40, 32, 12, 01, 43, 10,
                09, 41, 28, 14, 38, 28, 14, 04, 23, 35, 10, 25];

    /* height and Width now depend on the map size. */
    this.height = this.tileSize * this.rows;
    this.width = this.tileSize * this.columns;
}



Game.World.prototype = {
    construction: Game.World,

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
            object.velocity.x = 0;
        }
        if (object.y < 0) {
            object.y = 0;
            object.velocity.y = 0;
        } else if (object.y + object.height > this.height) {
            object.y = this.height - object.height;
            object.velocity.y = 0;
            object.jumping = false;
        }
    },

    applyGravity: function (gameObject) {
        gameObject.velocity.y += this.gravity;
    },

    applyFriction: function (gameObject) {
        gameObject.velocity.x *= 1 - this.friction;
        gameObject.velocity.y *= 1 - this.friction;
    },
    update: function () {
        this.applyGravity(this.player);
        this.player.update();
        this.applyFriction(this.player);

        this.collideObject(this.player);

    }
}

/* The player is also it's own class now. Since player only appears in the context
of Game.World, that is where it is defined. */
Game.World.Player = function (x, y) {
    this.color1 = '#404040';
    this.color2 = '#f0f0f0';
    this.height = 16;
    this.jumping = true;
    this.velocity = { x: 0, y: 0 };
    this.width = 16;
    this.x = 100;
    this.y = 50;
    this.JUMPING_SPEED = 10;
};

Game.World.Player.prototype = {

    constructor: Game.World.Player,

    jump: function () {
        if (!this.jumping) {
            this.jumping = true;
            this.velocity.y -= 20;
        }
    },
    moveLeft: function () {
        this.velocity.x -= 0.5;
    },
    moveRight: function () {
        this.velocity.x += 0.5;
    },
    
    update: function () {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    },

};
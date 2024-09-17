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

    /* The Game.updatePosition function works the same as in part 2 */
    this.update = function () {
        this.world.update();
    };
};

Game.prototype = {
    constructor: Game,
};

Game.Animator = function (frameSet, delay) {
    this.count = 0;
    this.delay = (delay >= 1) ? delay : 1;
    this.frameSet = frameSet;
    this.frameIndex = 0;
    this.frameValue = frameSet[0];
    this.mode = "pause";
};

Game.Animator.prototype = {
    constructor: Game.Animator,

    animate: function () {
        switch (this.mode) {
            case 'loop': this.loop(); break;
            case 'pause': break;
        }
    },

    changeFrameSet(frameSet, mode, delay = 10, frameIndex = 0) {
        if (this.frameSet === frameSet) { return; }
        this.count = 0;
        this.delay = delay;
        this.frameSet = frameSet;
        this.frameIndex = frameIndex;
        this.frameValue = frameSet[frameIndex];
        this.mode = mode;
    },

    loop: function () {
        this.count++;
        while (this.count > this.delay) {
            this.count -= this.delay;
            this.frameIndex = (this.frameIndex < this.frameSet.length - 1) ? this.frameIndex + 1 : 0;
            this.frameValue = this.frameSet[this.frameIndex];
        }
    },
};
Game.Frame = function (x, y, width, height, offsetX, offsetY) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
}

Game.Frame.prototype = {
    constructor: Game.Frame,
}

Game.Collider = function () {

    this.collide = function (value, object, tileX, tileY, tileSize) {
        // get tile type from collisionMap
        //tileTypes:
        /*
        0000 - 00 - no colliding edges
        0001 - 01 - top 
        0010 - 02 - left 
        0011 - 03 - left top 
        0100 - 04 - right
        0101 - 05 - right top
        0110 - 06 - right left
        0111 - 07 - right left top
        1000 - 08 - bottom
        1001 - 09 - bottom top
        1010 - 10 - bottom left
        1011 - 11 - bottom left top
        1100 - 12 - bottom right
        1101 - 13 - bottom right top
        1110 - 14 - bottom right left
        1111 - 15 - bottom right left top
        */
        switch (value) {
            //case 0b0000:
            //   no collisions
            //  break;
            case 0b0001: this.collidePlatformTop(object, tileY); break;
            case 0b0010: this.collidePlatformRight(object, tileX + tileSize); break;
            case 0b0011: if (this.collidePlatformTop(object, tileY)) return;
                this.collidePlatformRight(object, tileX + tileSize); break;
            case 0b0100: this.collidePlatformBottom(object, tileY + tileSize); break;
            case 0b0101: if (this.collidePlatformTop(object, tileY)) return;
                this.collidePlatformBottom(object, tileY + tileSize); break;
            case 0b0110: if (this.collidePlatformRight(object, tileX + tileSize)) return;
                this.collidePlatformBottom(object, tileY + tileSize); break;
            case 0b0111: if (this.collidePlatformTop(object, tileY)) return;
                if (this.collidePlatformRight(object, tileX + tileSize)) return;
                this.collidePlatformBottom(object, tileY + tileSize); break;
            case 0b1000: this.collidePlatformLeft(object, tileX); break;
            case 0b1001: if (this.collidePlatformTop(object, tileY)) return;
                this.collidePlatformLeft(object, tileX); break;
            case 0b1010: if (this.collidePlatformLeft(object, tileX)) return;
                this.collidePlatformRight(object, tileX + tileSize); break;
            case 0b1011: if (this.collidePlatformTop(object, tileY)) return;
                if (this.collidePlatformLeft(object, tileX)) return;
                this.collidePlatformRight(object, tileX + tileSize); break;
            case 0b1100: if (this.collidePlatformLeft(object, tileX)) return;
                this.collidePlatformBottom(object, tileY + tileSize); break;
            case 0b1101: if (this.collidePlatformTop(object, tileY)) return;
                if (this.collidePlatformLeft(object, tileX)) return;
                this.collidePlatformBottom(object, tileY + tileSize); break;
            case 0b1110: if (this.collidePlatformLeft(object, tileX)) return;
                if (this.collidePlatformRight(object, tileX + tileSize)) return;
                this.collidePlatformBottom(object, tileY + tileSize); break;
            case 0b1111: if (this.collidePlatformTop(object, tileY)) return;
                if (this.collidePlatformLeft(object, tileX)) return;
                if (this.collidePlatformRight(object, tileX + tileSize)) return;
                this.collidePlatformBottom(object, tileY + tileSize); break;
        }
    };
};

Game.Collider.prototype = {
    constructor: Game.Collider,

    // route functions
    /* This will resolve a collision (if any) between an object and the y locaqtion of
    some tile's bottom. All of these functions are pretty much the same, just adjusted
    for different sides of a tile and different trajectories of the object.
    */
    collidePlatformBottom: function (object, tileBottom) {
        if (object.getTop() < tileBottom && object.getOldTop() >= tileBottom) {
            object.setTop(tileBottom);
            object.velocity.y = 0;
            return true;
        }
        return false;
    },

    collidePlatformLeft: function (object, tileLeft) {
        if (object.getRight() > tileLeft && object.getOldRight() <= tileLeft) {
            object.setRight(tileLeft - 0.01);
            object.velocity.x = 0;
            return true;
        }
        return false;
    },
    collidePlatformRight: function (object, tileRight) {
        if (object.getLeft() < tileRight && object.getOldLeft() >= tileRight) {
            object.setLeft(tileRight);
            object.velocity.x = 0;
            return true;
        }
        return false;
    },
    collidePlatformTop: function (object, tileTop) {
        if (object.getBottom() > tileTop && object.getOldBottom() <= tileTop) {
            object.setBottom(tileTop - 0.01);
            object.velocity.y = 0;
            object.jumping = false;
            return true;
        }
        return false;
    }
};

Game.Object = function (x, y, width, height) {
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
};

Game.Object.prototype = {
    constructor: Game.Object,

    getBottom: function () { return this.y + this.height },
    getLeft: function () { return this.x },
    getRight: function () { return this.x + this.width },
    getTop: function () { return this.y },
    getCenterX: function () { return this.x + this.width / 2 },
    getCenterY: function () { return this.y + this.height / 2 },
    
    setBottom: function (y) { this.y = y - this.height },
    setLeft: function (x) { this.x = x },
    setRight: function (x) { this.x = x - this.width },
    setTop: function (y) { this.y = y },
    setCenterX: function (x) { this.x = x - this.width / 2 },
    setCenterY: function (y) { this.y = y - this.height / 2 },
};

Game.MovingObject = function (x, y, width, height, velocityMax = 15) {
    Game.Object.call(this, x, y, width, height);
    this.velocityMax = velocityMax;

    this.velocity = { x: 0, y: 0 };

    this.oldX = x;
    this.oldY = y;
};

Game.MovingObject.prototype = {
    getOldBottom    : function ()  { return this.oldY + this.height;    },
    getOldCenterX   : function ()  { return this.oldX + this.width  / 2;},
    getOldCenterY   : function ()  { return this.oldY + this.height / 2;},
    getOldLeft      : function ()  { return this.oldX;                  },
    getOldRight     : function ()  { return this.oldX + this.width;     },
    getOldTop       : function ()  { return this.oldY;                  },
    setOldBottom    : function (y) { this.oldY = y - this.height;       },
    setOldCenterX   : function (x) { this.oldX = x - this.height / 2;   },
    setOldCenterY   : function (y) { this.oldY = y - this.height / 2;   },
    setOldLeft      : function (x) { this.oldX = x;                     },
    setOldRight     : function (x) { this.oldX = x - this.width;        },
    setOldTop       : function (y) { this.oldY = y;                     },
}

Object.assign(Game.MovingObject.prototype, Game.Object.prototype);
Game.MovingObject.prototype.constructor = Game.MovingObject;

Game.Door = function (door) {
    Game.Object.call(this, door.x, door.y, door.width, door.height);

    this.destinationX = door.destination_x;
    this.destinationY = door.destination_y;
    this.destinationZone = door.destination_zone;
};

Game.Door.prototype = {
    collideObject(object) {
        let centerX = object.getCenterX();
        let centerY = object.getCenterY();

        if (centerX < this.getLeft() || centerX > this.getRight() ||
            centerY < this.getTop() || centerY > this.getBottom()) return false;

        return true;
    },
};

Object.assign(Game.Door.prototype, Game.Object.prototype);
Game.Door.prototype.constructor = Game.Door;


/* The player is also it's own class now. Since player only appears in the context
of Game.World, that is where it is defined. */
Game.Player = function (x, y) {

    Game.MovingObject.call(this, x, y, 7, 14 );
    Game.Animator.call(this, Game.Player.prototype.frameSets["idle-left"], 10);

    //this.color1 = '#404040';
    //this.color2 = '#f0f0f0';
    // this.height = 16; moved to base
    this.jumping = true;
    this.velocity = { x: 0, y: 0 };
    this.direction = { x: -1 };
    // this.width = 16; moved to base
    // this.x = 100; moved to base
    // this.y = 50; moved to base
    this.JUMPING_SPEED = 12.5;
};

Game.Player.prototype = {
    constructor: Game.Player,

    frameSets: {
        "idle-left": [0],
        "jump-left": [1],
        "move-left": [2, 3, 4, 5],
        "idle-right": [6],
        "jump-right": [7],
        "move-right": [8, 9, 10, 11],
    },

    jump: function () {
        /* Made it so you can't jump if you're falling faster than 10 pixels / second */
        if (!this.jumping && this.velocity.y < 10) {
            this.jumping = true;
            this.velocity.y -= this.JUMPING_SPEED;
        }
    },
    moveLeft: function () {
        this.direction.x = -1;
        this.velocity.x -= 0.55;
    },
    moveRight: function (frameSet) {
        this.direction.x = 1;
        this.velocity.x += 0.55;
    },

    updateAnimation: function () {
        // if player moving up
        if (this.velocity.y < 0) {
            // facing left
            if (this.direction.x < 0) this.changeFrameSet(this.frameSets['jump-left'], 'pause');
            // facing right
            else this.changeFrameSet(this.frameSets['jump-right'], 'pause');
            // if facing left
        } else if (this.direction.x < 0) {
            if (this.velocity.x < -0.1) this.changeFrameSet(this.frameSets['move-left'], 'loop', 5);
            else this.changeFrameSet(this.frameSets['idle-left'], 'pause');
            // if facing right
        } else if (this.direction.x > 0) {
            if (this.velocity.x > 0.1) this.changeFrameSet(this.frameSets['move-right'], 'loop', 5);
            else this.changeFrameSet(this.frameSets['idle-right'], 'pause');
        }
        this.animate();
    },

    updatePosition: function (gravity, friction) {
        this.oldX = this.x;
        this.oldY = this.y;

        // apply gravity
        this.velocity.y += this.velocity.y < 0 ? gravity : 1.8 * gravity;
        //this.velocity.y += gravity

        // Changed from source. I think thinking of friction as a component lost is more useful than thinking 
        // of it as the remainder after applying friction(which is what happens if you use velocity *= friction).
        // If(1 - friction) turns out to hurt code comprehention, renaming the variable might be a better solution.
        // apply friction
        this.velocity.x *= (1 - friction);
        //this.velocity.y *= (1 - friction);

        /* preventing velocity from exceeding it's max. */
        if (Math.abs(this.velocity.x) > this.VELOCITY_MAX)
            this.velocity.x = this.VELOCITY_MAX * Math.sign(this.velocity.x);
        if (Math.abs(this.velocity.y) > this.VELOCITY_MAX)
            this.velocity.y = this.VELOCITY_MAX * Math.sign(this.velocity.y);

        this.x += this.velocity.x;
        this.y += this.velocity.y;
    },
};

/* Double prototype inheritance from Object and Animator */
Object.assign(Game.Player.prototype, Game.MovingObject.prototype);
Object.assign(Game.Player.prototype, Game.Animator.prototype);
Game.Player.prototype.constructor = Game.Player;

Game.TileSet = function (columns, tileSize) {
    this.columns = columns;
    this.tileSize = tileSize;

    let f = Game.Frame;

    /* An array of all the frames in the tile sheet image. */
    this.frames = [new f(115,  96, 13, 16, 0, -2),  // idle-left
                   new f( 50,  96, 13, 16, 0, -2),  // jump-left
                   new f(102,  96, 13, 16, 0, -2), new f(89, 96, 13, 16, 0, -2), new f(76, 96, 13, 16, 0, -2), new f(63, 96, 13, 16, 0, -2), // walk-left
                   new f(  0, 112, 13, 16, 0, -2),  // idle-right
                   new f( 65, 112, 13, 16, 0, -2),  // jump-right
                   new f( 13, 112, 13, 16, 0, -2), new f(26, 112, 13, 16, 0, -2), new f(39, 112, 13, 16, 0, -2), new f(52, 112, 13, 16, 0, -2)  // walk-right
    ];
};

Game.TileSet.prototype = {
    constructor: Game.TileSet,
};
Game.World = function (friction = 0.15, gravity = 1.80) {

    // properties:
    this.collider = new Game.Collider();
    //this.backgroundColor: 'rgba(40,48,56,0.25)';
    this.friction = friction;
    this.gravity = gravity;



    /* Here is the graphicalMap data. Later on I will load it from a json file, but for now 
    I will just hardcode it here. */
    this.columns = 12;
    this.rows = 9;

    this.tileSet = new Game.TileSet(8, 16);
    this.player = new Game.Player(32, 76);

    this.zoneId = "00";

    this.doors = []; // The array of doors in the level.
    this.door = undefined; // if the player enters a door, the game wil set this 

    /* height and Width now depend on the graphicalMap size. */
    this.height = this.tileSet.tileSize * this.rows;
    this.width = this.tileSet.tileSize * this.columns;
}
Game.World.prototype = {
    constructor: Game.World,

    setup: function (zone) {
        this.collisionMap = zone.collision_map;
        this.graphicalMap = zone.graphical_map;
        this.columns = zone.columns;
        this.rows = zone.rows;
        this.doors = new Array();
        this.zoneId = zone.id;

        /* generate new doors. */
        for (let doorIndex = zone.doors.length - 1; doorIndex > -1; --doorIndex) {
            let door = zone.doors[doorIndex];
            this.doors[doorIndex] = new Game.Door(door);
        }

        /* If the player entered into a door, this.door will reference that door
        it will be used to set the player's location to the door's destination. */
        if (this.door) {
            /* if a destination is equal to -1, that means it won't be used. Since the door's area
            spans from 0 to its widdth and height, any negative number would be ....
            a door's destination -1, the player will keep his current position.*/
            if (this.door.destinationX != -1) {
                this.player.setCenterX(this.door.destinationX);
            }
            if (this.door.destinationY != -1) {
                this.player.setBottom(this.door.destinationY);
            }
            this.door = undefined;
        }
    },

    /**
     * Method collideObject prevents player from going out of bounds.
     * @param {any} object
     */
    collideObject: function (object) {
        
        // tile collsion:
        var bottom, left, right, top, value;
        // Do collision detection for top left corner
        top   = Math.floor(object.getTop()   / this.tileSet.tileSize);
        left  = Math.floor(object.getLeft() / this.tileSet.tileSize);
        value = this.collisionMap[top * this.columns + left];
        this.collider.collide(value, object, left * this.tileSet.tileSize, top * this.tileSet.tileSize, this.tileSet.tileSize);

        // do collsion detection for top right corner
        // have to re-check top and right, since the last collision detection might have moved the object.
        top = Math.floor(object.getTop() / this.tileSet.tileSize);
        right = Math.floor(object.getRight() / this.tileSet.tileSize);
        value = this.collisionMap[top * this.columns + right];
        this.collider.collide(value, object, right * this.tileSet.tileSize, top * this.tileSet.tileSize, this.tileSet.tileSize);

        // Do collision detection for bottom left corner
        bottom = Math.floor(object.getBottom() / this.tileSet.tileSize);
        left = Math.floor(object.getLeft() / this.tileSet.tileSize);
        value = this.collisionMap[bottom * this.columns + left];
        this.collider.collide(value, object, left * this.tileSet.tileSize, bottom * this.tileSet.tileSize, this.tileSet.tileSize);

        // do collision detection for bottom right
        bottom = Math.floor(object.getBottom() / this.tileSet.tileSize);
        right = Math.floor(object.getRight() / this.tileSet.tileSize);

        value = this.collisionMap[bottom * this.columns + right];
        this.collider.collide(value, object, right * this.tileSet.tileSize, bottom * this.tileSet.tileSize, this.tileSet.tileSize);

    },


    update: function () {
        this.player.updatePosition(this.gravity, this.friction);

        this.collideObject(this.player);
        /* Here we loop through all the doors in the current zone and check to see
        if the player is colliding with any. If he does collide with one, we set the
        world's door variable equal to that door, so we know to use it to load the next zone*/
        for (let doorIndex = this.doors.length - 1; doorIndex > -1; -- doorIndex) {
            let door = this.doors[doorIndex];
            
            if (door.collideObject(this.player)) {
                this.door = door;
            }
        }

        this.player.updateAnimation();
    },
}


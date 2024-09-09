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


Game.World = function (friction = 0.8, gravity = 2) {

    // properties:
    this.collider = new Game.World.Collider();
    //this.backgroundColor: 'rgba(40,48,56,0.25)';
    this.friction = friction;
    this.gravity = gravity;

    // old constants, world is now defined by map.
    //height: 72, //px
    //width = 128, //px

    this.player = new Game.World.Object.Player(100,100);
    /* Here is the map data. Later on I will load it from a json file, but for now 
    I will just hardcode it here. */
    this.columns = 12;
    this.rows = 9;
    this.tileSet = new Game.World.TileSet(16, 8);
    this.map = [48, 17, 17, 17, 49, 48, 18, 19, 16, 17, 35, 36,
        10, 39, 39, 39, 16, 18, 39, 31, 31, 31, 39, 07,
        10, 31, 39, 31, 31, 31, 39, 12, 05, 05, 28, 01,
        35, 06, 39, 39, 31, 39, 39, 19, 39, 39, 08, 09,
                02, 31, 31, 47, 39, 47, 39, 31, 31, 04, 36, 25,
        10, 39, 39, 31, 39, 39, 39, 31, 31, 31, 39, 37,
        10, 39, 31, 04, 14, 06, 39, 39, 03, 39, 00, 42,
        49, 02, 31, 31, 11, 39, 39, 31, 11, 00, 42, 09,
                08, 40, 27, 13, 37, 27, 13, 03, 22, 34, 09, 24];

    /* These collision values correspond to collision functions in the Collider class.
      00 is nothing. everything else is run through a switch statement and routed to the
      appropriate collision functions. These particular values aren't arbitrary. Their binary
      representation can be used to describe which sides of the tile have boundaries.
    
      0000 = 0  tile 0:    0    tile 1:   1     tile 2:    0    tile 15:    1
      0001 = 1           0   0          0   0            0   1            1   1
      0010 = 2             0              0                0                1
      1111 = 15        No walls     Wall on top      Wall on Right      four walls
    
      This binary representation can be used to describe which sides of a tile are boundaries.
      Each bit represents a side: 0 0 0 0 = l b r t (left bottom right top). Keep in mind
      that this is just one way to look at it. You could assign your collision values
      any way you want. This is just the way I chose to keep track of which values represent
      which tiles. I haven't tested this representation approach with more advanced shapes. */

    this.collisionMap = [00, 04, 04, 04, 00, 00, 04, 04, 04, 04, 04, 00,
                         02, 00, 00, 00, 12, 06, 00, 00, 00, 00, 00, 08,
                         02, 00, 00, 00, 00, 00, 00, 09, 05, 05, 01, 00,
                         00, 07, 00, 00, 00, 00, 00, 14, 00, 00, 08, 00,
                         02, 00, 00, 01, 00, 01, 00, 00, 00, 13, 04, 00,
                         02, 00, 00, 00, 00, 00, 00, 00, 00, 00, 00, 08,
                         02, 00, 00, 13, 01, 07, 00, 00, 11, 00, 09, 00,
                         00, 03, 00, 00, 10, 00, 00, 00, 08, 01, 00, 00,
                         00, 00, 01, 01, 00, 01, 01, 01, 00, 00, 00, 00];

    /* height and Width now depend on the map size. */
    this.height = this.tileSet.tileSize * this.rows;
    this.width = this.tileSet.tileSize * this.columns;
} 



Game.World.prototype = {
    constructor: Game.World,

    /**
     * Method collideObject prevents player from going out of bounds.
     * @param {any} object
     */
    collideObject: function (object) {
        // Binds object to World boundaries

        if (object.getLeft() < 0) {
            object.setLeft(0);
            object.velocity.x = 0;
        } else if (object.getRight() > this.width) {
            object.setRight(this.width);
            object.velocity.x = 0;
        } if (object.getTop() < 0) {
            object.setTop(0);
            object.velocity.y = 0;
        } else if (object.getBottom() > this.height) {
            object.setBottom(this.height);
            object.velocity.y = 0;
            object.jumping = false;
        }

        // tile collsion:
        var bottom, left, right, top, value;
        // Do collision detection for top left corner
        top =    Math.floor(object.getTop()      / this.tileSet.tileSize);
        left =   Math.floor(object.getLeft()     / this.tileSet.tileSize);
        value = this.collisionMap[top * this.columns + left];
        this.collider.collide(value, object, left * this.tileSet.tileSize, top * this.tileSet.tileSize, this.tileSet.tileSize);

        // do collsion detection for top right corner
        // have to re-check top and right, since the last collision detection might have moved the object.
        top =    Math.floor(object.getTop()     / this.tileSet.tileSize);
        right =  Math.floor(object.getRight()   / this.tileSet.tileSize);
        value = this.collisionMap[top * this.columns + right];
        this.collider.collide(value, object, right * this.tileSet.tileSize, top * this.tileSet.tileSize, this.tileSet.tileSize);

        // Do collision detection for bottom left corner
        bottom = Math.floor(object.getBottom()  / this.tileSet.tileSize);
        left =   Math.floor(object.getLeft()    / this.tileSet.tileSize);
        value = this.collisionMap[bottom * this.columns + left];
        this.collider.collide(value, object, left * this.tileSet.tileSize, bottom * this.tileSet.tileSize, this.tileSet.tileSize);

        // do collision detection for bottom right
        bottom = Math.floor(object.getBottom()  / this.tileSet.tileSize);
        right =  Math.floor(object.getRight()   / this.tileSet.tileSize);

        value = this.collisionMap[bottom * this.columns + right];
        this.collider.collide(value, object, right * this.tileSet.tileSize, bottom * this.tileSet.tileSize, this.tileSet.tileSize);

    },

    
    update: function () {
        this.player.updatePosition(this.gravity, this.friction);
        
        this.collideObject(this.player);
        this.player.updateAnimation();
    }
};

Game.World.Collider = function () {

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
            case 0b0001: this.collidePlatformTop      (object, tileY           ); break;
            case 0b0010: this.collidePlatformRight    (object, tileX + tileSize); break;
            case 0b0011: if (this.collidePlatformTop  (object, tileY           )) return;
                         this.collidePlatformRight    (object, tileX + tileSize); break;
            case 0b0100: this.collidePlatformBottom   (object, tileY + tileSize); break;
            case 0b0101: if (this.collidePlatformTop  (object, tileY           )) return;
                         this.collidePlatformBottom   (object, tileY + tileSize); break;
            case 0b0110: if (this.collidePlatformRight(object, tileX + tileSize)) return;
                         this.collidePlatformBottom   (object, tileY + tileSize); break;
            case 0b0111: if (this.collidePlatformTop  (object, tileY           )) return;
                         if (this.collidePlatformRight(object, tileX + tileSize)) return;
                         this.collidePlatformBottom   (object, tileY + tileSize); break;
            case 0b1000: this.collidePlatformLeft     (object, tileX           ); break;
            case 0b1001: if (this.collidePlatformTop  (object, tileY           )) return;
                         this.collidePlatformLeft     (object, tileX           ); break;
            case 0b1010: if (this.collidePlatformLeft (object, tileX           )) return;
                         this.collidePlatformRight    (object, tileX + tileSize); break;
            case 0b1011: if (this.collidePlatformTop  (object, tileY           )) return;
                         if (this.collidePlatformLeft (object, tileX           )) return;
                         this.collidePlatformRight    (object, tileX + tileSize); break;
            case 0b1100: if (this.collidePlatformLeft (object, tileX           )) return;
                         this.collidePlatformBottom   (object, tileY + tileSize); break;
            case 0b1101: if (this.collidePlatformTop  (object, tileY           )) return;
                         if (this.collidePlatformLeft (object, tileX           )) return;
                         this.collidePlatformBottom   (object, tileY + tileSize); break;
            case 0b1110: if (this.collidePlatformLeft (object, tileX           )) return;
                         if (this.collidePlatformRight(object, tileX + tileSize)) return;
                         this.collidePlatformBottom   (object, tileY + tileSize); break;
            case 0b1111: if (this.collidePlatformTop  (object, tileY           )) return;
                         if (this.collidePlatformLeft (object, tileX           )) return;
                         if (this.collidePlatformRight(object, tileX + tileSize)) return;
                         this.collidePlatformBottom   (object, tileY + tileSize); break;
        }
    };
};

Game.World.Collider.prototype = {
    constructor: Game.World.Collider,

    // route functions
    /* This will resolve a collision (if any) between an object and the y locaqtion of
    some tile's bottom. All of these functions are pretty much the same, just adjusted
    for different sides of a tile and different trajectories of the object.
    */
    collidePlatformBottom: function (object, tileBottom) {
        if (object.getTop() < tileBottom && object.getOldTop() >= tileBottom) {
            object.setTop(tileBottom);
            object.velocity.y = 0;
            return true
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


Game.World.Object = function (x, y, width, height) {
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.oldX = x;
    this.oldY = y;
};

Game.World.Object.prototype = {
    constructor: Game.World.Object,

    getBottom:      function () { return this.y + this.height },
    getLeft:        function () { return this.x },
    getRight:       function () { return this.x + this.width },
    getTop:         function () { return this.y },
    getOldBottom:   function () { return this.oldY + this.height },
    getOldLeft:     function () { return this.oldX },
    getOldRight:    function () { return this.oldX + this.width },
    getOldTop:      function () { return this.oldY },
    setBottom:      function (y) { this.y = y - this.height },
    setLeft:        function (x) { this.x = x },
    setRight:       function (x) { this.x = x - this.width },
    setTop:         function (y) { this.y = y },
    setOldBottom:   function (y) { this.oldY = y - this.height },
    setOldLeft:     function (x) { this.oldX = x },
    setOldRight:    function (x) { this.oldX = x - this.width },
    setOldTop:      function (y) { this.oldY = y },
};

Game.World.Object.Animator = function (frameSet, delay) {
    this.count = 0;
    this.delay = (delay >= 1) ? delay : 1;
    this.frameSet = frameSet;
    this.frameIndex = 0;
    this.frameValue = frameSet[0];
    this.mode = "pause";
};

Game.World.Object.Animator.prototype = {
    constructor: Game.World.Object.Animator,

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
}


/* The player is also it's own class now. Since player only appears in the context
of Game.World, that is where it is defined. */
Game.World.Object.Player = function (x, y) {

    Game.World.Object.call(this, 100, 100, 7, 14);
    Game.World.Object.Animator.call(this, Game.World.Object.Player.prototype.frameSets["idle-left"], 10);

    //this.color1 = '#404040';
    //this.color2 = '#f0f0f0';
    // this.height = 16; moved to base
    this.jumping = true;
    this.velocity = { x: 0, y: 0 };
    this.direction = { x: -1 };
    // this.width = 16; moved to base
    // this.x = 100; moved to base
    // this.y = 50; moved to base
    this.JUMPING_SPEED = 15;
};

Game.World.Object.Player.prototype = {

    constructor: Game.World.Object.Player,

    frameSets: {
        "idle-left" : [0],
        "jump-left" : [1],
        "move-left" : [2, 3, 4, 5],
        "idle-right": [6],
        "jump-right": [7],
        "move-right": [8, 9, 10, 11]
    },

    jump: function () {
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
        console.log(`velocity: (${this.velocity.x}, ${this.velocity.y})`);

        this.oldX = this.x;
        this.oldY = this.y;

        // apply gravity
        //this.velocity.y += this.velocity.y < 0 ? gravity :2.5 * gravity;
        this.velocity.y += gravity
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        // apply friction
        //this.velocity.x *= (1 - friction);
        this.velocity.x *= friction;
        //this.velocity.y *= (1 - friction);
        this.velocity.y *= friction;
    },


};

/* Double prototype inheritance from Object and Animator */
Object.assign(Game.World.Object.Player.prototype, Game.World.Object.prototype);
Object.assign(Game.World.Object.Player.prototype, Game.World.Object.Animator.prototype);
Game.World.Object.Player.prototype.constructor = Game.World.Object.Player;

Game.World.TileSet = function (tileSize, columns) {

    this.columns = columns;
    this.tileSize = tileSize;

    let f = Game.World.TileSet.Frame;

    /* An array of all the frames in the tile sheet image. */
    this.frames = [new f(115, 96, 13, 16, 0, -2),  // idle-left
                   new f(50, 96, 13, 16, 0, -2),  // jump-left
                   new f(102, 96, 13, 16, 0, -2), new f(89, 96, 13, 16, 0, -2), new f(76, 96, 13, 16, 0, -2), new f(63, 96, 13, 16, 0, -2), // walk-left
                   new f(0, 112, 13, 16, 0, -2),  // idle-right
                   new f(65, 112, 13, 16, 0, -2),  // jump-right
                   new f(13, 112, 13, 16, 0, -2), new f(26, 112, 13, 16, 0, -2), new f(39, 112, 13, 16, 0, -2), new f(52, 112, 13, 16, 0, -2)  // walk-right
    ];
}

Game.World.TileSet.prototype = {
    constructor: Game.World.TileSet
};

Game.World.TileSet.Frame = function (x, y, width, height, offsetX, offsetY) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
}

Game.World.TileSet.Frame.prototype = {
    constructor: Game.World.TileSet.Frame,
}
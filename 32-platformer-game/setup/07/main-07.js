// Credit: Frank Poth 02/28/2018



/* This is the basic setup or "skeleton" of Frank's program. It has three main parts:
the controller, display and game logic. It also has an engine which combines the 
three logical parts which are otherwise completely seperate. One of the most important
aspects of programming is organization. Without an orginized foundation your code
will quicly become unruly and diffictult to maintain. Separating code into logical
groups is also a principle of object oriented programming, which lends itself to
comprehensible, maintainable code as wel as modularity */

/* Since we are laoading our scripts dynamically from the rabbit-trap.html, we are wrapping
our main JavaScript file in a load listener. This ensures that this code will not
execute until the document has finished loadingand we have access to all of our classes. */

window.addEventListener('load', function (event) {
    "use strict";

    const ZONE_PREFIX = "07/zone";
    const ZONE_SUFFIX = ".json";

    /////////////////
    //// CLASSES ////
    /////////////////
    const AssetsManager = function () {
        this.tileSetImage = undefined;
    };

    AssetsManager.prototype = {
        constructor: Game.AssetManager,

        /* Requests a file and hands the callback function the contents of that file
        parsed by JSON.parse. */
        requestJSON: function (url, callback) {
            let request = new XMLHttpRequest();

            request.addEventListener("load", function () {
                callback(JSON.parse(this.responseText));
            }, { once: true });

            request.open("GET", url);
            request.send();
        },


        requestImage: function (url, callback) {
            let image = new Image();

            image.addEventListener('load', function () {
                callback(image);
            }, { once: true });

            image.src = url;
        },
    };



    ///////////////////
    //// Functions ////
    ///////////////////
    var keyDownUp = function (event) {
        controller.keyDownUp(event.type, event.keyCode);
    };

    const resize = function () {
        display.resize(
            document.documentElement.clientWidth,
            document.documentElement.clientHeight,
            game.world.height / game.world.width
        );
        display.render();

        var rectangle = display.context.canvas.getBoundingClientRect();

        p.style.left = rectangle.left + "px";
        p.style.top = rectangle.top + "px";
        p.style.fontSize = game.world.tileSet.tileSize * rectangle.height / game.world.height + "px";
    };

    var render = function () {
        var frame = undefined;

        display.drawMap(
            assetsManager.tileSetImage,
            game.world.tileSet.columns,
            game.world.graphicalMap,
            game.world.columns,
            game.world.tileSet.tileSize);

        for (let carrotIndex = game.world.carrots.length - 1; carrotIndex > -1; --carrotIndex) {
            // set frame to current carrot's frameValue
            let carrot = game.world.carrots[carrotIndex];
            frame = game.world.tileSet.frames[carrot.frameValue];
            display.drawObject(
                assetsManager.tileSetImage,
                frame.x, frame.y,
                carrot.x, carrot.y,
                frame.width, frame.height
            );
        }
        for (let grassIndex = game.world.grass.length - 1; grassIndex > -1; --grassIndex ) {
            let grass = game.world.grass[grassIndex];
            frame = game.world.tileSet.frames[grass.frameValue];
            display.drawObject(
                assetsManager.tileSetImage,
                frame.x, frame.y,
                grass.x, grass.y,
                frame.width, frame.height
            )
        }
        frame = game.world.tileSet.frames[game.world.player.frameValue];
        display.drawObject(
            assetsManager.tileSetImage,
            frame.x, frame.y,
            game.world.player.x + Math.floor(game.world.player.width * 0.5 - frame.width * 0.5) + frame.offsetX,
            game.world.player.y + frame.offsetY,
            frame.width,
            frame.height
        );

        p.innerHTML = "Carrots: " + game.world.carrotCount;
        
        display.render();
    };

    const update = function () {
        if (controller.left.active) { game.world.player.moveLeft(); }
        if (controller.right.active) { game.world.player.moveRight(); }
        if (controller.up.active) { game.world.player.jump(); controller.up.active = false; }

        game.update();
        
        if (game.world.door) {
            engine.stop();
            assetsManager.requestJSON(ZONE_PREFIX + game.world.door.destinationZone+ ZONE_SUFFIX, (zone) => {
                game.world.setup(zone);
                engine.start();
            });
        }
    };

        /////////////////
      //// Objects ////
    /////////////////

    /* Usually I just write my logical sections into object literals, but the temptation
    to reference one inside of another is too great, and leats to sloppy coding.
    In an effort toattain cleaner code, I have written classes for each section
    and instantiate them here. */

    var assetsManager   = new AssetsManager(); // Behold the new assetsManager!
    // the controller handles user input
    var controller      = new Controller();
    // the display handles window resizing and the canvas.
    var display         = new Display(document.querySelector('canvas'));
    // t he game willl eventually hold our game logic.
    var game            = new Game();
    // the engine is where the above three sections can interact.
    var engine          = new Engine(1000 / 30, render, update);

    var p = document.createElement("p");
    p.setAttribute("style",
        `color:#c07000; 
         font-size: 2.0em;
         position: fixed; `
    );
    p.innerHTML = "Carrots: 0";
    document.body.appendChild(p);

    ////////////////////
    //// Initialize ////
    ////////////////////
    display.buffer.canvas.height = game.world.height;
    display.buffer.canvas.width = game.world.width;
    display.buffer.imageSmoothingEnabled = false;

    assetsManager.requestJSON(ZONE_PREFIX + game.world.zoneId + ZONE_SUFFIX, (zone) => {
        
        game.world.setup(zone);

        assetsManager.requestImage("rabbit-trap.png", (image) => {
            assetsManager.tileSetImage = image;
            resize();
            engine.start();
        });
    });

    window.addEventListener('keydown', keyDownUp);
    window.addEventListener('keyup', keyDownUp);
    window.addEventListener('resize', resize);
});

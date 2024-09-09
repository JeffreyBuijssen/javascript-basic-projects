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

        ///////////////////
      //// Functions ////
    ///////////////////
    var keyDownUp = function (event) {
        controller.keyDownUp(event.type, event.keyCode);
    }

    const resize = function () {
        display.resize(document.documentElement.clientWidth - 32, document.documentElement.clientHeight - 32, game.world.height / game.world.width);
        display.render();
    }

    var render = function () {
        display.drawMap(game.world.map, game.world.columns);
        
        display.drawPlayer(game.world.player, game.world.player.color1, game.world.player.color2);
        display.render();
    };

    const update = function () {
        if (controller.left.active) { game.world.player.moveLeft(); }
        if (controller.right.active) { game.world.player.moveRight(); }
        if (controller.up.active) { game.world.player.jump(); controller.up.active = false; }

        game.update();
    };

      /////////////////
     //// Objects ////
    /////////////////

    /* Usually I just write my logical sections into object literals, but the temptation
    to reference one inside of another is too great, and leats to sloppy coding.
    In an effort toattain cleaner code, I have written classes for each section
    and instantiate them here. */

    // the controller handles user input
    var controller = new Controller();
    // the display handles window resizing and the canvas.
    var display = new Display(document.querySelector('canvas'));
    // t he game willl eventually hold our game logic.
    var game = new Game();
    // the engine is where the above three sections can interact.
    var engine = new Engine(1000 / 30, render, update);

      ////////////////////
     //// Initialize ////
    ////////////////////
    display.buffer.canvas.height = game.world.height;
    display.buffer.canvas.width = game.world.width;

    display.tileSheet.image.addEventListener('load', function (event) {
        resize();
        engine.start();
    }, {once: true});

    display.tileSheet.image.src = 'rabbit-trap.png';

    window.addEventListener('resize', resize);
    window.addEventListener('keydown', keyDownUp);
    window.addEventListener('keyup', keyDownUp);
});

/*
this is a fixed time step game loop. It can be used for any game and will ensure
that game state is updated at the same rate across different devices which is important
for uniform gameplay. Imagine playing your favorite game on a new phone and suddenly
it's running at a different speed. That would be a bad user experience, so we fix
it with a fixed step game loop. In addition, you can do things like frame dropping
and interpolation iwth a fixed step loop, which allow your game to play and look
smooth on slower devices rather than freezing or lagging to the point of unplayability
*/

// prototype constructor
const Engine = function (timeStep, update, render) {

    // This prototype has the following fields:
    // accumulatedTime, animationFrameRequest, time and  timeStep
    this.accumulatedTime = 0;
    this.animationFrameRequest = undefined,
        this.time = undefined,
        this.timeStep = timeStep,

    // a bool flag (false) flaggin whether the update function has been called since the last cycle
    this.updated = false;

    this.update = update;
    this.render = render;

    // a declaration for this.run, which contains all the steps for a single cycle of the game loop (timeStamp as param)
    this.run = function (timeStamp) { 
        // run adds deltaTime to accumulatedTime.
        this.accumulatedTime += timeStamp - this.time;
        // sets time to provided timeStamp
        this.time = timeStamp;

        // if the time accumulated is larger than three frames, set the accumulated time to 3 frames.
        if (this.accumulatedTime >= this.timeStep * 3) {
            this.accumulatedTime = this.timeStep;
        }




        /* Since we can only update when the screen is ready to draw and requestAnimationFrame
        calls the run function, we need to keep track of how much time has passed. We
        store that accumulated time and test to see if enough has passed to justify
        an update. Remembe,r we want to update every time we have accumulated one time step's
        worth of time, and if multiple time steps have accumulated, we must update one time for each of them, to stay up to speed */

        while (this.accumulatedTime >= this.timeStep) {
            this.accumulatedTime -= this.timeStep;
            this.update(timeStamp);
            this.updated = true;
        }
        // While loop that brings the cycle back up to speed
        //deduct a timestep from accumulated time
        // call the update function with the current time_stamp
        // set updated to true to make an redraw is needed

        // check if update has been set to true by the previous loop, if so, call the render function
        if (this.updated) {
            this.updated = false;
            this.render(timeStamp);
        }
        this.animationFrameRequest = window.requestAnimationFrame(this.handleRun);
    };

    // make an animation request

    // subscribe this.run to the handleRun 
    this.handleRun = (timeStep) => { this.run(timeStep) };
    
};

// Declare the Engine prototype with Engine as it's constructor
// declare a start and stop function
Engine.prototype = {
    constructor: Engine,
    start: function () {
        this.accumulatedTime = this.timeStep;
        this.time = window.performance.now();
        this.animationFrameRequest = window.requestAnimationFrame(this.handleRun);
    },
    stop: function () {
        window.cancelAnimationFrame(this.animationFrameRequest);
    }
};
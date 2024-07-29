

// take user input from keyboard and show the user which key they pressed.

const Controller = function () {

    this.down = new Controller.ButtonInput();
    this.left = new Controller.ButtonInput();
    this.right = new Controller.ButtonInput();
    this.up = new Controller.ButtonInput();
    // reference to button input for down, left, right & up

    this.keyDownUp = function (event) {
        let down = event.type == 'keydown' ? true : false;

        switch (event.keyCode) {
            case 37: this.left.getInput(down); break;
            case 38: this.up.getInput(down); break;
            case 39: this.right.getInput(down); break;
            case 40: this.down.getInput(down);
        }

        alert(`You pressed a key (${event.keyCode})!`);
    }

    this.handleKeyDownUp = (event) => { this.keyDownUp(event); };
}

Controller.prototype = {
    constructor: Controller,
};

Controller.ButtonInput = function () {
    this.active = this.down = false;
};

Controller.ButtonInput.prototype = {
    constructor: Controller.ButtonInput,

    getInput: function (down) {
        if (this.down != down) this.active = down;
        this.down = down;
    }
}


    // a function taking an event as input.
        // the function stores a boolean flag marking whether it's a keyDown or keyUp event
        // the function calls the getInput function with the bool flag on the relevant controller object (the ones referneced earlier)

        // the function shows an alert telling the user which key they pressed.

    //subscribe this.keyDownUp to handleKeyDownUp event

    // set the constructor of Controller to the function Controller

    
    // create a ButtonInput object,
    // set this.active to this.down = false

    // link the constructor for ButtonInput & declare a getInput function with down as bool parameter
    // the function sets this.active to the provided down, if this.down and down don't match
    // then sets this.down to down.
